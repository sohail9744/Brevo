sap.ui.define(["Brevo/BrevoDtree/util/Formatter","Brevo/BrevoDtree/model/Service"],function(e,t){"use strict";return{drawTable:function(e,t,a,i,s){this._loadData(e,jQuery.extend(true,{},t),a,i,this._drawTable,s)},drawTableWithCurrentData:function(e,t,a,i,s){this._drawTable(e,t)},_loadData:function(e,a,i,s,r,o){a.dataSetLimit=9999;var l="getData?fileName="+a.FileName;o.setBusy(true);t.callService("FileSelectedModel"+a.ScenId,"FileSelectedModel",l,"IMS",true,"",function(t){a.data=sap.ui.getCore().getModel("FileSelectedModel"+a.ScenId).getData();if(a.data.length>=9999)a.moreRecords=true;else a.moreRecords=false;o.setModel(new sap.ui.model.json.JSONModel(a));r(e,a);o.setBusy(false)})},_drawTable:function(e,t){if(!t.data||t.data.length<=0)t.data=[];var a=$.pivotUtilities.derivers;var i=$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers);var s=[],r=[],o={},l=[];if(t.MEASURES&&t.MEASURES.length>0&&t.DIMENSIONS&&t.DIMENSIONS.length>0){s.push(t.DIMENSIONS[0]);for(var n=0;n<t.MEASURES.length;n++){var d="Sum";if(t.MEASURES[n].aggregationType)d=t.MEASURES[n].aggregationType;o["agg"+n]={aggType:d,arguments:[t.MEASURES[n]],name:d+"("+t.MEASURES[n]+")",varName:n,hidden:false,renderEnhancement:"barchart"}}}var p=$.pivotUtilities.aggregatorTemplates.sum;var g=$.pivotUtilities.numberFormat;var v=g({digitsAfterDecimal:0});var u={};$.pivotUtilities.customAggs=u;var i=$.extend($.pivotUtilities.renderers,$.pivotUtilities.gtRenderers);u["Multifact Aggregators"]=$.pivotUtilities.multifactAggregatorGenerator(o,{});$("#"+e).pivotUI(t.data,{aggregatorName:"Multifact Aggregators",aggregator:$.extend($.pivotUtilities.aggregators,$.pivotUtilities.customAggs),vals:l,renderers:i,exclusions:["__metadata"],hiddenFromDragDrop:["__metadata"],hiddenAttributes:t.MEASURES,unusedAttrsVertical:false,cols:r,rows:s,rendererName:"GT Table",rendererOptions:{width:"45rem",aggregations:{defaultAggregations:o,derivedAggregations:{}}}},true);$(".pvtRows").prepend('<div class="sapMFlexBox sapUiTinyMarginBottom sapMVBox"><span class="pvtAxisLabel sapMTitle">Rows:</span><span class="pureWhiteText sapMText"></span></div>');$(".pvtCols").prepend('<div class="sapMFlexBox sapUiTinyMarginBottom sapMVBox"><span class="pvtAxisLabel sapMTitle">Columns:</span><span class="pureWhiteText sapMText"></span></div>');$(".pvtUnused").prepend('<div class="sapMFlexBox sapUiTinyMarginBottom sapMVBox"><span class="sapMTitle">Properties:</span><span class="pvtAxisLabel sapMText"></span></div>')}}});