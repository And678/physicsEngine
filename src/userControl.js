const gEngine = require('./EngineCore/gEngine');
const Circle = require('./RigidBody/Circle');
const Vec2 = require('./Lib/Vec2');

let gObjectNum = 0;
function userControl(event) {
  const keycode = event.which;
  const width = gEngine.Core.mWidth;
  const height = gEngine.Core.mHeight;
  const context = gEngine.Core.mContext;

  if (keycode === 70) {
    const r1 = new Rectangle(
      new Vec2(Math.random() * width * 0.8, Math.random() * height * 0.8),
      Math.random() * 30 + 10,
      Math.random() * 30 + 10);
  }

  if (keycode === 71) {
    const r1 = new Circle(new Vec2(Math.random() * width * 0.8, Math.random() * height * 0.8),
      Math.random() * 10 + 20);
  }

  if (keycode >= 48 && keycode <= 57) {
    gObjectNum = keycode - 48;
  }

  if (keycode === 38) {
    if (gObjectNum) {
      gObjectNum--;
    }
  }

  if (keycode === 40) {
    if (gObjectNum < gEngine.Core.mAllObjects.length - 1) {
      gObjectNum++;
    }
  }
  //wasd
  if (keycode === 87) {
    gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(0, -10));
  }
  if (keycode === 83) {
    gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(0, 10));
  }
  if (keycode === 65) {
    gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(-10, 0));
  }
  if (keycode === 68) {
    gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(10, 0));
  }
  //qeh
  if (keycode === 81) {
    gEngine.Core.mAllObjects[gObjectNum].rotate(-0.1);
  }
  if (keycode === 69) {
    gEngine.Core.mAllObjects[gObjectNum].rotate(0.1);
  }
  if (keycode === 72) {
    gEngine.Core.mAllObjects[gObjectNum].mFix = !gEngine.Core.mAllObjects[gObjectNum].mFix;
  }
}

module.exports = userControl;
