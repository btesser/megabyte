'use strict';

angular.module('megabyteApp')
  .directive('three', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var render;
        var animate;
        /**
         * create effect composer
         * @type {THREE.EffectComposer}
         */
        var composer;
        /**
         * Create FXAA effect
         * @type {THREE.ShaderPass}
         */
        var effectFXAA;
        /**
         * create bloom effect
         * @type {THREE.BloomPass}
         */
        var effectBloom;
        /**
         * create film effectt
         * @type {THREE.FilmPass}
         */
        var effectFilm;
        /**
         * Create render pass
         * @type {THREE.RenderPass}
         */
        var renderModel;
        /**
         * Create Stats
         * @type {Stats}
         */
        var stats;
        /**
         * Create Renderer
         * @type {THREE.WebGLRenderer}
         */
        var renderer;
        var plane;
        /**
         * Create Group
         * @type {THREE.Object3D}
         */
        var group;
        /**
         * Create Camera
         * @type {THREE.PerspectiveCamera}
         */
        var camera;
        /**
         * Create Camera Target
         * @type {THREE.Vector3}
         */
        var cameraTarget;
        /**
         * Set Font
         * @type {string}
         */
        var font;
        /**
         * Create Scene
         * @type {THREE.Scene}
         */
        var scene;
        /**
         * Create ambient light
         * @type {THREE.AmbientLight}
         */
        var ambientLight;
        /**
         * create directional light
         * @type {THREE.DirectionalLight}
         */
        var dirLight;
        /**
         * Create Point Light
         * @type {THREE.PointLight}
         */
        var pointLight;
        var bevelEnabled;
        /**
         * Create Material
         * @type {THREE.MeshFaceMaterial}
         */
        var material,
          materialInner;
        var megabyte;
        var technology;
        var postprocessing = { enabled: false };
        function createText(text, options) {
          var textMeshInner;
          var textMesh1;
          var textGeo, textInner;
          var centerOffset;
          options = $.extend({
            size: 150,
            height:60,
            curveSegments:4,
            font: 'lily script one',
            weight: 'normal',
            style: 'normal',
            bevelThickness: 50,
            bevelSize: 8,
            bevelSegments: 20,
            bevelEnabled: 1,
            material: 0,
            extrudeMaterial: 1,
            mirror: 0
          },options);
          var options2 = $.extend({},options),
            textGroup = new THREE.Object3D();
          options2.size = options.size*.93;
          options2.height = options.height*.93;
          textGeo = new THREE.TextGeometry(text, options);
          textGeo.computeBoundingBox();
          textGeo.computeVertexNormals();
          textInner = new THREE.TextGeometry(text, options);
          textInner.computeBoundingBox();
          textInner.computeVertexNormals();
          if (!bevelEnabled) {
            var triangleAreaHeuristics = 0.1 * ( options.height * options.size );
            for (var i = 0; i < textGeo.faces.length; i++) {
              var face = textGeo.faces[ i ];
              if (face.materialIndex == 1) {
                for (var j = 0; j < face.vertexNormals.length; j++) {
                  face.vertexNormals[ j ].z = 0;
                  face.vertexNormals[ j ].normalize();
                }
                var va = textGeo.vertices[ face.a ];
                var vb = textGeo.vertices[ face.b ];
                var vc = textGeo.vertices[ face.c ];
                var s = THREE.GeometryUtils.triangleArea(va, vb, vc);
                if (s > triangleAreaHeuristics) {
                  for (var j = 0; j < face.vertexNormals.length; j++) {
                    face.vertexNormals[ j ].copy(face.normal);
                  }
                }
              }
            }
          }
          centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
          textMesh1 = new THREE.Mesh(textGeo, material);
          textMesh1.position.x = centerOffset;
          textMesh1.position.y = 0;
          textMesh1.position.z = 0;

          textMesh1.rotation.x = 0;
          textMesh1.rotation.y = 0;
          textGroup.add(textMesh1);
          textMeshInner = new THREE.Mesh(textInner, materialInner);
          textMeshInner.position.x = centerOffset;
          textMeshInner.position.y = 0;
          textMeshInner.position.z = 5;

          textMeshInner.rotation.x = 0;
          textMeshInner.rotation.y =0;
//          textGroup.add(textMeshInner);
          group.add(textGroup);

          if (options.mirror) {
            var textMesh2 = new THREE.Mesh(textGeo, material);
            textMesh2.position.x = centerOffset;
            textMesh2.position.y = -hover;
            textMesh2.position.z = height;
            textMesh2.rotation.x = Math.PI;
            textMesh2.rotation.y = Math.PI * 2;
            group.add(textMesh2);
          }
        }
        var init = function init(){
          camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
          // Set camera position
          camera.position.set(0, 200, 1300);
          cameraTarget = new THREE.Vector3(0, 150, 0);
          font = "poiret one";
          scene = new THREE.Scene();
          /**
           * Add Fog to scene
           * @type {THREE.Fog}
           */
//          scene.fog = new THREE.Fog(0x0000ff, 250, 1400);
          ambientLight = new THREE.AmbientLight(0x5f9089);
          // add ambient light to scene
          scene.add(ambientLight);
          dirLight = new THREE.DirectionalLight(0x5f9089, 10.125);
          // Set position of directional light
          dirLight.position.set(0, 0, 1).normalize();
          // Add directional light to scene
          scene.add(dirLight);
          pointLight = new THREE.PointLight(0x5f9089, 10.5);
          // Set position of point light
          pointLight.position.set(0, 100, 90);
          // Set point light color
          pointLight.color.setHSL(Math.random(), 1, 0.5);
//        pointLight.color.setHex(0x00ff00);
          // Add point light to scene
          scene.add(pointLight);
          bevelEnabled = 1;
          material = new THREE.MeshFaceMaterial([
            new THREE.MeshPhongMaterial({
              color: 0x0000ff, shading: THREE.FlatShading,
              specular: '#ffcc00',
              emissive: '#00ccff',
              shininess: 100}), // front
            new THREE.MeshPhongMaterial({ color: 0x0000ff, shading: THREE.SmoothShading }) // side
          ]);
          materialInner = new THREE.MeshFaceMaterial([
            new THREE.MeshPhongMaterial(
              { color: "#0fad87",
                specular: '#ffcc00',
                emissive: '#00ccff',
                shininess: 100,
                shading: THREE.SmoothShading}), // front
            new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.SmoothShading, wireframe: true, transparent: false, morphTargets: true, morphNormals: true}) // side
          ]);
          group = new THREE.Object3D();
          // Set Group Position
          group.position.y = 380;
          group.scale.set(.4,.4,.4);
          // Add group to scene
          scene.add(group);

          plane = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: .8, transparent: false}));
          plane.position.y = -100;
          plane.rotation.x = .5;
          plane.rotation.z = .5;
          plane.position.z = -500;
          renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
