# PLCOPEN-CP6: Avoid external variables in functions, function blocks and classes

Functions, function blocks and classes should not depend on global state via
`VAR_EXTERNAL`.

## Why is it bad?

`VAR_EXTERNAL` couples a function, function block or class to global state
defined elsewhere in the project. That hidden coupling defeats the entire
point of using POUs as reusable units: the same `FUNCTION_BLOCK` can no longer
be copy-pasted into another project, the call site can no longer reason about
inputs and outputs, and unit tests have to set up the global environment
before they can call the POU.

`PROGRAM` is exempt — programs are the top of the call hierarchy and the
natural place for shared state to live.

## Example

```iecst
FUNCTION demo : INT
  VAR_EXTERNAL
    x1 : INT;     (* PLCOPEN-CP6 *)
  END_VAR
  x1 := 42;
END_FUNCTION
```

Use instead:

```iecst
FUNCTION demo : INT
  VAR_INPUT
    x1 : INT;
  END_VAR
  demo := x1 + 42;
END_FUNCTION
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
