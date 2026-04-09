# Limit the complexity of POU code

**Rule ID**: `PLCOPEN-CP9`

POUs that exceed McCabe or statement-count thresholds should be split.

## Why is it bad?

A POU with too many branches or too many statements is hard to test, hard to
review, and hard to debug on a live system where breakpoints are awkward.
PLCOpen recommends keeping each POU below configurable complexity thresholds
so that the engineer reading it can hold the whole control flow in their head.

This rule reports two metrics independently:

- **McCabe cyclomatic complexity** of the control-flow graph (each conditional
  adds one to the count). Threshold: `Config.mccabe_complexity_threshold`.
- **Number of statements** in the POU. Threshold:
  `Config.statements_num_threshold`.

A violation of either metric should prompt extracting helper functions or
flattening conditional logic.

## Example

A function block with deeply nested `IF`/`FOR`/`ELSIF` chains and dozens of
statements will trigger this rule. The fix is to extract sub-routines and
return early instead of nesting.

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
2. [Cyclomatic complexity (Wikipedia)](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
