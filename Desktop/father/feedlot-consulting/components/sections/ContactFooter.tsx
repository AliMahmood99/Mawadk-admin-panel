"use client";

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageCircle, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ContactFooter() {
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: Phone,
      label: tContact('phone'),
      value: '+966 50 000 0000',
      href: 'tel:+966500000000',
      color: 'accent'
    },
    {
      icon: Mail,
      label: tContact('email'),
      value: 'consulting@example.com',
      href: 'mailto:consulting@example.com',
      color: 'gold'
    },
    {
      icon: MessageCircle,
      label: tContact('whatsapp'),
      value: 'WhatsApp Business',
      href: 'https://wa.me/966500000000',
      color: 'accent'
    }
  ];

  return (
    <>
      {/* Contact Section */}
      <section className="py-20 bg-muted" ref={ref} id="contact">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              {tContact('title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {tContact('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 mx-auto rounded-full mb-4 flex items-center justify-center ${
                    method.color === 'accent'
                      ? 'bg-accent group-hover:bg-accent/90'
                      : 'bg-gold group-hover:bg-gold/90'
                  } transition-colors`}>
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{method.label}</h3>
                  <p className="text-sm text-muted-foreground">{method.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Feedlot Consulting
              </h3>
              <p className="text-white/70 text-sm">
                {tFooter('tagline')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-white/70 hover:text-white transition-colors">
                    {tFooter('services')}
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-white/70 hover:text-white transition-colors">
                    {tFooter('about')}
                  </a>
                </li>
                <li>
                  <a href="#booking" className="text-white/70 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    {tFooter('privacy')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    {tFooter('terms')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/70">
            <p>{tFooter('copyright')}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
