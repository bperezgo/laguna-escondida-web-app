// src/lib/services/payment.ts
// Payment service — provider-agnostic interface.
// Add provider implementations when payment is needed.

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  checkoutUrl?: string;
}

export interface PaymentProvider {
  createPaymentIntent(amount: number, metadata: Record<string, unknown>): Promise<PaymentIntent>;
  confirmPayment(paymentIntentId: string): Promise<PaymentIntent>;
}

/** Wompi provider (Colombian payment gateway) */
class WompiProvider implements PaymentProvider {
  private publicKey: string;
  private privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  async createPaymentIntent(
    amount: number,
    metadata: Record<string, unknown>
  ): Promise<PaymentIntent> {
    // TODO: Implement Wompi integration
    // Docs: https://docs.wompi.co/
    throw new Error('Wompi payment integration not yet implemented');
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentIntent> {
    throw new Error('Wompi payment integration not yet implemented');
  }
}

/** Factory — returns the configured payment provider */
export function getPaymentProvider(): PaymentProvider {
  const provider = import.meta.env.PAYMENT_PROVIDER ?? 'wompi';

  switch (provider) {
    case 'wompi':
      return new WompiProvider(
        import.meta.env.WOMPI_PUBLIC_KEY ?? '',
        import.meta.env.WOMPI_PRIVATE_KEY ?? ''
      );
    default:
      throw new Error(`Unknown payment provider: ${provider}`);
  }
}
