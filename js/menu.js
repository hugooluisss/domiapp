function setMenu(){
	$(".collapse").find("[action=salir]").click(function(){
		window.localStorage.removeItem("sesion");
		location.href = "index.html";
	});
	
	$("#btnCamara").click(function(){
		if (navigator.camera != undefined){
			navigator.camera.getPicture(function(imageData) {
					$("#fotoPerfil").attr("src", imageData);
					subirFotoPerfil(imageData);
				}, function(message){
					alertify.error("Ocurrio un error al subir la imagen");
			        setTimeout(function() {
			        	$("#mensajes").fadeOut(1500).removeClass("alert-danger");
			        }, 5000);
				}, { 
					quality: 100,
					destinationType: Camera.DestinationType.FILE_URI,
					targetWidth: 250,
					targetHeight: 250,
					correctOrientation: true,
					allowEdit: true
				});
		}else{
			alertify.error("No se pudo iniciar la cámara");
			console.log("No se pudo inicializar la cámara");
		}
	});
	
	
	function subirFotoPerfil(imageURI){
		var options = new FileUploadOptions();
		
		options.fileKey = "file";
		options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.mimeType = "image/jpeg";
		
		var params = new Object();
		params.identificador = idCliente();
		params.movil = 1;
		options.params = params;
		
		var ft = new FileTransfer();
		ft.upload(imageURI, encodeURI(server + "?mod=cclientes&action=uploadImagenPerfil"), function(r){
				console.log("Code = " + r.responseCode);
		        console.log("Response = " + r.response);
		        console.log("Sent = " + r.bytesSent);
		        
		        alertify.success("La fotografía se cargó con éxito");
			}, function(error){
				alertify.error("No se pudo subir la imagen al servidor" + error.target);
			    console.log("upload error source " + error.source);
			    console.log("upload error target " + error.target);
			}, options);
	}
}