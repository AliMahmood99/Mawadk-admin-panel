"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Cpu, Target, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WhyUs() {
  const t = useTranslations('why_us');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Award,
      title: t('expertise_title'),
      description: t('expertise_desc'),
      color: 'accent'
    },
    {
      icon: Cpu,
      title: t('systems_title'),
      description: t('systems_desc'),
      color: 'gold'
    },
    {
      icon: Target,
      title: t('results_title'),
      description: t('results_desc'),
      color: 'accent'
    },
    {
      icon: Building,
      title: t('enterprise_title'),
      description: t('enterprise_desc'),
      color: 'gold'
    }
  ];

  return (
    <section className="py-20 bg-background" ref={ref}>
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
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-2xl mb-4 flex items-center justify-center ${
                    reason.color === 'accent'
                      ? 'bg-accent'
                      : 'bg-gold'
                  }`}>
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
