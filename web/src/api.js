const BASE = "/api";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getChapters: () => request("/chapters"),
  createChapter: (chapter) => request("/chapters", { method: "POST", body: JSON.stringify(chapter) }),
  getAreaCodes: () => request("/areacodes"),
  getBrothers: () => request("/brothers"),
  createBrother: (brother) => request("/brothers", { method: "POST", body: JSON.stringify(brother) }),
  updateBrother: (id, brother) => request(`/brothers/${id}`, { method: "PUT", body: JSON.stringify(brother) }),
  deleteBrother: (id) => request(`/brothers/${id}`, { method: "DELETE" }),
};
