import $ from 'jquery';
import Backbone from 'backbone';

import HomePage from 'app/components/home-page/HomePage';

export default Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home() {
    const homePage = new HomePage({
      gallery: true,
      container: $('#root')
    });

    $('#root').empty().append(homePage.$el);
  },
  detail() {}
});
