# PLCOPEN-L10: Usage of CONTINUE and EXIT instructions should be avoided

Loop bodies should fall through naturally instead of using `CONTINUE` / `EXIT`.

## Why is it bad?

`CONTINUE` and `EXIT` hide the loop's exit condition from the loop header.
A reader of the `FOR` line cannot tell how many iterations will actually run
without scanning the entire body for early-exit statements. This is the
structured-programming argument against `goto`, applied to loops.

Refactor the loop so the termination condition lives in the `FOR`/`WHILE`
header, or extract the loop body into a function and `RETURN` from it.

## Example

```iecst
FOR i := 0 TO 10 DO
  FOR j := 10 TO 100 BY 2 DO
    IF flag THEN
      EXIT;       (* PLCOPEN-L10 *)
    END_IF;
    counter := counter + 1;
    IF j = 10 THEN
      CONTINUE;   (* PLCOPEN-L10 *)
    END_IF;
  END_FOR;
END_FOR;
```

Use instead:

```iecst
FOR i := 0 TO 10 DO
  done := flag;
  FOR j := 10 TO 100 BY 2 DO
    IF NOT done AND j <> 10 THEN
      counter := counter + 1;
    END_IF;
  END_FOR;
END_FOR;
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
