$(function(){

	    $(".navBox>li").children("a").eq(0).css({"border":"1px solid #dba839","color":"#dba839"})
		
		$(".navBox .picBox").hide()	
		$(".navBox .picBox").first().show()	
		$(".navBox>li").click(function(){
			 $(".navBox>li").children("a").css({"border":"none","color":"#000"})
			$(".navBox .picBox").fadeOut()	
			$(this).children(".picBox").fadeIn()
			$(this).children("a").css({"border":"1px solid #dba839","color":"#dba839"})
			
			}) 
			$("header nav ul.menu>li").click(function(){

				var j = $(this).index();
				var mun = $(".box").eq(j).offset().top
				$("html,body").animate({ scrollTop:mun})
				})
			
		})



