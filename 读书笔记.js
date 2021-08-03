javascript 高级程序设计

基本包装类型--》自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。
这意味着我们不能在运行时为基本类型添加属性和方法。

Object 构造函数也会像工厂方法一样，更具传入值的类型返回基本包装类型的实例
例如：
var obj = new Object("some text")
alert(obj instanceof String )


//对象就是一组名值对
1. 数据属性
2. 访问器属性

工厂模式： 抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节，一般根据根据接受的参数来构建


//对象识别问题
//构造函数模式

//原型模式
每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，
而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那
么prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以
让所有对象实例共享它所包含的属性和方法


每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。搜索首先
从对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，
则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这
个属性，则返回该属性的值。


虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们
在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该
属性将会屏蔽原型中的那个属性


使用delete 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性，

in 操作符只要通过对象能够访问到属性就返回true，

function Person(){
}
Person.prototype = {
name : "Nicholas",
age : 29,
job: "Software Engineer",
sayName : function () {
alert(this.name);
}
};


组合使用构造函数模式和原型模式
动态原型模式（非常完美）

关于函数声明，它的一个重要特征就是函数声明提升（function declaration hoisting），意思是在执行
代码之前会先读取函数声明。这就意味着可以把函数声明放在调用它的语句后面


闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数
。当某个函数被调用时，会创建一个执行环境（execution context）及相应的作用域链。
然后，使用arguments 和其他命名参数的值来初始化函数的活动对象（activation object）。但在作用域
链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，……直至作为作用域链终点的全局执行环境


Node.js高级编程
Node 为构建高度并发的软件提供了一个纯事件驱动的，非阻塞的基础架构。
node 在解析包以来关系时，以本地模式安装的包优先级高于以全局模式安装的包
在javascript 中 函数操作并不是孤立地工作而是会记住它被声明时所在的上下文，这能让函数操作其声明时所在的上下文以及父上下中的变量
1， node加载模块
在node 中，文件和模块是一一对应的。
可以使用文件夹路径来加载模块，如下
var myModule = require（‘ ./mymoduleDir');
node会假定该文件夹是一个包，并试图查找包定义。包定义包含在名为package.jon 的文件中。
如果文件夹中不存在包定义文件package.json. 那么包的如看点会假定为默认值index.js 。
如果package.json.文件存在，那么node就会尝试解析该文件并查找main属性，将mian属性当作入口点的相对路径。


函数参数： export： 该对象用来将变量或者函数暴露到外部
	  module:
		代表的是当前模块本身
		export就是module的属性
		

export 与 module.export 指向同一个对象，requrie 后使用的是module.export 的引用对象

所以
export = {
}

处理是有问题的
应该用module.export = {

}


深入浅出node.js
目录分析和包： require 通过分析文件扩展名之后，可能没有查找到对应文件，但却得到一个目录，此时NODE 会将目录当作一个包来处理
首先查找package.json如果不存在或者main 属性指向的文件名错误，node会将index 当作默认文件名，然后依次查找index.js, index.json, index.node.

node 异步I/O调用中，回调函数不由开发者主动来调用，由框架调用。中间有一个请求对象
事件 循坏， 观察者，请求对象，I/O 线程池这四者共同构成NODE 异步I/O模型的基本要素 
windows 通过iocp实现。linux通过epoll实现 
调用setTimeout()或者setInterval（）创建的定时器会被插入到定时器观察者内部的一个红黑树，每次Tick执行时，会从该红黑树中迭代去除定时器对象，检查是否超过定时时间，
如果超过，就形成一个事件，它的回调函数将立即执行。

时间循坏对观察者的检查是有先后顺序的，process.nextTick（）术语idle 观察者，setImmediate术语check观察者。在每一轮循环检查中，idle观察者先于i/O 观察者
i/o 观察者咸鱼check观察者

每个函数都包含两个非继承而来的方法，apply和call（），用途是在特定的作用域中调用，实际上等于设置函数体内this 对象的值



通过指定部分参数来产生一个新的地址函数的形式就是偏函数
1，在普通哈数定义的前面加上async 关键字 ，普通函数就变为异步函数
2，异步函数默认的返回值是promise 对象
3，在异步函数内部使用throw 关键字进行错误的的抛出

await 关键字
1，它只能出现在异步函数中
2，await promise  ,它可以暂停异步函数的执行，等待promise 对象的返回结果后再向下执行。



nodejs异步变同步的几种方式
async库，es6的promise-then，es7的await-async

1. for循环中的异步转同步，常常用到nodejs的async库，有好多种方法支持异步变同步的，常用的有:

async.each(): 经常使用，类似于forEach结合累加器flag++，每轮循环是按照顺序开启的，但执行是异步的，比如index=1和index=100, 开启任务一定是前者在先，但执行结束也可能是index=100的先输出结果。

async.eachSeries(): 严格保证了循环内部每次都是同步的，类似于java里单线程的for循环查询数据库了。

递归：传统的递归方法也能严格保证同步，包括前台js比如angularjs controlle中for循环http请求。

 

2.有限的多个业务的异步变同步，可以用回调一直嵌套，代码维护太复杂，用以下方法优化：

async.waterfull(): 同步执行(串行)有关联，function之间有数据交互，上一个function的输出，可作为下一个function的输入。

async.series(): 同步执行(串行)无关联，function之间无交互。

 

3. promise-then和await-async

两个等同的方法，await-async使用起来更加简单优雅，async方法同步return相当于新建了一个Promise 返回出去了，await相当于.then()

async = return new Promise, await = then 

// return promise, 必须用.then或者await接收
function promiseDemo () {
	return new Promise((resolve) => {
	resolve(2);
})
}
 
// then方式
function testPromiseDemo1 () {
	promiseDemo().then((data) => {
		console.log(data);
	})
}
testPromiseDemo1();
 
// await方式
async function testPromiseDemo2 () {
	var val = await promiseDemo();
	console.log(val);
	return val;
}
testPromiseDemo2();  // 内部打印2
testPromiseDemo2().then((data) => {
	console.log(data);  // 打印返回值2
})
 
 
 
// 相当于return new Promise((resolve) => {resolve(1)})
async  function asyncDemo() {
	return 1;
}
 
// then方式接收，或者也可以用await接收
asyncDemo().then((data) => {
	console.log(data);  
})
 
























