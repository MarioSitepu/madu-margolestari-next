'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import EmailIcon from '@/components/icons/EmailIcon';

interface NewsletterFormProps {
  placeholder: string;
  ctaText: string;
  disclaimer: string;
}

const NewsletterForm = ({ placeholder, ctaText, disclaimer }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail(email)) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-brand-teal rounded-[100px] flex items-center px-6 py-3 gap-4">
        <EmailIcon width={18} height={18} color="#000000" />
        
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-caption text-black/50 placeholder:text-black/50"
          aria-label="Email address"
        />
        
        <button
          type="submit"
          className="text-button text-brand-black bg-brand-yellow px-6 py-2 rounded-[100px] hover:bg-brand-yellow/90 transition-colors"
        >
          {ctaText}
        </button>
      </form>
      
      {!isValid && (
        <p className="text-caption text-red-500">
          Please enter a valid email address
        </p>
      )}
      
      <p className="text-caption text-brand-teal">
        {disclaimer}
      </p>
    </div>
  );
};

export default NewsletterForm;