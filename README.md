# Ember Agent Starter

Audited, locked, publicly-scored AI calls on live Polymarket markets — as a reference layer for your agent or research pipeline.

Ember runs three frontier models (Claude, Grok, Gemini) against live Polymarket markets every day. Every call is locked before resolution, Brier-scored against the crowd, and written to a permanent public record. No edits, ever.

This starter shows how to pull Ember's signal into an agent in a few minutes.

**What Ember is:** a transparent measurement layer — independent AI calls with a public accuracy record you can audit before you trust them.

**What Ember is not:** trading advice, a trade trigger, or a claim to beat the market. It is not a source of edge. (The models are currently *behind* the crowd — see "The record" below. The point isn't that the models win; it's that every call is scored in the open.)

## Why use it

- **Auditable, not black-box.** Every probability is timestamped, locked, and scored. You can see exactly how the signal has performed before you weight it.
- **Independent second opinion.** Three models reason separately from six data sources. When they split, that's surfaced, not hidden.
- **Order-book context.** Optional CLOB enrichment (midpoint/spread) tells you whether the crowd's price is firm or thin.
- **A record you can point to.** Corrections are public. Predictions are never edited. The scoreboard is live.

## The record — read this before you weight the signal

As of today, the models are behind the crowd on Brier score. Ember is not a source of edge; it is a source of audited, independent calls with a published track record. Treat it as one transparent input among many, and check the live scoreboard to decide how much weight it deserves:

→ https://emberfyi.com/scoreboard

This is the differentiator. Most signal sources ask you to trust a number with no track record. Ember hands you the number *and* its public score, including when it's wrong.

## Quickstart

Set two environment variables:

```bash
export EMBER_API_KEY="your_key"          # from https://emberfyi.com/api
export EMBER_API_BASE="https://api.emberfyi.com/v1"   # confirm the current base in the API docs
```

Then run an example:

```bash
node examples/fetch_divergences.js
# or
python examples/fetch_divergences.py
```

## Endpoints

- `GET /v1/divergences` — markets where the audited model call diverges from the crowd.
  Params: `min_delta` (point gap), `limit`, `include=clob`.
- `GET /v1/calls` — the day's calls with model reasoning.
  Param: `include=clob`.

> Field names below are illustrative. Confirm them against the live docs at https://emberfyi.com/api before you ship — the API surface is mid-migration this week.

Key fields:

| field | meaning |
| --- | --- |
| `ember_probability` | the **audited primary call** (Claude) — the number with a public Brier record |
| `polymarket_probability` | the crowd probability |
| `delta` | divergence between the audited call and the crowd |
| per-model probabilities | Claude / Grok / Gemini, shown individually |
| `clob_spread` / `clob_midpoint` / `clob_status` | order-book context (with `include=clob`; can be null — handle gracefully) |
| `locked_at` | when the call was locked, before resolution |
| `resolution_date` / `outcome` | for resolved markets |

**On the headline number:** key your logic on `ember_probability` (the audited call) and the per-model breakdown. There is also a 3-model average field — it is display-only and unaudited, produces values no single model holds, and should not drive agent logic. Don't use it.

## Using it in an agent

Feed Ember to your agent as one transparent, scored reference — never as an instruction to buy or sell. See [`examples/agent_integration.md`](examples/agent_integration.md) for the prompt framing.

## Rate limits and best practices

- Calls update daily after the 7:00 ET lock. Poll on your own cadence; the locked call does not change intraday, so cache within the day.
- `include=clob` adds order-book context. It can be null on a given market — handle the null case, never block on it.
- Use `delta` and spread together: a large gap on a FIRM (tight-spread) market is a more interesting disagreement to investigate than the same gap on a THIN one.

## Not investment advice

Ember publishes informational signals and an audited record. Nothing here is a recommendation to buy, sell, or trade any position. You and your agent are responsible for your own decisions.

## Build with us

Building an agent or product on Ember? First integrations get a free Team tier while we learn what you need. Reach out via [@emberfyi](https://x.com/emberfyi) or the partnership link at https://emberfyi.com.
