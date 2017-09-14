import _ from 'underscore';
import $ from 'jquery';
import Handlebars from 'handlebars-template-loader/runtime';

export default class View {

  constructor(opt = {}) {
    this.opt = opt;
    this.componentClass = this.opt.componentClass || this.componentClass || 'without-class';
    this.isChild = this.opt.isChild || this.isChild || false;
    this.events = this.events || (opt.events ? opt.events : {});
    this.template = processTemplate(this.template ? this.template : opt.template ? opt.template : null);
    this.exTemplateConfig = opt.exTemplateConfig || null;
    this.eventsRef = [];
    this.initialize(opt);
  }

  initialize() {
    if (this.template) {
      registerTemplate.call(this);
      if (this.opt.container) this.opt.container.append(this.render().el);
      else if (this.isChild) this.render();
      this.delegateEvents();
    }
  }

  static extend(protoProps, staticProps) {
    const parent = this;
    let child;
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function child(...args) {
        return parent.apply(this, args);
      };
    }
    _.extend(child, parent, staticProps);
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
  }

  delegateEvents() {
    let i;
    const keys = Object.keys(this.events);
    this.cleanEvents();
    for (i = 0; i < keys.length; i++) {
      const arr = keys[i].split(' ');
      this.eventsRef.push($(document).on(arr.shift(), getSelector.call(this, arr), this[this.events[keys[i]]].bind(
        this)));
    }
    this.customEventDelegation();
  }

  customEventDelegation() {
    return this;
    // throw new Error('This method must be implemented', this);
  }

  hide() {
    const name = getBrowser().name;
    if (name === 'IE' || name === 'Edge') {
      /* istanbul ignore next */
      this.$el.wrap('<span>').hide();
    } else {
      this.$el.hide();
    }
  }

  show() {
    this.$el.show();
  }

  cleanEvents() {
    _.map(this.eventsRef, (o) => {
      o.off();
    });
    this.eventsRef = [];
  }

  render() {
    return _render.call(this.beforeRender()).afterRender();
  }

  beforeRender() {
    return this;
  }

  afterRender() {
    return this;
  }

  onRender() {
    return this;
  }

  remove() {
    this.beforeRemove();
    this.cleanEvents();
    _removeElement.call(this).afterRemove();
    return this;
  }

  beforeRemove() {
    return this;
  }

  afterRemove() {
    return this;
  }
}

function processTemplate(tpl) {
  return typeof tpl === 'string' || tpl instanceof String ?
    _.template(tpl) : tpl;
}

function getSelector(arr) {
  let selector = this.$el && this.$el.parent && this.$el.parent.id ? `#${this.$el.parent.id}` : '';
  selector += ` .${this.componentClass} `;
  selector += arr.join(' ');
  console.log(selector);
  return selector;
}

function registerTemplate() {
  /* istanbul ignore next */
  if (!_.isUndefined(this.templatePartials)) {
    const k = Object.keys(this.templatePartials);
    for (let i = 0; i < k.length; i++) {
      Handlebars.default.registerPartial(k[i], this.templatePartials[k[i]]);
    }
  }
}

function _getTemplateConfig() {
  const keys = Object.keys(this.exTemplateConfig);
  let aux;
  for (let i = 0; i < keys.length; i++) {
    if (!aux) {
      aux = {};
    }
    aux[keys[i]] = this.exTemplateConfig[keys[i]];
  }
  this.templateConfig = _.extend({}, aux);
}

function _render() {
  if (this.exTemplateConfig) {
    _getTemplateConfig.call(this);
  }
  _setElement.call(this, this.template(this.templateConfig)).$el.addClass(this.componentClass);
  this.onRender();
  return this;
}

function _setElement(el) {
  /* istanbul ignore next */
  this.$el = typeof el === 'string' || el instanceof String ? $(el) : el;
  this.el = this.$el[0];
  return this;
}

function _removeElement() {
  this.$el.remove();
  this.el = null;
  return this;
}

/* istanbul ignore next */
function getBrowser() {
  const ua = navigator.userAgent;
  let tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      name: 'IE',
      version: (tem[1] || '')
    };
  }
  if (/Edge\/\d./i.test(ua)) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      name: 'Edge',
      version: (tem[1] || '')
    };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/);
    if (tem !== null) {
      return {
        name: 'Opera',
        version: tem[1]
      };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
}
