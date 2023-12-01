"use client";

import styles from "./styles.module.css";
import { useState, useRef, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import Select from "../Select/Select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

export enum FormField {
  Address = "address",
  Arrival = "arrival",
  Departure = "departure",
  Guests = "guests",
}

interface Form {
  address: string;
  arrival: string;
  departure: string;
  guests: number;
}

export default function SearchPanel() {
  const [visible, setVisible] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const arrivalRef = useRef<HTMLInputElement | null>(null);
  const departureRef = useRef<HTMLInputElement | null>(null);
  const [screenWidth, setScreenWidth] = useState<number | undefined>();
  const [showMonths, setShowMonths] = useState(2);
  const [formData, setFormData] = useState<Form>({
    address: "",
    arrival: "Когда",
    departure: "Когда",
    guests: 2,
  });

  const arrivalDate = new Date();
  const currentDate = new Date();
  const nextDay: Date = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);
  const departureDate = nextDay;

  const handleSetForm = (value: string | number, field: FormField) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleClick = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target as Node) &&
      !departureRef.current?.contains(e.target as Node) &&
      !arrivalRef.current?.contains(e.target as Node)
    ) {
      setVisible(false);
    }
  };

  const getStringDate = (value: Date) => {
    const day = value.getDate();
    let month: string | number = value.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    return `${day}.${month}`;
  };

  const handlerSelect = (value: number) => {
    handleSetForm(value, FormField.Guests);
  };

  const handlerCalendarValue = (value: any) => {
    value.map((val: Date, index: number) => {
      let date: string;
      let field;
      if (val) {
        date = getStringDate(val);
        index == 0
          ? (field = FormField.Arrival)
          : (field = FormField.Departure);
        handleSetForm(date, field);
      }
    });
  };

  useEffect(() => {
    if (screenWidth && screenWidth < 670) {
      setShowMonths(1);
    }

    const flatpickrInput =
      document.querySelector<HTMLInputElement>(".flatpickr-input");
    if (flatpickrInput) {
      flatpickrInput.style.display = "none";
    }

    const closeCalendar = () => {
      if (!visible) return;

      window.addEventListener("click", (e) => handleClick(e));
      return () => {
        window.removeEventListener("click", (e) => handleClick(e));
      };
    };
    const handleResize = () => {
      setScreenWidth(window.screen.width);
    };
    const resizeScreen = () => {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };
    closeCalendar();
    setScreenWidth(window.screen.width);
    resizeScreen();
  }, [screenWidth, visible]);

  const inputsDate = (
    <>
      <label className={`${styles.label_arrival} ${styles.field_label}`}>
        <span className={styles.field_title}>Заезд</span>
        <div
          ref={arrivalRef}
          className={`${styles.field_arrival} ${styles.field}`}
          onClick={() => setVisible(!visible)}
        >
          {formData.arrival}
        </div>
      </label>
      <label className={`${styles.label_departure} ${styles.field_label}`}>
        <span className={styles.field_title}>Отъезд</span>
        <div
          ref={departureRef}
          className={`${styles.field_departure} ${styles.field}`}
          onClick={() => setVisible(!visible)}
        >
          {formData.departure}
        </div>
      </label>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <form className={styles.form_search}>
          <label className={`${styles.label_address} ${styles.field_label}`}>
            <span className={styles.field_title}>Город или адрес</span>
            <input
              className={`${styles.input_address} ${styles.field}`}
              type="text"
              placeholder="Куда едем"
              onChange={(e) => handleSetForm(e.target.value, FormField.Address)}
              value={formData.address}
            ></input>
          </label>
          {screenWidth && screenWidth <= 768 ? (
            <div className={styles.container_label}>{inputsDate}</div>
          ) : (
            inputsDate
          )}
          <Select value={formData.guests} onChange={handlerSelect} />
          <button className={styles.btn_submit} type="submit">
            <span className={styles.submit_icon}></span>
            <span className={styles.submit_title}>Поиск</span>
          </button>
        </form>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            className={styles.container_calendar}
            ref={calendarRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Flatpickr
              onChange={handlerCalendarValue}
              options={{
                mode: "range",
                defaultDate: [arrivalDate, departureDate],
                inline: true,
                showMonths: showMonths,
                dateFormat: "Y-m-d",
                enableTime: false,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
