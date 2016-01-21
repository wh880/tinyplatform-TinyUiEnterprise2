/* Yukon Admin all functions
 *
 * Content:
 *
 * 1. Helpers
 * 2. Common functions
 * 3. Plugins
 *
 * */

    $(function () {
        // bootstrap custom functions
        yukon_bs_custom.accordion_active_class();
        yukon_bs_custom.dropdown_click();
        yukon_bs_custom.tooltips_init();
        yukon_bs_custom.popover_init();

        // switchery
        yukon_switchery.init();

        // side menu
        yukon_main_menu.init();

        // style switcher
        yukon_style_switcher.init();

        // typeahead (header)
        //yukon_typeahead.init();

        // fastclick (eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers)
        FastClick.attach(document.body);
    });


/* Helpers */
    /* Detect touch devices */
    function is_touch_device() {
        return !!('ontouchstart' in window);
    }
    /* Detect hi-res devices */
    function isHighDensity() {
        return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
    }
	/*
	* debouncedresize: special jQuery event that happens once after a window resize
	* throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery-smartresize
	*
	* Copyright 2012 @louis_remi
	* Licensed under the MIT license.
    *
	*/
	(function(a){var d=a.event,b,c;b=d.special.debouncedresize={setup:function(){a(this).on("resize",b.handler)},teardown:function(){a(this).off("resize",b.handler)},handler:function(a,f){var g=this,h=arguments,e=function(){a.type="debouncedresize";d.dispatch.apply(g,h)};c&&clearTimeout(c);f?e():c=setTimeout(e,b.threshold)},threshold:150}})(jQuery);
    (function(b){var f=b.event,c,g={_:0},a=0,d,e;c=f.special.throttledresize={setup:function(){b(this).on("resize",c.handler)},teardown:function(){b(this).off("resize",c.handler)},handler:function(h,k){var l=this,m=arguments;d=!0;e||(setInterval(function(){a++;if(a>c.threshold&&d||k)h.type="throttledresize",f.dispatch.apply(l,m),d=!1,a=0;9<a&&(b(g).stop(),e=!1,a=0)},30),e=!0)},threshold:0}})(jQuery);

