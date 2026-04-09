# Each IF instruction should have an ELSE clause

**Rule ID**: `PLCOPEN-L17`

Every `IF` should explicitly handle the `ELSE` case.

## Why is it bad?

An `IF` without an `ELSE` silently does nothing when the condition is false.
That is sometimes intended, but more often the author simply forgot to think
about the negative branch. Forcing every `IF` to have an explicit `ELSE`
(even an empty one with a comment "nothing to do") makes the author commit
to a decision and gives the reviewer a chance to challenge it.

This rule is one of the cheapest ways to catch "I forgot to handle the
default case" bugs at code-review time.

## Example

```iecst
PROGRAM program0
  VAR a : INT; END_VAR

  IF (a = 42)        (* PLCOPEN-L17 — no ELSE *)
    THEN
      a := 0;
  END_IF;
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR a : INT; END_VAR

  IF (a = 42)
    THEN
      a := 0;
    ELSE
      a := 19;
  END_IF;
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
