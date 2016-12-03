(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gameUtils"] = factory();
	else
		root["gameUtils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(2),
	    __webpack_require__(3),
	    __webpack_require__(4),
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	    gameclock,
	    Ticker,
	    timeout,
	    gameSupport
	  ) {

	  return {
	    gameclock: gameclock,
	    Ticker: Ticker,
	    timeout: timeout,
	    gameSupport: gameSupport,
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
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

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  var LocalClock = function() {
	    this.getTime = function() {
	      return Date.now() * 0.001;
	    };
	  };

	  /**
	   * A clock that returns the time elapsed since the last time it
	   * was queried
	   * @constructor
	   * @alias GameClock
	   * @param {Clock?} The clock to use for this GameClock (pass it
	   *        a SyncedClock of you want the clock to be synced or
	   *        nothing if you just want a local clock.
	   */
	  var GameClock = function(clock) {
	    clock = clock || new LocalClock();

	    this.gameTime = 0;
	    this.callCount = 0;

	    var then = clock.getTime();

	    /**
	     * Gets the time elapsed in seconds since the last time this was
	     * called
	     * @return {number} The time elapsed in seconds since this was
	     *     last called. Note will never return a time more than
	     *     1/20th of second. This is to help prevent giant time
	     *     range that might overflow the math on a game.
	     *
	     */
	    this.getElapsedTime = function() {
	      ++this.callCount;

	      var now = clock.getTime();
	      var elapsedTime = Math.min(now - then, 0.05);  // Don't return a time less than 0.05 second
	      this.gameTime += elapsedTime;

	      then = now;

	      return elapsedTime;
	    }.bind(this);
	  };

	  return GameClock;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
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

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * An object that calls a funciton once every N second for Y seconds
	   *
	   * Example: You want a flashing light that flashes 5 times a second
	   * and continues to flash for 10 seconds
	   *
	   *     var ticker = new Ticker();
	   *     ticker.tick(10, 1/5, flashTheLight);
	   *
	   * @constructor
	   * @alias Ticker
	   */
	  var Ticker = function() {
	    var intervalId = undefined;
	    var timeoutId = undefined;

	    var cancel = function() {
	      if (intervalId !== undefined) {
	        clearInterval(intervalId);
	        intervalId = undefined;
	      }
	      if (timeoutId !== undefined) {
	        clearTimeout(timeoutId);
	        timeoutId = undefined;
	      }
	    };

	    /**
	     * Cancels the ticker before it's done
	     * @func
	     */
	    this.cancel = cancel;

	    /**
	     * Starts the ticker
	     * @param {number} durationInSeconds duration in seconds to tick.
	     * @param {number} intervalInSeconds duration of a single tick
	     * @param {callback} fn function to call at each tick.
	     */
	    this.tick = function(durationInSeconds, intervalInSeconds, fn) {
	      cancel();
	      intervalId = setInterval(fn, intervalInSeconds * 1000);
	      timeoutId  = setTimeout(cancel, durationInSeconds * 1000);
	    };
	  };

	  return Ticker;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
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

	/**
	 * A module or provide `setTimeout` and `setInterval` like functionality
	 * but that's based on a clock provided by the game. This is useful
	 * especially during debugging because you might pause in the debugger.
	 * normal timeouts and intervals will not pause. These will. Similarly
	 * if you slowed the clock down (bullet time) these timers could slow
	 * down too.
	 *
	 * @module Timeout
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  var s_nextId = 0;
	  var s_clockInMs = 0;

	  // always sorted by next to trigger.
	  var s_timeouts = [];
	  var s_timeoutsToInsert = [];
	  var s_timeoutsToRemoveById = [];

	  var insertTimeout = function(timeout) {
	    var timeToTrigger = timeout.timeToTrigger;
	    var start = 0;
	    var end   = s_timeouts.length;
	    while (start < end) {
	      var index = start + (end - start) / 2 | 0;
	      var otherTimeToTrigger = s_timeouts[index].timeToTrigger;
	      if (timeToTrigger < otherTimeToTrigger) {
	        end = index;
	      } else if (timeToTrigger > otherTimeToTrigger) {
	        start = index + 1;
	      } else {
	        break;
	      }
	    }
	    s_timeouts.splice(index, 0, timeout);
	  };

	  //var removeTimeout = function(timeout) {
	  //  var ndx = s_timeouts[timeout];
	  //  if (ndx >= 0) {
	  //    s_timeouts.splice(ndx, 1);
	  //  }
	  //};

	  var removeTimeoutById = function(id) {
	    for (var ii = 0; ii < s_timeouts.length; ++ii) {
	      if (s_timeouts[ii].id === id) {
	        s_timeouts.splice(ii, 1);
	        return;
	      }
	    }
	  };

	  var makeTimeout = function(callback) {
	    return {
	      id: ++s_nextId,
	      callback: callback,
	    };
	  };

	  var setTriggerTime = function(timeout, timeInMs) {
	    timeout.timeToTrigger = s_clockInMs + timeInMs;
	  };

	  /**
	   * Same as normal setTimeout
	   * @param {callback} callback function to call when it times out
	   * @param {number} timeInMs duration of timeout
	   * @return {number} id for timeout
	   * @memberOf module:Timeout
	   */
	  var setTimeout = function(callback, timeInMs) {
	    var timeout = makeTimeout(callback);
	    setTriggerTime(timeout, timeInMs);
	    s_timeoutsToInsert.push(timeout);
	    return timeout.id;
	  };

	  /**
	   * Same as normal setInterval
	   * @param {callback} callback function to call at each interval
	   * @param {number} timeInMs duration of internval
	   * @return {number} id for interval
	   * @memberOf module:Timeout
	   */
	  var setInterval = function(callback, timeInMs) {
	    var timeout = makeTimeout(function() {
	      setTriggerTime(timeout, timeout.timeInMs);
	      s_timeoutsToInsert.push(timeout);
	      callback();
	    });
	    timeout.timeInMs = timeInMs;
	    s_timeoutsToInsert.push(timeout);
	    return timeout.id;
	  };

	  /**
	   * Same as normal clearTimeout
	   * @param {number} id of timeout to clear.
	   * @memberOf module:Timeout
	   */
	  var clearTimeout = function(id) {
	    s_timeoutsToRemoveById.push(id);
	  };

	  /**
	   * Same as normal clearInterval
	   * @param {number} id of interval to clear.
	   * @memberOf module:Timeout
	   */
	  var clearInterval = function(id) {
	    s_timeoutsToRemoveById.push(id);
	  };

	  /**
	   * Processes the intervals and timeouts
	   *
	   * This is how you control the clock for the timouts
	   *
	   * A typical usage might be
	   *
	   *
	   *     var g = {};
	   *     GameSupport.run(g, mainloop);
	   *
	   *     function mainloop() {
	   *       Timeout.process(globals.elapsedTime);
	   *     };
	   *
	   * @param {number} elapsedTimeInSeconds number of seconds to advance the clock.
	   * @memberOf module:Timeout
	   */
	  var process = function(elapsedTimeInSeconds) {
	    // insert any unscheduled timeouts
	    if (s_timeoutsToInsert.length) {
	      s_timeoutsToInsert.forEach(insertTimeout);
	      s_timeoutsToInsert = [];
	    }

	    // Now remove any
	    if (s_timeoutsToRemoveById.length) {
	      s_timeoutsToRemoveById.forEach(removeTimeoutById);
	      s_timeoutsToRemoveById = [];
	    }

	    s_clockInMs += elapsedTimeInSeconds * 1000;

	    // process timeouts
	    for (var ii = 0; ii < s_timeouts.length; ++ii) {
	      var timeout = s_timeouts[ii];
	      if (s_clockInMs < timeout.timeToTrigger) {
	        break;
	      }
	      timeout.callback();
	    }

	    // remove expired timeouts
	    s_timeouts.splice(0, ii);
	  };

	  return {
	    clearInterval: clearInterval,
	    clearTimeout: clearTimeout,
	    process: process,
	    setInterval: setInterval,
	    setTimeout: setTimeout,
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
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

	/**
	 * Implements the common parts of HappyFunTimes games written in
	 * JavaScript.
	 *
	 * It provides a render loop with frame count and game clock as
	 * well as handles pausing the game during development so as
	 * not to deplete the battries on your laptop. It can also show
	 * the framerate and display debugging info.
	 *
	 * @module GameSupport
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(5),
	    __webpack_require__(6),
	    __webpack_require__(7),
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	    GameClock,
	    Logger,
	    Misc,
	    strings) {

	  var $ = function(id) {
	    return document.getElementById(id);
	  };

	  var stats = {
	    begin: function() { },
	    end: function() { },
	  };

	  var statusNode;
	  var logger = new Logger.NullLogger();

	  /**
	   * @typedef {Object} GameSupport~InitOptions
	   * @property {boolean?} showFPS true adds a fps display
	   * @property {boolean?} debug un-hides the debug html elements
	   * @property {number?} numConsoleLines number of lines to show for the debug console.
	   * @property {boolean?} haveServer false This is bad name but
	   *           it's used to suggest you don't want to connect to
	   *           happyFunTimes
	   * @memberOf module:GameSupport
	   *
	   * You can add text to the debug console with
	   * `GameSupport.log(msg)` or `GameSupport.error(msg)`
	   * which are no-ops if `debug` is false.
	   *
	   * Similarly you can display status with
	   * `GameSupport.setStatus("foo\nbar");`
	   */

	  /**
	   * Initializes the game support
	   * @param {GameServer?} server The GameServer you created for
	   *        the game.
	   * @param {module:GameSupport.GameSupport~InitOptions} options
	   * @memberOf module:GameSupport
	   *
	   */
	  var init = function(server, options) {
	    var handleConnected = function() {
	      $('hft-disconnected').style.display = "none";
	    };

	    var handleDisconnected = function() {
	      $('hft-disconnected').style.display = "block";
	    };

	    if (options.haveServer !== false && server) {
	      server.addEventListener('connect', handleConnected);
	      server.addEventListener('disconnect', handleDisconnected);
	    }

	    var handleInstructions = function(data) {
	      var hftConnectElem = $("hft-connect");
	      var hftConnectStyle = hftConnectElem.style;
	      hftConnectStyle.display = data.msg ? "block" : "none";
	      if (!data.msg) {
	        return;
	      }
	      if (data.bottom) {
	        hftConnectStyle.top = "auto";
	        hftConnectStyle.bottom = "0";
	      } else {
	        hftConnectStyle.top = "0";
	        hftConnectStyle.bottom = "auto";
	      }
	      $("hft-ins").innerHTML = data.msg;

	      var style = document.createElement("style");
	      var css = document.createTextNode("");

	      var computeAnim = function() {
	        var padding = 100;
	        var msgWidth = $("hft-ins").clientWidth;
	        var bodyWidth = document.body.clientWidth;

	        if (msgWidth < bodyWidth) {
	          css.nodeValue = "";
	          return;
	        }

	        var width = msgWidth + padding;
	        var start = bodyWidth;
	        var end = -width - padding;
	        var duration = Math.abs(start - end) / 60;

	        var anim = strings.replaceParams([
	          "#hft-ins { animation: hft-ins-anim %(duration)ss linear infinite; }",
	          "@keyframes hft-ins-anim { 0% { transform: translateX(%(start)spx); } 100% { transform: translateX(%(end)spx); } }",
	        ].join("\n"), {
	          duration: duration,
	          start: start,
	          end: end,
	        });

	        css.nodeValue = anim;
	      };

	      style.appendChild(css);
	      document.body.appendChild(style);
	      computeAnim();
	      window.addEventListener('resize', computeAnim, false);

	    };

	    if (options.debug) {
	      statusNode = document.createTextNode("");
	      $("hft-status").appendChild(statusNode);
	      var debugCSS = Misc.findCSSStyleRule("#hft-debug");
	      debugCSS.style.display = "block";

	      logger = new Logger.HTMLLogger($("hft-console"), options.numConsoleLines);
	    }
	  };

	  /**
	   * @typedef {Object} GameSupport~RunGlobals
	   *
	   * @param {number} elapsedTime time elapsed in seconds since
	   *        last frame
	   * @param {number} frameCount count of frames since the game
	   *        started
	   * @param {boolean?} haveServer if false will pause when it
	   *        doens't have the focus.
	   * @param {boolean?} pauseOnBlur if true will pause when it
	   *        doesn't have the focus.
	   * @param {boolean?} step:        if true will step one tick for
	   *        each mouse click
	   * @param {number?} fixedFramerate If set will advance the clock
	   *        this amount each frame. Useful for debugging because
	   *        otherwise when you pause in the debugger the clock
	   *        keeps ticking and you get some larger timestep
	   *
	   */

	  /**
	   * Starts the render loop.
	   * @memberOf module:GameSupport
	   * @param {module:GameSupport.GameSupport~RunGlobals} globals
	   * @param {callback} fn This function will be called once every
	   *        60th of a second but may be paused if haveServer =
	   *        false or pauseOnBlur = true when the window does not
	   *        have the focus.
	   */
	  function run(globals, fn) {
	    var clock = new GameClock();
	    globals.frameCount = 0;
	    globals.gameTime = 0;

	    var requestId;

	    function requestLoop(result) {
	      requestId = result ? undefined : requestAnimationFrame(loop);  // eslint-disable-line
	    }

	    function loop() {
	      globals.elapsedTime = globals.fixedFramerate || clock.getElapsedTime();
	      globals.gameTime += globals.elapsedTime;
	      ++globals.frameCount;

	      var result = fn();
	      requestLoop(result);
	    }

	    var start = function() {
	      if (requestId === undefined) {
	        requestLoop(false);
	      }
	    };

	    var stop = function() {
	      if (requestId !== undefined) {
	        cancelAnimationFrame(requestId);
	        requestId = undefined;
	      }
	    };

	    // The only reason this is here is because when you
	    // open devtools in Chrome the game blurs. As the
	    // devtools is expanded and contracted, if the game
	    // is not running it won't respond to being resized.
	    var updateOnce = function() {
	      if (requestId === undefined) {
	        start();
	        stop();
	      }
	    };

	    // This is here because running a game at 60fps
	    // in my MacBook Pro switches the discrete GPU
	    // and uses a ton of CPU as well, eating up my
	    // battery. So, if I'm running locally I make
	    // the game pause on blur which means effectively
	    // it will stop anytime I switch back to my editor.
	    if ((globals.haveServer === false && globals.pauseOnBlur !== false) || globals.pauseOnBlur) {
	      window.addEventListener('blur', stop, false);
	      window.addEventListener('focus', start, false);
	      window.addEventListener('resize', updateOnce, false);
	    }

	    if (globals.step) {
	      updateOnce();
	      window.addEventListener('click', updateOnce, false);
	    } else {
	      start();
	    }
	  }

	  /**
	   * Sets the content of the status element. Only visible of debug
	   * is true.
	   * @memberOf module:GameSupport
	   * @param {string} str value to set the status
	   */
	  var setStatus = function(str) {
	    if (statusNode) {
	      statusNode.nodeValue = str;
	    }
	  };

	  /**
	   * Logs a msg to the HTML based console that is only visible
	   * when debug = true.
	   * @memberOf module:GameSupport
	   * @param {string} str msg to add to log
	   */
	  var log = function(str) {
	    logger.log(str);
	  };

	  /**
	   * Logs an error to the HTML based console that is only visible
	   * when debug = true.
	   * @memberOf module:GameSupport
	   * @param {string} str msg to add to log
	   */
	  var error = function(str) {
	    logger.error(str);
	  };

	  return {
	    init: init,
	    run: run,
	    log: log,
	    error: error,
	    setStatus: setStatus,
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
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

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var NullLogger = function() {
	  };

	  NullLogger.prototype.log = function() {
	  };

	  NullLogger.prototype.error = function() {
	  };

	  var ConsoleLogger = function() {
	  };

	  ConsoleLogger.prototype.log = function() {
	    console.log.apply(console, arguments);
	  };

	  ConsoleLogger.prototype.error = function() {
	    console.error.apply(console, arguments);
	  };

	  var HTMLLogger = function(element, opt_maxLines) {
	    this.container = element;
	    this.maxLines = opt_maxLines || 10;
	    this.lines = [];
	  };

	  HTMLLogger.prototype.addLine_ = function(msg, color) {
	    var line;
	    var text;
	    if (this.lines.length < this.maxLines) {
	      line = document.createElement("div");
	      text = document.createTextNode("");
	      line.appendChild(text);
	    } else {
	      line = this.lines.shift();
	      line.parentNode.removeChild(line);
	      text = line.firstChild;
	    }

	    this.lines.push(line);
	    text.nodeValue = msg;
	    line.style.color = color;
	    this.container.appendChild(line);
	  };

	  // FIX! or move to strings.js
	  var argsToString = function(args) {
	    var lastArgWasNumber = false;
	    var numArgs = args.length;
	    var strs = [];
	    for (var ii = 0; ii < numArgs; ++ii) {
	      var arg = args[ii];
	      if (arg === undefined) {
	        strs.push('undefined');
	      } else if (typeof arg === 'number') {
	        if (lastArgWasNumber) {
	          strs.push(", ");
	        }
	        if (arg === Math.floor(arg)) {
	          strs.push(arg.toFixed(0));
	        } else {
	        strs.push(arg.toFixed(3));
	        }
	        lastArgWasNumber = true;
	      } else if (window.Float32Array && arg instanceof Float32Array) {
	        // TODO(gman): Make this handle other types of arrays.
	        strs.push(tdl.string.argsToString(arg));
	      } else {
	        strs.push(arg.toString());
	        lastArgWasNumber = false;
	      }
	    }
	    return strs.join("");
	  };

	  HTMLLogger.prototype.log = function() {
	    this.addLine_(argsToString(arguments), undefined);
	  };

	  HTMLLogger.prototype.error = function() {
	    this.addLine_(argsToString(arguments), "red");
	  };

	  var GameLogger = function(client) {
	    this.log = client.logImpl.bind(client);
	    this.error = client.errorImpl.bind(client);
	  };

	  return {
	    ConsoleLogger: ConsoleLogger,
	    GameLogger: GameLogger,
	    HTMLLogger: HTMLLogger,
	    NullLogger: NullLogger,
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));




/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
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

	/**
	 * @module Misc
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  /**
	   * Copies properties from obj to dst recursively.
	   * @param {Object} obj Object with new settings.
	   * @param {Object} dst Object to receive new settings.
	   * @param {number?} opt_overwriteBehavior
	   *     *   0/falsy = overwrite
	   *
	   *         src    = {foo:'bar'}
	   *         dst    = {foo:'abc'}
	   *         result = {foo:'bar'}
	   *
	   *     *   1 = don't overwrite but descend if deeper
	   *
	   *         src    = {foo:{bar:'moo','abc':def}}
	   *         dst    = {foo:{bar:'ghi'}}
	   *         result = {foo:{bar:'ghi','abc':def}}
	   *
	   *         'foo' exists but we still go deeper and apply 'abc'
	   *
	   *     *   2 = don't overwrite don't descend
	   *
	   *             src    = {foo:{bar:'moo','abc':def}}
	   *             dst    = {foo:{bar:'ghi'}}
	   *             result = {foo:{bar:'ghi'}}
	   *
	   *         'foo' exists so we don't go any deeper
	   *
	   */
	  var copyProperties = function(src, dst, opt_overwriteBehavior) {
	    Object.keys(src).forEach(function(key) {
	      if (opt_overwriteBehavior === 2 && dst[key] !== undefined) {
	        return;
	      }
	      var value = src[key];
	      if (value instanceof Array) {
	        var newDst = dst[key];
	        if (!newDst) {
	          newDst = [];
	          dst[name] = newDst;
	        }
	        copyProperties(value, newDst, opt_overwriteBehavior);
	      } else if (value instanceof Object &&
	                 !(value instanceof Function) &&
	                 !(value instanceof HTMLElement)) {
	        var newDst2 = dst[key];
	        if (!newDst2) {
	          newDst2 = {};
	          dst[key] = newDst2;
	        }
	        copyProperties(value, newDst2, opt_overwriteBehavior);
	      } else {
	        if (opt_overwriteBehavior === 1 && dst[key] !== undefined) {
	          return;
	        }
	        dst[key] = value;
	      }
	    });
	    return dst;
	  };

	  function searchStringToObject(str, opt_obj) {
	    if (str[0] === '?') {
	      str = str.substring(1);
	    }
	    var results = opt_obj || {};
	    str.split("&").forEach(function(part) {
	      var pair = part.split("=").map(decodeURIComponent);
	      results[pair[0]] = pair[1] !== undefined ? pair[1] : true;
	    });
	    return results;
	  }

	  function objectToSearchString(obj) {
	    return "?" + Object.keys(obj).filter(function(key) {
	      return obj[key] !== undefined;
	    }).map(function(key) {
	      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
	    }).join("&");
	  }

	  /**
	   * Reads the query values from a URL like string.
	   * @param {String} url URL like string eg. http://foo?key=value
	   * @param {Object} [opt_obj] Object to attach key values to
	   * @return {Object} Object with key values from URL
	   * @memberOf module:Misc
	   */
	  var parseUrlQueryString = function(str, opt_obj) {
	    var dst = opt_obj || {};
	    try {
	      var q = str.indexOf("?");
	      var e = str.indexOf("#");
	      if (e < 0) {
	        e = str.length;
	      }
	      var query = str.substring(q + 1, e);
	      searchStringToObject(query, dst);
	    } catch (e) {
	      console.error(e);
	    }
	    return dst;
	  };

	  /**
	   * Reads the query values from the current URL.
	   * @param {Object=} opt_obj Object to attach key values to
	   * @return {Object} Object with key values from URL
	   * @memberOf module:Misc
	   */
	  var parseUrlQuery = function(opt_obj) {
	    return searchStringToObject(window.location.search, opt_obj);
	  };

	  /**
	   * Read `settings` from URL. Assume settings it a
	   * JSON like URL as in http://foo?settings={key:value},
	   * Note that unlike real JSON we don't require quoting
	   * keys if they are alpha_numeric.
	   *
	   * @param {Object=} opt_obj object to apply settings to.
	   * @param {String=} opt_argumentName name of key for settings, default = 'settings'.
	   * @return {Object} object with settings
	   * @func applyUrlSettings
	   * @memberOf module:Misc
	   */
	  var fixKeysRE = new RegExp("([a-zA-Z0-9_]+)\:", "g");

	  var applyUrlSettings = function(opt_obj, opt_argumentName) {
	    var argumentName = opt_argumentName || 'settings';
	    var src = parseUrlQuery();
	    var dst = opt_obj || {};
	    var settingsStr = src[argumentName];
	    if (settingsStr) {
	      var json = settingsStr.replace(fixKeysRE, '"$1":');
	      var settings = JSON.parse(json);
	      copyProperties(settings, dst);
	    }
	    return dst;
	  };

	  /**
	   * Gets a function checking for prefixed versions
	   *
	   * example:
	   *
	   *     var lockOrientation = misc.getFunctionByPrefix(window.screen, "lockOrientation");
	   *
	   * @param {object} obj object that has function
	   * @param {string} funcName name of function
	   * @return {function?} or undefined if it doesn't exist
	   */
	  var prefixes = ["", "moz", "webkit", "ms"];
	  function getFunctionByPrefix(obj, funcName) {
	    var capitalName = funcName.substr(0, 1).toUpperCase() + funcName.substr(1);
	    for (var ii = 0; ii < prefixes.length; ++ii) {
	      var prefix = prefixes[ii];
	      var name = prefix + prefix ? capitalName : funcName;
	      var func = obj[name];
	      if (func) {
	        return func.bind(obj);
	      }
	    }
	  }

	  /**
	   * Creates an invisible iframe and sets the src
	   * @param {string} src the source for the iframe
	   * @return {HTMLIFrameElement} The iframe
	   */
	  function gotoIFrame(src) {
	    var iframe = document.createElement("iframe");
	    iframe.style.display = "none";
	    iframe.src = src;
	    document.body.appendChild(iframe);
	    return iframe;
	  }

	  /**
	   * get a random int
	   * @param {number} value max value exclusive. 5 = random 0 to 4
	   * @return {number} random int
	   * @memberOf module:Misc
	   */
	  var randInt = function(value) {
	    return Math.floor(Math.random() * value);
	  };

	  /**
	   * get a random CSS color
	   * @param {function(number): number?) opt_randFunc function to generate random numbers
	   * @return {string} random css color
	   * @memberOf module:Misc
	   */
	  var randCSSColor = function(opt_randFunc) {
	    var randFunc = opt_randFunc || randInt;
	    var strong = randFunc(3);
	    var colors = [];
	    for (var ii = 0; ii < 3; ++ii) {
	      colors.push(randFunc(128) + (ii === strong ? 128 : 64));
	    }
	    return "rgb(" + colors.join(",") + ")";
	  };

	  /**
	   * Gets a random element from array
	   * @param {Array<*>} array array to select element from
	   * @return {*} picked element
	   */
	  function pickRandomElement(array) {
	    return array[randInt(array.length)];
	  }

	  /**
	   * get a random 32bit color
	   * @param {function(number): number?) opt_randFunc function to generate random numbers
	   * @return {string} random 32bit color
	   * @memberOf module:Misc
	   */
	  var rand32BitColor = function(opt_randFunc) {
	    var randFunc = opt_randFunc || randInt;
	    var strong = randFunc(3);
	    var color = 0xFF;
	    for (var ii = 0; ii < 3; ++ii) {
	      color = (color << 8) | (randFunc(128) + (ii === strong ? 128 : 64));
	    }
	    return color;
	  };

	  /**
	   * finds a CSS rule.
	   * @param {string} selector
	   * @return {Rule?} matching css rule
	   * @memberOf module:Misc
	   */
	  var findCSSStyleRule = function(selector) {
	    for (var ii = 0; ii < document.styleSheets.length; ++ii) {
	      var styleSheet = document.styleSheets[ii];
	      var rules = styleSheet.cssRules || styleSheet.rules;
	      if (rules) {
	        for (var rr = 0; rr < rules.length; ++rr) {
	          var rule = rules[rr];
	          if (rule.selectorText === selector) {
	            return rule;
	          }
	        }
	      }
	    }
	  };

	  /**
	   * Inserts a text node into an element
	   * @param {HTMLElement} element element to have text node insert
	   * @return {HTMLTextNode} the created text node
	   * @memberOf module:Misc
	   */
	  var createTextNode = function(element) {
	    var txt = document.createTextNode("");
	    element.appendChild(txt);
	    return txt;
	  };

	  /**
	   * Returns the absolute position of an element for certain browsers.
	   * @param {HTMLElement} element The element to get a position
	   *        for.
	   * @returns {Object} An object containing x and y as the
	   *        absolute position of the given element.
	   * @memberOf module:Misc
	   */
	  var getAbsolutePosition = function(element) {
	    var r = { x: element.offsetLeft, y: element.offsetTop };
	    if (element.offsetParent) {
	      var tmp = getAbsolutePosition(element.offsetParent);
	      r.x += tmp.x;
	      r.y += tmp.y;
	    }
	    return r;
	  };

	  /**
	   * Clamp value
	   * @param {Number} v value to clamp
	   * @param {Number} min min value to clamp to
	   * @param {Number} max max value to clamp to
	   * @returns {Number} v clamped to min and max.
	   * @memberOf module:Misc
	   */
	  var clamp = function(v, min, max) {
	    return Math.max(min, Math.min(max, v));
	  };

	  /**
	   * Clamp in both positive and negative directions.
	   * Same as clamp(v, -max, +max)
	   *
	   * @param {Number} v value to clamp
	   * @param {Number} max max value to clamp to
	   * @returns {Number} v clamped to -max and max.
	   * @memberOf module:Misc
	   */
	  var clampPlusMinus = function(v, max) {
	    return clamp(v, -max, max);
	  };

	  /**
	   * Return sign of value
	   *
	   * @param {Number} v value
	   * @returns {Number} -1 if v < 0, 1 if v > 0, 0 if v == 0
	   * @memberOf module:Misc
	   */
	  var sign = function(v) {
	    return v < 0 ? -1 : (v > 0 ? 1 : 0);
	  };

	  /**
	   * Takes which ever is closer to zero
	   * In other words minToZero(-2, -1) = -1 and minToZero(2, 1) = 1
	   *
	   * @param {Number} v value to min
	   * @param {Number} min min value to use if v is less then -min
	   *        or greater than +min
	   * @returns {Number} min or v, which ever is closer to zero
	   * @memberOf module:Misc
	   */
	  var minToZero = function(v, min) {
	    return Math.abs(v) < Math.abs(min) ? v : min;
	  };

	  /**
	   * flips 0->max to max<-0 and 0->min to min->0
	   * In otherwords
	   *     max: 3, v: 2.7  =  0.3
	   *     max: 3, v:-2.7  = -0.3
	   *     max: 3, v: 0.2  =  2.8
	   *     max: 3, v:-0.2  = -2.8
	   *
	   * @param {Number} v value to flip.
	   * @param {Number} max range to flip inside.
	   * @returns {Number} flipped value.
	   * @memberOf module:Misc
	   */
	  var invertPlusMinusRange = function(v, max) {
	    return sign(v) * (max - Math.min(max, Math.abs(v)));
	  };

	  /**
	   * Convert degrees to radians
	   *
	   * @param {Number} d value in degrees
	   * @returns {Number} d in radians
	   * @memberOf module:Misc
	   */
	  var degToRad = function(d) {
	    return d * Math.PI / 180;
	  };

	  /**
	   * Converts radians to degrees
	   * @param {Number} r value in radians
	   * @returns {Number} r in degrees
	   * @memberOf module:Misc
	   */
	  var radToDeg = function(r) {
	    return r * 180 / Math.PI;
	  };

	  /**
	   * Resizes a cavnas to match its CSS displayed size.
	   * @param {Canvas} canvas canvas to resize.
	   * @param {boolean?} useDevicePixelRatio if true canvas will be
	   *        created to match devicePixelRatio.
	   * @memberOf module:Misc
	   */
	  var resize = function(canvas, useDevicePixelRatio) {
	    var mult = useDevicePixelRatio ? window.devicePixelRatio : 1;
	    mult = mult || 1;
	    var width  = Math.floor(canvas.clientWidth  * mult);
	    var height = Math.floor(canvas.clientHeight * mult);
	    if (canvas.width !== width ||
	        canvas.height !== height) {
	      canvas.width = width;
	      canvas.height = height;
	      return true;
	    }
	  };

	  /**
	   * Copies all the src properties to the dst
	   * @param {Object} src an object with some properties
	   * @param {Object} dst an object to receive copes of the properties
	   * @return returns the dst object.
	   */
	  function applyObject(src, dst) {
	    Object.keys(src).forEach(function(key) {
	      dst[key] = src[key];
	    });
	    return dst;
	  }

	  /**
	   * Merges the proprties of all objects into a new object
	   *
	   * Example:
	   *
	   *     var a = { abc: "def" };
	   *     var b = { xyz: "123" };
	   *     var c = Misc.mergeObjects(a, b);
	   *
	   *     // c = { abc: "def", xyz: "123" };
	   *
	   * Later object properties take precedence
	   *
	   *     var a = { abc: "def" };
	   *     var b = { abc: "123" };
	   *     var c = Misc.mergeObjects(a, b);
	   *
	   *     // c = { abc: "123" };
	   *
	   * @param {...Object} object objects to merge.
	   * @return an object containing the merged properties
	   */
	  function mergeObjects(object) {  // eslint-disable-line
	    var merged = {};
	    Array.prototype.slice.call(arguments).forEach(function(src) {
	      if (src) {
	        applyObject(src, merged);
	      }
	    });
	    return merged;
	  }

	  /**
	   * Creates a random id
	   * @param {number} [digits] number of digits. default 16
	   */
	  function makeRandomId(digits) {
	    digits = digits || 16;
	    var id = "";
	    for (var ii = 0; ii < digits; ++ii) {
	      id = id + ((Math.random() * 16 | 0)).toString(16);
	    }
	    return id;
	  }

	  /**
	   * Applies an object of listeners to an emitter.
	   *
	   * Example:
	   *
	   *     applyListeners(someDivElement, {
	   *       mousedown: someFunc1,
	   *       mousemove: someFunc2,
	   *       mouseup: someFunc3,
	   *     });
	   *
	   * Which is the same as
	   *
	   *     someDivElement.addEventListener("mousedown", someFunc1);
	   *     someDivElement.addEventListener("mousemove", someFunc2);
	   *     someDivElement.addEventListener("mouseup", someFunc3);
	   *
	   * @param {Emitter} emitter some object that emits events and has a function `addEventListener`
	   * @param {Object.<string, function>} listeners eventname function pairs.
	   */
	  function applyListeners(emitter, listeners) {
	    Object.keys(listeners).forEach(function(name) {
	      emitter.addEventListener(name, listeners[name]);
	    });
	  }

	  return {
	    applyObject: applyObject,
	    applyUrlSettings: applyUrlSettings,
	    applyListeners: applyListeners,
	    clamp: clamp,
	    clampPlusMinus: clampPlusMinus,
	    copyProperties: copyProperties,
	    createTextNode: createTextNode,
	    degToRad: degToRad,
	    findCSSStyleRule: findCSSStyleRule,
	    getAbsolutePosition: getAbsolutePosition,
	    getFunctionByPrefix: getFunctionByPrefix,
	    gotoIFrame: gotoIFrame,
	    invertPlusMinusRange: invertPlusMinusRange,
	    makeRandomId: makeRandomId,
	    mergeObjects: mergeObjects,
	    minToZero: minToZero,
	    objectToSearchString: objectToSearchString,
	    parseUrlQuery: parseUrlQuery,
	    parseUrlQueryString: parseUrlQueryString,
	    pickRandomElement: pickRandomElement,
	    radToDeg: radToDeg,
	    randInt: randInt,
	    randCSSColor: randCSSColor,
	    rand32BitColor: rand32BitColor,
	    resize: resize,
	    sign: sign,
	    searchStringToObject: searchStringToObject,
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));




/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
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

	/**
	 * Miscellaneous string functions
	 * @module Strings
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Returns a padding string large enough for the given size.
	   * @param {string} padChar character for padding string
	   * @param {number} len minimum length of padding.
	   * @returns {string} string with len or more of padChar.
	   */
	  var getPadding = (function() {
	    var paddingDb = {};

	    return function(padChar, len) {
	      var padStr = paddingDb[padChar];
	      if (!padStr || padStr.length < len) {
	        padStr = new Array(len + 1).join(padChar);
	        paddingDb[padChar] = padStr;
	      }
	      return padStr;
	    };
	  }());

	  /**
	   * Turn an unknown object into a string if it's not already.
	   * Do I really needs this? I could just always do .toString even
	   * on a string.
	   */
	  var stringIt = function(str) {
	    return (typeof str === 'string') ? str : str.toString();
	  };

	  /**
	   * Pad string on right
	   * @param {string} str string to pad
	   * @param {number} len number of characters to pad to
	   * @param {string} padChar character to pad with
	   * @returns {string} padded string.
	   * @memberOf module:Strings
	   */
	  var padRight = function(str, len, padChar) {
	    str = stringIt(str);
	    if (str.length >= len) {
	      return str;
	    }
	    var padStr = getPadding(padChar, len);
	    return str + padStr.substr(str.length - len);
	  };

	  /**
	   * Pad string on left
	   * @param {string} str string to pad
	   * @param {number} len number of characters to pad to
	   * @param {string} padChar character to pad with
	   * @returns {string} padded string.
	   * @memberOf module:Strings
	   */
	  var padLeft = function(str, len, padChar) {
	    str = stringIt(str);
	    if (str.length >= len) {
	      return str;
	    }
	    var padStr = getPadding(padChar, len);
	    return padStr.substr(str.length - len) + str;
	  };

	  /**
	   * Replace %(id)s in strings with values in objects(s)
	   *
	   * Given a string like `"Hello %(name)s from $(user.country)s"`
	   * and an object like `{name:"Joe",user:{country:"USA"}}` would
	   * return `"Hello Joe from USA"`.
	   *
	   * @function
	   * @param {string} str string to do replacements in
	   * @param {Object|Object[]} params one or more objects.
	   * @returns {string} string with replaced parts
	   * @memberOf module:Strings
	   */
	  var replaceParams = (function() {
	    var replaceParamsRE = /%\(([^\)]+)\)s/g;

	    return function(str, params) {
	      if (!params.length) {
	        params = [params];
	      }

	      return str.replace(replaceParamsRE, function(match, key) {
	        var keys = key.split('.');
	        for (var ii = 0; ii < params.length; ++ii) {
	          var obj = params[ii];
	          for (var jj = 0; jj < keys.length; ++jj) {
	            var part = keys[jj];
	            obj = obj[part];
	            if (obj === undefined) {
	              break;
	            }
	          }
	          if (obj !== undefined) {
	            return obj;
	          }
	        }
	        console.error("unknown key: " + key);
	        return "%(" + key + ")s";
	      });
	    };
	  }());

	  /**
	   * True if string starts with prefix
	   * @static
	   * @param {String} str string to check for start
	   * @param {String} prefix start value
	   * @returns {Boolean} true if str starts with prefix
	   * @memberOf module:Strings
	   */
	  var startsWith = function(str, start) {
	    return (str.length >= start.length &&
	            str.substr(0, start.length) === start);
	  };

	  /**
	   * True if string ends with suffix
	   * @param {String} str string to check for start
	   * @param {String} suffix start value
	   * @returns {Boolean} true if str starts with suffix
	   * @memberOf module:Strings
	   */
	  var endsWith = function(str, end) {
	    return (str.length >= end.length &&
	            str.substring(str.length - end.length) === end);
	  };

	  /**
	   * Make a string from unicode code points
	   * @function
	   * @param {Number} codePoint one or more code points
	   * @returns {string} unicode string. Note a single code point
	   *          can return a string with length > 1.
	   * @memberOf module:Strings
	   */
	  var fromCodePoint = String.fromCodePoint ? String.fromCodePoint : (function() {
	    var stringFromCharCode = String.fromCharCode;
	    var floor = Math.floor;
	    var fromCodePoint = function() {
	      var MAX_SIZE = 0x4000;
	      var codeUnits = [];
	      var highSurrogate;
	      var lowSurrogate;
	      var index = -1;
	      var length = arguments.length;
	      if (!length) {
	        return '';
	      }
	      var result = '';
	      while (++index < length) {
	        var codePoint = Number(arguments[index]);
	        if (
	          !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
	          codePoint < 0 || // not a valid Unicode code point
	          codePoint > 0x10FFFF || // not a valid Unicode code point
	          floor(codePoint) !== codePoint // not an integer
	        ) {
	          throw new RangeError('Invalid code point: ' + codePoint);
	        }
	        if (codePoint <= 0xFFFF) { // BMP code point
	          codeUnits.push(codePoint);
	        } else { // Astral code point; split in surrogate halves
	          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	          codePoint -= 0x10000;
	          highSurrogate = (codePoint >> 10) + 0xD800;
	          lowSurrogate = (codePoint % 0x400) + 0xDC00;
	          codeUnits.push(highSurrogate, lowSurrogate);
	        }
	        if (index + 1 === length || codeUnits.length > MAX_SIZE) {
	          result += stringFromCharCode.apply(null, codeUnits);
	          codeUnits.length = 0;
	        }
	      }
	      return result;
	    };
	    return fromCodePoint;
	  }());

	  var exports = {
	    endsWith: endsWith,
	    fromCodePoint: fromCodePoint,
	    padLeft: padLeft,
	    padRight: padRight,
	    replaceParams: replaceParams,
	    startsWith: startsWith,
	  };

	  return exports;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));




/***/ }
/******/ ])
});
;