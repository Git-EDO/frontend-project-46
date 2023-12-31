[![Actions Status](https://github.com/Git-EDO/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Git-EDO/frontend-project-46/actions) <a href="https://codeclimate.com/github/Git-EDO/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/be3fdd9a3046b8c8ff5f/maintainability" /></a> <a href="https://codeclimate.com/github/Git-EDO/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/be3fdd9a3046b8c8ff5f/test_coverage" /></a>

# Hexlet@Frontend project №2. "Gendiff"

## Description

- *Console utility that allows you to get data on the differences within 2 files*
- *Supported formats: .json, .yaml, .yml*
- *Supports both flat and branched data*

## How to start the project

- _**git clone URL-OF-REPO**_ to copy the repository to your computer
- _**make install**_ to install all dependencies

## How to get help

- _**gendiff -h**_ to get help message

[![asciicast](https://asciinema.org/a/nZtd3ksgkXTRtIkMzr5CAkX81.svg)](https://asciinema.org/a/nZtd3ksgkXTRtIkMzr5CAkX81)

## How to use

- _**gendiff filepath1 filepath2**_ to get data
- "-" before key means that the first file has this data
- "+" before key means that the second file has this data
- the absence of the "+" and "-" operators means that the key is present in both files and its value is the same

[![asciicast](https://asciinema.org/a/enKPbHLx6PC44D7VAc03kmmw7.svg)](https://asciinema.org/a/enKPbHLx6PC44D7VAc03kmmw7)

## Multiply formats

- _**gendiff filepath1 filepath2**_ to get data in pseudo-json as default
- _**gendiff filepath1 filepath2 -f plain**_ to get data in plain format
- _**gendiff filepath1 filepath2 -f json**_ to get data in json format

[![asciicast](https://asciinema.org/a/hMD1jDyqXL2ylLhcUoy0iwtst.svg)](https://asciinema.org/a/hMD1jDyqXL2ylLhcUoy0iwtst)
