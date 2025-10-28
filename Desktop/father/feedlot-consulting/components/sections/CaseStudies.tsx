"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CaseStudies() {
  const t = useTranslations('case_studies');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cases = [
    {
      title: t('case1_title'),
      situation: t('case1_situation'),
      solution: t('case1_solution'),
      results: [
        t('case1_result1'),
        t('case1_result2'),
        t('case1_result3'),
        t('case1_result4')
      ],
      color: 'accent'
    },
    {
      title: t('case2_title'),
      situation: t('case2_situation'),
      solution: t('case2_solution'),
      results: [
        t('case2_result1'),
        t('case2_result2'),
        t('case2_result3'),
        t('case2_result4')
      ],
      color: 'gold'
    }
  ];

  return (
    <section className="py-20 bg-muted" ref={ref}>
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

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    {caseStudy.title}
                  </h3>

                  {/* Situation */}
                  <div className="mb-6">
                    <Badge variant="outline" className="mb-2">Situation</Badge>
                    <p className="text-muted-foreground">
                      {caseStudy.situation}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <Badge variant="outline" className="mb-2">Solution</Badge>
                    <p className="text-muted-foreground">
                      {caseStudy.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <Badge
                      variant={caseStudy.color === 'accent' ? 'accent' : 'gold'}
                      className="mb-3"
                    >
                      Results
                    </Badge>
                    <ul className="space-y-2">
                      {caseStudy.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                              caseStudy.color === 'accent' ? 'text-accent' : 'text-gold'
                            }`}
                          />
                          <span className="text-primary font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
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
