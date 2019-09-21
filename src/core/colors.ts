import * as parse from "parse-color";

/**
 * Convert color to the rgba format
 * @param color
 */
function convertConfigColor(color: string): RGBA {
  if (color === "transparent") {
    color = "rgba(0, 0, 0, 0.0)";
  }
  const { rgba } = parse(color);
  return {
    r: rgba[0] / 255,
    g: rgba[1] / 255,
    b: rgba[2] / 255,
    a: rgba[3]
  };
}

/**
 * Create figma solid color.
 * @param name
 * @param color
 */
function createSolidColor(name: string, color: RGBA) {
  const style = figma.createPaintStyle();

  style.name = name;

  const { r, g, b, a } = color;

  const rgbColor: RGB = { r, g, b };
  const alpha: number = a;

  const solidPaint: SolidPaint = {
    type: "SOLID",
    color: rgbColor,
    opacity: alpha
  };

  style.paints = [solidPaint];
}

/**
 * Add colors to the figma
 * @param payload
 */
export function addColors(colors: DSColor[]): boolean {
  try {
    const localColors = figma.getLocalPaintStyles();
    colors.forEach(({ name, value }) => {
      const localColor = localColors.filter(paint => paint.name === name);
      if (localColors.filter(paint => paint.name === name).length === 0) {
        createSolidColor(name, value);
      } else {
        localColor[0].paints = [
          {
            type: "SOLID",
            color: { r: value.r, g: value.g, b: value.b },
            opacity: value.a
          }
        ];
      }
    });
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

/**
 * Get colors from  config.
 * @param config
 */
export function getConfigColors(config: Record<string, unknown>): DSColor[] {
  if (typeof config.colors === "object") {
    const c = Object.keys(config.colors).reduce((colors, currentKey) => {
      const color = config.colors[currentKey];

      if (typeof color === "object") {
        return [
          ...colors,
          ...Object.keys(color).reduce((childColors, childKey) => {
            return [
              ...childColors,
              {
                name: `${currentKey}/${childKey}`,
                value: convertConfigColor(color[childKey])
              }
            ];
          }, [])
        ];
      }

      return [
        ...colors,
        { name: currentKey, value: convertConfigColor(color) }
      ];
    }, []);

    return c;
  }

  return [];
}
