---
sidebar_position: 4
title: Configuration
slug: /configuration
---

# Configuration

iec-checker can be configured with a JSON file named `iec_checker.json`. When no configuration file is present, built-in defaults are used and the analyzer behaves identically to previous versions.

## Config file discovery

iec-checker looks for `iec_checker.json` starting from the current working directory and walking up to the filesystem root. The first file found wins. You can also pass an explicit path:

```bash
iec_checker --config path/to/iec_checker.json src/
```

## Generating a default config

```bash
iec_checker --generate-config
```

This writes `iec_checker.json` with all default values to the current directory. You can then edit the parts you need.

## Inspecting the effective config

```bash
iec_checker --dump-config
```

Prints the merged configuration (defaults + config file + CLI overrides) as JSON and exits. Useful for debugging.

## CLI precedence

When the same option is set in both the config file and on the command line, **CLI arguments always win**.

For example, if `iec_checker.json` sets `"format": "plain"` in the output section, but you run:

```bash
iec_checker -o json src/
```

The output will be JSON.

## Reference

### `detectors`

Control which checks run.

| Field      | Type       | Default | Description                                                                 |
| ---------- | ---------- | ------- | --------------------------------------------------------------------------- |
| `disabled` | `string[]` | `[]`    | Detector IDs to skip. All other detectors run normally.                     |
| `enabled`  | `string[]` | `[]`    | Detector IDs to run exclusively. Mutually exclusive with `disabled`.        |

Use `iec_checker --list-checks` to see all available detector IDs.

**Example** -- disable two checks:

```json
{
  "detectors": {
    "disabled": ["PLCOPEN-L17", "PLCOPEN-L10"]
  }
}
```

#### Available detector IDs

Registered detectors: `PLCOPEN-CP1`, `PLCOPEN-CP2`, `PLCOPEN-CP3`, `PLCOPEN-CP4`, `PLCOPEN-CP6`, `PLCOPEN-CP8`, `PLCOPEN-CP9`, `PLCOPEN-CP13`, `PLCOPEN-CP25`, `PLCOPEN-CP28`, `PLCOPEN-L10`, `PLCOPEN-L17`, `PLCOPEN-N1`, `PLCOPEN-N2`, `PLCOPEN-N3`, `PLCOPEN-N4`, `PLCOPEN-N5`, `PLCOPEN-N6`, `PLCOPEN-N8`, `PLCOPEN-N9`, `PLCOPEN-N10`.

Built-in analysis passes: `DeclarationAnalysis`, `UnusedVariable`, `UseDefine`.

### `thresholds`

Tune complexity and size limits.

| Field              | Type  | Default | Description                                         |
| ------------------ | ----- | ------- | --------------------------------------------------- |
| `mccabe_complexity`| `int` | `15`    | McCabe cyclomatic complexity threshold (PLCOPEN-CP9) |
| `statements_count` | `int` | `25`    | Maximum statements per POU (PLCOPEN-CP9)             |
| `max_string_length`| `int` | `4096`  | Maximum size of STRING / WSTRING data types          |

### `output`

| Field    | Type     | Default   | Description                         |
| -------- | -------- | --------- | ----------------------------------- |
| `format` | `string` | `"plain"` | Output format: `"plain"` or `"json"` |
| `color`  | `bool`   | `true`    | Enable ANSI colors in plain output  |

### `input`

| Field           | Type       | Default | Description                                                  |
| --------------- | ---------- | ------- | ------------------------------------------------------------ |
| `format`        | `string`   | `"st"`  | Input format: `"st"`, `"xml"`, or `"selxml"`                 |
| `merge`         | `bool`     | `false` | Merge all input files before analysis                        |
| `exclude_paths` | `string[]` | `[]`    | Glob patterns for files/directories to skip during traversal |

**Example** -- exclude test and vendor directories:

```json
{
  "input": {
    "exclude_paths": ["test/*", "vendor/*"]
  }
}
```

### `analysis`

| Field     | Type   | Default | Description                          |
| --------- | ------ | ------- | ------------------------------------ |
| `dump`    | `bool` | `false` | Create JSON dump files               |
| `verbose` | `bool` | `false` | Show additional informational output |

