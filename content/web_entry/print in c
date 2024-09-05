# Printing in C#

This guide demonstrates various methods to print output in C# using the `Console` class.

## Basic Console Output

Use `Console.Write()` or `Console.WriteLine()` to print text to the console.

```csharp
Console.Write("Hello, ");
Console.WriteLine("World!");
```

Output:

```
Hello, World!
```

## Formatting Strings

Use string interpolation or the `string.Format()` method for formatted output.

```csharp
string name = "Alice";
int age = 30;

// Using string interpolation
Console.WriteLine($"Name: {name}, Age: {age}");

// Using string.Format()
Console.WriteLine(string.Format("Name: {0}, Age: {1}", name, age));
```

Output:

```
Name: Alice, Age: 30
Name: Alice, Age: 30
```

## Printing Numeric Values

Use format specifiers to control the display of numeric values.

```csharp
double pi = Math.PI;
Console.WriteLine($"Pi: {pi:F2}");

int number = 42;
Console.WriteLine($"Number in hex: {number:X}");
```

Output:

```
Pi: 3.14
Number in hex: 2A
```

## Printing to Different Streams

Use `Console.Error` to print to the error stream.

```csharp
Console.Error.WriteLine("This is an error message.");
```

## Using StringBuilder for Complex Output

For complex output, use `StringBuilder` to build the string before printing.

```csharp
using System.Text;

StringBuilder sb = new StringBuilder();
sb.AppendLine("Line 1");
sb.AppendLine("Line 2");
sb.Append("Line 3");

Console.WriteLine(sb.ToString());
```

Output:

```
Line 1
Line 2
Line 3
```

Remember to include the necessary `using` statements at the top of your file:

```csharp
using System;
using System.Text;
```

These examples cover the most common scenarios for printing output in C#. Adjust
the formatting and methods as needed for your specific use case.
