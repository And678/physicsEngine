const gEngine = require('./gEngine');
const CollisionInfo = require('../Lib/CollisionInfo');

function drawCollisionInfo(collisionInfo, context) {
  context.beginPath();
  context.moveTo(collisionInfo.mStart.x, collisionInfo.mStart.y);
  context.lineTo(collisionInfo.mEnd.x, collisionInfo.mEnd.y);
  context.closePath();
  context.strokeStyle = 'orange';
  context.stroke();
}

module.exports = {
    collision() {
      const collisionInfo = new CollisionInfo();
      for (let i = 0; i < gEngine.Core.mAllObjects.length; i++) {
        for (let j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
          if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
            if (gEngine.Core.mAllObjects[i].collisionTest(gEngine.Core.mAllObjects[j], collisionInfo)) {
              // ensure direction from object[i] to onbject[j]
              if (collisionInfo.getNormal().dot(gEngine.Core.mAllObjects[j].mCenter.subtract(gEngine.Core.mAllObjects[i].mCenter)) < 0) {
                collisionInfo.changeDir();
              }
              drawCollisionInfo(collisionInfo, gEngine.Core.mContext);
            }
          }
        }
      }
    }
};
