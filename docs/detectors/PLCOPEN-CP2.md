# PLCOPEN-CP2: All code shall be used in the application

Statements that can never execute reflect a logic mistake and should be
removed.

## Why is it bad?

Code that the program can never execute is dead weight: it inflates the binary,
adds maintenance burden, and almost always reflects a logic mistake the author
did not notice. A statement placed after `RETURN` was usually meant to run
before it; one placed after `EXIT` or `CONTINUE` was usually meant to run on
every iteration.

This rule walks the control-flow graph of every POU and reports code that
cannot be reached from its entry:

- statements after `RETURN`, at the top level or inside any branch;
- statements after `EXIT` or `CONTINUE` in the same loop body or branch.

A run of unreachable statements gets one warning, at its first statement.

The rule does not evaluate conditions, so a branch behind a condition that is
always false (`IF FALSE THEN`) is not reported. It does not report POUs that
are never called either.

## Example

```iecst
FUNCTION_BLOCK scanner
  VAR
    i : INT := 0;
    found : INT := 0;
    count : INT := 0;
  END_VAR
  FOR i := 1 TO 10 DO
    IF i = 5 THEN
      EXIT;
      found := i;          (* PLCOPEN-CP2 — after EXIT *)
    END_IF;
    CONTINUE;
    count := count + 1;    (* PLCOPEN-CP2 — after CONTINUE *)
  END_FOR;
  RETURN;
  found := 0;              (* PLCOPEN-CP2 — after RETURN *)
END_FUNCTION_BLOCK
```

Use instead:

```iecst
FUNCTION_BLOCK scanner
  VAR
    i : INT := 0;
    found : INT := 0;
    count : INT := 0;
  END_VAR
  found := 0;
  FOR i := 1 TO 10 DO
    IF i = 5 THEN
      found := i;
      EXIT;
    END_IF;
    count := count + 1;
  END_FOR;
END_FUNCTION_BLOCK
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
