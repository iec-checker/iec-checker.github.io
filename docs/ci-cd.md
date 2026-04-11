---
sidebar_position: 5
title: CI/CD Integration
slug: /ci-cd
---

# CI/CD Integration

iec-checker is built to plug straight into automated pipelines: it has a stable CLI, machine-readable JSON output, and meaningful exit codes (`0` clean, `1` failure).

## GitHub Actions

A minimal workflow that downloads the latest Linux binary, runs the checker on the project, and fails the job on any error:

```yaml
name: iec-checker

on:
  push:
    branches: [master]
  pull_request:

jobs:
  static-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install iec-checker
        run: |
          curl -sSL -o iec_checker.tar.gz \
            https://github.com/iec-checker/iec-checker/releases/latest/download/iec-checker-linux-x86_64.tar.gz
          tar -xzf iec_checker.tar.gz
          chmod +x bin/iec_checker
          echo "$PWD/bin" >> $GITHUB_PATH

      - name: Run iec-checker
        run: iec_checker -o json src/ | tee warnings.json

      - name: Upload warnings as artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: iec-checker-warnings
          path: warnings.json
```

> **Heads up:** Adjust the release archive name to match the asset published in the release you target. Check the [releases page](https://github.com/iec-checker/iec-checker/releases) for the exact filenames.

## GitLab CI

```yaml
static-analysis:
  image: ubuntu:24.04
  script:
    - apt-get update && apt-get install -y curl tar
    - curl -sSL -o iec_checker.tar.gz https://github.com/iec-checker/iec-checker/releases/latest/download/iec-checker-linux-x86_64.tar.gz
    - tar -xzf iec_checker.tar.gz
    - ./bin/iec_checker -o json src/ > warnings.json
  artifacts:
    when: always
    paths:
      - warnings.json
```

## Pre-commit hook

For local enforcement, drop iec-checker into a `pre-commit` hook so it runs against staged Structured Text files before every commit:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.st$')
if [ -n "$files" ]; then
  bin/iec_checker $files || exit 1
fi
```

## Tips

- Use `-o json` whenever the output is consumed by another tool — the plain format is for humans only.
- Combine with `-m` if your project is split across several Structured Text files that should be analyzed as one program.
- Save the JSON warnings as a CI artifact so reviewers can inspect them without re-running the checker locally.
