function getSitios(){
	$.get("vistas/sitios.tpl", function(html){
		$(".modulo").html(html);
		
		$.post(server + "listaSitios", {
			"movil": 1,
			"json": true,
			"cliente": idCliente
		}, function(resp){
			
			$.each(resp, function(i, sitio){
				var el = $('<li class="list-group-item" datos=\'' + sitio.json + '\'>' + sitio.titulo + '</li>');
				$("#tplSitios").append(el);
				
				el.click(function(){
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
			});
		}, "json")
	})
}