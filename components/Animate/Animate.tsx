"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export default function Animate({ children }: { children: React.ReactNode }) {
  const router = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router}
        className={styles.container_motion}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
