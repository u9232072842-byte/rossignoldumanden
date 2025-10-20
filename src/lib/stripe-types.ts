import { z } from 'zod';

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
