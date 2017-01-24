<form onsubmit="javascript: return false" method="post" id="frmActualizarDatos" name="frmActualizarDatos">
	<div id="winDatos" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Mis datos</h4>
				</div>
				<div class="modal-body">
						<div class="form-group has-feedback">
							<input type="email" class="form-control" placeholder="Correo electrónico" id="txtUsuario" name="txtUsuario" autocomplete="no" readonly="true">
							<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
						</div>
						
						<div class="form-group has-feedback">
							<input type="text" class="form-control" placeholder="Nombre completo" id="txtNombre" name="txtNombre" autocomplete="no">
							<span class="glyphicon glyphicon-user form-control-feedback"></span>
						</div>
						
						<div class="form-group">
							<select class="form-control" id="selSexo" name="selSexo">
								<option data-icon="fa fa-male" value="M">Hombre</option>
								<option data-icon="fa fa-female" value="F">Mujer</option>
							</select>
						</div>
						<div class="form-group has-feedback">
							<input type="text" class="form-control" placeholder="Fecha de nacimiento (YYYY-MM-DD)" id="txtNacimiento" name="txtNacimiento" autocomplete="false">
							<span class="glyphicon glyphicon-calendar form-control-feedback"></span>
						</div>
				</div>
				<div class="modal-footer">
					<button type="submit" id="agregar" class="btn btn-primary">Actualizar</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</form>
</div>