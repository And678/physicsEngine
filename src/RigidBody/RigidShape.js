const Vec2 = require('../Lib/Vec2');
const gEngine = require('../EngineCore/gEngine');

function RigidShape(center) {
  this.mCenter = center;
  this.mAngle = 0;
  this.mBoundRadius = 0;
  gEngine.Core.mAllObjects.push(this);
}

RigidShape.prototype.update = function() {
};

RigidShape.prototype.boundTest = function(otherShape) {
  const centerDistance = otherShape.mCenter.subtract(this.mCenter);
  const rSum = this.mBoundRadius + otherShape.mBoundRadius;
  return centerDistance.length() <= rSum;
}

module.exports = RigidShape;
