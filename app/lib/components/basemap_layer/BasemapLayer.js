//imports ----------------------------------------------------------------------

import Dispatcher from '../../utils/Dispatcher.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayer(webMapModel){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var emitter = new Emitter();
  var model = new Model;
  var view = new View();
  var controller = new Controller(dispatcher, emitter, model, view, webMapModel)

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setEventListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.enable = function(){
    dispatcher.enable();
  };

  this.disable = function(){
    dispatcher.disable();
  };

  this.configure = function(mapDimensions){
    return dispatcher.newAsyncAction('configure', mapDimensions);
  }

  this.updateOnPan = function(cumulativePan){
    dispatcher.newAction('pan', cumulativePan);
  };

  this.updateOnZoom = function(cumulativePan, scaleFactor){
    dispatcher.newAction('zoom', cumulativePan, scaleFactor);
  };

  this.updateOnZoomEnd = function(){
    return dispatcher.newAsyncAction('zoomEnd');
  };

  this.updateOnPanEnd = function(){
    return dispatcher.newAsyncAction('panEnd');
  }

  this.fadeDown = function(){
    return dispatcher.newAsyncAction('fadeDown');
  }

  this.fadeUp = function(){
    return dispatcher.newAsyncAction('fadeUp');
  }

  this.updateOnZoomHome = function(){
    return dispatcher.newAsyncAction('zoomHome');
  }

}
