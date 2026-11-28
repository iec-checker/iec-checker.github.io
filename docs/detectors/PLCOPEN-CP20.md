# PLCOPEN-CP20: Function block instances should be called only once

A function block instance called twice in one PLC cycle keeps only the effect
of the last call, so its outputs depend on the order of statements.

## Why is it bad?

A function block instance carries state: a timer's elapsed time, a counter's
value, an edge detector's previous input. Every call updates that state and
the outputs. When the same instance is called twice in one cycle, the second
call overrides the first. An edge detector called with two different inputs
misses edges, a counter counts once instead of twice, and a timer "reset" by a
second call with `IN := FALSE` restarts in the same cycle it was read. Code
that reads the outputs between the two calls and code that reads them after
see different values.

This rule fires on every call of an instance that can run after an earlier
call of the same instance in the same cycle. Calls that cannot both run are
not reported:

- calls in different branches of one `IF`/`ELSIF`/`ELSE` or in different
  `CASE` selections;
- a call in a branch that ends with `RETURN`, followed by a call after that
  branch.

A single call inside a `FOR`, `WHILE` or `REPEAT` loop is not reported, and
neither are calls of the same global instance from different POUs.

## Example

```iecst
PROGRAM demo
  VAR
    edge : R_TRIG;
    pulse : TP;
    start : BOOL := FALSE;
    stop : BOOL := FALSE;
  END_VAR
  edge(CLK := start);
  edge(CLK := stop);              (* PLCOPEN-CP20 *)

  pulse(IN := start, PT := T#1s);
  IF pulse.Q THEN
    pulse(IN := FALSE);           (* PLCOPEN-CP20 *)
  END_IF;
END_PROGRAM
```

Use instead: one instance per input, and one call per instance with the input
it needs in this cycle:

```iecst
PROGRAM demo
  VAR
    startEdge : R_TRIG;
    stopEdge : R_TRIG;
    pulse : TP;
    start : BOOL := FALSE;
    stop : BOOL := FALSE;
  END_VAR
  startEdge(CLK := start);
  stopEdge(CLK := stop);
  pulse(IN := start AND NOT stop, PT := T#1s);
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
