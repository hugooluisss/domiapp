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
var map = null;
var markerDestino = null;
var markerOrigen = null;
var conektaPublic = "key_MRZCVTdwkzcUVSzzThFcCsg";

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
				
			$("#submitPago").click(function(){
				jsShowWindowLoad("Espere mientras procesamos el pago");
				Conekta.setPublicKey(conektaPublic);
				//Conekta.setPublishableKey(conektaPublic);
				var $form = $("#frmEnvio");
				
				$(".name").val("hugo Santiago");
				$(".number").val("4242424242424242");
				$(".cvc").val("121");
				$(".exp_month").val("11");
				$(".exp_year").val("2018");
	
				// Previene hacer submit más de una vez
				$form.find("#submitPago").prop("disabled", true);
				Conekta.Token.create($form, function(token) {
					var $form = $("#frmEnvio");
					
					/* Inserta el token_id en la forma para que se envíe al servidor */
					$("#conektaTokenId").val(token.id);
					
					/* and submit */
					//$form.get(0).submit();
					$.post(server + 'cpagos', {
						"token": token.id,
						"cliente": idCliente,
						"calle": $(".calle").val(),
						"colonia": $(".colonia").val(),
						"ciudad": $(".ciudad").val(),
						"estado": $(".estado").val(),
						"codigoPostal": $(".codigoPostal").val(),
						"movil": 1,
						"amount": $("#monto").html(),
						"action": "cobroTarjeta"
					}, function(resp) {
						$form.find("button").prop("disabled", false);
						
						if (resp.band == true){
							alertify.success("Muchas gracias por su pago");
							var producto = jQuery.parseJSON($("#winDatosEnvio").attr("datos"));
							var origen = $("#selOrigen").find("option:selected");
							var destino = $("#selDestino").find("option:selected");
							
							$.post(server + "cordenes", {
								"cliente": idCliente,
								"servicio": producto.idServicio,
								"latitud": destino.attr("latitude"),
								"longitud": destino.attr("longitude"),
								"latitud2": producto.precio > 0?'':origen.attr("latitude"),
								"longitud2": producto.precio > 0?'':origen.attr("longitude"),
								"notas": $("#txtNotas").val(),
								"action": "add",
								"movil": 1
							}, function(resp){
								if (resp.band){
									alertify.success("Estamos trabajando en su orden, estamos en camino");
									$("#winDatosEnvio").modal("hide");
									$("#winPago").modal("hide");
									$(".modulo").html("");
								}else
									alertify.error("Ocurrió un error");
							}, "json");
							
						}else
							alertify.error(resp.mensaje);
							
						jsRemoveWindowLoad();
					}, "json");
				
				
				}, function(response) {
					var $form = $("#frmEnvio");
					
					/* Muestra los errores en la forma */
					alertify.error(response.message_to_purchaser);
					$form.find("button").prop("disabled", false);
					
					jsRemoveWindowLoad();
				});
				return false;
			});
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
									
									if (producto.precio == 0)
										pProducto.find("[campo=precio]").parent().hide();
									
									$(".productos").append(pProducto);
								});
							});
						}, "json");
					});
				});
				
				$("#menu").append(btnMenu);
			});
			
			$("#winDatosEnvio").on('show.bs.modal', function () {
				var win = $("#winDatosEnvio");
				var producto = jQuery.parseJSON(win.attr("datos"));
				win.find(".modal-title").find(".titulo").html(producto.nombre);
				win.find(".img-rounded").attr("src", server + "repositorio/servicios/img" + producto.idServicio + ".jpg");
				
				win.find("#groupOrigen").show();
				if (producto.precio > 0)
					win.find("#groupOrigen").hide();
			});
			
			$("#winDatosEnvio").on('shown.bs.modal', function () {
				$.post(server + "listaSitios", {
					"movil": 1,
					"json": true,
					"cliente": idCliente
				}, function(sitios){
					markerDestino.setMap(null);
					markerOrigen.setMap(null);
					$("#selOrigen").find("option").remove().end().append('<option value="">Seleccionar</option>');
					$("#selDestino").find("option").remove().end().append('<option value="">Seleccionar</option>');
					
					$("#selOrigen").find("option").remove().end().append('<option value="-">Otro lugar</option>');
					$("#selDestino").find("option").remove().end().append('<option value="-">Otro lugar</option>');
					
					alertify.log("Estamos obteniendo tu ubicación");
					navigator.geolocation.getCurrentPosition(function(position){
						$("#selOrigen").prepend('<option value="posicion" latitude="' + position.coords.latitude + '" longitude="' + position.coords.longitude + '">Mi posición</option>').val('posicion');
						$("#selDestino").prepend('<option value="posicion" latitude="' + position.coords.latitude + '" longitude="' + position.coords.longitude + '">Mi posición</option>').val('posicion');
						
						if (map == null){
							map = new google.maps.Map(document.getElementById('mapa'), {
								center: {lat: -34.397, lng: 150.644},
								scrollwheel: true,
								zoom: 12
							});
						}
						
						var win = $("#winDatosEnvio");
						var producto = jQuery.parseJSON(win.attr("datos"));
				
						map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
						if (producto.precio == 0){
							markerOrigen.setMap(map);
							markerOrigen.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
							console.info("Agregando la posición de origen");
						}
						
						markerDestino.setMap(map);
						markerDestino.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
						
					}, function(){
						alertify.error("No se pudo obtener tu ubicación");
					});
					
					$.each(sitios, function(i, sitio){
						$("#selOrigen").append('<option value="' + sitio.idSitio + '" latitude="' + sitio.lat + '" longitude="' + sitio.lng + '">' + sitio.titulo + '</option>');
						$("#selDestino").append('<option value="' + sitio.idSitio + '" latitude="' + sitio.lat + '" longitude="' + sitio.lng + '">' + sitio.titulo + '</option>');
					});
				}, "json");
			});
		}, "json");
		
		$("#sendWinPago").click(function(){
			var producto = jQuery.parseJSON($("#winDatosEnvio").attr("datos"));
			var origen = $("#selOrigen").find("option:selected");
			var destino = $("#selDestino").find("option:selected");
			jsShowWindowLoad("Estamos calculando el costo del servicio de entrega");
			
			$.post(server + "cordenes", {
				"action": "getDistancia",
				"json": true,
				"movil": 1,
				"servicio": producto.idServicio,
				"latitud": destino.attr("latitude"),
				"longitud": destino.attr("longitude"),
				"latitud2": origen.attr("latitude"),
				"longitud2": origen.attr("longitude")
			}, function(resp){
				if (resp.distancia > 0){
					$("#winPago").find("#monto").html((parseFloat(resp.monto) + parseFloat(producto.precio)).toFixed(2));
					if (producto.precio > 0)
						alertify.success("El recorrido de " + resp.distancia + "km <br />Costo de envío $ " + resp.monto + "<br /> Producto a enviar: " + producto.precio);
					else
						alertify.success("El recorrido de " + resp.distancia + "km tiene un costo de $ " + resp.monto);
						
					$("#winPago").modal();
				}else
					alertify.error("La distancia debe ser mayor a un kilómetro");
					
				jsRemoveWindowLoad();
			}, "json");
		});
		
		$("#selDestino").change(function(){
			var el = $("#selDestino").find("option:selected");
			var latitude = el.attr("latitude");
			var longitude = el.attr("longitude");
			
			var LatLng = new google.maps.LatLng(latitude,longitude);
			map.setCenter(LatLng);
			markerDestino.setPosition(LatLng);
			markerDestino.setMap(map);
		});
		
		$("#selOrigen").change(function(){
			var el = $("#selOrigen").find("option:selected");
			var latitude = el.attr("latitude");
			var longitude = el.attr("longitude");
			
			var LatLng = new google.maps.LatLng(latitude,longitude);
			map.setCenter(LatLng);
			markerOrigen.setPosition(LatLng);
			markerOrigen.setMap(map);
		});
	}
};

//app.initialize();

$(document).ready(function(){
	app.onDeviceReady();
	
	//reposition($("#centrarLogo"), $("#centrarLogo").find(".logo"));
	
	$("body").css("height", $(window).height());
	$(".modulo").css("height", $(window).height());
	
	markerDestino = new google.maps.Marker({});
	markerOrigen = new google.maps.Marker({});
});