sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","inhance/userManagementSecurity/util/formatter"],function(e,t,o){"use strict";return e.extend("inhance.userManagementSecurity.controller.rolesMaster",{formatter:o,onInit:function(){if(!this.valueHelpForRoles)this.valueHelpForRoles=new sap.ui.xmlfragment("inhance.userManagementSecurity.fragments.valueHelpForRoles",this);sap.ui.core.UIComponent.getRouterFor(this).getRoute("rolesMaster").attachPatternMatched(this._objPatternMatched,this)},_objPatternMatched:function(){this.getView().getModel("appView").getProperty("/sideContent").getItem().getItems()[1].getItems()[1]._selectItem(true);this.getView().getModel("appView").setProperty("/sideMenuVisible",true);this.destination=this.getView().getModel("appView").getProperty("/destination");this.handleRolesModel();this.getOwnerComponent().getModel("rolesDetails").updateBindings(true)},onAfterRendering:function(){this.handleRolesModel()},handleRolesModel:function(){var e=this;this.getView().byId("roleList").setBusy(true);var o=this.getView().getModel("appView").oData.loginDetails[0].organisationid;var n=this.destination+"/UM/getrole?param1="+o;$.get(n,function(o){if(o=="Invalid Session"){t.information("Your session has expired. Please log in again.",{onClose:function(t){if(t=="OK"){e.handleInvalidSession()}}})}else{try{o=JSON.parse(o)}catch(e){}var n=new sap.ui.model.json.JSONModel(o);e.getView().byId("roleList").setBusy(false);e.getOwnerComponent().setModel(n,"rolesDetails")}})},onNavBack:function(){this.getView().getModel("appView").setProperty("/layout","OneColumn");var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("Home")},getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},handleRolesListPress:function(e){this.getView().getModel("appView").setProperty("/layout","TwoColumnsMidExpanded");this.getRouter().navTo("rolesDetail",{orgid:this.getView().getModel("appView").oData.loginDetails[0].organisationid,roleId:e.getParameter("listItem").getBindingContext("rolesDetails").getObject()._id,path:e.getParameter("listItem").getBindingContext("rolesDetails").getPath().split("/")[1]})},onSearch:function(e){this.getView().byId("roleList").getBinding("items").filter([new sap.ui.model.Filter("type","Contains",e.getParameter("newValue"))])},handleAddNewRole:function(){var e={type:"",description:"",createdate:(new Date).toJSON(),modifydate:(new Date).toJSON(),countofcreatepage:"",countofcreateuser:"",organisationid:this.getView().getModel("appView").getProperty("/loginDetails/0/organisationid")};this.valueHelpForRoles.setModel(new sap.ui.model.json.JSONModel(e));this.valueHelpForRoles.setTitle("Create Role");this.handleLicenseFields();this.valueHelpForRoles.open()},handleLicenseFields:function(){var e=this.getView().getModel("appView");this.valueHelpForRoles.getContent()[1].getContent()[1].setSelectedKey(e.oData.loginDetails[0].license.license_type);this.valueHelpForRoles.getContent()[1].getContent()[3].setValue(e.getProperty("/loginDetails/0/license/startdate")+" - "+e.getProperty("/loginDetails/0/license/enddate"));var t=o.getNoOfDays(e.getProperty("/loginDetails/0/license/startdate"),e.getProperty("/loginDetails/0/license/enddate"));this.valueHelpForRoles.getContent()[1].getContent()[5].setValue(t)},handleRolesFragmentCancel:function(){this.valueHelpForRoles.close()},handleCreatePageCount:function(e){var t=this;if(e.getSource().getValue()>t.oView.getModel("appView").oData.loginDetails[0].license.dashboardcountallowed){e.getSource().setValueState("Error").setValueStateText("Assigned Dashboard Creation count is "+this.oView.getModel("appView").oData.loginDetails.license_details[0].dashboardcountallowed)}else{e.getSource().setValueState("None").setValueStateText("")}},handleRolesFragmentSave:function(){var e=this;if(this.handleValidationsForRoles()&&e.valueHelpForRoles.getContent()[1].getContent()[7].getValueState()!="Error"){var o=this.valueHelpForRoles.getModel().getData();var n=this.getView().getModel("appView").oData.loginDetails[0].organisationid;$.post(this.destination+"/UM/createrole?param1="+n,o,function(o){if(o=="Invalid Session"){t.information("Your session has expired. Please log in again.",{onClose:function(t){if(t=="OK"){e.handleInvalidSession()}}})}else if(o=="okk"){t.success("Role Created Successfully");e.valueHelpForRoles.getContent()[1].getContent()[7].setValueState("None");e.handleRolesModel()}else{t.error(JSON.parse(o).status)}});this.valueHelpForRoles.close()}else{sap.m.MessageBox.error("Please fill the mandatory fields!")}},handleValidationsForRoles:function(){var e=true;if(this.valueHelpForRoles.getContent()[0].getContent()[1].getValue().length==0||this.valueHelpForRoles.getContent()[0].getContent()[3].getValue().length==0||this.valueHelpForRoles.getContent()[1].getContent()[7].getValue().length==0){e=false}return e},handleInvalidSession:function(){var e=this;e.getView().getModel("appView").setProperty("/layout","OneColumn");var t=sap.ui.core.UIComponent.getRouterFor(e);t.navTo("login");function o(){window.history.forward()}setTimeout("preventBack()",0);window.onunload=function(){null};window.localStorage.removeItem("loginDetails")},handleDateRange:function(e){var t=e.getSource().getDateValue();var o=e.getSource().getSecondDateValue();var n=Math.abs(o.getTime()-t.getTime());var a=Math.ceil(n/(1e3*60*60*24));this.valueHelpForRoles.getContent()[1].getContent()[5].setValue(a)}})});