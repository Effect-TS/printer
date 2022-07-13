/**
 * @tsplus static effect/printer-ansi/SGR.Ops toCode
 * @tsplus getter effect/printer-ansi/SGR toCode
 */
export function toCode(self: SGR): number {
  switch (self._tag) {
    case "Reset": {
      return 0
    }
    case "SetBold": {
      return self.bold ? 1 : 22
    }
    case "SetItalicized": {
      return self.italicized ? 3 : 23
    }
    case "SetUnderlined": {
      return self.underlined ? 4 : 24
    }
    case "SetColor": {
      switch (self.layer._tag) {
        case "Foreground": {
          return self.vivid ? 90 + self.color.toCode : 30 + self.color.toCode
        }
        case "Background": {
          return self.vivid ? 100 + self.color.toCode : 40 + self.color.toCode
        }
      }
    }
  }
}
