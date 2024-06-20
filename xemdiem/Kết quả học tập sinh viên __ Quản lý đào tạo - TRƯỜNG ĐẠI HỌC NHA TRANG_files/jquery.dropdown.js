$(document).ready(function(){

 $("ul.dropdown li").hover(function(){
   $(this).addClass("hover");
   $('> .dir',this).addClass("open");
   $('ul:first',this).css('visibility', 'visible');
 },function(){
   $(this).removeClass("hover");
   $('.open',this).removeClass("open");
   $('ul:first',this).css('visibility', 'hidden');
 });
 
    $("ul.dropdown li").click(function(){	
            $(this).addClass("hover");
            $('> .dir',this).addClass("open");
            $('ul:first',this).css('visibility', 'visible');
    });

    $('.mainbody td').click(function() {
		
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {

            $("ul.dropdown li").removeClass("hover");
            $('.open').removeClass("open");
            $('ul.dropdown ul').css('visibility', 'hidden');
        }

    });
        

});