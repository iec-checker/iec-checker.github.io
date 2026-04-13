# PLCOPEN-L22: Loop variables should not be modified inside a FOR loop

Modifying the control variable of a `FOR` loop inside the loop body leads to
unpredictable iteration behavior.

## Why is it bad?

A `FOR` loop's contract is that the runtime controls the loop variable: it
initializes it, increments it by the step value, and checks it against the
bound on each iteration.  When the body rewrites the variable, the contract
breaks — the loop may skip iterations, overshoot the limit, or run forever.
Even if the intent is to "break out early," `EXIT` is the correct mechanism.

Modifying the counter also makes the code much harder to reason about for
reviewers, since the number of iterations is no longer apparent from the
`FOR … TO … BY …` header.

## Example

```iecst
PROGRAM program0
  VAR
    i : INT;
    WORDS : ARRAY[0..10] OF STRING;
  END_VAR

  FOR i := 0 TO 10 BY 2 DO
    IF WORDS[i] = 'Key' THEN
      i := 10;              (* PLCOPEN-L22 — modifying loop variable *)
    END_IF;
  END_FOR;
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR
    i : INT;
    WORDS : ARRAY[0..10] OF STRING;
  END_VAR

  FOR i := 0 TO 10 BY 2 DO
    IF WORDS[i] = 'Key' THEN
      EXIT;
    END_IF;
  END_FOR;
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
