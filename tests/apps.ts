let apps = [
    { name: "an empty program", input: "", output: [] },
    { name: "a print statement", input: "print 8", output: [8] },
    {
      name: "multiple statements",
      input: "print 8 print 24",
      output: [8, 24]
    },
    {
      name: "binary expressions",
      input: "print(2+ 4)",
      output: [6]
    },
    {
      name: "nested binary expressions",
      input: "print ((6 - 4)+10)",
      output: [12]
    },
    {
      name: "variable declaration",
      input: "int f = 22 print f",
      output: [22]
    },
    {
      name: "variable declaration",
      input: "int foo = 21 print foo",
      output: [21]
    },
    {
      name: "floating point variable declaration",
      input: "float f = 22.5 print f",
      output: [22.5]
    },
    {
      name: "variable assignment",
      input: "int f = 22 f = (f+1) print f",
      output: [23]
    },
    {
      name: "floating point variable assignment",
      input: "float f = 22.5 f = (f+1.5) print f",
      output: [24]
    },
    {
      name: "handles scientific notation and various other numeric formats",
      input: "print 23e02 print -2 print .5",
      output: [2300, -2, 0.5]
    },
    {
      name: "while statements",
      input: "int f = 0 while (f < 5) {f = (f + 1) print f}",
      output: [1, 2, 3, 4, 5]
    },
    {
        name: "complex while statements",
        input: "int f = 0 int i = 0 int j = 0 while (i < 5) {while (j < 2) { j = (j + 1) f = (f + 1) print f } j = 0i = (i + 1) }",
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      name: "if statement",
      input: `
        int f = 5
        if (f < 10)
            {print 2}
        if (f > 10)
            {print 3}
      `,
      output: [2]
    },
    {
      name: "else statement operator",
      input: `
        if (5 < 3){
            print 2
            }
        else
            {print 3}
            `,
      output: [3]
    },
    {
        name: "if or statement",
        input: `
          int f = 5
          if ((f == 3) || (f < 10))
              {print 2} else {print 3}
        `,
        output: [2]
      },
    {
        name: "if and statement",
        input: `
          int f = 5
          int g = 6
          if ((f == 5) && (g == 6))
              {print 1} else {print 3}
        `,
        output: [1]
    },
    {
      name: "support a single main proc",
      input: `
    proc main()
    {
    print 22
    }`,
      output: [22]
    },
    {
      name: "supports procedure invocation",
      input: `
    proc foo()
    {
      print 27
    }
    proc main()
    {
      foo()
    }`,
      output: [27]
    },
    {
      name: "supports procedure invocation with arguments",
      input: `
    proc foo(f)
    {
      print (f + 1)
    }
    proc main()
    {
      foo(28)
    }`,
      output: [29]
    }
  ];
  
  export default apps;