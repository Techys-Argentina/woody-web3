ig.module(
    'ads.inapps'
)
.requires(
	'impact.impact',
    'impact.game',
)
.defines(function(){
	InApps = ig.Class.extend({
		init: function() {
			this.service =  inAppPurchase;
			this.serviceName = "InAppService";
			this._canPurchase = true;
			this._products = null;
			this.stock = {};
			this.listenersInApps();
			this.enabledProducts=['montura2','montura3','montura4','montura6','enable_bw','enable_lw'];
			this.activeProductId=null;
			this.activeProductCant=null;
		},
		initialize: function(){
			if(this._canPurchase){
				this._products = this.getProducts();
				
			}
			else{
				alert("CAN'T PURCHASE");
				return false;
			}
		},
		fetchProducts: function(productIds){
			// Fetching products from server
			this.service.fetchProducts(productIds, function(products,error){
				if(error){
					var output = '';
					for (var property in error) {
						output += property + ': ' + error[property]+'; ';
					}
					//alert(output);
					return [];
				}
				else{
					if(products.length>0){
						if(products[0].productId==Ads.inApps.activeProductId){
							Ads.inApps.purchase(products[0],Ads.inApps.activeProductCant);
						}
						return products;
					}
					else{
						alert("NO PRODUCTS AVAILABLE");
					}
				} 
			});   
		},
		purchase: function(product,cant){
			Ads.inApps.service
				.buy(product)
				.then(function (data) {
					console.log(data);
					lStorage.set(product,true);
					/*
					  {
						transactionId: ...
						receipt: ...
						signature: ...
					  }
					*/
				})
				.catch(function (err) {
					console.log(err);
				});
		},
		purchaseTest: function(productId,cant){
			if(this.enabledProducts.indexOf(productId)>=0){
				this.activeProductId=productId;
				this.activeProductCant=cant;
				this.initialize();
			}
			else{
				alert(productId + ": NO AVAILABLE");
			}
		},
		listenersInApps: function(){
			var esto=this;
			// this.service.on("purchase", {
				// start: function(productId) {
					// console.log("purchase started " + productId);
				// },
				// error: function(productId, error) {
					// console.log("purchase failed " + productId + " error: " + JSON.stringify(error));
				// },
				// complete: function(purchase) {
					// console.log("purchase completed " + JSON.stringify(purchase));
				// }
			// });
		},
		getProducts: function(){
			this.service
				.getProducts(this.enabledProducts)
				.then(function (products) {
					Ads.inApps._canPurchase = (products != null);
					Ads.inApps._products = products;
					if(Ads.inApps._products.length>0){//aca
					Ads.inApps._products.forEach(function(product){
						if(product.productId==Ads.inApps.activeProductId){
							//alert(product.productId);
							Ads.inApps.purchase(Ads.inApps.activeProductId,Ads.inApps.activeProductCant);
						}
					});
					return products;
				}
				else{
					alert("NO PRODUCTS AVAILABLE");
				}
					/*
					[{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', currency: '...', price: '...', priceAsDecimal: '...' }, ...]
					*/
				})
				.catch(function (err) {
					console.log(err);
					Ads.inApps._canPurchase = false;
				});
		},
		/*alertObject: function(obj){
			var result = [];
			function traverse(obj){
				for (var l in obj){
					if (obj.hasOwnProperty(l)){
						if (obj[l] instanceof Object){
							result.push(l+'=>[object]');
							traverse(obj[l]);
						} 
						else {
							result.push(l+': '+obj[l]);
						}
					}
				}
			}
			traverse(obj);
			return result;
		},*/
	});
});