!function(e,t){"use strict";function n(){if("pageYOffset"in e)return{scrollTop:pageYOffset,scrollLeft:pageXOffset};var t,n,s=document,r=s.documentElement,a=s.body;return t=r.scrollLeft||a.scrollLeft||0,n=r.scrollTop||a.scrollTop||0,{scrollTop:n,scrollLeft:t}}function s(t,n){return t===e?"clientWidth"===n?e.innerWidth:e.innerHeight:t[n]}function r(t,s){return t===e?n()[s]:t[s]}function a(t,s,r){var a=t.getBoundingClientRect()[r?"left":"top"],o=s===e?0:s.getBoundingClientRect()[r?"left":"top"],i=a-o+(s===e?n():s)[r?"scrollLeft":"scrollTop"];return i}var o=document.documentElement,i=o.matches?"matches":o.matchesSelector?"matchesSelector":o.webkitMatches?"webkitMatches":o.webkitMatchesSelector?"webkitMatchesSelector":o.msMatches?"msMatches":o.msMatchesSelector?"msMatchesSelector":o.mozMatches?"mozMatches":o.mozMatchesSelector?"mozMatchesSelector":null,l=t.element.prototype.closest||function(e){for(var n=this[0].parentNode;n!==document.documentElement&&null!=n&&!n[i](e);)n=n.parentNode;return n&&n[i](e)?t.element(n):t.element()},c=t.module("vs-repeat",[]).directive("vsRepeat",["$compile","$parse",function(n,o){return{restrict:"A",scope:!0,compile:function(i,c){var f,d,u,p,h,v,m=t.isDefined(c.vsRepeatContainer)?t.element(i[0].querySelector(c.vsRepeatContainer)):i,x=m.children().eq(0),g=x[0].outerHTML,$="$vs_collection",z=!1,S={vsRepeat:"elementSize",vsOffsetBefore:"offsetBefore",vsOffsetAfter:"offsetAfter",vsScrolledToEndOffset:"scrolledToEndOffset",vsExcess:"excess"};if(x.attr("ng-repeat"))v="ng-repeat",f=x.attr("ng-repeat");else if(x.attr("data-ng-repeat"))v="data-ng-repeat",f=x.attr("data-ng-repeat");else if(x.attr("ng-repeat-start"))z=!0,v="ng-repeat-start",f=x.attr("ng-repeat-start");else{if(!x.attr("data-ng-repeat-start"))throw new Error("angular-vs-repeat: no ng-repeat directive on a child element");z=!0,v="data-ng-repeat-start",f=x.attr("data-ng-repeat-start")}if(d=/^\s*(\S+)\s+in\s+([\S\s]+?)(track\s+by\s+\S+)?$/.exec(f),u=d[1],p=d[2],h=d[3],z)for(var I=0,M=m.children().eq(0);null==M.attr("ng-repeat-end")&&null==M.attr("data-ng-repeat-end");)I++,M=m.children().eq(I),g+=M[0].outerHTML;return m.empty(),{pre:function(i,c,f){function d(){if(!O||O.length<1)i[$]=[],R=0,i.sizesCumulative=[0];else if(R=O.length,q){i.sizes=O.map(function(e){var n=i.$new(!1);t.extend(n,e),n[u]=e;var s=f.vsSize||f.vsSizeProperty?n.$eval(f.vsSize||f.vsSizeProperty):i.elementSize;return n.$destroy(),s});var e=0;i.sizesCumulative=i.sizes.map(function(t){var n=e;return e+=t,n}),i.sizesCumulative.push(e)}else m();y()}function m(){P&&i.$$postDigest(function(){if(T[0].offsetHeight||T[0].offsetWidth){for(var e=T.children(),t=0,n=!1,s=!1;t<e.length;){if(null!=e[t].attributes[v]||s){if(n||(i.elementSize=0),n=!0,e[t][N]&&(i.elementSize+=e[t][N]),!z)break;if(null!=e[t].attributes["ng-repeat-end"]||null!=e[t].attributes["data-ng-repeat-end"])break;s=!0}t++}n&&(y(),P=!1,i.$root&&!i.$root.$$phase&&i.$apply())}else var r=i.$watch(function(){(T[0].offsetHeight||T[0].offsetWidth)&&(r(),m())})})}function x(){var e="tr"===E?"":"min-",t=A?e+"width":e+"height";return t}function I(){C()&&i.$digest()}function M(){"undefined"!=typeof f.vsAutoresize&&(P=!0,m(),i.$root&&!i.$root.$$phase&&i.$apply()),C()&&i.$apply()}function y(){Y=void 0,j=void 0,U=R,X=0,w(q?i.sizesCumulative[R]:i.elementSize*R),C(),i.$emit("vsRepeatReinitialized",i.startIndex,i.endIndex)}function w(e){i.totalSize=i.offsetBefore+e+i.offsetAfter}function b(){var e=s(H[0],D);e!==_&&(y(),i.$root&&!i.$root.$$phase&&i.$apply()),_=e}function C(){var e=r(H[0],F),t=s(H[0],D),n=T[0]===H[0]?0:a(T[0],H[0],A),l=i.startIndex,c=i.endIndex;if(q){for(l=0;i.sizesCumulative[l]<e-i.offsetBefore-n;)l++;for(l>0&&l--,l=Math.max(Math.floor(l-i.excess/2),0),c=l;i.sizesCumulative[c]<e-i.offsetBefore-n+t;)c++;c=Math.min(Math.ceil(c+i.excess/2),R)}else l=Math.max(Math.floor((e-i.offsetBefore-n)/i.elementSize)-i.excess/2,0),c=Math.min(l+Math.ceil(t/i.elementSize)+i.excess,R);U=Math.min(l,U),X=Math.max(c,X),i.startIndex=W.latch?U:l,i.endIndex=W.latch?X:c;var d=!1;if(null==Y?d=!0:null==j&&(d=!0),d||(W.hunked?Math.abs(i.startIndex-Y)>=i.excess/2||0===i.startIndex&&0!==Y?d=!0:(Math.abs(i.endIndex-j)>=i.excess/2||i.endIndex===R&&j!==R)&&(d=!0):d=i.startIndex!==Y||i.endIndex!==j),d){if(i[$]=O.slice(i.startIndex,i.endIndex),i.$emit("vsRepeatInnerCollectionUpdated",i.startIndex,i.endIndex,Y,j),f.vsScrolledToEnd){var u=O.length-(i.scrolledToEndOffset||0);(i.endIndex>=u&&u>j||O.length&&i.endIndex===O.length)&&i.$eval(f.vsScrolledToEnd)}Y=i.startIndex,j=i.endIndex;var p=q?"(sizesCumulative[$index + startIndex] + offsetBefore)":"(($index + startIndex) * elementSize + offsetBefore)",h=o(p),v=h(i,{$index:0}),m=h(i,{$index:i[$].length}),g=i.totalSize;k.css(x(),v+"px"),L.css(x(),g-m+"px")}return d}var R,T=t.isDefined(f.vsRepeatContainer)?t.element(c[0].querySelector(f.vsRepeatContainer)):c,B=t.element(g),E=B[0].tagName.toLowerCase(),O=[],A="undefined"!=typeof f.vsHorizontal,k=t.element("<"+E+' class="vs-repeat-before-content"></'+E+">"),L=t.element("<"+E+' class="vs-repeat-after-content"></'+E+">"),P=!f.vsRepeat,q=!!f.vsSize||!!f.vsSizeProperty,H=f.vsScrollParent?"window"===f.vsScrollParent?t.element(e):l.call(T,f.vsScrollParent):T,W="vsOptions"in f?i.$eval(f.vsOptions):{},D=A?"clientWidth":"clientHeight",N=A?"offsetWidth":"offsetHeight",F=A?"scrollLeft":"scrollTop";if(i.totalSize=0,!("vsSize"in f)&&"vsSizeProperty"in f&&console.warn("vs-size-property attribute is deprecated. Please use vs-size attribute which also accepts angular expressions."),0===H.length)throw"Specified scroll parent selector did not match any element";i.$scrollParent=H,q&&(i.sizesCumulative=[]),i.elementSize=+f.vsRepeat||s(H[0],D)||50,i.offsetBefore=0,i.offsetAfter=0,i.excess=2,A?(k.css("height","100%"),L.css("height","100%")):(k.css("width","100%"),L.css("width","100%")),Object.keys(S).forEach(function(e){f[e]&&f.$observe(e,function(t){i[S[e]]=+t,y()})}),i.$watchCollection(p,function(e){O=e||[],d()}),B.eq(0).attr(v,u+" in "+$+(h?" "+h:"")),B.addClass("vs-repeat-repeated-element"),T.append(k),T.append(B),n(B)(i),T.append(L),i.startIndex=0,i.endIndex=0,H.on("scroll",I),t.element(e).on("resize",M),i.$on("$destroy",function(){t.element(e).off("resize",M),H.off("scroll",I)}),i.$on("vsRepeatTrigger",d),i.$on("vsRepeatResize",function(){P=!0,m()});var Y,j,U,X;i.$on("vsRenderAll",function(){W.latch&&setTimeout(function(){var e=R;X=Math.max(e,X),i.endIndex=W.latch?X:e,i[$]=O.slice(i.startIndex,i.endIndex),j=i.endIndex,i.$$postDigest(function(){k.css(x(),0),L.css(x(),0)}),i.$apply(function(){i.$emit("vsRenderAllDone")})})});var _;i.$watch(function(){"function"==typeof e.requestAnimationFrame?e.requestAnimationFrame(b):b()})}}}}}]);"undefined"!=typeof module&&module.exports&&(module.exports=c.name)}(window,window.angular);