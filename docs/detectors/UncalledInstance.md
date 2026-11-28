# UncalledInstance: Function block instance is used but never called

Reports local function block instances whose inputs or outputs are used, but
which are never called in the POU. The warning is at the instance's declaration.

## Why is it bad?

A function block does its work only when its instance is called. Until then,
its outputs keep their initial values: a `TON` never sets `Q`, an `SR` never
latches, a counter stays at zero. Code that reads `timer.Q` or writes
`latch.S1` without ever calling the instance looks like working logic, but the
branch that waits for the output never runs. Usually the call was forgotten or
removed in a refactor.

This rule checks every `VAR` and `VAR_TEMP` instance of a standard function
block (`TON`, `SR`, `CTU`, `R_TRIG`, ...) or of a function block declared in
the checked files. An instance is not reported when it is passed whole to
another call, or taken with `REF()`, since the call may happen elsewhere.
`VAR_INPUT`, `VAR_IN_OUT` and `VAR_EXTERNAL` instances are not checked, and
neither are instances of function blocks from libraries the checker does not
see.

## Example

```iecst
PROGRAM filling
  VAR
    fillTimer : TON;          (* UncalledInstance — read below, never called *)
    valve : BOOL := FALSE;
    start : BOOL := FALSE;
  END_VAR
  valve := start;
  IF fillTimer.Q THEN
    valve := FALSE;
  END_IF;
END_PROGRAM
```

Use instead — call the instance every cycle, before its outputs are read:

```iecst
PROGRAM filling
  VAR
    fillTimer : TON;
    valve : BOOL := FALSE;
    start : BOOL := FALSE;
  END_VAR
  fillTimer(IN := start, PT := T#10s);
  valve := start AND NOT fillTimer.Q;
END_PROGRAM
```
