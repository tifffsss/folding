(function() {


	var els = document.getElementsByClassName("origami");
	Array.prototype.forEach.call(els, function(el) {
		var origami = new Origami(el);
		origami.init();
		setTimeout(function(){
		origami.closeAll();

		},2000);
	});


})();