import { getConfigColors } from "../core/colors";

test("getConfigColors", () => {
  expect(getConfigColors({})).toEqual([]);
  expect(getConfigColors({ colors: {} })).toEqual([]);
  expect(getConfigColors({ colors: {} })).toEqual([]);
  expect(getConfigColors({ colors: { transparent: "transparent" } })).toEqual([
    { name: "transparent", value: { r: 0, g: 0, b: 0, a: 0 } }
  ]);

  expect(
    getConfigColors({ colors: { transparent: "transparent", black: "#000" } })
  ).toEqual([
    { name: "transparent", value: { r: 0, g: 0, b: 0, a: 0 } },
    { name: "black", value: { r: 0, g: 0, b: 0, a: 1 } }
  ]);

  expect(
    getConfigColors({
      colors: {
        transparent: "transparent",
        black: "#000",
        hehe: {
          "100": "#f7fafc"
        }
      }
    })
  ).toEqual([
    { name: "transparent", value: { r: 0, g: 0, b: 0, a: 0 } },
    { name: "black", value: { r: 0, g: 0, b: 0, a: 1 } },
    {
      name: "hehe/100",
      value: {
        b: 0.9882352941176471,
        g: 0.9803921568627451,
        r: 0.9686274509803922,
        a: 1
      }
    }
  ]);
});
