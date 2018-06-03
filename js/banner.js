/*
* 无缝banner的三种方式
* @Author: hcl
* @Date:   2018-06-03 11:00:37
 * @Last Modified by: hcl
 * @Last Modified time: 2018-06-03 15:20:23
*/

var bannerUtil = {
	index: 0,
	index2: 0,
	$ul: null,
	$ol: null,
	$images: null,
	$imgbs: null,
	cloneNodeMark: true,
	timer: null,
	init: function(ulDom, olDom) {
		var self = this;
		this.$ul = ulDom;
		this.$ol = olDom;
		this.$images = ulDom.children;
		this.$imgbs = olDom.children;
		this.change();

		this.timer = setInterval(this.cloneNode.bind(self),2000);
		$(this.$ul).on("mouseover", function(){
			clearInterval(self.timer);
		})
		$(this.$ul).on("mouseout", function(){
			self.timer = setInterval(self.cloneNode.bind(self),2000);
		})
	},

	/**
	 * 改变小圆点的状态
	 */
	change: function(){
		var that = this;
		for (var i = 0; i < this.$imgbs.length; i++) {
			this.$imgbs[i].index = i;
			this.$imgbs[i].className = "";
			this.$imgbs[i].onmouseover = function(){
				var self = this;
				that.index2 = that.index = self.index;
				for (var j = 0; j < that.$imgbs.length; j++) {
						that.$imgbs[j].className = "";
					}
				$("#imgbox").animate({top: -that.$images[0].offsetHeight * self.index},1000);
				this.className = "active";
			}
		}
		this.$imgbs[this.index].className = "active";
	},

	
	/*
	 *利用cloneNode的方法
	 *本来想用数组的方法的
	 */
	cloneNode: function(){
		var self = this;
		if(this.cloneNodeMark){
			var arrChil = Array.prototype.slice.call(this.$images,0);
			var $clone = arrChil.slice(0,1)[0].cloneNode(true);
			this.$ul.appendChild($clone);
			this.cloneNodeMark = false;
		}
		if (this.index >= this.$imgbs.length - 1) {
			this.index = 0;
		}else{
			this.index++;
			if(this.index2 == this.$imgbs.length){
				this.index2 = 0;
				this.$ul.style.top = "0px";
			}
		}
		this.index2++;
		this.change();
		$(self.$ul).animate({top: -self.$images[0].offsetHeight * self.index2},1000);
	},

	/**
	 * 赋值图片的内容使变成2倍的图片
	 */
	cloneInnerHTML: function(){
		var self = this;
		if(this.cloneNodeMark){
			var chtml = this.$ul.innerHTML;
			chtml += chtml;
			this.$ul.innerHTML = chtml; 
			this.cloneNodeMark = false;
		}
		if(this.index >= this.$images.length / 2 - 1){
			this.index = 0;
		}else{
			this.index++;
			if(this.index2 == this.$images.length / 2){
				this.index2 = 0;
				this.$ul.style.top = "0px";
			}
		}
		this.change();
		this.index2++;
		$("#imgbox").animate({top: -self.$images[0].offsetHeight * self.index2},1000);
	},

	/**
	 * 利用定位来实现的
	 */
	animatePosition: function(){
		var self = this;
		if(this.index >= this.$images.length - 1){
			this.index = 0;
			this.$images[0].style.position = "relative";
			this.$images[0].style.top = this.$images.length*this.$images[0].offsetHeight + "px";
		}else{
			this.index++;
			if(this.index2 == this.$images.length){
				this.index2 = 0;
				this.$ul.style.top = "0px";
				this.$images[0].style.position = "";
				this.$images[0].style.top = "0px";
			}
		}
		this.index2++;
		this.change();
		$("#imgbox").animate({top: -self.$images[0].offsetHeight * self.index2},1000);
	}
}