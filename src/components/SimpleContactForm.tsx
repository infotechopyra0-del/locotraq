'use client';

import { useState } from 'react';

interface SimpleContactFormProps {
  className?: string;
}

export default function SimpleContactForm({ className = "" }: SimpleContactFormProps) {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "1c32a200-cb16-4db7-a524-a74052927e6a");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.currentTarget.reset();
      } else {
        setResult("Error");
      }
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <textarea 
            name="message" 
            placeholder="Your Message *"
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>
        
        <button 
          type="submit"
          disabled={result === "Sending...."}
          className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {result === "Sending...." ? "Sending..." : "Submit Form"}
        </button>
        
        {result && (
          <div className={`text-center p-3 rounded-lg text-sm font-medium ${
            result.includes("Successfully") 
              ? "bg-green-100 text-green-700" 
              : result.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}>
            {result}
          </div>
        )}
      </form>
    </div>
  );
}