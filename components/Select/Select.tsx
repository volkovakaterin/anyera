"use client";

import React, { FC, MouseEventHandler, useRef, useState } from "react";
import styles from "./styles.module.css";
import { AnimatePresence, motion } from "framer-motion";

interface SelectProps {
  onChange: (value: number) => void;
  value: number;
}

const Select: FC<SelectProps> = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const minusRef = useRef<HTMLButtonElement>(null);
  const plusRef = useRef<HTMLButtonElement>(null);
  const [counterValue, setCounterValue] = useState(value);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        !rootRef.current?.contains(e.target) &&
        !minusRef.current?.contains(e.target) &&
        !plusRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen(!isOpen);
  };

  const handlerChangeCounter = (operation: string) => {
    let newCounterValue;
    if (operation === "+") {
      newCounterValue = counterValue + 1;
    } else if (counterValue > 1) {
      newCounterValue = counterValue - 1;
    } else newCounterValue = 0;
    setCounterValue(newCounterValue);
    onChange(newCounterValue);
  };

  return (
    <div className={styles.selectWrapper}>
      <span className={styles.title}>Гостей</span>
      <div className={styles.fieldWrapper} ref={rootRef}>
        <div className={styles.placeholder} onClick={handlePlaceHolderClick}>
          {`${counterValue} гостей, без детей`}
        </div>
        <div className={styles.arrow} onClick={() => setIsOpen(!isOpen)}></div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.modal_select}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.wrapper_counter}>
              <button
                ref={minusRef}
                type="button"
                className={styles.btn_counter_minus}
                onClick={() => handlerChangeCounter("-")}
              >
                -
              </button>
              <div className={styles.value_counter}>{counterValue}</div>
              <button
                ref={plusRef}
                type="button"
                className={styles.btn_counter_plus}
                onClick={() => handlerChangeCounter("+")}
              >
                +
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
