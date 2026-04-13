---
sidebar_position: 5
title: Detectors Overview
slug: /detectors
---

# Detectors

iec-checker ships with **25 built-in detectors** implementing PLCOpen Guideline checks. Each detector has a stable rule ID that appears in the analyzer's output.

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
| 9  | [PLCOPEN-CP16](./detectors/PLCOPEN-CP16.md)    | Tasks shall only call program POUs and not function blocks           |
| 10 | [PLCOPEN-CP25](./detectors/PLCOPEN-CP25.md)    | Data types conversion should be explicit                             |
| 11 | [PLCOPEN-CP26](./detectors/PLCOPEN-CP26.md)    | A global variable may be written only by one PROGRAM                 |
| 12 | [PLCOPEN-CP28](./detectors/PLCOPEN-CP28.md)    | Time and physical measures comparison shall not be equality or inequality |
| 13 | [PLCOPEN-L10](./detectors/PLCOPEN-L10.md)      | Usage of CONTINUE and EXIT instruction should be avoided             |
| 14 | [PLCOPEN-L13](./detectors/PLCOPEN-L13.md)      | FOR loop variable should not be used outside the FOR loop            |
| 15 | [PLCOPEN-L17](./detectors/PLCOPEN-L17.md)      | Each IF instruction should have an ELSE clause                       |
| 16 | [PLCOPEN-L22](./detectors/PLCOPEN-L22.md)      | Loop variables should not be modified inside a FOR loop              |
| 17 | [PLCOPEN-N1](./detectors/PLCOPEN-N1.md)        | Avoid physical addresses                                             |
| 18 | [PLCOPEN-N2](./detectors/PLCOPEN-N2.md)        | Define type prefixes for variables                                   |
| 19 | [PLCOPEN-N3](./detectors/PLCOPEN-N3.md)        | Define the names to avoid                                            |
| 20 | [PLCOPEN-N4](./detectors/PLCOPEN-N4.md)        | Define the use of case (capitals)                                    |
| 21 | [PLCOPEN-N5](./detectors/PLCOPEN-N5.md)        | Local names shall not shadow global names                            |
| 22 | [PLCOPEN-N6](./detectors/PLCOPEN-N6.md)        | Define an acceptable name length                                     |
| 23 | [PLCOPEN-N8](./detectors/PLCOPEN-N8.md)        | Define the acceptable character set                                  |
| 24 | [PLCOPEN-N9](./detectors/PLCOPEN-N9.md)        | Different element types should not bear the same name                |
| 25 | [PLCOPEN-N10](./detectors/PLCOPEN-N10.md)      | Define name prefixes for user defined types                          |

## Categories

### PLCOpen Guidelines

These checks implement rules from the [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines), an industry-standard set of best practices for safe and maintainable Structured Text. Rule IDs follow the PLCOpen numbering: `CP*` for code construction, `L*` for language usage, `N*` for naming.

See the [PLCOpen coverage matrix](./detectors/plcopen-overview.md) for the full list of standard rules and which ones are implemented.
