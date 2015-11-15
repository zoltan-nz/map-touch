import Ember from 'ember';

const { run: {once} } = Ember;

export default Ember.Component.extend({

  tagName: 'canvas',

  attributeBindings: ['width', 'height'],
  widthNotNull: Ember.computed.gt('width', 0),
  heightNotNull: Ember.computed.gt('height', 0),
  sizeIsReady: Ember.computed.and('widthNotNull', 'heightNotNull'),

  allTouchesRendered: false,

  // We will use this for canvas context.
  ctx: null,

  // Coordinates from the server. Bounded to model
  touches: null,

  didInsertElement() {
    this._setupCtx();
  },

  renderDot(x, y) {
    let ctx = this.get('ctx');
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
    ctx.fill();
  },

  renderAllTouches() {
    let touches = this.get('touches');

    touches.forEach((touch) => {
      this.renderDot(touch.get('x'), touch.get('y'));
    });

    this.set('allTouchesRendered', true);
  },

  // Reassign context if size changed.
  // Only when both size are greater than zero.
  sizeChanged: Ember.observer('width', 'height', function() {
    if (this.get('sizeIsReady')) {
      // Resize recreate the canvas, we have to draw there everything again.
      once(() => this.renderAllTouches());
    }
  }),

  touchesChanged: Ember.observer('touches.[]', function() {
    once(() => {
      // First time, we have to render all dots on the screen.
      if (!this.get('allTouchesRendered')) {
        return this.renderAllTouches();
      }

      // Later we just render the latest touches.
      let latestTouch = this.get('touches.lastObject');
      this.renderDot(latestTouch.get('x'), latestTouch.get('y'));
    })
  }),

  click(e) {
    let x = e.clientX;
    let y = e.clientY;

    this.renderDot(x,y);

    this.sendAction('clickWithCoordinate', x, y);
  },

  _setupCtx() {
    let ctx = this.get('element').getContext('2d');
    this.set('ctx', ctx);
  }

});
