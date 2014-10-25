var render_visualization = function () {
  Physics(function (world) {
    // alert(window.innerWidth)
    // alert(window.innerHeight)

      var viewWidth = window.innerWidth
          ,viewHeight = 550
          // bounds of the window
          ,viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
          ,edgeBounce
          ,renderer
          ;

      // create a renderer
      renderer = Physics.renderer('canvas', {
          el: 'asteroid'
          ,width: viewWidth
          ,height: viewHeight
      });

      // add the renderer
      world.add(renderer);
      // render on each step
      world.on('step', function () {
          world.render();
      });

      // constrain objects to these bounds
      edgeBounce = Physics.behavior('edge-collision-detection', {
          aabb: viewportBounds
          ,restitution: 0.99
          ,cof: 0.8
      });

      // resize events
      window.addEventListener('resize', function () {

          viewWidth = window.innerWidth;
          viewHeight = window.innerHeight;

          renderer.el.width = viewWidth;
          renderer.el.height = viewHeight;

          viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
          // update the boundaries
          edgeBounce.setAABB(viewportBounds);

      }, true);

      // create some bodies
      world.add( Physics.body('circle', {
          x: viewWidth / 2
          ,y: viewHeight / 2 - 240
          ,vx: -0.15
          ,mass: 0.000001
          ,radius: 30
          ,styles: {
              fillStyle: 'blue'
              ,angleIndicator: '#72240d'
          }
      }));

      world.add( Physics.body('circle', {
          x: viewWidth / 2
          ,y: viewHeight / 2
          ,radius: 50
          ,mass: 20
          ,vx: 0.000
          ,vy: 0
          ,styles: {
              fillStyle: 'red'
              ,angleIndicator: '#3b3e6b'
          }
      }));

      // Adding projectile

      // projectile = Physics.body('circle', {
      //     x: 0
      //     ,y: 200
      //     ,vx: 0.5
      //     ,mass: 0.00001
      //     ,radius: 15
      //     ,restitution: 0.5
      //     ,angularVelocity: 0
      //     ,label: 'bullet'
      //     ,styles: {
      //         fillStyle: '#d33682'
      //         ,angleIndicator: '#751b4b'
      //     }
      // });

      // setTimeout(function(){

      //     world.add( projectile );

      // }, 2000);
      
    projectile = Physics.body('circle', {
          x: 0
          ,y: 100
          ,vx: 0.4
          ,mass: 0.00001
          ,radius: 12
          ,restitution: 0.5
          ,angularVelocity: 0
          ,label: 'bullet'
          ,styles: {
              fillStyle: '#d33682'
              ,angleIndicator: '#751b4b'
          }
      });

      world.add( projectile );
      
      // setInterval(function() {

      //   projectile = Physics.body('circle', {
      //       x: 0
      //       ,y: 200
      //       ,vx: 0.3
      //       ,mass: 0.00001
      //       ,radius: 15
      //       ,restitution: 0.5
      //       ,angularVelocity: 0
      //       ,label: 'bullet'
      //       ,styles: {
      //           fillStyle: '#d33682'
      //           ,angleIndicator: '#751b4b'
      //       }
      //   });

      //   world.add( projectile );
      //     console.log("setinterval working")

      // }, 5050);

      // add some fun interaction
      var attractor = Physics.behavior('attractor', {
          order: 0,
          strength: .002
      });
      world.on({
          'interact:poke': function( pos ){
              attractor.position( pos );
              world.add( attractor );
          }
          ,'interact:move': function( pos ){
              attractor.position( pos );
          }
          ,'interact:release': function(){
              world.remove( attractor );
          }
      });

      // add things to the world
      world.add([
          Physics.behavior('interactive', { el: renderer.el })
          ,Physics.behavior('newtonian', { strength: .5 })
          ,Physics.behavior('body-impulse-response')
          // ,edgeBounce
      ]);

      // subscribe to ticker to advance the simulation
      Physics.util.ticker.on(function( time ) {
          world.step( time );
      });

      // start the ticker
      Physics.util.ticker.start();
  });

} 


render_visualization()

setInterval(function(){
  render_visualization()
  }, 8000)
