# Benchmark AI — publisher data

**[Visit Benchmark AI](https://wantings.github.io/benchmark_ai/)**

Official publisher benchmark evidence for 2024–2026, with release counts, company score rankings, original evaluation settings, and source links. The Claude reference dataset and Evidence selector have been removed.

## This branch

The `data` branch contains only the static website and its required data files in `docs/`. Raw reports, downloaded HTML/PDFs, screenshots, research scripts, private workspace files and third-party review datasets are excluded.

GitHub Pages deploys this website from the `data` branch, folder `/docs`. Future pushes to this branch trigger a website deployment.

## Data files used by the website

The local publisher dashboard and this branch use the same dataset. Verified November 13, 2026.

| Local research workspace | File on this branch | Purpose |
| --- | --- | --- |
| `distribution-data.js` | [`docs/distribution-data.js`](docs/distribution-data.js) | The dataset loaded by the browser as `window.DISTRIBUTION_DATA`. Drives release counts, score ranks, release details and pending-evidence windows. |
| `extracted/publisher-distribution.json` | [`docs/extracted/publisher-distribution.json`](docs/extracted/publisher-distribution.json) | Downloadable JSON copy of the same dataset. Used by the website’s Download evidence link. |
| `extracted/historical-date-audit.csv` | [`docs/extracted/historical-date-audit.csv`](docs/extracted/historical-date-audit.csv) | Supporting audit of historical model/report dates. Used by Download date audit. |

The two dataset files contain the same underlying object. Their fields are:

- `releases`: 152 release/report groups in the 2026 cohort, containing **4,301 publisher result rows**. Some groups have no linked results. These are not 152 independently verified official release dates.
- `historical_releases`: 61 historical evidence groups for the 2024–2025 views, containing **2,056 publisher result rows**. The displayed year depends on the chosen model-date or report-date filter.
- `review_items`: 52 company/benchmark family pairs awaiting inclusion review. These are review targets, not verified scores or confirmed missing reports.
- `captured`: retained cohort metadata. Individual source captures and report dates can differ; this is not a claim that every source was checked on that date.

A result row can represent a specific model, effort setting, metric or source snapshot. Row totals are not counts of unique benchmarks or unique model releases. Original report URLs and settings remain attached to results.

The Claude reference matrices, evaluation-score records, comparison records and Evidence selector are absent from this website bundle. Publisher model names such as Claude remain because Anthropic is one of the developers covered.

## Website files pushed to GitHub

All paths below are on the **[`data` branch](https://github.com/wantings/benchmark_ai/tree/data)**. GitHub Pages publishes `docs/`.

| Files | Role |
| --- | --- |
| [`docs/index.html`](docs/index.html), [`docs/distribution.html`](docs/distribution.html) | Website entry pages. Both open the publisher dashboard. |
| [`docs/distribution.js`](docs/distribution.js) | Views, year/name/search filters, release-count grid, score grid and evidence dialogs. |
| [`docs/distribution.css`](docs/distribution.css) | Website layout, colors and floating evidence windows. |
| [`docs/distribution-data.js`](docs/distribution-data.js) | Browser dataset described above. |
| [`docs/benchmark-identity.js`](docs/benchmark-identity.js) | Benchmark spelling aliases and reporting-family identities. |
| [`docs/distribution-scores.js`](docs/distribution-scores.js) | Company maxima, eligible-score parsing, rank direction and ties. |
| [`docs/distribution-markers.js`](docs/distribution-markers.js) | Missing-data markers: NM, NR, ? and unreadable-score indicators. |
| [`docs/evidence-review.js`](docs/evidence-review.js) | Finds related saved publisher results for ? windows without automatically approving their inclusion. |
| [`docs/extracted/publisher-distribution.json`](docs/extracted/publisher-distribution.json), [`docs/extracted/historical-date-audit.csv`](docs/extracted/historical-date-audit.csv) | Required dataset and date-audit downloads. |
| `docs/.nojekyll` | Serves the static files without Jekyll processing. |
| `README.md`, `.gitignore` | Repository documentation and upload exclusions. |

## Research files that stayed local

The research workspace also has the broader source collection, including `extracted/benchmarks.json`, `extracted/models.json`, raw downloaded reports, extraction scripts, archived comparison snapshots and screenshots. Those are **not loaded by this dashboard and were not included in the new website bundle**. Older repository commits can still contain the previous website files.

The separate review workbook, `outputs/evidence-review-20261112/benchmark-evidence-review.xlsx`, also stayed local. It is not a live website input; its decisions do not automatically change the dataset. Its reference-comparison content was not uploaded with the publisher-only site.

This branch is a static publication bundle, not the complete extraction pipeline. The older local build scripts can regenerate comparison artifacts; their output must be converted back to publisher-only form before replacing these published data files.

## Run locally

```sh
python3 -m http.server 8081 --bind 127.0.0.1 --directory docs
```

Open [http://127.0.0.1:8081/](http://127.0.0.1:8081/). No build or dependencies are required.

## Data and interpretation

Use Download evidence on the website for the publisher JSON dataset. Source links point to official publisher reports and model cards. Model revisions, effort levels, benchmark versions and original score formats remain distinct. Percentage rankings and the specifically confirmed DeepSeek SWE aliases retain their original displayed units. Other score formats remain visible without an inferred rank.

Reporting counts describe the collected dataset. Missing evidence is not zero. Question marks open related saved publisher results awaiting inclusion review. Some 2026 cohort dates remain unverified locally; they are not verified official release dates. Historical report dates, model dates and capture dates remain separate.

Original publishers retain attribution for their reports and scores.
