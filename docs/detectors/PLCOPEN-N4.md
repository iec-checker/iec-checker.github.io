# PLCOPEN-N4: Define the use of case (capitals)

Identifiers should follow a configurable naming convention per element kind.

## Why is it bad?

A project that mixes `StartMotor`, `start_motor` and `STARTMOTOR` for what
would be the same name loses one of the cheapest possible cues for telling
variables, constants, POUs and types apart. Agreeing on — and enforcing — one
case style per element kind makes code reviews faster and catches accidental
re-typing of the same name in a slightly different shape.

## Configuration

This lint is opt-in. Pick one of `UpperCamelCase`, `lowerCamelCase`,
`UPPER_SNAKE_CASE` or `lower_snake_case` for each kind you care about, then
list them in `iec_checker.json`:

```json
{
  "detectors": { "enabled": ["PLCOPEN-N4"] },
  "naming_conventions": {
    "case": {
      "variable": "lowerCamelCase",
      "constant": "UPPER_SNAKE_CASE",
      "pou":      "UpperCamelCase",
      "type":     "UpperCamelCase"
    }
  }
}
```

Any key you omit simply disables the check for that element kind. `variable`
applies to ordinary `VAR` / `VAR_INPUT` / `VAR_OUTPUT` entries; `constant`
applies to anything declared with the `CONSTANT` qualifier.

## Example

```iecst
FUNCTION StartMotor : BOOL         (* ok *)
END_FUNCTION

FUNCTION start_motor : BOOL        (* PLCOPEN-N4 — not UpperCamelCase *)
END_FUNCTION

PROGRAM program0
  VAR CONSTANT
    MAX_SPEED : INT := 100;        (* ok *)
    maxSpeed  : INT := 100;        (* PLCOPEN-N4 — not UPPER_SNAKE_CASE *)
  END_VAR
END_PROGRAM
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
