# OutOfBounds: Out-of-bounds access and initialization

Catches reads, writes, and initializers that fall outside the declared range of
arrays, subranges, or strings.

## Why is it bad?

The IEC 61131-3 standard does not require runtimes to detect out-of-range access.
On many PLCs, an out-of-bounds array write silently corrupts the next variable in
memory, an out-of-range subrange initializer is clamped or wraps, and a string
initializer that is longer than the declared capacity is truncated without
warning. All three failure modes are easy to miss in code review and almost
impossible to reproduce from a crash dump.

This rule fires in four cases:

1. An array is indexed with a constant that lies outside its declared subrange.
2. An array is indexed with more dimensions than were declared.
3. A subrange variable is initialized with a value outside its declared range.
4. A `STRING` (or `WSTRING` / `CHAR` / `WCHAR`) initializer literal is longer
   than the declared capacity, or an array initializer list has more elements
   than the array can hold.

## Example

```iecst
PROGRAM program0
  VAR
    arr : ARRAY[1..5] OF INT := [1, 2, 3, 4, 5, 6, 7, 8];  (* OutOfBounds — 3 values lost *)
    s   : STRING[3] := 'hello';                            (* OutOfBounds — literal exceeds capacity *)
    sub : INT(0..10) := 99;                                (* OutOfBounds — initial value out of range *)
  END_VAR
  arr[10] := 0;                                            (* OutOfBounds — index 10 not in [1..5] *)
END_PROGRAM
```

Use instead:

```iecst
PROGRAM program0
  VAR
    arr : ARRAY[1..5] OF INT := [1, 2, 3, 4, 5];
    s   : STRING[8] := 'hello';
    sub : INT(0..10) := 5;
  END_VAR
  arr[5] := 0;
END_PROGRAM
```

## Resources

1. IEC 61131-3, Edition 3.0, §6.4.4.2 (array dimensions) and §6.5.5 (initial
   values for derived data types).
