define(function(require, exports, module){
	var $ =require( 'jquery' );
	var widget = require( './widget' );

	function home(){
		$(document).append('<h1>home<h1>');
		//alert( 'df' );
		$('body').append('<h1>home</h1>');

		new pageComponent().renderPage({pageSize:1})
	}

	function pageComponent(){
		this.config = {
			pageSize: 2,
		}
	}

	pageComponent.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			if( this.config.pageSize < 2 ){
				console.log( 'pageSize is less than 2' );
			}
			$pageContainer = $('<div id ="page_container"></div>')
		},

		renderPage:function(cfg){
			$.extend(this.config, cfg );
			this.render();
			return this;
		},
	});


	module.exports = home;
})