'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const TextReveal = ({ children, className, delay = 0 }: TextRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const TextRevealCard = ({ children, className, delay = 0 }: TextRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn("p-4", className)}
    >
      {children}
    </motion.div>
  )
} 