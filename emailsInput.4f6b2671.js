// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"emailEntity.ts":[function(require,module,exports) {
"use strict";
/*
 Individual email state
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailEntity = void 0;

var EmailEntity =
/** @class */
function () {
  function EmailEntity(value) {
    this.valid = false;
    this.value = '';
    this.completed = false;

    if (typeof value !== 'undefined') {
      this.complete();
      this.update(value);
    }
  }

  EmailEntity.prototype.complete = function () {
    this.completed = true;
  };

  EmailEntity.prototype.update = function (value) {
    this.valid = EmailEntity.validate(value);
    this.value = value;
  };

  EmailEntity.validate = function (value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  };

  return EmailEntity;
}();

exports.EmailEntity = EmailEntity;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "wrapper": "_wrapper_aa97e",
  "body": "_body_aa97e",
  "title": "_title_aa97e",
  "input": "_input_aa97e",
  "emailItem": "_emailItem_aa97e",
  "emailItemCorrect": "_emailItemCorrect_aa97e",
  "emailItemError": "_emailItemError_aa97e",
  "emailItemDelete": "_emailItemDelete_aa97e",
  "emailsContainer": "_emailsContainer_aa97e",
  "controls": "_controls_aa97e",
  "controlItem": "_controlItem_aa97e"
};
},{"./static/remove.png":[["remove.5f00cd0f.png","static/remove.png"],"static/remove.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"EmailsInputDOM.ts":[function(require,module,exports) {
"use strict"; // encapsulate EmailsInput direct DOM manipulations

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailsInputDOM = void 0;

var styles = __importStar(require("./style.css"));

var EmailsInputDOM =
/** @class */
function () {
  function EmailsInputDOM(root) {
    this.controlItems = [];
    this.wrapperNode = EmailsInputDOM.mountWrapper(root);
    this.inputBodyNode = EmailsInputDOM.mountBody(this.wrapperNode);
    this.titleNode = EmailsInputDOM.mountTitle(this.inputBodyNode);
    this.emailsContainer = EmailsInputDOM.mountEmailsContainer(this.inputBodyNode);
    this.inputNode = EmailsInputDOM.mountInput(this.emailsContainer);
    this.controlsNode = EmailsInputDOM.mountControls(this.wrapperNode);
  }

  EmailsInputDOM.prototype.addEmailsItem = function (entity, onDelete) {
    var _this = this;

    if (!this.emailsContainer) throw Error('emailsContainer is not mounted');
    var item = EmailsInputDOM.mountEmailItem(this.emailsContainer);
    item.className = [styles.emailItem, entity.valid ? styles.emailItemCorrect : styles.emailItemError].join(' ');
    item.innerHTML = entity.value;
    var cross = document.createElement('div');

    cross.onclick = function () {
      var _a;

      onDelete();
      (_a = _this.emailsContainer) === null || _a === void 0 ? void 0 : _a.removeChild(item);
    };

    cross.className = styles.emailItemDelete;
    item.appendChild(cross);
    return item;
  };

  EmailsInputDOM.prototype.addControl = function (props) {
    if (!this.controlsNode) throw Error('controlsNode is not mounted');
    var controlNode = document.createElement('button');
    controlNode.innerText = props.title;
    controlNode.onclick = props.onClick;
    controlNode.className = styles.controlItem;
    EmailsInputDOM.mountControl(this.controlsNode, controlNode);
  };

  EmailsInputDOM.prototype.destroy = function () {
    var _a, _b;

    (_a = this.inputNode) === null || _a === void 0 ? void 0 : _a.remove();
    this.inputNode = null;
    (_b = this.wrapperNode) === null || _b === void 0 ? void 0 : _b.remove();
    this.wrapperNode = null;
  };

  EmailsInputDOM.mountControl = function (where, control) {
    where.appendChild(control);
    return control;
  };

  EmailsInputDOM.mountWrapper = function (where) {
    var wrapper = document.createElement('div');
    wrapper.className = styles.wrapper;
    where.appendChild(wrapper);
    return wrapper;
  };

  EmailsInputDOM.mountBody = function (where) {
    var body = document.createElement('div');
    body.className = styles.body;
    where.appendChild(body);
    return body;
  };

  EmailsInputDOM.mountEmailsContainer = function (where) {
    var item = document.createElement('div');
    item.className = styles.emailsContainer;
    where.appendChild(item);
    return item;
  };

  EmailsInputDOM.mountEmailItem = function (where) {
    var item = document.createElement('div');
    item.className = styles.emailItem;
    where.prepend(item);
    return item;
  };

  EmailsInputDOM.mountInput = function (where) {
    var input = document.createElement('input');
    input.className = styles.input;
    input.placeholder = 'add more people...';
    where.appendChild(input);
    return input;
  };

  EmailsInputDOM.mountTitle = function (body) {
    var title = document.createElement('h5');
    title.className = styles.title;
    title.innerHTML = 'Share <b>Board name</b> with others';
    body.appendChild(title);
    return title;
  };

  EmailsInputDOM.mountControls = function (wrapper) {
    var controls = document.createElement('div');
    controls.className = styles.controls;
    wrapper.appendChild(controls);
    return controls;
  };

  return EmailsInputDOM;
}();

exports.EmailsInputDOM = EmailsInputDOM;
},{"./style.css":"style.css"}],"emailsInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailsInput = exports.injectFonts = exports.OPEN_SANS_HREF = exports.FLAGS = void 0;

