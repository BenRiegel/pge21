//imports ----------------------------------------------------------------------

import { INIT_SELECTED_TAG } from '../../config/Config.js';
import view from '../../view/View.js';
import Option from '../../lib/components/select_menu_option/SelectMenuOption.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { selectMenu, labels, webMap } = components;

var loadOptions = function(){
  var keys = Object.keys(labels);
  for (var key of keys){
    var label = labels[key];
    var optionProps = {key, labelNode: label.rootNode};
    var option = new Option(optionProps);
    selectMenu.loadOption(key, option);
  }
};

webMap.setListener('actionStart', () => {
  selectMenu.close();
  selectMenu.disable();
});

webMap.setListener('actionEnd', () => {
  selectMenu.enable();
});

//exports ----------------------------------------------------------------------

export function load(){
  loadOptions();
  selectMenu.setSelectedOption(INIT_SELECTED_TAG);
};
