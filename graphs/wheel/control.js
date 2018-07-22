canvas.onmousedown = function(ev){  
    var e = ev||event;  
    var x = e.clientX;  
    var y = e.clientY;  
    drag(x,y);  
};  
//拖拽函数  
function drag(x,y){  
    // 按下鼠标判断鼠标位置是否在圆上，当画布上有多个路径时，isPointInPath只能判断最后那一个绘制的路径  
    if(ctx){  
    
        // 记录变量方向
        var decretion = x > circleCenter.x?'right':'left';
        function rotateGo(de) {
            if(de == 'right'){
                rotateCan(2);
            }else{
                rotateCan(-2);
            }
        }
        rotateGo(decretion);
        var rotateInterval = setInterval(function(){
            rotateGo(decretion);
        },50)
        //路径正确，鼠标移动事件 
        canvas.onmousemove = function(ev){
            var e = ev||event;  
            var mx = e.clientX;  
            var my = e.clientY;  
            var newDecretion = mx > circleCenter.x?'right':'left';
            if(newDecretion != decretion){
                decretion = newDecretion;
                clearInterval(rotateInterval); 
                rotateGo(newDecretion);
                rotateInterval = setInterval(function(){
                    rotateGo(newDecretion);
                },50)
            }
            
        };  
        //鼠标移开事件  
        canvas.onmouseup = function(){
            canvas.onmousemove = null;  
            canvas.onmouseup = null; 
            clearInterval(rotateInterval);
        };  
    };  
}  
var angleSum = 0;
function rotateCan(angle){ 
    ctx.clearRect(-circleCenter.x,-circleCenter.y,canvas.width,canvas.height);
    ctx.rotate(rads(angle));
    angleSum += angle;
    draw(angleSum);
    coverCircle(angleSum);
}  

