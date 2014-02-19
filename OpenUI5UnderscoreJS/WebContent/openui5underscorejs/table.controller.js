sap.ui.controller("openui5underscorejs.table", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf openui5underscorejs.table
*/
	onInit: function() {
		var sServiceUrl ="http://services.odata.org/Northwind/Northwind.svc";  
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl); 
        
		var oModelJson = new sap.ui.model.json.JSONModel();  
		var OriginalModel = new sap.ui.model.json.JSONModel();
		
		oModel.read("/Customers", null, null, null, function(data, oResponse){   
			OriginalModel.setData(data.results);  
			sap.ui.getCore().setModel(OriginalModel, "OriginalModel"); 
			
			var data = _.sortBy(data.results,function(value){
				return value.name;
			});
			
			oModelJson.setData(data);
			sap.ui.getCore().setModel(oModelJson, "WorkModel");
		}, null );  
	},
	getCount: function(){
		var model = sap.ui.getCore().getModel("WorkModel");
		var count = _.countBy(model.getData(), function(value) {
		  return 'all';
		});
		alert(count.all);
	},
	find: function(oEvent){
		var search = oEvent.getParameter("liveValue");
		var model = sap.ui.getCore().getModel("OriginalModel");
		
		var FilteredData = _.filter(model.getData(),function(item){
			try{
				var fields = [
					'CompanyName',
					'CustomerID',
					'ContactName',
					'ContactTitle',
					'Country',
					'City'
				];
				var concat = _.chain(fields)
								.map(function(field) { return _.property(field)(item); })
								.filter(function(result) { return result !== undefined && result !== null })
								.value()
								.join(' ');

				return _.every(search.split(' '), function(searchTerm) { 
							return concat.indexOf(searchTerm) >= 0; 
						});
			} catch(e) {
				throw e;
			}
		});
		var oModelJson = new sap.ui.model.json.JSONModel();  
		oModelJson.setData(FilteredData);
		sap.ui.getCore().setModel(oModelJson,"WorkModel");
	},
	sortByCountry: function(){
		var model = sap.ui.getCore().getModel("WorkModel");
		var data = _.sortBy(model.getData(),function(value){
			return value.Country;
		});
		model.setData(data);
		sap.ui.getCore().setModel(model,"WorkModel");
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf openui5underscorejs.table
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf openui5underscorejs.table
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf openui5underscorejs.table
*/
//	onExit: function() {
//
//	}

});