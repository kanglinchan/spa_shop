define( function( require, exports, module ){
	var $ = require('jquery');
	var widget = require('./widget');

	function share (){
		this.config ={ 
			imgQrcode : './img/qrcode.jpg',
			opacity: 0.6,
			imgWidth: 200
		}
	}

	share.prototype = $.extend({}, new widget(), {
		renderUI:function(){

			this._mask = $('<div class="share_mask"></div>');
            this._mask.appendTo("body");

			 var img = '<img src="'+ this.config.imgQrcode+'"/>'
			 this.boundingBox = $('<div class="share_box">'+img+'</div>');

		},

		bindUI:function(){
			var _than = this;
			$(".share_mask").on("click",function(){
				$(".share_box").animate({"marginTop":'-1000'},'1.5s');
				$(this).animate({'opacity':'0'}, '1s',function(){
					_than.destroy();
				});
				
			})
		},

		syncUI:function(){
			$(".share_mask").css('opacity', this.config.opacity);

			$(".share_box").css({
				'width': this.config.imgWidth+'px',
				'marginLeft': ( $(window).width() - this.config.imgWidth )/2+'px',
				'marginTop': ( $(window).height() - this.config.imgWidth )/2+'px'
			});
		},

		destructor:function(){
			$(".share_mask").remove();
		},


		init:function(cfg){
			$.extend(this.config, cfg);
			this.render();
			return this;		
		}

	});

	module.exports = share;
	
} );