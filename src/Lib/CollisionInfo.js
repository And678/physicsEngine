const Vec2 = require('./Vec2');

function CollisionInfo() {
  this.mDepth = 0;
  this.mNormal = new Vec2(0, 0);
  this.mStart = new Vec2(0, 0);
  this.mEnd = new Vec2(0, 0);
};

CollisionInfo.prototype.setNormal = function(s) {
  this.mNormal = new Vec2(0, 0);
};

CollisionInfo.prototype.getNormal = function() {
  return this.mNormal;
};

CollisionInfo.prototype.getDepth = function() {
  return this.mDepth;
};

CollisionInfo.prototype.setInfo = function(d, n, s) {
  this.mDepth = d;
  this.mNormal = n;
  this.mStart = s;
  this.mEnd = s.add(n.scale(d));
};

CollisionInfo.prototype.changeDir = function() {
  this.mNormal = this.mNormal.scale(-1);
  const n = this.mStart;
  this.mStart = this.mEnd;
  this.mEnd = n;
}

module.exports = CollisionInfo;
