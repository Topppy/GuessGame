export const getUnique = (arrayNum,count) => {
  // Make a copy of the array
  var tmp = arrayNum.slice();
  var ret = [];
  
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    var removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}
/**
 * 
 * @param {pg: zpair[0],cg: zpair[1], acc: zpair[1] - zpair[0],} gObjPair 
 */
export const isPeakPoint = (gObjPair) => {
  const z1 = gObjPair[0]
  const z2 = gObjPair[1]
  // g +1 peak point
  if (z1.pg > 0 && z1.cg > 0 && z2.pg > 0 && z2.cg > 0 && z1.acc > 0 && z2.acc < 0) {
    return 1
  }
  // g -1 peak point
  if (z1.pg < 0 && z1.cg < 0 && z2.pg < 0 && z2.cg < 0 && z1.acc < 0 && z2.acc > 0) {
    return -1
  }
  return false
}

// this.accelerationObservable = new Accelerometer({
    //   updateInterval: 50, // defaults to 100ms
    // });
    // // Normal RxJS functions
    // this.accelerationObservable
    //   .map(({ x, y, z }) => {
    //     // console.log(x,y,z)
    //     return z
    //   })
    //   .filter(z => (z > G || z < -G))
    //   .pairwise()
    //   .map(zpair => {
    //     // console.log(zpair)
    //     return {
    //       pg: zpair[0],
    //       cg: zpair[1],
    //       acc: zpair[1] - zpair[0],
    //     }
    //   })
    //   .pairwise()
    //   .flatMap((gObjPair) => {
    //     if (!!isPeakPoint(gObjPair)){
    //       return isPeakPoint(gObjPair)
    //     }
    //   })
    //   // .filter((gObjPair) => {
    //   //   // console.log('filter pp',isPeakPoint(gObjPair), gObjPair)
    //   //   return !!isPeakPoint(gObjPair)
    //   // })
    //   // .map((gObjPair) => {
    //   //   // console.log('real pp',isPeakPoint(gObjPair))
    //   //   return isPeakPoint(gObjPair)
    //   // })
    //   .throttle(() => Rx.Observable.interval(I))
    //   .subscribe(z => {
    //     this.next(z)
    //   });