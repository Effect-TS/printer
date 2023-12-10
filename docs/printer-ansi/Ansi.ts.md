---
title: Ansi.ts
nav_order: 1
parent: "@effect/printer-ansi"
---

## Ansi overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [colors](#colors)
  - [bgBlack](#bgblack)
  - [bgBlackBright](#bgblackbright)
  - [bgBlue](#bgblue)
  - [bgBlueBright](#bgbluebright)
  - [bgCyan](#bgcyan)
  - [bgCyanBright](#bgcyanbright)
  - [bgGreen](#bggreen)
  - [bgGreenBright](#bggreenbright)
  - [bgMagenta](#bgmagenta)
  - [bgMagentaBright](#bgmagentabright)
  - [bgRed](#bgred)
  - [bgRedBright](#bgredbright)
  - [bgWhite](#bgwhite)
  - [bgWhiteBright](#bgwhitebright)
  - [bgYellow](#bgyellow)
  - [bgYellowBright](#bgyellowbright)
  - [black](#black)
  - [blackBright](#blackbright)
  - [blue](#blue)
  - [blueBright](#bluebright)
  - [cyan](#cyan)
  - [cyanBright](#cyanbright)
  - [green](#green)
  - [greenBright](#greenbright)
  - [magenta](#magenta)
  - [magentaBright](#magentabright)
  - [red](#red)
  - [redBright](#redbright)
  - [white](#white)
  - [whiteBright](#whitebright)
  - [yellow](#yellow)
  - [yellowBright](#yellowbright)
- [commands](#commands)
  - [beep](#beep)
  - [cursorBackward](#cursorbackward)
  - [cursorDown](#cursordown)
  - [cursorForward](#cursorforward)
  - [cursorHide](#cursorhide)
  - [cursorLeft](#cursorleft)
  - [cursorMove](#cursormove)
  - [cursorNextLine](#cursornextline)
  - [cursorPrevLine](#cursorprevline)
  - [cursorRestorePosition](#cursorrestoreposition)
  - [cursorSavePosition](#cursorsaveposition)
  - [cursorShow](#cursorshow)
  - [cursorTo](#cursorto)
  - [cursorUp](#cursorup)
  - [eraseDown](#erasedown)
  - [eraseEndLine](#eraseendline)
  - [eraseLine](#eraseline)
  - [eraseLines](#eraselines)
  - [eraseScreen](#erasescreen)
  - [eraseStartLine](#erasestartline)
  - [eraseUp](#eraseup)
- [constructors](#constructors)
  - [bgColor](#bgcolor)
  - [bgColorBright](#bgcolorbright)
  - [bold](#bold)
  - [brightColor](#brightcolor)
  - [color](#color)
  - [italicized](#italicized)
  - [strikethrough](#strikethrough)
  - [underlined](#underlined)
- [destructors](#destructors)
  - [stringify](#stringify)
- [model](#model)
  - [Ansi (interface)](#ansi-interface)
- [symbol](#symbol)
  - [AnsiTypeId](#ansitypeid)
  - [AnsiTypeId (type alias)](#ansitypeid-type-alias)
- [utils](#utils)
  - [Ansi (namespace)](#ansi-namespace)
    - [Proto (interface)](#proto-interface)
  - [combine](#combine)

---

# colors

## bgBlack

**Signature**

```ts
export declare const bgBlack: Ansi
```

Added in v1.0.0

## bgBlackBright

**Signature**

```ts
export declare const bgBlackBright: Ansi
```

Added in v1.0.0

## bgBlue

**Signature**

```ts
export declare const bgBlue: Ansi
```

Added in v1.0.0

## bgBlueBright

**Signature**

```ts
export declare const bgBlueBright: Ansi
```

Added in v1.0.0

## bgCyan

**Signature**

```ts
export declare const bgCyan: Ansi
```

Added in v1.0.0

## bgCyanBright

**Signature**

```ts
export declare const bgCyanBright: Ansi
```

Added in v1.0.0

## bgGreen

**Signature**

```ts
export declare const bgGreen: Ansi
```

Added in v1.0.0

## bgGreenBright

**Signature**

```ts
export declare const bgGreenBright: Ansi
```

Added in v1.0.0

## bgMagenta

**Signature**

```ts
export declare const bgMagenta: Ansi
```

Added in v1.0.0

## bgMagentaBright

**Signature**

```ts
export declare const bgMagentaBright: Ansi
```

Added in v1.0.0

## bgRed

**Signature**

```ts
export declare const bgRed: Ansi
```

Added in v1.0.0

## bgRedBright

**Signature**

```ts
export declare const bgRedBright: Ansi
```

Added in v1.0.0

## bgWhite

**Signature**

```ts
export declare const bgWhite: Ansi
```

Added in v1.0.0

## bgWhiteBright

**Signature**

```ts
export declare const bgWhiteBright: Ansi
```

Added in v1.0.0

## bgYellow

**Signature**

```ts
export declare const bgYellow: Ansi
```

Added in v1.0.0

## bgYellowBright

**Signature**

```ts
export declare const bgYellowBright: Ansi
```

Added in v1.0.0

## black

**Signature**

```ts
export declare const black: Ansi
```

Added in v1.0.0

## blackBright

**Signature**

```ts
export declare const blackBright: Ansi
```

Added in v1.0.0

## blue

**Signature**

```ts
export declare const blue: Ansi
```

Added in v1.0.0

## blueBright

**Signature**

```ts
export declare const blueBright: Ansi
```

Added in v1.0.0

## cyan

**Signature**

```ts
export declare const cyan: Ansi
```

Added in v1.0.0

## cyanBright

**Signature**

```ts
export declare const cyanBright: Ansi
```

Added in v1.0.0

## green

**Signature**

```ts
export declare const green: Ansi
```

Added in v1.0.0

## greenBright

**Signature**

```ts
export declare const greenBright: Ansi
```

Added in v1.0.0

## magenta

**Signature**

```ts
export declare const magenta: Ansi
```

Added in v1.0.0

## magentaBright

**Signature**

```ts
export declare const magentaBright: Ansi
```

Added in v1.0.0

## red

**Signature**

```ts
export declare const red: Ansi
```

Added in v1.0.0

## redBright

**Signature**

```ts
export declare const redBright: Ansi
```

Added in v1.0.0

## white

**Signature**

```ts
export declare const white: Ansi
```

Added in v1.0.0

## whiteBright

**Signature**

```ts
export declare const whiteBright: Ansi
```

Added in v1.0.0

## yellow

**Signature**

```ts
export declare const yellow: Ansi
```

Added in v1.0.0

## yellowBright

**Signature**

```ts
export declare const yellowBright: Ansi
```

Added in v1.0.0

# commands

## beep

Play a beeping sound.

**Signature**

```ts
export declare const beep: Ansi
```

Added in v1.0.0

## cursorBackward

Moves the cursor backward by the specified number of `columns` (default `1`)
relative to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorBackward: (columns?: number) => Ansi
```

Added in v1.0.0

## cursorDown

Moves the cursor down by the specified number of `lines` (default `1`)
relative to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorDown: (lines?: number) => Ansi
```

Added in v1.0.0

## cursorForward

Moves the cursor forward by the specified number of `columns` (default `1`)
relative to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorForward: (columns?: number) => Ansi
```

Added in v1.0.0

## cursorHide

Hides the cursor.

**Signature**

```ts
export declare const cursorHide: Ansi
```

Added in v1.0.0

## cursorLeft

Moves the cursor to the first column of the current row.

**Signature**

```ts
export declare const cursorLeft: Ansi
```

Added in v1.0.0

## cursorMove

Move the cursor position the specified number of `rows` and `columns`
relative to the current cursor position.

If the cursor is already at the edge of the screen in either direction, then
additional movement will have no effect.

**Signature**

```ts
export declare const cursorMove: (column: number, row?: number) => Ansi
```

Added in v1.0.0

## cursorNextLine

Moves cursor to beginning of the line the specified number of rows down
(default `1`).

**Signature**

```ts
export declare const cursorNextLine: (rows?: number) => Ansi
```

Added in v1.0.0

## cursorPrevLine

Moves cursor to beginning of the line the specified number of rows up
(default `1`).

**Signature**

```ts
export declare const cursorPrevLine: (rows?: number) => Ansi
```

Added in v1.0.0

## cursorRestorePosition

Restores the cursor position, encoding shift state and formatting attributes
from the previous save, if any, otherwise resets these all to their defaults.

**Signature**

```ts
export declare const cursorRestorePosition: Ansi
```

Added in v1.0.0

## cursorSavePosition

Saves the cursor position, encoding shift state and formatting attributes.

**Signature**

```ts
export declare const cursorSavePosition: Ansi
```

Added in v1.0.0

## cursorShow

Shows the cursor.

**Signature**

```ts
export declare const cursorShow: Ansi
```

Added in v1.0.0

## cursorTo

Moves the cursor to the specified `row` and `column`.

Though the ANSI Control Sequence for Cursor Position is `1`-based, this
method takes row and column values starting from `0` and adjusts them to `1`-
based values.

**Signature**

```ts
export declare const cursorTo: (column: number, row?: number) => Ansi
```

Added in v1.0.0

## cursorUp

Moves the cursor up by the specified number of `lines` (default `1`) relative
to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorUp: (lines?: number) => Ansi
```

Added in v1.0.0

## eraseDown

Clears from the current cursor position to the end of the screen.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseDown: Ansi
```

Added in v1.0.0

## eraseEndLine

Clears from the current cursor position to the end of the current line.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseEndLine: Ansi
```

Added in v1.0.0

## eraseLine

Clears the current line.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseLine: Ansi
```

Added in v1.0.0

## eraseLines

Erase from the current cursor position up the specified amount of rows.

**Signature**

```ts
export declare const eraseLines: (rows: number) => Ansi
```

Added in v1.0.0

## eraseScreen

Clears the entire screen and move the cursor to the upper left.

**Signature**

```ts
export declare const eraseScreen: Ansi
```

Added in v1.0.0

## eraseStartLine

Clears from the current cursor position to the start of the current line.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseStartLine: Ansi
```

Added in v1.0.0

## eraseUp

Clears from the current cursor position to the beginning of the screen.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseUp: Ansi
```

Added in v1.0.0

# constructors

## bgColor

**Signature**

```ts
export declare const bgColor: (color: Color) => Ansi
```

Added in v1.0.0

## bgColorBright

**Signature**

```ts
export declare const bgColorBright: (color: Color) => Ansi
```

Added in v1.0.0

## bold

**Signature**

```ts
export declare const bold: Ansi
```

Added in v1.0.0

## brightColor

**Signature**

```ts
export declare const brightColor: (color: Color) => Ansi
```

Added in v1.0.0

## color

**Signature**

```ts
export declare const color: (color: Color) => Ansi
```

Added in v1.0.0

## italicized

**Signature**

```ts
export declare const italicized: Ansi
```

Added in v1.0.0

## strikethrough

**Signature**

```ts
export declare const strikethrough: Ansi
```

Added in v1.0.0

## underlined

**Signature**

```ts
export declare const underlined: Ansi
```

Added in v1.0.0

# destructors

## stringify

**Signature**

```ts
export declare const stringify: (self: Ansi) => string
```

Added in v1.0.0

# model

## Ansi (interface)

**Signature**

```ts
export interface Ansi extends Ansi.Proto {}
```

Added in v1.0.0

# symbol

## AnsiTypeId

**Signature**

```ts
export declare const AnsiTypeId: typeof AnsiTypeId
```

Added in v1.0.0

## AnsiTypeId (type alias)

**Signature**

```ts
export type AnsiTypeId = typeof AnsiTypeId
```

Added in v1.0.0

# utils

## Ansi (namespace)

Added in v1.0.0

### Proto (interface)

**Signature**

```ts
export interface Proto {
  readonly [AnsiTypeId]: AnsiTypeId
}
```

Added in v1.0.0

## combine

**Signature**

```ts
export declare const combine: { (that: Ansi): (self: Ansi) => Ansi; (self: Ansi, that: Ansi): Ansi }
```

Added in v1.0.0
