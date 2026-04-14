# UnusedVariable: Local variable is declared but never used

Reports local variables that are declared in a POU but never read or written
anywhere in its body.

## Why is it bad?

A local variable that is never used is dead weight: it reserves PLC memory,
clutters the variable table, and — most importantly — usually points at a real
bug. A typo in a variable reference, a refactor that removed the only use site,
or copy-pasted boilerplate from another POU all look exactly like an unused
variable from the outside.

This rule walks every `PROGRAM`, `FUNCTION`, and `FUNCTION_BLOCK` and reports
the names declared in their `VAR*` blocks that do not appear in any expression
inside the same POU.

## Example

```iecst
PROGRAM program0
  VAR
    counter : INT := 0;
    scratch : INT := 0;   (* UnusedVariable — never read or written *)
  END_VAR
  counter := counter + 1;
END_PROGRAM
```

Use instead — drop the dead variable, or wire it into the logic that needs it:

```iecst
PROGRAM program0
  VAR
    counter : INT := 0;
  END_VAR
  counter := counter + 1;
END_PROGRAM
```
