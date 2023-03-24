// 输入框颜色类型校验
export function validateColor(color: string): string {
  const hexReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  const hexaReg = /^#([0-9a-fA-F]{8})$/
  const hsbReg = /^hsb\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+|-?\d+%|-?\d*\.\d+%)){2}\s*\)$/
  const hsbaReg =
    /^hsba\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+|-?\d+%|-?\d*\.\d+%)){2}\s*,\s*(-?\d+|-?\d*\.\d+)\)$/
  // const rgbaReg = /^rgba\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+)){2},\s*(-?\d+|-?\d*\.\d+)|(^\d+%)\s*\)$/
  const rgbaReg = /^rgba\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+)){2},\s*(-?\d+|-?\d*\.\d+)\)$/
  const rgbReg = /^rgb\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+)){2}\)$/
  const hslReg = /^hsl\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+|-?\d+%|-?\d*\.\d+%)){2}\s*\)$/
  const hslaReg =
    /^hsla\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+|-?\d+%|-?\d*\.\d+%)){2}\s*,\s*(-?\d+|-?\d*\.\d+)\)$/
  // const hslaReg = /^hsla\(\s*(-?\d+|-?\d*\.\d+)(?:,\s*(-?\d+|-?\d*\.\d+)){2}\s*,\s*(-?\d+|-?\d*\.\d+)|(^\d+%)\s*\)$/
  const colorNameReg =
    /^(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/

  if (hexReg.test(color)) return 'HEX'
  if (hexaReg.test(color)) return 'HEXA'
  if (hsbReg.test(color)) return 'HSB'
  if (hsbaReg.test(color)) return 'HSBA'
  if (rgbaReg.test(color)) return 'RGBA'
  if (rgbReg.test(color)) return 'RGB'
  if (hslReg.test(color)) return 'HSL'
  if (hslaReg.test(color)) return 'HSLA'
  if (colorNameReg.test(color)) return 'colorName'
  return ''
}
