<script type="text/javascript" data-conekta-public-key="key_MRZCVTdwkzcUVSzzThFcCsg" src="librerias/conekta/conekta.js"></script>

<div class="container">
	<form onsubmit="javascript: return false" method="post" id="frmPago" name="frmPago" class="form-horizontal" action="">
		<div class="form-group">
			<div class="col-xs-12">
		    	<input type="text" class="form-control input-xs name" data-conekta="card[name]" placeholder="Nombre del tarjetahabiente"/>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-12">
				<input type="text" class="form-control input-xs number" data-conekta="card[number]" placeholder="Número de tarjeta"/>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-4">
				<input type="text" class="form-control input-xs cvc" data-conekta="card[cvc]" placeholder="CVC"/>
			</div>
			<label class="control-label col-xs-3">Monto</label>
			<div class="col-xs-5 text-right" id="monto">
				$ 250.00
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-xs-4">Expiración</label>
			<div class="col-xs-4">
				<select data-conekta="card[exp_month]" class="form-control input-xs exp_month">
					<option value="01">Enero</option>
					<option value="02">Febrero</option>
					<option value="03">Marzo</option>
					<option value="04">Abril</option>
					<option value="05">Mayo</option>
					<option value="06">Junio</option>
					<option value="07">Julio</option>
					<option value="08">Agosto</option>
					<option value="09">Septiembre</option>
					<option value="10">Octubre</option>
					<option value="11">Noviembre</option>
					<option value="12">Diciembre</option>
				</select>
			</div>
			<div class="col-xs-4">
				<select class="form-control input-xs exp_year" data-conekta="card[exp_year]"></select>
			</div>
		</div>
		<div class="form-group">
			<div class="row">
				<div class="col-xs-6 col-xs-offset-3 text-center">
					<button type="button" id="submitPago" class="btn btn-primary btn-block btn-flat">Pagar Ahora</button>
					<input type='hidden' name='conektaTokenId' id="conektaTokenId">
				</div>
			</div>
		</div>
	</form>
</div>