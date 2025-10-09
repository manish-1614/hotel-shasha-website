'use client';

import React, { useState, useEffect } from 'react';
import { NewsletterFormData } from '@/types';
import Button from '@/components/ui/Button/Button';
import styles from './Newsletter.module.css';

interface NewsletterProps {
  className?: string;
  variant?: 'default' | 'footer' | 'inline';
}

const Newsletter: React.FC<NewsletterProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: ''
  });

  const [errors, setErrors] = useState<Partial<NewsletterFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<NewsletterFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ email: value });

    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }

    // Reset submit status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual newsletter service integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just log the subscription
      console.log('Newsletter subscription:', formData);
      
      setSubmitStatus('success');
      setFormData({ email: '' });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'footer':
        return styles.newsletterFooter;
      case 'inline':
        return styles.newsletterInline;
      default:
        return styles.newsletterDefault;
    }
  };

  // Prevent hydration mismatch by not rendering interactive elements until mounted
  if (!mounted) {
    return (
      <div className={`${styles.newsletter} ${getVariantClasses()} ${className}`}>
        {variant === 'default' && (
          <div className={styles.newsletterHeader}>
            <h3 className={styles.newsletterTitle}>
              Stay Updated
            </h3>
            <p className={styles.newsletterDescription}>
              Subscribe to our newsletter and be the first to know about special offers, 
              seasonal packages, and exclusive experiences at Hotel Shasha.
            </p>
          </div>
        )}

        {variant === 'footer' && (
          <div className={styles.newsletterHeader}>
            <p className={styles.newsletterDescription}>
              Subscribe to our newsletter for special offers and updates.
            </p>
          </div>
        )}

        {variant === 'inline' && (
          <div className={styles.newsletterHeader}>
            <h4 className={styles.newsletterTitleInline}>
              Newsletter Signup
            </h4>
            <p className={styles.newsletterDescriptionInline}>
              Get updates on special offers and events.
            </p>
          </div>
        )}

        <div className={styles.newsletterForm}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                className={styles.emailInput}
                placeholder="Enter your email address"
                disabled
                aria-label="Email address for newsletter subscription"
              />
              <Button
                type="button"
                variant="primary"
                size={variant === 'footer' ? 'md' : 'lg'}
                disabled
                className={styles.submitButton}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.newsletter} ${getVariantClasses()} ${className}`}>
      {variant === 'default' && (
        <div className={styles.newsletterHeader}>
          <h3 className={styles.newsletterTitle}>
            Stay Updated
          </h3>
          <p className={styles.newsletterDescription}>
            Subscribe to our newsletter and be the first to know about special offers, 
            seasonal packages, and exclusive experiences at Hotel Shasha.
          </p>
        </div>
      )}

      {variant === 'footer' && (
        <div className={styles.newsletterHeader}>
          <p className={styles.newsletterDescription}>
            Subscribe to our newsletter for special offers and updates.
          </p>
        </div>
      )}

      {variant === 'inline' && (
        <div className={styles.newsletterHeader}>
          <h4 className={styles.newsletterTitleInline}>
            Newsletter Signup
          </h4>
          <p className={styles.newsletterDescriptionInline}>
            Get updates on special offers and events.
          </p>
        </div>
      )}

      {submitStatus === 'success' && (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            ✅
          </div>
          <div className={styles.successContent}>
            <h4 className={styles.successTitle}>Successfully Subscribed!</h4>
            <p className={styles.successText}>
              Thank you for subscribing to our newsletter. You&apos;ll receive updates about 
              special offers and exclusive experiences at Hotel Shasha.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className={styles.errorMessage}>
          <div className={styles.errorIcon}>
            ❌
          </div>
          <div className={styles.errorContent}>
            <h4 className={styles.errorTitle}>Subscription Failed</h4>
            <p className={styles.errorText}>
              Sorry, there was an error processing your subscription. Please try again.
            </p>
          </div>
        </div>
      )}

      {submitStatus !== 'success' && (
        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id={`newsletter-email-${variant}`}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.emailInput} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter your email address"
                disabled={isSubmitting}
                aria-label="Email address for newsletter subscription"
              />
              <Button
                type="submit"
                variant="primary"
                size={variant === 'footer' ? 'md' : 'lg'}
                loading={isSubmitting}
                disabled={isSubmitting || !formData.email.trim()}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {errors.email && (
              <span className={styles.fieldError}>{errors.email}</span>
            )}
          </div>

          {variant === 'default' && (
            <p className={styles.privacyNote}>
              By subscribing, you agree to receive marketing emails from Hotel Shasha. 
              You can unsubscribe at any time. We respect your privacy and will never 
              share your information with third parties.
            </p>
          )}
        </form>
      )}

      {submitStatus === 'success' && variant === 'default' && (
        <button
          onClick={() => setSubmitStatus('idle')}
          className={styles.subscribeAgainButton}
        >
          Subscribe another email
        </button>
      )}
    </div>
  );
};

export default Newsletter;