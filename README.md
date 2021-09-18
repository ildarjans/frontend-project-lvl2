### Hexlet tests and linter status:
[![Node CI](https://github.com/ildarjans/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/ildarjans/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)


### About
Utility compares two files (json, yml, yaml) and shows their difference

### Get Started
Usage: gendiff [options] `<filepath1>` `<filepath2>`

```
gendiff --help
```

### Formats
Utility suggest three format options
- [**stylish**](#stylish)
- [**plain**](#plain)
- [**stylish**](#json)

#### stylish
Stylish format applied as default. Format represents difference tree.
[![asciicast](https://asciinema.org/a/pQmhK7TnSSrlvHpVn7JxgcJfr.svg)](https://asciinema.org/a/pQmhK7TnSSrlvHpVn7JxgcJfr)
#### plain
Plain format represents only differences between two files. Equal properties excepted
[![asciicast](https://asciinema.org/a/f3JnKXPV0GcpTZCCWxzKanVoc.svg)](https://asciinema.org/a/f3JnKXPV0GcpTZCCWxzKanVoc)
#### json
json format represents differences object as string like JSON.stringify
[![asciicast](https://asciinema.org/a/tDjtueeyomYVorfxxZ7JgLzWb.svg)](https://asciinema.org/a/tDjtueeyomYVorfxxZ7JgLzWb)

