/**
 * Created by Administrator on 2017/8/18 0018.
 */
$(function(){
    var arr = getRequest()
    console.log(arr);
    var plisttitle=arr["category"];
    var plisttitleid=arr["categoryid"]
    var pageid = 1;
    var totalSize = 10000;
//
//
 $('#plisttitle').html(plisttitle);
//    2��Ⱦplist
    getPathDate(plisttitleid,pageid,totalSize);

})
//采用正则表达式获取地址栏中的地址
function getRequest(){
    var url = window.location.search; //获取url中"?"符后的字串
    console.log(url);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");

        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);

            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;}
//获取路径导航中的动态数据
function getPathDate(plisttitleid,pageid,totalSize){
    $.ajax({
        url:url+"api/getproductlist",
        data:{
            "categoryid":plisttitleid,
            "pageid":pageid
        },
        success:function(result){
            console.log(result);
            var html1=template("productlisttp1",result)
            $("#productContent").html(html1);
            totalSize=Math.ceil(result.totalCount/result.pagesize)
            var str="";
            for(var i=1;i<=totalSize;i++){
                str+="<option value="+i+">"+i+"</option>";
            }
                $("#productlistSelect").html(str)
                $("#productlistSelect option").each(function(i,item){
                 if((i+1)===pageid){
                     $(item).attr("selected","selected");
                 }
                })




        },
        complete:function(){
            $("#btnpre").unbind("click").click(function(){
                if(pageid===1)return false;
                pageid--;
                console.log(pageid);
                getPathDate(plisttitleid,pageid);



            })
            $("#btnNext").unbind("click").click(function(){
                if(pageid===totalSize) return false;
                pageid++;
                getPathDate(plisttitleid,pageid);

            })




        }

    })
    $('#productlistSelect').change(function(){
        //console.log();
        pageid = $(this).val();
        getPathDate(plisttitleid,pageid);
    })

}
