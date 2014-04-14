
var Origami = function(elt){

	this.elt = elt;
	this.sheetWidth = 0;
	this.sheetHeight = 0;
	this.deg = 0;
	this.clonelimiteWidth = 0;

	// todo : load image and check size
	// check if photo height > width
	// add method close or reset, open all, random folding
	this.init = function() {
		var i = 0;
		Array.prototype.forEach.call(this.elt.children, function(el) {
			var type = el.getAttribute("data-fold-type");
			var src = el.getAttribute("data-src");
			
			var imgref = new Image();
			imgref.onLoad = function(){
				console.log('loaded');
				imgref.style.opacity = 1;
			};
			imgref.src = src;
			el.appendChild(imgref);

			if(!type) return;
			var mask = document.createElement("div");
			mask.setAttribute("class", "hover");
			el.appendChild(mask);

			var clonelimite = document.createElement("div");
			clonelimite.setAttribute("class", "clone-limite");
			el.appendChild(clonelimite);

			var clonerotate = document.createElement("div");
			clonerotate.setAttribute("class", "clone-rotate");
			clonelimite.appendChild(clonerotate);

			var clone = document.createElement("div");
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
			
			// if width > height
			var pourc = this.sheetWidth*100/this.sheetHeight/100;


			var deg1, deg2, translateX, translateY = 0;
			switch(type){
				case '1' :
				el.setAttribute("class", "sheet topleftfolding");
				deg1 = -this.deg;
				deg2 = this.deg;
				translateX = -pourc;
				translateY = 1;
				break;
				case '2' :
				el.setAttribute("class", "sheet toprightfolding");
				deg1 = this.deg;
				deg2 = -this.deg;
				translateX = pourc;
				translateY = 1;
				break;
				case '3' :
				el.setAttribute("class", "sheet bottomrightfolding");
				deg1 = -this.deg;
				deg2 = this.deg;
				translateX = -pourc;
				translateY = 1;
				break;
				case '4' :
				el.setAttribute("class", "sheet bottomleftfolding");
				deg1 = this.deg;
				deg2 = -this.deg;
				translateX = pourc;
				translateY = 1;
				break;
				case '5' :
				el.setAttribute("class", "sheet leftfolding");
				deg1 = 0;
				deg2 = 0;
				translateX = 0;
				translateY = 1;
				this.clonelimiteWidth = this.sheetWidth/2;
				break;
				case '6' :
				el.setAttribute("class", "sheet rightfolding");
				deg1 = 0;
				deg2 = 0;
				translateX = 0;
				translateY = -1;
				this.clonelimiteWidth = this.sheetWidth/2;
				break;
				case '7' :
				el.setAttribute("class", "sheet topfolding");
				deg1 = 0;
				deg2 = 0;
				translateX = 1;
				translateY = 0;
				this.clonelimiteWidth = this.sheetWidth;
				this.clonelimiteHeight = this.sheetHeight/2;
				break;
				case '8' :
				el.setAttribute("class", "sheet bottomfolding");
				deg1 = 0;
				deg2 = 0;
				translateX = -1;
				translateY = 0;
				this.clonelimiteWidth = this.sheetWidth;
				this.clonelimiteHeight = this.sheetHeight/2;
				break;
			}

			clonelimite.style.width = this.clonelimiteWidth+'px';
			clonelimite.style.height = this.clonelimiteHeight+'px';
			clonelimite.style.webkitTransform = 'rotate('+deg1+'deg)';
			clonelimite.style.mozTransform    = 'rotate('+deg1+'deg)';
			clonelimite.style.msTransform     = 'rotate('+deg1+'deg)';
			clonelimite.style.oTransform      = 'rotate('+deg1+'deg)';
			clonelimite.style.transform       = 'rotate('+deg1+'deg)';
				
			clonerotate.style.width = clone.style.width = this.sheetWidth+'px';
			clonerotate.style.height = clone.style.height = this.sheetHeight+'px';
			clonerotate.style.webkitTransform = 'rotate('+deg2+'deg)';
			clonerotate.style.mozTransform    = 'rotate('+deg2+'deg)';
			clonerotate.style.msTransform     = 'rotate('+deg2+'deg)';
			clonerotate.style.oTransform      = 'rotate('+deg2+'deg)';
			clonerotate.style.transform       = 'rotate('+deg2+'deg)';

			clone.style.webkitTransform = 'rotate3d('+translateX+','+translateY+',0,90deg)';
			clone.style.mozTransform    = 'rotate3d('+translateX+','+translateY+',0,90deg)';
			clone.style.msTransform     = 'rotate3d('+translateX+','+translateY+',0,90deg)';
			clone.style.oTransform      = 'rotate3d('+translateX+','+translateY+',0,90deg)';
			clone.style.transform       = 'rotate3d('+translateX+','+translateY+',0,90deg)';

		});

    };

};
