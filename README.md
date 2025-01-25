# BetaReader.js

A code library, and accompanying end-user webpage, for transliterating ancient Greek in Beta Code into Unicode.

This library is coordinated with the functionality of the Julia [BetaReader.jl](https://github.com/Eumaeus/BetaReader.jl) library.

## Using

- Add the file at `js/betareader.js` to your page's directory, *e.g.* `/mypage/js/betareader.js`.
- In a page's `<head>` element, add the line `<script src="js/betareader.js"></script>`.
- Look at the code in `index.html`, and `js/betatyper.js` to see an example of how to use it.

## Coverage & Reference

The official Beta Code manual is [here](https://stephanus.tlg.uci.edu/encoding/BCM.pdf). This library does not intend to cover that in full.

This repository includes a complete reference guide as a PDF.

The file `test.html` runs and displays a large number of tests, confirming how the library works.