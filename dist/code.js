/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/parse-color/index.js":
/*!*******************************************!*\
  !*** ./node_modules/parse-color/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var convert = __webpack_require__(/*! color-convert */ "./node_modules/parse-color/node_modules/color-convert/index.js");

module.exports = function (cstr) {
    var m, conv, parts, alpha;
    if (m = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
        var name = m[1];
        var base = name.replace(/a$/, '');
        var size = base === 'cmyk' ? 4 : 3;
        conv = convert[base];
        
        parts = m[2].replace(/^\s+|\s+$/g, '')
            .split(/\s*,\s*/)
            .map(function (x, i) {
                if (/%$/.test(x) && i === size) {
                    return parseFloat(x) / 100;
                }
                else if (/%$/.test(x)) {
                    return parseFloat(x);
                }
                return parseFloat(x);
            })
        ;
        if (name === base) parts.push(1);
        alpha = parts[size] === undefined ? 1 : parts[size];
        parts = parts.slice(0, size);
        
        conv[base] = function () { return parts };
    }
    else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        var base = cstr.replace(/^#/,'');
        var size = base.length;
        conv = convert.rgb;
        parts = base.split(size === 3 ? /(.)/ : /(..)/);
        parts = parts.filter(Boolean)
            .map(function (x) {
                if (size === 3) {
                    return parseInt(x + x, 16);
                }
                else {
                    return parseInt(x, 16)
                }
            })
        ;
        alpha = 1;
        conv.rgb = function () { return parts };
        if (!parts[0]) parts[0] = 0;
        if (!parts[1]) parts[1] = 0;
        if (!parts[2]) parts[2] = 0;
    }
    else {
        conv = convert.keyword;
        conv.keyword = function () { return cstr };
        parts = cstr;
        alpha = 1;
    }
    
    var res = {
        rgb: undefined,
        hsl: undefined,
        hsv: undefined,
        cmyk: undefined,
        keyword: undefined,
        hex: undefined
    };
    try { res.rgb = conv.rgb(parts) } catch (e) {}
    try { res.hsl = conv.hsl(parts) } catch (e) {}
    try { res.hsv = conv.hsv(parts) } catch (e) {}
    try { res.cmyk = conv.cmyk(parts) } catch (e) {}
    try { res.keyword = conv.keyword(parts) } catch (e) {}
    
    if (res.rgb) res.hex = '#' + res.rgb.map(function (x) {
        var s = x.toString(16);
        if (s.length === 1) return '0' + s;
        return s;
    }).join('');
    
    if (res.rgb) res.rgba = res.rgb.concat(alpha);
    if (res.hsl) res.hsla = res.hsl.concat(alpha);
    if (res.hsv) res.hsva = res.hsv.concat(alpha);
    if (res.cmyk) res.cmyka = res.cmyk.concat(alpha);
    
    return res;
};


/***/ }),

/***/ "./node_modules/parse-color/node_modules/color-convert/conversions.js":
/*!****************************************************************************!*\
  !*** ./node_modules/parse-color/node_modules/color-convert/conversions.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}


/***/ }),

/***/ "./node_modules/parse-color/node_modules/color-convert/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/parse-color/node_modules/color-convert/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/parse-color/node_modules/color-convert/conversions.js");

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;

/***/ }),

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/actions */ "./src/core/actions.ts");
/* harmony import */ var _core_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/colors */ "./src/core/colors.ts");


figma.showUI(__html__);
figma.ui.onmessage = msg => {
    const { type, payload } = msg;
    if (type === _core_actions__WEBPACK_IMPORTED_MODULE_0__["ActionType"].ADD_COLORS) {
        Object(_core_colors__WEBPACK_IMPORTED_MODULE_1__["addColors"])(payload);
    }
    figma.closePlugin();
};


/***/ }),

/***/ "./src/core/actions.ts":
/*!*****************************!*\
  !*** ./src/core/actions.ts ***!
  \*****************************/
/*! exports provided: ActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionType", function() { return ActionType; });
var ActionType;
(function (ActionType) {
    ActionType["ADD_COLORS"] = "ADD_COLORS";
    ActionType["ADD_FONTS"] = "ADD_FONTS";
})(ActionType || (ActionType = {}));


/***/ }),

/***/ "./src/core/colors.ts":
/*!****************************!*\
  !*** ./src/core/colors.ts ***!
  \****************************/
