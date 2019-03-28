export default function PopupEmitterController(emitter, dispatcher){

  //define event reactions -----------------------------------------------------

  var onOpen = function(){
    emitter.notify('open');
  }

  var onClose = function(){
    emitter.notify('closed');
  }

  var onActionInProgress = function(actionInProgress){
    if (actionInProgress){
      emitter.notify('actionStart');
    } else {
      emitter.notify('actionEnd');
    }
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('public', 'open', onOpen);
  dispatcher.setListener('public', 'close', onClose);
  dispatcher.setListener('public', 'contractAndClose', onClose);
  dispatcher.setListener('dispatcher', 'actionInProgress', onActionInProgress);

}