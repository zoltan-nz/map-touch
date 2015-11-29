import Ember from 'ember';

const { computed, Handlebars: {SafeString}, run: {once} } = Ember;

export default Ember.Component.extend({

  draggable: true,
  classNames: ['movable-box'],
  attributeBindings: ['style', 'draggable'],

  style: computed('width', 'height', 'left', 'top', 'right', 'bottom', function () {
    const width = this.get('width');
    const height = this.get('height');
    let left = this.get('left');
    let right = this.get('right');
    let top = this.get('top');
    let bottom = this.get('bottom');

    let styleString = `position: fixed; width: ${width}px; heigth: ${height}px;`;
    let positionX = '';
    let positionY = '';

    if (!!left) {positionX = `left: ${left}px;`; this.set('right', null); right = null;}
    if (!!right) {positionX = `right: ${right}px;`; this.set('left', null); left = null;}
    if (!!top) {positionY = `top: ${top}px;`; this.set('bottom', null); bottom = null;}
    if (!!bottom) {positionY = `bottom: ${bottom}px;`; this.set('top', null); top = null;}

    // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
    return new SafeString(`${styleString} ${positionX} ${positionY}`);
  }),

  // Great article about drag events: http://tutorials.jenkov.com/html5/drag-and-drop.html
  dragStart(e) {
    var dragImage = document.createElement('img');
    dragImage.width = 1;
    e.originalEvent.dataTransfer.setDragImage(dragImage, 0, 0);

    e.originalEvent.dataTransfer.effectsAllowed = 'none';
    e.originalEvent.dataTransfer.dropEffect = 'none';

    // Response the position of this component e.g.: {top: 5, left: 5}
    const pos = this.$().position();

    const clientX = parseInt(e.originalEvent.clientX);
    const clientY = parseInt(e.originalEvent.clientY);

    // Calculate distance between mouse pointer and
    // the corner position of this div component.
    const offsetX = clientX - pos.left;
    const offsetY = clientY - pos.top;

    this.set('offsetX', offsetX);
    this.set('offsetY', offsetY);
  },

  drag(e) {
    const clientX = parseInt(e.originalEvent.clientX);
    const clientY = parseInt(e.originalEvent.clientY);

    // Ember.run.once update the position only once in
    // this run loop.
    once(() => this.updatePosition(clientX, clientY));
  },

  dragOver() {
    return false;
  },

  dragEnd() {
    return false;
  },

  updatePosition(clientX, clientY) {
    const offsetX = this.get('offsetX');
    const offsetY = this.get('offsetY');

    const newX = clientX - offsetX;
    const newY = clientY - offsetY;

    this.set('left', newX);
    this.set('top', newY);
  }
});
