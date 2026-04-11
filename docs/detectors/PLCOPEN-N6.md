# PLCOPEN-N6: Define an acceptable name length

Identifiers shorter than a configured minimum or longer than a configured
maximum should be renamed.

## Why is it bad?

Two-letter names like `Go` or `Tm` are impossible to grep for and hide their
meaning. At the other extreme, 30+ character identifiers hurt readability,
push real logic off the screen and tend to encode information that belongs in
a comment or a grouping type. A sensible band — three characters up to
twenty-five — strikes a useful balance.

## Configuration

This lint is opt-in. Set one or both bounds in `iec_checker.json`:

```json
{
  "detectors": { "enabled": ["PLCOPEN-N6"] },
  "naming_conventions": {
    "min_length": 3,
    "max_length": 25
  }
}
```

Leave a field at `0` (or omit it) to disable that side of the check.
The rule is applied to every variable declaration, function name, function
block name, program name, class name, interface name and user-defined type
name.

## Example

```iecst
FUNCTION Go : BOOL                               (* PLCOPEN-N6 — too short *)
END_FUNCTION

FUNCTION ReadAndScaleTheTemperatureInput : REAL  (* PLCOPEN-N6 — too long *)
END_FUNCTION

FUNCTION StartFeeding : BOOL                     (* ok *)
END_FUNCTION
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