/* common functions */

    /* main menu */
    yukon_main_menu = {
        init: function () {

            // add '.has_submenu' class if section has childrens
            $('#main_menu ul > li').each(function () {
                if ($(this).children('ul').length) {
                    $(this).addClass('has_submenu');
                }
            });

            // accordion menu
            $(document).off('click', '.side_menu_expanded #main_menu .has_submenu > a').on('click', '.side_menu_expanded #main_menu .has_submenu > a', function () {
                if($(this).parent('.has_submenu').hasClass('first_level')) {
                    var $this_parent = $(this).parent('.has_submenu'),
                        panel_active = $this_parent.hasClass('section_active');

                    if (!panel_active) {
                        $this_parent.siblings().removeClass('section_active').children('ul').slideUp('200');
                        $this_parent.addClass('section_active').children('ul').slideDown('200');
                    } else {
                        $this_parent.removeClass('section_active').children('ul').slideUp('200');
                    }
                } else {
                    var $submenu_parent = $(this).parent('.has_submenu'),
                        submenu_active = $submenu_parent.hasClass('submenu_active');

                    if (!submenu_active) {
                        $submenu_parent.siblings().removeClass('submenu_active').children('ul').slideUp('200');
                        $submenu_parent.addClass('submenu_active').children('ul').slideDown('200');
                    } else {
                        $submenu_parent.removeClass('submenu_active').children('ul').slideUp('200');
                    }
                }
            });

            // side menu initialization
            if(!$('#main_menu .has_submenu').hasClass('section_active')) {
                $('#main_menu .has_submenu .act_nav').closest('.has_submenu').children('a').click();
            } else {
                $('#main_menu .has_submenu.section_active').children('ul').show();
            }

            $('.menu_toggle').click(function() {
                if($('body').hasClass('side_menu_expanded')) {
                    yukon_main_menu.menu_collapse();
                } else if($('body').hasClass('side_menu_collapsed')) {
                    yukon_main_menu.menu_expand();
                }
                $(window).off("debouncedresize").trigger('resize').on("debouncedresize");
            });

            // collapse navigation on mobile devices
            if($('body').hasClass('side_menu_expanded') && $(window).width() <= 992 ) {
                yukon_main_menu.menu_collapse();
            }

            // create scrollbar if menu is expanded
            if($('body').hasClass('side_menu_expanded')) {
                yukon_main_menu.menu_scrollbar_create();
            }

            // uncomment function bellow to activate saving side menu states
            //yukon_main_menu.menu_cookie();

        },
        menu_expand: function() {
            $('body').addClass('side_menu_expanded').removeClass('side_menu_collapsed');
            $('.menu_toggle').find('.toggle_left').show();
            $('.menu_toggle').find('.toggle_right').hide();
            yukon_main_menu.menu_scrollbar_create();
        },
        menu_collapse: function() {
            $('body').removeClass('side_menu_expanded').addClass('side_menu_collapsed');
            $('.menu_toggle').find('.toggle_left').hide();
            $('.menu_toggle').find('.toggle_right').show();
            yukon_main_menu.menu_scrollbar_destroy();
        },
        menu_cookie: function() {
            $('.menu_toggle').on('click',function() {
                if($('body').hasClass('side_menu_expanded')) {
                    $.cookie('side_menu', '1');
                } else if($('body').hasClass('side_menu_collapsed')) {
                    $.cookie('side_menu', '0');
                }
            });

            var $side_menu_cookie = $.cookie('side_menu');

            if($side_menu_cookie != undefined) {
                if($side_menu_cookie == '1') {
                    yukon_main_menu.menu_expand();
                } else if($side_menu_cookie == '0') {
                    yukon_main_menu.menu_collapse();
                }
            }
        },
        position_top: function() {
            $('body')
                .removeClass('side_menu_active side_menu_expanded side_menu_collapsed')
                .addClass('top_menu_active');
        },
        position_side: function() {
            $('body')
                .removeClass('top_menu_active')
                .addClass('side_menu_active');
            yukon_main_menu.menu_collapse();
        },
        menu_scrollbar_create: function() {
            $("#main_menu .menu_wrapper").mCustomScrollbar({
                theme: "minimal-dark",
                scrollbarPosition: "outside"
            });
        },
        menu_scrollbar_destroy: function() {
            $("#main_menu .menu_wrapper").mCustomScrollbar('destroy');
        }
    };

    // style switcher
    yukon_style_switcher = {
        init: function() {
            var $styleSwitcher = $('#style_switcher');

            // toggle style switcher
            $('.switcher_toggle').on('click', function(e) {
                if(!$styleSwitcher.hasClass('switcher_open')) {
                    $styleSwitcher.addClass('switcher_open')
                } else {
                    $styleSwitcher.removeClass('switcher_open')
                }
                e.preventDefault();
            });

            // layout switch
            $('#fixed_layout_switch').attr('checked',false).on('change', function () {
                if( $('#fixed_layout_switch').prop('checked') ) {
                    $('body').addClass('fixed_layout');
                    $('#fixed_layout_bg_switch').show();
                } else {
                    $('body').removeClass('fixed_layout');
                    $('#fixed_layout_bg_switch').hide();
                }
                $(window).resize();
            });

            // menu position
            $('#top_menu_switch').attr('checked',false).on('change', function () {
                if( $('#top_menu_switch').is(':checked') ) {
                    yukon_main_menu.position_top();
                    yukon_main_menu.menu_scrollbar_destroy();
                } else {
                    yukon_main_menu.position_side();
                    if($('body').hasClass('side_menu_collapsed')) {
                        yukon_main_menu.menu_scrollbar_destroy();
                    } else if($('body').hasClass('side_menu_expanded')) {
                        yukon_main_menu.menu_scrollbar_create();
                    }
                }
                $(window).resize();
            });



            // hide breadcumbs
            $('#breadcrumbs_hide').attr('checked',false).on('change', function () {
                if( $('#breadcrumbs_hide').prop('checked') ) {
                    $('body').addClass('hide_breadcrumbs');
                } else {
                    $('body').removeClass('hide_breadcrumbs');
                }
            });

			// top bar style
            $('#topBar_style_switch li').on('click',function() {
                var topBarStyle = $(this).attr('title');
                $('#topBar_style_switch li').removeClass('style_active');
                $(this).addClass('style_active');
                $('#main_header').removeClass('topBar_style_1 topBar_style_2 topBar_style_3 topBar_style_4 topBar_style_5 topBar_style_6 topBar_style_7 topBar_style_8 topBar_style_9 topBar_style_10 topBar_style_11 topBar_style_12 topBar_style_13 topBar_style_14').addClass(topBarStyle);
            });

            // fixed layout background
            if( !$('body').hasClass('fixed_layout') ) {
                $('#fixed_layout_bg_switch').hide();
            }
            $('#fixed_layout_bg_switch ul li').on('click',function() {
                var fixedLayBg = $(this).attr('title');
                $('#fixed_layout_bg_switch ul li').removeClass('style_active');
                $(this).addClass('style_active');
                $('body').removeClass('bg_0 bg_1 bg_2 bg_3 bg_4 bg_5 bg_6 bg_7').addClass(fixedLayBg);
            });

            // show CSS
            $('#showCSSModal').on('show.bs.modal', function (e) {
                $bodyClasses = $('body').attr('class');
                $headerClasses = $('#main_header').attr('class');

                $bodyClassesStr =
'// &lt;body&gt; classes'
+ '<br>&lt;body class="'+ $bodyClasses + '"&gt;...&lt;/body&gt;';

                if(typeof $headerClasses !== "undefined" && $headerClasses != '') {
                    $headerClassesStr =
'<br><br>'
+ '// &lt;header&gt; classes'
+ '<br>&lt;header id="main_header" class="' + $headerClasses + '"&gt;...&lt;/header&gt;';
                } else {
                    $headerClassesStr = '';
                }

                $('#showCSSPre').html($bodyClassesStr + '' + $headerClassesStr);
            })

        }
    }

    // bootstrap custom functions
    yukon_bs_custom = {
        accordion_active_class: function() {
            if($('.panel-collapse').length) {
                $('.panel-collapse.in').closest('.panel').addClass('panel-active');
                $('.panel-collapse').on('hide.bs.collapse', function () {
                    $(this).closest('.panel').removeClass('panel-active');
                }).on('show.bs.collapse', function () {
                    $(this).closest('.panel').addClass('panel-active');
                })
            }
        },
        dropdown_click: function() {
            // prevent closing notification dropdown on content click
            if($('.header_notifications .dropdown-menu').length) {
                $('.header_notifications .dropdown-menu').click(function(e) {
                    e.stopPropagation();
                });
            }
        },
        tooltips_init: function() {
            $('.bs_ttip').tooltip({
                container: 'body'
            });
        },
        popover_init: function() {
            $('.bs_popup').popover({
                container: 'body'
            });
        }
    };



