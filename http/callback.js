function learn (arg) {
    console.log(arg)
}

function we (callback, arg) {
    arg += " is cool"
    callback(arg)
}

we(learn, "node.js")