define(function(require, exports, module){
	var $ =require( 'jquery' );
	var widget = require( './widget' );
	require('./mouseWheel')($);
	require('./jquery.easing')($);

	var banner = require('./bannerSilder');
	var marquee = require('./marquee');

	function home(){
				
		var fullPageHandler =  new fullPageConponent();
		fullPageHandler
		.on('completed',function(){
			new banner()
			.init({container:'.fullPage_item_0'});
		})
		.on('completed',function(){
			new marquee()
			.init({container:'.fullPage_item_1'});
		}).init();

		//返回组件句柄。
		return fullPageHandler;
	}



	function fullPageConponent(){
		this.config = {
			pageSize:6,
		}
	}

	fullPageConponent.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			if( this.config.pageSize < 1){
				console.lgo( 'pageSize 参数错误');
				return ;
			}
			var fullPageConyent ='';
			var fullPageNavContent  = '';
			for(var i=0, len = this.config.pageSize; i<len; i++){
				fullPageConyent += '<li class="fullPage_item_'+i+'"></li>';
				fullPageNavContent += '<li class="fullPage_nav_item'+i+'"></li>';
			}
			this.boundingBox = $('<ul class="fullPage_container">'+fullPageConyent+'</ul>');
		
			this.fullPage_nav = $('<ul class="fullPage_nav">'+ fullPageNavContent +'</ul>');

			this.fullPage_nav.appendTo('body');

		},

		bindUI:function(){
			var _that = this;
			this.parent = this.boundingBox.parent();
			var contentH = this.parent.height();
			var count = 0;

			this.parent.css("overflow",'hidden');

			$(".fullPage_container li").css('height',contentH);
			var done = true;
			this.parent.mouseWheel(function(event){
				event.preventDefault()
				if( done ){
					done = false;
					count++;
					if( count >= _that.config.pageSize ){
						count = _that.config.pageSize -1;
					}
					$(this).animate({"scrollTop":count * contentH },1000 , 'easeInQuint', function(){
						done = true;
					})
					$( 'li',_that.fullPage_nav ).each(function(index, el) {
						$(this).removeClass('active');
					});
					$('li:eq( '+count+' )',_that.fullPage_nav).addClass('active');
				}

				
			},function( event ){
				event.preventDefault();
				if(done){
					done = false;
					count--;
					if( count < 0 ){
						count = 0;
					}
					$(this).animate({"scrollTop":count * contentH }, 1000, 'easeInQuint',function(){
						done = true;
					});
					$( 'li',_that.fullPage_nav ).each(function(index, el) {
						$(this).removeClass('active');
					});
					$('li:eq( '+count+' )',_that.fullPage_nav).addClass('active');
				}
				
			});
		},

		syncUI:function(){
			this.fullPage_nav.css({
				marginTop: ($(window).height() - this.fullPage_nav.height())/2 +'px',
			});

			$( "[class ^= fullPage_item]" ).css({
				width: this.parent.width(),
				height: this.parent.height()
			});

			$('li:first', this.fullPage_nav ).addClass('active');
		},

		destructor:function(){
			alert('没注销');
		},

		init:function(config){
			$.extend(this.config, config);
			this.render($('#content'));
			this.fire( 'init' );
			return this;
		}


	});
	

	module.exports = home;
})