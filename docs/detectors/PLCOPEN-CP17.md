# PLCOPEN-CP17: Usage of parameters shall match their declaration mode

The way a parameter is used inside a POU body shall agree with how it was
declared: inputs are read, outputs are written, and `IN_OUT` parameters are
either read or written.

## Why is it bad?

A parameter's declaration mode is a contract between the POU and its callers.
Reading an output before it has been assigned, or writing to an input,
produces behaviour that depends on the runtime's parameter-passing strategy
— some implementations copy on entry, some pass by reference, some inline
the call. Code that "works" under one PLC vendor silently breaks under
another. Declaring a parameter you never use is also dead weight in the POU
interface and forces every caller to supply a value that has no effect.

The rule applies four checks per POU:

- Each `VAR_INPUT` parameter shall be read at least once.
- Each `VAR_INPUT` parameter shall not be written.
- Each `VAR_OUTPUT` parameter shall be written at least once.
- Each `VAR_IN_OUT` parameter shall be either read or written.

## Example

```iecst
FUNCTION_BLOCK Compute
  VAR_INPUT
    threshold : INT;            (* never read     — PLCOPEN-CP17 *)
    factor    : INT;            (* written below  — PLCOPEN-CP17 *)
  END_VAR
  VAR_OUTPUT
    status : INT;               (* never written  — PLCOPEN-CP17 *)
  END_VAR
  VAR_IN_OUT
    counter : INT;              (* never used     — PLCOPEN-CP17 *)
  END_VAR

  factor := factor + 1;
END_FUNCTION_BLOCK
```

Use instead:

```iecst
FUNCTION_BLOCK Compute
  VAR_INPUT
    threshold : INT;
    factor    : INT;
  END_VAR
  VAR_OUTPUT
    status : INT;
  END_VAR
  VAR_IN_OUT
    counter : INT;
  END_VAR

  IF factor > threshold THEN
    status := 1;
    counter := counter + 1;
  ELSE
    status := 0;
  END_IF;
END_FUNCTION_BLOCK
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
