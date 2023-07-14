sap.ui.define(["sap/ui/model/json/JSONModel","sap/m/MessageBox","sap/ui/Device"],function(e,a,r){"use strict";return{metadata:{name:"LessonLearnt",version:"1.0",includes:[],dependencies:{libs:["sap.m","sap.ui.layout"],components:[]},config:{resourceBundle:"i18n/messageBundle.properties",serviceConfig:{name:"ibrevoVDT Services",erviceUrl:"SalesForecast/Sales.xsodata/",scenarioUrl:"Brevo_VDT/Scenario.xsodata/",viewUrl:"SalesForecast/Brevo.xsodata/",xsjsUrl:"Brevo_VDT/",mongoDbUrl:"odata/mongodb",destination1:window.location.href.indexOf("ondemand")>-1?"BrevoMongoDB":"",destination2:window.location.href.indexOf("ondemand")>-1?"IMS":"",mockdataDir:"model/"}}},mockdata:false,init:function(){var e=this.metadata.config;var a=jQuery.sap.getUriParameters().get("mockdata")==="false";this.mockdata=false;var r=e.serviceConfig.serviceUrl;console.log("Service url is "+r);if(this.mockdata){this.showMockDataMessage()}},showMockDataMessage:function(){},handleError:function(e){var a=e.getParameters().message+" contact System Administrator";sap.m.MessageToast.show(a,{duration:4e3})},fixProxyServerUrl:function(e,a){var r=this.metadata.config.serviceConfig.destination1;var s=this.metadata.config.serviceConfig.destination2;if(window.location.hostname=="localhost"){var i=window.location.href+"proxy/";return i.concat(e)}else if(a=="IMS"){if(s!=""){var o=this.metadata.config;var i=window.location.origin+"/"+s+"/";return i.concat(e)}else{var o=this.metadata.config;var i=window.location.origin+"/";return i.concat(e)}}else{if(r!=""){var o=this.metadata.config;var i=window.location.origin+"/"+r+"/";return i.concat(e)}else{var o=this.metadata.config;var i=window.location.origin+"/";return i.concat(e)}}},callService:function(e,a,r,s,i,o,t,n){var l=i||false;var d=sap.ui.getCore().getModel(e);var c=false,f;if(!d){d=new sap.ui.model.json.JSONModel;d.setSizeLimit(999999);sap.ui.getCore().setModel(d,e);c=true}if(l==="fetchDataFromServer"){window.setTimeout(function(e,a,r){r(e,a)},75,d,n,t);return}var u=function(e){d.detachRequestFailed(this)};d.attachRequestCompleted(function(e){e.oSource.mEventRegistry=[];try{d.setData(JSON.parse(d.getData()))}catch(e){}if(e.mParameters.success)t(e,e.mParameters.success);else{t(e,e.mParameters.success)}});d.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);d.attachRequestFailed(u);if(s==true){var v=this.fixProxyServerUrl(r)}else if(s=="scenario"){f=this.metadata.config.serviceConfig.mongoDbUrl+r.trim();var v=this.fixProxyServerUrl(f)}else if(s=="IMS"){f=r.trim();var v=this.fixProxyServerUrl(f,s)}else if(s=="views"){f=this.metadata.config.serviceConfig.MLurl+r.trim();var v=this.fixProxyServerUrl(f)}else if(s=="report"){var f=this.metadata.config.serviceConfig.viewUrl+r;var v=this.fixProxyServerUrl(f)}else{f=r.trim();var v=this.fixProxyServerUrl(f)}if(this.mockdata==false&&i!="loadMock"){d.loadData(v,{},true,"GET",false,false,{sessionkey:window.localStorage.getItem("sessionkey"),userid:window.localStorage.getItem("userid")})}else{if(a.indexOf(".json")<-1)a=a+".json";var m=a;d.loadData(m)}},callCreateService:function(e,a,s,i,o){var t=sap.ui.getCore().getModel("dummy"),n;if(!t){t=new sap.ui.model.json.JSONModel;sap.ui.getCore().setModel(t,"dummy")}if(s==true){n=e;if(e.indexOf("FileUploader")>-1)var l=this.fixProxyServerUrl(n,"IMS");else var l=this.fixProxyServerUrl(n);$.ajax({url:l,type:i,data:a,headers:{"Content-Type":"application/json",sessionkey:window.localStorage.getItem("sessionkey"),userid:window.localStorage.getItem("userid")},success:function(e){if(i=="PUT"){if(JSON.parse(e).update==true)var a=true;else var a=false}else{if(e!="Invalid Session"){if(l.indexOf("FileUploader")>-1){if(JSON.parse(e).insert==true)var a=true;else var a=false}else{if(JSON.parse(e).login==true)var a=true;else if(JSON.parse(e).status=="Success")var a=true;else var a=false}}else{r.alert("Your session has been expired. Please reload.")}}o(e,a)},error:function(e){var a=false;o(e,a)}})}else{t.setJSON(a);if(s=="variant"||s==="Comment")n=this.metadata.config.serviceConfig.scenarioUrl;if(s=="scenario")n=this.metadata.config.serviceConfig.mongoDbUrl;var d=this.fixProxyServerUrl(n);var c=new sap.ui.model.odata.ODataModel(d,true,"","");c.setHeaders({sessionkey:window.localStorage.sessionkey,userid:window.localStorage.userid});if(i=="POST")c.create(e,t.getData(),null,f,u);else c.update(e,t.getData(),null,f,u);function f(e,a){if(e!="Invalid Session"){o(e,true);var s="Submitted Successfully !"}else{r.alert("Your session has been expired. Please reload.")}}function u(e){try{o(JSON.parse(e.response.body).error.message.value,false)}catch(a){o(e.response.body,false)}}}},callDeleteService:function(e,a,s){var i=sap.ui.getCore().getModel("dummy");if(!i){i=new sap.ui.model.json.JSONModel;sap.ui.getCore().setModel(i,"dummy")}var o=this.metadata.config.serviceConfig.mongoDbUrl;var t=this.fixProxyServerUrl(o);var n=new sap.ui.model.odata.ODataModel(t,true,"","");n.setHeaders({sessionkey:window.localStorage.sessionkey,userid:window.localStorage.userid});n.refreshSecurityToken();n.remove(e,null,l,d);function l(e,a){if(e!="Invalid Session"){s(e,true);var i="Submitted Successfully !"}else{r.alert("Your session has been expired. Please reload.")}}function d(e){s(JSON.parse(e.response.body).error.message.value,false)}}}});