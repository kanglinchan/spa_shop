define( function(require, exports, module){
	var $ = require('jquery');
	var widget = require('./widget');
	var share = require('./share');
	var customService =require( './customService' );

	function footer(){
		//render footer UI;
		new component().renderFooter();
	}


	function component(){
		this.config = {
			description :"COPYRIGHT (©) 2016 深山老林 kanglin Chen.",
			weiboLink :'http://weibo.com/',
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
			$( ".footer_icon_weibo" ).on('click',function(event){
				event.preventDefault();
				window.location.href = _that.config.weiboLink;
			});

			$(".footer_icon_share").on('click',function(){
				event.preventDefault();
				alert('未设置');
			})

			$('.footer_icon_phone').on('click',function(event){
				event.preventDefault();
				//加载分享模块
				 new share().renderShare() ;
			})

			this.on('service',function(){

				 new customService().renderCustomService();


			});

			//主动加载 客服中心模块
			this.fire('service');

			

			$( ".footer_icon_service" ).on("click",function(event){
				event.preventDefault();
				
				new customService().renderCustomService();
				
			})



		},

		renderFooter:function(config){
			$.extend(this.config, config);
			this.render( $("#footer") );
			return this;			
		}
	});
	
	module.exports = footer;
} )