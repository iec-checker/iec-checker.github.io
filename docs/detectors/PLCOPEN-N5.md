# PLCOPEN-N5: Local names shall not shadow global names

A local variable declaration must not reuse a name that is already declared
at global scope.

## Why is it bad?

When a local variable in a POU has the exact same name as a `VAR_GLOBAL`
entry, every reader has to work out which one a statement touches — and every
maintainer risks picking the wrong one. The symptoms are quiet: the program
compiles and the wrong value simply propagates. Rename either side; the two
scopes should not fight over the name.

## Example

```iecst
CONFIGURATION config
  VAR_GLOBAL
    MyCalculation : REAL;
  END_VAR
  ...
END_CONFIGURATION

FUNCTION_BLOCK Example
  VAR
    MyCalculation : REAL;  (* PLCOPEN-N5 — shadows the global *)
  END_VAR
  MyCalculation := 0.0;
END_FUNCTION_BLOCK
```

Use instead:

```iecst
FUNCTION_BLOCK Example
  VAR
    localResult : REAL;
  END_VAR
  localResult := 0.0;
END_FUNCTION_BLOCK
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
