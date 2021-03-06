export default function BasemapTileViewController(props, view){

  var { nodes } = view;
  var { root } = nodes;

  //helper functions -----------------------------------------------------------

  const TILE_SIZE_PX = 256;

  var setScreenCoords = function(){
    var xScreen = props.xPos * TILE_SIZE_PX;
    var yScreen = props.yPos * TILE_SIZE_PX;
    root.setScreenCoords(xScreen, yScreen);
  };

  var updateIndices = function( {xIndex, yIndex, imageTileLevel} ){
    return root.setIndices(xIndex, yIndex, imageTileLevel);
  };

  var updateVisibility = function( {isVisible} ){
    if (isVisible){
      root.setStyle('visibility', 'visible');
    } else {
      root.setStyle('visibility', 'hidden');
    }
  };

  //init -----------------------------------------------------------------------

  setScreenCoords();

  //public api -----------------------------------------------------------------

  this.render = function(info){
    updateVisibility(info);
    if (info.isVisible){
      return updateIndices(info);
    }
  };

}
