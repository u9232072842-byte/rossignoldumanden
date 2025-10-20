
'use server';
/**
 * @fileOverview A flow for creating Stripe Checkout sessions.
 *
 * - createCheckoutSession - A function that creates a Stripe Checkout session.
 * - CreateCheckoutSessionInput - The input type for the createCheckoutSession function.
 * - CreateCheckoutSessionOutput - The return type for the createCheckoutSession function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const LineItemSchema = z.object({
  name: z.string().describe('The name of the product.'),
  description: z.string().optional().describe('A description of the product.'),
  images: z.array(z.string()).optional().describe('A list of image URLs for the product.'),
  amount: z.number().describe('The price of the product in the smallest currency unit (e.g., cents).'),
  quantity: z.number().describe('The quantity of the product.'),
  metadata: z.record(z.string()).optional().describe('Metadata to attach to the line item.'),
});

export const CreateCheckoutSessionInputSchema = z.object({
  lineItems: z.array(LineItemSchema).describe('A list of items for the checkout session.'),
  metadata: z.record(z.string()).optional().describe('Metadata to attach to the session.'),
});
export type CreateCheckoutSessionInput = z.infer<typeof CreateCheckoutSessionInputSchema>;

export const CreateCheckoutSessionOutputSchema = z.object({
  sessionId: z.string().describe('The ID of the created Stripe Checkout session.'),
  url: z.string().nullable().describe('The URL to redirect the user to for checkout.'),
});
export type CreateCheckoutSessionOutput = z.infer<typeof CreateCheckoutSessionOutputSchema>;

export async function createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionOutput> {
  return createCheckoutSessionFlow(input);
}

const createCheckoutSessionFlow = ai.defineFlow(
  {
    name: 'createCheckoutSessionFlow',
    inputSchema: CreateCheckoutSessionInputSchema,
    outputSchema: CreateCheckoutSessionOutputSchema,
  },
  async (input) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: input.lineItems.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images,
          },
          unit_amount: item.amount,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
      metadata: input.metadata,
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  }
);
