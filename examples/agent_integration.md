Using Ember in an agent
Ember is a reference layer, not a trade trigger. Feed it to your agent as one transparent, scored input — never as an instruction to buy or sell.
System-prompt block (reference framing)

The following are audited AI calls on live Polymarket markets. Each was locked before resolution and is Brier-scored against the crowd on a permanent public record, with no edits.
For each market you'll see: the audited model call (ember_probability), the crowd probability, the divergence (delta), and — when available — order-book context. A tight spread means the crowd's price is firm; a spread wider than 0.10 means it's thin and less reliable.
Treat these as one transparent reference among your own inputs, not as recommendations. The models' current public accuracy against the crowd is at https://emberfyi.com/scoreboard — they are presently behind the crowd, so weight them accordingly. Do not treat any call as advice to buy or sell.

What to key on

Use ember_probability (the audited primary call) and the per-model breakdown.
Do not key logic on the 3-model average field. It is display-only and unaudited, and produces values no individual model holds.
Read delta together with the spread: a large divergence on a FIRM (tight-spread) market is a more interesting disagreement to investigate than the same divergence on a THIN one.

What this is for
Surfacing where independent, audited AI reasoning disagrees with the crowd — as something your agent (or you) can investigate, with a public track record that tells you how seriously to take it. The value is the transparency and the score, not a promise of edge.
Not investment advice
Ember publishes informational signals and an audited record. Nothing here is a recommendation to buy, sell, or trade any position.
