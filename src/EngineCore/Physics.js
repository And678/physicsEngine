const gEngine = require('./gEngine');
const CollisionInfo = require('../Lib/CollisionInfo');

const mPositionalCorrectionFlag = true;
const mRelaxationCount = 3;
const mPosCorrectionRate = 0.8;

function drawCollisionInfo(collisionInfo, context) {
  context.beginPath();
  context.moveTo(collisionInfo.mStart.x, collisionInfo.mStart.y);
  context.lineTo(collisionInfo.mEnd.x, collisionInfo.mEnd.y);
  context.closePath();
  context.strokeStyle = 'orange';
  context.stroke();
}

function resolveCollision(s1, s2, collisionInfo) {
  if ((s1.mInvMass === 0) && (s2.mInvMass === 0)) {
    return;
  }

  if (mPositionalCorrectionFlag) {
    posiotionalCorrection(s1, s2, collisionInfo);
  }
  const n = collisionInfo.getNormal();
  const v1 = s1.mVelocity;
  const v2 = s2.mVelocity;
  const relativeVelocity = v2.subtract(v1);

  //relative velocity in normal direction
  const rVelocityInNormal = relativeVelocity.dot(n);


  if (rVelocityInNormal > 0) {
      //already moving apart
      return;
  }

  const newRestitution = Math.min(s1.mRestitution, s2.mRestitution);
  const newFriction = Math.min(s1.mFriction, s2.mFriction);

  // impulse along normal
  const jN = -(1 + newRestitution) * rVelocityInNormal / (s1.mInvMass + s2.mInvMass);

  const impulse = n.scale(jN);

  s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
  s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));

  const tangent = relativeVelocity
    .subtract(n.scale(relativeVelocity.dot(n)))
    .normalize()
    .scale(-1);

  //impulse along tangent
  let jT = -(1 + newRestitution) * relativeVelocity.dot(tangent) * newFriction  / (s1.mInvMass + s2.mInvMass);

  if (jT > jN) jT = jN;

  const tImpulse = tangent.scale(jT);

  s1.mVelocity = s1.mVelocity.subtract(tImpulse.scale(s1.mInvMass));
  s2.mVelocity = s2.mVelocity.add(tImpulse.scale(s2.mInvMass));
}

function posiotionalCorrection(s1, s2, collisionInfo) {
  const num = collisionInfo.getDepth() / (s1.mInvMass + s2.mInvMass) * mPosCorrectionRate;
  const correctionAmount = collisionInfo.getNormal().scale(num);

  s1.move(correctionAmount.scale(-s1.mInvMass));
  s2.move(correctionAmount.scale(s2.mInvMass));
}

module.exports = {
    collision() {
      const collisionInfo = new CollisionInfo();
      for (let k = 0; k < mRelaxationCount; k++) {
        for (let i = 0; i < gEngine.Core.mAllObjects.length; i++) {
          for (let j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
            if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
              if (gEngine.Core.mAllObjects[i].collisionTest(gEngine.Core.mAllObjects[j], collisionInfo)) {
                // ensure direction from object[i] to onbject[j]
                if (collisionInfo.getNormal().dot(gEngine.Core.mAllObjects[j].mCenter.subtract(gEngine.Core.mAllObjects[i].mCenter)) < 0) {
                  collisionInfo.changeDir();
                }
                //drawCollisionInfo(collisionInfo, gEngine.Core.mContext);
                resolveCollision(gEngine.Core.mAllObjects[i], gEngine.Core.mAllObjects[j], collisionInfo);
              }
            }
          }
        }
      }
    }
};
