export function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}

export function wait(time){
  return new Promise( resolve => {
    setTimeout(resolve, time);
  });
}

export function waitAtLeast(minTime, callback){
  var waitPromise = wait(minTime);
  var callbackPromise = callback();
  return Promise.all( [waitPromise, callbackPromise] );
}

export function getDistance(p1, p2){
  return Math.sqrt( (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y) );
}

export function easeInOut(frameNum, numFrames){
  var rad = frameNum / numFrames * Math.PI;
  var percent = (1 - Math.cos(rad)) / 2;
  return Math.pow(percent, 1);
}

export function getTargetNode(node, className){
  while (node){
    if (node.classList && node.classList.contains(className)){
      return node;
    }
    node = node.parentNode;
  }
  return null;
}

export function doForAll(objs, methodName, ...args){
  for (var obj of objs){
    obj[methodName](...args);
  }
}

export function doForAllAsync(objs, methodName, ...args){
  var promises = [];
  for (var obj of objs){
    var p = obj[methodName](...args);
    promises.push(p);
  }
  return Promise.all(promises);
}

export function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}
