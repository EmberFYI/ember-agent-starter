# Ember Agent Starter — fetch audited divergences (Python)
# Ember publishes informational, audited AI calls with a public track record.
# Not trading advice. Use as a reference input, not a trade trigger.

import os
import requests

EMBER_API_BASE = os.environ.get("EMBER_API_BASE", "https://api.emberfyi.com/v1")
EMBER_API_KEY = os.environ["EMBER_API_KEY"]


def get_divergences(min_delta: int = 15, limit: int = 10, include_clob: bool = True):
    params = {"min_delta": min_delta, "limit": limit}
    if include_clob:
        params["include"] = "clob"
    res = requests.get(
        f"{EMBER_API_BASE}/divergences",
        params=params,
        headers={"Authorization": f"Bearer {EMBER_API_KEY}"},
        timeout=10,
    )
    res.raise_for_status()
    return res.json()["data"]


def crowd_firmness(row: dict) -> str:
    # Polymarket's own cutoff: a spread wider than 0.10 is where it stops
    # trusting the midpoint. Tight spread = firm crowd; wide = thin/less reliable.
    if row.get("clob_status") != "ok" or row.get("clob_spread") is None:
        return "crowd firmness unknown"
    return "THIN crowd (wide spread)" if row["clob_spread"] > 0.10 else "FIRM crowd (tight spread)"


if __name__ == "__main__":
    for r in get_divergences():
        # ember_probability is the audited primary call (Claude) — the number with a public Brier record.
        print(r["question"])
        print(f"  audited call: {r['ember_probability']}%   crowd: {r['polymarket_probability']}%   Δ{r['delta']}")
        print(f"  {crowd_firmness(r)}")
