import styles from "./styles.module.css";
import { ceraPro } from "../fonts";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import Link from "next/link";
import { Metadata } from "next";
import Animate from "@/components/Animate/Animate";
import AnimateText from "@/components/AnimateText/animateText";

export const metadata: Metadata = {
  title: "Page2",
  description: "Вторая страница",
};

export default function Home() {
  const page = (
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
      <Link href={"/"} className={styles.link_btn}>
        Home
      </Link>
    </main>
  );
  return <Animate>{page}</Animate>;
}
