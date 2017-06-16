//同步执行,任务按照顺序执行
var c = 0
function printIt () {
    console.log(c)
}

function add () {
    c++
}

add()
printIt()

// 异步执行，任务并非按照代码先后顺序执行，而是同时处理多个任务，通过回调函数完成

var i = 0

function async () {
    console.log(i)
}

function callback (callB) {
    setTimeout (function () {
        i++
        callB()
    }, 1000)
}

callback(async)
