---
title: Sponsor Development
slug: /sponsor-development
---

# Sponsor Development

iec-checker is licensed under LGPL-3.0 — you can link against it, integrate it with commercial toolchains, fork and modify it; the only restriction is that changes in the fork must be published under the same license.

In the meanwhile, if you want to support its open-source development and get it to work for your specific needs and/or your proprietary PLC tooling, you could fund its development.

| Area | Description |
|------|-------------|
| **Vendored extensions support** | PLC development tools do not follow the standard strictly and always introduce changes in syntax and/or semantics of the languages. Funded work can add first-class support for your vendor's dialect. |
| **More input formats** | More input formats used by PLC programming environments can be supported — for example, SEL XML is already implemented. |
| **More languages** | IL, FBD, LD, and SFC could be supported. Since these languages don't have a stable *open-source* compiler and no standard format (PLCOpen XML is not adopted well), they were not implemented — but it can be done for your tooling. Additional non-standard DSLs used in control programs may be supported as well. |
| **More detectors, more powerful analysis** | While PLCOpen detectors don't require complicated techniques, classic approaches to program analysis and lightweight formal methods may be applied to PLC languages, adding more value in checking PLC code. |
| **Safety standards and qualification** | The tool could be adjusted to support more standards beyond PLCOpen, e.g. functional safety standards. The tool is not certified, but it could be a matter of qualification. |
| **Developing custom integrations** | Security or development tooling like structure-aware fuzzing/PBTs of PLCs, IDE/LSP server integration, CI/CD DevSecOps tools are examples of how the checker's internals could be used. |

---

If any of the above is of interest, or you need help on specific issues, reach out at [jubnzv@gmail.com](mailto:jubnzv@gmail.com).
