import View from '../_base/View';
import Gallery from '../gallery/Gallery';
import Header from '../header/Header';
import data from '../../../static/gallery';

import template from './HomePage.hbs';

export default View.extend({
  template,
  events: {
    'click .homepage__header__menu__icon': 'toggleMenu'
  },
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
    this.header = new Header(this.$el.find('.homepage__header__menu__icon'));
    return this;
  },
  toggleMenu(e) {
    this.$el.find('.homepage__header').toggleClass('lateral__menu__open');
    this.$el.find('.lateral-menu').toggleClass('active');
  },
  destroy() {
    if (this.gallery) {
      this.gallery.destroy();
    }
  }
});
