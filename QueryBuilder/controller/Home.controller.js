sap.ui.define(["sap/ui/core/mvc/Controller","Brevo/QueryBuilder/model/Service","Brevo/QueryBuilder/util/Formatter"],function(e,t,i){"use strict";return e.extend("Brevo.QueryBuilder.controller.Home",{onInit:function(){var e=this;e.BusyDialog=new sap.m.BusyDialog;e.BusyDialog.open();this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);sap.ui.core.UIComponent.getRouterFor(this).getRoute("home").attachPatternMatched(this.onPatternMatched,this);if(!this._oPopover){this._oPopover=sap.ui.xmlfragment("Brevo.QueryBuilder.fragment.popOver",this)}},onPatternMatched:function(){var e=this;e.setDepartmentsModel();e.setQueriesModel()},applyDepartmentFilters:function(){var e=this;var t=e.getView().byId("idObjectHeader").getTitle();if(t==""){t="All Departments";e.getView().byId("idObjectHeader").setTitle(t)}var i=this.getView().byId("graphical").getBinding("items");var a=this.getView().byId("listView").getBinding("items");if(t!=="All Departments"&&t.length>0){var r=new sap.ui.model.Filter("department",sap.ui.model.FilterOperator.Contains,t);i.filter(new sap.ui.model.Filter([r],false));a.filter(new sap.ui.model.Filter([r],false))}else{i.filter([]);a.filter([])}},setQueriesModel:function(){var e=this;e.BusyDialog.open();var i="getAllTablesAndViews?db=Brevo";t.callService("Queries","Queries",i,"",true,function(t,i){if(i){var a=sap.ui.getCore().getModel("Queries");e.getView().byId("graphical").setModel(a);e.getView().byId("listView").setModel(a);e.BusyDialog.close()}else{window.location="../Login/index.html"}})},setDepartmentsModel:function(){var e=this;e.BusyDialog.open();t.callService("Departments","Departments","TableData?db=Brevo&table=department","",true,function(t){var i=sap.ui.getCore().getModel("Departments");var a=new sap.ui.model.json.JSONModel;a.oData.tables=[];for(var r=0;r<i.oData.tables.length;r++){a.oData.tables.push(i.oData.tables[r])}var o=a.oData.tables.map(function(e){return e.Department_name});if(!o.includes("Add a New Category")){a.oData.tables.push({Dep_Id:"0",Department_name:"All Departments"})}a.setDefaultBindingMode("OneWay");e.getView().byId("idObjectHeader").setModel(a);e.applyDepartmentFilters();e._oPopover.setModel(a);e.BusyDialog.close()})},onCreateTilePress:function(e){this.oRouter.navTo("createQuery")},onGraphicalTilePress:function(e){var t=e.getSource().getBindingContext().getObject();this.oRouter.navTo("dataPreview",{viewName:t.name})},handleDepartmentSelect:function(e){var t=this;var i=e.getParameter("listItem");var a=this.byId("idObjectHeader");var r=i.getTitle();a.setTitle(r);a.setBindingContext(i.getBindingContext());this._oPopover.close();this.applyDepartmentFilters()},handleTitleSelectorPress:function(e){var t=this._oPopover;t.setModel(e.getSource().getModel());t.openBy(e.getParameter("domRef"))},onGridIconPress:function(e){var t=e.getSource().getIcon();if(t==="sap-icon://grid"){this.getView().byId("toggle").setIcon("sap-icon://list");this.getView().byId("graphical").setVisible(true);this.getView().byId("listView").setVisible(false)}else{this.getView().byId("toggle").setIcon("sap-icon://grid");this.getView().byId("graphical").setVisible(false);this.getView().byId("listView").setVisible(true)}},onViewSearch:function(e){var t=e.getParameter("newValue");var i=[];if(t.length>0){i.push(new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains,t))}var a=this.getView().byId("graphical").getBinding("items");var r=this.getView().byId("listView").getBinding("items");a.filter(i);r.filter(i)},onListItemPress:function(e){var t=e.getSource()._getBindingContext().getObject();this.oRouter.navTo("dataPreview",{viewName:t.name})}})});