/**
 * Created by hxsd on 2017/1/15.
 */
window.onload=function() {

    var mainLeft_top = document.getElementById("mainLeft_top");
    var oSpan = mainLeft_top.getElementsByTagName("span")[0];
    var oBox2 = document.getElementById("box2");
    var bigImg = oBox2.getElementsByTagName("img")[0];




    function op(t){
        mainLeft_top.onmousemove = function (ev) {
            ev = ev || event;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            oSpan.style.display = "block";
            t.style.display = "block";//先显示才能获取尺寸
            //span元素的尺寸
            var sw = oSpan.offsetWidth;
            var sh = oSpan.offsetHeight;
            //box1元素的尺寸
            var bw = mainLeft_top.offsetWidth;
            var bh = mainLeft_top.offsetHeight;
            //span元素移动最大距离
            var maxW = bw - sw;
            var maxH = bh - sh;
            //让光标始终在span元素正中间
            var x = ev.clientX - mainLeft_top.offsetLeft - sw / 2;
            var y = ev.clientY + scrollTop - mainLeft_top.offsetTop - sh / 2;
            //对span元素的位置进行边缘限制
            if (x < 0) {
                x = 0
            }
            if (x > maxW) {
                x = maxW
            }
            if (y < 0) {
                y = 0
            }
            if (y > maxH) {
                y = maxH
            }


            //span元素的位置
            oSpan.style.left = x + "px";
            oSpan.style.top = y + "px";

            var rateX = x / maxW;
            var rateY = y / maxH;

            bigImg.style.left = -(bigImg.offsetWidth - t.offsetWidth) * rateX + "px";
            bigImg.style.top = -(bigImg.offsetHeight - t.offsetHeight) * rateY + "px";


        }
        mainLeft_top.onmouseout = function () {
            oSpan.style.display = "none";
            t.style.display = "none";
        }
    }
    op(oBox2);



    //............................................................................
    var oOne=document.getElementById("one");
    var aLi=oOne.getElementsByTagName("li");
    for(var i=0;i<aLi.length;i++){
        aLi[i].onclick=function(){
            for(var j=0;j<aLi.length;j++){
                aLi[j].style.borderColor="#ccc";
            }
            this.style.borderColor="red";
        }
    }


    //......................................
    var num=document.getElementById("num");

    var btn1=document.getElementById("btn1");
    var btn2=document.getElementById("btn2");


    var k=1;
    btn1.onclick=function(){
        k++;
        if(k>0){
            num.innerHTML=k;
        }
    }

    btn2.onclick=function(){
        num.innerHTML=k;
        k--;
        if(k<=0){
            k=1;
        }
    }

    //................................................................

    var aTab=document.getElementsByClassName("tab");
    hhh(aTab[0]);


    function hhh(p) {
        var oUl = p.getElementsByTagName("ul")[0];
        var aLi = oUl.getElementsByTagName("li");
        var cont = p.getElementsByClassName("cont")[0];
        var aDiv = cont.getElementsByTagName("div");



        var timer;
        var num=0;
        function setTab(t){
            for(var i=0;i<aLi.length;i++){
                aLi[i].className="";
                aDiv[i].className="hide";
            }
            aLi[t].className="ac";
            aDiv[t].className="";
        }
        function start(){

            timer=setInterval(function(){
                setTab(num);
                num++;
                if(num==aLi.length){num=0;
                }
            },1000)
        }
        start();

        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                setTab(this.index);
                num=this.index;
            }
            p.onmouseover=function(){
                clearInterval(timer);
            }
            p.onmouseout=function(){
                start();
            }
        }

    }


    //.........................................................................
    var mainLeft_mid=document.getElementsByClassName("mainLeft_mid")[0];
    var aA=mainLeft_mid.getElementsByTagName("a");

    for(var i=0;i<aA.length;i++){
        aA[i].onmouseover=function(){
            for(var j=0;j<aA.length;j++){
                aA[j].style.borderColor="#ccc";
            }
            this.style.borderColor="red";
        }
        aA[i].onmouseout=function(){
            for(var j=0;j<aA.length;j++){
                aA[j].style.borderColor="#ccc";
            }
        }
    }

    //...................................................
    var aImag=mainLeft_top.getElementsByTagName("img");
    var aA1=mainLeft_mid.getElementsByTagName("a");
    //alert(aA1.length)
    function setTab(n){
        for(var i=0; i<aImag.length;i++){
            aImag[i].style.display="none";
        }
        aImag[n].style.display="block";
    }

    for(var j=0;j<aA1.length;j++){
        aA1[j].index=j;
        aA1[j].onmouseover=function(){
            this.style.borderColor="red";
            setTab(this.index);
        }
    }


}



