import Ember from 'ember';

const { computed, Handlebars: {SafeString} } = Ember;

export default Ember.Component.extend({

  // Default values
  width: 200,
  height: 200,

  x: 300,
  y: 300,

  draggable: true,

  attributeBindings: ['style', 'draggable'],

  style: computed('width', 'height', 'x', 'y', function () {
    const width = this.get('width');
    const height = this.get('height');
    const x = this.get('x');
    const y = this.get('y');

    // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
    return new SafeString(`width: ${width}px; height: ${height}px; position: fixed; top:${y}px; left:${x}px`);
  }),

  drag(e) {
    // Response the position of this component e.g.: {top: 5, left: 5}
    const pos = this.$().position();

    const clientX = parseInt(e.originalEvent.clientX);
    const clientY = parseInt(e.originalEvent.clientY);

    this.set('x', clientX);
    this.set('y', clientY);
    return false;
  },

  dragOver(e) {
    return false;
  }
});
