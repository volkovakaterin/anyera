"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.css";

export default function AnimateText({
  children,
}: {
  children: React.ReactNode;
}) {
  const variants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.container_motion}
        initial="initial"
        animate="animate"
        variants={variants}
      >
        <motion.div>{children}</motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
