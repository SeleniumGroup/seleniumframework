var f;
var er = {base:{}};
er.base.hasValue = function(a) {
  return!(null === a || "undefined" == typeof a)
};
er.base.isFunction = function(a) {
  return"function" == typeof a
};
er.base.g = function(a) {
  return document.getElementById(a)
};
er.base.uid = function() {
  return Math.floor(2147483648 * Math.random()).toString(36)
};
er.base.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || window, e;e = c.shift();) {
    if(null != d[e]) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
er.base.extend = function(a, b) {
  for(var c in b) {
    b.hasOwnProperty(c) && (a[c] = b[c])
  }
  return a
};
er.base.ie = 0;
er.base.firefox = 0;
var match$$inline_5 = null;
if(match$$inline_5 = /msie (\d+\.\d)/i.exec(navigator.userAgent)) {
  er.base.ie = parseFloat(match$$inline_5[1])
}else {
  if(match$$inline_5 = /firefox\/(\d+\.\d)/i.exec(navigator.userAgent)) {
    er.base.firefox = parseFloat(match$$inline_5[1])
  }
}
;er.Template = function() {
  this.container = {}
};
f = er.Template.prototype;
f._getObject = function() {
  return""
};
f.setObjectGetter = function(a) {
  this._getObject = a
};
f.parseVariable = function(a) {
  var b = a.match(/:([a-z]+)$/);
  return b && 1 < b.length ? this.parseVariableByType(a.replace(/:[a-z]+$/i, ""), b[1]) : ""
};
f.parseVariableByType = function(a, b) {
  var c, b = b.toLowerCase();
  if("lang" === b || "config" === b) {
    c = this._getObject(b, a)
  }else {
    throw"Not handled";
  }
  return er.base.hasValue(c) ? c : ""
};
f.get = function(a) {
  return this.container[a] || ""
};
f.getMerged = function(a) {
  var b = this;
  return b.get(a).replace(/\$\{([.:a-z0-9_]+)\}/ig, function(a, d) {
    return b.parseVariable(d)
  })
};
f.parse = function(a) {
  function b(a) {
    return j.test(a) ? b(a.replace(j, function(a, b) {
      return t[b] || r[b] || ""
    })) : a
  }
  function c(a) {
    a && s && p.push(a)
  }
  function d() {
    s && (s in t ? alert("Template: " + s + " is exist") : t[s] = p.join("\n"));
    s = null
  }
  for(var a = a.split(/\r?\n/), e = a.length, g = 0, h = /<\!--\s*target:\s*([a-zA-Z0-9_]+)\s*--\>/, i = /<\!--\s*\/target\s*--\>/, j = /<\!--\s*import:\s*([a-zA-Z0-9_\/]+)\s*--\>/, k = /<\!--\s*scope:\s*([a-zA-Z0-9_]+)\s*--\>/, n = /<\!--\/scope--\>/, o, l, m, q, r = this.container, p = [], s, t = {};g < e;g++) {
    l = a[g], 0 >= l.length || (h.lastIndex = -1, k.lastIndex = -1, (m = k.exec(l)) ? q = m[1] : (m = n.exec(l)) ? q = void 0 : (m = h.exec(l)) ? (m = q ? q + "/" + m[1] : m[1], l = l.split(h), c(l[0]), d(), p = [], s = m, c(l[2])) : i.test(l) ? (l = l.split(i), c(l[0]), d()) : c(l))
  }
  d();
  for(o in t) {
    r[o] && alert("Template: " + o + " already exists!"), r[o] = b(t[o])
  }
};
er.template = new er.Template;
var base = {Object:function() {
}};
base.EventDispatcher = function() {
  this._listeners = []
};
baidu.inherits(base.EventDispatcher, base.Object);
base.EventDispatcher.prototype.addListener = function(a, b) {
  this._listeners[a] || (this._listeners[a] = []);
  this._listeners[a].push(b)
};
base.EventDispatcher.prototype.removeListener = function(a, b) {
  if(this._listeners[a]) {
    for(var c = this._listeners[a].length - 1;0 <= c;c--) {
      if(this._listeners[a][c] === b) {
        this._listeners[a][c] = null;
        break
      }
    }
  }
};
base.EventDispatcher.prototype.trigger = function(a, b) {
  if(!this._listeners[a]) {
    return!0
  }
  var c, d = Array.prototype.slice.call(arguments, 1), e = !0;
  for(c = 0;c < this._listeners[a].length;c++) {
    var g = this._listeners[a][c];
    g && !1 === g.apply(this, d) && (e = !1)
  }
  return e
};
base.EventDispatcher._registry = [];
base.EventDispatcher.prototype.registerListener = function(a, b) {
  base.EventDispatcher._registry.push({eventType:a, subscriber:this, listener:b})
};
base.EventDispatcher.prototype.unregisterListener = function(a, b) {
  for(var c = base.EventDispatcher._registry, d = c.length - 1;0 <= d;d--) {
    var e = c[d];
    e.subscriber === this && ((!a || a && e.eventType === a) && (!b || b && e.listener === b)) && c.splice(d, 1)
  }
};
base.EventDispatcher.prototype.publish = function(a, b) {
  var c = base.EventDispatcher._registry, d, e = Array.prototype.slice.call(arguments, 1), g = !0;
  for(d = 0;d < c.length;d++) {
    c[d].eventType === a && !1 === c[d].listener.apply(c[d].subscriber, e) && (g = !1)
  }
  return g
};
var ui = {lifeCycle:{CONSTRUCTED:0, INITIALIZED:1, MODEL_BOUND:2, RENDERED:3, EVENT_BOUND:4, DISPOSED:5}};
base.PropertyChangeNotifier = function() {
  base.EventDispatcher.call(this);
  this._settersInitialized = !1
};
function baseSet$$inline_8(a, b) {
  var c = this[b];
  c !== a && (this[b] = a, this.trigger(base.PropertyChangeNotifier.PropertyChangedEvent, b, a, c))
}
function baseGet$$inline_9(a) {
  return this[a]
}
base.PropertyChangeNotifier.prototype = {set:function(a, b) {
  baseSet$$inline_8.call(this, b, a)
}, get:function(a) {
  return this[a]
}, addPropertyChangedListener:function(a) {
  if(!this._settersInitialized) {
    var b = this, c, d;
    for(c in this) {
      "function" !== typeof this[c] && "_" !== c.charAt(0) && (d = c.charAt(0).toUpperCase() + c.substring(1), this["set" + d] = function(a) {
        return function(c) {
          baseSet$$inline_8.call(b, c, a)
        }
      }(c), this["get" + d] = function(a) {
        return function() {
          return baseGet$$inline_9.call(b, a)
        }
      }(c))
    }
    this._settersInitialized = !0
  }
  this.addListener(base.PropertyChangeNotifier.PropertyChangedEvent, a)
}, removePropertyChangedListener:function(a) {
  this.removeListener(base.PropertyChangeNotifier.PropertyChangedEvent, a)
}, triggerPropertyChanged:function(a) {
  this.trigger(base.PropertyChangeNotifier.PropertyChangedEvent, a, this[a], this[a])
}};
base.PropertyChangeNotifier.PropertyChangedEvent = "PROPERTY_CHANGED";
baidu.inherits(base.PropertyChangeNotifier, base.EventDispatcher);
base.BaseModel = function(a) {
  base.PropertyChangeNotifier.call(this);
  baidu.object.extend(this, a || {})
};
baidu.inherits(base.BaseModel, base.PropertyChangeNotifier);
ui.Control = function(a) {
  base.EventDispatcher.call(this);
  this.children = this.model = this.main = null;
  this.autoState = !1;
  baidu.object.extend(this, a);
  this.lifePhase = ui.lifeCycle.CONSTRUCTED
};
baidu.inherits(ui.Control, base.EventDispatcher);
f = ui.Control.prototype;
f._callChildren = function(a, b) {
  if(this.children) {
    var c = [], d, e;
    if(1 < arguments.length) {
      for(d = 1;d < arguments.length;d++) {
        c.push(arguments[d])
      }
    }
    for(d = 0;d < this.children.length;d++) {
      e = this.children[d], e[a] && e[a].apply(e, c)
    }
  }
};
f.init = function() {
  this.view && this.instChildrenFromTpl();
  this._callChildren("init");
  this.lifePhase = ui.lifeCycle.INITIALIZED
};
f.bindModel = function(a) {
  a && (this.model = a);
  if(this.model) {
    var b = this, c;
    this.refer && baidu.object.each(this.refer, function(a, e) {
      c = b.model[a];
      typeof c !== "undefined" && (b[e] = c)
    });
    this._callChildren("bindModel", this.model);
    this.lifePhase = ui.lifeCycle.MODEL_BOUND
  }
};
f.render = function(a) {
  a && (this.main = a);
  this.main && (this.domId && (this.main.id = this.domId, this.main.removeAttribute("ui"), this.main.setAttribute("control", this.id), baidu.addClass(this.main, this.getClass())), this.autoState && this.initStateChanger(), this._callChildren("render"), this.lifePhase = ui.lifeCycle.RENDERED)
};
f.bindEvent = function() {
  this._callChildren("bindEvent");
  this.lifePhase = ui.lifeCycle.EVENT_BOUND
};
f.dispose = function() {
  this._callChildren("dispose");
  this.parent && (this.parent = null);
  if(this.children) {
    for(var a = this.children.length - 1;0 <= a;a--) {
      this.children.splice(a, 1)
    }
    this.children = null
  }
  this.main && (this.main.childNodes.length && (this.main.innerHTML = ""), this.main.onmouseover = null, this.main.onmouseout = null, this.main.onmousedown = null, this.main.onmouseup = null);
  this.unregisterListener();
  this.lifePhase = ui.lifeCycle.DISPOSED
};
f.rebindModel = function(a) {
  if(!(this.lifePhase >= ui.lifeCycle.DISPOSED)) {
    var b = this.lifePhase;
    this.bindModel(a);
    b >= ui.lifeCycle.RENDERED && this.render();
    this.lifePhase < b && (this.lifePhase = b)
  }
};
f.addChild = function(a) {
  if(this.lifePhase >= ui.lifeCycle.DISPOSED) {
    a.dispose()
  }else {
    this.children || (this.children = []);
    for(var b = 0;b < this.children.length;b++) {
      if(this.children[b].id === a.id) {
        throw"A control with the same id [" + a.id + "] already exists";
      }
    }
    b = this.domId || this.id;
    a.domId = b ? b + "_" + a.id : a.id;
    this.children.push(a);
    a.parent = this;
    this.lifePhase >= ui.lifeCycle.INITIALIZED && (a.init(), this.lifePhase >= ui.lifeCycle.MODEL_BOUND && (a.bindModel(a.model || this.model), this.lifePhase >= ui.lifeCycle.RENDERED && (a.render(), this.lifePhase >= ui.lifeCycle.EVENT_BOUND && a.bindEvent())))
  }
};
f.removeChild = function(a, b) {
  if(this.children) {
    for(var c = b || !1, d = this.children.length - 1;0 <= d;d--) {
      if(this.children[d] === a) {
        c ? (a.parent = null, a.main.childNodes.length && (a.main.innerHTML = "")) : a.dispose();
        this.children.splice(d, 1);
        break
      }
    }
  }
};
f.getChild = function(a) {
  if(!this.children) {
    return null
  }
  for(var b = 0;b < this.children.length;b++) {
    if(this.children[b].id === a) {
      return this.children[b]
    }
  }
  return null
};
f.getChildAt = function(a) {
  return!this.children ? null : this.children[a] || null
};
f.c = function(a) {
  return this.getChild(a)
};
f.findDescendant = function(a, b) {
  for(var c = [this], d, e = b ? [] : null;c.length;) {
    d = c.shift(), d.children && baidu.each(d.children, function(d) {
      if(d.id === a) {
        if(b) {
          e.push(d)
        }else {
          return e = d, !1
        }
      }
      c.push(d)
    })
  }
  return e
};
f.clearChildren = function() {
  if(this.children) {
    for(var a = this.children.length - 1;0 <= a;a--) {
      this.children[a].dispose(), this.children.splice(a, 1)
    }
  }
};
f.instChildrenFromMain = function() {
  this.main && ui.util.buildControlTree(this.main, this)
};
f.instChildrenFromTpl = function() {
  if(this.main && this.view) {
    var a = er.template.getMerged(this.view);
    this.main.innerHTML = a;
    ui.util.buildControlTree(this.main, this)
  }
};
f.appendTo = function(a) {
  var b = document.createElement("div");
  a.appendChild(b);
  this.main = b
};
f.prependTo = function(a) {
  var b = document.createElement("div");
  a.insertBefore(b, a.firstChild);
  this.main = b
};
f.show = function() {
  this.main && baidu.show(this.main)
};
f.hide = function() {
  this.main && baidu.hide(this.main)
};
f.isHidden = function() {
  return"none" === this.main.style.display
};
f.toggle = function() {
  this.isHidden() ? this.show() : this.hide()
};
f.enable = function() {
  this.removeState("disabled")
};
f.enableChildren = function() {
  this._callChildren("enable")
};
f.disable = function() {
  this.setState("disabled")
};
f.disableChildren = function() {
  this._callChildren("disable")
};
f.isDisabled = function() {
  return this.getState("disabled")
};
f.getClass = function(a) {
  if(!this.type) {
    return""
  }
  var b = this.type.toLowerCase(), c = (this.prefix || "ui-") + b.replace(".", "-"), b = "skin-" + b + "-" + this.skin;
  a && (c += "-" + a, b += "-" + a);
  this.skin && (c += " " + b);
  return c
};
f.addSkin = function(a) {
  baidu.addClass(this.main, "skin-" + a)
};
f.removeSkin = function(a) {
  baidu.removeClass(this.main, "skin-" + a)
};
f.getId = function(a) {
  var b = this.domId || "";
  return a ? b + a : b
};
f.getStrRef = function() {
  return"ui.util.get('" + this.domId + "')"
};
f.getStrCall = function(a, b) {
  var c = arguments.length, d = [], e, g;
  if(1 < c) {
    for(e = 1;e < c;e++) {
      g = arguments[e], "string" === typeof g && (g = "'" + g + "'"), d.push(g)
    }
  }
  return this.getStrRef() + "." + a + "(" + d.join(",") + ");"
};
f.initStateChanger = function() {
  var a = this.main;
  this.state = {};
  a && (a.onmouseover = baidu.fn.bind(this.mainOverHandler, this), a.onmouseout = baidu.fn.bind(this.mainOutHandler, this), a.onmousedown = baidu.fn.bind(this.mainDownHandler, this), a.onmouseup = baidu.fn.bind(this.mainUpHandler, this))
};
f.mainOverHandler = function() {
  !this.state.disabled && !this.state.readonly && this.setState("hover")
};
f.mainOutHandler = function() {
  !this.state.disabled && !this.state.readonly && (this.removeState("hover"), this.removeState("press"))
};
f.mainDownHandler = function() {
  this.state.disabled || this.setState("press")
};
f.mainUpHandler = function() {
  this.state.disabled || this.removeState("press")
};
f.setState = function(a) {
  this.state || (this.state = {});
  this.state[a] = 1;
  baidu.addClass(this.main, this.getClass(a))
};
f.removeState = function(a) {
  this.state || (this.state = {});
  this.state[a] = null;
  baidu.removeClass(this.main, this.getClass(a))
};
f.getState = function(a) {
  this.state || (this.state = {});
  return!!this.state[a]
};
f.getPage = function() {
  for(var a = this, b = baidu.getObjectByName("ui.Page");!(a instanceof b);) {
    a = a.parent
  }
  return a
};
f.getRoot = function() {
  return this.main
};
f.__initOption = function(a, b, c) {
  baidu.lang.hasValue(this[a]) || ("string" == typeof c && (this[a] = this.constructor[c]), !baidu.lang.hasValue(this[a]) && baidu.lang.hasValue(b) && (this[a] = b))
};
f.initOptions = function() {
  var a = this.constructor;
  if(a.DEFAULT_OPTIONS) {
    var a = a.DEFAULT_OPTIONS, b;
    for(b in a) {
      a.hasOwnProperty(b) && "undefined" == typeof this[b] && (this[b] = a[b])
    }
  }
};
f.getMain = function() {
  return this.main || null
};
ui.Link = function(a) {
  ui.Control.call(this, a);
  this.type = "link"
};
baidu.inherits(ui.Link, ui.Control);
f = ui.Link.prototype;
f.render = function(a) {
  ui.Link.superClass.render.call(this, a || this.main);
  this.main && this.href && (this.main.href = this.href);
  this.main && this.text && (this.main.innerHTML = this.text);
  this.main.onclick = baidu.fn.bind(this._clickHandler, this)
};
f.appendTo = function(a) {
  var b = document.createElement("span");
  a.appendChild(b);
  this.main = b
};
f.setContent = function(a) {
  this.main && (this.text = a, this.main.innerHTML = a)
};
f.setHref = function(a) {
  this.main && (this.href = a, this.main.href = a)
};
f.onclick = baidu.fn.blank;
f._clickHandler = function(a) {
  a = a || window.event;
  !1 === this.onclick(a) && baidu.event.stop(a)
};
f.dispose = function() {
  this.onclick = this.main.onclick = null;
  ui.Link.superClass.dispose.call(this)
};
base.IParamAdapter = function() {
};
base.IParamAdapter.prototype = {processParam:function() {
  return""
}, processObject:function() {
}};
base.OneToManyParamAdapter = function(a, b, c) {
  this.delimiter = a;
  this.fromParam = b;
  this.toParams = c
};
base.OneToManyParamAdapter.prototype.processParam = function(a) {
  var b = RegExp(this.fromParam + "=(.+)", "g"), c = a.split("&"), d, e, g;
  for(g = c.length - 1;0 <= g;g--) {
    if((d = b.exec(c[g])) && 2 === d.length) {
      e = d[1];
      c.splice(g, 1);
      break
    }
  }
  if(!e) {
    return a
  }
  a = e.split(this.delimiter);
  if(a.length !== this.toParams.length) {
    throw"Value count and param count dont match";
  }
  for(g = 0;g < a.length;g++) {
    c.push(this.toParams[g] + "=" + a[g])
  }
  return c.join("&")
};
base.OneToManyParamAdapter.prototype.processObject = function(a) {
  for(var b = [], c, d = 0;d < this.toParams.length;d++) {
    c = a[this.toParams[d]], "undefined" !== typeof c && (b.push(c), delete a[this.toParams[d]])
  }
  a[this.fromParam] = b.join(this.delimiter)
};
er.hm = {};
er.Pdc = function() {
  this._isValidPage = !1
};
baidu.addSingletonGetter(er.Pdc);
f = er.Pdc.prototype;
f.setPage = function(a) {
  var b = {"/account/agencyLayer/list":2, "/adresource/homePage":4, "/promotion/ad/list":6, "/promotion/product/list":8, "/product/home/list":10};
  b[a] ? (this._isValidPage = !0, a = b[a], "undefined" != typeof PDC && baidu.lang.isFunction(PDC.init) && PDC.init({page_id:a})) : this._isValidPage = !1
};
f.reset = function() {
  "undefined" != typeof PDC && baidu.lang.isFunction(PDC.render_start_again) && PDC.render_start_again()
};
f.mark = function(a) {
  "undefined" != typeof PDC && baidu.lang.isFunction(PDC.mark) && PDC.mark(a)
};
f.tti = function() {
  "undefined" != typeof PDC && baidu.lang.isFunction(PDC.tti) && PDC.tti()
};
f.page_ready = function() {
  "undefined" != typeof PDC && baidu.lang.isFunction(PDC.page_ready) && PDC.page_ready()
};
f.send = function() {
  if(this._isValidPage && "undefined" != typeof PDC && baidu.lang.isFunction(PDC.send) && "undefined" != typeof window.WPO_PDA) {
    var a = window.WPO_PDA.constructor;
    baidu.lang.isFunction(a) && (new a(PDC.metadata())).send()
  }
};
er.hm.push = function(a) {
  "undefined" != typeof _hmt && _hmt.push(a)
};
base.DataSource = function() {
};
baidu.inherits(base.DataSource, base.Object);
base.DataSource.prototype.getData = function() {
  throw"Not implemented";
};
base.ListDataSource = function() {
};
base.ListDataSource.prototype = {getData:function(a, b) {
  this.getDataInternal(a.pageSize, a.pageNo, a.orderBy, a.order, b)
}, getDataInternal:function() {
  throw"Not implemented";
}};
baidu.inherits(base.ListDataSource, base.DataSource);
base.RemoteListDataSource = function(a, b) {
  this.requester = a;
  b && (this.getExtraParam = b)
};
base.RemoteListDataSource.prototype = {getDataInternal:function(a, b, c, d, e) {
  var g = [], h = this.getExtraParam();
  g.push("page.pageSize=" + encodeURIComponent(a));
  g.push("page.pageNo=" + encodeURIComponent(b));
  g.push("page.orderBy=" + encodeURIComponent(c));
  g.push("page.order=" + encodeURIComponent(d));
  h && g.push(h);
  this.requester(g.join("&"), e)
}, getExtraParam:function() {
  return null
}};
baidu.inherits(base.RemoteListDataSource, base.ListDataSource);
er.Action = function() {
};
f = er.Action.prototype;
f.enter = function(a) {
  var b = this;
  b.model || (b.model = {});
  b.model instanceof base.BaseModel && (b.modelChangeHandler = baidu.fn.bind(b.onModelChanged, b), b.model.addPropertyChangedListener(b.modelChangeHandler));
  b.argMap = a;
  if(b.onenter) {
    b.onenter()
  }
  baidu.object.each(a.paramMap, function(a, c) {
    b.model[c] = a
  });
  if(b.onbeforeinitmodel) {
    b.onbeforeinitmodel()
  }
  var c = er.Pdc.getInstance();
  c.reset();
  c.setPage(er.locator.currentPath);
  b.initModel(a, function() {
    if(b.onafterinitmodel) {
      b.onafterinitmodel()
    }
    c.mark("a.i-m");
    b.initView()
  })
};
f.initView = function() {
  var a = baidu.g(this.argMap.domId), b = this.getView(), c = er.Pdc.getInstance();
  this.page = a = ui.util.createPage(b, a, "popup" === this.argMap.type);
  a.init();
  c.mark("p.i");
  this.afterInit(a);
  a.bindModel(this.model);
  c.mark("p.b-m");
  this.beforeRender(a);
  a.render();
  c.mark("p.r");
  c.tti();
  this.enterDocument(a);
  c.mark("a.e-d");
  a.bindEvent();
  c.mark("p.b-e");
  this.initBehavior(a);
  c.mark("a.i-b");
  c.page_ready();
  this.done();
  c.send()
};
f.done = function() {
  var a = document.getElementsByTagName("*"), b;
  if(er.controller.permit) {
    for(var c = 0, d = a.length;c < d;c++) {
      if((b = a[c].getAttribute("auth")) && !er.controller.permit(b)) {
        a[c].style.display = "none"
      }
    }
  }
};
f.getView = function() {
  var a = this.view;
  switch(typeof a) {
    case "object":
      return a[this.argMap.type];
    case "function":
      return a.call(this);
    default:
      return"" + a
  }
};
f.initModel = function(a, b) {
  function c() {
    h++;
    h < i ? d[g[h]].call(d, e, c) : b()
  }
  var d = this, e = a.paramMap, g = d.CONTEXT_INITER_LIST, h = -1, i = g ? g.length : 0;
  c()
};
f.onModelChanged = function() {
};
f.beforeInit = function() {
};
f.afterInit = function() {
};
f.beforeRender = function() {
};
f.enterDocument = function() {
  var a = baidu.getObjectByName("jn.config");
  a && (baidu.ie && a.title) && (document.title = a.title)
};
f.initBehavior = function() {
};
f.saveState = function(a) {
  er.locator.redirect("~" + a, !0)
};
f.back = function() {
  var a = this.argMap, b = a && a.referer;
  a && "popup" !== a.type && (!b || this.USE_BACK_LOCATION ? (b = this.BACK_LOCATION) && er.locator.redirect(b) : window.history.back())
};
f.onbeforeleave = baidu.fn.blank;
f.leave = function() {
  if(this.onbeforeleave) {
    this.onbeforeleave()
  }
  this.model instanceof base.BaseModel && this.model.removePropertyChangedListener(this.modelChangeHandler);
  this.page && this.page.dispose();
  this.page = this.argMap = null
};
er.AbstractFormAction = function() {
};
baidu.inherits(er.AbstractFormAction, er.Action);
f = er.AbstractFormAction.prototype;
f.onBeforeFormSubmit = function() {
};
f.initBehavior = function(a) {
  er.AbstractFormAction.superClass.initBehavior.call(this, a);
  this.form && (a = baidu.fn.bind(this.onFormSubmit, this), this.form.onsubmit = a)
};
f.leave = function() {
  this.form && (this.form.onsubmit = null);
  this.form = null;
  er.AbstractFormAction.superClass.leave.call(this)
};
f.onFormSubmit = function(a) {
  !1 !== this.onBeforeFormSubmit() ? (a = this.getFinalParam(a), this.doSubmit(a)) : this.btnSubmit && this.btnSubmit.enable()
};
f.getFinalParam = function(a) {
  var a = this.processParam(a), b = this.getExtraParam();
  b && (a += "&" + b);
  return a
};
f.doSubmit = function() {
};
f.paramAdapters = null;
f.processParam = function(a) {
  if(baidu.lang.isArray(this.paramAdapters)) {
    for(var b = 0;b < this.paramAdapters.length;b++) {
      a = this.paramAdapters[b].processParam(a)
    }
  }
  return a
};
f.getExtraParam = function() {
  return""
};
er.ListAction = function() {
  this.model = new base.BaseModel({selectedItems:null, searchParams:null, listState:null})
};
baidu.inherits(er.ListAction, er.AbstractFormAction);
f = er.ListAction.prototype;
f.afterInit = function() {
  throw Error("Please implemented this method to initialize 'form', 'list', 'pnlBatch'");
};
f.beforeRender = function() {
  this.list && (this.list.datasource = new base.RemoteListDataSource(this.requesterList, baidu.fn.bind(this.getSearchParam, this)))
};
f.enterDocumentInternal = function() {
};
f.enterDocument = function(a) {
  er.FormAction.superClass.enterDocument.call(this, a);
  this.form = this.formSearch || this.form;
  this.model.triggerPropertyChanged("selectedItems");
  this.enterDocumentInternal()
};
f.initBehaviorInternal = function() {
};
f.initBehavior = function(a) {
  er.ListAction.superClass.initBehavior.call(this, a);
  this.list && (this.list.onstatechange = baidu.fn.bind(this.onListStateChanged, this), this.list.onlistselect = baidu.fn.bind(this.onListSelected, this));
  if(this.form) {
    var b = this.form, a = b.getInputControls(), c = function() {
      b.submit()
    };
    baidu.each(a, function(a) {
      var b = baidu.getObjectByName("ui.TextInput");
      if(b != null && a instanceof b) {
        a.onenter = c
      }
    })
  }
  this.initBehaviorInternal();
  this.list && this.list.getData()
};
f.onModelChanged = function(a, b) {
  if("selectedItems" === a) {
    if(!this.pnlBatch) {
      return
    }
    b && b.length ? this.pnlBatch.enableChildren() : this.pnlBatch.disableChildren()
  }
  if("listState" === a || "searchParams" === a) {
    this.list && this.list.getData(), this.saveSearchAndListState()
  }
};
f.saveSearchAndListState = function() {
  var a = [], b = this.model.get("searchParams"), c = this.model.get("listState");
  b && a.push(b);
  c && baidu.object.each(c, function(b, c) {
    a.push(c + "=" + b)
  });
  this.saveState(a.join("&"))
};
f.getSearchParam = function() {
  var a = this.model.get("searchParams");
  a || (a = this.getFinalParam(this.form ? this.form.getParams() : ""), this.model.searchParams = a);
  return a
};
f.onListStateChanged = function(a) {
  this.model.set("listState", a)
};
f.onListSelected = function(a) {
  this.model.set("selectedItems", a)
};
f.doSubmit = function(a) {
  this.list && this.list.resetPageNo && this.list.resetPageNo();
  this.model.searchParams = a;
  this.model.triggerPropertyChanged("searchParams")
};
f.batchUpdate = function(a, b) {
  if(this.requesterBatch) {
    var c = this, d = [], e = [];
    if(baidu.lang.isObject(a)) {
      var g = !1;
      baidu.object.each(a, function(a, b) {
        e.push(b + "=" + encodeURIComponent(a));
        "ids" === b && (g = !0)
      });
      g || (d = c.getSelectedIds(), e.push("ids=" + d.join(",")));
      this.requesterBatch(e.join("&"), function(a) {
        if(a.success && a.success == "true") {
          c.list.getData();
          c.onBatchSuccess && c.onBatchSuccess(c.requesterBatch, a)
        }else {
          c.onBatchError && c.onBatchError(c.requesterBatch, a)
        }
      })
    }else {
      baidu.lang.hasValue(a) && baidu.lang.hasValue(b) && e.push(a + "=" + b), d = c.getSelectedIds(), e.push("ids=" + d.join(",")), this.requesterBatch(e.join("&"), function() {
        c.list.getData()
      })
    }
  }
};
f.getSelectedIds = function() {
  var a = this.model.get("selectedItems"), b = [];
  a && baidu.each(a, function(a) {
    b.push(a.id)
  });
  return b
};
f.leaveInternal = function() {
};
f.leave = function() {
  this.list && (this.list.onstatechange = null, this.list.onlistselect = null);
  this.list = this.pnlBatch = null;
  er.ListAction.superClass.leave.call(this)
};
er.FormAction = function() {
  this.requester = this.btnCancel = this.btnSubmit = this.form = null
};
baidu.inherits(er.FormAction, er.AbstractFormAction);
f = er.FormAction.prototype;
f.initBehaviorInternal = function() {
};
f.initBehavior = function(a) {
  er.FormAction.superClass.initBehavior.call(this, a);
  this.btnCancel && (this.btnCancel.onclick = baidu.fn.bind(this.onCancelClick, this));
  this.initBehaviorInternal()
};
f.enterDocumentInternal = function() {
};
f.enterDocument = function(a) {
  er.FormAction.superClass.enterDocument.call(this, a);
  this.enterDocumentInternal()
};
f.onCancelClick = function() {
  this.back()
};
f.onValidateForm = function() {
};
f.onFormSubmit = function(a) {
  !1 !== this.onValidateForm() && (this.btnSubmit && this.btnSubmit.disable(), er.FormAction.superClass.onFormSubmit.call(this, a))
};
f.doSubmit = function(a) {
  this.requester && this.requester(a, baidu.fn.bind(this.onSubmitFinish, this), baidu.fn.bind(this.onSubmitFail, this))
};
f.onSubmitFinish = function(a) {
  var b = this.form.getInputControls(), c, d, e, g;
  this.btnSubmit && this.btnSubmit.enable();
  if("true" !== a.success) {
    if(d = a.message.field) {
      if(baidu.lang.isArray(this.paramAdapters)) {
        for(c = this.paramAdapters.length - 1;0 <= c;c--) {
          this.paramAdapters[c].processObject(d)
        }
      }
      for(c = 0;c < b.length;c++) {
        e = b[c], e.isDisabled() || (g = d[e.formName]) && e.showError(g)
      }
      this.onSubmitFail(a)
    }
  }else {
    !1 !== this.onSubmitSucceed(a) && this.back()
  }
};
f.onSubmitFail = function() {
  this.btnSubmit && this.btnSubmit.enable()
};
f.onSubmitSucceed = function() {
};
f.isModify = function() {
  return/update$/.test(this.argMap.path)
};
f.leaveInternal = function() {
};
f.leave = function() {
  this.btnCancel && (this.btnCancel.onclick = null);
  this.btnCancel = this.btnSubmit = null;
  er.FormAction.superClass.leave.call(this)
};
er.config = {CONTROL_IFRAME_ID:"ERHistroyRecorder", CONTROL_INPUT_ID:"ERHistoryRecordInput", DEFAULT_INDEX:"/", MAIN_ELEMENT_ID:"Main", CONTROL_IFRAME_URL:RES("assets/text/history-28ef15f1a4107c7b0e20278f689ae7c5.html")};
var jn = {flags:{}};
er.Locator = function() {
  this.referer = this.currentQuery = this.currentPath = "";
  this._timer = 0
};
f = er.Locator.prototype;
f.onredirect = function() {
};
f.getLocation = function() {
  var a;
  0 < er.base.firefox ? (a = document.location.href.match(/#(.*)$/)) && (a = a[1]) : a = document.location.hash;
  return a ? a.replace(/^#/, "") : ""
};
f.redirect = function(a, b) {
  /^~/.test(a) && (a = (this.currentPath || "/") + a);
  document.location.hash = a ? a : "/";
  var a = document.location.hash.replace(/^#/, ""), c = this.parseLocation(a), d = c.path, c = c.query;
  if(!(d === this.currentPath && c === this.currentQuery)) {
    var e = this.currentPath;
    e || (e = location.pathname);
    this.currentQuery && (e += "?" + this.currentQuery);
    this.currentPath = d;
    this.currentQuery = c;
    this.onredirect();
    er.base.ie && (er.base.g(er.config.CONTROL_IFRAME_ID).src = er.config.CONTROL_IFRAME_URL + "?" + a);
    b || (er.hm.push(["_setReferrerOverride", e]), er.controller.forward(this.currentPath, this.parseQuery(this.currentQuery), this.referer), er.hm.push(["_trackPageview", this.currentPath + (this.currentQuery ? "?" + this.currentQuery : "")]));
    this.referer = a
  }
};
f.parseLocation = function(a) {
  var a = a.match(/^([^~]+)(~(.*))?$/), b = {};
  a ? (b.path = a[1], b.query = 4 === a.length ? a[3] : "") : (b.path = "", b.query = "");
  return b
};
f.getParameterMap = function() {
  return this.parseQuery(this.currentQuery)
};
f.parseQuery = function(a) {
  for(var b = {}, a = (a || "").split("&"), c = a.length, d, e;c--;) {
    d = a[c].split("="), e = d[0], d = d[1], e && (er.base.firefox || (d = decodeURIComponent(d)), b[e] = d)
  }
  return b
};
f.getPath = function() {
  return this.currentPath
};
f.getQuery = function() {
  return this.currentQuery
};
f.init = function() {
  function a() {
    var a = b.getLocation();
    c !== a && (c = a, b.redirect(a))
  }
  if(!this._timer) {
    var b = this, c;
    if(er.base.ie) {
      var d = document.createElement("iframe"), e = d.style;
      d.id = er.config.CONTROL_IFRAME_ID;
      d.width = 200;
      d.height = 200;
      e.position = "absolute";
      e.top = "-1000px";
      e.left = "-1000px";
      document.body.insertBefore(d, document.body.firstChild);
      d = null
    }
    this._timer = setInterval(a, 100)
  }
};
er.locator = new er.Locator;
er.Controller = function() {
  this.container = {};
  this.actionConfigMap = {};
  this.modules = [];
  this.permit = this.currentAction = null;
  this._noAuthLocation = "/";
  this._noAuthAction = null;
  this._noPageLocation = "/";
  this._noPageAction = null;
  this._pathMap = {}
};
f = er.Controller.prototype;
f.setNoAuthLocation = function(a) {
  this._noAuthLocation = a
};
f.setNoAuthAction = function(a) {
  this._noAuthAction = a
};
f.setNoPageLocation = function(a) {
  this._noPageLocation = a
};
f.setNoPageAction = function(a) {
  this._noPageAction = a
};
f.addPathMap = function(a, b) {
  this._pathMap[a] = b
};
f.forward = function(a, b, c) {
  this._pathMap[a] ? er.locator.redirect(this._pathMap[a]) : (b = {type:"main", referer:c, paramMap:b, path:a, domId:er.config.MAIN_ELEMENT_ID}, this.reset(), this.currentAction = this.enterAction(this.container[a], b))
};
f.enterAction = function(a, b) {
  if(!a) {
    if(this._noPageAction) {
      var c = this._noPageAction;
      er.base.isFunction(c) && (c = new c);
      c.enter(b);
      return c
    }
    er.locator.redirect(this._noPageLocation);
    return null
  }
  var c = this.findAction(a), d = null, d = a.authority;
  er.base.isFunction(c) && (c = new c);
  if(this.permit && d && !this.permit(d)) {
    if(this._noAuthAction) {
      return c = this._noAuthAction, er.base.isFunction(c) && (c = new c), c.enter(b), c
    }
    er.locator.redirect(a.noAuthLocation || this._noAuthLocation);
    return null
  }
  return(d = c.enter(b)) ? d : c
};
f.reset = function() {
  this.currentAction && this.currentAction.leave();
  er.base.g(er.config.MAIN_ELEMENT_ID).innerHTML = ""
};
f.addModule = function(a) {
  this.modules.push(a)
};
f.init = function() {
  for(var a = 0, b = this.modules.length, c, d, e, g, h, i, j, k;a < b;a++) {
    if(c = this.modules[a], c.init && c.init(), g = c.config.action, h = c.config.authority, i = c.config.noAuthLocation, g) {
      c = 0;
      for(d = g.length;c < d;c++) {
        j = g[c], e = j.location, k = j.action, h && !er.base.hasValue(j.authority) && (j.authority = h), i && !er.base.hasValue(j.noAuthLocation) && (j.noAuthLocation = i), this.container[e] = j, this.actionConfigMap[k] = j
      }
    }
  }
  er.locator.init()
};
f.findAction = function(a) {
  return er.base.getObjectByName(a.action)
};
f.loadAction = function(a, b, c) {
  b = this.actionConfigMap[b];
  a = {type:"popup", domId:a};
  c && er.base.extend(a, c);
  return this.enterAction(b, a)
};
er.controller = new er.Controller;
var error = {};
er.controller.addModule(error);
error.config = {action:[{location:"/access/deny", action:"jn.error.AccessDeny"}, {location:"/page/notFound", action:"jn.error.PageNotFound"}]};
jn.error = {};
jn.error.PageNotFound = function() {
  er.FormAction.call(this)
};
jn.error.PageNotFound.prototype = {view:"page404", initModel:function(a, b) {
  b()
}, afterInit:function() {
}, initBehaviorInternal:function() {
}};
baidu.inherits(jn.error.PageNotFound, er.FormAction);
jn.error.AccessDeny = function() {
  er.FormAction.call(this)
};
jn.error.AccessDeny.prototype = {view:"page401", initModel:function(a, b) {
  b()
}, afterInit:function() {
}, initBehaviorInternal:function() {
}};
baidu.inherits(jn.error.AccessDeny, er.FormAction);
base.IConverter = function() {
};
base.IConverter.prototype.convert = function() {
};
base.IConverter.prototype.convertBack = function() {
};
base.DateRangeConverter = function() {
};
base.DateRangeConverter.prototype = {convert:function(a) {
  var b = a.end;
  return baidu.date.format(a.begin, "yyyyMMdd") + "000000," + baidu.date.format(b, "yyyyMMdd") + "235959"
}, convertBack:function(a) {
  if(a) {
    return a = a.split(","), {begin:baidu.date.parseToDate(a[0]), end:baidu.date.parseToDate(a[1])}
  }
}};
base.dateRangeConverter = new base.DateRangeConverter;
base.UrlPrefixConverter = function(a, b) {
  this._defaultPrefix = a;
  this._prefixPattern = b || /^(https?|ftps?):\/\//
};
base.UrlPrefixConverter.prototype.convert = function(a) {
  this._prefixPattern.test(a) || (a = this._defaultPrefix + a);
  return encodeURIComponent(a)
};
base.UrlPrefixConverter.prototype.convertBack = function(a) {
  return a
};
ui.InputControl = function(a) {
  ui.Control.call(this, a)
};
baidu.inherits(ui.InputControl, ui.Control);
f = ui.InputControl.prototype;
f.bindModel = function(a) {
  ui.InputControl.superClass.bindModel.call(this, a)
};
f.render = function(a) {
  ui.InputControl.superClass.render.call(this, a);
  this.formName = this.main.getAttribute("name");
  "undefined" !== typeof this.paramValue && this.setParamValue(this.paramValue)
};
f.getValue = function() {
  return this.value
};
f.setValue = function(a) {
  this.value = a
};
f.setConverter = function(a) {
  this.converter = a
};
f.getParamValue = function() {
  var a = this.getValue();
  return this.converter ? a = this.converter.convert(a) : encodeURIComponent(a)
};
f.setParamValue = function(a) {
  this.converter && (a = this.converter.convertBack(a));
  this.setValue(a)
};
f.setRule = function(a, b) {
  var c = [a].concat(b || []);
  this.rule || (this.rule = []);
  baidu.lang.isString(this.rule) && (this.rule = [this.rule]);
  for(var d = 0;d < this.rule.length;d++) {
    if(a == (baidu.lang.isString(this.rule[d]) ? this.rule[d].split(",")[0] : this.rule[d][0])) {
      this.rule[d] = c;
      return
    }
  }
  this.rule.push(c)
};
f.validate = function() {
  return!this.rule ? !0 : ui.util.validate(this, this.rule)
};
f.showError = function(a) {
  this.errorMessage = a;
  ui.util.validate(this, "backendError,this");
  this.errorMessage = null
};
f.hideError = function() {
  ui.util.validate.hideError(this.main)
};
f.setReadOnly = function(a) {
  (this.readOnly = a = !!a) ? this.setState("readonly") : this.removeState("readonly")
};
f.isReadOnly = function() {
  return this.getState("readonly")
};
ui.Layer = function(a) {
  ui.Control.call(this, a);
  this.type = this.retype || "layer";
  this.left = this.top = 0;
  this.autoHide = this.autoHide || ""
};
ui.Layer.prototype = {render:function(a) {
  if(this.main || !a) {
    this.main && ui.Layer.superClass.render.call(this, a)
  }else {
    switch(ui.Layer.superClass.render.call(this, a), a.style.position = "absolute", a.style.left = this._HIDE_POS, a.style.top = this._HIDE_POS, a.style.zIndex = this.zIndex || "90000", this.width && (a.style.width = this.width + "px"), this.height && (a.style.height = this.height + "px"), this.autoHide.toLowerCase()) {
      case "click":
        this._clickHandler = this._getClickHider();
        baidu.on(document, "click", this._clickHandler);
        break;
      case "out":
        a.onmouseout = this._getOutHandler(), a.onmouseover = this._getOverHandler()
    }
  }
}, _getOverHandler:function() {
  var a = this;
  return function() {
    a.show()
  }
}, _getOutHandler:function() {
  var a = this;
  return function() {
    a.onhide();
    a.hide()
  }
}, appendTo:function(a) {
  var a = a || document.body, b = document.createElement("div");
  this.render(b);
  a.appendChild(b)
}, onhide:new Function, _getClickHider:function() {
  var a = this;
  return function(b) {
    if(a._isHidePrevent) {
      a._isHidePrevent = 0
    }else {
      for(b = baidu.event.getTarget(b);b && b != document.body;) {
        if(b == a.main) {
          return
        }
        b = b.parentNode
      }
      a.onhide();
      a.hide()
    }
  }
}, _preventHide:function() {
  this._isHidePrevent = 1
}, _HIDE_POS:"-10000px", setWidth:function(a) {
  this.main.style.width = a + "px";
  this.width = a
}, getWidth:function() {
  return this.width || this.main.offsetWidth
}, setHeight:function(a) {
  this.main.style.height = a + "px";
  this.height = a
}, getHeight:function() {
  return this.height || this.main.offsetHeight
}, show:function(a, b) {
  this._isShow = 1;
  this.left = a || this.left;
  this.top = b || this.top;
  this.main.style.left = this.left + "px";
  this.main.style.top = this.top + "px"
}, hide:function() {
  this._isShow = 0;
  this.main.style.left = this._HIDE_POS;
  this.main.style.top = this._HIDE_POS
}, isShow:function() {
  return!!this._isShow
}, dispose:function() {
  var a = this.main;
  this._clickHandler && (baidu.un(document, "click", this._clickHandler), this._clickHandler = null);
  this.onhide = null;
  a.onmouseover = null;
  a.onmouseout = null;
  a.parentNode.removeChild(a);
  ui.Layer.superClass.dispose.call(this);
  a.innerHTML = "";
  a.parentNode && a.parentNode.removeChild(a)
}};
baidu.inherits(ui.Layer, ui.Control);
ui.config = {now:new Date};
ui.MonthView = function(a) {
  ui.Control.call(this, a);
  this.type = "month";
  this.now = this.now || new Date;
  a = this.value || ui.config.now || this.now;
  this.year = parseInt(this.year, 10) || a.getFullYear();
  this.month = parseInt(this.month, 10) || a.getMonth()
};
ui.MonthView.prototype = {_tplItem:'<td year="{1}" month="{2}" date="{0}" class="{4}" style="{5}" id="{3}" onmouseover="{6}" onmouseout="{7}" onclick="{8}">{0}</td>', _tplHead:'<table border="0" cellpadding="0" cellspacing="0" class="{0}"><thead><tr>', TITLE_WORDS:"\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u65e5".split(""), setView:function(a) {
  this.month = a.getMonth();
  this.year = a.getFullYear();
  this.render()
}, render:function(a) {
  ui.MonthView.superClass.render.call(this, a);
  if(a = this.main) {
    a.innerHTML = this._getHtml(), this.select(this.value)
  }
}, appendTo:function(a) {
  if(!this.main) {
    var b = document.createElement("div");
    a.appendChild(b);
    this.render(b)
  }
}, _getHtml:function() {
  var a = [baidu.format(this._tplHead, this.getClass("main"))], b = 0, c = this.year, d = this.month, e = new Date(c, d, 1), g = new Date(c, d + 1, 1), h = 1 - (e.getDay() + 6) % 7, i = this.TITLE_WORDS, j = i.length, k, n = this.getClass("over"), o = this.getClass("item-virtual"), l = this.getClass("item"), m = "baidu.addClass(this, '" + n + "')", n = "baidu.removeClass(this, '" + n + "')";
  for(k = 0;k < j;k++) {
    a.push('<td class="' + this.getClass("title") + '">' + i[k] + "</td>")
  }
  a.push("</tr></thead><tbody><tr>");
  for(e.setDate(h);0 < g - e || 0 !== b % 7;) {
    0 < h && 0 === b % 7 && a.push("</tr><tr>"), i = e.getMonth() != d, j = l, k = this._getCustomDateValue("customClass", e), i && (j += " " + o), k && (j += " " + k), a.push(baidu.format(this._tplItem, e.getDate(), e.getFullYear(), e.getMonth(), this._getItemId(e), j, this._getCustomDateValue("customStyle", e), i ? "" : m, i ? "" : n, i ? "" : this.getStrRef() + "._selectByItem(this)")), e = new Date(c, d, ++h), b++
  }
  a.push("</tr></tbody></table>");
  return a.join("")
}, _getCustomDateValue:function(a, b) {
  var c = this[a];
  switch(typeof c) {
    case "string":
      return c;
    case "function":
      return c.call(this, b) || ""
  }
  return""
}, _selectByItem:function(a) {
  var b = a.getAttribute("date"), c = a.getAttribute("month"), a = a.getAttribute("year");
  this._change(new Date(a, c, b))
}, onchange:new Function, _change:function(a) {
  a && !1 !== this.onchange(a) && this.select(a)
}, select:function(a) {
  a instanceof Date && (this._resetSelected(), this.value = a, this._paintSelected())
}, _resetSelected:function() {
  if(this.value) {
    var a = baidu.g(this._getItemId(this.value));
    a && baidu.removeClass(a, this.getClass("selected"));
    this.value = null
  }
}, _paintSelected:function() {
  if(this.value) {
    var a = baidu.g(this._getItemId(this.value));
    a && baidu.addClass(a, this.getClass("selected"))
  }
}, _getItemId:function(a) {
  return this.getId(a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate())
}, getValue:function() {
  return this.value || null
}};
baidu.inherits(ui.MonthView, ui.Control);
ui.Button = function(a) {
  ui.Control.call(this, a);
  this.type = "button";
  this.autoState = !0
};
baidu.inherits(ui.Button, ui.Control);
f = ui.Button.prototype;
f.tplButton = '<div class="ui-button-bg-left"></div><div id="{2}" class="{1}"><nobr>{0}</nobr></div><div class="ui-button-bg-right"></div>';
f.getMainHtml = function() {
  return baidu.format(this.tplButton, this.content || "", this.getClass("label"), this.getId("label"))
};
f.enable = function() {
  ui.Button.superClass.enable.call(this);
  this.removeState("hover")
};
f.active = function(a) {
  a ? this.setState("active") : this.removeState("active")
};
f.render = function(a) {
  ui.Button.superClass.render.call(this, a);
  a = this.main;
  if("DIV" == a.tagName) {
    var b = a.firstChild;
    !this.content && (b && "DIV" != b.tagName) && (this.content = a.innerHTML);
    a.innerHTML = this.getMainHtml();
    60 > a.offsetWidth && 0 < a.offsetWidth && baidu.dom.addClass(this.getId("label"), this.getClass("label-minwidth"));
    a.onclick = baidu.fn.bind(this.clickHandler, this)
  }
};
f.clickHandler = function() {
  if(!this.isDisabled() && baidu.lang.isFunction(this.onclick)) {
    this.onclick()
  }
};
f.setLabel = function(a) {
  baidu.G(this.getId("label")).innerHTML = a
};
f.getLabel = function() {
  return baidu.G(this.getId("label")).innerHTML
};
f.dispose = function() {
  this.onclick = this.main.onclick = null;
  ui.Button.superClass.dispose.call(this)
};
ui.MiniMultiCalendar = function(a) {
  ui.InputControl.call(this, a);
  this.type = "mmcal";
  this.now = this.now || ui.config.now || new Date;
  this.options = this.options || ui.MiniMultiCalendar.ITEMS;
  this.value = this.value || {begin:this.now, end:this.now};
  this._index = -1
};
ui.MiniMultiCalendar.startDate = null;
ui.MiniMultiCalendar.setStartDate = function(a) {
  ui.MiniMultiCalendar.startDate = a
};
ui.MiniMultiCalendar.prototype = {_tplItem:'<span index="{0}" class="{1}" id="{2}"{4}>{3}</span>', _isSameDate:function(a, b) {
  return"" != b && "" != a && a.getFullYear() == b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate() ? !0 : !1
}, getValue:function() {
  return this.value
}, setValue:function(a) {
  if(!this._isSameDate(this.value.begin, a.begin) || !this._isSameDate(this.value.end, a.end)) {
    this._index = this.getSelectedIndex(a)
  }
  this.value = a;
  this.render()
}, bindModel:function(a) {
  ui.MiniMultiCalendar.superClass.bindModel.call(this, a);
  this._index = this.getSelectedIndex(this.value)
}, render:function(a) {
  ui.MiniMultiCalendar.superClass.render.call(this, a);
  this.main.innerHTML = this._getHtml()
}, _getHtml:function() {
  var a = this.options, b = a.length, c = this.getId("option"), d, e, g, h, i, j = [];
  this._currentName = "";
  for(d = 0;d < b;d++) {
    g = a[d], e = g.name, h = this.getClass("option"), i = ' onclick="' + this.getStrCall("_selectIndex", d) + '"', d == this._index && (h = h + " " + this.getClass("option-selected"), i = "", this._currentName = e), j.push(baidu.format(this._tplItem, d, h, c + d, g.name, i))
  }
  return j.join("&nbsp;|&nbsp;")
}, onchange:new Function, getSelectedIndex:function(a) {
  var b = this.options, c = b.length, d, e;
  for(d = 0;d < c;d++) {
    if(e = b[d], e = e.getValue.call(this), this._isSameDate(a.begin, e.begin) && this._isSameDate(a.end, e.end)) {
      return d
    }
  }
  return-1
}, _selectIndex:function(a) {
  var b = this.options, c;
  0 > a || a >= b.length || (c = b[a].getValue.call(this), !1 !== this.onchange(c, b[a].name, a) && (this.value = c, this._index = a, this.render()))
}, select:function(a) {
  this.setValue(a)
}, getName:function() {
  return this._currentName
}};
ui.MiniMultiCalendar.ITEMS = [{name:"\u6628\u5929", value:0, getValue:function() {
  var a = new Date(this.now.getTime());
  a.setDate(a.getDate() - 1);
  return{begin:a, end:a}
}}, {name:"\u6700\u8fd17\u5929", value:1, getValue:function() {
  var a = new Date(this.now.getTime()), b = new Date(this.now.getTime());
  b.setDate(b.getDate() - 1);
  a.setDate(a.getDate() - 7);
  return{begin:a, end:b}
}}, {name:"\u4e0a\u5468", value:2, getValue:function() {
  var a = new Date(this.now.getTime()), b = new Date(this.now.getTime());
  1 > a.getDay() ? a.setDate(a.getDate() - 14 + 1 - a.getDay()) : a.setDate(a.getDate() - 7 - a.getDay() + 1);
  a.setHours(0, 0, 0, 0);
  b.setFullYear(a.getFullYear(), a.getMonth(), a.getDate() + 6);
  b.setHours(0, 0, 0, 0);
  return{begin:a, end:b}
}}, {name:"\u672c\u6708", value:3, getValue:function() {
  var a = new Date(this.now.getTime()), b = new Date(this.now.getTime());
  a.setDate(1);
  return{begin:a, end:b}
}}, {name:"\u4e0a\u4e2a\u6708", value:4, getValue:function() {
  var a = this.now, b = new Date(a.getFullYear(), a.getMonth() - 1, 1), a = new Date(a.getFullYear(), a.getMonth(), 1);
  a.setDate(a.getDate() - 1);
  return{begin:b, end:a}
}}, {name:"\u4e0a\u4e2a\u5b63\u5ea6", value:5, getValue:function() {
  var a = this.now, b = new Date(a.getFullYear(), a.getMonth() - a.getMonth() % 3 - 3, 1), a = new Date(a.getFullYear(), a.getMonth() - a.getMonth() % 3, 1);
  a.setDate(a.getDate() - 1);
  return{begin:b, end:a}
}}, {name:"\u6240\u6709\u65f6\u95f4", value:6, getValue:function() {
  var a = new Date;
  return{begin:ui.MiniMultiCalendar.startDate || new Date(a.getFullYear() - 1, a.getMonth(), a.getDate()), end:a}
}}];
baidu.inherits(ui.MiniMultiCalendar, ui.InputControl);
ui.Select = function(a) {
  ui.InputControl.call(this, a);
  this.type = "select";
  this.__initOption("maxItem", null, "MAX_ITEM");
  this.__initOption("emptyText", null, "EMPTY_TEXT");
  this.emptyLabel = baidu.format(this._tplLabel, this.getClass("text-def"), this.emptyText);
  this.toggleOnHover = this.toggleOnHover || !1;
  this.datasource = this.datasource || [];
  this.index = -1
};
ui.Select.EMPTY_TEXT = "\u8bf7\u9009\u62e9";
ui.Select.MAX_ITEM = 8;
ui.Select.prototype = {_tplMain:'<div id="{0}" class="{1}" value="" style="width:{3}px"><nobr>{2}</nobr></div><div class="{4}" arrow="1"></div>', _tplLabel:'<span class="{0}">{1}</span>', _getMainHtml:function() {
  return baidu.format(this._tplMain, this.getId("text"), this.getClass("text"), this.staticText || this.emptyLabel, this.width - 20, this.getClass("arrow"))
}, appendTo1:function(a) {
  if(!this.main) {
    var b = document.createElement("div");
    a.appendChild(b);
    this.render(b)
  }
}, render:function(a) {
  var a = a || this.main, b = this.value;
  this._isRender || (ui.Select.superClass.render.call(this, a), this.formName = a.getAttribute("name"), a.innerHTML = this._getMainHtml(), this.toggleOnHover && (a.onmouseover = this._getMouseOverHandler(), a.onmouseout = this._getMouseOutHandler()), a.onclick = this._getMainClickHandler(), this._isRender = 1);
  a && (this.width && (a.style.width = this.width + "px"), this._renderLayer(), this.setValue(b), this.setReadOnly(!!this.readOnly), this.disableInternal(!!this.disabled))
}, _renderLayer:function() {
  var a = this.getLayer(), b, c, d = this.datasource.length, e = this.maxItem;
  a || (a = new ui.Layer({id:"layer", autoHide:"click", retype:"select-layer"}), a.appendTo(), this.addChild(a), a.onhide = this._getLayerHideHandler());
  b = a.getMain();
  b.style.width = "auto";
  b.style.height = "auto";
  b.innerHTML = this._getLayerHtml();
  c = b.offsetWidth;
  d > e && (d = b.firstChild.offsetHeight, b.style.height = e * (d + 1) + "px", c += 17);
  c < this.width ? a.setWidth(this.width) : a.setWidth(c);
  this.toggleOnHover && (b.onmouseover = this._getMouseOverHandler(), b.onmouseout = this._getMouseOutHandler())
}, _getLayerHideHandler:function() {
  var a = this;
  return function() {
    a.removeState("active")
  }
}, _tplItem:'<div id="{0}" {10} class="{1}" index="{2}" value="{3}" dis="{4}" onmouseover="{6}" onmouseout="{7}" onclick="{8}">{9}<nobr>{5}</nobr></div>', _tplIcon:'<span class="{0}"></span>', _getLayerHtml:function() {
  for(var a = this.datasource, b = 0, c = a.length, d = [], e = this.getStrRef(), g = this.getClass("item"), h, i, j, k, n;b < c;b++) {
    h = g, i = 0, j = a[b], n = k = "", j.icon && (k = this.getClass("icon-" + j.icon), k = baidu.format(this._tplIcon, k)), j.style && (h += " " + g + "-" + j.style), j.disabled && (i = 1, h += " " + g + "-disabled"), j.value == this.value && (h += " " + this.getClass("item-selected")), this.titleTip && (n = 'title="' + j.name + k + '"'), d.push(baidu.format(this._tplItem, this.getId("item") + b, h, b, j.value, i, j.name, e + "._itemOverHandler(this)", e + "._itemOutHandler(this)", e + "._itemClickHandler(this)", 
    k, n))
  }
  return d.join("")
}, setReadOnly:function(a) {
  (this.readOnly = a = !!a) ? this.setState("readonly") : this.removeState("readonly")
}, _getMainClickHandler:function() {
  var a = this;
  return function(b) {
    b = b || window.event;
    b = b.srcElement || b.target;
    if(!a.readOnly && !a.getState("disabled") && (b.getAttribute("arrow") || !1 !== a.onmainclick())) {
      a.getLayer()._preventHide(), a.toggleLayer()
    }
  }
}, _getMouseOverHandler:function() {
  var a = this;
  return function(b) {
    b = b || window.event;
    b = b.srcElement || b.target;
    a.tick && clearTimeout(a.tick);
    if(!baidu.dom.contains(a.getLayer().getMain(), b) && (!a.readOnly && !a.getState("disabled")) && (b.getAttribute("arrow") || !1 !== a.onmainmouseover())) {
      a.getLayer()._preventHide(), a.showLayer()
    }
  }
}, _getMouseOutHandler:function() {
  var a = this;
  return function(b) {
    var b = b || window.event, c = b.srcElement || b.target, b = b.relatedTarget || b.toElement;
    !baidu.dom.contains(c, b) && (!baidu.dom.contains(a.getLayer().getMain(), b) && !a.readOnly && !a.getState("disabled")) && (a.tick = setTimeout(function() {
      if(c.getAttribute("arrow") || !1 !== a.onmainmouseout()) {
        a.getLayer()._preventHide(), a.hideLayer()
      }
    }, 200))
  }
}, onmainclick:new Function, onmainmouseover:new Function, onmainmouseout:new Function, showLayer:function() {
  var a = this.main, b = baidu.dom.getPosition(a), c = this.getLayer(), d = c.getMain().offsetHeight, a = a.offsetHeight, e = baidu.page.getViewHeight(), g = b.top + a + d - baidu.page.getScrollTop();
  c.show(b.left, e > g ? b.top + a - 1 : b.top - d + 1);
  this.setState("active")
}, hideLayer:function() {
  this.getLayer().hide();
  this.removeState("active")
}, toggleLayer:function() {
  this.getLayer().isShow() ? this.hideLayer() : this.showLayer()
}, getLayer:function() {
  return this.getChild("layer")
}, _getCur:function() {
  return baidu.g(this.getId("text"))
}, getValue:function(a) {
  var b, c = this.datasource;
  "number" == typeof a ? a < c.length && (b = c[a].value) : b = this.value;
  return baidu.lang.hasValue(b) ? b : null
}, setDataSource:function(a) {
  this.datasource = a || this.datasource
}, setValue:function(a) {
  var b = this.getLayer().getMain().getElementsByTagName("div"), c, d, e;
  d = 0;
  for(c = b.length;d < c;d++) {
    if(e = b[d].getAttribute("value"), e == a) {
      this.selectByIndex(d);
      return
    }
  }
  this.value = null;
  this.index = -1;
  this.selectByIndex(-1)
}, selectByIndex:function(a, b) {
  var c = this.datasource[a], d;
  d = c ? c.value : null;
  this.index = a;
  this.value = d;
  !0 === b && !1 === this.onchange(d, c) || this._repaint()
}, onchange:new Function, _repaint:function() {
  var a = this.datasource[this.index], a = this.staticText || (a ? a.name : this.emptyLabel), b = this._getCur(), a = (a + "").replace(/^(&nbsp;)+/ig, "");
  b.title = a.replace(/<[^>]+>/ig, "");
  b.innerHTML = "<nobr>" + a + "</nobr>";
  this._repaintLayer()
}, _repaintLayer:function() {
  for(var a = this.index, b = this.getLayer().getMain().firstChild, c = this.getClass("item-selected");b;) {
    b.getAttribute("index") == a ? baidu.addClass(b, c) : baidu.removeClass(b, c), b = b.nextSibling
  }
}, _itemClickHandler:function(a) {
  var b = a.getAttribute("index");
  1 != a.getAttribute("dis") && (this.hideLayer(), this.selectByIndex(parseInt(b, 10), !0))
}, _itemOverHandler:function(a) {
  1 != a.getAttribute("dis") && (a = a.getAttribute("index"), baidu.addClass(this.getId("item") + a, this.getClass("item-hover")))
}, _itemOutHandler:function(a) {
  a = a.getAttribute("index");
  baidu.removeClass(this.getId("item") + a, this.getClass("item-hover"))
}, disableInternal:function(a) {
  this.disabled = a;
  this.hideLayer();
  a ? this.setState("disabled") : this.removeState("disabled")
}, disable:function() {
  this.disableInternal(!0)
}, enable:function() {
  this.disableInternal(!1)
}, dispose:function() {
  var a = this.getLayer().getMain();
  this.onchange = null;
  this.main.onclick = null;
  this.main.onmouseover = null;
  this.main.onmouseout = null;
  a.onmouseover = null;
  a.onmouseout = null;
  ui.Select.superClass.dispose.call(this)
}};
baidu.inherits(ui.Select, ui.InputControl);
ui.MultiCalendar = function(a) {
  ui.InputControl.call(this, a);
  this.type = "mcal";
  this.autoState = !0;
  a = this.now = this.now || ui.config.now || new Date;
  this.value = this.value || {begin:a, end:a};
  this.__initOption("range", null, "RANGE");
  this.view = {begin:new Date(this.value.begin), end:new Date(this.value.end)};
  this.__initOption("dateFormat", null, "DATE_FORMAT");
  this.__initOption("okText", null, "OK_TEXT");
  this.__initOption("cancelText", null, "CANCEL_TEXT");
  this.__initOption("beginSideTitle", null, "BEGIN_SIDE_TITLE");
  this.__initOption("endSideTitle", null, "END_SIDE_TITLE")
};
ui.MultiCalendar.OK_TEXT = "\u786e\u5b9a";
ui.MultiCalendar.CANCEL_TEXT = "\u53d6\u6d88";
ui.MultiCalendar.BEGIN_SIDE_TITLE = "\u5f00\u59cb\u65e5\u671f";
ui.MultiCalendar.END_SIDE_TITLE = "\u7ed3\u675f\u65e5\u671f";
ui.MultiCalendar.DATE_FORMAT = "yyyy-MM-dd";
ui.MultiCalendar.RANGE = {begin:new Date(2001, 8, 3), end:new Date(2046, 10, 4)};
ui.MultiCalendar.prototype = {_tplMain:'<span id="{0}" class="{1}">{2}</span><div class="{3}" arrow="1"></div>', _tplLayer:'<div ui="id:{0};type:MiniMultiCalendar"></div><div class="{1}">{5}{6}</div><div class="{2}"><div ui="type:Button;id:{3};skin:em">{7}</div><div ui="type:Button;id:{4}">{8}</div></div><div ui="type:Button;id:{9};skin:layerclose"></div>', _tplSide:'<div class="{0}"><div class="{1}"><b>{9}</b><span id="{2}"></span></div><div class="{4}"><table><tr><td width="40" align="left"><div ui="type:Button;id:{5};skin:back"></div></td><td><div ui="type:Select;id:{7};width:55;datasource:@datasource;value:@value;"></div></td><td><div ui="type:Select;id:{8};width:40;datasource:@datasource;value:@value;"></div></td><td width="40" align="right"><div ui="type:Button;id:{6};skin:forward"></div></td></tr></table></div><div ui="id:{3};type:MonthView;value:@value;customClass:@customClass;"></div></div>', 
render:function(a) {
  a && "DIV" != a.tagName || (ui.MultiCalendar.superClass.render.call(this, a), this._isRender || (this._renderLayer(), this.main.innerHTML = this._getMainHtml(), this.main.onclick = this._getMainClickHandler(), this._isRender = 1), this.setValue(this.value))
}, _getMainClickHandler:function() {
  var a = this;
  return function() {
    a.getState("disabled") || (a.getLayer()._preventHide(), a.toggleLayer())
  }
}, _getCancelHandler:function() {
  var a = this;
  return function() {
    a.hideLayer()
  }
}, _getOkHandler:function() {
  var a = this;
  return function() {
    var b = a.getLayer().c("beginmonthview").getValue(), c = a.getLayer().c("endmonthview").getValue(), b = 0 < c - b ? {begin:b, end:c} : {begin:c, end:b}, c = a.getValueText(b);
    !1 !== a.onchange(b, c) && (a.value = b, a._repaintMain(c), a.hideLayer(), a.onchanged(b))
  }
}, onchange:new Function, onchanged:new Function, _getMVCustomClass:function() {
  var a = this;
  return function(b) {
    return!a._isInRange(b) ? this.getClass("item-out") : ""
  }
}, _getCalChangeHandler:function(a) {
  var b = this;
  return function(c) {
    if(!b._isInRange(c)) {
      return!1
    }
    b.tempValue[a] = c;
    b.getLayer().c("shortcut").select(b.tempValue);
    baidu.g(b.getId(a + "title")).innerHTML = baidu.date.format(c, b.dateFormat)
  }
}, _isInRange:function(a) {
  var b = this.range.begin, c = this.range.end;
  return b && 0 > a - b || c && 0 > c - a ? !1 : !0
}, _repaintMain:function(a) {
  baidu.g(this.getId("text")).innerHTML = a || this.getValueText()
}, _repaintSide:function(a) {
  var b = this.range, c = this.view[a], d = c.getFullYear(), e = c.getMonth(), g = this.tempValue[a], h = this.getLayer().c(a + "monthview"), i = 12 * b.begin.getFullYear() + b.begin.getMonth(), b = 12 * b.end.getFullYear() + b.end.getMonth(), j = 12 * c.getFullYear() + c.getMonth(), k = this.getLayer().c(a + "month");
  k.datasource = this._getMonthOptions(d);
  k.render();
  0 < i - j ? e += i - j : 0 < j - b && (e -= j - b);
  k.setValue(e);
  c.setMonth(e);
  this.getLayer().c(a + "year").setValue(d);
  i >= j ? this.getLayer().c(a + "prevmonth").disable() : this.getLayer().c(a + "prevmonth").enable();
  b <= j ? this.getLayer().c(a + "nextmonth").disable() : this.getLayer().c(a + "nextmonth").enable();
  baidu.g(this.getId(a + "title")).innerHTML = baidu.date.format(g, this.dateFormat);
  h.value = g;
  h.setView(c)
}, _getMainHtml:function() {
  return baidu.format(this._tplMain, this.getId("text"), this.getClass("text"), this.getValueText(), this.getClass("arrow"))
}, _getLayerSideHtml:function(a) {
  return baidu.format(this._tplSide, this.getClass(a), this.getClass("side-title"), this.getId(a + "title"), a + "monthview", this.getClass("side-func"), a + "prevmonth", a + "nextmonth", a + "year", a + "month", this[a + "SideTitle"])
}, _renderLayer:function() {
  var a = new ui.Layer({id:"layer", autoHide:"click", retype:"mcal-layer"});
  a.appendTo();
  this.addChild(a);
  a.onhide = this._getLayerHideHandler();
  a.main.innerHTML = baidu.format(this._tplLayer, "shortcut", this.getClass("body"), this.getClass("foot"), "ok", "cancel", this._getLayerSideHtml("begin"), this._getLayerSideHtml("end"), this.okText, this.cancelText, "close");
  ui.util.buildControlTree(a.main, a);
  var b = this.view, c = b.begin, d = b.end, b = c.getFullYear(), e = d.getFullYear(), c = c.getMonth(), d = d.getMonth(), g = this._getYearOptions(), h = this._getMVCustomClass();
  a.c("beginyear").rebindModel({datasource:g, value:b});
  a.c("endyear").rebindModel({datasource:g, value:e});
  a.c("beginmonth").rebindModel({datasource:this._getMonthOptions(b), value:c});
  a.c("endmonth").rebindModel({datasource:this._getMonthOptions(e), value:d});
  a.c("beginmonthview").rebindModel({customClass:h, value:this.value.begin});
  a.c("endmonthview").rebindModel({customClass:h, value:this.value.end});
  this._initLayerUI()
}, _getLayerHideHandler:function() {
  var a = this;
  return function() {
    a.removeState("active")
  }
}, _initLayerUI:function() {
  var a = this.getLayer();
  a.c("ok").onclick = this._getOkHandler();
  a.c("close").onclick = a.c("cancel").onclick = this._getCancelHandler();
  a.c("beginyear").onchange = this._getYearChangeHandler("begin");
  a.c("endyear").onchange = this._getYearChangeHandler("end");
  a.c("beginmonth").onchange = this._getMonthChangeHandler("begin");
  a.c("endmonth").onchange = this._getMonthChangeHandler("end");
  a.c("beginprevmonth").onclick = this._getPrevMonthHandler("begin");
  a.c("endprevmonth").onclick = this._getPrevMonthHandler("end");
  a.c("beginnextmonth").onclick = this._getNextMonthHandler("begin");
  a.c("endnextmonth").onclick = this._getNextMonthHandler("end");
  a.c("beginmonthview").onchange = this._getCalChangeHandler("begin");
  a.c("endmonthview").onchange = this._getCalChangeHandler("end");
  a.c("shortcut").onchange = this._getShortcutChangeHandler()
}, _getShortcutChangeHandler:function() {
  var a = this;
  return function(b, c) {
    !1 !== a.onchange(b, c) && (a.value = b, a._repaintMain(c + "&nbsp;&nbsp;" + a.getDateValueText()), a.hideLayer(), a.onchanged(b))
  }
}, _getYearChangeHandler:function(a) {
  var b = this;
  return function(c) {
    b._repaintMonthView(a, c, b.view[a].getMonth());
    b.getLayer()._preventHide()
  }
}, _getMonthChangeHandler:function(a) {
  var b = this;
  return function(c) {
    b._repaintMonthView(a, b.view[a].getFullYear(), c);
    b.getLayer()._preventHide()
  }
}, _getPrevMonthHandler:function(a) {
  var b = this;
  return function() {
    var c = b.view[a];
    c.setMonth(c.getMonth() - 1);
    b._repaintMonthView(a, c.getFullYear(), c.getMonth())
  }
}, _getNextMonthHandler:function(a) {
  var b = this;
  return function() {
    var c = b.view[a];
    c.setMonth(c.getMonth() + 1);
    b._repaintMonthView(a, c.getFullYear(), c.getMonth())
  }
}, _getYearOptions:function() {
  for(var a = this.range, b = [], c = a.end.getFullYear(), a = a.begin.getFullYear();a <= c;a++) {
    b.push({name:a, value:a})
  }
  return b
}, _getMonthOptions:function(a) {
  var b = this.range, c = [], d = 0, e = 11;
  for(a == b.begin.getFullYear() ? d = b.begin.getMonth() : a == b.end.getFullYear() && (e = b.end.getMonth());d <= e;d++) {
    c.push({name:d + 1, value:d})
  }
  return c
}, _repaintMonthView:function(a, b, c) {
  this.view[a] = new Date(b, c, 1);
  this._repaintSide(a)
}, toggleLayer:function() {
  this.getLayer().isShow() ? this.hideLayer() : this.showLayer()
}, hideLayer:function() {
  this.getLayer().hide();
  this.removeState("active")
}, showLayer:function() {
  var a = this.main, b = baidu.dom.getPosition(a), c = baidu.page.getWidth(), d = this.getLayer(), e = d.main.offsetWidth, g = this.value, h = b.top + a.offsetHeight - 1;
  this.tempValue = {begin:new Date(g.begin), end:new Date(g.end)};
  this.view = {begin:new Date(g.begin), end:new Date(g.end)};
  this._repaintLayer();
  d.show(c < b.left + e ? b.left + a.offsetWidth - e : b.left, h);
  this.setState("active")
}, getLayer:function() {
  return this.c("layer")
}, _repaintLayer:function() {
  this.getLayer().c("shortcut").select(this.value);
  this._repaintSide("begin");
  this._repaintSide("end")
}, getValueText:function(a) {
  var a = this.getDateValueText(a), b = this.getLayer().c("shortcut");
  return a && b ? b.getName() + "&nbsp;&nbsp;" + a : ""
}, getDateValueText:function(a) {
  var b = a || this.getValue(), a = b.begin, b = b.end, c = this.dateFormat, d = baidu.date.format;
  return a && b ? d(a, c) + " \u81f3 " + d(b, c) : ""
}, getValue:function() {
  return this.value
}, setValue:function(a) {
  a && (a.begin && a.end) && (this.value = a, this.getLayer().c("shortcut").setValue(a), this._repaintMain())
}, dispose:function() {
  this.onchanged = this.onchange = null;
  ui.MultiCalendar.superClass.dispose.call(this)
}};
baidu.inherits(ui.MultiCalendar, ui.InputControl);
ui.events = {LOAD:"load", CLICK:"click", DBCLICK:"dbclick", MOUSE_OVER:"mouseover", MOUSE_OUT:"mouseout", ENTER:"enter", OPEN:"open", VIEWAREA_CHANGE:"viewareachange", BEFORE_CHANGE:"beforechange", BEFORE_QUEUE:"beforequeue", BEFORE_SUBMIT:"beforesubmit", AFTER_QUEUE:"afterqueue", BEFORE_UPLOAD:"beforeupload", AFTER_UPLOAD:"afterupload", UPLOAD_SUCCESS:"uploadsuccess", UPLOAD_FAILURE:"uploadfailure", AFTER_DELETE:"afterdelete", AFTER_RENDER:"afterrender", AFTER_COLUMN_RESIZE:"aftercolumnresize", 
AFTER_SELECT:"afterselect", AFTER_SHOW:"aftershow", AFTER_HIDE:"afterhide", AFTER_SORT:"aftersort", CANVAS_CHANGE:"canvaschange", FORM_CHANGE:"formchange", BEFORE_VALIDATE:"beforevalidate", FILES_CHANGED:"fileschanged", BEFORE_REDIRECT:"beforeredirect", CLOSE:"onclose", SHOW_TIP:"showtip", HIDE_TIP:"hidetip"};
ui.TextInput = function(a) {
  ui.InputControl.call(this, a);
  this.form = 1;
  this.value = baidu.decodeHTML(0 === this.value ? 0 : this.value || "")
};
baidu.inherits(ui.TextInput, ui.InputControl);
f = ui.TextInput.prototype;
f.getValue = function() {
  var a = baidu.trim(this.main.value);
  return a == this.virtualValue ? "" : a
};
f.setValue = function(a) {
  this.main.value = baidu.decodeHTML(a);
  a ? this._focusHandler() : this._blurHandler()
};
f.setTitle = function(a) {
  this.main.setAttribute("title", a)
};
f.disable = function() {
  ui.TextInput.superClass.disable.call(this);
  this.main.disabled = "disabled"
};
f.enable = function() {
  ui.TextInput.superClass.enable.call(this);
  this.main.removeAttribute("disabled")
};
f.setReadOnly = function(a) {
  ui.TextInput.superClass.setReadOnly.call(this, a);
  this.main.readOnly = a
};
f.render = function(a) {
  var b = parseInt(this.width, 10) || 0, c = parseInt(this.height, 10) || 0, d = a || this.main, a = d.tagName, e = d.getAttribute("type") || "text";
  if("INPUT" == a && ("text" == e || "password" == e) || "TEXTAREA" == a) {
    this.type = "INPUT" == a ? "text" : "textarea";
    "text" == this.type && (this.autoState = !0);
    ui.TextInput.superClass.render.call(this, d);
    0 < b && (5 < baidu.ie && 8 > baidu.ie ? (b = Math.max(b - 10, 0), setTimeout(function() {
      d.style.width = b + "px"
    }, 0)) : d.style.width = b + "px");
    0 < c && (d.style.height = c + "px");
    d.onkeypress = this.getPressHandler();
    c = this.getChangeHandler();
    if(baidu.ie) {
      d.onpropertychange = c
    }else {
      baidu.on(d, "input", c)
    }
    this.changeHandler = c;
    this.setReadOnly(!!this.readOnly);
    this.disabled ? this.disable() : this.enable();
    d.onfocus = baidu.fn.bind(this._focusHandler, this);
    d.onblur = baidu.fn.bind(this._blurHandler, this)
  }
  !this.value && this.virtualValue ? (this.main.value = this.virtualValue, baidu.addClass(this.main, this.getClass("virtual"))) : this.main.value = this.value
};
f._focusHandler = function() {
  var a = this.virtualValue, b = this.main;
  baidu.removeClass(b, this.getClass("virtual"));
  (a && b.value == a || this.autoSelect) && setTimeout(function() {
    b.value = ""
  }, 0)
};
f._blurHandler = function() {
  var a = this.virtualValue, b = this.main, c = this.getValue();
  if(a && ("" == c || c == a)) {
    b.value = a, baidu.addClass(b, this.getClass("virtual"))
  }
};
f.getPressHandler = function() {
  var a = this;
  return function(b) {
    b = b || window.event;
    if(13 == (b.keyCode || b.which)) {
      return a.trigger(ui.events.ENTER), a.onenter()
    }
  }
};
f.onenter = baidu.fn.blank;
f.getChangeHandler = function() {
  var a = this;
  return function() {
    if(baidu.ie) {
      if("value" == window.event.propertyName) {
        a.onchange()
      }
    }else {
      a.onchange()
    }
  }
};
f.onchange = baidu.fn.blank;
f.focusAndSelect = function() {
  this.main.select()
};
f.dispose = function() {
  var a = this.main;
  a.onkeypress = null;
  a.onchange = null;
  a.onpropertychange = null;
  a.onfocus = null;
  a.onblur = null;
  baidu.un(a, "input", this.changeHandler);
  this.onenter = this.changeHandler = null;
  ui.TextInput.superClass.dispose.call(this)
};
jn.ListAction = function() {
  er.ListAction.call(this)
};
baidu.inherits(jn.ListAction, er.ListAction);
f = jn.ListAction.prototype;
f.initBehavior = function(a) {
  this.form && this.multiCalendar && (this.multiCalendar.onchanged = baidu.fn.bind(function() {
    this.submitMode = "multiCalendar";
    this.form.validateAndSubmit()
  }, this));
  jn.ListAction.superClass.initBehavior.call(this, a)
};
f.leave = function() {
  this.form && this.multiCalendar && (this.multiCalendar.onchanged = null);
  jn.ListAction.superClass.leave.call(this)
};
f.saveState = function(a) {
  !0 !== this.preventDefaultSaveState && "popup" !== this.argMap.type && (a = this.extendParams(baidu.url.jsonToQuery(this.argMap.paramMap), a), jn.ListAction.superClass.saveState.call(this, a))
};
f._saveState = function(a) {
  a = this.extendParams(baidu.url.jsonToQuery(this.argMap.paramMap), a);
  er.locator.redirect("~" + a, !0)
};
f.onAfterDoSubmit = baidu.fn.blank;
f.extendParams = function(a, b, c) {
  function d(a) {
    for(var b = {}, a = a.split("&"), c = a.length, d, e;c--;) {
      d = a[c].split("="), e = d[0], d = d[1], e && (b[e] = d)
    }
    return b
  }
  var e;
  if(c) {
    e = baidu.url.jsonToQuery(baidu.object.extend(baidu.url.queryToJson(a), baidu.url.queryToJson(b)))
  }else {
    a = d(a);
    b = baidu.object.clone(d(b));
    c = {};
    for(e in a) {
      "undefined" != typeof b[e] && b.hasOwnProperty(e) ? (c[e] = b[e], delete b[e]) : c[e] = a[e]
    }
    e = baidu.object.extend(c, b);
    var g = [];
    baidu.object.each(e, function(a, b) {
      g.push(b + "=" + a)
    });
    e = g.join("&")
  }
  return e
};
f.doSubmit = function(a) {
  var b = this.getExtraParam();
  this.initSearchParams || (this.initSearchParams = this.getSearchParam());
  if("multiCalendar" == this.submitMode) {
    a = this.getSearchParam();
    if(this.form && this.multiCalendar) {
      var c = this.processParam(this.multiCalendar.formName + "=" + this.multiCalendar.getParamValue()), a = this.extendParams(a, c)
    }
    a = this.extendParams(a, b)
  }else {
    "treeClick" == this.submitMode && (a = this.initSearchParams, this.form && this.multiCalendar && (c = this.processParam(this.multiCalendar.formName + "=" + this.multiCalendar.getParamValue()), a = this.extendParams(a, c)), a = this.extendParams(a, b))
  }
  this.submitMode = "";
  jn.ListAction.superClass.doSubmit.call(this, a);
  this.onAfterDoSubmit()
};
ui.SideBar = function(a) {
  ui.Control.call(this, a);
  this.type = "sidebar";
  this.headHeight = this.headHeight || 37;
  this.marginTop = this.marginTop || 10;
  this.marginLeft = this.marginLeft || 10;
  this.marginBottom = this.marginBottom || 0;
  this._autoTimer = 0;
  this._motioning = !1
};
ui.SideBar.prototype = {motionStep:20, motionInterval:20, mode:"fixed", autoDelay:200, _initCtrlBtn:function() {
  var a = this.main, b = ui.util.create("Button", {id:"AutoHide", skin:"autohide"}), c = ui.util.create("Button", {id:"Fixed", skin:"fixed"}), d = ui.util.create("Button", {id:"DoHide", skin:"dohide", content:"TEXT"});
  b.appendTo(a);
  c.appendTo(a);
  d.appendTo(a);
  this.addChild(b);
  this.addChild(c);
  this.addChild(d);
  b.onclick = this._getAutoHideClickHandler();
  c.onclick = this._getFixedClickHandler();
  d.onclick = this._getDoHideClickHandler();
  this._setMode(this.mode)
}, onmodechange:new Function, _getFixedClickHandler:function() {
  var a = this;
  return function() {
    a._setMode("fixed");
    a.onmodechange(a.mode)
  }
}, _getAutoHideClickHandler:function() {
  var a = this;
  return function() {
    a._setMode("autohide");
    a.onmodechange(a.mode)
  }
}, _getDoHideClickHandler:function() {
  var a = this;
  return function() {
    a._hide()
  }
}, _setMode:function(a) {
  var a = a.toLowerCase(), b = this._getAutoHideMain(), c = this._getFixedMain();
  "fixed" == a ? (baidu.hide(c), baidu.show(b)) : (baidu.show(c), baidu.hide(b));
  this.mode = a
}, _isAutoHide:function() {
  return"autohide" == this.mode
}, _getFixedMain:function() {
  return this.c("Fixed").getMain()
}, _getAutoHideMain:function() {
  return this.c("AutoHide").getMain()
}, getBody:function() {
  return baidu.dom.next(baidu.dom.first(this.main))
}, _initContent:function() {
  var a = baidu.dom.first(this.main);
  if(a && (baidu.addClass(a, this.getClass("head")), this._headEl = a, a = baidu.dom.next(a))) {
    this._bodyEl = a, baidu.addClass(a, this.getClass("body"))
  }
}, _caching:function() {
  var a = this.main, b = baidu.dom.getPosition(a.parentNode), a = baidu.dom.getPosition(a);
  baidu.lang.hasValue(this._mOffsetTop) ? this.top = b.top + this._mOffsetTop : (this._mOffsetTop = a.top - b.top, this.top = a.top, this.left = a.left)
}, render:function(a) {
  ui.SideBar.superClass.render.call(this, a);
  this._isRender || (this._caching(), (a = this._getNeighbor()) && baidu.addClass(a, this.getClass("neighbor")), this._initCtrlBtn(), this._initContent(), this._renderMiniBar(), this.heightReseter = this._getHeightReseter(), this.topReseter = this._getTopReseter(), baidu.on(window, "resize", this.heightReseter), baidu.on(window, "scroll", this.topReseter), this.main.onmouseover = this._getMainOverHandler(), this.main.onmouseout = this._getMainOutHandler(), this._resetTop(), this._resetHeight(), this._isAutoHide() && 
  this._hide(!0), this._isRender = 1)
}, refreshView:function() {
  this._caching();
  this.heightReseter();
  this.topReseter()
}, _getMainOverHandler:function() {
  var a = this;
  return function() {
    a._autoTimer && clearTimeout(a._autoTimer)
  }
}, _getMainOutHandler:function() {
  var a = this;
  return function(b) {
    a._isAutoHide() && !a._motioning && (b = b || window.event, baidu.dom.contains(a.main, b.relatedTarget || b.toElement) || a._autoHideBar())
  }
}, _renderMiniBar:function() {
  var a = document.createElement("div"), b = [];
  this._headEl && b.push('<div class="' + this.getClass("minibar-text") + '">' + this._headEl.innerHTML + "</div>");
  b.push('<div class="' + this.getClass("minibar-arrow") + '"></div>');
  a.innerHTML = b.join("");
  a.id = this.getId("MiniBar");
  a.className = this.getClass("minibar");
  a.style.left = "-10000px";
  a.style.top = this.top + "px";
  this._miniBar = a;
  a.onclick = this._getMiniClickHandler();
  a.onmouseover = this._getMiniOverHandler();
  a.onmouseout = this._getMiniOutHandler();
  document.body.appendChild(a)
}, _getMiniOutHandler:function() {
  var a = this;
  return function() {
    baidu.removeClass(this, a.getClass("minibar-hover"));
    a._autoTimer && clearTimeout(a._autoTimer)
  }
}, _getMiniOverHandler:function() {
  var a = this;
  return function() {
    baidu.dom.hasClass(this, a.getClass("minibar-hover")) || (baidu.addClass(this, a.getClass("minibar-hover")), a._autoTimer = setTimeout(function() {
      a._hideMiniBar()
    }, a.autoDelay))
  }
}, _getMiniClickHandler:function() {
  var a = this;
  return function() {
    baidu.removeClass(this, a.getClass("minibar-hover"));
    a._motioning || (a._autoTimer && clearTimeout(a._autoTimer), a._hideMiniBar());
    a._setMode("fixed");
    a.onmodechange("fixed")
  }
}, _resetHeight:function() {
  var a = baidu.page, b = baidu.dom.getPosition(this.main), c = a.getScrollTop(), a = (a = a.getViewHeight()) ? a - b.top + c - this.marginTop - this.marginBottom : 300;
  0 > a && (a = 300);
  this.bodyHeight = b = a - this._headEl.offsetHeight;
  this.height = a;
  this.main.style.height = this._miniBar.style.height = a + "px";
  this._bodyEl && (this._bodyEl.style.height = b + "px");
  this.onresize()
}, onresize:new Function, _getHeightReseter:function() {
  var a = this;
  return function() {
    a._resetHeight()
  }
}, _resetTop:function() {
  var a = this, b = a.marginTop, c = baidu.page.getScrollTop(), d = a.main, e = a._miniBar, g = a.top, h = "absolute", i = "absolute";
  baidu.ie && 7 > baidu.ie ? c > g - b ? b = c = c - g + a.top : (b = c = g, a._resetHeight()) : c > g - b ? (i = h = "fixed", b = c = b) : (b = c = g, a._resetHeight());
  d.style.top = b + "px";
  d.style.position = h;
  e.style.top = c + "px";
  e.style.position = i;
  a._resetHeightTimer = setTimeout(function() {
    a._resetHeight()
  }, 200)
}, _getTopReseter:function() {
  var a = this;
  return function() {
    a._resetTop()
  }
}, _show:function() {
  var a = this, b = 0, c;
  a._motioning = !0;
  c = setInterval(function() {
    b++;
    b >= a.motionStep ? (clearInterval(c), a.main.style.left = "10px", a._motioning = !1, a._isAutoHide() && a._autoHideBar()) : a.main.style.left = -220 + Math.floor(230 * a._tween(b)) + "px"
  }, a.motionInterval)
}, none:function(a) {
  var b;
  this.main.style.display = a ? "none" : "block";
  this._miniBar.style.display = a ? "none" : "block";
  (b = this._getNeighbor()) && (a ? baidu.addClass(b, this.getClass("neighbor-none")) : baidu.removeClass(b, this.getClass("neighbor-none")))
}, _hide:function(a) {
  function b(a) {
    c.main.style.left = e + "px";
    var b = c._getNeighbor();
    b && baidu.addClass(b, c.getClass("neighbor-hide"));
    c.publish(ui.events.CANVAS_CHANGE);
    c._motioning = !1;
    c._showMiniBar(a);
    c.trigger(ui.events.AFTER_HIDE)
  }
  var c = this, d = 0, e = -220, g = e - 10, h;
  a ? b(a) : (c._motioning = !0, h = setInterval(function() {
    d++;
    d >= c.motionStep ? (clearInterval(h), b()) : c.main.style.left = 10 + Math.floor(g * c._tween(d)) + "px"
  }, c.motionInterval))
}, _autoHideBar:function() {
  var a = this;
  a._autoTimer && clearTimeout(a._autoTimer);
  a._autoTimer = setTimeout(function() {
    var b = baidu.page.getMousePosition(), c = baidu.dom.getPosition(a.main);
    (b.x > c.left + a.main.offsetWidth || b.y < c.top || b.y > c.top + a.main.offsetHeight) && a._hide()
  }, a.autoDelay)
}, _showMiniBar:function(a) {
  function b() {
    c._miniBar.style.left = e + "px";
    c._motioning = !1
  }
  var c = this, d = 0, e = 0, g = e - -30, h;
  a ? b() : (c._motioning = !0, h = setInterval(function() {
    d++;
    d >= c.motionStep ? (clearInterval(h), b()) : c._miniBar.style.left = -30 + Math.floor(g * c._tween(d)) + "px"
  }, c.motionInterval))
}, _hideMiniBar:function() {
  var a = this, b = 0, c;
  a._motioning = !0;
  c = setInterval(function() {
    b++;
    if(b >= a.motionStep) {
      clearInterval(c);
      a._miniBar.style.left = "-30px";
      var d = a._getNeighbor();
      d && baidu.removeClass(d, a.getClass("neighbor-hide"));
      a.publish(ui.events.CANVAS_CHANGE, a.getPage());
      a._motioning = !1;
      a._show();
      a.trigger(ui.events.AFTER_SHOW)
    }else {
      a._miniBar.style.left = 0 + Math.floor(-30 * a._tween(b)) + "px"
    }
  }, a.motionInterval)
}, _repaintNeighbor:function() {
  function a(c) {
    c.children && baidu.array.each(c.children, function(c) {
      c instanceof b && d.push(c);
      a(c)
    })
  }
  var b, c, d = [];
  if(b = baidu.getObjectByName("ui.Table")) {
    if(c = this.getPage()) {
      a(c), baidu.array.each(d, function(a) {
        a.refreshView && a.refreshView()
      })
    }
  }
}, _getNeighbor:function() {
  return baidu.dom.next(this.main)
}, dispose:function() {
  baidu.un(window, "resize", this.heightReseter);
  baidu.un(window, "scroll", this.topReseter);
  this._miniBar && document.body.removeChild(this._miniBar);
  this._resetHeightTimer && clearTimeout(this._resetHeightTimer);
  this._miniBar = this._bodyEl = this._headEl = null;
  ui.SideBar.superClass.dispose.call(this)
}, _tween:function(a) {
  return Math.pow(a / this.motionStep, 2)
}};
baidu.inherits(ui.SideBar, ui.Control);
ui.SearchInfo = function(a) {
  ui.Control.call(this, a);
  this.type = "searchInfo";
  this.separator = this.separator || " | "
};
ui.SearchInfo.prototype = {render:function(a) {
  ui.SearchInfo.superClass.render.call(this, a || this.main);
  this.main && (this.main.innerHTML = this.getHtml(), this.main.style.display = this.isShow ? "" : "none")
}, getCloseHtml:function() {
  return baidu.format(this.tplClose, this.getClass("close"), this.getId("close"), this.getStrCall("closeHandler"), this.getStrCall("closeOver"), this.getStrCall("closeOut"))
}, getIconHtml:function() {
  return""
}, getHtml:function() {
  return"" + this.getTextHtml() + this.getCloseHtml()
}, getTextHtml:function() {
  var a = [], b = this.text, c = this.template, d = this.ignore || "";
  this.isShow = !1;
  b = this.encodeValue(b);
  baidu.lang.hasValue(b) && b !== d && (b = b.split("").join("<wbr/>"), a.push(baidu.format(c, b)), this.isShow = !0);
  return baidu.format(this.tplText, this.getClass("text"), a.join(this.separator))
}, encodeValue:function(a) {
  return"string" == typeof a ? baidu.encodeHTML(a) : a
}, tplText:'<span class="{0}">{1}</span>', tplIcon:'<div class="{0}"></div>', tplClose:'<span class="{0}" id="{1}" onclick="{2}" onmouseover="{3}" onmouseout="{4}">\u6e05\u7a7a</span>', hide:function() {
  try {
    baidu.hide(this.main)
  }catch(a) {
  }
}, onclose:new Function, closeHandler:function() {
  !1 !== this.onclose() && this.hide()
}, getClose:function() {
  return baidu.g(this.getId("close"))
}, closeOver:function() {
  baidu.addClass(this.getClose(), this.getClass("close") + "-hover")
}, closeOut:function() {
  baidu.removeClass(this.getClose(), this.getClass("close") + "-hover")
}};
baidu.inherits(ui.SearchInfo, ui.Control);
ui.SearchInput = function(a) {
  ui.InputControl.call(this, a);
  this.type = "searchinput";
  this.__initOption("width", null, "WIDTH");
  this.__initOption("btntext", null, "BUTTON_TEXT")
};
ui.SearchInput.PLACEHOLDER = "";
ui.SearchInput.WIDTH = 155;
ui.SearchInput.BUTTON_TEXT = "\u641c\u7d22";
ui.SearchInput.prototype = {_tplMain:'<table class="{2}" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td class="{0}"><input ui="id:txtSearch;type:TextInput;virtualValue:@placeholder;value:@value" type="text" maxlength="20"/></td><td class="{1}" align="right"><div ui="id:btnSearch;type:Button;skin:search;"></div></td></tr></table>', onsearch:new Function, _getMainHtml:function() {
  return baidu.format(this._tplMain, this.getClass("input"), this.getClass("button"), this.getClass("wrap"))
}, _getSearchHandler:function() {
  var a = this;
  return function() {
    var b = a.c("txtSearch").getValue();
    a.onsearch(b)
  }
}, setValue:function(a) {
  this.c("txtSearch").setValue(a || "");
  return a || ""
}, getValue:function() {
  return this.c("txtSearch").getValue()
}, reset:function() {
  this.setValue("");
  return""
}, appendTo:function(a) {
  if(!this.main) {
    var b = document.createElement("div");
    a.appendChild(b);
    this.render(b)
  }
}, render:function(a) {
  a = a || this.main;
  this.isRender || (ui.SearchInput.superClass.render.call(this, a), a.innerHTML = this._getMainHtml(), ui.util.buildControlTree(this.main, this), this.isRender = 1);
  this.main && this.setValue(this.value)
}, bindEvent:function() {
  ui.SearchInput.superClass.bindEvent.call(this);
  this.c("txtSearch").onenter = this._getSearchHandler();
  this.c("btnSearch").onclick = this._getSearchHandler()
}, dispose:function() {
  this.c("txtSearch").onenter = null;
  this.c("btnSearch").onclick = null;
  ui.SearchInput.superClass.dispose.call(this)
}};
baidu.inherits(ui.SearchInput, ui.InputControl);
ui.TreeView = function(a) {
  ui.Control.call(this, a);
  this.type = "treeview";
  this.__initOption("clickExpand", null, "CLICK_EXPAND");
  this.__initOption("expandSelected", null, "EXPAND_SELECTED");
  this.__initOption("initExpand", null, "INIT_EXPAND");
  this.__initOption("collapsed", null, "COLLAPSED");
  this.__initOption("iconDepth", null, "ICONDEPTH");
  this._dataMap = {};
  this.nodeClassCache = {}
};
ui.TreeView.COLLAPSED = 1;
ui.TreeView.ICONDEPTH = 99;
ui.TreeView.CLICK_EXPAND = 1;
ui.TreeView.EXPAND_SELECTED = 0;
ui.TreeView.INIT_EXPAND = 1;
ui.TreeView.prototype = {appendTo:function(a) {
  var b = document.createElement("div");
  a.appendChild(b);
  this.render(b)
}, _prepareDataItem:function() {
  function a(c) {
    var d, e;
    d = b.getItemId(c);
    "undefined" == typeof c.parentId && (c.parentId = d);
    b._dataMap[d] = c;
    c = c.children || [];
    for(e = 0;e < c.length;e++) {
      c[e].parentId = d, a(c[e])
    }
  }
  var b = this;
  this.datasource && a(this.datasource)
}, render:function(a) {
  this.box && (this.catchValue = "multi" === this.box ? baidu.object.clone(this.value) : this.value);
  this._isRender || (ui.TreeView.superClass.render.call(this, a), this.width && (this.main.style.width = this.width + "px"), this._isRender = 1);
  a = this._getMainHtml();
  this.main.innerHTML = a;
  !this.box && "undefined" != typeof this.value && (this.select(this.value), "1" == this.initExpand.toString() && this._expandParentNodes(this.value))
}, _expandParentNodes:function(a) {
  var a = this.getAllParentIds(a), b;
  if(a) {
    for(var c = a.length - 1;0 <= c;c--) {
      (b = baidu.g(this.getId("node" + a[c]))) && this._expand(b)
    }
  }
}, _eventOccursInTreeNode:function(a) {
  if(null != a.getAttribute("aria-type")) {
    return a
  }
  for(a = a.parentNode;null != a && a != this.main;) {
    if(1 == a.nodeType && null != a.getAttribute("aria-type")) {
      return a
    }
    a = a.parentNode
  }
  return null
}, bindModel:function(a) {
  ui.TreeView.superClass.bindModel.call(this, a);
  this._prepareDataItem()
}, bindEvent:function() {
  ui.TreeView.superClass.bindEvent.call(this);
  var a = this;
  a.main.onclick = function(b) {
    b = b || window.event;
    b = b.target || b.srcElement;
    b = a._eventOccursInTreeNode(b);
    if(null != b) {
      var c = b.getAttribute("aria-type");
      "node" == c ? a._nodeClickHandler(b) : "icon" == c ? a._iconClickHandler(b) : "node-cb" == c ? a._nodeCBClick(b) : "node-rb" == c && a._nodeRBClick(b)
    }
  };
  a.main.onmouseover = function(b) {
    b = b || window.event;
    b = b.target || b.srcElement;
    b = a._eventOccursInTreeNode(b);
    null != b && "node" == b.getAttribute("aria-type") && a._nodeOverHandler(b)
  };
  a.main.onmouseout = function(b) {
    b = b || window.event;
    b = b.target || b.srcElement;
    b = a._eventOccursInTreeNode(b, "node");
    null != b && "node" == b.getAttribute("aria-type") && a._nodeOutHandler(b)
  }
}, _getMainHtml:function() {
  return this._getNodeHtml(this.datasource, 0, this.datasource.id, !0)
}, _getChildsHtml:function(a, b, c) {
  for(var d = [], e = 0, g = a.length;e < g;e++) {
    d[d.length] = "<li>", d[d.length] = this._getNodeHtml(a[e], b + 1, c, !1), d[d.length] = "</li>"
  }
  return d.join("")
}, _tplNode:'<div type="{0}" value="{4}" id="{2}" class="{1}" isExpanded="{8}" level="{9}" aria-type="node" {14}><div class="{5}" {15} aria-type="icon">&nbsp;</div><div class="{6}">&nbsp;</div><div class="{7}" {16} {17}>{3}</div></div>', _getNodeHtml:function(a, b, c, d) {
  if(!a) {
    return""
  }
  a.parentId = c;
  a.level = b;
  var c = this._getLevelTag(b), e = this.getClass("node-selected"), d = !!d, g = a.type, h = this.getChildren(a), i = h && 0 < h.length, j = this.iconDepth >= b && 0 != b, k = this.getItemId(a), n = this.typeClass || (this.typeClass = this.getClass("node-type")), o = this.iconClass || (this.iconClass = this.box ? this.getClass("node-icon-box") : this.getClass("node-icon")), l = this.textClass || (this.textClass = this.getClass("node-text")), m = this._getNodeClass("node", c) + (this._selected && 
  this._selected == k ? " " + e : ""), e = this._getNodeClass("children", c), q = this.getId("node" + k), r = this.getItemHtml(a), p = "", s = !1, t;
  this._dataMap[k] = a;
  t = i ? "branch" : "leaf";
  m += " " + this.getClass("node-" + t);
  this.collapsed <= b && (s = !0);
  g && (n += " " + this.getClass("node-type-" + g));
  s && i && (p = ' style="display:none";');
  a = baidu.format(this._tplNode, t, m, q, r, k, o, n, l, s ? "" : "1", b, "", "", "", "", "1" === this.hideRoot && "root" == c ? 'style="display:none;"' : "", this.box ? i ? 'style="visibility:visible;"' : 'style="visibility:hidden;"' : j ? 'style="display:inline-block;*display:inline;zoom:1"' : "", !j && 1 == b ? 'style="padding-left:20px;"' : "", this.box ? "" : 'title="' + a.text + '"');
  i && d && (a += baidu.format('<ul id="{2}" value="{4}" class="{3}"{1}>{0}</ul>', this.getChildrenHtml(h, b, k), p, this.getId("children" + k), e, k));
  return a
}, _getNodeClass:function(a, b) {
  var c = a + b;
  if(this.nodeClassCache[c]) {
    return this.nodeClassCache[c]
  }
  var d = this.getClass(a) + " " + this.getClass(a + "-" + b);
  return this.nodeClassCache[c] = d
}, _getLevelTag:function(a) {
  return 0 === a ? "root" : "level" + a
}, _nodeOverHandler:function(a) {
  baidu.addClass(a, this.getClass("node-hover"))
}, _nodeOutHandler:function(a) {
  baidu.removeClass(a, this.getClass("node-hover"))
}, _iconClickHandler:function(a) {
  this._toggle(a.parentNode);
  this._isPreventClick = 1
}, _nodeClickHandler:function(a) {
  if(!this.preventNodeClick && a) {
    var b = a.getAttribute("value"), c = this._selected;
    !1 !== this.onchange(b, this._dataMap[b]) && (this.select(b), "1" == this.expandSelected.toString() ? !a.getAttribute("isExpanded") && this._expand(a) : "1" == this.clickExpand.toString() && (!a.getAttribute("isExpanded") || b == c) && this._toggle(a))
  }
}, getNodeData:function(a) {
  return this._dataMap[a]
}, isRootNode:function(a) {
  a = this._dataMap[a];
  return a.id == a.parentId
}, deleteValues:function(a) {
  for(var b, c = 0;c < a.length;c++) {
    if(delete this.value[a[c]], b = baidu.g(this.getId("treenode" + a[c]))) {
      b.checked = !1
    }
  }
}, getAllParentIds:function(a) {
  var b = [];
  if(a = this._dataMap[a]) {
    for(a = a.parentId;a && !this.isRootNode(a);) {
      b[b.length] = "" + a, a = this._dataMap[a].parentId
    }
  }
  return b
}, getAllChildrenIds:function(a) {
  function b(a) {
    for(var a = a.children || [], e = 0;e < a.length;e++) {
      c[c.length] = "" + a[e].id, b(a[e])
    }
  }
  var c = [];
  (a = this._dataMap[a]) && b(a);
  return c
}, onchange:new Function, select:function(a, b) {
  if(!(!0 === !b && this._selected == a)) {
    var c = this.getClass("node-selected"), d = baidu.g(this.getId("node" + this._selected));
    d && baidu.removeClass(d, c);
    this._selected = a;
    this.getId("node" + a) && baidu.g(this.getId("node" + a)) && baidu.addClass(this.getId("node" + a), c)
  }
}, _toggle:function(a) {
  a.getAttribute("isExpanded") ? this._collapse(a) : this._expand(a)
}, _collapse:function(a) {
  var b = a.getAttribute("value");
  !1 !== this.oncollapse(b) && (a.setAttribute("isExpanded", ""), this.collapse(b))
}, _expand:function(a) {
  var b = a.getAttribute("value");
  a.getAttribute("isBuilded") || (this.repaintNode(this._dataMap[b]), a.setAttribute("isBuilded", "1"));
  !1 !== this.onexpand(b) && (a.setAttribute("isExpanded", "1"), this.expand(b))
}, oncollapse:new Function, onexpand:new Function, expand:function(a) {
  var b = baidu.g(this.getId("children" + a));
  b && (b.style.display = "");
  (a = baidu.g(this.getId("node" + a))) && baidu.addClass(a, this.getClass("node-expanded"))
}, collapse:function(a) {
  var b = baidu.g(this.getId("children" + a));
  b && (b.style.display = "none");
  baidu.removeClass(this.getId("node" + a), this.getClass("node-expanded"))
}, triggerClick:function(a, b) {
  if("undefined" == typeof a && !b) {
    var c = baidu.g(this.getId("node"));
    this._nodeClickHandler(c)
  }else {
    if(!0 === b) {
      var c = this.getClass("node-selected"), d = baidu.g(this.getId("node" + this._selected));
      d && baidu.removeClass(d, c);
      this._selected = {}
    }
    this._selected != a && (c = baidu.g(this.getId("node" + a)), this._nodeClickHandler(c))
  }
}, repaintNodeText:function(a) {
  var b = this.getItemId(a), a = this.getItemHtml(a), b = baidu.g(this.getId("node" + b));
  a && (b.lastChild.innerHTML = a)
}, repaintNode:function(a) {
  var b = this.getItemId(a), c = this.getChildren(a), d = baidu.g(this.getId("node" + b)), e = this.getId("children" + b), g = baidu.g(e), h = this.getClass("node-leaf"), i = this.getClass("node-branch");
  if(d) {
    var j = parseInt(d.getAttribute("level"), 10);
    this.repaintNodeText(a);
    c instanceof Array && c.length ? (g || (g = document.createElement("ul"), g.id = e, g.style.display = d.getAttribute("isExpanded") ? "" : "none", g.className = this._getNodeClass("children", this._getLevelTag(j)), d.parentNode.insertBefore(g, d.nextSibling)), g.innerHTML = this.getChildrenHtml(c, j, b), baidu.addClass(d, i), baidu.removeClass(d, h), d.setAttribute("type", "branch")) : (baidu.removeClass(d, i), baidu.addClass(d, h), d.setAttribute("type", "leaf"))
  }
}, getChildrenHtml:function(a, b, c) {
  return this._getChildsHtml(a, b, c)
}, getChildren:function(a) {
  return a.children || []
}, getItemHtml:function(a) {
  var b = this.box ? 250 : 224, b = (this.width || b) - (a.htmlWidth || 0) - (17 + 21 * (a.level + 1)), c = a.children ? a.children.length : 0, d = parseInt(this.iconDepth), b = 1 == this.showChildNum && d && 0 != a.level && d >= a.level ? baidu.string.fast_ellipse(baidu.string.decodeHTML(a.text + "(" + c + ")"), b, "...", (c + "").length + 2) : 2 == this.showChildNum && a.childrenCount ? baidu.string.fast_ellipse(baidu.string.decodeHTML(a.text + "(" + a.childrenCount + ")"), b, "...", (a.childrenCount + 
  "").length + 2) : baidu.string.fast_ellipse(baidu.string.decodeHTML(a.text), b);
  return"multi" === this.box ? (d = this.boxLevel && a.level < this.boxLevel, c = this._getBoxId(a), baidu.format('<div class="ui-treeview-left"><input type="checkbox" id="{0}" cnodeId="{1}" aria-type="node-cb"{4} {7}/><label for="{8}" title="{6}">&nbsp;{2}</label></div><div class="ui-treeview-left">{5}</div>', c, a.id, b, "", this.value[a.id] ? " checked" : "", a.html || "", a.text, d ? 'style="display:none;"' : "", d ? "" : c)) : "single" === this.box ? (d = this.boxLevel && a.level < this.boxLevel, 
  c = this._getBoxId(a), baidu.format('<div class="ui-treeview-left"><input type="radio" name="xxx" id="{0}" cnodeId="{1}" aria-type="node-rb"{4} {7}/><label for="{8}" title="{6}">&nbsp;{2}</label></div><div class="ui-treeview-left">{5}</div>', c, a.id, b, "", this.value == a.id ? " checked" : "", a.html || "", a.text, d ? 'style="display:none;"' : "", d ? "" : c)) : baidu.format('<div class="ui-treeview-left" title="{2}">{0}</div><div class="ui-treeview-left">{1}</div>', b, a.html || "", a.text)
}, _nodeRBClick:function(a) {
  this.value = a.getAttribute("cnodeId")
}, _nodeCBClick:function(a) {
  a = a.getAttribute("cnodeId");
  this._selectCBNode(a)
}, _selectCBNode:function(a) {
  var b = baidu.g(this._getBoxId(this._dataMap[a])).checked;
  this._updateCBChild(a, b);
  !b && this._updateCBParent(a);
  b ? this.value[a] = 1 : delete this.value[a];
  this.trigger(ui.events.AFTER_SELECT)
}, _updateCBChild:function(a, b) {
  var c = this._dataMap[a].children, d = c instanceof Array && c.length, e, g;
  if(d) {
    for(;d--;) {
      e = c[d], g = baidu.g(this._getBoxId(e)), this._updateCBChild(e.id, b), g && (g.checked = b), b ? this.value[e.id] = 1 : delete this.value[e.id]
    }
  }
}, _updateCBParent:function(a, b) {
  var c = baidu.g(this._getBoxId(this._dataMap[a])).parentNode.parentNode.parentNode.parentNode.parentNode, d, e, g, h, i;
  if(c && "UL" == c.tagName && (d = c.getAttribute("value"))) {
    c = this._dataMap[d];
    e = c.children;
    g = e instanceof Array && e.length;
    for(h = !0;g--;) {
      if(i = baidu.g(this._getBoxId(e[g])), !i.checked) {
        h = !1;
        break
      }
    }
    baidu.g(this._getBoxId(c)).checked = h;
    !b && (this.value[d] = !!h)
  }
  d && this._updateCBParent(d)
}, getValue:function() {
  return this.value
}, resetValue:function(a) {
  this.value = a || baidu.object.clone(this.catchValue);
  this.main.innerHTML = this._getMainHtml()
}, getItemData:function(a) {
  return this._dataMap[a]
}, getItemId:function(a) {
  baidu.lang.hasValue(a.id) || (a.id = ui.TreeView._generateId());
  return a.id
}, _getBoxId:function(a) {
  return this.getId() + "treenode" + a.id
}, dispose:function() {
  this.main && (this.main.onclick = null, this.main.onmouseover = null, this.main.onmouseout = null);
  ui.TreeView.superClass.dispose.call(this)
}};
var map$$inline_44 = {};
ui.TreeView._generateId = function(a) {
  for(var b = a = a || 10, c = "";b--;) {
    c += "qwertyuiopasdfghjklzxcvbnm".charAt(Math.floor(26 * Math.random()))
  }
  if(map$$inline_44[c]) {
    return ui.TreeView._generateId(a)
  }
  map$$inline_44[c] = 1;
  return c
};
baidu.inherits(ui.TreeView, ui.Control);
ui.Panel = function(a) {
  ui.Control.call(this, a);
  this.type = "panel"
};
ui.Panel.prototype.setContent = function(a) {
  this.main.innerHTML = a
};
baidu.inherits(ui.Panel, ui.Control);
ui.SearchTree = function(a) {
  ui.InputControl.call(this, a);
  this.type = "searchtree";
  this.view = "UISearchTree";
  this.__initOption("title", null, "TITLE")
};
ui.SearchTree.NO_DATA_HTML = "<div class='no-tree-search-data'>\u6ca1\u627e\u5230\u5339\u914d\u9879</div>";
ui.SearchTree.prototype = {tpl:"\u5171\u6709\u7ed3\u679c{0}\u6761", onchange:new Function, _renderSearchTree:function(a, b) {
  this.c("tree").rebindModel({datasource:a, collapsed:b || 99})
}, onresponse:baidu.fn.blank, _searchTree:function(a, b) {
  var c = this, d = c.c("searchInfo"), e = c.c("tree")._selected;
  a ? c.treeRequester("keyword=" + encodeURIComponent(a), function(g) {
    d.rebindModel({text:a});
    c.keyword = a;
    c.c("pnlResult").show();
    c._renderSearchTree(g.result);
    c.onresponse(g);
    c.c("tree").select(e, !0);
    c.c("pnlResult").setContent(baidu.format(c.tpl, c.getSearchNum(g.result, a, 0)));
    b && b.call(this, g)
  }) : c.reset(b)
}, reloadTree:function(a) {
  this._searchTree(this.getKeyword(), a)
}, reset:function(a) {
  var b = this, c = b.c("tree")._selected;
  b.c("search").setValue("");
  b.keyword = "";
  b.c("pnlResult").hide();
  b.treeRequester("keyword=", function(d) {
    b._renderSearchTree(d.result, 1);
    b.c("tree").select(c, !0);
    b.onresponse(d);
    a && a.call(this, d)
  })
}, getItemHtml:function(a) {
  return baidu.format('<span class="{0}{2}">{1}</span>', a.state ? this.getClass("node-") + a.state : "", baidu.string.wbr(a.text), a.click ? "" : " " + this.getClass("node-noclick"))
}, bindModel:function(a) {
  ui.SearchTree.superClass.bindModel.call(this, a);
  this.c("tree").bindModel({datasource:this.treeDatasource, collapsed:this.collapsed, iconDepth:this.iconDepth, clickExpand:this.clickExpand, expandSelected:this.expandSelected, getItemHtml:this.getItemHtml, value:this.value, showChildNum:this.showChildNum});
  this.c("searchInfo").bindModel({text:this.keyword || "", template:this.infoTemplate ? this.infoTemplate : "\u641c\u7d22\u6587\u5b57\u201c<strong>{0}</strong>\u201d"});
  this.c("search").bindModel({treeKeyword:this.keyword || "", placeholder:this.placeholder})
}, render:function(a) {
  this._isRender || (ui.SearchTree.superClass.render.call(this, a), this.isRender = 1)
}, bindEvent:function() {
  ui.SearchTree.superClass.bindEvent.call(this);
  this.c("search").onsearch = baidu.fn.bind(this._searchTree, this);
  this.c("tree").onchange = this._getTreeChangeHandler();
  this.c("searchInfo").onclose = this._getSearchInfoCloseHandler()
}, _getTreeChangeHandler:function() {
  var a = this;
  return function(b, c) {
    if(a.c("searchInfo").isHidden() || a._hasKeyword(c)) {
      return a.onchange(b, c)
    }
  }
}, _hasKeyword:function(a) {
  return-1 < a.text.toLowerCase().indexOf(this.keyword.toLowerCase()) || a.parentId != a.id && this._hasKeyword(this.c("tree").getItemData(a.parentId)) ? !0 : !1
}, getSearchNum:function(a, b, c) {
  var d = this;
  baidu.each(a.children, function(a) {
    -1 < a.text.indexOf(b) && c++;
    a.children && 0 < a.children.length && (c = d.getSearchNum(a, b, c))
  });
  return c
}, _getSearchInfoCloseHandler:function() {
  var a = this;
  return function() {
    a._searchTree("")
  }
}, triggerClick:function(a, b) {
  this.c("tree").triggerClick(a, b)
}, getKeyword:function() {
  return this.keyword || ""
}, dispose:function() {
  ui.SearchTree.superClass.dispose.call(this)
}};
baidu.inherits(ui.SearchTree, ui.InputControl);
ui.Pager = function(a) {
  ui.Control.call(this, a);
  this.type = "pager";
  this.__initOption("prevText", null, "PREV_TEXT");
  this.__initOption("nextText", null, "NEXT_TEXT");
  this.__initOption("omitText", null, "OMIT_TEXT");
  this.showCount = parseInt(this.showCount, 10) || ui.Pager.SHOW_COUNT
};
ui.Pager.SHOW_COUNT = 5;
ui.Pager.OMIT_TEXT = "\u2026";
ui.Pager.NEXT_TEXT = '<span class="ui-pager-pntext">\u4e0b\u4e00\u9875</span><span class="ui-pager-icon"></span>';
ui.Pager.PREV_TEXT = '<span class="ui-pager-icon"></span><span class="ui-pager-pntext">\u4e0a\u4e00\u9875</span>';
ui.Pager.prototype = {getPage:function() {
  return this.page + 1
}, render:function(a) {
  ui.Pager.superClass.render.call(this, a);
  this.total = parseInt(this.total, 10) || 0;
  this.page = parseInt(this.page, 10) || 0;
  this._renderPages()
}, _tplMain:"<ul>{0}</ul>", _tplItem:'<li onclick="{2}" onmouseover="{3}" onmouseout="{4}" class="{1}">{0}</li>', _renderPages:function() {
  var a = [], b = this.total, c = b - 1, d = this.page - 1, e = this.getClass("item"), g = this.getClass("disabled"), h = this.getClass("prev"), i = this.getClass("next"), j = this._getInfoHtml(this.omitText, this.getClass("omit")), k;
  if(0 >= b) {
    this.main.innerHTML = ""
  }else {
    k = d < this.showCount - 1 ? 0 : d > b - this.showCount ? b - this.showCount : d - Math.floor(this.showCount / 2);
    0 > k && (k = 0);
    0 < d ? a.push(this._getItemHtml(this.prevText, h, this.getStrCall("select", d - 1))) : a.push(this._getInfoHtml(this.prevText, h + " " + g));
    0 < k && a.push(this._getItemHtml(1, e, this.getStrCall("select", 0)), j);
    for(h = 0;h < this.showCount && k + h < b;h++) {
      k + h != d ? a.push(this._getItemHtml(1 + k + h, e, this.getStrCall("select", k + h))) : a.push(this._getInfoHtml(1 + k + h, e + " " + this.getClass("selected")))
    }
    k < b - this.showCount && a.push(j, this._getItemHtml(b, e, this.getStrCall("select", c)));
    d < c ? a.push(this._getItemHtml(this.nextText, i, this.getStrCall("select", d + 1))) : a.push(this._getInfoHtml(this.nextText, i + " " + g));
    this.main.innerHTML = baidu.format(this._tplMain, a.join(""))
  }
}, _getItemHtml:function(a, b, c) {
  var d = this.getStrRef();
  return baidu.format(this._tplItem, a, b, c, d + "._itemOverHandler(this)", d + "._itemOutHandler(this)")
}, _getInfoHtml:function(a, b) {
  return baidu.format(this._tplItem, a, b, "", "", "")
}, onselect:new Function, select:function(a) {
  a++;
  !1 !== this.onselect(a) && (this.page = a, this._renderPages())
}, _itemOverHandler:function(a) {
  baidu.addClass(a, this.getClass("hover"))
}, _itemOutHandler:function(a) {
  baidu.removeClass(a, this.getClass("hover"))
}};
baidu.inherits(ui.Pager, ui.Control);
ui.Table = function(a) {
  ui.Control.call(this, a);
  this.type = "table";
  if(a = this.viewColumnCount) {
    this.viewColumnCount = parseInt(a, 10)
  }
  this._events = this._events || [];
  this.__initOption("noDataHtml", null, "NODATA_HTML");
  this.__initOption("followHead", null, "FOLLOW_HEAD");
  this.__initOption("sortable", null, "SORTABLE");
  this.__initOption("dragable", null, "DRAGABLE");
  this.__initOption("lockable", null, "LOCKABLE");
  this.__initOption("ellipsis", null, "ELLIPSIS");
  this.__initOption("rowWidthOffset", null, "ROW_WIDTH_OFFSET");
  this.__initOption("subEntryOpenTip", null, "SUBENTRY_OPEN_TIP");
  this.__initOption("subEntryCloseTip", null, "SUBENTRY_CLOSE_TIP");
  this.__initOption("subEntryWidth", null, "SUBENTRY_WIDTH");
  this._followHeightArr = [0, 0];
  this._followWidthArr = []
};
ui.Table.NODATA_HTML = '<div class="ui-table-list-nodata">\u672a\u627e\u5230\u7b26\u5408\u6761\u4ef6\u7684\u7ed3\u679c\uff01</div>';
ui.Table.FOLLOW_HEAD = 0;
ui.Table.SORTABLE = 0;
ui.Table.DRAGABLE = 0;
ui.Table.LOCKABLE = 0;
ui.Table.ELLIPSIS = 0;
ui.Table.ROW_WIDTH_OFFSET = -1;
ui.Table.SUBENTRY_OPEN_TIP = "\u70b9\u51fb\u5c55\u5f00";
ui.Table.SUBENTRY_CLOSE_TIP = "\u70b9\u51fb\u6536\u8d77";
ui.Table.SUBENTRY_WIDTH = 18;
ui.Table.prototype = {_initFields:function() {
  if(this.fields) {
    for(var a = this.fields.slice(0), b = a.length;b--;) {
      a[b] || a.splice(b, 1)
    }
    this._fields = a;
    if(this.select) {
      switch(this.select.toLowerCase()) {
        case "multi":
          a[0].isFirst ? (this.FIELD_MULTI_SELECT.extraAttrs = a[0].extraAttrs, a.shift()) : this.FIELD_MULTI_SELECT.extraAttrs = function() {
            return[]
          };
          a.unshift(this.FIELD_MULTI_SELECT);
          break;
        case "single":
          a.unshift(this.FIELD_SINGLE_SELECT)
      }
    }
  }
}, getBody:function() {
  return baidu.g(this.getId("body"))
}, getHead:function() {
  return baidu.g(this.getId("head"))
}, getFoot:function() {
  return baidu.g(this.getId("foot"))
}, _getRow:function(a) {
  return baidu.g(this.getId("row") + a)
}, _getHeadCheckbox:function() {
  return baidu.g(this.getId("selectAll"))
}, _getWidth:function() {
  if(this.width) {
    return this.width
  }
  var a, b = document.createElement("div"), c = this.main.parentNode;
  c.appendChild(b);
  a = b.offsetWidth;
  c.removeChild(b);
  return a
}, _tplTablePrefix:'<table cellpadding="0" cellspacing="0" width="{0}" controlTable="{1}">', appendTo:function(a) {
  var b = document.createElement("div");
  a.appendChild(b);
  this.render(b)
}, _caching:function() {
  this.followHead && this._cachingFollowHead()
}, _cachingFollowHead:function() {
  var a = this._followDoms;
  if(!a) {
    this._followDoms = a = [];
    for(var b = this.main.parentNode.firstChild, c, d, e = this._followWidthArr, g = this._followHeightArr, h = this._sxHandle ? this._sxHandle.offsetHeight : 0;b;) {
      1 == b.nodeType && b.getAttribute("followThead") && a.push(b), b = b.nextSibling
    }
    var i = function(a, b) {
      var c = baidu.dom.getStyle(a, b);
      return"" == c ? 0 : +c.replace("px", "")
    };
    c = g[0] = 0;
    for(d = a.length;c < d;c++) {
      b = a[c], e[c] = i(b, "padding-left") + i(b, "padding-right"), g[c + 1] = g[c] + b.offsetHeight
    }
    g[c + 1] = g[c] + h;
    g.lenght = c + 2
  }
  this.refreshFollowTop()
}, refreshFollowTop:function() {
  this._followTop = baidu.dom.getPosition((this._followDoms ? this._followDoms[0] : !1) || this.main).top
}, getFollowTop:function() {
  return this.followHead ? this._followTop : 0
}, setFollowTop:function(a) {
  this.followHead && (this._followTop = a)
}, render:function(a) {
  var b, c;
  b = a || this.main;
  a = !1;
  ui.Table.superClass.render.call(this, b);
  this._initFields();
  if(this._fields) {
    this._isRender || this._initMinColsWidth();
    b = this.main;
    "multi" === this.select && (this.selection = []);
    this._subrowIndex = null;
    this._width = this._getWidth();
    b.style.width = this._width + "px";
    if(this._rawColsWidth && 0 < (c = this._rawColsWidth.length)) {
      if(!0 === this._fields[0].select && (30 === this._fields[0].width && 30 !== this._colsWidth[0]) && (this._rawColsWidth.unshift(this._fields[0].width), c = this._rawColsWidth.length, a = !0), !this._isRender) {
        for(b = 0;b < c;b++) {
          this._colsWidth[b] = this._rawColsWidth[b]
        }
      }
    }else {
      this._initColsWidth()
    }
    this.stopEdit();
    this._renderXScroll();
    this._renderHead();
    this._renderBody();
    this._renderFoot();
    if(this._isRender) {
      switch(this.select) {
        case "multi":
          this.onselect(this.selection)
      }
    }else {
      this._caching(), this._initResizeHandler(), this._initTopResetHandler(), this._isRender = 1
    }
    (this._width != this._getWidth() || !0 === a) && this._handleResize();
    this.trigger(ui.events.AFTER_RENDER);
    this.trigger(ui.events.AFTER_COLUMN_RESIZE)
  }
}, bindEvent:function() {
  ui.Table.superClass.bindEvent.call(this);
  this.registerListener(ui.events.CANVAS_CHANGE, this.refreshView)
}, onselect:new Function, _initMinColsWidth:function() {
  var a = this._fields, b = a.length, c = [], d, e, g;
  if(this.noHead) {
    for(g = 0;g < b;g++) {
      c[g] = 40
    }
  }else {
    for(g = 0;g < b;g++) {
      d = a[g], e = d.minWidth, !e && !d.breakLine && (e = 13 * a[g].title.length + 20), c[g] = e
    }
  }
  this._minColsWidth = c
}, _initColsWidth:function() {
  var a = this._fields, b = a.length, c = this._rawColsWidth, d = c instanceof Array && c.length, e = [], g, h, i, j = 0, k;
  this._colsWidth = [];
  g = this._width - 1;
  j = this.viewColumnCount ? Math.min(this.viewColumnCount, b) : b;
  for(k = 0;k < b;k++) {
    h = a[k], i = h.width, i = c && d > k ? c[k] : i ? parseInt(i, 10) : 0, this._colsWidth.push(i), k < j && (g -= i, h.stable || e.push(k))
  }
  b = e.length;
  a = Math.round(g / b);
  for(k = 0;k < b;k++) {
    c = e[k], d = Math.abs(g) < Math.abs(a) ? g : a, g -= d, this._colsWidth[c] += d, d = this._minColsWidth[c], d > this._colsWidth[c] && (g += this._colsWidth[c] - d, this._colsWidth[c] = d)
  }
  if(0 > g) {
    for(k = 0;k < b && 0 != g;) {
      c = e[k], d = this._minColsWidth[c], d < this._colsWidth[c] && (d = this._colsWidth[e[k]] - d, d = d > Math.abs(g) ? g : -d, g += Math.abs(d), this._colsWidth[c] += d), k++
    }
  }else {
    0 < g && (this._colsWidth[e[0]] += g)
  }
  this._rawColsWidth = [];
  k = i = 0;
  for(b = this._colsWidth.length;k < b;k++) {
    i += this._colsWidth[k], this._rawColsWidth[k] = this._colsWidth[k], k >= this.viewColumnCount && (this._colsWidth[k] = 0)
  }
  this._totalWidth = i
}, _renderXScroll:function() {
  this.allowXScroll && (this._sxHandle || (this._sxHandle = document.createElement("div"), this._sxHandle.className = this.getClass("scroll-x"), this._sxContent = document.createElement("div"), this._sxContent.style.fontSize = "1px", this._sxContent.innerHTML = "&nbsp;", this._sxHandle.appendChild(this._sxContent), this.main.appendChild(this._sxHandle), this._sxHandle.onscroll = this._getXScrollHandler()), this._sxContent.style.width = this._totalWidth + "px", this._repaintXScroll())
}, _repaintXScroll:function() {
  if(this.allowXScroll) {
    var a = this._sxHandle, b = this._sxContent, c = this._followHeightArr, d = c.length, e = c[d - 2];
    a.style.width = this._width + "px";
    b.style.width = this._totalWidth + "px";
    this._width >= this._totalWidth ? baidu.dom.hide(a) : (baidu.dom.show(a), e += a.offsetHeight);
    c[d - 1] = e;
    a.scrollLeft = 0
  }
}, _getXScrollHandler:function() {
  var a = this;
  return function() {
    var b = a._fields, c = a._sxHandle.scrollLeft, d = c, e = b.length, g = a._rawColsWidth, h = a._colsWidth = g.slice(0), i;
    for(i = e - 1;0 <= i && !b[i].locked;i--) {
    }
    for(i += 1;i < e;i++) {
      if(b = g[i], b > c) {
        h[i] = b - c;
        break
      }else {
        c -= b, h[i] = 0
      }
    }
    for(i = Math.max(i + 1, a.viewColumnCount);i < e;i++) {
      if(b = g[i], b >= d) {
        h[i] = d;
        d = 0;
        break
      }else {
        h[i] = b, d -= b
      }
    }
    0 < d && (h[i] += d);
    for(i += 1;i < e;i++) {
      h[i] = 0
    }
    a._resetColumns()
  }
}, _renderFoot:function() {
  var a = this.getId("foot"), b = baidu.g(a);
  this.foot instanceof Array ? (b || (b = document.createElement("div"), b.id = a, b.className = this.getClass("foot"), b.setAttribute("controlTable", this.id), this.main.appendChild(b)), b.style.display = "", b.style.width = this._width + "px", b.innerHTML = this._getFootHtml()) : b && (b.style.display = "none")
}, _getFootHtml:function() {
  var a = [], b = this.foot, c = b.length, d = 0, e = this._colsWidth, g = this.getClass("fcell"), h = this.getClass("fcell-text"), i, j, k, n, o, l, m;
  a.push(baidu.format(this._tplTablePrefix, "100%", this.id));
  for(i = 0;i < c;i++) {
    n = b[i];
    j = e[d];
    o = n.colspan || 1;
    l = [g];
    m = n.content;
    "function" == typeof m && (m = m.call(this));
    for(k = 1;k < o;k++) {
      j += e[d + k]
    }
    d += o;
    n.align && l.push(this.getClass("cell-align-" + n.align));
    j += this.rowWidthOffset;
    0 > j && (j = 0);
    a.push('<th id="' + this._getFootCellId(i) + '" class="' + l.join(" ") + '"', ' style="width:' + j + "px;", (j ? "" : "display:none;") + '">', '<div class="' + h + '">', m, "</div></th>")
  }
  a.push("</tr></table>");
  return a.join("")
}, _renderHead:function() {
  var a = this.getId("head"), b = baidu.g(a);
  this.noHead || (b || (b = document.createElement("div"), b.id = a, b.className = this.getClass("head"), b.setAttribute("controlTable", this.id), this.dragable && (b.onmousemove = this._getHeadMoveHandler(), b.onmousedown = this._getDragStartHandler()), this.main.appendChild(b)), b.style.width = this._width + "px", b.innerHTML = this._getHeadHtml())
}, _getHeadHtml:function() {
  var a = this._fields, b = a.length, c = [], d, e, g, h, i, j = this.getClass("hcell"), k = this.getClass("hcell-text"), n = this.getClass("cell-break"), o = this.getClass("hsort"), l = this.getClass("hcell-sel");
  this.getClass("hhelp");
  var m, q, r, p;
  for(d = 0;d < b;d++) {
    if(!a[d].stable) {
      h = d;
      break
    }
  }
  for(d = b - 1;0 <= d;d--) {
    if(!a[d].stable) {
      i = d;
      break
    }
  }
  c.push(baidu.format(this._tplTablePrefix, "100%", this.id));
  c.push("<tr>");
  for(d = 0;d < b;d++) {
    p = [j], e = a[d], g = e.title, r = (q = this.sortable && e.sortable) && e.field && e.field == this.orderBy, m = "", q && (p.push(this.getClass("hcell-sort")), r && p.push(this.getClass("hcell-" + this.order)), m = baidu.format(this._tplSortIcon, o)), e.align && p.push(this.getClass("cell-align-" + e.align)), (ui.Table.BREAK_LINE || this.breakLine || e.breakLine) && p.push(n), g = "function" == typeof g ? g.call(this) : g || "", c.push('<th id="' + this._getTitleCellId(d) + '" index="' + d + 
    '"', ' class="' + p.join(" ") + '"', this.sortable && e.sortable ? baidu.format(' onmouseover="{0}" onmouseout="{1}" onclick="{2}" sortable="1"', this.getStrRef() + "._titleOverHandler(this)", this.getStrRef() + "._titleOutHandler(this)", this.getStrRef() + "._titleClickHandler(this)") : "", d >= h && d < i && e.dragable ? ' dragright="1"' : "", d <= i && d > h && e.dragable ? ' dragleft="1"' : "", ' style="width:' + (this._colsWidth[d] + this.rowWidthOffset) + "px;", (this._colsWidth[d] ? "" : 
    "display:none") + '">', '<div class="' + k + (e.select ? " " + l : "") + '">', g, m, void 0, "</div></th>")
  }
  c.push("</tr></table>");
  return c.join("")
}, _tplSortIcon:'<div class="{0}"></div>', _tplTipIcon:'<div class="{0}" {1}></div>', _getTitleCellId:function(a) {
  return this.getId("titleCell") + a
}, _getFootCellId:function(a) {
  return this.getId("footCell") + a
}, _titleOverHandler:function(a) {
  !this._isDraging && !this._dragReady && (this._sortReady = 1, baidu.addClass(a.firstChild, this.getClass("hcell-hover")))
}, _titleOutHandler:function(a) {
  this._sortReady = 0;
  baidu.removeClass(a.firstChild, this.getClass("hcell-hover"))
}, onsort:new Function, _titleClickHandler:function(a) {
  if(this._sortReady) {
    var a = this._fields[a.getAttribute("index")], b = this.order, b = this.orderBy == a.field ? !b || "asc" == b ? "desc" : "asc" : "desc";
    this.onsort(a, b);
    this.order = b;
    this.orderBy = a.field;
    this._renderHead();
    this.trigger(ui.events.AFTER_SORT)
  }
}, _getHeadMoveHandler:function() {
  var a = this, b = a.getClass("startdrag");
  return function(c) {
    if(!a._isDraging) {
      var c = c || window.event, d = c.srcElement || c.target, e = baidu.page, c = c.pageX || c.clientX + e.getScrollLeft(), g;
      if(d = a._findDragCell(d)) {
        e = baidu.dom.getPosition(d), d.getAttribute("index"), g = d.getAttribute("sortable"), d.getAttribute("dragleft") && 8 > c - e.left ? (g && a._titleOutHandler(d), baidu.addClass(this, b), a._dragPoint = "left", a._dragReady = 1) : d.getAttribute("dragright") && 8 > e.left + d.offsetWidth - c ? (g && a._titleOutHandler(d), baidu.addClass(this, b), a._dragPoint = "right", a._dragReady = 1) : (baidu.removeClass(this, b), g && a._titleOverHandler(d), a._dragPoint = "", a._dragReady = 0)
      }
    }
  }
}, _findDragCell:function(a) {
  for(;1 == a.nodeType;) {
    if("TH" == a.tagName) {
      return a
    }
    a = a.parentNode
  }
  return null
}, _getDragStartHandler:function() {
  var a = this, b = a.getClass("startdrag");
  return function(c) {
    var c = c || window.event, d = c.target || c.srcElement;
    if((d = a._findDragCell(d)) && !(0 > baidu.g(a.getId("head")).className.indexOf(b))) {
      return a._htmlHeight = document.documentElement.clientHeight, a._isDraging = !0, a._dragIndex = d.getAttribute("index"), a._dragStart = c.pageX || c.clientX + baidu.page.getScrollLeft(), document.onmousemove = a._getDragingHandler(), document.onmouseup = a._getDragEndHandler(), a._showDragMark(a._dragStart), baidu.event.preventDefault(c), !1
    }
  }
}, _getDragingHandler:function() {
  var a = this;
  return function(b) {
    b = b || window.event;
    a._showDragMark(b.pageX || b.clientX + baidu.page.getScrollLeft());
    baidu.event.preventDefault(b);
    return!1
  }
}, _showDragMark:function(a) {
  var b = this._getDragMark();
  this.top || (this.top = baidu.dom.getPosition(this.main).top);
  b || (b = this._createDragMark());
  b.style.top = this.top + "px";
  b.style.left = a + "px";
  b.style.height = this._htmlHeight - this.top + baidu.page.getScrollTop() + "px"
}, _hideDragMark:function() {
  var a = this._getDragMark();
  a.style.left = "-10000px";
  a.style.top = "-10000px"
}, _createDragMark:function() {
  var a = document.createElement("div");
  a.id = this.getId("dragMark");
  a.className = this.getClass("mark");
  a.style.top = "-10000px";
  a.style.left = "-10000px";
  document.body.appendChild(a);
  return a
}, _getDragMark:function() {
  return baidu.g(this.getId("dragMark"))
}, _getDragEndHandler:function() {
  var a = this;
  return function(b) {
    var b = b || window.event, c, d = parseInt(a._dragIndex, 10), e = b.pageX || b.clientX + baidu.page.getScrollLeft(), g = a._fields, h = g.length, i = [], j = [], k, n = 0, o = a._colsWidth, l, m, q = 0, r;
    "left" == a._dragPoint && d--;
    c = a._minColsWidth[d];
    e -= a._dragStart;
    r = o[d] + e;
    r < c && (e += c - r, r = c);
    for(m = d + 1;m < h;m++) {
      !g[m].stable && 0 < o[m] && (i.push(m), k = o[m], j.push(k), n += k)
    }
    l = e;
    h = i.length;
    for(m = 0;m < h;m++) {
      g = i[m], k = j[m], c = e * k / n, c = 0 < l ? Math.ceil(c) : Math.floor(c), c = Math.abs(c) < Math.abs(l) ? c : l, k -= c, l -= c, c = a._minColsWidth[g], k < c && (q += c - k, k = c), o[g] = k
    }
    o[d] = r - q;
    a._resetColumns();
    document.onmousemove = null;
    document.onmouseup = null;
    a._isDraging = !1;
    a._hideDragMark();
    baidu.event.preventDefault(b);
    return!1
  }
}, _renderBody:function() {
  var a = this.getId("body"), b = baidu.g(a);
  b || (b = document.createElement("div"), b.id = a, b.className = this.getClass("body"), this.bodyHeight && (a = b.style, a.height = this.bodyHeight + "px", a.overflowX = "hidden", a.overflowY = "auto"), this.main.appendChild(b));
  b.style.width = this._width + "px";
  b.innerHTML = this._getBodyHtml()
}, _getBodyHtml:function() {
  var a = this.datasource || [], b = a.length, c = [], d, e;
  if(!b) {
    return this.noDataHtml
  }
  for(d = 0;d < b;d++) {
    e = a[d], c[d] = this._getRowHtml(e, d)
  }
  return c.join("")
}, _tplRowPrefix:'<div id="{0}" class="{1}" onmouseover="{2}" onmouseout="{3}" onclick="{4}">', _getBodyCellId:function(a, b) {
  return this.getId("cell") + a + "_" + b
}, _getRowHtml:function(a, b) {
  var c = [], d = this.getClass("cell"), e = this.getClass("cell-break"), g = this.getClass("cell-text"), h = this._fields, i = h.length, j, k, n, o, l = this.subrow && "false" != this.subrow, m, q, r, p, s;
  c.push(baidu.format(this._tplRowPrefix, this.getId("row") + b, this.getClass("row"), this.getStrCall("_rowOverHandler", b), this.getStrCall("_rowOutHandler", b), "line" == this.selectMode ? this.getStrCall("_rowClickHandler", b) : ""), baidu.format(this._tplTablePrefix, "100%", this.id));
  for(p = 0;p < i;p++) {
    n = [d];
    o = [g];
    s = h[p];
    k = s.content;
    j = this._colsWidth[p];
    m = l && s.subEntry;
    q = this.editable && s.editable && s.edittype;
    r = !!s.native_ellipsis;
    (ui.Table.BREAK_LINE || this.breakLine || s.breakLine) && n.push(e);
    q && o.push(this.getClass("cell-editable"));
    s.select && o.push(this.getClass("cell-sel"));
    s.align && n.push(this.getClass("cell-align-" + s.align));
    s.field && s.field == this.orderBy && n.push(this.getClass("cell-sorted"));
    r && o.push(this.getClass("cell-ellipsis"));
    o = '<div class="' + o.join(" ") + '">' + ("function" == typeof k ? k.call(this, a, b, p) : a[k]) + this._getEditEntryHtml(s, b, p) + "</div>";
    k = "&nbsp;";
    if(m) {
      if("function" != typeof s.isSubEntryShow || !1 !== s.isSubEntryShow.call(this, a, b, p)) {
        k = this._getSubEntryHtml(b)
      }
      n.push(this.getClass("subentryfield"));
      o = '<table width="100%" collpadding="0" collspacing="0"><tr><td width="' + this.subEntryWidth + '" align="right">' + k + "</td><td>" + o + "</td></tr></table>"
    }
    c.push('<td id="' + this._getBodyCellId(b, p) + '"', 'class="' + n.join(" ") + '"', ' style="width:' + (j + this.rowWidthOffset) + "px;", j ? "" : "display:none", '" controlTable="' + this.id, '" row="' + b + '" col="' + p + '">', o, "</td>")
  }
  c.push("</tr></table></div>");
  l && c.push(this._getSubrowHtml(b));
  return c.join("")
}, _getEditEntryHtml:function(a, b, c) {
  var d = a.edittype;
  return this.editable && a.editable && d ? '<div class="' + this.getClass("cell-editentry") + '" onclick="' + this.getStrCall("startEdit", d, b, c) + '"></div>' : ""
}, _rowOverHandler:function(a) {
  this._isDraging || (a = this._getRow(a)) && baidu.addClass(a, this.getClass("row-hover"))
}, _rowOutHandler:function(a) {
  (a = this._getRow(a)) && baidu.removeClass(a, this.getClass("row-hover"))
}, preventLineSelect:function() {
  this._dontSelectLine = 1
}, _rowClickHandler:function(a) {
  if("line" == this.selectMode) {
    if(this._dontSelectLine) {
      this._dontSelectLine = !1
    }else {
      var b;
      switch(this.select) {
        case "multi":
          b = baidu.g(this.getId("multiSelect") + a);
          baidu.lang.hasValue(this._preSelectIndex) || (b.checked = !b.checked);
          this._selectMulti(a);
          this._preSelectIndex = null;
          break;
        case "single":
          b = baidu.g(this.getId("singleSelect") + a), b.checked = !0, this._selectSingle(a)
      }
    }
  }
}, tplSubEntry:'<div class="{0}" onmouseover="{2}" onmouseout="{3}" onclick="{4}" id="{1}" title="{5}"></div>', _getSubEntryHtml:function(a) {
  return baidu.format(this.tplSubEntry, this.getClass("subentry"), this._getSubentryId(a), this.getStrCall("_entryOver", a), this.getStrCall("_entryOut", a), this.getStrCall("fireSubrow", a), this.subEntryOpenTip)
}, _getSubrowHtml:function(a) {
  return'<div id="' + this._getSubrowId(a) + '" class="' + this.getClass("subrow") + '" style="display:none"></div>'
}, getSubrow:function(a) {
  return baidu.g(this._getSubrowId(a))
}, _getSubrowId:function(a) {
  return this.getId("subrow") + a
}, _getSubentryId:function(a) {
  return this.getId("subentry") + a
}, _entryOver:function(a) {
  var a = baidu.g(this._getSubentryId(a)), b = "subentry-hover";
  /subentry-opened/.test(a.className) && (b = "subentry-opened-hover");
  baidu.addClass(a, this.getClass(b))
}, _entryOut:function(a) {
  a = this._getSubentryId(a);
  baidu.removeClass(a, this.getClass("subentry-hover"));
  baidu.removeClass(a, this.getClass("subentry-opened-hover"))
}, fireSubrow:function(a) {
  var b = this._subrowIndex, c = this.datasource, d = c instanceof Array && c.length;
  d && !(a >= d) && (b !== a ? (b = c[a], !1 !== this.onsubrowopen(a, b) && this.openSubrow(a)) : this._closeSubrow(b), this._entryOver(a))
}, _closeSubrow:function(a) {
  var b = this._getSubrowId(a), c = this._getSubentryId(a);
  this._entryOut(a);
  this._subrowIndex = null;
  baidu.removeClass(c, this.getClass("subentry-opened"));
  baidu.removeClass(this._getRow(a), this.getClass("row-unfolded"));
  baidu.hide(b);
  baidu.setAttr(c, "title", this.subEntryOpenTip);
  return!0
}, onsubrowopen:new Function, openSubrow:function(a) {
  var b = this._subrowIndex, c = baidu.g(this._getSubentryId(a));
  baidu.lang.hasValue(b) && this._closeSubrow(b);
  baidu.addClass(c, this.getClass("subentry-opened"));
  baidu.addClass(this._getRow(a), this.getClass("row-unfolded"));
  c.setAttribute("title", this.subEntryCloseTip);
  baidu.show(this._getSubrowId(a));
  this._subrowIndex = a
}, _initResizeHandler:function() {
  var a = this;
  a.viewWidth = baidu.page.getViewWidth();
  a.viewHeight = baidu.page.getViewHeight();
  a._resizeHandler = function() {
    var b = baidu.page.getViewWidth(), c = baidu.page.getViewHeight();
    b == a.viewWidth && c == a.viewHeight || (a.viewWidth = b, a.viewHeight = c, a._handleResize())
  };
  baidu.on(window, "resize", a._resizeHandler)
}, _handleResize:function() {
  var a = this.getHead(), b = this.getFoot(), c;
  this._width = this._getWidth();
  c = this._width + "px";
  this.main && (this.main.style.width = c);
  this.getBody() && (this.getBody().style.width = c);
  a && (a.style.width = c);
  b && (b.style.width = c);
  this._initColsWidth();
  this._resetColumns();
  if(this.followHead) {
    a = this.main.parentNode.firstChild;
    for(b = 0;a;) {
      1 == a.nodeType && a.getAttribute("followThead") && (a.style.width = this._width - this._followWidthArr[b++] + "px"), a = a.nextSibling
    }
  }
  this._repaintXScroll();
  this._topReseter && this._topReseter()
}, _initTopResetHandler:function() {
  if(this.followHead) {
    var a = this, b = a._sxHandle, c = a.getHead(), d = a._followWidthArr, e = a.getId("TopPlaceholder"), g = document.createElement("div"), h, i = a.getClass("head-shadow");
    g.id = e;
    g.style.width = "100%";
    g.style.display = "none";
    baidu.dom.insertBefore(g, b || a.main);
    g = null;
    g = 0;
    for(h = a._followDoms.length;g < h;g++) {
      a._followDoms[g].style.width = a._width - d[g] + "px"
    }
    b && (b.style.width = a._width + "px");
    c && (c.style.width = a._width + "px");
    a._topReseter = function() {
      function d(a, b, c) {
        a && (a.style.top = c + "px", a.style.position = b)
      }
      var g = baidu.page.getScrollTop(), h = a._followHeightArr, o = h.length, l = "", m = a._followDoms, q = m.length, r = baidu.g(e), p = 0;
      if(baidu.ie && 7 > baidu.ie) {
        if(g > a._followTop) {
          l = "absolute";
          r.style.height = h[o - 1] + c.offsetHeight + "px";
          r.style.display = "";
          for(baidu.dom.addClass(c, i);p < q;p++) {
            d(m[p], l, h[p] + g)
          }
          d(b, l, h[o - 2] + g);
          d(c, l, h[o - 1] + g)
        }else {
          r.style.height = 0;
          r.style.display = "none";
          l = "";
          for(baidu.dom.removeClass(c, i);p < q;p++) {
            d(m[p], l, 0)
          }
          d(b, l, 0);
          d(c, l, 0)
        }
      }else {
        if(g > a._followTop) {
          r.style.height = h[o - 1] + c.offsetHeight + "px";
          r.style.display = "";
          l = "fixed";
          for(baidu.dom.addClass(c, i);p < q;p++) {
            d(m[p], l, h[p])
          }
          d(b, l, h[o - 2]);
          d(c, l, h[o - 1])
        }else {
          r.style.height = 0;
          r.style.display = "none";
          l = "";
          for(baidu.dom.removeClass(c, i);p < q;p++) {
            d(m[p], l, 0)
          }
          d(b, l, 0);
          d(c, l, 0)
        }
      }
    };
    baidu.on(window, "scroll", a._topReseter)
  }
}, _resetColumns:function() {
  var a = this._colsWidth, b = this.foot, c = this.id, d = b instanceof Array && b.length, e = this.getBody().getElementsByTagName("td"), g = e.length, h, i, j, k, n;
  if(d) {
    for(j = n = 0;j < d;j++) {
      k = b[j];
      i = a[n];
      h = k.colspan || 1;
      for(k = 1;k < h;k++) {
        i += a[n + k]
      }
      n += h;
      h = baidu.g(this._getFootCellId(j));
      i += this.rowWidthOffset;
      0 > i && (i = 0);
      h.style.width = i + "px";
      h.style.display = i ? "" : "none"
    }
  }
  d = a.length;
  if(!this.noHead) {
    for(j = 0;j < d;j++) {
      i = a[j] + this.rowWidthOffset, 0 > i && (i = 0), h = baidu.g(this._getTitleCellId(j)), h.style.width = i + "px", h.style.display = i ? "" : "none"
    }
  }
  for(j = k = 0;j < g;j++) {
    h = e[j], h.getAttribute("controlTable") == c && (i = a[k % d] + this.rowWidthOffset, 0 > i && (i = 0), h.style.width = i + "px", h.style.display = i ? "" : "none", k++)
  }
  this.trigger(ui.events.AFTER_COLUMN_RESIZE)
}, getColumnsWidth:function() {
  return this._colsWidth
}, FIELD_MULTI_SELECT:{width:30, stable:!0, select:!0, locked:!0, dragable:!1, title:function() {
  return'<input type="checkbox" id="' + this.getId("selectAll") + '" onclick="' + this.getStrCall("_toggleSelectAll") + '">'
}, extraAttrs:function() {
  return[]
}, content:function(a, b) {
  var c = !1;
  if(this.valueField && baidu.lang.isArray(this.selectedValue)) {
    for(var d = 0;d < this.selectedValue.length;d++) {
      if(a[this.valueField] === this.selectedValue[d]) {
        this.selection.push(a);
        c = !0;
        break
      }
    }
  }
  return'<input type="checkbox" id="' + this.getId("multiSelect") + b + '" onclick="' + this.getStrCall("_rowCheckboxClick", b) + '"' + ((this.FIELD_MULTI_SELECT.extraAttrs(a, b) || []).join(" ") || "") + (c ? 'checked="checked"' : "") + ">"
}}, FIELD_SINGLE_SELECT:{width:30, stable:!0, title:"&nbsp;", select:!0, locked:!0, content:function(a, b) {
  var c = this.getId("singleSelect"), d = !1;
  this.valueField && a[this.valueField] === this.selectedValue && (this.selection = a, d = !0);
  return'<input type="radio" id="' + c + b + '" name=' + c + ' onclick="' + this.getStrCall("_selectSingle", b) + '"' + (d ? 'checked="checked"' : "") + ">"
}}, _rowCheckboxClick:function(a) {
  var b = baidu.g(this.getId("multiSelect") + a);
  "line" != this.selectMode ? this._selectMulti(a) : this._preSelectIndex = a;
  this.onCheckboxClick(a, b.checked)
}, onCheckboxClick:function() {
}, _selectMulti:function(a) {
  for(var b = this.getBody().getElementsByTagName("input"), c = 0, d = 0, e = !0, g = b.length, h = this._getHeadCheckbox(), i = [], j = this.getClass("row-selected"), k = this.getId("multiSelect"), n = !baidu.lang.hasValue(a), o, l, m;c < g;c++) {
    if(o = b[c], l = o.id, "checkbox" == o.getAttribute("type") && l && 0 <= l.indexOf(k)) {
      if(!o.disabled) {
        if(n) {
          for(m = o.parentNode;!("DIV" == m.tagName && /^ui-table-row/.test(m.className));) {
            m = m.parentNode
          }
        }
        o.checked ? (i.push(this.datasource[d]), n && baidu.addClass(m, j)) : (e = !1, n && baidu.removeClass(m, j))
      }
      d++
    }
  }
  this.selection = i;
  this.onselect(this.selection);
  n || (m = this._getRow(a), o = baidu.g(k + a), o.checked ? baidu.addClass(m, j) : baidu.removeClass(m, j));
  h.checked = e
}, _toggleSelectAll:function() {
  this._selectAll(this._getHeadCheckbox().checked)
}, _selectAll:function(a) {
  for(var b = this.getBody().getElementsByTagName("input"), c = b.length, d = 0, e = 0, g = [], h = this.getClass("row-selected"), i = this.getId("multiSelect"), j, k;d < c;d++) {
    j = b[d], k = j.id, "checkbox" == j.getAttribute("type") && (k && 0 <= k.indexOf(i)) && (b[d].disabled || ((b[d].checked = a) ? (g.push(this.datasource[e]), baidu.addClass(this._getRow(e), h)) : baidu.removeClass(this._getRow(e), h)), this.onCheckboxClick(e, j.checked), e++)
  }
  this.selection = g;
  this.onselect(this.selection)
}, selectRow:function(a, b) {
  var c = this.getBody().getElementsByTagName("input")[a], d = this.getClass("row-selected"), e = this.getId("multiSelect"), g = c.id;
  "checkbox" == c.getAttribute("type") && (g && 0 <= g.indexOf(e) && !c.disabled) && (b && !c.checked ? (c.checked = !0, this.selection.push(this.datasource[a]), baidu.addClass(this._getRow(a), d)) : !b && c.checked && (c.checked = !1, baidu.array.remove(this.selection, this.datasource[a]), baidu.removeClass(this._getRow(a), d), this._getHeadCheckbox().checked = !1));
  this.onselect(this.selection)
}, _selectSingle:function(a) {
  var b = this.getClass("row-selected"), c = this._selectedIndex;
  this.selection = this.datasource[a];
  !1 !== this.onselect(this.selection) && ("number" == typeof c && baidu.removeClass(this._getRow(c), b), this._selectedIndex = a, baidu.addClass(this._getRow(a), b))
}, clearSelected:function() {
  switch(this.select) {
    case "multi":
      this._selectAll(!1);
      break;
    case "single":
      var a = this.getClass("row-selected"), b = this._selectedIndex;
      this.selection = null;
      "number" == typeof b && (baidu.g(this.getId("singleSelect") + b).checked = !1, baidu.removeClass(this._getRow(b), a));
      this._selectedIndex = null
  }
}, resetHeadStyle:function() {
  for(var a = this.getHead().getElementsByTagName("th"), b = a.length, c;b--;) {
    c = a[b], baidu.removeClass(c.firstChild, this.getClass("thcell_sort"))
  }
}, refreshView:function() {
  this._caching();
  this._handleResize()
}, getRowDataFromDom:function(a) {
  for(var b = this.getClass("cell");a && !baidu.dom.hasClass(a, b);) {
    a = a.parentNode
  }
  return a && baidu.dom.hasClass(a, b) ? this.datasource[baidu.dom.getAttr(a, "row")] : null
}, onedit:new Function, startEdit:function(a, b, c) {
  if(this.editable) {
    var d = baidu.g(this._getBodyCellId(b, c)), d = baidu.dom.getPosition(d), e = this._fields[c];
    this._currentEditor = ui.Table.EditorManager.startEdit(this, a, {left:d.left + -5, top:d.top + -5, rowIndex:b, columnIndex:c, field:e, value:this.datasource[b][e.field]})
  }
}, stopEdit:function() {
  this._currentEditor && (this._currentEditor.stop(), this._currentEditor = null)
}, setCellText:function(a, b, c, d) {
  d && (a = baidu.encodeHTML(a));
  a += this._getEditEntryHtml(this._fields[c], b, c);
  baidu.g(this._getBodyCellId(b, c)).firstChild.innerHTML = a
}, delegateEvent:function(a) {
  var b = this, c = a || "click";
  baidu.array.contains(b._events, c) || (b._events.push(c), baidu.on(b.getMain(), c, function(c) {
    var e = baidu.event.getTarget(c);
    if(e && 1 == e.nodeType) {
      var g = e.getAttribute("data-cmd-type");
      g && !1 === b.trigger("CMD:" + (a ? a + ":" : "") + g, e, b.getRowDataFromDom(e)) && baidu.event.stop(c)
    }
  }))
}, dispose:function() {
  var a = baidu.g(this.getId("head")), b = baidu.g(this.getId("dragMark"));
  a && (a.onmousemove = null, a.onmousedown = null);
  this._followDoms = null;
  this._sxHandle && (this._sxHandle.onscroll = null, this._sxHandle.removeChild(this._sxContent), this.main.removeChild(this._sxHandle), this._sxContent = this._sxHandle = null);
  this.stopEdit();
  b && document.body.removeChild(b);
  ui.Table.superClass.dispose.call(this);
  this._resizeHandler && (baidu.un(window, "resize", this._resizeHandler), this._resizeHandler = null);
  this._topReseter && (baidu.un(window, "scroll", this._topReseter), this._topReseter = null)
}};
baidu.inherits(ui.Table, ui.Control);
var editorMap$$inline_50 = {};
ui.Table.EditorManager = {add:function(a, b) {
  editorMap$$inline_50[a] = b
}, remove:function(a) {
  delete editorMap$$inline_50[a]
}, startEdit:function(a, b, c) {
  (b = editorMap$$inline_50[b]) && b.start(a, c);
  return b
}};
ui.Table.Editor = function(a) {
  this.type = "null";
  for(var b in a) {
    this[b] = a[b]
  }
  this.okId = "_ctrlTableEditorOk" + this.type;
  this.cancelId = "_ctrlTableEditorCancel" + this.type;
  this.errorId = "_ctrlTableEditorError" + this.type
};
ui.Table.Editor.OK_TEXT = "\u786e\u5b9a";
ui.Table.Editor.CANCEL_TEXT = "\u53d6\u6d88";
ui.Table.Editor.prototype = {_idPrefix:"__table_editor__", tpl:'<div ui="id:{0};type:Button;skin:em">{2}</div><div ui="id:{1};type:Button;">{3}</div>', init:function() {
  if(!this._isInit) {
    var a = new ui.Layer({id:this._idPrefix + this.type, retype:"table-editor ui-table-editor-" + this.type});
    a.domId = this._idPrefix + this.type;
    a.appendTo();
    this.layer = a;
    this.initLayer();
    this.layer.getMain().onmouseout = function() {
    };
    this._isInit = 1
  }
}, initLayer:function() {
  this.fillLayer();
  ui.util.buildControlTree(this.layer.getMain(), this.layer);
  this.initButton()
}, fillLayer:function(a) {
  var a = a || [], b = this.layer.getMain();
  a.unshift(this.tpl, this.okId, this.cancelId, ui.Table.Editor.OK_TEXT, ui.Table.Editor.CANCEL_TEXT, this.errorId);
  b.innerHTML = baidu.format.apply(window, a)
}, initButton:function() {
  this.okButton = this.layer.c(this.okId);
  this.cancelButton = this.layer.c(this.cancelId);
  this.okButton.onclick = this.getOkHandler();
  this.cancelButton.onclick = this.getCancelHandler();
  this.disableButton(1)
}, disableButton:function(a) {
  a ? (this.okButton.disable(), this.cancelButton.disable()) : (this.okButton.enable(), this.cancelButton.enable())
}, getValue:function() {
  return null
}, getOkHandler:function() {
  var a = this;
  return function() {
    a.doOk()
  }
}, doOk:function() {
  !1 !== this.currentTable.onedit(this.getValue(), this.currentOptions, this) && this.stop()
}, getCancelHandler:function() {
  var a = this;
  return function() {
    a.stop()
  }
}, stop:function() {
  this.layer.hide();
  this.disableButton(1)
}, start:function(a, b) {
  this.init();
  this.currentTable = a;
  this.currentOptions = b;
  var c = b.left || 0, d = b.top || 0;
  this.unsetError();
  this.disableButton(0);
  this.layer.show(c, d);
  this.setValue && this.setValue(b.value, b)
}, wait:function() {
  this.disableButton(1)
}, restart:function() {
  this.disableButton(0)
}, setError:function(a) {
  var b = baidu.g(this.errorId);
  b.innerHTML = a;
  baidu.show(b)
}, unsetError:function() {
  baidu.hide(this.errorId)
}};
ui.Table.EditorManager.add("string", new ui.Table.Editor({type:"string", tpl:'<input type="text" ui="type:TextInput;id:{5}" /><div ui="id:{0};type:Button;skin:em">{2}</div><div ui="id:{1};type:Button;">{3}</div><div id="{4}" class="ui-table-editor-error"></div>', inputId:"_ctrlTableEditorStringInput", initLayer:function() {
  this.fillLayer([this.inputId]);
  ui.util.buildControlTree(this.layer.getMain(), this.layer);
  this.inputCtrl = this.layer.c(this.inputId);
  this.inputCtrl.onenter = this.getOkHandler();
  this.initButton()
}, setValue:function(a) {
  this.inputCtrl.setValue(a)
}, getValue:function() {
  return this.inputCtrl.getValue()
}}));
ui.Table.EditorManager.add("int", new ui.Table.Editor({type:"int", tpl:'<input type="text" ui="type:TextInput;id:{5}" /><div ui="id:{0};type:Button;skin:em">{2}</div><div ui="id:{1};type:Button;">{3}</div><div id="{4}" class="ui-table-editor-error"></div>', inputId:"_ctrlTableEditorIntInput", initLayer:function() {
  this.fillLayer([this.inputId]);
  ui.util.buildControlTree(this.layer.getMain(), this.layer);
  this.inputCtrl = this.layer.c(this.inputId);
  this.inputCtrl.onenter = this.getOkHandler();
  this.initButton()
}, setValue:function(a) {
  this.inputCtrl.setValue(a)
}, getValue:function() {
  return parseInt(this.inputCtrl.getValue(), 10)
}, getOkHandler:function() {
  var a = this;
  return function() {
    var b = a.inputCtrl.getValue();
    /^\d+$/.test(b) ? a.doOk() : a.setError("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u6574\u6570\uff0c\u8c22\u8c22\u3002")
  }
}}));
ui.ListInfo = function(a) {
  ui.Control.call(this, a);
  this.type = "listInfo";
  this.autoState = !1;
  this.unit = this.unit || "\u884c"
};
ui.ListInfo.prototype = {render:function(a) {
  ui.ListInfo.superClass.render.call(this, a);
  this.main && (this.main.innerHTML = this.getHtml())
}, getHtml:function() {
  return baidu.format(this.tpl, this.total, this.unit)
}, tpl:"\u5171{0}{1} \u6bcf\u9875\u663e\u793a"};
baidu.inherits(ui.ListInfo, ui.Control);
ui.PagableList = function(a) {
  this.fields = this.datasource = null;
  this.pageNo = 1;
  this.pageSize = 20;
  this.pagerCount = 5;
  this.order = this.orderBy = "";
  this.subrow = !1;
  this.select = "multi";
  this.followHead = "1";
  this.isPageNoChanged = !1;
  this.view = "PagableList";
  this._events = this._events || [];
  ui.Control.call(this, a)
};
function getDataCallback$$inline_61(a) {
  var a = a.page, b = a.totalCount, c = a.pageNo, d = a.pageSize, e = Math.ceil(b / d), g, h = d * c;
  g = Math.min(d * (c - 1) + 1, b);
  h = Math.min(h, b);
  this.getChild("listTable").rebindModel({listFields:this.fields, result:a.result, order:a.order, orderBy:a.orderBy, subrow:this.subrow, select:this.select, followHead:"1" == this.followHead.toString(), noDataHtml:this.noDataHtml});
  this.getChild("listPager").rebindModel({pagerCount:this.pagerCount, page:c, totalPage:e});
  this.getChild("listInfo").rebindModel({startIndex:g, endIndex:h, totalCount:b});
  this.getChild("pageSize").rebindModel({pageSizeList:this.pageSizeList, pageSize:d});
  this.trigger(ui.events.AFTER_RENDER);
  this.isPageNoChanged = !1;
  if("1" == this.followHead && baidu.ie) {
    var i = this.c("listTable");
    window.setTimeout(function() {
      i && i._topReseter && i._topReseter()
    }, 50)
  }
}
function onListSorted$$inline_62(a, b) {
  this.orderBy = a.field;
  this.order = b;
  this.onstatechange(this.getCurrentState())
}
function onPageNoChanged$$inline_63(a) {
  this.pageNo = a;
  this.isPageNoChanged = !0;
  this.onstatechange(this.getCurrentState())
}
function onPageSizeChanged$$inline_64(a) {
  this.resetPageNo();
  this.pageSize = a;
  this.onstatechange(this.getCurrentState())
}
function onListSelected$$inline_65(a) {
  this.onlistselect(a)
}
function onSubRowOpened$$inline_66(a) {
  this.getChild("listTable").getSubrow(a);
  this.onsubrowopen(a, this.getChild("listTable").model.result[a])
}
ui.PagableList.prototype = {onlistselect:function() {
}, onsubrowopen:function() {
}, onstatechange:function() {
}, getCurrentState:function() {
  return{pageSize:this.pageSize, pageNo:this.pageNo, orderBy:this.orderBy, order:this.order}
}, getData:function() {
  this.datasource.getData(this.getCurrentState(), baidu.fn.bind(getDataCallback$$inline_61, this))
}, getTable:function() {
  return this.getChild("listTable")
}, resetPageNo:function() {
  this.pageNo = 1
}, bindEvent:function() {
  var a = this.getChild("listTable"), b = this.getChild("listPager"), c = this.getChild("pageSize");
  a.onselect = baidu.fn.bind(onListSelected$$inline_65, this);
  a.onsubrowopen = baidu.fn.bind(onSubRowOpened$$inline_66, this);
  a.onsort = baidu.fn.bind(onListSorted$$inline_62, this);
  b.onselect = baidu.fn.bind(onPageNoChanged$$inline_63, this);
  c.onchange = baidu.fn.bind(onPageSizeChanged$$inline_64, this);
  ui.PagableList.superClass.bindEvent.call(this)
}, delegateEvent:function(a) {
  var b = this, c = b.getChild("listTable"), d = a || "click";
  baidu.array.contains(b._events, d) || (b._events.push(d), baidu.on(c.getMain(), d, function(d) {
    var g = baidu.event.getTarget(d);
    if(g && 1 == g.nodeType) {
      var h = g.getAttribute("data-cmd-type");
      h && !1 === b.trigger("CMD:" + (a ? a + ":" : "") + h, g, c.getRowDataFromDom(g)) && baidu.event.stop(d)
    }
  }))
}, dispose:function() {
  var a = this.getChild("listTable"), b = this.getChild("listPager"), c = this.getChild("pageSize");
  a.onselect = null;
  a.onsubrowopen = null;
  a.onsort = null;
  b.onselect = null;
  c.onchange = null;
  ui.PagableList.superClass.dispose.call(this)
}, pageSizeList:[{name:"20\u884c", value:20}, {name:"30\u884c", value:30}, {name:"50\u884c", value:50}, {name:"100\u884c", value:100}]};
baidu.inherits(ui.PagableList, ui.Control);
ui.SubmitButton = function(a) {
  ui.Button.call(this, a)
};
baidu.inherits(ui.SubmitButton, ui.Button);
ui.SubmitButton.prototype.onclick = function() {
  for(var a, b = this.parent;b;) {
    if(b instanceof ui.Form) {
      a = b;
      break
    }
    b = b.parent
  }
  a && a.validateAndSubmit()
};
ui.BaseBox = function(a) {
  ui.InputControl.call(this, a)
};
baidu.inherits(ui.BaseBox, ui.InputControl);
f = ui.BaseBox.prototype;
f.onclick = baidu.fn.blank;
f.setChecked = function(a) {
  this.getDOM().checked = !!a
};
f.getChecked = function() {
  return!!this.getDOM().checked
};
f.disable = function() {
  ui.BaseBox.superClass.disable.call(this);
  this.main.disabled = "disabled"
};
f.enable = function() {
  ui.BaseBox.superClass.enable.call(this);
  this.main.removeAttribute("disabled")
};
f.setReadOnly = function(a) {
  ui.BaseBox.superClass.setReadOnly.call(this, a);
  this.main.disabled = a
};
f.setValue = function(a) {
  this.getDOM().setAttribute("value", a)
};
f.getValue = function() {
  return this.getDOM().getAttribute("value")
};
f.getDOM = function() {
  return baidu.g(this.domId) || this.main
};
f.render = function(a) {
  var b = a || this.main, a = this.datasource, c = typeof a, d;
  if(!this.isRender) {
    if(!b || b.tagName != this.wrapTag || b.getAttribute("type") != this.wrapType) {
      return
    }
    this.formName || (this.formName = b.getAttribute("name"));
    "undefined" != typeof this.value && this.setValue(this.value + "");
    var e = this.title || b.title;
    e && (d = document.createElement("label"), d.innerHTML = e, d.className = this.getClass("label"), baidu.setAttr(d, "for", this.getId()), baidu.setAttr(d, "title", b.title), baidu.dom.insertAfter(d, b));
    ui.BaseBox.superClass.render.call(this, b);
    b.disabled = !!this.disabled;
    b.onclick = this._getHandlerClick()
  }
  this.main && (b = this.getValue(), "string" == c || "number" == c ? this.setChecked(a == b) : baidu.lang.isArray(a) && this.setChecked(baidu.array.contains(a, b)), this.isRender = !0)
};
f._getHandlerClick = function() {
  var a = this;
  return function() {
    a.getState("readonly") || (a.trigger(ui.events.CLICK), a.onclick())
  }
};
f.dispose = function() {
  this.main && (this.main.onclick = null);
  ui.BaseBox.superClass.dispose.call(this)
};
ui.Form = function(a) {
  ui.Control.call(this, a)
};
baidu.inherits(ui.Form, ui.Control);
ui.Form.CollectInputControls = function(a, b) {
  if(a instanceof ui.InputControl) {
    b.push(a)
  }else {
    if(a.children) {
      for(var c = 0;c < a.children.length;c++) {
        ui.Form.CollectInputControls(a.children[c], b)
      }
    }
  }
};
f = ui.Form.prototype;
f.getInputControls = function() {
  this.inputControls || (this.inputControls = [], ui.Form.CollectInputControls(this, this.inputControls));
  return this.inputControls
};
f.validateAndSubmit = function() {
  this.trigger(ui.events.BEFORE_VALIDATE);
  this.validate() && this.submit()
};
f.validate = function() {
  for(var a = this.getInputControls(), b = !0, c = 0;c < a.length;c++) {
    !a[c].isDisabled() && !a[c].isReadOnly() && (b &= a[c].validate())
  }
  return!!b
};
f.getParams = function() {
  for(var a = this.getInputControls(), b = [], c, d, e, g = {}, h = 0;h < a.length;h++) {
    c = a[h], c.isDisabled() || c instanceof ui.BaseBox && !c.getChecked() || (c.formName ? (d = c.formName, e = c.getParamValue(), c.group ? (g[d] || (g[d] = []), g[d].push(e)) : b.push(d + "=" + e)) : c.getParamString && b.push(c.getParamString()))
  }
  for(d in g) {
    b.push(d + "=" + g[d].join(","))
  }
  return b.join("&")
};
f.submit = function() {
  if(this.onsubmit) {
    this.onsubmit(this.getParams())
  }
};
ui.Mask = function() {
  this.id = "clbMask";
  this.clazz = "ui-mask";
  this._queue = [];
  var a = this;
  this.resizeHandler = function() {
    a.repaintMask(a.getMask())
  }
};
baidu.addSingletonGetter(ui.Mask);
f = ui.Mask.prototype;
f.init = function() {
  var a = document.createElement("div");
  a.id = this.id;
  a.className = this.clazz;
  document.body.appendChild(a);
  return a
};
f.repaintMask = function(a) {
  var b = baidu.page.getWidth(), c = baidu.page.getHeight();
  a.style.width = b + "px";
  a.style.height = c + "px"
};
f.getMask = function() {
  baidu.g(this.id) || this.init();
  return baidu.g(this.id)
};
f.show = function(a) {
  baidu.array.contains(this._queue, a) || this._queue.push(a);
  a = this.getMask();
  this.repaintMask(a);
  a.style.display = "block";
  baidu.on(window, "resize", this.resizeHandler)
};
f.hide = function(a) {
  baidu.array.remove(this._queue, a);
  0 >= this._queue.length && (this.getMask().style.display = "none", baidu.un(window, "resize", this.resizeHandler))
};
ui.Mask.show = function(a) {
  ui.Mask.getInstance().show(a)
};
ui.Mask.hide = function(a) {
  ui.Mask.getInstance().hide(a)
};
ui.Dialog = function(a) {
  ui.Control.call(this, a);
  this.type = "dialog";
  this.top = this.top || 137;
  this.resizeHandler = this.getResizeHandler()
};
baidu.inherits(ui.Dialog, ui.Control);
f = ui.Dialog.prototype;
f.tplBF = '<div class="{1}" id="{0}">{2}</div>';
f.tplHead = '<div id="{0}" class="{1}"><div id="{2}" class="{3}">{4}</div>{5}</div>';
f.tplClose = '<div class="{0}" id="{1}">&nbsp;</div>';
f.isShow = !1;
f.show = function() {
  this.getDOM() || (this.render(), baidu.on(window, "resize", this.resizeHandler));
  this.resizeHandler();
  ui.Mask.show(this.getId("dialog"));
  this.isShow = !0
};
f.hide = function() {
  if(this.isShow) {
    this.onBeforeHide();
    baidu.un(window, "resize", this.resizeHandler);
    var a = this.getDOM();
    a.style.left = a.style.top = "-10000px";
    ui.Mask.hide(this.getId("dialog"));
    this.isShow = !1
  }
};
f.setWidth = function(a) {
  this.width = a;
  this.main.style.width = a + "px";
  this.isShow && this.resizeHandler()
};
f.setTitle = function(a) {
  var b = baidu.g(this.getId("title"));
  b && (b.innerHTML = a);
  this.title = a
};
f.setContent = function(a) {
  var b = this.getBody();
  b && (b.innerHTML = a, ui.util.buildControlTree(b, this))
};
f.setFoot = function(a) {
  var b = this.getFoot();
  b && (b.innerHTML = a, ui.util.buildControlTree(b, this))
};
f.getResizeHandler = function() {
  var a = this, b = baidu.page;
  return function() {
    var c = a.getDOM(), d = (document.body.clientWidth - c.offsetWidth) / 2;
    0 > d && (d = 0);
    c.style.left = d + "px";
    c.style.top = b.getScrollTop() + a.top + "px"
  }
};
f.close = function() {
  this.hide();
  this.onclose();
  this.trigger(ui.events.CLOSE)
};
f.onclose = baidu.fn.blank;
f.onBeforeHide = baidu.fn.blank;
f.render = function() {
  var a;
  baidu.g(this.getId()) || (this.main = a = document.createElement("div"), ui.Dialog.superClass.render.call(this, a), this.width && (a.style.width = this.width + "px"), a.style.left = "-10000px", a.innerHTML = this.getHeadHtml() + baidu.format('<div class="{0}">{1}{2}</div>', this.getClass("main"), this.getBFHtml("body"), this.getBFHtml("foot")), document.body.appendChild(a))
};
f.getHeadHtml = function() {
  return baidu.format(this.tplHead, this.getId("head"), this.getClass("head"), this.getId("title"), this.getClass("title"), this.title, !1 === this.closeButton ? "" : baidu.format(this.tplClose, "skin-button-dialogclose ui-button", this.getId("close")))
};
f.bindEvent = function() {
  ui.Dialog.superClass.bindEvent.call(this);
  if(!1 !== this.closeButton) {
    var a = this.getClose();
    a.onclick = baidu.fn.bind(this.close, this);
    a.onmouseover = baidu.fn.bind(this.closeOver, this);
    a.onmouseout = baidu.fn.bind(this.closeOut, this)
  }
};
f.getBFHtml = function(a) {
  "body" == a && (this.content = this.content ? this.content : "");
  return baidu.format(this.tplBF, this.getId(a), this.getClass(a), "body" == a ? this.content : "")
};
f.getBody = function() {
  return baidu.g(this.getBodyId())
};
f.getBodyId = function() {
  return this.getId("body")
};
f.getFoot = function() {
  return baidu.g(this.getId("foot"))
};
f.getDOM = function() {
  return baidu.g(this.getId())
};
f.getClose = function() {
  return baidu.g(this.getId("close"))
};
f.closeOver = function() {
  baidu.addClass(this.getClose(), this.getClass("close-hover"))
};
f.closeOut = function() {
  baidu.removeClass(this.getClose(), this.getClass("close-hover"))
};
f.validate = function() {
  return ui.util.validate(this)
};
f.hideFootLine = function() {
  var a = this.getFoot();
  a && baidu.dom.addClass(a, "ui-dailog-hide-foot-line")
};
f.hideFoot = function() {
  var a = this.getFoot();
  baidu.dom.hide(a)
};
f.showFoot = function() {
  var a = this.getFoot();
  baidu.dom.show(a)
};
f.dispose = function() {
  baidu.un(window, "resize", this.resizeHandler);
  this.resizeHandler = null;
  if(!1 !== this.closeButton) {
    var a = this.getClose();
    a && (a.onclick = null, a.onmouseover = null, a.onmouseout = null)
  }
  if(a = this.getDOM()) {
    a.innerHTML = "", document.body.removeChild(a)
  }
  ui.Dialog.superClass.dispose.call(this)
};
ui.Dialog.Confirm = function(a) {
  ui.Control.call(this, a);
  this.autoState = !1;
  this.id = "DialogConfirm";
  this.defaultSkin = "";
  this.defaultWidth = 350;
  this.hasInited = !1
};
baidu.inherits(ui.Dialog.Confirm, ui.Control);
baidu.addSingletonGetter(ui.Dialog.Confirm);
f = ui.Dialog.Confirm.prototype;
f.init = function() {
  var a = new ui.Dialog({id:"frame", title:"", width:this.defaultWidth, skin:"confirm"}), b = new ui.Button({id:"okbtn", content:"\u786e\u5b9a"}), c = new ui.Button({id:"cancelbtn", content:"\u53d6\u6d88"});
  this.addChild(a);
  this.addChild(b);
  this.addChild(c);
  this.hasInited = !0;
  ui.Dialog.Confirm.superClass.init.call(this)
};
f.render = function() {
  var a = this.getFrame(), b = this.getButton("okbtn"), c = this.getButton("cancelbtn");
  a.render();
  b.appendTo(a.getFoot());
  b.render();
  c.appendTo(a.getFoot());
  c.render();
  this.lifePhase = ui.lifeCycle.RENDERED
};
f.setDefaultWidth = function(a) {
  a && (this.defaultWidth = a)
};
f.setDefaultSkin = function(a) {
  this.defaultSkin = a ? a : ""
};
f.getButton = function(a) {
  return this.getChild(a)
};
f.getFrame = function() {
  return this.getChild("frame")
};
f.show = function(a, b) {
  this.hasInited || this.init();
  var c = this.getFrame();
  c.main || (this.render(), this.bindEvent());
  this.opt_skin && c.addSkin(this.opt_skin);
  c.show();
  c.setTitle(a);
  c.setContent(b)
};
f._setHandler = function(a, b) {
  var c = this, d = this.getButton(a);
  d && (d.onclick = function() {
    var a = "function" == typeof b;
    (a && !1 !== b() || !a) && c.getFrame().hide()
  })
};
f.setOkHandler = function(a) {
  this._setHandler("okbtn", a)
};
f.setCancelHandler = function(a) {
  this._setHandler("cancelbtn", a)
};
ui.Dialog.confirm = function(a) {
  var b = ui.Dialog.Confirm.getInstance();
  b.opt_skin && b.getFrame().removeSkin(b.opt_skin);
  var c = a.title || "", d = a.content || "", e = a.onok, g = a.oncancel, h = a.type || "warning";
  b.opt_skin = a.skin || b.defaultSkin;
  b.show(c, baidu.format('<div class="ui-dialog-icon ui-dialog-icon-{0}"></div><table><tr><td class="ui-dialog-text">{1}</td></tr></table>', h, d));
  b.setOkHandler(e);
  b.setCancelHandler(g);
  b.getFrame().setWidth(a.width || b.defaultWidth);
  return b
};
var app = {LogTrace:function() {
  this.url = "/data/trace/log"
}};
baidu.addSingletonGetter(app.LogTrace);
app.LogTrace.prototype.sendLog = function(a) {
  var b = {trace:"", extra:""};
  baidu.object.extend(b, a);
  this.isOnLine() ? baidu.ajax.request(this.url, {timeout:6E4, method:"post", data:baidu.url.jsonToQuery(b), onsuccess:function() {
  }, ontimeout:function(a) {
    a.onreadystatechange = baidu.fn.blank
  }, headers:{"X-Request-By":"ERApplication"}}) : window.console && window.console.log && window.console.log(b)
};
app.LogTrace.prototype.logError = function() {
};
app.LogTrace.prototype.isOnLine = function() {
  return/^jn\.baidu\.com$/.test(window.location.host)
};
app.traceback = function() {
};
ui.Dialog.Alert = function(a) {
  ui.Control.call(this, a);
  this.autoState = !1;
  this.id = "DialogAlert";
  this.defaultSkin = "";
  this.defaultWidth = 350;
  this.hasInited = !1
};
baidu.inherits(ui.Dialog.Alert, ui.Control);
baidu.addSingletonGetter(ui.Dialog.Alert);
f = ui.Dialog.Alert.prototype;
f.init = function() {
  var a = new ui.Dialog({id:"frame", closeButton:!1, title:"", width:this.defaultWidth, skin:"alert"}), b = new ui.Button({id:"okbtn", content:"\u786e\u5b9a"});
  this.addChild(a);
  this.addChild(b);
  this.hasInited = !0;
  ui.Dialog.Alert.superClass.init.call(this)
};
f.render = function() {
  this.getFrame().render();
  this.getOkButton().appendTo(this.getFrame().getFoot());
  this.getOkButton().render();
  this.lifePhase = ui.lifeCycle.RENDERED
};
f.getOkButton = function() {
  return this.getChild("okbtn")
};
f.setDefaultWidth = function(a) {
  a && (this.defaultWidth = a)
};
f.setDefaultSkin = function(a) {
  this.defaultSkin = a || ""
};
f.getFrame = function() {
  return this.getChild("frame")
};
f.show = function(a, b) {
  this.hasInited || this.init();
  var c = this.getFrame();
  c.main || (this.render(), this.bindEvent());
  this.opt_skin && c.addSkin(this.opt_skin);
  c.show();
  this.opt_skin && c.addSkin(this.opt_skin);
  c.setTitle(a);
  c.setContent(b)
};
f.setOkHandler = function(a) {
  var b = this;
  this.getOkButton().onclick = function() {
    var c = "function" == typeof a;
    (c && !1 !== a() || !c) && b.getFrame().hide()
  }
};
ui.Dialog.alert = function(a) {
  var b = ui.Dialog.Alert.getInstance();
  b.opt_skin && b.getFrame().removeSkin(b.opt_skin);
  var c = a.title || "", d = a.content || "", e = a.onok, g = a.type || "warning";
  b.opt_skin = a.skin || b.defaultSkin;
  b.show(c, baidu.format('<div class="ui-dialog-icon ui-dialog-icon-{0}"></div><table><tr><td class="ui-dialog-text">{1}</td></tr></table>', g, d));
  b.setOkHandler(e);
  b.getFrame().setWidth(a.width || b.defaultWidth);
  return b
};
jn.ui = {};
jn.Loading = function() {
  this.ID = "Loading";
  this.count = 0
};
jn.Loading.prototype._getLoadingElement = function() {
  var a = baidu.g(this.ID);
  a || (a = baidu.dom.create("div", {id:this.ID, "class":"loading-outer"}), a.innerHTML = '<div class="loading"><div class="loading-inner"><div class="loading-icon"></div><div class="loading-text">\u6b63\u5728\u8bfb\u53d6\u6570\u636e\uff0c\u8bf7\u7a0d\u5019...</div></div></div>', document.body.appendChild(a), baidu.hide(a));
  return a
};
jn.Loading.prototype.show = function() {
  var a = this._getLoadingElement();
  ui.Mask.show();
  a && (baidu.show(a), baidu.ie && 7 > baidu.ie && (a.style.top = "120px"));
  this.count++
};
jn.Loading.prototype.hide = function() {
  var a = this._getLoadingElement();
  this.count && this.count--;
  0 === this.count && (ui.Mask.hide(), a && baidu.hide(a))
};
jn.ui.loading = new jn.Loading;
er.Context = function() {
  this.applicationContext = {}
};
er.Context.prototype.set = function(a, b) {
  this.applicationContext[a] = b
};
er.Context.prototype.get = function(a) {
  return this.applicationContext[a]
};
er.context = new er.Context;
var Requester;
function responseHandler$$inline_102(a, b, c, d) {
  var e, g, c = c || baidu.fn.blank;
  jn.ui.loading.hide();
  try {
    e = baidu.json.parse(a.responseText)
  }catch(h) {
    ui.Dialog.alert({title:"\u6570\u636e\u89e3\u6790\u51fa\u9519", content:"\u6570\u636e\u89e3\u6790\u51fa\u9519" + ['&nbsp;&nbsp;<a href="javascript:void(0);" onclick="baidu.show(baidu.dom.query(\'textarea\', this.parentNode)[0])">\u8be6\u7ec6&gt;&gt;</a><div><textarea style="width:270px;height:100px;display:none;font-size:12px;" readonly="readonly">', "URL:" + (d || "unknown") + "\n", a.responseText, "</textarea></div>"].join(""), onok:g});
    c(DEFAULT_SERVER_ERROR$$inline_106);
    return
  }
  if("object" == typeof e) {
    if("true" != e.success) {
      a = e.message;
      if(a.global) {
        b = "\u7cfb\u7edf\u63d0\u793a", a = a.global
      }else {
        if(a.noSession) {
          b = "\u7cfb\u7edf\u8d85\u65f6", a = a.noSession, g = gotoIndex$$inline_105
        }else {
          if("undefined" != typeof a.redirect) {
            if(storeCookie$$inline_103(), "" == a.redirect) {
              b = "\u767b\u5f55\u8d85\u65f6", a = "\u767b\u5f55\u8d85\u65f6\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01", g = function() {
                window.location.reload(!0)
              }
            }else {
              window.location.href = a.redirect;
              return
            }
          }else {
            if(a.field) {
              b(e);
              return
            }
            b = "\u7cfb\u7edf\u63d0\u793a";
            a = "\u8bf7\u6c42\u5931\u8d25(\u672a\u77e5\u9519\u8bef)"
          }
        }
      }
      ui.Dialog.alert({title:b, content:a, onok:g});
      c(e)
    }else {
      a = e.message, a.global && (a = a.global, ui.Dialog.alert({title:"\u7cfb\u7edf\u63d0\u793a", content:a})), b(e)
    }
  }
}
function storeCookie$$inline_103() {
  var a = "", b = "";
  try {
    a = er.context.get("visitor").name, b = er.context.get("adOwner") ? er.context.get("adOwner").name : ""
  }catch(c) {
  }
  baidu.cookie.set("LAST_PAGE", window.location.href);
  baidu.cookie.set("LAST_VISITOR", a);
  baidu.cookie.set("LAST_ADOWNER", b)
}
function getAdOwnerParam$$inline_104() {
  var a = er.context.get("adOwner");
  return a ? "aderId=" + a.id : ""
}
function gotoIndex$$inline_105() {
  var a = getAdOwnerParam$$inline_104();
  storeCookie$$inline_103();
  document.location.href = "/index.html" + ("" != a ? "?" : "") + a
}
var DEFAULT_SERVER_ERROR$$inline_106 = {success:"false", message:{global:"\u670d\u52a1\u5668\u9519\u8bef"}};
Requester = {post:function(a, b, c, d, e) {
  var g = /\?/.test(a), h = getAdOwnerParam$$inline_104(), i = a + ("" != h ? (g ? "&" : "?") + h : ""), g = !1, j = d || baidu.fn.blank, k;
  e && (g = !!e.dontRetry);
  k = g ? function() {
    jn.ui.loading.hide();
    ui.Dialog.alert({title:"\u8bf7\u6c42\u5931\u8d25", content:"\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5"})
  } : function() {
    jn.ui.loading.hide();
    Requester.post(a, b, c, d, {dontRetry:!0})
  };
  (!b || -1 == b.indexOf(".ui-loading=0")) && jn.ui.loading.show();
  baidu.ajax.request(i, {timeout:6E4, method:"post", data:b, onsuccess:function(a) {
    responseHandler$$inline_102(a, c, j)
  }, onfailure:function() {
    k();
    j(DEFAULT_SERVER_ERROR$$inline_106)
  }, ontimeout:function(a) {
    jn.ui.loading.hide();
    a.onreadystatechange = baidu.fn.blank;
    ui.Dialog.alert({title:"\u8bf7\u6c42\u8d85\u65f6", content:"\u8bf7\u6c42\u8d85\u65f6(" + i + ")\uff0c\u8bf7\u91cd\u8bd5"})
  }, headers:{"X-Request-By":"ERApplication"}})
}, get:function(a, b, c) {
  var d = /\?/.test(a), e = getAdOwnerParam$$inline_104();
  baidu.ajax.request(a + ("" != e ? (d ? "&" : "?") + e : ""), {method:"get", data:b, onsuccess:function(a) {
    responseHandler$$inline_102(a, c)
  }, headers:{"X-Request-By":"ERApplication"}})
}, getAdOwnerParam:function() {
  return getAdOwnerParam$$inline_104()
}};
ui.Page = function(a) {
  ui.Control.call(this, a)
};
baidu.inherits(ui.Page, ui.Control);
var Validator;
function parse$$inline_145(a, b) {
  return"int" === b ? parseInt(a, 10) : "float" === b ? parseFloat(a) : "date" === b ? baidu.lang.isDate(a) ? a : baidu.date.parse(a) : a
}
function noticeInTail$$inline_146(a, b) {
  showNoticeDom$$inline_149(b);
  var c = b.getAttribute("title") || "";
  baidu.g(b.id + textSuffix$$inline_165).innerHTML = c + a
}
function noticeInTailNoTitle$$inline_147(a, b) {
  showNoticeDom$$inline_149(b);
  baidu.g(b.id + textSuffix$$inline_165).innerHTML = a
}
function showNoticeDom$$inline_149(a) {
  var b = baidu.g(a.id + suffix$$inline_163), c = a.parentNode;
  if(!b) {
    var b = a.id, d = baidu.g(a.id + suffix$$inline_163);
    d || (d = document.createElement("div"), d.id = b + suffix$$inline_163, d.className = validClass$$inline_160, d.style.width = a.offsetWidth - 2 + "px", a = document.createElement("div"), a.id = b + iconSuffix$$inline_164, a.className = iconClass$$inline_161, d.appendChild(a), a = document.createElement("div"), a.id = b + textSuffix$$inline_165, a.className = textClass$$inline_162, d.appendChild(a));
    b = d;
    c.appendChild(b)
  }
  b.style.display = "";
  baidu.addClass(c, errorClass$$inline_159)
}
function cancelNoticeInTile$$inline_151(a) {
  var b = baidu.g(a.id + suffix$$inline_163), a = a.parentNode, c = !0;
  b && (b.style.display = "none");
  for(var d = 0;d < a.childNodes.length;d++) {
    if(b = a.childNodes[d], b.className === validClass$$inline_160 && "none" !== b.style.display) {
      c = !1;
      break
    }
  }
  c && baidu.removeClass(a, errorClass$$inline_159)
}
function applyRule$$inline_156(a, b) {
  if("modFrame" == a.type || "dialog" == a.type) {
    var c = function(a, b) {
      if(a instanceof ui.InputControl) {
        b.push(a)
      }else {
        if(a.children) {
          for(var d = 0;d < a.children.length;d++) {
            c(a.children[d], b)
          }
        }
      }
    }, d = [], e, g = [];
    e = "";
    var h = !0;
    c(a, d);
    for(var i = 0;i < d.length;i++) {
      !d[i].isDisabled() && !d[i].isReadOnly() && d[i].rule && (h &= Validator(d[i], d[i].rule, "local"), _error$$inline_167 && !_error$$inline_167.result && (e = d[i].main.getAttribute("title") || "", g.push(e + _error$$inline_167.errorText)))
    }
    h ? a.hideError && a.hideError() : (e = g.join("<br />"), a.showError && a.showError(e));
    return!!h
  }
  if(!a.getValue || !b) {
    return!0
  }
  h = baidu.lang.isArray(b) ? b : b.split(",");
  i = a.getValue(!0);
  g = ruleMap$$inline_169[h[0]];
  e = h.length;
  var j = [i], k, d = "";
  "checkbox" == a.type && (i = a.getChecked(), j = [i]);
  if(0 < e) {
    for(i = 1;i < e;i++) {
      "this" == h[i] ? j.push(a) : (k = baidu.lang.isString(h[i]) && ui.util.get(h[i], a.getPage())) && k.getValue && !k.getState("disabled") ? "checkbox" == k.type ? j.push(k.getChecked()) : j.push(k.getValue()) : j.push(h[i])
    }
  }
  h = g.validate.apply(g, j);
  baidu.lang.isNumber(h) && 0 !== h ? d = g.noticeText[h] : baidu.lang.isString(h) && "" !== h ? d = errorMsg$$inline_168[h] : baidu.lang.isArray(h) && (h[0] = errorMsg$$inline_168[h[0]], d = baidu.format.apply(null, h));
  _error$$inline_167 = null;
  if("alert" === _type$$inline_166 && d) {
    ui.Dialog.alert({title:"\u9519\u8bef", content:d})
  }else {
    if("local" === _type$$inline_166 && d) {
      _error$$inline_167 = {result:!d, errorText:d}
    }else {
      if("output" === _type$$inline_166 && d) {
        return g = a.getMain().getAttribute("title") || "", {result:!d, errorText:g + d}
      }
      d ? (g.notice = g.notice || noticeInTail$$inline_146, g.notice(d, a.main, a)) : (g.cancelNotice = g.cancelNotice || cancelNoticeInTile$$inline_151, g.cancelNotice(a.main, a))
    }
  }
  return!d
}
var urlLoose$$inline_157 = /^((http|https|ftp|ftps):\/\/)?[A-Za-z0-9][A-Za-z0-9-@:]{0,}[A-Za-z0-9]?(\.[A-Za-z0-9]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/i, errorClass$$inline_159 = "validate-error", validClass$$inline_160 = "validate", iconClass$$inline_161 = "validate-icon", textClass$$inline_162 = "validate-text", suffix$$inline_163 = "validate", iconSuffix$$inline_164 = "validateIcon", textSuffix$$inline_165 = "validateText", _type$$inline_166, _error$$inline_167, errorMsg$$inline_168 = {SUCCESS:"", 
ERROR_EMPTY:"\u4e0d\u80fd\u4e3a\u7a7a\uff01", ERROR_REGEX:"\u683c\u5f0f\u9519\u8bef", ERROR_INT:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u586b\u5199\u6574\u6570", ERROR_NUMBER:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u586b\u5199\u6570\u5b57", ERROR_MIN:"\u4e0d\u80fd\u5c0f\u4e8e{0}", ERROR_MIN_DATE:"\u4e0d\u80fd\u65e9\u4e8e{0}", ERROR_MAX:"\u4e0d\u80fd\u5927\u4e8e{0}", ERROR_MAX_DATE:"\u4e0d\u80fd\u665a\u4e8e{0}", ERROR_GT:"\u5fc5\u987b\u5927\u4e8e{0}", ERROR_GT_DATE:"\u5fc5\u987b\u665a\u4e8e{0}", 
ERROR_LT:"\u5fc5\u987b\u5c0f\u4e8e{0}", ERROR_LT_DATE:"\u5fc5\u987b\u65e9\u4e8e{0}", ERROR_RANGE:"\u5fc5\u987b\u5728{0}\u5230{1}\u7684\u8303\u56f4\u5185", ERROR_LENGTH:"\u957f\u5ea6\u5fc5\u987b\u7b49\u4e8e{0}", ERROR_MIN_LENGTH:"\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e{0}", ERROR_MAX_LENGTH:"\u957f\u5ea6\u4e0d\u80fd\u5927\u4e8e{0}", ERROR_MAX_CNCHAR_LENGTH:"\u957f\u5ea6\u4e0d\u80fd\u5927\u4e8e{0}\u4e2a\u6c49\u5b57", ERROR_LENGTH_RANGE:"\u957f\u5ea6\u5fc5\u987b\u5728{0}\u5230{1}\u7684\u8303\u56f4\u5185", 
ERROR_CALENDAR:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u63092010-01-01\u7684\u683c\u5f0f\u8f93\u5165", ERROR_EXT:"\u540e\u7f00\u540d\u4e0d\u5408\u6cd5\uff0c\u53ea\u5141\u8bb8\u540e\u7f00\u540d\u4e3a{0}", ERROR_INVALID_CHAR:"\u542b\u6709\u4e0d\u5141\u8bb8\u8f93\u5165\u7684\u5b57\u7b26\uff1a{0}", ERROR_PRECISION:"\u5c0f\u6570\u70b9\u540e\u6570\u5b57\u4e0d\u80fd\u591a\u4e8e{0}\u4f4d", ERROR_BACKEND:"{0}"}, ruleMap$$inline_169 = {required:{validate:function(a) {
  return baidu.lang.isEmptyObject(a) ? "ERROR_EMPTY" : "SUCCESS"
}}, charge_name:{validate:function(a) {
  return"" === baidu.trim(a) ? "ERROR_EMPTY" : /[=\s]/i.test(a) ? ["ERROR_INVALID_CHAR", "\u7a7a\u683c,Tab,\u7b49\u53f7"] : "SUCCESS"
}}, ext:{validate:function(a, b) {
  if("" === baidu.trim(a)) {
    return"ERROR_EMPTY"
  }
  var c = Array.prototype.slice.call(arguments, 1), d = a.lastIndexOf(".");
  if(-1 == d) {
    return["ERROR_EXT", c.join(",")]
  }
  for(var d = a.substring(d + 1).toLowerCase(), e = 0, g = c.length;e < g;e++) {
    if(c[e].toLowerCase() == d) {
      return"SUCCESS"
    }
  }
  return["ERROR_EXT", c.join(",")]
}}, regex:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : !RegExp(b, c).test(a) ? "ERROR_REGEX" : "SUCCESS"
}}, "int":{validate:function(a) {
  return"" === baidu.trim(a) ? "SUCCESS" : isNaN(a - 0) || 0 <= a.indexOf(".") ? "ERROR_INT" : "SUCCESS"
}}, number:{validate:function(a) {
  return"" === baidu.trim(a) ? "SUCCESS" : isNaN(a - 0) ? "ERROR_NUMBER" : "SUCCESS"
}}, min:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_145(a, c) < parse$$inline_145(b, c) ? ["date" === c ? "ERROR_MIN_DATE" : "ERROR_MIN", b] : "SUCCESS"
}}, gt:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_145(a, c) <= parse$$inline_145(b, c) ? ["date" === c ? "ERROR_GT_DATE" : "ERROR_GT", b] : "SUCCESS"
}}, max:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_145(a, c) > parse$$inline_145(b, c) ? ["date" === c ? "ERROR_MAX_DATE" : "ERROR_MAX", b] : "SUCCESS"
}}, lt:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_145(a, c) >= parse$$inline_145(b, c) ? ["date" === c ? "ERROR_LT_DATE" : "ERROR_LT", b] : "SUCCESS"
}}, range:{validate:function(a, b, c, d) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_145(a, d) > parse$$inline_145(c, d) || parse$$inline_145(a, d) < parse$$inline_145(b, d) ? ["ERROR_RANGE", b, c] : "SUCCESS"
}}, length:{validate:function(a, b) {
  return a.length !== b ? ["ERROR_LENGTH", b] : "SUCCESS"
}}, minLength:{validate:function(a, b) {
  return a.length < b ? ["ERROR_MIN_LENGTH", b] : "SUCCESS"
}}, maxLength:{validate:function(a, b) {
  return a.length > b ? ["ERROR_MAX_LENGTH", b] : "SUCCESS"
}}, maxCNCharLength:{validate:function(a, b) {
  return baidu.string.getByteLength(a) > 2 * b ? ["ERROR_MAX_CNCHAR_LENGTH", b] : "SUCCESS"
}}, lengthRange:{validate:function(a, b, c) {
  return a.length < b || a.length > c ? ["ERROR_LENGTH_RANGE", b, c] : "SUCCESS"
}}, calendar:{validate:function() {
  return"SUCCESS"
}}, positiveNumber:{validate:function(a) {
  return"" === baidu.trim(a) ? 0 : isNaN(parseInt(a, 10)) || 0 >= parseInt(a, 10) || -1 < a.indexOf(".") ? 1 : 0
}, noticeText:{1:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u5fc5\u987b\u4e3a\u6b63\u6574\u6570"}}, positiveFloat:{validate:function(a) {
  return!/^[0-9]\d*(\.\d+)?$/.test(a) || "0" == a || 0 == a ? 1 : 0
}, noticeText:{1:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u5fc5\u987b\u4e3a\u6b63\u6570"}}, email:{validate:function(a) {
  var b = a.length;
  return 0 == b ? 1 : 200 < b ? 2 : !/^.+@.+$/.test(a) ? 3 : 0
}, notice:noticeInTail$$inline_146, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7200", 3:"\u683c\u5f0f\u9519\u8bef"}}, emailVerify:{validate:function(a, b) {
  var c = a.length;
  if(0 === c) {
    return 1
  }
  if(200 < c) {
    return 2
  }
  if(/^.+@.+$/.test(a)) {
    if(a != b) {
      return 4
    }
  }else {
    return 3
  }
  return 0
}, notice:noticeInTailNoTitle$$inline_147, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u786e\u8ba4\u90ae\u4ef6\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u786e\u8ba4\u90ae\u4ef6\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7200", 3:"\u786e\u8ba4\u90ae\u4ef6\u683c\u5f0f\u9519\u8bef", 4:"\u60a8\u4e24\u6b21\u8f93\u5165\u7684\u90ae\u4ef6\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"}}, phone:{validate:function(a) {
  var b = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(a);
  return"" != a && !b ? 1 : 0
}, notice:noticeInTail$$inline_146, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u6309\u533a\u53f7-\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u586b\u5199"}}, fax:{validate:function(a) {
  var b = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(a);
  return"" != a && !b ? 1 : 0
}, notice:noticeInTail$$inline_146, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u6309\u533a\u53f7-\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u586b\u5199"}}, mobile:{validate:function(a) {
  var b = /^1[3,5,8]{1}[0-9]{1}[0-9]{8}$/.test(a);
  return"" != a && !b ? 1 : 0
}, notice:noticeInTailNoTitle$$inline_147, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u624b\u673a\u53f7\u7801\u683c\u5f0f\u9519\u8bef\uff0c\u624b\u673a\u53f7\u7801\u4e3a\u4ee513,15,18\u5f00\u5934\u768411\u4f4d\u6570\u5b57"}}, password:{validate:function(a) {
  var b = a.length;
  return 0 === b ? 1 : 6 > b ? 2 : !/[a-z]/.test(a) || !/[A-Z]/.test(a) || !/\d/.test(a) ? 3 : 0
}, notice:noticeInTail$$inline_146, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u4e0d\u80fd\u5c11\u4e8e6\u4f4d", 3:"\u5fc5\u987b\u5305\u542b\u5c0f\u5199\u5b57\u6bcd\u3001\u5927\u5199\u5b57\u6bcd\u548c\u963f\u62c9\u4f2f\u6570\u5b57\u4e09\u79cd\u5b57\u7b26"}}, endTime:{validate:function(a, b, c, d) {
  if(d) {
    var e = d.date, g = e instanceof Array && e.length
  }
  return a <= b && "9999010124" != c ? 1 : "9999010124" != c && d && g && a < e[g - 1] ? 2 : 0
}, notice:noticeInTailNoTitle$$inline_147, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u7ed3\u675f\u65f6\u95f4\u5fc5\u987b\u665a\u4e8e\u8d77\u59cb\u65f6\u95f4", 2:"\u7ed3\u675f\u65e5\u671f\u5fc5\u987b\u665a\u6216\u7b49\u4e8e\u5b9a\u5411\u6295\u653e\u4e2d\u9009\u62e9\u7684\u65e5\u671f"}}, endTimeOrder:{validate:function(a, b, c) {
  return a < b && "9999010124" != c ? 1 : 0
}, notice:noticeInTailNoTitle$$inline_147, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u7ed3\u675f\u65e5\u671f\u4e0d\u5f97\u65e9\u4e8e\u8d77\u59cb\u65e5\u671f"}}, passwordVerify:{validate:function(a, b) {
  return 0 === a.length ? 1 : a != b ? 2 : 0
}, notice:noticeInTailNoTitle$$inline_147, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u60a8\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"}}, link:{validate:function(a) {
  var b = a.length;
  if(0 === b) {
    return 1
  }
  if(1024 < b) {
    return 2
  }
  if(!urlLoose$$inline_157.test(a)) {
    return 3
  }
}, notice:noticeInTail$$inline_146, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u4e0d\u80fd\u8d85\u8fc71024\u4e2a\u5b57\u7b26", 3:"\u683c\u5f0f\u9519\u8bef"}}, imgUrl:{validate:function(a) {
  var b = a.length, c = a.substring(b - 4, b).toLowerCase(), d = a.substring(b - 5, b - 4);
  if(0 === b) {
    return 1
  }
  if(1E3 < b) {
    return 2
  }
  if(urlLoose$$inline_157.test(a)) {
    if(".jpg" != c && ".gif" != c && ".png" != c || "/" == d) {
      return 4
    }
  }else {
    return 3
  }
}, notice:noticeInTailNoTitle$$inline_147, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"\u56fe\u7247\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u56fe\u7247\u5730\u5740\u4e0d\u80fd\u8d85\u8fc7256\u4e2a\u5b57\u7b26", 3:"\u56fe\u7247\u5730\u5740\u683c\u5f0f\u9519\u8bef", 4:"\u56fe\u7247\u683c\u5f0f\u5fc5\u987b\u4e3ajpg, gif\u6216png\uff01"}}, flashUrl:{validate:function(a) {
  var b = a.length, c = a.substring(b - 4, b).toLowerCase(), d = a.substring(b - 5, b - 4);
  if(0 === b) {
    return 1
  }
  if(1E3 < b) {
    return 2
  }
  if(urlLoose$$inline_157.test(a)) {
    if(".swf" != c || "/" == d) {
      return 4
    }
  }else {
    return 3
  }
}, notice:noticeInTailNoTitle$$inline_147, cancelNotice:cancelNoticeInTile$$inline_151, noticeText:{1:"Flash\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a", 2:"Flash\u5730\u5740\u4e0d\u80fd\u8d85\u8fc71000\u4e2a\u5b57\u7b26", 3:"Flash\u5730\u5740\u683c\u5f0f\u9519\u8bef", 4:'\u8bf7\u8f93\u5165\u540e\u7f00\u4e3a"swf"\u7684Flash\u5730\u5740'}}, precision:{validate:function(a, b, c) {
  if("" === baidu.trim(a)) {
    return"SUCCESS"
  }
  c || (c = "float");
  a = parse$$inline_145(a, c);
  return!isNaN(a) && a.toFixed(b) != a ? ["ERROR_PRECISION", b] : "SUCCESS"
}}, validatePriceEditor:{validate:function(a) {
  for(var b = a.price, c = a.lowestPrice, a = a.maxPrice, d = 0;d < b.length;d++) {
    var e = baidu.lang.isEmptyObject(b[d]) ? 1 : isNaN(b[d] - 0) ? 2 : !isNaN(c - 0) && parse$$inline_145(b[d], "float") < parse$$inline_145(c, "float") ? 3 : !isNaN(a - 0) && parse$$inline_145(b[d], "float") > parse$$inline_145(a, "float") ? 4 : parse$$inline_145(b[d], "float").toFixed(2) != parse$$inline_145(b[d], "float") ? 5 : 0;
    if(e) {
      return e
    }
  }
  return 0
}, noticeText:{1:"\u70b9\u51fb\u5355\u4ef7\u4e0d\u80fd\u4e3a\u7a7a\uff01", 2:"\u70b9\u51fb\u5355\u4ef7\u5fc5\u987b\u4e3a\u6570\u5b57\uff01", 3:"\u70b9\u51fb\u5355\u4ef7\u4e0d\u80fd\u5c0f\u4e8e\u5408\u540c\u4e2d\u5e95\u4ef7\uff01", 4:"\u70b9\u51fb\u5355\u4ef7\u4e0d\u80fd\u5927\u4e8e\u7cfb\u7edf\u6700\u5927\u5355\u4ef7\u9650\u5236\uff01", 5:"\u70b9\u51fb\u5355\u4ef7\u5c0f\u6570\u70b9\u540e\u6570\u5b57\u4e0d\u80fd\u591a\u4e8e\u4e24\u4f4d\uff01"}}, backendError:{validate:function(a, b) {
  return["ERROR_BACKEND", b.errorMessage]
}, notice:noticeInTailNoTitle$$inline_147}};
Validator = function(a, b, c) {
  _type$$inline_166 = c;
  if(baidu.lang.isArray(b)) {
    for(c = 0;c < b.length;c++) {
      if(!applyRule$$inline_156(a, b[c])) {
        return!1
      }
    }
    return!0
  }
  return applyRule$$inline_156(a, b)
};
Validator.showError = function(a, b, c) {
  var d = a.parentNode;
  baidu.addClass(d, "validate-error");
  if("validate" !== d.lastChild.className) {
    var e = document.createElement("div");
    baidu.addClass(e, "validate");
    var g = a, h = g.id;
    if(!h) {
      do {
        g = g.parentNode, h = g.id
      }while(!h && g != document.body)
    }
    e.innerHTML = baidu.format('<div class="validate-icon"></div><div id="{1}" class="validate-text">{0}</div>', b, h + "_validatetext");
    c && a.parentNode && (a.parentNode.style.width = c + "px");
    0 < a.offsetWidth - 2 && (e.style.width = a.offsetWidth - 2 + "px");
    d.appendChild(e)
  }
};
Validator.hideError = function(a) {
  var b = a.parentNode;
  b && "validate" === b.lastChild.className && b.removeChild(b.lastChild);
  baidu.removeClass(a.parentNode, "validate-error")
};
Validator.batchHideErrors = function(a) {
  for(var b, c, d = 0, e = a.length;d < e;d++) {
    if(c = a[d]) {
      (b = c.parentNode) && "validate" === b.lastChild.className && b.removeChild(b.lastChild), baidu.removeClass(c.parentNode, "validate-error")
    }
  }
};
Validator.getValidateMessage = function(a, b) {
  baidu.lang.isArray(b) || (b = [b]);
  for(var c = 0;c < b.length;c++) {
    var d = Validator(a, b[c], "output");
    if(d && d.errorText) {
      return d
    }
  }
  return{result:!0, errorText:""}
};
ui.Lib = function() {
  this.pagePopup = this.pageMain = null
};
f = ui.Lib.prototype;
f.create = function(a, b, c) {
  b.type = a;
  return this.createControl(b, c)
};
f.createPage = function(a, b, c) {
  a = new ui.Page({view:a, main:b, autoState:!1});
  c ? (a.id = "frame", this.pagePopup = a) : this.pageMain = a;
  return a
};
f.createControl = function(a, b) {
  var c = {};
  "string" === typeof a && (a = this.parseAttrStr(a));
  if(!a.id) {
    throw"UI Control must have an id";
  }
  baidu.object.each(a, function(b, d) {
    "string" === typeof b && (0 === b.indexOf("@") ? (c[d] = b.substr(1), delete a[d]) : 0 === b.indexOf("&") && (a[d] = baidu.getObjectByName(b.substr(1))))
  });
  a.refer = c;
  b && (a.main = b);
  var d = baidu.getObjectByName(a.type, ui) || baidu.getObjectByName(a.type, window);
  if(!d) {
    throw"Can't find constructor for [ui." + a.type + "] or [" + a.type + "]";
  }
  a.prefix = a.type.replace(/(\.|^)[^.]+$/, "$1").replace(/\./g, "-").toLowerCase();
  a.type = a.type.replace(/^.*\./, "");
  return new d(a)
};
f.buildControlTree = function(a, b) {
  if(a && a.childNodes && b && b.addChild) {
    for(var c, d, e = 0;e < a.childNodes.length;e++) {
      c = a.childNodes[e], 1 === c.nodeType && ((d = c.getAttribute("ui")) ? (d = this.createControl(d, c), b.addChild(d), this.buildControlTree(c, d)) : this.buildControlTree(c, b))
    }
  }
};
f.parseAttrStr = function(a) {
  for(var b = {}, a = a.split(";"), c = a.length, d, e;c--;) {
    if(d = a[c]) {
      e = d.split(":"), d = e[0], e = e[1], b[d] ? (baidu.lang.isArray(b[d]) || (b[d] = [b[d]]), b[d].push(e)) : b[d] = e
    }
  }
  return b
};
f.get = function(a, b) {
  for(var c = a.split("_"), d = "frame" === c[0] ? 1 : 0, e = b || ("frame" === c[0] ? this.pagePopup : this.pageMain);d < c.length;d++) {
    if(!e) {
      return null
    }
    e = e.getChild(c[d])
  }
  return e
};
f.dispose = function() {
  this.pageMain && this.pageMain.dispose()
};
f.getControlsByContainer = function(a) {
  for(var a = a.getElementsByTagName("*"), b = a.length, c, d = [];b--;) {
    if(c = a[b].getAttribute("control")) {
      c = a[b].getAttribute("id"), d.push(ui.util.get(c))
    }
  }
  return d
};
f.disableFormByContainer = function(a, b) {
  for(var c = this.getControlsByContainer(a), d, e = 0;e < c.length;e++) {
    d = c[e], d instanceof ui.InputControl && (b ? d.disable() : d.enable())
  }
};
f.appendTo = function(a, b) {
  var c = document.createElement("div");
  b.appendChild(c);
  a.main = c
};
ui.util = new ui.Lib;
ui.util.validate = Validator;
baidu.on(window, "unload", function() {
  ui.util.dispose()
});
function _hide$$inline_327() {
  _layer$$inline_336.hide();
  _isShow$$inline_337 = !1;
  var a = _layer$$inline_336.getMain();
  a.onmouseover = null;
  a.onmouseout = null
}
function _preventHide$$inline_328() {
  _hideTimeout$$inline_338 && (clearTimeout(_hideTimeout$$inline_338), _hideTimeout$$inline_338 = null)
}
function Control$$inline_329(a) {
  ui.Control.call(this, a);
  this.type = "tip-entrance";
  this.mode = this.mode || "over";
  this.hideDelay && (this.hideDelay = parseInt(this.hideDelay, 10));
  this.disabled && this.setState("disabled", 1)
}
function _show$$inline_330(a, b) {
  if(b && a) {
    !_isInit$$inline_339 && Control$$inline_329._init();
    _isShow$$inline_337 && _preventHide$$inline_328();
    baidu.g(BODY_ID$$inline_334).innerHTML = b.content;
    var c = b.title;
    c ? (baidu.g(TITLE_ID$$inline_332).innerHTML = c, baidu.show(TITLE_ID$$inline_332)) : baidu.hide(TITLE_ID$$inline_332);
    var c = b.arrow, d = b.width || 300, e = b.closeButton, g = baidu.dom.getPosition(a), h = g.left, g = g.top, i = a.offsetWidth, j = a.offsetHeight, k = baidu.page.getWidth(), n = baidu.page.getHeight(), o = _layer$$inline_336.getMain(), l = o.offsetWidth, m = o.offsetHeight, q = 5, r = 0, p = 0, s = ARROW_CLASS$$inline_335, t, u, v, w, x, y, z, A;
    o.style.width = d + "px";
    baidu.lang.hasValue(c) || (c = Control$$inline_329.ARROW);
    baidu.lang.hasValue(e);
    if(c) {
      switch(p = 1, c = ("" + c).toLowerCase(), q = 20, r = 14, d = h + i - q, e = h + q - l, v = g + j + r, w = g - r - m, x = h + i + q, z = g + j - r, A = g + r - m, y = h - q - l, c) {
        case "tr":
          t = e;
          u = v;
          break;
        case "tl":
          t = d;
          u = v;
          break;
        case "bl":
          t = d;
          u = w;
          break;
        case "br":
          t = e;
          u = w;
          break;
        case "lt":
          t = x;
          u = z;
          break;
        case "lb":
          t = x;
          u = A;
          break;
        case "rb":
          t = y;
          u = A;
          break;
        case "rt":
          t = y;
          u = z;
          break;
        default:
          p = 0, q = -q
      }
    }
    if(!p) {
      u = g + j + r;
      c && (c = "t");
      if(u + m > n && 0 < (p = g - r - m)) {
        u = p, c && (c = "b")
      }
      t = h + i + q;
      c && (c += "l");
      if(t + l > k && 0 < (p = h - q - l)) {
        t = p, c && (c = c.substr(0, 1) + "r")
      }
    }
    c && (s += " " + ARROW_CLASS$$inline_335 + "-" + c);
    baidu.g(ARROW_ID$$inline_333).className = s;
    if("auto" != b.mode) {
      o.onmouseover = _preventHide$$inline_328;
      var B = b.hideDelay;
      o.onmouseout = function() {
        Control$$inline_329.hide(B)
      }
    }
    _isShow$$inline_337 = !0;
    _layer$$inline_336.show(t, u)
  }
}
var TITLE_ID$$inline_332 = "__TipLayerTitle", ARROW_ID$$inline_333 = "__TipLayerArrow", BODY_ID$$inline_334 = "__TipLayerBody", ARROW_CLASS$$inline_335 = "ui-tip-arrow", _layer$$inline_336, _isShow$$inline_337, _hideTimeout$$inline_338, _isInit$$inline_339;
Control$$inline_329.prototype = {render:function(a) {
  var a = a || this.main, b = this.mode, c = this._getDoShow();
  if(!this._isRender) {
    ui.Tip.superClass.render.call(this, a);
    switch(b) {
      case "over":
      ;
      case "click":
        "over" == b ? a.onmouseover = c : (a.onclick = c, a.style.cursor = "pointer");
        a.onmouseout = this._getOutHandler();
        break;
      case "auto":
        c()
    }
    this._isRender = 1
  }
}, _getDoShow:function() {
  var a = this;
  return function() {
    if(!a.getState("disabled")) {
      var b = a.title, c = a.content, d = a.width ? a.width : 300;
      "function" == typeof b && (b = b.call(a));
      "function" == typeof c && (c = c.call(a));
      _show$$inline_330(a.main, {title:b, content:c, width:d, arrow:a.arrow, hideDelay:a.hideDelay, mode:a.mode})
    }
  }
}, _getOutHandler:function() {
  var a = this;
  return function() {
    Control$$inline_329.hide(a.hideDelay)
  }
}, dispose:function() {
  if(this.main) {
    var a = this.main;
    a.onmouseover = null;
    this.main = a.onmouseout = null
  }
}};
baidu.inherits(Control$$inline_329, ui.Control);
Control$$inline_329.hide = function(a) {
  a = a || Control$$inline_329.HIDE_DELAY;
  _hideTimeout$$inline_338 = setTimeout(_hide$$inline_327, a)
};
Control$$inline_329.HIDE_DELAY = 300;
Control$$inline_329.show = _show$$inline_330;
Control$$inline_329._init = function() {
  if(!_isInit$$inline_339) {
    _isInit$$inline_339 = 1;
    _layer$$inline_336 = ui.util.create("Layer", {id:"__TipLayer", retype:"tip"});
    _layer$$inline_336.domId = "__TipLayertip";
    _layer$$inline_336.appendTo();
    var a = _layer$$inline_336.getMain(), b = document.createElement("h3"), c = document.createElement("div"), d = document.createElement("div"), e = ui.util.create("Button", {id:"__TipLayerClose", skin:"layerclose"});
    b.id = TITLE_ID$$inline_332;
    b.className = "ui-tip-title";
    a.appendChild(b);
    c.id = BODY_ID$$inline_334;
    c.className = "ui-tip-body";
    a.appendChild(c);
    d.id = ARROW_ID$$inline_333;
    d.className = ARROW_CLASS$$inline_335;
    a.appendChild(d);
    e.appendTo(a);
    e.onclick = _hide$$inline_327
  }
};
Control$$inline_329.ARROW = 0;
Control$$inline_329.CLOSE_BUTTON = 1;
ui.Tip = Control$$inline_329;
baidu.on(window, "load", ui.Tip._init);
var timeout$$inline_391, curUrl$$inline_412 = "";
jn.util = {da_generator:function(a) {
  for(var b = {}, c = 0, d = a.length;c < d;c++) {
    b[a[c].name] = function() {
      var b = a[c].url;
      return function(a, c, d) {
        "function" == typeof a ? Requester.post(b, null, a, d) : Requester.post(b, a, c, d)
      }
    }()
  }
  return b
}, getUserAgentClass:function() {
  var a = baidu.browser, b = [];
  a.ie ? (b.push("ie"), b.push("ie" + a.ie)) : a.firefox ? (b.push("firefox"), b.push("firefox" + a.firefox)) : a.chrome ? (b.push("chrome"), b.push("chrome" + a.chrome)) : a.opera && (b.push("opera"), b.push("opera" + a.opera));
  a.isGecko && b.push("gecko");
  a.isWebkit && b.push("webkit");
  return b.join(" ")
}, getListOperationHtml:function(a) {
  for(var b = a.length, c = 0, d = [], e, g = !0;c < b;c++) {
    e = a[c], e.auth && (g = er.controller.permit(e.auth)), d.push(baidu.format('<li><a title="{5}" href="{1}"{2}{3}{4}{6}>{0}</a></li>', e.title, e.location, e.blank ? ' target="_blank"' : "", g ? e.onclick ? ' onclick="' + e.onclick + '"' : "" : ' onclick="return false;"', g ? "" : ' class="coup-link-disable"', e.tip ? e.tip.replace(/\"/g, "&quot;") : "", e.cmd ? ' data-cmd-type="' + e.cmd + '"' : ""))
  }
  return baidu.format('<ul class="list-table-operation">{0}</ul>', d.join('<div class="seperator"></div>'))
}, getBatchUploadUrl:function(a) {
  return er.context.get(a || "materialUploadUrlList")[0].value + ";JSESSIONID=" + baidu.cookie.get("JSESSIONID")
}, showTip:function(a, b) {
  if(a) {
    timeout$$inline_391 && (clearTimeout(timeout$$inline_391), timeout$$inline_391 = null);
    var c = baidu.g("coupDomTip"), d = baidu.dom.getPosition(a), e = a.offsetWidth;
    c || (c = document.createElement("div"), c.className = "coup-domtip", c.id = "coupDomTip", document.body.appendChild(c));
    c.innerHTML = b;
    c.style.left = d.left + e + 10 + "px";
    c.style.top = d.top + "px";
    c = null;
    timeout$$inline_391 = setTimeout(function() {
      baidu.g("coupDomTip").style.left = "-10000px"
    }, 2500)
  }
}, stringToDate:function(a) {
  for(var a = a.match(/^(\d{4})(\d{2})(\d{2})(\d{2})*$/), b = a.length;b--;) {
    a[b] = parseInt(a[b], 10)
  }
  return new Date(a[1], a[2] - 1, a[3])
}, listItemParse:function(a) {
  return{value:a.v, text:a.l}
}, toMap:function(a, b, c) {
  var d, e, g, h = {};
  for(d = a.length;d--;) {
    e = a[d], g = e[b], null != g && (baidu.lang.isFunction(c) ? (e = c(e), h[e.key] = e.value) : h[g] = baidu.lang.isString(c) ? e[c] : e)
  }
  return h
}, encodeJsonString:function(a) {
  var b = [[/"/g, '"'], [/</g, "&lt;"], [/>/g, "&gt;"], [/'/g, "'"], [/\//g, "/"], [/\\/g, "\\"]], c = a;
  if("string" == typeof a) {
    for(a = 0;a < b.length;a++) {
      c = c.replace(b[a][0], b[a][1])
    }
  }
  return c
}, decodeString:function(a) {
  var b = [[/&#34;/g, '"'], [/&#38;/g, "&"], [/&#60;/g, "<"], [/&#62;/g, ">"], [/&#39;/g, "'"], [/&#47;/g, "/"], [/&#92;/g, "\\"]];
  if("string" == typeof a) {
    for(var c = 0, d = b.length;c < d;c++) {
      a = a.replace(b[c][0], b[c][1])
    }
  }
  return a
}, showInviteMsg:function(a, b) {
  baidu.g("reinviteMsg").innerHTML = a;
  var c = baidu.g("reinviteWrapper"), d = 0, e = 0;
  window.innerWidth ? (e = window.pageXOffset, d = window.pageYOffset) : document.documentElement && document.documentElement.clientWidth ? (e = document.documentElement.scrollLeft, d = document.documentElement.scrollTop) : document.body.clientWidth && (e = document.body.scrollLeft, d = document.body.scrollTop);
  c.style.left = b.left + e + 35 + "px";
  c.style.top = b.top + d - 150 + "px";
  window.setTimeout(function() {
    c.style.left = "-10000px";
    c.style.top = "-10000px"
  }, 2500)
}, autoEllipseText:function(a, b, c) {
  return baidu.string.fast_ellipse(a, b, c)
}, truncate:function(a, b) {
  var c = b || 100, d = a.length;
  if(d <= c) {
    return a
  }
  c = a.substr(0, c / 2);
  return c + "..." + a.substr(d - c.length)
}, trimToCharLength:function(a, b) {
  var c = 0, a = baidu.string.trim(a);
  if("" == a) {
    return a
  }
  for(var d = 0;d < a.length;d++) {
    if(c = 128 > a.charCodeAt(d) ? c + 1 : c + 2, c > b) {
      a = a.substr(0, d) + "...";
      break
    }
  }
  return a
}, regexp:{urlLoose:/^((http|https|ftp|ftps):\/\/)?[A-Za-z0-9][A-Za-z0-9-]{0,}[A-Za-z0-9]?(\.[A-Za-z0-9]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/i, urlStrict:/^(http|https|ftp|ftps):\/\/[A-Za-z0-9][A-Za-z0-9-]{0,}[A-Za-z0-9]?(\.[A-Za-z0-9]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/i}, next_id_:0, id_generator:function() {
  return"coup" + (jn.util.next_id_++).toString(36)
}, getLoadingHtml:function() {
  return baidu.format('<div class="list-loading"><span>{0}</span></div>', jn.lang.dataLoading)
}, extractField:function(a, b) {
  if(!baidu.lang.isArray(a)) {
    return null
  }
  var c = [];
  baidu.each(a, function(a) {
    c.push(a[b])
  });
  return c
}, getStatusHtml:function(a, b) {
  return baidu.format('<span class="{1}">{0}</span>', a, b[a])
}, getStatusHtmlbyColor:function(a, b) {
  return baidu.format('<span style="color:{1}">{0}</span>', a, b)
}, getDatePart:function(a) {
  if(!1 !== baidu.lang.isDate(a)) {
    return new Date(a.getFullYear(), a.getMonth(), a.getDate())
  }
}, loadPopup:function(a, b, c, d) {
  var e = a.c("popup"), g;
  e || (e = ui.util.createControl({type:"Dialog", id:"popup", skin:"form-container"}), a.addChild(e));
  e.setWidth(c.width || 600);
  e.show();
  e.setTitle(c.title || "");
  g = er.controller.loadAction(e.getBody(), b, d);
  e.onclose = function() {
    g.leave()
  };
  return g
}, unloadPopup:function(a) {
  (a = a.c("popup")) && a.close()
}, drawGraph:function(a) {
  var b = parseInt(100 * a, 10), c = [];
  90 < b && (b = 90);
  c.push('<table cellspacing="0" cellpadding="0" border="0" style="height: 16px;line-height: 16px;width:98%">');
  c.push("<tr>");
  c.push('<td style="width:' + b + '%;background-color: #1290BF; "></td>');
  c.push('<td style="width:' + (100 - b) + '%;align:left">');
  c.push("&nbsp;&nbsp;" + (100 * a).toFixed(2) + "%");
  c.push("</td>");
  c.push("</tr>");
  c.push("</table>");
  return c.join("")
}, isSameDate:function(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() ? !0 : !1
}, getReportDateText:function(a) {
  var b = a.begin, a = a.end, c = new Date;
  if(jn.util.isSameDate(b, a) && jn.util.isSameDate(b, c)) {
    return"\u4eca\u5929"
  }
  c.setDate(c.getDate() - 1);
  return jn.util.isSameDate(b, a) && jn.util.isSameDate(b, c) ? "\u6628\u5929" : jn.util.isSameDate(a, c) && (c.setDate(c.getDate() - 6), jn.util.isSameDate(b, c)) ? "\u524d\u4e03\u5929" : baidu.format("{0} \u81f3 {1}", baidu.date.format(b, "yyyy-MM-dd"), baidu.date.format(a, "yyyy-MM-dd"))
}, getFixed:function(a, b) {
  return parseFloat(a).toFixed(b ? b : 2)
}, getRMB:function(a) {
  return"\u00a5 " + parseFloat(a).toFixed(2)
}, getCommaFormat:function(a) {
  var b = (a + "").split("").reverse(), c = [];
  if(!/^\d*$/.test(a + "")) {
    return a
  }
  for(a = 0;a < b.length;a++) {
    c.push(b[a]), 0 == (a + 1) % 3 && a != b.length - 1 && c.push(",")
  }
  return c.reverse().join("")
}, getRaiseUnitFormat:function(a, b, c, d) {
  a >= Math.pow(10, b - 1) ? (a = Math.round(a / Math.pow(10, c)), d = jn.util.getCommaFormat(a) + d) : d = jn.util.getCommaFormat(a);
  return d
}, getZeroPercent:function(a) {
  return"0.00%" === a ? "--" : a
}, redirectHandler:function(a) {
  return function() {
    er.locator.redirect(a)
  }
}, dateFormat:function(a, b) {
  return baidu.date.format(baidu.date.parseToDate(a), b || "yyyy-M-d HH:mm:ss")
}, heighten:function(a) {
  a = baidu.g(a);
  baidu.removeClass(a, "jn-flat")
}, flatten:function(a) {
  a = baidu.g(a);
  baidu.addClass(a, "jn-flat")
}, toggleHeight:function(a, b) {
  var c = baidu.g(a);
  void 0 != b && (b ? baidu.addClass(c, "jn-flat") : baidu.removeClass(c, "jn-flat"));
  baidu.dom.toggleClass(c, "jn-flat")
}, showFlash:function(a, b) {
  var a = baidu.g(a), c = baidu.dom.next(a.parentNode) || baidu.dom.next(a.parentNode.parentNode);
  baidu.dom.setStyle(c, "margin-top", a.offsetHeight + "px");
  baidu.dom.setStyle(a, "right", "0px");
  b && b.setFollowTop(b.getFollowTop() + a.offsetHeight)
}, hideFlash:function(a, b) {
  var a = baidu.g(a), c = baidu.dom.next(a.parentNode) || baidu.dom.next(a.parentNode.parentNode);
  baidu.dom.setStyle(c, "margin-top", "0px");
  baidu.dom.setStyle(a, "right", "10000px");
  b && b.setFollowTop(b.getFollowTop() - a.offsetHeight)
}, confirmHandler:function(a) {
  var b = this, c = {title:"\u8be2\u95ee", content:"\u786e\u5b9a\u8981\u6267\u884c\u6b64\u64cd\u4f5c\u5417\uff1f", handler:function() {
  }, args:{}};
  baidu.object.extend(c, a);
  ui.Dialog.confirm({title:c.title, content:c.content, onok:function() {
    c.handler.call(b, c.args)
  }})
}, confirmSingleHandler:function(a) {
  var b = er.controller.currentAction, a = baidu.json.parse(a), c = {title:"\u8be2\u95ee", content:"\u786e\u5b9a\u8981\u6267\u884c\u6b64\u64cd\u4f5c\u5417\uff1f", handler:function() {
  }, args:{ids:a.ids}};
  baidu.object.extend(c, a);
  c.handler = b.batchEvent[c.handler];
  ui.Dialog.confirm({title:c.title, content:c.content, onok:function() {
    c.handler.call(b, c.args)
  }})
}, dialogInitSingle:function(a, b) {
  a = baidu.json.parse(a);
  b && (b = baidu.json.parse(b));
  if(!a.id) {
    throw Error("please set the dialog id.");
  }
  if(!a.title) {
    throw Error("please set the dialog title.");
  }
  if(a.foot && !a.okHandler) {
    throw Error("please set the dialog okHandler when the foot is true.");
  }
  var c = er.controller.currentAction, d, e = er.template.get(a.template), e = e ? e : a.template, g = {id:a.id, title:a.title, skin:a.skin};
  a.width && (g.width = a.width);
  c.page.c(a.id) ? (d = c.page.c(a.id), c[a.showHandler] && c[a.showHandler].call(c, b), !0 === a.foot && (d.c("btnFootOk").onclick = function() {
    d.close();
    c[a.okHandler] && c[a.okHandler].call(c, b)
  })) : (d = ui.util.create("Dialog", g), c.page.addChild(d), d.setContent(e), c[a.showHandler] && c[a.showHandler].call(c, b), !0 === a.foot && (d.setFoot('<div class="floatleft" ui="type:Button;id:btnFootOk;" >\u786e\u5b9a</div><div class="floatleft"><a ui="type:Link;id:btnFootCancel;" >\u53d6\u6d88</a></div>'), baidu.dom.setStyles(d.getFoot(), {height:"24px", "line-height":"24px"}), d.c("btnFootOk").onclick = function() {
    d.close();
    c[a.okHandler] && c[a.okHandler].call(c, b)
  }, d.c("btnFootCancel").onclick = function() {
    d.close()
  }));
  d.show();
  return d
}, dialogInit:function(a) {
  if(!a.id) {
    throw Error("please set the dialog id.");
  }
  if(!a.title) {
    throw Error("please set the dialog title.");
  }
  if(a.foot && !a.okHandler) {
    throw Error("please set the dialog okHandler when the foot is true.");
  }
  var b = er.template.get(a.template), b = b ? b : a.template, c = '<div class="floatleft" ui="type:Button;id:btnFootOk;" >' + (a.okText || "\u4fdd\u5b58") + '</div><div class="floatleft"><a ui="type:Link;id:btnFootCancel;">' + (a.cancelText || "\u53d6\u6d88") + "</a></div>", d = {id:a.id, title:a.title, skin:a.skin || "coup"};
  a.width && (d.width = a.width);
  var e = ui.util.create("Dialog", d);
  (this.page || this).addChild(e);
  e.setContent(b);
  !0 === a.foot ? (e.setFoot(c), baidu.dom.setStyles(e.getFoot(), {height:"24px", "line-height":"24px"}), e.c("btnFootOk").onclick = function() {
    a.okHandler() !== false && e.close()
  }, e.c("btnFootCancel").onclick = function() {
    a.cancelHandler && a.cancelHandler();
    e.close()
  }) : e.hideFootLine();
  b = e.getFoot();
  c = document.createElement("div");
  baidu.addClass(c, "mod-validate");
  c.innerHTML = baidu.format('<div id="{0}" class="ui-dialog-validate-text" style="display:none;"></div>', e.getId() + "_validatetext");
  baidu.dom.insertBefore(c, b);
  e.showError = function(a) {
    ui.util.validate.hideError(baidu.g(e.getId() + "_validatetext"));
    ui.util.validate.showError(baidu.g(e.getId() + "_validatetext"), a)
  };
  e.hideError = function() {
    ui.util.validate.hideError(baidu.g(e.getId() + "_validatetext"))
  };
  e.onBeforeHide = e.hideError;
  return e
}, stringify:function(a) {
  return baidu.json.stringify(a).replace(/\"/g, "\\'")
}, download:function(a) {
  var b = Requester.getAdOwnerParam(), c = /\?/.test(a), a = a + ("" != b ? (c ? "&" : "?") + b : ""), b = baidu.g("__DownloadContainer__");
  b || (b = document.createElement("div"), b.id = "__DownloadContainer__", b.style.display = "none", document.body.appendChild(b));
  b.innerHTML = baidu.format('<form action="{0}" method="post" id="{1}" name="{1}" target="{2}"></form>\n<iframe src="about:blank" id="{2}" name="{2}"></iframe>', a, "__DownloadForm__", "__DownloadIframe__");
  baidu.g("__DownloadForm__").submit()
}, getTimeInterval:function(a, b, c) {
  var d = new Date, e = new Date(d.getTime() - 864E5), g = new Date(d), h;
  a && (h = d.getMonth() < a ? d.getMonth() + 12 - a : d.getMonth() - a, a = d.getMonth() < a ? d.getFullYear() - 1 : d.getFullYear(), g.setFullYear(a), g.setMonth(h));
  b && (g = new Date(g.getTime() - 864E5 * b));
  return"yesterday" === c ? {begin:g, end:e} : {begin:g, end:d}
}, getDefaultTimeInterval:function(a) {
  var b = new Date, c = er.context.get("defaultStartTimeMap").getKey("defaultStartTime"), c = baidu.date.parseToDate(c), d, e;
  try {
    d = baidu.date.parseToDate(a.startTime), e = baidu.date.parseToDate(a.endTime)
  }catch(g) {
  }
  return{begin:d || c, end:e || b}
}, getShortText:function(a, b) {
  var c = b || 50, b = baidu.string.getByteLength(a);
  return b <= c ? a : baidu.string.subByte(a, c) + "..."
}, timeHelper:{getMcalTime:function() {
  var a = er.context.get("statisticsDateInterval");
  a || (a = jn.util.getTimeInterval(0, 1, "yesterday"), er.context.set("statisticsDateInterval", a));
  return a
}, setMcalTime:function(a) {
  er.context.set("statisticsDateInterval", a)
}, checkAndSetMcalTime:function(a) {
  function b(a) {
    return new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0)
  }
  var c, d, e;
  c = b(a.begin);
  d = b(a.end);
  e = new Date(d);
  e.setFullYear(d.getFullYear() - 1);
  if(c.getTime() < e.getTime()) {
    return ui.Dialog.alert({title:"\u63d0\u793a", content:'<span class="red">\u65f6\u95f4\u8de8\u5ea6\u6700\u957f\u4e3a1\u5e74!</span>'}), !1
  }
  er.context.set("statisticsDateInterval", a);
  return!0
}}, endWith:function(a, b) {
  var c = a.length, d = b.length;
  return null == b || "" == b || 0 == c || d > c ? !1 : a.substring(c - d) == b ? !0 : !1
}, initEllipsisEvent:function(a) {
  function b(a) {
    for(var b = baidu.q("coup-ellipsis", a), c, d, e = 0, n = b.length;e < n;e++) {
      for(c = b[e].parentNode;c && !baidu.dom.hasClass(c, "ui-table-cell-text");) {
        c = c.parentNode
      }
      if(baidu.dom.hasClass(c, "coup-ellipsis-sizing-by-others")) {
        try {
          c = baidu.q("coup-ellipsis-sizing-ctner", c.parentNode)[0]
        }catch(o) {
        }
      }
      d = baidu.dom.first(c);
      if(!d || "coup-ellipsis-sizer" != d.className) {
        var l = baidu.dom.create("div", {className:"coup-ellipsis-sizer"});
        l.innerHTML = "&nbsp;";
        d = d ? baidu.dom.insertBefore(l, d) : c.appendChild(l)
      }
      c = b[e].offsetWidth;
      d = d.offsetWidth;
      c = d - c;
      0 >= d || (12 > c && 0 <= c || 12 <= c && !jn.util.endWith(b[e].innerHTML, "...")) || (c = (b[e].title ? b[e].title : b[e].getAttribute("content")).replace("&quot;", '"'), b[e].innerHTML = jn.util.autoEllipseText(c, d))
    }
    if(6 == baidu.ie) {
      a = baidu.q("coup-ellipsis-reflow", a);
      e = 0;
      for(n = a.length;e < n;e++) {
        baidu.dom.addClass(a[e], "coup-class-not-exist"), baidu.dom.removeClass(a[e], "coup-class-not-exist")
      }
    }
  }
  var c = a._hideDragMark;
  a._hideDragMark = function() {
    c.call(a);
    b(a.getId())
  };
  var d = a._repaintXScroll;
  a._repaintXScroll = function() {
    d.call(a);
    b(a.getId())
  };
  var e = a.openSubrow;
  a.openSubrow = function(c) {
    e.call(a, c);
    b(a._getSubrowId(c))
  };
  a.addListener(ui.events.AFTER_RENDER, function() {
    b(a.getId())
  });
  a.datasource && 0 < a.datasource.length && b(a.getId());
  return b
}, urlHelper:{encode:function(a) {
  return!a ? "" : encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, "$$$1")
}, decode:function(a) {
  return!a ? "" : decodeURIComponent(a.replace(/\$([0-9A-F]{2})/g, "%$1"))
}, encodeQuery:function(a) {
  if(a) {
    var a = baidu.url.queryToJson(a), b = [];
    baidu.object.each(a, function(a, d) {
      b.push(d + "=" + jn.util.urlHelper.encode(a))
    });
    return b.join("&")
  }
}, decodeQuery:function(a) {
  if(a) {
    var a = baidu.url.queryToJson(a), b = [];
    baidu.object.each(a, function(a, d) {
      b.push(d + "=" + jn.util.urlHelper.decode(a))
    });
    return b.join("&")
  }
}}, parseMessage:function(a) {
  var a = a.field, b = [];
  if(a) {
    return baidu.object.each(a, function(a) {
      b.push(a)
    }), b.join("<br />")
  }
}, showErrorMessage:function(a) {
  ui.Dialog.alert({title:"\u9519\u8bef", content:'<span class="red">' + (baidu.lang.isString(a) ? a : jn.util.parseMessage(a)) + "</span>"})
}, validateModifyPwd:function(a, b, c, d, e) {
  if("" == b || "" == c || "" == d) {
    a.showError("\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a")
  }else {
    if(!/^[0-9a-zA-Z]{6,16}$/.test(c) || !/[0-9]+/.test(c) || !/[a-z]+/.test(c) || !/[A-Z]+/.test(c)) {
      a.showError("\u5bc6\u7801\u9700\u7531\u5927\u5199\u5b57\u6bcd\u3001\u5c0f\u5199\u5b57\u6bcd\u548c\u6570\u5b57\u7ec4\u6210\uff0c6-16\u4e2a\u5b57\u7b26\uff01")
    }else {
      if(c != d) {
        a.showError("\u4e24\u6b21\u8f93\u5165\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01")
      }else {
        if(c == b) {
          a.showError("\u65b0\u5bc6\u7801\u4e0d\u80fd\u4e0e\u5f53\u524d\u5bc6\u7801\u76f8\u540c\uff01")
        }else {
          return e
        }
      }
    }
  }
}, moneyFormat:function(a) {
  for(var a = (a + "").replace(/^(-?\d*)$/, "$1."), a = (a + "00").replace(/(-?\d*\.\d{2})\d*/, "$1"), a = a.replace(".", ","), b = /(\d)(\d{3},)/;b.test(a);) {
    a = a.replace(b, "$1,$2")
  }
  a = a.replace(/,(\d{2})$/, ".$1");
  return a.replace(/^-?\./, "0.")
}, getTreeNodeParents:function(a, b, c) {
  var d = a.children;
  b || (b = []);
  c || (c = {});
  c[a.id] = b;
  if(d && 0 < d.length) {
    var e = {}, g;
    for(g in a) {
      "children" != g && (e[g] = a[g])
    }
    a = baidu.object.clone(b);
    a[a.length] = e;
    for(e = 0;e < d.length;e++) {
      jn.util.getTreeNodeParents(d[e], a, c)
    }
  }
  return c
}, getTreeMap:function(a, b) {
  var c = a.children;
  b || (b = {}, a = baidu.object.clone(a));
  b[a.id] = a;
  if(c && 0 < c.length) {
    for(var d = 0;d < c.length;d++) {
      jn.util.getTreeMap(c[d], b)
    }
  }
  return b
}, convertPeopleTreeDatasource:function(a) {
  var b = "", c = "", d = 0, a = baidu.object.clone(a);
  "undefined" != typeof a.isShared && "true" == a.isShared && (b = '<div class="coup-icon-shared" title="\u5171\u4eab\u4eba\u7fa4"></div>', d += 12);
  "undefined" != typeof a.coverLevel && "-1" != a.coverLevel && ("0" == a.coverLevel ? (c = '<div class="float-left green" title="\u4eba\u7fa4\u8986\u76d6\u661f\u7ea7">\u8ba1\u7b97\u4e2d...</div>', d += 54) : (c = baidu.format('<div class="coup-icon-cover-level-{0}" title="\u4eba\u7fa4\u8986\u76d6\u661f\u7ea7"></div>', a.coverLevel), d += 60));
  a.html = b + c;
  a.htmlWidth = d;
  if(a.children && 0 < a.children.length) {
    b = 0;
    for(c = a.children.length;b < c;b++) {
      a.children[b] = jn.util.convertPeopleTreeDatasource(a.children[b])
    }
  }
  return a
}, updateMaterialGroupResultDialogInit:function() {
  var a = jn.util.dialogInit.call(this, {id:"updateMGResultDialogDialog", title:"\u66f4\u65b0\u7269\u6599\u7ec4\u7ed3\u679c", template:"resultFormFailDailog", width:700, foot:!1});
  a.failIds = [];
  a.c("btnDownload").onclick = baidu.fn.bind(function() {
    jn.util.download("/product/download?ids=" + a.failIds.join(","))
  }, this);
  a.c("skipLink").setContent("\u6682\u4e0d\u66f4\u65b0\u4e0a\u8ff0\u5546\u54c1\u7269\u6599\u7ec4");
  a.c("skipLink").onclick = function() {
    a.close()
  };
  this.toggleTargetClass || (this.toggleTargetClass = function(a, c) {
    switch(c) {
      case "over":
        baidu.dom.addClass(a, "coup-target-item-over");
        break;
      case "out":
        baidu.dom.removeClass(a, "coup-target-item-over")
    }
  });
  a.showResult = function(b) {
    var c = b.result.successNum, b = b.result.failReason;
    if(!b || !b.length) {
      return false
    }
    if(parseInt(c) + b.length > 1) {
      a.c("failMsg").setContent(baidu.format("\u5df2\u6210\u529f\u6293\u53d6\u4e86{0}\u4e2a\u5546\u54c1\u5f00\u59cb\u7269\u6599\u751f\u6210\uff0c\u9700\u8981\u4e00\u5b9a\u65f6\u95f4\uff0c\u6210\u529f\u540e\u53ef\u4ee5\u5728\u5546\u54c1\u5bf9\u5e94\u7684\u7269\u6599\u7ec4\u5217\u8868\u4e2d\u67e5\u770b\u3002", c));
      a.c("lbFailTitle").setContent(baidu.format("\u4ee5\u4e0b{0}\u4e2a\u5546\u54c1\u672a\u6210\u529f\u6293\u53d6\uff0c\u539f\u56e0\u5982\u4e0b\uff1a", b.length))
    }else {
      a.c("failMsg").setContent("\u5546\u54c1\u672a\u6210\u529f\u6293\u53d6\uff0c\u539f\u56e0\u5982\u4e0b\uff1a");
      a.c("lbFailTitle").setContent("")
    }
    for(var c = er.template.get("targetItemTpl"), d = [], e = "", g = [], h = 0, i = b.length;h < i;h++) {
      e = baidu.format('<div><div class="coup-fail-reason-product">- {0}</div><div class="coup-fail-reason-desc">\u539f\u56e0\uff1a {1}</div><div class="clear-both"></div></div>', baidu.string.encodeHTML(b[h].productName), baidu.string.encodeHTML(b[h].reason));
      d.push(baidu.format(c, baidu.string.encodeHTML(b[h].reason), e));
      g.push(b[h].productId)
    }
    a.failIds = g;
    a.c("lbFailReason").setContent(d.join("\n"));
    a.show()
  };
  return a
}, convertToSelectDatasource:function(a) {
  var b = [];
  baidu.lang.isString(a) && (a = er.context.get(a));
  for(var c = 0;c < a.length;c++) {
    b.push({name:a[c].text, text:a[c].text, value:a[c].value})
  }
  return b
}, getEditPriceAuth:function() {
  var a = er.context.get("visitor").roleName;
  return-1 != er.context.get("systemPreferenceMap").getKey("goldEditPriceAuth").indexOf(a)
}, parsePriceToEditTxt:function(a, b, c, d) {
  var e = er.context.get("goldPriceTypeMap"), g = (a.price + "").split(","), h = a.priceInherit, i = "", i = "brief" !== c ? "\u00a5 " : "\u00a5";
  switch(e[a.priceType]) {
    case "noAuction":
      i += baidu.format("{0}{1}", parseFloat(g[0]).toFixed(2), "brief" !== c ? "(\u4e00\u9636\u8ba1\u8d39)" : "");
      break;
    case "nonRealTime":
      i += baidu.format("{0}{1}", parseFloat(g[0]).toFixed(2), "brief" !== c ? "(\u4e8c\u9636\u8ba1\u8d39)" : "");
      break;
    case "realTime":
      i += baidu.format("{0}~{1}{2}", parseFloat(g[0]).toFixed(2), parseFloat(g[1]).toFixed(2), "brief" !== c ? "(\u4e8c\u9636\u8ba1\u8d39)" : "");
      break;
    default:
      i = "--"
  }
  "undefined" != typeof a.priceInherit && b && (i = "true" == h ? baidu.format('<span{0} onmouseover="ui.Tip.show(this, {content:\'\u4f7f\u7528{1}\u7684\u5355\u4ef7\',arrow:1});" onmouseout="ui.Tip.hide();">{2}</span>', d ? ' data-cmd-type="' + d + '"' : "", "product" === b ? "\u63a8\u5e7f\u8ba1\u5212" : "\u5546\u54c1", i) : baidu.format('<b{0} onmouseover="ui.Tip.show(this, {content:\'\u81ea\u5b9a\u4e49\u5355\u4ef7\',arrow:1});" onmouseout="ui.Tip.hide();">{1}</b>', d ? ' data-cmd-type="' + d + 
  '"' : "", i));
  return i
}, support:{output:function(a) {
  var b = {action:"docInterface", url:"", method:"jn.util.support.callback", num:10, encoding:"utf8"};
  baidu.extend(b, a);
  curUrl$$inline_412 = b.url;
  er.context.get(curUrl$$inline_412) ? jn.util.support.callback(er.context.get(curUrl$$inline_412)) : (a = baidu.dom.create("script", {src:"http://yingxiao.baidu.com/support/?" + baidu.url.jsonToQuery(b), charset:"utf-8", id:"_supeor"}), document.body.appendChild(a))
}, callback:function(a) {
  var b = [];
  er.context.set(curUrl$$inline_412, a);
  for(var c = 0, d = a.length;c < d;c++) {
    b.push("<a href = '" + a[c].url + "' target='_blank'>" + a[c].title + "</a>")
  }
  b = (b = b.join("</li><li>")) ? ['<ul class="support-content"><li>', b, "</li></ul>"].join("") : "";
  if(a = baidu.g("supportChild") || baidu.g("supportMain")) {
    a.innerHTML = ['<h4 class="support-title">\u60a8\u53ef\u80fd\u9700\u8981\u4e86\u89e3</h4>', b, '<a target="_blank" href="http://yingxiao.baidu.com/support/jn/index.html">\u652f\u6301\u4e2d\u5fc3</a>'].join("")
  }
}, tip:function(a) {
  return!a ? "" : (a = er.context.get("coupKeywordsMap")[a]) ? ['<div style=""', " onmouseover=\"ui.Tip.show(this,{title:'" + a.l + "',content:'" + a.v + "',arrow:1});\" ", ' onmouseout="ui.Tip.hide();" class="ui-tip-entrance skin-tip-entrance-help"></div>'].join("") : ""
}, extendModel:function(a) {
  a = baidu.object.clone(a);
  baidu.array.each(a, function(a) {
    a.tip && a.text && (a.text = ['<div class="coup-float-left">', a.text, '</div><div class="coup-float-left" style="_padding-top:4px;">', jn.util.support.tip(a.tip), "</div>"].join(""))
  });
  return a
}}};
jn.landmark = {};
jn.landmark.promotion = {};
jn.landmark.promotion.Fields = {};
jn.landmark.promotion.config = {action:[], url:{adTree:"/data/landmark/promotion/173/tree", adDownload:"/data/landmark/promotion/173/report/download?", packageList:"/data/landmark/targeting/pack/list", packageListComplex:"/data/landmark/promotion/pack/list", promotionPeriod:"/data/landmark/promotion/period", lastRound:"/data/landmark/promotion/lastRound", thisRound:"/data/landmark/promotion/thisRound", contractList:"/data/landmark/contract/list", createAd:"/data/landmark/promotion/173/create", addPackage:"/data/landmark/promotion/173/pack/add", 
adList:"/data/landmark/promotion/173/list", adSummary:"/data/landmark/promotion/173/detail", modAd:"/data/landmark/promotion/173/modify", materialList:"/data/landmark/promotion/material/list", materialLine:"/data/landmark/promotion/material/chart/line", deletMaterial:"/data/landmark/promotion/material/delete", withdrawMaterial:"/data/landmark/promotion/material/withdraw", enableMaterial:"/data/landmark/promotion/material/activate", downloadReport:"/data/landmark/promotion/material/report/download?", 
getMaterialIfr:"/data/landmark/promotion/material/preview", parityList:"/data/landmark/promotion/pack/paritylist", deletePackage:"/data/landmark/promotion/pack/delete", viewKeywords:"/data/landmark/promotion/pack/keywords", packageBid:"/data/landmark/promotion/package/bid", packageDownload:"/data/landmark/promotion/pack/report/download?"}, contractListFields:[{field:"contractNo", title:"\u5408\u540c\u53f7", sortable:!0, width:120, stable:!0, align:"left", dragable:1, content:function(a) {
  return a.contractNo
}}, {field:"effectDate", title:"\u751f\u6548\u65e5\u671f", sortable:!0, width:80, align:"left", dragable:1, content:function(a) {
  return baidu.date.format(baidu.date.parseToDate(a.effectDate), "yyyy-M-d")
}}, {field:"expireDate", title:"\u5931\u6548\u65e5\u671f", sortable:!0, width:80, align:"left", dragable:1, content:function(a) {
  return baidu.date.format(baidu.date.parseToDate(a.expireDate), "yyyy-M-d")
}}, {field:"accountManager", title:"\u5ba2\u6237\u7ecf\u7406", sortable:!0, width:80, align:"left", dragable:1, content:function(a) {
  return baidu.format('<span title="{0}" class="coup-ellipsis">{1}</span>', a.accountManager.replace(/\"/g, "&quot;"), a.accountManager)
}}, {field:"salesAssistant", title:"\u9500\u552e\u52a9\u7406", sortable:!0, width:80, align:"left", dragable:1, content:function(a) {
  return baidu.format('<span title="{0}" class="coup-ellipsis">{0}</span>', a.salesAssistant)
}}, {field:"channelManager", title:"\u6e20\u9053\u7ecf\u7406", sortable:!0, width:80, align:"left", dragable:1, content:function(a) {
  return baidu.format('<span title="{0}" class="coup-ellipsis">{1}</span>', a.channelManager.replace(/\"/g, "&quot;"), a.channelManager)
}}, {field:"agency", title:"\u4ee3\u7406\u516c\u53f8", sortable:!0, width:80, align:"left", dragable:1, content:function(a) {
  return baidu.format('<span title="{0}" class="coup-ellipsis">{1}</span>', a.agency.replace(/\"/g, "&quot;"), a.agency)
}}, {field:"advertiser", title:"\u5e7f\u544a\u4e3b", sortable:!0, width:80, align:"left", dragable:1, content:function(a) {
  return baidu.format('<span title="{0}" class="coup-ellipsis">{1}</span>', a.advertiserName.replace(/\"/g, "&quot;"), a.advertiserName)
}}, {field:"summary", title:"\u5185\u5bb9\u6458\u8981", sortable:!0, width:280, align:"left", dragable:1, content:function(a) {
  return baidu.format('<span title="{0}" class="coup-ellipsis">{0}</span>', a.summary)
}}], adListFields:[{field:"adName", title:function() {
  return"\u63a8\u5e7f\u8ba1\u5212"
}, subEntry:1, sortable:!0, width:250, minWidth:95, align:"left", dragable:1, content:function(a) {
  return baidu.format('<div>\n<div class="coup-ellipsis-sizing-ctner coup-icon-sizer">&nbsp;</div>\n<div class="ui-table-cell-text coup-ellipsis-sizing-by-others coup-float-left">\n<a href="{0}" title="{1}" class="coup-ellipsis">{1}</a>\n</div>\n<div class="coup-float-right">\n<a data-ad-id="{3}" data-cmd-type="DAILY_REPORT" class="view-round-link" href="{2}" target="_blank" title="\u5206\u8f6e\u67e5\u770b"></a>\n</div>\n</div>', "#/jn/landmark/promotion/package_list~adId=" + a.adId, baidu.string.encodeHTML(a.adName), 
  "#", a.adId)
}}, {field:"status", title:"\u72b6\u6001", sortable:!0, width:140, stable:!0, align:"left", content:function(a) {
  return jn.landmark.promotion.config.adStatusMap[a.status]
}}, {field:"impressionCount", title:"\u5c55\u73b0\u6b21\u6570", sortable:!0, width:40, minWidth:82, align:"right", dragable:1, content:function(a) {
  return a.impressionCount
}}, {field:"clickCount", title:"\u70b9\u51fb\u6b21\u6570", sortable:!0, width:40, minWidth:82, align:"right", dragable:1, content:function(a) {
  return a.clickCount
}}, {field:"clickRatio", title:"\u70b9\u51fb\u7387", sortable:!0, width:40, minWidth:70, align:"right", dragable:1, content:function(a) {
  return a.clickRatio + "%"
}}, {field:"spend", title:"\u6d88\u8d39", width:40, minWidth:82, align:"right", dragable:1, content:function(a) {
  return"\u00a5" + jn.util.moneyFormat(a.spend)
}}], packageSimplifyFields:[{width:30, title:"\u5173\u952e\u8bcd\u8bcd\u5305", field:"name", dragable:1, ellipsis:!0, content:function(a) {
  return a.name
}}, {width:30, title:"\u65e5\u5747\u5c55\u73b0\u91cf", field:"impressionCountDaily", dragable:1, sortable:!0, ellipsis:!0, content:function(a) {
  return a.impressionCountDaily
}}, {width:30, title:"\u5e95\u4ef7", field:"price", dragable:1, sortable:!0, ellipsis:!0, content:function(a) {
  return"\u00a5" + a.price
}}, {width:30, title:"\u64cd\u4f5c", field:"id", dragable:1, ellipsis:!0, content:function(a) {
  var b = [];
  b.push({title:"\u67e5\u770b\u5173\u952e\u8bcd", location:"#/void~packId=" + a.id, cmd:"VIEW"});
  return jn.util.getListOperationHtml(b)
}}], packageFields:[{width:170, title:"\u5173\u952e\u8bcd\u8bcd\u5305", field:"packName", dragable:1, content:function(a) {
  return baidu.format('<div>\n<div class="coup-ellipsis-sizing-ctner coup-icon-sizer">&nbsp;</div>\n<div class="ui-table-cell-text coup-ellipsis-sizing-by-others coup-float-left">\n<span title="{0}" class="coup-ellipsis">{0}</span>\n</div>\n<div class="coup-float-right">\n<a data-package-id="{1}" data-cmd-type="DAILY_REPORT" class="view-round-link" href="#" target="_blank" title="\u5206\u8f6e\u67e5\u770b"></a>\n</div>\n</div>', baidu.string.encodeHTML(a.name), a.id)
}}, {width:30, title:"\u65e5\u5747\u5c55\u73b0\u91cf", field:"impressionCountDaily", dragable:1, sortable:!0, ellipsis:!0, content:function(a) {
  return a.impressionCountDaily
}}, {width:30, title:"\u51fa\u4ef7", field:"bid", dragable:1, sortable:!0, align:"right", content:function(a) {
  var b;
  b = a.bid ? "\u00a5" + jn.util.moneyFormat(a.bid) : "\u5c1a\u672a\u51fa\u4ef7";
  return baidu.format('<a data-cmd-type="SHOW" data-package-id="' + a.id + '" class="ac-jn-landmark-promotion-package-list-blue" >{0}</a>', b)
}}, {width:30, title:"\u5e95\u4ef7", field:"price", dragable:1, sortable:!0, align:"right", content:function(a) {
  return"\u00a5" + jn.util.moneyFormat(a.price)
}}, {width:30, title:"\u672c\u8f6e\u6982\u51b5", field:"status", dragable:1, ellipsis:!0, content:function(a) {
  var b = er.context.get("packageStatusMap"), c = b[a.status];
  return a.status == b.getKey("\u5c1a\u672a\u6bd4\u4ef7") ? '<span class="yellow">' + c + "</span>" : a.status == b.getKey("\u6682\u5217\u7b2c\u4e00") ? '<span class="green">' + c + "</span>" : a.status == b.getKey("\u4f4e\u4e8e\u5e95\u4ef7") ? '<span class="red">' + c + "</span>" : a.status == b.getKey("\u672a\u5217\u7b2c\u4e00") ? '<span class="yellow">' + c + "</span>" : a.status == b.getKey("\u4f59\u989d\u4e0d\u8db3") ? '<span class="yellow">' + c + "</span>" : a.status == b.getKey("\u65e0\u5ba1\u6838\u901a\u8fc7\u7684\u7269\u6599") ? 
  '<span class="yellow">' + c + "</span>" : a.status == b.getKey("\u5c1a\u672a\u51fa\u4ef7") ? '<span class="red">' + c + "</span>" : "--"
}}, {width:60, title:"\u5f80\u8f6e\u6982\u51b5", field:"roundsSummary", dragable:1, content:function(a) {
  for(var b = '<div onmouseover="ui.Tip.show(this, {content:\'{0}\',arrow:1});" onmouseout="ui.Tip.hide();">', c = "", d = "", e = "", g = er.context.get("packageFalseReasonMap"), h = 0;h < a.roundsSummary.length;h++) {
    a.roundsSummary[h].success ? (b += '<span class = "list-img-success"></span>', d += '<span class="summary-success">\u6210\u529f</span>') : (b += '<span class = "list-img-fail"></span>', d += '<span class="summary-fail">\u5931\u8d25</span>', e += baidu.date.format(baidu.date.parseToDate(a.roundsSummary[h].startDate), "MM.dd") + "-" + baidu.date.format(baidu.date.parseToDate(a.roundsSummary[h].endDate), "MM.dd") + "\u5931\u8d25\u539f\u56e0\uff1a" + g[a.roundsSummary[h].falseReason] + "<br>"), c += 
    '<span class="date-cell">' + baidu.date.format(baidu.date.parseToDate(a.roundsSummary[h].startDate), "MM.dd") + "</span>"
  }
  b += "</div>";
  0 < a.roundsSummary.length && (c += '<span class="date-cell">' + baidu.date.format(baidu.date.parseToDate(a.roundsSummary[a.roundsSummary.length - 1].endDate), "MM.dd") + "</span>");
  return baidu.format(b, baidu.string.encodeHTML('<div class="date-container">' + c + "</div>" + ('<div class="summary-container">' + d + "</div>") + ('<div class="reason-container">' + e + "</div>")))
}}, {width:30, title:"\u67e5\u770b\u5173\u952e\u8bcd", field:"id", dragable:1, content:function(a) {
  var b = [];
  b.push({title:"\u67e5\u770b\u5173\u952e\u8bcd", location:"#/void~packId=" + a.id, cmd:"VIEW"});
  return jn.util.getListOperationHtml(b)
}}], materialList:[{width:170, title:"\u7269\u6599\u540d\u79f0", field:"materialName", dragable:1, sortable:1, content:function(a) {
  return baidu.format('<div>\n<div class="coup-ellipsis-sizing-ctner coup-icon-sizer">&nbsp;</div>\n<div class="ui-table-cell-text coup-ellipsis-sizing-by-others coup-float-left">\n<span title="{0}" class="coup-ellipsis">{0}</span>\n</div>\n<div class="coup-float-right">\n<a data-material-id="{1}" data-material-name="{0}" data-cmd-type="DAILY_REPORT" class="view-round-link" href="#" target="_blank" title="\u5206\u8f6e\u67e5\u770b"></a>\n</div>\n</div>', baidu.string.encodeHTML(a.materialName), a.id)
}}, {width:100, minWidth:100, title:"\u72b6\u6001", field:"status", dragable:1, sortable:!1, content:function(a) {
  var b = er.context.get("materialAuditStatusMap"), c = b[a.status], d = [], e = a.failReason;
  "-1" != c.indexOf(" ") && (d = c.split(" "));
  return a.status == b.getKey("\u5ba1\u6838\u901a\u8fc7 \u542f\u7528\u4e2d") ? '<span class="green">' + d[0] + '</span><span class="green ml4">' + d[1] + "</span>" : a.status == b.getKey("\u5ba1\u6838\u901a\u8fc7 \u672a\u542f\u7528") ? '<span class="green">' + d[0] + '</span><span class="coup-status-grey ml4">' + d[1] + "</span>" : a.status == b.getKey("\u5ba1\u6838\u62d2\u7edd") ? '<span class="float-left red">' + c + "</span>" + baidu.format('<div class="coup-tip-failreason" onmouseover="ui.Tip.show(this, {title:\'{0}\',content:\'{1}\',arrow:0});" onmouseout="ui.Tip.hide();"></div>', 
  "\u5ba1\u6838\u672a\u901a\u8fc7\u539f\u56e0\uff1a", baidu.string.encodeHTML(baidu.string.encodeHTML(e).replace(/\r?\n/g, "<br>"))) : a.status == b.getKey("\u5f85\u63d0\u4ea4") || a.status == b.getKey("\u63d0\u4ea4\u5f85\u5ba1\u6838") ? '<span class="yellow">' + c + "</span>" : er.context.get("materialAuditStatusMap")[a.status]
}}, {width:80, title:"\u70b9\u51fb\u6b21\u6570", field:"clickCount", dragable:1, sortable:1, content:function(a) {
  return a.clickCount
}}, {width:100, title:"\u5c55\u73b0\u6b21\u6570", field:"impressionCount", dragable:1, sortable:1, content:function(a) {
  return a.impressionCount
}}, {width:50, title:"\u70b9\u51fb\u7387", field:"clickRatio", dragable:1, sortable:1, content:function(a) {
  return a.clickRatio + "%"
}}, {width:50, title:"\u63d0\u4ea4\u65f6\u95f4", field:"submitTime", dragable:1, sortable:1, content:function(a) {
  return a.submitTime ? jn.util.dateFormat(a.submitTime, "yyyy-MM-dd") : "--"
}}, {width:50, title:"\u542f\u7528\u65f6\u95f4", field:"enableTime", dragable:1, sortable:1, content:function(a) {
  return a.enableTime ? jn.util.dateFormat(a.enableTime, "yyyy-MM-dd") : "--"
}}, {width:110, minWidth:120, title:"\u64cd\u4f5c", field:"offlineTime", dragable:1, sortable:0, content:function(a) {
  var b = [], c = er.context.get("materialAuditStatusMap");
  a.status == c.getKey("\u5ba1\u6838\u901a\u8fc7 \u542f\u7528\u4e2d") ? b.push({title:"\u9884\u89c8", location:"#/void~materialId=" + a.id + "&materialName=" + encodeURIComponent(a.materialName), cmd:"preview"}, {title:"\u590d\u5236", location:"#/void~materialId=" + a.id, cmd:"copy"}) : a.status == c.getKey("\u5ba1\u6838\u901a\u8fc7 \u672a\u542f\u7528") ? b.push({title:"\u9884\u89c8", location:"#/void~materialId=" + a.id + "&materialName=" + encodeURIComponent(a.materialName), cmd:"preview"}, {title:"\u590d\u5236", 
  location:"#/void~materialId=" + a.id, cmd:"copy"}, {title:"\u542f\u7528", location:"#/void~" + ["materialId=" + a.id, "materialName=" + encodeURIComponent(a.materialName), "materialObjectVersion=" + a.materialObjectVersion, "annexObjectVersion=" + a.annexObjectVersion].join("&"), cmd:"enable"}) : a.status == c.getKey("\u5ba1\u6838\u62d2\u7edd") || a.status == c.getKey("\u5f85\u63d0\u4ea4") ? b.push({title:"\u9884\u89c8", location:"#/void~materialId=" + a.id + "&materialName=" + encodeURIComponent(a.materialName), 
  cmd:"preview"}, {title:"\u7f16\u8f91", location:"#/void~materialId=" + a.id, cmd:"update"}, {title:"\u5220\u9664", location:"#/void~" + ["materialId=" + a.id, "materialName=" + encodeURIComponent(a.materialName), "materialObjectVersion=" + a.materialObjectVersion, "annexObjectVersion=" + a.annexObjectVersion].join("&"), cmd:"delete"}) : a.status == c.getKey("\u63d0\u4ea4\u5f85\u5ba1\u6838") && b.push({title:"\u9884\u89c8", location:"#/void~materialId=" + a.id + "&materialName=" + encodeURIComponent(a.materialName), 
  cmd:"preview"}, {title:"\u64a4\u9500", location:"#/void~" + ["materialId=" + a.id, "materialName=" + encodeURIComponent(a.materialName), "materialObjectVersion=" + a.materialObjectVersion, "annexObjectVersion=" + a.annexObjectVersion].join("&"), cmd:"withdraw"});
  return jn.util.getListOperationHtml(b)
}}], createAdTrackerData:[{text:"\u5173\u8054\u5408\u540c"}, {text:"\u6dfb\u52a0\u7269\u6599"}, {text:"\u6dfb\u52a0\u5173\u952e\u8bcd\u8bcd\u5305"}], adStatusList:[{value:"", name:"\u5168\u90e8\u72b6\u6001", text:"\u5168\u90e8\u72b6\u6001"}, {value:"5", name:"\u6b63\u5e38\u751f\u6548 \u672a\u6295\u653e", text:"\u6b63\u5e38\u751f\u6548 \u672a\u6295\u653e"}, {value:"2", name:"\u6b63\u5e38\u751f\u6548 \u6b63\u5728\u6295\u653e", text:"\u6b63\u5e38\u751f\u6548 \u6b63\u5728\u6295\u653e"}, {value:"6", name:"\u672a\u751f\u6548", 
text:"\u672a\u751f\u6548"}], adStatusMap:{6:'<span class="coup-status-diable">\u672a\u751f\u6548</span>', 5:'<span class="coup-status-normal">\u6b63\u5e38\u751f\u6548</span>&nbsp;&nbsp;<span class="coup-status-grey">\u672a\u6295\u653e</span>', 2:'<span class="coup-status-normal">\u6b63\u5e38\u751f\u6548</span>&nbsp;&nbsp;<span class="coup-status-grey">\u6b63\u5728\u6295\u653e</span>'}, adFieldList:[{value:"adName", name:"\u63a8\u5e7f\u8ba1\u5212\u540d\u79f0", text:"\u63a8\u5e7f\u8ba1\u5212\u540d\u79f0"}, 
{value:"adId", name:"\u63a8\u5e7f\u8ba1\u5212ID", text:"\u63a8\u5e7f\u8ba1\u5212ID"}, {value:"contractNo", name:"\u5408\u540c\u53f7", text:"\u5408\u540c\u53f7"}, {value:"keyword", name:"\u5173\u952e\u8bcd", text:"\u5173\u952e\u8bcd"}, {value:"packName", name:"\u8bcd\u5305\u540d\u79f0", text:"\u8bcd\u5305\u540d\u79f0"}], materialDownloadList:[{value:"1", name:"\u4e0b\u8f7d\u5206\u7269\u6599\u6c47\u603b\u62a5\u544a", text:"\u4e0b\u8f7d\u5206\u7269\u6599\u6c47\u603b\u62a5\u544a"}, {value:"2", name:"\u4e0b\u8f7d\u5206\u7269\u6599\u5206\u8f6e\u62a5\u544a", 
text:"\u4e0b\u8f7d\u5206\u7269\u6599\u5206\u8f6e\u62a5\u544a"}]};
jn.landmark.promotion.config.action.push({location:"/jn/landmark/promotion/ad_list", action:"jn.landmark.promotion.AdList"});
jn.landmark.promotion.config.action.push({location:"/jn/landmark/promotion/contract_list", action:"jn.landmark.promotion.ContractList"});
jn.landmark.promotion.config.action.push({location:"/jn/landmark/promotion/create_ad", action:"jn.landmark.promotion.CreateAd"});
jn.landmark.promotion.config.action.push({location:"/jn/landmark/promotion/add_package_list", action:"jn.landmark.promotion.AddPackageList"});
jn.landmark.promotion.config.action.push({location:"/jn/landmark/promotion/package_list", action:"jn.landmark.promotion.PackageList"});
jn.landmark.promotion.config.action.push({location:"/jn/landmark/promotion/material_list", action:"jn.landmark.promotion.MaterialList"});
jn.landmark.promotion.data = jn.util.da_generator([{name:"adTree", url:jn.landmark.promotion.config.url.adTree}, {name:"packageList", url:jn.landmark.promotion.config.url.packageList}, {name:"packageListComplex", url:jn.landmark.promotion.config.url.packageListComplex}, {name:"promotionPeriod", url:jn.landmark.promotion.config.url.promotionPeriod}, {name:"lastRound", url:jn.landmark.promotion.config.url.lastRound}, {name:"thisRound", url:jn.landmark.promotion.config.url.thisRound}, {name:"contractList", 
url:jn.landmark.promotion.config.url.contractList}, {name:"createAd", url:jn.landmark.promotion.config.url.createAd}, {name:"addPackage", url:jn.landmark.promotion.config.url.addPackage}, {name:"adList", url:jn.landmark.promotion.config.url.adList}, {name:"createAd", url:jn.landmark.promotion.config.url.createAd}, {name:"adSummary", url:jn.landmark.promotion.config.url.adSummary}, {name:"modAd", url:jn.landmark.promotion.config.url.modAd}, {name:"materialList", url:jn.landmark.promotion.config.url.materialList}, 
{name:"materialLine", url:jn.landmark.promotion.config.url.materialLine}, {name:"deletMaterial", url:jn.landmark.promotion.config.url.deletMaterial}, {name:"withdrawMaterial", url:jn.landmark.promotion.config.url.withdrawMaterial}, {name:"enableMaterial", url:jn.landmark.promotion.config.url.enableMaterial}, {name:"downloadReport", url:jn.landmark.promotion.config.url.downloadReport}, {name:"getMaterialIfr", url:jn.landmark.promotion.config.url.getMaterialIfr}, {name:"parityList", url:jn.landmark.promotion.config.url.parityList}, 
{name:"deletePackage", url:jn.landmark.promotion.config.url.deletePackage}, {name:"packageBid", url:jn.landmark.promotion.config.url.packageBid}, {name:"viewKeywords", url:jn.landmark.promotion.config.url.viewKeywords}]);
er.controller.addModule(jn.landmark.promotion);
jn.landmark.promotion.AdList = function() {
  jn.ListAction.call(this);
  this.view = "MAIN_PAGE_jn_landmark_promotion_ad_list"
};
baidu.inherits(jn.landmark.promotion.AdList, jn.ListAction);
f = jn.landmark.promotion.AdList.prototype;
f.initModel = function(a, b) {
  var c = this, d = new base.ParallelWorkerManager;
  c.model.adTreeRequester = jn.landmark.promotion.data.adTree;
  d.addWorker(new base.FuncWorker(jn.landmark.promotion.data.adTree, function(a) {
    var b = jn.util.getTreeMap(a.result);
    c.selectedItem = "undefined" != typeof c.model.id && b[c.model.id] ? b[c.model.id] : a.result;
    c.parentMap = jn.util.getTreeNodeParents(a.result);
    c.model.adTree = a.result;
    c.model.adTreeValue = c.selectedItem.id
  }));
  c.model.adStatusList = jn.landmark.promotion.config.adStatusList;
  c.model.status = c.model.status || jn.landmark.promotion.config.adStatusList[0].value;
  c.model.adFieldList = jn.landmark.promotion.config.adFieldList;
  c.model.field = c.model.field || jn.landmark.promotion.config.adFieldList[0].value;
  c.model.mCalInitValue = jn.util.getTimeInterval(0, 7, "yesterday");
  c.model.downloadTypeList = [{value:1, name:"\u63a8\u5e7f\u8ba1\u5212\u5206\u8f6e\u62a5\u544a"}, {value:2, name:"\u63a8\u5e7f\u8ba1\u5212\u6c47\u603b\u62a5\u544a"}];
  c.model.adListFields = jn.landmark.promotion.config.adListFields;
  d.addDoneListener(b);
  d.start()
};
f.afterInit = function(a) {
  this.tree = a.c("adSideBar").c("adTree");
  this.form = a.c("formSearch");
  this.multiCalendar = this.form.c("multiCal");
  this.createAdBtn = a.c("createAdBtn");
  this.list = a.c("adList");
  this.table = this.list.c("listTable");
  this.requesterList = jn.landmark.promotion.data.adList
};
f.initBehaviorInternal = function() {
  var a = this;
  a.tree.onchange = baidu.fn.bind(a._treeChangeHandler, a);
  a.createAdBtn.onclick = function() {
    er.locator.redirect("/jn/landmark/promotion/create_ad")
  };
  a.list.onsubrowopen = baidu.fn.bind(a._showSubrow, a);
  a.list.delegateEvent("click");
  a.list.addListener("CMD:click:DAILY_REPORT", function(b) {
    var c = a.multiCalendar.getValue(), d = baidu.date.format(c.begin, "yyyyMMdd000000"), c = baidu.date.format(c.end, "yyyyMMdd235959"), e = [];
    e.push("adId=" + b.getAttribute("data-ad-id"));
    e.push("dateStart=" + d);
    e.push("dateEnd=" + c);
    b.href = jn.entry.DAILY_REPORT_URL + "#/jn/landmark/daily/ad_report~" + e.join("&");
    return!0
  });
  a.page.getChild("downloadReport").onchange = function(b) {
    a._downloadReport([null, "all", "summary"][b])
  };
  jn.util.initEllipsisEvent(a.table)
};
f.paramAdapters = [new base.OneToManyParamAdapter(",", "date_range", ["dateStart", "dateEnd"])];
f._showSubrow = function(a, b) {
  var c = er.template.get("jn_landmark_promotion_ad_list_subrow");
  this.table.getSubrow(a).innerHTML = baidu.format(c, b.adId, b.contractNo, "\u00a5" + jn.util.moneyFormat(b.amount), "\u00a5" + jn.util.moneyFormat(b.remaining))
};
f._downloadReport = function(a) {
  var b = [], c = this.list.getCurrentState();
  b.push(this.getSearchParam());
  b.push("reportType=" + a);
  b.push("page.pageSize=");
  b.push("page.pageNo=");
  b.push("page.orderBy=" + encodeURIComponent(c.orderBy));
  b.push("page.order=" + encodeURIComponent(c.order));
  jn.util.download(jn.landmark.promotion.config.url.adDownload + b.join("&"))
};
f._treeChangeHandler = function(a, b) {
  b.level && 0 != b.level ? er.locator.redirect("/jn/landmark/promotion/package_list~adId=" + b.id) : this.selectedItem = b
};
jn.entry = {};
jn.entry.DASHBOARD_URL = "/dashboard/index.html";
jn.entry.TIEBA_URL = "/tieba/index.html";
jn.entry.GOLD_URL = "/gold/index.html";
jn.entry.LANDMARK_URL = "/landmark/index.html";
jn.entry.SYS_DASHBOARD_URL = "/sysdashboard/index.html";
jn.entry.SYS_GOLD_AD_REPORT_URL = "/gold/index.html#/account/agencyLayer/promotionList";
jn.entry.SYS_LANDMARK_AD_REPORT_URL = "/sys_landmark_173_report/index.html#/jn/sysdashboard/report/x173_report";
jn.entry.DAILY_REPORT_URL = "/daily_report/index.html";
jn.entry.SYS_LANDMARK_KEYWORD_APPLY_URL = "/sys_landmark_keyword_apply/index.html";
jn.entry.MESSAGE_VIEW_URL = "/message_view/index.html";
if(document.location.search) {
  var query = document.location.search;
  jn.entry.DASHBOARD_URL += query;
  jn.entry.TIEBA_URL += query;
  jn.entry.GOLD_URL += query;
  jn.entry.LANDMARK_URL += query;
  jn.entry.SYS_DASHBOARD_URL += query;
  jn.entry.DAILY_REPORT_URL += query;
  jn.entry.SYS_LANDMARK_KEYWORD_APPLY_URL += query;
  jn.entry.MESSAGE_VIEW_URL += query
}
jn.config = {platform:[{url:jn.entry.DASHBOARD_URL, text:"\u5168\u90e8\u4ea7\u54c1"}, {url:jn.entry.GOLD_URL, text:"\u6398\u91d1\u5e7f\u544a"}, {url:jn.entry.LANDMARK_URL, text:"\u54c1\u724c\u5730\u6807"}, {url:jn.entry.TIEBA_URL, text:"\u8d34\u5427\u63a8\u5e7f"}], productLineList:[{name:"\u6398\u91d1", text:"\u6398\u91d1", value:"1"}, {name:"\u54c1\u724c\u5730\u6807", text:"\u54c1\u724c\u5730\u6807", value:"2"}], productLineKeyMap:{1:"gold", 2:"landmark"}, supportDiv:"supportMain", url:{sysInfo:"/system_const/read", 
session:"/account/session"}, subListNoDataHtml:'<div class="coup-sublist-nodata">\u672a\u627e\u5230\u7b26\u5408\u6761\u4ef6\u7684\u7ed3\u679c\uff01</div>', listNoDataHtml:'<div class="coup-list-nodata">\u672a\u627e\u5230\u7b26\u5408\u6761\u4ef6\u7684\u7ed3\u679c\uff01</div>', title:"\u767e\u5ea6\u63a8\u5e7f|\u54c1\u724c\u5e7f\u544a"};
jn.lang = {formOK:"\u5b8c\u6210", saveOK:"\u4fdd\u5b58", formConfirm:"\u786e\u5b9a", formCancel:"\u8fd4\u56de", formCreate:"\u65b0\u5efa", btnSearch:"\u641c\u7d22", btnEnable:"\u542f\u7528", btnDisable:"\u505c\u7528", btnDelete:"\u5220\u9664", btnPause:"\u6682\u505c", btnModify:"\u4fee\u6539", btnArchive:"\u5b58\u6863", btnStop:"\u505c\u7528", btnResume:"\u6062\u590d", btnDownloadReport:"\u4e0b\u8f7d\u62a5\u544a", btnCreateAd:"\u65b0\u5efa\u63a8\u5e7f\u8ba1\u5212", btnAddProduct:"\u8c03\u7528\u672a\u63a8\u5e7f\u5546\u54c1", 
batchSetting:"\u6279\u91cf\u8bbe\u7f6e", templateMaterial:"\u6a21\u677f\u7269\u6599", productInfo:"\u5546\u54c1\u4fe1\u606f", more:"\u66f4\u591a", labelStatus:"\u72b6\u6001\uff1a", labelType:"\u7c7b\u578b\uff1a", labelSize:"\u5c3a\u5bf8\uff1a", infoSeparator:"\u4e14", itemPerPage:"\u6761/\u9875", itemPerPage2:"\u6bcf\u9875\u663e\u793a", optional:"\uff08\u9009\u586b\uff09", dataLoading:"\u52a0\u8f7d\u4e2d...", editPassword:"\u4fee\u6539\u5bc6\u7801", guide:"\u65b0\u624b\u5165\u95e8", guideAddSlot:"\u521b\u5efa\u6211\u7684\u7b2c\u4e00\u4e2a\u5e7f\u544a\u4f4d", 
btnCreateSPeople:"\u6dfb\u52a0\u6807\u51c6\u4eba\u7fa4", btnCreateDPeople:"\u6dfb\u52a0\u81ea\u5b9a\u4e49\u4eba\u7fa4", btnSharePeople:"\u5171\u4eab\u4eba\u7fa4", deleteConfirm:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u5417\uff1f"};
jn.landmark.promotion.ContractList = function() {
  jn.ListAction.call(this);
  this.view = "MAIN_PAGE_jn_landmark_promotion_contract_list"
};
baidu.inherits(jn.landmark.promotion.ContractList, jn.ListAction);
f = jn.landmark.promotion.ContractList.prototype;
f.initModel = function(a, b) {
  this.model.listFields = jn.landmark.promotion.config.contractListFields;
  this.model.mCalInitValue = jn.util.getTimeInterval(1);
  b()
};
f.afterInit = function(a) {
  this.form = a.c("formSearch");
  this.list = a.c("list");
  this.table = this.list.c("listTable");
  this.multiCalendar = this.form.c("multiCal");
  this.requesterList = jn.landmark.promotion.data.contractList
};
f.initBehaviorInternal = function() {
  var a = this;
  a.table.onselect = function(b) {
    a.selectedContract = b;
    a.oncontractselect(b)
  };
  a.list.addListener(ui.events.AFTER_RENDER, function() {
    a.recoverSelectedContract(a.selectedContract)
  });
  jn.util.initEllipsisEvent(a.list.c("listTable"))
};
f.paramAdapters = [new base.OneToManyParamAdapter(",", "date_range", ["dateStart", "dateEnd"])];
f.oncontractselect = function() {
};
f.recoverSelectedContract = function(a) {
  if(a) {
    var b = this.table.datasource;
    if(!(0 >= b.length)) {
      for(var c = 0;c < b.length;c++) {
        if(a.contractLineId == b[c].contractLineId) {
          a = baidu.g(this.table.getId("singleSelect") + c);
          a.checked = !0;
          this.table._selectSingle(c);
          break
        }
      }
    }
  }else {
    this.table.clearSelected()
  }
};
ui.ProgressTracker = function(a) {
  ui.Control.call(this, a);
  this.type = "progresstracker"
};
ui.ProgressTracker.prototype.render = function() {
  ui.ProgressTracker.superClass.render.call(this);
  this.main && (this.main.innerHTML = this._getHtml(), baidu.addClass(this.main, this.getClass()))
};
ui.ProgressTracker.prototype._getHtml = function() {
  var a = this.datasource, b = {item:'<div class="{4}"><div class="{2}"></div><div class="{1}">{0}</div><div class="{3}"></div></div>', link:'<a href="#{1}" onclick="{2}">{0}</a>'}, c = {body:this.getClass("item-body"), start:this.getClass("item-start"), end:this.getClass("item-end"), wrapper:this.getClass("item-wrapper")}, d = a.length, e, g, h, i, j = [];
  if(!baidu.lang.isArray(a) || !d) {
    return""
  }
  for(e = 0;e < d;e++) {
    g = a[e], i = g.url || g.onclick ? baidu.format(b.link, g.text || "", g.url ? g.url.replace(/"/g, "&quot;") : "", g.onclick ? g.onclick.replace(/"/g, "&quot;") : "") : g.text, h = 0 === e ? c.wrapper + " " + this.getClass("first") : c.wrapper, g.current && (h = h + " " + this.getClass("current")), j.push(baidu.format(b.item, i, c.body, c.start, c.end, h))
  }
  return j.join("")
};
baidu.inherits(ui.ProgressTracker, ui.Control);
jn.landmark.promotion.CreateAd = function() {
  er.FormAction.call(this);
  this.view = "MAIN_PAGE_jn_landmark_promotion_create_ad"
};
baidu.inherits(jn.landmark.promotion.CreateAd, er.FormAction);
f = jn.landmark.promotion.CreateAd.prototype;
f.initModel = function(a, b) {
  this.model.trackerData = baidu.object.clone(jn.landmark.promotion.config.createAdTrackerData);
  this.model.trackerData[0].current = !0;
  b()
};
f.afterInit = function(a) {
  this.form = a.c("form");
  this.backLink = a.c("backLink");
  this.btnSubmit = this.form.c("btnSubmit");
  this.btnCancel = this.form.c("lnkCancel");
  this.adName = this.form.c("adName");
  this.contractListContainer = baidu.g("contract-list-container");
  this.requester = jn.landmark.promotion.data.createAd;
  this.selectedContract = null
};
f.initBehaviorInternal = function() {
  var a = this;
  a.backLink.onclick = function() {
    a.back()
  };
  a.btnSubmit.onclick = function() {
    a.form.submit()
  };
  null != a._contractAction && a._contractAction.leave();
  a._contractAction = er.controller.loadAction("contract-list-container", "jn.landmark.promotion.ContractList");
  a._contractAction.oncontractselect = baidu.fn.bind(function(b) {
    a.selectedContract = b;
    a.selectedContract && a.btnSubmit.enable()
  }, a)
};
f.back = function() {
  er.locator.redirect("/jn/landmark/promotion/ad_list")
};
f.getExtraParam = function() {
  return"contractLineId=" + (this.selectedContract ? this.selectedContract.contractLineId : "")
};
f.onValidateForm = function() {
  var a = !0, b;
  ui.util.validate.batchHideErrors([this.contractListContainer, baidu.g(this.adName.getId()).parentNode]);
  this.selectedContract || (ui.util.validate.showError(this.contractListContainer, "\u8bf7\u9009\u62e9\u4e00\u4e2a\u5408\u540c\uff01"), a = !1);
  b = ui.util.validate.getValidateMessage(this.adName, ["required"]);
  b.result || (ui.util.validate.showError(baidu.g(this.adName.getId()).parentNode, b.errorText), a = !1);
  this.adNameValue = this.adName.getValue();
  return a
};
f.onSubmitSucceed = function(a) {
  er.locator.redirect("/jn/landmark/material/create~adId=" + a.result.adId + "&adName=" + jn.util.urlHelper.encode(this.adNameValue) + "&from=createAd");
  return!1
};
f.leave = function() {
  this._contractAction && this._contractAction.leave();
  jn.landmark.promotion.CreateAd.superClass.leave.call(this)
};
ui.Flash = function(a) {
  ui.Control.call(this, a);
  this._delayedInvokes = {}
};
baidu.inherits(ui.Flash, ui.Control);
ui.Flash.prototype._loaded = !1;
ui.Flash.onLoad = function(a) {
  (a = ui.util.get(a)) && a.trigger(ui.events.LOAD)
};
ui.Flash.invokeEvent = function(a, b, c) {
  var d = Array.prototype.slice.call(arguments, 2), e = ui.util.get(b);
  e && e.trigger.apply(e, [a].concat(d))
};
ui.Flash.onViewAreaChange = function(a, b) {
  var c = ui.util.get(a);
  c && c.trigger(ui.events.VIEWAREA_CHANGE, a, b)
};
f = ui.Flash.prototype;
f.isLoaded = function() {
  return this._loaded
};
f.render = function(a) {
  ui.Flash.superClass.render.call(this, a);
  a = a || this.main;
  a.innerHTML = "";
  var b = baidu.object.clone(this.options), c = b.vars || {};
  b.id = this.getId("native");
  c.id = this.getId();
  c.js = "ui.Flash.";
  b.vars = c;
  b.errorMessage = '<a href="http://get.adobe.com/flashplayer/" target="_blank">\u8bf7\u5b89\u88c5Flash Player</a>';
  baidu.swf.create(b, a)
};
f.bindEvent = function() {
  ui.Flash.superClass.bindEvent.call(this);
  var a = this;
  this.addListener(ui.events.LOAD, function() {
    a._loaded = !0;
    var b = a.getNative();
    baidu.object.each(a._delayedInvokes, function(a, d) {
      b[d] && b[d].apply(b, a)
    })
  });
  this.addListener(ui.events.VIEWAREA_CHANGE, function() {
  })
};
f.invokeMethod = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  if(this._loaded) {
    var d = this.getNative();
    d[a] && d[a].apply(d, c)
  }else {
    this._delayedInvokes[a] = c
  }
};
f.getNative = function() {
  return baidu.swf.getMovie(this.getId("native"))
};
f.dispose = function() {
  this.main && (this.main.innerHTML = "");
  ui.Flash.superClass.dispose.call(this)
};
ui.KeywordSelector = function(a) {
  ui.Control.call(this, a);
  this.type = "kwselector";
  this.view = "UIKeywordSelector"
};
baidu.inherits(ui.KeywordSelector, ui.Control);
f = ui.KeywordSelector.prototype;
f.render = function() {
  var a = this.c("container");
  this._isRendered || (ui.KeywordSelector.superClass.render.call(this), this._isRendered = !0);
  a && a.setContent(this._getContentHtml())
};
f._getContentHtml = function() {
  var a = this.datasource, b = this._getMaxLineNum(), c = [], d;
  if(a) {
    for(var e = 0;e < b;e++) {
      (d = a[e]) ? "true" === d.isNew ? c.push(baidu.format('<tr class="${item_new_class}"><th>${line_num}</th><td class="${text_class}"><span onmouseover="ui.Tip.show(this, {title:\'\u65b0\u589e\u5173\u952e\u8bcd\',content:\'${tip_content}\',arrow:\'tl\'});" onmouseout="ui.Tip.hide();">${text}</span></td><td class="${date_class}">${date}</td></tr>', {item_new_class:this.getClass("item-new"), line_num:e + 1, text_class:this.getClass("item-text"), tip_content:"\u6dfb\u52a0\u65f6\u95f4\uff1a" + baidu.date.format(baidu.date.parseToDate(d.addDate), 
      "yyyy-MM-dd"), text:baidu.string.encodeHTML(d.keyword), date_class:this.getClass("item-date"), date:baidu.date.format(baidu.date.parseToDate(d.addDate), "yyyy-MM-dd")})) : c.push(baidu.format('<tr class="${item_class}"><th>${line_num}</th><td title="${text}" class="${text_class}"><span>${text}</span></td><td class="${date_class}">${date}</td></tr>', {item_class:this.getClass("item"), line_num:e + 1, text:baidu.string.encodeHTML(d.keyword), text_class:this.getClass("item-text"), date_class:this.getClass("item-date"), 
      date:baidu.date.format(baidu.date.parseToDate(d.addDate), "yyyy-MM-dd")})) : c.push(baidu.format('<tr class="${item_class}"><th>${line_num}</th><td class="${text_class}">&nbsp;</td><td class="${date_class}">&nbsp;</td></tr>', {item_class:this.getClass("item"), line_num:e + 1}))
    }
  }
  return baidu.format('<table border="0">${rows}</table>', {rows:c.join("")})
};
f._getMaxLineNum = function() {
  var a = this.datasource;
  return Math.max(10, a ? a.length : 0)
};
f.clearSearch = function() {
  this.c("txtSearch").setValue("")
};
f.bindEvent = function() {
  ui.KeywordSelector.superClass.bindEvent.call(this);
  var a = this, b = a.c("txtSearch");
  b.onenter = a.c("btnSearch").onclick = function() {
    a.requester && a.requester("keyword=" + b.getParamValue() + (a.extraParam ? "&" + a.extraParam : ""), function(b) {
      "true" == b.success && (a.datasource = b.result, a.render())
    })
  }
};
f.bindItemEvent = function() {
};
jn.dashboard = {};
jn.dashboard.Fields = {};
jn.dashboard.config = {action:[{location:"/jn/dashboard/landmark", action:"jn.dashboard.Landmark"}, {location:"/jn/dashboard/gold", action:"jn.dashboard.Gold"}, {location:"/jn/dashboard/tieba", action:"jn.dashboard.Tieba"}], Title:"\u767e\u5ea6\u63a8\u5e7f|\u54c1\u724c\u5e7f\u544a", url:{stats_summary:"/data/landmark/stats/summary", gold_stats_summary:"/data/gold/stats/summary", last_pack_cout_read:"/data/landmark/last_pack_count/read", message_list:"/data/message/list", landmark_line:"/data/landmark/chart/line", 
gold_line:"/data/gold/chart/line", tieba_line:"/data/tieba/chart/line", last_pack_count_read:"/data/landmark/last_pack_count/read", last_succeed_pack_count:"/data/landmark/last_succeed_pack_count/read", last_failed_pack_count:"/data/landmark/last_failed_pack_count/read", current_pack_count:"/data/landmark/current_pack_count/read", tieba_stats_summary:"/data/tieba/stats/summary", tieba_activity_status:"/data/tieba/activity/count_by_status", modify_first_visit:"/data/tieba/is_first_visit/modify"}, 
defaultIndex:"/jn/dashboard/gold", blockList:[], navigator:[]};
jn.dashboard.config.action.push({location:"/jn/dashboard/tieba", action:"jn.dashboard.Tieba"});
jn.dashboard.config.action.push({location:"/jn/dashboard/gold", action:"jn.dashboard.Gold"});
jn.dashboard.config.action.push({location:"/jn/dashboard/landmark", action:"jn.dashboard.Landmark"});
jn.dashboard.data = jn.util.da_generator([{name:"stats_summary", url:jn.dashboard.config.url.stats_summary}, {name:"gold_stats_summary", url:jn.dashboard.config.url.gold_stats_summary}, {name:"message_list", url:jn.dashboard.config.url.message_list}, {name:"landmark_line", url:jn.dashboard.config.url.landmark_line}, {name:"gold_line", url:jn.dashboard.config.url.gold_line}, {name:"tieba_line", url:jn.dashboard.config.url.tieba_line}, {name:"last_pack_count_read", url:jn.dashboard.config.url.last_pack_count_read}, 
{name:"last_succeed_pack_count", url:jn.dashboard.config.url.last_succeed_pack_count}, {name:"last_failed_pack_count", url:jn.dashboard.config.url.last_failed_pack_count}, {name:"current_pack_count", url:jn.dashboard.config.url.current_pack_count}, {name:"tieba_stats_summary", url:jn.dashboard.config.url.tieba_stats_summary}, {name:"tieba_activity_status", url:jn.dashboard.config.url.tieba_activity_status}, {name:"modify_first_visit", url:jn.dashboard.config.url.modify_first_visit}]);
jn.dashboard.flash_type = {1:"expenditure", 2:"clicks", 3:"opens", 4:"clickratio"};
jn.dashboard.chartContentTypeList = [{value:"1", name:"\u6d88\u8d39", text:"\u6d88\u8d39", tip:"k05_cost"}, {value:"2", name:"\u70b9\u51fb\u6b21\u6570", text:"\u70b9\u51fb\u6b21\u6570", tip:"k10_clicks"}, {value:"3", name:"\u5c55\u73b0\u6b21\u6570", text:"\u5c55\u73b0\u6b21\u6570", tip:"k15_opens"}, {value:"4", name:"\u70b9\u51fb\u7387", text:"\u70b9\u51fb\u7387", tip:"k20_click_ratio"}];
er.controller.addModule(jn.dashboard);
ui.Label = function(a) {
  this.maxWidth = 0;
  ui.Control.call(this, a);
  this.type = "label"
};
baidu.inherits(ui.Label, ui.Control);
ui.Label.prototype.render = function(a) {
  a = a || this.main;
  ui.Label.superClass.render.call(this, a);
  if(a && (this.text || 0 === this.text)) {
    a.innerHTML = this.text
  }
};
ui.Label.prototype._getComputedWidth = function() {
  var a = this.main.cloneNode(!0);
  a.style.position = "absolute";
  a.style.top = "-10000px";
  a.style.left = "-10000px";
  a.style.width = "auto";
  document.body.appendChild(a);
  var b = a.offsetWidth;
  document.body.removeChild(a);
  return b
};
ui.Label.prototype.setContent = function(a) {
  if(this.main) {
    this.main.style.width = "auto";
    this.text = a;
    this.main.innerHTML = a;
    var a = parseInt(this.maxWidth, 10), b = this._getComputedWidth();
    this.main.style.width = 0 < a && b >= a ? a + "px" : "auto"
  }
};
ui.RadioBox = function(a) {
  ui.BaseBox.call(this, a);
  this.form = 1;
  this.boxType = "RadioBox";
  this.type = "radiobox";
  this.wrapTag = "INPUT";
  this.wrapType = "radio"
};
baidu.inherits(ui.RadioBox, ui.BaseBox);
ui.BreadCrumb = function(a) {
  ui.Control.call(this, a);
  this.type = "breadCrumb";
  this.datasource
};
ui.BreadCrumb.prototype = {render:function(a) {
  ui.BreadCrumb.superClass.render.call(this, a);
  this.main && (this.main.innerHTML = this.getHtml())
}, getHtml:function() {
  var a = this.datasource;
  if(!baidu.lang.isArray(a) || 0 == a.length) {
    return""
  }
  for(var b = "", c, d, e, g = 0;g < a.length;g++) {
    c = a[g].url, d = a[g].text, e = a[g].click, b += c ? baidu.format(this.tpl1, c, e ? e : "", d) : g != a.length - 1 ? baidu.format(this.tpl2, e ? e : "", d) : baidu.format(this.tpl3, e ? e : "", d)
  }
  return b
}, tpl1:'<a href="#{0}" onclick="{1}">{2}</a> &gt; ', tpl2:'<span onclick="{0}">{1}</span> &gt; ', tpl3:'<span onclick="{0}">{1}</span> '};
baidu.inherits(ui.BreadCrumb, ui.Control);
ui.RadioBoxGroup = function(a) {
  ui.InputControl.call(this, a);
  this.type = "rbgroup";
  this.value;
  this.datasource
};
function onRadioBoxClick$$inline_435(a) {
  this.onselect(a.main.value)
}
ui.RadioBoxGroup.prototype = {onselect:function() {
}, getChildCount:function() {
  return this.children ? this.children.length : 0
}, render:function(a) {
  ui.RadioBoxGroup.superClass.render.call(this, a);
  this.clearChildren();
  this.main.innerHTML = "";
  var a = this.datasource, b, c, d;
  if(a && a.length) {
    b = this.formName + (new Date).getTime().toString(32);
    c = null == this.value ? this.defaultFirst && a[0].value : this.value;
    if(!b) {
      throw Error("can't find name");
    }
    for(var e = 0;e < a.length;e++) {
      var g = document.createElement("div");
      baidu.dom.addClass(g, this.getClass("item"));
      this.width && baidu.dom.setStyle(g, "width", this.width + "px");
      6 == baidu.ie || 7 == baidu.ie ? d = document.createElement('<input name = "' + b + '"/>') : (d = document.createElement("input"), d.name = b);
      d.type = "radio";
      d.value = a[e].value;
      this.hideTitle || (d.title = baidu.string.encodeHTML(a[e].title || a[e].text));
      g.appendChild(d);
      this.main.appendChild(g);
      d = ui.util.createControl({type:"RadioBox", id:"rb" + e, datasource:c, title:a[e].text}, d);
      this.addChild(d);
      if(a[e].value === c) {
        this.onselect(c)
      }
    }
  }
}, bindEvent:function() {
  ui.RadioBoxGroup.superClass.bindEvent.call(this);
  for(var a = 0;a < this.getChildCount();a++) {
    this.children[a].onclick = baidu.fn.bind(onRadioBoxClick$$inline_435, this, this.children[a])
  }
}, dispose:function() {
  for(var a = 0;a < this.getChildCount();a++) {
    this.children[a].onclick = null
  }
  ui.RadioBoxGroup.superClass.dispose.call(this)
}, getValue:function() {
  for(var a = 0;a < this.getChildCount();a++) {
    if(this.children[a].getChecked()) {
      return this.children[a].getValue()
    }
  }
  return""
}, setValue:function(a) {
  for(var b = 0;b < this.getChildCount();b++) {
    if(this.children[b].getValue() == a) {
      this.children[b].setChecked(!0);
      this.onselect && this.onselect(a);
      break
    }
  }
}};
baidu.inherits(ui.RadioBoxGroup, ui.InputControl);
ui.Calendar = function(a) {
  ui.InputControl.call(this, a);
  this.type = "cal";
  this.autoState = !0;
  a = this.now = this.now || ui.config.now || new Date;
  a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  this.__initOption("range", null, "RANGE");
  this.value = this.value || new Date(a.getTime());
  this.__initOption("dateFormat", null, "DATE_FORMAT");
  this.__initOption("paramFormat", null, "DATE_FORMAT");
  this.month = parseInt(this.month, 10) || this.value.getMonth();
  this.year = parseInt(this.year, 10) || this.value.getFullYear()
};
baidu.inherits(ui.Calendar, ui.InputControl);
ui.Calendar.DATE_FORMAT = "yyyy-MM-dd";
ui.Calendar.RANGE = {begin:new Date(2001, 8, 3), end:new Date(2046, 10, 4)};
f = ui.Calendar.prototype;
f.render = function(a) {
  a && "DIV" != a.tagName || (a = a || this.main, ui.Calendar.superClass.render.call(this, a), this._isRender || (this.formName = a.getAttribute("name"), a.innerHTML = this._getMainHtml(), a.onclick = this._getMainClickHandler(), this._renderLayer(), this._isRender = 1), this.setValue(this.value))
};
f.bindModel = function(a) {
  ui.Calendar.superClass.bindModel.call(this, a);
  this.value && (this.month = this.value.getMonth(), this.year = this.value.getFullYear(), this._isRender && this.setValue(this.value))
};
f._getMainClickHandler = function() {
  var a = this;
  return function() {
    a.getState("disabled") || (a.getLayer()._preventHide(), a.toggleLayer())
  }
};
f.toggleLayer = function() {
  this.getLayer().isShow() ? this.hideLayer() : this.showLayer()
};
f.hideLayer = function() {
  this.getLayer().hide();
  this.removeState("active")
};
f.showLayer = function() {
  var a = this.main, b = baidu.dom.getPosition(a), c = baidu.page.getWidth(), d = this.getLayer(), e = d.main.offsetWidth;
  d.show(c < b.left + e ? b.left + a.offsetWidth - e : b.left, b.top + a.offsetHeight);
  this.setState("active")
};
f._getMainHtml = function() {
  var a = this.getValue();
  return baidu.format(this._tplMain, this.getId("text"), this.getClass("text"), this.getClass("arrow"), baidu.date.format(a, this.dateFormat))
};
f._tplMain = '<div class="{1}" id="{0}">{3}</div><div class="{2}"></div>';
f._tplLayer = '<div class="{0}"><table><tr><td width="40" align="left"><div ui="type:Button;id:{1};skin:back"></div></td><td><div ui="type:Select;id:{3};width:55;datasource:@datasource;value:@value;"></div></td><td><div ui="type:Select;id:{4};width:40;datasource:@datasource;value:@value;"></div></td><td width="40" align="right"><div ui="type:Button;id:{2};skin:forward"></div></td></tr></table></div><div ui="id:{5};type:MonthView;value:@value;customClass:@customClass;"></div>';
f._renderLayer = function() {
  var a = new ui.Layer({id:"layer", autoHide:"click", retype:"cal-layer"});
  a.appendTo();
  this.addChild(a);
  a.onhide = this._getLayerHideHandler();
  a.main.innerHTML = baidu.format(this._tplLayer, this.getClass("layer-head"), "prevmonth", "nextmonth", "year", "month", "monthview");
  ui.util.buildControlTree(a.main, a);
  a.c("year").rebindModel({datasource:this._getYearOptions(), value:this.year});
  a.c("month").rebindModel({datasource:this._getMonthOptions(this.year), value:this.month});
  a.c("monthview").rebindModel({customClass:this._getMVCustomClass(), value:this.value});
  this._initLayerUI()
};
f._initLayerUI = function() {
  var a = this.getLayer();
  a.c("year").onchange = this._getYearChangeHandler();
  a.c("month").onchange = this._getMonthChangeHandler();
  a.c("nextmonth").onclick = this._getMonthNexter();
  a.c("prevmonth").onclick = this._getMonthPrever();
  a.c("monthview").onchange = this._getMVChangeHandler()
};
f._isInRange = function(a) {
  var b = this.range.begin, c = this.range.end;
  return b && 0 > a - b || c && 0 > c - a ? !1 : !0
};
f._getMVChangeHandler = function() {
  var a = this;
  return function(b) {
    if(a._isInRange(b) && !1 !== a.onchange(b)) {
      a.value = b, a.hideLayer(), baidu.g(a.getId("text")).innerHTML = baidu.date.format(b, a.dateFormat)
    }else {
      return!1
    }
  }
};
f.onchange = new Function;
f._getMVCustomClass = function() {
  var a = this;
  return function(b) {
    return!a._isInRange(b) ? this.getClass("item-out") : ""
  }
};
f._getMonthNexter = function() {
  var a = this;
  return function() {
    a._repaintMonthView(a.year, a.month + 1)
  }
};
f._getMonthPrever = function() {
  var a = this;
  return function() {
    a._repaintMonthView(a.year, a.month - 1)
  }
};
f._getYearChangeHandler = function() {
  var a = this;
  return function(b) {
    a.year = b;
    a._repaintMonthView(b, a.month);
    a.getLayer()._preventHide()
  }
};
f._getMonthChangeHandler = function() {
  var a = this;
  return function(b) {
    a._repaintMonthView(a.year, b);
    a.getLayer()._preventHide()
  }
};
f.getLayer = function() {
  return this.getChild("layer")
};
f._getLayerHideHandler = function() {
  var a = this;
  return function() {
    a.removeState("active")
  }
};
f._getYearOptions = function() {
  for(var a = this.range, b = [], c = a.end.getFullYear(), a = a.begin.getFullYear();a <= c;a++) {
    b.push({name:a, value:a})
  }
  return b
};
f._getMonthOptions = function(a) {
  var b = this.range, c = [], d = 0, e = 11;
  for(a == b.begin.getFullYear() ? d = b.begin.getMonth() : a == b.end.getFullYear() && (e = b.end.getMonth());d <= e;d++) {
    c.push({name:d + 1, value:d})
  }
  return c
};
f._repaintMonthView = function(a, b) {
  var c = this.year, d = this.month;
  baidu.lang.hasValue(a) && (c = a);
  baidu.lang.hasValue(b) && (d = b);
  var e = this.range, g = new Date(c, d, 1), h = this.getLayer(), i = h.c("monthview"), j = 12 * e.begin.getFullYear() + e.begin.getMonth(), e = 12 * e.end.getFullYear() + e.end.getMonth(), c = 12 * c + d, k = h.c("month"), d = g.getMonth();
  0 < j - c ? d += j - c : 0 < c - e && (d -= c - e);
  g.setMonth(d);
  this.month = g.getMonth();
  this.year = g.getFullYear();
  k.rebindModel({datasource:this._getMonthOptions(this.year), value:this.month});
  h.c("year").setValue(this.year);
  h.c("prevmonth").disable();
  h.c("nextmonth").disable();
  i.setView(g)
};
f.getValue = function() {
  return this.value || null
};
f.getParamValue = function() {
  return baidu.date.format(this.value, this.paramFormat) || null
};
f.setValue = function(a) {
  this.value = a;
  this.getLayer().c("monthview").select(a);
  baidu.g(this.getId("text")).innerHTML = baidu.date.format(a, this.dateFormat);
  this._repaintMonthView(a.getFullYear(), a.getMonth())
};
ui.RichCalendar = function(a) {
  ui.InputControl.call(this, a);
  this.type = "rcal";
  this.view = "UIRichCalendar";
  a = this.now || ui.config.now || new Date;
  this.value = this.value || new Date(a.getTime());
  this.__initOption("dateFormat", null, "DATE_FORMAT");
  this.__initOption("paramFormat", null, "PARAM_FORMAT");
  this.month = parseInt(this.month, 10) || a.getMonth();
  this.year = parseInt(this.year, 10) || a.getFullYear()
};
ui.RichCalendar.DATE_FORMAT = "yyyy-MM-dd";
ui.RichCalendar.PARAM_FORMAT = "yyyyMMddHH0000";
f = ui.RichCalendar.prototype;
f.bindEvent = function() {
  ui.RichCalendar.superClass.bindEvent.call(this);
  this.c("theDate").onchange = baidu.fn.bind(this._onDateChange, this);
  this.c("theTime").onchange = baidu.fn.bind(this._onTimeChange, this)
};
f._onDateChange = function(a) {
  this.value && (a = new Date(a.getFullYear(), a.getMonth(), a.getDate(), this.value.getHours(), this.value.getMinutes(), this.value.getSeconds()), !1 !== this.onchange(a) && (this.value = a))
};
f._onTimeChange = function(a) {
  this.value && (a = new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), a, 0, 0), !1 !== this.onchange(a) && (this.value = a))
};
f.onchange = function() {
};
f.getValue = function() {
  return this.value || null
};
f.getParamValue = function() {
  return baidu.date.format(this.value, this.paramFormat) || null
};
f.setParamValue = function(a) {
  a = baidu.date.parseToDate(a);
  this.setValue(a)
};
f.setValue = function(a) {
  this.value = a;
  this.c("theDate").setValue(a);
  this.c("theTime").setValue(a.getHours())
};
f.bindModel = function(a) {
  ui.RichCalendar.superClass.bindModel.call(this, a);
  this.c("theDate").bindModel({initDateValue:this.value});
  this.c("theTime").bindModel({hourList:this.getHourList(), initTimeValue:this.value.getHours()})
};
f.disable = function() {
  ui.RichCalendar.superClass.disable.call(this);
  this.c("theDate").disable();
  this.c("theTime").disable()
};
f.enable = function() {
  ui.RichCalendar.superClass.enable.call(this);
  this.c("theDate").enable();
  this.c("theTime").enable()
};
f.getHourList = function() {
  for(var a = [], b = 0;24 > b;b++) {
    a.push({name:(10 > b ? "0" : "") + b + ":00", value:b})
  }
  return a
};
baidu.inherits(ui.RichCalendar, ui.InputControl);
ui.Tab = function(a) {
  ui.Control.call(this, a);
  this.type = "tab";
  this.activeIndex = this.activeIndex || 0;
  this.allowEdit = !!this.allowEdit;
  this.maxCount = this.maxCount || 5
};
ui.Tab.prototype = {render:function(a) {
  ui.Tab.superClass.render.call(this, a);
  this.tabs = this.datasource || this.tabs || [];
  this.main && this._renderTabs()
}, _tplItem:'<li class="{1}"{2}><em>{0}</em>{3}</li>', _tplAdd:'<li class="add" onclick="{0}">+</li>', _tplClose:'<span onclick="{0}"></span>', _renderTabs:function() {
  var a = this.main, b = this.tabs.length, c = this.getClass("item"), d = [], e, g, h, i, j, k;
  if(0 == b) {
    a.innerHTML = ""
  }else {
    b <= this.activeIndex ? this.activeIndex = 0 : 0 > this.activeIndex && (this.activeIndex = 0);
    for(g = 0;g < b;g++) {
      h = this.tabs[g], i = h.title, e = c, k = j = "", this.allowEdit && !h.stable && (j = baidu.format(this._tplClose, this.getStrCall("_close", g))), 0 == g && (e += " " + this.getClass("item-first")), g == b - 1 && (e += " " + this.getClass("item-last")), g == this.activeIndex ? e += " " + this.getClass("item-active") : k = ' onclick="' + this.getStrCall("_select", g) + '"', d.push(baidu.format(this._tplItem, i, e, k, j))
    }
    a.innerHTML = "<ul>" + d.join("") + "</ul>";
    this._resetPanel()
  }
}, _resetPanel:function() {
  var a = this.tabs, b = a.length, c = this.activeIndex, d, e;
  for(d = 0;d < b;d++) {
    if(e = a[d].panel) {
      baidu.g(e).style.display = d == c ? "" : "none"
    }
  }
}, onchange:new Function, _select:function(a) {
  !1 !== this.onchange(a, this.tabs[a]) && this.select(a)
}, select:function(a) {
  this.activeIndex = a;
  this._renderTabs()
}, onclose:new Function, _close:function(a) {
  !1 !== this.onclose(a, this.tabs[a]) && this.close(a)
}, close:function(a) {
  var b = this.tabs;
  b.splice(a, 1);
  this.activeIndex >= b.length && this.activeIndex--;
  0 > this.activeIndex && (this.activeIndex = 0);
  this._renderTabs()
}, add:function(a) {
  a = a || {title:"\u65b0\u5efa\u6807\u7b7e"};
  this.tabs.push(a);
  this._renderTabs()
}};
baidu.inherits(ui.Tab, ui.Control);
jn.landmark.promotion.PackageList = function() {
  er.ListAction.call(this);
  this.view = "MAIN_PAGE_jn_landmark_promotion_package_list";
  this.selectedItem = null;
  this._tipCache = {};
  this._forceTipShow = !1
};
baidu.inherits(jn.landmark.promotion.PackageList, jn.ListAction);
f = jn.landmark.promotion.PackageList.prototype;
f.initModel = function(a, b) {
  var c = this;
  c.model.packageFields = jn.landmark.promotion.config.packageFields;
  c.model.modAdNametext = "\u4fee\u6539";
  c.model.tabConfig = [{title:"\u5173\u952e\u8bcd"}, {title:"\u7269\u6599"}];
  c.model.activeIndex = 0;
  c.model.dialogBatchBidRadio = 0;
  this.model.status = [{name:"\u5168\u90e8", text:"\u5168\u90e8", value:"4"}];
  for(var d = er.context.get("packageStatusList"), e = 0;e < d.length;e++) {
    this.model.status.push({name:d[e].text, text:d[e].text, value:d[e].value})
  }
  this.model.roundsSummary = [{name:"\u5168\u90e8", text:"\u5168\u90e8", value:"2"}, {name:"\u7ade\u4ef7\u6210\u529f", text:"\u7ade\u4ef7\u6210\u529f", value:"1"}, {name:"\u7ade\u4ef7\u5931\u8d25", text:"\u7ade\u4ef7\u5931\u8d25", value:"0"}];
  this.model.keywordType = [{name:"\u8bcd\u5305\u540d\u79f0", text:"\u8bcd\u5305\u540d\u79f0", value:"0"}, {name:"\u5173\u952e\u8bcd", text:"\u5173\u952e\u8bcd", value:"1"}];
  this.model.offsetControl = [{name:"\u63d0\u9ad8", text:"\u63d0\u9ad8", value:"0"}, {name:"\u964d\u4f4e", text:"\u964d\u4f4e", value:"1"}];
  this.model.downloadTypeList = [{name:"\u6240\u6709\u8bcd\u5305\u6c47\u603b\u62a5\u544a", value:2}, {name:"\u6240\u6709\u8bcd\u5305\u7ade\u4ef7\u62a5\u544a", value:3}, {name:"\u8bcd\u5305\u5206\u8f6e\u62a5\u544a", value:1}];
  d = new base.ParallelWorkerManager;
  d.addWorker(new base.FuncWorker(jn.landmark.promotion.data.promotionPeriod, "adId=" + c.model.adId, function(a) {
    for(var b = [], d = 0;d < a.result.length;d++) {
      b.push(jn.util.dateFormat(a.result[d].startDate, "yyyy.MM.dd") + "-" + jn.util.dateFormat(a.result[d].endDate, "yyyy.MM.dd"))
    }
    c.model.promotionPeriod = 0 < b.length ? b.join(",") : "\u65e0\u63a8\u5e7f\u65f6\u95f4"
  }));
  c.lastRoundInfo = !0;
  c.model.kwsRequester = jn.landmark.promotion.data.viewKeywords;
  d.addWorker(new base.FuncWorker(jn.landmark.promotion.data.lastRound, "adId=" + c.model.adId, function(a) {
    a.result.startDate ? (c.model.dateRange = jn.util.dateFormat(a.result.startDate, "yyyy.MM.dd") + " \u2014 " + jn.util.dateFormat(a.result.endDate, "yyyy.MM.dd"), c.model.totalPack = a.result.packageCount + "\u4e2a", c.model.succeedPack = a.result.successCount + "\u4e2a", c.model.failedPack = a.result.failCount + "\u4e2a") : c.lastRoundInfo = !1
  }));
  d.addWorker(new base.FuncWorker(jn.landmark.promotion.data.thisRound, "adId=" + c.model.adId, function(a) {
    c.model.bidEndTime = jn.util.dateFormat(a.result.deadline, "yyyy.MM.dd HH:mm:ss");
    c.model.currentRange = jn.util.dateFormat(a.result.startDate, "yyyy.MM.dd") + " \u2014 " + jn.util.dateFormat(a.result.endDate, "yyyy.MM.dd");
    c.model.currentPackCount = a.result.packageCount + "\u4e2a"
  }));
  c.model.adTreeRequester = jn.landmark.promotion.data.adTree;
  d.addWorker(new base.FuncWorker(jn.landmark.promotion.data.adTree, "keyword=", function(a) {
    var b = jn.util.getTreeMap(a.result);
    c.selectedItem = "undefined" != typeof c.model.adId && b[c.model.adId] ? b[c.model.adId] : a.result;
    c.model.adTreeValue = c.model.adId;
    c.parentMap = jn.util.getTreeNodeParents(a.result);
    c.model.adTreeData = a.result;
    c.model.treeInitValue = c.selectedItem.id;
    c.model.selectedItem = c.selectedItem.text
  }));
  d.addWorker(new base.FuncWorker(jn.landmark.promotion.data.adSummary, "adId=" + c.model.adId, function(a) {
    a = a.result;
    c.model.adName = a.adName;
    c.model.adId = a.adId;
    c.model.remaining = "\u00a5" + jn.util.moneyFormat(a.contract.balance);
    c.model.spend = "\u00a5" + jn.util.moneyFormat(a.contract.spend);
    c.model.contractNO = a.contract.contractNo;
    c.objectVersion = a.objectVersion
  }));
  d.addDoneListener(function() {
    if(!c.selectedItem.level || 0 == c.selectedItem.level) {
      return er.locator.redirect("/jn/landmark/promotion/ad_list"), !1
    }
    b()
  });
  d.start()
};
f.afterInit = function(a) {
  this.tree = a.c("adSideBar").c("adTree");
  this.breadcrumb = a.c("breadCrumb");
  this.formSearch = a.c("formSearch");
  this.pnlBatch = a.c("pnlOperation");
  this.list = a.c("packageList");
  this.requesterList = jn.landmark.promotion.data.packageListComplex;
  this.selectedItemName = a.c("selectedItemName");
  this.tab = a.c("packageListTab")
};
f.enterDocumentInternal = function() {
  this.list.delegateEvent("mouseover");
  this.list.delegateEvent("mouseout");
  this.list.delegateEvent("click");
  var a = baidu.g("last-round-div");
  !1 == this.lastRoundInfo ? baidu.hide(a) : baidu.show(a);
  "\u65e0\u63a8\u5e7f\u65f6\u95f4" == this.model.promotionPeriod && (baidu.g("this-round-div").innerHTML = "\u7cfb\u7edf\u63d0\u793a\uff1a\u5c0a\u656c\u5ba2\u6237\u60a8\u597d\uff0c\u60a8\u7684\u5730\u6807\u5e7f\u544a\u63a8\u5e7f\u65f6\u95f4\u5df2\u8fc7\u671f\uff0c\u65e0\u6cd5\u53c2\u4e0e\u5730\u6807\u5e7f\u544a\u7ade\u4ef7\uff0c\u8bf7\u53ca\u65f6\u4e0e\u767e\u5ea6\u7684\u5ba2\u6237\u7ecf\u7406\u8054\u7cfb\u3002")
};
f._fetchTipContent = function(a, b, c) {
  var d = this, e, g = er.context.get("parityStatusMap"), h = "", i = b + "/" + a;
  d._tipCache[i] ? (d._forceTipShow = !1, c(d._tipCache[i])) : jn.landmark.promotion.data.parityList(".ui-loading=0&packId=" + a + "&adId=" + b, function(a) {
    if("true" == a.success) {
      h += '<tr><th>\u51fa\u4ef7</th><th>\u6bd4\u4ef7\u65f6\u95f4</th><th class="green">\u6bd4\u4ef7\u7ed3\u679c</th></tr>';
      for(var b = 0;b < a.result.length;b++) {
        e = a.result[b], h = "\u6682\u5217\u7b2c\u4e00" == g[e.status] ? h + ("<tr><td>\u00a5" + jn.util.moneyFormat(e.price) + "</td><td>" + jn.util.dateFormat(e.date, "MM.dd  HH:mm") + '</td><td class="green">' + g[e.status]) : h + ("<tr><td>\u00a5" + jn.util.moneyFormat(e.price) + "</td><td>" + jn.util.dateFormat(e.date, "MM.dd  HH:mm") + '</td><td class="orange">' + g[e.status]), "NaN</tr>"
      }
    }else {
      h = "\u8bfb\u53d6\u6570\u636e\u5931\u8d25\uff01"
    }
    h = '<div style="padding:2px"><div>\u6bd4\u4ef7\u8bb0\u5f55\uff1a</div><table class="tip-table">' + h + "</table></div>";
    d._forceTipShow = !0;
    c(d._tipCache[i] = h)
  })
};
f._showTip = function(a) {
  var b = a.getAttribute("data-package-id");
  this._fetchTipContent(b, this.model.adId, function(b) {
    ui.Tip.show(a, {content:b, arrow:1})
  })
};
f.initBehavior = function(a) {
  function b(a, b) {
    var g;
    c._dlg || (g = {id:"packDialog", template:"DialogShowLastTotalPack", width:420}, g.title = a, c._dlg = jn.util.dialogInit.call(c, g), c._dlg.hideFoot());
    c._dlg.setTitle(a);
    g = c._dlg;
    baidu.g(g.getId("body")).innerHTML = b;
    g.show()
  }
  jn.landmark.promotion.PackageList.superClass.initBehavior.call(this, a);
  var c = this;
  c.tab.onchange = function(a) {
    switch(a) {
      case 1:
        er.locator.redirect("#/jn/landmark/promotion/material_list~adId=" + c.model.adId)
    }
  };
  c.treeChangeHandler(c.selectedItem.id, c.selectedItem, !1);
  c.tree.onchange = baidu.fn.bind(c.treeChangeHandler, c);
  c.modAdNameDialog = jn.util.dialogInit.call(this, {id:"modAdNameDiaolog", template:"modAdNameDiaologTpl", title:"\u63a8\u5e7f\u8ba1\u5212\u540d\u79f0", width:400, foot:!0, okHandler:baidu.fn.bind(this.modAdNameOkHandler, this)});
  c.page.c("modAdNameLnk").onclick = function() {
    c.modAdNameDialog.show();
    c.modAdNameDialog.c("adNameInput").setValue(c.page.c("adNameLbl").text)
  };
  c.page.c("totalPackLbl").onclick = function() {
    jn.dashboard.data.last_pack_count_read("", function(a) {
      b("\u53c2\u4e0e\u7ade\u4ef7\u5173\u952e\u8bcd\u8bcd\u5305", c.getKeywordsHtml(a.result))
    })
  };
  this.page.c("succeedPackLbl").onclick = function() {
    jn.dashboard.data.last_succeed_pack_count("", function(a) {
      b("\u7ade\u4ef7\u6210\u529f\u5173\u952e\u8bcd\u8bcd\u5305", c.getKeywordsHtml(a.result))
    })
  };
  this.page.c("failedPackLbl").onclick = function() {
    jn.dashboard.data.last_failed_pack_count("", function(a) {
      b("\u7ade\u4ef7\u5931\u8d25\u5173\u952e\u8bcd\u8bcd\u5305", c.getKeywordsHtml(a.result))
    })
  };
  this.page.c("currentPackCountLink").onclick = function() {
    jn.dashboard.data.current_pack_count("", function(a) {
      b("\u672c\u8f6e\u5173\u952e\u8bcd\u8bcd\u5305", c.getKeywordsHtml(a.result))
    })
  };
  c.page.c("createPackage").onclick = function() {
    er.locator.redirect("/jn/landmark/promotion/add_package_list~adId=" + c.model.adId + "&adName=" + jn.util.urlHelper.encode(c.model.adName) + "&from=pack_list")
  };
  c.list.addListener("CMD:mouseover:SHOW", function(a) {
    c._showTipTimer && clearTimeout(c._showTipTimer);
    c._showTipTimer = setTimeout(function() {
      c._showTip(a)
    }, 500);
    return!1
  });
  c.list.addListener("CMD:mouseout:SHOW", function() {
    c._showTipTimer && clearTimeout(c._showTipTimer);
    c._forceTipShow || ui.Tip.hide();
    return!1
  });
  c.list.addListener("CMD:click:SHOW", function(a) {
    c._showTipTimer && clearTimeout(c._showTipTimer);
    ui.Tip.hide();
    a = a.getAttribute("data-package-id");
    c.model.singleBidId = a;
    c.getBatchBidDialog().show();
    baidu.dom.hide("offset-bid-container");
    return!1
  });
  c.list.addListener("CMD:click:VIEW", function(a) {
    var a = a.getAttribute("href").replace(/^[^~]+~/g, ""), b = baidu.url.queryToJson(a).packId;
    jn.landmark.promotion.data.viewKeywords("packId=" + b + "&keyword=", function(a) {
      "true" == a.success && c.getViewKeywordsDialog(a.result, b)
    });
    return!1
  });
  c.list.addListener("CMD:click:DAILY_REPORT", function(a) {
    var b = [];
    b.push("adId=" + c.model.adId);
    b.push("packId=" + a.getAttribute("data-package-id"));
    a.href = jn.entry.DAILY_REPORT_URL + "#/jn/landmark/daily/package_report~" + b.join("&");
    return!0
  });
  c.pnlBatch.c("btnDelete").onclick = baidu.fn.bind(jn.util.confirmHandler, this, {content:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u6240\u9009\u5173\u952e\u8bcd\u8bcd\u5305\u5417\uff1f", handler:c.batchEvent["delete"], args:{adId:c.model.adId}});
  c.pnlBatch.c("btnChange").onclick = baidu.fn.bind(c.batchBidHandler, c);
  c.page.c("downloadReport").onchange = function(a) {
    c._downloadReport([null, "all", "summary", "bid"][a])
  };
  jn.util.initEllipsisEvent(c.list.c("listTable"))
};
f._downloadReport = function(a) {
  var b = [], c = this.list.getCurrentState();
  b.push(this.getSearchParam());
  b.push("reportType=" + a);
  b.push("page.pageSize=");
  b.push("page.pageNo=");
  b.push("page.orderBy=" + encodeURIComponent(c.orderBy));
  b.push("page.order=" + encodeURIComponent(c.order));
  jn.util.download(jn.landmark.promotion.config.url.packageDownload + b.join("&"))
};
f.treeChangeHandler = function(a, b, c) {
  if(b.level && 0 != b.level) {
    var a = this.parentMap[b.id], d = [];
    if(a && 0 < a.length) {
      for(var e = 0;e < a.length;e++) {
        d.push({text:a[e].text, url:"javascript:void(0);", click:"ui.util.get('" + this.tree.getId() + "').triggerClick(" + a[e].id + ");return false;"})
      }
    }
    this.breadcrumb.rebindModel({crumbData:d});
    this.selectedItem = b;
    this.selectedItemName.setContent(b.text);
    this.model.adId = b.id;
    !1 !== c && this.formSearch.validateAndSubmit();
    this.reloadAdSummary()
  }else {
    return er.locator.redirect("/jn/landmark/promotion/ad_list"), !1
  }
};
f.getBatchBidDialog = function() {
  var a = this;
  a.dialogBatchBid && a.page.removeChild(this.page.getChild("dialogBatchBid"));
  a.dialogBatchBid = jn.util.dialogInit.call(this, {id:"dialogBatchBid", title:"\u6279\u91cf\u51fa\u4ef7", template:"dialogBatchBidPackageList", width:490, foot:!0, okHandler:baidu.fn.bind(a.packageBidClick, a)});
  a.setBidReadOnly();
  a.dialogBatchBid.getMain().onclick = function(b) {
    b = b || window.event;
    "radio" == baidu.event.getTarget(b).type && a.setBidReadOnly()
  };
  return a.dialogBatchBid
};
f.setBidReadOnly = function() {
  this.dialogBatchBid.c("bid").getChecked() ? (this.dialogBatchBid.c("bidValue").setReadOnly(!1), this.dialogBatchBid.c("offsetBidValue").setReadOnly(!0)) : this.dialogBatchBid.c("offsetBid").getChecked() ? (this.dialogBatchBid.c("bidValue").setReadOnly(!0), this.dialogBatchBid.c("offsetBidValue").setReadOnly(!1)) : (this.dialogBatchBid.c("bidValue").setReadOnly(!0), this.dialogBatchBid.c("offsetBidValue").setReadOnly(!0))
};
f.packageBidClick = function() {
  var a = this.dialogBatchBid;
  if(this.dialogBatchBid.c("bid").getChecked()) {
    if(!this.isPositiveNum(a.c("bidValue").getValue())) {
      return this.dialogBatchBid.showError("\u8bf7\u586b\u5199\u6b63\u786e\u4ef7\u683c\uff01"), !1
    }
  }else {
    if(this.dialogBatchBid.c("offsetBid").getChecked() && !this.isPositiveNum(a.c("offsetBidValue").getValue())) {
      return this.dialogBatchBid.showError("\u8bf7\u586b\u5199\u6b63\u786e\u4ef7\u683c\uff01"), !1
    }
  }
  this.packageBidSubmit()
};
f.packageBidSubmit = function() {
  var a = [], b, c = this.dialogBatchBid, d = [], e = this.model.get("selectedItems");
  b = this.list.getTable().datasource;
  var g = {}, h = [];
  this.model.singleBidId ? h.push(this.model.singleBidId) : h = this.getSelectedIds();
  for(var i = 0;i < h.length;i++) {
    for(var j = 0;j < b.length;j++) {
      h[i] == b[j].id && (g[h[i]] = {price:b[j].price, objectVersion:b[j].objectVersion})
    }
  }
  if(this.dialogBatchBid.c("bid").getChecked()) {
    b = new Number(c.c("bidValue").getValue());
    b = b.toFixed(2);
    for(i = 0;i < h.length;i++) {
      a.push(b)
    }
  }else {
    if(this.dialogBatchBid.c("offsetBid").getChecked()) {
      b = new Number(c.c("offsetBidValue").getValue());
      1 == c.c("offsetControl").getValue() && (b = -b);
      for(i = 0;i < e.length;i++) {
        e[i].bid ? (c = parseFloat(e[i].bid) + b, 0 > c && (c = 0), a.push(c.toFixed(2))) : baidu.array.remove(h, e[i].id)
      }
    }else {
      if(this.dialogBatchBid.c("lowestBid").getChecked()) {
        for(i = 0;i < h.length;i++) {
          a.push(g[h[i]].price)
        }
      }else {
        for(i = 0;i < h.length;i++) {
          a.push("")
        }
      }
    }
  }
  this.requesterBatch = jn.landmark.promotion.data.packageBid;
  for(i = 0;i < h.length;i++) {
    d.push(g[h[i]].objectVersion)
  }
  b = a.join(",");
  this.batchUpdate({adId:this.model.adId, ids:h.join(","), objectVersion:d.join(","), prices:b});
  this.model.singleBidId = ""
};
f.getViewKeywordsDialog = function(a, b) {
  this.dialogViewKeywords || (this.dialogViewKeywords = jn.util.dialogInit.call(this, {id:"vsiewKeywords", title:"\u67e5\u770b\u5173\u952e\u8bcd", template:"dialogViewKeywords", width:290, foot:!1}));
  this.dialogViewKeywords.c("kwSelector").clearSearch();
  this.dialogViewKeywords.c("kwSelector").rebindModel({kwsDatasource:a, kwsExtraParam:"packId=" + b});
  this.dialogViewKeywords.show()
};
f.batchBidHandler = function() {
  this.getBatchBidDialog().show()
};
f.batchEvent = {"delete":function(a) {
  this.requesterBatch = jn.landmark.promotion.data.deletePackage;
  this.selectedItem.id && (a.adId = this.selectedItem.id);
  this.batchUpdate(a)
}};
f.isPositiveNum = function(a) {
  a = new Number(a);
  return isNaN(a) || 0 > a ? !1 : !0
};
f.getExtraParam = function() {
  return"adId=" + this.selectedItem.id
};
f.reloadAdSummary = function() {
  var a = this;
  jn.landmark.promotion.data.adSummary("adId=" + a.selectedItem.id, function(b) {
    b = b.result;
    a.objectVersion = b.objectVersion;
    a.page.c("adNameLbl").rebindModel({adName:b.adName});
    a.page.c("adIdLbl").rebindModel({adId:b.adId});
    a.page.c("remainingLbl").rebindModel({remaining:"\u00a5" + jn.util.moneyFormat(b.contract.balance)});
    a.page.c("spendLbl").rebindModel({spend:"\u00a5" + jn.util.moneyFormat(b.contract.spend)});
    a.page.c("contractNOLbl").rebindModel({contractNO:b.contract.contractNo})
  })
};
f.modAdNameOkHandler = function() {
  var a = this, b = "adId=" + a.selectedItem.id + "&field={0}&value={1}&objectVersion=" + a.objectVersion, c = a.modAdNameDialog.c("adNameInput").getValue(), d = encodeURIComponent(c);
  if("" == c) {
    return a.modAdNameDialog.showError("\u63a8\u5e7f\u8ba1\u5212\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a"), !1
  }
  jn.landmark.promotion.data.modAd(baidu.format(b, "adName", d), function(b) {
    "true" === b.success ? (a.page.c("adNameLbl").rebindModel({adName:a.modAdNameDialog.c("adNameInput").getValue()}), a.selectedItemName.rebindModel({selectedItem:a.page.c("adNameLbl").text}), a.reloadAdTree(a.selectedItem.id)) : jn.util.showErrorMessage(b.message)
  })
};
f.reloadTree = function() {
  var a = this;
  jn.landmark.promotion.data.adTree("keyword=", function(b) {
    var c = jn.util.getTreeMap(b.result);
    a.selectedItem = "undefined" != typeof a.model.adId && c[a.model.adId] ? c[a.model.adId] : b.result;
    a.model.adTreeValue = a.model.adId;
    a.parentMap = jn.util.getTreeNodeParents(b.result);
    a.model.adTreeData = b.result;
    a.model.treeInitValue = a.selectedItem.id;
    a.model.selectedItem = a.selectedItem.text
  })
};
f.getKeywordsHtml = function(a) {
  var b = [];
  if(a && 0 < a.length) {
    b.push('<div class="pack-border"><table>');
    for(var c = 0;c < a.length;c++) {
      if("undefined" === typeof a[c].bidStatus) {
        b.push(baidu.format('<tr><td class="td-line-number">{0}</td><td class="pack-name" title="{4}">{1}</td><td class="lm-dash">\u2014\u2014</td><td class="promotion-name"><a href="{3}" target="_blank" title="{5}">{2}</a></td></tr>', c + 1, a[c].packName, a[c].promotion, "#/jn/landmark/promotion/package_list~adId=" + a[c].adId, a[c].packName, a[c].promotion))
      }else {
        b.push(baidu.format('<tr><td class="td-line-number">{0}</td><td class="pack-name" title="{1}">{2}</td>', c + 1, a[c].packName, a[c].packName));
        var d = "", d = "1" == a[c].bidStatus ? '<td class="icon"><div class="show-gold-medal" title="\u7ade\u4ef7\u6210\u529f"></div></td>' : "2" == a[c].bidStatus ? '<td class="icon"><div class="show-silver-medal" title="\u51fa\u4ef7\u6682\u5217\u7b2c\u4e00"></div></td>' : '<td class="icon"></td>';
        b.push(d);
        b.push(baidu.format('<td class="lm-dash">\u2014\u2014 </td><td class="promotion-name"><a href="{0}" target="_blank" title="{1}">{2}</a></td></tr>', "#/jn/landmark/promotion/package_list~adId=" + a[c].adId, a[c].promotion, a[c].promotion))
      }
    }
    b.push("</table></div>");
    return b.join("")
  }
  return"<div>\u6682\u65f6\u6ca1\u6709\u6570\u636e</div>"
};
f.reloadAdTree = function(a) {
  var b = this;
  b.tree.reloadTree(function(c) {
    b.parentMap = jn.util.getTreeNodeParents(c.result);
    b.tree.triggerClick(a, !0)
  })
};
ui.SelectedList2 = function(a) {
  ui.Control.call(this, a);
  this.type = "SelectedList2";
  this.view = "UISelectedList2";
  this.datasource = [];
  this.text;
  this.linkWord;
  this.textWidth = 100
};
baidu.inherits(ui.SelectedList2, ui.Control);
f = ui.SelectedList2.prototype;
f._deleteAll = function() {
};
f.render = function(a) {
  ui.SelectedList2.superClass.render.call(this, a || this.main);
  this._rebind()
};
f.bindEvent = function() {
  ui.SelectedList2.superClass.bindEvent.call(this);
  var a = this;
  this.main.onclick = function(b) {
    var b = b || window.event, c = baidu.event.getTarget(b);
    "A" == c.nodeName ? a.linkBehavior(c.getAttribute("data-item-id")) : c.className == a.getClass("delete-icon") && a._deleteItem(c.getAttribute("data-item-id"));
    baidu.event.stop(b)
  }
};
f._rebind = function() {
  var a = this, b = a.c("pnlResult"), c = [];
  if(b.children) {
    a._saveValue();
    for(var d = b.children.length - 1;0 <= d;d--) {
      b.removeChild(b.children[d])
    }
  }
  baidu.each(a.datasource, function(b) {
    var d = baidu.string.decodeHTML(b.name);
    c.push(baidu.format(er.template.get("UISelectedList2ItemTpl"), a.textWidth ? baidu.string.fast_ellipse(d, a.textWidth) : d, a.getClass("delete-icon"), b.id, a.text, "text-" + b.id, a.linkWord, b.id, b.value ? b.value : "", d))
  });
  b.setContent(c.join(""));
  ui.util.buildControlTree(b.main, b)
};
f._deleteItem = function(a) {
  var b;
  if(!(1 > this.datasource.length)) {
    for(var c = 0;c < this.datasource.length;c++) {
      if(b = this.datasource[c]) {
        if(b.id == a) {
          baidu.array.remove(this.datasource, b);
          break
        }
      }else {
        return
      }
    }
    this._rebind();
    this.deleteItem(b.id)
  }
};
f.setValue = function(a, b) {
  var c;
  c = this.c("pnlResult");
  c.c("text-" + a) && c.c("text-" + a).setValue(b);
  for(var d = 0;d < this.datasource.length;d++) {
    if(c = this.datasource[d], c.id == a) {
      this.datasource[d].value = b;
      break
    }
  }
};
f.setValueAll = function(a) {
  for(var b, c = 0;c < this.datasource.length;c++) {
    b = this.datasource[c], this.setValue(b.id, a)
  }
};
f._saveValue = function() {
  for(var a, b = this.c("pnlResult"), c = 0;c < this.datasource.length;c++) {
    a = this.datasource[c], b.c("text-" + a.id) && (this.datasource[c].value = b.c("text-" + a.id).getValue())
  }
};
f.addItem = function(a) {
  for(var b, c = 0;c < this.datasource.length;c++) {
    if(b = this.datasource[c], b.id == a.id) {
      return!1
    }
  }
  this._saveValue();
  this.datasource.push(a);
  this._rebind()
};
f.getItemNum = function() {
  return this.datasource.length
};
f.deleteItem = function() {
};
f.linkBehavior = function() {
};
baidu.inherits(ui.SelectedList2, ui.Control);
jn.landmark.promotion.AddPackageList = function() {
  er.ListAction.call(this);
  this.view = "MAIN_PAGE_jn_landmark_promotion_add_package_list"
};
baidu.inherits(jn.landmark.promotion.AddPackageList, er.ListAction);
f = jn.landmark.promotion.AddPackageList.prototype;
f.initModel = function(a, b) {
  this.USE_BACK_LOCATION = !0;
  this.BACK_LOCATION = "pack_list" == this.model.from ? "/jn/landmark/promotion/package_list~adId=" + this.model.adId : "/jn/landmark/promotion/ad_list";
  this.model.packageFields = jn.landmark.promotion.config.packageSimplifyFields;
  this.model.text = "\u51fa\u4ef7\uff1a\u00a5";
  this.model.linkWord = "\u5e95\u4ef7";
  "pack_list" == this.model.from ? (this.model.lbMainTitle = "\u6dfb\u52a0\u5173\u952e\u8bcd\u5305", this.model.returnText = "&lt;&lt;\u8fd4\u56de") : (this.model.lbMainTitle = jn.util.urlHelper.decode(this.model.adName) + "-\u6dfb\u52a0\u5173\u952e\u8bcd\u8bcd\u5305", this.model.returnText = "&lt;&lt;\u8fd4\u56de\u63a8\u5e7f\u8ba1\u5212\u5217\u8868");
  this.model.dialogBatchBidRadio = 0;
  this.model.kwsRequester = jn.landmark.promotion.data.viewKeywords;
  this.model.keywordType = [{name:"\u8bcd\u5305\u540d\u79f0", text:"\u8bcd\u5305\u540d\u79f0", value:"0"}, {name:"\u5173\u952e\u8bcd", text:"\u5173\u952e\u8bcd", value:"1"}];
  this.model.trackerData = baidu.object.clone(jn.landmark.promotion.config.createAdTrackerData);
  this.model.trackerData[2].current = !0;
  b()
};
f.afterInit = function(a) {
  this.returnLink = a.c("returnLink");
  this.formSearch = a.c("formSearch");
  this.list = a.c("packageList");
  this.requesterList = jn.landmark.promotion.data.packageList;
  this.selectedList = a.c("selectedList")
};
f.enterDocumentInternal = function() {
  this.list.delegateEvent("click")
};
f.initBehavior = function(a) {
  jn.landmark.promotion.AddPackageList.superClass.initBehavior.call(this, a);
  var b = this;
  "pack_list" == b.model.from && b.page.c("tracker").hide();
  b.returnLink.onclick = function() {
    b.back()
  };
  b.list.getTable().onCheckboxClick = baidu.fn.bind(b.setSelectedItem, b);
  b.selectedList.deleteItem = baidu.fn.bind(b.onSelectedListDeleteItem, b);
  b.selectedList.linkBehavior = baidu.fn.bind(b.onSelectedListCopyPrice, b);
  b.page.c("lnkDeleteAll").onclick = baidu.fn.bind(b.deleteAll, b);
  b.page.c("batchBidBtn").onclick = function() {
    b.getBatchBidDialog().show()
  };
  b.page.c("btnSubmit").onclick = baidu.fn.bind(b.addPackage, b);
  b.page.c("btnCancel").onclick = function() {
    "pack_list" == b.model.from ? er.locator.redirect("/jn/landmark/promotion/package_list~adId=" + b.model.adId) : er.locator.redirect("/jn/landmark/promotion/ad_list")
  };
  b.list.addListener(ui.events.AFTER_RENDER, baidu.fn.bind(b.onPageNoChanged, b));
  b.list.addListener("CMD:click:VIEW", function(a) {
    var a = a.getAttribute("href").replace(/^[^~]+~/g, ""), d = baidu.url.queryToJson(a).packId;
    jn.landmark.promotion.data.viewKeywords("packId=" + d + "&keyword=", function(a) {
      "true" == a.success && b.getViewKeywordsDialog(a.result, d)
    });
    return!1
  })
};
f.setSelectedItem = function(a, b) {
  var c = this.list.getTable().datasource[a];
  b ? (this.selectedList.addItem(c), this.page.c("selectedItemsNum").setContent(this.selectedList.datasource.length)) : this.selectedList._deleteItem(c.id)
};
f.onPageNoChanged = function() {
  for(var a = this.list.getTable().datasource, b = this.selectedList.datasource, c = 0;c < b.length;c++) {
    for(var d = 0;d < a.length;d++) {
      a[d].id == b[c].id && this.list.getTable().selectRow(d, !0)
    }
  }
};
f.onSelectedListDeleteItem = function(a) {
  for(var b, c = this.list.getTable().datasource, d = 0;d < c.length;d++) {
    if(a == c[d].id) {
      b = d;
      break
    }
  }
  this.list.getTable().selectRow(b, !1);
  this.page.c("selectedItemsNum").setContent(this.selectedList.datasource.length)
};
f.deleteAll = function() {
  this.selectedList.datasource = [];
  this.selectedList._rebind();
  this.page.c("selectedItemsNum").setContent(this.selectedList.datasource.length);
  this.list.getTable()._selectAll(!1);
  this.list.getTable()._getHeadCheckbox().checked = !1
};
f.onSelectedListCopyPrice = function(a) {
  for(var b, c = this.selectedList.datasource, d = 0;d < c.length;d++) {
    if(a == c[d].id) {
      b = c[d].price;
      break
    }
  }
  if(b) {
    this.selectedList.setValue(a, b)
  }else {
    return!1
  }
};
f.getBatchBidDialog = function() {
  var a = this;
  a.dialogBatchBid && a.page.removeChild(this.page.getChild("dialogBatchBid"));
  a.dialogBatchBid = jn.util.dialogInit.call(this, {id:"dialogBatchBid", title:"\u6279\u91cf\u51fa\u4ef7", template:"dialogBatchBid", width:490, foot:!0, okHandler:baidu.fn.bind(a.submitBid, this)});
  a.setBidReadOnly();
  a.dialogBatchBid.getMain().onclick = function(b) {
    b = b || window.event;
    "radio" == baidu.event.getTarget(b).type && a.setBidReadOnly()
  };
  return a.dialogBatchBid
};
f.setBidReadOnly = function() {
  this.dialogBatchBid.c("allBid").getChecked() ? this.dialogBatchBid.c("unifiedBid").setReadOnly(!1) : this.dialogBatchBid.c("unifiedBid").setReadOnly(!0)
};
f.submitBid = function() {
  if(this.dialogBatchBid.c("notBid").getChecked()) {
    this.selectedList.setValueAll("--")
  }else {
    if(this.dialogBatchBid.c("allBid").getChecked()) {
      if(this.isPositiveNum(this.dialogBatchBid.c("unifiedBid").getValue())) {
        this.selectedList.setValueAll(this.dialogBatchBid.c("unifiedBid").getValue())
      }else {
        return this.dialogBatchBid.showError("\u8bf7\u586b\u5199\u6b63\u786e\u4ef7\u683c\uff01"), !1
      }
    }else {
      for(var a = 0;a < this.selectedList.datasource.length;a++) {
        this.onSelectedListCopyPrice(this.selectedList.datasource[a].id)
      }
    }
  }
};
f.addPackage = function() {
  var a = this, b, c = [], d = [], e, g = [];
  a.selectedList._saveValue();
  for(var h = 0;h < a.selectedList.datasource.length;h++) {
    b = a.selectedList.datasource[h];
    c.push(b.id);
    d.push(b.objectVersion);
    if("--" == b.value) {
      b.value = ""
    }else {
      if("" == b.value) {
        e = ""
      }else {
        e = new Number(b.value);
        if(isNaN(e) || 0 > e) {
          return ui.Dialog.alert({title:"\u9519\u8bef", content:"\u8bf7\u586b\u5199\u6b63\u786e\u4ef7\u683c\uff01"}), !1
        }
        b.value = e.toFixed(2)
      }
    }
    g.push(b.value)
  }
  jn.landmark.promotion.data.addPackage("adId=" + a.model.adId + "&ids=" + c.join(",") + "&objectVersions=" + d.join(",") + "&prices=" + g.join(","), function(b) {
    "true" == b.success ? "pack_list" == a.model.from ? er.locator.redirect("/jn/landmark/promotion/package_list~adId=" + a.model.adId) : er.locator.redirect("/jn/landmark/promotion/ad_list") : jn.util.showErrorMessage(b.message)
  })
};
f.getViewKeywordsDialog = function(a, b) {
  this.dialogViewKeywords || (this.dialogViewKeywords = jn.util.dialogInit.call(this, {id:"dialogViewKeywordsAddPack", title:"\u67e5\u770b\u5173\u952e\u8bcd", template:"dialogViewKeywordsAddPack", width:290, foot:!1}));
  this.dialogViewKeywords.c("kwSelector").clearSearch();
  this.dialogViewKeywords.c("kwSelector").rebindModel({kwsDatasource:a, kwsExtraParam:"packId=" + b});
  this.dialogViewKeywords.show()
};
f.getExtraParam = function() {
  return this.model.adId ? "adId=" + this.model.adId : "adId="
};
f.isPositiveNum = function(a) {
  a = parseFloat(a);
  return isNaN(a) || 0 > a ? !1 : !0
};
ui.Uploader = function(a) {
  ui.InputControl.call(this, a);
  this.type = "uploader";
  this.form = 1;
  this.callbackName = this.callbackName || "callback";
  var b = this.inputWidth || 160, a = new ui.Button({id:"btn", content:this.text}), b = new ui.TextInput({id:"localPath", width:b});
  this.addChild(a);
  this.addChild(b)
};
baidu.inherits(ui.Uploader, ui.InputControl);
f = ui.Uploader.prototype;
f.datakey = "filedata";
f.render = function(a) {
  a = a || this.main;
  a.innerHTML = this.getHtml();
  this.initControls();
  ui.Uploader.superClass.render.call(this, a)
};
f.initControls = function() {
  var a = baidu.g(this.getId("btnCntr")), b = baidu.g(this.getId("localPathCntr")), c = this.getFile();
  this.getChild("btn").main = a;
  this.getChild("localPath").main = b;
  c.onchange = this.onchangeHandler()
};
f.onchangeHandler = function() {
  var a = this, b = a.getFile(), c = a.getChild("localPath");
  return function() {
    if(b.value && (c.setValue(b.value), !1 !== a.trigger(ui.events.BEFORE_CHANGE))) {
      a.onchange()
    }
  }
};
f.setLocalPath = function(a) {
  this.getChild("localPath").setValue(a)
};
f.getLocalPath = function() {
  return this.getChild("localPath").getValue()
};
f.getFile = function() {
  return baidu.g(this.getId("file"))
};
f.submit = function() {
  !1 !== this.trigger(ui.events.BEFORE_UPLOAD) && document.forms[this.getId("form")].submit()
};
f.onchange = function() {
  this.submit()
};
f.getHtml = function() {
  var a = er.template.get("Uploader"), b = this.getId("");
  return baidu.format(a, this.getRequestUrl(), this.getId("localPathCntr"), this.getId("btnCntr"), this.getClass("file"), this.getId("file"), this.datakey, this.getClass("ifr"), this.getId("ifr"), this.getId("ifrName"), this.getId("ifrName"), this.getId("form"), b, this.getClass("fake"))
};
ui.Uploader.setRequestUrlGenerator = function(a) {
  ui.Uploader.requestUrlGenerator = a
};
ui.Uploader.requestUrlGenerator = function(a) {
  var b = a.getStrRef() + ".processResponse";
  return a.url + (-1 == a.url.indexOf("?") ? "?" : "&") + a.callbackName + "=parent." + b
};
ui.Uploader.prototype.getRequestUrl = function() {
  return ui.Uploader.requestUrlGenerator(this)
};
ui.Uploader.prototype.processResponse = function() {
};
ui.Uploader.prototype.getWrapper = function() {
  return baidu.g(this.wrapper)
};
ui.Uploader.prototype.dispose = function() {
  ui.Uploader.superClass.dispose.call(this)
};
ui.MediaUploader = function(a) {
  ui.Uploader.call(this, a);
  this.type = "uploader";
  this.form = 1
};
baidu.inherits(ui.MediaUploader, ui.Uploader);
f = ui.MediaUploader.prototype;
f.mediatype = "media";
f.autoPreview = !0;
f._maxFileSize = -1;
f.setMaxFileSize = function(a) {
  var b = parseInt(a, 10), a = ("" + a).toLowerCase(), a = a.charAt(a.length - 1);
  "m" == a ? b *= 1048576 : "k" == a && (b *= 1024);
  this._maxFileSize = b
};
f.getRawValue = function() {
  return this._rawValue
};
f.addNotification = function(a) {
  this.clearNotification();
  baidu.addClass(this.main, this.getClass(a))
};
f.clearNotification = function() {
  baidu.removeClass(this.main, this.getClass("uploaded"));
  baidu.removeClass(this.main, this.getClass("uploading"))
};
f.validate = function() {
  return!1 === this._isValidate ? !1 : ui.MediaUploader.superClass.validate.call(this)
};
f.restoreBrowserHistory = function() {
  var a = baidu.g(this.getId("ifr"));
  a && (a = a.parentNode, a.innerHTML = baidu.format('<iframe class="{0}" src="about:blank" id="{1}" name="{2}"></iframe>', this.getClass("ifr"), this.getId("ifr"), this.getId("ifrName")))
};
f.bindEvent = function() {
  ui.MediaUploader.superClass.bindEvent.call(this);
  var a = this;
  this.addListener(ui.events.BEFORE_CHANGE, function() {
    a._isValidate = !0;
    if(a.validate()) {
      a.addNotification("uploading"), a.hideError()
    }else {
      return!1
    }
    if(-1 != a._maxFileSize) {
      var b = baidu.g(a.getId("file"));
      if(b.files && (b = b.files[0], b = b.size || b.fileSize || 0, b > a._maxFileSize)) {
        return a.clearNotification(), a.showError("\u6587\u4ef6\u592a\u5927\u4e86\uff0c\u5f53\u524d\u662f" + b + "\u5b57\u8282\uff0c\u6700\u591a\u5141\u8bb8" + a._maxFileSize + "\u5b57\u8282"), !1
      }
    }
  });
  this.addListener(ui.events.UPLOAD_SUCCESS, function() {
    a._isValidate = !0;
    a.addNotification("uploaded");
    setTimeout(function() {
      a.clearNotification()
    }, 5E3);
    a.restoreBrowserHistory()
  });
  this.addListener(ui.events.UPLOAD_FAILURE, function() {
    a._isValidate = !1;
    a.clearNotification();
    a.restoreBrowserHistory()
  })
};
f.getFitSize = function(a) {
  var b = a.width > a.height ? a.width : a.height, c = this.fitsize;
  return b > c ? (b = c / b, {width:Math.floor(b * a.width), height:Math.floor(b * a.height)}) : a
};
f.render = function(a) {
  ui.MediaUploader.superClass.render.call(this, a);
  this._isRender || (this.wrapper = document.createElement("DIV"), this.wrapper.id = this.getId("wrapper"), baidu.addClass(this.wrapper, this.getClass("preview")), baidu.dom.insertAfter(this.wrapper, this.main), this._isRender = !0);
  this.wrapper.innerHTML = "";
  this.datasource && this.showPreview(this.datasource)
};
f.showPreview = function(a) {
  var b = this.mediatype, c = "";
  "image" == b ? c = this.getImg(a) : "flash" == b ? c = this.getFla(a) : "media" == b && (b = this._guessMediaType(a.preview_url), "image" == b ? c = this.getImg(a) : "flash" == b && (c = this.getFla(a)));
  this.wrapper.innerHTML = c;
  a.local_file_name && this.setLocalPath(a.local_file_name)
};
f.processResponse = function(a) {
  "true" == a.success ? (this._rawValue = a, this.autoPreview && this.showPreview(a.result), this.trigger(ui.events.UPLOAD_SUCCESS)) : ((a = a.message.ERROR) && this.showError(a), this.trigger(ui.events.UPLOAD_FAILURE))
};
f._guessMediaType = function(a) {
  var b = a.lastIndexOf(".") + 1, a = a.substring(b).toLowerCase();
  return"jpg" == a || "gif" == a || "jpeg" == a || "png" == a ? "image" : "swf" == a ? "flash" : ""
};
f.getImg = function(a) {
  var b = this.getFitSize(a), c = er.template.get("MediaUploaderImg");
  return baidu.format(c, this.getId("preview-img"), a.preview_url, b.width, b.height)
};
f.getFla = function(a) {
  var b = this.getFitSize(a);
  return baidu.swf.createHTML({id:this.getId("preview-fla"), url:a.preview_url, width:b.width, height:b.height, wmode:"transparent"})
};
f.getValue = function(a) {
  return a ? this.getLocalPath() : (a = this._rawValue) && "true" == a.success ? a.result.preview_url : this.datasource ? this.datasource.preview_url : ""
};
f.dispose = function() {
  this.wrapper = null;
  ui.MediaUploader.superClass.dispose.call(this)
};
f.disable = function() {
  ui.MediaUploader.superClass.disable.call(this);
  var a = baidu.g(this.getId("file"));
  baidu.dom.hide(a);
  this.c("btn").disable();
  this.c("localPath").disable()
};
f.enable = function() {
  ui.MediaUploader.superClass.enable.call(this);
  var a = baidu.g(this.getId("file"));
  baidu.dom.show(a);
  this.c("btn").enable();
  this.c("localPath").enable()
};
f.onchangeHandler = function() {
  var a = this, b = a.getFile(), c = a.getChild("localPath");
  return function() {
    if(b.value) {
      if(c.setValue(b.value), !1 !== a.trigger(ui.events.BEFORE_CHANGE)) {
        a.onchange()
      }else {
        a.clearNotification()
      }
    }
  }
};
ui.CheckBox = function(a) {
  ui.BaseBox.call(this, a);
  this.form = 1;
  this.boxType = "CheckBox";
  this.type = "checkbox";
  this.wrapTag = "INPUT";
  this.wrapType = "checkbox";
  this.defaultValue = this.defaultValue || 0
};
baidu.inherits(ui.CheckBox, ui.BaseBox);
ui.pref = {};
function updateMask$$inline_458(a, b) {
  var c = baidu.dom.getPosition(a);
  baidu.dom.setStyles(b, {top:c.top + "px", left:c.left + "px", width:a.offsetWidth + "px", height:a.offsetHeight + "px"})
}
var masks$$inline_459 = [], unique_id$$inline_472 = 0;
ui.pref.util = {getFullUrl:function(a) {
  return/^(http|https):\/\//.test(a) ? a : window.location.protocol + "//" + window.location.host + (/^\//.test(a) ? "" : "/") + a
}, inputVirtualText:function(a, b) {
  a = baidu.g(a);
  a.value = b;
  baidu.dom.addClass(a, "blur");
  baidu.on(a, "focus", function() {
    a.value == b && (a.value = "", baidu.dom.removeClass(a, "blur"))
  });
  baidu.on(a, "blur", function() {
    "" == a.value && (a.value = b, baidu.dom.addClass(a, "blur"))
  })
}, selectUtil:{add:function(a, b, c) {
  var d = document.createElement("option");
  d.appendChild(document.createTextNode(b));
  d.setAttribute("value", c);
  a.appendChild(d)
}, rebindData:function(a, b) {
  a.innerHTML = "";
  for(var c = 0;c < b.length;c++) {
    this.add(a, b[c].text, b[c].value)
  }
}, create:function(a) {
  var b = baidu.dom.create("select");
  this.rebindData(b, a);
  return b
}, clear:function(a) {
  for(var b = a.options.length - 1;0 <= b;b--) {
    try {
      a.remove(b)
    }catch(c) {
    }
  }
}, select:function(a, b) {
  for(var c = 0;c < a.options.length && a.options[c].value != b;c++) {
  }
  if(c >= a.options.length) {
    return!1
  }
  try {
    a.options[c].selected = !0
  }catch(d) {
  }
  a.selectedIndex = c;
  a.value = b;
  return!0
}, isEmpty:function(a) {
  return 0 >= a.options.length ? !0 : !1
}}, validate:function(a, b, c) {
  for(var a = baidu.string.trim(a), d = parseInt(a), e = 0;e < c.length;e++) {
    var g = c[e];
    switch(g.name) {
      case "required":
        if("" == a) {
          return{result:!1, message:b + "\u4e0d\u80fd\u4e3a\u7a7a\uff01"}
        }
        break;
      case "number":
        if(isNaN(d)) {
          return{result:!1, message:b + "\u5fc5\u987b\u662f\u6570\u5b57\uff01"}
        }
        break;
      case "min":
        if(isNaN(d)) {
          return{result:!1, message:b + "\u5fc5\u987b\u662f\u6570\u5b57\uff01"}
        }
        if(d < g.minValue) {
          return{result:!1, message:b + "\u4e0d\u80fd\u5c0f\u4e8e" + g.minValue + "\uff01"}
        }
        break;
      case "ne":
        if(a == g.value) {
          return{result:!1, message:b + "\u4e0d\u80fd\u4e3a" + g.value + "\uff01"}
        }
        break;
      case "range":
        if(isNaN(d)) {
          return{result:!1, message:b + "\u5fc5\u987b\u662f\u6570\u5b57\uff01"}
        }
        if(d < g.minValue || d > g.maxValue) {
          return{result:!1, message:b + "\u8bf7\u586b\u5199\u5904\u4e8e" + g.minValue + "\u548c" + g.maxValue + "\u4e4b\u95f4\u7684\u6570\u5b57\uff01"}
        }
    }
  }
  return{result:!0}
}, maskHelper:{updateMask:updateMask$$inline_458, addMasks:function() {
  baidu.array.each(baidu.dom.query("iframe"), function(a) {
    var b = baidu.dom.create("div", {"class":"iframe-mask"});
    document.body.appendChild(b);
    updateMask$$inline_458(a, b);
    masks$$inline_459.push({iframe:a, mask:b})
  })
}, refreshMasks:function() {
  baidu.array.each(masks$$inline_459, function(a) {
    updateMask$$inline_458(a.iframe, a.mask)
  })
}, clearMasks:function() {
  baidu.array.each(baidu.dom.q("iframe-mask"), function(a) {
    baidu.dom.remove(a)
  });
  masks$$inline_459 = []
}}, getUniqueId:function() {
  return unique_id$$inline_472++
}, endWith:function(a, b) {
  var c = a.length, d = b.length;
  return null == b || "" == b || 0 == c || d > c ? !1 : a.substring(c - d) == b ? !0 : !1
}, regexp:{urlLoose:/^((http|https|ftp|ftps):\/\/)?[A-Za-z0-9][A-Za-z0-9-]{0,}[A-Za-z0-9]?(\.[A-Za-z0-9]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/i, urlStrict:/^(http|https|ftp|ftps):\/\/[A-Za-z0-9][A-Za-z0-9-]{0,}[A-Za-z0-9]?(\.[A-Za-z0-9]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/i}, getObject:function(a, b) {
  var c = a.split("_-_"), d = c[0].match(/wr[0-9]+(c[0-9]+)?$/), e = c[0].replace(/_wr\d+(c\d+)?$/, ""), d = d ? d[0] : "";
  1 < c.length && c.slice(1);
  switch(b) {
    case "ui.MaterialEditor":
      return ui.util.get(e);
    case "ui.pref.Layout":
      return ui.util.get(e).layout;
    case "ui.pref.Widget":
      return ui.util.get(e).layout.widgetMap[d];
    case "ui.pref.WidgetPreference":
      return ui.util.get(e).layout.widgetMap[d].getWidgetPreference();
    case "Item":
      for(c = ui.util.get(e).layout.widgetMap[d].getWidgetPreference()._root;c;) {
        if(c.getId() == a) {
          return c
        }
        var g = null;
        if(c instanceof ListItem) {
          for(e = 0;e < c._children.length;e++) {
            if(0 == a.indexOf(c._children[e].getId())) {
              g = c._children[e];
              break
            }
          }
        }else {
          if(c instanceof AlternativeItem) {
            c = c._optionMap[c._currentOption], 0 == a.indexOf(c.getId()) && (g = c)
          }else {
            if(c instanceof GridItem) {
              d = c._children;
              e = 0;
              a:for(;e < c._rowNum;e++) {
                for(var h = 0;h < c._colNum;h++) {
                  if(0 == a.indexOf(d[e][h].getId())) {
                    g = d[e][h];
                    break a
                  }
                }
              }
            }else {
              c instanceof CombinedItem && baidu.object.each(c._children, function(b) {
                g || 0 == a.indexOf(b.getId()) && (g = b)
              })
            }
          }
        }
        if(g) {
          c = g
        }else {
          return null
        }
      }
  }
}, getItem:function(a) {
  return this.getObject(a, "Item")
}};
function parse$$inline_474(a, b) {
  return"int" === b ? parseInt(a, 10) : "float" === b ? parseFloat(a) : "date" === b ? baidu.date.parse(a) : a
}
function noticeInTail$$inline_475(a, b, c) {
  showNoticeDom$$inline_478(b);
  c = c._pref.displayName || c._pref.name || "";
  baidu.g(b.id + textSuffix$$inline_492).innerHTML = c + a
}
function noticeInTailNoTitle$$inline_476(a, b) {
  showNoticeDom$$inline_478(b);
  baidu.g(b.id + textSuffix$$inline_492).innerHTML = a
}
function showNoticeDom$$inline_478(a) {
  var b = baidu.g(a.id + suffix$$inline_490), c = a.parentNode;
  if(!b) {
    var b = a.id, a = baidu.g(a.id + suffix$$inline_490), d;
    a || (a = document.createElement("div"), a.id = b + suffix$$inline_490, a.className = validClass$$inline_487, d = document.createElement("div"), d.id = b + iconSuffix$$inline_491, d.className = iconClass$$inline_488, a.appendChild(d), d = document.createElement("div"), d.id = b + textSuffix$$inline_492, d.className = textClass$$inline_489, a.appendChild(d));
    b = a;
    c.appendChild(b)
  }
  b.style.display = "";
  baidu.addClass(c, errorClass$$inline_486)
}
function cancelNoticeInTile$$inline_480(a) {
  var b = baidu.g(a.id + suffix$$inline_490), a = a.parentNode, c = !0;
  b && (b.style.display = "none");
  for(var d = 0;d < a.childNodes.length;d++) {
    if(b = a.childNodes[d], b.className === validClass$$inline_487 && "none" !== b.style.display) {
      c = !1;
      break
    }
  }
  c && baidu.removeClass(a, errorClass$$inline_486)
}
var urlStrict$$inline_485 = /^(http|https):\/\/[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/i, errorClass$$inline_486 = "validate-error", validClass$$inline_487 = "validate", iconClass$$inline_488 = "validate-icon", textClass$$inline_489 = "validate-text", suffix$$inline_490 = "validate", iconSuffix$$inline_491 = "validateIcon", textSuffix$$inline_492 = "validateText", errorMsg$$inline_495 = {SUCCESS:"", ERROR_EMPTY:"\u4e0d\u80fd\u4e3a\u7a7a\uff01", 
ERROR_REGEX:"\u683c\u5f0f\u9519\u8bef", ERROR_INT:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u586b\u5199\u6574\u6570", ERROR_NUMBER:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u586b\u5199\u6570\u5b57", ERROR_MIN:"\u4e0d\u80fd\u5c0f\u4e8e{0}", ERROR_MIN_DATE:"\u4e0d\u80fd\u65e9\u4e8e{0}", ERROR_MAX:"\u4e0d\u80fd\u5927\u4e8e{0}", ERROR_MAX_DATE:"\u4e0d\u80fd\u665a\u4e8e{0}", ERROR_GT:"\u5fc5\u987b\u5927\u4e8e{0}", ERROR_GT_DATE:"\u5fc5\u987b\u665a\u4e8e{0}", ERROR_LT:"\u5fc5\u987b\u5c0f\u4e8e{0}", 
ERROR_LT_DATE:"\u5fc5\u987b\u65e9\u4e8e{0}", ERROR_RANGE:"\u5fc5\u987b\u5728{0}\u5230{1}\u7684\u8303\u56f4\u5185", ERROR_LENGTH:"\u957f\u5ea6\u5fc5\u987b\u7b49\u4e8e{0}", ERROR_MIN_LENGTH:"\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e{0}", ERROR_MIN_COUNT:"\u4e2a\u6570\u4e0d\u80fd\u5c11\u4e8e{0}", ERROR_MAX_COUNT:"\u4e2a\u6570\u4e0d\u80fd\u591a\u4e8e{0}", ERROR_MAX_LENGTH:"\u957f\u5ea6\u4e0d\u80fd\u5927\u4e8e{0}", ERROR_MIN_BYTE_LENGTH:"\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e{0}\u5b57\u8282<br />\u8bf4\u660e\uff1a\u4e2d\u6587\u5b57\u7b26\u7b97\u4e24\u4e2a\u5b57\u8282\uff0c\u82f1\u6587\u5b57\u7b26\u4e00\u4e2a\u5b57\u8282", 
ERROR_MAX_BYTE_LENGTH:"\u957f\u5ea6\u4e0d\u80fd\u5927\u4e8e{0}\u5b57\u8282<br />\u8bf4\u660e\uff1a\u4e2d\u6587\u5b57\u7b26\u7b97\u4e24\u4e2a\u5b57\u8282\uff0c\u82f1\u6587\u5b57\u7b26\u4e00\u4e2a\u5b57\u8282", ERROR_LENGTH_RANGE:"\u957f\u5ea6\u5fc5\u987b\u5728{0}\u5230{1}\u7684\u8303\u56f4\u5185", ERROR_CALENDAR:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u63092010-01-01\u7684\u683c\u5f0f\u8f93\u5165", ERROR_EXT:"\u540e\u7f00\u540d\u4e0d\u5408\u6cd5\uff0c\u53ea\u5141\u8bb8\u540e\u7f00\u540d\u4e3a{0}", 
ERROR_INVALID_CHAR:"\u542b\u6709\u4e0d\u5141\u8bb8\u8f93\u5165\u7684\u5b57\u7b26\uff1a{0}", ERROR_PRECISION:"\u5c0f\u6570\u70b9\u540e\u6570\u5b57\u4e0d\u80fd\u591a\u4e8e{0}\u4f4d", ERROR_BACKEND:"{0}"}, ruleMap$$inline_496 = {required:{validate:function(a, b) {
  return b && "" === baidu.trim(a) ? "ERROR_EMPTY" : "SUCCESS"
}}, charge_name:{validate:function(a) {
  return"" === baidu.trim(a) ? "ERROR_EMPTY" : /[=\s]/i.test(a) ? ["ERROR_INVALID_CHAR", "\u7a7a\u683c,Tab,\u7b49\u53f7"] : "SUCCESS"
}}, ext:{validate:function(a, b) {
  if("" === baidu.trim(a)) {
    return"ERROR_EMPTY"
  }
  var c = Array.prototype.slice.call(arguments, 1), d = a.lastIndexOf(".");
  if(-1 == d) {
    return["ERROR_EXT", c.join(",")]
  }
  for(var d = a.substring(d + 1).toLowerCase(), e = 0, g = c.length;e < g;e++) {
    if(c[e].toLowerCase() == d) {
      return"SUCCESS"
    }
  }
  return["ERROR_EXT", c.join(",")]
}}, regex:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : !RegExp(b, c).test(a) ? "ERROR_REGEX" : "SUCCESS"
}}, "int":{validate:function(a) {
  return"" === baidu.trim(a) ? "SUCCESS" : isNaN(a - 0) || 0 <= a.indexOf(".") ? "ERROR_INT" : "SUCCESS"
}}, number:{validate:function(a) {
  return"" === baidu.trim(a) ? "SUCCESS" : isNaN(a - 0) ? "ERROR_NUMBER" : "SUCCESS"
}}, min:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_474(a, c) < parse$$inline_474(b, c) ? ["date" === c ? "ERROR_MIN_DATE" : "ERROR_MIN", b] : "SUCCESS"
}}, gt:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_474(a, c) <= parse$$inline_474(b, c) ? ["date" === c ? "ERROR_GT_DATE" : "ERROR_GT", b] : "SUCCESS"
}}, max:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_474(a, c) > parse$$inline_474(b, c) ? ["date" === c ? "ERROR_MAX_DATE" : "ERROR_MAX", b] : "SUCCESS"
}}, lt:{validate:function(a, b, c) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_474(a, c) >= parse$$inline_474(b, c) ? ["date" === c ? "ERROR_LT_DATE" : "ERROR_LT", b] : "SUCCESS"
}}, range:{validate:function(a, b, c, d) {
  return"" === baidu.trim(a) ? "SUCCESS" : parse$$inline_474(a, d) > parse$$inline_474(c, d) || parse$$inline_474(a, d) < parse$$inline_474(b, d) ? ["ERROR_RANGE", b, c] : "SUCCESS"
}}, length:{validate:function(a, b) {
  return a.length != b ? ["ERROR_LENGTH", b] : "SUCCESS"
}}, minLength:{validate:function(a, b) {
  return a.length < b ? ["ERROR_MIN_LENGTH", b] : "SUCCESS"
}}, minCount:{validate:function(a, b) {
  return a.length < b ? ["ERROR_MIN_COUNT", b] : "SUCCESS"
}}, maxCount:{validate:function(a, b) {
  return a.length > b ? ["ERROR_MAX_COUNT", b] : "SUCCESS"
}}, maxLength:{validate:function(a, b) {
  return a.length > b ? ["ERROR_MAX_LENGTH", b] : "SUCCESS"
}}, minByteLength:{validate:function(a, b) {
  return baidu.string.getByteLength(a) < b ? ["ERROR_MIN_BYTE_LENGTH", b] : "SUCCESS"
}}, maxByteLength:{validate:function(a, b) {
  return baidu.string.getByteLength(a) > b ? ["ERROR_MAX_BYTE_LENGTH", b] : "SUCCESS"
}}, lengthRange:{validate:function(a, b, c) {
  return a.length < b || a.length > c ? ["ERROR_LENGTH_RANGE", b, c] : "SUCCESS"
}}, calendar:{validate:function() {
  return"SUCCESS"
}}, positiveNumber:{validate:function(a) {
  return"" === baidu.trim(a) ? 0 : isNaN(parseInt(a, 10)) || 0 >= parseInt(a, 10) || -1 < a.indexOf(".") ? 1 : 0
}, noticeText:{1:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u5fc5\u987b\u4e3a\u6b63\u6574\u6570"}}, positiveFloat:{validate:function(a) {
  return!/^[0-9]\d*(\.\d+)?$/.test(a) || "0" == a || 0 == a ? 1 : 0
}, noticeText:{1:"\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u5fc5\u987b\u4e3a\u6b63\u6570"}}, email:{validate:function(a) {
  var b = a.length;
  return 0 == b ? 1 : 200 < b ? 2 : !/^.+@.+$/.test(a) ? 3 : 0
}, notice:noticeInTail$$inline_475, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7200", 3:"\u683c\u5f0f\u9519\u8bef"}}, emailVerify:{validate:function(a, b) {
  var c = a.length;
  if(0 === c) {
    return 1
  }
  if(200 < c) {
    return 2
  }
  if(/^.+@.+$/.test(a)) {
    if(a != b) {
      return 4
    }
  }else {
    return 3
  }
  return 0
}, notice:noticeInTailNoTitle$$inline_476, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u786e\u8ba4\u90ae\u4ef6\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u786e\u8ba4\u90ae\u4ef6\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7200", 3:"\u786e\u8ba4\u90ae\u4ef6\u683c\u5f0f\u9519\u8bef", 4:"\u60a8\u4e24\u6b21\u8f93\u5165\u7684\u90ae\u4ef6\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"}}, phone:{validate:function(a) {
  var b = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(a);
  return"" != a && !b ? 1 : 0
}, notice:noticeInTail$$inline_475, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u6309\u533a\u53f7-\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u586b\u5199"}}, fax:{validate:function(a) {
  var b = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(a);
  return"" != a && !b ? 1 : 0
}, notice:noticeInTail$$inline_475, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u6309\u533a\u53f7-\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u586b\u5199"}}, mobile:{validate:function(a) {
  var b = /^1[3,5,8]{1}[0-9]{1}[0-9]{8}$/.test(a);
  return"" != a && !b ? 1 : 0
}, notice:noticeInTailNoTitle$$inline_476, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u624b\u673a\u53f7\u7801\u683c\u5f0f\u9519\u8bef\uff0c\u624b\u673a\u53f7\u7801\u4e3a\u4ee513,15,18\u5f00\u5934\u768411\u4f4d\u6570\u5b57"}}, password:{validate:function(a) {
  var b = a.length;
  return 0 === b ? 1 : 6 > b ? 2 : !/[a-z]/.test(a) || !/[A-Z]/.test(a) || !/\d/.test(a) ? 3 : 0
}, notice:noticeInTail$$inline_475, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u4e0d\u80fd\u5c11\u4e8e6\u4f4d", 3:"\u5fc5\u987b\u5305\u542b\u5c0f\u5199\u5b57\u6bcd\u3001\u5927\u5199\u5b57\u6bcd\u548c\u963f\u62c9\u4f2f\u6570\u5b57\u4e09\u79cd\u5b57\u7b26"}}, endTime:{validate:function(a, b, c, d) {
  if(d) {
    var e = d.date, g = e instanceof Array && e.length
  }
  return a <= b && "9999010124" != c ? 1 : "9999010124" != c && d && g && a < e[g - 1] ? 2 : 0
}, notice:noticeInTailNoTitle$$inline_476, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u7ed3\u675f\u65f6\u95f4\u5fc5\u987b\u665a\u4e8e\u8d77\u59cb\u65f6\u95f4", 2:"\u7ed3\u675f\u65e5\u671f\u5fc5\u987b\u665a\u6216\u7b49\u4e8e\u5b9a\u5411\u6295\u653e\u4e2d\u9009\u62e9\u7684\u65e5\u671f"}}, endTimeOrder:{validate:function(a, b, c) {
  return a < b && "9999010124" != c ? 1 : 0
}, notice:noticeInTailNoTitle$$inline_476, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u7ed3\u675f\u65e5\u671f\u4e0d\u5f97\u65e9\u4e8e\u8d77\u59cb\u65e5\u671f"}}, passwordVerify:{validate:function(a, b) {
  return 0 === a.length ? 1 : a != b ? 2 : 0
}, notice:noticeInTailNoTitle$$inline_476, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u60a8\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"}}, stringType:{validate:function(a, b) {
  switch(b) {
    case "URL":
      var c = a.length;
      if(0 === c) {
        return 0
      }
      if(1024 < c) {
        return 1
      }
      if(!urlStrict$$inline_485.test(a)) {
        return 2
      }
      break;
    case "IMAGE":
      var c = a.length, d = a.substring(c - 4, c).toLowerCase(), e = a.substring(c - 5, c - 4);
      if(0 === c) {
        return 0
      }
      if(1E3 < c) {
        return 3
      }
      if(urlStrict$$inline_485.test(a)) {
        if(".jpg" != d && ".gif" != d && ".png" != d || "/" == e) {
          return 5
        }
      }else {
        return 4
      }
  }
}, notice:noticeInTail$$inline_475, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u4e0d\u80fd\u8d85\u8fc71024\u4e2a\u5b57\u7b26", 2:"\u683c\u5f0f\u9519\u8bef", 3:"\u56fe\u7247\u5730\u5740\u4e0d\u80fd\u8d85\u8fc71000\u4e2a\u5b57\u7b26", 4:"\u56fe\u7247\u5730\u5740\u683c\u5f0f\u9519\u8bef", 5:"\u56fe\u7247\u683c\u5f0f\u5fc5\u987b\u4e3ajpg, gif\u6216png\uff01"}}, link:{validate:function(a) {
  var b = a.length;
  if(0 === b) {
    return 0
  }
  if(1024 < b) {
    return 2
  }
  if(!urlStrict$$inline_485.test(a)) {
    return 3
  }
}, notice:noticeInTail$$inline_475, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u4e0d\u80fd\u8d85\u8fc71024\u4e2a\u5b57\u7b26", 3:"\u683c\u5f0f\u9519\u8bef"}}, imgUrl:{validate:function(a) {
  var b = a.length, c = a.substring(b - 4, b).toLowerCase(), d = a.substring(b - 5, b - 4);
  if(0 === b) {
    return 1
  }
  if(1E3 < b) {
    return 2
  }
  if(urlStrict$$inline_485.test(a)) {
    if(".jpg" != c && ".gif" != c && ".png" != c || "/" == d) {
      return 4
    }
  }else {
    return 3
  }
}, notice:noticeInTailNoTitle$$inline_476, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"\u56fe\u7247\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a", 2:"\u56fe\u7247\u5730\u5740\u4e0d\u80fd\u8d85\u8fc71000\u4e2a\u5b57\u7b26", 3:"\u56fe\u7247\u5730\u5740\u683c\u5f0f\u9519\u8bef", 4:"\u56fe\u7247\u683c\u5f0f\u5fc5\u987b\u4e3ajpg, gif\u6216png\uff01"}}, flashUrl:{validate:function(a) {
  var b = a.length, c = a.substring(b - 4, b).toLowerCase(), d = a.substring(b - 5, b - 4);
  if(0 === b) {
    return 1
  }
  if(1E3 < b) {
    return 2
  }
  if(urlStrict$$inline_485.test(a)) {
    if(".swf" != c && ".flv" != c || "/" == d) {
      return 4
    }
  }else {
    return 3
  }
}, notice:noticeInTailNoTitle$$inline_476, cancelNotice:cancelNoticeInTile$$inline_480, noticeText:{1:"Flash\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a", 2:"Flash\u5730\u5740\u4e0d\u80fd\u8d85\u8fc71000\u4e2a\u5b57\u7b26", 3:"Flash\u5730\u5740\u683c\u5f0f\u9519\u8bef", 4:'\u8bf7\u8f93\u5165\u540e\u7f00\u4e3a"swf"\u6216"flv"\u7684Flash\u5730\u5740'}}, precision:{validate:function(a, b, c) {
  if("" === baidu.trim(a)) {
    return"SUCCESS"
  }
  c || (c = "float");
  a = parse$$inline_474(a, c);
  return!isNaN(a) && a.toFixed(b) != a ? ["ERROR_PRECISION", b] : "SUCCESS"
}}, backendError:{validate:function(a, b) {
  return["ERROR_BACKEND", b]
}, notice:noticeInTailNoTitle$$inline_476}};
ui.pref.validator = {validate:function(a, b) {
  if(!a || !b || 0 >= baidu.object.keys(b).length) {
    return!0
  }
  var c = !0;
  baidu.object.each(b, function(b, e) {
    if(!c) {
      return!1
    }
    var g;
    if(!a.getValue || !e) {
      g = !0
    }else {
      var h = a.getValue();
      g = ruleMap$$inline_496[e];
      var i = "", h = g.validate.apply(g, [h, b, a]);
      baidu.lang.isNumber(h) && 0 !== h ? i = g.noticeText[h] : baidu.lang.isString(h) && "" !== h ? i = errorMsg$$inline_495[h] : baidu.lang.isArray(h) && (h[0] = errorMsg$$inline_495[h[0]], i = baidu.format.apply(null, h));
      h = baidu.g(a.getId()) || baidu.g(a.getId() + "-create-valid");
      i ? (g.notice = g.notice || noticeInTail$$inline_475, g.notice(i, h, a)) : (g.cancelNotice = g.cancelNotice || cancelNoticeInTile$$inline_480, g.cancelNotice(h, a));
      g = !i
    }
    g || (c = !1)
  });
  return c
}, showError:function(a, b, c) {
  var d = a.parentNode;
  baidu.addClass(d, "validate-error");
  if("validate" !== d.lastChild.className) {
    var e = document.createElement("div");
    baidu.addClass(e, "validate");
    var g = a, h = g.id;
    if(!h) {
      do {
        g = g.parentNode, h = g.id
      }while(!h && g != document.body)
    }
    e.innerHTML = baidu.format('<div class="validate-icon"></div><div id="{1}" class="validate-text">{0}</div>', b, h + "_validatetext");
    c && a.parentNode && (a.parentNode.style.width = c + "px");
    d.appendChild(e)
  }
}, hideError:function(a) {
  var b = a.parentNode;
  b && "validate" === b.lastChild.className && b.removeChild(b.lastChild);
  baidu.removeClass(a.parentNode, "validate-error")
}, batchHideErrors:function(a) {
  for(var b, c, d = 0, e = a.length;d < e;d++) {
    if(c = a[d]) {
      (b = c.parentNode) && "validate" === b.lastChild.className && b.removeChild(b.lastChild), baidu.removeClass(c.parentNode, "validate-error")
    }
  }
}, getValidateMessage:function(a, b) {
  baidu.lang.isArray(b) || (b = [b]);
  for(var c = 0;c < b.length;c++) {
    var d = Validator(a, b[c], "output");
    if(d && d.errorText) {
      return d
    }
  }
  return{result:!0, errorText:""}
}};
function Item(a, b) {
  this._id = a;
  this._pref = b
}
Item.idSeperator = "_-_";
f = Item.prototype;
f.getId = function(a) {
  return a ? this._id + Item.idSeperator + a : this._id
};
f.getValue = function() {
  throw"unimplemented";
};
f.setValue = function() {
  throw"unimplemented";
};
f.render = function() {
  throw"unimplemented";
};
f.bindEvent = function() {
};
f.validate = function() {
  return ui.pref.validator.validate(this, this._pref.rules)
};
f.ON_VALUE_CHANGE = function() {
  ui.pref.util.getObject(this.getId(), "ui.pref.WidgetPreference").trigger(ui.events.FORM_CHANGE)
};
function StringItem(a, b) {
  Item.call(this, a, b)
}
baidu.inherits(StringItem, Item);
f = StringItem.prototype;
f.getValue = function() {
  var a = baidu.g(this.getId()), b = this._pref;
  if(a) {
    return a = baidu.string.trim(a.value), b.tip && a == b.tip ? "" : a
  }
};
f.setValue = function(a) {
  var b = baidu.g(this.getId()), c = this._pref, a = baidu.lang.hasValue(a) ? a : c.defaultValue || c.tip || "";
  b && (b.value = a, c.tip && (a == c.tip ? this._blurHandler() : this._focusHandler()))
};
f.render = function() {
  var a = this._pref;
  return baidu.string.format(['<label for="${id}" class="${label_class}">${displayName}\uff1a</label><div class="pref-field">', a.multiline ? '<textarea id="${id}" name="${name}" class="ui-textarea${tip_class}">${value}</textarea>' : '<input type="text" name="${name}" id="${id}" value="${value}" class="ui-text${tip_class}">', '<div id="${id}-msg" class="pref-warn" style="clear:both;display:none;">${tip}</div></div>'].join(""), {id:this.getId(), name:a.name, displayName:a.displayName || a.name, value:a.defaultValue || 
  a.tip || "", label_class:a.required ? "required" : "optional", tip_class:!a.defaultValue && a.tip ? " ui-text-virtual" : ""})
};
f.bindEvent = function() {
  var a = this, b = baidu.g(a.getId()), c = a._pref;
  c.tip && (b.onfocus = baidu.fn.bind(a._focusHandler, a), b.onblur = baidu.fn.bind(a._blurHandler, a));
  c.rules && (c.rules.minByteLength || c.rules.maxByteLength) ? (a.changeHandler = a.getChangeHandler(), baidu.ie ? b.onkeyup = a.changeHandler : b.oninput = a.changeHandler) : baidu.ie ? b.onkeyup = function() {
    a.ON_VALUE_CHANGE()
  } : b.oninput = function() {
    a.ON_VALUE_CHANGE()
  }
};
f._focusHandler = function() {
  var a = baidu.g(this.getId()), b = this._pref.tip;
  baidu.removeClass(a, "ui-text-virtual");
  b && a.value == b && (a.value = "")
};
f._blurHandler = function() {
  var a = baidu.g(this.getId()), b = a.value, c = this._pref.tip;
  if(c && ("" == b || b == c)) {
    a.value = c, baidu.addClass(a, "ui-text-virtual")
  }
};
f.getChangeHandler = function() {
  var a = this;
  return function() {
    var b = baidu.g(a.getId() + "-msg"), c = a._pref, d = a.getValue(), d = baidu.string.getByteLength(d), e = c.rules.minByteLength, c = c.rules.maxByteLength, g = [baidu.format("\u63d0\u793a\uff1a\u60a8\u5df2\u8f93\u5165${cur_len}\u5b57\u8282", {cur_len:d})];
    e && d < e && g.push(baidu.format('<span class="pref-error">\uff08\u5c0f\u4e8e\u5141\u8bb8\u7684\u6700\u5c0f\u5b57\u8282\u6570\uff1a${min}\u5b57\u8282\uff09</span>', {min:e}));
    c && d > c && g.push(baidu.format('<span class="pref-error">\uff08\u5df2\u5927\u4e8e\u5141\u8bb8\u7684\u6700\u5927\u5b57\u8282\u6570\uff1a${max}\u5b57\u8282\uff09</span>', {max:c}));
    b.innerHTML = g.join("");
    baidu.show(b);
    clearTimeout(a.timer);
    a.timer = setTimeout(function() {
      b && baidu.hide(b)
    }, 5E3);
    a.ON_VALUE_CHANGE()
  }
};
function EnumItem(a, b) {
  Item.call(this, a, b)
}
baidu.inherits(EnumItem, Item);
EnumItem.prototype.getValue = function() {
  var a = baidu.g(this.getId());
  if(a) {
    return a.value
  }
};
EnumItem.prototype.setValue = function(a) {
  var b = baidu.g(this.getId()), c = this._pref, a = baidu.lang.hasValue(a) ? a : c.defaultValue;
  if(b) {
    for(c = 0;c < b.options.length && b.options[c].value != a;c++) {
    }
    if(!(c >= b.options.length)) {
      try {
        b.options[c].selected = !0
      }catch(d) {
      }
      b.selectedIndex = c;
      b.value = a
    }
  }
};
EnumItem.prototype.render = function() {
  var a = this._pref, b = [];
  if(a.enumValues) {
    for(var c = 0;c < a.enumValues.length;c++) {
      var d = a.enumValues[c];
      b.push(baidu.string.format('<option value="${value}"${attributes}>${text}</option>', {text:d.displayValue || d.value, value:d.value, attributes:d.value == a.defaultValue ? " selected" : ""}))
    }
  }
  return baidu.string.format('<label for="${id}" class="${label_class}">${displayName}\uff1a</label><div class="pref-field"><select name="${name}" id="${id}">${options}</select></div>', {id:this.getId(), name:a.name, displayName:a.displayName || a.name, options:b.join(""), label_class:a.required ? "required" : "optional"})
};
EnumItem.prototype.bindEvent = function() {
  baidu.g(this.getId()).onchange = baidu.fn.bind(this.ON_VALUE_CHANGE, this)
};
function BoolItem(a, b) {
  Item.call(this, a, b)
}
baidu.inherits(BoolItem, Item);
BoolItem.prototype.getValue = function() {
  var a = baidu.g(this.getId());
  return a ? !!a.checked : !1
};
BoolItem.prototype.setValue = function(a) {
  var b = baidu.g(this.getId()), c = this._pref, a = baidu.lang.hasValue(a) ? a : c.defaultValue;
  b && (b.checked = !!a);
  return!1
};
BoolItem.prototype.render = function() {
  var a = this._pref;
  return baidu.string.format('<label for="${id}" class="${label_class}">${displayName}\uff1a</label><div class="pref-field"><input type="checkbox" name="${name}" id="${id}" ${attributes}"></div>', {id:this.getId(), name:a.name, displayName:a.displayName || a.name, attributes:a.defaultValue ? "checked" : "", label_class:a.required ? "required" : "optional"})
};
BoolItem.prototype.bindEvent = function() {
  baidu.g(this.getId()).onclick = baidu.fn.bind(this.ON_VALUE_CHANGE, this)
};
function HiddenItem(a, b) {
  Item.call(this, a, b)
}
baidu.inherits(HiddenItem, Item);
HiddenItem.prototype.getValue = function() {
  var a = baidu.g(this.getId());
  if(a) {
    return baidu.string.trim(a.value)
  }
};
HiddenItem.prototype.setValue = function(a) {
  var b = baidu.g(this.getId()), c = this._pref, a = baidu.lang.hasValue(a) ? a : c.defaultValue || "";
  b && (b.value = a)
};
HiddenItem.prototype.render = function() {
  var a = this._pref;
  return baidu.string.format('<input type="hidden" name="${name}" id="${id}" value="${value}">', {id:this.getId(), name:a.name, value:a.defaultValue || ""})
};
function UploadItem(a, b) {
  Item.call(this, a, b);
  this.timer = 0;
  this.errorMessage = ""
}
baidu.inherits(UploadItem, Item);
UploadItem.GLOBAL_CALLBACK = baidu.fn.blank;
f = UploadItem.prototype;
f.getValue = function() {
  var a = baidu.g(this.getId() + "-fileurl");
  if(a) {
    return baidu.string.trim(a.value)
  }
};
f.setValue = function(a) {
  var b = this._pref, c = baidu.g(this.getId() + "-prevw-lnk"), d = baidu.g(this.getId() + "-prevw-img"), a = baidu.lang.hasValue(a) ? a : b.defaultValue || "";
  baidu.g(this.getId() + "-fileurl").value = a;
  c.href = a;
  "FLASH" == b.fileType ? (baidu.dom.addClass(c, "pref-upload-flash"), baidu.hide(d)) : (baidu.dom.removeClass(c, "pref-upload-flash"), baidu.show(d), d.src = a);
  a ? baidu.show(this.getId() + "-prevw-ctner") : baidu.hide(this.getId() + "-prevw-ctner")
};
f.processResponse = function(a) {
  if(a && "true" == a.success) {
    document.forms[this.getId() + "-form"].reset();
    this.setValue(ui.pref.util.getFullUrl(a.result.preview_url));
    var b = this.getId() + "-success-tip";
    baidu.show(b);
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      var a = baidu.g(b);
      a && baidu.hide(a)
    }, 4E3);
    this.errorMessage = "";
    this.validate()
  }else {
    a = a.message.ERROR || "\u672a\u77e5\u9519\u8bef", ui.pref.validator.validate(this, {backendError:a}), this.errorMessage = a
  }
  this.restoreBrowserHistory()
};
f.restoreBrowserHistory = function() {
  var a = baidu.g(this.getId() + "-ifr");
  a && (a = a.parentNode, a.innerHTML = baidu.format('<iframe id="{0}-ifr" name="{0}-ifrName" src="about:blank"></iframe>', this.getId()))
};
f.render = function() {
  var a = this._pref, b = a.extraAttr, c = this.getId().split(Item.idSeperator), c = 1 < c.length ? c.slice(1).join(Item.idSeperator) : "", d = ui.pref.util.getObject(this.getId(), "ui.MaterialEditor"), e = ui.pref.util.getObject(this.getId(), "ui.pref.Widget");
  ui.pref.util.getObject(this.getId(), "ui.pref.WidgetPreference");
  var g = er.context.get("adOwner"), g = g ? g.id : "", h = b.fileType || "IMAGE", i = b.width, j = b.height, k = b.maxSize, b = b.ext, b = baidu.format("${widthText}${heightText}${maxSizeText}${extText}", {widthText:i ? "\u5bbd" + i + "px" : "\u4efb\u610f\u5bbd\u5ea6", heightText:j ? "\u9ad8" + j + "px" : "\u4efb\u610f\u9ad8\u5ea6", maxSizeText:k ? "\u6587\u4ef6\u5927\u5c0f" + k + "K\u4ee5\u4e0b" : "\u6587\u4ef6\u5927\u5c0f\u4e0d\u9650", extText:b ? "\u7c7b\u578b\u4e3a" + b.split(",").join("\u3001") : 
  "\u6587\u4ef6\u7c7b\u578b\u4e0d\u9650"});
  return baidu.string.format('<label for="${id}" class="${label_class}">${displayName}\uff1a</label><div class="pref-field"><form id="${id}-form" enctype="multipart/form-data" target="${id}-ifrName" name="${id}-form" method="post" action="${uploadUrl}" class="ui-mateditor-left"><input type="file" name="${name}" id="${id}" class="uploader-file" /><input type="hidden" id="${id}-fileurl" value="${value}" /><input type="hidden" name="callback" value="parent.ui.pref.util.getItem(\'${id}\').processResponse" /><input type="hidden" name="namePath" value="${namePath}" /><input type="hidden" name="widgetId" value="${widgetId}" />${aderIdInputHtml}</form><div id="${id}-prevw-ctner" class="ui-mateditor-left" style="${hidePrevw}"><a href="${fileUrl}" target="_blank" id="${id}-prevw-lnk" class="pref-upload-lnk${upload_extra_class}"><img id="${id}-prevw-img" class="pref-upload-img" src="${fileUrl}" style="${hide_or_not}" /></a></div><div class="ui-mateditor-left"><span id="${id}-success-tip" class="pref-success" style="display:none;">\u4e0a\u4f20\u6210\u529f\uff01</span></div><div style="display:none"><iframe id="${id}-ifr" name="${id}-ifrName" src="about:blank"></iframe></div><div class="pref-tip" style="clear:both;">${tip}</div></div>', 
  {id:this.getId(), name:"filedata", displayName:a.displayName || a.name, value:a.defaultValue || "", fileUrl:a.defaultValue || "javascript:void(0);", hidePrevw:a.defaultValue ? "" : "display:none;", upload_extra_class:a.defaultValue && "FLASH" == h ? " pref-upload-flash" : "", hide_or_not:a.defaultValue && "FLASH" == h ? "display:none;" : "", uploadUrl:d.uploadUrl, namePath:c, widgetId:e._widgetId, aderIdInputHtml:"" != g ? baidu.format('<input type="hidden" name="aderId" value="{0}" />', g) : "", 
  label_class:a.required ? "required" : "optional", tip:"\u8bf7\u4e0a\u4f20" + b + "\u7684\u56fe\u7247"})
};
f.validate = function() {
  return this.errorMessage ? (ui.pref.validator.validate(this, {backendError:this.errorMessage}), !1) : UploadItem.superClass.validate.call(this)
};
f.onchangeHandler = function() {
  var a = this, b = baidu.g(a.getId() + "-form");
  UploadItem.GLOBAL_CALLBACK = function(b) {
    a.processResponse(b)
  };
  ui.pref.validator.validate(a);
  b.submit();
  a.ON_VALUE_CHANGE()
};
f.bindEvent = function() {
  baidu.g(this.getId()).onchange = baidu.fn.bind(this.onchangeHandler, this)
};
function ListItem(a, b, c) {
  Item.call(this, a, b);
  this._children = [];
  this.level = c
}
baidu.inherits(ListItem, Item);
f = ListItem.prototype;
f.getValue = function() {
  for(var a = [], b = 0;b < this._children.length;b++) {
    a.push(this._children[b].getValue())
  }
  return a
};
f.setValue = function(a) {
  var b = this._pref, b = b.rules && b.rules.minCount ? b.rules.minCount : 0, c = this._children.length, d = 0, d = 0;
  baidu.lang.hasValue(a) || (a = []);
  d = a.length;
  d = Math.max(d, b);
  if(d < c) {
    this.removeLastChildren(c - d)
  }else {
    if(d > c) {
      for(b = c;b < d;b++) {
        this.createChild()
      }
    }
  }
  for(b = 0;b < this._children.length;b++) {
    this._children[b].setValue(a[b])
  }
};
f.render = function() {
  return baidu.string.format('<div class="pref-field"><div id="${id}-prefs" class="ui-mateditor-left" style="display:none;"></div><div style="clear:both;" id="${id}-create-ctner"><div class="pref-create" id="${id}-create-valid"><a id="${id}-create" href="javascript:void(0);">\u6dfb\u52a0${displayName}</a>&nbsp;<span class="pref-tip">${tip}</span></div></div><div class="clear">&nbsp;</div></div>', {id:this.getId(), displayName:this._pref.displayName || this._pref.name, tip:this._pref.tip || ""})
};
f.createChild = function() {
  var a = this, b = a._pref.datatype.toLowerCase(), c = a._pref, d = c.rules && c.rules.maxCount ? c.rules.maxCount : 999, e = baidu.format("${id}-create-ctner", {id:a.getId()});
  if(a._children.length >= d) {
    return ui.Dialog.alert({title:"\u63d0\u793a", content:"\u5df2\u8fbe\u5230\u6700\u5927\u4e2a\u6570\u9650\u5236\uff1a" + d}), null
  }
  var g = null, h = baidu.format("${id}-prefs", {id:a.getId()});
  if("combined" == b) {
    g = c.items
  }else {
    if("list" == b) {
      c = baidu.object.clone(a._pref), c.datatype = "string", c.defaultValue = "", g = [c]
    }else {
      if("list[image]" == b) {
        g = [{datatype:"string", name:"url", required:!0, displayName:"\u94fe\u63a5\u5730\u5740"}, {datatype:"string", name:"image_url", required:!0, displayName:"\u56fe\u7247\u5730\u5740"}], c.openNewWindow && g.push({datatype:"bool", name:"openNewWindow", displayName:"\u65b0\u7a97\u53e3\u6253\u5f00\uff1f"})
      }else {
        if("list[link]" == b) {
          g = [{datatype:"string", name:"url", required:!0, displayName:"\u94fe\u63a5\u5730\u5740"}, {datatype:"string", name:"text", required:!0, displayName:"\u94fe\u63a5\u6587\u5b57"}], c.openNewWindow && g.push({datatype:"bool", name:"openNewWindow", displayName:"\u65b0\u7a97\u53e3\u6253\u5f00\uff1f"})
        }else {
          throw"unsupported datatype [" + b + "]";
        }
      }
    }
  }
  var i = a.getId() + "_" + ui.pref.util.getUniqueId(), b = new CombinedItem(i, g, a.level), c = baidu.dom.create("div", {id:i + "container", "class":baidu.format("pref-level${level}-block", {level:5 < a.level ? 5 : a.level})}), g = baidu.format("${cid}-delete", {cid:i}), j = baidu.format("${cid}-toggle", {cid:i}), k = baidu.format("${cid}-body", {cid:i});
  c.innerHTML = baidu.format('<div id="${cid}-head">\n<div class="prefs-title">\n<div id="${cid}-toggle" class="pref-toggle-visible" data-cid="${cid}" title="\u6536\u8d77\u4e0e\u5c55\u5f00"></div>\n<div id="${cid}-title" class="pref-block-title">${displayName}${index}</div>\n<a id="${cid}-delete" class="pref-delete-link" href="javascript:void(0);" data-cid="${cid}">\u5220\u9664</a>\n</div>\n</div>\n<div id="${cid}-body" style="display:block;">${child}</div>', {cid:i, displayName:a._pref.displayName || 
  a._pref.name, child:b.render(), index:a._children.length + 1});
  baidu.g(h).appendChild(c);
  baidu.show(h);
  b.bindEvent();
  a._children.push(b);
  baidu.on(g, "click", function() {
    baidu.dom.remove(i + "container");
    for(var b = 0;b < a._children.length;b++) {
      if(i == a._children[b].getId()) {
        a._children.splice(b, 1);
        break
      }
    }
    0 >= a._children.length && baidu.hide(h);
    a._children.length < d && baidu.show(e);
    a.refresh();
    a.ON_VALUE_CHANGE()
  });
  k = baidu.g(k);
  j = baidu.g(j);
  baidu.on(j, "click", function() {
    "none" == k.style.display ? (k.style.display = "block", j.className = "pref-toggle-visible") : (k.style.display = "none", j.className = "pref-toggle-hidden")
  });
  a._children.length >= d && baidu.hide(e);
  return b
};
f.removeLastChildren = function(a) {
  for(var b = 0;b < a;b++) {
    this.removeLastChild()
  }
};
f.removeLastChild = function() {
  var a = this._pref, a = a.rules && a.rules.maxCount ? a.rules.maxCount : 999, b = baidu.format("${id}-create-ctner", {id:this.getId()}), c = baidu.format("${id}-prefs", {id:this.getId()}), d = this._children.pop();
  d && (d = d.getId() + "container", baidu.dom.remove(d));
  0 >= this._children.length && baidu.hide(c);
  this._children.length < a && baidu.show(b)
};
f.clearChildren = function() {
  var a = baidu.format("${id}-create-ctner", {id:this.getId()}), b = baidu.format("${id}-prefs", {id:this.getId()});
  this._children = [];
  baidu.g(b).innerHTML = "";
  baidu.hide(b);
  baidu.show(a)
};
f.expand = function(a) {
  var b = baidu.g(baidu.format("${cid}-toggle", {cid:a})), a = baidu.g(baidu.format("${cid}-body", {cid:a}));
  "none" == a.style.display && (a.style.display = "block", b.className = "pref-toggle-visible")
};
f.refresh = function() {
  for(var a = 0;a < this._children.length;a++) {
    baidu.g(this._children[a].getId() + "-title").innerHTML = (this._pref.displayName || this._pref.name) + (a + 1)
  }
};
f.bindEvent = function() {
  var a = this, b = baidu.format("${id}-create", {id:a.getId()});
  baidu.on(b, "click", function() {
    a.createChild();
    a.ON_VALUE_CHANGE()
  });
  a.setValue()
};
f.validate = function() {
  var a = !0;
  if(ListItem.superClass.validate.call(this)) {
    for(var b = 0;b < this._children.length;b++) {
      var c = this._children[b];
      c.validate() || (a = !1, this.expand(c.getId()))
    }
  }else {
    a = !1
  }
  return a
};
function AlternativeItem(a, b, c) {
  Item.call(this, a, b);
  this._optionMap = {};
  this._currentOption = null;
  this.level = c
}
baidu.inherits(AlternativeItem, Item);
f = AlternativeItem.prototype;
f.render = function() {
  var a = this._pref, b = a.enumValues;
  this._optionMap = {};
  if(0 >= b.length) {
    return""
  }
  for(var c = 0;c < b.length;c++) {
    var d = b[c];
    this._optionMap[d.value] = new CombinedItem(this.getId(d.value), d.items, this.level)
  }
  this._currentOption = a.defaultValue || b[0].value;
  return baidu.string.format('<label for="${id}-sel">${displayName}\uff1a</label><div class="pref-field">${select}</div><div id="${id}-prefs">${child}</div>', {id:this.getId(), displayName:this._pref.displayName || this._pref.name, child:this._optionMap[this._currentOption].render(), select:this.renderSelect(), label_class:a.required ? "required" : "optional"})
};
f.renderSelect = function() {
  for(var a = this._pref.enumValues, b = [], c = 0;c < a.length;c++) {
    var d = a[c];
    b.push(baidu.format('<option value="${value}"${selected}>${displayValue}</option>', {value:d.value, displayValue:d.displayValue || d.value, selected:d.value == this._currentOption ? 'selected="selected"' : ""}))
  }
  return baidu.format('<select id="${id}-sel">${options}</select>', {id:this.getId(), options:b.join("\n")})
};
f._renderChild = function() {
  var a = baidu.string.format("{0}-sel", this.getId()), b = baidu.string.format("{0}-prefs", this.getId());
  this._currentOption = baidu.g(a).value;
  a = this._optionMap[this._currentOption];
  baidu.g(b).innerHTML = a.render();
  a.bindEvent()
};
f.bindEvent = function() {
  var a = this, b = baidu.string.format("{0}-sel", a.getId());
  baidu.on(b, "change", function() {
    a._renderChild();
    a.ON_VALUE_CHANGE()
  });
  this._optionMap[this._currentOption].bindEvent()
};
f.getValue = function() {
  return[this._currentOption, this._optionMap[this._currentOption].getValue()]
};
f.setValue = function(a) {
  var a = a || [], b = this._pref, c = b.enumValues, d = baidu.g(baidu.string.format("{0}-sel", this.getId()));
  this._currentOption = a[0] || b.defaultValue || c[0].value;
  ui.pref.util.selectUtil.select(d, this._currentOption);
  this._renderChild();
  this._optionMap[this._currentOption].setValue(a[1])
};
f.validate = function() {
  return this._optionMap[this._currentOption].validate()
};
function GridItem(a, b, c) {
  Item.call(this, a, b);
  this._range = {};
  this._colNum = this._rowNum = 0;
  this._td_pref = this._th_pref = null;
  this._children = [];
  this.level = c
}
baidu.inherits(GridItem, Item);
f = GridItem.prototype;
f.render = function() {
  function a(a, b) {
    return b >= a[0] && b <= a[1] ? b : b > a[0] && b > a[1] ? a[1] : a[0]
  }
  var b = this._pref;
  this._th_pref = b.headCell && 0 < b.headCell.length ? b.headCell : b.dataCell;
  this._td_pref = b.dataCell;
  this._range = b.extraAttr;
  this._rowNum = a(this._range.rowRange, 3);
  this._colNum = a(this._range.colRange, 5);
  return baidu.string.format('<div class="pref-grid"><div class="pref-field"><div class="pref-grid-setting"><div class="ui-mateditor-left${hideRowSelect}">\u884c\u6570&nbsp;&nbsp;${rowSelect}&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="ui-mateditor-left${hideColSelect}">\u5217\u6570&nbsp;&nbsp;${colSelect}</div><div class="clear"></div></div><div style="width:480px;" class="clear"></div><div id="${id}-content">${content}</div></div></div>', {id:this.getId(), displayName:this._pref.displayName || this._pref.name, 
  rowSelect:this.renderSelect(this._range.rowRange, "row"), colSelect:this.renderSelect(this._range.colRange, "col"), hideRowSelect:this._range.rowRange[0] == this._range.rowRange[1] ? " hide" : "", hideColSelect:this._range.colRange[0] == this._range.colRange[1] ? " hide" : "", content:this._getGridHtml()})
};
f.renderSelect = function(a, b) {
  if(!a || 2 > a.length) {
    throw"malformed range data.";
  }
  for(var a = "row" == b ? this._range.rowRange : this._range.colRange, c = [], d = a[0];d <= a[1];d++) {
    c.push(baidu.format('<option value="${value}"${selected}>${displayValue}</option>', {value:d, displayValue:"row" == b ? d + "\u884c" : d + "\u5217", selected:d == ("row" == b ? this._rowNum : this._colNum) ? 'selected="selected"' : ""}))
  }
  return baidu.format('<select id="${id}-${type}-sel">${options}</select>', {id:this.getId(), type:b, options:c.join("\n")})
};
f._getGridHtml = function() {
  var a = this._children, b = this.getId(), c = this._rowNum, d = this._colNum;
  a.length > c && a.splice(c);
  for(var e = 0;e < a.length;e++) {
    a[e].length > d && a[e].splice(d)
  }
  for(e = 0;e < c;e++) {
    for(var g = 0;g < d;g++) {
      "undefined" == typeof a[e] && (a[e] = []), "undefined" == typeof a[e][g] && (a[e][g] = new CombinedItem(baidu.format("{0}-r{1}c{2}", b, e, g), 0 == e ? this._th_pref : this._td_pref, this.level))
    }
  }
  for(var b = [], h = [], e = 0;e < c;e++) {
    h = [];
    for(g = 0;g < d;g++) {
      h.push(baidu.format(0 == e ? "<th>{0}</th>" : "<td>{0}</td>", a[e][g].render()))
    }
    b.push(baidu.format("<tr>{0}</tr>", h.join("")))
  }
  return baidu.format("<table><tbody>{0}</tbody></table>", b.join(""))
};
f.renderGrid = function() {
  var a = baidu.string.format("{0}-{1}-sel", this.getId(), "row"), b = baidu.string.format("{0}-{1}-sel", this.getId(), "col"), c = baidu.format("{0}-content", this.getId());
  this._rowNum = baidu.g(a) ? baidu.g(a).value : this._rowNum;
  this._colNum = baidu.g(b) ? baidu.g(b).value : this._colNum;
  baidu.g(c).innerHTML = this._getGridHtml();
  this.bindChildEvent()
};
f.bindEvent = function() {
  var a = this, b = baidu.string.format("{0}-{1}-sel", a.getId(), "row"), c = baidu.string.format("{0}-{1}-sel", a.getId(), "col");
  baidu.on(b, "change", function() {
    var b = a.getValue();
    a.renderGrid();
    a.setValue(b, !0);
    a.ON_VALUE_CHANGE()
  });
  baidu.on(c, "change", function() {
    var b = a.getValue();
    a.renderGrid();
    a.setValue(b, !0);
    a.ON_VALUE_CHANGE()
  });
  a.bindChildEvent()
};
f.bindChildEvent = function() {
  for(var a = this._children, b = 0;b < this._rowNum;b++) {
    for(var c = 0;c < this._colNum;c++) {
      a[b][c].bindEvent()
    }
  }
};
f.getValue = function() {
  for(var a = this._children, b = [], c = 0;c < this._rowNum;c++) {
    b[c] = [];
    for(var d = 0;d < this._colNum;d++) {
      b[c][d] = a[c][d].getValue()
    }
  }
  return b
};
f.setValue = function(a, b) {
  var a = a || {}, c = this._children, d = a, e = a ? a.length : null, g = a && 0 < a.length && a[0] ? a[0].length : null, h = baidu.string.format("{0}-{1}-sel", this.getId(), "row"), i = baidu.string.format("{0}-{1}-sel", this.getId(), "col");
  !0 !== b && (e && (this._rowNum = e, ui.pref.util.selectUtil.select(baidu.g(h), this._rowNum)), g && (this._colNum = g, ui.pref.util.selectUtil.select(baidu.g(i), this._colNum)), this.renderGrid());
  if(d) {
    for(e = 0;e < this._rowNum;e++) {
      for(g = 0;g < this._colNum;g++) {
        d[e] && d[e][g] && c[e][g].setValue(d[e][g])
      }
    }
  }
};
f.validate = function() {
  var a = !0, b = this._children;
  if(GridItem.superClass.validate.call(this)) {
    for(var c = 0;c < this._rowNum && !1 != a;c++) {
      for(var d = 0;d < this._colNum;d++) {
        b[c][d].validate() || (a = !1)
      }
    }
  }else {
    a = !1
  }
  return a
};
function CombinedItem(a, b, c) {
  Item.call(this, a, b);
  this._children = {};
  this.level = c;
  this.dom = null
}
baidu.inherits(CombinedItem, Item);
baidu.browser.firefox && (CombinedItem.prototype.getId = function(a) {
  var b = this.dom ? this.dom.id : this._id;
  return a ? b + Item.idSeperator + a : b
});
f = CombinedItem.prototype;
f.renderSimpleItem = function(a) {
  var b = {string:StringItem, "enum":EnumItem, bool:BoolItem, hidden:HiddenItem, upload:UploadItem, image:StringItem, link:StringItem, alternative:AlternativeItem, grid:GridItem}, c = this.getId(a.name), d = a.datatype.toLowerCase(), b = d == "alternative" || d == "grid" ? new b[d](c, a, this.level + 1) : new b[d](c, a);
  this._children[a.name] = b;
  a = b.render();
  return'<div class="pref-row"' + (d == "hidden" ? ' style="display:none"' : "") + ">" + a + "</div>"
};
f.renderListItem = function(a) {
  var b = new ListItem(this.getId(a.name), a, this.level + 1);
  this._children[a.name] = b;
  return'<div class="pref-row">' + b.render() + "</div>"
};
f.render = function() {
  for(var a = this._pref, b = ['<div id="' + this.getId() + '" class="prefs">'], c = 0;c < a.length;c++) {
    var d = a[c], e = null;
    if(!d.datatype) {
      d.datatype = "string"
    }
    e = d.datatype.toLowerCase();
    if(e == "string" || e == "bool" || e == "image" || e == "link" || e == "enum" || e == "hidden" || e == "upload" || e == "alternative" || e == "grid") {
      b.push(this.renderSimpleItem(d))
    }else {
      if(e == "list" || e == "list[image]" || e == "list[link]" || e == "combined") {
        b.push(this.renderListItem(d))
      }else {
        throw"unsupported datatype [" + e + "]";
      }
    }
  }
  b.push("</div>");
  b.push('<div class="clear"></div>');
  return b.join("")
};
f.getValue = function() {
  for(var a = this._pref, b = {}, c = 0;c < a.length;c++) {
    var d = a[c];
    if(!d.datatype) {
      d.datatype = "string"
    }
    b[d.name] = this._children[d.name].getValue()
  }
  return b
};
f.setValue = function(a) {
  for(var b = this._pref, a = a || {}, c = 0;c < b.length;c++) {
    var d = b[c];
    this._children[d.name].setValue(a[d.name])
  }
  return a
};
f.bindEvent = function() {
  baidu.object.each(this._children, function(a) {
    a && a.bindEvent && a.bindEvent()
  });
  this.dom = baidu.g(this.getId())
};
f.validate = function() {
  var a = true, b;
  for(b in this._children) {
    this._children[b].validate() || (a = false)
  }
  return a
};
ui.pref.WidgetPreference = function(a, b, c) {
  base.EventDispatcher.call(this);
  this._fields = a;
  this._widgetName = b;
  this._id = c;
  this._root = null
};
baidu.inherits(ui.pref.WidgetPreference, base.EventDispatcher);
f = ui.pref.WidgetPreference.prototype;
f.getId = function(a) {
  var b = baidu.browser.firefox && this._root ? this._root.getId() : this._id;
  return a ? b + a : b
};
f.toForm = function() {
  this._root = new CombinedItem(this.getId(), this._fields, 1);
  return baidu.format('<fieldset class="pref-block-fieldset"><legend class="pref-block-legend"><div id="${block_id}-toggle" class="pref-toggle-visible" title="\u6536\u8d77\u4e0e\u5c55\u5f00"></div><div id="${block_id}-title" class="pref-block-title pref-level1-title">${widget_name}</div></legend><div id="${block_id}-body" class="pref-level1-block">${form_html}</div><div id="${block_id}-ellipsis" class="pref-block-ellipsis" style="display:none;">...</div></fieldset>', {widget_name:baidu.string.encodeHTML(this._widgetName), 
  form_html:this._root.render(), block_id:this.getId() + "-block"})
};
f.getValue = function() {
  return this._root.getValue()
};
f.setValue = function(a) {
  return this._root.setValue(a)
};
f.bindEvent = function() {
  var a = baidu.g(this.getId() + "-block-toggle");
  this._root.bindEvent();
  baidu.on(a, "click", baidu.fn.bind(this.toggleFormBlock, this))
};
f.toggleFormBlock = function() {
  var a = baidu.g(this.getId() + "-block-toggle"), b = baidu.g(this.getId() + "-block-body"), c = baidu.g(this.getId() + "-block-ellipsis");
  if(b.style.display == "none") {
    baidu.show(b);
    baidu.hide(c);
    a.className = "pref-toggle-visible"
  }else {
    baidu.hide(b);
    baidu.show(c);
    a.className = "pref-toggle-hidden"
  }
};
f.expand = function() {
  var a = baidu.g(this.getId() + "-block-toggle"), b = baidu.g(this.getId() + "-block-body"), c = baidu.g(this.getId() + "-block-ellipsis");
  if(b.style.display == "none") {
    baidu.show(b);
    baidu.hide(c);
    a.className = "pref-toggle-visible"
  }
};
f.validate = function() {
  return this._root.validate()
};
ui.pref.Widget = function(a, b, c) {
  this._widgetId = a.widgetId;
  this._xml = a.widgetXml;
  this._container = baidu.g(b);
  this.ctrlId = c;
  this._widgetPreference = null;
  this._userPrefs = a.spec.userPrefs;
  this._extraValidators = a.spec.validators || [];
  this._userData = null;
  this._widgetName = a.widgetName
};
f = ui.pref.Widget.prototype;
f.getWidgetPreference = function() {
  this._widgetPreference || (this._widgetPreference = new ui.pref.WidgetPreference(this._userPrefs, this._widgetName, this.ctrlId));
  return this._widgetPreference
};
f.getFormHtml = function() {
  return this.getWidgetPreference().toForm()
};
f.bindEvent = function() {
  this.getWidgetPreference().bindEvent()
};
f.rebindData = function(a) {
  var b = this.getWidgetPreference();
  (this._userData = a) && b.setValue(this._userData)
};
f.getUserData = function() {
  return this.getWidgetPreference().getValue()
};
f.extraValidate = function(a) {
  for(var b = null, b = "", c = 0;c < this._extraValidators.length;c++) {
    if(b = this._extraValidators[c], b = eval("(" + b + ")")(a)) {
      return this.showGlobalError(b), !1
    }
  }
  this.hideGlobalError();
  return!0
};
f.showGlobalError = function(a) {
  if(this._widgetPreference && this._widgetPreference._root) {
    var b = this._widgetPreference._root.getId(), c = baidu.g(b), b = b + "_error", d = baidu.g(b);
    d || (d = baidu.dom.create("div", {id:b, className:"pref-global-error"}), c.parentNode.appendChild(d));
    c = d;
    a ? (c.innerHTML = "\u9519\u8bef\uff1a" + a, baidu.show(c)) : baidu.hide(c)
  }
};
f.hideGlobalError = function() {
  this.showGlobalError("")
};
f.updateSize = function() {
  var a = this._container, b = baidu.g("ifr-" + a.id);
  b && (b.width = parseInt(a.style.width, 10), b.height = parseInt(a.style.height, 10));
  b = baidu.dom.q("cell-head", a, "div");
  0 < b.length && (a = a.offsetWidth - 14, b[0].style.width = (66 < a ? a : 66) + "px")
};
f.ondispose = function() {
};
f.dispose = function() {
  this._container.innerHTML = "";
  this._widgetPreference = this._container = null
};
ui.pref.Layout = function(a, b, c, d, e, g, h) {
  this._template = a;
  this._data = null;
  this._templateId = a.templateId;
  this.canvasContainer = baidu.g(d);
  this.prefsContainer = baidu.g(e);
  this.highlight = baidu.g(g);
  this.widgets = b;
  this.ctrlId = c;
  this.options = h || {};
  this.widgetMap = {}
};
f = ui.pref.Layout.prototype;
f.getObjId = function(a) {
  return(a = a.match(/wr[0-9]+(c[0-9]+)?$/)) && 0 < a.length ? a[0] : null
};
f.getDomId = function(a) {
  return(a = this.getObjId(a)) ? this.ctrlId + a : null
};
f.parse = function(a) {
  var b = a.rows, c, d, e, g, h;
  d = parseInt(a.width);
  e = parseInt(a.height);
  if(a.padding) {
    var i = a.padding;
    baidu.array.each(i, function(a, b) {
      i[b] = parseInt(a)
    });
    a = i
  }else {
    a = [0, 0, 0, 0]
  }
  var j = {width:d, height:e, padding:a, rows:[]};
  if(b && 0 < b.length) {
    for(var k = 0;k < b.length;k++) {
      a = "wr" + k;
      c = b[k];
      e = {};
      e.height = parseInt(c.height);
      e.width = j.width;
      e.id = a;
      if((d = c.cols) && 0 < d.length) {
        e.isLeaf = !1;
        e.cols = [];
        for(var n = 0;n < d.length;n++) {
          h = a + "c" + n, c = d[n], g = {}, g.height = e.height, g.width = parseInt(c.width), g.id = h, g.isLeaf = !0, g.widgetId = c.widgetId, e.cols.push(g)
        }
      }else {
        e.isLeaf = !0, e.widgetId = c.widgetId
      }
      j.rows.push(e)
    }
  }
  return j
};
f._getCellInfo = function(a) {
  for(var b = this._data, c = b.rows, d, e, g, h = {self:null, parent:null, isCol:null}, a = this.getObjId(a), i = 0;i < c.length && null == h.self;i++) {
    d = c[i];
    if(d.id == a) {
      h.self = d;
      h.parent = b;
      h.isCol = !1;
      h.index = i;
      break
    }
    if(!d.isLeaf) {
      e = d.cols;
      for(var j = 0;j < e.length;j++) {
        if(g = e[j], g.id == a) {
          h.self = g;
          h.parent = d;
          h.isCol = !0;
          h.index = j;
          break
        }
      }
    }
  }
  return h
};
f.getCellObj = function(a) {
  return this._getCellInfo(a).self
};
f.render = function() {
  var a = this.canvasContainer;
  a.innerHTML = "";
  this._data = this.parse(this._template.templateData);
  this.adjustLayoutSize();
  var b = this._data, c = [["cell-bg-1", "cell-bg-2"], ["cell-bg-3", "cell-bg-4"]];
  baidu.dom.setStyles(a, {width:b.width + "px", padding:b.padding ? b.padding.join("px ") + "px" : "0px"});
  for(var b = b.rows, d, e, g, h, i = 0;i < b.length;i++) {
    d = b[i];
    g = baidu.dom.create("div", {id:this.getDomId(d.id)});
    baidu.dom.setStyles(g, {width:d.width + "px", height:d.height + "px"});
    if(d.isLeaf) {
      baidu.addClass(g, "is-leaf"), baidu.addClass(g, c[i % 2][0])
    }else {
      d = d.cols;
      for(var j = 0;j < d.length;j++) {
        e = d[j], h = baidu.dom.create("div", {id:this.getDomId(e.id)}), baidu.dom.setStyles(h, {width:e.width + "px", height:e.height + "px"}), baidu.addClass(h, "is-leaf"), baidu.addClass(h, c[i % 2][j % 2]), baidu.addClass(h, "ui-mateditor-left"), g.appendChild(h)
      }
    }
    a.appendChild(g)
  }
  this.bindEvent();
  this.renderWidgets()
};
f.renderWidgets = function() {
  for(var a = this.getKeys(), b = 0;b < a.length;b++) {
    var c = a[b], d = this.getCellObj(c);
    this.addWidget(baidu.g(this.getDomId(c)), d.widgetId)
  }
  this.renderForm()
};
f.renderForm = function() {
  var a = [];
  baidu.object.each(this.widgetMap, function(b) {
    a.push(b.getFormHtml())
  });
  this.prefsContainer.innerHTML = a.join("");
  baidu.object.each(this.widgetMap, function(a) {
    a.getWidgetPreference().addListener(ui.events.FORM_CHANGE, function() {
    });
    a.bindEvent()
  })
};
f.recoverWidgets = function(a) {
  a && a.templateId == this._templateId && baidu.object.each(this.widgetMap, function(b, c) {
    var d = a.widgets[c];
    b._widgetId == d.widgetId && b.rebindData(d.widgetData)
  })
};
f.bindEvent = function() {
};
f.validate = function() {
  var a = !0;
  baidu.object.each(this.widgetMap, function(b) {
    var c = b.getWidgetPreference(), d = c.getValue();
    if(!c.validate() || !b.extraValidate(d)) {
      c.expand(), a = !1
    }
  });
  return a
};
f.renderIframes = function(a) {
  var b = this;
  baidu.object.each(a, function(a, d) {
    var e = "ifr-" + b.getDomId(d), g = a + (/\?/.test(a) ? "&" : "?") + ".stamp=" + Math.random(), h = baidu.g(b.getDomId(d));
    h.innerHTML = baidu.format('<iframe src="${src}" id="${id}" name="${id}" width="${width}" height="${height}" onload="${onload}" class="ui-mateditor-ifr" style="width:100%;border:none" border="0" frameborder="no" allowTransparency="true"></iframe>', {src:g, id:e, width:parseInt(h.offsetWidth, 10), height:parseInt(h.offsetHeight, 10), onload:baidu.string.encodeHTML(baidu.format('ui.util.get("{0}").layout._onloadHandler("{1}")', b.ctrlId, d))});
    baidu.addClass(h, "cell-opacity");
    baidu.dom.removeStyle(h, "height")
  })
};
f._onloadHandler = function(a) {
  var b = "ifr-" + this.getDomId(a), a = baidu.g(b), c = null, c = baidu.ie ? document.frames[b].document : a.contentWindow.document, b = c.documentElement || c.body, c = (c = c.getElementsByTagName("div")[0]) ? c.offsetHeight : Math.max(b.scrollHeight, b.offsetHeight);
  baidu.dom.setStyles(a, {height:c});
  this.onHeightChange()
};
f.getPrefs = function() {
  var a = {};
  baidu.object.each(this.widgetMap, function(b, c) {
    b && (a[c] = {widgetId:b._widgetId, widgetData:b.getUserData()})
  });
  return a
};
f.getKeys = function() {
  var a = this, b = baidu.dom.q("is-leaf", a.canvasContainer, "div"), c = [];
  baidu.array.each(b, function(b) {
    c.push(a.getObjId(b.id))
  });
  return c
};
f.dispose = function() {
  var a = this, b = this.canvasContainer;
  baidu.array.each(a.widgetMap, function(b, d) {
    a.deleteWidget(b, d)
  });
  b.innerHTML = ""
};
f.updateRowHeight = function(a, b) {
  var c, d;
  a.height = b;
  baidu.g(this.getDomId(a.id)).style.height = b + "px";
  if(a.isLeaf) {
    (d = this.widgetMap[a.id]) && d.updateSize()
  }else {
    c = a.cols;
    for(var e = 0;e < c.length;e++) {
      d = c[e], d.height = b, baidu.g(this.getDomId(d.id)).style.height = b + "px", (d = this.widgetMap[d.id]) && d.updateSize()
    }
  }
};
f.adjustLayoutSize = function() {
  var a = this._data, b = a.rows, c, d, e = a.width;
  c = a.height;
  for(var g = d = 0, h = g = 0, i = 0;i < b.length;i++) {
    a = b[i], d += a.height
  }
  for(i = 0;i < b.length;i++) {
    a = b[i], i != b.length - 1 ? (a.height = parseInt(a.height * c / d), g += a.height) : a.height = c - g
  }
  for(i = 0;i < b.length;i++) {
    if(a = b[i], a.width = e, h = g = 0, !a.isLeaf) {
      c = a.cols;
      for(var j = 0;j < c.length;j++) {
        d = c[j], g += d.width
      }
      for(j = 0;j < c.length;j++) {
        d = c[j], d.height = a.height, j != c.length - 1 ? (d.width = parseInt(d.width * e / g), h += d.width) : d.width = e - h
      }
    }
  }
};
f.deleteWidget = function(a, b) {
  b = this.getObjId(b);
  a.dispose();
  this.widgetMap[b] = null;
  delete this.widgetMap[b];
  baidu.removeClass(baidu.g(this.getDomId(b)), "cell-opacity")
};
f.addWidget = function(a, b) {
  var c = this.getObjId(a.id), d = new ui.pref.Widget(this.getWidgetInfo(b), a, this.ctrlId + "_" + c);
  this.widgetMap[c] = d
};
f.getWidgetInfo = function(a) {
  var b = null;
  if(this.widgets && 0 < this.widgets.length) {
    for(var c = 0;c < this.widgets.length;c++) {
      if(this.widgets[c].widgetId == a) {
        b = this.widgets[c];
        break
      }
    }
  }
  return b
};
f.onHeightChange = baidu.fn.blank;
ui.MaterialEditor = function(a) {
  this.layout = this.projectData = this.widgets = this.template = null;
  this.uploadUrl = this.bgUploadUrl = "";
  this.saveUpsRequester = null;
  ui.Control.call(this, a);
  this.type = "mateditor";
  this.view = "UIMaterialEditor";
  this._background = null;
  this._hasBottomLine = !1
};
baidu.inherits(ui.MaterialEditor, ui.InputControl);
f = ui.MaterialEditor.prototype;
f.render = function(a) {
  var b = this;
  ui.MaterialEditor.superClass.render.call(b, a || b.main);
  b._isRender ? b.c("hasBackground").bindEvent() : (b.renderBackground(b._background.background), b._isRender = !0);
  b.template && (b.layout && b.layout.dispose(), b.layout = new ui.pref.Layout(b.template, b.widgets, b.getId(), b.c("canvas").getId(), b.c("prefsContainer").getId(), b.c("highlight").getId()), b.layout.render(), b.layout.recoverWidgets(b.projectData), setTimeout(function() {
    b.resetCanvasPosition()
  }, 0))
};
f.bindEvent = function() {
  var a = this, b = a.c("btnPreview");
  ui.MaterialEditor.superClass.bindEvent.call(this);
  a._isInit || (a._initFollowHandler(), a._isInit = !0);
  b.onclick = function() {
    a.preview()
  };
  a.layout.onHeightChange = function() {
    a.resetCanvasPosition()
  };
  a.showPicPreview()
};
f._initFollowHandler = function() {
  this._followHandler = baidu.fn.bind(this.updateCanvasPosition, this);
  baidu.on(window, "resize", this._followHandler);
  baidu.on(window, "scroll", this._followHandler)
};
f.bindModel = function(a) {
  var b = this.getId("canvasOuter"), c = baidu.g(b);
  ui.MaterialEditor.superClass.bindModel.call(this, a);
  c || (c = baidu.dom.create("div", {id:b, "class":this.getClass("canvas")}), baidu.setStyles(c, {width:290}), c.innerHTML = er.template.getMerged("UIMaterialEditorCanvas"), document.body.appendChild(c), ui.util.buildControlTree(c, this));
  ui.MaterialEditor.superClass.bindModel.call(this, a);
  this._isRender || (this._background = {hasBackground:!(!this.projectData || !this.projectData.background), background:this.projectData && this.projectData.background || ""}, this._hasBottomLine = this.projectData && "true" == this.projectData.hasBottomLine, this.c("bgUploader").bindModel({bgUploadUrl:this.bgUploadUrl, autoPreview:!0, bgUploaderObj:this.projectData && this.projectData.background ? {preview_url:this.projectData.background} : null}), this.c("hasBackground").bindModel({rbList:[{value:"false", 
  text:"\u65e0\u80cc\u666f"}, {value:"true", text:"\u6709\u80cc\u666f"}], rbInitValue:this.projectData && this.projectData.background ? "true" : "false"}))
};
f.getCanvasTargetPosition = function() {
  var a = this.c("prefsContainer").getMain(), b = baidu.g(this.getId("canvasOuter")), c = baidu.dom.getPosition(a), d = c.top, e = a.offsetHeight, b = b.offsetHeight, g = baidu.page.getScrollTop() + 5, h = 0, i = "absolute";
  if(d > g || e <= b) {
    h = d + 10
  }else {
    if(h = Math.min(g, d + e - b), (!baidu.ie || 6 < baidu.ie) && h == g) {
      i = "fixed", h = 5
    }
  }
  return{position:i, top:h, left:c.left + a.offsetWidth + 15}
};
f.updateCanvasPosition = function() {
  var a = this.isShowPreview ? this.c("preview").getMain() : this.c("canvas").getMain(), b = baidu.g(this.getId("canvasOuter")), c = this.c("prefsContainer").getMain(), d = this.getCanvasTargetPosition(), a = a.offsetWidth + 22;
  if(22 == a) {
    return!1
  }
  baidu.dom.setStyles(b, {width:a, position:d.position, top:d.top, left:d.left});
  baidu.dom.setStyles(c, {"margin-right":a + 20})
};
f.resetCanvasPosition = function() {
  var a = this, b = a.isShowPreview ? a.c("preview").getMain() : a.c("canvas").getMain(), c = baidu.dom.q("canvas-refer", a.getMain(), "div")[0];
  baidu.dom.setStyle(c, "height", b.offsetHeight + 22 + 31 + 38 + 10);
  clearTimeout(a.resetCPTimer);
  !1 === a.updateCanvasPosition() && (a.resetCPTimer = setTimeout(function() {
    a.resetCanvasPosition()
  }, 100))
};
f.preview = function(a, b) {
  var c = this, d = c.c("btnPreview");
  !0 !== a && !c.layout.validate() ? b && b(null) : (c.cancelPicPreview(), d.disable(), c.saveUpsRequester("templateId=" + c.template.templateId + "&ups=" + encodeURIComponent(baidu.json.stringify(c.layout.getPrefs())), function(a) {
    "true" == a.success && c.layout.renderIframes(a.result);
    d.enable();
    b && b(a)
  }, function(a) {
    d.enable();
    b && b(a)
  }))
};
f.updateBackground = function() {
  var a = this.c("hasBottomLine"), b = this.c("bgUploader"), b = {hasBackground:"true" == this.c("hasBackground").getValue(), background:b.getValue()};
  if(b.hasBackground) {
    if("" == b.background) {
      return!1
    }
    this.renderBackground(b.background)
  }else {
    this.renderBackground("")
  }
  this._background = b;
  this._hasBottomLine = a.getChecked()
};
f.uploaderBeforeHandler = function() {
  var a = this.getLocalPath(), b = "parent." + this.getStrRef() + ".processResponse", b = this.url + (-1 == this.url.indexOf("?") ? "?" : "&") + "uploaderCallback=" + encodeURIComponent(b) + "&target=eiv&type=image&fileInfo=" + baidu.json.stringify({dimension:{width:"0", height:"0"}, maxSize:"0", fileType:["jpg", "gif", "png"]});
  document.forms[this.getId("form")].action = b;
  if("" != a && !ui.util.validate(this, ["ext,jpg,png,gif"])) {
    return this.clearNotification(), this._isValidate = !1
  }
};
f.renderBackground = function(a) {
  baidu.dom.setStyles(this.c("canvas").getMain(), {background:a ? baidu.format("url(${url}) white repeat", {url:a}) : "white"})
};
f.showPicPreview = function(a) {
  var b = this.c("canvasTitle"), c = this.c("previewTitle"), d = this.c("preview"), e = this.c("canvas"), a = a || this.template;
  c.setContent("\u793a\u4f8b");
  d.setContent(baidu.format('<img src="{0}" />', a.screenshot || RES("assets/image/landmark_preview-d24e54aa840b3e9f7c9dc764f4421959.jpg")));
  baidu.hide(b.getMain());
  baidu.show(c.getMain());
  baidu.hide(e.getMain());
  baidu.show(d.getMain());
  this.isShowPreview = !0;
  this.resetCanvasPosition()
};
f.cancelPicPreview = function() {
  var a = this.c("previewTitle"), b = this.c("preview"), c = this.c("canvas");
  baidu.show(this.c("canvasTitle").getMain());
  baidu.hide(a.getMain());
  baidu.hide(b.getMain());
  baidu.show(c.getMain());
  this.isShowPreview = !1;
  this.resetCanvasPosition()
};
f.getBackground = function() {
  return this._background && this._background.hasBackground ? this._background.background : ""
};
f.getValue = function() {
  var a = {};
  a.templateId = this.template.templateId;
  a.background = this.getBackground();
  a.hasBottomLine = this._hasBottomLine ? "true" : "false";
  a.widgets = this.layout.getPrefs();
  return a
};
f.getParamValue = function() {
  var a = this.getValue();
  return a ? encodeURIComponent(baidu.json.stringify(a)) : ""
};
f.validate = function() {
  return!this.layout.validate() ? !1 : ui.MaterialEditor.superClass.validate.call(this)
};
f.getProjectData = function() {
  this.projectData && (this.projectData.background = this.getBackground());
  this.projectData && (this.projectData.hasBottomLine = this._hasBottomLine ? "true" : "false");
  return baidu.object.clone(this.projectData)
};
f.mergeProjectData = function(a, b) {
  function c(a) {
    baidu.object.each(a, function(b, d) {
      baidu.lang.isObject(b) ? c(b) : "" === b && delete a[d]
    })
  }
  var d = baidu.object.clone(b);
  c(d);
  return baidu.object.merge(a, d, {overwrite:!0, recursive:!1})
};
f.setProjectData = function(a, b) {
  b && (a = this.mergeProjectData(this.projectData, baidu.object.clone(a)));
  if((this.projectData = baidu.object.clone(a)) && this.projectData.background) {
    this._background = {hasBackground:!0, background:this.projectData.background}, this.renderBackground(this._background.background)
  }
  this._hasBottomLine = this.projectData && "true" == this.projectData.hasBottomLine
};
f.dispose = function() {
  var a = baidu.g(this.getId("canvasOuter"));
  a && baidu.dom.remove(a);
  this._followHandler && (baidu.un(window, "resize", this._followHandler), baidu.un(window, "scroll", this._followHandler), this._followHandler = null);
  clearTimeout(this.resetCPTimer);
  ui.MaterialEditor.superClass.dispose.call(this)
};
base.AbstractWorker = function() {
  base.EventDispatcher.call(this);
  this.isDone = !1
};
baidu.inherits(base.AbstractWorker, base.EventDispatcher);
base.AbstractWorker.DoneEvent = "DONE";
base.AbstractWorker.prototype.start = function() {
  throw"Not implemented";
};
base.AbstractWorker.prototype.done = function() {
  this.isDone = !0;
  this.trigger(base.AbstractWorker.DoneEvent, this)
};
base.AbstractWorker.prototype.addDoneListener = function(a) {
  this.addListener(base.AbstractWorker.DoneEvent, a)
};
base.AbstractWorker.prototype.removeDoneListener = function(a) {
  this.removeListener(base.AbstractWorker.DoneEvent, a)
};
base.LocalWorker = function(a, b) {
  base.AbstractWorker.call(this);
  this._data = a;
  this._callback = b
};
baidu.inherits(base.LocalWorker, base.AbstractWorker);
base.LocalWorker.prototype.start = function() {
  this._callback(this._data);
  this.done()
};
base.FuncWorker = function(a, b) {
  base.AbstractWorker.call(this);
  var c = this;
  c.func = a;
  c.callback = arguments[arguments.length - 1];
  c.args = [];
  for(var d = 1;d < arguments.length - 1;d++) {
    c.args.push(arguments[d])
  }
  c.args.push(function() {
    c.callback.apply(window, arguments);
    c.done()
  })
};
base.FuncWorker.prototype = {start:function() {
  this.func.apply(window, this.args)
}};
baidu.inherits(base.FuncWorker, base.AbstractWorker);
base.TimeoutWorker = function(a, b) {
  base.AbstractWorker.call(this);
  this.ms = a;
  this.callback = b
};
baidu.inherits(base.TimeoutWorker, base.AbstractWorker);
base.TimeoutWorker.prototype.start = function() {
  var a = this;
  setTimeout(function() {
    a.callback();
    a.done()
  }, a.ms)
};
base.AbstractWorkerManager = function() {
  base.AbstractWorker.call(this);
  this.workers = []
};
baidu.inherits(base.AbstractWorkerManager, base.AbstractWorker);
base.AbstractWorkerManager.prototype.addWorker = function(a) {
  this.workers.push(a);
  a.addDoneListener(baidu.fn.bind(this._workerDone, this))
};
base.AbstractWorkerManager.prototype.removeWorker = function(a) {
  for(var b = this.workers.length - 1;0 <= b;b--) {
    if(this.workers[b] === a) {
      this.workers.splice(b, 1);
      break
    }
  }
};
base.AbstractWorkerManager.prototype._workerDone = function() {
  throw"Not implemented";
};
base.ParallelWorkerManager = function() {
  base.AbstractWorkerManager.call(this)
};
base.ParallelWorkerManager.prototype = {start:function() {
  this.counter = this.workers.length;
  if(0 === this.counter) {
    this.done()
  }else {
    for(var a = 0;a < this.workers.length;a++) {
      this.workers[a].isDone ? this._workerDone(this.workers[a]) : this.workers[a].start()
    }
  }
}, _workerDone:function() {
  this.counter--;
  0 === this.counter && this.done()
}};
baidu.inherits(base.ParallelWorkerManager, base.AbstractWorkerManager);
base.SerialWorkerManager = function() {
  base.AbstractWorkerManager.call(this)
};
base.SerialWorkerManager.prototype = {start:function() {
  if(0 === this.workers.length) {
    this.done()
  }else {
    for(var a = 0;a < this.workers.length;a++) {
      if(!this.workers[a].isDone) {
        this.workers[a].start();
        break
      }
    }
  }
}, _workerDone:function(a) {
  var b = this.workers.length, c;
  if(a === this.workers[b - 1]) {
    this.done()
  }else {
    for(c = 0;c < b - 1 && this.workers[c] !== a;c++) {
    }
    for(c += 1;c < b;c++) {
      if(this.workers[c].isDone) {
        c === b - 1 && this.done()
      }else {
        this.workers[c].start();
        break
      }
    }
  }
}};
baidu.inherits(base.SerialWorkerManager, base.AbstractWorkerManager);
jn.landmark.material = {};
jn.landmark.material.Fields = {};
jn.landmark.material.config = {action:[], url:{readTemplate:"/data/material/html/template/read", readWidget:"/data/material/html/widget/read", previewMaterial:"/data/material/html/userprefs/submit", wpUploadUrl:"/data/material/html/file/upload", readMaterial:"/data/material/landmark/detail", createMaterial:"/data/material/landmark/create", modifyMaterial:"/data/material/landmark/modify"}};
jn.landmark.material.config.action.push({location:"/jn/landmark/material/create", action:"jn.landmark.material.Edit"});
jn.landmark.material.config.action.push({location:"/jn/landmark/material/update", action:"jn.landmark.material.Edit"});
jn.landmark.material.config.action.push({location:"/jn/landmark/material/copy", action:"jn.landmark.material.Edit"});
var url$$inline_657 = jn.landmark.material.config.url;
jn.landmark.material.data = jn.util.da_generator([{name:"readTemplate", url:url$$inline_657.readTemplate}, {name:"readWidget", url:url$$inline_657.readWidget}, {name:"previewMaterial", url:url$$inline_657.previewMaterial}, {name:"readMaterial", url:url$$inline_657.readMaterial}, {name:"createMaterial", url:url$$inline_657.createMaterial}, {name:"modifyMaterial", url:url$$inline_657.modifyMaterial}]);
er.controller.addModule(jn.landmark.material);
jn.landmark.material.Edit = function() {
  er.FormAction.call(this);
  this.view = "MAIN_PAGE_jn_landmark_material_edit"
};
baidu.inherits(jn.landmark.material.Edit, er.FormAction);
er.FormAction.prototype.isCreate = function() {
  return/create$/.test(this.argMap.path)
};
er.FormAction.prototype.isCopy = function() {
  return/copy$/.test(this.argMap.path)
};
f = jn.landmark.material.Edit.prototype;
f.CONTEXT_INITER_LIST = ["initData", "initOriginModel"];
f.initData = function(a, b) {
  var c = this, d = new base.ParallelWorkerManager;
  c.isCreate = c.isCreate();
  c.isModify = c.isModify();
  c.isCopy = c.isCopy();
  c.isCreate && (c.isCreateWhenCreateAd = "createAd" == c.model.from);
  c.USE_BACK_LOCATION = !0;
  c.BACK_LOCATION = c.isCreate && c.isCreateWhenCreateAd ? "/jn/landmark/promotion/ad_list" : "/jn/landmark/promotion/material_list~adId=" + c.model.adId;
  d.addWorker(new base.FuncWorker(jn.landmark.material.data.readTemplate, "productLine=LANDMARK", function(a) {
    c.templates = a.result;
    c.curTemplate = c.templates[0];
    c.model.layoutTemplate = c.curTemplate
  }));
  (c.isModify || c.isCopy) && d.addWorker(new base.FuncWorker(jn.landmark.material.data.readMaterial, "materialId=" + c.model.materialId, function(a) {
    c.material = a.result
  }));
  d.addDoneListener(b);
  d.start()
};
f.initOriginModel = function(a, b) {
  var c = this, d = er.context.get("landmarkMaterialEnableStatusMap"), e = jn.util.urlHelper.decode(c.model.adName);
  c.model.lbMainTitle = c.isCreate ? e + " - \u65b0\u5efa\u7269\u6599" : c.isModify ? baidu.string.encodeHTML(c.material.materialName) + " - \u7f16\u8f91\u7269\u6599" : e + " - \u590d\u5236\u7269\u6599";
  c.adId = c.model.adId;
  c.adName = e;
  c.materialId = c.model.materialId;
  c.model.wpUploadUrl = jn.landmark.material.config.url.wpUploadUrl;
  c.model.saveUpsRequester = jn.landmark.material.data.previewMaterial;
  c.model.trackerData = baidu.object.clone(jn.landmark.promotion.config.createAdTrackerData);
  c.model.trackerData[1].current = !0;
  c.enableStatusMap = {enable:d.getKey("\u7acb\u5373\u542f\u7528"), timingEnable:d.getKey("\u5b9a\u65f6\u542f\u7528")};
  c.model["enableStatus.enable"] = c.enableStatusMap.enable;
  c.model["enableStatus.timingEnable"] = c.enableStatusMap.timingEnable;
  c.model.initEnableStatus = c.enableStatusMap.enable;
  c.model.startTime = c.getNextDayStart();
  if(c.isModify || c.isCopy) {
    c.model.materialName = c.material.materialName, c.model.initEnableStatus = c.material.enableStatus, c.material.startTime && (c.model.startTime = baidu.date.parseToDate(c.material.startTime)), c.model.projectData = c.material.projectData
  }
  d = new base.ParallelWorkerManager;
  d.addWorker(new base.FuncWorker(jn.landmark.material.data.readWidget, "templateId=" + c.curTemplate.templateId, function(a) {
    c.model.widgets = a.result
  }));
  d.addDoneListener(b);
  d.start()
};
f.afterInit = function() {
  this.form = this.page.c("form");
  this.returnLink = this.page.c("returnLink");
  this.btnSave = this.form.c("btnSave");
  this.btnSubmit = this.form.c("btnSubmit");
  this.btnCancel = this.form.c("lnkCancel");
  this.rbEnable = this.form.c("rbEnable");
  this.rbTimingEnable = this.form.c("rbTimingEnable");
  this.startTime = this.form.c("startTime");
  this.materialEditor = this.form.c("materialEditor");
  this.requester = this.isModify ? jn.landmark.material.data.modifyMaterial : jn.landmark.material.data.createMaterial
};
f.enterDocumentInternal = function() {
  this.isCreate && this.isCreateWhenCreateAd ? (this.returnLink.setContent("&lt;&lt;\u8fd4\u56de\u63a8\u5e7f\u8ba1\u5212\u5217\u8868"), baidu.hide(this.btnSave.getMain()), this.btnSubmit.setLabel("\u4fdd\u5b58\u5e76\u6dfb\u52a0\u5173\u952e\u8bcd")) : baidu.hide(this.page.c("tracker").getMain())
};
f.initBehaviorInternal = function() {
  var a = this;
  a.rbEnable.onclick = a.getToggleEnableHandler(a.rbEnable);
  a.rbTimingEnable.onclick = a.getToggleEnableHandler(a.rbTimingEnable);
  a.rbEnable.getChecked() ? a.getToggleEnableHandler(a.rbEnable)() : a.getToggleEnableHandler(a.rbTimingEnable)();
  a.returnLink.onclick = function() {
    a.back()
  };
  (a.isModify || a.isCopy) && a.materialEditor.preview();
  a.btnSave.onclick = a.getSubmitHandler(a.btnSave);
  a.btnSubmit.onclick = a.getSubmitHandler(a.btnSubmit);
  a.form.addListener(ui.events.BEFORE_VALIDATE, function() {
    a.startTime.setRule("min", [baidu.date.format(a.getNextHour(), "yyyy/MM/dd HH:mm"), "date"])
  })
};
f.getExtraParam = function() {
  var a = [];
  this.isCreate || this.isCopy ? a.push("adId=" + this.adId) : (a.push("materialId=" + this.materialId), a.push("objectVersion=" + this.material.objectVersion));
  a.push("templateId=" + this.curTemplate.templateId);
  a.push("action=" + this.submitType);
  return a.join("&")
};
f.enableAllButton = function() {
  baidu.array.each([this.btnSave, this.btnSubmit], function(a) {
    a.enable()
  })
};
f.disableAllButton = function() {
  baidu.array.each([this.btnSave, this.btnSubmit], function(a) {
    a.disable()
  })
};
f.onBeforeFormSubmit = function() {
  this.disableAllButton()
};
f.onSubmitSucceed = function() {
  this.enableAllButton();
  this.isCreate && this.isCreateWhenCreateAd ? er.locator.redirect(baidu.format("/jn/landmark/promotion/add_package_list~adId=${adId}&adName=${adName}", {adId:this.adId, adName:jn.util.urlHelper.encode(this.adName)})) : this.back();
  return!1
};
f.onSubmitFail = function() {
  this.enableAllButton()
};
f.getSubmitHandler = function(a) {
  var b = this;
  return function() {
    b.submitType = "btnSave" == a.id ? "save" : "submit";
    b.form.validateAndSubmit()
  }
};
f.getToggleEnableHandler = function(a) {
  var b = this;
  return function() {
    switch(a.getValue()) {
      case b.enableStatusMap.timingEnable:
        b.startTime.setReadOnly(!1);
        baidu.show("toggleBlock");
        break;
      case b.enableStatusMap.enable:
        b.startTime.setReadOnly(!0), baidu.hide("toggleBlock")
    }
  }
};
f.getNextDayStart = function() {
  var a = new Date((new Date).getTime() + 864E5);
  a.setHours(0);
  a.setMinutes(0);
  a.setSeconds(0);
  return a
};
f.getNextHour = function() {
  var a = new Date((new Date).getTime() + 36E5);
  a.setMinutes(0);
  a.setSeconds(0);
  return a
};
jn.landmark.promotion.MaterialList = function() {
  er.ListAction.call(this);
  this.view = "MAIN_PAGE_jn_landmark_promotion_material_list"
};
baidu.inherits(jn.landmark.promotion.MaterialList, er.ListAction);
f = jn.landmark.promotion.MaterialList.prototype;
f.initModel = function(a, b) {
  var c = this;
  c.model.tabConfig = [{title:"\u5173\u952e\u8bcd"}, {title:"\u7269\u6599"}];
  c.model.modAdNametext = "\u4fee\u6539";
  c.model.mCultiValue = jn.util.getTimeInterval(0, 7, "yesterday");
  c.model.materialStatusInitValue = "0";
  c.model.materialStatusList = [{text:"\u5168\u90e8\u72b6\u6001", name:"\u5168\u90e8\u72b6\u6001", value:"0"}];
  for(var d = er.context.get("materialAuditStatusList"), e = 0;e < d.length;e++) {
    c.model.materialStatusList.push({text:d[e].text, name:d[e].text, value:d[e].value})
  }
  c.model.materialDownloadList = jn.landmark.promotion.config.materialDownloadList;
  c.flashType = jn.dashboard.flash_type[1];
  c.model.chartContentTypeList = jn.dashboard.chartContentTypeList;
  c.model.chartContentType = 1;
  c.model.curveOption = {url:RES("assets/application/LineGraph_OK_v3-0bee5fcb0899fb7de9868f1e7158f55b.swf"), wmode:"transparent", width:"100%", height:"280"};
  c.model.fields = jn.landmark.promotion.config.materialList;
  c.model.enableStatusValue = 1;
  c.model.enableStatus = [];
  d = er.context.get("lmMaterialEnableStatusList");
  for(e = 0;e < d.length;e++) {
    c.model.enableStatus.push({text:d[e].text, value:d[e].value})
  }
  e = er.context.get("landmarkMaterialEnableStatusMap");
  c.enableStatusMap = {enableNow:e.getKey("\u7acb\u5373\u542f\u7528"), enableTiming:e.getKey("\u5b9a\u65f6\u542f\u7528")};
  c.model["enableStatus.enableNow"] = c.enableStatusMap.enableNow;
  c.model["enableStatus.enableTiming"] = c.enableStatusMap.enableTiming;
  e = new Date((new Date).getTime() + 864E5);
  e = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0);
  c.model.endTime = e;
  c.model.adTreeRequester = jn.landmark.promotion.data.adTree;
  e = new base.ParallelWorkerManager;
  e.addWorker(new base.FuncWorker(jn.landmark.promotion.data.adTree, "keyword=", function(a) {
    c.model.adTreeDs = a.result;
    var b = jn.util.getTreeMap(a.result);
    c.parentMap = jn.util.getTreeNodeParents(a.result);
    c.selectedItem = "undefined" != typeof c.model.adId && b[c.model.adId] ? b[c.model.adId] : a.result;
    c.model.adTreeValue = c.model.adId;
    c.model.selectedItem = c.selectedItem.text
  }));
  e.addWorker(new base.FuncWorker(jn.landmark.promotion.data.adSummary, "adId=" + c.model.adId, function(a) {
    a = a.result;
    c.model.adName = a.adName;
    c.model.adId = a.adId;
    c.model.remaining = "\u00a5" + jn.util.moneyFormat(a.contract.balance);
    c.model.spend = "\u00a5" + jn.util.moneyFormat(a.contract.spend);
    c.model.contractNO = a.contract.contractNo;
    c.objectVersion = a.objectVersion
  }));
  e.addDoneListener(function() {
    if(!c.selectedItem.level || 0 == c.selectedItem.level) {
      return er.locator.redirect("/jn/landmark/promotion/ad_list"), !1
    }
    b()
  });
  e.start()
};
f.afterInit = function(a) {
  this.list = a.c("materialList");
  this.form = a.c("formSearch");
  this.submitButton = this.form.c("searchSubmit");
  this.requesterList = jn.landmark.promotion.data.materialList;
  this.multiCalendar = a.c("theMultiCal");
  this.curveFlash = a.c("curveFlash");
  this.chartContentType = a.c("chartContentType");
  this.tree = a.c("adSideBar").c("adTree");
  this.breadcrumb = a.c("breadCrumb");
  this.selectedItemName = a.c("selectedItemName");
  this.downloadReport = a.c("downloadReport");
  this.createMaterialBtn = a.c("createMaterialBtn");
  this.tab = a.c("materialTab")
};
f.initBehaviorInternal = function() {
  function a(a, c, d) {
    if(c.level && 0 != c.level) {
      var a = b.parentMap[c.id], i = [];
      if(a && 0 < a.length) {
        for(var j = 0;j < a.length;j++) {
          i.push({text:a[j].text, url:"javascript:void(0);", click:"ui.util.get('" + b.tree.getId() + "').triggerClick(" + a[j].id + ");return false;"})
        }
      }
      b.breadcrumb.rebindModel({crumbData:i});
      b.selectedItem = c;
      b.selectedItemName.setContent(c.text);
      b.model.adId = c.id;
      !1 !== d && b.reloadMaterialList();
      b.reloadChartData();
      b.reloadAdSummary()
    }else {
      er.locator.redirect("/jn/landmark/promotion/ad_list")
    }
  }
  var b = this;
  b.tab.onchange = function(a) {
    switch(a) {
      case 0:
        er.locator.redirect("#/jn/landmark/promotion/package_list~adId=" + b.model.adId)
    }
  };
  b.reloadChartData();
  b.multiCalendar.onchange = function(a) {
    return jn.util.timeHelper.checkAndSetMcalTime(a)
  };
  b.multiCalendar.onchanged = function() {
    b.reloadChartData()
  };
  b.chartContentType.onselect = baidu.fn.bind(function(a) {
    b.flashType = jn.dashboard.flash_type[a];
    b.showCurveChart()
  }, b.chartContentType);
  jn.util.initEllipsisEvent(b.list.c("listTable"));
  var c = jn.util.dialogInit.call(this, {id:"materialListEnableDialog", title:"\u8bbe\u7f6e\u542f\u7528\u65f6\u95f4", width:350, template:"materialListDialogEnable", cmd:"enable", foot:!0, okHandler:baidu.fn.bind(this.enableDialogOKEvent, this)});
  b.dialogEnable = c;
  b.showCalendarDiv = baidu.g("show_calendar_div");
  b.enableNow = c.c("enableNow");
  b.enableTiming = c.c("enableTiming");
  b.enableNow.onclick = b.toggleEnableDiv(b.enableNow);
  b.enableTiming.onclick = b.toggleEnableDiv(b.enableTiming);
  b.list.addListener("CMD:click:enable", function(a) {
    c.show();
    b.enableNow.setChecked(!0);
    b.toggleEnableDiv(b.enableNow)();
    a = a.getAttribute("href").replace(/^[^~]+~/g, "");
    a = baidu.url.queryToJson(a);
    b.enableQuery = a;
    c.setTitle("\u8bbe\u7f6e\u542f\u7528\u65f6\u95f4 \u2014 " + baidu.string.fast_ellipse(decodeURIComponent(b.enableQuery.materialName), 200));
    return!1
  });
  b.list.addListener("CMD:click:delete", function(a) {
    a = a.getAttribute("href").replace(/^[^~]+~/g, "");
    a = baidu.url.queryToJson(a);
    b.deleteQuery = a;
    jn.util.confirmSingleHandler(baidu.json.stringify({content:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u7269\u6599 &quot;" + decodeURIComponent(b.deleteQuery.materialName) + "&quot; \u5417\uff1f", handler:"delete"}));
    return!1
  });
  b.list.addListener("CMD:click:withdraw", function(a) {
    a = a.getAttribute("href").replace(/^[^~]+~/g, "");
    a = baidu.url.queryToJson(a);
    b.withdrawQuery = a;
    ui.Dialog.confirm({title:"\u8be2\u95ee", content:"\u60a8\u786e\u5b9a\u64a4\u9500\u5bf9\u7269\u6599&quot;" + decodeURIComponent(b.withdrawQuery.materialName) + "&quot;\u7684\u64cd\u4f5c\u5417\uff1f\u64a4\u9500\u540e\u8be5\u7269\u6599\u72b6\u6001\u5c06\u88ab\u4fee\u6539\u4e3a\u201c\u5f85\u63d0\u4ea4\u201d", onok:function() {
      b.withdrawDialogOKEvent()
    }});
    return!1
  });
  b.list.addListener("CMD:click:copy", function(a) {
    a = a.getAttribute("href").replace(/^[^~]+~/g, "");
    a = baidu.url.getQueryValue(a, "materialId");
    er.locator.redirect(baidu.format("/jn/landmark/material/copy~adId=${adId}&adName=${adName}&materialId=${materialId}", {adId:b.selectedItem.id, adName:jn.util.urlHelper.encode(b.selectedItem.text), materialId:a}));
    return!1
  });
  b.list.addListener("CMD:click:update", function(a) {
    a = a.getAttribute("href").replace(/^[^~]+~/g, "");
    a = baidu.url.getQueryValue(a, "materialId");
    er.locator.redirect(baidu.format("/jn/landmark/material/update~adId=${adId}&adName=${adName}&materialId=${materialId}", {adId:b.selectedItem.id, adName:jn.util.urlHelper.encode(b.selectedItem.text), materialId:a}));
    return!1
  });
  b.list.addListener("CMD:click:preview", function(a) {
    var a = a.getAttribute("href").replace(/^[^~]+~/g, ""), a = baidu.url.queryToJson(a), c = a.materialId, d = decodeURIComponent(a.materialName), i = "";
    jn.landmark.promotion.data.getMaterialIfr("materialId=" + c, function(a) {
      "true" == a.success ? (i = a.result.previewUrl, b.showPreviewDialog(c, d, i)) : jn.util.showErrorMessage(a.message)
    });
    return!1
  });
  b.list.addListener("CMD:click:DAILY_REPORT", function(a) {
    var c = b.multiCalendar.getValue(), d = baidu.date.format(c.begin, "yyyyMMdd000000"), c = baidu.date.format(c.end, "yyyyMMdd235959"), i = [];
    i.push("adId=" + b.model.adId);
    i.push("materialId=" + a.getAttribute("data-material-id"));
    i.push("materialName=" + jn.util.urlHelper.encode(a.getAttribute("data-material-name")));
    i.push("dateStart=" + d);
    i.push("dateEnd=" + c);
    a.href = jn.entry.DAILY_REPORT_URL + "#/jn/landmark/daily/material_report~" + i.join("&");
    return!0
  });
  a(b.selectedItem.id, b.selectedItem, !1);
  b.tree.onchange = a;
  b.downloadReport.onchange = function(a) {
    var a = "1" == a ? "summary" : "round", c = [], d = b.page.c("materialList").getCurrentState(), i = b.model.searchParams;
    !i && b.form && (i = b.getFinalParam(b.form.getParams()));
    i && c.push(i);
    c.push("reportType=" + a);
    c.push("page.pageSize=");
    c.push("page.pageNo=");
    c.push("page.orderBy=" + encodeURIComponent(d.orderBy));
    c.push("page.order=" + encodeURIComponent(d.order));
    jn.util.download(jn.landmark.promotion.config.url.downloadReport + c.join("&"))
  };
  var d = jn.util.dialogInit.call(this, {id:"modAdNameDiaolog", template:"modAdNameDiaologTpl", title:"\u63a8\u5e7f\u8ba1\u5212\u540d\u79f0", width:400, foot:!0, okHandler:baidu.fn.bind(this.modAdNameOkHandler, this)});
  b.page.c("modAdNameLnk").onclick = function() {
    d.show();
    d.c("adNameInput").setValue(b.page.c("adNameLbl").text)
  };
  b.modAdNameDialog = d;
  b.createMaterialBtn.onclick = function() {
    er.locator.redirect(baidu.format("/jn/landmark/material/create~adId=${adId}&adName=${adName}&from=materialList", {adId:b.selectedItem.id, adName:jn.util.urlHelper.encode(b.selectedItem.text)}))
  }
};
f.showCurveChart = function() {
  var a = this.curveData, b = ['<?xml version="1.0" encoding="utf-8" ?>', '<rootd type="' + this.flashType + '">'];
  if(0 < a.length) {
    for(var c = 0;c < a.length;c++) {
      b.push(baidu.format('<cell time="{0}" clicks="{1}" clickratio="{2}" opens="{3}" expenditure="{4}" />', a[c].time, a[c].clicks, a[c].clickratio, a[c].opens, a[c].expenditure))
    }
  }
  b.push("</rootd>");
  this.curveFlash.invokeMethod("getXmlData", b.join(""))
};
f.reloadChartData = function() {
  var a = this, b = (new base.OneToManyParamAdapter(",", "date_range", ["dateStart", "dateEnd"])).processParam("date_range=" + this.multiCalendar.getParamValue());
  jn.landmark.promotion.data.materialLine(b + "&adId=" + a.selectedItem.id, function(b) {
    a.curveData = b.result;
    a.showCurveChart()
  })
};
f.getPreviewDialog = function() {
  var a = this;
  a._previewDialog || (a._previewDialog = jn.util.dialogInit.call(a, {id:"previewDialog", title:"\u9884\u89c8", width:308, okHandler:function() {
  }, foot:!1}), a._previewDialog.hideFoot(), a._previewDialog._onloadHandler = function() {
    var b = a._previewDialog.getId("preview_ifr"), c = baidu.g(b), d = null, d = baidu.ie ? document.frames[b].document : c.contentWindow.document, b = d.documentElement || d.body, e = d.getElementById(baidu.format("m{0}_ec_ma_ctner", a._previewDialog.materialId)), d = e ? e.offsetWidth : Math.max(b.scrollWidth, b.offsetWidth), b = e ? e.offsetHeight : Math.max(b.scrollHeight, b.offsetHeight);
    a._previewDialog.setWidth(d + 28);
    baidu.dom.setStyles(c, {width:d, height:b})
  });
  return a._previewDialog
};
f.showPreviewDialog = function(a, b, c) {
  var d = this.getPreviewDialog();
  d.materialId = a;
  d.setTitle(baidu.format('<div title="{0}" class="matlist-preview-title">\u9884\u89c8\uff1a{0}</div>', baidu.string.encodeHTML(b)));
  d.setContent(baidu.format('<div class="matlist-preview-ctner"><iframe id="${id}" name="${id}" src="${src}" border="0" frameborder="no" class="matlist-preview-ifr" onload="${onload}"></iframe></div>', {id:d.getId("preview_ifr"), src:c, onload:d.getStrCall("_onloadHandler")}));
  d.show()
};
f.batchEvent = {"delete":function(a) {
  this.requesterBatch = jn.landmark.promotion.data.deletMaterial;
  a.materialId = this.deleteQuery.materialId;
  a.materialName = this.deleteQuery.materialName;
  a.materialObjectVersion = this.deleteQuery.materialObjectVersion;
  a.annexObjectVersion = this.deleteQuery.annexObjectVersion;
  this.batchUpdate(a)
}};
f.enterDocumentInternal = function() {
  this.list.delegateEvent("click")
};
f.enableDialogOKEvent = function() {
  var a = this, b, c = a.dialogEnable.c("enableNow").getChecked() ? a.dialogEnable.c("enableNow").getValue() : a.dialogEnable.c("enableTiming").getValue(), d = a.enableQuery.materialId, e = a.enableQuery.materialObjectVersion, g = a.enableQuery.annexObjectVersion;
  if("2" == c) {
    if(b = a.dialogEnable.c("startTimeCal").getParamValue(), a.dialogEnable.c("startTimeCal").getValue() < new Date) {
      return a.dialogEnable.showError("\u542f\u7528\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u5f53\u524d\u65f6\u95f4"), !1
    }
  }else {
    b = ""
  }
  jn.landmark.promotion.data.enableMaterial("startTime=" + b + "&materialId=" + d + "&enableStatus=" + c + "&materialObjectVersion=" + e + "&annexObjectVersion=" + g, function(b) {
    "true" == b.success && (ui.Dialog.alert({title:"\u63d0\u793a", content:"\u8bbe\u7f6e\u6210\u529f"}), a.reloadMaterialList())
  })
};
f.withdrawDialogOKEvent = function() {
  var a = this;
  jn.landmark.promotion.data.withdrawMaterial("materialId=" + a.withdrawQuery.materialId + "&materialName=" + a.withdrawQuery.materialName + "&materialObjectVersion=" + a.withdrawQuery.materialObjectVersion + "&annexObjectVersion=" + a.withdrawQuery.annexObjectVersion, function(b) {
    "true" == b.success && a.reloadMaterialList()
  })
};
f.reloadMaterialList = function() {
  this.form.validateAndSubmit()
};
f.modAdNameOkHandler = function() {
  var a = this, b = "adId=" + a.selectedItem.id + "&field={0}&value={1}&objectVersion=" + a.objectVersion, c = a.modAdNameDialog.c("adNameInput").getValue(), d = encodeURIComponent(c);
  if("" == c) {
    return a.modAdNameDialog.showError("\u63a8\u5e7f\u8ba1\u5212\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a"), !1
  }
  jn.landmark.promotion.data.modAd(baidu.format(b, "adName", d), function(b) {
    "true" === b.success ? (a.page.c("adNameLbl").rebindModel({adName:a.modAdNameDialog.c("adNameInput").getValue()}), a.selectedItemName.rebindModel({selectedItem:a.page.c("adNameLbl").text}), a.reloadAdTree(a.selectedItem.id)) : jn.util.showErrorMessage(b.message)
  })
};
f.getExtraParam = function() {
  return"adId=" + this.selectedItem.id
};
f.reloadAdSummary = function() {
  var a = this;
  jn.landmark.promotion.data.adSummary("adId=" + a.selectedItem.id, function(b) {
    b = b.result;
    a.objectVersion = b.objectVersion;
    a.page.c("adNameLbl").rebindModel({adName:b.adName});
    a.page.c("adIdLbl").rebindModel({adId:b.adId});
    a.page.c("remainingLbl").rebindModel({remaining:"\u00a5" + jn.util.moneyFormat(b.contract.balance)});
    a.page.c("spendLbl").rebindModel({spend:"\u00a5" + jn.util.moneyFormat(b.contract.spend)});
    a.page.c("contractNOLbl").rebindModel({contractNO:b.contract.contractNo})
  })
};
f.toggleEnableDiv = function(a) {
  var b = this;
  return function() {
    switch(a.getValue()) {
      case b.enableStatusMap.enableNow:
        baidu.hide(b.showCalendarDiv);
        break;
      case b.enableStatusMap.enableTiming:
        baidu.show(b.showCalendarDiv)
    }
  }
};
f.reloadAdTree = function(a) {
  var b = this;
  b.tree.reloadTree(function(c) {
    b.parentMap = jn.util.getTreeNodeParents(c.result);
    b.tree.triggerClick(a, !0)
  })
};
var system = {config:{action:[{location:"/system/preference", action:"system.Preference"}, {location:"/system/adminInfo", action:"system.AdminInfo"}]}};
system.data = jn.util.da_generator([{name:"pref_read", url:"/preference/read"}, {name:"pref_update", url:"/preference/update"}]);
er.controller.addModule(system);
var agentadmin = {};
er.controller.addModule(agentadmin);
agentadmin.config = {action:[{location:"/agentadmin/accountInfo", action:"agentadmin.AccountInfo", authority:"SYSADMIN|AGENT|SYSVIEW|ADADMIN"}, {location:"/agentadmin/ownerMng", action:"agentadmin.OwnerMng", authority:"SYSADMIN"}, {location:"/agentadmin/insideUserList", action:"agentadmin.InsideUserList", authority:"SYSADMIN"}, {location:"/agentadmin/createTemplate", action:"agentadmin.CreateTemplate", authority:"SYSADMIN"}, {location:"/agentadmin/templateList", action:"agentadmin.TemplateList", 
authority:"SYSADMIN"}, {location:"/agentadmin/createInsideUser", action:"agentadmin.CreateInsideUser", authority:"SYSADMIN"}, {location:"/agentadmin/updateTemplate", action:"agentadmin.UpdateTemplate", authority:"SYSADMIN"}, {location:"/agentadmin/updateUserInfo", action:"agentadmin.UpdateUserInfo", authority:"SYSADMIN"}, {location:"/agentadmin/advertiserInfo", action:"agentadmin.AdvertiserInfo", authority:"SYSADMIN|AGENT|SYSVIEW|ADADMIN"}, {location:"/agentadmin/adminInfo", action:"agentadmin.AdminInfo", 
authority:"SYSADMIN|AGENT|SYSVIEW|ADADMIN|ADVERTISER"}, {location:"/agentadmin/rechargeList", action:"agentadmin.RechargeList", authority:"SYSADMIN|AGENT|SYSVIEW|ADADMIN"}], url:{readAdvertiserInfo:"/agentadmin/173vertiser/userInfo/read", ownerList:"/agentadmin/173vertiser/list", ownerTree:"/agentadmin/173vertiser/agencyTree/read", rechargeRecord:"/agentadmin/173vertiser/recharge/read", accountSummary:"/agentadmin/173vertiser/accountSummary/read", accountBalance:"/agentadmin/173vertiser/balance/read", 
readAgent:"/agentadmin/173vertiser/recharge/agent/read", batchUpdateStatus:"/agentadmin/userStatus/batchUpdate", sendEmail:"/agentadmin/173vertiser/welcome", insideUserList:"/agentadmin/insideUser/list", readUserInfo:"/agentadmin/insideUser/userInfo/read", createInsideUser:"/agentadmin/insideUser/create", readAdminInfo:"/agentadmin/insideUser/userInfo/read", updateUserInfo:"/agentadmin/userInfo/update", updatePassword:"/agentadmin/password/update", templateList:"/agentadmin/template/list", batchDeleteTemplate:"/agentadmin/template/delete", 
readTmpId:"/agentadmin/template/tmpId/read", createTemplate:"/agentadmin/template/create", uploadTemplateResource:"/agentadmin/template/resource/upload", uploadTmpXml:"/agentadmin/template/tmpxml/upload", uploadPreviewImageTmp:"/agentadmin/template/tmpPreviewImage/upload", readAdOwners:"/agentadmin/template/adowners/read", tplRead:"/agentadmin/template/read", modifyTemplate:"/agentadmin/template/modify", modifyPublishType:"/agentadmin/template/publishType/modify", uploadXml:"/agentadmin/template/xml/upload", 
uploadPreviewImage:"/agentadmin/template/previewImage/upload", deleteXml:"/agentadmin/template/xml/delete"}, ownerMngListFields:[{field:"agencyName", title:"\u8d26\u6237\u540d\u79f0", width:75, dragable:1, content:function(a, b) {
  return 0 == b && a.agencyName ? baidu.format(['<div class="coup-ellipsis-sizing-ctner coup-daily-sizer" style="margin-right:18px;">&nbsp;</div>', '<div style="background:url(' + RES("assets/image/agent-cadf9bd52c0173f73135f792c459e151.png") + ') no-repeat;padding-left:18px;" class="ui-table-cell-text coup-ellipsis-sizing-by-others">', '<span class="coup-ellipsis" title="{0}">{0}</span></div>'].join(""), baidu.string.encodeHTML(a.agencyName)) : baidu.format('<span title="{0}" class="coup-ellipsis">{0}</span>', baidu.string.encodeHTML(a.advertiserName))
}}, {field:"agencyState", title:"\u72b6\u6001", width:45, stable:1, dragable:1, content:function(a, b) {
  return 0 == b && a.agencyState ? baidu.format("<div>{0}</div>", er.context.get("userStatusMap")[a.agencyState]) : er.context.get("userStatusMap")[a.advertiserState]
}}, {field:"agencyCompany", title:"\u5355\u4f4d\u540d\u79f0", width:40, dragable:1, content:function(a, b) {
  return 0 == b && void 0 != a.agencyCompany ? baidu.format('<span title="{0}" class="coup-ellipsis">{0}</span>', baidu.string.encodeHTML(a.agencyCompany)) : baidu.format('<span title="{0}" class="coup-ellipsis">{0}</span>', baidu.string.encodeHTML(a.advertiserCompany))
}}, {field:"agencyContact", title:"\u8054\u7cfb\u4eba", width:40, dragable:1, content:function(a, b) {
  return 0 == b && void 0 != a.agencyContact ? baidu.string.encodeHTML(a.agencyContact) : baidu.string.encodeHTML(a.advertiserContact)
}}, {field:"agencyEmail", title:"E-mail\u5730\u5740", width:60, dragable:1, content:function(a, b) {
  return 0 == b && void 0 != a.agencyEmail ? baidu.format('<span title="{0}" class="coup-ellipsis">{0}</span>', baidu.string.encodeHTML(a.agencyEmail)) : baidu.format('<span title="{0}" class="coup-ellipsis">{0}</span>', baidu.string.encodeHTML(a.advertiserEmail))
}}, {title:"\u64cd\u4f5c", dragable:1, stable:1, width:150, field:"id", content:function(a, b) {
  var c = [];
  0 == b && a.agencyName ? c.push({title:"\u4e2a\u4eba\u8bbe\u7f6e", location:"#/agentadmin/advertiserInfo~userId=" + a.id + "&userType=agent"}) : (c.push({title:"\u4e2a\u4eba\u8bbe\u7f6e", location:"#/agentadmin/advertiserInfo~userId=" + a.id + "&userType=advertiser"}), c.push({title:"\u8d26\u6237\u4fe1\u606f", location:"#/agentadmin/accountInfo~userId=" + a.id + "&userType=advertiser&accountName=" + jn.util.urlHelper.encode(a.advertiserName)}));
  return jn.util.getListOperationHtml(c)
}}], insideUserFields:[{width:100, title:"\u7528\u6237\u540d", dragable:!0, field:"userName", content:function(a) {
  return baidu.string.encodeHTML(a.userName)
}}, {width:100, title:"\u7528\u6237\u7c7b\u578b", dragable:!0, field:"roleId", content:function(a) {
  return er.context.get("userTypeMap")[a.roleId]
}}, {width:100, title:"\u8054\u7cfb\u4eba", dragable:!0, field:"contact", content:function(a) {
  return baidu.string.encodeHTML(a.contact)
}}, {width:150, title:"\u90ae\u7bb1\u5730\u5740", dragable:!0, field:"email", content:function(a) {
  return a.email
}}, {width:50, title:"\u72b6\u6001", dragable:!0, field:"status", content:function(a) {
  return er.context.get("userStatusMap")[a.status]
}}, {title:"\u64cd\u4f5c", field:"id", sortable:!1, dragable:!1, width:100, align:"center", content:function(a) {
  var b = [];
  b.push({title:"\u4fee\u6539\u4fe1\u606f", location:"#/agentadmin/updateUserInfo~userId=" + a.userId});
  return jn.util.getListOperationHtml(b)
}}], rechargeFields:[{width:50, title:"\u52a0\u6b3e\u8bb0\u5f55ID", dragable:!0, field:"rechargeId", content:function(a) {
  return a.rechargeId
}}, {width:150, title:"\u4ea7\u54c1\u7ebf", dragable:!0, field:"productLine", content:function(a) {
  return a.productLine
}}, {width:100, title:"\u4ee3\u7406\u5546", dragable:!0, field:"agency", content:function(a) {
  return baidu.string.encodeHTML(a.agency)
}}, {width:100, title:"\u8ba2\u5355\u884cID", dragable:!0, field:"contractLineId", content:function(a) {
  return a.contractLineId
}}, {width:100, title:"\u52a0\u6b3e\u91d1\u989d", dragable:!0, field:"ammount", content:function(a) {
  return jn.util.moneyFormat(a.ammount)
}}, {width:100, title:"\u52a0\u6b3e\u65f6\u95f4", dragable:!0, field:"rechargeTime", content:function(a) {
  return jn.util.dateFormat(a.rechargeTime)
}}], accountBalanceFields:[{width:150, title:"\u8ba2\u5355\u884cID", dragable:!0, field:"contractLineId", content:function(a) {
  return a.contractLineId
}}, {width:100, title:"r\u503c", dragable:!0, field:"r", content:function(a) {
  return a.r
}}, {width:100, title:"\u73b0\u91d1", dragable:!0, field:"cash", content:function(a) {
  return jn.util.moneyFormat(a.cash)
}}, {width:100, title:"\u4f18\u60e0", dragable:!0, field:"Privilege", content:function(a) {
  return jn.util.moneyFormat(a.Privilege)
}}], templateListFields:[{width:50, title:"\u6a21\u677f\u540d\u79f0", dragable:!0, field:"templateName", content:function(a) {
  return baidu.string.encodeHTML(a.templateName)
}}, {width:150, title:"\u53d1\u5e03\u72b6\u51b5", dragable:!0, field:'issueState"', content:function(a) {
  return er.context.get("templatePublishTypeMap")[a.issueState]
}}, {width:100, title:"\u6700\u540e\u7f16\u8f91\u65f6\u95f4", dragable:!0, sortable:!0, field:"lastEditTime", content:function(a) {
  return baidu.date.format(baidu.date.parseToDate(a.lastEditTime), "yyyy-MM-dd HH:mm:ss")
}}, {title:"\u64cd\u4f5c", field:"id", sortable:!1, dragable:!1, width:150, stable:1, align:"center", content:function(a) {
  var b = [];
  b.push({title:"\u7f16\u8f91\u4fe1\u606f", location:"#/agentadmin/updateTemplate~id=" + a.id});
  a = jn.util.stringify({content:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8be5\u6a21\u677f\u5417\uff1f", handler:"delete", ids:a.id});
  b.push({title:"\u5220\u9664", location:"javascript:void(0);", onclick:"jn.util.confirmSingleHandler('" + a + "');"});
  return jn.util.getListOperationHtml(b)
}}]};
var url$$inline_665 = agentadmin.config.url;
agentadmin.data = jn.util.da_generator([{name:"accountInfo", url:url$$inline_665.accountInfo}, {name:"ownerList", url:url$$inline_665.ownerList}, {name:"ownerTree", url:url$$inline_665.ownerTree}, {name:"accountSummary", url:url$$inline_665.accountSummary}, {name:"readAgent", url:url$$inline_665.readAgent}, {name:"insideUserList", url:url$$inline_665.insideUserList}, {name:"batchDelete", url:url$$inline_665.batchDelete}, {name:"read", url:url$$inline_665.read}, {name:"templateList", url:url$$inline_665.templateList}, 
{name:"batchDeleteTemplate", url:url$$inline_665.batchDeleteTemplate}, {name:"createTemplate", url:url$$inline_665.createTemplate}, {name:"readTmpId", url:url$$inline_665.readTmpId}, {name:"deleteXml", url:url$$inline_665.deleteXml}, {name:"uploadXml", url:url$$inline_665.uploadXml}, {name:"tplRead", url:url$$inline_665.tplRead}, {name:"modifyTemplate", url:url$$inline_665.modifyTemplate}, {name:"modifyPublishType", url:url$$inline_665.modifyPublishType}, {name:"createInsideUser", url:url$$inline_665.createInsideUser}, 
{name:"readUserInfo", url:url$$inline_665.readUserInfo}, {name:"readAdvertiserInfo", url:url$$inline_665.readAdvertiserInfo}, {name:"accountBalance", url:url$$inline_665.accountBalance}, {name:"rechargeRecord", url:url$$inline_665.rechargeRecord}, {name:"readAdminInfo", url:url$$inline_665.readAdminInfo}, {name:"updateUserInfo", url:url$$inline_665.updateUserInfo}, {name:"updatePassword", url:url$$inline_665.updatePassword}, {name:"batchUpdateStatus", url:url$$inline_665.batchUpdateStatus}, {name:"sendEmail", 
url:url$$inline_665.sendEmail}, {name:"readAdOwners", url:url$$inline_665.readAdOwners}]);
ui.ModFrame = function(a) {
  ui.Control.call(this, a);
  this.type = "modFrame"
};
ui.ModFrame.prototype = {_title_tpl:'<div class="{0}" id="{1}"><span ui="type:Label;id:txt;skin:display;maxWidth:@labelMaxWidth" class="no-break"></span><a ui="type:Link;id:mod;skin:change"{4}>\u4fee\u6539</a><span class="cred">{3}</span><span class="hint validate-info">{2}</span></div>', _btn_top:'<div class="{0}"><div ui="type:Button;id:save" class="float-left">\u4fdd\u5b58</div><a class="float-left" ui="type:Link;id:cancel">\u53d6\u6d88</a></div>', _getTitleHtml:function() {
  return baidu.format(this._title_tpl, this.getClass("title"), this.getId("title"), this.hint || "", this.tip || "", "1" == this.hideLink || !0 == this.hideLink ? ' class="hide"' : "")
}, _getBtnHtml:function() {
  return baidu.format(this._btn_top, this.getClass("toolbar"))
}, getEditBtn:function() {
  return this.c("mod")
}, getTipDom:function() {
  return baidu.dom.next(this.c("mod").main)
}, getHintDom:function() {
  return baidu.dom.last(this.c("mod").main.parentNode)
}, bindModel:function(a) {
  ui.ModFrame.superClass.bindModel.call(this, a);
  this.labelMaxWidth = 0 < parseInt(this.width, 10) ? parseInt(this.width, 10) - 100 : 0
}, render:function(a) {
  a = a || this.main;
  this.isRender || (ui.ModFrame.superClass.render.call(this, a), this.width && (a.style.width = this.width + "px"), this.height && (a.style.height = this.height + "px"), this.isRender = !0, a = baidu.dom.last(this.main), a.id = this.getId("panel"), baidu.dom.insertHTML(this.main, "afterBegin", this._getTitleHtml()), baidu.dom.insertHTML(a, "beforeEnd", this._getBtnHtml()), this.isFloat && this.setFloatStyle(this.getId("title"), a.id), ui.util.buildControlTree(baidu.dom.first(this.main), this), ui.util.buildControlTree(baidu.dom.last(a), 
  this), this.c("txt").rebindModel({labelMaxWidth:this.labelMaxWidth}), this.c("txt").setContent(this.editText))
}, setFloatStyle:function(a, b) {
  var c = baidu.dom.getPosition(a);
  baidu.dom.setStyles(b, {position:"absolute", left:c.left + "px", top:c.top + "px"})
}, bindEvent:function() {
  this.c("mod").onclick = this.doModHandle();
  this.c("save").onclick = this.doSaveHandle();
  this.c("cancel").onclick = this.doCancelHandle();
  ui.ModFrame.superClass.bindEvent.call(this)
}, doModHandle:function() {
  var a = this;
  return function() {
    a.hideError();
    if(a.onmod) {
      a.onmod(function() {
        a.togglePanel(!0)
      })
    }else {
      a.togglePanel(!0)
    }
  }
}, doSaveHandle:function() {
  var a = this;
  return function() {
    if(a.onsave) {
      a.onsave(function(b) {
        a.c("txt").setContent(b);
        a.editText = b;
        a.togglePanel(!1)
      })
    }else {
      a.togglePanel(!1)
    }
  }
}, setEditTxt:function(a) {
  this.c("txt").setContent(a);
  this.editText = a
}, doCancelHandle:function() {
  var a = this;
  return function() {
    if(a.oncancel) {
      a.oncancel(function() {
        a.togglePanel(!1)
      })
    }else {
      a.togglePanel(!1)
    }
  }
}, cancelModule:function() {
  this.doCancelHandle()()
}, togglePanel:function(a) {
  var b;
  b = baidu.g(this.getId("panel"));
  var c = baidu.g(this.getId("title"));
  b = a ? [b, c] : [c, b];
  this.isFloat && a ? (baidu.dom.removeClass(b[0], "hide"), baidu.dom.removeClass(b[1], "hide")) : (baidu.dom.removeClass(b[0], "hide"), baidu.dom.addClass(b[1], "hide"))
}, validate:function() {
  return ui.util.validate(this)
}, showError:function(a) {
  var b = baidu.g(this.getId()), c = baidu.q("gr-mod-name-cnt", b, "div")[0];
  if("mod-validate" != baidu.dom.next(c).className) {
    var d = document.createElement("div");
    baidu.addClass(d, "mod-validate");
    d.innerHTML = baidu.format('<div id="{1}" class="mod-validate-text">{0}</div>', a, b.id + "_validatetext");
    baidu.dom.insertAfter(d, c)
  }else {
    baidu.g(b.id + "_validatetext").innerHTML = a
  }
}, hideError:function() {
  var a = baidu.g(this.getId()), a = baidu.q("gr-mod-name-cnt", a, "div")[0], a = baidu.dom.next(a);
  "mod-validate" == a.className && baidu.dom.remove(a)
}, dispose:function() {
  this.c("mod").onclick = null;
  this.c("save").onclick = null;
  this.c("cancel").onclick = null;
  ui.ModFrame.superClass.dispose.call(this)
}};
baidu.inherits(ui.ModFrame, ui.Control);
var owneradmin = {};
er.controller.addModule(owneradmin);
owneradmin.config = {action:[{location:"/owneradmin/account", action:"owneradmin.Account", authority:"ADVERTISER|SYSVIEW"}, {location:"/owneradmin/operatelog", action:"owneradmin.Operatelog", authority:"ADVERTISER|SYSVIEW"}, {location:"/owneradmin/personInfo", action:"owneradmin.PersonInfo", authority:"ADVERTISER|SYSVIEW|AGENT"}], url:{readUserInfo:"/owneradmin/userInfo/read", readAgentInfo:"/owneradmin/agentInfo/read", accountSummary:"/owneradmin/accountSummary/read", readRecharge:"/owneradmin/recharge/read", 
readOperateLog:"/owneradmin/log/list", readLogObject:"/owneradmin/log/objects/read", downLoadOperateLog:"/owneradmin/log/download?", readSeedWords:"/owneradmin/log/seedWords/read"}, accountListFields:[{width:50, title:"\u52a0\u6b3e\u8bb0\u5f55ID", dragable:!0, field:"rechargeId", sortable:1, content:function(a) {
  return a.rechargeId
}}, {width:150, title:"\u4ea7\u54c1\u7ebf", dragable:!0, field:"productLine", content:function(a) {
  return baidu.string.encodeHTML(a.productLine)
}}, {width:100, title:"\u4ee3\u7406\u5546", dragable:!0, field:"agency", content:function(a) {
  return baidu.string.encodeHTML(a.agency)
}}, {width:100, title:"\u5408\u540c\u53f7", dragable:!0, field:"contractNO", content:function(a) {
  return a.contractNO
}}, {width:100, title:"\u52a0\u6b3e\u91d1\u989d", dragable:!0, field:"ammount", content:function(a) {
  return jn.util.moneyFormat(a.ammount)
}}, {width:100, title:"\u52a0\u6b3e\u65f6\u95f4", dragable:!0, field:"rechargeTime", content:function(a) {
  return jn.util.dateFormat(a.rechargeTime)
}}], operatelogListFields:[{width:50, title:"\u64cd\u4f5c\u65f6\u95f4", dragable:!0, field:"time", content:function(a) {
  return jn.util.dateFormat(a.time)
}}, {width:30, title:function() {
  return"\u64cd\u4f5c\u4eba" + jn.util.support.tip("k185_op_er")
}, dragable:!0, field:"operator", content:function(a) {
  return baidu.string.encodeHTML(a.operator)
}}, {width:10, title:function() {
  return"\u64cd\u4f5c\u5c42\u7ea7" + jn.util.support.tip("k190_op_type")
}, dragable:!0, field:"level", content:function(a) {
  return er.context.get("operateLevelMap")[a.level]
}}, {width:40, title:function() {
  return"\u64cd\u4f5c\u5bf9\u8c61" + jn.util.support.tip("k195_op_object")
}, dragable:!0, field:"object", content:function(a) {
  return baidu.string.encodeHTML(a.object)
}}, {width:50, title:function() {
  return"\u64cd\u4f5c\u5185\u5bb9" + jn.util.support.tip("k200_op_content")
}, dragable:!0, field:"operationType", content:function(a) {
  return baidu.string.encodeHTML(a.operationType)
}}, {width:130, title:"\u4fee\u6539\u524d", dragable:!0, field:"valueBeforeOperation", content:function(a) {
  return a.level == er.context.get("operateLevelMap").getKey("\u76ee\u6807\u4eba\u7fa4") ? baidu.format('<span content="{0}" class="coup-ellipsis">{1}</span><a href="javascript:void(0);" onclick="er.controller.currentAction.showPeopleInfo(\'{0}\', {2}, \'before\');" class="{3}" style="margin-left:10px;">\u67e5\u770b\u79cd\u5b50\u8bcd</a>', baidu.string.encodeHTML(baidu.string.encodeHTML(a.valueBeforeOperation).replace(/\r*\n/g, "&nbsp;")), baidu.string.encodeHTML(a.valueBeforeOperation).replace(/\r*\n/g, 
  "<br/>"), a.logId, "" == baidu.string.trim(a.valueBeforeOperation) ? "hide" : "") : baidu.format('<span onmouseover="ui.Tip.show(this, {title:\'\u8be6\u60c5\',content:\'{0}\',arrow:1});" onmouseout="ui.Tip.hide();" content="{1}" class="coup-ellipsis">{2}</span>', baidu.string.encodeHTML(baidu.string.encodeHTML(a.valueBeforeOperation).replace(/\r*\n/g, "<br/>")), baidu.string.encodeHTML(a.valueBeforeOperation).replace(/\r*\n/g, "&nbsp;"), baidu.string.encodeHTML(a.valueBeforeOperation))
}}, {width:130, title:"\u4fee\u6539\u540e", dragable:!0, field:"valueAfterOperation", content:function(a) {
  return a.level == er.context.get("operateLevelMap").getKey("\u76ee\u6807\u4eba\u7fa4") ? baidu.format('<span content="{0}" class="coup-ellipsis">{1}</span><a href="javascript:void(0);" onclick="er.controller.currentAction.showPeopleInfo(\'{0}\', {2}, \'after\');" style="margin-left:10px;">\u67e5\u770b\u79cd\u5b50\u8bcd</a>', baidu.string.encodeHTML(baidu.string.encodeHTML(a.valueAfterOperation).replace(/\r*\n/g, "&nbsp;")), baidu.string.encodeHTML(a.valueAfterOperation).replace(/\r*\n/g, "<br/>"), 
  a.logId) : baidu.format('<span onmouseover="ui.Tip.show(this, {title:\'\u8be6\u60c5\',content:\'{0}\',arrow:1});" onmouseout="ui.Tip.hide();" content="{1}" class="coup-ellipsis">{2}</span>', baidu.string.encodeHTML(baidu.string.encodeHTML(a.valueAfterOperation).replace(/\r*\n/g, "<br/>")), baidu.string.encodeHTML(a.valueAfterOperation).replace(/\r*\n/g, "&nbsp;"), baidu.string.encodeHTML(a.valueAfterOperation))
}}]};
var url$$inline_668 = owneradmin.config.url;
owneradmin.data = jn.util.da_generator([{name:"readUserInfo", url:url$$inline_668.readUserInfo}, {name:"readAgentInfo", url:url$$inline_668.readAgentInfo}, {name:"updateAdvertiserInfo", url:url$$inline_668.updateAdvertiserInfo}, {name:"accountSummary", url:url$$inline_668.accountSummary}, {name:"readRecharge", url:url$$inline_668.readRecharge}, {name:"accountSummary", url:url$$inline_668.accountSummary}, {name:"readOperateLog", url:url$$inline_668.readOperateLog}, {name:"readLogObject", url:url$$inline_668.readLogObject}, 
{name:"downLoadOperateLog", url:url$$inline_668.downLoadOperateLog}, {name:"readSeedWords", url:url$$inline_668.readSeedWords}]);
owneradmin.PersonInfo = function() {
  er.FormAction.call(this)
};
owneradmin.PersonInfo.prototype = {view:"owneradminPersonInfo", initModel:function(a, b) {
  var c = this;
  c.roleName = er.context.get("visitor").roleName;
  c.hasAdOwner = er.context.get("adOwner");
  c.model.toHideLink = "ADVERTISER" == c.roleName || "AGENT" == c.roleName && !c.hasAdOwner ? !1 : !0;
  !er.context.get("adOwner") && "AGENT" == c.roleName ? owneradmin.data.readAgentInfo("", function(a) {
    a = a.result;
    c.model.modFrUserName = a.userName;
    c.model.modFrContact = a.contact;
    c.model.company = a.company;
    c.model.modFrEmail = a.email;
    b()
  }) : owneradmin.data.readUserInfo("", function(a) {
    a = a.result;
    c.model.modFrUserName = a.userName;
    c.model.accountName = a.accountName;
    c.model.modFrContact = a.contact;
    c.model.company = a.company;
    c.model.modFrEmail = a.email;
    c.model.accountManager = a.accountManager;
    c.model.accountManagerEmail = a.accountManagerEmail;
    c.model.salesAssistant1 = a.salesAssistant1;
    c.model.salesAssistant1Email = a.salesAssistant1Email;
    c.model.modFrSalesAssistant2 = "" == a.salesAssistant2 ? "--" : a.salesAssistant2;
    c.model.modFrSalesAssistant2Email = "" == a.salesAssistant2Email ? "--" : a.salesAssistant2Email;
    c.model.modFrSalesAssistant3 = "" == a.salesAssistant3 ? "--" : a.salesAssistant3;
    c.model.modFrSalesAssistant3Email = "" == a.salesAssistant3Email ? "--" : a.salesAssistant3Email;
    b()
  })
}, enterDocumentInternal:function() {
  "ADVERTISER" == this.roleName ? (baidu.g("show-password").style.display = "block", baidu.g("ader-only").style.display = "block") : !this.hasAdOwner && "AGENT" == this.roleName ? (baidu.g("accountNameDiv").style.display = "none", baidu.g("ader-only").style.display = "none") : baidu.g("show-password").style.display = "none"
}, initBehaviorInternal:function() {
  var a = this.page.c("form");
  a.c("modFrUserName").onmod = this.modNameHandler();
  a.c("modFrUserName").onsave = this.saveHandler("userName");
  a.c("modFrPwd").onmod = this.modNameHandler();
  a.c("modFrPwd").onsave = this.saveHandler("newPasswd");
  a.c("modFrContact").onmod = this.modNameHandler();
  a.c("modFrContact").onsave = this.saveHandler("contact");
  a.c("modFrEmail").onmod = this.modNameHandler();
  a.c("modFrEmail").onsave = this.saveHandler("email");
  a.c("modFrSalesAssistant2").onmod = this.modNameHandler();
  a.c("modFrSalesAssistant2").onsave = this.saveHandler("salesAssistant2");
  a.c("modFrSalesAssistant2Email").onmod = this.modNameHandler();
  a.c("modFrSalesAssistant2Email").onsave = this.saveHandler("salesAssistant2Email");
  a.c("modFrSalesAssistant3").onmod = this.modNameHandler();
  a.c("modFrSalesAssistant3").onsave = this.saveHandler("salesAssistant3");
  a.c("modFrSalesAssistant3Email").onmod = this.modNameHandler();
  a.c("modFrSalesAssistant3Email").onsave = this.saveHandler("salesAssistant3Email")
}, modNameHandler:function() {
  var a = this;
  return function(b) {
    a.modManager.add(this);
    switch(this.id) {
      case "modFrUserName":
        this.c("userName").setValue(this.editText);
        break;
      case "modFrPwd":
        this.c("newPasswd").setValue("");
        this.c("oldPasswd").setValue("");
        this.c("password2").setValue("");
        break;
      case "modFrContact":
        this.c("contact").setValue(this.editText);
        break;
      case "modFrEmail":
        this.c("email").setValue(this.editText);
        break;
      case "modFrSalesAssistant2":
        "" == this.editText || "--" == this.editText ? this.c("salesAssistant2").setValue("") : this.c("salesAssistant2").setValue(this.editText);
        break;
      case "modFrSalesAssistant3":
        "" == this.editText || "--" == this.editText ? this.c("salesAssistant3").setValue("") : this.c("salesAssistant3").setValue(this.editText);
        break;
      case "modFrSalesAssistant2Email":
        "" == this.editText || "--" == this.editText ? this.c("salesAssistant2Email").setValue("") : this.c("salesAssistant2Email").setValue(this.editText);
        break;
      case "modFrSalesAssistant3Email":
        "" == this.editText || "--" == this.editText ? this.c("salesAssistant3Email").setValue("") : this.c("salesAssistant3Email").setValue(this.editText)
    }
    b()
  }
}, saveHandler:function(a) {
  var b = "userId=" + er.context.get("visitor").id + "&{0}={1}", c = "userId=" + er.context.get("visitor").id + "&oldPasswd={0}&newPasswd={1}";
  switch(a) {
    case "userName":
      return function(a) {
        var c = this.c("userName").getValue(), g = encodeURIComponent(c);
        this.validate() && agentadmin.data.updateUserInfo(baidu.format(b, "userName", g), function(b) {
          "true" === b.success ? a(baidu.string.encodeHTML(c)) : jn.util.showErrorMessage(b.message)
        })
      };
    case "newPasswd":
      return function(a) {
        var b = this.c("oldPasswd").getValue(), g = this.c("newPasswd").getValue(), h = this.c("password2").getValue(), i = encodeURIComponent(b), j = encodeURIComponent(g);
        if(!jn.util.validateModifyPwd(this, b, g, h, !0)) {
          return!1
        }
        agentadmin.data.updatePassword(baidu.format(c, i, j), function(b) {
          if("true" === b.success) {
            a("");
            var b = baidu.g("pwdDiv"), c = baidu.dom.create("span", {style:"color:green;position:relative;right:300px;top:5px;", id:"pwdSucMsg"});
            c.innerHTML = "\u5bc6\u7801\u4fee\u6539\u6210\u529f!";
            baidu.dom.insertAfter(c, b);
            setTimeout("baidu.dom.remove('pwdSucMsg')", 5E3)
          }else {
            jn.util.showErrorMessage(b.message)
          }
        })
      };
    case "accountName":
      return function(a) {
        var c = this.c("accountName").getValue();
        agentadmin.data.updateUserInfo(baidu.format(b, "accountName", c), function(b) {
          "true" === b.success ? a(c) : jn.util.showErrorMessage(b.message)
        })
      };
    case "contact":
      return function(a) {
        var c = this.c("contact").getValue();
        agentadmin.data.updateUserInfo(baidu.format(b, "contact", c), function(b) {
          "true" === b.success ? a(c) : jn.util.showErrorMessage(b.message)
        })
      };
    case "email":
      return function(a) {
        var c = this.c("email").getValue();
        this.validate() && agentadmin.data.updateUserInfo(baidu.format(b, "email", c), function(b) {
          "true" === b.success ? a(c) : jn.util.showErrorMessage(b.message)
        })
      };
    case "salesAssistant2":
      return function(a) {
        var c = this.c("salesAssistant2").getValue();
        agentadmin.data.updateUserInfo(baidu.format(b, "salesAssistant2", "" == c ? "" : encodeURIComponent(c)), function(b) {
          "true" === b.success ? a(c || "--") : jn.util.showErrorMessage(b.message)
        })
      };
    case "salesAssistant2Email":
      return function(a) {
        var c = this.c("salesAssistant2Email").getValue(), g = "" == c ? "" : encodeURIComponent(c);
        ("" == c || this.validate()) && agentadmin.data.updateUserInfo(baidu.format(b, "salesAssistant2Email", g), function(b) {
          "true" === b.success ? a(c || "--") : jn.util.showErrorMessage(b.message)
        })
      };
    case "salesAssistant3":
      return function(a) {
        var c = this.c("salesAssistant3").getValue();
        agentadmin.data.updateUserInfo(baidu.format(b, "salesAssistant3", "" == c ? "" : encodeURIComponent(c)), function(b) {
          "true" === b.success ? a(c || "--") : jn.util.showErrorMessage(b.message)
        })
      };
    case "salesAssistant3Email":
      return function(a) {
        var c = this.c("salesAssistant3Email").getValue(), g = "" == c ? "" : encodeURIComponent(c);
        ("" == c || this.validate()) && agentadmin.data.updateUserInfo(baidu.format(b, "salesAssistant3Email", g), function(b) {
          "true" === b.success ? a(c || "--") : jn.util.showErrorMessage(b.message)
        })
      }
  }
}, modManager:{add:function(a) {
  this.currModule && "modFrame" == this.currModule.type && this.currModule.cancelModule();
  this.currModule = a
}, currModule:null}};
baidu.inherits(owneradmin.PersonInfo, er.FormAction);
agentadmin.AdminInfo = function() {
  er.FormAction.call(this)
};
agentadmin.AdminInfo.prototype = {view:"adminInfo", BACK_LOCATION:"/agentadmin/ownerMng", initModel:function(a, b) {
  var c = this;
  agentadmin.data.readAdminInfo("userId=" + er.context.get("visitor").id, function(a) {
    a = a.result;
    c.model.titleText = baidu.string.encodeHTML(a.userName);
    c.model.modFrUserName = baidu.string.encodeHTML(a.userName);
    c.model.modFrContact = baidu.string.encodeHTML(a.contact);
    c.model.roleId = er.context.get("userTypeMap")[a.roleId];
    c.model.modFrPwd = "";
    c.model.modFrEmail = baidu.string.encodeHTML(a.email);
    b()
  })
}, afterInit:function(a) {
  this.form = a.c("form");
  this.requester = agentadmin.data.readAdminInfo
}, initBehaviorInternal:function() {
  var a = this.page.c("form");
  a.c("modFrUserName").onmod = this.modHandler();
  a.c("modFrUserName").onsave = this.saveHandler("userName");
  a.c("modFrContact").onmod = this.modHandler();
  a.c("modFrContact").onsave = this.saveHandler("contact");
  a.c("modFrEmail").onmod = this.modHandler();
  a.c("modFrEmail").onsave = this.saveHandler("email");
  a.c("modFrPwd").onmod = this.modHandler();
  a.c("modFrPwd").onsave = this.saveHandler("newPasswd")
}, modHandler:function() {
  var a = this;
  return function(b) {
    a.modManager.add(this);
    switch(this.id) {
      case "modFrUserName":
        this.c("userName").setValue(this.editText);
        break;
      case "modFrContact":
        this.c("contact").setValue(this.editText);
        break;
      case "modFrEmail":
        this.c("email").setValue(this.editText);
        break;
      case "modFrPwd":
        this.c("newPasswd").setValue(""), this.c("oldPasswd").setValue(""), this.c("password2").setValue("")
    }
    b()
  }
}, saveHandler:function(a) {
  var b = "userId=" + er.context.get("visitor").id + "&{0}={1}", c = "userId=" + er.context.get("visitor").id + "&oldPasswd={0}&newPasswd={1}";
  switch(a) {
    case "userName":
      return function(a) {
        var c = this.c("userName").getValue();
        this.validate() && agentadmin.data.updateUserInfo(baidu.format(b, "userName", c), function(b) {
          "true" === b.success ? a(baidu.string.encodeHTML(c)) : jn.util.showErrorMessage(b.message)
        })
      };
    case "contact":
      return function(a) {
        var c = this.c("contact").getValue();
        agentadmin.data.updateUserInfo(baidu.format(b, "contact", c), function(b) {
          "true" === b.success ? a(baidu.string.encodeHTML(c)) : jn.util.showErrorMessage(b.message)
        })
      };
    case "email":
      return function(a) {
        var c = this, g = this.c("email").getValue();
        c.validate() && agentadmin.data.updateUserInfo(baidu.format(b, "email", g), function(b) {
          "true" === b.success ? a(baidu.string.encodeHTML(g)) : c.showError("\u4fee\u6539email\u5931\u8d25")
        })
      };
    case "newPasswd":
      return function(a) {
        var b = this.c("oldPasswd").getValue(), g = this.c("newPasswd").getValue(), h = this.c("password2").getValue();
        jn.util.validateModifyPwd(this, b, g, h, !0) && agentadmin.data.updatePassword(baidu.format(c, encodeURIComponent(b), encodeURIComponent(g)), function(b) {
          if("true" === b.success) {
            a();
            var b = baidu.g("pwdDiv"), c = baidu.dom.create("span", {style:"color:green;relative;position:relative;right:300px;top:5px;", id:"pwdSucMsg"});
            c.innerHTML = "\u5bc6\u7801\u4fee\u6539\u6210\u529f!";
            baidu.dom.insertAfter(c, b);
            setTimeout("baidu.dom.remove('pwdSucMsg')", 5E3)
          }else {
            jn.util.showErrorMessage(b.message)
          }
        })
      }
  }
}, modManager:{add:function(a) {
  this.currModule && "modFrame" == this.currModule.type && this.currModule.cancelModule();
  this.currModule = a
}, currModule:null}};
baidu.inherits(agentadmin.AdminInfo, er.FormAction);
system.AdminInfo = function() {
  er.FormAction.call(this)
};
baidu.inherits(system.AdminInfo, er.FormAction);
system.AdminInfo.prototype.enter = function(a) {
  var b = null, c = er.context.get("visitor");
  if(er.context.get("adOwner")) {
    b = new owneradmin.PersonInfo
  }else {
    if("SYSADMIN" == c.roleName || "SYSVIEW" == c.roleName || "ADADMIN" == c.roleName) {
      b = new agentadmin.AdminInfo
    }else {
      if("AGENT" == c.roleName || "ADVERTISER" == c.roleName) {
        b = new owneradmin.PersonInfo
      }
    }
  }
  b.enter(a);
  return b
};
owneradmin.Account = function() {
  jn.ListAction.call(this)
};
owneradmin.Account.prototype = {view:"owneradminAccount", initModel:function(a, b) {
  var c = this, d = c.getProductLine();
  c.model.fields = owneradmin.config.accountListFields;
  owneradmin.data.accountSummary("productLine=" + d, function(a) {
    c.model.buget = "\u00a5" + jn.util.moneyFormat(a.result.totalBudget);
    c.model.remaining = "\u00a5" + jn.util.moneyFormat(a.result.remaining);
    b()
  })
}, getProductLine:function() {
  var a;
  this.path = this.argMap.path;
  "/owneradmin/account" == this.path ? a = "gold" : "/landmark/owneradmin/account" == this.path ? a = "landmark" : "/jn/tieba/account_info" == this.path && (a = "tieba");
  return a
}, getExtraParam:function() {
  return"productLine=" + this.getProductLine()
}, afterInit:function(a) {
  this.list = a.c("list");
  this.form = a.c("form");
  this.requesterList = owneradmin.data.readRecharge
}};
baidu.inherits(owneradmin.Account, jn.ListAction);
jn.landmark.Fields = {};
jn.landmark.config = {action:[{location:"/owneradmin/personInfo", action:"owneradmin.PersonInfo"}, {location:"/landmark/owneradmin/account", action:"owneradmin.Account"}], url:{}, Title:"\u767e\u5ea6\u63a8\u5e7f|\u54c1\u724c\u5e7f\u544a", defaultIndex:"/jn/landmark/promotion/ad_list", navigator:[{name:"\u63a8\u5e7f\u7ba1\u7406", location:"/jn/landmark/promotion/ad_list", auth:"ADVERTISER", sub:"/jn/landmark/promotion/ad_list /jn/landmark/promotion/create_ad /jn/landmark/material/create /jn/landmark/material/update /jn/landmark/material/copy /jn/landmark/promotion/add_package_list /jn/landmark/promotion/package_list /jn/landmark/promotion/material_list".split(" ")}, 
{name:"\u7cfb\u7edf\u7ba1\u7406", location:"/system/adminInfo", auth:"ADVERTISER", sub:["/owneradmin/personInfo", "/landmark/owneradmin/account", "/system/adminInfo"], position:340, items:[{name:"\u4e2a\u4eba\u8bbe\u7f6e", location:"/system/adminInfo"}, {name:"\u8d26\u6237\u4fe1\u606f", location:"/landmark/owneradmin/account"}]}], blockList:[]};
jn.landmark.data = jn.util.da_generator([]);
er.controller.addModule(jn.landmark);
var datasource$$inline_673 = [], current$$inline_674 = "";
jn.ui.platformSelector = {render:function(a, b) {
  function c() {
    var a = baidu.q("plat-result", "platMain")[0], b = baidu.q("plat-first", e)[0];
    baidu.dom.toggleClass(b, "plat-on");
    baidu.dom.toggleClass(a, "plat-on")
  }
  datasource$$inline_673 = a;
  current$$inline_674 = b;
  var d = baidu.g("Plat"), e = baidu.dom.create("div", {"class":"plat-subs"});
  d.innerHTML = baidu.format('<div id="platMain" class="plat-main"><div class="plat-result"><div class="plat-arrow-down"></div>${current}</div></div>', {current:current$$inline_674});
  for(var g = e, h = [], i, j = 0, k = datasource$$inline_673.length;j < k;j++) {
    i = datasource$$inline_673[j], h.push(baidu.format('<a href="${url}" class="plat-item${extra_class}">${arrow}${text}</a>', {url:i.url, extra_class:"" + (0 == j ? " plat-first plat-on" : "") + (i.text == current$$inline_674 ? " plat-selected" : ""), text:i.text, arrow:0 == j ? '<div class="plat-arrow-up"></div>' : ""}))
  }
  g.innerHTML = h.join("");
  document.body.appendChild(e);
  baidu.on("platMain", "mouseenter", function() {
    var a = baidu.dom.getPosition(d);
    baidu.setStyles(e, {top:a.top + "px", left:a.left + "px"});
    c()
  });
  baidu.on("platMain", "mouseleave", function(a) {
    a = a || window.event;
    a = baidu.ie && a.toElement || !baidu.ie && a.relatedTarget;
    a !== e && !baidu.dom.contains(e, a) && (baidu.setStyles(e, {top:"-999px", left:"-999px"}), c())
  });
  baidu.on(e, "mouseleave", function() {
    baidu.setStyles(e, {top:"-999px", left:"-999px"});
    c()
  })
}};
jn.net = {};
jn.net.RequestWorker = function(a, b) {
  base.AbstractWorker.call(this);
  var c = this;
  c.callback = arguments[arguments.length - 1];
  c.args = [];
  for(var d = 0;d < arguments.length - 1;d++) {
    c.args.push(arguments[d])
  }
  2 === arguments.length && c.args.push(null);
  c.args.push(function() {
    c.callback.apply(window, arguments);
    c.done()
  })
};
baidu.inherits(jn.net.RequestWorker, base.AbstractWorker);
jn.net.RequestWorker.prototype.start = function() {
  Requester.post.apply(Requester, this.args)
};
jn.isNavigatorAllow = function(a) {
  var b = er.context.get("visitor").roleName;
  er.context.get("adOwner") && (b = "ADVERTISER");
  return-1 < a.indexOf(b)
};
jn.isAllow = function(a) {
  var b = er.context.get("visitor").roleName, c = !!er.context.get("adOwner");
  "SYSVIEW" != b && c && (b = "ADVERTISER");
  return-1 < a.indexOf(b)
};
jn.ui.notice = {};
function getNoticeElement$$inline_693() {
  var a = baidu.g(ID$$inline_695);
  a || (a = baidu.dom.create("div", {id:ID$$inline_695, "class":"coup-notice"}), a.innerHTML = '<div class="coup-notice-icon" id="NoticeIcon"></div><div class="coup-notice-text" id="NoticeText"></div><div class="coup-notice-close" onclick="jn.ui.notice.close();"></div>', baidu.dom.insertBefore(a, baidu.g(MAIN_ELEMENT_ID$$inline_694)), baidu.hide(a));
  return a
}
var MAIN_ELEMENT_ID$$inline_694 = "Main", ID$$inline_695 = "Notice";
jn.ui.notice = function(a, b) {
  var c = b || "coup-notice-icon";
  er.context.set("NOTICE_HTML", a);
  er.context.set("NOTICE_CLASS_NAME", c)
};
jn.ui.notice.open = function() {
  var a = er.context.get("NOTICE_HTML"), b = getNoticeElement$$inline_693();
  a ? (baidu.g("NoticeText").innerHTML = a, baidu.g("NoticeIcon").className = er.context.get("NOTICE_CLASS_NAME"), baidu.show(b)) : baidu.hide(b);
  er.context.set("NOTICE_HTML", "")
};
jn.ui.notice.close = function() {
  var a = getNoticeElement$$inline_693();
  baidu.hide(a)
};
jn.ConstMap = function(a) {
  for(var b in a) {
    this[b] = a[b]
  }
};
jn.ConstMap.prototype.getKey = function(a) {
  for(var b in this) {
    if(this[b] === a) {
      return b
    }
  }
  return null
};
jn.initConst = function(a) {
  var b, c, d, e, g, h;
  for(d in a) {
    c = a[d];
    g = [];
    h = !1;
    if("region_info" === d) {
      b = a[d];
      for(e in b) {
        g.push({text:b[e], value:e})
      }
      h = !0
    }else {
      "coup_keywords" === d ? (b = a[d], d = d.replace(/_\w/g, function(a) {
        return a.substr(1).toUpperCase()
      }), er.context.set(d + "Map", b)) : (b = {}, baidu.array.each(c, function(a) {
        g.push({text:a.l, value:a.v});
        b[a.v] = a.l
      }), h = !0)
    }
    !0 === h && (c = new jn.ConstMap(b), d = d.replace(/_\w/g, function(a) {
      return a.substr(1).toUpperCase()
    }), er.context.set(d + "Map", c), er.context.set(d + "List", g))
  }
};
jn.extendConstMap = function(a) {
  a.product_type && (a.adproduct_type = a.product_type.slice(0));
  var b = a.region_info;
  if(b) {
    for(var c = b.province, d = c.length, e, g, h, i, j = {}, k = {};d--;) {
      if(e = c[d], g = e.v, h = b[g], j[g] = e.l, h) {
        for(e = h.length;e--;) {
          i = h[e], j[i.v] = i.l, k[i.v] = g
        }
      }
    }
    b.map = j;
    b.cityProvince = k;
    a.region_info = b
  }
};
jn.app = {};
jn.app.start = function(a, b, c) {
  function d() {
    jn.ui.notice.open()
  }
  function e() {
    baidu.g(jn.config.supportDiv) && (baidu.g(jn.config.supportDiv).innerHTML = "")
  }
  function g(a) {
    var b = a.result.visitor, a = a.result.adOwner;
    er.context.set("visitor", b);
    "ADVERTISER" == b.roleName ? er.context.set("adOwner", b) : a ? er.context.set("adOwner", a) : er.context.set("adOwner", null)
  }
  var h = jn.config.url;
  er.template.setObjectGetter(function(a, c) {
    var d = baidu.getObjectByName(b + "." + a + "." + c), e = baidu.getObjectByName("jn." + a + "." + c);
    return null != d ? d : e
  });
  var i = new base.ParallelWorkerManager, j = baidu.url.getQueryValue(document.location.search, "aderId");
  i.addWorker(new jn.net.RequestWorker(h.sysInfo, function(a) {
    jn.initConst(a.result)
  }));
  j ? i.addWorker(new jn.net.RequestWorker(h.session, "aderId=" + j, g)) : i.addWorker(new jn.net.RequestWorker(h.session, g));
  i.addDoneListener(function() {
    var b = baidu.lang.isFunction(a) ? a() : a;
    c && c();
    er.Action.prototype.onenter = d;
    er.Action.prototype.onbeforeleave = e;
    er.controller.permit = jn.isAllow;
    er.controller.init();
    er.controller.setNoAuthAction(jn.error.AccessDeny);
    er.controller.setNoPageAction(jn.error.PageNotFound);
    er.controller.addPathMap("/", b);
    baidu.addClass(document.body, jn.util.getUserAgentClass());
    ui.Uploader.setRequestUrlGenerator(function(a) {
      var b = a.getStrRef() + ".processResponse", c = /\?/.test(a.url), d = Requester.getAdOwnerParam();
      return a.url + (c ? "&" : "?") + "callback=parent." + b + ("" != d ? "&" + d : "")
    });
    var g = er.context.get("defaultStartTimeMap").getKey("defaultStartTime"), g = baidu.date.parseToDate(g);
    ui.MiniMultiCalendar.setStartDate(g);
    var g = er.context.get("visitor"), h = er.context.get("adOwner"), i = g.roleName, h = !!h, j = g.msgNum, j = 0 < j ? '\u6700\u65b0\u6d88\u606f<span style="color:#f00;">(' + j + ")</span>" : "\u6700\u65b0\u6d88\u606f(0)", q = baidu.g("userName"), r = baidu.g("linkSelfset"), p = baidu.g("linkNewMsg"), s = baidu.g("userInfo");
    q && (q.innerHTML = g.username || g.name);
    r && (h && "ADVERTISER" != i ? (baidu.hide(r), baidu.hide(r.nextSibling)) : r.setAttribute("href", "#/system/adminInfo"));
    p && (p.innerHTML = j, p.setAttribute("href", jn.entry.MESSAGE_VIEW_URL));
    s && baidu.show(s);
    var g = er.context.get("visitor"), r = er.context.get("adOwner"), i = baidu.cookie.get("LAST_PAGE"), h = baidu.cookie.get("LAST_VISITOR"), j = baidu.cookie.get("LAST_ADOWNER"), q = g.name, r = r ? r.name : "", p = {ADVERTISER:jn.entry.DASHBOARD_URL, SYSADMIN:jn.entry.SYS_DASHBOARD_URL, SYSVIEW:jn.entry.SYS_DASHBOARD_URL, ADADMIN:jn.entry.SYS_DASHBOARD_URL, AGENT:jn.entry.SYS_DASHBOARD_URL}, s = window.location, t = er.locator.getLocation(), u, v;
    i && (u = baidu.dom.create("a", {href:i}), v = u.hash.replace(/^#+/, ""));
    baidu.cookie.remove("LAST_PAGE");
    baidu.cookie.remove("LAST_VISITOR");
    baidu.cookie.remove("LAST_ADOWNER");
    if(i && (q != h || r != j || s.host != u.host || s.pathname != u.pathname)) {
      window.location.replace(p[g.roleName])
    }else {
      if(!t || "/" == t) {
        v ? er.locator.redirect(v) : er.locator.redirect(b)
      }
    }
  });
  "undefined" != typeof PDC && PDC.send();
  i.start()
};
jn.net.TemplateWorker = function(a) {
  base.AbstractWorker.call(this);
  this._template = a;
  this._index = 0;
  this._loaded = []
};
baidu.inherits(jn.net.TemplateWorker, base.AbstractWorker);
jn.net.TemplateWorker.prototype.start = function() {
  this._loadTemplate()
};
jn.net.TemplateWorker.prototype._loadTemplate = function() {
  0 >= this._template.length ? this._templateLoaded() : baidu.ajax.request(this._template[this._index], {method:"get", noCache:!1, onsuccess:baidu.fn.bind(this._loadTemplateSuccess, this), onfailure:baidu.fn.bind(this._templateLoaded, this), headers:{"X-Request-By":"ERApplication"}})
};
jn.net.TemplateWorker.prototype._loadTemplateSuccess = function(a) {
  this._loaded.push(a.responseText);
  this._templateLoaded()
};
jn.net.TemplateWorker.prototype._templateLoaded = function() {
  this._index++;
  this._index >= this._template.length ? (er.template.parse(this._loaded.join("")), this.done()) : this._loadTemplate()
};
app.asyncResource = "assets/text/tpl-4acbf52805a5318c25a47eda8e86a8fd.html";
app.version = "Thu Jul 05 2012 11:38:49 GMT+0800 (CST)@yx-testing-cbweb02.yx01.baidu.com";
app.Launch = function(a) {
  var b = new base.ParallelWorkerManager;
  b.addWorker(new jn.net.TemplateWorker([app.asyncResource]));
  baidu.addClass(document.body, jn.util.getUserAgentClass());
  b.addDoneListener(a);
  b.start()
};
app.Init = function(a, b, c, d) {
  c = c || {};
  a = ui.util.createPage(a, b, d || !1);
  a.init();
  a.bindModel(c);
  a.render();
  a.bindEvent();
  return a
};
app.InitFromElement = function(a, b, c) {
  var d = "MAIN_PAGE_" + (new Date).getTime();
  er.template.parse("<\!--target:" + d + "--\>\n" + a.innerHTML);
  return app.Init(d, a, b, c)
};
var container$$inline_743 = [], blockList$$inline_744 = [], currentIndex$$inline_745 = -1, nav$$inline_752 = {promptSub:function(a) {
  var b = baidu.g("navSub" + currentIndex$$inline_745), c = baidu.g("navSub" + a), a = baidu.g("navItem" + a);
  baidu.addClass(a, "nav-item-hover");
  b && baidu.hide(b);
  c && baidu.show(c)
}, resetSub:function() {
  for(var a = 0, b = container$$inline_743.length;a < b;a++) {
    var c = baidu.g("navSub" + a), d = baidu.g("navItem" + a), e = "nav-item-hover", g = "none";
    a == currentIndex$$inline_745 && (e = "nav-selected", g = "block");
    d.className = e;
    c && (c.style.display = g)
  }
}, setSub:function(a) {
  currentIndex$$inline_745 = a;
  nav$$inline_752.resetSub()
}, register:function(a, b) {
  function c(a) {
    var a = baidu.object.clone(a), b = a.items, c = b ? b.length : 0, d;
    if(jn.isNavigatorAllow(a.auth)) {
      for(;c--;) {
        d = b[c], (d = d.auth) && !jn.isNavigatorAllow(d) && b.splice(c, 1)
      }
      container$$inline_743.push(a)
    }
  }
  if(baidu.lang.isArray(a)) {
    for(var d = 0, e = a.length;d < e;d++) {
      c(a[d])
    }
  }else {
    c(a)
  }
  blockList$$inline_744 = b
}, render:function() {
  var a = baidu.g("Nav"), b = !0;
  baidu.array.each(blockList$$inline_744, function(a) {
    -1 < window.location.hash.indexOf(a) && (b = !1)
  });
  b && baidu.show("header");
  var c;
  c = [];
  var d = [], e, g, h, i, j, k, n, o, l, m, q;
  j = 0;
  for(k = container$$inline_743.length;j < k;j++) {
    if(h = container$$inline_743[j], e = h.items, g = h.location, c.push(baidu.format('<li class="{0}" onclick="{2}" id="{3}">{1}</li>', "nav-item-hover", baidu.format('<a class="{0}" href="{1}" hidefocus="true">{2}</a>', "", "#" + g, h.name), "jn.ui.navigator.setSub(" + j + ")", "navItem" + j)), g = [], q = 0, e) {
      n = 0;
      for(o = e.length;n < o;n++) {
        i = e[n], m = i.name, l = i.location, m && (q++, g.push(baidu.format('<li class="{1}" id="{0}">{2}</li>{3}', "navSubItem" + j + "-" + n, "", baidu.format('<a class="{0}" href="{1}" hidefocus="true">{2}</a>', "", "#" + l, i.name), n != o - 1 ? '<li class="nav-separator">|</li>' : "")))
      }
      "object" == typeof h.position ? (e = er.context.get("visitor").roleName, h = h.position[e]) : h = h.position;
      d.push(baidu.format('<ul class="{0}" id="{1}" style="white-space: nowrap;padding-left:{3}px;" >{2}</ul>', "nav-sub", "navSub" + j, g.join(""), h))
    }
  }
  if(j = baidu.g("subNav")) {
    0 < d.length ? (j.innerHTML = d.join(""), baidu.show(j)) : baidu.hide(j)
  }
  c = baidu.format('<ul class="{0}" id="{1}">{2}</ul>', "nav-main", "navMain", c.join(""));
  a.innerHTML = c
}, repaint:function() {
  var a = er.locator.getLocation(), b = er.locator.currentPath, c, d, e, g, h, i, j, k, n, o, l, m, q;
  c = 0;
  for(d = container$$inline_743.length;c < d;c++) {
    e = container$$inline_743[c];
    i = e.items;
    q = !1;
    e = e.sub;
    container$$inline_743[c].location === a && (currentIndex$$inline_745 = c);
    if(i) {
      g = 0;
      for(h = i.length;g < h;g++) {
        if(l = !1, k = i[g], m = k.sub, n = k.location, o = k.name, j = "navSubItem" + c + "-" + g, !("separator" == k.name || !n || !o)) {
          if(n == a || n == b) {
            currentIndex$$inline_745 = c, l = q = !0
          }else {
            if(m) {
              k = 0;
              for(n = m.length;k < n;k++) {
                if(m[k] == a || m[k] == b) {
                  q = l = !0;
                  currentIndex$$inline_745 = c;
                  break
                }
              }
            }
          }
          baidu.g(j) && (l ? baidu.addClass(j, "nav-selected") : baidu.removeClass(j, "nav-selected"))
        }
      }
    }
    if(!q && e) {
      i = 0;
      for(q = e.length;i < q;i++) {
        if(e[i] == a || e[i] == b) {
          currentIndex$$inline_745 = c;
          break
        }
      }
    }
  }
  nav$$inline_752.resetSub();
  baidu.show("Nav")
}};
jn.ui.navigator = nav$$inline_752;
function initer$$inline_832() {
  var a = jn.ui.navigator;
  a.register(jn.landmark.config.navigator, jn.landmark.config.blockList);
  er.locator.onredirect = a.repaint;
  a.render();
  jn.ui.platformSelector.render(jn.config.platform, "\u54c1\u724c\u5730\u6807")
}
jn.landmark.app = function() {
  jn.app.start(jn.landmark.config.defaultIndex, "jn.landmark", initer$$inline_832)
};
baidu.on(window, "load", function() {
  app.Launch(jn.landmark.app)
});
