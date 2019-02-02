const RigidShape = require("./RigidShape");
const Vec2 = require('../Lib/Vec2');

const Circle = function(center, radius, fix) {
  RigidShape.call(this, center);
  this.mBoundRadius = radius;
  this.mType = "Circle";
  this.mRadius = radius;

  this.mStartpoint = new Vec2(center.x, center.y - radius);
};

var prototype = Object.create(RigidShape.prototype);
prototype.constructor = Circle;
Circle.prototype = prototype;
Circle.prototype.draw = function(context) {
  context.beginPath();
  context.arc(this.mCenter.x, this.mCenter.y, this.mRadius, 0, Math.PI * 2, true);

  context.moveTo(this.mStartpoint.x, this.mStartpoint.y);
  context.lineTo(this.mCenter.x, this.mCenter.y);

  context.closePath();
  context.stroke();
}

Circle.prototype.move = function(s) {
  this.mStartpoint = this.mStartpoint.add(s);
  this.mCenter = this.mCenter.add(s);
  return this;
}

Circle.prototype.rotate = function(angle) {
  this.mAngle += angle;
  this.mStartpoint = this.mStartpoint.rotate(this.mCenter, angle);
  return this;
}

Circle.prototype.collisionTest = function (otherShape, collisionInfo) {
  if (otherShape.mType === 'Circle') {
    return this.collidedCircCirc(this, otherShape, collisionInfo);
  }
  if (otherShape.mType === 'Rectangle') {
    return otherShape.collidedRectCirc(this, collisionInfo);
  }
  return false;
}

Circle.prototype.collidedCircCirc = function(c1, c2, collisionInfo) {
  const vFrom1To2 = c2.mCenter.subtract(c1.mCenter);

  const rSum = c1.mRadius + c2.mRadius;
  const dist = vFrom1To2.length();
  if (dist > Math.abs(rSum)) {
    return false;
  }

  if (dist !== 0) {
    const normal2To1 = vFrom1To2.scale(-1).normalize();
    const radiusC2 = normal2To1.scale(c2.mRadius);
    collisionInfo.setInfo(rSum - dist, vFrom1To2.normalize(), c2.mCenter.add(radiusC2));
  }
  else {
    if (c1.mRadius > c2.mRadius) {
      collisionInfo.setInfo(rSum, new Vec2(0, -1), c1.mCenter.add( new Vec2(0, c1.mRadius)));
    } else {
      collisionInfo.setInfo(rSum, new Vec2(0, -1), c2.mCenter.add( new Vec2(0, c2.mRadius)));
    }
  }
  return true
}

module.exports = Circle;
