define( function(require, exports, module){

	var $ = require('jquery');
	var widget = require('./widget');
	require('./jquery.easing')($);

	function banner( ){
		this.config = {
			content :[{
				title:'11最新限量手提包',
				descript:'时尚女包2016新款韩版潮流苏水桶小包包最新限量手提包休闲简约女士单肩包百搭斜跨包——提拎部件类型: 斜跨式',
				pic:'./img/banner.jpg',
			},
			{
				title:'2最新限量手提包',
				descript:'时尚女包2016新款韩版潮流苏水桶小包包最新限量手提包休闲简约女士单肩包百搭斜跨包——提拎部件类型: 斜跨式',
				pic:'./img/banner.jpg',
			},
			{
				title:'3333最新限量手提包',
				descript:'时尚女包2016新款韩版潮流苏水桶小包包最新限量手提包休闲简约女士单肩包百搭斜跨包——提拎部件类型: 斜跨式',
				pic:'./img/banner.jpg',
			}]
		}
	}

	banner.prototype = $.extend({}, new widget(), {
		renderUI: function(){
			var bannerContent ='', 
				bannerNavContent = '';
			for(var i =0,len = this.config.content.length; i<len; i++ ){
				bannerContent += '<li class=banner_item_"'+ i +'">'+
							'<div class="banner_content">'+
								'<h2>'+this.config.content[i].title +'</h2>'+
								'<div> </div>'+
								'<p>'+this.config.content[i].descript+'</p>'+
							'</div>'+						
						' </li>';

				bannerNavContent += '<li> </li>';
			};
			this.bannerNav  =$('<ul class="banner_nav">'+ bannerNavContent +'</ul>');
			this.bannerArrow = $('<a href="#" class="banner_arrow left" > <img src="./img/arrow-left.svg" alt=""> </a>'+
								'<a href="#" class="banner_arrow right"> <img src="./img/arrow-right.svg" alt=""> </a>');						
			

			this.listWrap = $( '<ul class = "banner_wrap">'+bannerContent +'</ul>' )
			
			this.boundingBox = $('<div class = "banner_container fix"></div>');
			this.boundingBox.append(this.listWrap).append( this.bannerNav ).append(this.bannerArrow);

			
		},

		bindUI:function(){

			var _that = this;

			this.parent = this.boundingBox.parent();

			var parentW = this.parent.width();

			var listLen = this.config.content.length;
			var count = 0;
			var done = true;
			this.autoplay= function( direction ){
			if( done ){
				done = false;
				var direction = direction || 'l';
				
				
				if( direction == "r" ){
					//反向
					count--;
					if( count == -1 ){
						$('li:last', _that.listWrap ).css({
							'position': 'relative',
							'left': listLen * parentW*-1 +'px'
						});
					}
				}else{
					//正向
					count++;
					if( count == listLen ){
						$('li:first', _that.listWrap ).css({
							'position': 'relative',
							'left': 3 * parentW +'px',
						});
					}
				}

				$h2 = $('.banner_content h2').css({
					'top':'30px',
					'opacity': 0,
				})
				$p = $('.banner_content p').css({
					'top':'60px',
					'opacity': 0,
				})

				$div = $('.banner_content div').css({
					'left':'500px',
					'opacity': 0,
				})

				$('li',_that.bannerNav ).removeClass('active').eq( count%_that.config.content.length ).addClass('active');
				_that.listWrap.animate({'marginLeft': count *parentW*-1 +'px'},'1s','easeInCubic' ,function(){
					if( count < 0){
						$('li:last', _that.listWrap ).css({
							'position': 'static',
							'left':0 +'px'
						});
						_that.listWrap.css('marginLeft', (listLen-1) * parentW *-1  +'px');
						count = listLen-1;		
					}
					if( count == listLen){
						$('li:first', _that.listWrap ).css({
							'position': 'static',
							'left':0 +'px'
						});
						_that.listWrap.css('marginLeft', 0  +'px');
						count = 0;
					}

					$h2.animate({top: '0px','opacity': 1,},'1000');
					$div.delay('200').animate({'left':'0','opacity': 1,},'1000');
					$p.delay('500').animate({top: '0px','opacity': 1,},'1000',function(){
						$h2.stop();
						$div.stop();
						$p.stop();
						done = true;
					});
				});
			}
			};

			$('.left', this.boundingBox).on('click',function(event){
				_that.autoplay();
			});
			$('.right', this.boundingBox).on('click',function(event){
				_that.autoplay('r');
			});
			

			this.timer = null;
			this.timer = setInterval(function(){
				_that.autoplay();
			}, 3000);

		},

		destructor:function(){
			clearInterval(this.timer);
		},

		syncUI:function(){
			var parentH = this.parent.height();
			var parentW = this.parent.width();
			$('[class ^= banner_item]').css({
				width: parentW +'px',
				height: parentH +'px'
			});

			this.listWrap.css({
				width: ( parentW * this.config.content.length )+ 'px',
				height: parentH + 'px'
			});

			$(".banner_content").css( 'marginTop', ( parentH - $(".banner_content").height() )/2 +'px' );

			$(".banner_nav").css("marginLeft", $(".banner_nav").width()/-2 + 'px');

			$(".banner_nav li:first").addClass('active');


		},

		init:function(config){
			$.extend(this.config,config);
			this.render( $( this.config.container )  );
			return this;
		}

	});
	


	module.exports = banner;
})