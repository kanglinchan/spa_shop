define( function(require, exports, module){
	var $ = require( 'jquery' );
	var widget = require('./widget');

	function customService(){
		this.config = {
			title: '客服中心',
			tel:'150-150-567-50',
			qq_costom_service:[{
				link:'http://sighttp.qq.com/authd?IDKEY=223d133740d46b8614858a8464c82773d33e9de4e1349795',
				qq:'601168226'
			},{
				link:'http://sighttp.qq.com/authd?IDKEY=223d133740d46b8614858a8464c82773d33e9de4e1349795',
				qq:'601168226'
			}]

			
		}
	};

	customService.prototype = $.extend({}, new widget(), {
		renderUI:function(){

			if( !this.config.qq_costom_service instanceof Array){
				console.log( "qq_costom_service 参数错误" );
				return;
			}
			var qq_costom_service_str = '';
			for( var i = 0, len =this.config.qq_costom_service.length; i< len; i++ ){
				qq_costom_service_str += '<li class="custom_service_qq">'+
				'<a href="'+ this.config.qq_costom_service[i].link+'"><i></i><p>'+this.config.qq_costom_service[i].qq+'</p></a>'+
				'</li>';				
			}

			var content = '<ul class="custom_service_content">'+
			'<li class="custom_service_title">'+
				'<h3>'+ this.config.title +'</h3>'+
				'<a href="#" ><div class="custom_service_close"></div></a>'+
			'</li>'+
			qq_costom_service_str+
			'<li class="custom_service_tel">'+
				'<i></i>'+
				'<p>联系电话</p>'+
			'</li>'+
			'<li class="custom_service_telNem">'+
				'<span>'+ this.config.tel +'</span>'+
			'</li>'+
		'</ul>';

			this.boundingBox = $('<div class="custom_service">'+ content +'</div>' );
		},

		bindUI:function(){
			var _that = this;
			$('.custom_service_close').on('click',function(event){
				event.preventDefault();
				_that.destroy();
			})

			$('.custom_service_qq').hover(function(){
				$('a',this).animate({"lineHeight":'50px'},'1s');
				$('i',this).animate({"marginTop":'15px'},'1s');
			},function(){
				$('a',this).animate({"lineHeight":'40px'},'1s');
				$('i',this).animate({"marginTop":'10px'},'1s');
			})
		},

		init:function(config){
			 if( $(".custom_service")[0] != null ){
			 	return;
			 }
			$.extend(this.config, config);
			this.render();
			return this;
		}
	});
	
	module.exports = customService;
} )