//imports ----------------------------------------------------------------------

import view from '../../view/View.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { webMap} = components;
var { popup } = webMap;


//exports ----------------------------------------------------------------------

export function onNewSelectedOption(){
  popup.close();
}
