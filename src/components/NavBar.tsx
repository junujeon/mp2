import { Link, useLocation } from "react-router-dom";
import styles from "./AppLayout.module.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>NASA Image Directory</h1>
      <nav className={styles.nav}>
        <Link
          to="/list"
          className={
            location.pathname.includes("/list") ? styles.active : styles.link
          }
        >
          Search
        </Link>
        <Link
          to="/gallery"
          className={
            location.pathname.includes("/gallery") ? styles.active : styles.link
          }
        >
          Gallery
        </Link>
      </nav>
    </header>
  );
}
