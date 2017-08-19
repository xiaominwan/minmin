/**
 * Created by Administrator on 2017/8/15 0015.
 */
$(function(){
 getindex();
    getDissale();
    bindclick()
})
function getindex(){
    $.ajax({
        url:url+"api/getindexmenu",
        success:function(result){
            //console.log(result);
            var html1=template("template1",result)
            $("#menu .row").html(html1);

        }


    })
}
function getDissale(){
    $.ajax({
        url:url+"api/getmoneyctrl",
        success:function(result){
            var html2=template("template2",result);
            console.log(result)
            $("#sale .disslist").html(html2);
        }
    })
}
function bindclick(){
    $(".width40 a").click(function(){
        //$("#header").show();

        $("html,body").animate({scrollTop:0},1000);
        return false;


    })
    $("#menu").on("click",$("#menu .item:nth-child(8)"),function(){
        $("#menu .item:nth-last-child(-n+4)").toggle();
    })



}