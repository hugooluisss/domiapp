function getOrdenes(){
	$.get("vistas/ordenes.tpl", function(html){
		$(".modulo").html(html);
		
		$.post(server + "listaOrdenesSinTerminar", {
			"movil": 1,
			"json": true,
			"cliente": idCliente
		}, function(resp){
			if (resp.length > 0){
				$.each(resp, function(i, orden){
					var el = $('<li class="list-group-item" datos=\'' + orden.json + '\'><b>' + orden.nombreServicio + '</b> <span style="color: ' + orden.color +'">(' + orden.nombreEstado + ')</span><br /><small>Solicitado el ' + orden.fecha +'</small></li>');
					$("#tplOrdenes").append(el);
					
					el.click(function(){
						$("#winDetalleOrden").attr("datos", el.attr("datos"));
						$("#winDetalleOrden").modal();
					});
				});
			}else{
				alertify.log("Por el momento no tiene ordenes pendientes");
			}
		}, "json");
		
		$("#winDetalleOrden").on("shown.bs.modal", function(e){
			var orden = jQuery.parseJSON($("#winDetalleOrden").attr("datos"));
			var mapaDetalle
			var win = $("#winDetalleOrden");
			win.find("img").prop("src", server + "repositorio/servicios/img" + orden.idServicio + ".jpg");
			
			$.each(orden, function(key, valor){
				win.find("[campo=" + key + "]").html(valor);
			});
			
			win.find("[campo=nombreEstado]").css("color", orden.color);
			
			if (orden.lat2 != null)
				win.find("#mapa").html('<iframe style="border: 0px; width: 100%;" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAI0j32qDb3KrIzHF1ejuK9XGILtsR1AL0&origin=' + orden.lat + ',' + orden.lng + '&destination=' + orden.lat2 + ',' + orden.lng2 + '" />');
			else
				win.find("#mapa").html('<iframe style="border: 0px; width: 100%;" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAI0j32qDb3KrIzHF1ejuK9XGILtsR1AL0&q=' + orden.lat + ',' + orden.lng + '" />');
			
			/*
			mapaDetalle = new google.maps.Map(document.getElementById('mapaDetalle'), {
				center: {lat: orden.lat, lng: orden.lng},
				scrollwheel: true,
				fullscreenControl: true,
				zoom: 10,
				zoomControl: true
			});
			
			if (orden.lat != null){
				var LatLng = new google.maps.LatLng(orden.lat, orden.lng);
				var m1 = new google.maps.Marker({});
				mapaDetalle.setCenter(LatLng);
				m1.setPosition(LatLng);
				m1.setMap(mapaDetalle);
			}
			
			if (orden.lat2 != null){
				var LatLng = new google.maps.LatLng(orden.lat2, orden.lng2);
				var m2 = new google.maps.Marker({});
				mapaDetalle.setCenter(LatLng);
				m2.setPosition(LatLng);
				m2.setMap(mapaDetalle);
			}
			*/
		});
	});
}