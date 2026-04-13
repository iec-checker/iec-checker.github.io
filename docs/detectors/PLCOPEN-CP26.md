# PLCOPEN-CP26: A global variable may be written only by one PROGRAM

When multiple PROGRAMs write the same global variable, the resulting value
depends on scheduling order, creating a race condition.

## Why is it bad?

In a multi-task PLC application, PROGRAMs execute on separate tasks whose
relative timing is controlled by the scheduler. If two PROGRAMs both write
to the same `VAR_GLOBAL` variable, the final value at any given moment
depends on which task ran last — a classic data race. The program may
behave correctly during commissioning but fail intermittently under load
or after a scheduler configuration change.

The PLCOpen guideline requires that each global variable has a single
"owner" PROGRAM responsible for writing it. Other PROGRAMs may read the
variable (via `VAR_EXTERNAL`) but must not assign to it.

## Example

```iecst
CONFIGURATION config
  VAR_GLOBAL SharedCounter : INT; END_VAR
  TASK t0(INTERVAL := T#20ms, PRIORITY := 0);
  PROGRAM inst0 WITH t0 : Program1;
END_CONFIGURATION

PROGRAM Program1
  VAR_EXTERNAL SharedCounter : INT; END_VAR
  SharedCounter := SharedCounter + 1;    (* ok — single writer *)
END_PROGRAM

PROGRAM Program2
  VAR_EXTERNAL SharedCounter : INT; END_VAR
  SharedCounter := 0;    (* PLCOPEN-CP26 — second writer *)
END_PROGRAM
```

Move the write into a single PROGRAM and expose the result via an output
or a different global:

```iecst
PROGRAM Program1
  VAR_EXTERNAL SharedCounter : INT; END_VAR
  SharedCounter := SharedCounter + 1;
END_PROGRAM

PROGRAM Program2
  VAR_EXTERNAL SharedCounter : INT; END_VAR
  VAR localCopy : INT; END_VAR
  localCopy := SharedCounter;    (* read-only — no violation *)
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
