// src/app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { processPayment, isValidPaymentMethod } from '@/lib/payment';
import { generateOrderNumber } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      amount, 
      currency = 'EGP', 
      paymentMethod, 
      customerEmail, 
      customerName,
      orderId = generateOrderNumber()
    } = body;

    // Validate required fields
    if (!amount || !paymentMethod || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate payment method
    if (!isValidPaymentMethod(paymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Process payment
    const result = await processPayment({
      amount,
      currency,
      orderId,
      customerEmail,
      customerName,
      paymentMethod,
      successUrl: `${request.nextUrl.origin}/checkout/success`,
      cancelUrl: `${request.nextUrl.origin}/checkout/cancel`
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        orderId,
        transactionId: result.transactionId,
        redirectUrl: result.redirectUrl
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Payment processing failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
