//页面加载显示
$(function(){
    //加载上层画布
    var loading = "<div class='loadding'><div class='pic'><img class='loading-img' src='../../img/loading.gif' alt='加载失败'></div></div>";
    $("body").append(loading);
    //加载状态改变时调用
    document.onreadystatechange=function(){
        //当页面加载完成时隐藏加载动画
        if(document.readyState=="complete"){
            $(".loadding").fadeOut();
        }
    }
})