//          renderer.setClearColor(scene.fog.color, 1);
          element.append(renderer.domElement);
          stats = new Stats();
          stats.domElement.style.position = 'absolute';
          stats.domElement.style.top = '0px';
          renderer.autoClear = false;

          createText('Megabyte');

          renderModel = new THREE.RenderPass(scene, camera);
          effectBloom = new THREE.BloomPass(0.25);
          effectFilm = new THREE.FilmPass(0.5, 0.125, 2048, false);
          effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);

          var width = window.innerWidth || 2;
          var height = window.innerHeight || 2;

          effectFXAA.uniforms[ 'resolution' ].value.set(1 / width, 1 / height);

          effectFilm.renderToScreen = true;
          composer = new THREE.EffectComposer(renderer);

          composer.addPass(renderModel);
          composer.addPass(effectFXAA);
          composer.addPass(effectBloom);
          composer.addPass(effectFilm);
        };

        animate = function animate() {

          requestAnimationFrame(animate);

          render();
          stats.update();

        };
        render = function render() {
          camera.lookAt(cameraTarget);
          renderer.clear();
          renderer.setClearColor(0, 0, 0, 0);
          if (postprocessing.enabled) {
            composer.render(0.05);
          } else {
            renderer.render(scene, camera);
          }
        };
        init();
        animate();
        scope.group = group;

        var de2ra = function (degree) {
          return degree * (Math.PI / 180);
        };
        var ratio, top, maxScroll = 100, maxX = 90, maxrot = de2ra(30), lastmove, maxY =380, minY = 80;

        $(document).scroll(function (e) {
          top = $(document).scrollTop();
          $('#tridiv').css('-webkit-perspective-origin-y', (top / maxScroll)* maxX + 'px');
          group.position.z = (top / maxScroll) * maxX;
          group.rotation.x = (top / maxScroll) * maxrot * -1;

//          return console.log(group.rotation.y);
        });
      }
    };
  });
