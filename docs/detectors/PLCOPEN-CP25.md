# PLCOPEN-CP25: Data type conversion should be explicit

Implicit casts between integer and floating-point types are forbidden.

## Why is it bad?

Implicit conversions between `INT` and `REAL` (or any other lossy pair) hide
precision loss and overflow at the assignment site. The author of `I := J`
where `I : INT` and `J : REAL` almost certainly did not consider that the
fractional part of `J` is being silently dropped.

PLCOpen mandates that every conversion between incompatible types be made
explicit through the standard library functions (`REAL_TO_INT`, `INT_TO_REAL`,
`DINT_TO_INT`, …). The explicit form documents the author's intent and gives
the reader a clear place to think about overflow and rounding behaviour.

## Example

```iecst
PROGRAM demo
  VAR
    I : INT  := 10;
    J : REAL := 0.55;
  END_VAR
  I := J;     (* PLCOPEN-CP25 — implicit REAL → INT *)
  J := I;     (* PLCOPEN-CP25 — implicit INT  → REAL *)
END_PROGRAM
```

Use instead:

```iecst
PROGRAM demo
  VAR
    I : INT  := 10;
    J : REAL := 0.55;
  END_VAR
  I := REAL_TO_INT(J);
  J := INT_TO_REAL(I);
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
