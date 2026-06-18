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

/* loading / processing */
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

// ── SVG CHAR (único — Char1, se tinta por color) ───────────────────────────────
const CHAR_PATH="M264.85,530.01c-56.86-21.27-123.07,62.29-210.36,22.7-44.41-20.14-47.71-70.94-24.61-110.46l34.58-59.16c10.24-17.51,14.24-39.82,7.62-59.4-6.62-19.6-21.49-34.82-36.97-48.1C7.92,252.27-5.77,220.01,2.3,183.93c4.54-20.3,12.75-42.05,30.36-54.97,33.59-24.65,79.45-28.2,116.35-10.44l57.99,27.9c14.83,7.14,33.03,8.9,46.77-1.23,32.36-23.88,57-71.09,92.33-103.98C389.54.78,445.43-16.33,491.05,19.67c21.3,16.82,34.12,44.04,32.59,74.31-2.25,44.27-32.59,89.74,18.68,121.78,28,17.49,55.23,33.83,77.48,58.77,43.06,48.28,56.62,118.07,23.52,174.95-12.92,22.19-37.41,37.05-60.3,47.15-61.9,27.32-43.18,77.22-56.93,117.07-7.28,21.09-20.56,36.2-41.97,44.28-42.55,16.05-93.19,10.35-129.57-18.07-37.64-29.4-43.64-92.68-89.69-109.9Z";

