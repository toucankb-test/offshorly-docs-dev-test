# Printing in C

This guide demonstrates various methods to print output in the C programming language using the `printf` function from the `stdio.h` library.

## Basic Printing

To print a simple string:

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

## Printing Variables

To print variables of different types:

```c
#include <stdio.h>

int main() {
    int age = 30;
    float height = 1.75;
    char grade = 'A';
    const char *name = "John";

    printf("Name: %s\n", name);
    printf("Age: %d\n", age);
    printf("Height: %.2f meters\n", height);
    printf("Grade: %c\n", grade);

    return 0;
}
```

## Formatting Options

You can use various formatting options with `printf`:

```c
#include <stdio.h>

int main() {
    int num = 42;
    float pi = 3.14159;

    // Width specification
    printf("Number: %5d\n", num);  // Right-aligned, width 5

    // Precision for floating-point numbers
    printf("Pi: %.2f\n", pi);  // Two decimal places

    // Left-align with '-'
    printf("Left-aligned: %-10d\n", num);

    // Zero-padding
    printf("Zero-padded: %05d\n", num);

    return 0;
}
```

## Printing Multiple Items

You can print multiple items in a single `printf` statement:

```c
#include <stdio.h>

int main() {
    int x = 10, y = 20;
    printf("x = %d and y = %d\n", x, y);

    return 0;
}
```

Remember to include the `stdio.h` header file when using `printf`. The `\n` character at the end of each `printf` statement adds a newline, moving the cursor to the next line after printing.
