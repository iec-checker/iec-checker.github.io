# Access to a member shall be by name

**Rule ID**: `PLCOPEN-CP1`

Direct addressing should not be used when a symbolic name exists.

## Why is it bad?

Directly addressing a memory location like `%I0.0` or `%MW12` when a symbolic
name has already been declared for it makes the code unmaintainable: the
symbolic name is lost at the use site, any rewiring of the underlying PLC
hardware requires hunting through the source for hardcoded addresses, and
static analysis tools cannot follow the data flow.

This rule fires when a directly-addressed location is *also* declared with a
symbolic name in a `VAR` block — the symbolic name should be used instead.

## Example

```iecst
PROGRAM program0
  VAR
    head AT %B0 : INT;
  END_VAR
  %B0 := 42;
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR
    head AT %B0 : INT;
  END_VAR
  head := 42;
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
