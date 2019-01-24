const gEngine = require();
const Vec2 = require();
const Rectangle = require();

function InitializeGame() {
  const width = gEngine.Core.mWidth;
  const height = gEngine.Core.mHeight;
  const up = new Rectangle(new Vec2(width / 2, 0), width, 3, 0);
  const down = new Rectangle(new Vec2(width / 2, height), width, 3, 0);
  const left = new Rectangle(new Vec2(0, height / 2), 3, height, 0);
  const right = new Rectangle(new Vec2(width, height / 2), 3, height, 0);
}

function onReady(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

onReady(function() {
  const game = new InitializeGame();
  gEngine.Core.initializeEngineCore();
  document.addEventListener('keydown', userControl);
})
