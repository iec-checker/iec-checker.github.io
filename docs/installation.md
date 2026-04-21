---
sidebar_position: 2
title: Installation
slug: /installation
---

# Installation

## Docker

Nightly builds are published to Docker Hub automatically by a weekly GitHub Actions workflow. Pull the image and run the checker against files from the current directory:

```bash
docker pull jubnzv1/iec-checker:nightly
docker run --rm -v "$PWD:/src" -w /src jubnzv1/iec-checker:nightly program.st
```

The `ENTRYPOINT` is `iec_checker`, so any CLI flags (for example `-o json`, `--list-checks`) can be appended directly.

## Prebuilt binaries

The fastest way to get iec-checker without Docker is to grab a prebuilt binary from the [GitHub releases page](https://github.com/iec-checker/iec-checker/releases). Builds are published for:

- Linux x86_64
- Windows x86_64

Download the archive, extract it, and the `iec_checker` binary is ready to run.

## Build from source

### Linux

Install [OCaml](https://ocaml.org/docs/install.html) 5.1 or later and [opam](https://opam.ocaml.org/doc/Install.html), then clone the repository and install the dependencies:

```bash
git clone https://github.com/iec-checker/iec-checker.git
cd iec-checker
opam install --deps-only .
```

Build the binary:

```bash
make build
```

The executable is now at `bin/iec_checker`.

### Windows

Install [OCaml for Windows](https://fdopen.github.io/opam-repository-mingw/) following the [installation guide](https://fdopen.github.io/opam-repository-mingw/installation/). Then open the Cygwin shell, clone the repository, and follow the Linux build steps above.

## Optional: Python wrapper and test suite

The [`checker.py`](https://github.com/iec-checker/iec-checker/blob/master/checker.py) script wraps the OCaml binary and adds extras like extended formatting and Python plugin support. The test suite is also written in Python.

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
make test
```

## Verify the install

Run iec-checker against the bundled demo programs:

```bash
bin/iec_checker test/st/*.st
```

You should see one or more warnings printed to stdout. If you do, you're ready — head to the [CLI reference](./cli.md) for the full flag list.
