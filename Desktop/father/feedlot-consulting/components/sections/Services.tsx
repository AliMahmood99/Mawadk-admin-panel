"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  TrendingUp,
  GraduationCap,
  Users,
  Boxes,
  Target,
  ArrowRight,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Services() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: LayoutDashboard,
      name: t('service1_name'),
      description: t('service1_desc'),
      features: [
        t('service1_feature1'),
        t('service1_feature2'),
        t('service1_feature3'),
        t('service1_feature4')
      ],
      ideal: t('service1_ideal'),
      flagship: true
    },
    {
      icon: TrendingUp,
      name: t('service2_name'),
      description: t('service2_desc'),
      features: [
        t('service2_feature1'),
        t('service2_feature2'),
        t('service2_feature3'),
        t('service2_feature4')
      ]
    },
    {
      icon: GraduationCap,
      name: t('service3_name'),
      description: t('service3_desc'),
      features: [
        t('service3_feature1'),
        t('service3_feature2'),
        t('service3_feature3'),
        t('service3_feature4')
      ]
    },
    {
      icon: Users,
      name: t('service4_name'),
      description: t('service4_desc'),
      features: [
        t('service4_feature1'),
        t('service4_feature2'),
        t('service4_feature3'),
        t('service4_feature4')
      ]
    },
    {
      icon: Boxes,
      name: t('service5_name'),
      description: t('service5_desc'),
      features: [
        t('service5_feature1'),
        t('service5_feature2'),
        t('service5_feature3'),
        t('service5_feature4')
      ]
    },
    {
      icon: Target,
      name: t('service6_name'),
      description: t('service6_desc'),
      features: []
    }
  ];

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-muted" ref={ref} id="services">
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={service.flagship ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      service.flagship
                        ? 'bg-gradient-to-br from-accent to-gold'
                        : 'bg-gradient-to-br from-accent/20 to-gold/20'
                    }`}>
                      <service.icon className={`w-7 h-7 ${
                        service.flagship ? 'text-white' : 'text-accent'
                      }`} />
                    </div>
                    {service.flagship && (
                      <Badge variant="gold" className="text-xs">
                        Flagship
                      </Badge>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Ideal For */}
                  {service.ideal && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground italic">
                        {service.ideal}
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={scrollToBooking}
                  >
                    {t('learn_more')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
