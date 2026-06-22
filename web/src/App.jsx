import { useEffect, useMemo, useState } from "react";
import { api } from "./api.js";
import GlobeView from "./components/GlobeView.jsx";
import AddBrotherForm from "./components/AddBrotherForm.jsx";
import BrotherList from "./components/BrotherList.jsx";
import CityDetailPanel from "./components/CityDetailPanel.jsx";

export default function App() {
  const [tab, setTab] = useState("globe");
  const [chapters, setChapters] = useState([]);
  const [areaCodes, setAreaCodes] = useState({});
  const [brothers, setBrothers] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [loadError, setLoadError] = useState("");

  async function refreshAll() {
    try {
      const [chaptersData, areaCodesData, brothersData] = await Promise.all([
        api.getChapters(),
        api.getAreaCodes(),
        api.getBrothers(),
      ]);
      setChapters(chaptersData);
      setAreaCodes(areaCodesData);
      setBrothers(brothersData);
    } catch (err) {
      setLoadError(err.message);
    }
  }

  useEffect(() => {
    refreshAll();
  }, []);

  const cityPoints = useMemo(() => {
    const byCity = new Map();
    for (const b of brothers) {
      const key = `${b.city}|${b.state}`;
      if (!byCity.has(key)) {
        byCity.set(key, { city: b.city, state: b.state, lat: b.lat, lng: b.lon, count: 0 });
      }
      byCity.get(key).count += 1;
    }
    return [...byCity.values()].map((p) => ({
      ...p,
      size: Math.min(0.4 + p.count * 0.15, 1.4),
      label: `${p.city}, ${p.state} — ${p.count} brother${p.count === 1 ? "" : "s"}`,
    }));
  }, [brothers]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Que Tracker</h1>
        <p className="subtitle">Brothers by chapter, campus, and city</p>
        <nav className="tabs">
          <button className={tab === "globe" ? "active" : ""} onClick={() => setTab("globe")}>
            Globe
          </button>
          <button className={tab === "add" ? "active" : ""} onClick={() => setTab("add")}>
            Add Brother
          </button>
          <button className={tab === "list" ? "active" : ""} onClick={() => setTab("list")}>
            All Brothers ({brothers.length})
          </button>
        </nav>
      </header>

      {loadError && <p className="error">Could not reach the server: {loadError}</p>}

      <main>
        {tab === "globe" && (
          <div className="globe-tab">
            <GlobeView cityPoints={cityPoints} onCityClick={setSelectedPoint} />
            <CityDetailPanel
              point={selectedPoint}
              brothers={brothers}
              chapters={chapters}
              onClose={() => setSelectedPoint(null)}
              onChanged={refreshAll}
            />
          </div>
        )}

        {tab === "add" && (
          <AddBrotherForm chapters={chapters} areaCodes={areaCodes} cityPoints={cityPoints} onSaved={refreshAll} />
        )}

        {tab === "list" && <BrotherList brothers={brothers} onChanged={refreshAll} />}
      </main>
    </div>
  );
}
