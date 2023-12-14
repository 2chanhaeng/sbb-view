import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <a href="/questions">questions</a>
      <a href="/signup">signup</a>s
    </main>
  );
}
