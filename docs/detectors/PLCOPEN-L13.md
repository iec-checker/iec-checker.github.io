# PLCOPEN-L13: FOR loop variable should not be used outside the FOR loop

Referencing a `FOR` loop control variable after `END_FOR` relies on
implementation-defined behavior.

## Why is it bad?

The IEC 61131-3 standard does not guarantee the value of a `FOR` loop's
control variable after the loop terminates. Different PLC runtimes may leave
the variable at the last incremented value, at the bound, or at an undefined
value entirely. Code that reads the variable after `END_FOR` is therefore
non-portable and its behavior may silently change when switching vendors or
runtime versions.

If you need to know *where* the loop stopped (e.g. after an `EXIT`), copy
the value to a separate variable inside the loop body before exiting.

## Example

```iecst
PROGRAM program0
  VAR
    i : INT;
    WORDS : ARRAY[0..100] OF STRING;
    value : STRING;
  END_VAR

  FOR i := 0 TO 100 BY 2 DO
    IF WORDS[i] = 'Key' THEN EXIT; END_IF;
  END_FOR;

  IF i <= 100 THEN             (* PLCOPEN-L13 — i used outside FOR *)
    WORDS[i + 1] := value;
  END_IF;
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR
    i : INT;
    found_idx : INT := -1;
    WORDS : ARRAY[0..100] OF STRING;
    value : STRING;
  END_VAR

  FOR i := 0 TO 100 BY 2 DO
    IF WORDS[i] = 'Key' THEN
      found_idx := i;
      EXIT;
    END_IF;
  END_FOR;

  IF found_idx >= 0 THEN
    WORDS[found_idx + 1] := value;
  END_IF;
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
