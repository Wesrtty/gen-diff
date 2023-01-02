# Вычислитель отличий

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Wesrtty/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Wesrtty/backend-project-lvl2/actions)
[![Actions Status](https://github.com/Wesrtty/backend-project-lvl2/actions/workflows/test.yml/badge.svg)](https://github.com/Wesrtty/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d987a0c521c6ee97a574/maintainability)](https://codeclimate.com/github/Wesrtty/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d987a0c521c6ee97a574/test_coverage)](https://codeclimate.com/github/Wesrtty/backend-project-lvl2/test_coverage)

## Описание

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

### Возможности утилиты:

Поддержка разных входных форматов: `yaml`, `json`.

Генерация отчета в виде `plain text`, `stylish` и `json`.

## Установка
```
make install
```

## Пример использования
```
gendiff -h
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

Формат: `plain`
```
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
```

Формат: `stylish`
```
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}

```

## Запуск тестов
```
make test
```
```
make test-coverage
```
## Запуск Eslint
```
make lint
```
