"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BookingForm() {
  const t = useTranslations('booking');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    position: '',
    email: '',
    phone: '',
    location: '',
    operationType: '',
    operationScale: '',
    challenges: '',
    serviceInterest: [] as string[],
    preferredDate: '',
    howHeard: ''
  });

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with EmailJS or your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: t('step1_title') },
    { number: 2, title: t('step2_title') },
    { number: 3, title: t('step3_title') }
  ];

  if (submitted) {
    return (
      <section className="py-20 bg-background" ref={ref} id="booking">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-4">
                {t('success_title')}
              </h3>
              <p className="text-muted-foreground text-lg">
                {t('success_message')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background" ref={ref} id="booking">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {/* Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {steps.map((s) => (
                    <div key={s.number} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                          step >= s.number
                            ? 'bg-accent text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {s.number}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${
                          step >= s.number ? 'text-accent' : 'text-muted-foreground'
                        }`}>
                          {s.title}
                        </span>
                      </div>
                      {s.number < steps.length && (
                        <div className={`flex-1 h-1 mx-2 ${
                          step > s.number ? 'bg-accent' : 'bg-muted'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Contact Information */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">{t('full_name')} *</Label>
                          <Input
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={(e) => updateFormData('fullName', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyName">{t('company_name')} *</Label>
                          <Input
                            id="companyName"
                            required
                            value={formData.companyName}
                            onChange={(e) => updateFormData('companyName', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="position">{t('position')}</Label>
                          <Input
                            id="position"
                            value={formData.position}
                            onChange={(e) => updateFormData('position', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t('email')} *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">{t('phone')} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">{t('location')}</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => updateFormData('location', e.target.value)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Operation Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="operationType">{t('operation_type')} *</Label>
                          <Select
                            value={formData.operationType}
                            onValueChange={(value) => updateFormData('operationType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('operation_type')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="poultry">{t('operation_poultry')}</SelectItem>
                              <SelectItem value="cattle">{t('operation_cattle')}</SelectItem>
                              <SelectItem value="sheep">{t('operation_sheep')}</SelectItem>
                              <SelectItem value="mixed">{t('operation_mixed')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="operationScale">{t('operation_scale')} *</Label>
                          <Select
                            value={formData.operationScale}
                            onValueChange={(value) => updateFormData('operationScale', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('operation_scale')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medium">{t('scale_medium')}</SelectItem>
                              <SelectItem value="large">{t('scale_large')}</SelectItem>
                              <SelectItem value="multiple">{t('scale_multiple')}</SelectItem>
                              <SelectItem value="corporate">{t('scale_corporate')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="challenges">{t('challenges')}</Label>
                        <Textarea
                          id="challenges"
                          rows={6}
                          value={formData.challenges}
                          onChange={(e) => updateFormData('challenges', e.target.value)}
                          placeholder="Describe your current operational challenges..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Service Interest */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="preferredDate">{t('preferred_date')}</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => updateFormData('preferredDate', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="howHeard">{t('how_heard')}</Label>
                        <Input
                          id="howHeard"
                          value={formData.howHeard}
                          onChange={(e) => updateFormData('howHeard', e.target.value)}
                          placeholder="LinkedIn, Referral, Google, etc."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('previous')}
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="gap-2"
                    >
                      {t('next')}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="gap-2 bg-accent hover:bg-accent/90">
                      {t('submit')}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
