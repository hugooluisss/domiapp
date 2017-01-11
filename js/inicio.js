/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db = null;
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		$.post(server + "listaCategoriaServicios", {
			"movil": 1,
			"json": true
		}, function(resp){
			
			$.each(resp, function(i, el){
				var btnMenu = tplBotonMenu;
				btnMenu = $(btnMenu);
				btnMenu.find("img").attr("src", server + "img/cat" + el.idCategoria + ".png");
				btnMenu.attr("datos", el.json);
				
				btnMenu.click(function(){
					$.get("vistas/categoria.tpl", function(pCategoria){
						pCategoria = $(pCategoria);
						
						var el = jQuery.parseJSON(btnMenu.attr("datos"));
						
						$.each(el, function(campo, valor){
							pCategoria.find("[campo=" + campo + "]").html(valor);
							
							$(".modulo").html(pCategoria);
						});
						
						$.post(server + "listaServicios", {
							"movil": 1,
							"json": true,
							"categoria": el.idCategoria
						}, function(productos){
							$.get("vistas/producto.tpl", function(viewProducto){
								$.each(productos, function(i, producto){
									var pProducto = viewProducto;
									pProducto = $(pProducto);
									
									pProducto.find("img").attr("src", server + "repositorio/servicios/img" + producto.idServicio + ".jpg");
									
									$.each(producto, function(campo, valor){
										pProducto.find("[campo=" + campo + "]").html(valor);
									});
									
									$(".productos").append(pProducto);
								});
							});
						}, "json");
					});
				});
				
				$("#menu").append(btnMenu);
			});
		}, "json");
	}
};

//app.initialize();

$(document).ready(function(){
	app.onDeviceReady();
	
	//reposition($("#centrarLogo"), $("#centrarLogo").find(".logo"));
	
	$("body").css("height", $(window).height());
	$(".modulo").css("height", $(window).height());
});