<div id="winAddSitio" class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Sitio</h4>
			</div>
			<div class="modal-body">
				<div class="col-xs-12" id="mapaSitio">&nbsp;</div>
				<div class="col-xs-12">
					<br />
					<form id="frmAddSitio" onsubmit="javascript: return false;">
						<div class="form-group" id="groupOrigen">
							<label for="txtTitulo">Título:</label>
							<input class="form-control input-sm" id="txtTitulo" name="txtTitulo" />
						</div>
						<div class="form-group" id="groupOrigen">
							<label for="txtDireccion">Dirección:</label>
							<div class="input-group">
								<input class="form-control input-sm" id="txtDireccion" name="txtDireccion" autocomplete="false" autofocus="true" />
								<span class="input-group-addon" id="btnDireccion"><i class="fa fa-search" aria-hidden="true"></i></span>
							</div>
						</div>
						
						<input type="hidden" id="latitud" />
						<input type="hidden" id="longitud" />
					</form>
					<ul class="list-group">
					</ul>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" id="agregar" class="btn btn-primary">Agregar</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div>