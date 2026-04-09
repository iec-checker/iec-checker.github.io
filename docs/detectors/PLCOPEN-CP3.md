# PLCOPEN-CP3: Variables shall be initialized before being used

Every variable declaration should carry an explicit initializer.

## Why is it bad?

Reading from an uninitialized variable yields whatever value happened to be
sitting in the underlying memory cell at boot. On a PLC that means the program
behaviour depends on power-up state, EEPROM contents, or the previous program's
last write — all of which are non-deterministic and impossible to test for.

This rule fires on every **non-located** `VAR` declaration that has no
initializer. Located variables (`AT %...`) are exempt because the address
itself defines where the value comes from.

## Example

```iecst
FUNCTION demo : INT
  VAR_INPUT
    x1 : INT := 0;
    x2 : INT;                          (* PLCOPEN-CP3 — no initializer *)
    x3 : STRING[5];                    (* PLCOPEN-CP3 *)
    x5 : ARRAY [1..2, 1..3] OF INT;    (* PLCOPEN-CP3 *)
  END_VAR
END_FUNCTION
```

Use instead:

```iecst
FUNCTION demo : INT
  VAR_INPUT
    x1 : INT := 0;
    x2 : INT := 0;
    x3 : STRING[5] := '';
    x5 : ARRAY [1..2, 1..3] OF INT := [[0,0,0],[0,0,0]];
  END_VAR
END_FUNCTION
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
