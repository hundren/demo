
function InstitutionList(ctx, gdata){
    // 类型方块宽度，不同类型的间隔，单位的坐标
    var global_options = {
        cate_pixel : 20,
        cate_gap: 20,

        institution: {
            x: -100,
            y: 100,
        }
    };
    var initialInsContext = function(ctx, gdata) {
        // 用坐标筛选数据生成下方的线
        var makeLineData = [];
		gdata.forEach(function(e){
            var calRadian = e.radian>0?e.radian%360:360 - Math.abs(e.radian)%360;
			if(calRadian%360 >= 200 &&  calRadian%360 <=340){
				makeLineData.push(e);
			}	
        })
        // console.log('makeLineData',makeLineData);
        var data = sortInstitution(makeLineData);
        
        drawCateAndLine(ctx, data);

    };
    var drawCateAndLine = function(ctx, data){
        var ins_coordinate = global_options.institution;
        var ins_arr = [];

        var same_cate_begin = 0;
        var same_cate_end = 0;

        for(var i=0; i<data.length; i++){
            var cate_connect_center = {
                x: 0,
                y: 0,
            };

            if(i>0){
                var ins_item = {};

                if(data[i]["承办单位名称"] == data[i-1]["承办单位名称"]){
                    ins_coordinate = getSameGroupOffset(ins_coordinate);
                    same_cate_end = ins_coordinate.x + global_options.cate_pixel/2;
            
                }else{
                    ins_coordinate = getDiffGroupOffset(ins_coordinate);

                    // ins_item.x = same_cate_begin + (same_cate_end - same_cate_begin)/2;

                    if(same_cate_end - same_cate_begin <= global_options.cate_pixel){
                        ins_item.x = same_cate_begin + 3;
                    }else{
                        ins_item.x = same_cate_begin + (same_cate_end - same_cate_begin)/2;
                    }

                    ins_item.y = global_options.institution.y + global_options.cate_pixel + 10;
                    ins_item.name = data[i-1]['承办单位名称'];
                    ins_arr.push(ins_item);


                    same_cate_begin =  ins_coordinate.x;
                    same_cate_end =  ins_coordinate.x + global_options.cate_pixel;

                }

                if(i == data.length-1){
                    var ins_item = {};
                    if(same_cate_end - same_cate_begin <= global_options.cate_pixel){
                        ins_item.x = same_cate_begin + 3;
                    }else{
                        ins_item.x = same_cate_begin + (same_cate_end - same_cate_begin)/2;
                    }
                    ins_item.y = global_options.institution.y + global_options.cate_pixel + 10;
                    ins_item.name = data[i]['承办单位名称'];
                    ins_arr.push(ins_item);
                }
            }else{
                ins_coordinate = getSameGroupOffset(ins_coordinate);
                same_cate_begin = global_options.institution.x;
                same_cate_end = global_options.institution.x + global_options.cate_pixel;
            }

            data[i].coordinate = JSON.parse(data[i].coordinate);
            var title_coordinate = {};
            title_coordinate.x = data[i].coordinate[0];
            title_coordinate.y = data[i].coordinate[1];

            ctx.fillStyle = getCateColor(data[i].信访类型,transTitleTypeColor);

            ctx.fillRect(ins_coordinate.x, ins_coordinate.y, global_options.cate_pixel, global_options.cate_pixel);
            cate_connect_center = getConnectCenter(ins_coordinate);

            ctx.beginPath();
            ctx.moveTo(cate_connect_center.x, cate_connect_center.y);
            ctx.lineTo(title_coordinate.x+1, title_coordinate.y);
            ctx.strokeStyle = getCateColor(data[i].信访类型,transTitleTypeColor);
            ctx.closePath();
            ctx.stroke();

        }

        // console.log(ins_arr);

        writeDownText(ctx, ins_arr);

        // for(var i in ins_arr){
        // 	ctx.fillRect(ins_arr[i].x, ins_arr[i].y, global_options.cate_piglobal_options.cate_pixel);
        // }
    }

    // var getCateColor = function(category) {
    //     var color = "#fff";

    //     switch(category)
    //     {
    //         case "1":
    //             color = "#0028ff";
    //             break;
    //         case "2":
    //             color = "#ed1e79";
    //             break;
    //         case "3":
    //             color = "#6f24ff";
    //             break;
    //         case "4":
    //             color = "#ff1e3c";
    //             break;
    //         case "5":
    //             color = "#c8dc32";
    //             break;
    //         case "6":
    //             color = "#00c8ff";
    //             break;
    //         // default:
    //         // 	color = "#fff";
    //     }

    //     return color;
    // };

    var getSameGroupOffset = function(coordinate) {
        coordinate.x += global_options.cate_pixel+1;

        return coordinate;
    };

    var getDiffGroupOffset = function(coordinate) {
        coordinate.x = coordinate.x + global_options.cate_pixel + global_options.cate_gap;

        return coordinate;
    };

    var getConnectCenter = function(coordinate) {
        var coor = {};
        coor.x = coordinate.x + global_options.cate_pixel/2;
        coor.y = coordinate.y;

        return coor;
    };

    var sortInstitution = function(data) {
        var cates = [];
        var ins = [];
        var new_data = [];
        // // 获取共有多少个单位

        new_data = sortAll(data);

        return new_data;
    };


    var sortTheInstitution = function(data) {
        var ins_arr = [];
        var new_data = {};

        for(var i in data){
            var same_ins_flag = false;

            if(ins_arr){
                for(var j in ins_arr){
                    if(ins_arr[j] == data[i]['承办单位名称']){
                        same_ins_flag = true;
                        break;
                    }
                }
            }
            
            if(!same_ins_flag){
                ins_arr.push(data[i]['承办单位名称']);
            }
        }

        for(var i in ins_arr){

        }

        return ;
    };

    var sortCategory = function(data) {
        var institutions = [];
        var new_data = [];

        for(var i in data){
            // 123;
        }
    }

    var sortAll = function(data){

        var sort_ins_data = [];

        for(var i=0; i<data.length; i++){
            for(var j=i+1;j<data.length; j++){
                if(data[i]['信访类型'] >= data[j]['信访类型']){
                    var temp = data[j];
                    data[j] = data[i];
                    data[i] = temp;
                }
            }
        }

        sort_ins_data = sortIns(data);

        return data;
    }

    var sortIns = function(data){

        var sort_cate_data = [];

        for(var i=0; i<data.length; i++){
            for(var j=i+1;j<data.length; j++){
                if(data[i]['承办单位名称'] >= data[j]['承办单位名称']){
                    var temp = data[j];
                    data[j] = data[i];
                    data[i] = temp;
                }
            }
        }

        return data;
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

    var writeDownText = function(ctx, arr){
        ctx.font="14px Arial";

        for(var i in arr){
            var x = arr[i].x;
            var y = arr[i].y + 5;
            var name = arr[i].name;
            for(var j=0; j<name.length; j++){
                var str = name.slice(j, j+1);
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.fillText(str,x,y);
                y += 15;
                ctx.closePath()
                // console.log(name.slice(j, j+1));
            }
            // console.log('---------');
        }
    }

    var cateDistinct = function(cates){
        var dis_cates = [];

        console.log(cates);

        for (var i in cates) {
            if(i > 0){
                var same_cate_flag = false;
                for(var j in dis_cates){
                    if(dis_cates[j] == cates[i]){
                        same_cate_flag = true;
                        break;
                    }
                }
                if(!same_cate_flag){
                    dis_cates.push(cates[i]);
                }
            }else{
                dis_cates.push(cates[i]);
            }
        }

        console.log(dis_cates);

        return dis_cates;
    }

    initialInsContext(ctx, gdata);
    
}