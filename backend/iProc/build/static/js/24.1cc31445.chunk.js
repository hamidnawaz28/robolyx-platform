(this["webpackJsonpmaterial-app"]=this["webpackJsonpmaterial-app"]||[]).push([[24],{610:function(e,r,t){"use strict";t.d(r,"a",(function(){return o}));var a=t(0),n=t(171);function o(){return a.useContext(n.a)}},747:function(e,r,t){"use strict";var a=t(1),n=t(5),o=t(0),i=(t(4),t(6)),s=t(596),l=t(8),d=o.forwardRef((function(e,r){var t=e.disableUnderline,l=e.classes,d=e.fullWidth,c=void 0!==d&&d,u=e.inputComponent,m=void 0===u?"input":u,f=e.multiline,p=void 0!==f&&f,b=e.type,v=void 0===b?"text":b,h=Object(n.a)(e,["disableUnderline","classes","fullWidth","inputComponent","multiline","type"]);return o.createElement(s.a,Object(a.a)({classes:Object(a.a)({},l,{root:Object(i.a)(l.root,!t&&l.underline),underline:null}),fullWidth:c,inputComponent:m,multiline:p,ref:r,type:v},h))}));d.muiName="Input",r.a=Object(l.a)((function(e){var r="light"===e.palette.type?"rgba(0, 0, 0, 0.42)":"rgba(255, 255, 255, 0.7)";return{root:{position:"relative"},formControl:{"label + &":{marginTop:16}},focused:{},disabled:{},colorSecondary:{"&$underline:after":{borderBottomColor:e.palette.secondary.main}},underline:{"&:after":{borderBottom:"2px solid ".concat(e.palette.primary.main),left:0,bottom:0,content:'""',position:"absolute",right:0,transform:"scaleX(0)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shorter,easing:e.transitions.easing.easeOut}),pointerEvents:"none"},"&$focused:after":{transform:"scaleX(1)"},"&$error:after":{borderBottomColor:e.palette.error.main,transform:"scaleX(1)"},"&:before":{borderBottom:"1px solid ".concat(r),left:0,bottom:0,content:'"\\00a0"',position:"absolute",right:0,transition:e.transitions.create("border-bottom-color",{duration:e.transitions.duration.shorter}),pointerEvents:"none"},"&:hover:not($disabled):before":{borderBottom:"2px solid ".concat(e.palette.text.primary),"@media (hover: none)":{borderBottom:"1px solid ".concat(r)}},"&$disabled:before":{borderBottomStyle:"dotted"}},error:{},marginDense:{},multiline:{},fullWidth:{},input:{},inputMarginDense:{},inputMultiline:{},inputTypeSearch:{}}}),{name:"MuiInput"})(d)},748:function(e,r,t){"use strict";var a=t(1),n=t(5),o=t(0),i=(t(4),t(6)),s=t(217),l=t(8),d=t(11),c=t(219),u=t(171),m=o.forwardRef((function(e,r){var t=e.children,l=e.classes,m=e.className,f=e.color,p=void 0===f?"primary":f,b=e.component,v=void 0===b?"div":b,h=e.disabled,g=void 0!==h&&h,O=e.error,j=void 0!==O&&O,x=e.fullWidth,y=void 0!==x&&x,E=e.focused,k=e.hiddenLabel,C=void 0!==k&&k,$=e.margin,q=void 0===$?"none":$,S=e.required,w=void 0!==S&&S,N=e.size,W=e.variant,B=void 0===W?"standard":W,D=Object(n.a)(e,["children","classes","className","color","component","disabled","error","fullWidth","focused","hiddenLabel","margin","required","size","variant"]),F=o.useState((function(){var e=!1;return t&&o.Children.forEach(t,(function(r){if(Object(c.a)(r,["Input","Select"])){var t=Object(c.a)(r,["Select"])?r.props.input:r;t&&Object(s.a)(t.props)&&(e=!0)}})),e})),I=F[0],R=F[1],M=o.useState((function(){var e=!1;return t&&o.Children.forEach(t,(function(r){Object(c.a)(r,["Input","Select"])&&Object(s.b)(r.props,!0)&&(e=!0)})),e})),A=M[0],L=M[1],z=o.useState(!1),T=z[0],P=z[1],X=void 0!==E?E:T;g&&X&&P(!1);var J=o.useCallback((function(){L(!0)}),[]),U={adornedStart:I,setAdornedStart:R,color:p,disabled:g,error:j,filled:A,focused:X,fullWidth:y,hiddenLabel:C,margin:("small"===N?"dense":void 0)||q,onBlur:function(){P(!1)},onEmpty:o.useCallback((function(){L(!1)}),[]),onFilled:J,onFocus:function(){P(!0)},registerEffect:void 0,required:w,variant:B};return o.createElement(u.a.Provider,{value:U},o.createElement(v,Object(a.a)({className:Object(i.a)(l.root,m,"none"!==q&&l["margin".concat(Object(d.a)(q))],y&&l.fullWidth),ref:r},D),t))}));r.a=Object(l.a)({root:{display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},marginNormal:{marginTop:16,marginBottom:8},marginDense:{marginTop:8,marginBottom:4},fullWidth:{width:"100%"}},{name:"MuiFormControl"})(m)},919:function(e,r,t){"use strict";var a=t(1),n=t(5),o=t(0),i=(t(4),t(6)),s=t(214),l=t(610),d=t(8),c=t(11),u=o.forwardRef((function(e,r){var t=e.children,d=e.classes,u=e.className,m=(e.color,e.component),f=void 0===m?"label":m,p=(e.disabled,e.error,e.filled,e.focused,e.required,Object(n.a)(e,["children","classes","className","color","component","disabled","error","filled","focused","required"])),b=Object(l.a)(),v=Object(s.a)({props:e,muiFormControl:b,states:["color","required","focused","disabled","error","filled"]});return o.createElement(f,Object(a.a)({className:Object(i.a)(d.root,d["color".concat(Object(c.a)(v.color||"primary"))],u,v.disabled&&d.disabled,v.error&&d.error,v.filled&&d.filled,v.focused&&d.focused,v.required&&d.required),ref:r},p),t,v.required&&o.createElement("span",{"aria-hidden":!0,className:Object(i.a)(d.asterisk,v.error&&d.error)},"\u2009","*"))})),m=Object(d.a)((function(e){return{root:Object(a.a)({color:e.palette.text.secondary},e.typography.body1,{lineHeight:1,padding:0,"&$focused":{color:e.palette.primary.main},"&$disabled":{color:e.palette.text.disabled},"&$error":{color:e.palette.error.main}}),colorSecondary:{"&$focused":{color:e.palette.secondary.main}},focused:{},disabled:{},error:{},filled:{},required:{},asterisk:{"&$error":{color:e.palette.error.main}}}}),{name:"MuiFormLabel"})(u),f=o.forwardRef((function(e,r){var t=e.classes,d=e.className,c=e.disableAnimation,u=void 0!==c&&c,f=(e.margin,e.shrink),p=(e.variant,Object(n.a)(e,["classes","className","disableAnimation","margin","shrink","variant"])),b=Object(l.a)(),v=f;"undefined"===typeof v&&b&&(v=b.filled||b.focused||b.adornedStart);var h=Object(s.a)({props:e,muiFormControl:b,states:["margin","variant"]});return o.createElement(m,Object(a.a)({"data-shrink":v,className:Object(i.a)(t.root,d,b&&t.formControl,!u&&t.animated,v&&t.shrink,"dense"===h.margin&&t.marginDense,{filled:t.filled,outlined:t.outlined}[h.variant]),classes:{focused:t.focused,disabled:t.disabled,error:t.error,required:t.required,asterisk:t.asterisk},ref:r},p))}));r.a=Object(d.a)((function(e){return{root:{display:"block",transformOrigin:"top left"},focused:{},disabled:{},error:{},required:{},asterisk:{},formControl:{position:"absolute",left:0,top:0,transform:"translate(0, 24px) scale(1)"},marginDense:{transform:"translate(0, 21px) scale(1)"},shrink:{transform:"translate(0, 1.5px) scale(0.75)",transformOrigin:"top left"},animated:{transition:e.transitions.create(["color","transform"],{duration:e.transitions.duration.shorter,easing:e.transitions.easing.easeOut})},filled:{zIndex:1,pointerEvents:"none",transform:"translate(12px, 20px) scale(1)","&$marginDense":{transform:"translate(12px, 17px) scale(1)"},"&$shrink":{transform:"translate(12px, 10px) scale(0.75)","&$marginDense":{transform:"translate(12px, 7px) scale(0.75)"}}},outlined:{zIndex:1,pointerEvents:"none",transform:"translate(14px, 20px) scale(1)","&$marginDense":{transform:"translate(14px, 12px) scale(1)"},"&$shrink":{transform:"translate(14px, -6px) scale(0.75)"}}}}),{name:"MuiInputLabel"})(f)},927:function(e,r,t){"use strict";t.r(r);var a=t(10),n=t(0),o=t.n(n),i=t(7),s=t(105),l=t(130),d=t.n(l),c=t(530),u=t(527),m=t(93),f=t(748),p=t(919),b=t(747),v=t(531);function h(){var e=Object(a.a)(["\n  padding: ","px;\n  width: 100%;\n\n  "," {\n    padding: ","px;\n  }\n"]);return h=function(){return e},e}var g=Object(i.c)(c.a)(v.b),O=Object(i.c)(u.a)(h(),(function(e){return e.theme.spacing(6)}),(function(e){return e.theme.breakpoints.up("md")}),(function(e){return e.theme.spacing(10)}));r.default=function(){return o.a.createElement(O,null,o.a.createElement(d.a,{title:"Reset Password"}),o.a.createElement(m.a,{component:"h1",variant:"h4",align:"center",gutterBottom:!0},"Reset Password"),o.a.createElement(m.a,{component:"h2",variant:"body1",align:"center"},"Enter your email to reset your password"),o.a.createElement("form",null,o.a.createElement(f.a,{margin:"normal",required:!0,fullWidth:!0},o.a.createElement(p.a,{htmlFor:"email"},"Email Address"),o.a.createElement(b.a,{id:"email",name:"email",autoComplete:"email",autoFocus:!0})),o.a.createElement(g,{component:s.b,to:"/",fullWidth:!0,variant:"contained",color:"primary",mt:2},"Reset password")))}}}]);
//# sourceMappingURL=24.1cc31445.chunk.js.map