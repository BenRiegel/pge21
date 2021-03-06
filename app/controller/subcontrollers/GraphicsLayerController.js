//imports ----------------------------------------------------------------------

import Graphic from '../../lib/components/graphic/Graphic.js';
import { getDistance } from '../../lib/utils/Utils.js';
import { INIT_SELECTED_TAG } from '../../config/Config.js';
import { latLonToWebMercatorXY } from '../../lib/web_mapping/WebMercator.js';
import view from '../../view/View.js';
import model from '../../model/Model.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { webMap } = components;
var { graphicsLayer } = webMap;

const MIN_POINT_RADIUS = 10;
const MAX_POINT_RADIUS = 20;

var locations;
var filteredLocations;

var getLocations = function(){
  var locationsList = [];
  for (var project of model.projects){
    var attributes = Object.assign({}, project);
    delete attributes.id;
    delete attributes.geoCoords;
    delete attributes.tags;
    var location = {
      id: project.id,
      worldCoords: latLonToWebMercatorXY(project.geoCoords),
      tags: project.tags,
      hasSelectedTag: undefined,
      attributes,
    };
    locationsList.push(location);
  }
  return locationsList;
};

var filterLocations = function(selectedOptionKey){
  return locations.filter(location => {
    return location.tags.includes(selectedOptionKey);
  });
};

var createGraphics = function(scale){
  var graphics = [];
  var mappedLocations = [...filteredLocations];
  var location = mappedLocations.shift();
  var graphicId = 0;
  while(location){
    var graphicProps = {
      attributes: location.attributes,
      id: graphicId,
      type: 'point',
      worldCoords: {x:location.worldCoords.x, y:location.worldCoords.y},
      numLocations: 1,
      diameter: 0,
      renderedRadius: MIN_POINT_RADIUS,
      minDiameter: MIN_POINT_RADIUS * 2,
    };
    var sumX = location.worldCoords.x;
    var sumY = location.worldCoords.y;
    var clusteredPoints = [location.worldCoords];
    var done = false;
    while (!done){
      var clusterFound = false;
      for (var compareLocation of mappedLocations){
        var thresholdDistance = (graphicProps.renderedRadius + MIN_POINT_RADIUS) * scale;
        var distance = getDistance(graphicProps.worldCoords, compareLocation.worldCoords);
        if (distance < thresholdDistance){
          clusterFound = true;
          clusteredPoints.push(compareLocation.worldCoords);
          graphicProps.type = 'cluster';
          graphicProps.attributes = null;
          graphicProps.numLocations += 1;
          sumX += compareLocation.worldCoords.x;
          sumY += compareLocation.worldCoords.y;
          graphicProps.worldCoords.x = sumX / graphicProps.numLocations;
          graphicProps.worldCoords.y = sumY / graphicProps.numLocations;
          for (var clusteredPoint of clusteredPoints){
            var pointRadius = getDistance(graphicProps.worldCoords, clusteredPoint) / scale;
            graphicProps.diameter = Math.max(graphicProps.diameter, pointRadius * 2);
            graphicProps.renderedRadius = Math.max(graphicProps.renderedRadius, pointRadius);
          }
          graphicProps.renderedRadius = Math.min(graphicProps.renderedRadius, MAX_POINT_RADIUS);
          graphicProps.diameter = Math.min(graphicProps.diameter, MAX_POINT_RADIUS * 2);
          graphicProps.minScaleFactor = MIN_POINT_RADIUS / graphicProps.renderedRadius;
          mappedLocations = mappedLocations.filter(location => location !== compareLocation);
          break;
        }
      }
      done = !clusterFound;
    }
    var graphic = new Graphic(graphicProps);
    graphics.push(graphic);
    location = mappedLocations.shift();
    graphicId += 1;
  }
  return graphics;
};


//exports ----------------------------------------------------------------------

export async function load(){
  await webMap.hasRendered;
  locations = getLocations();
  filteredLocations = filterLocations(INIT_SELECTED_TAG);
  graphicsLayer.updateGraphics();
}

export function onNewSelectedOption(selectedOptionKey){
  filteredLocations = filterLocations(selectedOptionKey);
  graphicsLayer.updateGraphics();
}

export function onGraphicsUpdateRequest(scale){
  graphicsLayer.unselectGraphic();
  graphicsLayer.removeAllGraphics();
  var graphics = createGraphics(scale);
  graphicsLayer.addGraphics(graphics);
}
