/*
 * @description catch不在要求一定写异常
 */

// 之前
try {
    // some code
} catch (e) {
    console.log("输入异常",e)
}


// 但是某些情况下我们并不需要知道错误，比方说当我们进行方法降级处理我们只是单纯想知道是否会报错

// 现在
try{
    // some code
}catch {
    // 这里并不需要我们知道错误是啥
}
