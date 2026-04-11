# PLCOPEN-N9: Different element types should not bear the same name

A name used for one element kind (variable, POU or user-defined type) must
not also be used for a different element kind.

## Why is it bad?

Reusing a name across element kinds — for example a `VAR_GLOBAL` and a
`FUNCTION_BLOCK` that both call themselves `MyCalculation` — makes every
reference ambiguous to the reader. The compiler resolves the two at different
stages (declaration lookup vs. instantiation), which means the bug travels
far from the site that introduced it before anyone notices. Keeping the three
kinds disjoint costs nothing and avoids the whole class of confusion.

## Example

```iecst
CONFIGURATION config
  VAR_GLOBAL
    MyCalculation : REAL;       (* PLCOPEN-N9 *)
  END_VAR
  ...
END_CONFIGURATION

FUNCTION_BLOCK MyCalculation    (* PLCOPEN-N9 *)
  VAR
    value : REAL;
  END_VAR
END_FUNCTION_BLOCK
```

Use instead: rename either side so the global variable, the function block
and any type declarations all have distinct names.

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
