//imports ----------------------------------------------------------------------

import OptionLabel from '../../view/components/option_label/OptionLabel.js';
import view from '../../view/View.js';
import model from '../../model/Model.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { labels } = components;


//exports ----------------------------------------------------------------------

export function load(){
  for (var tag of model.tags){
    var key = tag.name;
    var name = tag.name;
    var count = tag.count;
    var isIndented = (tag.type === 'secondary');
    var newLabel = new OptionLabel( {name, count, isIndented} );
    labels[key] = newLabel;
  }
}

export function showLabelIndents(){
  var labelList = Object.values(labels);
  for (var label of labelList){
    label.showIndent();
  }
}

export function hideLabelIndents(){
  var labelList = Object.values(labels);
  for (var label of labelList){
    label.hideIndent();
  }
}
