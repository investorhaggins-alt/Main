import { useMemo, useState } from "react";
import { api } from "../api.js";
import GlobeView from "./GlobeView.jsx";

function deriveAreaCodePreview(phone, areaCodes) {
  const digits = String(phone || "").replace(/\D/g, "");
  const tenDigits = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (tenDigits.length < 3) return null;
  const areaCode = tenDigits.slice(0, 3);
  const match = areaCodes[Number(areaCode)] || areaCodes[areaCode];
  return { areaCode, region: match ? match.region : "Unknown area code" };
}

export default function AddBrotherForm({ chapters, areaCodes, cityPoints, onSaved }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [chapterInput, setChapterInput] = useState("");
  const [newChapter, setNewChapter] = useState({ campus: "", city: "", state: "" });
  const [pickedPoint, setPickedPoint] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const matchedChapter = useMemo(
    () => chapters.find((c) => c.name.toLowerCase() === chapterInput.trim().toLowerCase()),
    [chapters, chapterInput]
  );
  const isNewChapter = chapterInput.trim().length > 0 && !matchedChapter;
  const areaCodePreview = deriveAreaCodePreview(phone, areaCodes);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !chapterInput.trim()) {
      setError("First name, last name, phone, and chapter are all required.");
      return;
    }

    setSaving(true);
    try {
      let chapterId = matchedChapter?.id;

      if (isNewChapter) {
        if (!newChapter.city.trim() || !newChapter.state.trim() || !pickedPoint) {
          setError("For a new chapter, set its city, state, and click the globe to mark its location.");
          setSaving(false);
          return;
        }
        const created = await api.createChapter({
          name: chapterInput.trim(),
          campus: newChapter.campus.trim() || null,
          city: newChapter.city.trim(),
          state: newChapter.state.trim().toUpperCase(),
          lat: pickedPoint.lat,
          lon: pickedPoint.lng,
        });
        chapterId = created.id;
      }

      await api.createBrother({ firstName, lastName, phone, chapterId });

      setFirstName("");
      setLastName("");
      setPhone("");
      setChapterInput("");
      setNewChapter({ campus: "", city: "", state: "" });
      setPickedPoint(null);
      onSaved?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add a Brother</h2>

      <div className="field-row">
        <label>
          First Name
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
      </div>

      <label>
        Phone Number
        <input
          placeholder="(404) 555-0123"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      {areaCodePreview && (
        <p className="hint">
          Area code <strong>{areaCodePreview.areaCode}</strong> — {areaCodePreview.region}
        </p>
      )}

      <label>
        Chapter
        <input
          list="chapter-options"
          placeholder="Start typing a chapter name..."
          value={chapterInput}
          onChange={(e) => setChapterInput(e.target.value)}
        />
        <datalist id="chapter-options">
          {chapters.map((c) => (
            <option key={c.id} value={c.name} />
          ))}
        </datalist>
      </label>

      {matchedChapter && (
        <div className="auto-filled">
          <p>Auto-filled from chapter:</p>
          <ul>
            {matchedChapter.campus && <li>Campus: {matchedChapter.campus}</li>}
            <li>City: {matchedChapter.city}</li>
            <li>State: {matchedChapter.state}</li>
          </ul>
        </div>
      )}

      {isNewChapter && (
        <div className="new-chapter-panel">
          <p>
            "<strong>{chapterInput}</strong>" isn't in the chapter list yet. Fill in its location and click
            the globe below to drop a pin for it.
          </p>
          <div className="field-row">
            <label>
              Campus (optional)
              <input
                value={newChapter.campus}
                onChange={(e) => setNewChapter((s) => ({ ...s, campus: e.target.value }))}
              />
            </label>
            <label>
              City
              <input
                value={newChapter.city}
                onChange={(e) => setNewChapter((s) => ({ ...s, city: e.target.value }))}
              />
            </label>
            <label>
              State
              <input
                maxLength={2}
                value={newChapter.state}
                onChange={(e) => setNewChapter((s) => ({ ...s, state: e.target.value }))}
              />
            </label>
          </div>
          <GlobeView
            cityPoints={cityPoints}
            pickMode
            pickedPoint={pickedPoint}
            onPick={setPickedPoint}
          />
          {pickedPoint && (
            <p className="hint">
              Pin set at {pickedPoint.lat.toFixed(2)}, {pickedPoint.lng.toFixed(2)}
            </p>
          )}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Brother"}
      </button>
    </form>
  );
}
