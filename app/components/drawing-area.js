import Ember from 'ember';

const { $, computed, Handlebars, run: {once} } = Ember;

export default Ember.Component.extend({

  /*
   * Because of inside style, we need the following in the `config/environment.js`
   *   ```
   *   contentSecurityPolicy: {
   *     'style-src': "'self' 'unsafe-inline'"
   *   },
   *   ```
   */
  attributeBindings: ['style'],
  classNames: ['drawing-area'],

  width: 0,
  height: 0,

  init() {
    // This is mandatory during initialization of Component.
    this._super(...arguments);

    // Setup the default size.
    this._updateSize();

    // Watching debounce resize event.
    // Doc: https://github.com/mike-north/ember-resize
    this.get('resizeService').on('debouncedDidResize', (/*event*/) => {
      this._updateSize();
    });
  },

  style: computed('width', 'height', function () {
    let width = this.get('width');
    let height = this.get('height');

    // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
    return new Handlebars.SafeString(`width: ${width}px; height: ${height}px`);
  }),

  // ** EVENTS **

  mouseMove(e) {
    let x = e.clientX;
    let y = e.clientY;

    this.sendAction('mouseMoved', x, y);
  },

  touchMove(e) {
    let x = e.originalEvent.touches[0].clientX;
    let y = e.originalEvent.touches[0].clientY;

    this.sendAction('mouseMoved', x, y);
  },

  touchStart(e) {
    console.log('touch start', e);
  },

  touchEnd(e) {
    console.log('touch end', e);
  },

  _updateSize() {
    // jQuery return the  accurate size.
    const width = $(window).width();
    const height = $(window).height();

    this.set('width', width);
    this.set('height', height);

    // We can use this action for sending information about window size.
    // Without run once, this action would trigger twice.
    once(() => this.sendAction('windowResized', width, height));
  }
});