var emailEntity_1 = require("./emailEntity");

var EmailsInputDOM_1 = require("./EmailsInputDOM");

exports.FLAGS = {
  FONTS_INJECTED: false
}; // add font

exports.OPEN_SANS_HREF = "https://fonts.googleapis.com/css?family=Open+Sans";

function injectFonts() {
  var fonts = document.createElement('link');
  fonts.href = exports.OPEN_SANS_HREF;
  fonts.rel = 'stylesheet';
  document.body.appendChild(fonts);
  exports.FLAGS.FONTS_INJECTED = true;
}

exports.injectFonts = injectFonts;

var EmailsInput =
/** @class */
function () {
  function EmailsInput(containerNode) {
    var _this = this;

    this.entities = [];

    this.completeEmailBlock = function () {
      var entity = _this.lastEntity;
      if (!entity || entity.completed) return;
      entity.complete();

      _this.DOM.addEmailsItem(entity, function () {
        return _this.deleteEntity(entity);
      });

      if (_this.DOM.inputNode) {
        _this.DOM.inputNode.value = '';
      }
    };

    this.deleteEntity = function (entity) {
      _this.entities = _this.entities.filter(function (val) {
        return val !== entity;
      });
    };

    this.handleCompleteKeys = function (event) {
      switch (event.key) {
        case ',':
        case 'Enter':
          {
            // complete current block
            _this.completeEmailBlock();

            event.preventDefault();
            return;
          }

        default:
          {
            return;
          }
      }
    };

    this.handleInput = function (event) {
      var lastEntity = _this.lastEntity;

      if (!lastEntity || lastEntity && lastEntity.completed) {
        var newEntity = new emailEntity_1.EmailEntity();

        _this.entities.push(newEntity);

        lastEntity = newEntity;
      }

      lastEntity.update(event.currentTarget.value);
    };

    this.handlePaste = function (event) {
      var _a;

      event.preventDefault();
      var text = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text');
      if (!text) return;
      text.split(',').map(function (email) {
        return email.trim();
      }).forEach(function (email) {
        _this.addEmail(email);
      });
    };

    if (!exports.FLAGS.FONTS_INJECTED) {
      injectFonts();
    }

    this.DOM = new EmailsInputDOM_1.EmailsInputDOM(containerNode);
    this.applyListenersListeners();
  }

  Object.defineProperty(EmailsInput.prototype, "lastEntity", {
    get: function get() {
      if (this.entities.length) {
        return this.entities[this.entities.length - 1];
      }

      return undefined;
    },
    enumerable: false,
    configurable: true
  });

  EmailsInput.prototype.addEmail = function (email) {
    var _this = this;

    var entity = new emailEntity_1.EmailEntity(email);
    this.entities.push(entity);
    this.DOM.addEmailsItem(entity, function () {
      return _this.deleteEntity(entity);
    });
  };

  EmailsInput.prototype.addControlItem = function (control) {
    this.DOM.addControl(control);
  };

  EmailsInput.prototype.destroy = function () {
    this.DOM.destroy();
  };

  EmailsInput.prototype.applyListenersListeners = function () {
    var _a, _b, _c, _d;

    (_a = this.DOM.inputNode) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', this.handleCompleteKeys);
    (_b = this.DOM.inputNode) === null || _b === void 0 ? void 0 : _b.addEventListener('input', this.handleInput);
    (_c = this.DOM.inputNode) === null || _c === void 0 ? void 0 : _c.addEventListener('blur', this.completeEmailBlock);
    (_d = this.DOM.inputNode) === null || _d === void 0 ? void 0 : _d.addEventListener('paste', this.handlePaste);
  };

  return EmailsInput;
}();

exports.EmailsInput = EmailsInput;
window.EmailsInput = EmailsInput;
},{"./emailEntity":"emailEntity.ts","./EmailsInputDOM":"EmailsInputDOM.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34115" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","emailsInput.ts"], null)
//# sourceMappingURL=/emailsInput.4f6b2671.js.map