export default class DomNode{

  constructor(type, className = ''){
    this.node = document.createElement(type);
    this.node.className = className;
  }

  set className(className){
    this.node.className = className;
  }

  set innerHTML(innerHTML){
    this.node.innerHTML = innerHTML;
  }

  set href(url){
    this.node.href = url;
  }

  setDatasetProp(propName, value){
    this.node.dataset[propName] = value;
  }

  setStyle(styleName, value){
    this.node.style[styleName] = value;
  }

  addClass(className){
    this.node.classList.add(className);
  }

  removeClass(className){
    this.node.classList.remove(className);
  }

  removeAllChildNodes(){
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
  }

  appendChildNode(childNode){
    this.node.appendChild(childNode);
  }

  appendChildNodes(childNodes){
    var docFragment = document.createDocumentFragment();
    for (var childNode of childNodes){
      docFragment.appendChild(childNode);
    }
    this.node.appendChild(docFragment);
  }

  setSrc(src){
    if (this.node.src !== src){
      return new Promise(resolve => {
        var contentLoaded = () => {
          this.node.removeEventListener('load', contentLoaded);
          resolve();
        };
        this.node.addEventListener('load', contentLoaded);
        this.node.src = src;
      });
    }
  }

  setProp(propName, value){
    this.node[propName] = value;
  }

  getProp(propName){
    return this.node[propName];
  }

  getDimensions(){
    return this.node.getBoundingClientRect();
  }

}
