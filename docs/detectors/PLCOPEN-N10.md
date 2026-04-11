# PLCOPEN-N10: Define name prefixes for user defined types

User-defined types and function blocks should start with a configurable
prefix based on their kind.

## Why is it bad?

In a mid-sized project there are usually tens of structs, enums and function
blocks, and they all end up jumbled in the same symbol lookup. Prefixing
structs with `ST_`, enums with `E_`, function blocks with `FB_` (and so on)
tells the reader what each name is *before* they even look at the
declaration, makes IDE autocomplete immediately useful and keeps type names
visually distinct from variable names.

## Configuration

This lint is opt-in. Provide the prefix map in `iec_checker.json`:

```json
{
  "detectors": { "enabled": ["PLCOPEN-N10"] },
  "naming_conventions": {
    "udt_prefixes": {
      "STRUCT":         "ST_",
      "ENUM":           "E_",
      "ARRAY":          "A_",
      "SUBRANGE":       "SR_",
      "REF":            "R_",
      "ALIAS":          "T_",
      "FUNCTION_BLOCK": "FB_"
    }
  }
}
```

Recognized kinds are `STRUCT`, `ENUM`, `ARRAY`, `SUBRANGE`, `REF`, `ALIAS`
(TYPE entries that redeclare an elementary type) and `FUNCTION_BLOCK`. Any
kind you omit is left unchecked.

## Example

```iecst
TYPE
  Color : (Red, Green, Blue);        (* PLCOPEN-N10 — no "E_" prefix *)
END_TYPE

TYPE
  E_Direction : (North, South);      (* ok *)
END_TYPE

FUNCTION_BLOCK Motor                 (* PLCOPEN-N10 — no "FB_" prefix *)
END_FUNCTION_BLOCK

FUNCTION_BLOCK FB_Pump               (* ok *)
END_FUNCTION_BLOCK
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
