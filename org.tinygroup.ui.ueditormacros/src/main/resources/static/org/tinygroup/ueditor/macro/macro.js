UE.plugins['macros'] = function () {
    var me = this,thePlugins = 'macros';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL +'macro/macro.pagelet',
                name:thePlugins,
                editor:this,
                title: '宏控件',
                cssRules:"width:600px;height:270px;",
                buttons:[
                    {
                        className:'edui-okbutton',
                        label:'确定',
                        onclick:function () {
                            dialog.close(true);
                        }
                    },
                    {
                        className:'edui-cancelbutton',
                        label:'取消',
                        onclick:function () {
                            dialog.close(false);
                        }
                    }]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup( {
        editor:this,
        content: '',
        className: 'edui-bubble',
        _edittext: function () {
            baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
            me.execCommand(thePlugins);
            this.hide();
        },
        _delete:function(){
            if( window.confirm('确认删除该控件吗？') ) {
                baidu.editor.dom.domUtils.remove(this.anchorEl,false);
            }
            this.hide();
        }
    } );
    popup.render();
    me.addListener( 'mouseover', function( t, evt ) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('tinyplugins');
        if ( /span/ig.test( el.tagName ) && leipiPlugins==thePlugins) {
            var html = popup.formatHtml(
                '<nobr>宏控件: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
            if ( html ) {
                popup.getDom( 'content' ).innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor( popup.anchorEl );
            } else {
                popup.hide();
            }
        }
    });
};

UE.registerUI('button_macros',function(editor,uiName){
    /*if(!this.options.toolleipi)
     {
     return false;
     }*/
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            editor.execCommand('macros');
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"表单设计器",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -401px -40px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
        }
    });
    /*
     //当点到编辑内容上时，按钮要做的状态反射
     editor.addListener('selectionchange', function () {
     var state = editor.queryCommandState(uiName);
     if (state == -1) {
     btn.setDisabled(true);
     btn.setChecked(false);
     } else {
     btn.setDisabled(false);
     btn.setChecked(state);
     }
     });
     */
    //因为你是添加button,所以需要返回这个button
    return btn;
});