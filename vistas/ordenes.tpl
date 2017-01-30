<br /><br />
<div class="row">
	<div class="col-xs-12 text-center">
		<button class="btn btn-danger" id="btnLlamenme">Láamenme ahora</button>
	</div>
</div>
<br />
<ul class="list-group" id="tplOrdenes"></ul>

<div id="winDetalleOrden" class="modal fade" tabindex="-1" role="dialog" datos="">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Detalle del servicio</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-4">
						<img class="img-responsive" src="" />
					</div>
					<div class="col-xs-8" campo="nombreServicio"/>
				</div>
				<div class="row">
					<div class="col-xs-5"><b>Estado</b></div>
					<div class="col-xs-7" campo="nombreEstado"/>
				</div>
				<div class="row">
					<div class="col-xs-5"><b>Solicitado el</b></div>
					<div class="col-xs-7" campo="fecha"/>
				</div>
				<div class="row">
					<div class="col-xs-5"><b>Costo</b></div>
					<div class="col-xs-7" campo="monto"/>
				</div>
				
				<div class="row">
					<div class="col-xs-5"><b>Atiende</b></div>
					<div class="col-xs-7" campo="nombreAtiende"/>
				</div>
				
				<br />
				<br />
				<div class="row">
					<div class="col-xs-12"><b>¿Algo que necesitemos saber?</b></div>
				</div>
				<div class="row">
					<div class="col-xs-12" campo="notas"/>
				</div>
				<div class="row">
					<!--<div class="col-xs-12" id="mapaDetalle" style="height: 200px;"/>-->
					<div class="col-xs-12" id="mapa">
					</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div>