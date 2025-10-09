import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/types';

// Email service configuration (using a simple email service for demo)
// In production, you would use services like SendGrid, AWS SES, or Nodemailer with SMTP
const CONTACT_EMAIL = 'info@hotelshasha.com';
const ADMIN_EMAIL = 'admin@hotelshasha.com';

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Type guard for contact form data
const isContactFormData = (data: unknown): data is {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
} => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'email' in data &&
    'inquiryType' in data &&
    'message' in data
  );
};

// Validate contact form data
const validateContactForm = (data: unknown): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isContactFormData(data)) {
    errors.push('Invalid form data structure');
    return { isValid: false, errors };
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }

  if (data.phone && typeof data.phone === 'string' && data.phone.trim()) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.push('Invalid phone number format');
    }
  }

  if (!data.inquiryType || !['booking', 'general', 'events', 'dining'].includes(data.inquiryType)) {
    errors.push('Valid inquiry type is required');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Simulate email sending (in production, replace with actual email service)
const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the email content (in production, this would be sent via email service)
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('To:', ADMIN_EMAIL);
    console.log('From:', formData.email);
    console.log('Subject:', `New ${formData.inquiryType} inquiry from ${formData.name}`);
    console.log('Content:');
    console.log(`Name: ${formData.name}`);
    console.log(`Email: ${formData.email}`);
    console.log(`Phone: ${formData.phone || 'Not provided'}`);
    console.log(`Inquiry Type: ${formData.inquiryType}`);
    console.log(`Message: ${formData.message}`);
    console.log('===============================');
    
    // Simulate occasional failures for testing
    if (Math.random() < 0.1) {
      throw new Error('Simulated email service failure');
    }
    
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Send confirmation email to user
const sendConfirmationEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('=== CONFIRMATION EMAIL ===');
    console.log('To:', formData.email);
    console.log('From:', CONTACT_EMAIL);
    console.log('Subject: Thank you for contacting Hotel Shasha');
    console.log(`Dear ${formData.name},`);
    console.log('Thank you for your inquiry. We have received your message and will respond within 24 hours.');
    console.log('Best regards,');
    console.log('Hotel Shasha Team');
    console.log('==========================');
    
    return true;
  } catch (error) {
    console.error('Confirmation email failed:', error);
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      inquiryType: body.inquiryType,
      message: body.message.trim()
    };

    // Send emails
    const [emailSent, confirmationSent] = await Promise.all([
      sendContactEmail(formData),
      sendConfirmationEmail(formData)
    ]);

    if (!emailSent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email. Please try again or contact us directly.' 
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
      confirmationSent
    });

  } catch (error) {
    console.error('Contact form API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}