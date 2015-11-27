import Ember from 'ember';
import d3 from 'd3';
import topojson from 'topojson';

export default Ember.Component.extend({

  tagName: 'svg',
  width: '100%',
  height: '663px',
  attributeBindings: ['width', 'height'],


  didInsertElement() {

    this._super(...arguments);

    let el = this.get('element');

    var width  = 1024,
        height = 960;

    var projection = d3.geo.mercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2])
      .precision(0.1);

    var path = d3.geo.path()
      .projection(projection);

    var graticule = d3.geo.graticule();
    var svg = d3.select(el);

    svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

    d3.json('timezones.json', function (error, timezones) {
      if (error) { throw error; }

      path.projection(null);

      svg.insert("g", ".graticule")
        .attr("class", "timezones")
        .selectAll("path")
        .data(topojson.feature(timezones, timezones.objects.timezones).features)
        .enter().append("path")
        .attr("d", path)
        .append("title")
        .text(function (d) {
          return d.id;
        });

      svg.insert("path", ".graticule")
        .datum(topojson.mesh(timezones, timezones.objects.timezones, function (a, b) {
          return a !== b;
        }))
        .attr("class", "boundary")
        .attr("d", path);
    });

    d3.select(this.frameElement).style("height", height + "px");

  }

});
