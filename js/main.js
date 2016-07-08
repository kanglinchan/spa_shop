define(function(require, exports, module) {

  // 通过 require 引入依赖
  //var $ = require('jquery');
  
  

  //实例化布局 、 加载公用模块；
  var publicComponent = require( './publicComponent' );
  var pc = new publicComponent();
  console.log(pc.setLayout().requirePublicComponent());
  
  //动态路由模块
  var router = require( './router' );
  router();

});