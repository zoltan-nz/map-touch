import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('touch');
  },

  actions: {
    saveTouch(x, y) {
      // ES2015 trick {x, y} is the same as {x: x, y: y} in ES5
      this.store.createRecord('touch', {x, y}).save();
    },

    deleteAllTouch() {
      this.get('controller').get('model').forEach(touch => touch.destroyRecord());
    }
  }
});
