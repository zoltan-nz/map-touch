import Ember from 'ember';

export default Ember.Controller.extend({

  mouseX: 0,
  mouseY: 0,

  windowWidth:  0,
  windowHeight: 0,

  downloadedModel: [],

  lastTouch: Ember.computed.alias('model.lastObject'),
  pulseTouchList: [],

  actions: {
    mouseMoved(x, y) {
      this.set('mouseX', x);
      this.set('mouseY', y);
    },

    windowResized(x, y) {
      this.set('windowWidth', x);
      this.set('windowHeight', y);
    }
  },

  lastTouchChanged: Ember.observer('lastTouch', function() {
    let lastTouch = this.get('lastTouch');

    this.get('pulseTouchList').pushObject(this.get('lastTouch'));

    Ember.run.later(this, () => {
      this.get('pulseTouchList').removeObject(lastTouch);
    }, 10000);

  })

});
