sap.ui.define(["sap/ui/core/mvc/Controller","Brevo/BrevoDtree/model/Service","Brevo/BrevoDtree/util/Formatter","Brevo/BrevoDtree/util/CustomerFormatter","sap/ui/core/routing/History","sap/m/MessageBox"],function(e,t,a,i,s,r){"use strict";return e.extend("Brevo.BrevoDtree.controller.Report",{onInit:function(){var e=this;var t=sap.ui.getCore().getEventBus();if(!e.vizCard)e.vizCard=sap.ui.xmlfragment("Brevo.BrevoDtree.fragments.vizChart",this);t.subscribe("treeData","Report",function(t,a,i){e.selectVariantobject=i.variant;e.scenarioInfo=JSON.parse(decodeURIComponent(escape(window.atob(i.scenario.ScenConfig))));e.varianceInfo=JSON.parse(decodeURIComponent(escape(window.atob(i.scenario.VariantSettings))));var s=i.scenario.Variants;var r=[{VariantId:"101",VariantName:"Actual Model"},{VariantId:"102",VariantName:"Forecast"}];var o=s.concat(r);e.getView().byId("variantId").setModel(new sap.ui.model.json.JSONModel(o));coolGrids.init();coolGrids.drawGrids(null);e.getMeasuresandDimensions();e.CreateCommonUrl();e.keyInfluencerforScenario();var s=e.getView().byId("variantId").getItems();var n=[];for(var l=0;l<s.length;l++){if(s[l].getKey()=="101"||s[l].getKey()==i.variant.VariantId){n.push(s[l].getKey())}}e.getView().byId("forecaste").setVisible(false);e.getView().byId("variantId").setSelectedKeys(n);var d=i.variant.VariantId+","+101;var c=false,u=true,v=e.varianceInfo.timeDimension,m=0;e.onCompareSelectedVariant(d,c,u,v,m)})},CreateCommonUrl:function(){var e=this.scenarioInfo;var t=this.varianceInfo;var a="",i="";for(var s=0;s<e.measures.length;s++){if(s==0)a=e.measures[s];else a+=","+e.measures[s]}for(var r=0;r<e.dimension.length;r++){if(r===0)i=e.dimension[r];else i+=","+e.dimension[r]}var o=a+","+i;if(t.timeDimension.length>0){this.commomParametersUrl="&select="+a+","+i+"&target="+e.Entity+"&time="+t.timeDimension+"&year="+t.timePeriod}else{this.commomParametersUrl="&select="+a+","+i+"&target="+e.Entity}},keyInfluencerforScenario:function(){var e=this;var a=e.scenarioInfo;var i=e.varianceInfo;var s="Report_KeyInfluencers?view="+e.scenarioInfo.serviceURL+"&variantID="+e.selectVariantobject.VariantId;t.callService("TargetInfluencerModel","TargetInfluencerModel",s,"IMS",true,"",function(t,a){var i=sap.ui.getCore().getModel("TargetInfluencerModel");e.getView().byId("targetInfluencerId").setModel(i);var s={title:{text:"Key influencers for "+e.scenarioInfo.Entity}};e.getView().byId("targetInfluencerId").setVizProperties(s)})},getMeasuresandDimensions:function(){var e=this;var a="FileUploader/Tables?FileName="+e.scenarioInfo.serviceURL;t.callService("MeasuredimensionModel","MeasuredimensionModel",a,"IMS",true,"",function(t,a){if(t.getParameters().success){var i=sap.ui.getCore().getModel("MeasuredimensionModel");e.getView().byId("MeasuresId").setModel(new sap.ui.model.json.JSONModel(i.getData()["MEASURES"]));e.getView().byId("DimensionsId").setModel(new sap.ui.model.json.JSONModel(i.getData()["DIMENSIONS"]));var s=[];var o=i.getData().MEASURES;for(var n=0;n<e.scenarioInfo.measures.length;n++){for(var l=0;l<o.length;l++){if(e.scenarioInfo.measures[n]==o[l]){s.push(e.scenarioInfo.measures[n])}}}e.getView().byId("MeasuresId").setSelectedKeys(s);e.handleMeasureDimensionSelection();var d=i.getData().DIMENSIONS;for(var n=0;n<d.length;n++){if(e.scenarioInfo.dimension[0]==d[n]){e.getView().byId("DimensionsId").setSelectedKey(d[n]);break}}}else{r.error("Data Loading Failed")}})},handlevariantsSelection:function(e){var t=this;var a=this.getView().byId("variantId").getSelectedKeys();if(a.length>2){e.getSource().getParent().getFields()[0].removeSelectedItem(e.getParameters().changedItem);sap.m.MessageToast.show("Select minimum 2 variants")}else if(a.length!=2){this.getView().byId("forecaste").setVisible(false);this.getView().byId("chartContainer").setVisible(false);this.getView().byId("InfluencerContainer").setVisible(false);sap.m.MessageToast.show("Select minimum 2 variants")}else{var i=false,s=false,r;var o=this.getView().byId("floatSlider").getValue();if(a[0]=="101"&&a[1]=="102"||a[1]=="101"&&a[0]=="102"){i=true;s=true;this.getView().byId("forecaste").setVisible(true)}else if(a[0]=="102"||a[1]=="102"){i=true;this.getView().byId("forecaste").setVisible(true)}else if(a[0]=="101"||a[1]=="101"){s=true}r=a[0]+","+a[1];this.onCompareSelectedVariant(r,i,s,this.varianceInfo.timeDimension,o)}},onCompareSelectedVariant:function(e,a,i,s,r){var o=this;var n;var l=false;if(a==true&&i==true){if(s.length>0&&r>=0){l=true;n="Report_VariantComparision?view="+o.scenarioInfo.serviceURL+"&variantID="+o.selectVariantobject.VariantId+","+e+"&Date="+s+"&Month="+r}else{n="Report_VariantComparision?view="+o.scenarioInfo.serviceURL+"&variantID="+e;l=false}}else if(a==true){if(s.length>0&&r>=0){l=true;n="Report_VariantComparision?view="+o.scenarioInfo.serviceURL+"&variantID="+e+"&Date="+s+"&Month="+r}else{n="Report_VariantComparision?view="+o.scenarioInfo.serviceURL+"&variantID="+e;l=false}}else{n="Report_VariantComparision?view="+o.scenarioInfo.serviceURL+"&variantID="+e;l=true}var d=n.split("variantID=")[1];o.selectedvariantid=d.split("&select=")[0];o.getView().setBusy(true);if(l){t.callService("compareModel","compareModel",n,"IMS",true,"",function(e,t){o.getView().setBusy(false);if(e.getSource().getData()!="Forecasting of data is not possible."){o.getView().byId("chartContainer").setVisible(true);var a=sap.ui.getCore().getModel("compareModel");o.variantCompareChart(a);o.variantCompareTable(a)}else{sap.m.MessageToast.show("Forecasting of data is not possible.");o.getView().byId("forecaste").setVisible(false);o.getView().byId("chartContainer").setVisible(false);o.getView().byId("InfluencerContainer").setVisible(false)}})}else{o.getView().setBusy(false);sap.m.MessageToast.show("Forecasting of data is not possible.");o.getView().byId("forecaste").setVisible(false);o.getView().byId("chartContainer").setVisible(false);o.getView().byId("InfluencerContainer").setVisible(false)}},variantCompareTable:function(e){var t=this.getView().byId("variantTableId");t.removeAllColumns();for(var a=0;a<Object.keys(e.oData[0]).length;a++){t.addColumn(new sap.m.Column({width:"2em",header:new sap.m.Label({text:Object.keys(e.oData[0])[a]})}))}t.bindItems("/",new sap.m.ColumnListItem({cells:[new sap.m.Text({text:"{"+Object.keys(e.oData[0])[0]+"}"}),new sap.m.Text({text:"{"+Object.keys(e.oData[0])[1]+"}"}),new sap.m.Text({text:"{"+Object.keys(e.oData[0])[2]+"}"})]}));t.setModel(new sap.ui.model.json.JSONModel(e.oData))},variantCompareChart:function(e){var t=this.getView().byId("variantId").getSelectedItems()[0].getBindingContext().getObject().VariantName;var a=this.getView().byId("variantId").getSelectedItems()[1].getBindingContext().getObject().VariantName;var s=this.getView().byId("variantCompareChart");var r=new sap.ui.model.json.JSONModel;r.setData(e.oData);s.removeAllFeeds();s.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{dataLabel:{visible:true,formatString:i.FIORI_LABEL_SHORTFORMAT_2},colorPalette:this.colorPalette},legendGroup:{layout:{position:"bottom"}},legend:{title:{visible:true}},categoryAxis:{title:{visible:true}},title:{visible:true,text:"Comparision for "+t+" and "+a}});var o=Object.keys(e.oData[0]),n=[],l=[];for(var d=1;d<o.length;d++){l.push({name:o[d],value:"{path:'"+o[d]+"'}"});n.push(o[d])}var c=Object.keys(e.oData[0])[0],u=[];u.push({name:c,value:"{"+c+"}"});var v=new sap.viz.ui5.data.FlattenedDataset({dimensions:u,measures:l,data:{path:"/"}});s.setDataset(v);var m=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:n}),g=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"categoryAxis",type:"Dimension",values:[u[0].name]});s.addFeed(m);s.addFeed(g);s.setModel(r);s.setVizType("column");s.setVizProperties({plotArea:{colorPalette:d3.scale.category20().range()}})},onNavBack:function(){var e=this;e.getView().byId("forecaste").setVisible(false);e.getView().byId("variantId").setModel(new sap.ui.model.json.JSONModel([]));var t=s.getInstance();var a=t.getPreviousHash();if(a!==undefined){window.history.go(-1)}else{var i=UIComponent.getRouterFor(this);i.navTo("treeView",{},true)}},Dynamiccharts:function(e,t,a){this.vizCard=sap.ui.xmlfragment("Brevo.BrevoDtree.fragments.vizChart",this);var s=coolGrids.addCard(sap.ui.getCore().getModel("scenariomodel").oData,a);var r=sap.ui.getCore().getModel("scenariomodel");var o=this.vizCard.getItems()[2].getContent()[0].getContent();var n=new sap.ui.model.json.JSONModel;this.colorPalette=["#748CB2","#9CC677","#EACF5E","#F9AD79","#D16A7C"];n.setData(e);o.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{dataLabel:{visible:true,formatString:i.FIORI_LABEL_SHORTFORMAT_2},colorPalette:this.colorPalette},legendGroup:{layout:{position:"bottom"}},legend:{title:{visible:false}},categoryAxis:{title:{visible:true}},title:{visible:false,text:"Measures for "+t}});var l=new sap.viz.ui5.data.FlattenedDataset({dimensions:[{name:"Dimension_Value",value:"{Dimension_Value}"}],measures:[{name:"Value",value:"{Value}"}],data:{path:"/"}});o.setDataset(l);o.setModel(n);o.setVizType("bar");o.setVizProperties({plotArea:{colorPalette:d3.scale.category20().range()}});var d=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Value"]}),c=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"categoryAxis",type:"Dimension",values:["Dimension_Value"]});o.addFeed(d);o.addFeed(c);this.vizCard.placeAt(s,"only");try{this.vizCard.getItems()[2].getContent()[0].getContent().setHeight($("#"+s).height()-88+"px")}catch(e){}this.vizCard.getItems()[2].setTitle(t)},onFullScreenPress:function(e){e.getSource().getParent().getParent().getItems()[2].setFullScreen(true)},handleMeasureDimensionSelection:function(){var e=this;var a=e.getView().byId("MeasuresId").getSelectedItems();try{var i=e.getView().byId("DimensionsId").getSelectedItem().getText()}catch(t){i=e.getView().byId("DimensionsId").getItems()[0].getText()}if(a.length<=0){e.getView().byId("InfluencerContainer").setVisible(false);sap.m.MessageToast.show("Select minimum 1 measure")}else{e.getView().byId("InfluencerContainer").setVisible(true);var s=e.getView().byId("SelectedTypeId").getSelectedKey();if(s=="column"){e.getView().byId("keyInfluencerchartId").setVizType("column")}else if(s=="line"){e.getView().byId("keyInfluencerchartId").setVizType("line")}else{e.getView().byId("keyInfluencerchartId").setVizType("bar")}var r;for(var o=0;o<a.length;o++){if(o==0)r=a[o].getText();else r+=","+a[o].getText()}e.getView().setBusy(true);var n="Report_MeasureDimensionSelection?view="+this.scenarioInfo.serviceURL+"&variantID="+e.selectedvariantid+"&target="+e.scenarioInfo.Entity+"&selectD="+i+"&selectM="+r;t.callService("keyModel","keyModel",n,"IMS",true,"",function(t,a){e.getView().setBusy(false);if(t.getSource().oData!="Forecasting of data is not possible."){var i=sap.ui.getCore().getModel("keyModel");e.ViewChartype();e.ViewTabletype()}else{sap.m.MessageToast.show("Forecasting of data is not possible.");e.getView().byId("forecaste").setVisible(false);e.getView().byId("chartContainer").setVisible(false);e.getView().byId("InfluencerContainer").setVisible(false)}})}},ViewChartype:function(){var e=sap.ui.getCore().getModel("keyModel").oData;var t=this.getView().byId("keyInfluencerchartId");var a=new sap.ui.model.json.JSONModel;a.setData(e);t.removeAllFeeds();t.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{dataLabel:{visible:true,formatString:i.FIORI_LABEL_SHORTFORMAT_2},colorPalette:this.colorPalette},legendGroup:{layout:{position:"bottom"}},legend:{title:{visible:true}},categoryAxis:{title:{visible:true}},title:{visible:false,text:"key Influencer "}});var s=Object.keys(e[0]),r=[],o=[];for(var n=1;n<s.length;n++){o.push({name:s[n],value:"{"+s[n]+"}"});r.push(s[n])}var l=Object.keys(e[0])[0],d=[],c=[];c.push({name:l,value:"{"+l+"}"});d.push(l);var u=new sap.viz.ui5.data.FlattenedDataset({dimensions:c,measures:o,data:{path:"/"}});t.setDataset(u);var v=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:r}),m=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"categoryAxis",type:"Dimension",values:d});t.addFeed(v);t.addFeed(m);t.setModel(a)},ViewTabletype:function(){var e=sap.ui.getCore().getModel("keyModel");var t=this.getView().byId("keyInfluencertableId");t.removeAllColumns();for(var a=0;a<Object.keys(e.oData[0]).length;a++){t.addColumn(new sap.m.Column({width:"2rem",header:new sap.m.Label({text:Object.keys(e.oData[0])[a]})}))}var i=[];for(var s=0;s<Object.keys(e.oData[0]).length;s++){i.push(new sap.m.Text({text:"{"+Object.keys(e.oData[0])[s]+"}"}))}t.bindItems("/",new sap.m.ColumnListItem({cells:i}));t.setModel(new sap.ui.model.json.JSONModel(e.oData))}})});