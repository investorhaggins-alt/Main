import { useMemo, useState } from "react";
import { api } from "../api.js";

export default function BrotherList({ brothers, onChanged }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brothers;
    return brothers.filter((b) =>
      [b.first_name, b.last_name, b.chapter_name, b.campus, b.city, b.state, b.phone]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [brothers, query]);

  async function remove(id, name) {
    if (!confirm(`Remove ${name}?`)) return;
    await api.deleteBrother(id);
    onChanged();
  }

  return (
    <div className="brother-table-wrap">
      <input
        className="search"
        placeholder="Search by name, chapter, campus, city, state, phone..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="brother-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Chapter</th>
            <th>Campus</th>
            <th>City</th>
            <th>State</th>
            <th>Phone</th>
            <th>Area Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b) => (
            <tr key={b.id}>
              <td>
                {b.first_name} {b.last_name}
              </td>
              <td>{b.chapter_name}</td>
              <td>{b.campus || "—"}</td>
              <td>{b.city}</td>
              <td>{b.state}</td>
              <td>{b.phone}</td>
              <td>{b.area_code_region || "Unknown"}</td>
              <td>
                <button className="danger" onClick={() => remove(b.id, `${b.first_name} ${b.last_name}`)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={8} className="muted">
                No brothers match that search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
