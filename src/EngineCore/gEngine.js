const gEngine = {};
gEngine.Core = (function () {
  const mHeight = 450;
  const mWidth = 800;

  const mCanvas = document.getElementById('canvas');
  const mContext = mCanvas.getContext('2d');
  mCanvas.height = mHeight;
  mCanvas.width = mWidth;

  const mAllObjects = [];
  var draw = function () {
      mContext.clearRect(0, 0, mWidth, mHeight);
      var i;
      for (i = 0; i < mAllObjects.length; i++) {
          mContext.strokeStyle = 'blue';
          if (i === gObjectNum)
              mContext.strokeStyle = 'red';
          mAllObjects[i].draw(mContext);
      }
  };
  const updateUIEcho = function() {
    document.getElementById("uiEchoString").innerHTML =
`<ul style="margin:-10px">
  <li>Id:${gObjectNum}</li>
  <li>Center: ${mAllObjects[gObjectNum].mCenter.x.toPrecision(3)}, ${mAllObjects[gObjectNum].mCenter.y.toPrecision(3)}</li>
  <li>Angle: ${mAllObjects[gObjectNum].mAngle.toPrecision(3)}</li>
</ul>`;}

  const update = function() {
    for (let i = 0; i < mAllObjects.length; i++) {
      mAllObjects[i].update(mContext);
    }
  };


  let mElapsedTime, mPreviousTime = Date.now(), mLagTime = 0;
  let kFPS = 60;
  let kFrameTime = 1 / kFPS;
  let mUpdateIntervalInSeconds = kFrameTime;
  let kMPF = 1000 * kFrameTime;

  const runGameLoop = function() {
    requestAnimationFrame(function() {
      runGameLoop();
    });
    const mCurrentTime = Date.now();
    mElapsedTime = mCurrentTime - mPreviousTime;
    mPreviousTime = mCurrentTime;
    mLagTime += mElapsedTime;

    while (mLagTime >= kMPF) {
      mLagTime -= kMPF;
      update();
    }
    updateUIEcho();
    draw();
  }
  const initializeEngineCore = function () {
    runGameLoop();
  };

  const mPublic = {
    initializeEngineCore,
    mAllObjects,
    mWidth,
    mHeight,
    mContext
  };


  return mPublic;
}());
module.exports = gEngine;
