"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Monitor,
  Wheat,
  DollarSign,
  Shield,
  TrendingUp,
  FileText,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SystemShowcase() {
  const t = useTranslations('system_showcase');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const systemFeatures = [
    {
      icon: Monitor,
      title: t('monitoring_title'),
      features: t.raw('monitoring_features'),
      benefit: t('monitoring_benefit'),
      color: 'accent'
    },
    {
      icon: Wheat,
      title: t('feed_title'),
      features: t.raw('feed_features'),
      benefit: t('feed_benefit'),
      color: 'gold'
    },
    {
      icon: DollarSign,
      title: t('financial_title'),
      features: t.raw('financial_features'),
      benefit: t('financial_benefit'),
      color: 'accent'
    },
    {
      icon: Shield,
      title: t('data_title'),
      features: t.raw('data_features'),
      benefit: t('data_benefit'),
      color: 'gold'
    },
    {
      icon: TrendingUp,
      title: t('analytics_title'),
      features: t.raw('analytics_features'),
      benefit: t('analytics_benefit'),
      color: 'accent'
    },
    {
      icon: FileText,
      title: t('reporting_title'),
      features: t.raw('reporting_features'),
      benefit: t('reporting_benefit'),
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
          <Badge variant="accent" className="mb-4">
            Flagship Solution
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-accent/20">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
                    feature.color === 'accent'
                      ? 'bg-accent text-white'
                      : 'bg-gold text-white'
                  }`}>
                    <feature.icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {feature.title}
                  </h3>

                  {/* Features List */}
                  <ul className="space-y-2 mb-4">
                    {Array.isArray(feature.features) && feature.features.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          feature.color === 'accent' ? 'text-accent' : 'text-gold'
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Benefit */}
                  <div className={`mt-4 pt-4 border-t ${
                    feature.color === 'accent' ? 'border-accent/20' : 'border-gold/20'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      feature.color === 'accent' ? 'text-accent' : 'text-gold'
                    }`}>
                      {feature.benefit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
