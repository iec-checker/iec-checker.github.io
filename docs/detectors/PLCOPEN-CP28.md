# Time and physical measures comparisons shall not be equality or inequality

**Rule ID**: `PLCOPEN-CP28`

Use range comparisons instead of `=` / `<>` when comparing `TIME` values.

## Why is it bad?

`TIME` values come from PLC scan-cycle counters, network timestamps and
operator inputs — sources where the exact value almost never lands on a
precise literal like `T#100MS`. Comparing for equality means the `TRUE` branch
fires only when the cycle happens to land on that exact tick, which on a real
PLC is roughly never.

The fix is to use a range comparison (`>=` / `<=` / `<` / `>`) that captures
the *intent* ("after 100 ms have elapsed") instead of an exact match.

## Example

```iecst
PROGRAM demo
  VAR x : TIME; END_VAR
  IF x = T#100MS THEN          (* PLCOPEN-CP28 *)
    x := x + 1;
  END_IF;
  IF x <> T#100MS THEN         (* PLCOPEN-CP28 *)
    x := x + 1;
  END_IF;
END_PROGRAM
```

Use instead:

```iecst
PROGRAM demo
  VAR x : TIME; END_VAR
  IF x >= T#100MS THEN
    x := x + 1;
  END_IF;
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
