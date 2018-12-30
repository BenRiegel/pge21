//imports ----------------------------------------------------------------------

import ZoomButtonState from './state/ZoomButtonState.js';
import ZoomButtonEmitter from './services/ZoomButtonEmitter.js';
import ZoomButtonView from './view/ZoomButtonView.js';


//exports ----------------------------------------------------------------------

export default function ZoomButton(buttonProps, controlsState){

  //private code block ---------------------------------------------------------

  var buttonState = new ZoomButtonState();
  var eventsEmitter = new ZoomButtonEmitter(buttonState);
  var view = new ZoomButtonView(controlsState, buttonState, buttonProps);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener;

}
