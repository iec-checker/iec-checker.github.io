# Define the names to avoid

**Rule ID**: `PLCOPEN-N3`

Variable names must not collide with IEC 61131-3 keywords or standard library
identifiers.

## Why is it bad?

Naming a variable `TON`, `TOF`, `REAL`, `BOOL` or any other reserved word
shadows the standard library and confuses every reader of the code —
including syntax-highlighting editors that will colour the variable as a
keyword. Some parsers will even reject the program; others will silently bind
the identifier to the user's variable, breaking any standard library function
that the same POU also wants to call.

This rule walks every variable declaration and rejects names that match an
IEC 61131-3 reserved word.

## Example

```iecst
PROGRAM program0
  VAR
    TOF : INT;     (* PLCOPEN-N3 — collides with the off-delay timer *)
  END_VAR
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR
    timeout_off : INT;
  END_VAR
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
