import { motion } from 'motion/react'
import { pageTransition } from '../../../utils/animations'
import './PageTransition.css'

export default function PageTransition({ children }) {
  return (
    <motion.main
      className="page-transition"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      {children}
    </motion.main>
  )
}
