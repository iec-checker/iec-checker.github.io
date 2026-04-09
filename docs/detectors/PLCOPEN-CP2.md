# All code shall be used in the application

**Rule ID**: `PLCOPEN-CP2`

Unreachable code reflects a logic mistake and should be removed.

## Why is it bad?

Code that the program can never execute is dead weight: it inflates the binary,
adds maintenance burden, and almost always reflects a logic mistake the author
did not notice. Statements that follow an unconditional `RETURN`, `EXIT` or
`CONTINUE` are unreachable and should be removed.

This rule walks the control-flow graph of every POU and reports basic blocks
that are not reachable from the entry block.

## Example

```iecst
FUNCTION dead_code_after_return : INT
  VAR
    counter : INT := 0;
    some_var : INT;
  END_VAR
  counter := counter + 1;
  RETURN;
  some_var := SQRT(16#42);  (* unreachable *)
END_FUNCTION
```

Use instead:

```iecst
FUNCTION live_code : INT
  VAR
    counter : INT := 0;
    some_var : INT;
  END_VAR
  counter := counter + 1;
  some_var := SQRT(16#42);
  RETURN;
END_FUNCTION
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
