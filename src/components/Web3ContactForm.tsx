'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Web3ContactFormProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function Web3ContactForm({ 
  title = "Contact Us", 
  description = "Send us a message and we'll get back to you soon.",
  className = ""
}: Web3ContactFormProps) {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "1c32a200-cb16-4db7-a524-a74052927e6a");
    
    // Add additional metadata
    formData.append("subject", "New Contact Form Submission from Locotraq Website");
    formData.append("from_name", "Locotraq Contact Form");

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
        console.log("Error", data);
        setResult("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Error submitting form. Please try again.");
    }
  };

  const getResultIcon = () => {
    if (result === "Sending....") return <Loader2 className="h-4 w-4 animate-spin" />;
    if (result.includes("Successfully")) return <CheckCircle className="h-4 w-4" />;
    if (result.includes("Error")) return <AlertCircle className="h-4 w-4" />;
    return null;
  };

  const getResultStyles = () => {
    if (result.includes("Successfully")) return "bg-green-50 text-green-700 border-green-200";
    if (result.includes("Error")) return "bg-red-50 text-red-700 border-red-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  return (
    <Card className={`border-0 shadow-lg ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-heading font-bold text-foreground">
          {title}
        </CardTitle>
        <p className="font-paragraph text-secondary">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Hidden fields for Web3 Forms */}
          <input type="hidden" name="redirect" value="https://web3forms.com/success" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="font-paragraph text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="font-paragraph text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="font-paragraph text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 6390 057 777"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="subject" className="font-paragraph text-foreground">
              Subject *
            </Label>
            <Input
              id="subject"
              name="inquiry_subject"
              type="text"
              placeholder="Brief description of your inquiry"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message" className="font-paragraph text-foreground">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Please provide details about your inquiry..."
              required
              rows={5}
              className="mt-1"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            disabled={result === "Sending...."}
          >
            {result === "Sending...." ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          {/* Result Message */}
          {result && (
            <div className={`flex items-center justify-center space-x-2 p-4 rounded-lg border ${getResultStyles()}`}>
              {getResultIcon()}
              <span className="font-paragraph font-medium">{result}</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}