(function(){var callWithJQuery;callWithJQuery=function(e){if(typeof exports==="object"&&typeof module==="object"){return e(require("jquery"))}else if(typeof define==="function"&&define.amd){return define(["jquery"],e)}else{return e(jQuery)}};callWithJQuery(function($){var multifactAggregator=function(aggMap,derivedAggregations){var allAggregators=$.map(aggMap,function(e,t){var a=$.pivotUtilities.aggregators[e.aggType];console.log({a:a});var n=a([])().numInputs||0;return{aggregator:a,selfNumInputs:n,name:e.name,key:t,varName:e.varName,hidden:e.hidden}});return function(facts){var aggregations=$.map(allAggregators,function(e){return{aggregator:e.aggregator(aggMap[e.key].arguments),key:e.key,name:e.name,varName:e.varName,hidden:e.hidden}});return function(data,rowKey,colKey){var finalAggregators=$.map(aggregations,function(e){return{aggregator:e.aggregator(data,rowKey,colKey),key:e.key,name:e.name,varName:e.varName,hidden:e.hidden}});var _finalAggregatorsNameMap={};for(var i=0,x=finalAggregators.length;i<x;i++){var aggregation=finalAggregators[i];_finalAggregatorsNameMap[aggregation.name]=aggregation}var _finalDerivedAggregatorsNameMap={};for(var i=0,x=derivedAggregations.length;i<x;i++){var derivedAggregation=derivedAggregations[i];_finalDerivedAggregatorsNameMap[derivedAggregation.name]=derivedAggregation}if(!facts&&!!data&&!!data.valAttrs){facts=data.valAttrs}var analytics={};return{label:"Facts",push:function(e){for(var t=0,a=finalAggregators.length;t<a;t++){var n=finalAggregators[t];n.aggregator.push(e)}},inner:{value:function(){try{var e=arguments.callee.caller.arguments[0];var t=_finalAggregatorsNameMap[e];return t.aggregator.inner.value()}catch(e){return-100}}},multivalue:function(){analytics={};var variables={};var finalAnalytics={};for(var i=0,x=finalAggregators.length;i<x;i++){var aggregation=finalAggregators[i];analytics[aggregation.name]=aggregation.aggregator.value(aggregation.name);variables[aggregation.varName]=analytics[aggregation.name];if(!aggregation.hidden){finalAnalytics[aggregation.name]=analytics[aggregation.name]}}var _derivedAnalytics={};for(var i=0,x=derivedAggregations.length;i<x;i++){var derivedAggregation=derivedAggregations[i];var derivedVal=0;var expression="derivedVal = "+derivedAggregation.expression;eval(expression);_derivedAnalytics[derivedAggregation.name]=derivedVal}finalAnalytics=$.extend(finalAnalytics,_derivedAnalytics);return finalAnalytics},value:function(){return"Multi-Fact-Aggregator does not support single value"},format:function(e,t){var a=null;if(!!_finalAggregatorsNameMap[t]){a=_finalAggregatorsNameMap[t].aggregator.format}else if(!!_finalDerivedAggregatorsNameMap[t]){var n=$.extend({},_finalDerivedAggregatorsNameMap[t].formatterOptions);a=$.pivotUtilities.numberFormat(n)}if(!a){a=$.pivotUtilities.numberFormat()}return a(e)}}}}};$.pivotUtilities.multifactAggregatorGenerator=multifactAggregator})}).call(this);(function(){var e,t=[].indexOf||function(e){for(var t=0,a=this.length;t<a;t++){if(t in this&&this[t]===e)return t}return-1},a=[].slice,n=function(e,t){return function(){return e.apply(t,arguments)}},r={}.hasOwnProperty;e=function(e){if(typeof exports==="object"&&typeof module==="object"){return e(require("jquery"))}else if(typeof define==="function"&&define.amd){return define(["jquery"],e)}else{return e(jQuery)}};e(function(e){e.fn.gtBarchart=function(t){var a,n,r,l,i,o;i=this.data("numrows");l=this.data("numcols");var u={};var s=e.map(t.aggregations.defaultAggregations,function(e){return e})||[];for(n=0,x=s.length;n<x;n++){var c=s[n];u[c.name]=c}var f=t.aggregations.derivedAggregations||[];var g={};for(n=0,x=f.length;n<x;n++){var d=f[n];g[d.name]=d}var p=e.extend(true,{},u,g);a=function(t){return function(a){var n,r,l,i,o,u;n=function(n){return t.find(a).each(function(){var t,a;t=e(this).data("value");a=e(this).data("value-for");if(t!=null&&isFinite(t)){return n(t,e(this),a)}})};o=[];u={};n(function(e,t,a){u[a]=u[a]||[];u[a].push(e);return o.push(e)});var s={};Object.keys(u).forEach(function(e){if(u.hasOwnProperty(e)){r=Math.max.apply(Math,o);if(r<0){r=0}i=r;l=Math.min.apply(Math,o);if(l<0){i=r-l}s[e]=function(){return function(e){return 100*e/(1.4*i)}}()}});return n(function(t,a,n){var r,i,o,u,c;c=s[n];var f=p[n];if(f&&f.renderEnhancement==="barchart"){o=a.text();u=e("<div>").css({position:"relative",width:"120px"});i=f.barchartColor||"steelblue";r=0;if(l<0){r=c(-l)}if(t<0){r+=c(t);i=f.barchartNegativeColor||"darkred";t=-t}u.append(e("<div>").css({position:"absolute",top:r+"%",left:0,height:"12px",width:c(t)+"%","background-color":i}));u.append(e("<div>").text(o).css({position:"relative","padding-left":"5px","padding-right":"5px"}));return a.css({padding:0,"padding-top":"5px","text-align":"right"}).html(u)}else{return a}})}}(this);for(n=r=0,o=i;0<=o?r<o:r>o;n=0<=o?++r:--r){a(".pvtVal.row"+n)}return this}})}).call(this);(function(){var e,t=[].indexOf||function(e){for(var t=0,a=this.length;t<a;t++){if(t in this&&this[t]===e)return t}return-1},a=[].slice,n=function(e,t){return function(){return e.apply(t,arguments)}},r={}.hasOwnProperty;e=function(e){if(typeof exports==="object"&&typeof module==="object"){return e(require("jquery"))}else if(typeof define==="function"&&define.amd){return define(["jquery"],e)}else{return e(jQuery)}};e(function(e){e.fn.gtHeatmap=function(t,a){var n,r,l,i,o,u,s,c,f,g,d,p,v,m;if(t==null){t="heatmap"}f=this.data("numrows");c=this.data("numcols");v={};var h=e.map(a.aggregations.defaultAggregations,function(e){return e})||[];for(l=0,i=h.length;l<i;l++){var b=h[l];v[b.name]=b}var A=a.aggregations.derivedAggregations||[];m={};for(l=0,i=A.length;l<i;l++){var y=A[l];m[y.name]=y}var x=e.extend(true,{},v,m);n=a!=null?(g=a.heatmap)!=null?g.colorScaleGenerator:void 0:void 0;if(n==null){n=function(e){var t,a;a=Math.min.apply(Math,e);t=Math.max.apply(Math,e);return function(e){var n;n=255-Math.round(255*(e-a)/(t-a));return"rgb(255,"+n+","+n+")"}}}r=function(t){return function(a){var r,l,i,o,u;l=function(n){return t.find(a).each(function(){var t,a;t=e(this).data("value");a=e(this).data("value-for");if(t!=null&&isFinite(t)){return n(t,e(this),a)}})};i=[];o={};l(function(e,t,a){o[a]=o[a]||[];o[a].push(e);return i.push(e)});console.log(o);u={};Object.keys(o).forEach(function(e){if(o.hasOwnProperty(e)){u[e]=n(o[e],e)}});return l(function(e,t,a){var n=x[a];if(n&&n.renderEnhancement==="heatmap"){return t.css("background-color",u[a](e))}else{return t}})}}(this);switch(t){case"heatmap":r(".pvtVal");break;case"rowheatmap":for(l=u=0,d=f;0<=d?u<d:u>d;l=0<=d?++u:--u){r(".pvtVal.row"+l)}break;case"colheatmap":for(o=s=0,p=c;0<=p?s<p:s>p;o=0<=p?++s:--s){r(".pvtVal.col"+o)}}r(".pvtTotal.rowTotal");r(".pvtTotal.colTotal");return this}})}).call(this);(function(){var e,t=[].indexOf||function(e){for(var t=0,a=this.length;t<a;t++){if(t in this&&this[t]===e)return t}return-1},a=[].slice,n=function(e,t){return function(){return e.apply(t,arguments)}},r={}.hasOwnProperty;e=function(e){if(typeof exports==="object"&&typeof module==="object"){return e(require("jquery"))}else if(typeof define==="function"&&define.amd){return define(["jquery"],e)}else{return e(jQuery)}};var l=function(e,t){var a,n,l,i,o,u,s,c,f,g,d,p,v,m,h,b,A,y,x,C,T,w,k,E,N,M,j,L;u={table:{clickCallback:null,mouseEnterCallback:null,mouseLeaveCallback:null,mouseMoveCallback:null,rowTotals:true,colTotals:true},localeStrings:{totals:"Total"}};t=$.extend(true,{},u,t);l=e.colAttrs;h=e.rowAttrs;L=[];A=e.getRowKeys();o=e.getColKeys();console.log("colAttrs",l);console.log("rowAttrs",h);console.log("rowKeys",A);console.log("colKeys",o);console.log("pivotData",e);var O={};if(t.table.aggregationConfig){Object.keys(t.table.aggregationConfig).forEach(function(e){if(t.table.aggregationConfig.hasOwnProperty(e)){var a=t.table.aggregationConfig[e];O[a.name]=a}})}var a=e.getAggregator([],[]);var I=a.multivalue();Object.keys(I).forEach(function(e){if(I.hasOwnProperty(e)){L.push(e)}});console.log(L);var q=!!window.enablePivotDebug;if(t.table.clickCallback){s=function(a,n,i){var o,u,s;u={};for(s in l){if(!r.call(l,s))continue;o=l[s];if(i[s]!=null){u[o]=i[s]}}for(s in h){if(!r.call(h,s))continue;o=h[s];if(n[s]!=null){u[o]=n[s]}}return function(n){return t.table.clickCallback(n,a,u,e)}}}if(t.table.mouseEnterCallback){c=function(a,n,i){var o,u,s;u={};for(s in l){if(!r.call(l,s))continue;o=l[s];if(i[s]!=null){u[o]=i[s]}}for(s in h){if(!r.call(h,s))continue;o=h[s];if(n[s]!=null){u[o]=n[s]}}return function(n){return t.table.mouseEnterCallback(n,a,u,e)}}}if(t.table.mouseLeaveCallback){f=function(a,n,i){var o,u,s;u={};for(s in l){if(!r.call(l,s))continue;o=l[s];if(i[s]!=null){u[o]=i[s]}}for(s in h){if(!r.call(h,s))continue;o=h[s];if(n[s]!=null){u[o]=n[s]}}return function(n){return t.table.mouseLeaveCallback(n,a,u,e)}}}if(t.table.mouseMoveCallback){g=function(a,n,i){var o,u,s;u={};for(s in l){if(!r.call(l,s))continue;o=l[s];if(i[s]!=null){u[o]=i[s]}}for(s in h){if(!r.call(h,s))continue;o=h[s];if(n[s]!=null){u[o]=n[s]}}return function(n){return t.table.mouseMoveCallback(n,a,u,e)}}}m=document.createElement("table");m.className="pvtTable";y=function(e,t,a){var n,r,l,i,o,u,s,c;if(t!==0){i=true;for(c=n=0,o=a;0<=o?n<=o:n>=o;c=0<=o?++n:--n){if(e[t-1][c]!==e[t][c]){i=false}}if(i){return-1}}r=0;while(t+r<e.length){s=false;for(c=l=0,u=a;0<=u?l<=u:l>=u;c=0<=u?++l:--l){if(e[t][c]!==e[t+r][c]){s=true}}if(s){break}r++}return r};w=document.createElement("thead");function H(){if(parseInt(p)===0&&t.table.rowTotals){T=document.createElement("th");T.className="pvtTotalLabel pvtRowTotalLabel";T.innerHTML=t.localeStrings.totals;var e=0;Object.keys(O).forEach(function(t){if(O[t].hideInTotals){e++}});T.setAttribute("colspan",L.length-e);T.setAttribute("rowspan",2+l.length+(h.length===0?0:1));E.appendChild(T)}}function _(){for(d in o){if(!r.call(o,d))continue;i=o[d];j=y(o,parseInt(d),parseInt(p));if(j!==-1){T=document.createElement("th");T.className="pvtColLabel";j=j*L.length;T.textContent=i[p];T.setAttribute("colspan",j);if(parseInt(p)===l.length-1&&h.length!==0){T.setAttribute("rowspan",2)}E.appendChild(T)}}}for(p in l){if(!r.call(l,p))continue;n=l[p];E=document.createElement("tr");if(parseInt(p)===0&&h.length!==0){T=document.createElement("th");T.setAttribute("colspan",h.length);T.setAttribute("rowspan",l.length);E.appendChild(T)}T=document.createElement("th");T.className="pvtAxisLabel";T.textContent=n;E.appendChild(T);if(t.table.prependRowTotals){H();_()}else{_();H()}w.appendChild(E)}if(h.length!==0){E=document.createElement("tr");for(d in h){if(!r.call(h,d))continue;v=h[d];T=document.createElement("th");T.className="pvtAxisLabel";T.textContent=v;E.appendChild(T)}T=document.createElement("th");if(l.length===0){T.className="pvtTotalLabel pvtRowTotalLabel";T.setAttribute("colspan",L.length);T.innerHTML=t.localeStrings.totals}E.appendChild(T);w.appendChild(E)}m.appendChild(w);x=document.createElement("tbody");E=document.createElement("tr");T=document.createElement("th");T.textContent="";T.setAttribute("colspan",h.length+(o.length>0?1:0));E.appendChild(T);function S(){for(var e=0,t=o.length;e<t;e++){var a=o[e];if(!!a){var n=0;for(var r in L){T=document.createElement("th");T.textContent=L[n++];E.appendChild(T)}}}}function R(){if(t.table.rowTotals){for(var e=0,a=L.length;e<a;e++){var n=L[e];if(O[n]&&O[n].hideInTotals){continue}T=document.createElement("th");T.textContent=n;E.appendChild(T)}}}if(t.table.prependRowTotals){R();S()}else{S();R()}x.appendChild(E);function G(){for(p in o){if(!r.call(o,p))continue;i=o[p];a=e.getAggregator(b,i);M=a.value();if(!!a.multivalue){var t=a.multivalue(b,i);var n=0;for(var l in t){M=t[l];C=document.createElement("td");C.className="pvtVal row"+d+" col"+p+" stat"+n;var u=$("<span>");if(q){u.append($("<span>").html(l).addClass("small text-grey"));u.append($("<br>"))}u.append($("<span>").html(a.format(M,l)));C.append(u[0]);C.setAttribute("data-value",M);C.setAttribute("data-row",d);C.setAttribute("data-stat-index",n);C.setAttribute("data-col",p);C.setAttribute("data-value-for",l);if(s!=null){C.onclick=s(M,b,i)}if(c!=null){C.onmouseenter=c(M,b,i)}if(f!=null){C.onmouseleave=f(M,b,i)}if(g!=null){C.onmouseleave=g(M,b,i)}E.appendChild(C);n++}}else{for(var v=0,m=L.length;v<m;v++){var h=L[v];M=a.value();C=document.createElement("td");C.className="pvtVal row"+d+" col"+p;C.textContent=a.format(M);C.setAttribute("data-value",M);if(s!=null){C.onclick=s(M,b,i)}E.appendChild(C)}}}return{stats:t,idx:n,valueSpan:u,k:v,x:m}}function V(){if(t.table.rowTotals||l.length===0){k=e.getAggregator(b,[]);M=k.value();if(!!k.multivalue){var a=k.multivalue();for(var n in a){M=a[n];if(O[n]&&O[n].hideInTotals){continue}C=document.createElement("td");C.className="pvtTotal rowTotal";var r=$("<span>");if(q){r.append($("<span>").html(n).addClass("small text-grey"));r.append($("<br>"))}r.append($("<span>").html(k.format(M,n)));C.append(r[0]);C.setAttribute("data-value",M);C.setAttribute("data-value-for",n);if(s!=null){C.onclick=s(M,b,[])}C.setAttribute("data-for","row"+d);E.appendChild(C)}}else{for(var i=0,o=L.length;i<o;i++){var u=L[i];M=k.value();C=document.createElement("td");C.className="pvtTotal rowTotal";C.textContent=k.format(M);C.setAttribute("data-value",M);if(s!=null){C.onclick=s(M,b,[])}C.setAttribute("data-for","row"+d);E.appendChild(C)}}}return{stats:a,valueSpan:r,k:i,x:o}}for(d in A){if(!r.call(A,d))continue;b=A[d];E=document.createElement("tr");for(p in b){if(!r.call(b,p))continue;N=b[p];j=y(A,parseInt(d),parseInt(p));if(j!==-1){T=document.createElement("th");T.className="pvtRowLabel";T.textContent=N;T.setAttribute("rowspan",j);if(parseInt(p)===h.length-1&&l.length!==0){T.setAttribute("colspan",2)}E.appendChild(T)}}if(t.table.prependRowTotals){var{stats:K,valueSpan:P,k:Q,x:j}=V();var{stats:K,idx:D,valueSpan:P,k:Q,x:j}=G()}else{var{stats:K,idx:D,valueSpan:P,k:Q,x:j}=G();var{stats:K,valueSpan:P,k:Q,x:j}=V()}x.appendChild(E)}function F(){for(p in o){if(!r.call(o,p))continue;i=o[p];k=e.getAggregator([],i);M=k.value();if(!!k.multivalue){var t=k.multivalue();for(var a in t){M=t[a];C=document.createElement("td");C.className="pvtTotal colTotal";var n=$("<span>");if(q){n.append($("<span>").html(a).addClass("small text-grey"));n.append($("<br>"))}n.append($("<span>").html(k.format(M,a)));C.append(n[0]);C.setAttribute("data-value",M);C.setAttribute("data-value-for",a);if(s!=null){C.onclick=s(M,[],i)}C.setAttribute("data-for","col"+p);E.appendChild(C)}}else{for(var l=0,u=L.length;l<u;l++){var c=L[l];M=k.value();C=document.createElement("td");C.className="pvtTotal colTotal";C.textContent=k.format(M);C.setAttribute("data-value",M);if(s!=null){C.onclick=s(M,[],i)}C.setAttribute("data-for","col"+p);E.appendChild(C)}}}}function U(){if(t.table.rowTotals||l.length===0){k=e.getAggregator([],[]);M=k.value();if(!!k.multivalue){var a=k.multivalue();for(var n in a){if(O[n]&&O[n].hideInTotals){continue}M=a[n];C=document.createElement("td");C.className="pvtGrandTotal";C.textContent=k.format(M,n);C.setAttribute("data-value",M);C.setAttribute("data-value-for",n);if(s!=null){C.onclick=s(M,[],[])}E.appendChild(C)}}else{for(var r=0,i=L.length;r<i;r++){var o=L[r];M=k.value();C=document.createElement("td");C.className="pvtGrandTotal";C.textContent=k.format(M);C.setAttribute("data-value",M);if(s!=null){C.onclick=s(M,[],[])}E.appendChild(C)}}}}if(t.table.colTotals||h.length===0){E=document.createElement("tr");if(t.table.colTotals||h.length===0){T=document.createElement("th");T.className="pvtTotalLabel pvtColTotalLabel";T.innerHTML=t.localeStrings.totals;T.setAttribute("colspan",h.length+(l.length===0?0:1));E.appendChild(T)}if(t.table.prependRowTotals){U();F()}else{F();U()}x.appendChild(E)}m.appendChild(x);m.setAttribute("data-numrows",A.length);m.setAttribute("data-numcols",o.length);return m};e(function(e){return e.pivotUtilities.gtRenderers={"GT Table":function(e,t){return l(e,t)},"GT Table Heatmap":function(t,a){return e(l(t,a)).gtHeatmap("heatmap",a)},"GT Table Heatmap and Barchart":function(t,a){return e(e(l(t,a)).gtHeatmap("heatmap",a)).gtBarchart(a)},"GT Table Row Heatmap":function(t,a){return e(l(t,a)).gtHeatmap("rowheatmap",a)},"GT Table Col Heatmap":function(t,a){return e(l(t,a)).gtHeatmap("colheatmap",a)}}})}).call(this);