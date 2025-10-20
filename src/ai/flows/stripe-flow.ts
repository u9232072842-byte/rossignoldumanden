
'use server';
/**
 * @fileOverview A flow for creating Stripe Checkout sessions.
 *
 * - createCheckoutSession - A function that creates a Stripe Checkout session.
 */

import { ai } from '@/ai/genkit';
import { CreateCheckoutSessionInputSchema, CreateCheckoutSessionOutputSchema, type CreateCheckoutSessionInput } from '@/lib/stripe-types';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function createCheckoutSession(input: CreateCheckoutSessionInput): Promise<{ sessionId: string; url: string | null; }> {
  return createCheckoutSessionFlow(input);
}

const createCheckoutSessionFlow = ai.defineFlow(
  {
    name: 'createCheckoutSessionFlow',
    inputSchema: CreateCheckoutSessionInputSchema,
    outputSchema: CreateCheckoutSessionOutputSchema,
  },
  async (input) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

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
