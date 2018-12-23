//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function TextNode(){

  //create dom element ---------------------------------------------------------

  var text = new DomElement('span', 'project-text');

  //define state change reactions ----------------------------------------------

  var updateContent = function(){
    text.innerHTML = popupState.projectData.introText + ' . . .';
  }

  //load reactions -------------------------------------------------------------

  // popupState.addListener('projectData', 'text', 'content', updateContent)

  //public api -----------------------------------------------------------------

  this.node = text.node;

  this.setContent = function(projectText){
    text.innerHTML = projectText;
  }

  this.render = function(){
    updateContent();
  };

}
