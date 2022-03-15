$(function(){
    var $header
    var $detail
    var $detail1
    var $detail2

    var prevBtn
    var nextBtn
    var SkillList //슬라이드 li
    var SkillSize //슬라이드 li size
    var timer
    var currentIndex = 0; //슬라이드 인덱스
    var Skill

    Init();
    scrollHeader();
    HideDetail();
    SkillSlide();
    Event();

    function Init(){
        $header = $("header");
        $detail = $("#detail");
        $detail1 = $("#detail_img1");
        $detail2 = $("#detail_img2");
        prevBtn = $("#prev").children('button');
        nextBtn = $("#next").children('button');
        SkillList = $("#skill_slide").children('li');
        SkillSize = $("#skill_slide").children('li').size();
        Skill = $("#skill");
    }

    // header
    function scrollHeader(){
        if($(window).scrollTop()>0){
            $header.removeClass('headerBColor')
        }
        else{
            $header.addClass('headerBColor');
        }
    }

    // detail
    function ShowDetail(){
        $detail1.children("span").stop().slideDown(1000);
        $detail2.children("span").stop().slideDown(1000);
    }
    function HideDetail(){
        $detail1.children("span").stop().slideUp(500);
        $detail2.children("span").stop().slideUp(500);
    }

    // event
    function Event(){
        $(window).on('scroll',scrollHeader);
        $detail.on('mouseenter',ShowDetail);
        $detail.on('mouseleave',HideDetail);
        prevBtn.on('click',prev);
        nextBtn.on('click',next);
        Skill.on('mouseenter', SkillSlide);
        Skill.on('mouseleave', Stop);
    }

    //자동 전환 슬라이드
    SkillList.eq(0).css({'opacity':1});

    function moveSlide(index){
        SkillList.css({'opacity':0});

        SkillList.stop();
        SkillList.eq(index).stop().animate({'opacity':1}, 2000);

        currentIndex = index;
        SkillList.removeClass('active');
        SkillList.eq(currentIndex).addClass("active");
    }

    function prev(){
        if (currentIndex == 0){
            currentIndex = SkillSize - 1;
            moveSlide(currentIndex);
        }
        else{
            moveSlide(currentIndex - 1);
        }
    }

    function next(){
        if (currentIndex == SkillSize -1){
            currentIndex = 0;
            moveSlide(currentIndex);
        }
        else{
            moveSlide(currentIndex + 1);
        }
    }

    function SkillSlide(){ //슬라이드 자동 전환
        timer = setInterval(NextSlide, 4000)
    }

    function Stop(){
        clearInterval(timer)
    }

    function NextSlide(){
        currentIndex++;
        if(currentIndex >= SkillSize){
            currentIndex = 0
        }
        moveSlide(currentIndex)
    }

    //Responsive menu
    $(window).resize(function(){
        var width = $(window).width();
        if (width<1024){
            $("#menu").css({'display':'inline-block'});
            $(".menubar").children('a').css({'display':'none'});
        }
        else{
            $("#menu").css({'display':'none'});
            $(".menubar").children('a').css({'display':'inline-block'});
        }
    })
    $(window).trigger("resize");

    $("#menu").click(function(){
        $(this).nextAll("a").slideUp();
        if ($(this).nextAll("a").is(':hidden')){
            $(this).nextAll("a").slideDown(1500);
            $(".menubar").children('a').css({'display':'block'});
        }else{
            $(this).nextAll("a").slideUp();
        }
    })
});