import Image from "next/image";
import styles from "./page.module.css";
import { Client } from "@/components/core";

export default function Home() {
  return (
    <main className={styles.main}>
      <Client />
    </main>
  );
}
