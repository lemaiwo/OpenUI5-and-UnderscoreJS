sap.ui.jsview("openui5underscorejs.table", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf openui5underscorejs.table
	*/ 
	getControllerName : function() {
		return "openui5underscorejs.table";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf openui5underscorejs.table
	*/ 
	createContent : function(oController) {
		var oTable = new sap.ui.table.Table({
			title: "Table Example",
			visibleRowCount: 7,
			firstVisibleRow: 3,
			selectionMode: sap.ui.table.SelectionMode.Single,
			toolbar: new sap.ui.commons.Toolbar({items: [ 
				new sap.ui.commons.Button({text: "Count rows", press: oController.getCount}),
				new sap.ui.commons.Button({text: "Sort Country", press: oController.sortByCountry}),
				new sap.ui.commons.TextField({id:"search",liveChange:oController.find})
			]})
		});
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "CustomerID"}),
			template: new sap.ui.commons.TextView({text:"{WorkModel>CustomerID}"})
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "CompanyName"}),
			template: new sap.ui.commons.TextView({text: "{WorkModel>CompanyName}"})
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "ContactName"}),
			template: new sap.ui.commons.TextView({text:"{WorkModel>ContactName}"})
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "ContactTitle"}),
			template: new sap.ui.commons.TextView({text:"{WorkModel>ContactTitle}"})
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Country"}),
			template: new sap.ui.commons.TextView({text:"{WorkModel>Country}"})
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "City"}),
			template: new sap.ui.commons.TextView({text:"{WorkModel>City}"})
		}));
		
		oTable.bindRows("WorkModel>/");
		return oTable;
	}

});
