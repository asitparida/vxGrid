var duScrollDefaultEasing=function(e){"use strict";return.5>e?Math.pow(2*e,2)/2:1-Math.pow(2*(1-e),2)/2};angular.module("duScroll",["duScroll.scrollspy","duScroll.smoothScroll","duScroll.scrollContainer","duScroll.spyContext","duScroll.scrollHelpers"]).value("duScrollDuration",350).value("duScrollSpyWait",100).value("duScrollGreedy",!1).value("duScrollOffset",0).value("duScrollEasing",duScrollDefaultEasing),angular.module("duScroll.scrollHelpers",["duScroll.requestAnimation"]).run(["$window","$q","cancelAnimation","requestAnimation","duScrollEasing","duScrollDuration","duScrollOffset",function(e,t,n,r,o,l,i){"use strict";var u=angular.element.prototype,c=function(e){return"undefined"!=typeof HTMLDocument&&e instanceof HTMLDocument||e.nodeType&&e.nodeType===e.DOCUMENT_NODE},a=function(e){return"undefined"!=typeof HTMLElement&&e instanceof HTMLElement||e.nodeType&&e.nodeType===e.ELEMENT_NODE},s=function(e){return a(e)||c(e)?e:e[0]};u.scrollTo=function(t,n,r,o){var l;if(angular.isElement(t)?l=this.scrollToElement:r&&(l=this.scrollToAnimated),l)return l.apply(this,arguments);var i=s(this);return c(i)?e.scrollTo(t,n):(i.scrollLeft=t,void(i.scrollTop=n))};var d,f;u.scrollToAnimated=function(e,l,i,u){i&&!u&&(u=o);var c=this.scrollLeft(),a=this.scrollTop(),s=Math.round(e-c),p=Math.round(l-a),m=null,g=this,v="scroll mousedown mousewheel touchmove keydown",h=function(e){(!e||e.which>0)&&(g.unbind(v,h),n(d),f.reject(),d=null)};if(d&&h(),f=t.defer(),!s&&!p)return f.resolve(),f.promise;var y=function(e){null===m&&(m=e);var t=e-m,n=t>=i?1:u(t/i);g.scrollTo(c+Math.ceil(s*n),a+Math.ceil(p*n)),1>n?d=r(y):(g.unbind(v,h),d=null,f.resolve())};return g.scrollTo(c,a),g.bind(v,h),d=r(y),f.promise},u.scrollToElement=function(e,t,n,r){var o=s(this);(!angular.isNumber(t)||isNaN(t))&&(t=i);var l=this.scrollTop()+s(e).getBoundingClientRect().top-t;return a(o)&&(l-=o.getBoundingClientRect().top),this.scrollTo(0,l,n,r)};var p={scrollLeft:function(t,n,r){if(angular.isNumber(t))return this.scrollTo(t,this.scrollTop(),n,r);var o=s(this);return c(o)?e.scrollX||document.documentElement.scrollLeft||document.body.scrollLeft:o.scrollLeft},scrollTop:function(t,n,r){if(angular.isNumber(t))return this.scrollTo(this.scrollTop(),t,n,r);var o=s(this);return c(o)?e.scrollY||document.documentElement.scrollTop||document.body.scrollTop:o.scrollTop}};u.scrollToElementAnimated=function(e,t,n,r){return this.scrollToElement(e,t,n||l,r)},u.scrollTopAnimated=function(e,t,n){return this.scrollTop(e,t||l,n)},u.scrollLeftAnimated=function(e,t,n){return this.scrollLeft(e,t||l,n)};var m=function(e,t){return function(n,r,o){return r?t.apply(this,arguments):e.apply(this,arguments)}};for(var g in p)u[g]=u[g]?m(u[g],p[g]):p[g]}]),angular.module("duScroll.polyfill",[]).factory("polyfill",["$window",function(e){"use strict";var t=["webkit","moz","o","ms"];return function(n,r){if(e[n])return e[n];for(var o,l=n.substr(0,1).toUpperCase()+n.substr(1),i=0;i<t.length;i++)if(o=t[i]+l,e[o])return e[o];return r}}]),angular.module("duScroll.requestAnimation",["duScroll.polyfill"]).factory("requestAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=0,r=function(e,r){var o=(new Date).getTime(),l=Math.max(0,16-(o-n)),i=t(function(){e(o+l)},l);return n=o+l,i};return e("requestAnimationFrame",r)}]).factory("cancelAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=function(e){t.cancel(e)};return e("cancelAnimationFrame",n)}]),angular.module("duScroll.spyAPI",["duScroll.scrollContainerAPI"]).factory("spyAPI",["$rootScope","$timeout","scrollContainerAPI","duScrollGreedy","duScrollSpyWait",function(e,t,n,r,o){"use strict";var l=function(n){var l=!1,i=!1,u=function(){i=!1;var t=n.container,o=t[0],l=0;("undefined"!=typeof HTMLElement&&o instanceof HTMLElement||o.nodeType&&o.nodeType===o.ELEMENT_NODE)&&(l=o.getBoundingClientRect().top);var u,c,a,s,d,f;for(s=n.spies,c=n.currentlyActive,a=void 0,u=0;u<s.length;u++)d=s[u],f=d.getTargetPosition(),f&&f.top+d.offset-l<20&&-1*f.top+l<f.height&&(!a||a.top<f.top)&&(a={top:f.top,spy:d});a&&(a=a.spy),c===a||r&&!a||(c&&(c.$element.removeClass("active"),e.$broadcast("duScrollspy:becameInactive",c.$element)),a&&(a.$element.addClass("active"),e.$broadcast("duScrollspy:becameActive",a.$element)),n.currentlyActive=a)};return o?function(){l?i=!0:(u(),l=t(function(){l=!1,i&&u()},o,!1))}:u},i={},u=function(e){var t=e.$id,n={spies:[]};return n.handler=l(n),i[t]=n,e.$on("$destroy",function(){c(e)}),t},c=function(e){var t=e.$id,n=i[t],r=n.container;r&&r.off("scroll",n.handler),delete i[t]},a=u(e),s=function(e){return i[e.$id]?i[e.$id]:e.$parent?s(e.$parent):i[a]},d=function(e){var t,n,r=e.$element.scope();if(r)return s(r);for(n in i)if(t=i[n],-1!==t.spies.indexOf(e))return t},f=function(e){for(;e.parentNode;)if(e=e.parentNode,e===document)return!0;return!1},p=function(e){var t=d(e);t&&(t.spies.push(e),t.container&&f(t.container)||(t.container&&t.container.off("scroll",t.handler),t.container=n.getContainer(e.$element.scope()),t.container.on("scroll",t.handler).triggerHandler("scroll")))},m=function(e){var t=d(e);e===t.currentlyActive&&(t.currentlyActive=null);var n=t.spies.indexOf(e);-1!==n&&t.spies.splice(n,1)};return{addSpy:p,removeSpy:m,createContext:u,destroyContext:c,getContextForScope:s}}]),angular.module("duScroll.scrollContainerAPI",[]).factory("scrollContainerAPI",["$document",function(e){"use strict";var t={},n=function(e,n){var r=e.$id;return t[r]=n,r},r=function(e){return t[e.$id]?e.$id:e.$parent?r(e.$parent):void 0},o=function(n){var o=r(n);return o?t[o]:e},l=function(e){var n=r(e);n&&delete t[n]};return{getContainerId:r,getContainer:o,setContainer:n,removeContainer:l}}]),angular.module("duScroll.smoothScroll",["duScroll.scrollHelpers","duScroll.scrollContainerAPI"]).directive("duSmoothScroll",["duScrollDuration","duScrollOffset","scrollContainerAPI",function(e,t,n){"use strict";return{link:function(r,o,l){o.on("click",function(o){if(l.href&&-1!==l.href.indexOf("#")){var i=document.getElementById(l.href.replace(/.*(?=#[^\s]+$)/,"").substring(1));if(i&&i.getBoundingClientRect){o.stopPropagation&&o.stopPropagation(),o.preventDefault&&o.preventDefault();var u=l.offset?parseInt(l.offset,10):t,c=l.duration?parseInt(l.duration,10):e,a=n.getContainer(r);a.scrollToElement(angular.element(i),isNaN(u)?0:u,isNaN(c)?0:c)}}})}}}]),angular.module("duScroll.spyContext",["duScroll.spyAPI"]).directive("duSpyContext",["spyAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(t,n,r){return{pre:function(t,n,r,o){e.createContext(t)}}}}}]),angular.module("duScroll.scrollContainer",["duScroll.scrollContainerAPI"]).directive("duScrollContainer",["scrollContainerAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(t,n,r){return{pre:function(t,n,r,o){r.$observe("duScrollContainer",function(r){angular.isString(r)&&(r=document.getElementById(r)),r=angular.isElement(r)?angular.element(r):n,e.setContainer(t,r),t.$on("$destroy",function(){e.removeContainer(t)})})}}}}}]),angular.module("duScroll.scrollspy",["duScroll.spyAPI"]).directive("duScrollspy",["spyAPI","duScrollOffset","$timeout","$rootScope",function(e,t,n,r){"use strict";var o=function(e,t,n){angular.isElement(e)?this.target=e:angular.isString(e)&&(this.targetId=e),this.$element=t,this.offset=n};return o.prototype.getTargetElement=function(){return!this.target&&this.targetId&&(this.target=document.getElementById(this.targetId)),this.target},o.prototype.getTargetPosition=function(){var e=this.getTargetElement();return e?e.getBoundingClientRect():void 0},o.prototype.flushTargetCache=function(){this.targetId&&(this.target=void 0)},{link:function(l,i,u){var c,a=u.ngHref||u.href;a&&-1!==a.indexOf("#")?c=a.replace(/.*(?=#[^\s]+$)/,"").substring(1):u.duScrollspy&&(c=u.duScrollspy),c&&n(function(){var n=new o(c,i,-(u.offset?parseInt(u.offset,10):t));e.addSpy(n),l.$on("$destroy",function(){e.removeSpy(n)}),l.$on("$locationChangeSuccess",n.flushTargetCache.bind(n)),r.$on("$stateChangeSuccess",n.flushTargetCache.bind(n))},0,!1)}}}]);