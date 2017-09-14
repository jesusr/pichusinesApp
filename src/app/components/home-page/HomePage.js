import View from '../_base/View';
import Gallery from '../gallery/Gallery';
import data from '../../../static/gallery';

import template from './HomePage.hbs';

export default View.extend({
  template,
  initialize(opt = {}) {
    View.prototype.initialize.call(this, opt);
  },
  render() {
    View.prototype.render.call(this);
    if (this.$el && this.opt.gallery) {
      this.gallery = new Gallery({
        gallery: data,
        tags: true,
        isChild: true
      });
      this.$el.find('.homepage__container').html(this.gallery.el);
    }
    return this;
  },
  destroy() {
    if (this.gallery) {
      this.gallery.destroy();
    }
  }
});
