import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl ${className}`}
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, gradient, delay = 0 }) => {
  return (
    <FloatingCard delay={delay} className="p-8 h-full">
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${gradient}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>

        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h3>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </FloatingCard>
  );
};
