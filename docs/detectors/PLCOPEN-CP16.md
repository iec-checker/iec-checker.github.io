# PLCOPEN-CP16: Tasks shall only call program POUs and not function blocks

A task in a RESOURCE block should only execute PROGRAM instances, not
FUNCTION_BLOCK instances.

## Why is it bad?

In IEC 61131-3, a TASK controls the scheduling of one or more POUs
inside a RESOURCE. Assigning a FUNCTION_BLOCK directly to a task
bypasses the PROGRAM layer and breaks the standard execution model:
PROGRAMs own their local state (including FB instances), and the runtime
manages their lifecycle per task.

The PLCOpen guideline enforces the intended hierarchy:
**Task → Program → Function Block**.

## Example

```iecst
FUNCTION_BLOCK MyFB
  VAR x : INT; END_VAR
  x := 0;
END_FUNCTION_BLOCK

PROGRAM MyProgram
  VAR y : INT; END_VAR
  y := 0;
END_PROGRAM

CONFIGURATION config
  RESOURCE res1 ON PLC
    TASK Fast(INTERVAL := T#10ms, PRIORITY := 1);
    PROGRAM inst1 WITH Fast : MyProgram;  (* ok *)
    PROGRAM inst2 WITH Fast : MyFB;       (* PLCOPEN-CP16 *)
  END_RESOURCE
END_CONFIGURATION
```

Use instead:

```iecst
PROGRAM MyProgram
  VAR fb : MyFB; END_VAR
  fb();
END_PROGRAM

CONFIGURATION config
  RESOURCE res1 ON PLC
    TASK Fast(INTERVAL := T#10ms, PRIORITY := 1);
    PROGRAM inst1 WITH Fast : MyProgram;
  END_RESOURCE
END_CONFIGURATION
```

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
