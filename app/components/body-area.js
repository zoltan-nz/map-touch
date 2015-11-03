import Ember from 'ember';

export default Ember.Component.extend({

  attributeBindings: ['style'],

  classNames: ['grey-background'],

  ___resizeFunction : null,

  style: Ember.computed('windowWidth', 'windowHeight', function () {
    let width = this.get('windowWidth');
    let height = this.get('windowHeight');

    this.sendAction('windowResized', width, height);

    // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
    return new Ember.Handlebars.SafeString(`width: ${width}px; height: ${height}px`);
  }),

  windowWidth: Ember.computed('', function () {
    return Ember.$(window).width();
  }),

  windowHeight: Ember.computed('', function () {
    return Ember.$(window).height();
  }),

  windowResized: Ember.computed('windowWidth', 'windowHeight', function() {
    debugger;
    return this.sendAction('windowResized', this.get('windowWidth'), this.get('windowHeight'));
  }),

  init(...args) {
    this._super(...args);
    Ember.$(window).on('resize', function(e) {
      this.windowChanged().notifyPropertyChange();
      this.get('style');
    }.bind(this) );
  },

  windowChanged: Ember.observer('windowHeight', 'windowWidth', function() {
    this.get('style');
  }),

  click(e) {
  },

  mouseMove(e) {
    let x = e.clientX;
    let y = e.clientY;

    this.sendAction('mouseMoved', x, y);
  },

  touchMove(e) {
    let x = e.originalEvent.touches[0].clientX;
    let y =e.originalEvent.touches[0].clientY;

    this.sendAction('mouseMoved', x, y);
  },

  touchStart(e) {
    console.log('touch start', e);
  },

  touchEnd(e) {
    console.log('touch end', e);
  }

});
