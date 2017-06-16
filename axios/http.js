var sheep = [1,2,3,4,5,1,2,3,1,2,0] //测试数组
var sum = 0 //总轮数

for (var i = 0;i < sheep.length;i++) {
    if(sheep[i] == 1){
        sum += 1
    }
}
console.log(sum)
