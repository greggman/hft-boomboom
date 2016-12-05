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

define([], function() {
  function makeNumberProp(info, settings) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = info.desc;
    div.appendChild(label);
    const input = document.createElement("input");
    input.type = "number";
    input.value = settings[info.key];
    info.validFn = (newValue) => {
      newValue = newValue | 0;
      if (info.valid) {
        newValue = info.valid(info, settings, newValue);
      }
      if (info.min) {
        newValue = Math.max(newValue, info.min);
      }
      if (info.max) {
        newValue = Math.min(newValue, info.max);
      }
      return newValue;
    };
    const updateFn = (e) => {
      let newValue = info.validFn(e.target.value);
      e.target.value = newValue;
      console.log("set:", info.key, "=", newValue);
      settings[info.key] = newValue;
    };
    input.addEventListener('change', updateFn);
    //input.addEventListener('input', updateFn);
    div.appendChild(input);
    //if (info.hint) {
    //  const hint = document.createElement("div");
    //  hint.className = "hint";
    //  hint.textContent = info.hint;
    //  div.appendChild(hint);
    //}
    return div;
  }

  function makePercentProp(info, settings) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = info.desc;
    div.appendChild(label);
    const input = document.createElement("input");
    input.type = "number";
    input.value = settings[info.key] | 0;
    info.validFn = (newValue) => {
      newValue = newValue | 0;
      if (info.valid) {
        newValue = info.valid(info, settings, newValue);
      }
      if (info.min) {
        newValue = Math.max(newValue, info.min);
      }
      if (info.max) {
        newValue = Math.min(newValue, info.max);
      }
      return newValue;
    };
    const updateFn = (e) => {
      let newValue = info.validFn(e.target.value);
      e.target.value = newValue;
      console.log("set:", info.key, "=", newValue);
      settings[info.key] = newValue;
    };
    input.addEventListener('change', updateFn);
    //input.addEventListener('input', updateFn);
    div.appendChild(input);
    //if (info.hint) {
    //  const hint = document.createElement("div");
    //  hint.className = "hint";
    //  hint.textContent = info.hint;
    //  div.appendChild(hint);
    //}
    return div;
  }

  function makeBooleanProp(info, settings) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = info.desc;
    div.appendChild(label);
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = settings[info.key];
    info.validFn = v => v;
    input.addEventListener('change', (e) => {
      const newValue = info.validFn(e.target.checked);
      console.log("set:", info.key, "=", newValue);
      settings[info.key] = newValue;
    });
    div.appendChild(input);
    //if (info.hint) {
    //  const hint = document.createElement("div");
    //  hint.className = "hint";
    //  hint.textContent = info.hint;
    //  div.appendChild(hint);
    //}
    return div;
  }

  const controls = {
    Number: makeNumberProp,
    Percent: makePercentProp,
    Boolean: makeBooleanProp,
  };

  function validateAll(settingsSpec, settings) {
    Object.keys(settingsSpec).forEach(key => {
      const info = settingsSpec[key];
      settings[key] = info.validFn(settings[key]);
    });
  }

  function makeForm(form, settingsSpec, settings) {
    Object.keys(settingsSpec).forEach(key => {
      const info = settingsSpec[key];
      info.key = key;
      if (settings[key] === undefined) {
        settings[key] = info.value;
      }
      const control = controls[info.type](info, settings);
      form.appendChild(control);
    });

    // Have to do this in a separate loop
    // become some values are dependent on others
    validateAll(settingsSpec, settings);
  }

  return {
    makeForm: makeForm,
    validateAll: validateAll,
  };
});

