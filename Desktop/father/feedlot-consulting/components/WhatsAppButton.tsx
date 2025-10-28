"use client";

import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export default function WhatsAppButton() {
  const phoneNumber = "+966500000000"; // Replace with actual number
  const message = encodeURIComponent("Hello! I'm interested in your feedlot management consulting services.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-shadow rtl:right-auto rtl:left-6"
    >
      <Button
        size="lg"
        className="rounded-full h-14 w-14 bg-[#25D366] hover:bg-[#20BA5A] text-white"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  );
}
