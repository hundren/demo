  //转换弧度
  function rads(x){
    return Math.PI*x/180;
}
// 圆点坐标变换公式 
function changeDeToXy(radius,radian){
    var _x = Math.round(radius * Math.cos(radian));
    var _y = Math.round(radius * Math.sin(radian));
    var xyArr = [_x,_y];
    return JSON.stringify(xyArr);
}
//圆
function ites(x,y,a,b,r,color){
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(x,y,r,rads(a),rads(b),false);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}
// 圆不填充
function itesOutLine(a,b,r,color){
    ctx.beginPath();
    ctx.arc(0,0,r,0,2*Math.PI);
    ctx.strokeStyle = color;

    ctx.stroke();
}
  //线
  function line(a,b,c,d,color,lineWidth){
    ctx.beginPath();
    ctx.moveTo(a,b);
    ctx.lineTo(c,d);
    if(typeof color == 'object'){
        var gradient=ctx.createLinearGradient(a,b,c,d);
        gradient.addColorStop("0",color[0]);
        gradient.addColorStop("1",color[1]);
        ctx.strokeStyle = gradient;
    }else{
        ctx.strokeStyle = color;
    }
    ctx.closePath();
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}
// 遮盖扇形和绘制线
function coverCircle(angleSum){
    // 生产遮盖层
    // 开始一条新路径
    ctx.save();
    ctx.rotate(rads(-angleSum));
    ctx.beginPath();
    // 移动到圆心
    ctx.moveTo(0, 0);
    // 绘制圆弧
    ctx.arc(0, 0, 500, Math.PI/180*340, Math.PI/180*200);

    // 闭合路径
    ctx.closePath();
    ctx.fill();
    InstitutionList(ctx,newSortData)
    ctx.restore();
    
}
function drawCircularText(s,string, startAngle, endAngle ,lv){
    var fontSize = 15;
    var radius = s,
        angleDecrement = (startAngle - endAngle)/(string.length-1),
        angle = parseFloat(startAngle),
        index = 0,
        character;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = fontSize + 'px 微软雅黑';
    ctx.textAlign = lv;
    ctx.textBaseline = 'middle';
    while (index < string.length) {
        character = string.charAt(index);
        ctx.save();
        ctx.beginPath();
        ctx.translate(Math.cos(angle) * (radius-fontSize),
                      Math.sin(angle) * (radius-fontSize));
      
        
        ctx.rotate(Math.PI/2 + angle);
        ctx.fillText(character, 0, 0);
//            ctx.strokeText(character, 0, 0);
        angle -= angleDecrement;
        index++;
        ctx.closePath();
        ctx.restore();
    }
    ctx.restore();
}

function drawVerticalText(string,angle,radius,type){
    var rev_str = string.split("").reverse().join(""); 
    var fontSize = 12,
    index = 0,
    character;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = fontSize + 'px 微软雅黑';
    ctx.textAlign = 'center';
    while (index < rev_str.length) {
        character = rev_str.charAt(index);
        ctx.save();
        ctx.beginPath();
        // 每个字的坐标
        ctx.translate(Math.cos(angle) * (radius+fontSize*index),
                      Math.sin(angle) * (radius+fontSize*index));
        ctx.rotate(Math.PI/2 + angle);
        // console.log('text_x',text_x,'text_y',text_y);
        ctx.fillText(character, 0, 0);
        index++;
        ctx.closePath();
        ctx.restore();
    }
    ctx.restore();
}

function drawLine(angle,radius,lineLong,lineColor,type){
    ctx.save();
    var startX = Math.cos(angle) * radius;
    var startY = Math.sin(angle) * radius;
    var endX = Math.cos(angle) * (radius-lineLong);
    var emdY = Math.sin(angle) * (radius-lineLong);
    line(startX,startY,endX,emdY,lineColor,1,type)
    ctx.restore();
}

function drawWeekLine(angle,radius,cat,time1,time2,time3,transTitleTypeColor){
    ctx.save();
    // todo增加根据时间判断linlong初始值分析
    var linelong = 30;
    var startX = Math.cos(angle) * (radius + 10);
    var startY = Math.sin(angle) * (radius + 10);
    var endX = Math.cos(angle) * (radius+30);
    var emdY = Math.sin(angle) * (radius+30);
    line(startX,startY,endX,emdY,[getCateColor(cat,transTitleTypeColor)+'70',getCateColor(cat,transTitleTypeColor)],10)
    ctx.restore();
}

function drawTitlePoint(angle,radius){
    ctx.save();
    var startX = Math.cos(angle) * radius;
    var startY = Math.sin(angle) * radius;
    ites(startX,startY,0,360,2,'#fff');
    ctx.restore();
}

function setPoint(_arr){
	// 计算平均角度 [ 360度 ÷ 个数 ] 
	var each_degree = 360/_arr.length;
	// 临时数组
	var arr = new Array(_arr.length);
	// 开始计算每个圆点坐标
	for(i=0;i<_arr.length;i++){
		// 基于圆心平移X,Y
		arr[i] = i*each_degree;
	}
	return arr;
}


var getCateColor = function(category,transTitleTypeColor) {
    var color = "#fff";
    transTitleTypeColor.forEach(function(e){
        if(e.type == category){
            color = e.color;
        }
    });
    return color;
};