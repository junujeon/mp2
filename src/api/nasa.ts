import axios from "axios";
const BASE_URL = "https://images-api.nasa.gov";

export async function searchNASA(query: string) {
  const res = await axios.get(`${BASE_URL}/search`, {
    params: { q: query, media_type: "image" },
  });
  return res.data.collection.items;
}

export async function getNASAAsset(nasaId: string) {
  const res = await axios.get(`${BASE_URL}/asset/${nasaId}`);
  return res.data.collection.items;
}

