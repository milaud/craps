import { Table } from "./components/Table/Table";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Table />
    </div>
  );
}