/*! exports provided: addColors, getConfigColors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addColors", function() { return addColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfigColors", function() { return getConfigColors; });
/* harmony import */ var parse_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parse-color */ "./node_modules/parse-color/index.js");
/* harmony import */ var parse_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(parse_color__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Convert color to the rgba format
 * @param color
 */
function convertConfigColor(color) {
    if (color === "transparent") {
        color = "rgba(0, 0, 0, 0.0)";
    }
    const { rgba } = parse_color__WEBPACK_IMPORTED_MODULE_0__(color);
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
function createSolidColor(name, color) {
    const style = figma.createPaintStyle();
    style.name = name;
    const { r, g, b, a } = color;
    const rgbColor = { r, g, b };
    const alpha = a;
    const solidPaint = {
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
function addColors(colors) {
    try {
        const localColors = figma.getLocalPaintStyles();
        colors.forEach(({ name, value }) => {
            const localColor = localColors.filter(paint => paint.name === name);
            if (localColors.filter(paint => paint.name === name).length === 0) {
                createSolidColor(name, value);
            }
            else {
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
    }
    catch (error) {
        alert(error);
        return false;
    }
}
/**
 * Get colors from  config.
 * @param config
 */
function getConfigColors(config) {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNlLWNvbG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYXJzZS1jb2xvci9ub2RlX21vZHVsZXMvY29sb3ItY29udmVydC9jb252ZXJzaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFyc2UtY29sb3Ivbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb2xvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGNBQWMsbUJBQU8sQ0FBQyxxRkFBZTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLDhCQUE4QjtBQUN2QyxTQUFTLG9DQUFvQzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTyxRQUFRO0FBQ2pDLGtCQUFrQixPQUFPLFFBQVE7QUFDakMsbUJBQW1CLE9BQU8sT0FBTztBQUNqQyxtQkFBbUIsT0FBTyxPQUFPO0FBQ2pDLGtCQUFrQixRQUFRLE9BQU87QUFDakMsa0JBQWtCLFFBQVEsT0FBTztBQUNqQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pyQkEsa0JBQWtCLG1CQUFPLENBQUMsMkZBQWU7O0FBRXpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELHlCOzs7Ozs7Ozs7Ozs7QUMzRkE7QUFBQTtBQUFBO0FBQTRDO0FBQ0Y7QUFDMUM7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLGlCQUFpQix3REFBVTtBQUMzQixRQUFRLDhEQUFTO0FBQ2pCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDOzs7Ozs7Ozs7Ozs7O0FDSmpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTyxHQUFHLHdDQUFLO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxQ0FBcUM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsV0FBVyxHQUFHLFNBQVM7QUFDaEU7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwidmFyIGNvbnZlcnQgPSByZXF1aXJlKCdjb2xvci1jb252ZXJ0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzdHIpIHtcbiAgICB2YXIgbSwgY29udiwgcGFydHMsIGFscGhhO1xuICAgIGlmIChtID0gL14oKD86cmdifGhzW2x2XXxjbXlrfHh5enxsYWIpYT8pXFxzKlxcKChbXlxcKV0qKVxcKS8uZXhlYyhjc3RyKSkge1xuICAgICAgICB2YXIgbmFtZSA9IG1bMV07XG4gICAgICAgIHZhciBiYXNlID0gbmFtZS5yZXBsYWNlKC9hJC8sICcnKTtcbiAgICAgICAgdmFyIHNpemUgPSBiYXNlID09PSAnY215aycgPyA0IDogMztcbiAgICAgICAgY29udiA9IGNvbnZlcnRbYmFzZV07XG4gICAgICAgIFxuICAgICAgICBwYXJ0cyA9IG1bMl0ucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG4gICAgICAgICAgICAuc3BsaXQoL1xccyosXFxzKi8pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh4LCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKC8lJC8udGVzdCh4KSAmJiBpID09PSBzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHgpIC8gMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgvJSQvLnRlc3QoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgO1xuICAgICAgICBpZiAobmFtZSA9PT0gYmFzZSkgcGFydHMucHVzaCgxKTtcbiAgICAgICAgYWxwaGEgPSBwYXJ0c1tzaXplXSA9PT0gdW5kZWZpbmVkID8gMSA6IHBhcnRzW3NpemVdO1xuICAgICAgICBwYXJ0cyA9IHBhcnRzLnNsaWNlKDAsIHNpemUpO1xuICAgICAgICBcbiAgICAgICAgY29udltiYXNlXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBhcnRzIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC9eI1tBLUZhLWYwLTldKyQvLnRlc3QoY3N0cikpIHtcbiAgICAgICAgdmFyIGJhc2UgPSBjc3RyLnJlcGxhY2UoL14jLywnJyk7XG4gICAgICAgIHZhciBzaXplID0gYmFzZS5sZW5ndGg7XG4gICAgICAgIGNvbnYgPSBjb252ZXJ0LnJnYjtcbiAgICAgICAgcGFydHMgPSBiYXNlLnNwbGl0KHNpemUgPT09IDMgPyAvKC4pLyA6IC8oLi4pLyk7XG4gICAgICAgIHBhcnRzID0gcGFydHMuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpemUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHggKyB4LCAxNik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoeCwgMTYpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgO1xuICAgICAgICBhbHBoYSA9IDE7XG4gICAgICAgIGNvbnYucmdiID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFydHMgfTtcbiAgICAgICAgaWYgKCFwYXJ0c1swXSkgcGFydHNbMF0gPSAwO1xuICAgICAgICBpZiAoIXBhcnRzWzFdKSBwYXJ0c1sxXSA9IDA7XG4gICAgICAgIGlmICghcGFydHNbMl0pIHBhcnRzWzJdID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnYgPSBjb252ZXJ0LmtleXdvcmQ7XG4gICAgICAgIGNvbnYua2V5d29yZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNzdHIgfTtcbiAgICAgICAgcGFydHMgPSBjc3RyO1xuICAgICAgICBhbHBoYSA9IDE7XG4gICAgfVxuICAgIFxuICAgIHZhciByZXMgPSB7XG4gICAgICAgIHJnYjogdW5kZWZpbmVkLFxuICAgICAgICBoc2w6IHVuZGVmaW5lZCxcbiAgICAgICAgaHN2OiB1bmRlZmluZWQsXG4gICAgICAgIGNteWs6IHVuZGVmaW5lZCxcbiAgICAgICAga2V5d29yZDogdW5kZWZpbmVkLFxuICAgICAgICBoZXg6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgdHJ5IHsgcmVzLnJnYiA9IGNvbnYucmdiKHBhcnRzKSB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7IHJlcy5oc2wgPSBjb252LmhzbChwYXJ0cykgfSBjYXRjaCAoZSkge31cbiAgICB0cnkgeyByZXMuaHN2ID0gY29udi5oc3YocGFydHMpIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHsgcmVzLmNteWsgPSBjb252LmNteWsocGFydHMpIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHsgcmVzLmtleXdvcmQgPSBjb252LmtleXdvcmQocGFydHMpIH0gY2F0Y2ggKGUpIHt9XG4gICAgXG4gICAgaWYgKHJlcy5yZ2IpIHJlcy5oZXggPSAnIycgKyByZXMucmdiLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICB2YXIgcyA9IHgudG9TdHJpbmcoMTYpO1xuICAgICAgICBpZiAocy5sZW5ndGggPT09IDEpIHJldHVybiAnMCcgKyBzO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9KS5qb2luKCcnKTtcbiAgICBcbiAgICBpZiAocmVzLnJnYikgcmVzLnJnYmEgPSByZXMucmdiLmNvbmNhdChhbHBoYSk7XG4gICAgaWYgKHJlcy5oc2wpIHJlcy5oc2xhID0gcmVzLmhzbC5jb25jYXQoYWxwaGEpO1xuICAgIGlmIChyZXMuaHN2KSByZXMuaHN2YSA9IHJlcy5oc3YuY29uY2F0KGFscGhhKTtcbiAgICBpZiAocmVzLmNteWspIHJlcy5jbXlrYSA9IHJlcy5jbXlrLmNvbmNhdChhbHBoYSk7XG4gICAgXG4gICAgcmV0dXJuIHJlcztcbn07XG4iLCIvKiBNSVQgbGljZW5zZSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmdiMmhzbDogcmdiMmhzbCxcbiAgcmdiMmhzdjogcmdiMmhzdixcbiAgcmdiMmh3YjogcmdiMmh3YixcbiAgcmdiMmNteWs6IHJnYjJjbXlrLFxuICByZ2Iya2V5d29yZDogcmdiMmtleXdvcmQsXG4gIHJnYjJ4eXo6IHJnYjJ4eXosXG4gIHJnYjJsYWI6IHJnYjJsYWIsXG4gIHJnYjJsY2g6IHJnYjJsY2gsXG5cbiAgaHNsMnJnYjogaHNsMnJnYixcbiAgaHNsMmhzdjogaHNsMmhzdixcbiAgaHNsMmh3YjogaHNsMmh3YixcbiAgaHNsMmNteWs6IGhzbDJjbXlrLFxuICBoc2wya2V5d29yZDogaHNsMmtleXdvcmQsXG5cbiAgaHN2MnJnYjogaHN2MnJnYixcbiAgaHN2MmhzbDogaHN2MmhzbCxcbiAgaHN2Mmh3YjogaHN2Mmh3YixcbiAgaHN2MmNteWs6IGhzdjJjbXlrLFxuICBoc3Yya2V5d29yZDogaHN2MmtleXdvcmQsXG5cbiAgaHdiMnJnYjogaHdiMnJnYixcbiAgaHdiMmhzbDogaHdiMmhzbCxcbiAgaHdiMmhzdjogaHdiMmhzdixcbiAgaHdiMmNteWs6IGh3YjJjbXlrLFxuICBod2Iya2V5d29yZDogaHdiMmtleXdvcmQsXG5cbiAgY215azJyZ2I6IGNteWsycmdiLFxuICBjbXlrMmhzbDogY215azJoc2wsXG4gIGNteWsyaHN2OiBjbXlrMmhzdixcbiAgY215azJod2I6IGNteWsyaHdiLFxuICBjbXlrMmtleXdvcmQ6IGNteWsya2V5d29yZCxcblxuICBrZXl3b3JkMnJnYjoga2V5d29yZDJyZ2IsXG4gIGtleXdvcmQyaHNsOiBrZXl3b3JkMmhzbCxcbiAga2V5d29yZDJoc3Y6IGtleXdvcmQyaHN2LFxuICBrZXl3b3JkMmh3Yjoga2V5d29yZDJod2IsXG4gIGtleXdvcmQyY215azoga2V5d29yZDJjbXlrLFxuICBrZXl3b3JkMmxhYjoga2V5d29yZDJsYWIsXG4gIGtleXdvcmQyeHl6OiBrZXl3b3JkMnh5eixcblxuICB4eXoycmdiOiB4eXoycmdiLFxuICB4eXoybGFiOiB4eXoybGFiLFxuICB4eXoybGNoOiB4eXoybGNoLFxuXG4gIGxhYjJ4eXo6IGxhYjJ4eXosXG4gIGxhYjJyZ2I6IGxhYjJyZ2IsXG4gIGxhYjJsY2g6IGxhYjJsY2gsXG5cbiAgbGNoMmxhYjogbGNoMmxhYixcbiAgbGNoMnh5ejogbGNoMnh5eixcbiAgbGNoMnJnYjogbGNoMnJnYlxufVxuXG5cbmZ1bmN0aW9uIHJnYjJoc2wocmdiKSB7XG4gIHZhciByID0gcmdiWzBdLzI1NSxcbiAgICAgIGcgPSByZ2JbMV0vMjU1LFxuICAgICAgYiA9IHJnYlsyXS8yNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICBoLCBzLCBsO1xuXG4gIGlmIChtYXggPT0gbWluKVxuICAgIGggPSAwO1xuICBlbHNlIGlmIChyID09IG1heClcbiAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICBlbHNlIGlmIChnID09IG1heClcbiAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgZWxzZSBpZiAoYiA9PSBtYXgpXG4gICAgaCA9IDQgKyAociAtIGcpLyBkZWx0YTtcblxuICBoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG4gIGlmIChoIDwgMClcbiAgICBoICs9IDM2MDtcblxuICBsID0gKG1pbiArIG1heCkgLyAyO1xuXG4gIGlmIChtYXggPT0gbWluKVxuICAgIHMgPSAwO1xuICBlbHNlIGlmIChsIDw9IDAuNSlcbiAgICBzID0gZGVsdGEgLyAobWF4ICsgbWluKTtcbiAgZWxzZVxuICAgIHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblxuICByZXR1cm4gW2gsIHMgKiAxMDAsIGwgKiAxMDBdO1xufVxuXG5mdW5jdGlvbiByZ2IyaHN2KHJnYikge1xuICB2YXIgciA9IHJnYlswXSxcbiAgICAgIGcgPSByZ2JbMV0sXG4gICAgICBiID0gcmdiWzJdLFxuICAgICAgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgIGRlbHRhID0gbWF4IC0gbWluLFxuICAgICAgaCwgcywgdjtcblxuICBpZiAobWF4ID09IDApXG4gICAgcyA9IDA7XG4gIGVsc2VcbiAgICBzID0gKGRlbHRhL21heCAqIDEwMDApLzEwO1xuXG4gIGlmIChtYXggPT0gbWluKVxuICAgIGggPSAwO1xuICBlbHNlIGlmIChyID09IG1heClcbiAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICBlbHNlIGlmIChnID09IG1heClcbiAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgZWxzZSBpZiAoYiA9PSBtYXgpXG4gICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cbiAgaCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuICBpZiAoaCA8IDApXG4gICAgaCArPSAzNjA7XG5cbiAgdiA9ICgobWF4IC8gMjU1KSAqIDEwMDApIC8gMTA7XG5cbiAgcmV0dXJuIFtoLCBzLCB2XTtcbn1cblxuZnVuY3Rpb24gcmdiMmh3YihyZ2IpIHtcbiAgdmFyIHIgPSByZ2JbMF0sXG4gICAgICBnID0gcmdiWzFdLFxuICAgICAgYiA9IHJnYlsyXSxcbiAgICAgIGggPSByZ2IyaHNsKHJnYilbMF0sXG4gICAgICB3ID0gMS8yNTUgKiBNYXRoLm1pbihyLCBNYXRoLm1pbihnLCBiKSksXG4gICAgICBiID0gMSAtIDEvMjU1ICogTWF0aC5tYXgociwgTWF0aC5tYXgoZywgYikpO1xuXG4gIHJldHVybiBbaCwgdyAqIDEwMCwgYiAqIDEwMF07XG59XG5cbmZ1bmN0aW9uIHJnYjJjbXlrKHJnYikge1xuICB2YXIgciA9IHJnYlswXSAvIDI1NSxcbiAgICAgIGcgPSByZ2JbMV0gLyAyNTUsXG4gICAgICBiID0gcmdiWzJdIC8gMjU1LFxuICAgICAgYywgbSwgeSwgaztcblxuICBrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYik7XG4gIGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaykgfHwgMDtcbiAgbSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKSB8fCAwO1xuICB5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspIHx8IDA7XG4gIHJldHVybiBbYyAqIDEwMCwgbSAqIDEwMCwgeSAqIDEwMCwgayAqIDEwMF07XG59XG5cbmZ1bmN0aW9uIHJnYjJrZXl3b3JkKHJnYikge1xuICByZXR1cm4gcmV2ZXJzZUtleXdvcmRzW0pTT04uc3RyaW5naWZ5KHJnYildO1xufVxuXG5mdW5jdGlvbiByZ2IyeHl6KHJnYikge1xuICB2YXIgciA9IHJnYlswXSAvIDI1NSxcbiAgICAgIGcgPSByZ2JbMV0gLyAyNTUsXG4gICAgICBiID0gcmdiWzJdIC8gMjU1O1xuXG4gIC8vIGFzc3VtZSBzUkdCXG4gIHIgPSByID4gMC4wNDA0NSA/IE1hdGgucG93KCgociArIDAuMDU1KSAvIDEuMDU1KSwgMi40KSA6IChyIC8gMTIuOTIpO1xuICBnID0gZyA+IDAuMDQwNDUgPyBNYXRoLnBvdygoKGcgKyAwLjA1NSkgLyAxLjA1NSksIDIuNCkgOiAoZyAvIDEyLjkyKTtcbiAgYiA9IGIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKChiICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpIDogKGIgLyAxMi45Mik7XG5cbiAgdmFyIHggPSAociAqIDAuNDEyNCkgKyAoZyAqIDAuMzU3NikgKyAoYiAqIDAuMTgwNSk7XG4gIHZhciB5ID0gKHIgKiAwLjIxMjYpICsgKGcgKiAwLjcxNTIpICsgKGIgKiAwLjA3MjIpO1xuICB2YXIgeiA9IChyICogMC4wMTkzKSArIChnICogMC4xMTkyKSArIChiICogMC45NTA1KTtcblxuICByZXR1cm4gW3ggKiAxMDAsIHkgKjEwMCwgeiAqIDEwMF07XG59XG5cbmZ1bmN0aW9uIHJnYjJsYWIocmdiKSB7XG4gIHZhciB4eXogPSByZ2IyeHl6KHJnYiksXG4gICAgICAgIHggPSB4eXpbMF0sXG4gICAgICAgIHkgPSB4eXpbMV0sXG4gICAgICAgIHogPSB4eXpbMl0sXG4gICAgICAgIGwsIGEsIGI7XG5cbiAgeCAvPSA5NS4wNDc7XG4gIHkgLz0gMTAwO1xuICB6IC89IDEwOC44ODM7XG5cbiAgeCA9IHggPiAwLjAwODg1NiA/IE1hdGgucG93KHgsIDEvMykgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG4gIHkgPSB5ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh5LCAxLzMpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuICB6ID0geiA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeiwgMS8zKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuICBsID0gKDExNiAqIHkpIC0gMTY7XG4gIGEgPSA1MDAgKiAoeCAtIHkpO1xuICBiID0gMjAwICogKHkgLSB6KTtcblxuICByZXR1cm4gW2wsIGEsIGJdO1xufVxuXG5mdW5jdGlvbiByZ2IybGNoKGFyZ3MpIHtcbiAgcmV0dXJuIGxhYjJsY2gocmdiMmxhYihhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIGhzbDJyZ2IoaHNsKSB7XG4gIHZhciBoID0gaHNsWzBdIC8gMzYwLFxuICAgICAgcyA9IGhzbFsxXSAvIDEwMCxcbiAgICAgIGwgPSBoc2xbMl0gLyAxMDAsXG4gICAgICB0MSwgdDIsIHQzLCByZ2IsIHZhbDtcblxuICBpZiAocyA9PSAwKSB7XG4gICAgdmFsID0gbCAqIDI1NTtcbiAgICByZXR1cm4gW3ZhbCwgdmFsLCB2YWxdO1xuICB9XG5cbiAgaWYgKGwgPCAwLjUpXG4gICAgdDIgPSBsICogKDEgKyBzKTtcbiAgZWxzZVxuICAgIHQyID0gbCArIHMgLSBsICogcztcbiAgdDEgPSAyICogbCAtIHQyO1xuXG4gIHJnYiA9IFswLCAwLCAwXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICB0MyA9IGggKyAxIC8gMyAqIC0gKGkgLSAxKTtcbiAgICB0MyA8IDAgJiYgdDMrKztcbiAgICB0MyA+IDEgJiYgdDMtLTtcblxuICAgIGlmICg2ICogdDMgPCAxKVxuICAgICAgdmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG4gICAgZWxzZSBpZiAoMiAqIHQzIDwgMSlcbiAgICAgIHZhbCA9IHQyO1xuICAgIGVsc2UgaWYgKDMgKiB0MyA8IDIpXG4gICAgICB2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG4gICAgZWxzZVxuICAgICAgdmFsID0gdDE7XG5cbiAgICByZ2JbaV0gPSB2YWwgKiAyNTU7XG4gIH1cblxuICByZXR1cm4gcmdiO1xufVxuXG5mdW5jdGlvbiBoc2wyaHN2KGhzbCkge1xuICB2YXIgaCA9IGhzbFswXSxcbiAgICAgIHMgPSBoc2xbMV0gLyAxMDAsXG4gICAgICBsID0gaHNsWzJdIC8gMTAwLFxuICAgICAgc3YsIHY7XG5cbiAgaWYobCA9PT0gMCkge1xuICAgICAgLy8gbm8gbmVlZCB0byBkbyBjYWxjIG9uIGJsYWNrXG4gICAgICAvLyBhbHNvIGF2b2lkcyBkaXZpZGUgYnkgMCBlcnJvclxuICAgICAgcmV0dXJuIFswLCAwLCAwXTtcbiAgfVxuXG4gIGwgKj0gMjtcbiAgcyAqPSAobCA8PSAxKSA/IGwgOiAyIC0gbDtcbiAgdiA9IChsICsgcykgLyAyO1xuICBzdiA9ICgyICogcykgLyAobCArIHMpO1xuICByZXR1cm4gW2gsIHN2ICogMTAwLCB2ICogMTAwXTtcbn1cblxuZnVuY3Rpb24gaHNsMmh3YihhcmdzKSB7XG4gIHJldHVybiByZ2IyaHdiKGhzbDJyZ2IoYXJncykpO1xufVxuXG5mdW5jdGlvbiBoc2wyY215ayhhcmdzKSB7XG4gIHJldHVybiByZ2IyY215ayhoc2wycmdiKGFyZ3MpKTtcbn1cblxuZnVuY3Rpb24gaHNsMmtleXdvcmQoYXJncykge1xuICByZXR1cm4gcmdiMmtleXdvcmQoaHNsMnJnYihhcmdzKSk7XG59XG5cblxuZnVuY3Rpb24gaHN2MnJnYihoc3YpIHtcbiAgdmFyIGggPSBoc3ZbMF0gLyA2MCxcbiAgICAgIHMgPSBoc3ZbMV0gLyAxMDAsXG4gICAgICB2ID0gaHN2WzJdIC8gMTAwLFxuICAgICAgaGkgPSBNYXRoLmZsb29yKGgpICUgNjtcblxuICB2YXIgZiA9IGggLSBNYXRoLmZsb29yKGgpLFxuICAgICAgcCA9IDI1NSAqIHYgKiAoMSAtIHMpLFxuICAgICAgcSA9IDI1NSAqIHYgKiAoMSAtIChzICogZikpLFxuICAgICAgdCA9IDI1NSAqIHYgKiAoMSAtIChzICogKDEgLSBmKSkpLFxuICAgICAgdiA9IDI1NSAqIHY7XG5cbiAgc3dpdGNoKGhpKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIFt2LCB0LCBwXTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gW3EsIHYsIHBdO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBbcCwgdiwgdF07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFtwLCBxLCB2XTtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gW3QsIHAsIHZdO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBbdiwgcCwgcV07XG4gIH1cbn1cblxuZnVuY3Rpb24gaHN2MmhzbChoc3YpIHtcbiAgdmFyIGggPSBoc3ZbMF0sXG4gICAgICBzID0gaHN2WzFdIC8gMTAwLFxuICAgICAgdiA9IGhzdlsyXSAvIDEwMCxcbiAgICAgIHNsLCBsO1xuXG4gIGwgPSAoMiAtIHMpICogdjtcbiAgc2wgPSBzICogdjtcbiAgc2wgLz0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG4gIHNsID0gc2wgfHwgMDtcbiAgbCAvPSAyO1xuICByZXR1cm4gW2gsIHNsICogMTAwLCBsICogMTAwXTtcbn1cblxuZnVuY3Rpb24gaHN2Mmh3YihhcmdzKSB7XG4gIHJldHVybiByZ2IyaHdiKGhzdjJyZ2IoYXJncykpXG59XG5cbmZ1bmN0aW9uIGhzdjJjbXlrKGFyZ3MpIHtcbiAgcmV0dXJuIHJnYjJjbXlrKGhzdjJyZ2IoYXJncykpO1xufVxuXG5mdW5jdGlvbiBoc3Yya2V5d29yZChhcmdzKSB7XG4gIHJldHVybiByZ2Iya2V5d29yZChoc3YycmdiKGFyZ3MpKTtcbn1cblxuLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyNod2ItdG8tcmdiXG5mdW5jdGlvbiBod2IycmdiKGh3Yikge1xuICB2YXIgaCA9IGh3YlswXSAvIDM2MCxcbiAgICAgIHdoID0gaHdiWzFdIC8gMTAwLFxuICAgICAgYmwgPSBod2JbMl0gLyAxMDAsXG4gICAgICByYXRpbyA9IHdoICsgYmwsXG4gICAgICBpLCB2LCBmLCBuO1xuXG4gIC8vIHdoICsgYmwgY2FudCBiZSA+IDFcbiAgaWYgKHJhdGlvID4gMSkge1xuICAgIHdoIC89IHJhdGlvO1xuICAgIGJsIC89IHJhdGlvO1xuICB9XG5cbiAgaSA9IE1hdGguZmxvb3IoNiAqIGgpO1xuICB2ID0gMSAtIGJsO1xuICBmID0gNiAqIGggLSBpO1xuICBpZiAoKGkgJiAweDAxKSAhPSAwKSB7XG4gICAgZiA9IDEgLSBmO1xuICB9XG4gIG4gPSB3aCArIGYgKiAodiAtIHdoKTsgIC8vIGxpbmVhciBpbnRlcnBvbGF0aW9uXG5cbiAgc3dpdGNoIChpKSB7XG4gICAgZGVmYXVsdDpcbiAgICBjYXNlIDY6XG4gICAgY2FzZSAwOiByID0gdjsgZyA9IG47IGIgPSB3aDsgYnJlYWs7XG4gICAgY2FzZSAxOiByID0gbjsgZyA9IHY7IGIgPSB3aDsgYnJlYWs7XG4gICAgY2FzZSAyOiByID0gd2g7IGcgPSB2OyBiID0gbjsgYnJlYWs7XG4gICAgY2FzZSAzOiByID0gd2g7IGcgPSBuOyBiID0gdjsgYnJlYWs7XG4gICAgY2FzZSA0OiByID0gbjsgZyA9IHdoOyBiID0gdjsgYnJlYWs7XG4gICAgY2FzZSA1OiByID0gdjsgZyA9IHdoOyBiID0gbjsgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufVxuXG5mdW5jdGlvbiBod2IyaHNsKGFyZ3MpIHtcbiAgcmV0dXJuIHJnYjJoc2woaHdiMnJnYihhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIGh3YjJoc3YoYXJncykge1xuICByZXR1cm4gcmdiMmhzdihod2IycmdiKGFyZ3MpKTtcbn1cblxuZnVuY3Rpb24gaHdiMmNteWsoYXJncykge1xuICByZXR1cm4gcmdiMmNteWsoaHdiMnJnYihhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIGh3YjJrZXl3b3JkKGFyZ3MpIHtcbiAgcmV0dXJuIHJnYjJrZXl3b3JkKGh3YjJyZ2IoYXJncykpO1xufVxuXG5mdW5jdGlvbiBjbXlrMnJnYihjbXlrKSB7XG4gIHZhciBjID0gY215a1swXSAvIDEwMCxcbiAgICAgIG0gPSBjbXlrWzFdIC8gMTAwLFxuICAgICAgeSA9IGNteWtbMl0gLyAxMDAsXG4gICAgICBrID0gY215a1szXSAvIDEwMCxcbiAgICAgIHIsIGcsIGI7XG5cbiAgciA9IDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspO1xuICBnID0gMSAtIE1hdGgubWluKDEsIG0gKiAoMSAtIGspICsgayk7XG4gIGIgPSAxIC0gTWF0aC5taW4oMSwgeSAqICgxIC0gaykgKyBrKTtcbiAgcmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn1cblxuZnVuY3Rpb24gY215azJoc2woYXJncykge1xuICByZXR1cm4gcmdiMmhzbChjbXlrMnJnYihhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIGNteWsyaHN2KGFyZ3MpIHtcbiAgcmV0dXJuIHJnYjJoc3YoY215azJyZ2IoYXJncykpO1xufVxuXG5mdW5jdGlvbiBjbXlrMmh3YihhcmdzKSB7XG4gIHJldHVybiByZ2IyaHdiKGNteWsycmdiKGFyZ3MpKTtcbn1cblxuZnVuY3Rpb24gY215azJrZXl3b3JkKGFyZ3MpIHtcbiAgcmV0dXJuIHJnYjJrZXl3b3JkKGNteWsycmdiKGFyZ3MpKTtcbn1cblxuXG5mdW5jdGlvbiB4eXoycmdiKHh5eikge1xuICB2YXIgeCA9IHh5elswXSAvIDEwMCxcbiAgICAgIHkgPSB4eXpbMV0gLyAxMDAsXG4gICAgICB6ID0geHl6WzJdIC8gMTAwLFxuICAgICAgciwgZywgYjtcblxuICByID0gKHggKiAzLjI0MDYpICsgKHkgKiAtMS41MzcyKSArICh6ICogLTAuNDk4Nik7XG4gIGcgPSAoeCAqIC0wLjk2ODkpICsgKHkgKiAxLjg3NTgpICsgKHogKiAwLjA0MTUpO1xuICBiID0gKHggKiAwLjA1NTcpICsgKHkgKiAtMC4yMDQwKSArICh6ICogMS4wNTcwKTtcblxuICAvLyBhc3N1bWUgc1JHQlxuICByID0gciA+IDAuMDAzMTMwOCA/ICgoMS4wNTUgKiBNYXRoLnBvdyhyLCAxLjAgLyAyLjQpKSAtIDAuMDU1KVxuICAgIDogciA9IChyICogMTIuOTIpO1xuXG4gIGcgPSBnID4gMC4wMDMxMzA4ID8gKCgxLjA1NSAqIE1hdGgucG93KGcsIDEuMCAvIDIuNCkpIC0gMC4wNTUpXG4gICAgOiBnID0gKGcgKiAxMi45Mik7XG5cbiAgYiA9IGIgPiAwLjAwMzEzMDggPyAoKDEuMDU1ICogTWF0aC5wb3coYiwgMS4wIC8gMi40KSkgLSAwLjA1NSlcbiAgICA6IGIgPSAoYiAqIDEyLjkyKTtcblxuICByID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgciksIDEpO1xuICBnID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgZyksIDEpO1xuICBiID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgYiksIDEpO1xuXG4gIHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59XG5cbmZ1bmN0aW9uIHh5ejJsYWIoeHl6KSB7XG4gIHZhciB4ID0geHl6WzBdLFxuICAgICAgeSA9IHh5elsxXSxcbiAgICAgIHogPSB4eXpbMl0sXG4gICAgICBsLCBhLCBiO1xuXG4gIHggLz0gOTUuMDQ3O1xuICB5IC89IDEwMDtcbiAgeiAvPSAxMDguODgzO1xuXG4gIHggPSB4ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh4LCAxLzMpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuICB5ID0geSA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeSwgMS8zKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcbiAgeiA9IHogPiAwLjAwODg1NiA/IE1hdGgucG93KHosIDEvMykgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cbiAgbCA9ICgxMTYgKiB5KSAtIDE2O1xuICBhID0gNTAwICogKHggLSB5KTtcbiAgYiA9IDIwMCAqICh5IC0geik7XG5cbiAgcmV0dXJuIFtsLCBhLCBiXTtcbn1cblxuZnVuY3Rpb24geHl6MmxjaChhcmdzKSB7XG4gIHJldHVybiBsYWIybGNoKHh5ejJsYWIoYXJncykpO1xufVxuXG5mdW5jdGlvbiBsYWIyeHl6KGxhYikge1xuICB2YXIgbCA9IGxhYlswXSxcbiAgICAgIGEgPSBsYWJbMV0sXG4gICAgICBiID0gbGFiWzJdLFxuICAgICAgeCwgeSwgeiwgeTI7XG5cbiAgaWYgKGwgPD0gOCkge1xuICAgIHkgPSAobCAqIDEwMCkgLyA5MDMuMztcbiAgICB5MiA9ICg3Ljc4NyAqICh5IC8gMTAwKSkgKyAoMTYgLyAxMTYpO1xuICB9IGVsc2Uge1xuICAgIHkgPSAxMDAgKiBNYXRoLnBvdygobCArIDE2KSAvIDExNiwgMyk7XG4gICAgeTIgPSBNYXRoLnBvdyh5IC8gMTAwLCAxLzMpO1xuICB9XG5cbiAgeCA9IHggLyA5NS4wNDcgPD0gMC4wMDg4NTYgPyB4ID0gKDk1LjA0NyAqICgoYSAvIDUwMCkgKyB5MiAtICgxNiAvIDExNikpKSAvIDcuNzg3IDogOTUuMDQ3ICogTWF0aC5wb3coKGEgLyA1MDApICsgeTIsIDMpO1xuXG4gIHogPSB6IC8gMTA4Ljg4MyA8PSAwLjAwODg1OSA/IHogPSAoMTA4Ljg4MyAqICh5MiAtIChiIC8gMjAwKSAtICgxNiAvIDExNikpKSAvIDcuNzg3IDogMTA4Ljg4MyAqIE1hdGgucG93KHkyIC0gKGIgLyAyMDApLCAzKTtcblxuICByZXR1cm4gW3gsIHksIHpdO1xufVxuXG5mdW5jdGlvbiBsYWIybGNoKGxhYikge1xuICB2YXIgbCA9IGxhYlswXSxcbiAgICAgIGEgPSBsYWJbMV0sXG4gICAgICBiID0gbGFiWzJdLFxuICAgICAgaHIsIGgsIGM7XG5cbiAgaHIgPSBNYXRoLmF0YW4yKGIsIGEpO1xuICBoID0gaHIgKiAzNjAgLyAyIC8gTWF0aC5QSTtcbiAgaWYgKGggPCAwKSB7XG4gICAgaCArPSAzNjA7XG4gIH1cbiAgYyA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcbiAgcmV0dXJuIFtsLCBjLCBoXTtcbn1cblxuZnVuY3Rpb24gbGFiMnJnYihhcmdzKSB7XG4gIHJldHVybiB4eXoycmdiKGxhYjJ4eXooYXJncykpO1xufVxuXG5mdW5jdGlvbiBsY2gybGFiKGxjaCkge1xuICB2YXIgbCA9IGxjaFswXSxcbiAgICAgIGMgPSBsY2hbMV0sXG4gICAgICBoID0gbGNoWzJdLFxuICAgICAgYSwgYiwgaHI7XG5cbiAgaHIgPSBoIC8gMzYwICogMiAqIE1hdGguUEk7XG4gIGEgPSBjICogTWF0aC5jb3MoaHIpO1xuICBiID0gYyAqIE1hdGguc2luKGhyKTtcbiAgcmV0dXJuIFtsLCBhLCBiXTtcbn1cblxuZnVuY3Rpb24gbGNoMnh5eihhcmdzKSB7XG4gIHJldHVybiBsYWIyeHl6KGxjaDJsYWIoYXJncykpO1xufVxuXG5mdW5jdGlvbiBsY2gycmdiKGFyZ3MpIHtcbiAgcmV0dXJuIGxhYjJyZ2IobGNoMmxhYihhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIGtleXdvcmQycmdiKGtleXdvcmQpIHtcbiAgcmV0dXJuIGNzc0tleXdvcmRzW2tleXdvcmRdO1xufVxuXG5mdW5jdGlvbiBrZXl3b3JkMmhzbChhcmdzKSB7XG4gIHJldHVybiByZ2IyaHNsKGtleXdvcmQycmdiKGFyZ3MpKTtcbn1cblxuZnVuY3Rpb24ga2V5d29yZDJoc3YoYXJncykge1xuICByZXR1cm4gcmdiMmhzdihrZXl3b3JkMnJnYihhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIGtleXdvcmQyaHdiKGFyZ3MpIHtcbiAgcmV0dXJuIHJnYjJod2Ioa2V5d29yZDJyZ2IoYXJncykpO1xufVxuXG5mdW5jdGlvbiBrZXl3b3JkMmNteWsoYXJncykge1xuICByZXR1cm4gcmdiMmNteWsoa2V5d29yZDJyZ2IoYXJncykpO1xufVxuXG5mdW5jdGlvbiBrZXl3b3JkMmxhYihhcmdzKSB7XG4gIHJldHVybiByZ2IybGFiKGtleXdvcmQycmdiKGFyZ3MpKTtcbn1cblxuZnVuY3Rpb24ga2V5d29yZDJ4eXooYXJncykge1xuICByZXR1cm4gcmdiMnh5eihrZXl3b3JkMnJnYihhcmdzKSk7XG59XG5cbnZhciBjc3NLZXl3b3JkcyA9IHtcbiAgYWxpY2VibHVlOiAgWzI0MCwyNDgsMjU1XSxcbiAgYW50aXF1ZXdoaXRlOiBbMjUwLDIzNSwyMTVdLFxuICBhcXVhOiBbMCwyNTUsMjU1XSxcbiAgYXF1YW1hcmluZTogWzEyNywyNTUsMjEyXSxcbiAgYXp1cmU6ICBbMjQwLDI1NSwyNTVdLFxuICBiZWlnZTogIFsyNDUsMjQ1LDIyMF0sXG4gIGJpc3F1ZTogWzI1NSwyMjgsMTk2XSxcbiAgYmxhY2s6ICBbMCwwLDBdLFxuICBibGFuY2hlZGFsbW9uZDogWzI1NSwyMzUsMjA1XSxcbiAgYmx1ZTogWzAsMCwyNTVdLFxuICBibHVldmlvbGV0OiBbMTM4LDQzLDIyNl0sXG4gIGJyb3duOiAgWzE2NSw0Miw0Ml0sXG4gIGJ1cmx5d29vZDogIFsyMjIsMTg0LDEzNV0sXG4gIGNhZGV0Ymx1ZTogIFs5NSwxNTgsMTYwXSxcbiAgY2hhcnRyZXVzZTogWzEyNywyNTUsMF0sXG4gIGNob2NvbGF0ZTogIFsyMTAsMTA1LDMwXSxcbiAgY29yYWw6ICBbMjU1LDEyNyw4MF0sXG4gIGNvcm5mbG93ZXJibHVlOiBbMTAwLDE0OSwyMzddLFxuICBjb3Juc2lsazogWzI1NSwyNDgsMjIwXSxcbiAgY3JpbXNvbjogIFsyMjAsMjAsNjBdLFxuICBjeWFuOiBbMCwyNTUsMjU1XSxcbiAgZGFya2JsdWU6IFswLDAsMTM5XSxcbiAgZGFya2N5YW46IFswLDEzOSwxMzldLFxuICBkYXJrZ29sZGVucm9kOiAgWzE4NCwxMzQsMTFdLFxuICBkYXJrZ3JheTogWzE2OSwxNjksMTY5XSxcbiAgZGFya2dyZWVuOiAgWzAsMTAwLDBdLFxuICBkYXJrZ3JleTogWzE2OSwxNjksMTY5XSxcbiAgZGFya2toYWtpOiAgWzE4OSwxODMsMTA3XSxcbiAgZGFya21hZ2VudGE6ICBbMTM5LDAsMTM5XSxcbiAgZGFya29saXZlZ3JlZW46IFs4NSwxMDcsNDddLFxuICBkYXJrb3JhbmdlOiBbMjU1LDE0MCwwXSxcbiAgZGFya29yY2hpZDogWzE1Myw1MCwyMDRdLFxuICBkYXJrcmVkOiAgWzEzOSwwLDBdLFxuICBkYXJrc2FsbW9uOiBbMjMzLDE1MCwxMjJdLFxuICBkYXJrc2VhZ3JlZW46IFsxNDMsMTg4LDE0M10sXG4gIGRhcmtzbGF0ZWJsdWU6ICBbNzIsNjEsMTM5XSxcbiAgZGFya3NsYXRlZ3JheTogIFs0Nyw3OSw3OV0sXG4gIGRhcmtzbGF0ZWdyZXk6ICBbNDcsNzksNzldLFxuICBkYXJrdHVycXVvaXNlOiAgWzAsMjA2LDIwOV0sXG4gIGRhcmt2aW9sZXQ6IFsxNDgsMCwyMTFdLFxuICBkZWVwcGluazogWzI1NSwyMCwxNDddLFxuICBkZWVwc2t5Ymx1ZTogIFswLDE5MSwyNTVdLFxuICBkaW1ncmF5OiAgWzEwNSwxMDUsMTA1XSxcbiAgZGltZ3JleTogIFsxMDUsMTA1LDEwNV0sXG4gIGRvZGdlcmJsdWU6IFszMCwxNDQsMjU1XSxcbiAgZmlyZWJyaWNrOiAgWzE3OCwzNCwzNF0sXG4gIGZsb3JhbHdoaXRlOiAgWzI1NSwyNTAsMjQwXSxcbiAgZm9yZXN0Z3JlZW46ICBbMzQsMTM5LDM0XSxcbiAgZnVjaHNpYTogIFsyNTUsMCwyNTVdLFxuICBnYWluc2Jvcm86ICBbMjIwLDIyMCwyMjBdLFxuICBnaG9zdHdoaXRlOiBbMjQ4LDI0OCwyNTVdLFxuICBnb2xkOiBbMjU1LDIxNSwwXSxcbiAgZ29sZGVucm9kOiAgWzIxOCwxNjUsMzJdLFxuICBncmF5OiBbMTI4LDEyOCwxMjhdLFxuICBncmVlbjogIFswLDEyOCwwXSxcbiAgZ3JlZW55ZWxsb3c6ICBbMTczLDI1NSw0N10sXG4gIGdyZXk6IFsxMjgsMTI4LDEyOF0sXG4gIGhvbmV5ZGV3OiBbMjQwLDI1NSwyNDBdLFxuICBob3RwaW5rOiAgWzI1NSwxMDUsMTgwXSxcbiAgaW5kaWFucmVkOiAgWzIwNSw5Miw5Ml0sXG4gIGluZGlnbzogWzc1LDAsMTMwXSxcbiAgaXZvcnk6ICBbMjU1LDI1NSwyNDBdLFxuICBraGFraTogIFsyNDAsMjMwLDE0MF0sXG4gIGxhdmVuZGVyOiBbMjMwLDIzMCwyNTBdLFxuICBsYXZlbmRlcmJsdXNoOiAgWzI1NSwyNDAsMjQ1XSxcbiAgbGF3bmdyZWVuOiAgWzEyNCwyNTIsMF0sXG4gIGxlbW9uY2hpZmZvbjogWzI1NSwyNTAsMjA1XSxcbiAgbGlnaHRibHVlOiAgWzE3MywyMTYsMjMwXSxcbiAgbGlnaHRjb3JhbDogWzI0MCwxMjgsMTI4XSxcbiAgbGlnaHRjeWFuOiAgWzIyNCwyNTUsMjU1XSxcbiAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IFsyNTAsMjUwLDIxMF0sXG4gIGxpZ2h0Z3JheTogIFsyMTEsMjExLDIxMV0sXG4gIGxpZ2h0Z3JlZW46IFsxNDQsMjM4LDE0NF0sXG4gIGxpZ2h0Z3JleTogIFsyMTEsMjExLDIxMV0sXG4gIGxpZ2h0cGluazogIFsyNTUsMTgyLDE5M10sXG4gIGxpZ2h0c2FsbW9uOiAgWzI1NSwxNjAsMTIyXSxcbiAgbGlnaHRzZWFncmVlbjogIFszMiwxNzgsMTcwXSxcbiAgbGlnaHRza3libHVlOiBbMTM1LDIwNiwyNTBdLFxuICBsaWdodHNsYXRlZ3JheTogWzExOSwxMzYsMTUzXSxcbiAgbGlnaHRzbGF0ZWdyZXk6IFsxMTksMTM2LDE1M10sXG4gIGxpZ2h0c3RlZWxibHVlOiBbMTc2LDE5NiwyMjJdLFxuICBsaWdodHllbGxvdzogIFsyNTUsMjU1LDIyNF0sXG4gIGxpbWU6IFswLDI1NSwwXSxcbiAgbGltZWdyZWVuOiAgWzUwLDIwNSw1MF0sXG4gIGxpbmVuOiAgWzI1MCwyNDAsMjMwXSxcbiAgbWFnZW50YTogIFsyNTUsMCwyNTVdLFxuICBtYXJvb246IFsxMjgsMCwwXSxcbiAgbWVkaXVtYXF1YW1hcmluZTogWzEwMiwyMDUsMTcwXSxcbiAgbWVkaXVtYmx1ZTogWzAsMCwyMDVdLFxuICBtZWRpdW1vcmNoaWQ6IFsxODYsODUsMjExXSxcbiAgbWVkaXVtcHVycGxlOiBbMTQ3LDExMiwyMTldLFxuICBtZWRpdW1zZWFncmVlbjogWzYwLDE3OSwxMTNdLFxuICBtZWRpdW1zbGF0ZWJsdWU6ICBbMTIzLDEwNCwyMzhdLFxuICBtZWRpdW1zcHJpbmdncmVlbjogIFswLDI1MCwxNTRdLFxuICBtZWRpdW10dXJxdW9pc2U6ICBbNzIsMjA5LDIwNF0sXG4gIG1lZGl1bXZpb2xldHJlZDogIFsxOTksMjEsMTMzXSxcbiAgbWlkbmlnaHRibHVlOiBbMjUsMjUsMTEyXSxcbiAgbWludGNyZWFtOiAgWzI0NSwyNTUsMjUwXSxcbiAgbWlzdHlyb3NlOiAgWzI1NSwyMjgsMjI1XSxcbiAgbW9jY2FzaW46IFsyNTUsMjI4LDE4MV0sXG4gIG5hdmFqb3doaXRlOiAgWzI1NSwyMjIsMTczXSxcbiAgbmF2eTogWzAsMCwxMjhdLFxuICBvbGRsYWNlOiAgWzI1MywyNDUsMjMwXSxcbiAgb2xpdmU6ICBbMTI4LDEyOCwwXSxcbiAgb2xpdmVkcmFiOiAgWzEwNywxNDIsMzVdLFxuICBvcmFuZ2U6IFsyNTUsMTY1LDBdLFxuICBvcmFuZ2VyZWQ6ICBbMjU1LDY5LDBdLFxuICBvcmNoaWQ6IFsyMTgsMTEyLDIxNF0sXG4gIHBhbGVnb2xkZW5yb2Q6ICBbMjM4LDIzMiwxNzBdLFxuICBwYWxlZ3JlZW46ICBbMTUyLDI1MSwxNTJdLFxuICBwYWxldHVycXVvaXNlOiAgWzE3NSwyMzgsMjM4XSxcbiAgcGFsZXZpb2xldHJlZDogIFsyMTksMTEyLDE0N10sXG4gIHBhcGF5YXdoaXA6IFsyNTUsMjM5LDIxM10sXG4gIHBlYWNocHVmZjogIFsyNTUsMjE4LDE4NV0sXG4gIHBlcnU6IFsyMDUsMTMzLDYzXSxcbiAgcGluazogWzI1NSwxOTIsMjAzXSxcbiAgcGx1bTogWzIyMSwxNjAsMjIxXSxcbiAgcG93ZGVyYmx1ZTogWzE3NiwyMjQsMjMwXSxcbiAgcHVycGxlOiBbMTI4LDAsMTI4XSxcbiAgcmViZWNjYXB1cnBsZTogWzEwMiwgNTEsIDE1M10sXG4gIHJlZDogIFsyNTUsMCwwXSxcbiAgcm9zeWJyb3duOiAgWzE4OCwxNDMsMTQzXSxcbiAgcm95YWxibHVlOiAgWzY1LDEwNSwyMjVdLFxuICBzYWRkbGVicm93bjogIFsxMzksNjksMTldLFxuICBzYWxtb246IFsyNTAsMTI4LDExNF0sXG4gIHNhbmR5YnJvd246IFsyNDQsMTY0LDk2XSxcbiAgc2VhZ3JlZW46IFs0NiwxMzksODddLFxuICBzZWFzaGVsbDogWzI1NSwyNDUsMjM4XSxcbiAgc2llbm5hOiBbMTYwLDgyLDQ1XSxcbiAgc2lsdmVyOiBbMTkyLDE5MiwxOTJdLFxuICBza3libHVlOiAgWzEzNSwyMDYsMjM1XSxcbiAgc2xhdGVibHVlOiAgWzEwNiw5MCwyMDVdLFxuICBzbGF0ZWdyYXk6ICBbMTEyLDEyOCwxNDRdLFxuICBzbGF0ZWdyZXk6ICBbMTEyLDEyOCwxNDRdLFxuICBzbm93OiBbMjU1LDI1MCwyNTBdLFxuICBzcHJpbmdncmVlbjogIFswLDI1NSwxMjddLFxuICBzdGVlbGJsdWU6ICBbNzAsMTMwLDE4MF0sXG4gIHRhbjogIFsyMTAsMTgwLDE0MF0sXG4gIHRlYWw6IFswLDEyOCwxMjhdLFxuICB0aGlzdGxlOiAgWzIxNiwxOTEsMjE2XSxcbiAgdG9tYXRvOiBbMjU1LDk5LDcxXSxcbiAgdHVycXVvaXNlOiAgWzY0LDIyNCwyMDhdLFxuICB2aW9sZXQ6IFsyMzgsMTMwLDIzOF0sXG4gIHdoZWF0OiAgWzI0NSwyMjIsMTc5XSxcbiAgd2hpdGU6ICBbMjU1LDI1NSwyNTVdLFxuICB3aGl0ZXNtb2tlOiBbMjQ1LDI0NSwyNDVdLFxuICB5ZWxsb3c6IFsyNTUsMjU1LDBdLFxuICB5ZWxsb3dncmVlbjogIFsxNTQsMjA1LDUwXVxufTtcblxudmFyIHJldmVyc2VLZXl3b3JkcyA9IHt9O1xuZm9yICh2YXIga2V5IGluIGNzc0tleXdvcmRzKSB7XG4gIHJldmVyc2VLZXl3b3Jkc1tKU09OLnN0cmluZ2lmeShjc3NLZXl3b3Jkc1trZXldKV0gPSBrZXk7XG59XG4iLCJ2YXIgY29udmVyc2lvbnMgPSByZXF1aXJlKFwiLi9jb252ZXJzaW9uc1wiKTtcblxudmFyIGNvbnZlcnQgPSBmdW5jdGlvbigpIHtcbiAgIHJldHVybiBuZXcgQ29udmVydGVyKCk7XG59XG5cbmZvciAodmFyIGZ1bmMgaW4gY29udmVyc2lvbnMpIHtcbiAgLy8gZXhwb3J0IFJhdyB2ZXJzaW9uc1xuICBjb252ZXJ0W2Z1bmMgKyBcIlJhd1wiXSA9ICAoZnVuY3Rpb24oZnVuYykge1xuICAgIC8vIGFjY2VwdCBhcnJheSBvciBwbGFpbiBhcmdzXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgICAgaWYgKHR5cGVvZiBhcmcgPT0gXCJudW1iZXJcIilcbiAgICAgICAgYXJnID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjb252ZXJzaW9uc1tmdW5jXShhcmcpO1xuICAgIH1cbiAgfSkoZnVuYyk7XG5cbiAgdmFyIHBhaXIgPSAvKFxcdyspMihcXHcrKS8uZXhlYyhmdW5jKSxcbiAgICAgIGZyb20gPSBwYWlyWzFdLFxuICAgICAgdG8gPSBwYWlyWzJdO1xuXG4gIC8vIGV4cG9ydCByZ2IyaHNsIGFuZCBbXCJyZ2JcIl1bXCJoc2xcIl1cbiAgY29udmVydFtmcm9tXSA9IGNvbnZlcnRbZnJvbV0gfHwge307XG5cbiAgY29udmVydFtmcm9tXVt0b10gPSBjb252ZXJ0W2Z1bmNdID0gKGZ1bmN0aW9uKGZ1bmMpIHsgXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgICAgaWYgKHR5cGVvZiBhcmcgPT0gXCJudW1iZXJcIilcbiAgICAgICAgYXJnID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIFxuICAgICAgdmFyIHZhbCA9IGNvbnZlcnNpb25zW2Z1bmNdKGFyZyk7XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PSBcInN0cmluZ1wiIHx8IHZhbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdmFsOyAvLyBrZXl3b3JkXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKVxuICAgICAgICB2YWxbaV0gPSBNYXRoLnJvdW5kKHZhbFtpXSk7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgfSkoZnVuYyk7XG59XG5cblxuLyogQ29udmVydGVyIGRvZXMgbGF6eSBjb252ZXJzaW9uIGFuZCBjYWNoaW5nICovXG52YXIgQ29udmVydGVyID0gZnVuY3Rpb24oKSB7XG4gICB0aGlzLmNvbnZzID0ge307XG59O1xuXG4vKiBFaXRoZXIgZ2V0IHRoZSB2YWx1ZXMgZm9yIGEgc3BhY2Ugb3JcbiAgc2V0IHRoZSB2YWx1ZXMgZm9yIGEgc3BhY2UsIGRlcGVuZGluZyBvbiBhcmdzICovXG5Db252ZXJ0ZXIucHJvdG90eXBlLnJvdXRlU3BhY2UgPSBmdW5jdGlvbihzcGFjZSwgYXJncykge1xuICAgdmFyIHZhbHVlcyA9IGFyZ3NbMF07XG4gICBpZiAodmFsdWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGNvbG9yLnJnYigpXG4gICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZXMoc3BhY2UpO1xuICAgfVxuICAgLy8gY29sb3IucmdiKDEwLCAxMCwgMTApXG4gICBpZiAodHlwZW9mIHZhbHVlcyA9PSBcIm51bWJlclwiKSB7XG4gICAgICB2YWx1ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTsgICAgICAgIFxuICAgfVxuXG4gICByZXR1cm4gdGhpcy5zZXRWYWx1ZXMoc3BhY2UsIHZhbHVlcyk7XG59O1xuICBcbi8qIFNldCB0aGUgdmFsdWVzIGZvciBhIHNwYWNlLCBpbnZhbGlkYXRpbmcgY2FjaGUgKi9cbkNvbnZlcnRlci5wcm90b3R5cGUuc2V0VmFsdWVzID0gZnVuY3Rpb24oc3BhY2UsIHZhbHVlcykge1xuICAgdGhpcy5zcGFjZSA9IHNwYWNlO1xuICAgdGhpcy5jb252cyA9IHt9O1xuICAgdGhpcy5jb252c1tzcGFjZV0gPSB2YWx1ZXM7XG4gICByZXR1cm4gdGhpcztcbn07XG5cbi8qIEdldCB0aGUgdmFsdWVzIGZvciBhIHNwYWNlLiBJZiB0aGVyZSdzIGFscmVhZHlcbiAgYSBjb252ZXJzaW9uIGZvciB0aGUgc3BhY2UsIGZldGNoIGl0LCBvdGhlcndpc2VcbiAgY29tcHV0ZSBpdCAqL1xuQ29udmVydGVyLnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbihzcGFjZSkge1xuICAgdmFyIHZhbHMgPSB0aGlzLmNvbnZzW3NwYWNlXTtcbiAgIGlmICghdmFscykge1xuICAgICAgdmFyIGZzcGFjZSA9IHRoaXMuc3BhY2UsXG4gICAgICAgICAgZnJvbSA9IHRoaXMuY29udnNbZnNwYWNlXTtcbiAgICAgIHZhbHMgPSBjb252ZXJ0W2ZzcGFjZV1bc3BhY2VdKGZyb20pO1xuXG4gICAgICB0aGlzLmNvbnZzW3NwYWNlXSA9IHZhbHM7XG4gICB9XG4gIHJldHVybiB2YWxzO1xufTtcblxuW1wicmdiXCIsIFwiaHNsXCIsIFwiaHN2XCIsIFwiY215a1wiLCBcImtleXdvcmRcIl0uZm9yRWFjaChmdW5jdGlvbihzcGFjZSkge1xuICAgQ29udmVydGVyLnByb3RvdHlwZVtzcGFjZV0gPSBmdW5jdGlvbih2YWxzKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZVNwYWNlKHNwYWNlLCBhcmd1bWVudHMpO1xuICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmVydDsiLCJpbXBvcnQgeyBBY3Rpb25UeXBlIH0gZnJvbSBcIi4vY29yZS9hY3Rpb25zXCI7XHJcbmltcG9ydCB7IGFkZENvbG9ycyB9IGZyb20gXCIuL2NvcmUvY29sb3JzXCI7XHJcbmZpZ21hLnNob3dVSShfX2h0bWxfXyk7XHJcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XHJcbiAgICBjb25zdCB7IHR5cGUsIHBheWxvYWQgfSA9IG1zZztcclxuICAgIGlmICh0eXBlID09PSBBY3Rpb25UeXBlLkFERF9DT0xPUlMpIHtcclxuICAgICAgICBhZGRDb2xvcnMocGF5bG9hZCk7XHJcbiAgICB9XHJcbiAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG59O1xyXG4iLCJleHBvcnQgdmFyIEFjdGlvblR5cGU7XHJcbihmdW5jdGlvbiAoQWN0aW9uVHlwZSkge1xyXG4gICAgQWN0aW9uVHlwZVtcIkFERF9DT0xPUlNcIl0gPSBcIkFERF9DT0xPUlNcIjtcclxuICAgIEFjdGlvblR5cGVbXCJBRERfRk9OVFNcIl0gPSBcIkFERF9GT05UU1wiO1xyXG59KShBY3Rpb25UeXBlIHx8IChBY3Rpb25UeXBlID0ge30pKTtcclxuIiwiaW1wb3J0ICogYXMgcGFyc2UgZnJvbSBcInBhcnNlLWNvbG9yXCI7XHJcbi8qKlxyXG4gKiBDb252ZXJ0IGNvbG9yIHRvIHRoZSByZ2JhIGZvcm1hdFxyXG4gKiBAcGFyYW0gY29sb3JcclxuICovXHJcbmZ1bmN0aW9uIGNvbnZlcnRDb25maWdDb2xvcihjb2xvcikge1xyXG4gICAgaWYgKGNvbG9yID09PSBcInRyYW5zcGFyZW50XCIpIHtcclxuICAgICAgICBjb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjApXCI7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHJnYmEgfSA9IHBhcnNlKGNvbG9yKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcjogcmdiYVswXSAvIDI1NSxcclxuICAgICAgICBnOiByZ2JhWzFdIC8gMjU1LFxyXG4gICAgICAgIGI6IHJnYmFbMl0gLyAyNTUsXHJcbiAgICAgICAgYTogcmdiYVszXVxyXG4gICAgfTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlIGZpZ21hIHNvbGlkIGNvbG9yLlxyXG4gKiBAcGFyYW0gbmFtZVxyXG4gKiBAcGFyYW0gY29sb3JcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVNvbGlkQ29sb3IobmFtZSwgY29sb3IpIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZmlnbWEuY3JlYXRlUGFpbnRTdHlsZSgpO1xyXG4gICAgc3R5bGUubmFtZSA9IG5hbWU7XHJcbiAgICBjb25zdCB7IHIsIGcsIGIsIGEgfSA9IGNvbG9yO1xyXG4gICAgY29uc3QgcmdiQ29sb3IgPSB7IHIsIGcsIGIgfTtcclxuICAgIGNvbnN0IGFscGhhID0gYTtcclxuICAgIGNvbnN0IHNvbGlkUGFpbnQgPSB7XHJcbiAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxyXG4gICAgICAgIGNvbG9yOiByZ2JDb2xvcixcclxuICAgICAgICBvcGFjaXR5OiBhbHBoYVxyXG4gICAgfTtcclxuICAgIHN0eWxlLnBhaW50cyA9IFtzb2xpZFBhaW50XTtcclxufVxyXG4vKipcclxuICogQWRkIGNvbG9ycyB0byB0aGUgZmlnbWFcclxuICogQHBhcmFtIHBheWxvYWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRDb2xvcnMoY29sb3JzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsQ29sb3JzID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpO1xyXG4gICAgICAgIGNvbG9ycy5mb3JFYWNoKCh7IG5hbWUsIHZhbHVlIH0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jYWxDb2xvciA9IGxvY2FsQ29sb3JzLmZpbHRlcihwYWludCA9PiBwYWludC5uYW1lID09PSBuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsQ29sb3JzLmZpbHRlcihwYWludCA9PiBwYWludC5uYW1lID09PSBuYW1lKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVNvbGlkQ29sb3IobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxDb2xvclswXS5wYWludHMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7IHI6IHZhbHVlLnIsIGc6IHZhbHVlLmcsIGI6IHZhbHVlLmIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogdmFsdWUuYVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIEdldCBjb2xvcnMgZnJvbSAgY29uZmlnLlxyXG4gKiBAcGFyYW0gY29uZmlnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnQ29sb3JzKGNvbmZpZykge1xyXG4gICAgaWYgKHR5cGVvZiBjb25maWcuY29sb3JzID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE9iamVjdC5rZXlzKGNvbmZpZy5jb2xvcnMpLnJlZHVjZSgoY29sb3JzLCBjdXJyZW50S2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gY29uZmlnLmNvbG9yc1tjdXJyZW50S2V5XTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb2xvciA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAuLi5jb2xvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uT2JqZWN0LmtleXMoY29sb3IpLnJlZHVjZSgoY2hpbGRDb2xvcnMsIGNoaWxkS2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jaGlsZENvbG9ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHtjdXJyZW50S2V5fS8ke2NoaWxkS2V5fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbnZlcnRDb25maWdDb2xvcihjb2xvcltjaGlsZEtleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAuLi5jb2xvcnMsXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGN1cnJlbnRLZXksIHZhbHVlOiBjb252ZXJ0Q29uZmlnQ29sb3IoY29sb3IpIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==