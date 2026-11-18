(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89189,t=>{"use strict";var i=t.i(43476),e=t.i(71645),n=t.i(46932),a=t.i(18566);let s=!0;function l({children:t}){var l,o;let r,d=(0,a.usePathname)(),[c,h]=(0,e.useState)({width:0,height:0}),[u,p]=(0,e.useState)(!1);return((0,e.useEffect)(()=>{if(h({width:window.innerWidth,height:window.innerHeight}),s)s=!1,p(!1);else{p(!0);let t=new Audio("/audios/transitionSound.mp3");t.volume=.4,t.play().catch(t=>console.log("Audio play postponed until user interaction:",t))}},[]),!u&&c.width>0)?(0,i.jsx)(i.Fragment,{children:t}):(0,i.jsxs)("div",{className:"relative min-h-screen",children:[(0,i.jsxs)("div",{style:{opacity:+(c.width>0)},className:"fixed inset-0 z-[10000] pointer-events-none",children:[(0,i.jsx)("svg",{className:"fixed inset-0 w-full h-full pointer-events-none z-[10000]",children:(0,i.jsx)(n.motion.path,{...(l=c.width,o=c.height,{initial:"initial",animate:"enter",exit:"exit",variants:{initial:{d:r=`
        M0 ${o}
        Q${l/2} ${o+200} ${l} ${o}
        L${l} ${o+200}
        L0 ${o+200}
        Z
    `},enter:{d:[r,`
        M0 0
        Q${l/2} 0 ${l} 0
        L${l} ${o}
        L0 ${o}
        Z
    `,`
        M0 -200
        Q${l/2} -400 ${l} -200
        L${l} -${o}
        L0 -${o}
        Z
    `],transition:{duration:2,times:[0,.5,1],ease:[.76,0,.24,1]}}}}),fill:"black"})}),(0,i.jsx)(n.motion.p,{variants:{initial:{opacity:0,y:20},enter:{opacity:[0,1,1,0],y:[20,0,0,-20],transition:{duration:1,times:[0,.2,.8,1],delay:.5,ease:"easeInOut"}}},initial:"initial",animate:"enter",className:"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl md:text-7xl font-sans font-bold z-[10001]",children:(t=>{if("/"===t)return"Home";let i=t.split("/").filter(Boolean);return(i[i.length-1]||"").split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")})(d)})]}),(0,i.jsx)(n.motion.div,{initial:{opacity:0,scale:.98},animate:{opacity:1,scale:1},transition:{duration:.5,delay:1.6},children:t})]})}function o({children:t}){return(0,i.jsx)(l,{children:t})}t.s(["default",()=>o],89189)}]);