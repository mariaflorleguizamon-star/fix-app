import { useState, useEffect, useRef } from "react";

const C={bg:"#EEEAF8",sf:"#fff",s2:"#F5F2FC",s3:"#EDE8F9",ink:"#16112C",mid:"#6A5A88",muted:"#B0A2CC",brd:"#DDD5F0",lav:"#8B7CE8",lav2:"#C9BFF5",lav3:"#5B4AC4",lav4:"#EDE7FF",lime:"#C8E03A",lime3:"#8FA820",limed:"#EFF9E0",peach:"#F5A57A",peachd:"#FEF0E8",peachk:"#B05820",sky:"#5BC8E8",skyd:"#E6F7FC",skyk:"#1878A0",mint:"#7AD4A0",mintd:"#E8F8EE",sund:"#FEF8E0",red:"#E8622A",redd:"#FDEEE8",green:"#3A8A58",greend:"#E8F5EE",amber:"#C48A10",amberd:"#FEF5DC"};

const css=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{display:none}

/* base motion */
@keyframes bob{0%,100%{transform:translateY(0) scale(1)}25%{transform:translateY(-7px) scale(1.015)}50%{transform:translateY(-11px) scale(1.025)}75%{transform:translateY(-4px) scale(1.01)}}
@keyframes bobS{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes pulse{0%,100%{transform:scale(1)}30%{transform:scale(1.04)}50%{transform:scale(1.07)}70%{transform:scale(1.03)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(91,74,196,.4)}50%{box-shadow:0 0 0 10px rgba(91,74,196,0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes slide{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes wink{0%,82%,100%{transform:scaleY(1)}87%{transform:scaleY(.5)}90%{transform:scaleY(.04)}93%{transform:scaleY(.6)}96%{transform:scaleY(.92)}}
@keyframes scanLn{0%{top:-2px;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes dotB{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}
@keyframes chatIn{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes floatBtn{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-4px) scale(1.04)}}
@keyframes ripple{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2.4);opacity:0}}

/* achievement / celebration */
@keyframes popIn{0%{opacity:0;transform:scale(.4) translateY(10px)}55%{opacity:1;transform:scale(1.08) translateY(-2px)}80%{transform:scale(.96)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes popOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.85) translateY(-8px)}}
@keyframes jump{0%,100%{transform:translateY(0) rotate(0deg)}20%{transform:translateY(-22px) rotate(-8deg)}40%{transform:translateY(-30px) rotate(6deg)}60%{transform:translateY(-14px) rotate(-4deg)}80%{transform:translateY(-4px) rotate(2deg)}}
@keyframes confettiFall{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(140px) rotate(540deg);opacity:0}}
@keyframes ringExpand{0%{transform:scale(.3);opacity:.9}100%{transform:scale(2.6);opacity:0}}
@keyframes streakFlame{0%,100%{transform:scale(1) rotate(-2deg)}50%{transform:scale(1.12) rotate(2deg)}}
@keyframes successBounce{0%{transform:scale(.3);opacity:0}50%{transform:scale(1.15);opacity:1}70%{transform:scale(.92)}100%{transform:scale(1);opacity:1}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
@keyframes glowPulse{0%,100%{filter:drop-shadow(0 0 0px rgba(200,224,58,0))}50%{filter:drop-shadow(0 0 18px rgba(200,224,58,.65))}}

/* panel transitions */
@keyframes panelIn{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes tabPop{0%{transform:scale(1)}40%{transform:scale(.9)}70%{transform:scale(1.06)}100%{transform:scale(1)}}

/* personaje SVG animado */
@keyframes pgBob{0%,100%{transform:translateY(0)}40%{transform:translateY(-14px)}70%{transform:translateY(-8px)}}
@keyframes pgWiggle{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-7deg) translateY(-4px)}50%{transform:rotate(7deg) translateY(-8px)}75%{transform:rotate(-4deg) translateY(-3px)}}
@keyframes pgThink{0%,100%{transform:translateY(0) rotate(0deg)}35%{transform:translateY(-6px) rotate(-5deg)}70%{transform:translateY(-3px) rotate(4deg)}}
@keyframes pgBounce{0%,100%{transform:translateY(0)}45%{transform:translateY(-22px)}}
@keyframes pgWink{0%,84%,100%{transform:scaleY(1)}90%{transform:scaleY(.05)}96%{transform:scaleY(.88)}}
@keyframes pgLook{0%,100%{transform:translate(0,0)}25%{transform:translate(3.5px,-1.5px)}55%{transform:translate(-3px,2px)}80%{transform:translate(2px,.5px)}}
@keyframes pgSpark{0%,100%{opacity:0;transform:scale(0)}40%,65%{opacity:1;transform:scale(1)}}
@keyframes pgShadowBob{0%,100%{transform:scaleX(1);opacity:.45}40%{transform:scaleX(.6);opacity:.15}70%{transform:scaleX(.78);opacity:.28}}
@keyframes pgShadowBounce{0%,100%{transform:scaleX(1);opacity:.45}45%{transform:scaleX(.5);opacity:.1}}
@keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes breatheSoft{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes thinking{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-3px) rotate(-3deg)}75%{transform:translateY(-1px) rotate(3deg)}}
@keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes barGrowV{from{transform:scaleY(0)}to{transform:scaleY(1)}}
/* eye reactions */
@keyframes lookAround{0%,100%{transform:translate(0,0)}20%{transform:translate(3px,-1px)}45%{transform:translate(-2px,1px)}70%{transform:translate(2px,2px)}}
@keyframes happySquint{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.55)}}
@keyframes excitedWiggle{0%,100%{transform:rotate(0deg) scale(1)}25%{transform:rotate(-3deg) scale(1.04)}50%{transform:rotate(0deg) scale(1.08)}75%{transform:rotate(3deg) scale(1.04)}}
@keyframes squashStretch{0%{transform:scale(1,1)}30%{transform:scale(1.18,.82)}55%{transform:scale(.9,1.12)}75%{transform:scale(1.05,.96)}100%{transform:scale(1,1)}}
`;

// ── LOGO FIXA REAL (SVG inline vectorial) ─────────────────────────────────────
// Logo original de Illustrator: fi + x especial (lavanda) + a + punto
// Logo original de Illustrator — paths reales
const LogoFixa = ({height=28, dark=false}) => (
  <svg height={height} viewBox="0 0 1300.12 571.38" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
    <defs><style>{`.lfx{fill:#5b4ac4}.lfi{fill:${dark?"#fff":C.ink}}`}</style></defs>
    {/* f */}
    <path className="lfi" d="M9.6,531.73V220.7C6-13.67,223.14,10.53,357.54,10.53v63.21c-105.37,6.12-269.19-36.51-282.08,148.73v37.32h146.19v65.76H75.46v206.17H9.6Z"/>
    {/* i */}
    <path className="lfi" d="M361.94,158.82v372.92h-65.87V158.82h65.87Z"/>
    {/* x — lavanda siempre */}
    <path className="lfx" d="M684.98,294.61c-14.74,41.72,3.1,83.87,37.58,101.22,28.83,14.53,52.04,14.79,81.2,36.65,9.84,7.36,16.98,16.48,23.23,28.01,12,22.21,14.74,49.18,5.78,73.43-2.94,7.96-6.87,15.18-12.52,20.86-15.65,15.73-36.48,20.14-56.45,13.79-16.35-5.19-29.9-15.71-41.72-30.05-12.43-15.11-22.29-31.99-31.21-50.35l-19.43-45.6c-9.65-22.58-25.74-41.96-46.89-48.52-38.84-12.05-71.41,4.7-95.38,41.18-11.26,17.13-17.49,36.47-26.93,55.09-54.68,107.76-117.9,44.49-110.6-25.33,3.4-32.58,17.94-60.3,58.83-88.76,23.15-16.11,57.14-26.62,82.87-34.81,21.83-6.92,37.81-21.16,34.99-49.4-6.19-61.97-66.61-67.1-82.7-69.55-22.57-3.43-47.2-12.54-61.91-33.5-17.52-24.96-19.58-62.32-2.66-88.22,10.93-16.74,28.52-24.91,46.23-25.91,27.24-1.54,52.55,12.37,68.45,38.09,15.26,24.67,19.21,58.23,42.35,84.7,23.18,26.51,58.03,34.97,88.05,21.47,12.03-5.43,21.21-15.56,28.78-27.24,5.51-8.48,9.34-17.55,13.49-27.02l18.54-42.3c6.82-15.54,16.61-26.63,28.1-36.87,17.49-15.55,38.46-23.01,60.39-20.1,23.05,3.06,41.14,21.2,46.8,47.71,9.19,42.97-10.2,75.9-43.45,93.05-10.41,5.36-21.04,7.85-32.05,11.28l-35.16,10.93c-27.48,11.48-55.25,34-66.58,66.1Z"/>
    {/* a */}
    <path className="lfi" d="M993.1,541.2c-33.56,0-61.42-5.67-83.6-17.02-22.19-11.35-38.69-26.47-49.51-45.38-10.83-18.91-16.23-39.43-16.23-61.59,0-41.05,15.69-72.66,47.08-94.82,31.38-22.15,74.13-33.23,128.24-33.23h108.77v-4.86c0-35.11-9.21-61.72-27.6-79.83-18.4-18.09-43.02-27.15-73.86-27.15-26.52,0-49.39,6.62-68.59,19.86-19.21,13.24-31.25,32.56-36.12,57.94h-69.8c2.7-29.17,12.58-53.75,29.63-73.75,17.04-19.98,38.28-35.25,63.72-45.79,25.43-10.54,52.48-15.8,81.17-15.8,56.27,0,98.62,14.99,127.03,44.98,28.41,29.99,42.61,69.83,42.61,119.54v247.17h-60.88l-4.06-72.13c-11.36,22.69-28,42.02-49.92,57.94-21.91,15.93-51.27,23.91-88.07,23.91ZM1003.66,483.66c25.97,0,48.3-6.75,66.96-20.26,18.67-13.5,32.87-31.06,42.61-52.68,9.74-21.6,14.61-44.29,14.61-68.08v-.81h-103.08c-40.05,0-68.32,6.89-84.82,20.67-16.51,13.78-24.76,30.94-24.76,51.46s7.71,37.96,23.13,50.65c15.42,12.7,37.2,19.05,65.34,19.05Z"/>
    {/* punto — mismo color que las letras, no lima */}
    <circle className="lfx" cx="1259.58" cy="497.27" r="39.9"/>
  </svg>
);

// ── PERSONAJE FIXA — SVG animado, fiel al logo, sin imágenes externas ──────────
// path basado en la morfología real de la X del logo (patas largas, bulbos, cintura estrecha)
const X_PATH = "M100 62 C93 62 78 46 62 36 C50 28 36 28 28 38 C20 48 24 62 34 70 C44 78 60 80 68 88 C76 96 74 112 66 120 C56 130 40 134 32 144 C24 154 26 168 36 174 C46 180 60 176 70 166 C80 156 88 140 100 138 C112 140 120 156 130 166 C140 176 154 180 164 174 C174 168 176 154 168 144 C160 134 144 130 134 120 C126 112 124 96 132 88 C140 80 156 78 166 70 C176 62 180 48 172 38 C164 28 150 28 138 36 C122 46 107 62 100 62Z";
const X_SPEC = "M100 62 C93 62 78 46 62 36 C50 28 36 28 28 38 C20 48 24 62 34 70 C44 78 60 80 68 88";

const PERS_COLORS = {
  lav:  {g0:"#B0A4FF", g1:"#6B5DD3", g2:"#4330A8", g3:"#140858", sh:"rgba(91,74,196,.6)"},
  lime: {g0:"#DCFF6A", g1:"#9BBF22", g2:"#6A8A10", g3:"#2C4000", sh:"rgba(143,168,32,.5)"},
  sky:  {g0:"#A8EEFF", g1:"#3A9AC8", g2:"#1E6A9A", g3:"#083050", sh:"rgba(58,154,200,.5)"},
  amb:  {g0:"#FFD47A", g1:"#D49820", g2:"#A06810", g3:"#4A2800", sh:"rgba(196,138,16,.55)"},
  grn:  {g0:"#8BF5B0", g1:"#3A9A58", g2:"#1E6A38", g3:"#083020", sh:"rgba(58,154,88,.5)"},
};

const Personaje = ({size=120, color="lav", mood="idle", style={}}) => {
  const eid = `pg_${color}_${Math.round(size)}`;
  const col = PERS_COLORS[color] || PERS_COLORS.lav;

  const bodyAnim = mood === "excited"
    ? {animationName:"pgWiggle", animationDuration:".8s", animationTimingFunction:"ease-in-out", animationIterationCount:"infinite", transformOrigin:"100px 150px"}
    : mood === "thinking"
    ? {animationName:"pgThink", animationDuration:"2.6s", animationTimingFunction:"ease-in-out", animationIterationCount:"infinite"}
    : mood === "bounce"
    ? {animationName:"pgBounce", animationDuration:"1s", animationTimingFunction:"ease-in-out", animationIterationCount:"infinite"}
    : mood === "eyes"
    ? {}
    : {animationName:"pgBob", animationDuration:"3.6s", animationTimingFunction:"ease-in-out", animationIterationCount:"infinite"};

  const eyeAnimL = mood === "excited"
    ? {}
    : mood === "thinking"
    ? {animationName:"pgLook", animationDuration:"2.6s", animationTimingFunction:"ease-in-out", animationIterationCount:"infinite", transformOrigin:"79px 97px"}
    : mood === "eyes"
    ? {animationName:"pgWink", animationDuration:"3.2s", animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationIterationCount:"infinite", transformOrigin:"79px 97px"}
    : {animationName:"pgWink", animationDuration:"4.6s", animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationIterationCount:"infinite", transformOrigin:"79px 97px"};
  const eyeAnimR = {...eyeAnimL, animationDelay:".2s", transformOrigin:"121px 97px"};
  const isExcited = mood === "excited";

  return (
    <div style={{display:"inline-block", ...style}}>
      <svg width={size} height={size} viewBox="0 0 200 200"
           xmlns="http://www.w3.org/2000/svg" style={bodyAnim} overflow="visible">
        <defs>
          <radialGradient id={`bg_${eid}`} cx="36%" cy="26%" r="62%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={col.g0}/>
            <stop offset="28%"  stopColor={col.g1}/>
            <stop offset="60%"  stopColor={col.g2}/>
            <stop offset="100%" stopColor={col.g3}/>
          </radialGradient>
          <radialGradient id={`sp_${eid}`} cx="31%" cy="19%" r="26%">
            <stop offset="0%"   stopColor="rgba(255,255,255,.75)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
          <radialGradient id={`sd_${eid}`} cx="50%" cy="96%" r="50%">
            <stop offset="0%"   stopColor="rgba(6,2,35,.7)"/>
            <stop offset="100%" stopColor="rgba(6,2,35,0)"/>
          </radialGradient>
          <filter id={`ef_${eid}`}>
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="rgba(0,0,0,.4)"/>
          </filter>
        </defs>
        <path d={X_PATH} fill={`url(#bg_${eid})`}/>
        <path d={X_SPEC} fill={`url(#sp_${eid})`} opacity=".78"/>
        <path d={X_PATH} fill={`url(#sd_${eid})`} opacity=".45"/>
        <g filter={`url(#ef_${eid})`} style={isExcited ? {} : eyeAnimL}>
          {isExcited
            ? <><ellipse cx="79" cy="97" rx="16" ry="11" fill="white"/>
                <ellipse cx="79" cy="97" rx="9" ry="6" fill="#08021E"/>
                <ellipse cx="75" cy="93" rx="3.5" ry="2.5" fill="white" opacity=".85"/></>
            : <><circle cx="79" cy="97" r="16" fill="white"/>
                <circle cx="79" cy="97" r="9" fill="#08021E"/>
                <circle cx="75" cy="93" r="4" fill="white" opacity=".85"/>
                <circle cx="83" cy="102" r="2" fill="white" opacity=".35"/></>
          }
        </g>
        <g filter={`url(#ef_${eid})`} style={isExcited ? {} : eyeAnimR}>
          {isExcited
            ? <><ellipse cx="121" cy="97" rx="16" ry="11" fill="white"/>
                <ellipse cx="121" cy="97" rx="9" ry="6" fill="#08021E"/>
                <ellipse cx="117" cy="93" rx="3.5" ry="2.5" fill="white" opacity=".85"/></>
            : <><circle cx="121" cy="97" r="16" fill="white"/>
                <circle cx="121" cy="97" r="9" fill="#08021E"/>
                <circle cx="117" cy="93" r="4" fill="white" opacity=".85"/>
                <circle cx="125" cy="102" r="2" fill="white" opacity=".35"/></>
          }
        </g>
        {mood==="thinking" && <>
          <circle cx="162" cy="36" r="5" fill="rgba(255,255,255,.7)" style={{animationName:"pgSpark",animationDuration:"1.4s",animationTimingFunction:"ease",animationIterationCount:"infinite"}}/>
          <circle cx="173" cy="22" r="3.5" fill="rgba(255,255,255,.5)" style={{animationName:"pgSpark",animationDuration:"1.4s",animationTimingFunction:"ease",animationIterationCount:"infinite",animationDelay:".38s"}}/>
          <circle cx="180" cy="11" r="2.5" fill="rgba(255,255,255,.35)" style={{animationName:"pgSpark",animationDuration:"1.4s",animationTimingFunction:"ease",animationIterationCount:"infinite",animationDelay:".76s"}}/>
        </>}
        {mood==="excited" && <>
          <circle cx="36" cy="34" r="4" fill={col.g0} style={{animationName:"pgSpark",animationDuration:"1s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
          <circle cx="164" cy="28" r="3" fill={col.g0} style={{animationName:"pgSpark",animationDuration:"1s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:".3s"}}/>
        </>}
      </svg>
      {mood !== "eyes" && <div style={{
        width: size * 0.55, height: 8,
        background: `radial-gradient(ellipse, ${col.sh} 0%, transparent 70%)`,
        borderRadius: "50%",
        margin: `${size * -0.06}px auto 0`,
        animationName: mood==="bounce" ? "pgShadowBounce" : "pgShadowBob",
        animationDuration: mood==="bounce" ? "1s" : mood==="excited" ? ".8s" : "3.6s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}/>}
    </div>
  );
};
// Char1 — blob viejo, se mantiene solo para compatibilidad interna
const CHAR_PATH="M264.85,530.01c-56.86-21.27-123.07,62.29-210.36,22.7-44.41-20.14-47.71-70.94-24.61-110.46l34.58-59.16c10.24-17.51,14.24-39.82,7.62-59.4-6.62-19.6-21.49-34.82-36.97-48.1C7.92,252.27-5.77,220.01,2.3,183.93c4.54-20.3,12.75-42.05,30.36-54.97,33.59-24.65,79.45-28.2,116.35-10.44l57.99,27.9c14.83,7.14,33.03,8.9,46.77-1.23,32.36-23.88,57-71.09,92.33-103.98C389.54.78,445.43-16.33,491.05,19.67c21.3,16.82,34.12,44.04,32.59,74.31-2.25,44.27-32.59,89.74,18.68,121.78,28,17.49,55.23,33.83,77.48,58.77,43.06,48.28,56.62,118.07,23.52,174.95-12.92,22.19-37.41,37.05-60.3,47.15-61.9,27.32-43.18,77.22-56.93,117.07-7.28,21.09-20.56,36.2-41.97,44.28-42.55,16.05-93.19,10.35-129.57-18.07-37.64-29.4-43.64-92.68-89.69-109.9Z";
const Char1 = ({size=80}) => <Personaje size={size} color="lav" mood="idle"/>;


let _tt;
function useToast(){
  const [t,setT]=useState({msg:"",on:false,kind:"info"});
  const show=(msg,kind="info")=>{setT({msg,on:true,kind});clearTimeout(_tt);_tt=setTimeout(()=>setT(x=>({...x,on:false})),3400);};
  return [t,show];
}

// ── ACHIEVEMENT CELEBRATION ──────────────────────────────────────────────────────
let _ach;
function useAchievement(){
  const [a,setA]=useState({on:false,msg:"",color:C.lav3});
  const fire=(msg,color=C.lav3)=>{
    setA({on:true,msg,color});
    clearTimeout(_ach);
    _ach=setTimeout(()=>setA(x=>({...x,on:false})),2600);
  };
  return [a,fire];
}

const CONFETTI_COLORS=[C.lav3,C.lime,C.peach,C.sky,C.mint,C.amber];
function Confetti(){
  const pieces=Array.from({length:14});
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      {pieces.map((_,i)=>{
        const left=8+Math.random()*84;
        const delay=Math.random()*0.25;
        const dur=0.9+Math.random()*0.5;
        const col=CONFETTI_COLORS[i%CONFETTI_COLORS.length];
        const isCircle=i%2===0;
        return <div key={i} style={{position:"absolute",left:left+"%",top:0,width:isCircle?6:5,height:isCircle?6:9,borderRadius:isCircle?"50%":2,background:col,animationName:"confettiFall",animationDuration:dur+"s",animationDelay:delay+"s",animationTimingFunction:"cubic-bezier(.4,0,.6,1)",animationFillMode:"forwards"}}/>;
      })}
    </div>
  );
}

function AchievementToast({a}){
  if(!a.on) return null;
  return(
    <div style={{position:"fixed",inset:0,zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",padding:30}}>
      <div style={{position:"relative",background:"linear-gradient(150deg,"+C.lav3+" 0%,"+C.lav+" 100%)",borderRadius:32,padding:"34px 30px 28px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:"0 24px 60px rgba(91,74,196,.45)",overflow:"visible",minWidth:220,maxWidth:280,animationName:"popIn",animationDuration:".55s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)",animationFillMode:"both"}}>
        <div style={{position:"absolute",inset:-8,borderRadius:36,border:"3px solid "+C.lime,animationName:"ringExpand",animationDuration:"1.1s",animationTimingFunction:"ease-out",animationFillMode:"forwards"}}/>
        <div style={{animationName:"jump",animationDuration:"0.9s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)",flexShrink:0,marginBottom:4}}>
          <Personaje size={100} color="lime" mood="bounce"/>
        </div>
        <div style={{fontSize:16,fontWeight:700,color:"#fff",textAlign:"center",lineHeight:1.3}}>{a.msg}</div>
        <Confetti/>
      </div>
    </div>
  );
}

const Btn=({children,v="lav",sm,full,onClick,sx={}})=>{
  const styles={
    lav:{bg:C.lav3,col:"#fff",bdr:"none",shadow:"0 4px 14px rgba(91,74,196,.35)"},
    lime:{bg:C.lime,col:C.ink,bdr:"none",shadow:"0 4px 14px rgba(200,224,58,.35)"},
    ghost:{bg:"rgba(255,255,255,.7)",col:C.ink,bdr:"1.5px solid "+C.brd,shadow:"none"}
  };
  const s=styles[v];
  const [pressed,setPressed]=useState(false);
  return <button
    onMouseDown={()=>setPressed(true)}
    onMouseUp={()=>setPressed(false)}
    onMouseLeave={()=>setPressed(false)}
    onClick={onClick}
    style={{background:s.bg,color:s.col,border:s.bdr,borderRadius:100,fontFamily:"DM Sans,sans-serif",
      padding:sm?"6px 14px":full?"14px 16px":"11px 22px",
      fontSize:sm?12:14,fontWeight:700,cursor:"pointer",
      width:full?"100%":undefined,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5,
      boxShadow:pressed?"none":s.shadow,
      transform:pressed?"scale(.95)":"scale(1)",
      transition:"all .15s cubic-bezier(.34,1.2,.64,1)",
      letterSpacing:"-0.01em",...sx}}>{children}</button>;
};
const Card=({children,sx={}})=><div style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:24,padding:20,boxShadow:"0 2px 12px rgba(91,74,196,.06)",...sx}}>{children}</div>;
const CT=({c})=><div style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted,marginBottom:14}}>{c}</div>;
const Tag=({c,bg,children})=><span style={{background:bg,color:c,fontSize:10,fontWeight:700,textTransform:"uppercase",padding:"3px 9px",borderRadius:100,marginRight:5,letterSpacing:"0.04em"}}>{children}</span>;
const Ins=({v="lav",lbl,children})=>{
  const s={lav:{bg:C.lav4,br:"rgba(139,124,232,.25)",lc:C.lav3},peach:{bg:C.peachd,br:"rgba(245,165,122,.3)",lc:C.peachk},mint:{bg:C.mintd,br:"rgba(122,212,160,.3)",lc:C.green},lime:{bg:C.limed,br:"rgba(143,168,32,.25)",lc:C.lime3},sky:{bg:C.skyd,br:"rgba(91,200,232,.3)",lc:C.skyk}}[v];
  return <div style={{background:s.bg,border:"1.5px solid "+s.br,borderRadius:20,padding:"14px 16px",fontSize:13,lineHeight:1.7}}>
    {lbl&&<div style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:s.lc,marginBottom:6}}>{lbl}</div>}
    <div style={{color:C.mid}}>{children}</div>
  </div>;
};
const Stat=({ic,val,lbl,sub,c})=>(
  <div style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:20,padding:"14px 13px",
    boxShadow:"0 2px 12px rgba(91,74,196,.06)",transition:"transform .25s cubic-bezier(.34,1.2,.64,1)"}}>
    <div style={{width:34,height:34,borderRadius:12,background:c+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,marginBottom:10}}>{ic}</div>
    <div style={{fontSize:30,fontWeight:800,color:c,letterSpacing:-1.5,lineHeight:1}}>{val}</div>
    <div style={{fontSize:11,color:C.mid,marginTop:3,fontWeight:500}}>{lbl}</div>
    {sub&&<div style={{fontSize:10,color:C.green,fontWeight:700,marginTop:4}}>{sub}</div>}
  </div>
);
const Dots=()=>(
  <div style={{display:"flex",gap:5}}>
    {[0,1,2].map(i=><span key={i} style={{width:7,height:7,borderRadius:"50%",background:C.lav3,display:"inline-block",animationName:"dotB",animationDuration:"0.9s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:(i*0.15)+"s"}}/>)}
  </div>
);
const Loading=({txt,color=C.lav3})=>{
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:"linear-gradient(135deg,#2D1F8F,#5B4AC4)",borderRadius:20,fontSize:13,color:"rgba(255,255,255,.8)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(100deg,transparent 30%,rgba(255,255,255,.08) 50%,transparent 70%)",backgroundSize:"200% 100%",animationName:"shimmer",animationDuration:"1.8s",animationTimingFunction:"linear",animationIterationCount:"infinite"}}/>
      <div style={{flexShrink:0,animationName:"thinking",animationDuration:"1.6s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",position:"relative",zIndex:1}}>
        <Personaje size={44} color="lav" mood="thinking"/>
      </div>
      <div style={{position:"relative",zIndex:1,fontWeight:600}}>{txt}</div>
    </div>
  );
};

// ── CHATBOT ───────────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "¿Qué publico hoy?",
  "¿Cómo mejorar mi engagement?",
  "Ideas para Reels esta semana",
  "¿Cómo analizar mi competencia?",
  "¿Qué hashtags usar en Palermo?",
  "Cómo consigo más leads?",
];

const RESPONSES = {
  "que publico": "Para hoy te recomiendo un Reel corto de 30 segundos mostrando un tip de compra. Tu audiencia responde mejor al contenido educativo que a mostrar propiedades directamente. El guión ya está listo en el panel Guión.",
  "engagement": "Tus posts con pregunta al final tienen 4x más engagement. También publicás demasiado los lunes — tus mejores días son martes y jueves entre 18 y 19hs. ¿Probás cambiar tu calendario?",
  "reels": "Esta semana hay 3 temas viralizando en tu zona: orientación de departamentos, precios por m² actualizados y tours de barrio. El de orientación tiene menos competencia y tu ya tenés el guión listo.",
  "competencia": "Tu competidor más fuerte es @propiedades.palermo con score 87. Su punto débil: nunca publica contenido educativo. Ahí está tu ventaja. ¿Te preparo un análisis completo?",
  "hashtags": "Para Palermo los hashtags con mejor alcance son: #palermo #departamentospalermo #comprardepto #viviendasbuenosaires #mercadoinmobiliario. Evita los muy genéricos como #inmobiliaria que tienen demasiada competencia.",
  "leads": "Tus últimos 3 leads vinieron del Instagram. El patrón: posts educativos con pregunta al final + respuesta rápida a los comentarios. El Autoresponder Pro puede automatizar eso y multiplicarlo.",
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (m.includes(key.split(" ")[0]) || m.includes(key.split(" ")[1] || "")) return val;
  }
  return "¡Buena pregunta! Para darte la mejor respuesta necesito saber un poco más del contexto. ¿Podés contarme más sobre lo que necesitás? También podés explorar los paneles de Ideas, Calendario o Competencia para inspirarte.";
}

