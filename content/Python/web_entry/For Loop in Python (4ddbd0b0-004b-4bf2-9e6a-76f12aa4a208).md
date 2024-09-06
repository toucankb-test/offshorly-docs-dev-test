# For Loop in Python #

The `for` loop in Python is a powerful and versatile construct used for iterating over sequences (such as lists, tuples, strings, or ranges) or other iterable objects. It allows you to execute a block of code repeatedly for each item in the sequence.

## Basic Syntax ##

The basic syntax of a `for` loop in Python is as follows:

```python
for item in iterable:
    # Code block to be executed for each item
```

## Examples ##

### Iterating over a list ###

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

Output:

```text
apple
banana
cherry
```

### Using range() function ###

The `range()` function generates a sequence of numbers, which is commonly used with `for` loops:

```python
for i in range(5):
    print(i)
```

Output:

```text
0
1
2
3
4
```

### Iterating over a string ###

```python
word = "Python"
for letter in word:
    print(letter)
```

Output:

```text
P
y
t
h
o
n
```

## Advanced Usage ##

### Enumerate ###

Use `enumerate()` to get both the index and value of each item:

```python
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"Index {index}: {fruit}")
```

Output:

```text
Index 0: apple
Index 1: banana
Index 2: cherry
```

### Loop with a step ###

Use `range()` with a step parameter:

```python
for i in range(0, 10, 2):
    print(i)
```

Output:

```text
0
2
4
6
8
```

### Nested loops ###

You can nest `for` loops within each other:

```python
for i in range(3):
    for j in range(2):
        print(f"i: {i}, j: {j}")
```

Output:

```text
i: 0, j: 0
i: 0, j: 1
i: 1, j: 0
i: 1, j: 1
i: 2, j: 0
i: 2, j: 1
```

## Loop Control Statements ##

### break ###

Use `break` to exit the loop prematurely:

```python
for i in range(5):
    if i == 3:
        break
    print(i)
```

Output:

```text
0
1
2
```

### continue ###

Use `continue` to skip the rest of the current iteration:

```python
for i in range(5):
    if i == 2:
        continue
    print(i)
```

Output:

```text
0
1
3
4
```

### else clause ###

The `else` clause in a `for` loop is executed when the loop completes normally (without encountering a `break` statement):

```python
for i in range(3):
    print(i)
else:
    print("Loop completed successfully")
```

Output:

```text
0
1
2
Loop completed successfully
```

By mastering these `for` loop concepts, you can efficiently iterate over sequences and perform repetitive tasks in Python.
