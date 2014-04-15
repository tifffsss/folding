
var Origami = function(elt){

	this.elt = elt;
	this.sheetWidth = 0;
	this.sheetHeight = 0;
	this.deg = 0;
	this.clonelimiteWidth = 0;
	
	// todo : load image and check size
	// add method close or reset, open all, random folding

	this.closeAll = function() {
		var self = this;
		console.log('length:',this.elt.children.length);
		Array.prototype.forEach.call(this.elt.children, function(el) {
			console.log('translate',el.ref,el.translateX,el.translateY);
			self.updateRotate3d(el.ref,el.translateX,el.translateY);
		});
	};

	this.updateRotate = function(el,deg) {
		el.style.webkitTransform = 'rotate('+deg+'deg)';
		el.style.mozTransform    = 'rotate('+deg+'deg)';
		el.style.msTransform     = 'rotate('+deg+'deg)';
		el.style.oTransform      = 'rotate('+deg+'deg)';
		el.style.transform       = 'rotate('+deg+'deg)';
	};

	this.updateRotate3d = function(el, translateX, translateY) {
		if(!translateX)translateX = 1;
		if(!translateY)translateY = 1;
		el.style.webkitTransform = 'rotate3d('+translateX+','+translateY+',0,90deg)';
		el.style.mozTransform    = 'rotate3d('+translateX+','+translateY+',0,90deg)';
		el.style.msTransform     = 'rotate3d('+translateX+','+translateY+',0,90deg)';
		el.style.oTransform      = 'rotate3d('+translateX+','+translateY+',0,90deg)';
		el.style.transform       = 'rotate3d('+translateX+','+translateY+',0,90deg)';
	};

	this.init = function() {
		var i = 0;
		var self = this;
		Array.prototype.forEach.call(this.elt.children, function(el) {

			i++;
			var type = el.getAttribute("data-fold-type");
			var src = el.getAttribute("data-src");
			var imgref = el.ref = new Image();
			imgref.onLoad = function(){
				console.log('loaded');
				imgref.style.opacity = 1;
			};
			imgref.src = src;
			el.appendChild(imgref);

			console.log(imgref.offsetWidth);

			if(!type) return;
			var mask = document.createElement("div");
			mask.setAttribute("class", "mask");
			el.appendChild(mask);

			var clonelimite = this.clonelimite = document.createElement("div");
			clonelimite.setAttribute("class", "clone-limite");
			el.appendChild(clonelimite);

			var clonerotate = this.clonerotate = document.createElement("div");
			clonerotate.setAttribute("class", "clone-rotate");
			clonelimite.appendChild(clonerotate);

			var clone = this.clone = document.createElement("div");
			clone.setAttribute("class", "clone");
			clonerotate.appendChild(clone);

			var imgclone = document.createElement("img");
			imgclone.setAttribute("src", src);
			clone.appendChild(imgclone);

			this.sheetWidth = el.offsetWidth;
			this.sheetHeight = el.offsetHeight;
			this.clonelimiteWidth = Math.sqrt(this.sheetWidth*this.sheetWidth+this.sheetHeight*this.sheetHeight);
			this.clonelimiteHeight = this.sheetHeight;
			
			var radian = Math.acos(this.sheetWidth/this.clonelimiteWidth);
			this.deg = radian*(180/Math.PI);
			var pourc = this.sheetWidth*100/this.sheetHeight/100;

			el.translateX = el.translateY = 0;
			var deg1, deg2;
			switch(type){
				case '1' :
				el.setAttribute("class", "sheet topleftfolding");
				deg1 = -this.deg;
				deg2 = this.deg;
				el.translateX = -pourc;
				el.translateY = 1;
				mask.style.borderBottomWidth = this.sheetHeight+'px';
				mask.style.borderLeftWidth = this.sheetWidth+'px';
				break;
				case '2' :
				el.setAttribute("class", "sheet toprightfolding");
				deg1 = this.deg;
				deg2 = -this.deg;
				el.translateX = pourc;
				el.translateY = 1;
				mask.style.borderBottomWidth = this.sheetHeight+'px';
				mask.style.borderRightWidth = this.sheetWidth+'px';
				break;
				case '3' :
				el.setAttribute("class", "sheet bottomrightfolding");
				deg1 = -this.deg;
				deg2 = this.deg;
				el.translateX = -pourc;
				el.translateY = 1;
				mask.style.borderTopWidth = this.sheetHeight+'px';
				mask.style.borderRightWidth = this.sheetWidth+'px';
				break;
				case '4' :
				el.setAttribute("class", "sheet bottomleftfolding");
				deg1 = this.deg;
				deg2 = -this.deg;
				el.translateX = pourc;
				el.translateY = 1;
				mask.style.borderTopWidth = this.sheetHeight+'px';
				mask.style.borderLeftWidth = this.sheetWidth+'px';
				break;
				case '5' :
				el.setAttribute("class", "sheet leftfolding");
				deg1 = 0;
				deg2 = 0;
				el.translateX = 0;
				el.translateY = 1;
				this.clonelimiteWidth = this.sheetWidth/2;
				mask.style.borderLeftWidth = (this.sheetWidth/2)+'px';
				break;
				case '6' :
				el.setAttribute("class", "sheet rightfolding");
				deg1 = 0;
				deg2 = 0;
				el.translateX = 0;
				el.translateY = -1;
				this.clonelimiteWidth = this.sheetWidth/2;
				mask.style.borderRightWidth = (this.sheetWidth/2)+'px';
				break;
				case '7' :
				el.setAttribute("class", "sheet topfolding");
				deg1 = 0;
				deg2 = 0;
				el.translateX = 1;
				el.translateY = 0;
				this.clonelimiteWidth = this.sheetWidth;
				this.clonelimiteHeight = this.sheetHeight/2;
				break;
				case '8' :
				el.setAttribute("class", "sheet bottomfolding");
				deg1 = 0;
				deg2 = 0;
				el.translateX = -1;
				el.translateY = 0;
				this.clonelimiteWidth = this.sheetWidth;
				this.clonelimiteHeight = this.sheetHeight/2;
				break;
			}

			clonelimite.style.width = this.clonelimiteWidth+'px';
			clonelimite.style.height = this.clonelimiteHeight+'px';
			self.updateRotate(this.clonelimite,deg1);

			clonerotate.style.width = clone.style.width = this.sheetWidth+'px';
			clonerotate.style.height = clone.style.height = this.sheetHeight+'px';
			self.updateRotate(this.clonerotate,deg2);

			self.updateRotate3d(this.clone,el.translateX,el.translateY);

		});

    };

};