function Chatbot({ud,onClose}){
  const [msgs,setMsgs]=useState([{role:"bot",text:"Hola "+ud.nombre.split(" ")[0]+"! Soy tu asistente de marketing. ¿En qué te puedo ayudar hoy?"}]);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const [showSug,setShowSug]=useState(true);
  const endRef=useRef(null);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,typing]);

  const send=(text)=>{
    const msg=text||input.trim();
    if(!msg)return;
    setInput("");
    setShowSug(false);
    setMsgs(m=>[...m,{role:"user",text:msg}]);
    setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      setMsgs(m=>[...m,{role:"bot",text:getResponse(msg)}]);
    },1200+Math.random()*800);
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",flexDirection:"column",background:"rgba(10,6,30,.7)",backdropFilter:"blur(8px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"82%",background:C.sf,borderRadius:"28px 28px 0 0",display:"flex",flexDirection:"column",overflow:"hidden",animation:"chatIn .35s cubic-bezier(.34,1.2,.64,1) both",border:"1px solid "+C.brd}}>
          {/* Header — fondo blanco, personaje lav quieto */}
          <div style={{padding:"16px 20px 12px",borderBottom:"1.5px solid "+C.brd,display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 8px rgba(91,74,196,.2)"}}>
              <Personaje size={36} color="lav" mood="eyes"/>
            </div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:700,color:C.ink,letterSpacing:-0.3}}>Asistente Fixa</div>
            <div style={{fontSize:11,color:C.green,display:"flex",alignItems:"center",gap:5,marginTop:2}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.green,animationName:"pulse",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
              Siempre disponible
            </div>
          </div>
          <div onClick={onClose} style={{width:32,height:32,borderRadius:"50%",background:C.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,color:C.mid,border:"1px solid "+C.brd}}>✕</div>
        </div>
        {/* Messages — fondo oscuro */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12,background:C.sf}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"chatIn .3s ease both"}}>
              {m.role==="bot"&&<div style={{width:28,height:28,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginRight:8,marginTop:4,boxShadow:"0 1px 6px rgba(0,0,0,.12)"}}>
                <Personaje size={24} color="lav" mood="eyes"/>
              </div>}
              <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?C.lav3:C.s2,color:m.role==="user"?"#fff":C.ink,fontSize:13,lineHeight:1.6}}>
                {m.text}
              </div>
            </div>
          ))}
          {typing&&(
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 1px 6px rgba(0,0,0,.12)"}}><Personaje size={24} color="lav" mood="eyes"/></div>
              <div style={{padding:"10px 14px",borderRadius:"18px 18px 18px 4px",background:C.s2,border:"none",display:"flex",gap:5,alignItems:"center"}}>
                <Dots/>
              </div>
            </div>
          )}
          {showSug&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:4}}>
              {SUGGESTIONS.map(s=>(
                <div key={s} onClick={()=>send(s)} style={{padding:"7px 13px",borderRadius:100,border:"1.5px solid "+C.brd,fontSize:12,color:C.mid,cursor:"pointer",background:C.sf}}>
                  {s}
                </div>
              ))}
            </div>
          )}
          <div ref={endRef}/>
        </div>
        {/* Input — fondo oscuro */}
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(139,124,232,.15)",display:"flex",gap:10,alignItems:"center",flexShrink:0,background:C.sf}}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter")send();}}
            placeholder="Preguntame cualquier cosa..."
            style={{flex:1,padding:"11px 16px",border:"1.5px solid "+C.brd,borderRadius:100,fontFamily:"DM Sans,sans-serif",fontSize:14,background:C.s2,color:C.ink,outline:"none"}}
          />
          <button onClick={()=>send()} style={{width:42,height:42,borderRadius:"50%",background:input.trim()?C.lav3:C.brd,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"background .2s"}}>

            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────────
