// 记录重复的元素以及出现的次数
function getDoubleArr(){
    this.getNewArr = function(_arr){
        var _res = []; //
        _arr.sort();  
        for (var i = 0; i < _arr.length;) {  
            var count = 0;  
            for (var j = i; j < _arr.length; j++) {  
                if (_arr[i] == _arr[j]) {  
                    count++;  
                }  
            }  
            _res.push([_arr[i], count]);  
            i += count;  
        }  
        return _res;
    }
    
}

getDoubleArr.prototype.getAreaDe = function(_arr){
    var _res = this.getNewArr(_arr); //
    var arrLength = _arr.length;
    var singleDe = 360 / arrLength;
 
    //_res 二维数维中保存了 值和值的重复数  
    var _newArr = [];
    var eachDe = [0];  
    for (var i = 0; i < _res.length; i++) {
        var lastDe = eachDe[eachDe.length-1] + singleDe*_res[i][1];
        eachDe.push(eachDe[eachDe.length-1] + singleDe*_res[i][1]);
        _newArr.push({"area":_res[i][0],"start":eachDe[eachDe.length-2],"end":eachDe[eachDe.length-1]-2});  
        eachDe.push(lastDe);
    } 
    return _newArr
}
// 获取颜色
getDoubleArr.prototype.getTypeColor = function(_arr){
    var _res = this.getNewArr(_arr); //
    var catColorArr = ["#0028ff","#ed1e79","#6f24ff","#ff1e3c","#c8dc32","#00c8ff",'#ff6a7f','#00607a','#ffbdf6','#d4527f'];
    //_res 二维数维中保存了 值和值的重复数  
    var _newArr = [];
    for (var i = 0; i < _res.length; i++) {
        _newArr.push({"type":_res[i][0],"color":catColorArr[i]});  
    } 
    return _newArr
}

// 数组对象排序
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}



