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

module.exports = Circle;
