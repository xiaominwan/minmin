/**
 * Created by Administrator on 2017/8/16 0016.
 */
$(function(){
    geTCategoryTitle();
    bindLiClick()
})
function geTCategoryTitle(){
    $.ajax({
        url:url+"api/getcategorytitle",
        success:function(result){
            var html=template("categoryTitleTpl",result);
            //console.log(result);
            $("#categoryuu").html(html);

        }
    })
}
function bindLiClick(){
    $("#categoryuu").on("click",".categoryTitle",function(){
        var tid=parseInt($(this).attr("titleId"));


        $.ajax({
            url:url+"api/getcategory",
            data:{titleid:tid},
            success:function(result){
                var html=template("categoryListTpl",result)
                $(".categoryList"+tid).html(html);
                console.log(result);
            },
               complete:function(){


                   $(".categoryList").hide();

                   $(".categoryList"+tid).show();



               },

        })
        $(".categoryList"+tid).slideToggle("fast");





    })
}