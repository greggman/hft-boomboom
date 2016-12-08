/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

define([
    './colorutils',
  ], function(
    colorUtils) {
  /**
   * Adjusts the hue, saturation and value of an image.
   * @param {HTMLImageElement|Image|HTMLCanvasElement} image an
   *        Image tag
   * @param {number} hue The amount to adjust the hue.
   * @param {number} saturation The amount to adjust the
   *     saturation.
   * @param {number} value. The amount to adjust the value.
   *     image
   * @param {number?} opt_hueRangeLimit. Defines a hue range,
   *        Pixels outside this range will not be adjusted. Note:
   *        the first value is the starting hue and the second
   *        the ending hue. So [0.1, 0.2] adjusts pixels with hues
   *        between 0.1<->0.2 where as [0.2,0.1] adjusts pixels
   *        with hues from 0.2<->1.0 and 0.0<->0.1. In other words
   *        only 0.1<->0.2 will not be adjusted.
   *
   *        What's the point? Let's say you have a character with
   *        blue shirt and a pink face. If you adjust all the
   *        colors the face would change from pink. If you select
   *        a range that covers only blue then only the blue
   *        pixels will be adjusted letting you adjust only the
   *        shirt.
   *
   *        To figure out the ranges use photoshop's
   *        hue/saturation layer. Near the top of the settings
   *        pick the drop down "Master", pick a color, the adjust
   *        the sliders. Photoshop gives the settings in degrees
   *        so you'll have to convert to 0 to 1 (eg,
   *        photoshopValue / 360)
   *
   * @return {HTMLCanvasElement} a canvas element with the
   *         adjusted image.
   */
  var adjustHSV = function(image, hue, saturation, value, opt_hueRangeLimit) {
    opt_hueRangeLimit = opt_hueRangeLimit || [0, 1];
    var minHue = (opt_hueRangeLimit[0] + 0.0) % 1;
    var maxHue = (opt_hueRangeLimit[1] + 0.0) % 1;

    // |<------------>|
    //    min     max      min<->mz
    //
    //    max     min      min->1  0->max

    var minLessThanMax = function(v) {
      return v >= minHue && v <= maxHue;
    };

    var maxLessThanMin = function(v) {
      return v >= minHue || v <= maxHue;
    };

    var validHue = minHue < maxHue ? minLessThanMax : maxLessThanMin;
    var canvas = document.createElement("canvas");
    var width = image.width;
    var height = image.height;
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    var imageData = ctx.getImageData(0, 0, width, height);
    var pixels = imageData.data;
    var numPixels = width * height;
    var numBytes = numPixels * 4;
    for (var offset = 0; offset < numBytes; offset += 4) {
      var hsv = colorUtils.rgb255ToHsv(pixels[offset + 0], pixels[offset + 1], pixels[offset + 2]);
      if (!validHue(hsv[0])) {
        continue;
      }
      var h = (hsv[0] + hue + 100) % 1;
      var s = Math.min(1, Math.max(0, hsv[1] + saturation));
      var v = Math.min(1, Math.max(0, hsv[2] + value));
      var rgb = colorUtils.hsvToRgb255(h, s, v);
      pixels[offset + 0] = rgb[0];
      pixels[offset + 1] = rgb[1];
      pixels[offset + 2] = rgb[2];
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };

  /**
   * Returns a canvas with the cropped piece only.
   * @param {HTMLImageElement|Image|HTMLCanvasElement} src image
   *        or canvas to crop
   * @param {number} x left
   * @param {number} y top
   * @param {number} width width
   * @param {number} height height
   */
  var cropImage = function(src, x, y, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(src, x, y, width, height, 0, 0, width, height);
    return canvas;
  };

  /**
   * Returns a scaled canvas using nearest neighbor.
   *
   * Since the browser provides no such feature it's often hard to
   * make pixelly *retro* style graphics because the browser will
   * almost always use some kind of filtered scaling algorithm
   *
   * @param {HTMLImageElement|Image|HTMLCanvasElement} src image
   *        or canvas to scale
   * @param {number} newWidth width
   * @param {number} newHeight height
   * @returns {HTMLCanvasElement} a canvas element with the scaled
   *        image.
   */
  var scaleImage = function(src, newWidth, newHeight) {
    var canvas = document.createElement("canvas");
    canvas.width = src.width;
    canvas.height = src.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(src, 0, 0);
    var srcImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var srcPixels = srcImageData.data;
    canvas.width = newWidth;
    canvas.height = newHeight;
    var dstImageData = ctx.createImageData(newWidth, newHeight);
    var dstPixels = dstImageData.data;
    for (var y = 0; y < newHeight; ++y) {
      var srcY = (y * src.height / newHeight) | 0;
      var dstOffset = y * newWidth * 4;
      for (var x = 0; x < newWidth; ++x) {
        var srcX = (x * src.width / newWidth) | 0;
        var srcOffset = (srcY * src.width + srcX) * 4;
        dstPixels[dstOffset++] = srcPixels[srcOffset++];
        dstPixels[dstOffset++] = srcPixels[srcOffset++];
        dstPixels[dstOffset++] = srcPixels[srcOffset++];
        dstPixels[dstOffset++] = srcPixels[srcOffset++];
      }
    }
    ctx.putImageData(dstImageData, 0, 0);
    return canvas;
  };

  var setCanvasFontStyles = function(ctx, options) {
    if (options.font        ) { ctx.font         = options.font;        }
    if (options.fillStyle   ) { ctx.fillStyle    = options.fillStyle;   }
    if (options.textAlign   ) { ctx.textAlign    = options.textAlign;   }
    if (options.testBaseline) { ctx.textBaseline = options.textBaselne; }
  };

  /**
   * @typedef {Object} MakeTextOptions
   * @property {number} height number of pixels high to make the
   *           canvas.
   * @property {string} font Font to use
   * @property {string} fillStyle fillStyle to use
   * @property {string} textAlign textAlign value to use
   * @property {string} textBaseLine textBaseLine value to use
   * @property {string} backgroundColor fillStyle to fill the
   *           canvas with before drawing the text. Default is to
   *           clear the canvas.
   * @property {number?} xOffset x offset to draw the text.
   *           default = 0
   * @property {number?} yOffset y offset to draw tht tezt.
   *           default = 0
   * @property {number?} maxWidth maxWidth to make the canvas.
   *           unset = make the canvas wide enough to hold the
   *           text.
   * @property {number?} minWidth minWith to make the canvas.
   *           unset = let the canvas go as small as the text.
   * @property {number?} padding
   * @property {function(Canvas2DRenderingContext)} prepFn
   *           function to call before rendering the text. Let's
   *           you draw a frame or whatever.
   */

  /**
   * Makes a canvas with some text in it.
   * @param {string} str the text
   * @param {MakeTextOptions} options the options for how to
   *        render the tet
   * @param {HTMLCanvasElement?} opt_canvas An optional canvas to
   *        use. If not provided a new canvas is created.
   * @returns {HTMLCanvasElement} the canvas with the text in it.
   */
  var makeTextImage = function(str, options, opt_canvas) {
    var canvas = opt_canvas || document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    ctx.save();

    setCanvasFontStyles(ctx, options);

    var metrics = ctx.measureText(str);
    var width = metrics.width + (options.padding || 0);
    if (options.maxWidth) {
      width = Math.min(width, options.maxWidth);
    }
    if (options.minWidth) {
      width = Math.max(width, options.minWidth);
    }

    var padding = options.padding || 0;

    canvas.width = width + padding * 2;
    canvas.height = options.height + padding * 2;

    if (options.prepFn) {
      options.prepFn(ctx);
    } else if (options.backgroundColor) {
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    } else {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // We have to set them again because re-sizing the canvas resets all canvas settings.
    setCanvasFontStyles(ctx, options);
    ctx.fillText(
        str,
        (options.xOffset || 0) + padding,
        (options.yOffset || 0) + padding);

    ctx.restore();
    return canvas;
  };

  return {
    adjustHSV: adjustHSV,
    cropImage: cropImage,
    hsvToRgb: colorUtils.hsvToRgb255,
    makeTextImage: makeTextImage,
    rgbToHsv: colorUtils.rgb255ToHsv,
    scaleImage: scaleImage,
  };
});
