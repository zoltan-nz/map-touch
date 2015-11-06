import Ember from 'ember';

const { $, computed, Handlebars } = Ember;

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
  classNames: ['grey-background'],

  width: 0,
  height: 0,

  init(...args) {
    // This is mandatory during initialization of Component.
    this._super(...args);

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

    // We can use this action for sending information about window size.
    this.sendAction('windowResized', width, height);

    // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
    return new Handlebars.SafeString(`width: ${width}px; height: ${height}px`);
  }),

  // ** EVENTS **

  click(e) {
    let x = e.clientX;
    let y = e.clientY;

    console.log('clicked:', x, y);
  },

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
    // jQuery gives more accurate size.
    this.set('width', $(window).width());
    this.set('height', $(window).height());
  },
});
