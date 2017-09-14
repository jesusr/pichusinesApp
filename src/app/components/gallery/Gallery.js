import Handlebars from 'handlebars-template-loader/runtime';
import View from '../_base/View';
import Tags from '../tags/Tag';
import template from './Gallery.hbs';

export default View.extend({
  template,
  initialize() {
    Handlebars.registerHelper('makeTag', str => {
      return str.split(' ').join('_');
    });
    this.componentClass = 'gallery-component';
    this.tags = getTagList.call(this, this.opt.gallery);
    this.exTemplateConfig = {
      item: this.opt.gallery
    };
    View.prototype.initialize.call(this);
  },
  render() {
    View.prototype.render.call(this);
    if (this.$el && this.opt.tags) {
      this.tagComponent = new Tags({
        tags: this.tags,
        isChild: true,
        galleryComponent: this
      });
      this.$el.find('.gallery__header').html(this.tagComponent.el);
    }
    return this;
  },
  filter(tags) {
    this.$el.find('.gallery__item').hide();
    for (let i = 0; i < tags.length; i++) {
      this.$el.find(`.gallery__item.${tags[i].split(' ').join('_')}`).show();
    }
  }
});

function getTagList(gallery) {
  const tags = [];
  this.opt.gallery = gallery.map(o => {
    o.tags.map(p => {
      o[p] = true;
      if (tags.indexOf(p) < 0) {
        tags.push(p);
      }
      return p;
    });
    return o;
  });
  return tags;
}