const Onboarding=({onDone})=>{
  const [step,setStep]=useState(1);
  const [role,setRole]=useState(null);
  const [nom,setNom]=useState("");
  const [zona,setZona]=useState("");
  const [zonas,setZonas]=useState([]);
  const [zonaInput,setZonaInput]=useState("");
  const [ig,setIg]=useState("");
  const [empresa,setEmpresa]=useState("");
  const [puesto,setPuesto]=useState("");
  const [props,setProps]=useState([]);
  const [precio,setPrecios]=useState([]);
  const togglePrecio=(v)=>setPrecios(ps=>ps.includes(v)?ps.filter(x=>x!==v):[...ps,v]);
  const [goal,setGoal]=useState(null);
  const isManager=role==="inmobiliaria";

  const next=(n)=>{
    if(n===3&&!isManager&&(!nom.trim()||!zona.trim())){alert("Completá nombre y zona");return;}
    if(n===3&&isManager&&(!nom.trim()||!empresa.trim()||zonas.length===0)){alert("Completá nombre, empresa y al menos una zona");return;}
    setStep(n);
  };
  const addZona=()=>{
    const z=zonaInput.trim();
    if(!z) return;
    if(!zonas.includes(z)) setZonas(zs=>[...zs,z]);
    setZonaInput("");
  };
  const removeZona=(z)=>setZonas(zs=>zs.filter(x=>x!==z));
  const finish=(g)=>{
    setGoal(g);
    setTimeout(()=>onDone({nombre:(nom||"María García").trim(),zona:(zona||"Palermo").trim(),ig:(ig||"@usuario").trim(),role,goal:g,props,precio:precio.join(", "),avatar:null}),400);
  };
  const finishManager=()=>{
    setTimeout(()=>onDone({nombre:(nom||"María García").trim(),zona:(zonas[0]||"Palermo").trim(),zonas:zonas.length?zonas:["Palermo"],ig:(ig||"@usuario").trim(),role,empresa:empresa.trim()||"Mi inmobiliaria",puesto:puesto.trim()||"Manager",goal:"equipo",props:[],precio:"",avatar:null}),400);
  };
  const pOpts=["Departamentos","Casas","PHs","Locales","Oficinas","Terrenos","Emprendimientos","Alquileres"];
  const prOpts=[
    {v:"- USD 80k",    lbl:"Hasta USD 80k",   ic:"🏠", sub:"Entradas y usados"},
    {v:"USD 80-150k",  lbl:"USD 80 a 150k",   ic:"🏡", sub:"El grueso del mercado"},
    {v:"USD 150-300k", lbl:"USD 150 a 300k",  ic:"🏘️", sub:"Premium"},
    {v:"+ USD 300k",   lbl:"Más de USD 300k", ic:"🏛️", sub:"Lujo y PH"},
    {v:"Alquileres",   lbl:"Alquileres",       ic:"🔑", sub:"Gestión mensual"},
    {v:"Comercial",    lbl:"Comercial",        ic:"🏢", sub:"Locales y oficinas"},
  ];
  const totalSteps=isManager?2:4;

  const isD=window.innerWidth>=768;

  return(
    <div style={{minHeight:"100vh",overflowY:"auto",padding:isD?"40px 20px":"24px 20px",background:isD?"radial-gradient(ellipse at 40% 20%,#1E1248 0%,#0D0920 100%)":"transparent",fontFamily:"DM Sans,sans-serif",display:isD?"flex":undefined,alignItems:isD?"flex-start":undefined,justifyContent:isD?"center":undefined}}>
      <div style={{width:"100%",maxWidth:isD?560:420,margin:"0 auto",background:isD?"rgba(255,255,255,.97)":"transparent",borderRadius:isD?24:0,padding:isD?"40px 48px":"0",boxShadow:isD?"0 24px 80px rgba(0,0,0,.25)":undefined}}>
        <div style={{display:"flex",gap:5,marginBottom:28}}>
          {Array.from({length:totalSteps},(_,i)=>i+1).map(p=><div key={p} style={{height:4,borderRadius:4,background:p<step?C.lav3:p===step?C.lav:C.brd,flex:p===step?2:1,transition:"all .4s"}}/>)}
        </div>

        {step===1&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Personaje size={120} color="lav" mood="idle"/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>¿Cómo vas a usar Fixa?</div>
            <div style={{fontSize:14,color:C.mid,lineHeight:1.65,marginBottom:22}}>Esto define tu plan y tu experiencia desde el primer día.</div>
            {[{id:"agente",n:"Soy agente",d:"Voy a publicar mi propio contenido y gestionar mis leads",bg:C.lav4,ic:"🏠"},{id:"inmobiliaria",n:"Gestiono un equipo",d:"Quiero supervisar el contenido y rendimiento de mis agentes",bg:C.limed,ic:"🏢"}].map(o=>(
              <div key={o.id} onClick={()=>{setRole(o.id);setTimeout(()=>next(2),350)}} style={{background:role===o.id?C.lav4:C.sf,border:"2px solid "+(role===o.id?C.lav3:C.brd),borderRadius:18,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:13,marginBottom:10,transition:"all .28s"}}>
                <div style={{width:48,height:48,borderRadius:14,background:o.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{o.ic}</div>
                <div><div style={{fontSize:15,fontWeight:600,color:C.ink}}>{o.n}</div><div style={{fontSize:12,color:C.mid,lineHeight:1.4,marginTop:2}}>{o.d}</div></div>
              </div>
            ))}
          </div>
        )}

        {step===2&&!isManager&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Personaje size={100} color="lime" mood="bounce"/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>Tu zona y tu perfil</div>
            <div style={{fontSize:14,color:C.mid,lineHeight:1.65,marginBottom:20}}>Esto activa el análisis automático de tu competencia.</div>
            {[{val:nom,set:setNom,ph:"Tu nombre (ej: María García)"},{val:zona,set:setZona,ph:"Zona principal (ej: Palermo, CABA)",ic:"📍"},{val:ig,set:setIg,ph:"Tu @ de Instagram",ic:"📷"}].map((f,i)=>(
              <div key={i} style={{position:"relative",marginBottom:10}}>
                <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={{width:"100%",padding:"13px 40px 13px 16px",border:"2px solid "+C.brd,borderRadius:14,fontFamily:"DM Sans,sans-serif",fontSize:15,background:C.sf,color:C.ink,outline:"none"}}/>
                {f.ic&&<span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{f.ic}</span>}
              </div>
            ))}
            <Btn v="lav" full onClick={()=>next(3)} sx={{marginTop:6}}>Continuar</Btn>
            <div onClick={()=>next(1)} style={{marginTop:14,fontSize:13,color:C.muted,cursor:"pointer",textAlign:"center"}}>Volver</div>
          </div>
        )}

        {step===2&&isManager&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Personaje size={100} color="lime" mood="bounce"/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>Tu equipo y tus zonas</div>
            <div style={{fontSize:14,color:C.mid,lineHeight:1.65,marginBottom:20}}>Como manager podés supervisar varias zonas a la vez.</div>
            {[{val:nom,set:setNom,ph:"Tu nombre (ej: María García)"},{val:empresa,set:setEmpresa,ph:"Nombre de tu inmobiliaria",ic:"🏢"},{val:puesto,set:setPuesto,ph:"Tu puesto (ej: Directora comercial)",ic:"💼"}].map((f,i)=>(
              <div key={i} style={{position:"relative",marginBottom:10}}>
                <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={{width:"100%",padding:"13px 40px 13px 16px",border:"2px solid "+C.brd,borderRadius:14,fontFamily:"DM Sans,sans-serif",fontSize:15,background:C.sf,color:C.ink,outline:"none"}}/>
                {f.ic&&<span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{f.ic}</span>}
              </div>
            ))}
            <div style={{position:"relative",marginBottom:10}}>
              <input value={zonaInput} onChange={e=>setZonaInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addZona();}}} placeholder="Agregar zona (ej: Palermo, CABA)" style={{width:"100%",padding:"13px 70px 13px 16px",border:"2px solid "+C.brd,borderRadius:14,fontFamily:"DM Sans,sans-serif",fontSize:15,background:C.sf,color:C.ink,outline:"none"}}/>
              <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>📍</span>
              <button onClick={addZona} style={{position:"absolute",right:42,top:"50%",transform:"translateY(-50%)",width:26,height:26,borderRadius:"50%",border:"none",background:C.lav3,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
            {zonas.length>0&&(
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
                {zonas.map(z=>(
                  <div key={z} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px 6px 13px",borderRadius:100,background:C.lav4,color:C.lav3,fontSize:12,fontWeight:600}}>
                    {z}<span onClick={()=>removeZona(z)} style={{cursor:"pointer",fontSize:13,opacity:.7}}>✕</span>
                  </div>
                ))}
              </div>
            )}
            <Btn v="lav" full onClick={finishManager} sx={{marginTop:6}}>Continuar</Btn>
            <div onClick={()=>next(1)} style={{marginTop:14,fontSize:13,color:C.muted,cursor:"pointer",textAlign:"center"}}>Volver</div>
          </div>
        )}

        {step===3&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:10,display:"flex",justifyContent:"center"}}><Personaje size={100} color="lime" mood="bounce"/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>¿Qué propiedades manejás?</div>
            <div style={{fontSize:14,color:C.mid,marginBottom:18}}>Podés elegir varias.</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
              {pOpts.map(p=><div key={p} onClick={()=>setProps(ps=>ps.includes(p)?ps.filter(x=>x!==p):[...ps,p])} style={{padding:"7px 15px",borderRadius:100,border:"2px solid "+(props.includes(p)?C.lav3:C.brd),background:props.includes(p)?C.lav3:C.sf,color:props.includes(p)?"#fff":C.ink,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>{p}</div>)}
            </div>
            <div style={{fontSize:14,fontWeight:700,marginBottom:6,color:C.ink}}>Rango de precios que manejás</div>
            <div style={{fontSize:12,color:C.mid,marginBottom:14}}>Podés elegir varios — esto personaliza tus ideas y análisis de competencia.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
              {prOpts.map(p=>{
                const sel=precio.includes(p.v);
                return(
                  <div key={p.v} onClick={()=>togglePrecio(p.v)} style={{border:"2px solid "+(sel?C.lav3:C.brd),borderRadius:16,padding:"12px 14px",cursor:"pointer",background:sel?C.lav4:C.sf,transition:"all .2s",position:"relative"}}>
                    {sel&&<div style={{position:"absolute",top:8,right:10,width:18,height:18,borderRadius:"50%",background:C.lav3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",fontWeight:800}}>✓</div>}
                    <div style={{fontSize:20,marginBottom:5}}>{p.ic}</div>
                    <div style={{fontSize:13,fontWeight:700,color:sel?C.lav3:C.ink,lineHeight:1.2}}>{p.lbl}</div>
                    <div style={{fontSize:10,color:C.mid,marginTop:3}}>{p.sub}</div>
                  </div>
                );
              })}
            </div>
            <Btn v="lav" full onClick={()=>next(4)}>Continuar</Btn>
            <div onClick={()=>next(2)} style={{marginTop:14,fontSize:13,color:C.muted,cursor:"pointer",textAlign:"center"}}>Volver</div>
          </div>
        )}

        {step===4&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:10,display:"flex",justifyContent:"center"}}><Personaje size={100} color="lime" mood="bounce"/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>¿Cuál es tu objetivo?</div>
            <div style={{fontSize:14,color:C.mid,lineHeight:1.65,marginBottom:22}}>Solo uno. Con eso Fixa prioriza todo.</div>
            {[{id:"leads",ic:"🎯",n:"Conseguir más leads",d:"Quiero que lleguen más consultas por mis propiedades",bg:C.limed},{id:"marca",ic:"✨",n:"Construir mi marca personal",d:"Quiero ser reconocida como experta en mi zona",bg:C.lav4},{id:"consistencia",ic:"📅",n:"Publicar con consistencia",d:"Quiero un sistema que me diga que publicar cada día",bg:C.peachd}].map(o=>(
              <div key={o.id} onClick={()=>finish(o.id)} style={{background:goal===o.id?C.lav4:C.sf,border:"2px solid "+(goal===o.id?C.lav3:C.brd),borderRadius:18,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:13,marginBottom:10,transition:"all .28s"}}>
                <div style={{width:48,height:48,borderRadius:14,background:o.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{o.ic}</div>
                <div><div style={{fontSize:15,fontWeight:600,color:C.ink}}>{o.n}</div><div style={{fontSize:12,color:C.mid,lineHeight:1.4,marginTop:2}}>{o.d}</div></div>
              </div>
            ))}
            <div onClick={()=>next(3)} style={{marginTop:14,fontSize:13,color:C.muted,cursor:"pointer",textAlign:"center"}}>Volver</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── SCAN ──────────────────────────────────────────────────────────────────────────
const Scan=({zona,onDone})=>{
  const [prog,setProg]=useState(0);
  const [logs,setLogs]=useState([]);
  const [profiles,setProfiles]=useState([{h:"buscando...",s:"-",sc:"-",i:"?",done:false},{h:"buscando...",s:"-",sc:"-",i:"?",done:false},{h:"buscando...",s:"-",sc:"-",i:"?",done:false},{h:"buscando...",s:"-",sc:"-",i:"?",done:false}]);
  const [status,setStatus]=useState("Iniciando...");
  const comps=[{h:"@propiedades."+zona.toLowerCase().split(",")[0].replace(/ /g,""),s:"18.4k seg",sc:87,i:"PP"},{h:"@mariela.agente",s:"9.2k seg",sc:62,i:"MA"},{h:"@deptos.norte",s:"6.8k seg",sc:58,i:"DP"},{h:"@inmo24",s:"4.1k seg",sc:41,i:"IP"}];
  const logMsgs=["Buscando agentes en "+zona+"...","Accediendo a Meta Ads Library...","12 perfiles encontrados","Filtrando por actividad reciente...","Analizando engagement rate...","Detectando gaps de contenido...","Oportunidades identificadas"];
  const li=useRef(0);
  useEffect(()=>{
    let p=0;
    const iv=setInterval(()=>{
      p=Math.min(p+6,100);setProg(p);
      if(Math.random()>.4&&li.current<logMsgs.length){const idx=li.current++;setLogs(l=>[...l,{t:idx%2===0?"run":"ok",tx:logMsgs[idx]}]);}
      if(p===24)setProfiles(ps=>{const n=[...ps];n[0]={...comps[0],done:true};return n;});
      if(p===48)setProfiles(ps=>{const n=[...ps];n[1]={...comps[1],done:true};return n;});
      if(p===72)setProfiles(ps=>{const n=[...ps];n[2]={...comps[2],done:true};return n;});
      if(p===90)setProfiles(ps=>{const n=[...ps];n[3]={...comps[3],done:true};return n;});
      setStatus(p<30?"Buscando perfiles...":p<60?"Analizando engagement...":p<85?"Detectando oportunidades...":"Listo!");
      if(p>=100){clearInterval(iv);setTimeout(onDone,900);}
    },260);
    return()=>clearInterval(iv);
  },[]);
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"28px 20px",minHeight:"100vh",justifyContent:"center",gap:14,background:"radial-gradient(circle at 50% 20%,#2D1F8F 0%,#15102E 50%,#0D0920 100%)",fontFamily:"DM Sans,sans-serif"}}>
      <div style={{width:"100%",maxWidth:480,display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{animationName:"bob",animationDuration:"3s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}>
        <Personaje size={100} color="lav" mood="thinking"/>
      </div>
      <div style={{fontSize:22,fontWeight:700,letterSpacing:-1,color:"#fff"}}>Analizando {zona}...</div>
      <div style={{fontSize:13,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>Buscamos perfiles de Instagram que compiten con vos.</div>
      <div style={{width:"100%",background:C.ink,borderRadius:22,padding:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#C8E03A,transparent)",animationName:"scanLn",animationDuration:"2.4s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",top:0}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {profiles.map((p,i)=>(
            <div key={i} style={{background:p.done?"rgba(200,224,58,.1)":"rgba(255,255,255,.06)",borderRadius:14,padding:12,border:"1px solid "+(p.done?"rgba(200,224,58,.5)":"rgba(255,255,255,.08)"),position:"relative",overflow:"hidden",transition:"border-color .4s"}}>
              {!p.done&&<div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,transparent 40%,rgba(200,224,58,.15) 50%,transparent 60%)",backgroundSize:"200% 100%",animationName:"shimmer",animationDuration:"1.4s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>}
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:p.done?"rgba(200,224,58,.3)":"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:p.done?"#C8E03A":"rgba(255,255,255,.6)",flexShrink:0}}>{p.i}</div>
                <div><div style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,.75)",fontFamily:"monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:90}}>{p.h}</div><div style={{fontSize:9,color:"rgba(255,255,255,.35)"}}>{p.s}</div></div>
              </div>
              <div style={{fontSize:22,fontWeight:700,color:"#C8E03A",fontFamily:"monospace"}}>{p.sc}</div>
              <div style={{fontSize:8,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,.3)"}}>score</div>
              {p.done&&<div style={{position:"absolute",top:7,right:7,width:16,height:16,borderRadius:"50%",background:"#C8E03A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:C.ink}}>v</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{width:"100%",background:C.sf,border:"1.5px solid "+C.brd,borderRadius:14,padding:"12px 14px",fontFamily:"monospace",fontSize:11,color:C.mid,lineHeight:1.9,textAlign:"left",minHeight:80,maxHeight:80,overflow:"hidden"}}>
        {logs.map((l,i)=><div key={i} style={{display:"flex",gap:7}}><span style={{color:l.t==="ok"?C.lime3:C.lav3}}>{l.t==="ok"?"v":">"}</span><span>{l.tx}</span></div>)}
      </div>
      <div style={{width:"100%"}}>
        <div style={{fontSize:12,color:C.mid,marginBottom:6}}>{status}</div>
        <div style={{width:"100%",height:6,background:C.s3,borderRadius:6,overflow:"hidden"}}>
          <div style={{height:"100%",width:prog+"%",borderRadius:6,background:"linear-gradient(90deg,"+C.lav3+","+C.lav+")",transition:"width .5s cubic-bezier(.4,0,.2,1)"}}/>
        </div>
      </div>
      </div>
    </div>
  );
};

// ── PANELS (compactos) ────────────────────────────────────────────────────────────
function PanelDash({ud,toast,setPanel,streak,fireAch}){
  const [checks,setChecks]=useState({0:false,1:false,2:false});
  const labels=["Publicar el caption de hoy","Responder comentarios","Ver la competencia"];
  const allDone=checks[0]&&checks[1]&&checks[2];
  const toggle=(i)=>{
    const wasOff=!checks[i];
    setChecks(c=>{
      const next={...c,[i]:!c[i]};
      if(wasOff){
        const doneCount=Object.values(next).filter(Boolean).length;
        if(doneCount===3) fireAch("¡Día completo! Racha +1",C.lime3);
        else fireAch("¡Bien ahí!",C.lav3);
      }
      return next;
    });
  };
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14,animation:"panelIn .42s cubic-bezier(.4,0,.2,1) both"}}>

      {/* HERO — acción del día */}
      <div onClick={()=>setPanel("hoy")} style={{background:"linear-gradient(135deg,#1E1060 0%,#4332B0 55%,#7B6CE8 100%)",borderRadius:28,padding:"22px 22px 22px 24px",position:"relative",overflow:"hidden",cursor:"pointer",boxShadow:"0 10px 40px rgba(67,50,176,.45)"}}>
        {/* Personaje — esquina der arriba, bien dentro del card */}
        <div style={{position:"absolute",right:10,top:-8,zIndex:2,animationName:"pgBob",animationDuration:"3.6s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",pointerEvents:"none"}}>
          <Personaje size={118} color="lav" mood="idle"/>
        </div>
        {/* glow suave detrás */}
        <div style={{position:"absolute",width:140,height:140,borderRadius:"50%",background:"radial-gradient(circle,rgba(160,148,255,.35) 0%,transparent 70%)",right:10,top:-10,pointerEvents:"none"}}/>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",marginBottom:10,position:"relative",zIndex:3}}>Acción del día</div>
        <div style={{fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.18,marginBottom:8,position:"relative",zIndex:3,maxWidth:"54%",letterSpacing:-0.6}}>Tu caption de hoy está listo</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.6,marginBottom:18,position:"relative",zIndex:3,maxWidth:"56%"}}>2 minutos y ya está. {streak} días de racha.</div>
        <div style={{display:"flex",gap:8,position:"relative",zIndex:3}}>
          <button onClick={e=>{e.stopPropagation();setPanel("hoy");}} style={{background:C.lime,color:C.ink,border:"none",borderRadius:100,padding:"10px 18px",fontSize:13,fontWeight:800,cursor:"pointer",letterSpacing:"-0.02em",boxShadow:"0 4px 16px rgba(200,224,58,.45)"}}>Ver caption →</button>
          <button onClick={e=>{e.stopPropagation();setPanel("guión");}} style={{background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.85)",border:"1.5px solid rgba(255,255,255,.15)",borderRadius:100,padding:"10px 16px",fontSize:12,fontWeight:600,cursor:"pointer",backdropFilter:"blur(8px)"}}>Guión reel</button>
        </div>
      </div>

      {/* STATS — 4 bloques limpios sin personaje encima */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9}}>
        {[
          ["📈","4.8k",C.lav3,C.lav4,"Alcance","+12%"],
          ["🔥",streak,C.amber,C.sund,"Racha","récord"],
          ["💬","11",C.green,C.greend,"Leads","3 nuevos"],
          ["🏆","#2",C.peachk,C.peachd,"Ranking","top zona"],
        ].map(([ic,val,c,bg,lbl,sub])=>(
          <div key={lbl} style={{background:bg,borderRadius:18,padding:"12px 8px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{fontSize:15,marginBottom:5,display:"inline-block",animationName:lbl==="Racha"?"streakFlame":"none",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}>{ic}</div>
            <div style={{fontSize:24,fontWeight:800,color:c,letterSpacing:-1,lineHeight:1}}>{val}</div>
            <div style={{fontSize:9,color:c,fontWeight:700,marginTop:3,opacity:0.7,letterSpacing:"0.04em"}}>{lbl}</div>
            {sub&&<div style={{fontSize:8,fontWeight:700,marginTop:2,color:c,opacity:0.55}}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* EVOLUCIÓN — 3 cards de color una por métrica, estilo ABC app */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingLeft:2}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted}}>Evolución del mes</div>
          <div style={{fontSize:12,fontWeight:800,color:C.green}}>+34% vs mes pasado</div>
        </div>
        {[["Alcance",78,C.lav3,C.lav4],["Engagement",62,C.skyk,C.skyd],["Leads",45,C.green,C.greend]].map(([lbl,pct,c,bg])=>(
          <div key={lbl} style={{background:bg,borderRadius:20,padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:700,color:C.ink}}>{lbl}</div>
              <div style={{fontSize:26,fontWeight:800,color:c,letterSpacing:-1,lineHeight:1}}>{pct}%</div>
            </div>
            <div style={{height:8,background:"rgba(255,255,255,.5)",borderRadius:8,overflow:"hidden"}}>
              <div style={{height:"100%",width:pct+"%",background:c,borderRadius:8,transformOrigin:"left",animationName:"barGrow",animationDuration:"1.1s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/>
            </div>
          </div>
        ))}
      </div>

      {/* ALERTA COMPETENCIA — peach */}
      <div style={{background:C.peachd,borderRadius:22,padding:"15px 17px",border:"1.5px solid rgba(176,88,32,.2)"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.peachk,marginBottom:7}}>⚠️ Alerta de competencia</div>
        <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>
          <strong style={{color:C.peachk}}>@propiedades.palermo</strong> publicó 3 reels esta semana. Engagement +41%. <strong style={{color:C.ink}}>Momento de contestar.</strong>
        </div>
        <div style={{marginTop:12}}><Btn v="ghost" sm onClick={()=>setPanel("comp")} sx={{background:"rgba(255,255,255,.7)"}}>Ver competencia →</Btn></div>
      </div>

      {/* ZONA ACTIVA — pill */}
      <div style={{display:"flex",alignItems:"center",background:C.lav4,borderRadius:100,padding:"8px 16px",gap:8}}>
        <div style={{fontSize:13}}>📍</div>
        <div style={{fontSize:13,fontWeight:700,color:C.lav3,flex:1}}>{ud.zona} · Análisis activo</div>
        <Btn v="ghost" sm onClick={()=>setPanel("comp")} sx={{background:"rgba(255,255,255,.7)"}}>Ver</Btn>
      </div>

      {/* CHECKLIST — verde lima cuando completo, gris suave si no */}
      <div style={{background:allDone?C.limed:C.s2,borderRadius:24,padding:"16px 18px",transition:"background .4s"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",color:allDone?C.lime3:C.muted}}>{allDone?"¡Todo listo hoy!":"Checklist del día"}</div>
          {allDone&&<div style={{fontSize:20,animationName:"successBounce",animationDuration:".5s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)"}}>🎉</div>}
        </div>
        {[["Publicar el caption de hoy","📤",C.lav3,C.lav4],["Responder comentarios","💬",C.skyk,C.skyd],["Ver la competencia","🔍",C.peachk,C.peachd]].map(([l,ic,c,bg],i)=>{
          const d=checks[i];
          return <div key={l} onClick={()=>toggle(i)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 12px",borderRadius:16,cursor:"pointer",background:d?bg:"rgba(255,255,255,.5)",marginBottom:6,transition:"all .2s"}}>
            <div style={{width:32,height:32,borderRadius:10,background:d?c+"25":"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0,transition:"all .3s"}}>{d?"✓":ic}</div>
            <div style={{fontSize:13,fontWeight:600,color:d?C.muted:C.ink,textDecoration:d?"line-through":"none",transition:"color .3s",flex:1}}>{l}</div>
            {d&&<div style={{fontSize:10,fontWeight:700,color:c}}>✓</div>}
          </div>;
        })}
      </div>

      {/* UPSELL — lavanda */}
      <div onClick={()=>toast("Abriendo plan Pro...")} style={{background:"linear-gradient(135deg,"+C.lav3+","+C.lav+")",borderRadius:22,padding:"17px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",boxShadow:"0 6px 24px rgba(91,74,196,.3)"}}>
        <div style={{width:44,height:44,borderRadius:14,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>⚡</div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:2,letterSpacing:-0.3}}>Activa el Autoresponder</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.65)"}}>Convierte comentarios en leads · +USD 9/mes</div>
        </div>
        <div style={{fontSize:20,color:"rgba(255,255,255,.5)"}}>→</div>
      </div>
    </div>
  );
}

function PanelHoy({ud,toast,markPublished}){
  const [load,setLoad]=useState(false);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-1,color:C.ink,lineHeight:1}}>Publica ahora</div>
          <div style={{fontSize:13,color:C.mid,marginTop:3,fontWeight:500}}>Mejor horario: 18–19hs</div>
        </div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTimeout(()=>setLoad(false),2400);}}>↺ Regenerar</Btn>
      </div>
      {load?<Loading txt={"Generando caption para "+ud.zona+"..."} color={C.lav3}/>:<>
        {/* Caption card — lavanda fuerte con mucho aire */}
        <div style={{background:"linear-gradient(145deg,"+C.lav4+" 0%,#fff 100%)",border:"2px solid rgba(139,124,232,.3)",borderRadius:28,padding:22,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,74,196,.12) 0%,transparent 70%)"}}/>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.lav3,marginBottom:12}}>Caption listo para pegar</div>
          <div style={{fontSize:14,lineHeight:1.75,marginBottom:18,color:C.ink,position:"relative",zIndex:1}}>
            Cuando visitás un departamento, probablemente estás mirando las cosas equivocadas.<br/><br/>
            Orientación, presión del agua, los vecinos... esas son las cosas que no cambian con una mano de pintura.<br/><br/>
            ¿Qué cosa te sorprendió en una visita?<br/><br/>
            <span style={{color:C.mid}}>— {ud.nombre.split(" ")[0]}, agente en {ud.zona} hace 6 años</span>
          </div>
          <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
            <Btn v="lav" sm onClick={()=>{navigator.clipboard?.writeText(caption||"").catch(()=>{});toast("Caption copiado — publicalo ahora!");markPublished();}}>Copiar y publicar</Btn>
            <Btn v="ghost" sm onClick={()=>toast("Abriendo editor...")}>Editar diseño</Btn>
          </div>
        </div>

        {/* Hashtags — lime suave */}
        <div style={{background:C.limed,border:"1.5px solid rgba(143,168,32,.3)",borderRadius:24,padding:18}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.lime3,marginBottom:10}}>Hashtags</div>
          <div style={{fontSize:13,lineHeight:1.8,color:C.lime3,fontWeight:500,marginBottom:12}}>#palermo #departamentos #comprardepto #agentesinmobiliarios #consejosdecompra</div>
          <Btn v="ghost" sm onClick={()=>{navigator.clipboard?.writeText("#palermo #departamentospalermo #comprardepto #inmobiliaria #buenosaires").catch(()=>{});toast("Hashtags copiados ✓");}}>Copiar hashtags</Btn>
        </div>

        {/* Por qué funciona */}
        <Card>
          <CT c="Por qué funciona este caption"/>
          {[["1","Empieza con vos.","Hace que quien lo lea sienta que le hablan directamente. +40% de retención.",C.lav3],["2","Termina con pregunta.","Los comentarios suben el alcance 4x.",C.sky],["3","La firma construye identidad.","de a poco, sin esfuerzo extra.",C.mint]].map(([n,t,d,col])=>(
            <div key={n} style={{display:"flex",gap:12,alignItems:"start",marginBottom:14}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:col+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:col,flexShrink:0}}>{n}</div>
              <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}><strong style={{color:C.ink}}>{t}</strong> {d}</div>
            </div>
          ))}
        </Card>
      </>}
    </div>
  );
}

function PanelIdeas({ud,toast,setPanel}){
  const [load,setLoad]=useState(false);
  const [expandido,setExpandido]=useState(null);
  const [sugs,setSugs]=useState({});
  const [textos,setTextos]=useState({});

  const ideas=[
    {d:"03",m:"Jun",t:"El mito del dólar blue y el m²",tipo:"Post",ic:"Posicionarte como experta.",tags:[["Post",C.lav3,C.lav4],["Autoridad",C.green,C.greend]],bg:C.lav4,acento:C.lav3},
    {d:"06",m:"Jun",t:"3 cosas que mirás mal al visitar un depto",tipo:"Reel",ic:"Tips filmados en propiedad real.",tags:[["Reel","#B04020",C.redd],["Viral",C.amber,C.amberd]],bg:C.redd,acento:"#B04020"},
    {d:"08",m:"Jun",t:"¿Qué te frena a comprar?",tipo:"Story",ic:"Generá datos de tu audiencia.",tags:[["Story",C.skyk,C.skyd],["Interactivo",C.lime3,C.limed]],bg:C.skyd,acento:C.skyk},
    {d:"10",m:"Jun",t:"El proceso de compra en 6 pasos",tipo:"Carrusel",ic:"Alta conversión a consultas.",tags:[["Carrusel",C.amber,C.amberd],["Convierte",C.green,C.greend]],bg:C.amberd,acento:C.amber},
    {d:"13",m:"Jun",t:"Tour de la zona en 60 segundos",tipo:"Reel",ic:"Del barrio, no de la propiedad.",tags:[["Reel","#B04020",C.redd],["Marca",C.lav3,C.lav4]],bg:C.redd,acento:"#B04020"},
  ];

  const handleSugerir = (i) => {
    const sug = sugs[i]?.trim();
    if(!sug) return;
    toast("Regenerando con tu sugerencia...");
    setExpandido(null);
    setTimeout(()=>{
      setTextos(t=>({...t,[i]:sug}));
      setSugs(s=>({...s,[i]:""}));
      toast("Idea actualizada ✓");
    }, 1400);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-1,color:C.ink,lineHeight:1}}>Ideas del mes</div>
          <div style={{fontSize:13,color:C.mid,marginTop:3,fontWeight:500}}>Junio · Para {ud.zona}</div>
        </div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTextos({});setTimeout(()=>setLoad(false),2400);}}>✦ Generar</Btn>
      </div>
      <Ins v="lav" lbl="Tu ventaja detectada">Tus competidores publican casi solo propiedades. <strong style={{color:C.lav3}}>Ninguno hace contenido educativo.</strong> Ese espacio es tuyo.</Ins>
      {load?<Loading txt={"Generando ideas para "+ud.zona+"..."} color={C.red}/>:
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {ideas.map((idea,i)=>{
            const titulo = textos[i] || idea.t;
            const abierto = expandido === i;
            return(
              <div key={i} style={{background:idea.bg,border:"1.5px solid "+idea.acento+(abierto?"80":"40"),borderRadius:24,overflow:"hidden",boxShadow:"0 2px 12px "+idea.acento+"15",transition:"all .2s"}}>
                {/* Fila principal */}
                <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{flexShrink:0,textAlign:"center",minWidth:30}}>
                    <div style={{fontSize:20,fontWeight:800,color:idea.acento,letterSpacing:-1,lineHeight:1}}>{idea.d}</div>
                    <div style={{fontSize:9,color:idea.acento,fontWeight:600,opacity:0.7,textTransform:"uppercase",letterSpacing:"0.06em"}}>{idea.m}</div>
                  </div>
                  <div style={{width:2,height:40,borderRadius:2,background:idea.acento+"30",flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,marginBottom:4,lineHeight:1.3,color:C.ink}}>{titulo}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {idea.tags.map(([t,c,bg])=><Tag key={t} c={c} bg={bg}>{t}</Tag>)}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,flexShrink:0}}>
                    <button onClick={()=>setExpandido(abierto?null:i)} style={{background:"rgba(255,255,255,.6)",border:"1px solid rgba(0,0,0,.08)",borderRadius:100,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer",color:abierto?idea.acento:C.mid}}>
                      {abierto?"✕":"✎"}
                    </button>
                    <Btn v="ghost" sm onClick={()=>setPanel("hoy")} sx={{background:"rgba(255,255,255,.7)"}}>Usar</Btn>
                  </div>
                </div>

                {/* Panel de sugerencia expandido */}
                {abierto&&(
                  <div style={{borderTop:"1px solid "+idea.acento+"25",padding:"12px 16px",background:"rgba(255,255,255,.5)",animation:"fadeUp .2s ease both"}}>
                    <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:idea.acento,marginBottom:8}}>✦ Modificar con IA</div>
                    <textarea
                      value={sugs[i]||""}
                      onChange={e=>setSugs(s=>({...s,[i]:e.target.value}))}
                      placeholder={`Ej: "Que sea más sobre el mercado de ${ud.zona}" o escribí el título que querés vos`}
                      style={{width:"100%",minHeight:60,border:"1.5px solid "+idea.acento+"60",borderRadius:12,padding:"9px 12px",fontSize:12,lineHeight:1.5,color:C.ink,fontFamily:"DM Sans,sans-serif",resize:"none",outline:"none",background:"rgba(255,255,255,.8)",marginBottom:8}}
                    />
                    <div style={{display:"flex",gap:8}}>
                      <Btn v="lav" sm onClick={()=>handleSugerir(i)} sx={{flex:1}}>Regenerar con esto</Btn>
                      <button onClick={()=>{setTextos(t=>({...t,[i]:idea.t}));setExpandido(null);}} style={{background:"transparent",border:"1px solid "+C.brd,borderRadius:100,padding:"6px 12px",fontSize:11,color:C.mid,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Restaurar</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

function PanelCal({toast,published,fireAch}){
  const [days,setDays]=useState([
    {d:26,oth:true},{d:27,oth:true},{d:28,oth:true},{d:29,oth:true},{d:30,oth:true},{d:1},{d:2},
    {d:3,type:"Post",done:true,msg:"Post publicado: El mito del dólar blue"},
    {d:4},{d:5},
    {d:6,type:"Reel",done:true,msg:"Reel publicado: 3 cosas que mirás mal"},
    {d:7},{d:8,type:"Story",done:true,msg:"Story publicado: Encuesta"},{d:9},
    {d:10,type:"Carrusel",msg:"Carrusel: Proceso de compra"},{d:11},{d:12},
    {d:13,type:"Reel",today:true,pub:true,msg:"HOY · Reel: Tour de la zona"},
    {d:14},{d:15},{d:16},
    {d:17,type:"Post",msg:"Post: Barrio"},{d:18},{d:19},
    {d:20,type:"Reel",msg:"Reel: Mitos de la escritura"},{d:21},
    {d:22,type:"Story",msg:"Story: Encuesta de precio"},{d:23},
    {d:24,type:"Carrusel",msg:"Carrusel: Expensas"},{d:25},{d:26},
    {d:27,type:"Reel",msg:"Reel: Caso de éxito"},{d:28},{d:29},{d:30},
  ]);
  const [modalIdx,setModalIdx]=useState(null);
  const [draft,setDraft]=useState({type:"Post",topic:"",remind:true});
  const tc={Post:{bg:C.lav4,c:C.lav3},Reel:{bg:C.redd,c:"#B04020"},Story:{bg:C.skyd,c:C.skyk},Carrusel:{bg:C.amberd,c:C.amber}};
  const types=["Post","Reel","Story","Carrusel"];

  const openDay=(i)=>{
    const day=days[i];
    if(day.oth) return;
    if(day.type){ toast(day.msg); return; }
    setDraft({type:"Post",topic:"",remind:true});
    setModalIdx(i);
  };

  const savePlan=()=>{
    if(!draft.topic.trim()){ toast("Escribí un tema para tu contenido"); return; }
    setDays(ds=>ds.map((d,i)=>i===modalIdx?{...d,type:draft.type,msg:draft.type+": "+draft.topic,remind:draft.remind}:d));
    toast(draft.remind?"Planificado · te vamos a avisar antes":"Contenido planificado");
    fireAch&&fireAch("¡Día planificado!",C.lav3);
    setModalIdx(null);
  };

  const planned=days.filter(d=>d.type&&!d.done&&!d.today).length;
  const pubCount=days.filter(d=>d.done||(d.pub&&published)).length;
  const pend=days.filter(d=>d.type&&!d.done&&!(d.pub&&published)).length;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both",position:"relative"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-1,color:C.ink,lineHeight:1}}>Calendario</div>
          <div style={{fontSize:13,color:C.mid,marginTop:3,fontWeight:500}}>Junio · tocá un día para planificar</div>
        </div>
        <Btn v="lav" sm onClick={()=>toast("Plan generado!")}>✦ Generar</Btn>
      </div>
      {/* Stats editoriales grandes */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[[String(planned+pend),C.lav3,C.lav4,"Planif.","📅"],[String(pubCount),C.green,C.greend,"Public.","✅"],[String(pend),C.amber,C.amberd,"Pend.","⏳"],[String(days.filter(d=>!d.oth).length),C.mid,C.s3,"Días","📆"]].map(([v,c,bg,l,ic])=>(
          <div key={l} style={{background:bg,borderRadius:20,padding:"13px 10px",textAlign:"center"}}>
            <div style={{fontSize:10,marginBottom:4}}>{ic}</div>
            <div style={{fontSize:28,fontWeight:800,color:c,letterSpacing:-1.5,lineHeight:1}}>{v}</div>
            <div style={{fontSize:10,color:c,fontWeight:600,marginTop:4,opacity:0.7}}>{l}</div>
          </div>
        ))}
      </div>
      {/* Pills de tipo */}
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        {[["Post",C.lav3,C.lav4],["Reel","#B04020",C.redd],["Story",C.skyk,C.skyd],["Carrusel",C.amber,C.amberd],["✅ Publicado",C.lime3,C.limed]].map(([t,c,bg])=>(
          <span key={t} style={{background:bg,color:c,fontSize:10,fontWeight:700,padding:"4px 11px",borderRadius:100,letterSpacing:"0.04em"}}>{t}</span>
        ))}
      </div>
      {/* Calendario */}
      <Card sx={{padding:14}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:6}}>
          {["L","M","X","J","V","S","D"].map(d=><div key={d} style={{fontSize:9,fontWeight:700,color:C.muted,textAlign:"center",padding:"3px 0",letterSpacing:"0.08em"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
          {days.map((day,i)=>{
            const isPub=day.done||(day.pub&&published);
            const col=day.type?tc[day.type]:{bg:C.s2,c:C.mid};
            const todayExtra=day.today?{boxShadow:"0 0 0 2.5px "+C.lav3}:{};
            return(
              <div key={i} onClick={()=>openDay(i)}
                style={{minHeight:46,background:isPub?C.limed:day.type?col.bg:C.s2,borderRadius:12,padding:"4px 3px",cursor:day.oth?"default":"pointer",opacity:day.oth?.15:1,position:"relative",transition:"transform .12s",...todayExtra}}>
                <div style={{fontSize:10,fontWeight:800,color:day.today?C.lav3:isPub?C.lime3:day.type?col.c:C.muted,textAlign:"center",marginBottom:2}}>{day.d}</div>
                {day.type&&<div style={{fontSize:7,fontWeight:800,textTransform:"uppercase",textAlign:"center",color:isPub?C.lime3:col.c,letterSpacing:"0.04em",lineHeight:1.2}}>{isPub?"ok":day.type.slice(0,3)}</div>}
                {day.remind&&!isPub&&<div style={{position:"absolute",top:2,right:2,fontSize:6}}>🔔</div>}
              </div>
            );
          })}
        </div>
      </Card>
      <Ins v="lav" lbl="Tu patrón ganador">Publicás más los <strong style={{color:C.lav3}}>martes y jueves</strong>. Esos días tenés 2.1x más alcance.</Ins>

      {/* MODAL DE PLANIFICACION */}
      {modalIdx!==null&&(
        <div style={{position:"absolute",inset:0,background:"rgba(22,17,44,.55)",backdropFilter:"blur(3px)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeUp .25s ease both"}} onClick={()=>setModalIdx(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.sf,borderRadius:22,padding:20,width:"100%",maxWidth:320,animation:"popIn .35s cubic-bezier(.34,1.4,.64,1) both"}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>Planificar día {days[modalIdx]?.d}</div>
            <div style={{fontSize:15,fontWeight:700,color:C.ink,marginBottom:14}}>¿Qué vas a publicar?</div>
            <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
              {types.map(tp=>(
                <button key={tp} onClick={()=>setDraft(d=>({...d,type:tp}))} style={{padding:"6px 13px",borderRadius:100,border:"none",fontSize:12,fontWeight:600,cursor:"pointer",background:draft.type===tp?C.lav3:C.s2,color:draft.type===tp?"#fff":C.mid,transition:"all .2s"}}>{tp}</button>
              ))}
            </div>
            <input autoFocus value={draft.topic} onChange={e=>setDraft(d=>({...d,topic:e.target.value}))} placeholder="Tema del contenido..." style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:13,marginBottom:14,outline:"none",color:C.ink}}/>
            <div onClick={()=>setDraft(d=>({...d,remind:!d.remind}))} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 13px",background:draft.remind?C.lav4:C.s2,borderRadius:14,cursor:"pointer",marginBottom:16,transition:"background .2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{fontSize:16}}>🔔</div>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:C.ink}}>Recordatorio</div>
                  <div style={{fontSize:10,color:C.mid}}>Te avisamos 1 hora antes</div>
                </div>
              </div>
              <div style={{width:38,height:22,borderRadius:100,background:draft.remind?C.lav3:C.brd,position:"relative",transition:"background .25s"}}>
                <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:draft.remind?19:3,transition:"left .25s cubic-bezier(.34,1.4,.64,1)",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn v="ghost" full onClick={()=>setModalIdx(null)}>Cancelar</Btn>
              <Btn v="lav" full onClick={savePlan}>Planificar</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PanelComp({ud,toast,fireAch}){
  const [tab,setTab]=useState("perfiles");
  const [adsState,setAdsState]=useState({0:true,1:true,2:false});
  const toggleAd=(i)=>{
    setAdsState(s=>({...s,[i]:!s[i]}));
    toast(adsState[i]?"Marcado como referencia":"Marcado como activo en seguimiento");
  };
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-1,color:C.ink,lineHeight:1}}>Competencia</div>
          <div style={{fontSize:13,color:C.mid,marginTop:3,fontWeight:500}}>{ud.zona} · hace 3h</div>
        </div>
        <Btn v="lav" sm onClick={()=>{toast("Re-escaneando zona...");}}>Escanear</Btn>
      </div>
      {/* Tabs estilo ABC app — bloques de color */}
      <div style={{display:"flex",gap:8}}>
        {[["perfiles","👥 Perfiles",C.lav3,C.lav4],["ads","📢 Ads",C.skyk,C.skyd],["tend","📊 Tendencias",C.amber,C.amberd]].map(([id,lbl,c,bg])=>(
          <div key={id} onClick={()=>setTab(id)} style={{flex:1,textAlign:"center",padding:"10px 4px",borderRadius:16,fontSize:11,fontWeight:700,cursor:"pointer",background:tab===id?bg:"transparent",color:tab===id?c:C.mid,border:tab===id?"1.5px solid "+c+"60":"1.5px solid "+C.brd,transition:"all .2s cubic-bezier(.34,1.2,.64,1)",letterSpacing:"-0.01em"}}>{lbl}</div>
        ))}
      </div>
      {tab==="perfiles"&&<div style={{display:"flex",flexDirection:"column",gap:14,animation:"fadeUp .35s ease both"}}>
        {/* Competidor principal — card grande con color */}
        <div style={{background:C.redd,border:"1.5px solid rgba(232,98,42,.2)",borderRadius:28,overflow:"hidden"}}>
          <div style={{padding:"18px 18px 14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{width:52,height:52,borderRadius:16,background:"rgba(176,64,32,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,color:"#B04020",flexShrink:0}}>PP</div>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:800,color:C.ink,letterSpacing:-0.5}}>@propiedades.palermo</div>
                <div style={{fontSize:12,color:C.mid,marginTop:2}}>Palermo · Deptos premium</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:9,color:C.muted,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>Score</div>
                <div style={{fontSize:36,fontWeight:800,color:"#B04020",letterSpacing:-2,lineHeight:1,animationName:"successBounce",animationDuration:".5s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)"}}>87</div>
              </div>
            </div>
            <div style={{width:"100%",height:8,background:"rgba(176,64,32,.15)",borderRadius:8,overflow:"hidden"}}>
              <div style={{height:"100%",width:"87%",borderRadius:8,background:"linear-gradient(90deg,#B04020,#E8622A)",transformOrigin:"left",animationName:"barGrow",animationDuration:"1s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",background:"rgba(232,98,42,.1)",padding:"12px 18px"}}>
            {[["18.4k","Seguidores"],["4.2%","Engagement"],["14","Posts/mes"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:800,color:C.ink,letterSpacing:-0.5}}>{v}</div>
                <div style={{fontSize:10,color:C.mid,fontWeight:500}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"14px 18px"}}>
            <CT c="Posts más exitosos"/>
            {[["🎬","Reel: mirá cómo quedó este depto","hace 5 días","+8.2%"],["📸","Post: vista al parque Las Heras","hace 11 días","+5.7%"],["📊","Carrusel: precios m² Palermo","hace 18 días","+6.1%"]].map(([ic,t,d,e])=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid rgba(176,64,32,.1)"}}>
                <div style={{width:38,height:38,borderRadius:12,background:"rgba(176,64,32,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{ic}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.ink}}>{t}</div>
                  <div style={{fontSize:10,color:C.mid}}>{d}</div>
                </div>
                <div style={{fontSize:13,fontWeight:800,color:C.green}}>{e}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Oportunidad */}
        <div style={{background:"linear-gradient(135deg,"+C.limed+",#f8ffe8)",border:"1.5px solid rgba(143,168,32,.3)",borderRadius:24,padding:18}}>
          <div style={{fontSize:14,fontWeight:800,color:C.lime3,marginBottom:6,letterSpacing:-0.3}}>✦ Oportunidad detectada</div>
          <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>Ninguno de tus 4 competidores publica <strong style={{color:C.ink}}>contenido educativo</strong>. Ese formato genera 3x más consultas. <strong style={{color:C.ink}}>Es tu espacio libre.</strong></div>
        </div>
        {/* Otros perfiles — lista estilo ABC app */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[["MA","@mariela.agente","9.2k · 2.8%","62",C.skyd,C.skyk],["DP","@deptos.norte","6.8k · 3.1%","58",C.mintd,C.green],["IP","@inmo24","4.1k · 1.4%","41",C.peachd,C.peachk]].map(([av,h,s,sc,bg,col])=>(
            <div key={h} style={{display:"flex",alignItems:"center",gap:12,background:bg,borderRadius:20,padding:"13px 16px",border:"1.5px solid "+col+"30"}}>
              <div style={{width:44,height:44,borderRadius:14,background:col+"25",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:col,flexShrink:0}}>{av}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,letterSpacing:-0.3}}>{h}</div>
                <div style={{fontSize:12,color:C.mid,marginTop:2}}>{s}</div>
              </div>
              <div style={{fontSize:26,fontWeight:800,color:col,letterSpacing:-1}}>{sc}</div>
              <Btn v="ghost" sm onClick={()=>toast("Abriendo análisis...")} sx={{background:"rgba(255,255,255,.7)"}}>Ver</Btn>
            </div>
          ))}
        </div>
        <div onClick={()=>toast("Ingresá el @usuario de Instagram...")} style={{background:C.s2,border:"2px dashed "+C.brd,borderRadius:22,padding:20,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:28,marginBottom:6}}>+</div>
          <div style={{fontSize:13,fontWeight:600,color:C.mid}}>Agregar competidor manualmente</div>
        </div>
      </div>}
      {tab==="ads"&&<div style={{display:"flex",flexDirection:"column",gap:14,animation:"fadeUp .35s ease both"}}>
        <Ins v="sky" lbl="Meta Ads Library">Detectamos <strong style={{color:C.skyk}}>3 campañas activas</strong> de tu competencia esta semana.</Ins>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[{h:"@propiedades.palermo",t:"Video · Tráfico",c:"Palermo a precios de antes que suba el dólar.",m:"8 días activo",activo:true},{h:"@mariela.agente",t:"Imagen · Leads",c:"¿Buscás depto en Palermo? Te ayudo.",m:"14 días activo",activo:true},{h:"@deptos.norte",t:"Carrusel · Alcance",c:"Los 5 mejores departamentos en Palermo Norte",m:"Pausado",activo:false}].map((ad,i)=>(
            <div key={i} onClick={()=>toggleAd(i)} style={{background:adsState[i]?C.greend:C.s2,borderRadius:22,padding:"14px 16px",cursor:"pointer",border:"1.5px solid "+(adsState[i]?"rgba(58,138,88,.25)":C.brd),transition:"all .2s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink}}>{ad.h}</div>
                <span style={{background:adsState[i]?C.greend:C.amberd,color:adsState[i]?C.green:C.amber,fontSize:9,fontWeight:800,textTransform:"uppercase",padding:"3px 9px",borderRadius:100,border:"1px solid "+(adsState[i]?C.green+"40":C.amber+"40"),letterSpacing:"0.06em"}}>{adsState[i]?"Activo":"Pausado"}</span>
              </div>
              <div style={{fontSize:12,background:"rgba(255,255,255,.6)",borderRadius:12,padding:"9px 12px",fontStyle:"italic",color:C.ink,marginBottom:6}}>{ad.c}</div>
              <div style={{fontSize:10,color:C.muted,fontWeight:500}}>{ad.m}</div>
            </div>
          ))}
        </div>
      </div>}
      {tab==="tend"&&<div style={{display:"flex",flexDirection:"column",gap:14,animation:"fadeUp .35s ease both"}}>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[["🎬 Reels",48,"#B04020",C.redd],["📸 Posts",29,C.lav3,C.lav4],["📊 Carruseles",15,C.amber,C.amberd],["💬 Stories",8,C.skyk,C.skyd]].map(([l,p,c,bg])=>(
            <div key={l} style={{background:bg,borderRadius:22,padding:"14px 16px",border:"1.5px solid "+c+"30"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:14,fontWeight:700,color:C.ink}}>{l}</span>
                <span style={{fontSize:22,fontWeight:800,color:c,letterSpacing:-1}}>{p}%</span>
              </div>
              <div style={{height:8,background:"rgba(255,255,255,.5)",borderRadius:8,overflow:"hidden"}}>
                <div style={{height:"100%",width:p+"%",background:c,borderRadius:8,transformOrigin:"left",animationName:"barGrow",animationDuration:"1s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/>
              </div>
            </div>
          ))}
        </div>
        <Ins v="lime" lbl="Tu ventaja">El contenido educativo tiene el <strong style={{color:C.lime3}}>2do mayor engagement</strong> pero <strong style={{color:C.lime3}}>ningún competidor lo explota</strong>.</Ins>
      </div>}
    </div>
  );
}

function PanelReservas({toast,fireAch,ud,isManager,setPanel}){
  const stages=["Contacto","Visita","Reserva","Venta","Escritura"];
  const stageColor={Contacto:C.sky,Visita:C.lav3,Reserva:C.amber,Venta:C.lime3,Escritura:C.green};
  const [cols,setCols]=useState([
    {col:"Contacto",cards:[{id:"c1",n:"Lucas Fernández",p:"Depto 2 amb · Palermo",a:"Visita mañana",ac:C.sky,m:"USD 95k",ag:ud.nombre,origen:"Instagram"}]},
    {col:"Visita",cards:[{id:"c2",n:"María Torres",p:"Depto 3 amb · Belgrano",a:"Visita hoy 16hs",ac:C.lav3,m:"USD 175k",ag:ud.nombre,origen:"Instagram"}]},
    {col:"Reserva",cards:[{id:"c3",n:"Carlos Ruiz",p:"Depto 2 amb",a:"Seña entregada",ac:C.amber,m:"USD 110k",ag:ud.nombre,origen:"WhatsApp"}]},
    {col:"Venta",cards:[{id:"c4",n:"Depto Palermo Soho",p:"Boleto firmado",a:"Escritura pendiente",ac:C.lime3,m:"USD 125k",ag:ud.nombre,origen:"Recomendación"}]},
    {col:"Escritura",cards:[{id:"c5",n:"PH Villa Crespo",p:"Operación cerrada",a:"",ac:C.green,m:"USD 140k",closed:true,ag:ud.nombre,origen:"Zonaprop",comisionAgente:"2800",comisionInmo:"4200"}]},
  ]);
  const [modal,setModal]=useState(false);
  const [detail,setDetail]=useState(null);
  const [comAgente,setComAgente]=useState("");
  const [comInmo,setComInmo]=useState("");
  const [precioDraft,setPrecioDraft]=useState("");
  const [editPrecio,setEditPrecio]=useState(false);
  const teamAgents=["María Andreozzi","Juan Pérez","Laura Gómez","Rodrigo Silva","Carla Ortiz"];
  const origenes=["Instagram","WhatsApp","Recomendación","Zonaprop","Cartel/zona"];
  const blank={contacto:"",tipo:"Departamentos",ambientes:"",zona:"",precio:"",etapa:"Contacto",agente:ud.nombre,origen:"Instagram"};
  const [draft,setDraft]=useState(blank);
  const tipos=["Departamentos","Casas","PHs","Locales","Oficinas","Terrenos"];

  const openModal=()=>{setDraft(blank);setModal(true);};
  const openDetail=(card)=>{setDetail(card);setComAgente(card.comisionAgente||"");setComInmo(card.comisionInmo||"");setPrecioDraft(card.m.replace(/[^\d.]/g,""));setEditPrecio(false);};

  const saveOp=()=>{
    if(!draft.contacto.trim()||!draft.zona.trim()||!draft.precio.trim()){toast("Completá contacto, zona y precio");return;}
    const propTxt=draft.tipo+(draft.ambientes?" "+draft.ambientes+" amb":"")+" · "+draft.zona;
    const newCard={id:"op"+Date.now(),n:draft.contacto.trim(),p:propTxt,a:draft.etapa==="Escritura"?"":"Etapa: "+draft.etapa,ac:stageColor[draft.etapa],m:"USD "+draft.precio.replace(/[^\d.]/g,""),ag:draft.agente,closed:draft.etapa==="Escritura",isNew:true,origen:draft.origen};
    setCols(cs=>cs.map(c=>c.col===draft.etapa?{...c,cards:[newCard,...c.cards]}:c));
    setModal(false);
    toast("Operación cargada en "+draft.etapa);
    fireAch&&fireAch("¡Pipeline actualizado!",C.lav3);
  };

  const moveStage=(newStage)=>{
    setCols(cs=>{
      const card={...detail,a:newStage==="Escritura"?"":"Etapa: "+newStage,ac:stageColor[newStage],closed:newStage==="Escritura"};
      const withoutCard=cs.map(c=>({...c,cards:c.cards.filter(cd=>cd.id!==detail.id)}));
      return withoutCard.map(c=>c.col===newStage?{...c,cards:[card,...c.cards]}:c);
    });
    setDetail(d=>({...d,a:newStage==="Escritura"?"":"Etapa: "+newStage,ac:stageColor[newStage],closed:newStage==="Escritura"}));
    toast("Movido a "+newStage);
    if(newStage==="Escritura") fireAch&&fireAch("¡Operación cerrada!",C.green);
  };

  const saveComision=()=>{
    setCols(cs=>cs.map(c=>({...c,cards:c.cards.map(cd=>cd.id===detail.id?{...cd,comisionAgente:comAgente,comisionInmo:comInmo}:cd)})));
    toast("Comisión guardada");
    setDetail(null);
  };

  const savePrecio=()=>{
    if(!precioDraft.trim()){toast("Ingresá un precio válido");return;}
    const newM="USD "+precioDraft.replace(/[^\d.]/g,"");
    setCols(cs=>cs.map(c=>({...c,cards:c.cards.map(cd=>cd.id===detail.id?{...cd,m:newM}:cd)})));
    setDetail(d=>({...d,m:newM}));
    setEditPrecio(false);
    toast("Precio actualizado");
  };

  const allCards=cols.flatMap(c=>c.cards);
  const total=cols.reduce((a,c)=>a+c.cards.length,0);
  const cerradas=cols.find(c=>c.col==="Escritura")?.cards.length||0;
  const origenCounts=allCards.reduce((acc,c)=>{acc[c.origen]=(acc[c.origen]||0)+1;return acc;},{});
  const topOrigen=Object.entries(origenCounts).sort((a,b)=>b[1]-a[1])[0];
  const totalComisionInmo=cols.find(c=>c.col==="Escritura")?.cards.reduce((a,c)=>a+(parseInt(c.comisionInmo)||0),0)||0;
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both",position:"relative"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-1,color:C.ink,lineHeight:1}}>Reservas</div>
          <div style={{fontSize:13,color:C.mid,marginTop:3,fontWeight:500}}>Tu pipeline personal</div>
        </div>
        <Btn v="lav" sm onClick={openModal}>+ Nueva</Btn>
      </div>
      {isManager&&<div onClick={()=>setPanel("reservasEquipo")} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:C.lav4,border:"1.5px solid "+C.lav2,borderRadius:18,padding:"13px 16px",cursor:"pointer"}}>
        <div style={{fontSize:13,fontWeight:700,color:C.lav3}}>Ver el pipeline de todo el equipo →</div>
      </div>}
      {/* Stats editoriales */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        <div style={{background:C.lav4,borderRadius:20,padding:"13px 10px",textAlign:"center"}}>
          <div style={{fontSize:10,marginBottom:4}}>📋</div>
          <div style={{fontSize:28,fontWeight:800,color:C.lav3,letterSpacing:-1.5,lineHeight:1}}>{String(total-cerradas)}</div>
          <div style={{fontSize:10,color:C.lav3,fontWeight:600,marginTop:4,opacity:0.7}}>Activas</div>
        </div>
        <div style={{background:C.greend,borderRadius:20,padding:"13px 10px",textAlign:"center"}}>
          <div style={{fontSize:10,marginBottom:4}}>✅</div>
          <div style={{fontSize:28,fontWeight:800,color:C.green,letterSpacing:-1.5,lineHeight:1}}>{String(cerradas)}</div>
          <div style={{fontSize:10,color:C.green,fontWeight:600,marginTop:4,opacity:0.7}}>Cerradas</div>
        </div>
        <div style={{background:C.amberd,borderRadius:20,padding:"13px 10px",textAlign:"center"}}>
          <div style={{fontSize:10,marginBottom:4}}>💰</div>
          <div style={{fontSize:28,fontWeight:800,color:C.amber,letterSpacing:-1.5,lineHeight:1}}>480k</div>
          <div style={{fontSize:10,color:C.amber,fontWeight:600,marginTop:4,opacity:0.7}}>En proceso</div>
        </div>
        <div style={{background:C.s3,borderRadius:20,padding:"13px 10px",textAlign:"center"}}>
          <div style={{fontSize:10,marginBottom:4}}>🏆</div>
          <div style={{fontSize:totalComisionInmo?18:28,fontWeight:800,color:C.mid,letterSpacing:-1,lineHeight:1,marginTop:totalComisionInmo?4:0}}>{totalComisionInmo?"$"+totalComisionInmo:"—"}</div>
          <div style={{fontSize:10,color:C.mid,fontWeight:600,marginTop:4,opacity:0.7}}>Comisión</div>
        </div>
      </div>
      {/* Pipeline horizontal — cards con color por etapa */}
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
        {cols.map(({col,cards})=>{
          const stageColors={Contacto:{bg:C.skyd,accent:C.skyk,pill:C.sky},Visita:{bg:C.lav4,accent:C.lav3,pill:C.lav},Reserva:{bg:C.amberd,accent:C.amber,pill:C.amber},Venta:{bg:C.limed,accent:C.lime3,pill:C.lime},Escritura:{bg:C.greend,accent:C.green,pill:C.mint}};
          const sc=stageColors[col];
          return(
          <div key={col} style={{minWidth:150,flexShrink:0}}>
            <div style={{background:sc.bg,borderRadius:14,padding:"6px 10px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontSize:10,fontWeight:800,color:sc.accent,letterSpacing:"0.06em",textTransform:"uppercase"}}>{col}</div>
              <div style={{fontSize:12,fontWeight:800,color:sc.accent,background:"rgba(255,255,255,.5)",borderRadius:100,width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center"}}>{cards.length}</div>
            </div>
            {cards.map(card=>(
              <div key={card.id} onClick={()=>openDetail(card)} style={{background:card.closed?C.greend:sc.bg,border:"1.5px solid "+sc.accent+"40",borderRadius:18,padding:"13px 12px",marginBottom:8,cursor:"pointer",animation:card.isNew?"popIn .4s cubic-bezier(.34,1.4,.64,1) both":"none",boxShadow:"0 2px 10px "+sc.accent+"15"}}>
                <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:4,lineHeight:1.2}}>{card.n}</div>
                <div style={{fontSize:11,color:C.mid,marginBottom:6}}>{card.p}</div>
                {card.a&&<div style={{fontSize:10,color:sc.accent,fontWeight:600,marginBottom:6}}>{card.a}</div>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:13,fontWeight:800,color:sc.accent}}>{card.m}</div>
                  {card.origen&&<div style={{fontSize:9,color:sc.accent,background:"rgba(255,255,255,.6)",padding:"2px 7px",borderRadius:100,fontWeight:700}}>{card.origen}</div>}
                </div>
              </div>
            ))}
          </div>
          );
        })}
      </div>
      <Card>
        <CT c="Evolución mensual"/>
        <div style={{display:"flex",gap:5,alignItems:"flex-end",height:80,paddingTop:8}}>
          {[["Ene",40,C.lav3,0],["Feb",55,C.lav3,.05],["Mar",45,C.lav3,.1],["Abr",70,C.lav3,.15],["May",80,C.lav3,.2],["Jun",90,C.lime,.25]].map(([l,h,c,delay])=>(
            <div key={l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{width:"100%",height:80,display:"flex",alignItems:"flex-end"}}>
                <div style={{width:"100%",borderRadius:"5px 5px 0 0",background:c,height:h+"%",transformOrigin:"bottom",animationName:"barGrowV",animationDuration:".7s",animationDelay:delay+"s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/>
              </div>
              <div style={{fontSize:9,color:l==="Jun"?C.lime3:C.muted,fontWeight:l==="Jun"?700:400}}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      <Ins v="mint" lbl="De dónde vienen tus contactos">{topOrigen?<>La mayoría de tus contactos llegó por <strong style={{color:C.green}}>{topOrigen[0]}</strong>: {topOrigen[1]} de {allCards.length} operaciones. Se calcula con el origen que marcás al cargar cada una.</>:"Cargá el origen de cada contacto para ver de dónde te llegan más operaciones."}</Ins>

      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,15,45,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20,animation:"fadeUp .25s ease both"}} onClick={()=>setModal(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.sf,borderRadius:22,padding:22,width:"100%",maxWidth:360,maxHeight:"85vh",overflowY:"auto",animation:"popIn .3s cubic-bezier(.34,1.3,.64,1) both"}}>
            <div style={{fontSize:17,fontWeight:700,color:C.ink,marginBottom:4}}>Nueva operación</div>
            <div style={{fontSize:12,color:C.mid,marginBottom:16}}>Cargá los datos y elegí en qué etapa está.</div>

            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Contacto</div>
            <input value={draft.contacto} onChange={e=>setDraft(d=>({...d,contacto:e.target.value}))} placeholder="Nombre del contacto" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.ink,marginBottom:14}}/>

            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Tipo de propiedad</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {tipos.map(t=><div key={t} onClick={()=>setDraft(d=>({...d,tipo:t}))} style={{padding:"6px 12px",borderRadius:100,border:"2px solid "+(draft.tipo===t?C.lav3:C.brd),background:draft.tipo===t?C.lav3:C.sf,color:draft.tipo===t?"#fff":C.ink,fontSize:11,fontWeight:500,cursor:"pointer"}}>{t}</div>)}
            </div>

            <div style={{display:"flex",gap:10,marginBottom:14}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Ambientes</div>
                <input value={draft.ambientes} onChange={e=>setDraft(d=>({...d,ambientes:e.target.value}))} placeholder="ej: 3" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.ink}}/>
              </div>
              <div style={{flex:2}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Zona</div>
                <input value={draft.zona} onChange={e=>setDraft(d=>({...d,zona:e.target.value}))} placeholder="ej: Caballito" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.ink}}/>
              </div>
            </div>

            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Precio (USD)</div>
            <input value={draft.precio} onChange={e=>setDraft(d=>({...d,precio:e.target.value}))} placeholder="ej: 120000" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.ink,marginBottom:14}}/>

            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>¿De dónde vino este contacto?</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {origenes.map(o=><div key={o} onClick={()=>setDraft(d=>({...d,origen:o}))} style={{padding:"6px 12px",borderRadius:100,border:"2px solid "+(draft.origen===o?C.green:C.brd),background:draft.origen===o?C.green:C.sf,color:draft.origen===o?"#fff":C.ink,fontSize:11,fontWeight:500,cursor:"pointer"}}>{o}</div>)}
            </div>

            {isManager&&(
              <>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Agente responsable</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                  {[ud.nombre,...teamAgents.filter(a=>a!==ud.nombre)].map(a=>(
                    <div key={a} onClick={()=>setDraft(d=>({...d,agente:a}))} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px 6px 7px",borderRadius:100,border:"2px solid "+(draft.agente===a?C.lav3:C.brd),background:draft.agente===a?C.lav3:C.sf,color:draft.agente===a?"#fff":C.ink,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                      <div style={{width:18,height:18,borderRadius:"50%",background:draft.agente===a?"rgba(255,255,255,.25)":C.lav4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:draft.agente===a?"#fff":C.lav3}}>{a.split(" ").map(w=>w[0]).join("")}</div>
                      {a}{a===ud.nombre?" (vos)":""}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Etapa</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
              {stages.map(st=><div key={st} onClick={()=>setDraft(d=>({...d,etapa:st}))} style={{padding:"6px 12px",borderRadius:100,border:"2px solid "+(draft.etapa===st?stageColor[st]:C.brd),background:draft.etapa===st?stageColor[st]:C.sf,color:draft.etapa===st?"#fff":C.ink,fontSize:11,fontWeight:600,cursor:"pointer"}}>{st}</div>)}
            </div>

            <div style={{display:"flex",gap:8}}>
              <Btn v="ghost" full onClick={()=>setModal(false)}>Cancelar</Btn>
              <Btn v="lav" full onClick={saveOp}>Guardar</Btn>
            </div>
          </div>
        </div>
      )}

      {detail&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,15,45,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20,animation:"fadeUp .25s ease both"}} onClick={()=>setDetail(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.sf,borderRadius:22,padding:22,width:"100%",maxWidth:360,maxHeight:"85vh",overflowY:"auto",animation:"popIn .3s cubic-bezier(.34,1.3,.64,1) both"}}>
            <div style={{fontSize:17,fontWeight:700,color:C.ink,marginBottom:3}}>{detail.n}</div>
            <div style={{fontSize:12,color:C.mid,marginBottom:18}}>{detail.p} · {detail.ag}</div>

            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Etapa actual</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              {stages.map(st=><div key={st} onClick={()=>moveStage(st)} style={{padding:"7px 13px",borderRadius:100,border:"2px solid "+stageColor[st],background:cols.find(c=>c.cards.some(cd=>cd.id===detail.id))?.col===st?stageColor[st]:C.sf,color:cols.find(c=>c.cards.some(cd=>cd.id===detail.id))?.col===st?"#fff":stageColor[st],fontSize:11,fontWeight:600,cursor:"pointer"}}>{st}</div>)}
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted}}>Precio de la operación</div>
              {!editPrecio&&<div onClick={()=>setEditPrecio(true)} style={{fontSize:11,color:C.lav3,fontWeight:600,cursor:"pointer"}}>✎ Editar</div>}
            </div>
            {!editPrecio?(
              <div style={{fontSize:18,fontWeight:700,color:C.ink,marginBottom:18}}>{detail.m}</div>
            ):(
              <div style={{display:"flex",gap:8,marginBottom:18}}>
                <input value={precioDraft} onChange={e=>setPrecioDraft(e.target.value)} placeholder="ej: 120000" autoFocus style={{flex:1,padding:"11px 14px",border:"2px solid "+C.lav3,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.ink}}/>
                <Btn v="lav" sm onClick={savePrecio}>Guardar</Btn>
              </div>
            )}

            {cols.find(c=>c.cards.some(cd=>cd.id===detail.id))?.col==="Escritura"&&(
              isManager?(
                <>
                  <div style={{height:1,background:C.brd,marginBottom:18}}/>
                  <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:3}}>Comisión final</div>
                  <div style={{fontSize:11,color:C.mid,marginBottom:14}}>Solo vos como manager podés completar esto.</div>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Comisión del agente (USD)</div>
                  <input value={comAgente} onChange={e=>setComAgente(e.target.value)} placeholder="ej: 2800" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.ink,marginBottom:14}}/>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6}}>Comisión / ingreso de la inmobiliaria (USD)</div>
                  <input value={comInmo} onChange={e=>setComInmo(e.target.value)} placeholder="ej: 4200" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.ink,marginBottom:18}}/>
                  <Btn v="lav" full onClick={saveComision} sx={{marginBottom:8}}>Guardar comisión</Btn>
                </>
              ):(
                <>
                  <div style={{height:1,background:C.brd,marginBottom:18}}/>
                  <Ins v="lav" lbl="Comisión">{detail.comisionAgente?<>Tu comisión en esta operación: <strong style={{color:C.lav3}}>USD {detail.comisionAgente}</strong></>:"Tu manager todavía no cargó la comisión de esta operación."}</Ins>
                </>
              )
            )}

            <div style={{display:"flex",gap:8,marginTop:8}}>
              <Btn v="ghost" full onClick={()=>setDetail(null)}>Cerrar</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PanelReservasEquipo({toast,setPanel}){
  const stages=["Contacto","Visita","Reserva","Venta","Escritura"];
  const data=[
    {n:"Lucas Fernández",p:"Depto 2 amb · Palermo",ag:"María Andreozzi",st:"Contacto",m:"USD 95k"},
    {n:"Ana Gómez",p:"PH · Villa Crespo",ag:"Juan Pérez",st:"Contacto",m:"USD 140k"},
    {n:"María Torres",p:"Depto 3 amb · Belgrano",ag:"María Andreozzi",st:"Visita",m:"USD 175k"},
    {n:"Carlos Ruiz",p:"Depto 2 amb",ag:"Laura Gómez",st:"Reserva",m:"USD 110k"},
    {n:"Depto Palermo Soho",p:"Boleto firmado",ag:"María Andreozzi",st:"Venta",m:"USD 125k"},
    {n:"PH Villa Crespo",p:"Operación cerrada",ag:"Rodrigo Silva",st:"Escritura",m:"USD 140k"},
    {n:"Depto Belgrano R",p:"Operación cerrada",ag:"María Andreozzi",st:"Escritura",m:"USD 132k"},
    {n:"Local Caballito",p:"Operación cerrada",ag:"Juan Pérez",st:"Escritura",m:"USD 88k"},
  ];
  const stageColor={Contacto:C.sky,Visita:C.lav3,Reserva:C.amber,Venta:C.lime3,Escritura:C.green};
  const totalUSD=data.reduce((a,d)=>a+parseInt(d.m.replace(/[^\d]/g,"")),0);

  const agentInitials=a=>a.split(" ").map(w=>w[0]).join("");
  const allAgents=[...new Set(data.map(d=>d.ag))];
  const rankByOps=allAgents.map(ag=>({ag,count:data.filter(d=>d.ag===ag).length})).sort((a,b)=>b.count-a.count);
  const rankByEscrituras=allAgents.map(ag=>({ag,count:data.filter(d=>d.ag===ag&&d.st==="Escritura").length})).sort((a,b)=>b.count-a.count);
  const medalColor=["#D4A017","#9CA3AF","#B05820"];

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div onClick={()=>setPanel("reservas")} style={{cursor:"pointer",fontSize:18,color:C.mid}}>←</div>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Reservas del equipo</div><div style={{fontSize:12,color:C.mid}}>Todas las operaciones de tus agentes</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Stat ic="📋" val={String(data.length)} lbl="Operaciones totales" c={C.lav3}/>
        <Stat ic="💰" val={"USD "+(totalUSD/1000).toFixed(0)+"k"} lbl="Volumen en pipeline" c={C.amber}/>
      </div>

      <Card>
        <CT c="Ranking por agente"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:9}}>Por reservas</div>
            {rankByOps.map((r,i)=>(
              <div key={r.ag} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<rankByOps.length-1?"1px solid "+C.brd:"none"}}>
                <div style={{width:18,fontSize:11,fontWeight:700,color:i<3?medalColor[i]:C.muted,flexShrink:0}}>{i+1}°</div>
                <div style={{width:24,height:24,borderRadius:"50%",background:C.lav4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:C.lav3,flexShrink:0}}>{agentInitials(r.ag)}</div>
                <div style={{flex:1,minWidth:0,fontSize:11,fontWeight:600,color:C.ink,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.ag.split(" ")[0]}</div>
                <div style={{fontSize:13,fontWeight:700,color:C.lav3,flexShrink:0}}>{r.count}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:9}}>Por escrituras</div>
            {rankByEscrituras.map((r,i)=>(
              <div key={r.ag} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<rankByEscrituras.length-1?"1px solid "+C.brd:"none"}}>
                <div style={{width:18,fontSize:11,fontWeight:700,color:i<3&&r.count>0?medalColor[i]:C.muted,flexShrink:0}}>{i+1}°</div>
                <div style={{width:24,height:24,borderRadius:"50%",background:C.greend,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:C.green,flexShrink:0}}>{agentInitials(r.ag)}</div>
                <div style={{flex:1,minWidth:0,fontSize:11,fontWeight:600,color:C.ink,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.ag.split(" ")[0]}</div>
                <div style={{fontSize:13,fontWeight:700,color:C.green,flexShrink:0}}>{r.count}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card sx={{padding:0,overflow:"hidden"}}>
        {stages.map((st,si)=>{
          const items=data.filter(d=>d.st===st);
          if(!items.length) return null;
          return(
            <div key={st} style={{borderBottom:si<stages.length-1?"1.5px solid "+C.brd:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:C.s2}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:stageColor[st]}}/>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.mid}}>{st}</div>
                <div style={{fontSize:10,color:C.muted,marginLeft:"auto"}}>{items.length}</div>
              </div>
              {items.map(it=>(
                <div key={it.n} onClick={()=>toast(it.n+" · "+it.ag)} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:"1px solid "+C.brd,cursor:"pointer"}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:C.lav4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.lav3,flexShrink:0}}>{agentInitials(it.ag)}</div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:C.ink}}>{it.n}</div><div style={{fontSize:10,color:C.mid}}>{it.p} · {it.ag}</div></div>
                  <div style={{fontSize:12,fontWeight:700,color:C.mid,flexShrink:0}}>{it.m}</div>
                </div>
              ))}
            </div>
          );
        })}
      </Card>
      <Ins v="lav" lbl="Cómo funciona">Cada agente carga sus propias operaciones desde su panel de Reservas. Vos las ves todas acá automáticamente, agrupadas por etapa.</Ins>
    </div>
  );
}

