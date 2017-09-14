import View from '../_base/View';

import template from './Tag.hbs';

export default View.extend({
  template,
  events: {
    'click .tags__item': 'filterBy'
  },
  initialize(opt = {}) {
    this.componentClass = 'tag-component';
    this.opt.tagsActive = [];
    this.exTemplateConfig = {
      tags: this.opt.tags
    };
    View.prototype.initialize.call(this, opt);
  },
  filterBy(e) {
    const id = e.target.id || e.target.parentElement.id;
    if (this.opt.tagsActive.indexOf(this.opt.tags[id]) < 0) {
      this.opt.tagsActive.push(this.opt.tags[id]);
    } else {
      this.opt.tagsActive.splice(this.opt.tagsActive.indexOf(this.opt.tags[id]), 1);
    }
    if (!this.opt.tagsActive.length) {
      this.opt.tagsActive = this.opt.tags.map(o => {
        return o;
      });
    }
    this.activateTags();
    this.opt.galleryComponent.filter(this.opt.tagsActive);
  },
  activateTags() {
    this.$el.find('.tags__item').removeClass('active');
    this.opt.tagsActive.map(o => {
      this.$el.find(`.tags__item#${this.opt.tags.indexOf(o)}`).addClass('active');
      return o;
    });
  }
});
