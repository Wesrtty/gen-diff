# Вычислитель отличий

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Wesrtty/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Wesrtty/backend-project-lvl2/actions)
[![Actions Status](https://github.com/Wesrtty/backend-project-lvl2/actions/workflows/test.yml/badge.svg)](https://github.com/Wesrtty/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d987a0c521c6ee97a574/maintainability)](https://codeclimate.com/github/Wesrtty/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d987a0c521c6ee97a574/test_coverage)](https://codeclimate.com/github/Wesrtty/backend-project-lvl2/test_coverage)

## Install
```
make install
```

## Usage
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Arguments:
  filepath1            relative or absolute path to the file
  filepath2            relative or absolute path to the file

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           display help for command
```

Утилита принимает на вход файлы следующих форматов: (`.json`, `.yml`, `.yaml`).

## Example
```
input: gendiff file1.json file2.yml

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

## Test
```
make test
```
```
make test-coverage
```
## Eslint
```
make lint
```
