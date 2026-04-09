---
sidebar_position: 5
title: Detectors Overview
slug: /detectors
---

# Detectors

iec-checker ships with **13 built-in detectors** implementing PLCOpen Guideline checks. Each detector has a stable rule ID that appears in the analyzer's output.

## Built-in detectors

| #  | Rule ID                                        | Description                                                          |
| -- | ---------------------------------------------- | -------------------------------------------------------------------- |
| 1  | [PLCOPEN-CP1](./detectors/PLCOPEN-CP1.md)      | Access to a member shall be by name                                  |
| 2  | [PLCOPEN-CP2](./detectors/PLCOPEN-CP2.md)      | All code shall be used in the application                            |
| 3  | [PLCOPEN-CP3](./detectors/PLCOPEN-CP3.md)      | All variables shall be initialized before being used                 |
| 4  | [PLCOPEN-CP4](./detectors/PLCOPEN-CP4.md)      | Direct addressing should not overlap                                 |
| 5  | [PLCOPEN-CP6](./detectors/PLCOPEN-CP6.md)      | Avoid external variables in functions, function blocks and classes    |
| 6  | [PLCOPEN-CP8](./detectors/PLCOPEN-CP8.md)      | Floating point comparison shall not be equality or inequality        |
| 7  | [PLCOPEN-CP9](./detectors/PLCOPEN-CP9.md)      | Limit the complexity of POU code                                     |
| 8  | [PLCOPEN-CP13](./detectors/PLCOPEN-CP13.md)    | POUs shall not call themselves directly or indirectly                 |
| 9  | [PLCOPEN-CP25](./detectors/PLCOPEN-CP25.md)    | Data types conversion should be explicit                             |
| 10 | [PLCOPEN-CP28](./detectors/PLCOPEN-CP28.md)    | Time and physical measures comparison shall not be equality or inequality |
| 11 | [PLCOPEN-L10](./detectors/PLCOPEN-L10.md)      | Usage of CONTINUE and EXIT instruction should be avoided             |
| 12 | [PLCOPEN-L17](./detectors/PLCOPEN-L17.md)      | Each IF instruction should have an ELSE clause                       |
| 13 | [PLCOPEN-N3](./detectors/PLCOPEN-N3.md)        | Define the names to avoid                                            |

## Categories

### PLCOpen Guidelines

These checks implement rules from the [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines), an industry-standard set of best practices for safe and maintainable Structured Text. Rule IDs follow the PLCOpen numbering: `CP*` for code construction, `L*` for language usage, `N*` for naming.

See the [PLCOpen coverage matrix](./detectors/plcopen-overview.md) for the full list of standard rules and which ones are implemented.
