import Ember from 'ember';

export default Ember.Controller.extend({

  mouseX: 0,
  mouseY: 0,

  actions: {
    mouseMoved(x,y) {
      this.set('mouseX', x);
      this.set('mouseY', y);
    }
  }

});