### `naming_conventions`

Configure the PLCOpen-N family of naming-convention detectors. Every field in this section is opt-in — an empty map, a `null` case style, or a zero length bound disables the corresponding check and leaves the detector a no-op.

| Field            | Type                | Default | Used by       | Description                                                                                                 |
| ---------------- | ------------------- | ------- | ------------- | ----------------------------------------------------------------------------------------------------------- |
| `type_prefixes`  | `{ string: string }`| `{}`    | `PLCOPEN-N2`  | Map from elementary IEC 61131-3 type name to required identifier prefix (e.g. `"INT": "i"`).                |
| `case`           | `object`            | `{}`    | `PLCOPEN-N4`  | Per-kind case style. See below.                                                                             |
| `min_length`     | `int`               | `0`     | `PLCOPEN-N6`  | Minimum identifier length. `0` disables the lower-bound check.                                              |
| `max_length`     | `int`               | `0`     | `PLCOPEN-N6`  | Maximum identifier length. `0` disables the upper-bound check.                                              |
| `udt_prefixes`   | `{ string: string }`| `{}`    | `PLCOPEN-N10` | Map from derived-type kind (`STRUCT`, `ENUM`, `ARRAY`, `SUBRANGE`, `REF`, `ALIAS`, `FUNCTION_BLOCK`) to required prefix. |

#### `case` sub-section

| Field      | Type             | Default | Description                                                                     |
| ---------- | ---------------- | ------- | ------------------------------------------------------------------------------- |
| `variable` | `string \| null` | `null`  | Required style for regular variable declarations (`VAR`, `VAR_INPUT`, etc.).    |
| `constant` | `string \| null` | `null`  | Required style for declarations with the `CONSTANT` qualifier.                  |
| `pou`      | `string \| null` | `null`  | Required style for function / function block / program / class / interface names. |
| `type`     | `string \| null` | `null`  | Required style for user-defined type names (entries inside `TYPE .. END_TYPE`). |

Recognized case styles:

- `"UpperCamelCase"` — e.g. `StartMotor`
- `"lowerCamelCase"` — e.g. `startMotor`
- `"UPPER_SNAKE_CASE"` — e.g. `MAX_SPEED`
- `"lower_snake_case"` — e.g. `max_speed`

Any other value (or a missing key) leaves the corresponding check off.

**Example** -- Hungarian prefixes, lower camel case for variables, upper snake case for constants, UDT prefixes by kind:

```json
{
  "detectors": {
    "enabled": ["PLCOPEN-N2", "PLCOPEN-N4", "PLCOPEN-N6", "PLCOPEN-N10"]
  },
  "naming_conventions": {
    "type_prefixes": { "INT": "i", "BOOL": "x", "REAL": "r" },
    "case": {
      "variable": "lowerCamelCase",
      "constant": "UPPER_SNAKE_CASE",
      "pou":      "UpperCamelCase",
      "type":     "UpperCamelCase"
    },
    "min_length": 3,
    "max_length": 25,
    "udt_prefixes": {
      "STRUCT":         "ST_",
      "ENUM":           "E_",
      "FUNCTION_BLOCK": "FB_"
    }
  }
}
```

`PLCOPEN-N1`, `PLCOPEN-N3`, `PLCOPEN-N5`, `PLCOPEN-N8` and `PLCOPEN-N9` do not read from this section — they are always on when enabled and have nothing to tune.

## Full example

```json
{
  "detectors": {
    "disabled": ["PLCOPEN-L17", "PLCOPEN-L10"]
  },
  "thresholds": {
    "mccabe_complexity": 20,
    "statements_count": 50
  },
  "input": {
    "exclude_paths": ["test/*"]
  },
  "naming_conventions": {
    "type_prefixes": { "INT": "i", "BOOL": "x", "REAL": "r" },
    "case": {
      "variable": "lowerCamelCase",
      "pou":      "UpperCamelCase"
    },
    "min_length": 3,
    "max_length": 25,
    "udt_prefixes": {
      "ENUM":           "E_",
      "FUNCTION_BLOCK": "FB_"
    }
  }
}
```

Only the fields you want to override need to be present. Everything else falls back to defaults.
