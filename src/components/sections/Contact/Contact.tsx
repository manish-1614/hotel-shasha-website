'use client';

import React, { useState } from 'react';
import { ContactFormData } from '@/types';
import Button from '@/components/ui/Button/Button';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const [submitMessage, setSubmitMessage] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Real-time validation for touched fields
    if (touchedFields.has(name)) {
      validateField(name, value);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
    
    // Check if form is valid
    return Object.keys(newErrors).length === 0 && 
           formData.name.trim() && 
           formData.email.trim() && 
           formData.message.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'general',
          message: ''
        });
        setTouchedFields(new Set());
        setErrors({});
        
        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 10000);
      } else {
        console.error('Form submission failed:', result);
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Failed to send message. Please try again.');
        
        // If there are validation errors from the server, show them
        if (result.details && Array.isArray(result.details)) {
          const serverErrors: Partial<ContactFormData> = {};
          result.details.forEach((error: string) => {
            if (error.includes('Name')) serverErrors.name = error;
            if (error.includes('email')) serverErrors.email = error;
            if (error.includes('phone')) serverErrors.phone = error;
            if (error.includes('Message')) serverErrors.message = error;
          });
          setErrors(serverErrors);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Get in Touch
          </h2>
          <p className={styles.sectionDescription}>
            Ready to experience the tranquility of Jibhi Valley? Contact us for reservations, 
            inquiries, or to plan your perfect mountain getaway.
          </p>
        </div>

        <div className={styles.contactContent}>
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <h3 className={styles.contactInfoTitle}>
              Contact Information
            </h3>
            <p className={styles.contactInfoDescription}>
              We&apos;re here to help you plan your perfect stay. Reach out to us through any of the following channels.
            </p>

            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <span>📞</span>
                </div>
                <div className={styles.contactDetails}>
                  <h4 className={styles.contactMethodTitle}>Phone</h4>
                  <p className={styles.contactMethodValue}>+91 98765 43210</p>
                  <p className={styles.contactMethodValue}>+91 98765 43211</p>
                  <p className={styles.contactMethodNote}>Available 24/7 for reservations</p>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <span>✉️</span>
                </div>
                <div className={styles.contactDetails}>
                  <h4 className={styles.contactMethodTitle}>Email</h4>
                  <p className={styles.contactMethodValue}>info@hotelshasha.com</p>
                  <p className={styles.contactMethodValue}>reservations@hotelshasha.com</p>
                  <p className={styles.contactMethodNote}>We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <span>📍</span>
                </div>
                <div className={styles.contactDetails}>
                  <h4 className={styles.contactMethodTitle}>Address</h4>
                  <p className={styles.contactMethodValue}>Hotel Shasha</p>
                  <p className={styles.contactMethodValue}>Jibhi Valley, Banjar</p>
                  <p className={styles.contactMethodValue}>Himachal Pradesh 175123</p>
                  <p className={styles.contactMethodNote}>15 minutes from Banjar town</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.contactForm}>
            <h3 className={styles.formTitle}>
              Send us a Message
            </h3>
            <p className={styles.formDescription}>
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>✅</span>
                <div>
                  <p>{submitMessage}</p>
                  <button 
                    type="button" 
                    onClick={() => setSubmitStatus('idle')}
                    className={styles.dismissButton}
                    aria-label="Dismiss success message"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                <span className={styles.errorIcon}>❌</span>
                <div>
                  <p>{submitMessage}</p>
                  <button 
                    type="button" 
                    onClick={() => setSubmitStatus('idle')}
                    className={styles.dismissButton}
                    aria-label="Dismiss error message"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className={styles.fieldError}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className={styles.fieldError}>{errors.email}</span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`${styles.formInput} ${errors.phone ? styles.formInputError : ''}`}
                    placeholder="Enter your phone number"
                    disabled={isSubmitting}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <span className={styles.fieldError}>{errors.phone}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="inquiryType" className={styles.formLabel}>
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                    disabled={isSubmitting}
                  >
                    <option value="booking">Room Booking</option>
                    <option value="general">General Inquiry</option>
                    <option value="events">Events & Celebrations</option>
                    <option value="dining">Dining Reservations</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  rows={6}
                  className={`${styles.formTextarea} ${errors.message ? styles.formInputError : ''}`}
                  placeholder="Tell us about your requirements, preferred dates, or any special requests..."
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <span className={styles.fieldError}>{errors.message}</span>
                )}
              </div>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;