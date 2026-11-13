# Benchmark AI — publisher data

**[Visit Benchmark AI](https://wantings.github.io/benchmark_ai/)**

Official publisher benchmark evidence for 2024–2026, with release counts, company score rankings, original evaluation settings, and source links. The Claude reference dataset and Evidence selector have been removed.

## This branch

The `data` branch contains only the static website and its required data files in `docs/`. Raw reports, downloaded HTML/PDFs, screenshots, research scripts, private workspace files and third-party review datasets are excluded.

GitHub Pages deploys this website from the `data` branch, folder `/docs`. Future pushes to this branch trigger a website deployment.

## Run locally

```sh
python3 -m http.server 8081 --bind 127.0.0.1 --directory docs
```

Open [http://127.0.0.1:8081/](http://127.0.0.1:8081/). No build or dependencies are required.

## Data and interpretation

Use Download evidence on the website for the publisher JSON dataset. Source links point to official publisher reports and model cards. Model revisions, effort levels, benchmark versions and original score formats remain distinct. Percentage rankings and the specifically confirmed DeepSeek SWE aliases retain their original displayed units. Other score formats remain visible without an inferred rank.

Reporting counts describe the collected dataset. Missing evidence is not zero. Question marks open related saved publisher results awaiting inclusion review. Some 2026 cohort dates remain unverified locally; they are not verified official release dates. Historical report dates, model dates and capture dates remain separate.

Original publishers retain attribution for their reports and scores.