/* plugins */


       // switchery
    yukon_switchery = {
        init: function() {
            if($('.js-switch').length) {
                $('.js-switch').each(function() {
					new Switchery(this);
				})
            }
            if($('.js-switch-blue').length) {
                $('.js-switch-blue').each(function() {
					new Switchery(this, { color: '#41b7f1' });
				})
            }
            if($('.js-switch-success').length) {
                $('.js-switch-success').each(function() {
					new Switchery(this, { color: '#8cc152' });
				})
			}
			if($('.js-switch-warning').length) {
                $('.js-switch-warning').each(function() {
					new Switchery(this, { color: '#f6bb42' });
				})
			}
			if($('.js-switch-danger').length) {
                $('.js-switch-danger').each(function() {
					new Switchery(this, { color: '#da4453' });
				})
			}
			if($('.js-switch-info').length) {
                $('.js-switch-info').each(function() {
					new Switchery(this, { color: '#37bc9b' });
				})
			}
        }
    };







function launchFullScreen(element) {
  var request;
  if (!$('body').hasClass("full-screen")) {
      request = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen ||	element.msRequestFullScreen;
      if(typeof request!="undefined" && request){
          request.call(element);
      }else{
          alert("你的浏览器不支持，请按F11进行全屏预览");
          return false;
      }
  } else {
      request = document.cancelFullScreen|| document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msCancelFullScreen || document.exitFullscreen;
      if(typeof request!="undefined" && request){
          request.call(document);
      }
  }
  $('body').toggleClass("full-screen");
}