function PanelGuion({ud,toast,fireAch}){
  const [load,setLoad]=useState(false);
  const nombre = ud.nombre.split(" ")[0];
  const zona = ud.zona;
  const segmentos = [
    {t:"00-03", tx:"Cuando visitás un departamento, probablemente estás mirando las cosas equivocadas.", n:"Mirá directo a cámara."},
    {t:"03-10", tx:"Primera: la orientación. Un depto orientado al este te va a tener fría la tarde de tu vida, siempre.", n:"Podés señalar una ventana."},
    {t:"10-18", tx:"Segunda: la presión del agua. Abrí el grifo de la cocina y del baño al mismo tiempo.", n:"Mostralo si podés."},
    {t:"18-25", tx:"Tercera: los vecinos. El pasillo, el portero, el ascensor. Eso no cambia con una mano de pintura.", n:""},
    {t:"25-30", tx:`Soy ${nombre}, agente en ${zona}. Si querés saber qué más mirar, escribime.`, n:"Pedí que escriban."},
  ];
  const [edits, setEdits] = useState(segmentos.map(s=>s.tx));
  const [editIdx, setEditIdx] = useState(null);
  const [sugerencia, setSugerencia] = useState("");
  const [showSug, setShowSug] = useState(null);

  const handleSugerir = (i) => {
    if(!sugerencia.trim()) return;
    toast("Sugerencia enviada — regenerando...");
    setShowSug(null);
    setSugerencia("");
    setTimeout(()=> {
      setEdits(e => {
        const n = [...e];
        n[i] = sugerencia.trim();
        return n;
      });
      toast("Segmento actualizado ✓");
    }, 1400);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Guión de reel</div>
          <div style={{fontSize:12,color:C.mid}}>30 segundos · listo para grabar</div>
        </div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setEdits(segmentos.map(s=>s.tx));setEditIdx(null);setShowSug(null);setTimeout(()=>setLoad(false),2400);}}>↺ Nuevo</Btn>
      </div>

      {load ? <Loading txt="Generando guión..." color={C.green}/> : <>
        <div style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:24,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:"1.5px solid "+C.brd,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted}}>3 cosas que miras mal al visitar un depto</div>
            <div style={{fontSize:9,fontWeight:700,color:C.lav3,letterSpacing:"0.05em"}}>30 SEG</div>
          </div>
          {segmentos.map((seg,i)=>(
            <div key={i} style={{borderBottom:i<segmentos.length-1?"1px solid "+C.brd:"none"}}>
              <div style={{display:"flex",gap:12,padding:"12px 16px",cursor:"pointer"}}
                   onClick={()=>setEditIdx(editIdx===i?null:i)}>
                <div style={{fontSize:10,fontWeight:700,color:C.lav3,width:40,flexShrink:0,fontFamily:"monospace",paddingTop:3,letterSpacing:"0.04em"}}>{seg.t}</div>
                <div style={{flex:1}}>
                  {editIdx===i ? (
                    <textarea
                      value={edits[i]}
                      onChange={e=>setEdits(ed=>{const n=[...ed];n[i]=e.target.value;return n;})}
                      onClick={e=>e.stopPropagation()}
                      style={{width:"100%",minHeight:72,border:"1.5px solid "+C.lav3,borderRadius:10,padding:"8px 10px",fontSize:13,lineHeight:1.55,color:C.ink,fontFamily:"DM Sans,sans-serif",resize:"vertical",outline:"none",background:C.lav4}}
                    />
                  ) : (
                    <div style={{fontSize:13,lineHeight:1.55,color:C.ink}}>{edits[i]}</div>
                  )}
                  {seg.n && <div style={{fontSize:11,color:C.mid,marginTop:3,fontStyle:"italic"}}>{seg.n}</div>}
                </div>
                <div style={{fontSize:14,color:editIdx===i?C.lav3:C.muted,flexShrink:0,paddingTop:2}}>{editIdx===i?"✓":"✎"}</div>
              </div>

              {/* Campo sugerir cambio */}
              {editIdx===i && (
                <div style={{padding:"0 16px 14px",animation:"fadeUp .25s ease both"}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:8}}>✦ Sugerir cambio con IA</div>
                  <div style={{display:"flex",gap:8}}>
                    <input
                      value={sugerencia}
                      onChange={e=>setSugerencia(e.target.value)}
                      placeholder={`Ej: "Que mencione la luminosidad"`}
                      style={{flex:1,padding:"9px 13px",border:"1.5px solid "+C.brd,borderRadius:100,fontSize:12,color:C.ink,fontFamily:"DM Sans,sans-serif",outline:"none",background:C.s2}}
                    />
                    <Btn v="lav" sm onClick={()=>handleSugerir(i)}>Generar</Btn>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Btn v="lav" full onClick={()=>{
          const txt = segmentos.map((s,i)=>`${s.t}  ${edits[i]}`).join("\n");
          navigator.clipboard?.writeText(txt).catch(()=>{});
          toast("Guión copiado ✓");
          fireAch&&fireAch("¡Guión listo para grabar!",C.green);
        }}>Copiar guión completo</Btn>
      </>}
    </div>
  );
}

function PanelEditor({toast}){
  const [sel,setSel]=useState(0);
  const [editing,setEditing]=useState(false);
  const [custom,setCustom]=useState({});
  const [logoUrl,setLogoUrl]=useState(null);
  const fileRef=useRef(null);

  const tpls=[
    {bg:"linear-gradient(135deg,#3D2FA8,#8B78E8)",lbl:"Propiedad",tag:"Popular",tagc:C.lav3,tagbg:C.lav4,fields:{eyebrow:"PALERMO · DEPTO",title:"65m² con vista al parque",price:"USD 125.000"},light:false},
    {bg:"#fff",lbl:"Educativo",tag:"Nuevo",tagc:C.lime3,tagbg:C.limed,fields:{eyebrow:"TIP DEL DÍA",title:"La orientación del depto vale tanto como los m²",price:""},light:true},
    {bg:"linear-gradient(135deg,#C8E03A,#8FA820)",lbl:"Mercado",tag:"Viral",tagc:C.amber,tagbg:C.amberd,fields:{eyebrow:"PRECIO M²",title:"USD 2.400",price:"Palermo · Jun 2025"},light:true},
    {bg:C.ink,lbl:"Caso éxito",tag:"Convierte",tagc:C.green,tagbg:C.greend,fields:{eyebrow:"🏆",title:"Vendido en 18 días",price:"Palermo"},light:false},
    {bg:"linear-gradient(135deg,#1A4A3A,#2D8A6A)",lbl:"Sustentable",tag:"Trend",tagc:C.green,tagbg:C.greend,fields:{eyebrow:"ECO LIVING",title:"Certificado verde · LEED",price:""},light:false},
    {bg:"linear-gradient(135deg,#8B3A6A,#C85A9A)",lbl:"Lifestyle",tag:"Stories",tagc:"#8B3A6A",tagbg:"#F8E6F2",fields:{eyebrow:"VIVIR EN",title:"Belgrano R",price:"El barrio que elige quien puede elegir"},light:false},
  ];

  const t=tpls[sel];
  const f=custom[sel]||t.fields;
  const setField=(k,v)=>setCustom(c=>({...c,[sel]:{...(c[sel]||t.fields),[k]:v}}));
  const txtCol = t.light ? C.ink : "#fff";
  const subCol = t.light ? "rgba(0,0,0,.55)" : "rgba(255,255,255,.55)";

  const handleLogo=(e)=>{
    const file=e.target.files?.[0];
    if(!file)return;
    const url=URL.createObjectURL(file);
    setLogoUrl(url);
    toast("Logo subido ✓");
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:14,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Editor de diseño</div>
          <div style={{fontSize:12,color:C.mid}}>Plantillas listas · editá y publicá</div>
        </div>
        <Btn v="ghost" sm onClick={()=>fileRef.current?.click()}>📎 Tu logo</Btn>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleLogo}/>
      </div>

      {/* Plantillas — scroll horizontal */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {tpls.map((tp,i)=>(
          <div key={i} onClick={()=>{setSel(i);setEditing(false);}} style={{border:"2px solid "+(sel===i?C.lav3:C.brd),borderRadius:14,overflow:"hidden",cursor:"pointer",boxShadow:sel===i?"0 0 0 3px rgba(91,74,196,.15)":"none",transition:"all .2s"}}>
            <div style={{background:tp.bg,aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4,padding:10,position:"relative"}}>
              {logoUrl&&<img src={logoUrl} alt="logo" style={{position:"absolute",top:6,right:6,height:14,objectFit:"contain",opacity:.7}}/>}
              <div style={{fontSize:7,fontWeight:700,color:tp.light?"rgba(0,0,0,.45)":"rgba(255,255,255,.5)",letterSpacing:"0.08em",textAlign:"center"}}>{tp.fields.eyebrow}</div>
              <div style={{fontSize:10,fontWeight:700,color:tp.light?C.ink:"#fff",textAlign:"center",lineHeight:1.25}}>{tp.fields.title}</div>
              {tp.fields.price&&<div style={{fontSize:9,color:tp.light?C.mid:C.lime,fontWeight:600,textAlign:"center"}}>{tp.fields.price}</div>}
              {sel===i&&<div style={{position:"absolute",top:4,left:4,width:16,height:16,borderRadius:"50%",background:C.lav3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff"}}>✓</div>}
            </div>
            <div style={{fontSize:9,fontWeight:700,padding:"5px 8px",background:C.sf,color:C.mid,textAlign:"center"}}>{tp.lbl}</div>
          </div>
        ))}
      </div>

      {/* Vista previa editable — el diseño real dentro de la app */}
      <div style={{background:C.sf,border:"2px solid "+C.lav3,borderRadius:20,overflow:"hidden",boxShadow:"0 4px 20px rgba(91,74,196,.12)"}}>
        <div style={{padding:"10px 14px",borderBottom:"1.5px solid "+C.brd,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.lav4}}>
          <div style={{fontSize:9,fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",color:C.lav3}}>Tu diseño · listo para publicar</div>
          <Btn v={editing?"lime":"lav"} sm onClick={()=>setEditing(e=>!e)}>{editing?"✓ Listo":"✎ Editar"}</Btn>
        </div>

        {/* Canvas del diseño */}
        <div style={{background:t.bg,padding:"32px 24px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12,minHeight:180,position:"relative"}}>
          {logoUrl&&<img src={logoUrl} alt="logo" style={{position:"absolute",top:10,right:12,height:20,objectFit:"contain",opacity:.85}}/>}
          {editing ? (
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8,animation:"fadeUp .25s ease both"}}>
              <input value={f.eyebrow} onChange={e=>setField("eyebrow",e.target.value)}
                placeholder="Subtítulo..."
                style={{width:"100%",background:"rgba(255,255,255,.2)",border:"1.5px dashed "+(t.light?"rgba(0,0,0,.3)":"rgba(255,255,255,.5)"),borderRadius:8,padding:"7px 10px",fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:txtCol,textAlign:"center",outline:"none",fontFamily:"DM Sans,sans-serif"}}/>
              <input value={f.title} onChange={e=>setField("title",e.target.value)}
                placeholder="Título principal..."
                style={{width:"100%",background:"rgba(255,255,255,.2)",border:"1.5px dashed "+(t.light?"rgba(0,0,0,.3)":"rgba(255,255,255,.5)"),borderRadius:8,padding:"10px",fontSize:15,fontWeight:700,color:txtCol,textAlign:"center",outline:"none",fontFamily:"DM Sans,sans-serif"}}/>
              <input value={f.price} onChange={e=>setField("price",e.target.value)}
                placeholder="Precio / subtexto..."
                style={{width:"100%",background:"rgba(255,255,255,.2)",border:"1.5px dashed "+(t.light?"rgba(0,0,0,.3)":"rgba(255,255,255,.5)"),borderRadius:8,padding:"7px 10px",fontSize:12,fontWeight:600,color:t.light?subCol:C.lime,textAlign:"center",outline:"none",fontFamily:"DM Sans,sans-serif"}}/>
            </div>
          ):(
            <>
              {f.eyebrow&&<div style={{fontSize:10,fontWeight:700,color:subCol,letterSpacing:"0.12em",textAlign:"center"}}>{f.eyebrow}</div>}
              <div style={{fontSize:18,fontWeight:800,color:txtCol,textAlign:"center",lineHeight:1.25,maxWidth:260,letterSpacing:-0.4}}>{f.title}</div>
              {f.price&&<div style={{fontSize:13,color:t.light?subCol:C.lime,fontWeight:600,textAlign:"center"}}>{f.price}</div>}
            </>
          )}
        </div>
      </div>

      <div style={{display:"flex",gap:8}}>
        <Btn v="lime" full onClick={()=>toast("Diseño guardado en tu galería ✓")}>Guardar</Btn>
        <Btn v="ghost" full onClick={()=>toast("Abriendo Canva con esta plantilla...")}>Abrir en Canva →</Btn>
      </div>

      <div style={{background:C.lav4,borderRadius:16,padding:"12px 14px",fontSize:12,color:C.mid,lineHeight:1.6}}>
        💡 <strong style={{color:C.lav3}}>Tip:</strong> El formato oscuro con acento lima tiene <strong style={{color:C.ink}}>2.3x más guardados</strong>. Tocá "Editar" para cambiar los textos directo acá.
      </div>
    </div>
  );
}

function PanelBot({ud,toast}){
  const [active,setActive]=useState(true);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Autoresponder <span style={{fontSize:11,background:C.lime,color:C.ink,padding:"2px 7px",borderRadius:6,verticalAlign:"middle"}}>PRO</span></div><div style={{fontSize:12,color:C.mid}}>Comentario to DM automático to Lead</div></div>
        <div onClick={()=>{setActive(a=>!a);toast(active?"Autoresponder pausado":"Autoresponder activado");}} style={{width:42,height:24,borderRadius:100,background:active?C.lav3:C.brd,position:"relative",cursor:"pointer",transition:"background .25s",flexShrink:0,marginTop:2}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:active?21:3,transition:"left .25s cubic-bezier(.34,1.4,.64,1)",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Stat ic="📩" val="22" lbl="DMs enviados" sub="esta semana" c={C.lav3}/>
        <Stat ic="💚" val="6" lbl="Abrieron WA" sub="27% conversión" c={C.green}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",opacity:active?1:.45,transition:"opacity .3s"}}>
        {[{b:C.lav2,ic:"📸",icb:C.lav4,lc:C.lav3,lt:"Disparador",t:"Alguien comenta tu post",d:"Cualquier comentario activa la automatización al instante."},{b:C.skyd,ic:"🤖",icb:C.skyd,lc:C.skyk,lt:"Fixa procesa",t:"Detecta y personaliza el DM",d:"En segundos prepara el mensaje con el nombre del usuario."},{b:C.limed,ic:"📩",icb:C.limed,lc:C.lime3,lt:"Acción automática",t:"DM con ficha + WhatsApp",d:"El interesado recibe la ficha y tu contacto directo."},{b:C.mintd,ic:"✅",icb:C.mintd,lc:C.green,lt:"Resultado",t:"Lead calificado en tu WhatsApp",d:"El interesado ya tiene toda la info."}].map((node,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:"100%",background:C.sf,border:"1.5px solid "+node.b,borderRadius:16,padding:"13px 15px",display:"flex",gap:10,alignItems:"start",animation:active?"fadeUp .5s ease "+(i*0.12)+"s both":"none"}}>
              <div style={{width:34,height:34,borderRadius:10,background:node.icb,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,animationName:active?"breatheSoft":"none",animationDuration:"2.4s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:(i*0.3)+"s"}}>{node.ic}</div>
              <div><div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:node.lc,marginBottom:2}}>{node.lt}</div><div style={{fontSize:13,fontWeight:600,color:C.ink}}>{node.t}</div><div style={{fontSize:11,color:C.mid,lineHeight:1.5,marginTop:3}}>{node.d}</div></div>
            </div>
            {i<3&&<div style={{width:2,height:22,background:"linear-gradient(180deg,"+C.brd+","+C.lav2+")"}}/>}
          </div>
        ))}
      </div>
      <Card>
        <CT c="Preview del DM automático"/>
        <div style={{background:"#128C7E",borderRadius:16,padding:15}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff"}}>{ud.nombre.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
            <div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{ud.nombre}</div><div style={{fontSize:10,color:"rgba(255,255,255,.6)"}}>Agente Inmobiliaria</div></div>
          </div>
          <div style={{background:"rgba(255,255,255,.15)",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#fff",lineHeight:1.55,marginBottom:8}}>¡Hola! Gracias por comentar. Te mando la info del depto:</div>
          <div style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:"11px 12px",display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:18}}>🏠</span>
            <div><div style={{fontWeight:600,fontSize:13,color:"#fff"}}>Depto 2 amb · {ud.zona} Soho</div><div style={{opacity:.7,fontSize:11,color:"#fff"}}>65m² · USD 125.000</div><div style={{color:C.lime,marginTop:4,fontSize:11}}>Ver ficha completa</div></div>
          </div>
          <div style={{background:"rgba(0,0,0,.2)",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#fff",textAlign:"center",fontWeight:600,cursor:"pointer"}}>Escribir por WhatsApp</div>
        </div>
      </Card>
      <Card>
        <CT c="Configuración activa"/>
        <div style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:active?C.green:C.muted,fontWeight:600,marginBottom:14}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:active?C.green:C.muted,animationName:active?"pulse":"none",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
          {active?"Conectado · "+ud.ig:"Pausado"}
        </div>
        <div style={{marginBottom:12}}><div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Link de la ficha</div><input placeholder="https://zonaprop.com/..." style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:13,background:C.sf,color:C.ink,outline:"none"}}/></div>
        <div style={{marginBottom:14}}><div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Número de WhatsApp</div><input placeholder="+54 9 11 xxxx xxxx" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:13,background:C.sf,color:C.ink,outline:"none"}}/></div>
        <Btn v="lime" full onClick={()=>toast("Automatización guardada y activa!")}>Guardar configuración</Btn>
      </Card>
    </div>
  );
}

function PanelBiblioteca({ud, toast}){
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroZona, setFiltroZona] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [guardados, setGuardados] = useState([]);
  const [vistaDetalle, setVistaDetalle] = useState(null);

  const ads = [
    {id:1, handle:"@propiedades.palermo", avatar:"PP", zona:"Palermo", tipo:"Video", objetivo:"Tráfico", dias:12, activo:true, copy:"¿Buscás en Palermo? Tenemos los mejores departamentos con financiación. Consultá ahora 👇", hook:"¿Buscás en Palermo?", cta:"Consultar", formato:"Reel 15seg", bg:C.redd, score:92, likes:"4.2k", comentarios:"89"},
    {id:2, handle:"@mariela.agente",      avatar:"MA", zona:"Belgrano", tipo:"Imagen",objetivo:"Leads",   dias:8,  activo:true, copy:"Departamento 3 ambientes en Belgrano R con cochera. USD 185.000. ¡Oportunidad única!", hook:"Cochera incluida", cta:"Ver más", formato:"Imagen estática", bg:C.lav4, score:78, likes:"1.8k", comentarios:"42"},
    {id:3, handle:"@deptos.norte",        avatar:"DN", zona:"Palermo", tipo:"Carrusel",objetivo:"Alcance",dias:21, activo:false,copy:"Los 5 mejores departamentos en Palermo Norte. Precios desde USD 90.000.", hook:"Top 5 deptos", cta:"Ver todos", formato:"Carrusel 5 slides", bg:C.amberd, score:65, likes:"3.1k", comentarios:"67"},
    {id:4, handle:"@inmo.palermo.hoy",    avatar:"IP", zona:"Palermo", tipo:"Video",   objetivo:"Tráfico", dias:4,  activo:true, copy:"Palermo a precios de antes que suba el dólar. Departamentos 2 y 3 ambientes disponibles.", hook:"Antes que suba el dólar", cta:"Consultar ahora", formato:"Reel 30seg", bg:C.skyd, score:88, likes:"6.7k", comentarios:"134"},
    {id:5, handle:"@belgrano.propiedades",avatar:"BP", zona:"Belgrano",tipo:"Imagen",  objetivo:"Leads",   dias:15, activo:true, copy:"Tu próximo hogar en Belgrano R. Amplio, luminoso, con terraza propia.", hook:"Terraza propia", cta:"Escribime", formato:"Imagen + copy largo", bg:C.greend, score:71, likes:"2.3k", comentarios:"55"},
    {id:6, handle:"@casas.nordelta",       avatar:"CN", zona:"GBA Norte",tipo:"Video", objetivo:"Alcance", dias:6,  activo:true, copy:"Casa con pileta en Nordelta desde USD 280.000. Financiación disponible.", hook:"Casa con pileta", cta:"Ver disponibles", formato:"Reel 20seg", bg:C.peachd, score:84, likes:"5.4k", comentarios:"98"},
  ];

  const tipos = ["todos","Video","Imagen","Carrusel"];
  const zonas = ["todos","Palermo","Belgrano","GBA Norte"];

  const filtrados = ads.filter(a=>{
    if(filtroTipo!=="todos" && a.tipo!==filtroTipo) return false;
    if(filtroZona!=="todos" && a.zona!==filtroZona) return false;
    if(busqueda && !a.copy.toLowerCase().includes(busqueda.toLowerCase()) && !a.handle.includes(busqueda)) return false;
    return true;
  });

  const toggleGuardar = (id) => {
    setGuardados(gs => gs.includes(id) ? gs.filter(x=>x!==id) : [...gs,id]);
  };

  if(vistaDetalle){
    const ad = ads.find(a=>a.id===vistaDetalle);
    return(
      <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .35s ease both"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setVistaDetalle(null)} style={{width:36,height:36,borderRadius:12,border:"1.5px solid "+C.brd,background:C.sf,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16}}>←</button>
          <div style={{fontSize:16,fontWeight:700,color:C.ink}}>{ad.handle}</div>
          <div style={{marginLeft:"auto",fontSize:9,fontWeight:800,padding:"4px 10px",borderRadius:100,background:ad.activo?C.greend:C.s2,color:ad.activo?C.green:C.muted}}>{ad.activo?"ACTIVO":"PAUSADO"}</div>
        </div>

        {/* Preview del anuncio */}
        <div style={{background:ad.bg,borderRadius:20,padding:"20px",border:"1.5px solid "+C.brd}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted,marginBottom:10}}>Vista previa del anuncio</div>
          <div style={{background:C.sf,borderRadius:14,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>
            <div style={{height:100,background:"linear-gradient(135deg,"+C.lav3+","+C.lav+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>
              {ad.tipo==="Video"?"🎬":ad.tipo==="Carrusel"?"🖼️":"📸"}
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:12,fontWeight:700,color:C.ink,marginBottom:4,lineHeight:1.4}}>{ad.copy}</div>
              <div style={{display:"inline-block",marginTop:8,background:C.lav3,color:"#fff",borderRadius:8,padding:"5px 14px",fontSize:11,fontWeight:700}}>{ad.cta}</div>
            </div>
          </div>
        </div>

        {/* Métricas */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[[ad.dias+"d","Activo",C.amber,C.sund],[ad.likes,"Likes",C.lav3,C.lav4],[ad.comentarios,"Coms.",C.green,C.greend]].map(([v,l,c,bg])=>(
            <div key={l} style={{background:bg,borderRadius:16,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:c,letterSpacing:-0.5}}>{v}</div>
              <div style={{fontSize:10,color:c,fontWeight:600,marginTop:2,opacity:.7}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Análisis IA */}
        <div style={{background:C.lav4,borderRadius:18,padding:"16px 18px"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.lav3,marginBottom:10}}>✦ Análisis de Fixa</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{fontSize:14}}>🎯</span>
              <div style={{fontSize:12,color:C.mid,lineHeight:1.55}}><strong style={{color:C.ink}}>Hook potente:</strong> "{ad.hook}" — genera curiosidad inmediata sin revelar el precio.</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{fontSize:14}}>⚠️</span>
              <div style={{fontSize:12,color:C.mid,lineHeight:1.55}}><strong style={{color:C.ink}}>Oportunidad:</strong> No usa videos cortos (&lt;15seg). Un Reel tuyo en el mismo formato los puede superar.</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{fontSize:14}}>💡</span>
              <div style={{fontSize:12,color:C.mid,lineHeight:1.55}}><strong style={{color:C.ink}}>Inspiración:</strong> El copy apela a urgencia ("{ad.hook}"). Podés usarlo para una propiedad tuya en {ud.zona}.</div>
            </div>
          </div>
        </div>

        <div style={{display:"flex",gap:8}}>
          <Btn v={guardados.includes(ad.id)?"lime":"ghost"} full onClick={()=>{toggleGuardar(ad.id);toast(guardados.includes(ad.id)?"Eliminado de guardados":"Guardado en tu biblioteca ✓");}}>
            {guardados.includes(ad.id)?"★ Guardado":"☆ Guardar"}
          </Btn>
          <Btn v="lav" full onClick={()=>toast("Generando versión adaptada para "+ud.zona+"...")}>Adaptar para mí →</Btn>
        </div>
      </div>
    );
  }

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .35s ease both"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-1,color:C.ink,lineHeight:1}}>Biblioteca de Ads</div>
          <div style={{fontSize:13,color:C.mid,marginTop:3}}>Meta Ads Library · Real estate {ud.zona}</div>
        </div>
        <div style={{fontSize:9,fontWeight:800,padding:"5px 10px",borderRadius:100,background:C.skyd,color:C.skyk,border:"1.5px solid "+C.skyk+"30"}}>LIVE</div>
      </div>

      {/* Búsqueda */}
      <div style={{display:"flex",alignItems:"center",gap:8,background:C.sf,borderRadius:100,padding:"10px 16px",border:"1.5px solid "+C.brd}}>
        <span style={{fontSize:14,opacity:.5}}>🔍</span>
        <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar por copy, cuenta, zona..." style={{flex:1,border:"none",background:"transparent",fontSize:13,color:C.ink,outline:"none",fontFamily:"DM Sans,sans-serif"}}/>
      </div>

      {/* Filtros */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <div style={{display:"flex",gap:7,overflowX:"auto"}}>
          {tipos.map(t=>(
            <div key={t} onClick={()=>setFiltroTipo(t)} style={{padding:"6px 14px",borderRadius:100,border:"1.5px solid "+(filtroTipo===t?C.lav3:C.brd),background:filtroTipo===t?C.lav3:"transparent",color:filtroTipo===t?"#fff":C.mid,fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
              {t==="todos"?"Todos los tipos":t}
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto"}}>
          {zonas.map(z=>(
            <div key={z} onClick={()=>setFiltroZona(z)} style={{padding:"6px 14px",borderRadius:100,border:"1.5px solid "+(filtroZona===z?C.skyk:C.brd),background:filtroZona===z?C.skyd:"transparent",color:filtroZona===z?C.skyk:C.mid,fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
              {z==="todos"?"📍 Todas las zonas":"📍 "+z}
            </div>
          ))}
        </div>
      </div>

      {/* Resumen */}
      <div style={{display:"flex",gap:10}}>
        {[[filtrados.filter(a=>a.activo).length+"","Activos ahora",C.green,C.greend],[filtrados.filter(a=>!a.activo).length+"","Pausados",C.muted,C.s2],[guardados.length+"","Guardados",C.lav3,C.lav4]].map(([v,l,c,bg])=>(
          <div key={l} style={{flex:1,background:bg,borderRadius:14,padding:"10px",textAlign:"center"}}>
            <div style={{fontSize:22,fontWeight:800,color:c,letterSpacing:-0.5}}>{v}</div>
            <div style={{fontSize:9,color:c,fontWeight:600,marginTop:2,opacity:.7}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Lista de ads */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtrados.length===0&&(
          <div style={{textAlign:"center",padding:"32px 0",color:C.muted,fontSize:13}}>
            Sin resultados para ese filtro.
          </div>
        )}
        {filtrados.map(ad=>(
          <div key={ad.id} style={{background:ad.bg,borderRadius:20,overflow:"hidden",border:"1.5px solid rgba(0,0,0,.05)"}}>
            {/* Header card */}
            <div style={{padding:"14px 16px 10px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:12,background:C.lav3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",flexShrink:0}}>{ad.avatar}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{ad.handle}</div>
                <div style={{fontSize:10,color:C.mid}}>📍 {ad.zona}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                <div style={{fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:100,background:ad.activo?"rgba(58,138,88,.15)":"rgba(180,180,180,.2)",color:ad.activo?C.green:C.muted}}>{ad.activo?"● ACTIVO":"PAUSADO"}</div>
                <div style={{fontSize:9,color:C.muted}}>{ad.dias}d activo</div>
              </div>
            </div>

            {/* Copy */}
            <div style={{padding:"0 16px 12px"}}>
              <div style={{fontSize:12,color:C.ink,lineHeight:1.55,marginBottom:8}}>{ad.copy}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                <Tag c={C.lav3} bg={C.lav4}>{ad.tipo}</Tag>
                <Tag c={C.skyk} bg={C.skyd}>{ad.objetivo}</Tag>
                <Tag c={C.amber} bg={C.amberd}>{ad.formato}</Tag>
              </div>
              {/* Score + acciones */}
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{flex:1,display:"flex",alignItems:"center",gap:6}}>
                  <div style={{height:6,flex:1,background:"rgba(255,255,255,.5)",borderRadius:6,overflow:"hidden"}}>
                    <div style={{height:"100%",width:ad.score+"%",background:ad.score>80?C.green:ad.score>60?C.amber:C.red,borderRadius:6}}/>
                  </div>
                  <div style={{fontSize:11,fontWeight:800,color:ad.score>80?C.green:ad.score>60?C.amber:C.red}}>{ad.score}</div>
                </div>
                <button onClick={()=>toggleGuardar(ad.id)} style={{background:"rgba(255,255,255,.7)",border:"none",borderRadius:100,padding:"6px 10px",fontSize:13,cursor:"pointer"}}>{guardados.includes(ad.id)?"★":"☆"}</button>
                <Btn v="ghost" sm onClick={()=>setVistaDetalle(ad.id)} sx={{background:"rgba(255,255,255,.7)"}}>Ver más</Btn>
                <Btn v="lav" sm onClick={()=>toast("Adaptando para "+ud.zona+"...")}>Adaptar →</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div style={{background:"linear-gradient(135deg,"+C.lav3+","+C.lav+")",borderRadius:18,padding:"16px 18px"}}>
        <div style={{fontSize:13,fontWeight:800,color:"#fff",marginBottom:4}}>✦ Insight de la semana</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.6}}>Los anuncios con <strong style={{color:C.lime}}>urgencia en el hook</strong> ("antes que...", "últimas unidades") tienen 2.4x más CTR en {ud.zona} esta semana.</div>
      </div>
    </div>
  );
}

function PanelAlertas({toast,setPanel}){
  const [alerts,setAlerts]=useState([
    {c:C.red,t:"@propiedades.palermo publicó 3 veces hoy",d:"Su engagement subió un 41% esta semana.",time:"hace 2h",fn:"comp"},
    {c:C.amber,t:"Los reels sobre orientación están viralizando",d:"3 publicaciones similares pasaron los 10k views.",time:"hace 5h",fn:"tend"},
    {c:C.lav3,t:"Hoy es tu mejor horario para publicar",d:"18 a 19hs · Caption listo.",time:"Ahora",fn:"hoy"},
    {c:C.green,t:"Tu última publicación superó el promedio",d:"El post del martes tuvo 4.8% de engagement.",time:"ayer",fn:null},
  ]);
  const dismiss=(i)=>setAlerts(a=>a.filter((_,idx)=>idx!==i));
  const handleClick=(a)=>{
    if(a.fn==="comp") setPanel("comp");
    else if(a.fn==="hoy") setPanel("hoy");
    else if(a.fn==="tend") toast("Abriendo tendencias...");
  };
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,marginBottom:4,color:C.ink}}>Alertas</div>
      {alerts.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:C.muted,fontSize:13}}>No tenés alertas nuevas por ahora.</div>}
      {alerts.map((a,i)=>(
        <div key={a.t} style={{display:"flex",gap:10,padding:14,background:C.sf,border:"1.5px solid "+C.brd,borderRadius:16,cursor:a.fn?"pointer":"default",animation:"fadeUp .35s ease "+(i*0.06)+"s both"}}>
          <div onClick={()=>handleClick(a)} style={{display:"flex",gap:12,flex:1}}>
            <div style={{width:9,height:9,borderRadius:"50%",background:a.c,flexShrink:0,marginTop:4}}/>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,marginBottom:3,color:C.ink}}>{a.t}</div><div style={{fontSize:11,color:C.mid,lineHeight:1.5}}>{a.d}</div></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
            <div style={{fontSize:10,color:C.muted}}>{a.time}</div>
            <div onClick={()=>dismiss(i)} style={{fontSize:13,color:C.muted,cursor:"pointer",padding:2}}>✕</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelEmpresa({toast}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Equipo</div><div style={{fontSize:12,color:C.mid}}>Dashboard inmobiliaria</div></div>
        <Btn v="lav" sm onClick={()=>toast("Exportando reporte...")}>Exportar</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Stat ic="👥" val="5" lbl="Agentes activos" c={C.lav3}/>
        <Stat ic="📸" val="12" lbl="Posts sem." sub="+3 vs anterior" c={C.green}/>
      </div>
      <Card>
        <CT c="Ranking agentes · Consistencia"/>
        {[["1","MA","María Andreozzi",92,C.limed,C.lime3],["2","JP","Juan Pérez",78,C.skyd,C.skyk],["3","LG","Laura Gómez",65,C.peachd,C.peachk],["4","RS","Rodrigo Silva",44,C.s2,C.mid],["5","CO","Carla Ortiz",31,C.s2,C.mid]].map(([n,av,name,val,bg,col],i)=>(
          <div key={name} onClick={()=>toast("Perfil de "+name)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid "+C.brd,cursor:"pointer"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.muted,width:18,textAlign:"center",flexShrink:0}}>{n}</div>
            <div style={{width:34,height:34,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:col,flexShrink:0}}>{av}</div>
            <div style={{flex:1,fontSize:13,fontWeight:600,color:C.ink}}>{name}</div>
            <div style={{width:80,height:6,background:C.s2,borderRadius:6,overflow:"hidden"}}><div style={{height:"100%",width:val+"%",background:C.lav3,borderRadius:6,transformOrigin:"left",animationName:"barGrow",animationDuration:".8s",animationDelay:(i*0.08)+"s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/></div>
            <div style={{fontSize:12,fontWeight:700,color:C.lav3,width:22,textAlign:"right"}}>{val}</div>
          </div>
        ))}
      </Card>
      <Ins v="peach" lbl="Atención"><strong style={{color:C.peachk}}>Rodrigo y Carla</strong> llevan 9 días sin publicar. Sus cuentas perdieron alcance orgánico.</Ins>
    </div>
  );
}

function PanelPerfil({ud,setUd,toast,onLogout,isManager}){
  const [edit,setEdit]=useState(false);
  const [draft,setDraft]=useState(ud);
  const [editNegocio,setEditNegocio]=useState(false);
  const [negocio,setNegocio]=useState({props:ud.props||[],precio:ud.precio||"",goal:ud.goal});
  const [notifs,setNotifs]=useState({alertas:true,reels:true,equipo:isManager});
  const [inviteEmail,setInviteEmail]=useState("");
  const fileRef=useRef(null);
  const initials=ud.nombre.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const pOpts=["Departamentos","Casas","PHs","Locales","Oficinas","Terrenos","Emprendimientos","Alquileres"];
  const prOpts=["- USD 80k","USD 80-150k","USD 150-300k","+ USD 300k"];
  const goalOpts=[{id:"leads",n:"Más leads",ic:"📩"},{id:"marca",n:"Marca personal",ic:"⭐"},{id:"competencia",n:"Vencer a la competencia",ic:"🏆"}];

  const save=()=>{
    setUd({...draft,nombre:draft.nombre.trim()||ud.nombre,zona:draft.zona.trim()||ud.zona,ig:draft.ig.trim()||ud.ig});
    setEdit(false);
    toast("Perfil actualizado");
  };
  const saveNegocio=()=>{
    setUd(u=>({...u,...negocio}));
    setEditNegocio(false);
    toast("Datos de tu negocio actualizados");
  };
  const onPhoto=(e)=>{
    const file=e.target.files&&e.target.files[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=()=>{setDraft(d=>({...d,avatar:reader.result}));setUd(u=>({...u,avatar:reader.result}));toast("Foto actualizada");};
    reader.readAsDataURL(file);
  };
  const sendInvite=()=>{
    if(!inviteEmail.trim()||!inviteEmail.includes("@")){toast("Ingresá un email válido");return;}
    toast("Invitación enviada a "+inviteEmail);
    setInviteEmail("");
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Tu perfil</div>

      <Card sx={{display:"flex",flexDirection:"column",alignItems:"center",padding:"26px 18px"}}>
        <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} style={{display:"none"}}/>
        <div onClick={()=>fileRef.current&&fileRef.current.click()} style={{width:72,height:72,borderRadius:"50%",background:ud.avatar?"transparent":"linear-gradient(135deg,"+C.lav3+","+C.lav+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"#fff",marginBottom:10,cursor:"pointer",position:"relative",overflow:"hidden",border:"2px solid "+C.brd}}>
          {ud.avatar?<img src={ud.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:initials}
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",opacity:0,transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>✎</div>
        </div>
        <div onClick={()=>fileRef.current&&fileRef.current.click()} style={{fontSize:11,color:C.lav3,fontWeight:600,cursor:"pointer",marginBottom:10}}>{ud.avatar?"Cambiar foto":"Agregar foto"}</div>
        {!edit?(
          <>
            <div style={{fontSize:16,fontWeight:700,color:C.ink}}>{ud.nombre}</div>
            <div style={{fontSize:12,color:C.mid,marginTop:2}}>📍 {ud.zona} · {ud.ig}</div>
            {isManager&&<div style={{marginTop:8,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.lav3,background:C.lav4,padding:"3px 10px",borderRadius:100}}>Manager</div>}
            <Btn v="ghost" sm sx={{marginTop:14}} onClick={()=>{setDraft(ud);setEdit(true);}}>✎ Editar datos</Btn>
          </>
        ):(
          <div style={{width:"100%",display:"flex",flexDirection:"column",gap:9,animation:"fadeUp .3s ease both"}}>
            {[{k:"nombre",ph:"Nombre"},{k:"zona",ph:"Zona"},{k:"ig",ph:"Instagram"}].map(f=>(
              <input key={f.k} value={draft[f.k]} placeholder={f.ph} onChange={e=>setDraft(d=>({...d,[f.k]:e.target.value}))} style={{width:"100%",padding:"10px 13px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:13,outline:"none",color:C.ink,textAlign:"center"}}/>
            ))}
            <div style={{display:"flex",gap:8,marginTop:4}}>
              <Btn v="ghost" full onClick={()=>setEdit(false)}>Cancelar</Btn>
              <Btn v="lav" full onClick={save}>Guardar</Btn>
            </div>
          </div>
        )}
      </Card>

      {!isManager&&(
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:editNegocio?14:4}}>
            <CT c="Tu negocio"/>
            {!editNegocio&&<Btn v="ghost" sm onClick={()=>{setNegocio({props:ud.props||[],precio:ud.precio||"",goal:ud.goal});setEditNegocio(true);}}>✎ Editar</Btn>}
          </div>
          {!editNegocio?(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div>
                <div style={{fontSize:10,color:C.muted,marginBottom:5}}>Propiedades</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {(ud.props&&ud.props.length?ud.props:["Sin definir"]).map(p=><Tag key={p} c={C.lav3} bg={C.lav4}>{p}</Tag>)}
                </div>
              </div>
              <div><div style={{fontSize:10,color:C.muted,marginBottom:3}}>Precio promedio</div><div style={{fontSize:13,fontWeight:600,color:C.ink}}>{ud.precio||"Sin definir"}</div></div>
              <div><div style={{fontSize:10,color:C.muted,marginBottom:3}}>Objetivo principal</div><div style={{fontSize:13,fontWeight:600,color:C.ink}}>{goalOpts.find(g=>g.id===ud.goal)?.n||"Sin definir"}</div></div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:14,animation:"fadeUp .3s ease both"}}>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:C.ink,marginBottom:8}}>¿Qué propiedades manejás?</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {pOpts.map(p=><div key={p} onClick={()=>setNegocio(n=>({...n,props:n.props.includes(p)?n.props.filter(x=>x!==p):[...n.props,p]}))} style={{padding:"6px 13px",borderRadius:100,border:"2px solid "+(negocio.props.includes(p)?C.lav3:C.brd),background:negocio.props.includes(p)?C.lav3:C.sf,color:negocio.props.includes(p)?"#fff":C.ink,fontSize:12,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>{p}</div>)}
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:C.ink,marginBottom:8}}>Precio promedio</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {prOpts.map(p=><div key={p} onClick={()=>setNegocio(n=>({...n,precio:p}))} style={{padding:"6px 13px",borderRadius:100,border:"2px solid "+(negocio.precio===p?C.lav3:C.brd),background:negocio.precio===p?C.lav3:C.sf,color:negocio.precio===p?"#fff":C.ink,fontSize:12,fontWeight:500,cursor:"pointer"}}>{p}</div>)}
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:C.ink,marginBottom:8}}>Objetivo principal</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {goalOpts.map(g=>(
                    <div key={g.id} onClick={()=>setNegocio(n=>({...n,goal:g.id}))} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:12,border:"2px solid "+(negocio.goal===g.id?C.lav3:C.brd),background:negocio.goal===g.id?C.lav4:C.sf,cursor:"pointer"}}>
                      <span style={{fontSize:15}}>{g.ic}</span><span style={{fontSize:13,fontWeight:600,color:C.ink}}>{g.n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <Btn v="ghost" full onClick={()=>setEditNegocio(false)}>Cancelar</Btn>
                <Btn v="lav" full onClick={saveNegocio}>Guardar</Btn>
              </div>
            </div>
          )}
        </Card>
      )}

      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:3}}>Tu plan</div>
            <div style={{fontSize:15,fontWeight:700,color:C.ink}}>{isManager?"Manager":"Agente"} · 6 días de trial</div>
            <div style={{fontSize:11,color:C.mid,marginTop:2}}>Se cobra automático al finalizar el trial</div>
          </div>
          <Btn v="lime" sm onClick={()=>toast("Abriendo gestión de facturación...")}>Ver factura</Btn>
        </div>
      </Card>
      {isManager&&<Ins v="lav" lbl="Tu próxima factura">USD 18 base + USD 18 por cada agente vinculado. Te avisamos antes de cualquier ajuste.</Ins>}

      <Card>
        <CT c="Notificaciones"/>
        {[["alertas","Alertas de competencia"],["reels","Recordatorios de contenido"],...(isManager?[["equipo","Actividad del equipo"]]:[])].map(([k,lbl])=>(
          <div key={k} onClick={()=>setNotifs(n=>({...n,[k]:!n[k]}))} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",cursor:"pointer"}}>
            <div style={{fontSize:13,color:C.ink}}>{lbl}</div>
            <div style={{width:38,height:22,borderRadius:100,background:notifs[k]?C.lav3:C.brd,position:"relative",transition:"background .25s",flexShrink:0}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:notifs[k]?19:3,transition:"left .25s cubic-bezier(.34,1.4,.64,1)",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
            </div>
          </div>
        ))}
      </Card>

      {isManager&&(
        <Card>
          <CT c="Invitar agente al equipo"/>
          <div style={{fontSize:12,color:C.mid,lineHeight:1.55,marginBottom:11}}>Le mandamos un link por email. Al aceptarlo, queda asociado a tu inmobiliaria automáticamente.</div>
          <div style={{display:"flex",gap:8}}>
            <input value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} placeholder="email@agente.com" style={{flex:1,padding:"10px 13px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:13,outline:"none",color:C.ink}}/>
            <Btn v="lav" sm onClick={sendInvite}>Invitar</Btn>
          </div>
        </Card>
      )}

      <Btn v="ghost" full onClick={onLogout} sx={{color:C.red,borderColor:"rgba(232,98,42,.3)"}}>Cerrar sesión</Btn>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────────
const Login=({onDone})=>{
  const [loading,setLoading]=useState(false);
  const isD=window.innerWidth>=768;
  const go=()=>{setLoading(true);setTimeout(()=>onDone(),1100);};
  const form=(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:isD?"48px 56px":"40px",background:isD?"rgba(255,255,255,.97)":"transparent",borderRadius:isD?24:0,boxShadow:isD?"0 20px 60px rgba(0,0,0,.12)":undefined,width:isD?"100%":undefined,maxWidth:isD?420:undefined,textAlign:"center"}}>
      {!isD&&<div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Personaje size={140} color="lav" mood="idle"/></div>}
      <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><LogoFixa height={isD?32:30}/></div>
      <div style={{fontSize:isD?16:14,color:C.mid,marginBottom:38,maxWidth:280,lineHeight:1.6}}>Tu estrategia de marketing inmobiliario, en 2 minutos al día.</div>
      <div style={{width:"100%",maxWidth:320,display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={go} disabled={loading} style={{width:"100%",padding:"14px 16px",borderRadius:100,border:"2px solid "+C.brd,background:C.sf,display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontSize:14,fontWeight:600,color:C.ink,cursor:loading?"default":"pointer",fontFamily:"DM Sans,sans-serif"}}>
          {loading?<Dots/>:<><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6.1 29.6 4 24 4c-7.5 0-13.9 4.3-17.1 10.7z"/><path fill="#4CAF50" d="M24 44c5.5 0 10.3-1.8 13.7-5l-6.3-5.3C29.5 35.4 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.9 39.6 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.7l6.3 5.3C40.9 36.9 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"/></svg>Continuar con Google</>}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:8,margin:"4px 0"}}><div style={{flex:1,height:1,background:C.brd}}/><div style={{fontSize:11,color:C.muted}}>o</div><div style={{flex:1,height:1,background:C.brd}}/></div>
        <button onClick={go} disabled={loading} style={{width:"100%",padding:"14px 16px",borderRadius:100,border:"none",background:C.ink,color:"#fff",fontSize:14,fontWeight:600,cursor:loading?"default":"pointer",fontFamily:"DM Sans,sans-serif"}}>Continuar con email</button>
      </div>
      <div style={{fontSize:11,color:C.muted,marginTop:24,maxWidth:280,lineHeight:1.5}}>Al continuar aceptás nuestros Términos y Política de Privacidad.</div>
    </div>
  );
  if(isD) return(
    <div style={{width:"100vw",height:"100vh",display:"flex",background:"radial-gradient(ellipse at 40% 40%,#2A1880 0%,#0E0828 100%)"}}>
      {/* Izquierda — personaje + tagline */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24,padding:48}}>
        <div style={{animationName:"pgBob",animationDuration:"3.6s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}>
          <Personaje size={260} color="lav" mood="idle"/>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:28,fontWeight:800,color:"#fff",letterSpacing:-1,marginBottom:10}}>Marketing inmobiliario<br/>que realmente funciona.</div>
          <div style={{fontSize:15,color:"rgba(255,255,255,.45)",lineHeight:1.7}}>Ideas, captions, análisis de competencia<br/>y pipeline de ventas — todo en un lugar.</div>
        </div>
        <div style={{display:"flex",gap:32,marginTop:8}}>
          {[["2min","por día"],["10x","más leads"],["100%","argento"]].map(([n,l])=>(
            <div key={n} style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:C.lime}}>{n}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Derecha — formulario */}
      <div style={{width:480,display:"flex",alignItems:"center",justifyContent:"center",padding:48,background:"rgba(255,255,255,.04)",backdropFilter:"blur(20px)",borderLeft:"1px solid rgba(255,255,255,.08)"}}>
        {form}
      </div>
    </div>
  );
  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,background:C.bg,textAlign:"center"}}>
      {form}
    </div>
  );
};

// ── PLAN ──────────────────────────────────────────────────────────────────────────
const Plan=({role,onDone})=>{
  const [agentes,setAgentes]=useState(3);
  const isD=window.innerWidth>=768;
  const isManager=role==="inmobiliaria";
  const total=isManager?18+agentes*18:20;
  return(
    <div style={{minHeight:"100vh",overflowY:"auto",padding:isD?"40px 20px":"28px 20px",background:isD?"radial-gradient(ellipse at 40% 20%,#1E1248 0%,#0D0920 100%)":"transparent",display:isD?"flex":undefined,alignItems:isD?"flex-start":undefined,justifyContent:isD?"center":undefined}}>
      <div style={{maxWidth:isD?520:380,width:"100%",margin:"0 auto",display:"flex",flexDirection:"column",gap:18,background:isD?"rgba(255,255,255,.97)":C.bg,borderRadius:isD?24:0,padding:isD?"40px 48px":"0",boxShadow:isD?"0 24px 80px rgba(0,0,0,.25)":undefined}}>
        <div style={{textAlign:"center",marginBottom:6}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><Personaje size={100} color="lav" mood="thinking"/></div>
          <div style={{fontSize:24,fontWeight:700,letterSpacing:-1,color:C.ink}}>{isManager?"Plan Manager":"Plan Agente"}</div>
          <div style={{fontSize:13,color:C.mid,marginTop:5}}>7 días gratis, después se cobra automático</div>
        </div>

        {isManager&&(
          <Card>
            <CT c="¿A cuántos agentes vas a supervisar?"/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:18,padding:"8px 0"}}>
              <button onClick={()=>setAgentes(a=>Math.max(0,a-1))} style={{width:38,height:38,borderRadius:"50%",border:"2px solid "+C.brd,background:C.sf,fontSize:18,fontWeight:700,color:C.ink,cursor:"pointer"}}>−</button>
              <div style={{fontSize:34,fontWeight:700,color:C.lav3,minWidth:50,textAlign:"center"}}>{agentes}</div>
              <button onClick={()=>setAgentes(a=>Math.min(50,a+1))} style={{width:38,height:38,borderRadius:"50%",border:"2px solid "+C.brd,background:C.sf,fontSize:18,fontWeight:700,color:C.ink,cursor:"pointer"}}>+</button>
            </div>
            <div style={{fontSize:11,color:C.muted,textAlign:"center"}}>Podés ajustarlo después según tu equipo real</div>
          </Card>
        )}

        <Card sx={{background:"linear-gradient(150deg,"+C.lav3+",#6B5ACC)",border:"none"}}>
          {isManager?(
            <>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"rgba(255,255,255,.75)",marginBottom:8}}><span>Tu cuenta de manager</span><span>USD 18/mes</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"rgba(255,255,255,.75)",marginBottom:12,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,.18)"}}><span>{agentes} agente{agentes!==1?"s":""} × USD 18</span><span>USD {agentes*18}/mes</span></div>
            </>
          ):(
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"rgba(255,255,255,.75)",marginBottom:12,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,.18)"}}><span>Acceso completo Fixa Agente</span><span>USD 20/mes</span></div>
          )}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
            <span style={{fontSize:14,fontWeight:600,color:"#fff"}}>Total después del trial</span>
            <span style={{fontSize:28,fontWeight:700,color:C.lime,letterSpacing:-1}}>USD {total}<span style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>/mes</span></span>
          </div>
        </Card>

        {isManager&&<Ins v="lime" lbl="Cómo funciona">Cada agente paga su propio plan por separado. Si invitás un agente nuevo, te avisamos antes de ajustar tu factura — nunca te cobramos de más sin que lo confirmes.</Ins>}

        <Btn v="lav" full sx={{padding:"15px 0",fontSize:15}} onClick={onDone}>Empezar prueba de 7 días</Btn>
        <div style={{fontSize:11,color:C.muted,textAlign:"center"}}>Pedimos tu tarjeta para activar el trial. No se cobra nada hasta el día 8.</div>
      </div>
    </div>
  );
};

// ── MAIN ──────────────────────────────────────────────────────────────────────────
export default function Fixa(){
  const [screen,setScreen]=useState("splash");
  const [ud,setUd]=useState({nombre:"María García",zona:"Palermo",zonas:["Palermo"],ig:"@maria.andreozzi",role:"agente",goal:"leads",props:["Departamentos"],precio:"USD 80-150k",empresa:"",puesto:"",avatar:null});
  const [panel,setPanel]=useState("dash");
  const [published,setPublished]=useState(false);
  const [streak,setStreak]=useState(7);
  const [chatOpen,setChatOpen]=useState(false);
  const [isDesktop,setIsDesktop]=useState(window.innerWidth>=768);
  const [toast,showToast]=useToast();
  const [ach,fireAch]=useAchievement();
  const [tabBounce,setTabBounce]=useState(null);

  useEffect(()=>{
    const h=()=>setIsDesktop(window.innerWidth>=768);
    window.addEventListener('resize',h);
    return ()=>window.removeEventListener('resize',h);
  },[]);

  const markPublished=()=>{setPublished(true);setStreak(s=>s+1);fireAch("¡Publicado! Racha "+(streak+1)+" días",C.lime3);};
  const changePanel=(id)=>{
    setPanel(id);
    setTabBounce(id);
    setTimeout(()=>setTabBounce(null),420);
  };
  const h=new Date().getHours();
  const greet=h<13?"Buenos días":h<20?"Buenas tardes":"Buenas noches";

  const navItemsAll=[
    {id:"dash",lbl:"Inicio",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2" opacity=".4"/><rect x="3" y="14" width="7" height="7" rx="2" opacity=".4"/><rect x="14" y="14" width="7" height="7" rx="2" opacity=".4"/></svg>,agentOnly:true},
    {id:"hoy",lbl:"Rápido",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H11L11 22L19.5 10.5H13L13 2Z"/></svg>,agentOnly:true},
    {id:"ideas",lbl:"Ideas",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.7 2 6 4.7 6 8c0 2.2 1.2 4.1 3 5.2V15h6v-1.8c1.8-1.1 3-3 3-5.2 0-3.3-2.7-6-6-6Z"/><path d="M9 17h6M10.5 20h3"/></svg>,agentOnly:true},
    {id:"cal",lbl:"Calendario",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,agentOnly:true},
    {id:"comp",lbl:"Competencia",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h3V10H2zM19 20h3V4h-3zM10 20h4V7h-4z"/></svg>},
    {id:"reservas",lbl:"Reservas",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10L12 3L21 10V20H15V14H9V20H3V10Z"/></svg>},
    {id:"editor",lbl:"Diseño",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M9 9v12"/></svg>,agentOnly:true},
    {id:"guión",lbl:"Guión",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/></svg>,agentOnly:true},
    {id:"auto",lbl:"Bot",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,pro:true,agentOnly:true},
    {id:"alertas",lbl:"Alertas",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>,badge:true},
    {id:"biblioteca",lbl:"Biblioteca",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="3"/><path d="M8 21h8M12 17v4"/></svg>,new:true},
    {id:"empresa",lbl:"Equipo",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
  ];
  const isManager = ud.role==="inmobiliaria";
  const managerOrder=["empresa","reservas","comp"];
  const navItems = isManager ? [...managerOrder.map(id=>navItemsAll.find(i=>i.id===id)),...navItemsAll.filter(i=>!managerOrder.includes(i.id))] : navItemsAll;

  if(isDesktop && screen==="app") return(
    <div style={{width:"100vw",height:"100vh",background:"radial-gradient(ellipse at 40% 20%,#1E1248 0%,#0D0920 100%)",display:"flex",flexDirection:"column",fontFamily:"DM Sans,sans-serif",overflow:"hidden"}}>
      <style>{`html,body,#root{margin:0;padding:0;width:100%;height:100%;} ${css}`}</style>
      <AchievementToast a={ach}/>{ach.on&&<Confetti/>}
      {/* TOPBAR */}
      <div style={{height:60,background:"rgba(255,255,255,.97)",backdropFilter:"blur(32px)",borderBottom:"1px solid "+C.brd,display:"flex",alignItems:"center",padding:"0 28px",gap:16,flexShrink:0,zIndex:100}}>
        <LogoFixa height={18}/>
        <div style={{width:1,height:22,background:C.brd}}/>
        <div style={{fontSize:13,color:C.mid,fontWeight:500}}>{greet}, <strong style={{color:C.ink}}>{ud.nombre}</strong></div>
        <div style={{flex:1}}/>
        <div style={{display:"flex",alignItems:"center",gap:8,background:C.s2,borderRadius:100,padding:"7px 16px",border:"1px solid "+C.brd,width:220}}>
          <span style={{fontSize:13,opacity:.4}}>🔍</span>
          <input placeholder="Buscar..." style={{border:"none",background:"transparent",fontSize:13,color:C.ink,outline:"none",fontFamily:"DM Sans,sans-serif",width:"100%"}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,background:C.sund,borderRadius:100,padding:"5px 12px",fontSize:12,fontWeight:800,color:C.amber}}>🔥 {streak}</div>
        <div style={{fontSize:9,fontWeight:800,padding:"5px 10px",borderRadius:100,background:C.limed,color:C.lime3,border:"1px solid rgba(143,168,32,.2)"}}>TRIAL</div>
        <div onClick={()=>changePanel("alertas")} style={{width:32,height:32,borderRadius:"50%",background:C.s2,border:"1px solid "+C.brd,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,position:"relative"}}>
          🔔<div style={{position:"absolute",top:2,right:2,width:7,height:7,borderRadius:"50%",background:C.red,border:"2px solid white"}}/>
        </div>
        <div onClick={()=>changePanel("perfil")} style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#3D2AAF,#6B5DD3)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <span style={{color:"#fff",fontWeight:800,fontSize:14}}>{ud.nombre?ud.nombre[0].toUpperCase():"U"}</span>
        </div>
      </div>
      {/* BODY */}
      <div style={{flex:1,display:"grid",gridTemplateColumns:"220px 1fr 280px",overflow:"hidden"}}>
        {/* SIDEBAR */}
        <div style={{background:"rgba(255,255,255,.55)",backdropFilter:"blur(20px)",borderRight:"1px solid "+C.brd,padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,overflowY:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:8,background:C.lav4,borderRadius:14}}>
            <Personaje size={34} color="lav" mood="eyes"/>
            <div><div style={{fontSize:11,fontWeight:700,color:C.lav3}}>fixa. assistant</div><div style={{fontSize:10,color:C.mid}}>Siempre disponible</div></div>
          </div>
          {navItems.map(item=>(
            <div key={item.id} onClick={()=>changePanel(item.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:12,cursor:"pointer",background:panel===item.id?C.lav4:"transparent",color:panel===item.id?C.lav3:C.mid,transition:"all .15s",fontWeight:panel===item.id?700:500}}>
              <div style={{color:panel===item.id?C.lav3:C.muted,flexShrink:0}}>{item.ic}</div>
              <div style={{fontSize:13,flex:1}}>{item.lbl}</div>
              {item.pro&&<div style={{fontSize:8,fontWeight:800,background:C.lime,color:C.ink,padding:"2px 5px",borderRadius:4}}>PRO</div>}
              {item.badge&&<div style={{width:7,height:7,borderRadius:"50%",background:C.red,flexShrink:0}}/>}
              {item.new&&<div style={{fontSize:8,fontWeight:800,background:C.sky,color:"#fff",padding:"2px 5px",borderRadius:4}}>NEW</div>}
            </div>
          ))}
          <div style={{marginTop:"auto",padding:"12px",background:C.limed,borderRadius:14,border:"1px solid rgba(143,168,32,.2)"}}>
            <div style={{fontSize:11,fontWeight:700,color:C.lime3,marginBottom:2}}>Trial · 14 días</div>
            <div style={{fontSize:10,color:C.mid,lineHeight:1.5,marginBottom:8}}>Upgrade para acceso completo</div>
            <div onClick={()=>changePanel("perfil")} style={{background:C.lav3,color:"#fff",borderRadius:8,padding:"7px",textAlign:"center",fontSize:11,fontWeight:700,cursor:"pointer"}}>Upgradear →</div>
          </div>
        </div>
        {/* CONTENT */}
        <div style={{overflowY:"auto",padding:"28px 32px",background:C.bg}}>
          <div style={{marginBottom:22}}>
            <div style={{fontSize:26,fontWeight:800,letterSpacing:-0.8,color:C.ink}}>{{"dash":"Inicio","hoy":"Publicar hoy","ideas":"Ideas del mes","cal":"Calendario","comp":"Competencia","reservas":"Reservas","editor":"Diseño","guión":"Guión de reel","auto":"Bot Pro","alertas":"Alertas","biblioteca":"Biblioteca de Ads","empresa":"Equipo","perfil":"Mi perfil"}[panel]||panel}</div>
            <div style={{fontSize:13,color:C.mid,marginTop:4}}>{{"dash":"Tu resumen de hoy","hoy":"Mejor horario: 18-19hs","ideas":"Junio · Para "+ud.zona,"comp":ud.zona+" · Actualizado hace 3h","reservas":"Tu pipeline personal","biblioteca":"Meta Ads Library · Real estate","editor":"Plantillas editables"}[panel]||""}</div>
          </div>
          {panel==="dash"&&<PanelDash ud={ud} toast={showToast} setPanel={changePanel} streak={streak} fireAch={fireAch}/>}
          {panel==="hoy"&&<PanelHoy ud={ud} toast={showToast} markPublished={markPublished}/>}
          {panel==="ideas"&&<PanelIdeas ud={ud} toast={showToast} setPanel={changePanel}/>}
          {panel==="cal"&&<PanelCal toast={showToast} published={published} fireAch={fireAch}/>}
          {panel==="comp"&&<PanelComp ud={ud} toast={showToast} fireAch={fireAch}/>}
          {panel==="reservas"&&<PanelReservas toast={showToast} fireAch={fireAch} ud={ud} isManager={isManager} setPanel={changePanel}/>}
          {panel==="editor"&&<PanelEditor toast={showToast}/>}
          {panel==="guión"&&<PanelGuion ud={ud} toast={showToast} fireAch={fireAch}/>}
          {panel==="auto"&&<PanelBot ud={ud} toast={showToast}/>}
          {panel==="alertas"&&<PanelAlertas toast={showToast} setPanel={changePanel}/>}
          {panel==="biblioteca"&&<PanelBiblioteca ud={ud} toast={showToast}/>}
          {panel==="empresa"&&<PanelEmpresa toast={showToast}/>}
          {panel==="perfil"&&<PanelPerfil ud={ud} setUd={setUd} toast={showToast} onLogout={()=>setScreen("login")} isManager={isManager}/>}
        </div>
        {/* RIGHT PANEL */}
        <div style={{background:"rgba(255,255,255,.45)",backdropFilter:"blur(20px)",borderLeft:"1px solid "+C.brd,padding:"20px 16px",overflowY:"auto",display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:C.sf,borderRadius:16,padding:"16px",border:"1px solid "+C.brd}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#3D2AAF,#6B5DD3)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontWeight:800,fontSize:17}}>{ud.nombre?ud.nombre[0].toUpperCase():"U"}</span></div>
              <div><div style={{fontSize:13,fontWeight:700,color:C.ink}}>{ud.nombre}</div><div style={{fontSize:11,color:C.mid}}>{ud.ig} · {ud.zona}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              {[[streak+"🔥",C.amber,C.sund],["Trial",C.lav3,C.lav4],["Pro",C.green,C.greend]].map(([v,c,bg])=>(
                <div key={v} style={{background:bg,borderRadius:10,padding:"8px 6px",textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:800,color:c}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:C.peachd,borderRadius:14,padding:"13px 14px",border:"1px solid rgba(176,88,32,.15)"}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.peachk,marginBottom:6}}>⚠️ Alerta</div>
            <div style={{fontSize:12,color:C.mid,lineHeight:1.55}}><strong style={{color:C.peachk}}>@propiedades.palermo</strong> publicó 3 reels. Engagement +41%.</div>
            <div onClick={()=>changePanel("comp")} style={{marginTop:8,fontSize:11,fontWeight:700,color:C.peachk,cursor:"pointer"}}>Ver análisis →</div>
          </div>
          <div style={{background:C.sf,borderRadius:14,padding:"14px",border:"1px solid "+C.brd,flex:1}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted,marginBottom:10}}>Próximos posts</div>
            {[{d:"13 Jun",t:"Tour de la zona",tipo:"Reel",c:"#B04020",bg:C.redd},{d:"17 Jun",t:"Datos de barrio",tipo:"Post",c:C.lav3,bg:C.lav4},{d:"20 Jun",t:"Mitos escritura",tipo:"Reel",c:"#B04020",bg:C.redd}].map((p,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"8px 0",borderBottom:i<2?"1px solid "+C.brd:"none"}}>
                <div style={{fontSize:10,color:C.muted,width:36}}>{p.d}</div>
                <div style={{flex:1,fontSize:12,fontWeight:600,color:C.ink}}>{p.t}</div>
                <div style={{fontSize:9,fontWeight:700,padding:"3px 7px",borderRadius:6,background:p.bg,color:p.c}}>{p.tipo}</div>
              </div>
            ))}
          </div>
          <div onClick={()=>showToast("Abriendo plan Pro...")} style={{background:"linear-gradient(135deg,"+C.lav3+","+C.lav+")",borderRadius:14,padding:"14px 16px",cursor:"pointer"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#fff",marginBottom:2}}>⚡ Activá el Bot</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.65)",lineHeight:1.5}}>Comentarios → leads automáticamente.</div>
            <div style={{marginTop:8,fontSize:11,fontWeight:700,color:C.lime}}>Agregar a mi plan →</div>
          </div>
        </div>
      </div>
      {/* FAB chatbot desktop */}
      {!chatOpen&&(
        <div style={{position:"fixed",bottom:32,right:32,zIndex:200}}>
          <div style={{position:"absolute",inset:-4,borderRadius:"50%",border:"1.5px solid rgba(91,74,196,.35)",animationName:"ripple",animationDuration:"2.4s",animationTimingFunction:"ease-out",animationIterationCount:"infinite"}}/>
          <button onClick={()=>setChatOpen(true)} style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#1E1060,#4332B0)",border:"none",boxShadow:"0 4px 18px rgba(30,16,96,.5)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",zIndex:1,overflow:"hidden"}}>
            <Personaje size={56} color="lav" mood="eyes" style={{marginTop:8}}/>
          </button>
        </div>
      )}
      {chatOpen&&<Chatbot ud={ud} onClose={()=>setChatOpen(false)}/>}
      <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:9999,pointerEvents:"none"}}>
        <div style={{background:C.ink,color:"#fff",padding:"11px 22px",borderRadius:100,fontSize:13,fontWeight:600,opacity:toast.on?1:0,transition:"opacity .3s",whiteSpace:"nowrap"}}>{toast.msg}</div>
      </div>
    </div>
  );

  return(
    <div style={{width:"100%",height:"100vh",background:"radial-gradient(circle at 30% 20%,#241B4D 0%,#15102E 55%,#0D0920 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{`html,body,#root{margin:0;padding:0;width:100%;height:100%;}`}</style>
      <div style={{width:"100%",height:"100vh",maxHeight:isDesktop?undefined:932,background:isDesktop?"transparent":C.bg,position:"relative",overflow:isDesktop?"visible":"hidden",fontFamily:"DM Sans,sans-serif",maxWidth:isDesktop?undefined:430,boxShadow:isDesktop?"none":"0 30px 90px rgba(0,0,0,.45)",borderRadius:0,display:isDesktop?"flex":undefined,alignItems:isDesktop?"center":undefined,justifyContent:isDesktop?"center":undefined}}>
      <style>{css}</style>

      <AchievementToast a={ach}/>

      {!isDesktop&&<div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,124,232,.14) 0%,transparent 70%)",top:-150,right:-100,animationName:"pulse",animationDuration:"20s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
        <div style={{position:"absolute",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,224,58,.1) 0%,transparent 70%)",bottom:-90,left:-70,animationName:"pulse",animationDuration:"15s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:"6s"}}/>
      </div>}

      {/* SPLASH */}
      {screen==="splash"&&(
        <div style={{position:isDesktop?"relative":"absolute",inset:isDesktop?undefined:0,zIndex:10,background:"radial-gradient(ellipse at 50% 30%,#2A1880 0%,#0E0828 60%,#06041A 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 32px",width:isDesktop?"100%":undefined,height:isDesktop?"100vh":undefined}}>
          <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,74,196,.4) 0%,transparent 70%)",top:"10%",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"}}/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",position:"relative",zIndex:1,width:"100%",maxWidth:420}}>
            <div style={{animationName:"pgBob",animationDuration:"3.6s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",marginBottom:-8}}>
              <Personaje size={isDesktop?240:200} color="lav" mood="idle"/>
            </div>
            <div style={{animation:"fadeUp .7s cubic-bezier(.34,1.2,.64,1) .3s both"}}>
              <LogoFixa height={isDesktop?44:36} dark/>
            </div>
            <div style={{fontSize:isDesktop?16:14,color:"rgba(255,255,255,.38)",maxWidth:280,lineHeight:1.7,animation:"fadeUp .6s ease .55s both",marginTop:12}}>
              Marketing inmobiliario en 2 minutos al día.
            </div>
            <div style={{marginTop:36,animation:"fadeUp .6s ease .8s both",width:"100%"}}>
              <Btn v="lime" onClick={()=>setScreen("login")} sx={{padding:"15px 0",fontSize:16,width:"100%",borderRadius:18,background:C.lime,color:C.ink,boxShadow:"0 6px 24px rgba(200,224,58,.35)"}}>Empezar →</Btn>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN */}
      {screen==="login"&&(
        <div style={{position:isDesktop?"relative":"absolute",inset:isDesktop?undefined:0,zIndex:10,width:isDesktop?"100%":undefined,height:isDesktop?"100vh":undefined,display:isDesktop?"flex":undefined,alignItems:isDesktop?"center":undefined,justifyContent:isDesktop?"center":undefined}}>
          <div style={{width:isDesktop?"100%":undefined,maxWidth:isDesktop?440:undefined}}>
            <Login onDone={()=>setScreen("onboarding")}/>
          </div>
        </div>
      )}

      {/* ONBOARDING */}
      {screen==="onboarding"&&(
        <div style={{position:isDesktop?"relative":"absolute",inset:isDesktop?undefined:0,zIndex:10,width:isDesktop?"100%":undefined,height:isDesktop?"100vh":undefined,display:isDesktop?"flex":undefined,alignItems:isDesktop?"center":undefined,justifyContent:isDesktop?"center":undefined,overflowY:isDesktop?"auto":undefined}}>
          <div style={{width:isDesktop?"100%":undefined,maxWidth:isDesktop?520:undefined,padding:isDesktop?"40px 0":undefined}}>
            <Onboarding onDone={(data)=>{setUd(data);setScreen("plan");}}/>
          </div>
        </div>
      )}

      {/* PLAN */}
      {screen==="plan"&&(
        <div style={{position:isDesktop?"relative":"absolute",inset:isDesktop?undefined:0,zIndex:10,width:isDesktop?"100%":undefined,height:isDesktop?"100vh":undefined,display:isDesktop?"flex":undefined,alignItems:isDesktop?"center":undefined,justifyContent:isDesktop?"center":undefined}}>
          <div style={{width:isDesktop?"100%":undefined,maxWidth:isDesktop?480:undefined}}>
            <Plan role={ud.role} onDone={()=>{if(ud.role==="inmobiliaria")setPanel("empresa");setScreen("scan");}}/>
          </div>
        </div>
      )}

      {/* SCAN */}
      {screen==="scan"&&(
        <div style={{position:isDesktop?"relative":"absolute",inset:isDesktop?undefined:0,zIndex:10,width:isDesktop?"100%":undefined,height:isDesktop?"100vh":undefined,display:isDesktop?"flex":undefined,alignItems:isDesktop?"center":undefined,justifyContent:isDesktop?"center":undefined}}>
          <div style={{width:isDesktop?"100%":undefined,maxWidth:isDesktop?420:undefined}}>
            <Scan zona={ud.zona} onDone={()=>setScreen("app")}/>
          </div>
        </div>
      )}

      {/* APP MOBILE — solo si no es desktop */}
      {screen==="app"&&!isDesktop&&(
        <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",flexDirection:"column"}}>
          {/* Topbar */}
          <div style={{height:64,background:"rgba(255,255,255,.98)",backdropFilter:"blur(32px)",borderBottom:"1px solid "+C.brd,display:"flex",alignItems:"center",padding:"0 16px",gap:10,flexShrink:0,zIndex:40}}>
            <div onClick={()=>setPanel("perfil")} style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#3D2AAF,#6B5DD3)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,boxShadow:"0 2px 8px rgba(91,74,196,.35)"}}>
              <span style={{color:"#fff",fontWeight:800,fontSize:15,letterSpacing:-0.5}}>{ud.nombre?ud.nombre[0].toUpperCase():"U"}</span>
            </div>
            <div style={{flexShrink:0}}><LogoFixa height={19}/></div>
            <div onClick={()=>setPanel("perfil")} style={{flex:1,minWidth:0,cursor:"pointer"}}>
              <div style={{fontSize:9.5,color:C.muted,lineHeight:1,fontWeight:500}}>{greet}</div>
              <div style={{fontSize:13,fontWeight:700,letterSpacing:-0.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:C.ink,marginTop:1.5}}>{ud.nombre}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,background:C.sund,borderRadius:100,padding:"5px 10px",fontSize:12,fontWeight:800,color:C.amber,flexShrink:0}}>
              <span style={{animationName:"streakFlame",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",display:"inline-block"}}>🔥</span> {streak}
            </div>
            <div onClick={()=>setPanel("perfil")} style={{fontSize:9,fontWeight:800,letterSpacing:"0.06em",textTransform:"uppercase",padding:"5px 10px",borderRadius:100,background:C.limed,color:C.lime3,flexShrink:0,cursor:"pointer",border:"1.5px solid rgba(143,168,32,.2)"}}>Trial</div>
            <div onClick={()=>setPanel("alertas")} style={{width:32,height:32,borderRadius:"50%",background:C.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,position:"relative",flexShrink:0,border:"1px solid "+C.brd}}>
              🔔<div style={{position:"absolute",top:2,right:2,width:7,height:7,borderRadius:"50%",background:C.red,border:"2px solid white"}}/>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"18px 16px",paddingBottom:120}}>
            {panel==="dash"&&<PanelDash ud={ud} toast={showToast} setPanel={setPanel} streak={streak} fireAch={fireAch}/>}
            {panel==="hoy"&&<PanelHoy ud={ud} toast={showToast} markPublished={markPublished}/>}
            {panel==="ideas"&&<PanelIdeas ud={ud} toast={showToast} setPanel={setPanel}/>}
            {panel==="cal"&&<PanelCal toast={showToast} published={published} fireAch={fireAch}/>}
            {panel==="comp"&&<PanelComp ud={ud} toast={showToast} fireAch={fireAch}/>}
            {panel==="reservas"&&<PanelReservas toast={showToast} fireAch={fireAch} ud={ud} isManager={isManager} setPanel={setPanel}/>}
            {panel==="reservasEquipo"&&<PanelReservasEquipo toast={showToast} setPanel={setPanel}/>}
            {panel==="editor"&&<PanelEditor toast={showToast}/>}
            {panel==="guión"&&<PanelGuion ud={ud} toast={showToast} fireAch={fireAch}/>}
            {panel==="auto"&&<PanelBot ud={ud} toast={showToast}/>}
            {panel==="alertas"&&<PanelAlertas toast={showToast} setPanel={setPanel}/>}
            {panel==="empresa"&&<PanelEmpresa toast={showToast}/>}
            {panel==="biblioteca"&&<PanelBiblioteca ud={ud} toast={showToast}/>}
            {panel==="perfil"&&<PanelPerfil ud={ud} setUd={setUd} toast={showToast} isManager={isManager} onLogout={()=>{setScreen("splash");setPanel("dash");}}/>}
          </div>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:74,background:"rgba(255,255,255,.98)",backdropFilter:"blur(28px)",borderTop:"1px solid "+C.brd,zIndex:40,overflowX:"auto",display:"flex",alignItems:"center",padding:"0 6px",gap:0}}>
            {navItems.map(item=>(
              <div key={item.id} onClick={()=>changePanel(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",flexShrink:0,minWidth:58,padding:"8px 4px",borderRadius:16,position:"relative",background:panel===item.id?C.lav4:"transparent",transition:"all .2s",animationName:tabBounce===item.id?"tabPop":"none",animationDuration:".4s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)"}}>
                <div style={{width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",color:panel===item.id?C.lav3:C.muted}}>{item.ic}</div>
                <div style={{fontSize:9,fontWeight:panel===item.id?700:500,color:panel===item.id?C.lav3:C.muted,whiteSpace:"nowrap"}}>{item.lbl}</div>
                {item.pro&&<div style={{position:"absolute",top:4,right:"calc(50% - 24px)",fontSize:7,fontWeight:800,background:C.lime,color:C.ink,padding:"1px 4px",borderRadius:5}}>PRO</div>}
                {item.badge&&<div style={{position:"absolute",top:5,right:"calc(50% - 20px)",width:8,height:8,borderRadius:"50%",background:C.red,border:"2px solid white"}}/>}
                {item.new&&<div style={{position:"absolute",top:4,right:"calc(50% - 28px)",fontSize:7,fontWeight:800,background:C.sky,color:"#fff",padding:"1px 5px",borderRadius:5}}>NEW</div>}
              </div>
            ))}
          </div>
          {panel==="dash"&&!chatOpen&&(
            <div style={{position:"absolute",bottom:84,right:14,zIndex:50}}>
              <div style={{position:"absolute",inset:-4,borderRadius:"50%",border:"1.5px solid rgba(91,74,196,.4)",animationName:"ripple",animationDuration:"2.4s",animationTimingFunction:"ease-out",animationIterationCount:"infinite"}}/>
              <button onClick={()=>setChatOpen(true)} style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#1E1060,#4332B0)",border:"none",boxShadow:"0 4px 16px rgba(30,16,96,.5)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",zIndex:1,overflow:"hidden"}}>
                <Personaje size={52} color="lav" mood="eyes" style={{marginTop:7}}/>
              </button>
            </div>
          )}
        </div>
      )}

      {chatOpen&&<Chatbot ud={ud} onClose={()=>setChatOpen(false)}/>}

      <div style={{position:"fixed",bottom:isDesktop?24:82,left:"50%",transform:"translateX(-50%) translateY("+(toast.on?"0":"20px")+")",background:C.ink,color:"#fff",padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,zIndex:9999,opacity:toast.on?1:0,transition:"all .3s",whiteSpace:"nowrap",pointerEvents:"none"}}>
        {toast.msg}
      </div>
      </div>
    </div>
  );
}
