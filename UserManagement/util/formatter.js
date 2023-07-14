sap.ui.define([],function(){"use strict";return{getUserStatus:function(e){if(e=="Active")return"Success";else return"Error"},getTypeOfPage:function(e){return e=="0"?"Dashboard":"Analytical"},getSideMenuItemVisibility:function(e,t){if(e=="Home")return true;else if(e=="Super Admin"||e=="Application")return!t;else return t},getAuthorizeDays:function(e,t){if(e&&t){e=new Date(e);t=new Date(t);var r=Math.abs(t.getTime()-e.getTime());var n=Math.ceil(r/(1e3*60*60*24));if(n>=365){var a=n/365;var s=parseInt(a);if(s=="1"){s=parseInt(a)+" year"}else{s=parseInt(a)+" years"}return s}else if(n<365&&n>30){var i=n/30;var u=parseInt(i);if(u=="1"){u=parseInt(i)+" month"}else{u=parseInt(i)+" months"}return u}else if(n>=7){var f=n/7;var o=parseInt(f);if(o=="1"){o=parseInt(f)+" week"}else{o=parseInt(f)+" weeks"}return o}else{var l=parseInt(n);if(l=="1"){l=parseInt(n)+" day"}else if(l=="0"){l=parseInt(n)+" day"}else{l=parseInt(n)+" days"}return l}}},getNoOfDays:function(e,t){if(e,t){e=new Date(e);t=new Date(t);var r=Math.abs(t.getTime()-e.getTime());var n=Math.ceil(r/(1e3*60*60*24));return n}else return""},handleDateValues:function(e){var t=sap.ui.core.format.DateFormat.getDateInstance({pattern:"MM/dd/YYYY"});return t.format(new Date(e))},getNoOfUsers:function(e){try{return e.length}catch(e){return 0}},getBooleanCondition:function(e){if(e==true||e=="true")return true;else if(e==false||e=="false")return false},test:function(e){return e}}});