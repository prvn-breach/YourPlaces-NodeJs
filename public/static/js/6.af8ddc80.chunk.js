(this.webpackJsonpmern=this.webpackJsonpmern||[]).push([[6],{48:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(52);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},52:function(e,t,a){},56:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(e){return"https://mern-code.herokuapp.com/"+e}},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var n=a(46),r=a.n(n),c=a(47),l=a(10),o=a(0),i=a.n(o),s=a(1),u=a(48),m=a(43),d=a(60),p=(a(67),function(e){var t=Object(o.useRef)(),a=e.center,n=e.zoom;return Object(o.useEffect)((function(){var e=new window.google.maps.Map(t.current,{center:a,zoom:n});new window.google.maps.Marker({position:a,map:e})}),[a,n]),i.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style})}),E=a(15),f=a(50),v=a(51),h=a(49),b=a(11),O=a(56),g=(a(68),function(e){var t=Object(o.useState)(!1),a=Object(l.a)(t,2),n=a[0],s=a[1],g=function(){return s(!1)},C=Object(o.useState)(!1),j=Object(l.a)(C,2),w=j[0],N=j[1],k=function(){return N(!1)},_=Object(v.a)(),y=_.isLoadingSpinner,S=_.error,D=_.sendRequest,I=_.clearError,P=Object(o.useContext)(b.a),x=function(){var t=Object(c.a)(r.a.mark((function t(a){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return N(!1),t.prev=1,t.next=4,D(h.b,"POST",{"Content-Type":"application/json",Authorization:"Bearer "+P.token},JSON.stringify({id:e.id}));case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}();return i.a.createElement(i.a.Fragment,null,S&&i.a.createElement(f.a,{error:S,onClear:I}),i.a.createElement(d.a,{onCancel:g,header:e.address,show:n,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:i.a.createElement(m.a,{onClick:g},"CLOSE")},i.a.createElement("div",{className:"map-container"},i.a.createElement(p,{center:e.coordinates,zoom:16}))),i.a.createElement(d.a,{show:w,onCancel:k,header:"Are You Sure ?",footerClass:"place-item__modal-actions",footer:i.a.createElement(i.a.Fragment,null,i.a.createElement(m.a,{inverse:!0,onClick:k},"CANCEL"),i.a.createElement(m.a,{danger:!0,onClick:x},"DELETE"))},i.a.createElement("p",null,"Do you want to proceed and delete this place? Please note it can't be undone thereafter")),i.a.createElement("li",{className:"place-item"},i.a.createElement(u.a,{className:"place-item__content"},y&&i.a.createElement(E.a,{asOverlay:!0}),i.a.createElement("div",{className:"place-item__image"},i.a.createElement("img",{src:Object(O.a)(e.image),alt:e.title})),i.a.createElement("div",{className:"place-item__info"},i.a.createElement("h2",null,e.title),i.a.createElement("h3",null,e.address),i.a.createElement("p",null,e.description)),i.a.createElement("div",{className:"place-item__actions"},i.a.createElement(m.a,{inverse:!0,onClick:function(){return s(!0)}},"VIEW ON MAP"),P.userId===e.createrId&&i.a.createElement(m.a,{to:"/places/".concat(e.id)},"EDIT"),P.userId===e.createrId&&i.a.createElement(m.a,{danger:!0,onClick:function(){return N(!0)}},"DELETE")))))}),C=(a(69),function(e){return 0===e.items.length?i.a.createElement("div",{className:"center"},i.a.createElement(u.a,null,i.a.createElement("h2",null,"No Places Found, May be Create One ?"),i.a.createElement(m.a,{to:"/place/new"},"Share Place"))):i.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return i.a.createElement(g,{key:t.id,id:t.id,title:t.title,image:t.image,address:t.address,description:t.description,createrId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))});t.default=function(){var e=Object(o.useState)([]),t=Object(l.a)(e,2),a=t[0],n=t[1],u=Object(v.a)(),m=u.isLoadingSpinner,d=u.error,p=u.sendRequest,b=u.clearError,O=Object(s.h)().userId;Object(o.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p(h.d+"?"+new URLSearchParams({uid:O}));case 3:t=e.sent,n(t.places),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[p,O]);return i.a.createElement(i.a.Fragment,null,m&&i.a.createElement(E.a,{asOverlay:!0}),d&&i.a.createElement(f.a,{error:d,onClear:b}),i.a.createElement(C,{items:a,onDeletePlace:function(e){n((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=6.af8ddc80.chunk.js.map