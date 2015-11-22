var Scene = boxer.core.Scene;
var Node = boxer.core.Node;
var controller, view, scroller;
var nodes = [];
var currentPosition = 0;
var lastPosition = 0;

controller = new ViewController([], Scene);

view = controller.addComponent({
    size : [1.0,1.0,1],
    translate: [0, 0, 1],
    rotate: [0.0,0,0],
    id: 'app-scrollview',
    opacity : 1.0
});

scroller = controller.addComponent({
    size : [1.0,1.0,1],
    translate: [0, 0, 1],
    rotate: [0.0,0,0],
    id: 'app-scroller',
    opacity : 1.0
},'div', view.elem);

// Add 180 Nodes to the Scene.
for( var i=0; i<180; i++ ){
    controller.addComponent({
        size : [0.9,240,1],
        translate: [window.innerWidth*0.025, 0, 0],
        id: 'node-'+i,
        opacity : 1.0,
        classes:['app-card', 'dark-white-bg']
    },'div', scroller.elem);
};


scroller.sync(['mousewheel'], function(ev){

  ev.preventDefault();

  lastPosition = currentPosition;
  currentPosition -= ev.deltaY;
  controller.transition('app-scroller',{
      key: 'translate',
      from: [0,lastPosition,1],
      to: [0,currentPosition,1],
      curve: 'linear',
      duration: 100,
      delay: 0
  });

  //TODO: constrain movement, build sync class

});
