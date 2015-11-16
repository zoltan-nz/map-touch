import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  // Store is not exist in a component we inject it.
  store: Ember.inject.service(),

  // All session
  model: null,

  // This user's session
  session: null,

  init() {
    // Mandatory setup.
    this._super(...arguments);

    let store = this.get('store');

    store.findAll('ping').then((all) => {
      this.set('model', all);
    });

    let now = moment();

    store.createRecord('ping', {updatedAt: now.format()}).save((session) => {
        this.set('session', session);
    });
  },

  liveUsers: Ember.computed('model.[]', function() {
    let model = this.get('model');
    if (!model) return;

    let oneMinuteAgo = moment().subtract(moment.duration({minutes: 1}));

    return model.filter((session) => moment(session.get('updatedAt')) > oneMinuteAgo);
  })

});
