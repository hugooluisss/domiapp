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
var idCliente;
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
		idCliente = window.localStorage.getItem("sesion");
		if (idCliente == null || idCliente == undefined || idCliente == '')
			location.href = "index.html";
			
		$.get("vistas/pago.tpl", function(resp){
			$("#winPago").find(".modal-body").html(resp);
			
			var fecha = new Date();
			var ano = fecha.getFullYear();
			
			for(var i = 0 ; i  < 10 ; i++, ++ano)
				$("#winPago").find(".exp_year").append('<option value="' + ano + '">' + ano + '</option>');
		});
	
		$.post(server + "listaCategoriaServicios", {
			"movil": 1,
			"json": true
		}, function(resp){
			$.each(resp, function(i, el){
				var btnMenu = tplBotonMenu;
				btnMenu = $(btnMenu);
				btnMenu.find("img").attr("src", server + "img/cat" + el.idCategoria + ".png");
				btnMenu.find("[campo=nombre]").html(el.nombre);
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
									pProducto.attr("json", producto.json);
									
									pProducto.find(".solicitar").click(function(){
										$("#winDatosEnvio").attr("datos", pProducto.attr("json"));
										$("#winDatosEnvio").modal();
									});
									
									$(".productos").append(pProducto);
								});
							});
						}, "json");
					});
				});
				
				$("#menu").append(btnMenu);
			});
			
			$("#winDatosEnvio").on('shown.bs.modal', function () {
				var win = $("#winDatosEnvio");
				var producto = jQuery.parseJSON(win.attr("datos"));
				win.find(".modal-title").html(producto.nombre);
				win.find(".img-rounded").attr("src", server + "repositorio/servicios/img" + producto.idServicio + ".jpg");
			});
			
			$("#winDatosEnvio").on('shown.bs.modal', function () {
				$.post(server + "listaSitios", {
					"movil": 1,
					"json": true,
					"cliente": idCliente
				}, function(sitios){
					$("#selOrigen").find("option").remove().end().append('<option value="">Otro lugar</option>').val('posicion');
					$("#selDestino").find("option").remove().end().append('<option value="">Otro lugar</option>').val('posicion');
					
					navigator.geolocation.getCurrentPosition(function(position){
						$("#selOrigen").prepend('<option value="posicion" latitude="' + position.coords.latitude + '" longitude="' + position.coords.longitude + '">Mi posición</option>');
						$("#selDestino").prepend('<option value="posicion" latitude="' + position.coords.latitude + '" longitude="' + position.coords.longitude + '">Mi posición</option>');
					}, function(){
						alertify.error("No se pudo obtener tu ubicación");
					});
					
					$.each(sitios, function(i, sitio){
						console.log(sitio);
						$("#selOrigen").append('<option value="' + sitio.idSitio + '" latitude="' + sitio.lat + '" longitude="' + sitio.lng + '">' + sitio.titulo + '</option>');
						$("#selDestino").append('<option value="' + sitio.idSitio + '" latitude="' + sitio.lat + '" longitude="' + sitio.lng + '">' + sitio.titulo + '</option>');
					});
				}, "json");
			});
		}, "json");
		
		$("#sendWinPago").click(function(){
			$("#winPago").modal();
		});
		
		$("#frmEnvio").submit(function(){
			
		});
	}
};

//app.initialize();

$(document).ready(function(){
	app.onDeviceReady();
	
	//reposition($("#centrarLogo"), $("#centrarLogo").find(".logo"));
	
	$("body").css("height", $(window).height());
	$(".modulo").css("height", $(window).height());
});