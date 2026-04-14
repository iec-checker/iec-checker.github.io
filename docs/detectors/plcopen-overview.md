---
title: PLCOpen Overview
slug: /detectors/plcopen-overview
---

# PLCOpen Coverage

iec-checker tracks the [PLCOpen Software Construction Guidelines](https://plcopen.org/software-construction-guidelines) v1.0 (April 2016). The tables below list every rule from the standard alongside its implementation status:

- ✅ — implemented as a detector in iec-checker (rule ID links to its detector page)
- **TBD** — planned (issue link tracks progress)
- ❌ — not planned (not feasible for static analysis)

iec-checker currently covers **25 of 64** rules from the standard.

## 3. Naming Rules

| Rule | Status | Description |
| ---- | :----: | ----------- |
| [N1](./PLCOPEN-N1.md)   | ✅ | Avoid physical addresses |
| [N2](./PLCOPEN-N2.md)   | ✅ | Define type prefixes for variables (if used) |
| [N3](./PLCOPEN-N3.md)   | ✅ | Define the names to avoid |
| [N4](./PLCOPEN-N4.md)   | ✅ | Define the use of case (capitals) |
| [N5](./PLCOPEN-N5.md)   | ✅ | Local names shall not shadow global names |
| [N6](./PLCOPEN-N6.md)   | ✅ | Define an acceptable name length |
| N7   | ❌ | Define naming rules for namespaces |
| [N8](./PLCOPEN-N8.md)   | ✅ | Define the acceptable character set |
| [N9](./PLCOPEN-N9.md)   | ✅ | Different element types should not bear the same name |
| [N10](./PLCOPEN-N10.md) | ✅ | Define name prefixes for user defined types |

## 4. Comment Rules

| Rule | Status | Description |
| ---- | :----: | ----------- |
| C1   | ❌ | Comments shall describe the intention of the code |
| C2   | ❌ | All elements shall be commented |
| [C3](https://github.com/iec-checker/iec-checker/issues/42)   | TBD | Avoid nested comments |
| C4   | ❌ | Comments may not include code |
| [C5](https://github.com/iec-checker/iec-checker/issues/43)   | TBD | Use single line comments |
| C6   | ❌ | Define comments language |

## 5. Coding Practice

| Rule | Status | Description |
| ---- | :----: | ----------- |
| [CP1](./PLCOPEN-CP1.md)   | ✅ | Access to a member shall be by name |
| [CP2](./PLCOPEN-CP2.md)   | ✅ | All code shall be used in the application |
| [CP3](./PLCOPEN-CP3.md)   | ✅ | All variables shall be initialized before being used |
| [CP4](./PLCOPEN-CP4.md)   | ✅ | Direct addressing should not overlap |
| CP5  | ❌ | Applications shall be well designed |
| [CP6](./PLCOPEN-CP6.md)   | ✅ | Avoid external variables in functions, function blocks and classes |
| CP7  | ❌ | Error information shall be tested |
| [CP8](./PLCOPEN-CP8.md)   | ✅ | Floating point comparison shall not be equality or inequality |
| [CP9](./PLCOPEN-CP9.md)   | ✅ | Limit the complexity of POU code |
| CP10 | ❌ | Avoid multiple writes from multiple tasks |
| CP11 | ❌ | Manage synchronization among tasks |
| [CP12](https://github.com/iec-checker/iec-checker/issues/45) | TBD | Physical outputs shall be written once per PLC cycle |
| [CP13](./PLCOPEN-CP13.md) | ✅ | POUs shall not call themselves directly or indirectly |
| [CP14](https://github.com/iec-checker/iec-checker/issues/46) | TBD | POUs shall have a single point of exit |
| CP15 | ❌ | Read a variable written by another task only once per cycle |
| [CP16](./PLCOPEN-CP16.md) | ✅ | Tasks shall only call program POUs and not function blocks |
| [CP17](https://github.com/iec-checker/iec-checker/issues/48) | TBD | Usage of parameters shall match their declaration mode |
| CP18 | ❌ | Use of global variables shall be limited |
| CP19 | ❌ | Usage of jump and return should be avoided |
| [CP20](https://github.com/iec-checker/iec-checker/issues/49) | TBD | Function block instances should be called only once |
| CP21 | ❌ | Use VAR_TEMP for temporary variable declaration |
| CP22 | ❌ | Select appropriate data type |
| [CP23](https://github.com/iec-checker/iec-checker/issues/50) | TBD | Define maximum number of input/output/in-out variables of a POU |
| [CP24](https://github.com/iec-checker/iec-checker/issues/51) | TBD | Do not declare variables that are not used |
| [CP25](./PLCOPEN-CP25.md) | ✅ | Data types conversion should be explicit |
| [CP26](./PLCOPEN-CP26.md) | ✅ | A global variable may be written only by one PROGRAM |
| [CP27](https://github.com/iec-checker/iec-checker/issues/53) | TBD | Avoid deprecated features |
| [CP28](./PLCOPEN-CP28.md) | ✅ | Time and physical measures comparison shall not be equality or inequality |

## 6. Languages

### General

| Rule | Status | Description |
| ---- | :----: | ----------- |
| L1   | ❌ | Define indentation |

### Function Block Diagram (FBD)

Not currently supported — iec-checker analyzes textual IEC 61131-3 only. Graphical FBD analysis needs a parser for the graphical form, for which no open-source toolchain or reference corpus is available.

| Rule | Status | Description |
| ---- | :----: | ----------- |
| L2   | ❌ | Avoid assignments of intermediate results within networks |
| L3   | ❌ | Define maximum complexity of single network |

### Ladder Diagram (LD)

Not currently supported — LD is a graphical language and no open-source toolchain or reference corpus exists to drive a parser and analyzer implementation.

| Rule | Status | Description |
| ---- | :----: | ----------- |
| L5   | ❌ | A coil should not be followed by a contact |
| L6   | ❌ | Define maximum rung complexity |

### Sequential Function Chart (SFC)

Not currently supported — SFC is a graphical language and lacks the open-source toolchain and sample programs required to build and validate an analyzer.

| Rule | Status | Description |
| ---- | :----: | ----------- |
| L7   | ❌ | Closing divergent paths |
| L8   | ❌ | Do not program an SFC action block in SFC |
| L9   | ❌ | Define maximum complexity |

### Instruction List (IL)

Not currently supported — IL was deprecated in IEC 61131-3 Edition 3 and is being retired by vendors, and no open-source toolchain or reference corpus is available for it.

### Structured Text (ST)

| Rule | Status | Description |
| ---- | :----: | ----------- |
| L4   | ❌ | Define general formatting rules |
| [L10](./PLCOPEN-L10.md) | ✅ | Usage of CONTINUE and EXIT instruction should be avoided |
| [L11](https://github.com/iec-checker/iec-checker/issues/54)  | TBD | Define the maximum line length |
| [L13](./PLCOPEN-L13.md) | ✅ | FOR loop variable usage should not be used outside the FOR loop |
| L14  | ❌ | Passing parameters should be clear |
| L15  | ❌ | Use parenthesis to explicitly express operation precedence |
| L16  | ❌ | Define the use of tabs |
| [L17](./PLCOPEN-L17.md) | ✅ | Each IF instruction should have an ELSE clause |
| [L22](./PLCOPEN-L22.md) | ✅ | Loop variables should not be modified inside a FOR loop |

## 7. Vendor Specific IEC 61131-3 Extensions

| Rule | Status | Description |
| ---- | :----: | ----------- |
| E1   | ❌ | Dynamic memory allocation shall not be used |
| E2   | ❌ | Pointer arithmetic shall not be used |
| E3   | ❌ | Some comparator instructions shall not be used for pointers or reference manipulation |
