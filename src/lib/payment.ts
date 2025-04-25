// src/lib/payment.ts
export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash_on_delivery',
    name: 'الدفع عند الاستلام',
    description: 'يمكنك الدفع نقدا أو باستخدام بطاقة الائتمان عند تسليم طلبك',
    icon: '🛒',
    enabled: true
  },
  {
    id: 'credit_card',
    name: 'بطاقة الائتمان',
    description: 'ادفع باستخدام بطاقات Visa أو Mastercard أو غيرها من بطاقات الائتمان',
    icon: '💳',
    enabled: true
  },
  {
    id: 'instapay',
    name: 'انستا باي',
    description: 'ادفع باستخدام خدمة انستا باي',
    icon: '📱',
    enabled: true
  },
  {
    id: 'vodafone_cash',
    name: 'فودافون كاش',
    description: 'ادفع باستخدام خدمة فودافون كاش',
    icon: '📲',
    enabled: true
  }
];

export interface PaymentProcessorConfig {
  apiKey: string;
  apiSecret?: string;
  merchantId?: string;
  environment: 'test' | 'production';
}

export interface PaymentProcessorOptions {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  paymentMethod: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

// Mock payment processor for demonstration purposes
export async function processPayment(options: PaymentProcessorOptions): Promise<PaymentResult> {
  // In a real implementation, this would integrate with actual payment gateways
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful payment for all methods except when testing errors
  if (options.customerEmail === 'test-error@example.com') {
    return {
      success: false,
      error: 'Payment processing failed. Please try again or use a different payment method.'
    };
  }
  
  // For credit card payments, return a redirect URL to a payment page
  if (options.paymentMethod === 'credit_card') {
    return {
      success: true,
      transactionId: `txn_${Date.now()}`,
      redirectUrl: `/payment/process?orderId=${options.orderId}&method=${options.paymentMethod}`
    };
  }
  
  // For other payment methods, return success directly
  return {
    success: true,
    transactionId: `txn_${Date.now()}`
  };
}

// Function to validate payment method
export function isValidPaymentMethod(methodId: string): boolean {
  return paymentMethods.some(method => method.id === methodId && method.enabled);
}
