/*
 * @description 类里一共一种静态块(static) 去做类的初始化操作
 */

import { getData } from './someAwait.mjs';

const setValue = (a) => a ** 2;

class TestStaticBlock {
  static pA;
  static pB;
  static pC;
  // 在这里你可以做一下在初始化之前的操作；注意初始话操作指挥执行一次
  static {
    console.log(1, '先输出这一句 这是static block 操作');
    this.pA = setValue(2);
    this.pB = setValue(3);
    this.pC = setValue(4);
  }

  constructor(a) {
    console.log(2, '在输出实例化 这是初始化操作');
    this.a = a;
    this.pC = `这是${a}`;
    TestStaticBlock.pA = 1;
  }

  getPC() {
    return this.pC;
  }
}

console.log(TestStaticBlock.pA); // 4
console.log(TestStaticBlock.pB); // 9
console.log(TestStaticBlock.pC); // 16

const instanceA = new TestStaticBlock(1);
console.log(instanceA); // { a: 1, pC: '这是1' }
console.log(TestStaticBlock.pC); // 16
console.log(instanceA.getPC()); // 这是1
console.log(TestStaticBlock.pA); // 1
