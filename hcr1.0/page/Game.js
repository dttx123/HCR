$(function(){
    function Game(op){

        //属性
        this.cs=null; //画布
        this.ctx=null;//绘图API
        this.timer=null;//定时器
        this.source=[];//资源列表
        this.role=[];//游戏对象          

        //方法   
        //获取数据的方法   
        this.getData=function(url){
            var newData = [];
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'xml',
                success: function (info) {
                    // console.log(info);
                    var datas = $(info).find('dict dict dict');
                    // console.log(datas);
                    var data = [];
                    datas.each(function (index, e) {
                        var t = $(e).find('string');
                        // console.log(t);
                        var d = [];
                        var reg = /-?\d+/g;
                        for (var i = 0; i < t.length; i++) {
                            //一组数据
                            d = d.concat(t[i].innerHTML.match(reg));
                        }
    
                        var r = $(e).find('false');
    
                        // console.log(r.length);
    
                        if (r.length == 1) {
                            d.push(false);
                        } else {
                            d.push(true);
                        }
                        //全部数据
                        data[index] = d;
                    })
    
                    // console.log(data);
                    // console.log(JSON.stringify(data)); //转成数组
                    //原图 x坐标 y坐标  盒子宽 高  偏移x y   手机上的坐标 x y  尺寸 x,y  屏幕尺寸 是否旋转
                    //["1562","806","210","114","17","-30","392","293","210","114","960","640","false"]
    
                    for (var i = 0; i < data.length; i++) {
                        var d = [];
                        for (var j = 0; j < data[i].length; j++) {
                            if (j <= 11) {
                                d[j] = Number(data[i][j]);
                            } else {
                                d[j] = Boolean(data[i][j]);
                            }
                        }
                        newData[i] = d;
                    }
                    //展示数据
                },
                complete:function(){             
                }
            })
            // console.log(newData);
            return newData;
        }
        //获取步数的方法
        this.getStep=function(url){
            var data={};
            $.ajax({
                type:'get',
                url:url,
                dataType:'xml',
                success:function(info){
                    console.log(info);                      
                    
                    var root=$(info).children().children('dict');
                    var keys=$(root).children('key');
                    var dicts=$(root).children('dict');
                    // console.log(keys);
                    // console.log(dicts);
                    // 获取keys
                    for(var i=0;i<keys.length;i++){
                        var key=keys[i].innerHTML; 
                        // console.log(key);
                        var dictData=$(dicts[i]).children('array').children('dict');
                        // console.log(dictData);
                        var dictArr=[];
                        for(var j=0;j<dictData.length;j++){
                            // console.log($($(dictData[j]).children('string')[0]).text());
                            dictArr.push($(dictData[j]).children('string').html());
                        }
                        // var obj='{"'+key+'":"['+dictArr.toString()+']"}';   
                        // obj[key]=dictArr;   
                        data[key]=dictArr;                         
                    }
                  
                },                   
                complete:function(){               
                }                   
            })
            return data;
        }
    }

     

    window.Game=Game;
});