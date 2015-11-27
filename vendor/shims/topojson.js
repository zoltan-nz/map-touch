(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['topojson'] };
  }

  define('topojson', [], vendorModule);
})();
