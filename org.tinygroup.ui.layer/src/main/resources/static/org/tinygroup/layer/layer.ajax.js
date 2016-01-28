
layer.config({
    path: contextPath+"/static/org/tinygroup/layer/",
    shift: 5
});
$(function() {
    $("body").on("click","[ly-ajax-url]",function(){
        var url=$(this).attr("ly-ajax-url");
        var title=$(this).attr("ly-ajax-title");
        if(!title){
            title="信息";
        }
        var width=$(this).attr("ly-ajax-width");
        if(!width){
            width="80%";
        }
        var height=$(this).attr("ly-ajax-height");
        if(!height){
            height="80%";
        }
        $.get(url,function(str){
            layer.closeAll();
            layer.open({
                title:title,
                type:1,
                content: str,
                maxmin:true,
                area: [width, height]
            });
        });
    });
})