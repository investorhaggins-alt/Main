import { useState } from "react";
import { api } from "../api.js";

function BrotherRow({ brother, chapters, onChanged }) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(brother.first_name);
  const [lastName, setLastName] = useState(brother.last_name);
  const [phone, setPhone] = useState(brother.phone);
  const [chapterId, setChapterId] = useState(brother.chapter_id);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await api.updateBrother(brother.id, { firstName, lastName, phone, chapterId });
      setEditing(false);
      onChanged();
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Remove ${brother.first_name} ${brother.last_name}?`)) return;
    await api.deleteBrother(brother.id);
    onChanged();
  }

  if (!editing) {
    return (
      <li className="brother-row">
        <div>
          <strong>
            {brother.first_name} {brother.last_name}
          </strong>
          <div className="muted">{brother.chapter_name}</div>
          <div className="muted">
            {brother.phone} · {brother.area_code_region || "area code unknown"}
          </div>
        </div>
        <div className="row-actions">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={remove} className="danger">
            Remove
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="brother-row editing">
      <div className="field-row">
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      <select value={chapterId} onChange={(e) => setChapterId(Number(e.target.value))}>
        {chapters.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <div className="row-actions">
        <button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    </li>
  );
}

export default function CityDetailPanel({ point, brothers, chapters, onClose, onChanged }) {
  if (!point) return null;
  const cityBrothers = brothers.filter((b) => b.city === point.city && b.state === point.state);

  return (
    <div className="city-panel">
      <div className="city-panel-header">
        <h3>
          {point.city}, {point.state}
        </h3>
        <button onClick={onClose}>Close</button>
      </div>
      <p className="muted">
        {cityBrothers.length} brother{cityBrothers.length === 1 ? "" : "s"}
      </p>
      <ul className="brother-list">
        {cityBrothers.map((b) => (
          <BrotherRow key={b.id} brother={b} chapters={chapters} onChanged={onChanged} />
        ))}
      </ul>
    </div>
  );
}
