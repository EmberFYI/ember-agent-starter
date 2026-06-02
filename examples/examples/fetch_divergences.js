// Ember Agent Starter — fetch audited divergences (JavaScript)
// Ember publishes informational, audited AI calls with a public track record.
// Not trading advice. Use as a reference input, not a trade trigger.

const EMBER_API_BASE = process.env.EMBER_API_BASE || "https://api.emberfyi.com/v1";
const EMBER_API_KEY = process.env.EMBER_API_KEY;

async function getDivergences({ minDelta = 15, limit = 10, includeClob = true } = {}) {
  const params = new URLSearchParams({
    min_delta: String(minDelta),
    limit: String(limit),
  });
  if (includeClob) params.set("include", "clob");

  const res = await fetch(`${EMBER_API_BASE}/divergences?${params}`, {
    headers: { Authorization: `Bearer ${EMBER_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Ember API ${res.status}`);

  const { data } = await res.json();
  return data;
}

// Each row carries the audited primary call (ember_probability = Claude),
// the crowd (polymarket_probability), the gap (delta), the per-model breakdown,
// and optional order-book context. Crowd firmness uses Polymarket's own cutoff:
// a spread wider than 0.10 is where Polymarket itself stops trusting the midpoint.
function crowdFirmness(row) {
  if (row.clob_status !== "ok" || row.clob_spread == null) return "crowd firmness unknown";
  return row.clob_spread > 0.10 ? "THIN crowd (wide spread)" : "FIRM crowd (tight spread)";
}

getDivergences()
  .then((rows) => {
    for (const r of rows) {
      console.log(r.question);
      console.log(`  audited call: ${r.ember_probability}%   crowd: ${r.polymarket_probability}%   Δ${r.delta}`);
      console.log(`  ${crowdFirmness(r)}`);
    }
  })
  .catch((err) => console.error("Ember fetch failed:", err.message));
