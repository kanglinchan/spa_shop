define( function(require, exports , module){
	var $ =require( 'jquery' );
	var widget = require( './widget' );

	function nav(){
		//alert('nav');
		
		

		new navComponent().navRender({
			handlerNavChange:function(){
				$("#nav_header a").each(function(index, el) {
					if(this.className == 'nav_active'){
						$(this).removeClass('nav_active');
					}
				});

				var address = location.hash.match(/^#[\w\_\-]*/,'i');
				 if( address == null || address == '#home'){
					address = '#home';
					$(".nav_item a:first").addClass('nav_active');
				 }else{
				 	$(".nav_item").each(function(index, el) {
						$firstATag = $('a:first',this);
						$('a',this).each(function(index, el) {
							if( this.href.match(address[0]) ){
								$firstATag.addClass('nav_active');
							}
						});
					});
				 }
			} ,
		});

		



	}

	function navComponent(){
		//alert( 'nave'  );
		this.config = {
			logoImg:'./img/logo.png',
		}
	}

	navComponent.prototype = $.extend({}, new widget() , {
		renderUI: function(){
			this.boundingBox = $(
				'<div id="nav_header">'+
					'<div class="nav_logo">'+
						'<a href="#"><img src='+this.config['logoImg']+' alt="home"></a>'+
					'</div>'+
					'<ul class="nav_navBox">'+
					'<li class="nav_item"><a class="nav_active" href="#">首页</a></li>'+
					'<li class="nav_item"><a href="#product">产品展示</a></li>'+
					'<li class="nav_item nav_item_has_child"><a href="javascript:;">关于</a>'+
						'<ul class="nav_child">'+
							'<li class="nav_child_item"><a href="#about/brand">关于品牌</a><i>></i></li>'+
							'<li class="nav_child_item"><a href="#about/history">公司历程</a><i>></i></li>'+
						'</ul>'+
					'</li>'+
					'<li class="nav_item"><a href="#new">新闻</a></li>'+
					'<li class="nav_item"><a href="#service">服务</a></li>'+
					'<li class="nav_item"><a href="#connat">联系</a></li>'+
					'</ul>'+
				'</div>'
				);
		},

		bindUI:function(){
			var _than = this;

			$('.nav_item_has_child').hover(function() {
				$("ul",this).css('display','block');
			}, function() {
				$("ul",this).css('display','none');
			});
			
			$('.nav_child_item').hover(function() {
				$('a',this).animate({'textIndent':'10px'},'1s');
				$('i',this).css('display','block');
			}, function() {
				$('a',this).animate({'textIndent':'0px'},'1s');
				$('i',this).css('display','none');
			});

			//主动触发nav event
			this.config.handlerNavChange();

			//hash chnage triggle
			$(window).on('hashchange',function(){
				_than.config.handlerNavChange();
			})

		},

		navRender:function(cfg){
			$.extend(this.config, cfg);
			this.render( $("#header") );
			return this;
		}

	});


	module.exports = nav;
} )