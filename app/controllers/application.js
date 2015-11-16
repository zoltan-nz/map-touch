import Ember from 'ember';

const {
        run: {once}
        } = Ember;

export default Ember.Controller.extend({

  mouseX: 0,
  mouseY: 0,

  windowWidth:  0,
  windowHeight: 0,

  touches: null,

  actions: {
    mouseMoved(x, y) {
      this.set('mouseX', x);
      this.set('mouseY', y);
    },

    touched(x, y) {
      this.store.createRecord('touch', {x: x, y: y}).save();
    },

    windowResized(x, y) {
      this.set('windowWidth', x);
      this.set('windowHeight', y);
    },

    deleteAllTouch() {
      this.get('model').forEach((touch) => touch.destroyRecord());
      this.set('touches', this.get('model'));
    }
  },

  // Firebase doesn't support isLoaded, we have to update our model
  // only when all data downloaded
  modelChanged: Ember.observer('model.[]', function () {
    if (this.get('model.length') > 0) {
      once(() => this.set('touches', this.get('model')));
    }
  })

});
