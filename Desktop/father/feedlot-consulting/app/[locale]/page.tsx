import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import ValueProposition from '@/components/sections/ValueProposition';
import SystemShowcase from '@/components/sections/SystemShowcase';
import CaseStudies from '@/components/sections/CaseStudies';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import WhyUs from '@/components/sections/WhyUs';
import BookingForm from '@/components/sections/BookingForm';
import FAQ from '@/components/sections/FAQ';
import ContactFooter from '@/components/sections/ContactFooter';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ValueProposition />
      <SystemShowcase />
      <CaseStudies />
      <Experience />
      <Services />
      <WhyUs />
      <BookingForm />
      <FAQ />
      <ContactFooter />
      <WhatsAppButton />
    </main>
  );
}
