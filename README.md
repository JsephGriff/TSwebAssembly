# WebAssembly Compiler for Metsu

Welcome to the WebAssembly Compiler for the Metsu programming language! This project, written in TypeScript, allows you to compile Metsu code into WebAssembly (Wasm) for efficient execution in web environments.
## Table of Contents

* [Introduction](#Introduction)
* [Features](#Features)
* [Installation](#Installation)
* [Usage](#Usage)
* [Examples](#Examples)
* [Contributing](#Contributing)
* [License](#License)
* [Acknowledgements](#Acknowledgements)

# Introduction

This project provides a compiler that translates Metsu code into WebAssembly. WebAssembly is a binary instruction format for a stack-based virtual machine, designed to be a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

# Features

* Efficient Compilation: Converts Metsu code to WebAssembly for high-performance execution.
* Cross-Platform: Supports multiple operating systems including Windows, macOS, and Linux.
* Easy Integration: Seamlessly integrates with existing web projects.
* Open Source: Licensed under the MIT License.

# Installation
### Prerequisites

* Node.js (version 14 or higher)
* npm (version 6 or higher)
* wasm (version 1.0 or higher)

### Steps

1. Clone the repository:

```
git clone https://github.com/yourusername/metsu-wasm-compiler.git
cd metsu-wasm-compiler
```

2. Install dependencies:
```
    npm install
```
3. Build the compiler:
```
    npm run build
```
# Usage
### Compiling Metsu Code

To compile a Metsu file to WebAssembly, use the following command:

npm run compile -- input.metsu -o output.wasm

Running the WebAssembly Module

You can run the generated WebAssembly module in a web environment. Here’s a basic example using JavaScript:

```
fetch('output.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes)
).then(results => {
  results.instance.exports.main();
});
```

# Examples
Please refer to the examples provided within the [Metsu](https://github.com/JoshnaksPNG/Metsu) Project.
Note that return values implementation is still a work in progress.

# Contributing

We welcome contributions! Please read our Contributing Guide to learn how you can help.

# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Acknowledgements

Special thanks to Joshnaks for creating the Metsu programming language and to Colin Eberhardt who inspired this project with their conference presentation.
