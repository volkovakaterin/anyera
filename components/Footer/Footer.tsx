import Link from "next/link";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.description}>
        <div className={styles.description_logo}></div>
        <div className={styles.description_content}>
          Аренда жилья и автомобилей от владельцев
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.info_social}>
          <Link
            href="#"
            className={`${styles.social_icon} ${styles.icon_wa}`}
          ></Link>
          <Link
            href="#"
            className={`${styles.social_icon} ${styles.icon_teleg}`}
          ></Link>
          <Link
            href="#"
            className={`${styles.social_icon} ${styles.icon_vk}`}
          ></Link>
          <Link
            href="#"
            className={`${styles.social_icon} ${styles.icon_email}`}
          ></Link>
        </div>
        <div className={styles.info_privacy_policy}>
          Политика конфеденциальности
        </div>
      </div>
    </footer>
  );
}
