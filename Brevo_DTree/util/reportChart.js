jQuery.sap.declare("Brevo.BrevoDtree.util.reportchart");Brevo.BrevoDtree.util.reportchart={drawcharts:function(e,t,a,i,s,r,l,o,n){},addLinechart:function(e,t){var a=e;a.removeAllFeeds();a.setVizType("column");a.setUiConfig({applicationSet:"fiori"});var i=new sap.viz.ui5.data.FlattenedDataset({dimensions:[{name:"Departments",value:"{Departments}"}],measures:[{name:"Rate",value:"{Price}"}],data:{path:"/Items"}});a.setModel(comodel);a.setDataset(i);var s=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Rate"]}),r=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"categoryAxis",type:"Dimension",values:["Departments"]});a.addFeed(s);a.addFeed(r);a.setVizProperties({title:{visible:true,text:"Corrective Actions Completion Rate"},plotArea:{colorPalette:["#4682B4"],dataShape:{primaryAxis:["bullet"]}},valueAxis:{title:{visible:false,text:"Value Axis Value"}},categoryAxis:{title:{visible:false,text:"Category Axis Value"}},dataLabel:{visible:true,type:"value"}})}};