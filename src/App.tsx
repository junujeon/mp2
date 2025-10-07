import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import ListView from "./views/ListView";
import GalleryView from "./views/GalleryView";
import DetailView from "./views/DetailView";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/detail/:nasaId" element={<DetailView />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}
