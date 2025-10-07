import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNASAAsset, searchNASA } from "../api/nasa";
import { NasaItem } from "../types";
import styles from "./DetailView.module.css";

export default function DetailView() {
    const { nasaId } = useParams();
    const [item, setItem] = useState<NasaItem | null>(null);
    const [assets, setAssets] = useState<any[]>([]);
    const [related, setRelated] = useState<NasaItem[]>([]);

    // Load main item info
    useEffect(() => {
        async function fetchData() {
        if (!nasaId) return;
        const searchRes = await searchNASA(nasaId);
        setItem(searchRes[0]);
        const assetRes = await getNASAAsset(nasaId);
        setAssets(assetRes);
        }
        fetchData();
    }, [nasaId]);

    // Fetch related NASA images to use for prev/next
    useEffect(() => {
        if (item?.data[0].title) {
        const words = item.data[0].title.split(" ");
        searchNASA(words[0]).then(setRelated);
        }
    }, [item]);

    if (!item) return <p className={styles.loading}>Loading...</p>;
    const data = item.data[0];
    const image = assets[0]?.href || item.links?.[0]?.href;

    // handle prev/next navigation
    const currentIdx = related.findIndex(
        (r) => r.data[0].nasa_id === data.nasa_id
    );
    const prev =
        currentIdx > 0 ? related[currentIdx - 1] : related[related.length - 1];
    const next = related[(currentIdx + 1) % related.length];

    return (
        <div className={styles.box}>
        {/* Left arrow */}
        {related.length > 1 && prev && (
            <Link
            to={`/detail/${prev.data[0].nasa_id}`}
            className={`${styles.arrow} ${styles.left}`}
            >
            &lt;
            </Link>
        )}

        {/* Main content */}
        <div className={styles.content}>
            <div className={styles.left}>
            <img src={image} alt={data.title} className={styles.poster} />
            </div>

            <div className={styles.right}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.desc}>
                {data.description
                ? data.description
                : "No description available for this image."}
            </p>
            <div className={styles.meta}>
                <p>
                <strong>Date Created:</strong>{" "}
                {data.date_created
                    ? new Date(data.date_created).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                <strong>Center:</strong> {data.center || "N/A"}
                </p>
            </div>
            </div>
        </div>

        {/* Right arrow */}
        {related.length > 1 && next && (
            <Link
            to={`/detail/${next.data[0].nasa_id}`}
            className={`${styles.arrow} ${styles.right}`}
            >
            &gt;
            </Link>
        )}

        {/* Back links */}
        <div className={styles.links}>
            <Link to="/list">Back to Search</Link>
            <Link to="/gallery">Back to Gallery</Link>
        </div>
        </div>
    );
}
