// describes particles that form the coastline layer
define(['./util', './data/countries', 'three', './data/Map3DGeometry'],
function(convert, countries, THREE, Map3DGeometry) {
    
    var layer = new THREE.Object3D();
    var factor = 205;
    
    layer.scale.set(factor, factor, factor);

    var polygons = Object.keys(countries).map(function(name)
    {
      var country = countries[name];
      var gdp = parseInt(countries[name].data.gdp);
      var geometry = new Map3DGeometry(country, 0.99);
      var gdpScale = gdp / 10000;
      if (gdpScale < 1 && gdpScale > 0.6) {
          geometry.scaleRatio = gdpScale;
      } else if (gdpScale > 1 && gdpScale < 1.5 ) {
          geometry.scaleRatio = 1.05;
      } else if (gdpScale > 1.5 && gdpScale < 3 ) {
          geometry.scaleRatio = 1.1;
      } else if (gdpScale > 3) {
          geometry.scaleRatio = 1.15;
      } else if (gdpScale < 0.5 || isNaN(gdpScale)) {
          geometry.scaleRatio = 0.6;
      }
      geometry.name = name;
      geometry.gdp = gdp;
      var colour = gdp * 0xffffff;
      var material = new THREE.MeshPhongMaterial({ 
        // wireframe: true,
        transparent: true,
        wrapAround: true,
        color: colour, 
        specularity: 0x111111,
        opacity: 1
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.scale.x = 1.0
      mesh.scale.y = 1.0
      mesh.scale.z = 1.0 
      layer.add( mesh )
      return mesh;
    });

  return {
    init: function()
    {
      return layer;
    },
    getGeometryByName: function getGeometryByName(name)
    {
      return polygons[Object.keys(countries).indexOf(name)];
    },
    getGeometryByIndex: function getGeometryByIndex(index)
    {
      return polygons[index]
    }
  };
});

