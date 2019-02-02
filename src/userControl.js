const gEngine = require('./EngineCore/gEngine');
const Circle = require('./RigidBody/Circle');
const Rectangle = require('./RigidBody/Rectangle');
const Vec2 = require('./Lib/Vec2');

function userControl(event) {
  const keycode = event.which;
  const width = gEngine.Core.mWidth;
  const height = gEngine.Core.mHeight;
  const context = gEngine.Core.mContext;

  if (keycode === 38) {
    if (gEngine.Core.objectNum < gEngine.Core.mAllObjects.length - 1) {
      gEngine.Core.objectNum++;
    }
  }
  if (keycode === 40) {
    if (gEngine.Core.objectNum > 0) {
      gEngine.Core.objectNum--;
    }
  }
  //wasd
  if (keycode === 87) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].move(new Vec2(0, -10));
  }
  if (keycode === 83) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].move(new Vec2(0, 10));
  }
  if (keycode === 65) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].move(new Vec2(-10, 0));
  }
  if (keycode === 68) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].move(new Vec2(10, 0));
  }
  //qe
  if (keycode === 81) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].rotate(-0.1);
  }
  if (keycode === 69) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].rotate(0.1);
  }


  //ijkl
  if (keycode === 73) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mVelocity.y++;
  }
  if (keycode === 74) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mVelocity.x--
  }
  if (keycode === 75) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mVelocity.y--
  }
  if (keycode === 76) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mVelocity.x++
  }
//uo
  if (keycode === 79) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mAngularVelocity += 0.1;
  }
  if (keycode === 85) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mAngularVelocity += 0.1;
  }
  //zx
  if (keycode === 90) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].updateMass(-1);
  }
  if (keycode === 88) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].updateMass(1);
  }

  //cv
  if (keycode === 67) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mFriction -= 0.01;
  }
  if (keycode === 86) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mFriction += 0.01;
  }

  //bn
  if (keycode === 66) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mRestitution -= 0.01;
  }
  if (keycode === 78) {
    gEngine.Core.mAllObjects[gEngine.Core.objectNum].mRestitution += 0.01;
  }

  //,
  if (keycode === 188) {
    gEngine.Core.mMovement = !gEngine.Core.mMovement;
  }

  //f
  if (keycode === 70) {
    const r1 = new Rectangle(
      new Vec2(Math.random() * width * 0.8, Math.random() * height * 0.8),
      Math.random() * 30 + 10,
      Math.random() * 30 + 10,
      Math.random() * 30, Math.random(), Math.random()
    );
  }

  //g
  if (keycode === 71) {
    const r1 = new Circle(new Vec2(Math.random() * width * 0.8, Math.random() * height * 0.8),
      Math.random() * 10 + 20,
      Math.random() * 30, Math.random(), Math.random()

    );
  }

  //h
  if (keycode === 72) {
    for (let i = 0; i < gEngine.Core.mAllObjects.length; i++) {
      if (gEngine.Core.mAllObjects[i].mInvMass !== 0) {
        gEngine.Core.mAllObjects[i].mVelocity = new Vec2(Math.random() * 20 - 10, Math.random() * 20 - 10);
      }
    }
  }
}

module.exports = userControl;
