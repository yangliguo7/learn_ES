/*
* @description 处理异步函数的新机制，解决promise链式调用的问题,需要配合await一起使用
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/async_function
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
* @year 2017
*/

// 模拟异步任务
const p1 = () => {
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log("我等了一秒")
            resolve(1)
        },100)
    })
}

const p2 = () => {
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log("我等了两秒")
            resolve(2)
        },200)
    })
}

// 基本操作
const baseOperate = async ()=>{
    console.log("函数执行开始",new Date().getTime())
    const r1 =  await p2()
    console.log(r1)
    const r2=  await p1()
    console.log(r2)
    console.log("函数执行结束",new Date().getTime())
}
const result =  baseOperate().then(resp=>{
    return "baseOperate函数执行完成"
})

console.log(result)

// 执行结果
// 函数执行开始 1634376875177
// 我等了两秒
// 2
// 我等了一秒
// 1
// 函数执行结束 1634376875513
// baseOperate函数执行完成


// 解析
// 1、async和await需要配合一起使用，不可以单独使用
// 2、async和await都是和promise一起使用处理异步任务的
// 3、await 后面需要跟着一个promise，他会等待promise进去fulfilled状态，如果promise没有走到fulfilled则会一直等待（如果你把p2的resolve(2)注释了则会查看到现象）
// 4、被async包装后的函数会变成一个返回promise的函数。（baseOperate()后面可以接then）
// 5、async和await是针对promise，建议先去了解promise

