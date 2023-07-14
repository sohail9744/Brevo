/*! Rappid v2.4.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2018-11-16 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/
"use strict";(function(e,t){e.shapes.standard.Link.define("mapping.Link",{z:-1,attrs:{line:{targetMarker:{type:"path",fill:"#5755a1",d:"M 10 -5 0 0 10 5 z"},sourceMarker:{type:"path",fill:"#5755a1",d:"M 0 -5 10 0 0 5 z"},stroke:"gray"}}});e.shapes.standard.BorderedRecord.define("mapping.Constant",{itemHeight:20,itemOffset:5,itemMinLabelWidth:10,attrs:{root:{magnet:false},itemLabels:{fontSize:12,fontFamily:"Sans-serif"},itemLabels_1:{magnet:true},itemBodies_0:{fill:"#feb663"},itemBodies:{stroke:"black"}},items:[[{id:"icon",icon:"images/clipboard.svg"}],[{id:"value",label:"",span:2}],[]]},{setValue:function(e,t){this.prop(["items",1,0,"label"],'"'+e+'"',t)},getDefaultItem:function(){return{id:t.uuid(),label:'""',icon:"images/clipboard.svg"}},getItemTools:function(){return[{action:"edit",content:"Edit Constant"}]},getTools:function(){return[{action:"remove",content:i("Remove Constant")}]},getInspectorConfig:function(){return{label:{label:"Label",type:"content-editable"}}}});e.shapes.standard.HeaderedRecord.define("mapping.Concat",{itemHeight:20,itemOffset:5,padding:{top:30,left:10,right:0,bottom:0},itemMinLabelWidth:50,itemOverflow:true,attrs:{root:{magnet:false},header:{fill:"#fe854f"},headerLabel:{fontFamily:"Sans-serif",fontWeight:"bold",textWrap:{text:"concat",ellipsis:true,height:30}},itemLabels:{magnet:true,fontSize:12,fontFamily:"Sans-serif"},itemLabels_0:{magnet:"passive",cursor:"pointer"},itemBodies_0:{stroke:"black"}},items:[[{id:"value_1",label:"Value 1",icon:"images/link.svg"},{id:"value_2",label:"Value 2",icon:"images/link.svg"},{id:"value_3",label:"Value 3",icon:"images/link.svg"}],[{id:"result",label:"Result ⇛"},{id:"result",label:"Result ⇛"},{id:"result",label:"Result ⇛"}]]},{setName:function(e,t){this.attr(["headerLabel","textWrap","text"],e,t)},getNumberOfValues:function(){return this.prop(["items",0]).length},getDefaultItem:function(){return{id:t.uuid(),label:"Value "+(this.getNumberOfValues()+1),icon:"images/link.svg"}},getItemTools:function(e){var t=this.getItemGroupIndex(e);if(t!==0)return null;var n=[{action:"edit",content:"Edit Value"},{action:"add-next-sibling",content:"Add Value"}];if(this.getNumberOfValues()>2){n.push({action:"remove",content:i("Remove Value")})}n.push();return n},getTools:function(){return[{action:"add-item",content:"Add Value"},{action:"remove",content:i("Remove Concat")}]},getInspectorConfig:function(e){var t=this.getItemGroupIndex(e);if(t!==0)return null;return{label:{label:"Label",type:"content-editable"}}}});e.shapes.standard.HeaderedRecord.define("mapping.GetDate",{itemHeight:20,itemOffset:5,padding:{top:30,left:10,right:0,bottom:0},itemMinLabelWidth:50,itemOverflow:true,attrs:{root:{magnet:false},header:{fill:"#fe854f"},headerLabel:{fontFamily:"Sans-serif",fontWeight:"bold",textWrap:{text:"get-date",ellipsis:true,height:30}},itemLabels:{magnet:true,fontSize:12,fontFamily:"Sans-serif"},itemLabels_0:{magnet:"passive",cursor:"pointer"},itemBodies:{stroke:"black"}},items:[[{id:"value",label:"⇛ Value",height:60}],[{id:"year",label:"year",icon:"images/link.svg"},{id:"month",label:"month",icon:"images/link.svg"},{id:"day",label:"day",icon:"images/link.svg"}]]},{getDefaultItem:function(){return{id:t.uuid(),label:"item",icon:"images/document.svg"}},getItemTools:function(){return null},getTools:function(){return[{action:"remove",content:i("Remove GetDate")}]},getInspectorConfig:function(e){return null}});e.shapes.standard.HeaderedRecord.define("mapping.Record",{itemHeight:20,itemOffset:15,itemMinLabelWidth:70,padding:{top:35,left:10,right:10,bottom:5},size:{width:175},itemOverflow:true,attrs:{root:{magnet:false},header:{fill:"#31d0c6"},headerLabel:{fontSize:15,fontFamily:"Sans-serif",fontWeight:"bold",textWrap:{ellipsis:true,height:30}},buttonsGroups:{stroke:"black"},forksGroups:{stroke:"lightgray"},itemLabels:{magnet:"true",cursor:"pointer",fontSize:12,fontFamily:"Sans-serif",itemHighlight:{fill:"#000000"}},itemLabels_disabled:{magnet:null,fill:"#aaaaaa",cursor:"not-allowed"}}},{setName:function(e,t){this.attr(["headerLabel","textWrap","text"],e,t)},getDefaultItem:function(){return{id:t.uuid(),label:"new_item",icon:"images/document.svg"}},getItemTools:function(){return[{action:"edit",content:"Edit Item"},{action:"add-child",content:"Add Child"},{action:"add-next-sibling",content:"Add Next Sibling"},{action:"add-prev-sibling",content:"Add Prev Sibling"},{action:"remove",content:i("Remove Item")}]},getTools:function(){return[]},getInspectorConfig:function(){return{highlighted:{label:"Highlight",type:"toggle"}}}});e.shapes.standard.HeaderedRecord.define("mapping.Join",{itemHeight:20,itemOffset:15,itemMinLabelWidth:70,padding:{top:35,left:10,right:10,bottom:5},size:{width:230},itemOverflow:true,attrs:{root:{magnet:false},header:{fill:"#fe854f"},headerLabel:{cursor:"pointer",fontSize:15,fontFamily:"Sans-serif",fontWeight:"bold",textWrap:{ellipsis:true,height:30}},forksGroups:{stroke:"lightgray"},itemBodies_headers:{stroke:"#000000"},itemLabels:{magnet:"true",cursor:"pointer",fontSize:12,fontFamily:"Sans-serif",fill:"#000000"},itemLabels_disabled:{magnet:"true",fill:"#aaaaaa",cursor:"not-allowed"},itemLabels_1:{magnet:"true",cursor:"pointer"}}},{setName:function(e,t){this.attr(["headerLabel","textWrap","text"],e,t)},getDefaultItem:function(){return{id:t.uuid(),label:"new_item",icon:"images/document.svg"}},getItemTools:function(){return[{action:"",content:i("Select a join type")},{action:"on-inner-join",content:"inner join"},{action:"on-full-join",content:"full join"},{action:"on-left-join",content:"left join"},{action:"on-right-join",content:"right join"}]},getTools:function(){return[]},getInspectorConfig:function(){return{label:{label:"Label",type:"content-editable"},icon:{label:"Icon",type:"select-button-group",options:[{value:"images/link.svg",content:'<img height="42px" src="images/link.svg"/>'},{value:"images/document.svg",content:'<img height="42px" src="images/document.svg"/>'},{value:"images/clipboard.svg",content:'<img height="42px" src="images/clipboard.svg"/>'},{value:"images/file.svg",content:'<img height="42px" src="images/file.svg"/>'}]},highlighted:{label:"Highlight",type:"toggle"}}}});e.shapes.standard.HeaderedRecord.define("mapping.Output",{itemHeight:20,itemOffset:15,itemMinLabelWidth:70,padding:{top:35,left:10,right:10,bottom:5},size:{width:175},itemOverflow:true,attrs:{root:{magnet:false},header:{fill:"#a6a6a6"},headerLabel:{fontSize:15,fontFamily:"Sans-serif",fontWeight:"bold",textWrap:{ellipsis:true,height:30}},forksGroups:{stroke:"lightgray"},itemBodies_headers:{stroke:"#000000"},itemLabels:{magnet:"true",cursor:"pointer",fontSize:12,fontFamily:"Sans-serif"},itemLabels_disabled:{magnet:"true",fill:"#aaaaaa",cursor:"not-allowed"},itemLabels_1:{magnet:"true",cursor:"pointer"}}},{setName:function(e,t){this.attr(["headerLabel","textWrap","text"],e,t)},getDefaultItem:function(){return{id:t.uuid(),label:"new_item",icon:"images/document.svg"}},getItemTools:function(){return[{action:"edit",content:"Edit Item"},{action:"add-child",content:"Add Child"},{action:"add-next-sibling",content:"Add Next Sibling"},{action:"add-prev-sibling",content:"Add Prev Sibling"},{action:"remove",content:i("Remove Item")}]},getInspectorConfig:function(){return{label:{label:"Label",type:"content-editable"},icon:{label:"Icon",type:"select-button-group",options:[{value:"images/link.svg",content:'<img height="42px" src="images/link.svg"/>'},{value:"images/document.svg",content:'<img height="42px" src="images/document.svg"/>'},{value:"images/clipboard.svg",content:'<img height="42px" src="images/clipboard.svg"/>'},{value:"images/file.svg",content:'<img height="42px" src="images/file.svg"/>'}]},highlighted:{label:"Highlight",type:"toggle"}}}});e.shapes.mapping.ConstantView=e.shapes.standard.RecordView;e.shapes.mapping.ConcatView=e.shapes.standard.RecordView;e.shapes.mapping.GetDateView=e.shapes.standard.RecordView;e.shapes.mapping.RecordView=e.shapes.standard.RecordView;e.shapes.mapping.JoinView=e.shapes.standard.RecordView;function i(e){return'<span style="color:#fe854f">'+e+"</span>"}})(joint,joint.util);