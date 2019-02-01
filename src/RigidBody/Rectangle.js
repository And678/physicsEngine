const RigidShape = require("./RigidShape");
const Vec2 = require('../Lib/Vec2');
const CollisionInfo = require('../Lib/CollisionInfo');


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

Rectangle.prototype.collisionTest = function (otherShape, collisionInfo) {
  if (otherShape.mType === 'Circle') {
    return false;
  } else if (otherShape.mType === 'Rectangle') {
    return this.collidedRectRect(this, otherShape, collisionInfo);
  }
  return false;
}

Rectangle.prototype.collidedRectRect = function(r1, r2, collisionInfo) {
  let status1 = false;
  let status2 = false;
  const collisionInfoR1 = new CollisionInfo();
  const collisionInfoR2 = new CollisionInfo();
  status1 = r1.findAxisLeastPenetration(r2, collisionInfoR1);
  if (status1) {
    status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
    if (status2) {
      if (collisionInfoR1.getDepth() < collisionInfoR2.getDepth()) {
        const depthVec = collisionInfoR1.getNormal().scale(collisionInfoR1.getDepth());
        collisionInfo.setInfo(collisionInfoR1.getDepth(), collisionInfoR1.getNormal(), collisionInfoR1.mStart.subtract(depthVec));
      } else {
        collisionInfo.setInfo(collisionInfoR2.getDepth(), collisionInfoR1.getNormal().scale(-1), collisionInfoR1.mStart);
      }
    }
  }
  return status1 && status2;
}

Rectangle.prototype.findSupportPoint = function (dir, ptOnEdge) {
  let vToEdge;
  let projection;
  const tmpSupport = {};

  tmpSupport.mSupportPointDist = -9999999;
  tmpSupport.mSupportPoint = null;

  for (let i = 0; i < this.mVertex.length; i++) {
    vToEdge = this.mVertex[i].subtract(ptOnEdge);
    projection = vToEdge.dot(dir);            //  Suspicious

    if ((projection > 0) && (projection > tmpSupport.mSupportPointDist)) {
      tmpSupport.mSupportPoint = this.mVertex[i];
      tmpSupport.mSupportPointDist = projection;
    }
  }
  return tmpSupport;
}

Rectangle.prototype.findAxisLeastPenetration = function (otherRect, collisionInfo) {
  let supportPoint;
  let bestDistance = 9999999;
  let bestIndex = null;
  let hasSupport = true;
  let i = 0;

  while (hasSupport && i < this.mFaceNormal.length) {
    const dir = this.mFaceNormal[i].scale(-1);
    const ptOnEdge = this.mVertex[i];

    const tmpSupport = otherRect.findSupportPoint(dir, ptOnEdge);

    hasSupport = (tmpSupport.mSupportPoint !== null);

    if (hasSupport && tmpSupport.mSupportPointDist < bestDistance) {
      bestDistance = tmpSupport.mSupportPointDist;
      bestIndex = i;
      supportPoint = tmpSupport.mSupportPoint;
    }
    i = i + 1;
  }

  if (hasSupport) {
    const bestVec = this.mFaceNormal[bestIndex].scale(bestDistance);
    collisionInfo.setInfo(bestDistance, this.mFaceNormal[bestIndex], supportPoint.add(bestVec));
  }
  return hasSupport;
}

module.exports = Rectangle;
