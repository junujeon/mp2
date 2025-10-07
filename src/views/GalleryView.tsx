import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchNASA } from "../api/nasa";
import { NasaItem } from "../types";
import styles from "./GalleryView.module.css";

const categories = [
    "All",
    "Moon",
    "Mars",
    "Earth",
    "Jupiter",
    "Galaxy",
    "Astronaut",
    "Spacecraft",
    "Nebula",
    "Telescope",
];

export default function GalleryView() {
    const [selected, setSelected] = useState("All");
    const [images, setImages] = useState<NasaItem[]>([]);

    useEffect(() => {
        const query = selected === "All" ? "space" : selected;
        searchNASA(query).then(setImages);
    }, [selected]);

    return (
        <div className={styles.wrap}>
        <div className={styles.filters}>
            {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={selected === cat ? styles.active : styles.filter}
            >
                {cat}
            </button>
            ))}
        </div>

        <div className={styles.grid}>
            {images.map((item) => {
            const d = item.data[0];
            const img = item.links?.[0]?.href;
            if (!img) return null;
            return (
                <Link key={d.nasa_id} to={`/detail/${d.nasa_id}`}>
                <img src={img} alt={d.title} className={styles.thumb} />
                </Link>
            );
            })}
        </div>
        </div>
    );
}