// mood: "idle" | "happy" | "excited" | "thinking" | "blink-fast"
const Char1=({size=80,anim=true,color=C.lav3,mood="idle"})=>{
  const eyeAnim = mood==="excited"
    ? {animationName:"happySquint",animationDuration:"0.6s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}
    : mood==="thinking"
    ? {animationName:"lookAround",animationDuration:"2.2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}
    : {animationName:"wink",animationDuration:(mood==="blink-fast"?1.8:4.2)+"s",animationTimingFunction:"cubic-bezier(.4,0,.2,1)",animationIterationCount:"infinite"};
  const bodyAnim = !anim ? {} : mood==="excited"
    ? {animationName:"excitedWiggle",animationDuration:"0.7s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}
    : {animationName:"bob",animationDuration:"3.5s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"};
  return(
    <svg width={size} height={size} viewBox="0 0 661.78 666.82" style={bodyAnim}>
      <path fill={color} d={CHAR_PATH}/>
      <circle fill="#fefefe" cx="203.32" cy="354.24" r="72.23" style={{...eyeAnim,transformOrigin:"203px 354px"}}/>
      <circle fill="#111" cx="203.5" cy="354.01" r="33.25"/>
      <circle fill="#fefefe" cx="421.01" cy="349.06" r="72.08" style={{...eyeAnim,animationDelay:"0.18s",transformOrigin:"421px 349px"}}/>
      <circle fill="#111" cx="421.35" cy="349.17" r="33.14"/>
    </svg>
  );
};
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
        <div style={{width:84,height:84,borderRadius:"50%",background:"rgba(255,255,255,.16)",display:"flex",alignItems:"center",justifyContent:"center",animationName:"jump",animationDuration:"0.9s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)",flexShrink:0,marginBottom:6}}>
          <Char1 size={58} anim={false} color={a.color||C.lime3} mood="excited"/>
        </div>
        <div style={{fontSize:16,fontWeight:700,color:"#fff",textAlign:"center",lineHeight:1.3}}>{a.msg}</div>
        <Confetti/>
      </div>
    </div>
  );
}

const Btn=({children,v="lav",sm,full,onClick,sx={}})=>{
  const styles={lav:{bg:C.lav3,col:"#fff",bdr:"none"},lime:{bg:C.lime,col:C.ink,bdr:"none"},ghost:{bg:"transparent",col:C.ink,bdr:"2px solid "+C.brd}};
  const s=styles[v];
  const [pressed,setPressed]=useState(false);
  return <button
    onMouseDown={()=>setPressed(true)}
    onMouseUp={()=>setPressed(false)}
    onMouseLeave={()=>setPressed(false)}
    onClick={onClick}
    style={{background:s.bg,color:s.col,border:s.bdr,borderRadius:100,fontFamily:"DM Sans,sans-serif",padding:sm?"5px 12px":full?"13px 16px":"10px 22px",fontSize:sm?12:14,fontWeight:600,cursor:"pointer",width:full?"100%":undefined,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5,transform:pressed?"scale(.95)":"scale(1)",transition:"transform .15s cubic-bezier(.34,1.2,.64,1)",...sx}}>{children}</button>;
};
const Card=({children,sx={}})=><div style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:20,padding:18,...sx}}>{children}</div>;
const CT=({c})=><div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:12}}>{c}</div>;
const Tag=({c,bg,children})=><span style={{background:bg,color:c,fontSize:9,fontWeight:700,textTransform:"uppercase",padding:"2px 7px",borderRadius:100,marginRight:4}}>{children}</span>;
const Ins=({v="lav",lbl,children})=>{
  const s={lav:{bg:C.lav4,br:"rgba(139,124,232,.22)",lc:C.lav3},peach:{bg:C.peachd,br:"rgba(245,165,122,.28)",lc:C.peachk},mint:{bg:C.mintd,br:"rgba(122,212,160,.28)",lc:C.green},lime:{bg:C.limed,br:"rgba(143,168,32,.22)",lc:C.lime3},sky:{bg:C.skyd,br:"rgba(91,200,232,.28)",lc:C.skyk}}[v];
  return <div style={{background:s.bg,border:"1.5px solid "+s.br,borderRadius:16,padding:"12px 14px",fontSize:13,lineHeight:1.7}}>
    {lbl&&<div style={{fontSize:9,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:s.lc,marginBottom:5}}>{lbl}</div>}
    <div style={{color:C.mid}}>{children}</div>
  </div>;
};
const Stat=({ic,val,lbl,sub,c})=>(
  <div style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:16,padding:13,transition:"transform .25s cubic-bezier(.34,1.2,.64,1)"}}>
    <div style={{width:32,height:32,borderRadius:10,background:c+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginBottom:8}}>{ic}</div>
    <div style={{fontSize:26,fontWeight:700,color:c,letterSpacing:-1,lineHeight:1}}>{val}</div>
    <div style={{fontSize:11,color:C.mid,marginTop:2}}>{lbl}</div>
    {sub&&<div style={{fontSize:10,color:C.green,fontWeight:600,marginTop:3}}>{sub}</div>}
  </div>
);
const Dots=()=>(
  <div style={{display:"flex",gap:5}}>
    {[0,1,2].map(i=><span key={i} style={{width:7,height:7,borderRadius:"50%",background:C.lav3,display:"inline-block",animationName:"dotB",animationDuration:"0.9s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:(i*0.15)+"s"}}/>)}
  </div>
);
const Loading=({txt,color=C.lav3})=>{
  return(
    <div style={{display:"flex",alignItems:"center",gap:14,padding:18,background:C.lav4,borderRadius:18,fontSize:13,color:C.mid,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(100deg,transparent 30%,rgba(255,255,255,.4) 50%,transparent 70%)",backgroundSize:"200% 100%",animationName:"shimmer",animationDuration:"1.8s",animationTimingFunction:"linear",animationIterationCount:"infinite"}}/>
      <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,.6)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,animationName:"thinking",animationDuration:"1.6s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",position:"relative",zIndex:1}}>
        <Char1 size={28} anim={false} color={color} mood="thinking"/>
      </div>
      <div style={{position:"relative",zIndex:1}}>{txt}</div>
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
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",flexDirection:"column",background:"rgba(22,17,44,.55)",backdropFilter:"blur(6px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"80%",background:C.sf,borderRadius:"28px 28px 0 0",display:"flex",flexDirection:"column",overflow:"hidden",animation:"chatIn .35s cubic-bezier(.34,1.2,.64,1) both"}}>
        {/* Header */}
        <div style={{padding:"16px 20px 12px",borderBottom:"1px solid "+C.brd,display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <div style={{animationName:"bobS",animationDuration:"3s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}>
            <Char1 size={40} anim={false}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:700,color:C.ink}}>Asistente Fixa</div>
            <div style={{fontSize:11,color:C.green,display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.green,animationName:"pulse",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
              En linea · siempre disponible
            </div>
          </div>
          <div onClick={onClose} style={{width:32,height:32,borderRadius:"50%",background:C.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,color:C.mid}}>✕</div>
        </div>
        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"chatIn .3s ease both"}}>
              {m.role==="bot"&&<div style={{width:28,height:28,flexShrink:0,marginRight:8,marginTop:4}}>
                <Char1 size={28} anim={false}/>
              </div>}
              <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?C.lav3:C.s2,color:m.role==="user"?"#fff":C.ink,fontSize:13,lineHeight:1.6,fontWeight:400}}>
                {m.text}
              </div>
            </div>
          ))}
          {typing&&(
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:28,height:28,flexShrink:0}}><Char1 size={28} anim={false}/></div>
              <div style={{padding:"10px 14px",borderRadius:"18px 18px 18px 4px",background:C.s2,display:"flex",gap:5,alignItems:"center"}}>
                <Dots/>
              </div>
            </div>
          )}
          {showSug&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:4}}>
              {SUGGESTIONS.map(s=>(
                <div key={s} onClick={()=>send(s)} style={{padding:"7px 13px",borderRadius:100,border:"1.5px solid "+C.brd,fontSize:12,color:C.mid,cursor:"pointer",background:C.sf,transition:"all .18s"}}>
                  {s}
                </div>
              ))}
            </div>
          )}
          <div ref={endRef}/>
        </div>
        {/* Input */}
        <div style={{padding:"12px 16px",borderTop:"1px solid "+C.brd,display:"flex",gap:10,alignItems:"center",flexShrink:0,background:C.sf}}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter")send();}}
            placeholder="Preguntame cualquier cosa..."
            style={{flex:1,padding:"11px 16px",border:"2px solid "+C.brd,borderRadius:100,fontFamily:"DM Sans,sans-serif",fontSize:14,background:C.s2,color:C.ink,outline:"none"}}
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
  const [precio,setPrecio]=useState("");
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
    setTimeout(()=>onDone({nombre:(nom||"María García").trim(),zona:(zona||"Palermo").trim(),ig:(ig||"@usuario").trim(),role,goal:g,props,precio,avatar:null}),400);
  };
  const finishManager=()=>{
    setTimeout(()=>onDone({nombre:(nom||"María García").trim(),zona:(zonas[0]||"Palermo").trim(),zonas:zonas.length?zonas:["Palermo"],ig:(ig||"@usuario").trim(),role,empresa:empresa.trim()||"Mi inmobiliaria",puesto:puesto.trim()||"Manager",goal:"equipo",props:[],precio:"",avatar:null}),400);
  };
  const pOpts=["Departamentos","Casas","PHs","Locales","Oficinas","Terrenos","Emprendimientos","Alquileres"];
  const prOpts=["- USD 80k","USD 80-150k","USD 150-300k","+ USD 300k"];
  const totalSteps=isManager?2:4;

  return(
    <div style={{height:"100%",overflowY:"auto",padding:"24px 20px",background:C.bg,fontFamily:"DM Sans,sans-serif"}}>
      <div style={{maxWidth:420,margin:"0 auto"}}>
        <div style={{display:"flex",gap:5,marginBottom:28}}>
          {Array.from({length:totalSteps},(_,i)=>i+1).map(p=><div key={p} style={{height:4,borderRadius:4,background:p<step?C.lav3:p===step?C.lav:C.brd,flex:p===step?2:1,transition:"all .4s"}}/>)}
        </div>

        {step===1&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:18,display:"flex",justifyContent:"center"}}><Char1 size={90}/></div>
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
            <div style={{marginBottom:18,display:"flex",justifyContent:"center"}}><Char1 size={90} color={C.lime3}/></div>
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
            <div style={{marginBottom:18,display:"flex",justifyContent:"center"}}><Char1 size={90} color={C.lime3}/></div>
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
            <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Char1 size={90} color={C.red}/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>¿Qué propiedades manejás?</div>
            <div style={{fontSize:14,color:C.mid,marginBottom:18}}>Podés elegir varias.</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
              {pOpts.map(p=><div key={p} onClick={()=>setProps(ps=>ps.includes(p)?ps.filter(x=>x!==p):[...ps,p])} style={{padding:"7px 15px",borderRadius:100,border:"2px solid "+(props.includes(p)?C.lav3:C.brd),background:props.includes(p)?C.lav3:C.sf,color:props.includes(p)?"#fff":C.ink,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>{p}</div>)}
            </div>
            <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:C.ink}}>Precio promedio</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
              {prOpts.map(p=><div key={p} onClick={()=>setPrecio(p)} style={{padding:"7px 15px",borderRadius:100,border:"2px solid "+(precio===p?C.lav3:C.brd),background:precio===p?C.lav3:C.sf,color:precio===p?"#fff":C.ink,fontSize:13,fontWeight:500,cursor:"pointer"}}>{p}</div>)}
            </div>
            <Btn v="lav" full onClick={()=>next(4)}>Continuar</Btn>
            <div onClick={()=>next(2)} style={{marginTop:14,fontSize:13,color:C.muted,cursor:"pointer",textAlign:"center"}}>Volver</div>
          </div>
        )}

        {step===4&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Char1 size={90} color={C.green}/></div>
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
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"28px 20px",height:"100%",justifyContent:"center",gap:14,background:C.bg,fontFamily:"DM Sans,sans-serif"}}>
      <div style={{fontSize:22,fontWeight:700,letterSpacing:-1,color:C.ink}}>Analizando {zona}...</div>
      <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>Buscamos perfiles de Instagram que compiten con vos.</div>
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
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .42s cubic-bezier(.4,0,.2,1) both"}}>
      <div onClick={()=>setPanel("hoy")} style={{background:"linear-gradient(140deg,#3D2FA8 0%,#6B5ACC 55%,#8B78E8 100%)",borderRadius:24,padding:22,position:"relative",overflow:"hidden",cursor:"pointer"}}>
        <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,.07)",right:-50,top:-60,animationName:"pulse",animationDuration:"4s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",marginBottom:8,position:"relative",zIndex:1}}>Acción del día</div>
        <div style={{fontSize:17,fontWeight:700,color:"#fff",lineHeight:1.3,marginBottom:6,position:"relative",zIndex:1,maxWidth:"72%"}}>Tu caption de hoy está listo</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.6)",lineHeight:1.62,marginBottom:14,position:"relative",zIndex:1,maxWidth:"68%"}}>2 minutos y tu post está publicado. Tu racha de {streak} días te lo agradece.</div>
        <div style={{display:"flex",gap:8,position:"relative",zIndex:1}}>
          <button onClick={e=>{e.stopPropagation();setPanel("hoy");}} style={{background:C.lime,color:C.ink,border:"none",borderRadius:100,padding:"7px 15px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Ver caption</button>
          <button onClick={e=>{e.stopPropagation();setPanel("guión");}} style={{background:"rgba(255,255,255,.16)",color:"#fff",border:"none",borderRadius:100,padding:"7px 15px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Guión reel</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        <Stat ic="📈" val="4.8k" lbl="Alcance" sub="+12%" c={C.lav3}/>
        <div style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:16,padding:13}}>
          <div style={{width:32,height:32,borderRadius:10,background:C.lime3+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginBottom:8,animationName:"streakFlame",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}>🔥</div>
          <div style={{fontSize:26,fontWeight:700,color:C.lime3,letterSpacing:-1,lineHeight:1}}>{streak}</div>
          <div style={{fontSize:11,color:C.mid,marginTop:2}}>Racha</div>
          <div style={{fontSize:10,color:C.green,fontWeight:600,marginTop:3}}>record</div>
        </div>
        <Stat ic="💬" val="11" lbl="Leads" sub="3 nuevos" c={C.green}/>
        <Stat ic="🏆" val="#2" lbl="Ranking" c={C.amber}/>
      </div>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
          <CT c="Evolución del mes"/>
          <div style={{fontSize:11,fontWeight:700,color:C.green}}>+34% vs mes pasado</div>
        </div>
        {[["Alcance",78,C.lav3],["Engagement",62,C.sky],["Leads generados",45,C.green]].map(([lbl,pct,col])=>(
          <div key={lbl} style={{marginBottom:11}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <div style={{fontSize:11,color:C.mid}}>{lbl}</div>
              <div style={{fontSize:11,fontWeight:700,color:col}}>{pct}%</div>
            </div>
            <div style={{height:8,background:C.s2,borderRadius:8,overflow:"hidden"}}>
              <div style={{height:"100%",width:pct+"%",background:col,borderRadius:8,transformOrigin:"left",animationName:"barGrow",animationDuration:"1.1s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/>
            </div>
          </div>
        ))}
      </Card>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.lav4,border:"1.5px solid "+C.lav2,borderRadius:100,padding:"4px 12px",fontSize:11,fontWeight:600,color:C.lav3}}>📍 {ud.zona} · Análisis activo</div>
        <Btn v="ghost" sm onClick={()=>setPanel("comp")}>Ver competencia</Btn>
      </div>
      <Ins v="peach" lbl="Alerta de competencia">
        <strong style={{color:C.peachk}}>@propiedades.palermo</strong> publicó 3 reels esta semana. Engagement +41%. <strong style={{color:C.peachk}}>Momento de contestar.</strong>
      </Ins>
      <Card sx={allDone?{background:C.limed,border:"1.5px solid rgba(143,168,32,.3)"}:{}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:allDone?C.lime3:C.muted}}>{allDone?"¡Completaste todo!":"Checklist del día"}</div>
          {allDone&&<div style={{fontSize:16,animationName:"successBounce",animationDuration:".5s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)"}}>🎉</div>}
        </div>
        {labels.map((l,i)=>{
          const d=checks[i];
          return <div key={l} onClick={()=>toggle(i)} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:12,cursor:"pointer"}}>
            <div style={{width:22,height:22,borderRadius:"50%",border:d?"none":"2.5px solid "+C.brd,background:d?C.mint:C.sf,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",flexShrink:0,transition:"all .35s cubic-bezier(.34,1.56,.64,1)",transform:d?"scale(1)":"scale(1)",animationName:d?"successBounce":"none",animationDuration:".4s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)"}}>{d?"✓":""}</div>
            <div style={{fontSize:13,color:d?C.muted:C.ink,textDecoration:d?"line-through":"none",transition:"color .3s"}}>{l}</div>
          </div>;
        })}
      </Card>
      <div onClick={()=>toast("Abriendo plan Pro...")} style={{background:"linear-gradient(135deg,"+C.lav3+","+C.lav+")",borderRadius:18,padding:"16px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
        <div style={{fontSize:24,flexShrink:0}}>⚡</div>
        <div><div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:3}}>Activa el Autoresponder</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Convierte comentarios en leads · +USD 9/mes</div></div>
        <div style={{fontSize:18,color:"rgba(255,255,255,.7)",marginLeft:"auto"}}>→</div>
      </div>
    </div>
  );
}

