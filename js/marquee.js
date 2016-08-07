define( function(require, exports , module){
	var $ = require('jquery');
	var widget = require('./widget');

	function marquee(){
		this.config = {
			contents:[{
				title:'1玛丽思薇手提包',
				price:'1200',
				pic:'./img/baobao.jpg',
				link:'#product'
			},{
				title:'2玛丽思薇手提包',
				price:'1200',
				pic:'./img/baobao.jpg',
				link:'#product'
			},{
				title:'3玛丽思薇手提包',
				price:'1200',
				pic:'./img/baobao.jpg',
				link:'#product'
			},{
				title:'4玛丽思薇手提包',
				price:'1200',
				pic:'./img/baobao.jpg'
			},{
				title:'5玛丽思薇手提包',
				price:'1200',
				pic:'./img/baobao.jpg',
				link:'#product'
			},{
				title:'6玛丽思薇手提包',
				price:'1200',
				pic:'./img/baobao.jpg',
				link:'#product'
			},{
				title:'7玛丽思薇手提包',
				price:'1200',
				pic:'./img/baobao.jpg',
				link:'#product'
			}],
			scrollBox:'body'
		}
	}

	marquee.prototype = $.extend({}, new widget(), {

		renderUI:function(){
			this.boundingBox = $('<div class="productShow"><div');

			this.title = $('<div class="productShow_title">'+
							'<h3>产品展示</h3>'+
							'<p>纯手工定制</p>'+
							'<div></div>'+
						'</div>');

			this.category = $('<div class="productShow_category">'+
						'<a href="">男款</a>'+
						'<a href="">女款</a>'+
						'<a href="" class="productShow_category_more">more</a>'+
					'</div>');

			this.arrow = $('<div class="productShow_arrow">'+
						'<a class="left" href=""><img src="./img/arrow-left.svg" alt=""></a>'+
						'<a class="right" href=""><img src="./img/arrow-right.svg" alt=""></a>'+
					'</div>');


			var content = '';

			for(var i=0, len = this.config.contents.length; i< len; i++){
				content += '<li class="productShow_item" >'+
							'<a href="'+this.config.contents[i].link+'">'+
								'<div class="productShow_item_search">  </div>'+
								'<div class ="productShow_item_pic">'+
									'<img src="'+this.config.contents[i].pic+'" alt="">'+
								'</div>'+
								'<div class ="productShow_item_progress"></div>'+
								'<h3 class="productShow_item_title">'+this.config.contents[i].title+'</h3>'+
								'<p class="productShow_item_price">价格：'+this.config.contents[i].price+'元</p>'+
							'</a>'+
						'</li>';
			}

			this.warp = $('<div class="productShow_warp">'+
							'<ul class="">'+
								content+
							'</ul>'+
						'<div>');

			this.boundingBox
			.append( this.title )
			.append( this.category )
			.append( this.warp )
			.append( this.arrow );
			
		},

		bindUI:function(){
			var _that = this;
			$parent = _that.boundingBox.parent();
			
			$Li = $('li',_that.warp);
			$Ul = $('ul',_that.warp);
			var warpW = _that.warp.width();
			var w = warpW * 0.205 * 5;

			var count =0;
			$('.left',this.arrow).on('click',function(event){
				event.preventDefault();
				var ulR = $Ul.offset().left + $Ul.width() - (count+1)*w;
				var wrapR = _that.warp.offset().left + _that.warp.width();				
				if(  ulR > wrapR ){
					count++;
					alert(count);
					$Ul.animate({'marginLeft':-1*count*w +'px' }, 'speed');
				}else if (ulR >  _that.warp.offset().left ) {
					var disX = ulR +w - wrapR;
					$Ul.animate({'marginLeft':-1*disX +'px' }, 'speed');
				}
			})

			$('.right',this.arrow).on('click',function(event){
				event.preventDefault();
				var ulL = $Ul.offset().left + (count+1)*w;
				var wrapL = _that.warp.offset().left;				
				if(  ulL < wrapL ){
					count++;
					alert(count);
					$Ul.animate({'marginLeft':count*w +'px' }, 'speed');
				}else if ( ulL <  wrapL + _that.warp.width() ) {
					var disX = wrapL - $Ul.offset().left;
					$Ul.animate({'marginLeft':0 +'px' }, 'speed');
				}
			})


			var timeId = null;
			$Li.css({'marginTop':'400px'})
			$Li.hover(function() {
				timeId = setTimeout( $.proxy( function(){
					$('.productShow_item_search',this).animate({'opacity':0.7, 'top': $(this).height()/2.5 +'px'}, '400');
					$('.productShow_item_progress',this).animate({width:'100%'}, '400');
					$('h3',this).css({color:"#ff072a"});
				}, this), '200');
			}, function() {
				clearTimeout( timeId );
				$('.productShow_item_search',this).animate({'opacity':0, 'top': 0 +'px'}, '300');
				$('.productShow_item_progress',this).animate({width:'0%'}, '300');
				$('h3',this).css({color:"#444"});
			});

			$scrollBox = $( _that.config.scrollBox );
			$scrollBox.scroll(function (event) {
				 if( _that.warp.offset().top < $(window).height() ){
				 	$Li.eq(0).animate({marginTop: 0}, '500');
				 	$Li.eq(1).delay('200').animate({marginTop: 0}, '500');
				 	$Li.eq(2).delay('400').animate({marginTop: 0}, '500');
				 	$Li.eq(3).delay('600').animate({marginTop: 0}, '500');
				 	$Li.eq(4).delay('800').animate({marginTop: 0}, '500',function(){
				 		$scrollBox.off('scroll');
				 		$Li.css('marginTop',0);
				 	});				 	
				 }
			});




		},

		syncUI: function () {

			var _that = this;
			var len = this.config.contents.length;
			var warpW = this.warp.width();	

			$('ul',this.warp).css({
				'width': Math.ceil( (warpW*(0.18 + 0.025)*len) - (warpW*0.025) )  +'px' , 
			});

			$('li', this.warp).css({
				'width': warpW* 0.18 +'px',
				'marginRight': warpW* 0.025 +'px'
			})
			.last().css("marginRight",0 );
		},


		init: function( config ){
			$.extend( this.config, config );
			this.render( $( this.config.container) );
		}

	});
	


	module.exports = marquee;
} )