/**
 * Created by ZhanJee on 2017/1/18.
 */
window.onload=function(){
        var oDiv=document.getElementById("slideA");
        var oUl=oDiv.getElementsByTagName("ul")[0];
        var aLi=oUl.getElementsByTagName("li");
        var oOl=oDiv.getElementsByTagName("ol")[0];
        var aBtn=oOl.getElementsByTagName("li");
        var oPrev=oDiv.getElementsByClassName("prevBtn")[0];
        var oNext=oDiv.getElementsByClassName("nextBtn")[0];
        var timer;
        var num=0;
        //1、按钮的个数自动生成
        for(var i=1;i<=aLi.length;i++){
            oOl.innerHTML+="<li>"+i+"</li>";
        }
        aBtn[0].className="ac";

        //2、按钮和图片可以自动切换,按钮和图片同步显示
        function start(){
            timer=setInterval(function(){
                setTab(num);
                num++;
                if(num==aLi.length){ num=0;}
            },1000);
        }
        start();
        //封装函数，让所有li(图片)都隐藏，类名为空；让当前图片出现，类名为ac
        function setTab(n){
            for(var i=0; i<aLi.length;i++){
                aLi[i].className="hide";
                aBtn[i].className="";
            }
            aLi[n].className="";
            aBtn[n].className="ac";
        }

        //3、鼠标移入移出，移入停止切换，移出开始切换
        oDiv.onmouseover=function(){
            clearInterval(timer);
        };
        oDiv.onmouseout=function(){
            clearInterval(timer);
            start();
        };
        //4、点击某按钮后，鼠标离开焦点图时，自动切换能顺延切换;
        for(var i=0;i<aBtn.length;i++){
            aBtn[i].index=i;
            aBtn[i].onclick=function(){
                setTab(this.index);
                num=this.index;
            }
        }
        //5、点击左右的按钮，可以切换图片和按钮
        oPrev.onclick=function(){
            var j = 0;
            for(var i=0;i<aLi.length;i++){
                if(aLi[i].className==""){
                    j=i;
                }
            }
            aLi[j].className="hide";
            aBtn[j].className="";
            if(j==0){
                aLi[aLi.length-1].className="";
                aBtn[aLi.length-1].className="ac";
            }else{
                aLi[j-1].className="";
                aBtn[j-1].className="ac";
            }
        };
        oNext.onclick=function(){
            var j = 0;
            for(var i=0;i<aLi.length;i++){
                if(aLi[i].className==""){
                    j=i;
                }
            }
            aLi[j].className="hide";
            aBtn[j].className="";
            if(j==aLi.length-1){
                aLi[0].className="";
                aBtn[0].className="ac";
            }else{
                aLi[j+1].className="";
                aBtn[j+1].className="ac";
            }












        }



    //............................................

    var oMenu=document.getElementById('taobaoMenu');
    var aLi1=oMenu.getElementsByTagName('li');
    var oMenuCont=document.getElementById('menuCont');
    var aDl=oMenuCont.getElementsByClassName("section");
    //alert(aDl.length)
    var leave_menu;//离开右侧 回到左侧

    for(var i=0; i<aLi1.length; i++){
        aLi1[i].index=i;//发牌照

        aLi1[i].onmouseover=function(){
            clearTimeout(leave_menu);
            oMenuCont.style.display="block";



            //显示相对应的内容(就是选项卡的原理)
            for(var i=0; i<aDl.length; i++){
                aDl[i].style.display="none";
            }
            aDl[this.index].style.display="block";
        };

        aLi1[i].onmouseout=function(){
            clearTimeout(leave_menu);
            leave_menu=setTimeout(function(){
                oMenuCont.style.display="none";
            },100)
        };
    }

    oMenuCont.onmouseenter=function(ev){
        clearTimeout(leave_menu);
        this.style.display="block";
    };


    oMenuCont.onmouseleave=function(){
        this.style.display="none";
    };

    //.........................................................................

    var LocationFloorList=getByClass(document,'LocationFloorList')[0];
    var aLi2=LocationFloorList.getElementsByTagName('li');
    var aFloor=getByClass(document,'page');
    var arr=[];

    //-------------------------------------------------

    for(var i=0; i<aFloor.length; i++){
        var json={};
        json.name=i;
        json.offsetTop=aFloor[i].offsetTop;
        arr.push(json);
    }
    //console.log(arr)

    window.onscroll=function(){
        //显示楼层编号-------------------------------------------------
        var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
        if(scrolltop>1500){
            LocationFloorList.style.display='block';
        }else{
            LocationFloorList.style.display='none';
        }

        // 根据楼层滚动位置，定位编号------------------------------------------------
        var last_arr=[];
        for(var j=0; j<arr.length; j++){
            if(arr[j].offsetTop<scrolltop+200){//400为接近屏幕的敏感区
                last_arr.push(arr[j].name);
            }
        }

        //console.log(last_arr)
        var li_index=last_arr[last_arr.length-1];

        for(var l=0; l<aFloor.length; l++){
            aLi2[l].className='';
        }
        //页面上部如果有内容，没有楼层会放入新数组，产生错误
        last_arr.length==0 ?aLi2[0].className='ac':aLi2[li_index].className='ac';
    };

    //点击编号，跳转到相对楼层-----------------------------------------------
    for(var i=0; i<aFloor.length; i++){
        aLi2[i].index=i;
        aLi2[i].onclick=function(){
            var start=document.documentElement.scrollTop || document.body.scrollTop;
            var end=arr[this.index].offsetTop;
            move(start,end)
        }
    }
    //move-------------------------------------------------------
    var timer;
    function move(start,end){
        var dis=end-start;
        var count=parseInt(2000/30);
        var n=0;
        clearInterval(timer);
        timer=setInterval(function(){
            n++;
            var a=1-n/count;
            var step_dis=start+dis*(1-a*a*a*a);
            window.scrollTo(0,step_dis);
            if(n==count){
                clearInterval(timer);
            }
        },30)
    }

    function getByClass(oParent,cls){
        if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
        else{
            var arr=[]; //容器
            var aEl=oParent.getElementsByTagName('*');//所有标签
            var re=new RegExp("\\b"+cls+"\\b");
            for(var i=0;i<aEl.length;i++){
                if(re.test(aEl[i].className)) arr.push(aEl[i]);//向数组中添加
            }
            return arr;
        }
    }




};

