import Ember from 'ember';

const { computed, Handlebars: {SafeString} } = Ember;

export default Ember.Component.extend({

  // Default values
  width: 200,
  height: 200,

  x: 300,
  y: 300,

  attributeBindings: ['style'],

  style: computed('width', 'height', 'x', 'y', function () {
    const width = this.get('width');
    const height = this.get('height');
    const x = this.get('x');
    const y = this.get('y');

    // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
    return new SafeString(`width: ${width}px; height: ${height}px; position: fixed; top:${y}px; left:${x}px`);
  })

});
