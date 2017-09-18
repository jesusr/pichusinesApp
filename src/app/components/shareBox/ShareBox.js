import Clipboard from 'clipboard';
import _ from 'underscore';

import ComponentBase from '../_base/View';

export default ComponentBase.extend(
  /**
   * @lends module:Components.ServiceRoute.prototype
   */
  {

    template: require('./shareBox.hbs'),

    events: {
      'click .snw-close-button': '_close',
      'click .snw-share-box-done-button': '_close'
    },

    initialize(options) {
      _.extend(this.exTemplateConfig, options.url);
      ComponentBase.prototype.initialize.call(this, options);
      this.cbSetup = new Clipboard('.snw-share-box-input-copy-button');
      this.cbSetup.on('success', () => {
        this.$el.find('.snw-share-box-copied-button').css('visibility', 'visible');
      });
    },
    _close() {
      this.destroy();
    },
    destroy() {
      window.scrollTo(0, this.opt.oldScroll);
      this.hide();
      this.$el.remove();
      this.cbSetup.destroy();
    }
  });
