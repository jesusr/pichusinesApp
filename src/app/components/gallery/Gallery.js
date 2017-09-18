import Handlebars from 'handlebars-template-loader/runtime';
import $ from 'jquery';
import View from '../_base/View';
import Tags from '../tags/Tag';
import ShareBox from '../shareBox/ShareBox';
import Utils from '../../helpers/Utils';
import template from './Gallery.hbs';

export default View.extend({
  template,
  events: {
    'click .gallery__item img': 'clickImage',
    'click .share': 'share',
    'click .external-link': 'openLink',
    'click .more': 'openDetail'
  },
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
  },
  clickImage(e) {
    if (Utils.isMobile.call(this)) {
      this.$el.find(`#${e.target.parentElement.id}`).find('.buttons').toggleClass('active');
    }
  },
  share(e) {
    this.shareBox = new ShareBox({
      element: e,
      url: `${[location.protocol, '//', location.host, location.pathname].join('')}?` +
        `id=${e.target.id}`,
      oldScroll: window.scrollY,
      isChild: true
    });
    $('.homepage__container').append(this.shareBox.el);
    window.scroll(0, 0);
  },
  openLink(e) {
    window.open(e.target.getAttribute('data-url'), '_blank');
  },
  openDetail(e) {
    const id = e.target.parentElement.getAttribute('data-url');
    console.log(`openDetail ${id}`);
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
