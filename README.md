# Benchmark AI

**[Visit Benchmark AI](https://wantings.github.io/benchmark_ai/)**

Local preview: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

A website for exploring publisher-reported and third-party AI benchmark scores across model versions. Source links, evaluation settings, and large score differences remain visible.

## Run locally

From the repository folder, start:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory docs
```

Then open **http://127.0.0.1:8080/** in your browser. This address works only on the computer running the server. The GitHub repository is public. The website is hosted on GitHub Pages at the link above.

## Files and data

The website is in `docs/`. Curated datasets and source attribution are in `docs/extracted/`. Raw downloaded HTML, screenshots, full search logs, and local research files are excluded.

Third-party data includes Artificial Analysis public evaluations and Epoch AI data ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)). Original external sources retain their own attribution; see the website source library. Scores are historical snapshots, and highlighted differences are review signals rather than confirmed contradictions.


extracted/
├── benchmarks.json                 Combined publisher dataset
├── models.json                     Model catalog
├── benchmark-profiles.json         Benchmark descriptions and metadata
├── third-party-scores.json         Independent evaluation scores
├── third-party-comparability.json  Verified comparison rules
│
├── openai-*-benchmarks.json         Individual publisher reports
├── anthropic-*-benchmarks.json
├── google-*-benchmarks.json
├── deepseek-*-benchmarks.json
├── glm*-benchmarks.json
├── qwen*-benchmarks.json
│
├── *-source-text.txt               Text extracted from source documents
├── benchmark-description-*.json    Description research and coverage audits
├── qwen38-third-party-review.json  Historical model-specific review
│
├── web/                            Saved publisher/reference evidence
└── third-party/                    Saved evaluator evidence
