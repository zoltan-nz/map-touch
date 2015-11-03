import Ember from 'ember';

export default Ember.Controller.extend({

  mouseX: 0,
  mouseY: 0,

  windowWidth: 0,
  windowHeight: 0,

  actions: {
    mouseMoved(x,y) {
      this.set('mouseX', x);
      this.set('mouseY', y);
    },

    windowResized(x,y) {
      this.set('windowWidth', x);
      this.set('windowHeight', y);
    }
  }

});
