/*
 * @Author: wangyuanchong
 * @Description: file content
 * @Date: 2022-06-01 10:44:43
 */

// 彩带类
class Ribbon {
  // 随机颜色
  colorEnum = ['#ffa100', '#3a8bff', '#00c5bb'];
  ribbonDom = null; // 当前彩带
  parentDom = null;
  speed = 0;
  constructor(dom, speed = 3, width = 6, height = 20) {
    this.parentDom = dom;
    // 彩带下落速度
    this.speed = speed;
    // 彩带大小
    this.ribbonDom = document.createElement('span');
    // 随机数字
    const tempRandom = Math.random();
    // 随机颜色
    const randomNum = (tempRandom * this.colorEnum.length).toFixed(0);
    const color = this.colorEnum[randomNum - 1 < 0 ? 0 : randomNum - 1];
    // 彩带旋转角度 -45 - 45
    const deg = (tempRandom * 180).toFixed(0) - 90;
    // 彩带随机位置 x范围 -> 容器宽度  y范围 -> 容器上方 -10 - 20px
    const ribbonX = tempRandom * dom.offsetWidth.toFixed(0); // 容器宽
    const ribbonY = (tempRandom * 30 - 10).toFixed(0); // 容器高
    this.ribbonDom.style.cssText = `transform: rotate(${deg}deg);position:absolute;width:${width}px;height:${height}px;display:block;background:${color};top:${ribbonY}px;left:${ribbonX}px;`;
    dom.append(this.ribbonDom);
  }

  /**
   * @description: 下落
   * @return {*}
   */
  fallDown() {
    const timer = setInterval(() => {
      const conatinerH = this.parentDom.offsetHeight;
      const currenTop = Number(this.ribbonDom.style.top.replace('px', ''));
      // 彩带消失在可视区域
      if (currenTop > conatinerH) {
        // 关闭定时器
        clearInterval(timer);
        // 移除当前彩带
        this.parentDom.removeChild(this.ribbonDom);
        return;
      }
      this.ribbonDom.style.top = `${currenTop + this.speed}px`;
    }, 12);
  }
}

function startRibbon(dom) {
  setInterval(() => {
    // 每次出现 1-3个
    const repeatNum = (Math.random() * 3).toFixed(0);
    for (let i = 0; i < repeatNum; i++) {
      // 当前彩带实例
      const instance = new Ribbon(dom);
      instance.fallDown();
    }
  }, 200);
}

// export function startRibbon
