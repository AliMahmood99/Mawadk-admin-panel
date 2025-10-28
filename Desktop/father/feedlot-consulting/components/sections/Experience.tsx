"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Experience() {
  const t = useTranslations('experience');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: t('fakih_company'),
      duration: t('fakih_duration'),
      role: t('fakih_role'),
      years: '1994-2019',
      achievements: [
        t('fakih_achievement1'),
        t('fakih_achievement2'),
        t('fakih_achievement3'),
        t('fakih_achievement4')
      ]
    },
    {
      company: t('alwadi_company'),
      duration: t('alwadi_duration'),
      role: t('alwadi_role'),
      years: '2019-Present',
      achievements: [
        t('alwadi_achievement1'),
        t('alwadi_achievement2'),
        t('alwadi_achievement3'),
        t('alwadi_achievement4')
      ],
      current: true
    }
  ];

  const stats = [
    { value: '31+', label: t('stat_experience') },
    { value: '2', label: t('stat_companies') },
    { value: '100+', label: t('stat_farms') },
    { value: '✓', label: t('stat_roi') }
  ];

  return (
    <section className="py-20 bg-background" ref={ref} id="experience">
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-accent/10 to-gold/10 rounded-xl"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-accent to-gold"></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-gold flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold text-primary">
                              {exp.company}
                            </h3>
                            {exp.current && (
                              <Badge variant="accent">Current</Badge>
                            )}
                          </div>
                          <p className="text-lg font-semibold text-accent mb-1">
                            {exp.role}
                          </p>
                          <p className="text-muted-foreground">
                            {exp.years} • {exp.duration}
                          </p>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          Key Achievements:
                        </p>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex items-center justify-center relative">
                  <div className={`w-6 h-6 rounded-full ${
                    exp.current
                      ? 'bg-accent ring-4 ring-accent/20'
                      : 'bg-gold ring-4 ring-gold/20'
                  }`}></div>
                </div>

                {/* Empty Space */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
