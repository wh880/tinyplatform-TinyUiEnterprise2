
layer.config({
    path: contextPath+"/static/org/tinygroup/layer/",
    shift: 5
});
$(function() {
    $("body").on("click","[ly-ajax]",function(){
        var url=$(this).attr("href");
        var type=$(this).attr("ly-ajax-modal");
        if(!type){
            type=1;
        }
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
        if(type==1){
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
        }else{
            layer.open({
                title:title,
                type:2,
                content: url,
                maxmin:true,
                area: [width, height]
            });
        }
        return false;
    });
})