# POUs shall not call themselves directly or indirectly

**Rule ID**: `PLCOPEN-CP13`

Recursion is forbidden in IEC 61131-3 — rewrite as a loop.

## Why is it bad?

The IEC 61131-3 execution model has no call stack in the way a general-purpose
language does: function activation records live in statically-allocated
memory, sized at compile time. A recursive call would either run out of memory
in seconds or — worse — silently scribble over neighbouring variables. PLCOpen
forbids both direct and indirect recursion outright.

Any algorithm expressible as recursion can be expressed iteratively with an
explicit accumulator and a `FOR` or `WHILE` loop.

## Example

```iecst
FUNCTION Factorial : INT
  VAR_INPUT
    X : INT;
  END_VAR
  IF X > 1 THEN
    Factorial := Factorial(X - 1) * X;     (* PLCOPEN-CP13 *)
  ELSE
    Factorial := X;
  END_IF;
END_FUNCTION
```

Use instead:

```iecst
FUNCTION Factorial : INT
  VAR_INPUT
    X : INT;
  END_VAR
  VAR
    Acc : INT := 1;
    I   : INT;
  END_VAR
  FOR I := 2 TO X DO
    Acc := Acc * I;
  END_FOR;
  Factorial := Acc;
END_FUNCTION
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
