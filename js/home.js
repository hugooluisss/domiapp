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
		//Esto es para web
		
		$("registro").hide();
		
		$(".nav-tabs a").click(function(){
			$(this).tab('show');
		});
		
		$("#frmLogin").find("#txtUsuario").focus();
		$("#frmLogin").validate({
			debug: true,
			errorClass: "validateError",
			rules: {
				txtUsuario: {
					required : true,
					email: true
				},
				txtPass: {
					required : true
				}
			},
			wrapper: 'span',
			submitHandler: function(form){
				var obj = new TCliente;
				
				obj.login({
					usuario: $("#txtUsuario").val(), 
					pass: $("#txtPass").val(),
					before: function(){
						$("#frmLogin [type=submit]").prop("disabled", true);
					},
					after: function(data){
						if (data.band == false){
							alertify.alert("Tus datos no son válidos");
							$("#frmLogin [type=submit]").prop("disabled", false);
						}else{
							window.localStorage.removeItem("sesion");
							window.localStorage.setItem("sesion", data.cliente);
							
							location.href = "inicio.html";
						}
					}
				});
			}
		});
		
		$("#frmRegistro").validate({
			errorClass: "validateError",
			debug: true,
			rules: {
				txtNombre: {
					required : true,
					email: false
				},
				txtUsuario: {
					required : true,
					email: true,
					remote: {
						url: server + "cclientes",
						type: "post",
						data: {
							action: "validaEmail",
							"movil": 1
						}
					}
				},
				txtPass: {
					required : true,
					minlength: 5
				},
				txtPass2: {
					required : true,
					minlength: 5,
					equalTo: "#frmRegistro #txtPass"
				},
				txtNacimiento: {
					required : true
				}
			},
			wrapper: 'span', 
			messages: {
				txtUsuario: {
					remote: "Este correo ya se encuentra registrado"
				},
				chkTerminos: "Es necesario aceptar los términos y condiciones",
				txtNacimiento: "Indica tu fecha de nacimiento"
			},
			submitHandler: function(form){
				var obj = new TCliente;
				form = $(form);
				
				obj.registrar({
					nombre: form.find("#txtNombre").val(), 
					sexo: form.find("#selSexo").val(), 
					correo: form.find("#txtUsuario").val(), 
					pass: form.find("#txtPass").val(), 
					nacimiento: form.find("#txtNacimiento").val(), 
					before: function(){
						form.find("[type=submit]").prop("disabled", true);
					},
					after: function(data){
						form.find("[type=submit]").prop("disabled", false);
						
						if (data.band == false){
							alertify.error("Ocurrió un error al registrar la cuenta, inténtelo más tarde");
						}else{
							if (form.find("#selSexo").val() == 'M')
								alertify.success("<b>Bienvenido " + form.find("#txtNombre").val() + "</b>, haz quedado registrado");
							else
								alertify.success("<b>Bienvenida " + form.find("#txtNombre").val() + "</b>, haz quedado registrada");
							
							setTimeout(function(){location.reload(true)}, 3000);
						}
					}
				});
			}
		});
	}
};

//app.initialize();

$(document).ready(function(){
	app.onDeviceReady();
	
	//reposition($("#centrarLogo"), $("#centrarLogo").find(".logo"));
	
	$("body").css("height", $(window).height());
	$("registro").css("height", $(window).height());
});