const RigidShape = require("./RigidShape");
const Vec2 = require('../Lib/Vec2');

const Rectangle = function(center, width, height, fix) {
  RigidShape.call(this, center);
  this.mType = "Rectangle";
  this.mWidth = width;
  this.mHeight = height;
  this.mBoundRadius = Math.sqrt(width * width + height * height) / 2;
  this.mVertex = [];
  this.mFaceNormal = [];

  this.mVertex[0] = new Vec2(center.x - width / 2, center.y - height / 2);
  this.mVertex[1] = new Vec2(center.x + width / 2, center.y - height / 2);
  this.mVertex[2] = new Vec2(center.x + width / 2, center.y + height / 2);
  this.mVertex[3] = new Vec2(center.x - width / 2, center.y + height / 2);

  this.mFaceNormal.push(this.mVertex[1].subtract(this.mVertex[2]).normalize());
  this.mFaceNormal.push(this.mVertex[2].subtract(this.mVertex[3]).normalize());
  this.mFaceNormal.push(this.mVertex[3].subtract(this.mVertex[0]).normalize());
  this.mFaceNormal.push(this.mVertex[0].subtract(this.mVertex[1]).normalize());
}

var prototype = Object.create(RigidShape.prototype);
prototype.constructor = Rectangle;
Rectangle.prototype = prototype;

Rectangle.prototype.draw = function (context) {
  context.save();
  context.translate(this.mVertex[0].x, this.mVertex[0].y);
  context.rotate(this.mAngle);
  context.strokeRect(0, 0, this.mWidth, this.mHeight);
  context.restore();
}

Rectangle.prototype.move = function(s) {
  for (let i = 0; i < this.mVertex.length; i++) {
    this.mVertex[i] = this.mVertex[i].add(s);
  }
  this.mCenter = this.mCenter.add(s);
  return this;
}

Rectangle.prototype.rotate = function(angle) {
  this.mAngle += angle;
  for (let i = 0; i < this.mVertex.length; i++) {
    this.mVertex[i] = this.mVertex[i].rotate(this.mCenter, angle);
  }

  this.mFaceNormal[0] = (this.mVertex[1].subtract(this.mVertex[2]).normalize());
  this.mFaceNormal[1] = (this.mVertex[2].subtract(this.mVertex[3]).normalize());
  this.mFaceNormal[2] = (this.mVertex[3].subtract(this.mVertex[0]).normalize());
  this.mFaceNormal[3] = (this.mVertex[0].subtract(this.mVertex[1]).normalize());

  return this;
}

module.exports = Rectangle;
