const gEngine = require('./gEngine');

module.exports = {
    collision() {
      for (let i = 4; i < gEngine.Core.mAllObjects.length; i++) {
        for (let j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
          if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
            console.log('coll');
            gEngine.Core.mContext.strokeStyle = 'green';
            gEngine.Core.mAllObjects[i].draw(gEngine.Core.mContext);
            gEngine.Core.mAllObjects[j].draw(gEngine.Core.mContext);
          }
        }
      }
    }
};
