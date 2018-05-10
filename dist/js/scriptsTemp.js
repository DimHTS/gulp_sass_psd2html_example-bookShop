$(window).scroll(function() {
    fixMenu();
    fixKolonka();
    animationFun();
});


$(window).resize(function(){
    setHeiHeight();  // высота меню
    fixMenu();
    fixKolonka();
    Dim_center_pop();
});






    
    // menu_nav
        // крестил, bar
        $(".nav__bars").click(function(){
            $("nav ul").slideToggle();
            
            if ($(".nav__bars-block").css("display") === 'none') {
                $(".nav__bars img").hide();
                $(".nav__bars-block").show();
                return false;
            }
            if ($(".nav__bars img").css("display") === 'none') {
                $(".nav__bars-block").hide();
                $(".nav__bars img").show();
                return false;
            }
            return false;
        });
        
        // высота меню
        function setHeiHeight() {
            var ulHeight = $('nav ul').height();
            var winHeight = $(window).height();
            if (ulHeight > (winHeight - 100) ){
                $('nav ul').css({
                    height: winHeight - 100 + 'px'
                });
            }
        }
        setHeiHeight(); 
        
        
        // раскрытие списков
        $(".nav__down").click(function(){ 
            
            if ($(this).hasClass("rotate-180")){
                $(this).removeClass("rotate-180");
            } else{
                $(this).addClass("rotate-180");
            }    
            
            $(this).parent().children(".nav__submenu").slideToggle();
        });
    //END       menu_nav
    
    


        
    
        
    
    
    
    //popup открытие нового окна    
        //подсказка
        $(".usluga1__cell b").click(function(){
            $('.usluga1__box').fadeOut();
            $(this).parent().children('.usluga1__box').fadeIn();
            return false;
        });
        
        $(".usluga1__close").click(function(){
            $('.usluga1__box').fadeOut();
            return false;
        });
        //END подсказка
        
        
        
        $(".main1__btn-calc, .usluga1__btn-calc, .head__btn-popup, .footer__btn-popup").click(function(){
            $("html").attr('style', 'overflow-y: hidden;');
            scrollCompensation();
            $(".fix_block").css('display','none');
            $(".scroll, .scroll__order").fadeIn();
            Dim_center_pop();
            return false;
        });
        $(".main1__btn-invite, .usluga1__btn-invite").click(function(){
            $("html").attr('style', 'overflow-y: hidden;');
            scrollCompensation();
            $(".fix_block").css('display','none');
            $(".scroll, .scroll__order2").fadeIn();
            Dim_center_pop();
            return false;
        });
        
        $(".head__btn-city").click(function(){
            $("html").attr('style', 'overflow-y: hidden;');
            scrollCompensation();
            $(".fix_block").css('display','none');
            $(".scroll, .scroll__city").fadeIn();
            Dim_center_pop();
            return false;
        });
    
        
        $(".scroll__hover, .scroll__close, .close-sps").click(function(){
            $(".scroll__order, .scroll__order2, .scroll__spasibo, .scroll__city").fadeOut();  
            $(".scroll").fadeOut(function(){
                $(this).end().remove();
                $("html").attr('style', 'overflow: none;');
                if($(".container").width() > 720){
                    $(".fix_block").css('display','block');
                }
            }) 
            return false;
        });
      
            
        
        $(".scroll__phone-pop, .scroll__phone-pop2, .main4__phone, .company6__phone").mask("+7 (999) 999-9999"); 
        
    
        $(".scroll__name-pop, .scroll__name-pop2, .main4__name, .company6__name").DimPlaceHolder("Ваше имя");
        $(".scroll__phone-pop, .scroll__phone-pop2, .main4__phone, .company6__phone").DimPlaceHolder("Ваш телефон");
        $(".main4__email, .company6__email").DimPlaceHolder("Ваш e-mail");
    
    
        $(".scroll__btn-pop").DimSend(".scroll__name-pop", ".scroll__phone-pop", "Ваше имя", "Ваш телефон");   
        $(".scroll__btn-pop2").DimSend(".scroll__name-pop2", ".scroll__phone-pop2", "Ваше имя", "Ваш телефон");
    



















        
    
    
    $.fn.DimSend = function(name, phone, nameIF, phoneIF) {
        $(this).click(function() {
                if ($(name).val() == "" || $(name).val() == nameIF) 
                    { $(name).attr('style', "color: #f00;");  var $nameTRU = false;}  
                if ($(phone).val() == "" || $(phone).val() == phoneIF) 
                    { $(phone).attr('style', "color: #f00;");  var $phoneTRU = false;}  
    
    
                if ($nameTRU != false && $phoneTRU != false) 
                    {   var nameVal = $(name).val(); var phoneVal = $(phone).val(); 
                        $.post("send-message.php",
                            { 
                                name: nameVal,
                                phone: phoneVal /*,
                                buttonName: localStorage["bt"]  */
                            }, 
                            function(data){ 
                                $(name).DimPlaceHolder(nameIF);
                                $(phone).DimPlaceHolder(phoneIF);
                                $("html").attr('style', 'overflow-y: hidden;');
                                scrollCompensation();  
                                $(".scroll__order, .scroll__order2").fadeOut();  
                                $(".scroll, .scroll__spasibo, .scroll__hover").fadeIn(); 
                                Dim_center_pop();
                            }); 
                    }
             return false;
        });                                                           
    }; 
    
    
    
    
    $.fn.DimPlaceHolder=function(x) {
        this.val(x);
        this.attr('style', "color: #AAA;");
            $(this).focus(function(){ 
                if ($(this).val() == x) { $(this).val("");  } 
                if ((this.className == "sec8__name-3") ||
                    (this.className == "sec8__phone-3") ||
                    (this.className == "sec10__name-4") ||
                    (this.className == "sec10__phone-4")) 
                {
                    $(this).attr('style', "color: #fff;");
                } 
                else{
                    $(this).attr('style', "color: #000;");
                }  
            });
            $(this).blur(function(){  if ( $(this).val() == "" || !/\S/.test($(this).val()) )  
                { $(this).val(x).attr('style', "color: #AAA;");}  });
    };
    
    
    
    

    