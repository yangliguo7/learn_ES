/*
* @description import.meta是一个给JavaScript模块暴露特定上下文的元数据属性的对象
*/

// 在index.html中我们引用了这个文件；通过import可以查看设置在js文件中的属性

console.log(import.meta) // { url: "http://localhost:8080/index.js"}

// fixme 除了url还有哪些数据可以在meta中显示；

