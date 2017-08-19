/**
 * Created by Administrator on 2017/8/18 0018.
 */
$(function(){
//    1cate页跳转时，把数据传给产品列表页

    var arr = getRequest();
    var plisttitle = arr["category"];
    var plisttitleid = arr["categoryid"]

    var pageid = 1;
    var totalSize = 10000;


    $('#plisttitle').html(plisttitle);
//    2渲染plist
    getplist(plisttitleid , pageid ,totalSize);


//    3
})






function getplist(plisttitleid,pageid,totalSize){
    $.ajax({
        url:url+'api/getproductlist',
        data:{
            "categoryid":plisttitleid,
            "pageid":pageid
        },
        success:function(result){

            var plisthtml = template('productlisttp1',result)
            $('#productContent').html(plisthtml);
            totalSize = Math.ceil(result.totalCount/result.pagesize)
            var str='';

            for(var i = 1 ; i <= totalSize ; i++){
                str+='<option value='+ i +'>' + i + '</option>';
            }
            $("#productlistSelect").html(str)

            $('#productlistSelect option').each(function(i,item){
                if((i+1) === pageid){
                    $(item).attr('selected','selected');


                }
            })
        },
        complete:function(){
            //$("#btnPre").click = null;
            $("#btnpre").unbind('click').click(function(){
                if(pageid === 1)return false;
                pageid--;

                getplist(plisttitleid,pageid);
            })
            $("#btnNext").unbind('click').click(function(){
                if(pageid === totalSize)return false;
                pageid++;

                getplist(plisttitleid,pageid);
            });





        }


    })



}

//



//获取地址栏参数
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);

        }
    }
    return theRequest;


}