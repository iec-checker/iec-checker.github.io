# PLCOPEN-N2: Define type prefixes for variables

Variable names should start with a configurable type-based prefix (Hungarian
notation).

## Why is it bad?

Without a type prefix convention, the reader has to jump back to the
declaration block every time they meet a variable to remember whether it is
an `INT`, a `BOOL`, a `REAL` or something else. Adopting a short prefix per
elementary type — `i` for `INT`, `x` for `BOOL`, `r` for `REAL` — keeps the
reader in the flow at the point of use and surfaces accidental type mismatches
during code review.

## Configuration

This lint is opt-in. Enable it from `iec_checker.json`:

```json
{
  "detectors": { "enabled": ["PLCOPEN-N2"] },
  "naming_conventions": {
    "type_prefixes": { "INT": "i", "BOOL": "x", "REAL": "r" }
  }
}
```

Keys are elementary type names exactly as spelled in IEC 61131-3
(`INT`, `BOOL`, `REAL`, `DINT`, `SINT`, …). Only elementary-typed variables
are checked; derived / user-defined types are covered by PLCOPEN-N10.

## Example

```iecst
PROGRAM program0
  VAR
    iCounter : INT;
    Counter  : INT;    (* PLCOPEN-N2 — missing "i" prefix *)
    xReady   : BOOL;
    Ready    : BOOL;   (* PLCOPEN-N2 — missing "x" prefix *)
  END_VAR
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR
    iCounter : INT;
    iResult  : INT;
    xReady   : BOOL;
    xDone    : BOOL;
  END_VAR
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
