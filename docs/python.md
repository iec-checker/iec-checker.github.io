---
title: Python Integration
slug: /python
---

# Python Integration

iec-checker can dump its internal representation (AST, control-flow graphs, environments) as JSON files. This makes it possible to write custom analysis passes, integrate with other tools, or build visualizations — all in Python, without touching the OCaml codebase.

## Dumping JSON data

Pass the `--dump` flag to produce a JSON dump file for each input:

```bash
iec_checker --dump program.st
# produces program.st.dump.json
```

The dump contains structured data including:

- **Program / Function / Function Block** declarations and their statements
- **Control-flow graphs** with basic blocks, successor/predecessor edges, and entry/exit block markers
- **Type information** and variable declarations
- **Warnings** emitted by the analyzer

## Object model

The [`om.py`](https://github.com/iec-checker/iec-checker/blob/master/src/python/om.py) module defines Python dataclasses that mirror the JSON dump structure — `Cfg`, `BasicBlock`, `Function`, `Program`, `Statement`, `Warning`, etc. Each class has a `from_dict()` factory method for deserializing from the JSON dump.

The [`dump.py`](https://github.com/iec-checker/iec-checker/blob/master/src/python/dump.py) module provides `DumpManager`, which loads the JSON dump files and makes the deserialized objects available for inspection.

## Example: control-flow graph plotter

The [`cfg_plotter.py`](https://github.com/iec-checker/iec-checker/blob/master/src/python/plugins/cfg_plotter.py) plugin renders control-flow graphs using Graphviz. It reads the CFG data from the dump, creates a directed graph with color-coded entry/exit blocks, and saves the result as an image:

```python
from pygraphviz import AGraph
from .. import om

class CFGPlotter:
    def __init__(self, cfgs):
        self.cfgs = cfgs
        self.graph = self.generate_graph()

    def generate_graph(self) -> AGraph:
        graph = AGraph(directed=True, splines='curved', overlap='vpsc')
        for cfg in self.cfgs:
            for bb in cfg.basic_blocks:
                style = {}
                if bb.type == 'BBExit':
                    style = dict(style='filled', color='#665c54')
                if bb.type == 'BBEntry':
                    style = dict(style='filled', color='#458588')
                graph.add_node(
                    n=bb.id, label=f'bb={bb.id} stmt={bb.stmt_ids}', **style)
                for succ in bb.succs:
                    graph.add_edge(bb.id, succ)
                for pred in bb.preds:
                    graph.add_edge(pred, bb.id)
        return graph

    def save_file(self, filepath: str):
        self.graph.layout()
        self.graph.draw(filepath)
```

## Projects using Python integration

- [PLCreX](https://plcrex.readthedocs.io/en/latest/) — a tool suite for PLC program analysis that uses iec-checker's JSON dumps as part of its pipeline.
