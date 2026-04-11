# PLCOPEN-N1: Avoid physical addresses

Hardcoded physical addresses should not appear in executable code.

## Why is it bad?

Hardwiring `%I0.0`, `%MW10.2.4.1` or any other directly represented variable in
the body of a POU makes the program fragile and unmaintainable. Whoever
reworks the PLC topology has to hunt every literal address through the code,
data flow analysis cannot follow the signal, and renaming the symbolic alias
is useless because the real users bypass it. Physical addresses belong in
`VAR` blocks via an `AT %...` clause; the body of the POU should only
reference the symbolic name.

## Example

```iecst
PROGRAM program0
  VAR
    head AT %MW10.2.4.1 : INT;
  END_VAR
  %MW10.2.4.1 := 42;   (* PLCOPEN-N1 *)
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR
    head AT %MW10.2.4.1 : INT;
  END_VAR
  head := 42;
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
