import View from '../_base/View';

import template from './header.hbs';

export default View.extend({
  template,
  initialize(opt = {}) {
    View.prototype.initialize.call(this, opt);
  },
  render() {
    View.prototype.render.call(this);
    return this;
  },
  destroy() {}
});
