(this.webpackJsonpscreencast=this.webpackJsonpscreencast||[]).push([[0],{100:function(e,t,n){},106:function(e,t,n){"use strict";n.r(t);var a,c=n(0),r=n.n(c),o=n(47),i=n.n(o),l=n(10),u=n.n(l),s=n(16),m=n(53),f=n(4),d=n(48),p=n.n(d),E=n(49),b=n.n(E),v=(n(105),n(98),function(e){return r.a.createElement("div",{className:"textContainer"},e.users?r.a.createElement("div",null,r.a.createElement("h1",null,"People in the room:"),r.a.createElement("div",{className:"activeContainer"},r.a.createElement("h2",null,e.users.map((function(t){return r.a.createElement("div",{key:t.name,className:"activeItem"},r.a.createElement("span",{className:"spanText"},t.name),e.name===t.name?" (You)":e.isOffered?r.a.createElement("span",null,r.a.createElement("button",{onClick:function(){return e.createAnswer()}},"Acceptera sk\xe4rmdelning"),r.a.createElement("button",{onClick:null},"Neka")):r.a.createElement("button",{onClick:Object(s.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.startCapture();case 2:e.createOfferToSpecific(t.id);case 3:case"end":return n.stop()}}),n)})))},"Erbjud sk\xe4rmdelning"))}))))):null)}),O=(n(99),function(e){var t=e.location,n=Object(c.useState)(""),o=Object(f.a)(n,2),i=o[0],l=o[1],d=Object(c.useState)(""),E=Object(f.a)(d,2),O=(E[0],E[1]),g=Object(c.useState)(""),h=Object(f.a)(g,2),j=h[0],x=h[1],k=Object(c.useState)(""),y=Object(f.a)(k,2),S=(y[0],y[1],Object(c.useState)([])),C=Object(f.a)(S,2),w=(C[0],C[1]),T=Object(c.useState)(!1),N=Object(f.a)(T,2),D=N[0],I=N[1],A="https://vast-shore-37325.herokuapp.com/",R=Object(c.useState)(new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]})),P=Object(f.a)(R,2),M=P[0],F=(P[1],r.a.useRef()),J=r.a.useRef();Object(c.useEffect)((function(){var e=p.a.parse(t.search),n=e.name,c=e.room;a=b()(A),O(c),l(n),a.emit("join",{name:n,room:c},(function(e){e&&alert(e)}))}),[A,t.search]),Object(c.useEffect)((function(){a.on("message",(function(e){w((function(t){return[].concat(Object(m.a)(t),[e])}))})),a.on("roomData",(function(e){var t=e.users;x(t)}))}),[]),Object(c.useEffect)((function(){a.on("offerOrAnswer",(function(e){"offer"===e.type?I(!0):I(!1),console.log("Offer/Answer ",JSON.stringify(e)),M.setRemoteDescription(new RTCSessionDescription(e))})),a.on("candidate",(function(e){console.log("candidate - ",e),e&&M.addIceCandidate(new RTCIceCandidate(e))})),M.oniceconnectionstatechange=function(e){console.log(e)},M.ontrack=function(e){J.current.srcObject=e.streams[0],J.current.controls=!0},M.onicecandidate=function(e){V("candidate",e.candidate)}}),[]);var V=function(e,t){a.emit(e,{socketID:a.id,payload:t})},B=function(e,t){a.emit("OfferToSpecific",{socketID:a.id,payload:e,target:t})},L=function(){var e=Object(s.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getDisplayMedia().then((function(e){F.current.srcObject=e,F.current.controls=!0;var t=e.getTracks();console.log(t),t.forEach((function(t){return M.addTrack(t,e)}))})).catch((function(e){console.log("getDisplayMedia Error: ",e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G={backgroundColor:"black",height:"40%",width:"90%",display:"table",margin:"auto"};return r.a.createElement("div",{className:"outerContainer"},r.a.createElement("div",{className:"container"},r.a.createElement("p",null,"Din sk\xe4rm"),r.a.createElement("video",{style:G,ref:F,autoPlay:!0}),r.a.createElement("button",{onClick:L,style:{marginTop:"10px"}},"Testa bild"),r.a.createElement("hr",null),r.a.createElement("p",null,"Fr\xe4mmande sk\xe4rm"),r.a.createElement("video",{style:G,id:"remoteVideo",ref:J,autoPlay:!0}),r.a.createElement("p",null)),r.a.createElement(v,{users:j,sendOfferToSpecificPeer:B,sendToPeer:V,pc:M,createOfferToSpecific:function(e){console.log("OfferToSpecificPeer"),M.createOffer({offerToReceiveVideo:!0}).then((function(t){console.log(t),M.setLocalDescription(t),B(t,e)}))},createAnswer:function(){console.log("Answer"),M.createAnswer({offerToReceiveVideo:!0}).then((function(e){console.log(e),M.setLocalDescription(e),V("offerOrAnswer",e)})).then(I(!1))},name:i,isOffered:D,startCapture:L}))}),g=n(18);n(100);function h(){var e=Object(c.useState)(""),t=Object(f.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)(""),i=Object(f.a)(o,2),l=i[0],u=i[1],s=function(){var e=document.getElementById("roomField"),t="xxxx-xxxx-4xxx-yxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}));e.value=t,u(t)};return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h1",{className:"heading"},"Screen Sharing App"),r.a.createElement("p",null,"Choose a name and a room"),r.a.createElement("div",null,r.a.createElement("input",{placeholder:"Name",className:"joinInput",type:"text",onChange:function(e){return a(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("input",{id:"roomField",placeholder:"Room",className:"joinInput mt-20",type:"text",onInput:function(e){return u(e.target.value)}})),r.a.createElement("button",{className:"button mt-20",onClick:function(e){e.preventDefault(),console.log(e),s()}},"Generate"),r.a.createElement(g.b,{onClick:function(e){return n&&l?null:e.preventDefault()},to:"/Main?name=".concat(n,"&room=").concat(l)},r.a.createElement("button",{className:"button mt-20",type:"submit"},"Sign In"))))}var j=n(7),x=function(){return r.a.createElement(g.a,null,r.a.createElement(j.a,{path:"/",exact:!0,component:h}),r.a.createElement(j.a,{path:"/Main",component:O}))};i.a.render(r.a.createElement(x,null),document.getElementById("root"))},54:function(e,t,n){e.exports=n(106)},95:function(e,t){},98:function(e,t,n){},99:function(e,t,n){}},[[54,1,2]]]);
//# sourceMappingURL=main.1e587bf7.chunk.js.map