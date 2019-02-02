const Vec2 = require('../Lib/Vec2');
const gEngine = require('../EngineCore/gEngine');

function RigidShape(center, mass, friction, restitution) {
  this.mCenter = center;

  this.mInertia = 0;

  if (mass !== undefined) {
    this.mInvMass = mass;
  } else {
    this.mInvMass = 1;
  }

  if (friction !== undefined) {
    this.mFriction = friction;
  } else {
    this.mFriction = 0.8;
  }

  if (restitution !== undefined) {
    this.mRestitution = restitution;
  } else {
    this.mRestitution = 0.2;
  }

  this.mVelocity = new Vec2(0, 0);
  if (this.mInvMass !== 0) {
    this.mInvMass = 1 / this.mInvMass;
    this.mAcceleration = gEngine.Core.mGravity;
  } else {
    this.mAcceleration = new Vec2(0, 0);
  }

  this.mAngle = 0;
  this.mAngularVelocity = 0;
  this.mAngularAcceleration = 0;
  this.mBoundRadius = 0;  // may be not needed
  gEngine.Core.mAllObjects.push(this);
}

RigidShape.prototype.updateMass = function (delta) {
  let mass;
  if (this.mInvMass !== 0) {
    mass = 1 / this.mInvMass
  } else {
    mass = 0;
  }

  mass += delta;

  if (mass <= 0) {
    this.mInvMass = 0;
    this.mVelocity = new Vec2(0, 0);
    this.mAcceleration = new Vec2(0, 0);
    this.mAngularVelocity = 0;
    this.mAngularAcceleration = 0;
  } else {
    this.mInvMass = 1 / mass;
    this.mAcceleration = gEngine.Core.mGravity;
  }
  this.updateInertia();
}
RigidShape.prototype.updateInertia = function() {
  // defined in subclasses
}
RigidShape.prototype.update = function() {
  if (gEngine.Core.mMovement) {
    const dt = gEngine.Core.mUpdateIntervalInSeconds;

    this.mVelocity = this.mVelocity.add(this.mAcceleration.scale(dt));

    this.move(this.mVelocity.scale(dt));

    this.mAngularVelocity += this.mAngularAcceleration * dt;
    this.rotate(this.mAngularVelocity * dt);
  }
};

RigidShape.prototype.boundTest = function(otherShape) {
  const centerDistance = otherShape.mCenter.subtract(this.mCenter);
  const rSum = this.mBoundRadius + otherShape.mBoundRadius;
  return centerDistance.length() <= rSum;
}

module.exports = RigidShape;
