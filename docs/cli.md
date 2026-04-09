---
sidebar_position: 3
title: CLI Reference
slug: /cli
---

# CLI Reference

```
iec_checker [OPTIONS] PATHS...
```

iec-checker takes one or more paths to source files or directories. Directories are traversed recursively for files matching the input format's extension (`.st` for Structured Text, `.xml` for PLCOpen / SEL XML).

## Options

### `-i`, `--input-format INPUT_FORMAT`

Format of the input files. Default: `st`.

| Value    | Description                                              |
| -------- | -------------------------------------------------------- |
| `st`     | Structured Text source code (default)                    |
| `xml`    | PLCOpen XML                                              |
| `selxml` | Schweitzer Engineering Laboratories XML                  |

### `-o`, `--output-format OUTPUT_FORMAT`

Output format for warnings. Default: `plain`.

| Value   | Description                                    |
| ------- | ---------------------------------------------- |
| `plain` | Human-readable plain text (default)            |
| `json`  | Machine-readable JSON, suitable for CI tooling |

### `--list-checks`

Print the list of all available detectors and exit. Useful for discovering which checks are enabled and what rule IDs to expect in the output.

### `--no-color`

Disable colored output. Useful when piping iec-checker output to a file or into another tool that does not understand ANSI escape codes.

### `-d`, `--dump`

Create JSON dump files of every processed input. The dump contains the parsed IR (AST + CFGs + environments) and can be consumed by Python plugins or external tools.

Each input file `foo.st` produces `foo.st.dump.json`. With `-m` enabled, a single dump named `merged-input.st.dump.json` is created.

### `-m`, `--merge`

Merge all input files into a single file before running the checker. Useful when a project is split across several files that represent the same program.

> **Note:** Name collisions across merged files are forbidden.

### `-v`, `--verbose` / `-q`, `--quiet`

Show or suppress additional informational messages from the checker. Default: quiet.

### `-I`, `--interactive` / `--non-interactive`

Accept Structured Text from stdin in a REPL-style loop. Default: non-interactive.

### `PATHS`

Positional. One or more paths to source files or directories. Use `-` to read from stdin.

## Exit codes

| Code | Meaning                                                       |
| ---- | ------------------------------------------------------------- |
| `0`  | Analysis completed successfully (no parser errors)            |
| `1`  | Analysis failed (parser errors or invalid command-line input) |
| `127`| Input file not found                                          |

## Examples

Check every `.st` file in the demo directory:

```bash
bin/iec_checker test/st/*.st
```

Recursively scan a project directory:

```bash
bin/iec_checker src/
```

Emit JSON warnings for CI:

```bash
bin/iec_checker -o json src/ > warnings.json
```

Dump the IR for plugin consumption:

```bash
bin/iec_checker --dump foo.st
# produces foo.st.dump.json
```

Merge a multi-file project before analysis:

```bash
bin/iec_checker -m src/main.st src/lib.st src/utils.st
```

Analyze a PLCOpen XML export:

```bash
bin/iec_checker -i xml project.xml
```
