const gEngine = require('./gEngine');
const Vec2 = require('../Lib/Vec2');

const mGravity = new Vec2(0, 10);
let mMovement = false;

const mHeight = 450;
const mWidth = 800;
let _objectNum = 0;

const mCanvas = document.getElementById('canvas');
mCanvas.height = mHeight;
mCanvas.width = mWidth;

const mContext = mCanvas.getContext('2d');
const mAllObjects = [];

function draw() {
    mContext.clearRect(0, 0, mWidth, mHeight);
    var i;
    for (i = 0; i < mAllObjects.length; i++) {
        mContext.strokeStyle = 'blue';
        if (i === _objectNum)
            mContext.strokeStyle = 'red';
        mAllObjects[i].draw(mContext);
    }
};
function updateUIEcho() {
  document.getElementById("uiEchoString").innerHTML =
                "<p><b>Selected Object:</b>:</p>" +
                "<ul style=\"margin:-10px\">" +
                "<li>Id: " + _objectNum + "</li>" +
                "<li>Center: " + mAllObjects[_objectNum].mCenter.x.toPrecision(3) + "," + mAllObjects[_objectNum].mCenter.y.toPrecision(3) + "</li>" +
                "<li>Angle: " + mAllObjects[_objectNum].mAngle.toPrecision(3) + "</li>" +
                "<li>Velocity: " + mAllObjects[_objectNum].mVelocity.x.toPrecision(3) + "," + mAllObjects[_objectNum].mVelocity.y.toPrecision(3) + "</li>" +
                "<li>AngluarVelocity: " + mAllObjects[_objectNum].mAngularVelocity.toPrecision(3) + "</li>" +
                "<li>Mass: " + 1 / mAllObjects[_objectNum].mInvMass.toPrecision(3) + "</li>" +
                "<li>Friction: " + mAllObjects[_objectNum].mFriction.toPrecision(3) + "</li>" +
                "<li>Restitution: " + mAllObjects[_objectNum].mRestitution.toPrecision(3) + "</li>" +
                "<li>Movement: " + gEngine.Core.mMovement + "</li>" +
                "</ul> <hr>" +
                "<p><b>Control</b>: of selected object</p>" +
                "<ul style=\"margin:-10px\">" +
                "<li><b>Num</b> or <b>Up/Down Arrow</b>: Select Object</li>" +
                "<li><b>WASD</b> + <b>QE</b>: Position [Move + Rotate]</li>" +
                "<li><b>IJKL</b> + <b>UO</b>: Velocities [Linear + Angular]</li>" +
                "<li><b>Z/X</b>: Mass [Decrease/Increase]</li>" +
                "<li><b>C/V</b>: Frictrion [Decrease/Increase]</li>" +
                "<li><b>B/N</b>: Restitution [Decrease/Increase]</li>" +
                "<li><b>,</b>: Movement [On/Off]</li>" +
                "</ul> <hr>" +
                "<b>F/G</b>: Spawn [Rectangle/Circle] at selected object" +
                "<p><b>H</b>: Excite all objects</p>" +
                "<p><b>R</b>: Reset System</p>" +
"<hr>"

}

function update() {
  for (let i = 0; i < mAllObjects.length; i++) {
    mAllObjects[i].update(mContext);
  }
};


let mElapsedTime, mPreviousTime = Date.now(), mLagTime = 0;
let kFPS = 60;
let kFrameTime = 1 / kFPS;
let mUpdateIntervalInSeconds = kFrameTime;
let kMPF = 1000 * kFrameTime;

function runGameLoop() {
  requestAnimationFrame(function() {
    runGameLoop();
  });
  updateUIEcho();
  draw();
  const mCurrentTime = Date.now();
  mElapsedTime = mCurrentTime - mPreviousTime;
  mPreviousTime = mCurrentTime;
  mLagTime += mElapsedTime;
  while (mLagTime >= kMPF) {
    mLagTime -= kMPF;
    gEngine.Physics.collision();
    update();
  }
}
function initializeEngineCore() {
  runGameLoop();
};

const Core = {
  initializeEngineCore,
  mAllObjects,
  mWidth,
  mHeight,
  mContext,
  set objectNum(val) {
    _objectNum = val;
  },
  get objectNum() {
    return _objectNum;
  },
  mGravity,
  mMovement,
  mUpdateIntervalInSeconds
};
module.exports = Core;
