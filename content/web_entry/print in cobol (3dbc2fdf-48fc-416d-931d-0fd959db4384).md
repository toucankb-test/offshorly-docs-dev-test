# Printing in COBOL

COBOL (Common Business-Oriented Language) provides several ways to output data to the console or a file. This guide demonstrates how to use the `DISPLAY` statement for printing in COBOL.

## Basic DISPLAY Statement

The `DISPLAY` statement is used to output data to the console. Here's a simple example:

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO-WORLD.
ENVIRONMENT DIVISION.
DATA DIVISION.
PROCEDURE DIVISION.
    DISPLAY "Hello, World!".
    STOP RUN.
```

## Displaying Variables

You can also display the contents of variables:

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. DISPLAY-VARIABLES.
ENVIRONMENT DIVISION.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-NAME PIC X(20) VALUE "John Doe".
01 WS-AGE PIC 9(3) VALUE 30.
PROCEDURE DIVISION.
    DISPLAY "Name: " WS-NAME.
    DISPLAY "Age: " WS-AGE.
    STOP RUN.
```

## Formatting Output

To format output, you can use the `UPON CONSOLE` phrase and combine multiple items:

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. FORMATTED-OUTPUT.
ENVIRONMENT DIVISION.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-TOTAL PIC 9(5)V99 VALUE 1234.56.
PROCEDURE DIVISION.
    DISPLAY "Total: $" WS-TOTAL UPON CONSOLE.
    STOP RUN.
```

## Using LINE and COLUMN Phrases

For more control over output positioning, use the `LINE` and `COLUMN` phrases:

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. POSITIONED-OUTPUT.
ENVIRONMENT DIVISION.
DATA DIVISION.
PROCEDURE DIVISION.
    DISPLAY "Header" LINE 1 COLUMN 10.
    DISPLAY "Body" LINE 3 COLUMN 5.
    DISPLAY "Footer" LINE 10 COLUMN 1.
    STOP RUN.
```

Remember that the exact behavior of these statements may vary depending on your COBOL compiler and environment. Always refer to your specific COBOL implementation's documentation for detailed information on printing and output formatting.
