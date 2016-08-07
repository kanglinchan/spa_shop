define( function(require, exports, module){
	
	return function(jQuery){
		(function($){
			$.fn.extend({
				mouseWheel:function(down, up){
					var _this = $(this)[0];					
					console.dir(up);
					if( $.browser.mozilla ){
						var type = 'DOMMouseScroll';
						this.callback =  function(event){
							if( event.detail > 0 ){
								down.call(this, event)
								
							}else{
								up.call(this,event);
							}
						}
					}else{
						var type = 'mousewheel';
						this.callback = function(event){
							var event = window.event || event;
							if( event.wheelDelta < 0 ){
								down.call( this ,event )
							} else{
								up.call( this,event );
							}
						}
					}

					if( _this.attachEvent ){
						_this.attachEvent('on'+type , this.callback )
					}else if(_this.addEventListener){
						_this.addEventListener(type, this.callback )

					}
				},
				removemouseWheel:function(callback){
					var _this = $(this)[0];
					if( $.browser.mozilla ){
						var type = 'DOMMouseScroll';
					}else{
						var type = 'mousewheel';
					}
					if( _this.detachevent ){
						_this.detachevent('on'+type,this.callback );
					}else if(_this.addEventListener){
						_this.removeEventListener(type,this.callback );

					}
				}
			})
				
		})(jQuery);
	}

	
} );