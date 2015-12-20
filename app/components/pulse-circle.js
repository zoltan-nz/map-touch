import Ember from 'ember';
const {
  computed,
  Handlebars: {
    SafeString
  }
} = Ember;

export default Ember.Component.extend({
  // Source: http://bl.ocks.org/chiester/11267307

  tagName: 'svg',
  classNames: ['pulse-circle-container'],
  pulse: true,

  didInsertElement() {
    this._super(...arguments);
    console.log('inserted', this.get('x'), this.get('y'));
  },

  style: computed('x', 'y', function() {
    let x = this.get('x');
    let y = this.get('y');

    return new SafeString(`transform-origin: ${x}px ${y}px;`);
  }),

  xpx: computed('x', function() {
    let x = this.get('x');
    if (!x) {
      return '';
    }
    return `${x}px`;
  }),

  ypx: computed('y', function() {
    let y = this.get('y');
    if (!y) {
      return '';
    }
    return `${y}px`;
  }),

  click() {
    // Allow bubbling up the click event.
    return true;
  }
});