function PanelHoy({ud,toast,markPublished}){
  const [load,setLoad]=useState(false);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Publica ahora</div><div style={{fontSize:12,color:C.mid}}>Mejor horario: 18-19hs</div></div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTimeout(()=>setLoad(false),2400);}}>Regenerar</Btn>
      </div>
      {load?<Loading txt={"Generando caption para "+ud.zona+"..."} color={C.lav3}/>:<>
        <div style={{background:C.lav4,border:"1.5px solid rgba(139,124,232,.22)",borderRadius:16,padding:16}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Caption listo para pegar</div>
          <div style={{fontSize:13,lineHeight:1.72,marginBottom:12,color:C.ink}}>
            Cuando visitás un departamento, probablemente estás mirando las cosas equivocadas.<br/><br/>
            Orientación, presión del agua, los vecinos... esas son las cosas que no cambian con una mano de pintura.<br/><br/>
            ¿Qué cosa te sorprendió en una visita?<br/><br/>
            — {ud.nombre.split(" ")[0]}, agente en {ud.zona} hace 6 años
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn v="lime" sm onClick={()=>{toast("Caption copiado — publicalo ahora!");markPublished();}}>Copiar y marcar publicado</Btn>
            <Btn v="ghost" sm onClick={()=>toast("Abriendo editor...")}>Editar diseño</Btn>
          </div>
        </div>
        <div style={{background:C.s2,border:"1.5px solid "+C.brd,borderRadius:16,padding:16}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Hashtags</div>
          <div style={{fontSize:13,lineHeight:1.72,marginBottom:10,color:C.lav3}}>#palermo #departamentos #comprardepto #agentesinmobiliarios #consejosdecompra</div>
          <Btn v="ghost" sm onClick={()=>toast("Hashtags copiados")}>Copiar hashtags</Btn>
        </div>
        <Card>
          <CT c="Por qué funciona este caption"/>
          {[["1","Empieza con vos.","Hace que quien lo lea sienta que le hablan directamente. +40% de retención."],["2","Termina con pregunta.","Los comentarios suben el alcance 4x."],["3","La firma construye identidad","de a poco, sin esfuerzo extra."]].map(([n,t,d])=>(
            <div key={n} style={{display:"flex",gap:10,alignItems:"start",marginBottom:12}}>
              <div style={{width:21,height:21,borderRadius:"50%",background:C.lav4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:C.lav3,flexShrink:0}}>{n}</div>
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
  const ideas=[
    {d:"03",m:"Jun",t:"Post: El mito del dólar blue y el m²",ic:"Posicionarte como experta.",tags:[["Post",C.lav3,C.lav4],["Autoridad",C.green,C.greend]]},
    {d:"06",m:"Jun",t:"Reel: 3 cosas que miras mal al visitar un depto",ic:"Tips filmados en propiedad real.",tags:[["Reel","#B04020",C.redd],["Viral",C.amber,C.amberd]]},
    {d:"08",m:"Jun",t:"Story: ¿Qué te frena a comprar?",ic:"Generá datos de tu audiencia.",tags:[["Story",C.skyk,C.skyd],["Interactivo",C.lime3,C.limed]]},
    {d:"10",m:"Jun",t:"Carrusel: El proceso de compra en 6 pasos",ic:"Alta conversión a consultas.",tags:[["Carrusel",C.lav3,C.lav4],["Convierte",C.green,C.greend]]},
    {d:"13",m:"Jun",t:"Reel: Tour de la zona en 60 segundos",ic:"Del barrio, no de la propiedad.",tags:[["Reel","#B04020",C.redd],["Marca",C.lav3,C.lav4]]},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Ideas del mes</div><div style={{fontSize:12,color:C.mid}}>Junio · Para {ud.zona}</div></div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTimeout(()=>setLoad(false),2400);}}>Generar</Btn>
      </div>
      <Ins v="lav" lbl="Tu ventaja detectada">Tus competidores publican casi solo propiedades. <strong style={{color:C.lav3}}>Ninguno hace contenido educativo.</strong> Ese espacio es tuyo.</Ins>
      {load?<Loading txt={"Generando ideas para "+ud.zona+"..."} color={C.red}/>:
        <Card>
          {ideas.map((idea,i)=>(
            <div key={i} style={{padding:"12px 0",borderBottom:i<ideas.length-1?"1.5px solid "+C.brd:"none",display:"grid",gridTemplateColumns:"38px 1fr auto",gap:10,alignItems:"start"}}>
              <div style={{fontSize:14,fontWeight:700,color:C.lav2,textAlign:"center"}}>{idea.d}<span style={{display:"block",fontSize:8,color:C.muted}}>{idea.m}</span></div>
              <div>
                <div style={{fontSize:13,fontWeight:600,marginBottom:3,lineHeight:1.3,color:C.ink}}>{idea.t}</div>
                <div style={{fontSize:11,color:C.mid,marginBottom:5}}>{idea.ic}</div>
                {idea.tags.map(([t,c,bg])=><Tag key={t} c={c} bg={bg}>{t}</Tag>)}
              </div>
              <Btn v="lav" sm onClick={()=>setPanel("hoy")}>Usar</Btn>
            </div>
          ))}
        </Card>
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
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both",position:"relative"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Calendario</div><div style={{fontSize:12,color:C.mid}}>Junio 2025 · tocá un día vacío para planificar</div></div>
        <Btn v="lav" sm onClick={()=>toast("Plan generado!")}>Generar plan</Btn>
      </div>
      <Card sx={{padding:12}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:3}}>
          {["L","M","X","J","V","S","D"].map(d=><div key={d} style={{fontSize:9,fontWeight:700,color:C.muted,textAlign:"center",padding:"3px 0"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
          {days.map((day,i)=>{
            const isPub=day.done||(day.pub&&published);
            const col=day.type?tc[day.type]:{bg:C.s2,c:C.mid};
            return(
              <div key={i} onClick={()=>openDay(i)}
                style={{minHeight:42,background:isPub?C.limed:day.type?C.sf:C.s2,borderRadius:10,padding:4,cursor:day.oth?"default":"pointer",border:"1.5px solid "+(day.today?C.lav3:isPub?"#C0E870":day.type?C.brd:"transparent"),opacity:day.oth?.2:1,boxShadow:day.today?"0 0 0 2px rgba(91,74,196,.15)":"none",position:"relative",transition:"transform .15s"}}>
                <div style={{fontSize:10,fontWeight:700,color:day.today?C.lav3:C.muted,marginBottom:2}}>{day.d}</div>
                {day.type&&<div style={{fontSize:7,fontWeight:700,textTransform:"uppercase",padding:"1px 3px",borderRadius:4,background:isPub?C.limed:col.bg,color:isPub?C.lime3:col.c,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{isPub?day.type+" ok":day.type}</div>}
                {day.remind&&!isPub&&<div style={{position:"absolute",top:2,right:2,fontSize:7}}>🔔</div>}
              </div>
            );
          })}
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[[String(planned+pend),C.lav3,"Planif."],[String(pubCount),C.green,"Public."],[String(pend),C.amber,"Pend."],[String(days.filter(d=>!d.oth).length),C.mid,"Total"]].map(([v,c,l])=>(
          <div key={l} style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:16,padding:13}}>
            <div style={{fontSize:26,fontWeight:700,color:c,letterSpacing:-1}}>{v}</div>
            <div style={{fontSize:11,color:C.mid}}>{l}</div>
          </div>
        ))}
      </div>
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
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Competencia</div><div style={{fontSize:12,color:C.mid}}>{ud.zona} · hace 3h</div></div>
        <Btn v="lav" sm onClick={()=>{toast("Re-escaneando zona...");}}>Escanear</Btn>
      </div>
      <div style={{display:"flex",gap:5,background:C.s2,borderRadius:14,padding:4}}>
        {[["perfiles","Perfiles"],["ads","Ads activos"],["tend","Tendencias"]].map(([id,lbl])=>(
          <div key={id} onClick={()=>setTab(id)} style={{flex:1,textAlign:"center",padding:"8px 0",borderRadius:10,fontSize:12,fontWeight:600,cursor:"pointer",background:tab===id?C.sf:"transparent",color:tab===id?C.lav3:C.mid,transition:"all .25s cubic-bezier(.34,1.2,.64,1)",transform:tab===id?"scale(1.02)":"scale(1)"}}>{lbl}</div>
        ))}
      </div>
      {tab==="perfiles"&&<div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp .35s ease both"}}>
        <Card sx={{padding:0,overflow:"hidden"}}>
          <div style={{padding:16,borderBottom:"1.5px solid "+C.brd}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:13}}>
              <div style={{width:46,height:46,borderRadius:"50%",background:C.redd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#B04020",flexShrink:0}}>PP</div>
              <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:C.ink}}>@propiedades.palermo</div><div style={{fontSize:11,color:C.mid}}>Palermo · Deptos premium</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:9,color:C.muted}}>Score</div><div style={{fontSize:26,fontWeight:700,color:C.red,letterSpacing:-1,animationName:"successBounce",animationDuration:".5s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)"}}>87</div></div>
            </div>
            <div style={{width:"100%",height:7,background:C.s2,borderRadius:7,overflow:"hidden"}}><div style={{height:"100%",width:"87%",borderRadius:7,background:"linear-gradient(90deg,"+C.lav3+","+C.lav+")",transformOrigin:"left",animationName:"barGrow",animationDuration:"1s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,padding:14,borderBottom:"1.5px solid "+C.brd}}>
            {[["18.4k","Seguidores"],["4.2%","Engagement"],["14","Posts/mes"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:C.ink}}>{v}</div><div style={{fontSize:10,color:C.mid}}>{l}</div></div>
            ))}
          </div>
          <div style={{padding:14}}>
            <CT c="Posts más exitosos"/>
            {[["🎬","Reel: mirá cómo quedó este depto","hace 5 días","+8.2%"],["📸","Post: vista al parque Las Heras","hace 11 días","+5.7%"],["📊","Carrusel: precios m² Palermo","hace 18 días","+6.1%"]].map(([ic,t,d,e])=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid "+C.brd}}>
                <div style={{width:36,height:36,borderRadius:10,background:C.redd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{ic}</div>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500,color:C.ink}}>{t}</div><div style={{fontSize:10,color:C.mid}}>{d}</div></div>
                <div style={{fontSize:12,fontWeight:700,color:C.green}}>{e}</div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{background:"linear-gradient(135deg,"+C.limed+",#fff)",border:"1.5px solid rgba(143,168,32,.3)",borderRadius:18,padding:16}}>
          <div style={{fontSize:13,fontWeight:700,color:C.lime3,marginBottom:6}}>Oportunidad detectada</div>
          <div style={{fontSize:12,color:C.mid,lineHeight:1.6}}>Ninguno de tus 4 competidores publica <strong style={{color:C.ink}}>contenido educativo</strong>. Ese formato genera 3x más consultas. <strong style={{color:C.ink}}>Es tu espacio libre.</strong></div>
        </div>
        <Card>
          <CT c={"Otros perfiles en "+ud.zona}/>
          {[["MA","@mariela.agente","9.2k · 2.8%","62",C.skyd,C.skyk],["DP","@deptos.norte","6.8k · 3.1%","58",C.mintd,C.green],["IP","@inmo24","4.1k · 1.4%","41",C.peachd,C.peachk]].map(([av,h,s,sc,bg,col])=>(
            <div key={h} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1.5px solid "+C.brd}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:col,flexShrink:0}}>{av}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.ink}}>{h}</div><div style={{fontSize:11,color:C.mid}}>{s}</div></div>
              <div style={{fontSize:19,fontWeight:700,color:C.amber}}>{sc}</div>
              <Btn v="ghost" sm onClick={()=>toast("Abriendo análisis...")}>Ver</Btn>
            </div>
          ))}
        </Card>
        <div onClick={()=>toast("Ingresá el @usuario de Instagram...")} style={{background:C.sf,border:"2px dashed "+C.brd,borderRadius:20,padding:20,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:28,marginBottom:6}}>+</div>
          <div style={{fontSize:13,fontWeight:600,color:C.mid}}>Agregar competidor que no aparece</div>
        </div>
      </div>}
      {tab==="ads"&&<div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp .35s ease both"}}>
        <Ins v="sky" lbl="Meta Ads Library">Detectamos <strong style={{color:C.skyk}}>3 campañas activas</strong> de tu competencia esta semana.</Ins>
        <Card>
          <CT c="Ads activos"/>
          {[{h:"@propiedades.palermo",t:"Video · Tráfico",c:"Palermo a precios de antes que suba el dólar.",m:"8 días activo"},{h:"@mariela.agente",t:"Imagen · Leads",c:"¿Buscás depto en Palermo? Te ayudo.",m:"14 días activo"},{h:"@deptos.norte",t:"Carrusel · Alcance",c:"Los 5 mejores departamentos en Palermo Norte",m:"Pausado"}].map((ad,i)=>(
            <div key={i} onClick={()=>toggleAd(i)} style={{padding:"12px 0",borderBottom:i<2?"1.5px solid "+C.brd:"none",cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div style={{fontSize:13,fontWeight:600,color:C.ink}}>{ad.h}</div>
                <span style={{background:adsState[i]?C.greend:C.amberd,color:adsState[i]?C.green:C.amber,fontSize:9,fontWeight:700,textTransform:"uppercase",padding:"2px 7px",borderRadius:100,transition:"all .25s"}}>{adsState[i]?"Activo":"Pausado"}</span>
              </div>
              <div style={{fontSize:12,background:C.s2,borderRadius:10,padding:"9px 12px",fontStyle:"italic",color:C.ink}}>{ad.c}</div>
              <div style={{fontSize:10,color:C.muted,marginTop:5}}>{ad.m}</div>
            </div>
          ))}
        </Card>
      </div>}
      {tab==="tend"&&<div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp .35s ease both"}}>
        <Card>
          <CT c="Formatos más usados en la zona"/>
          {[["Reels",48,"#B04020"],["Posts",29,C.lav3],["Carruseles",15,C.amber],["Stories",8,C.sky]].map(([l,p,c])=>(
            <div key={l} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,fontWeight:600,color:C.ink}}>{l}</span><span style={{fontSize:12,color:C.mid}}>{p}%</span></div>
              <div style={{height:8,background:C.s2,borderRadius:8,overflow:"hidden"}}><div style={{height:"100%",width:p+"%",background:c,borderRadius:8,transformOrigin:"left",animationName:"barGrow",animationDuration:"1s",animationTimingFunction:"cubic-bezier(.22,1,.36,1)",animationFillMode:"both"}}/></div>
            </div>
          ))}
        </Card>
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
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both",position:"relative"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Reservas</div><div style={{fontSize:12,color:C.mid}}>Tu pipeline personal</div></div>
        <Btn v="lav" sm onClick={openModal}>+ Nueva</Btn>
      </div>
      {isManager&&<div onClick={()=>setPanel("reservasEquipo")} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:C.lav4,border:"1.5px solid "+C.lav2,borderRadius:14,padding:"11px 14px",cursor:"pointer"}}>
        <div style={{fontSize:12,fontWeight:600,color:C.lav3}}>Ver el pipeline de todo tu equipo →</div>
      </div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        <Stat ic="📋" val={String(total-cerradas)} lbl="Activas" c={C.lav3}/>
        <Stat ic="✅" val={String(cerradas)} lbl="Cerradas" c={C.green}/>
        <Stat ic="💰" val="480k" lbl="En proceso" c={C.amber}/>
        <Stat ic="🏆" val={totalComisionInmo?"USD "+totalComisionInmo:"—"} lbl="Comisión inmo" c={C.mid}/>
      </div>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
        {cols.map(({col,cards})=>(
          <div key={col} style={{minWidth:145,flexShrink:0}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.mid,marginBottom:8}}>{col}</div>
            {cards.map(card=>(
              <div key={card.id} onClick={()=>openDetail(card)} style={{background:card.closed?C.greend:C.sf,border:"1.5px solid "+(card.closed?C.greend:card.isNew?C.lav3:C.brd),borderRadius:14,padding:12,marginBottom:8,cursor:"pointer",animation:card.isNew?"popIn .4s cubic-bezier(.34,1.4,.64,1) both":"none"}}>
                <div style={{fontSize:12,fontWeight:600,color:card.closed?C.green:C.ink,marginBottom:3}}>{card.n}</div>
                <div style={{fontSize:11,color:C.mid}}>{card.p}</div>
                {card.a&&<div style={{fontSize:10,color:card.ac,marginTop:5}}>{card.a}</div>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                  <div style={{fontSize:12,fontWeight:700,color:card.closed?C.green:C.mid}}>{card.m}</div>
                  {card.origen&&<div style={{fontSize:9,color:C.muted,background:C.s2,padding:"2px 6px",borderRadius:100}}>{card.origen}</div>}
                </div>
              </div>
            ))}
          </div>
        ))}
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
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Guión de reel</div><div style={{fontSize:12,color:C.mid}}>30 segundos · listo para grabar</div></div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTimeout(()=>setLoad(false),2400);}}>Nuevo</Btn>
      </div>
      {load?<Loading txt="Generando guión..." color={C.green}/>:<>
        <Card>
          <CT c="3 cosas que miras mal al visitar un depto · 30 seg"/>
          {[["00-03","Cuando visitás un departamento, probablemente estás mirando las cosas equivocadas.","Mirá directo a cámara."],["03-10","Primera: la orientación. Un depto orientado al este te va a tener fría la tarde de tu vida, siempre.","Podés señalar una ventana."],["10-18","Segunda: la presión del agua. Abrí el grifo de la cocina y del baño al mismo tiempo.","Mostralo si podés."],["18-25","Tercera: los vecinos. El pasillo, el portero, el ascensor. Eso no cambia con una mano de pintura.",""],["25-30","Soy "+ud.nombre.split(" ")[0]+", agente en "+ud.zona+". Si querés saber qué más mirar, escribime.","Pedí que escriban."]].map(([t,tx,n])=>(
            <div key={t} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:"1.5px solid "+C.brd}}>
              <div style={{fontSize:10,fontWeight:700,color:C.lav3,width:42,flexShrink:0,fontFamily:"monospace",paddingTop:2}}>{t}</div>
              <div><div style={{fontSize:13,lineHeight:1.55,color:C.ink}}>{tx}</div>{n&&<div style={{fontSize:11,color:C.mid,marginTop:3}}>{n}</div>}</div>
            </div>
          ))}
        </Card>
        <Btn v="lav" full onClick={()=>{toast("Guión copiado!");fireAch&&fireAch("¡Guión listo para grabar!",C.green);}}>Copiar guión completo</Btn>
      </>}
    </div>
  );
}

