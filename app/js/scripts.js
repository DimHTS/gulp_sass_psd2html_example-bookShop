$(document).ready(function(){

    var navHeight = '38px';

    
    // owl-carousel
        $('.owl-carousel').owlCarousel({
            items:1,
            nav:true,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            dots:false,
            autoHeight:true,
        });
    //END  owl-carousel




    //popup открытие нового окна  
    $(".header__block_cart_bottom button, .section__right_block_button").click(function(){
        $("html").attr('style', 'overflow-y: hidden;');
        scrollCompensation();
        if ($(".container").width() <= 720) {
            $("nav").attr('style', 'overflow-y: scroll;');  // чтобы не съезжал блок при открытии popup
        }
        $(".popup, .popup__order").fadeIn();
        Dim_center_pop();
        return false;
    });


        //popup закрытие   
        $(".popup__hover, .popup__close").click(function(){
            $(".popup__order, .popup__thanks").fadeOut();  
            $(".popup").fadeOut(function(){
                $(this).end().remove();
                $("html").attr('style', 'overflow: none;');
                $("nav").attr('style', 'overflow-y: none;');  // чтобы не съезжал блок при открытии popup
            }) 
            return false;
        });
        //END popup закрытие   
    //END popup открытие нового окна  





    // menu_nav
    $("nav .nav__icon").click(function(){
        $("nav ul").slideToggle();
        return false;
    });

    // высота меню
    function setHeiHeight() {
        var ulHeight = $('nav ul').height();
        var winHeight = $(window).height();
        if ($('.nav__icon').css('display') == 'none') {
            $('nav ul').css("height", "40px");
            $('nav ul').css("overflow-y", "hidden");
            $('nav ul').css("margin-bottom", "0");
        } else if (ulHeight <= (winHeight - 100)) {
            $('nav ul').css("height", "auto");
            $('nav ul').css("overflow-y", "auto");
        } else if (ulHeight > (winHeight - 100) ){
            $('nav ul').css("margin-bottom", "0");
            $('nav ul').css("height", winHeight - 100 + 'px');
            $('nav ul').css("overflow-y", "scroll");
        }
    }
    setHeiHeight(); 
    //END       menu_nav
/*
*/

    // фиксированное меню
    function fixMenu(navHeight) {
        var height_header = $('.header').height();
        var height_nav = $('nav').height();
        if (($(this).scrollTop() >= height_header) && ($(".container").width() > 720)) {
            $('nav').css('position', 'fixed');
            $('nav').css('top', 0);
            $('.header').css('margin-bottom', height_nav);
        } else if ($(".container").width() > 720){
            $('nav').css('position', 'relative');
            $('.header').css('margin-bottom', 0);
            $('.header').css('margin-top', 0);
        } else if ($(".container").width() <= 720) {
            $('.header').css('margin-top', navHeight);

            $('nav').css('position', 'fixed');
            $('nav').css('top', '0px');
        }
    }
    fixMenu(navHeight);
    //END фиксированное меню
    

    $(window).scroll(function() {
        fixMenu(navHeight);
    });
    
    
    $(window).resize(function(){
        fixMenu(navHeight);
        Dim_center_pop();
        setHeiHeight(); 
    });



    $(".popup__order_phone").mask("+7 (999) 999-9999"); 
    $(".popup__order_btn").DimSend(".popup__order_name", ".popup__order_phone");

});
    



$.fn.DimSend = function(name, phone) {
    function PlaceholderClear(nameClass) {   
        $(nameClass).bind('focus keyip', function(){
            $(nameClass).attr('style', "color: none;");
        });
    }

    PlaceholderClear(name); // сбросить красный цвет с input, после неправильного ввода
    PlaceholderClear(phone);

    $(this).click(function() {
        if ($(name).val() == "") { 
            $(name).attr('style', "color: #f00;");  
            var $nameTrue = false;
        }  
        if ($(phone).val() == "") { 
            $(phone).attr('style', "color: #f00;");  
            var $phoneTrue = false;
        }  

        if ($nameTrue != false && $phoneTrue != false) {   
            var nameValue = $(name).val(); 
            var phoneValue = $(phone).val(); 
            $.post("send-message.php",
                { 
                    name: nameValue,
                    phone: phoneValue /*,
                    buttonName: localStorage["bt"]  */
                }, 
                function(data){       
                    if ($(".container").width() <= 720) {
                        $("nav").attr('style', 'overflow-y: scroll;');  // чтобы не съезжал блок при открытии popup
                    }        
                    $("html").attr('style', 'overflow-y: hidden;');
                    scrollCompensation();  
                    $(".popup__order").fadeOut();  
                    $(".popup, .popup__thanks").fadeIn(); 
                    Dim_center_pop();
                }); 
        }
        return false;
    });                                                           
}; 


    


//popup
    // Функция для вычисления ширины скролла
    function getScrollWidth(){
        var measure = $('<div />').css({
            width: 100,
            height: 100,
            overflowY: 'scroll',
            visibility: 'hidden'
            }).appendTo('html'),
            sw = measure.prop('offsetWidth') - measure.prop('clientWidth');
        measure.remove();    
        return sw;
        }
        // Собственно, сама функция компенсатора скролла
        function scrollCompensation(){
        var d = document,
            rootEl = d.compatMode == 'BackCompat'? d.body : d.documentElement,
            hasScroll = rootEl.scrollHeight > rootEl.clientHeight,
            scrollW = getScrollWidth();
        $('html').css('padding-right', (hasScroll ? scrollW : 0));
        return false;
    }
    //END       scroll
    
    
    
    
    function Dim_center_pop(){     
        var thisName;  
        if($(".popup__order").is(":visible")){
            thisName = ".popup__order";
        }   
        if($(".popup__thanks").is(":visible")){
            thisName = ".popup__thanks";
        }   
    
        winHeight = $(window).height();
        thisHeight = $(thisName).height();
        if (winHeight > thisHeight+60){ // 60 = margin: 30px auto;
            $(thisName).css('margin-top', (winHeight - thisHeight) / 2 + 'px');
            $('.popup__hover').css('height', '100%');
        }else{
            $(thisName).css('margin-top', '30px');
            $('.popup__hover').css('height', thisHeight + 60 + 'px');  // 60 = margin: 30px auto;
        }
    
    
        return false;
    }

