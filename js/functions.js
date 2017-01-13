server = "http://192.168.2.4/domiAdmin/";
//server = "http://localhost/domiAdmin/";

tplBotonMenu = '<a role="button" class="btn btn-default"><span class="fa-stack"><img src=""></span><div campo="nombre"></div></a>';
/*
*
* Centra verticalmente una ventana modal
*
*/
function reposition(modal, dialog) {
	modal.css('display', 'block');
	
	// Dividing by two centers the modal exactly, but dividing by three 
	// or four works better for larger screens.
	dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
}