function PanelEditor({toast}){
  const [sel,setSel]=useState(0);
  const [editing,setEditing]=useState(false);
  const [custom,setCustom]=useState({});
  const tpls=[
    {bg:"linear-gradient(135deg,#3D2FA8,#8B78E8)",lbl:"Propiedad oscuro",tag:"Popular",tagc:C.lav3,tagbg:C.lav4,fields:{eyebrow:"PALERMO · DEPTO",title:"65m² con vista al parque",price:"USD 125.000"},light:false},
    {bg:"#fff",lbl:"Educativo claro",tag:"Nuevo",tagc:C.lime3,tagbg:C.limed,fields:{eyebrow:"TIP DEL DÍA",title:"La orientación del depto vale tanto como los m²",price:""},light:true},
    {bg:"linear-gradient(135deg,#C8E03A,#8FA820)",lbl:"Datos de mercado",tag:"Viral",tagc:C.amber,tagbg:C.amberd,fields:{eyebrow:"PRECIO M²",title:"USD 2.400",price:"Palermo · Junio 2025"},light:true},
    {bg:C.ink,lbl:"Caso de éxito",tag:"Convierte",tagc:C.green,tagbg:C.greend,fields:{eyebrow:"🏆",title:"Vendido en 18 días",price:"Palermo"},light:false},
  ];
  const t=tpls[sel];
  const f=custom[sel]||t.fields;
  const setField=(k,v)=>setCustom(c=>({...c,[sel]:{...(c[sel]||t.fields),[k]:v}}));
  const txtCol = t.light ? C.ink : "#fff";
  const subCol = t.light ? "rgba(0,0,0,.55)" : "rgba(255,255,255,.55)";

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"panelIn .4s cubic-bezier(.4,0,.2,1) both"}}>
      <div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Diseño</div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {tpls.map((tp,i)=>(
          <div key={i} onClick={()=>{setSel(i);setEditing(false);toast("Plantilla seleccionada");}} style={{border:"2px solid "+(sel===i?C.lav3:C.brd),borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:sel===i?"0 0 0 3px rgba(91,74,196,.15)":"none",transform:sel===i?"scale(1.02)":"scale(1)",transition:"all .25s"}}>
            <div style={{background:tp.bg,aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:6,padding:14}}>
              <div style={{fontSize:10,fontWeight:700,color:tp.light?"rgba(0,0,0,.5)":"rgba(255,255,255,.5)",letterSpacing:"0.1em"}}>{tp.fields.eyebrow}</div>
              <div style={{fontSize:13,fontWeight:700,color:tp.light?C.ink:"#fff",textAlign:"center",lineHeight:1.3}}>{tp.fields.title}</div>
              {tp.fields.price&&<div style={{fontSize:12,color:tp.light?subCol:C.lime,fontWeight:600}}>{tp.fields.price}</div>}
            </div>
            <div style={{fontSize:11,fontWeight:600,padding:"7px 10px",background:C.sf,display:"flex",justifyContent:"space-between",alignItems:"center",color:C.ink}}>
              {tp.lbl}<span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",padding:"2px 5px",borderRadius:6,background:tp.tagbg,color:tp.tagc}}>{tp.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* EDITOR INLINE */}
      <Card sx={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"10px 16px",borderBottom:"1.5px solid "+C.brd,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted}}>Vista previa</div>
          <Btn v={editing?"lime":"ghost"} sm onClick={()=>setEditing(e=>!e)}>{editing?"✓ Listo":"✎ Editar texto"}</Btn>
        </div>
        <div style={{background:t.bg,padding:"34px 20px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10,position:"relative"}}>
          {editing ? (
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8,animation:"fadeUp .3s ease both"}}>
              <input value={f.eyebrow} onChange={e=>setField("eyebrow",e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.16)",border:"1.5px dashed "+(t.light?"rgba(0,0,0,.25)":"rgba(255,255,255,.4)"),borderRadius:8,padding:"6px 9px",fontSize:11,fontWeight:700,letterSpacing:"0.08em",color:txtCol,textAlign:"center",outline:"none",fontFamily:"DM Sans,sans-serif"}}/>
              <input value={f.title} onChange={e=>setField("title",e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.16)",border:"1.5px dashed "+(t.light?"rgba(0,0,0,.25)":"rgba(255,255,255,.4)"),borderRadius:8,padding:"8px 9px",fontSize:14,fontWeight:700,color:txtCol,textAlign:"center",outline:"none",fontFamily:"DM Sans,sans-serif"}}/>
              {t.fields.price!==undefined&&<input value={f.price} onChange={e=>setField("price",e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.16)",border:"1.5px dashed "+(t.light?"rgba(0,0,0,.25)":"rgba(255,255,255,.4)"),borderRadius:8,padding:"6px 9px",fontSize:12,fontWeight:600,color:t.light?subCol:C.lime,textAlign:"center",outline:"none",fontFamily:"DM Sans,sans-serif"}}/>}
            </div>
          ):(
            <>
              <div style={{fontSize:11,fontWeight:700,color:subCol,letterSpacing:"0.1em"}}>{f.eyebrow}</div>
              <div style={{fontSize:16,fontWeight:700,color:txtCol,textAlign:"center",lineHeight:1.3,maxWidth:260}}>{f.title}</div>
              {f.price&&<div style={{fontSize:13,color:t.light?subCol:C.lime,fontWeight:600}}>{f.price}</div>}
            </>
          )}
        </div>
      </Card>

      <div style={{display:"flex",gap:8}}>
        <Btn v="lime" full onClick={()=>{toast("Diseño guardado en tu galería");}}>Guardar diseño</Btn>
        <Btn v="ghost" full onClick={()=>toast("Abriendo Canva con esta plantilla...")}>Editar en Canva →</Btn>
      </div>
      <Ins v="lav" lbl="Tip de diseño">El formato <strong style={{color:C.lav3}}>oscuro con acento lima</strong> tiene 2.3x más guardados. Podés editar el texto directo acá o abrirlo en Canva para algo más elaborado.</Ins>
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
  const go=()=>{setLoading(true);setTimeout(()=>onDone(),1100);};
  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,background:C.bg,textAlign:"center"}}>
      <div style={{marginBottom:24,animation:"fadeUp .6s ease both"}}><Char1 size={110}/></div>
      <div style={{fontSize:42,fontWeight:700,letterSpacing:-3,color:C.ink,lineHeight:1,marginBottom:10,animation:"fadeUp .6s ease .15s both"}}>fixa<em style={{color:C.lav3,fontStyle:"normal"}}>.</em></div>
      <div style={{fontSize:14,color:C.mid,marginBottom:38,maxWidth:260,lineHeight:1.6,animation:"fadeUp .6s ease .3s both"}}>Tu estrategia de marketing inmobiliario, en 2 minutos al día.</div>
      <div style={{width:"100%",maxWidth:300,display:"flex",flexDirection:"column",gap:10,animation:"fadeUp .6s ease .45s both"}}>
        <button onClick={go} disabled={loading} style={{width:"100%",padding:"13px 16px",borderRadius:100,border:"2px solid "+C.brd,background:C.sf,display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontSize:14,fontWeight:600,color:C.ink,cursor:loading?"default":"pointer",fontFamily:"DM Sans,sans-serif"}}>
          {loading?<Dots/>:<><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6.1 29.6 4 24 4c-7.5 0-13.9 4.3-17.1 10.7z"/><path fill="#4CAF50" d="M24 44c5.5 0 10.3-1.8 13.7-5l-6.3-5.3C29.5 35.4 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.9 39.6 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.7l6.3 5.3C40.9 36.9 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"/></svg>Continuar con Google</>}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:8,margin:"4px 0"}}><div style={{flex:1,height:1,background:C.brd}}/><div style={{fontSize:11,color:C.muted}}>o</div><div style={{flex:1,height:1,background:C.brd}}/></div>
        <button onClick={go} disabled={loading} style={{width:"100%",padding:"13px 16px",borderRadius:100,border:"none",background:C.ink,color:"#fff",fontSize:14,fontWeight:600,cursor:loading?"default":"pointer",fontFamily:"DM Sans,sans-serif"}}>Continuar con email</button>
      </div>
      <div style={{fontSize:11,color:C.muted,marginTop:24,maxWidth:260,lineHeight:1.5,animation:"fadeUp .6s ease .6s both"}}>Al continuar aceptás nuestros Términos y Política de Privacidad.</div>
    </div>
  );
};

// ── PLAN ──────────────────────────────────────────────────────────────────────────
const Plan=({role,onDone})=>{
  const [agentes,setAgentes]=useState(3);
  const isManager=role==="inmobiliaria";
  const total=isManager?18+agentes*18:20;
  return(
    <div style={{height:"100%",overflowY:"auto",padding:"28px 20px",background:C.bg}}>
      <div style={{maxWidth:380,margin:"0 auto",display:"flex",flexDirection:"column",gap:18}}>
        <div style={{textAlign:"center",marginBottom:6}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><Char1 size={70} mood="excited"/></div>
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
  const [toast,showToast]=useToast();
  const [ach,fireAch]=useAchievement();
  const [tabBounce,setTabBounce]=useState(null);

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
    {id:"empresa",lbl:"Equipo",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
  ];
  const isManager = ud.role==="inmobiliaria";
  const managerOrder=["empresa","reservas","comp"];
  const navItems = isManager ? [...managerOrder.map(id=>navItemsAll.find(i=>i.id===id)),...navItemsAll.filter(i=>!managerOrder.includes(i.id))] : navItemsAll;

  return(
    <div style={{width:"100%",height:"100vh",background:"radial-gradient(circle at 30% 20%,#241B4D 0%,#15102E 55%,#0D0920 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{`html,body,#root{margin:0;padding:0;width:100%;height:100%;}`}</style>
      <div style={{width:"100%",height:"100vh",maxHeight:932,background:C.bg,position:"relative",overflow:"hidden",fontFamily:"DM Sans,sans-serif",maxWidth:430,boxShadow:"0 30px 90px rgba(0,0,0,.45)",borderRadius:0}}>
      <style>{css}</style>

      <AchievementToast a={ach}/>

      {/* Orbs */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,124,232,.14) 0%,transparent 70%)",top:-150,right:-100,animationName:"pulse",animationDuration:"20s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
        <div style={{position:"absolute",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,224,58,.1) 0%,transparent 70%)",bottom:-90,left:-70,animationName:"pulse",animationDuration:"15s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:"6s"}}/>
      </div>

      {/* SPLASH */}
      {screen==="splash"&&(
        <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,animation:"fadeUp .6s ease both"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",position:"relative",zIndex:1}}>
            <div style={{marginBottom:24}}>
              <Char1 size={130}/>
            </div>
            <div style={{fontSize:58,fontWeight:700,letterSpacing:-4,color:C.ink,lineHeight:1,animation:"fadeUp .8s cubic-bezier(.34,1.56,.64,1) .3s both"}}>
              fixa<em style={{color:C.lav3,fontStyle:"normal"}}>.</em>
              <span style={{display:"inline-block",width:12,height:12,borderRadius:"50%",background:C.lime,marginLeft:3,animationName:"pulse",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",verticalAlign:"middle"}}/>
            </div>
            <div style={{fontSize:16,color:C.mid,marginTop:12,maxWidth:260,lineHeight:1.6,animation:"fadeUp .6s ease .9s both"}}>Tu estrategia de marketing inmobiliario, en 2 minutos al día.</div>
            <div style={{marginTop:44,animation:"fadeUp .6s ease 1.2s both"}}>
              <Btn v="lav" onClick={()=>setScreen("login")} sx={{padding:"14px 38px",fontSize:16}}>Empezar →</Btn>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN */}
      {screen==="login"&&(
        <div style={{position:"absolute",inset:0,zIndex:10}}>
          <Login onDone={()=>setScreen("onboarding")}/>
        </div>
      )}

      {/* ONBOARDING */}
      {screen==="onboarding"&&(
        <div style={{position:"absolute",inset:0,zIndex:10}}>
          <Onboarding onDone={(data)=>{setUd(data);setScreen("plan");}}/>
        </div>
      )}

      {/* PLAN */}
      {screen==="plan"&&(
        <div style={{position:"absolute",inset:0,zIndex:10}}>
          <Plan role={ud.role} onDone={()=>{if(ud.role==="inmobiliaria")setPanel("empresa");setScreen("scan");}}/>
        </div>
      )}

      {/* SCAN */}
      {screen==="scan"&&(
        <div style={{position:"absolute",inset:0,zIndex:10}}>
          <Scan zona={ud.zona} onDone={()=>setScreen("app")}/>
        </div>
      )}

      {/* APP */}
      {screen==="app"&&(
        <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",flexDirection:"column"}}>
          {/* Topbar */}
          <div style={{height:56,background:"rgba(255,255,255,.96)",backdropFilter:"blur(24px)",borderBottom:"1px solid "+C.brd,display:"flex",alignItems:"center",padding:"0 16px",gap:9,flexShrink:0,zIndex:40}}>
            <div style={{fontSize:16,fontWeight:700,letterSpacing:-1,flexShrink:0,color:C.ink}}>fixa<em style={{color:C.lav3,fontStyle:"normal"}}>.</em></div>
            <div onClick={()=>setPanel("perfil")} style={{display:"flex",flexDirection:"column",flex:1,minWidth:0,cursor:"pointer"}}>
              <div style={{fontSize:10,color:C.muted,lineHeight:1}}>{greet}</div>
              <div style={{fontSize:13,fontWeight:600,letterSpacing:-0.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:C.ink}}>{ud.nombre}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,background:C.sund,border:"1.5px solid rgba(245,208,96,.4)",borderRadius:100,padding:"3px 9px",fontSize:11,fontWeight:700,color:C.amber,flexShrink:0}}>🔥 {streak}</div>
            <div onClick={()=>setPanel("perfil")} style={{fontSize:8,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 9px",borderRadius:100,background:C.limed,color:C.lime3,flexShrink:0,cursor:"pointer",whiteSpace:"nowrap"}}>6 días trial</div>
            <div onClick={()=>setPanel("alertas")} style={{width:30,height:30,borderRadius:"50%",background:C.s2,border:"1.5px solid "+C.brd,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,position:"relative",flexShrink:0}}>
              🔔
              <div style={{position:"absolute",top:1,right:1,width:7,height:7,borderRadius:"50%",background:C.red,border:"1.5px solid white"}}/>
            </div>
          </div>

          {/* Content */}
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
            {panel==="perfil"&&<PanelPerfil ud={ud} setUd={setUd} toast={showToast} isManager={isManager} onLogout={()=>{setScreen("splash");setPanel("dash");}}/>}
          </div>

          {/* Nav */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:70,background:"rgba(255,255,255,.97)",backdropFilter:"blur(24px)",borderTop:"1px solid "+C.brd,zIndex:40,overflowX:"auto",display:"flex",alignItems:"center",padding:"0 4px",gap:1}}>
            {navItems.map(item=>(
              <div key={item.id} onClick={()=>changePanel(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",flexShrink:0,minWidth:56,padding:"6px 3px",borderRadius:12,position:"relative",background:panel===item.id?C.lav4:"transparent",transition:"background .25s",animationName:tabBounce===item.id?"tabPop":"none",animationDuration:".4s",animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)"}}>
                <div style={{width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",color:panel===item.id?C.lav3:C.muted,transition:"color .25s"}}>{item.ic}</div>
                <div style={{fontSize:9,fontWeight:panel===item.id?600:500,color:panel===item.id?C.lav3:C.muted,whiteSpace:"nowrap"}}>{item.lbl}</div>
                {item.pro&&<div style={{position:"absolute",top:3,right:"calc(50% - 22px)",fontSize:7,fontWeight:700,background:C.lime,color:C.ink,padding:"1px 3px",borderRadius:5}}>PRO</div>}
                {item.badge&&<div style={{position:"absolute",top:4,right:"calc(50% - 18px)",width:7,height:7,borderRadius:"50%",background:C.red,border:"2px solid white"}}/>}
              </div>
            ))}
          </div>

          {/* FAB CHATBOT */}
          <div style={{position:"absolute",bottom:96,right:16,zIndex:50}}>
            {/* Ripple rings */}
            <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid "+C.lav3,animationName:"ripple",animationDuration:"2s",animationTimingFunction:"ease-out",animationIterationCount:"infinite"}}/>
            <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid "+C.lav3,animationName:"ripple",animationDuration:"2s",animationTimingFunction:"ease-out",animationIterationCount:"infinite",animationDelay:"0.6s"}}/>
            <button onClick={()=>setChatOpen(true)} style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,"+C.lav3+","+C.lav+")",border:"none",boxShadow:"0 6px 22px rgba(91,74,196,.45)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",zIndex:1,animationName:"floatBtn",animationDuration:"3s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}>
              <div style={{animationName:"bobS",animationDuration:"3s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}>
                <Char1 size={32} anim={false}/>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* CHATBOT MODAL */}
      {chatOpen&&<Chatbot ud={ud} onClose={()=>setChatOpen(false)}/>}

      {/* Toast */}
      <div style={{position:"fixed",bottom:82,left:"50%",transform:"translateX(-50%) translateY("+(toast.on?"0":"20px")+")",background:C.ink,color:"#fff",padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,zIndex:9999,opacity:toast.on?1:0,transition:"all .3s cubic-bezier(.34,1.4,.64,1)",whiteSpace:"nowrap",pointerEvents:"none"}}>
        {toast.msg}
      </div>
      </div>
    </div>
  );
}
