import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ children, active, setActive }: Props) => {
  const [confirmDocument, setDocument] = useState<Document>();

  const child = (
    <div
      className={
        active
          ? `${styles.modal_container} ${styles.active}`
          : styles.modal_container
      }
    >
      <div className={styles.modal_wrapper}>
        <div className={styles.modal_content_wrapper}>
          <div className={styles.modal_btn_wrapper}>
            <button
              className={styles.modal_btn_close}
              onClick={() => {
                if (typeof window !== "undefined") {
                  document.body.style.overflow = "auto";
                  setActive(false);
                }
              }}
            ></button>
          </div>

          <div className={styles.modal_content}>{children}</div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    setDocument(document);
    if (!active) {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, [active, children, setActive]);

  return confirmDocument && createPortal(child, confirmDocument.body);
};

export default Popup;
