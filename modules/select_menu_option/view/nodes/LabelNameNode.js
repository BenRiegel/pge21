//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function LabelNameNode(name){

  //create dom element ---------------------------------------------------------

  var labelName = new DomElement('div', 'tag-name');
  labelName.innerHTML = name;

  //public api -----------------------------------------------------------------

  this.node = labelName.node;

}