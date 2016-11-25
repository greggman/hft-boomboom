/*
 * Copyright 2016, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above
 *   copyright notice, this list of conditions and the following disclaimer
 *   in the documentation and/or other materials provided with the
 *   distribution.
 *
 * * Neither the name of Gregg Tavares. nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
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
    './form',
  ],
  function(form) {
    const settingsSpec = {
      numLocalPlayers: {
        value: 0,
        type: "Number",
        desc: "Number of dumb bots",
        min: 0,
      },
      playBGM: {
        value: true,
        type: "Boolean",
        desc: "Background Music",
      },
      zoom: {
        value: 1,
        type: "Percent",
        desc: "Zoom Amount",
        min: 10,
        max: 400,
        hint: "set to smaller value to increase player limit",
      },
      roundDuration: {
        value: 120,
        type: "Number",
        min: 30,
        desc: "Seconds Per Round",
      },
      hurryTime: {
        value: 30,
        type: "Number",
        min: 15,
        desc: "Hurry Time",
        validate: (info, settings, newValue) => {
          const max = settings.roundDuration - 1;
          return Math.min(newValue, max);
        },
      },
      walkSpeed: {
        value: 64,
        type: "Number",
        min: 2,
        desc: "Walk Speed",
      },
      numStartingBombs: {
        value: 1,
        type: "Number",
        min: 1,
        max: 50,
        desc: "Number of Bombs to Start",
      },
      bombStartingSize: {
        value: 1,
        type: "Number",
        min: 1,
        max: 200,
        desc: "Size of Bomb to Start",
      },
      numSpoilBombs: {
        value: 1,
        type: "Number",
        min: 1,
        max: 200,
        desc: "Number of Bombs when Dead",
      },
      bombSpoilSize: {
        value: 2,
        type: "Number",
        min: 1,
        max: 200,
        desc: "Size of Bomb when Dead",
      },
    };


    let settings;

    function getSettings() {
      const settingsStr = window.localStorage.getItem("settings");
      if (settingsStr) {
        try {
          return JSON.parse(settingsStr);
        } catch (e) {
        }
      }
      return {};
    }

    function saveAndExit() {
      form.validateAll(settingsSpec, settings);
      window.localStorage.setItem("settings", JSON.stringify(settings));
      window.location.reload();
    }

    function init() {
      settings = getSettings();
      const formElem = document.querySelector("#settings .settings");
      const okElem = document.querySelector("#settings .ok");
      okElem.addEventListener('click', saveAndExit);
      form.makeForm(formElem, settingsSpec, settings);
      return settings;
    }

    return {
      init: init,
    };
});

