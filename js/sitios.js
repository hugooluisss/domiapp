function getSitios(){
	$.get("vistas/sitios.tpl", function(html){
		$(".modulo").html(html);
		
		$.post(server + "listaSitios", {
			"movil": 1,
			"json": true,
			"cliente": idCliente
		}, function(resp){
		
			$("#btnAddSitio").click(function(){
				$("#winAddSitio").find("#latitud").val("");
				$("#winAddSitio").find("#longitud").val("");
				$("#winAddSitio").find("#txtTitulo").val("");
				$("#winAddSitio").find("#txtDireccion").val("");
				$("#winAddSitio").find("#idSitio").val("");
				
				$("#winAddSitio").modal();
				
				navigator.geolocation.getCurrentPosition(function(position){
					if (mapSitio == null){
						mapSitio = new google.maps.Map(document.getElementById('mapaSitio'), {
							center: {lat: position.coords.latitude, lng: position.coords.longitude},
							scrollwheel: true,
							fullscreenControl: true,
							zoom: 12,
							zoomControl: true
						});
						
						google.maps.event.addListener(mapSitio, 'drag', function(){
							$("#winAddSitio").find("#latitud").val(mapSitio.getCenter().lat());
							$("#winAddSitio").find("#longitud").val(mapSitio.getCenter().lng());
							var LatLng = mapSitio.getCenter();
							mapSitio.setCenter(LatLng);
							marcaSitios.setPosition(LatLng);
							marcaSitios.setMap(mapSitio);
						});
						
						var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						mapSitio.setCenter(LatLng);
						marcaSitios.setPosition(LatLng);
						marcaSitios.setMap(mapSitio);
					}else{
						var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						mapSitio.setCenter(LatLng);
						marcaSitios.setPosition(LatLng);
						marcaSitios.setMap(mapSitio);
					}
				}, function(){
					alertify.error("No se pudo obtener tu localización");
				});
			});
			
			$.each(resp, function(i, sitio){
				var el = $('<li class="list-group-item" datos=\'' + sitio.json + '\'>' + sitio.titulo + '</li>');
				$("#tplSitios").append(el);
				
				el.click(function(){
					$("#winAddSitio").modal();
					
					var sitio = jQuery.parseJSON(el.attr("datos"));
					$("#winAddSitio").find("#latitud").val(sitio.lat);
					$("#winAddSitio").find("#longitud").val(sitio.lng);
					$("#winAddSitio").find("#txtTitulo").val(sitio.titulo);
					$("#winAddSitio").find("#txtDireccion").val(sitio.direccion);
					$("#winAddSitio").find("#idSitio").val(sitio.idSitio);
					
					$("#winAddSitio").find("#eliminar").show();
					
					navigator.geolocation.getCurrentPosition(function(position){
						if (mapSitio == null){
							mapSitio = new google.maps.Map(document.getElementById('mapaSitio'), {
								center: {lat: position.coords.latitude, lng: position.coords.longitude},
								scrollwheel: true,
								fullscreenControl: true,
								zoom: 12,
								zoomControl: true
							});
							
							google.maps.event.addListener(mapSitio, 'drag', function(){
								$("#winAddSitio").find("#latitud").val(mapSitio.getCenter().lat());
								$("#winAddSitio").find("#longitud").val(mapSitio.getCenter().lng());
								var LatLng = mapSitio.getCenter();
								mapSitio.setCenter(LatLng);
								marcaSitios.setPosition(LatLng);
								marcaSitios.setMap(mapSitio);
							});
							
							var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							mapSitio.setCenter(LatLng);
							marcaSitios.setPosition(LatLng);
							marcaSitios.setMap(mapSitio);
							
							if (sitio.lat == null){
								$("#winAddSitio").find("#latitud").val(position.coords.latitude);
								$("#winAddSitio").find("#longitud").val(position.coords.longitude);
							}
						}else{
							var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							mapSitio.setCenter(LatLng);
							marcaSitios.setPosition(LatLng);
							marcaSitios.setMap(mapSitio);
							
							if (sitio.lat == null){
								$("#winAddSitio").find("#latitud").val(position.coords.latitude);
								$("#winAddSitio").find("#longitud").val(position.coords.longitude);
							}
						}
					}, function(){
						alertify.error("No se pudo obtener tu localización");
					});
				});
			});
		}, "json")
	})
}