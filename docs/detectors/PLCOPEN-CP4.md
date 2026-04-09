# PLCOPEN-CP4: Direct addressing should not overlap

Two directly-addressed variables must not occupy overlapping memory.

## Why is it bad?

When two variables are mapped to the same or overlapping memory locations using
the `AT %...` syntax, a write to one will silently corrupt the other. This is
a classic source of "spooky action at a distance" bugs that are extremely hard
to trace because the offending write looks completely innocent at the call
site.

This rule walks every variable declaration that uses direct addressing and
flags any pair whose address ranges overlap, taking each variable's type size
into account.

## Example

```iecst
FUNCTION demo : INT
  VAR_INPUT
    x1 AT %MX40 : INT;   (* PLCOPEN-CP4 — overlaps x2 *)
    x2 AT %MX41 : INT;   (* PLCOPEN-CP4 — overlaps x1 *)
    x3 AT %MX510 : INT;
  END_VAR
END_FUNCTION
```

Use instead:

```iecst
FUNCTION demo : INT
  VAR_INPUT
    x1 AT %MX40 : INT;
    x2 AT %MX42 : INT;   (* enough space for x1's two bytes *)
    x3 AT %MX510 : INT;
  END_VAR
END_FUNCTION
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
