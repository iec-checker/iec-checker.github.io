# PLCOPEN-CP8: Floating point comparison shall not be equality or inequality

Use a tolerance instead of `=` or `<>` when comparing `REAL` values.

## Why is it bad?

Floating-point arithmetic is approximate: the result of `0.1 + 0.2` is not
exactly `0.3`. Comparing two reals for equality almost never does what the
author intended — small rounding errors that accumulate through arithmetic
make `a = b` return `FALSE` when the values are mathematically equal.

The fix is to compare the absolute difference against a tolerance value
appropriate for the application.

## Example

```iecst
PROGRAM demo
  VAR x : REAL; END_VAR
  IF x = 0.0 THEN     (* PLCOPEN-CP8 *)
    x := x + 1;
  END_IF;
  IF x <> 0.0 THEN    (* PLCOPEN-CP8 *)
    x := x + 1;
  END_IF;
END_PROGRAM
```

Use instead:

```iecst
PROGRAM demo
  VAR
    x : REAL;
    epsilon : REAL := 1.0E-6;
  END_VAR
  IF ABS(x) < epsilon THEN
    x := x + 1;
  END_IF;
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
2. [The Floating-Point Guide — Comparison](https://floating-point-gui.de/errors/comparison/)
