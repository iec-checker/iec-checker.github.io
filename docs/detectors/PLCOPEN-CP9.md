# PLCOPEN-CP9: Limit the complexity of POU code

POUs that exceed McCabe or statement-count thresholds should be split.

## Why is it bad?

A POU with too many branches or too many statements is hard to test, hard to
review, and hard to debug on a live system where breakpoints are awkward.
PLCOpen recommends keeping each POU below configurable complexity thresholds
so that the engineer reading it can hold the whole control flow in their head.

This rule reports two metrics independently:

- **McCabe cyclomatic complexity**: 1, plus one for each `IF`, `ELSIF`,
  `CASE` selection, `FOR`, `WHILE` and `REPEAT`. `AND`/`OR` in a condition,
  calls and `RETURN` add nothing. Threshold: `Config.mccabe_complexity_threshold`.
- **Number of statements** in the POU, nested ones included. Each `ELSIF`
  branch counts as one; conditions, call arguments and empty statements do
  not count. Threshold: `Config.statements_num_threshold`.

A violation of either metric should prompt extracting helper functions or
flattening conditional logic.

## Example

A function block with deeply nested `IF`/`FOR`/`ELSIF` chains and dozens of
statements will trigger this rule. The fix is to extract sub-routines and
return early instead of nesting.

## Resources

1. [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines)
2. [Cyclomatic complexity (Wikipedia)](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
