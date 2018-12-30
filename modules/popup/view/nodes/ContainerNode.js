//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'popup-container');

  //public api -----------------------------------------------------------------

  this.node = container.node;

}
