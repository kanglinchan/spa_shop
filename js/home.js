define(function(require, exports, module){
	var $ =require( 'jquery' );
	var widget = require( './widget' );
	require('./mouseWheel')($);
	require('./jquery.easing')($);

	var banner = require('./bannerSilder');
	var marquee = require('./marquee');
	var productService = require('./productService');
	var productNews = require('./productNews');
	var partner = require('./partner');

	function home(){				
		var fullPageHandler =  new fullPageConponent();
		var self = this;
		fullPageHandler
		.on('completed',function(){
			console.log(self);
			self.banner = new banner()
			.init({container:'.fullPage_item_0'});
		})
		.on('completed',function(){
			new marquee()
			.init({container:'.fullPage_item_1',scrollBox:'#content'});
		})
		.on('completed', function(){
			new productService()
			.init({container:'.fullPage_item_2'});
		})
		.on('completed', function(){
			new productNews()
			.init({container:'.fullPage_item_3'});
		})
		.on('completed', function(){
			new partner()
			.init({container:'.fullPage_item_4'});
		})
		.on('destrutor',function(){
			self.banner.destroy();
		})
		.init();

		//返回组件句柄。
		return fullPageHandler;
	}



	function fullPageConponent(){
		this.config = {
			pageSize:5,
			container:'#content'
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
					$(this).animate({"scrollTop":count * contentH },700 , 'easeInQuint', function(){
						$( 'li',_that.fullPage_nav ).each(function(index, el) {
							$(this).removeClass('active');
						});
						$('li:eq( '+count+' )',_that.fullPage_nav).addClass('active');
						done = true;
					})
				}				
			},function( event ){
				event.preventDefault();
				if(done){
					done = false;
					count--;
					if( count < 0 ){
						count = 0;
					}
					$(this).animate({"scrollTop":count * contentH }, 700, 'easeInQuint',function(){
						$( 'li',_that.fullPage_nav ).each(function(index, el) {
							$(this).removeClass('active');
						});
						$('li:eq( '+count+' )',_that.fullPage_nav).addClass('active');
						done = true;
					});
				}
				
			});

		},

		destructor:function(){
			this.fullPage_nav.remove();
			this.parent.css("overflow",'auto');
			this.parent.removemouseWheel();
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


		/*this.des( function(){
			setTimeout(funtion(){
				alert('ddd');
			}, '2s');
		}),{
			this.boundingBox.animate({
				marginLeft: '-2000px'},
				'speed', function() {
				 stuff to do after animation is complete 
				this.next();
				console.log(this);
			});


			//alert('没注销');
		},
*/
		init:function(config){
			$.extend(this.config, config);
			this.render($(this.config.container));
			this.fire( 'init' );
			return this;
		}


	});
	

	module.exports = home;
})