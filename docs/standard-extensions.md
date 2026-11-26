---
sidebar_position: 6
title: Standard Extensions
slug: /standard-extensions
---

# Standard Extensions

iec-checker parses Structured Text as defined by [IEC 61131-3](https://en.wikipedia.org/wiki/IEC_61131-3). To check
code written for real PLC tools, the parser also accepts some constructs that the standard does not allow. This page
lists all of them, so you know which non-standard code passes the parser.

Each extension is accepted *in addition* to the standard syntax: none of them changes how standard code is parsed.

References in the tables point to the clauses of the IEC 61131-3 2nd edition. Where the 3rd edition (2013) differs,
the parser follows the 3rd edition; see [3rd edition features](#3rd-edition-features).

## Relaxed syntax

Code that the standard rejects, but which PLC tools commonly accept.

| Accepted | Example | Standard |
|---|---|---|
| Missing `;` after a statement | `IF a THEN b := 1; END_IF` followed by the next statement | Every statement ends with `;` (B.3.2) |
| Missing `;` after a type declaration | `TYPE E : (A, B) END_TYPE` | `type_declaration ';'` (B.1.3.3) |
| `CASE` without labelled arms | `CASE x OF END_CASE`, `CASE x OF ELSE y := 0; END_CASE` | At least one `case_element` (B.3.2.3) |
| Repeated or trailing underlines in identifiers | `a__b`, `a_` | Not allowed (2.1.2). Identifiers starting with two underlines (`__a`) are still rejected |
| Nested comments | `(* outer (* inner *) outer *)` | Nested comments are an error (2.1.5) |
| Nested pragmas | `{{ outer {inner} }}` | A pragma is a single `{...}` (2.1.6) |
| Located variables in a function | `FUNCTION f : INT VAR x AT %IX0.0 : BOOL; END_VAR ...` | Functions declare only `VAR [CONSTANT]` without locations (B.1.5.1) |
| `VAR_EXTERNAL` in a function | `FUNCTION f : INT VAR_EXTERNAL g : INT; END_VAR ...` | Not allowed in functions (B.1.5.1). [PLCOPEN-CP6](./detectors/PLCOPEN-CP6) reports it |
| `CONFIGURATION` without a `RESOURCE` | `CONFIGURATION c VAR_GLOBAL g : INT; END_VAR END_CONFIGURATION` | At least one resource (B.1.7) |
| Variable sections after the resources of a configuration | `... END_RESOURCE VAR x : INT; END_VAR END_CONFIGURATION` | Only `VAR_ACCESS` and `VAR_CONFIG` there (B.1.7) |
| Several `VAR_GLOBAL` sections in a configuration or resource | `VAR_GLOBAL CONSTANT k : INT := 1; END_VAR VAR_GLOBAL run : BOOL; END_VAR` | One section (B.1.7). `CONSTANT` and `RETAIN` qualify a whole section, so constant and other globals need separate ones. Beremiz generates this form |
| A fractional value in any duration unit | `T#1.5d2h` | Only the last unit can be fractional (B.1.2.3.1) |
| `STRING#` with a double-quoted literal | `STRING#"text"` | `STRING` literals use single quotes (B.1.2.2) |
| Positional and named arguments in one call | `f(1, b := 2)` | All arguments are named, or all are positional (2.5.1.1, table 19a) |
| Keywords as field names after `.` | `cfg.single`, `t.priority` | Keywords cannot be identifiers (2.1.3) |

## Vendor and encoding extensions

| Accepted | Example | Note |
|---|---|---|
| Non-ASCII characters in string literals | `'Größe'` | UTF-8 text is kept as is. String lengths are counted in bytes, so `STRING[2] := 'ää'` exceeds the length (4 > 2). 2.1.1 lists other character sets as a typical extension |
| UTF-8 byte order mark | A file starting with `EF BB BF` | Skipped anywhere in the input, also between files merged with `--merge` |
| Qualified enumerated values, as in CODESYS | `x := E.A;`, `CASE x OF E.B: ...` | The standard form `E#A` is accepted too |
| String length in parentheses, as in CODESYS and TwinCAT | `s : STRING(80);`, `w : WSTRING(20);` | The same as `STRING[80]` (B.1.4.3), which is accepted too |

## 3rd edition features

The 3rd edition (2013) added the following constructs, which the parser accepts. They are not part of the 2nd edition:

- `//` comments;
- `BOOL#TRUE` / `BOOL#FALSE`, `STRING#'text'`;
- bit access to variables: `w.5`, `w.%X5`;
- named constants as `CASE` labels and initial values: `K: ...`, `x : INT := K;`;
- empty bodies of functions, function blocks and programs;
- `VAR_TEMP` in functions;
- references: `REF_TO`, assignment attempt `?=`;
- classes, methods and interfaces: `CLASS`, `METHOD`, `INTERFACE`, `EXTENDS`, `IMPLEMENTS` on classes;
- `CONTINUE`;
- `CHAR`, `WCHAR`, `LTIME`, `LDATE`, `LTOD`, `LDT` and the `LT#`, `LD#` prefixes;
- `NON_RETAIN`.
