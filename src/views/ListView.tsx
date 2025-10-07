import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchNASA } from "../api/nasa";
import { NasaItem } from "../types";
import styles from "./ListView.module.css";

export default function ListView() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<NasaItem[]>([]);
    const [sortKey, setSortKey] = useState<"title" | "date">("title");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        if (query.length > 2) {
            searchNASA(query).then(setResults);
        } else {
            setResults([]);
        }
    }, [query]);

    const sortedResults = [...results].sort((a, b) => {
        const A = a.data[0];
        const B = b.data[0];
        let compare = 0;
        if (sortKey === "title") {
        compare = A.title.localeCompare(B.title);
        } else {
        compare =
            new Date(A.date_created || 0).getTime() -
            new Date(B.date_created || 0).getTime();
        }
        return sortOrder === "asc" ? compare : -compare;
    });

    return (
        <div className={styles.box}>
        <input
            className={styles.input}
            placeholder="Search for NASA images..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />

        <div className={styles.section}>
            <label>Sort by:</label>
            <select
            className={styles.select}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as "title" | "date")}
            >
            <option value="title">Title</option>
            <option value="date">Date</option>
            </select>
        </div>

        <div className={styles.radioGroup}>
            <label>
            <input
                type="radio"
                checked={sortOrder === "asc"}
                onChange={() => setSortOrder("asc")}
            />
            ascending
            </label>
            <label>
            <input
                type="radio"
                checked={sortOrder === "desc"}
                onChange={() => setSortOrder("desc")}
            />
            descending
            </label>
        </div>

        <ul className={styles.list}>
            {sortedResults.map((item) => {
            const d = item.data[0];
            return (
                <li key={d.nasa_id}>
                <Link to={`/detail/${d.nasa_id}`}>{d.title}</Link>
                </li>
            );
            })}
        </ul>
        </div>
    );
}
