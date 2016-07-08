define( function(require, exports, module){

	function router(){
		var $ = require('jquery');
		$(window).on('hashchange', function(){

			var componentName = location.hash.replace('#', '');
			if( componentName == '' ){
				componentName = 'home';
			}
			require.async('./'+componentName, function( component ){ //异步加载模块				
				try{
				   new component();
				}catch(error){
					if( error.message == "component is not a constructor" ){
						//alert('message');
						//window.location.hash = './404.html';
						alert('404');
					}
				}
				
			} )
		})
	}

	module.exports = router;
} )
