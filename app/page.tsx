import styles from "./page.module.css";
import { ceraPro } from "./fonts";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import Link from "next/link";
import Animate from "@/components/Animate/Animate";
import AnimateText from "@/components/AnimateText/animateText";

export default function Home() {
  return (
    <Animate>
      <main className={styles.main}>
        <AnimateText>
          <h1 className={`${styles.title} ${ceraPro.variable}`}>
            <span className={styles.title_subtitle_one}>
              Ut enim ad minim veniam
            </span>
            <span className={styles.title_subtitle_two}>
              Duis aute irure dolor <br />
              in reprehenderit
            </span>
            <span className={styles.title_subtitle_three}>
              Duis aute irure dolor in reprehenderit
            </span>
          </h1>
        </AnimateText>
        <SearchPanel />
        <Link href={"/page2"} className={styles.link_btn}>
          Page2
        </Link>
      </main>
    </Animate>
  );
}
