// describes particles that form the coastline layer
define(['./util', 'three'],
function(convert, THREE) {
    
    var layer = new THREE.Object3D();
    // debugger
    // var mesh  = new THREEx.Text('THREEx', {
    //   font        : "droid serif",
    //   weight      : "bold",
    //   size        : 1,
    //   height      : 0.4,
    // });
// debugger

    // debugger
    var geometry  = new THREE.TextGeometry( "A WORLD BROKEN BY WEALTH", {
        size: 18,
        height: 4,
        curveSegments: 0,
        font: 'helvetiker',
        //        weight: "bold",
        //       style: 'normal',
        bevelThickness: 2,
        bevelSize: 3,
        bevelEnabled: true,
        material: 0,
        extrudeMaterial: 1,
        opacity: 0.5
    });

    var logogeo  = new THREE.TextGeometry( "WORLD COUNTRY GDP, 2012", {
        size: 18,
        height: 4,
        curveSegments: 0,
        font: 'helvetiker',
        //        weight: "bold",
        //       style: 'normal',
        bevelThickness: 2,
        bevelSize: 3,
        bevelEnabled: true,
        material: 0,
        extrudeMaterial: 1,
        opacity: 0.5
    });

    var materialFront = new THREE.MeshBasicMaterial({
        color: 0x2194CE
    });
    var materialSide = new THREE.MeshBasicMaterial({
        color: 0x555555
    });
    var materialArray = [materialFront, materialSide];

    geometry.computeBoundingBox();

    var center  = new THREE.Vector3();
    center.x  = (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2
    // center.y = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2
    center.z  = (geometry.boundingBox.max.z - geometry.boundingBox.min.z) / 2
    geometry.vertices.forEach(function(vertex){
      vertex.sub(center)
    })
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    var click = new THREE.Mesh( geometry, textMaterial );
    var logo = new THREE.Mesh( logogeo, textMaterial );
    // debugger

    click.position.x = 7;
    click.position.y = 230;
    logo.position.x = -170;
    logo.position.y = -250;
    // mesh.scale.z = 20;
    layer.add(click);
    layer.add(logo);

  return {
    init: function()
    {
      return layer;
    }
  };
});

