import Ember from 'ember';

export default Ember.Component.extend({

  attributeBindings: ['style'],

  classNames: ['grey-background'],

  style: Ember.computed('windowWidth', 'windowHeight', function () {
    let width = this.get('windowWidth');
    let height = this.get('windowHeight');

    // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
    return new Ember.Handlebars.SafeString(`width: ${width}px; height: ${height}px`);
  }),

  windowWidth: Ember.computed('', function () {
    return $(document).width();
  }),

  windowHeight: Ember.computed('', function () {
    return $(document).height();
  }),

  click(e) {
    debugger;
  },

  mouseMove(e) {
    let x = e.clientX;
    let y = e.clientY;

    this.sendAction('mouseMoved', x, y);
  }

});
