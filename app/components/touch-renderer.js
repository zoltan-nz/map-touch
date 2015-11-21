import Ember from 'ember';

const { run: {once} } = Ember;

export default Ember.Component.extend({

  tagName: 'canvas',

  attributeBindings: ['width', 'height'],
  widthNotNull: Ember.computed.gt('width', 0),
  heightNotNull: Ember.computed.gt('height', 0),
  sizeIsReady: Ember.computed.and('widthNotNull', 'heightNotNull'),

  // We will use this for canvas context.
  ctx: null,

  // Coordinates from the server. Bounded to model
  touches: null,

  didInsertElement() {
    this._setupCtx();
  },

  renderDot(x, y) {
    let ctx = this.get('ctx');
    ctx.fillStyle = '#00a0e3';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
    ctx.fill();
  },

  renderAllTouches() {
    let touches = this.get('touches');

    console.log('render all', touches.get('length'));
    this._clearCanvas();
    touches.forEach((touch) => {
      this.renderDot(touch.get('x'), touch.get('y'));
    });
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
    Ember.run.once(() => {
        console.log('touches changed', this.get('touches.length'));
        this.renderAllTouches();
      }
    );
  }),

  click(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    this.sendAction('clickWithCoordinates', x, y);
  },

  _setupCtx() {
    let ctx = this.get('element').getContext('2d');
    this.set('ctx', ctx);
  },

  _clearCanvas() {
    let ctx = this.get('ctx');
    let canvas = ctx.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

});
