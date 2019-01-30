const gEngine = require('./gEngine');

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
`<ul style="margin:-10px">
<li>Id:${_objectNum}</li>
<li>Center: ${mAllObjects[_objectNum].mCenter.x.toPrecision(3)}, ${mAllObjects[_objectNum].mCenter.y.toPrecision(3)}</li>
<li>Angle: ${mAllObjects[_objectNum].mAngle.toPrecision(3)}</li>
</ul>`;}

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
  const mCurrentTime = Date.now();
  mElapsedTime = mCurrentTime - mPreviousTime;
  mPreviousTime = mCurrentTime;
  mLagTime += mElapsedTime;
  while (mLagTime >= kMPF) {
    mLagTime -= kMPF;
    gEngine.Physics.collision();
    update();
  }
  updateUIEcho();
  draw();
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
  }
};
module.exports = Core;
