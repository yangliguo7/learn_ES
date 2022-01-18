/*
 * @description js class中表示私有属性/方法
 */

// 类比于java的private; 现在表示私有数据则使用 # 表示

class TestClass {
  #privateProperty = 'privateProperty';

  publicProperty = 'publicProperty';

  // 静态私有属性
  static #privateStaticProperty = 'privateStaticProperty';

  // 静态属性
  static staticProperty = 'staticProperty';

  constructor({ width, height }) {
    this.width = width;
    this.height = height;
    this.privateMethodValue = this.#privateMethod();
    this.p = TestClass.#privateStaticProperty;
  }

  publicMethod() {
    console.log(
      `privateStaticProperty：${this.p}  width：${this.width} height：${this.height} privateMethodValue：${
        this.privateMethodValue
      } privateProperty：${this.#privateProperty}`
    );
    return 'publicMethod';
  }

  #privateMethod() {
    return 'privateMethod';
  }

  static #staticPrivateMethod() {
    return 'staticPrivateMethod';
  }
}

const instance = new TestClass({
  width: 100,
  height: 200,
});

console.log(instance);
//TestClass { // 可以看到实例上并没有定义的所有private属性与方法
//  publicProperty: 'publicProperty',
//  width: 100,
//  height: 200,
//  privateMethodValue: 'privateMethod'
// }
instance.publicMethod(); // width：100 height：200 privateMethodValue：privateMethod privateProperty：privateProperty

console.log(TestClass.staticProperty); // staticProperty
