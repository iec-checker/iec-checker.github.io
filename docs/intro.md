---
sidebar_position: 1
title: Introduction
slug: /intro
---

# Introduction

**iec-checker** is an open-source static analyzer for [IEC 61131-3](https://en.wikipedia.org/wiki/IEC_61131-3) programs. It catches bugs and PLCOpen guideline violations in Structured Text before the program ever reaches the PLC.

It highlights potential issues and guideline violations in your code:

![iec-checker output](/img/output-screenshot.png)

## Supported languages and formats

iec-checker analyzes [Structured Text](https://en.wikipedia.org/wiki/Structured_text) with the language extensions accepted by the [matiec](https://github.com/sm1820/matiec) compiler.

Supported input formats:

- Plain ST source code
- [PLCOpen XML](https://plcopen.org/technical-activities/xml-exchange)
- [SEL XML](https://selinc.com/products/3530/) (Schweitzer Engineering Laboratories vendor format)

If iec-checker does not support Structured Text extensions from your PLC vendor, please [open an issue](https://github.com/iec-checker/iec-checker/issues/new) — adding new dialects is usually a small parser change.

Alternatively, if you're looking for support of more languages, new detectors, or your vendor's extensions as first-class citizens, you may consider [sponsor development](./funding.md).

## What it checks

iec-checker ships with **25 PLCOpen Guideline detectors** out of the box, covering naming, initialization, complexity, recursion, floating-point comparison, type conversion, and more.

It also performs declaration analysis for derived types, intraprocedural control-flow analysis to find unreachable code, and unused-variable detection.

See the [Detectors overview](./detectors.md) for the full list.

## Output

iec-checker emits warnings in either human-readable plain text or JSON for tool integration. It can also dump the parsed IR as JSON via `--dump`, which Python plugins can consume.

## Next steps

- [Install iec-checker](./installation.md)
- [Read the CLI reference](./cli.md)
- [Wire it into CI/CD](./ci-cd.md)
- [Browse the detectors](./detectors.md)
