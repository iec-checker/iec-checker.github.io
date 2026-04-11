# PLCOPEN-N8: Define the acceptable character set

Identifiers must only contain ASCII letters, digits and underscores, and must
not start with a digit.

## Why is it bad?

IEC 61131-3 is an international standard but the identifier grammar is
intentionally narrow. Accented characters, non-Latin scripts and
digits-as-first-characters travel badly across editors, vendor IDEs, source
control and code review tools — they turn into mojibake, break grep and get
silently rewritten during import/export. Sticking to `[A-Za-z_][A-Za-z0-9_]*`
keeps every downstream tool honest.

## Example

```iecst
PROGRAM program0
  VAR
    départ : BOOL;    (* PLCOPEN-N8 — accented character *)
    3axis  : INT;     (* PLCOPEN-N8 — starts with a digit *)
    Depart : BOOL;    (* ok *)
  END_VAR
END_PROGRAM
```

The examples above would be rejected by the Structured Text lexer before
PLCOPEN-N8 gets a chance to look at them. The main use-case for this lint is
programs imported from PLCOpen XML or SEL XML, where identifiers go through a
different pipeline and non-ASCII names can slip in.

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
