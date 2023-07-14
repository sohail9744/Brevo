sap.ui.define(["sap/ui/core/Control"],function(e){"use strict";return e.extend("_custom.control.Tile",{metadata:{properties:{noData:{type:"string",defaultValue:"No data"},width:{type:"sap.ui.core.CSSSize",defaultValue:"auto"},height:{type:"sap.ui.core.CSSSize",defaultValue:"auto"},padding:{type:"sap.ui.core.CSSSize",defaultValue:"1rem"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:false,singularName:"content"}}},init:function(){this._oNoDataLabel=(new sap.m.Label).addStyleClass("cockpitPanelContainerNoData")},exit:function(){this._oNoDataLabel.destroy();delete this._oNoDataLabel},renderer:{render:function(e,t){e.write('<div tabindex="0"');e.writeControlData(t);e.addClass("tileLayout");e.writeClasses();e.addStyle("padding",t.getPadding());e.addStyle("height",t.getHeight());e.addStyle("width",t.getWidth());e.writeStyles();e.write(">");this._renderContent(e,t);e.write("</div>")},_renderContent:function(e,t){var a=t.getAggregation("content");if(!a||a.length===0){this._renderNoData(e,t)}else{e.renderControl(t.getContent())}},_renderNoData:function(e,t){if(!t._oNoDataLabel.getText()){t._oNoDataLabel.setText("Empty Tile")}e.write("<div");e.writeClasses();e.write(">");e.renderControl(t._oNoDataLabel);e.write("</div>")}}})});