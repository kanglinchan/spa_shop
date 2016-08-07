define(function(require, exports, module){
	var $ = require('jquery');
	var widget = require('./widget');

	function partner(){
		this.config = {
			title:{
				header:'合作伙伴',
				desc:'partner',
			},
			partnerList:[
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
				'./img/partner.png',
			]
		}
	}

	partner.prototype = $.extend( {}, new widget(), {
		renderUI:function(){
			this.boundingBox = $('<div class="partner"></div>');
			$titleBox = $('<div class="partner_title">'+
							'<h3>'+this.config.title.header+'</h3>'+
						 	'<p>'+this.config.title.desc+'</p>'+
						'</div>');
			this.boundingBox.append( $titleBox );

			$contentWrap = $('<div class="partner_content" ></div>');

			$contentBox = $('<ul></ul>');

			for(var i = 0, len = this.config.partnerList.length; i<len; i++){

				if(i%8 == 0 ){
					var li = $('<li></li>');
					$contentBox.append(li);
				}
				li.append('<img src="'+this.config.partnerList[i]+'" alt="">');
			}

			$contentWrap.append( $contentBox )

			this.boundingBox.append( $titleBox )
			.append( $contentWrap );

			if(this.config.partnerList.length > 8){
				$navBox = $('<ul class="partner_nav"></ul>');
				var len = Math.ceil(this.config.partnerList.length / 8);

				for(var i=0; i<len; i++){
					if( i == 0 ){
						$navLi = $('<li class ="active"></li>');
					}else{
						$navLi = $('<li></li>');
					}
					$navBox.append( $navLi );
				}

				this.boundingBox.append( $navBox )
			}

		},


		bindUI:function(){
			var self = this;

			var timeId = null;
			$('.partner_content img').hover(function() {
				timeId = setTimeout($.proxy(function(){
					$(this).animate({top:'-30px'}, '2s');
				},this), 200);
			}, function() {
				clearTimeout(timeId);
				$(this).animate({'top':'0px'}, '2s');
			});


			$navLi = $('.partner_nav li');
			$navLi.click(function(event) {
				$navLi.removeClass('active');
				$(this).addClass('active');
				var index = $(this).index('.partner_nav li')
				$('.partner_content ul').animate({'marginLeft': -1*index * 960 +'px'}, '2s');
			});
			$navLi.hover(function() {
				this.style.cursor = 'pointer';
			}, function() {
				/* Stuff to do when the mouse leaves the element */
			});

		},

		syncUI:function(){
			$nav = $('.partner_nav');

			$nav.css({'marginLeft': $nav.width()/-2 +'px'});

		},


		init:function( config ){
			$.extend(this.config,config);
			if(typeof this.config.container  == 'undefined'){
				console.log('需要设置组件容器：格式{container:selector}');
			}
			this.render( $(this.config.container) );
		}
	});
	

	module.exports = partner;
});