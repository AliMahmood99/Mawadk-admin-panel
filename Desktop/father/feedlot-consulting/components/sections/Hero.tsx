"use client";

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                <Award className="w-3 h-3 mr-1" />
                {t('badge_experience')}
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                <CheckCircle className="w-3 h-3 mr-1" />
                {t('badge_proven')}
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                <BarChart3 className="w-3 h-3 mr-1" />
                {t('badge_enterprise')}
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                {t('badge_results')}
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('title')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                onClick={() => scrollToSection('booking')}
                className="bg-accent hover:bg-accent/90 text-white gap-2"
              >
                {t('cta_primary')}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                {t('cta_secondary')}
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Dashboard Mockup */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-accent text-sm font-semibold mb-1">Feed Efficiency</div>
                    <div className="text-3xl font-bold text-white">+15%</div>
                    <div className="text-xs text-white/70">Improvement</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-gold text-sm font-semibold mb-1">Cost Savings</div>
                    <div className="text-3xl font-bold text-white">-20%</div>
                    <div className="text-xs text-white/70">Reduction</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-accent text-sm font-semibold mb-1">FCR Optimized</div>
                    <div className="text-3xl font-bold text-white">12%</div>
                    <div className="text-xs text-white/70">Better Performance</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-gold text-sm font-semibold mb-1">ROI Increase</div>
                    <div className="text-3xl font-bold text-white">+25%</div>
                    <div className="text-xs text-white/70">Average</div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white text-sm font-semibold mb-4">Real-Time Performance</div>
                  <div className="flex items-end justify-between h-32 gap-2">
                    {[65, 80, 70, 90, 85, 95, 88, 92].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        className="flex-1 bg-gradient-to-t from-accent to-accent/50 rounded-t"
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                31+ Years
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-gold text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                Proven Results
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
