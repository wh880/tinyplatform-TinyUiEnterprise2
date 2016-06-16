(function ($) {
        var menuNav = function (config) {
            config = config || {};
            var defaults = menuNav.defaults
            // 合并默认配置
            for (var i in defaults) {
                if (config[i] === undefined) config[i] = defaults[i];
            };
            return new menuNav.fn._init(config);
        };

        menuNav.fn = menuNav.prototype = {
            _init: function (config) {
                var that = this;
                that.groups = {};
                that.config = config;
                that.group(config.menu);
                var html = that.getDom(that.groups[config.rootId]);
                $('#'+config.id).append(html);
                that.editDom(config.id); 	//修改dom结构
                that._bindEnv(config.id);	//绑定点击事件
                that.currentEvn(config.id,config.currentId);  //当前选中效果
                return that;
            },
            group:function(data){
                var that = this;
                for(var i=0;i<data.length;i++){
                    if(that.groups[data[i].pId]){
                        that.groups[data[i].pId].push(data[i]);
                    }else{
                        that.groups[data[i].pId]=[];
                        that.groups[data[i].pId].push(data[i]);
                    }
                }
                return that;
            },
            getDom:function(data){
                var that = this;
                if(!data){return ''}
                var html='<ul>';
                for(var i=0;i<data.length;i++){
                    html+='<li><a id="'+ data[i].id +'" href="' + that.config.linkUrl + data[i].id +'"><div class="nav-icon"><span class="glyphicon glyphicon-triangle-bottom"></span></div><div class="menu-title">'+data[i].name+'</div></a>';
                    html+=that.getDom(that.groups[data[i].id]);
                    html+='</li>';
                };
                html+='</ul>';
                return html;
            },
            editDom:function(id){
                $('#'+ id).find('a').each(function(){
                    if($(this).siblings('ul').length === 0){
                        $(this).children('div.nav-icon').empty();
                    }
                })
            },
            currentEvn: function(id,curId){
                $('#'+ id).find('a').removeClass('active');
                $('#'+ curId).addClass('active');
            },
            _bindEnv: function(id){
                $("#"+id).off('click.treetoggle').on('click.treetoggle','span.glyphicon',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    if($(this).parents('a').siblings('ul').length > 0){
                        $(this).parents('a').siblings('ul').slideToggle(0).end().children('div').children('span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-right');
                    }
                })
            }
        }
        menuNav.fn._init.prototype = menuNav.fn;
        $.fn.menuNav = function () {
            var config = arguments;
            this[this.live ? 'live' : 'bind']('click', function () {
                menuNav.apply(this, config);
                return false;
            });
            return this;
        };

        /**
         * 默认配置
         */
        menuNav.defaults = {
            id: null,
            menu: null,		//导航数据
            currentId: null, //当前选中ID
            rootId: ''|| 0,      //根节点,默认为''
            linkUrl: null
        };
        window.menuNav = $.menuNav = menuNav;
    })(jQuery);