define( function(require, exports, module){
	var $ = require('jquery');
	var widget = require('./widget');
	var share = require('./share');
	var customService =require( './customService' );

	function footer(){
		//render footer UI;
		new component()
		.on('loaded',function(){
			 new customService()
				 .on('loaded',function(){
				 	$('.footer_icon_service a').animate({"opacity":'0.3'},'fast').mouseenter(function(event){
				 		$(this).css('cursor','not-allowed');
				 	})
				 })
				 .on('destructor',function(){
				 	$('.footer_icon_service a').animate({"opacity":'1'},'fast').mouseenter(function(event){
				 		$(this).css('cursor','pointer');
				 	})
				 })
				 .init();
		})
		.init({
			shareHandler:function(){
				alert('未设置！');
			},
			weiboHandler:function(){
				window.location.href = 'http://weibo.com/';
			},
			phoneHandler:function(){
				new share().init();
			},
			serviceHandler:function(){
				new customService().init();	
			}
		});
	}


	function component(){
		this.config = {
			description :"COPYRIGHT (©) 2016 深山老林 kanglin Chen.",
		}
	}
	component.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			var footerContent ='<ul class = "footer_icon">'+
				'<li> <p>'+this.config.description+'</p> </li>'+
				'<li class="footer_icon_weibo"><a href = "#"><img src="./img/weibo.svg" alt=""></a></li>'+
				'<li class="footer_icon_share"><a href = "#"><img src="./img/share.svg" alt=""></a></li>'+
				'<li class="footer_icon_phone"><a href = "#"><img src="./img/phone.svg" alt=""></a></li>'+
				'<li class="footer_icon_service"><a href = "#"><img src="./img/service.svg" alt=""></a></li>'+
			'</ul>'
			this.boundingBox = $('<div class="footer_box">'+ footerContent +'</div>');
		},

		bindUI:function(){
			var _that = this;

			this.fire( 'loaded' );

			if(_that.config.weiboHandler ){
				$( ".footer_icon_weibo" ).on('click',function(event){
					event.preventDefault();
					_that.config.weiboHandler();
				});
			};


			if( _that.config.shareHandler ){
				$(".footer_icon_share").on('click',function(event){
					event.preventDefault();				
					_that.config.shareHandler();
				});
			}
			

			if( _that.config.phoneHandler ){
				$('.footer_icon_phone').on('click',function(event){
					event.preventDefault();
					_that.config.phoneHandler()
				})
			}

			if( _that.config.serviceHandler){
				$( ".footer_icon_service" ).on("click",function(event){
					event.preventDefault();				
					_that.config.serviceHandler();		
				})
			}

		},

		destructor:function(){
			this.fire('destructor');
		},

		init:function(config){
			$.extend(this.config, config);
			this.render( $("#footer") );
			return this;			
		}
	});
	
	module.exports = footer;
} )