import React, { useState } from "react";
import styles from "./styles.module.css";
import { circe } from "@/app/fonts";

enum FormField {
  Login = "login",
  Password = "password",
  Remember = "remember",
}

enum TypeInput {
  TextInput = "text",
  PasswordInput = "password",
  CheckboxInput = "checkbox",
}

interface Form {
  login: string;
  password: string;
  remember: boolean;
}

export default function Auth() {
  const [formData, setFormData] = useState<Form>({
    login: "",
    password: "",
    remember: false,
  });

  const handleSetForm = (value: string | boolean, field: FormField) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2 className={`${styles.title_form} ${circe.variable}`}>Вход</h2>
          <div className={styles.container_field}>
            <div className={styles.container_login}>
              <input
                className={styles.field_login}
                type={TypeInput.TextInput}
                placeholder="Введите e-mail или телефон"
                required
                onChange={(e) => handleSetForm(e.target.value, FormField.Login)}
                value={formData.login}
              ></input>
              <span className={styles.input_btn}></span>
            </div>
            <div className={styles.container_password}>
              <input
                className={styles.field_password}
                type={TypeInput.PasswordInput}
                placeholder="Введите пароль"
                required
                value={formData.password}
                onChange={(e) =>
                  handleSetForm(e.target.value, FormField.Password)
                }
              ></input>
              <span className={styles.input_btn}></span>
            </div>
          </div>
          <div className={styles.container_options}>
            <label className={styles.label_remember}>
              <input
                type={TypeInput.CheckboxInput}
                className={styles.field_remember_real}
                checked={formData.remember}
                onChange={() => {
                  handleSetForm(!formData.remember, FormField.Remember);
                }}
              ></input>
              <span className={styles.field_remember_custom}></span>
              Запомнить меня
            </label>
            <button className={styles.forgot_password} type="button">
              Забыли пароль?
            </button>
          </div>

          <button className={styles.submit_btn} type="submit">
            Войти
          </button>
        </form>
        <div className={styles.container_registration}>
          <span className={styles.registration_text}>Нет аккаунта?</span>
          <button className={styles.registration_btn}>Регистация</button>
        </div>
      </div>
    </div>
  );
}
