import { useState, useEffect, useRef } from "react";

const C={bg:"#EEEAF8",sf:"#fff",s2:"#F5F2FC",s3:"#EDE8F9",ink:"#16112C",mid:"#6A5A88",muted:"#B0A2CC",brd:"#DDD5F0",lav:"#8B7CE8",lav2:"#C9BFF5",lav3:"#5B4AC4",lav4:"#EDE7FF",lime:"#C8E03A",lime3:"#8FA820",limed:"#EFF9E0",peach:"#F5A57A",peachd:"#FEF0E8",peachk:"#B05820",sky:"#5BC8E8",skyd:"#E6F7FC",skyk:"#1878A0",mint:"#7AD4A0",mintd:"#E8F8EE",sund:"#FEF8E0",red:"#E8622A",redd:"#FDEEE8",green:"#3A8A58",greend:"#E8F5EE",amber:"#C48A10",amberd:"#FEF5DC"};

const css=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{display:none}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
@keyframes bobS{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(91,74,196,.4)}50%{box-shadow:0 0 0 10px rgba(91,74,196,0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes slide{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes wink{0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(.05)}}
@keyframes scanLn{0%{top:-2px;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes dotB{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}
@keyframes chatIn{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes floatBtn{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-4px) scale(1.04)}}
@keyframes ripple{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2.4);opacity:0}}
`;

// ── SVG CHARS (reales de Illustrator) ─────────────────────────────────────────────
const Char1=({size=80,anim=true})=>(
  <svg width={size} height={size} viewBox="0 0 661.78 666.82" style={anim?{animationName:"bob",animationDuration:"3.5s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}:{}}>
    <path fill="#5b4ac4" d="M264.85,530.01c-56.86-21.27-123.07,62.29-210.36,22.7-44.41-20.14-47.71-70.94-24.61-110.46l34.58-59.16c10.24-17.51,14.24-39.82,7.62-59.4-6.62-19.6-21.49-34.82-36.97-48.1C7.92,252.27-5.77,220.01,2.3,183.93c4.54-20.3,12.75-42.05,30.36-54.97,33.59-24.65,79.45-28.2,116.35-10.44l57.99,27.9c14.83,7.14,33.03,8.9,46.77-1.23,32.36-23.88,57-71.09,92.33-103.98C389.54.78,445.43-16.33,491.05,19.67c21.3,16.82,34.12,44.04,32.59,74.31-2.25,44.27-32.59,89.74,18.68,121.78,28,17.49,55.23,33.83,77.48,58.77,43.06,48.28,56.62,118.07,23.52,174.95-12.92,22.19-37.41,37.05-60.3,47.15-61.9,27.32-43.18,77.22-56.93,117.07-7.28,21.09-20.56,36.2-41.97,44.28-42.55,16.05-93.19,10.35-129.57-18.07-37.64-29.4-43.64-92.68-89.69-109.9Z"/>
    <circle fill="#fefefe" cx="203.32" cy="354.24" r="72.23" style={{animationName:"wink",animationDuration:"5s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",transformOrigin:"203px 354px"}}/>
    <circle fill="#111" cx="203.5" cy="354.01" r="33.25"/>
    <circle fill="#fefefe" cx="421.01" cy="349.06" r="72.08" style={{animationName:"wink",animationDuration:"5s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:"0.1s",transformOrigin:"421px 349px"}}/>
    <circle fill="#111" cx="421.35" cy="349.17" r="33.14"/>
  </svg>
);

const Char2=({size=80,anim=true})=>(
  <svg width={size} height={size} viewBox="0 0 638.89 677.35" style={anim?{animationName:"bob",animationDuration:"3.2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}:{}}>
    <path fill="#c8e03a" d="M288.9,677.35c-37.86-41.29-66.34-85.29-95.05-132.83-29.24,22.02-57.09,40.2-86.55,58.9-26.2,16.63-50.09,34.58-77.9,48.26-4.48,1.64-9.14,2.31-13.17,1.07-4.4-1.35-6.27-6.88-4.45-13.17,18.31-63.24,51-119.34,92.76-170.08C62.03,431.51,27.71,389.59,0,339c30.35-20.24,63.29-30.55,98.67-35.96-7.37-51.91-21.85-99.81-35.87-149.4-6.37-22.54-12.41-44.53-11.04-68.61,25.03,12.2,41.88,28.17,61.92,43.02l131.32,97.38,30.88-86.65c17.22-48.31,38.73-93.72,69.52-138.78l65.44,221.27c61.06-19.8,119.93-33.71,182.75-37.62l-82.31,152.05,65.53,32.47c20.85,10.33,60.62,45.98,62.07,65.2.24,3.2-2.96,9.06-7.95,10.62-53.72,16.87-107.55,28.73-164.02,31.14l43.84,118.86,13.61,45.28c.08,5.57-1.93,10.5-5.72,12.6-4.23,2.34-8.37.43-13.1-2.56-56.42-35.64-110.91-71.22-164.45-114.45-12.15,48.55-27.41,94.31-52.18,142.5Z"/>
    <path d="M396.17,476.1c-10.13,3.95-16.64-4.54-22.03-12.17-25.69-36.38-27.72-105.01-8.92-144.86,5.63-11.94,16.79-32.81,31.02-30.13,55.29,31.86,52.29,160.63-.07,187.16Z"/>
    <path fill="#000100" d="M247.07,478.03c-10.12,4.02-16.26-4.79-21.52-12.47-25.38-37.04-27.85-104.18-8.82-144.48,5.59-11.84,16.64-32.53,30.79-29.78,12.76,7.54,21.64,17.45,27.74,31.39,18.95,43.33,17.41,93.32-5.23,134.96-5.38,9.9-12.92,17.69-22.96,20.38Z"/>
    <path fill="#fefefd" d="M396.24,288.94c-44.28,32.03-46.91,112.4-23.16,162.06,5.29,11.06,12.83,20.01,23.09,25.1-6.25,3.16-11.52,7.46-20.2,5.67-54.49-11.24-69.33-100.68-43.59-160,12.5-28.81,37.56-47.98,63.85-32.83Z"/>
    <path fill="#fefefe" d="M247.51,291.29c-43.9,31.54-46.38,111.66-23.52,160.12,5.56,11.78,12.89,21.51,23.07,26.62-18.95,14.28-46.95-.05-59.14-23.97-23.63-46.4-22.05-103.69,5.76-147.13,12.7-19.84,34.82-26.86,53.83-15.64Z"/>
  </svg>
);

const Char3=({size=80,anim=true})=>(
  <svg width={size} height={size*780.43/1827.07} viewBox="0 0 1827.07 780.43" style={anim?{animationName:"bob",animationDuration:"4s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}:{}}>
    <path fill="#e8622a" d="M420.86,642.42c-111.72,34.23-255.91,24.78-344.55-57.23-34.38-31.81-59.93-72.41-66.8-119.36L0,327.9c.72-94.86,38.56-185.1,107.24-249.22,117.33-109.55,351.22-101.19,468.94,3.27,36.12,32.05,56.91,75.8,66.97,123.36,26.58,125.64-8.25,256.41-93.36,352.47-35.01,39.52-78.49,69.18-128.93,84.64Z"/>
    <g>
      <path d="M361.57,270.14c-10.67-9.03,2.09-28.27,9.31-38.02,37.76-50.99,125.09-50.66,161.01,2.25,6.74,9.92,18.6,29.53,7.59,37.95-.24,2.12,1.03,5.46-.5,10.74l-177.05.17c-1.65-5.49-.54-8.84-.36-13.09Z" style={{animationName:"wink",animationDuration:"4.5s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",transformOrigin:"451px 270px"}}/>
      <path fill="#fdfcfc" d="M539.47,272.32c-6.08-42.37-42.5-70.21-85.73-71.23-44.36-1.05-84.12,25.33-92.18,69.05-.9,4.89-1.38,8.67-3.44,10.58-3.86,3.58-10.87,3.64-19.19,1.38-1.42-19.42,2.49-43.55,16.03-61.31,41.74-54.76,119.1-62.18,172.09-18.3,24.13,19.98,34.86,51.07,34.52,80.12-7.64,1.63-13,1.28-17.15-.38-2.69-1.07-4.3-5.35-4.96-9.91Z"/>
    </g>
    <g>
      <path d="M109.32,282.73c-11.86-7.38-2.13-29.56,3.7-40.33,31.83-58.84,122.04-64.3,164.1-13.98,7.94,9.5,22.27,30.81,10.68,39.72l2.86,10.91c5.75.78,5.26,2.01-1.48,3.72l-179.85-.04Z" style={{animationName:"wink",animationDuration:"4.5s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:"0.15s",transformOrigin:"196px 280px"}}/>
      <path fill="#fdfdfc" d="M289.17,282.76l1.48-3.72-2.86-10.91c-3.15-21.35-15.9-40.39-35.93-52.53-34.25-20.77-79.1-19.79-111,4.4-20.72,15.71-30.67,38.7-31.56,62.73-6.5,0-11.75,1.16-19.02-.88.46-32.52,12.6-63.18,38.81-83.59,42.42-33.04,103.93-32.46,145.38,1.01,26.01,21,40.18,50.17,37.65,82.65l-22.96.85Z"/>
      <path fill="#ea632f" d="M287.8,268.14c2.55,3.08,2.94,6.97,2.86,10.91-3.61-2.19-3.82-7.04-2.86-10.91Z"/>
    </g>
  </svg>
);

const Char4=({size=80,anim=true})=>(
  <svg width={size} height={size*821.07/1854} viewBox="0 0 1854 821.07" style={anim?{animationName:"bob",animationDuration:"3.8s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}:{}}>
    <path fill="#3a8a58" d="M391.78,738.92c-75.87,2.53-222.78,10.48-271.55-12.24-30.94-14.41-59.68-34.22-83.52-57.11-39.44-37.86-34.56-93.32,5.84-127.63,24.54-20.84,52.36-33.12,85.15-45.21-53.02-7.87-113.05-27.41-125.21-80.95-9.97-43.89,11.02-88.31,46.37-113.51,23.81-16.97,47.24-26.38,76.92-34.21-39.66-8.79-73.91-24.29-92.5-59.17-15.48-29.02-5.65-64.74,15.83-89.87,27.75-32.47,64.15-54.87,104.68-70.74C243.1,13.27,337.43-3.66,433.84.66c76.58,3.43,162.3,41.23,181.98,115.14,6.19,23.25-1,40.83-18.51,55.39-26.48,22.01-56.57,36.66-87.29,51.96,47.98,2.53,90.78,8.79,130.74,30.62,60.91,31.95,81.29,108.73,42.88,165.62-40.93,32.82-86.27,49.36-140.35,63.92,43.85,11.37,80.81,29.38,117.51,54.53,18.11,12.41,36.7,22.14,42.42,46.21,6.92,29.13-.26,63.86-23.73,84.53-29.89,26.32-66.71,38.32-104.87,47.34-60.36,14.27-118.54,20.85-182.86,22.99Z"/>
    <g>
      <path fill="#fefdfe" d="M434.1,536.3c-20,9.06-38.84-4.77-48.16-21.01-46.51-81.05-20.29-220.77,33.38-224.08,71.92-4.44,86.3,212.68,14.78,245.09Z" style={{animationName:"wink",animationDuration:"4.8s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",transformOrigin:"420px 420px"}}/>
      <path fill="#010101" d="M422.18,352.19c39.2.27,40.04,125.14.04,125.01-42.41-.13-39.91-125.28-.04-125.01Z"/>
    </g>
    <g>
      <path fill="#fefefe" d="M285.89,533.45c-15.02,19.03-38.5,20.5-54.29,4.52-59.4-60.15-37.7-232.21,23.51-235.47,59.14-3.15,85.15,162.06,30.78,230.95Z" style={{animationName:"wink",animationDuration:"4.8s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite",animationDelay:"0.2s",transformOrigin:"256px 420px"}}/>
      <path fill="#010101" d="M256.63,363.48c39.5-.24,40.86,124.1-.07,125.33-41.07,1.23-40.8-125.08.07-125.33Z"/>
    </g>
    <path fill="#c8e03a" d="M280,620 Q350,660 430,620" stroke="none"/>
  </svg>
);

// ── HELPERS ───────────────────────────────────────────────────────────────────────
let _tt;
function useToast(){
  const [t,setT]=useState({msg:"",on:false});
  const show=(msg)=>{setT({msg,on:true});clearTimeout(_tt);_tt=setTimeout(()=>setT(x=>({...x,on:false})),3400);};
  return [t,show];
}

const Btn=({children,v="lav",sm,full,onClick,sx={}})=>{
  const styles={lav:{bg:C.lav3,col:"#fff",bdr:"none"},lime:{bg:C.lime,col:C.ink,bdr:"none"},ghost:{bg:"transparent",col:C.ink,bdr:"2px solid "+C.brd}};
  const s=styles[v];
  return <button onClick={onClick} style={{background:s.bg,color:s.col,border:s.bdr,borderRadius:100,fontFamily:"DM Sans,sans-serif",padding:sm?"5px 12px":full?"13px 16px":"10px 22px",fontSize:sm?12:14,fontWeight:600,cursor:"pointer",width:full?"100%":undefined,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5,...sx}}>{children}</button>;
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
  <div style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:16,padding:13}}>
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
const Loading=({txt})=>(
  <div style={{display:"flex",alignItems:"center",gap:12,padding:16,background:C.lav4,borderRadius:16,fontSize:13,color:C.mid}}>
    <Dots/>{txt}
  </div>
);

// ── CHATBOT ───────────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Que publico hoy?",
  "Como mejorar mi engagement?",
  "Ideas para Reels esta semana",
  "Como analizar mi competencia?",
  "Que hashtags usar en Palermo?",
  "Como consigo mas leads?",
];

const RESPONSES = {
  "que publico": "Para hoy te recomiendo un Reel corto de 30 segundos mostrando un tip de compra. Tu audiencia responde mejor al contenido educativo que a mostrar propiedades directamente. El guion ya esta listo en el panel Guion.",
  "engagement": "Tus posts con pregunta al final tienen 4x mas engagement. Tambien publicas demasiado los lunes — tus mejores dias son martes y jueves entre 18 y 19hs. Probas cambiar tu calendario?",
  "reels": "Esta semana hay 3 temas viralizando en tu zona: orientacion de departamentos, precios por m² actualizados y tours de barrio. El de orientacion tiene menos competencia y tu ya tenes el guion listo.",
  "competencia": "Tu competidor mas fuerte es @propiedades.palermo con score 87. Su punto debil: nunca publica contenido educativo. Ahi esta tu ventaja. Te preparo un analisis completo?",
  "hashtags": "Para Palermo los hashtags con mejor alcance son: #palermo #departamentospalermo #comprardepto #viviendasbuenosaires #mercadoinmobiliario. Evita los muy genericos como #inmobiliaria que tienen demasiada competencia.",
  "leads": "Tus ultimos 3 leads vinieron del Instagram. El patron: posts educativos con pregunta al final + respuesta rapida a los comentarios. El Autoresponder Pro puede automatizar eso y multiplicarlo.",
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (m.includes(key.split(" ")[0]) || m.includes(key.split(" ")[1] || "")) return val;
  }
  return "Buena pregunta! Para darte la mejor respuesta necesito saber un poco mas del contexto. Podes contarme mas sobre lo que necesitas? Tambien podes explorar los paneles de Ideas, Calendario o Competencia para inspirarte.";
}

function Chatbot({ud,onClose}){
  const [msgs,setMsgs]=useState([{role:"bot",text:"Hola "+ud.nombre.split(" ")[0]+"! Soy tu asistente de marketing. En que te puedo ayudar hoy?"}]);
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
  const [ig,setIg]=useState("");
  const [props,setProps]=useState([]);
  const [precio,setPrecio]=useState("");
  const [goal,setGoal]=useState(null);

  const next=(n)=>{if(n===3&&(!nom.trim()||!zona.trim())){alert("Completa nombre y zona");return;}setStep(n);};
  const finish=(g)=>{setGoal(g);setTimeout(()=>onDone({nombre:nom||"Maria Garcia",zona:zona||"Palermo",ig:ig||"@usuario",role,goal:g}),400);};
  const pOpts=["Departamentos","Casas","PHs","Locales","Oficinas","Terrenos","Emprendimientos","Alquileres"];
  const prOpts=["- USD 80k","USD 80-150k","USD 150-300k","+ USD 300k"];

  return(
    <div style={{height:"100%",overflowY:"auto",padding:"24px 20px",background:C.bg,fontFamily:"DM Sans,sans-serif"}}>
      <div style={{maxWidth:420,margin:"0 auto"}}>
        <div style={{display:"flex",gap:5,marginBottom:28}}>
          {[1,2,3,4].map(p=><div key={p} style={{height:4,borderRadius:4,background:p<step?C.lav3:p===step?C.lav:C.brd,flex:p===step?2:1,transition:"all .4s"}}/>)}
        </div>

        {step===1&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:18,display:"flex",justifyContent:"center"}}><Char1 size={90}/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>Como usas Fixa?</div>
            <div style={{fontSize:14,color:C.mid,lineHeight:1.65,marginBottom:22}}>Personalizamos tu experiencia desde el primer dia.</div>
            {[{id:"agente",n:"Agente independiente",d:"Trabajo por mi cuenta o en una inmobiliaria",bg:C.lav4,ic:"🏠"},{id:"inmobiliaria",n:"Inmobiliaria / Equipo",d:"Gestiono varios agentes y quiero ver el equipo",bg:C.limed,ic:"🏢"},{id:"developer",n:"Desarrolladora",d:"Vendemos proyectos propios o emprendimientos",bg:C.peachd,ic:"🏗"}].map(o=>(
              <div key={o.id} onClick={()=>{setRole(o.id);setTimeout(()=>next(2),350)}} style={{background:role===o.id?C.lav4:C.sf,border:"2px solid "+(role===o.id?C.lav3:C.brd),borderRadius:18,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:13,marginBottom:10,transition:"all .28s"}}>
                <div style={{width:48,height:48,borderRadius:14,background:o.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{o.ic}</div>
                <div><div style={{fontSize:15,fontWeight:600,color:C.ink}}>{o.n}</div><div style={{fontSize:12,color:C.mid,lineHeight:1.4,marginTop:2}}>{o.d}</div></div>
              </div>
            ))}
          </div>
        )}

        {step===2&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:18,display:"flex",justifyContent:"center"}}><Char2 size={90}/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>Tu zona y tu perfil</div>
            <div style={{fontSize:14,color:C.mid,lineHeight:1.65,marginBottom:20}}>Esto activa el analisis automatico de tu competencia.</div>
            {[{val:nom,set:setNom,ph:"Tu nombre (ej: Maria Garcia)"},{val:zona,set:setZona,ph:"Zona principal (ej: Palermo, CABA)",ic:"📍"},{val:ig,set:setIg,ph:"Tu @ de Instagram",ic:"📷"}].map((f,i)=>(
              <div key={i} style={{position:"relative",marginBottom:10}}>
                <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={{width:"100%",padding:"13px 40px 13px 16px",border:"2px solid "+C.brd,borderRadius:14,fontFamily:"DM Sans,sans-serif",fontSize:15,background:C.sf,color:C.ink,outline:"none"}}/>
                {f.ic&&<span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{f.ic}</span>}
              </div>
            ))}
            <Btn v="lav" full onClick={()=>next(3)} sx={{marginTop:6}}>Continuar</Btn>
            <div onClick={()=>next(1)} style={{marginTop:14,fontSize:13,color:C.muted,cursor:"pointer",textAlign:"center"}}>Volver</div>
          </div>
        )}

        {step===3&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Char3 size={90}/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>Que propiedades manejas?</div>
            <div style={{fontSize:14,color:C.mid,marginBottom:18}}>Podas elegir varias.</div>
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
            <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><Char4 size={90}/></div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:-1,marginBottom:8,color:C.ink}}>Cual es tu objetivo?</div>
            <div style={{fontSize:14,color:C.mid,lineHeight:1.65,marginBottom:22}}>Solo uno. Con eso Fixa prioriza todo.</div>
            {[{id:"leads",ic:"🎯",n:"Conseguir mas leads",d:"Quiero que lleguen mas consultas por mis propiedades",bg:C.limed},{id:"marca",ic:"✨",n:"Construir mi marca personal",d:"Quiero ser reconocida como experta en mi zona",bg:C.lav4},{id:"consistencia",ic:"📅",n:"Publicar con consistencia",d:"Quiero un sistema que me diga que publicar cada dia",bg:C.peachd}].map(o=>(
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
function PanelDash({ud,toast,setPanel,streak}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div onClick={()=>setPanel("hoy")} style={{background:"linear-gradient(140deg,#3D2FA8 0%,#6B5ACC 55%,#8B78E8 100%)",borderRadius:24,padding:22,position:"relative",overflow:"hidden",cursor:"pointer"}}>
        <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,.07)",right:-50,top:-60,animationName:"pulse",animationDuration:"4s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",marginBottom:8,position:"relative",zIndex:1}}>Accion del dia</div>
        <div style={{fontSize:17,fontWeight:700,color:"#fff",lineHeight:1.3,marginBottom:6,position:"relative",zIndex:1,maxWidth:"72%"}}>Tu caption de hoy esta listo</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.6)",lineHeight:1.62,marginBottom:14,position:"relative",zIndex:1,maxWidth:"68%"}}>2 minutos y tu post esta publicado. Tu racha de {streak} dias te lo agradece.</div>
        <div style={{display:"flex",gap:8,position:"relative",zIndex:1}}>
          <button onClick={e=>{e.stopPropagation();setPanel("hoy");}} style={{background:C.lime,color:C.ink,border:"none",borderRadius:100,padding:"7px 15px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Ver caption</button>
          <button onClick={e=>{e.stopPropagation();setPanel("guion");}} style={{background:"rgba(255,255,255,.16)",color:"#fff",border:"none",borderRadius:100,padding:"7px 15px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Guion reel</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        <Stat ic="📈" val="4.8k" lbl="Alcance" sub="+12%" c={C.lav3}/>
        <Stat ic="🔥" val={streak} lbl="Racha" sub="record" c={C.lime3}/>
        <Stat ic="💬" val="11" lbl="Leads" sub="3 nuevos" c={C.green}/>
        <Stat ic="🏆" val="#2" lbl="Ranking" c={C.amber}/>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.lav4,border:"1.5px solid "+C.lav2,borderRadius:100,padding:"4px 12px",fontSize:11,fontWeight:600,color:C.lav3}}>📍 {ud.zona} · Analisis activo</div>
        <Btn v="ghost" sm onClick={()=>setPanel("comp")}>Ver competencia</Btn>
      </div>
      <Ins v="peach" lbl="Alerta de competencia">
        <strong style={{color:C.peachk}}>@propiedades.palermo</strong> publico 3 reels esta semana. Engagement +41%. <strong style={{color:C.peachk}}>Momento de contestar.</strong>
      </Ins>
      <Card>
        <CT c="Checklist del dia"/>
        {["Publicar el caption de hoy","Responder comentarios","Ver la competencia"].map(l=>{
          const [d,setD]=useState(false);
          return <div key={l} onClick={()=>setD(!d)} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:12,cursor:"pointer"}}>
            <div style={{width:22,height:22,borderRadius:"50%",border:d?"none":"2.5px solid "+C.brd,background:d?C.mint:C.sf,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",flexShrink:0,transition:"all .3s"}}>{d?"v":""}</div>
            <div style={{fontSize:13,color:d?C.muted:C.ink,textDecoration:d?"line-through":"none"}}>{l}</div>
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
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Publica ahora</div><div style={{fontSize:12,color:C.mid}}>Mejor horario: 18-19hs</div></div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTimeout(()=>setLoad(false),2400);}}>Regenerar</Btn>
      </div>
      {load?<Loading txt={"Generando caption para "+ud.zona+"..."}/>:<>
        <div style={{background:C.lav4,border:"1.5px solid rgba(139,124,232,.22)",borderRadius:16,padding:16}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Caption listo para pegar</div>
          <div style={{fontSize:13,lineHeight:1.72,marginBottom:12,color:C.ink}}>
            Cuando visitas un departamento, probablemente estas mirando las cosas equivocadas.<br/><br/>
            Orientacion, presion del agua, los vecinos... esas son las cosas que no cambian con una mano de pintura.<br/><br/>
            Que cosa te sorprendio en una visita?<br/><br/>
            — {ud.nombre.split(" ")[0]}, agente en {ud.zona} hace 6 anos
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn v="lime" sm onClick={()=>{toast("Caption copiado — publicalo ahora!");markPublished();}}>Copiar y marcar publicado</Btn>
            <Btn v="ghost" sm onClick={()=>toast("Abriendo editor...")}>Editar diseno</Btn>
          </div>
        </div>
        <div style={{background:C.s2,border:"1.5px solid "+C.brd,borderRadius:16,padding:16}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Hashtags</div>
          <div style={{fontSize:13,lineHeight:1.72,marginBottom:10,color:C.lav3}}>#palermo #departamentos #comprardepto #agentesinmobiliarios #consejosdecompra</div>
          <Btn v="ghost" sm onClick={()=>toast("Hashtags copiados")}>Copiar hashtags</Btn>
        </div>
        <Card>
          <CT c="Por que funciona este caption"/>
          {[["1","Empieza con vos.","Hace que quien lo lea sienta que le hablan directamente. +40% de retencion."],["2","Termina con pregunta.","Los comentarios suben el alcance 4x."],["3","La firma construye identidad","de a poco, sin esfuerzo extra."]].map(([n,t,d])=>(
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
    {d:"03",m:"Jun",t:"Post: El mito del dolar blue y el m2",ic:"Posicionarte como experta.",tags:[["Post",C.lav3,C.lav4],["Autoridad",C.green,C.greend]]},
    {d:"06",m:"Jun",t:"Reel: 3 cosas que miras mal al visitar un depto",ic:"Tips filmados en propiedad real.",tags:[["Reel","#B04020",C.redd],["Viral",C.amber,C.amberd]]},
    {d:"08",m:"Jun",t:"Story: Encuesta que te frena a comprar?",ic:"Genera datos de tu audiencia.",tags:[["Story",C.skyk,C.skyd],["Interactivo",C.lime3,C.limed]]},
    {d:"10",m:"Jun",t:"Carrusel: El proceso de compra en 6 pasos",ic:"Alta conversion a consultas.",tags:[["Carrusel",C.lav3,C.lav4],["Convierte",C.green,C.greend]]},
    {d:"13",m:"Jun",t:"Reel: Tour de la zona en 60 segundos",ic:"Del barrio, no de la propiedad.",tags:[["Reel","#B04020",C.redd],["Marca",C.lav3,C.lav4]]},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Ideas del mes</div><div style={{fontSize:12,color:C.mid}}>Junio · Para {ud.zona}</div></div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTimeout(()=>setLoad(false),2400);}}>Generar</Btn>
      </div>
      <Ins v="lav" lbl="Tu ventaja detectada">Tus competidores publican casi solo propiedades. <strong style={{color:C.lav3}}>Ninguno hace contenido educativo.</strong> Ese espacio es tuyo.</Ins>
      {load?<Loading txt={"Generando ideas para "+ud.zona+"..."}/>:
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

function PanelCal({toast,published}){
  const days=[
    {d:26,oth:true},{d:27,oth:true},{d:28,oth:true},{d:29,oth:true},{d:30,oth:true},{d:1},{d:2},
    {d:3,type:"Post",done:true,msg:"Post publicado: El mito del dolar blue"},
    {d:4},{d:5},
    {d:6,type:"Reel",done:true,msg:"Reel publicado: 3 cosas que miras mal"},
    {d:7},{d:8,type:"Story",done:true,msg:"Story publicado: Encuesta"},{d:9},
    {d:10,type:"Carrusel",msg:"Carrusel: Proceso de compra"},{d:11},{d:12},
    {d:13,type:"Reel",today:true,pub:true,msg:"HOY - Reel: Tour de la zona"},
    {d:14},{d:15},{d:16},
    {d:17,type:"Post",msg:"Post: Barrio"},{d:18},{d:19},
    {d:20,type:"Reel",msg:"Reel: Mitos escritura"},{d:21},
    {d:22,type:"Story",msg:"Story: Encuesta precio"},{d:23},
    {d:24,type:"Carrusel",msg:"Carrusel: Expensas"},{d:25},{d:26},
    {d:27,type:"Reel",msg:"Reel: Caso de exito"},{d:28},{d:29},{d:30},
  ];
  const tc={Post:{bg:C.lav4,c:C.lav3},Reel:{bg:C.redd,c:"#B04020"},Story:{bg:C.skyd,c:C.skyk},Carrusel:{bg:C.amberd,c:C.amber}};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Calendario</div><div style={{fontSize:12,color:C.mid}}>Junio 2025</div></div>
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
              <div key={i} onClick={()=>day.msg&&toast(day.msg)}
                style={{minHeight:42,background:isPub?C.limed:day.type?C.sf:C.s2,borderRadius:10,padding:4,cursor:day.msg?"pointer":"default",border:"1.5px solid "+(day.today?C.lav3:isPub?"#C0E870":day.type?C.brd:"transparent"),opacity:day.oth?.2:1,boxShadow:day.today?"0 0 0 2px rgba(91,74,196,.15)":"none"}}>
                <div style={{fontSize:10,fontWeight:700,color:day.today?C.lav3:C.muted,marginBottom:2}}>{day.d}</div>
                {day.type&&<div style={{fontSize:7,fontWeight:700,textTransform:"uppercase",padding:"1px 3px",borderRadius:4,background:isPub?C.limed:col.bg,color:isPub?C.lime3:col.c,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{isPub?day.type+" ok":day.type}</div>}
              </div>
            );
          })}
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[["9",C.lav3,"Planif."],["3",C.green,"Public."],["6",C.amber,"Pend."],["22",C.mid,"Total"]].map(([v,c,l])=>(
          <div key={l} style={{background:C.sf,border:"1.5px solid "+C.brd,borderRadius:16,padding:13}}>
            <div style={{fontSize:26,fontWeight:700,color:c,letterSpacing:-1}}>{v}</div>
            <div style={{fontSize:11,color:C.mid}}>{l}</div>
          </div>
        ))}
      </div>
      <Ins v="lav" lbl="Tu patron ganador">Publicas mas los <strong style={{color:C.lav3}}>martes y jueves</strong>. Esos dias tenes 2.1x mas alcance.</Ins>
    </div>
  );
}

function PanelComp({ud,toast}){
  const [tab,setTab]=useState("perfiles");
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Competencia</div><div style={{fontSize:12,color:C.mid}}>{ud.zona} · hace 3h</div></div>
        <Btn v="lav" sm onClick={()=>toast("Re-escaneando zona...")}>Escanear</Btn>
      </div>
      <div style={{display:"flex",gap:5,background:C.s2,borderRadius:14,padding:4}}>
        {[["perfiles","Perfiles"],["ads","Ads activos"],["tend","Tendencias"]].map(([id,lbl])=>(
          <div key={id} onClick={()=>setTab(id)} style={{flex:1,textAlign:"center",padding:"8px 0",borderRadius:10,fontSize:12,fontWeight:600,cursor:"pointer",background:tab===id?C.sf:"transparent",color:tab===id?C.lav3:C.mid,transition:"all .22s"}}>{lbl}</div>
        ))}
      </div>
      {tab==="perfiles"&&<>
        <Card sx={{padding:0,overflow:"hidden"}}>
          <div style={{padding:16,borderBottom:"1.5px solid "+C.brd}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:13}}>
              <div style={{width:46,height:46,borderRadius:"50%",background:C.redd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#B04020",flexShrink:0}}>PP</div>
              <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:C.ink}}>@propiedades.palermo</div><div style={{fontSize:11,color:C.mid}}>Palermo · Deptos premium</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:9,color:C.muted}}>Score</div><div style={{fontSize:26,fontWeight:700,color:C.red,letterSpacing:-1}}>87</div></div>
            </div>
            <div style={{width:"100%",height:7,background:C.s2,borderRadius:7,overflow:"hidden"}}><div style={{height:"100%",width:"87%",borderRadius:7,background:"linear-gradient(90deg,"+C.lav3+","+C.lav+")"}}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,padding:14,borderBottom:"1.5px solid "+C.brd}}>
            {[["18.4k","Seguidores"],["4.2%","Engagement"],["14","Posts/mes"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:C.ink}}>{v}</div><div style={{fontSize:10,color:C.mid}}>{l}</div></div>
            ))}
          </div>
          <div style={{padding:14}}>
            <CT c="Posts mas exitosos"/>
            {[["🎬","Reel: Mira como quedo este depto","hace 5 dias","+8.2%"],["📸","Post: Vista al parque Las Heras","hace 11 dias","+5.7%"],["📊","Carrusel: Precios m2 Palermo","hace 18 dias","+6.1%"]].map(([ic,t,d,e])=>(
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
          <div style={{fontSize:12,color:C.mid,lineHeight:1.6}}>Ninguno de tus 4 competidores publica <strong style={{color:C.ink}}>contenido educativo</strong>. Ese formato genera 3x mas consultas. <strong style={{color:C.ink}}>Es tu espacio libre.</strong></div>
        </div>
        <Card>
          <CT c={"Otros perfiles en "+ud.zona}/>
          {[["MA","@mariela.agente","9.2k · 2.8%","62",C.skyd,C.skyk],["DP","@deptos.norte","6.8k · 3.1%","58",C.mintd,C.green],["IP","@inmo24","4.1k · 1.4%","41",C.peachd,C.peachk]].map(([av,h,s,sc,bg,col])=>(
            <div key={h} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1.5px solid "+C.brd}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:col,flexShrink:0}}>{av}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.ink}}>{h}</div><div style={{fontSize:11,color:C.mid}}>{s}</div></div>
              <div style={{fontSize:19,fontWeight:700,color:C.amber}}>{sc}</div>
              <Btn v="ghost" sm onClick={()=>toast("Abriendo analisis...")}>Ver</Btn>
            </div>
          ))}
        </Card>
        <div onClick={()=>toast("Ingresa el @usuario de Instagram...")} style={{background:C.sf,border:"2px dashed "+C.brd,borderRadius:20,padding:20,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:28,marginBottom:6}}>+</div>
          <div style={{fontSize:13,fontWeight:600,color:C.mid}}>Agregar competidor que no aparece</div>
        </div>
      </>}
      {tab==="ads"&&<>
        <Ins v="sky" lbl="Meta Ads Library">Detectamos <strong style={{color:C.skyk}}>3 campanas activas</strong> de tu competencia esta semana.</Ins>
        <Card>
          <CT c="Ads activos"/>
          {[{h:"@propiedades.palermo",t:"Video · Trafico",c:"Palermo a precios de antes que suba el dolar.",m:"8 dias activo",active:true},{h:"@mariela.agente",t:"Imagen · Leads",c:"Busca depto en Palermo? Te ayudo.",m:"14 dias activo",active:true},{h:"@deptos.norte",t:"Carrusel · Alcance",c:"Los 5 mejores departamentos en Palermo Norte",m:"Pausado",active:false}].map((ad,i)=>(
            <div key={i} style={{padding:"12px 0",borderBottom:i<2?"1.5px solid "+C.brd:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div style={{fontSize:13,fontWeight:600,color:C.ink}}>{ad.h}</div>
                <span style={{background:ad.active?C.greend:C.amberd,color:ad.active?C.green:C.amber,fontSize:9,fontWeight:700,textTransform:"uppercase",padding:"2px 7px",borderRadius:100}}>{ad.active?"Activo":"Pausado"}</span>
              </div>
              <div style={{fontSize:12,background:C.s2,borderRadius:10,padding:"9px 12px",fontStyle:"italic",color:C.ink}}>{ad.c}</div>
            </div>
          ))}
        </Card>
      </>}
      {tab==="tend"&&<>
        <Card>
          <CT c="Formatos mas usados en la zona"/>
          {[["Reels","48%","#B04020"],["Posts","29%",C.lav3],["Carruseles","15%",C.amber],["Stories","8%",C.sky]].map(([l,p,c])=>(
            <div key={l} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,fontWeight:600,color:C.ink}}>{l}</span><span style={{fontSize:12,color:C.mid}}>{p}</span></div>
              <div style={{height:8,background:C.s2,borderRadius:8,overflow:"hidden"}}><div style={{height:"100%",width:p,background:c,borderRadius:8}}/></div>
            </div>
          ))}
        </Card>
        <Ins v="lime" lbl="Tu ventaja">El contenido educativo tiene el <strong style={{color:C.lime3}}>2do mayor engagement</strong> pero <strong style={{color:C.lime3}}>ningun competidor lo explota</strong>.</Ins>
      </>}
    </div>
  );
}

function PanelReservas({toast}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Reservas</div><div style={{fontSize:12,color:C.mid}}>Tu pipeline personal</div></div>
        <Btn v="lav" sm onClick={()=>toast("Nueva operacion agregada")}>+ Nueva</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        <Stat ic="📋" val="4" lbl="Activas" c={C.lav3}/>
        <Stat ic="✅" val="2" lbl="Cerradas" c={C.green}/>
        <Stat ic="💰" val="480k" lbl="En proceso" c={C.amber}/>
        <Stat ic="🏆" val="220k" lbl="Comision" c={C.mid}/>
      </div>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
        {[{col:"Contacto",cards:[{n:"Lucas Fernandez",p:"Depto 2 amb · Palermo",a:"Visita manana",ac:C.sky,m:"USD 95k"},{n:"Ana Gomez",p:"PH · Villa Crespo",a:"Llamar hoy",ac:C.amber,m:"USD 140k"}]},{col:"Visita",cards:[{n:"Maria Torres",p:"Depto 3 amb · Belgrano",a:"Visita hoy 16hs",ac:C.lav3,m:"USD 175k"}]},{col:"Oferta",cards:[{n:"Carlos Ruiz",p:"Depto 2 amb",a:"Oferta enviada",ac:C.green,m:"USD 110k"}]},{col:"Cerrado",cards:[{n:"Depto Palermo Soho",p:"Venta Junio",a:"",ac:C.green,m:"USD 125k",closed:true}]}].map(({col,cards})=>(
          <div key={col} style={{minWidth:145,flexShrink:0}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.mid,marginBottom:8}}>{col}</div>
            {cards.map(card=>(
              <div key={card.n} onClick={()=>toast(card.n)} style={{background:card.closed?C.greend:C.sf,border:"1.5px solid "+(card.closed?C.greend:C.brd),borderRadius:14,padding:12,marginBottom:8,cursor:"pointer"}}>
                <div style={{fontSize:12,fontWeight:600,color:card.closed?C.green:C.ink,marginBottom:3}}>{card.n}</div>
                <div style={{fontSize:11,color:C.mid}}>{card.p}</div>
                {card.a&&<div style={{fontSize:10,color:card.ac,marginTop:5}}>{card.a}</div>}
                <div style={{fontSize:12,fontWeight:700,color:card.closed?C.green:C.mid,marginTop:4}}>{card.m}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Card>
        <CT c="Evolucion mensual"/>
        <div style={{display:"flex",gap:5,alignItems:"flex-end",height:80,paddingTop:8}}>
          {[["Ene",40,C.lav3],["Feb",55,C.lav3],["Mar",45,C.lav3],["Abr",70,C.lav3],["May",80,C.lav3],["Jun",90,C.lime]].map(([l,h,c])=>(
            <div key={l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{width:"100%",borderRadius:"5px 5px 0 0",background:c,height:h+"%"}}/>
              <div style={{fontSize:9,color:l==="Jun"?C.lime3:C.muted,fontWeight:l==="Jun"?700:400}}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      <Ins v="mint" lbl="Tu mejor mes">Junio es tu <strong style={{color:C.green}}>mes mas activo del ano</strong>. Los leads del Instagram generaron 2 de las 4 operaciones activas.</Ins>
    </div>
  );
}

function PanelGuion({ud,toast}){
  const [load,setLoad]=useState(false);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Guion de reel</div><div style={{fontSize:12,color:C.mid}}>30 segundos · listo para grabar</div></div>
        <Btn v="lav" sm onClick={()=>{setLoad(true);setTimeout(()=>setLoad(false),2400);}}>Nuevo</Btn>
      </div>
      {load?<Loading txt="Generando guion..."/>:<>
        <Card>
          <CT c="3 cosas que miras mal al visitar un depto · 30 seg"/>
          {[["00-03","Cuando visitas un departamento, probablemente estas mirando las cosas equivocadas.","Mira directo a camara."],["03-10","Primera: la orientacion. Un depto orientado al este te va a tener fria la tarde de tu vida, siempre.","Podes senalar una ventana."],["10-18","Segunda: la presion del agua. Abri el grifo de la cocina y del bano al mismo tiempo.","Mostralo si podes."],["18-25","Tercera: los vecinos. El pasillo, el portero, el ascensor. Eso no cambia con una mano de pintura.",""],["25-30","Soy "+ud.nombre.split(" ")[0]+", agente en "+ud.zona+". Si queres saber que mas mirar, escribime.","Pedi que escriban."]].map(([t,tx,n])=>(
            <div key={t} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:"1.5px solid "+C.brd}}>
              <div style={{fontSize:10,fontWeight:700,color:C.lav3,width:42,flexShrink:0,fontFamily:"monospace",paddingTop:2}}>{t}</div>
              <div><div style={{fontSize:13,lineHeight:1.55,color:C.ink}}>{tx}</div>{n&&<div style={{fontSize:11,color:C.mid,marginTop:3}}>{n}</div>}</div>
            </div>
          ))}
        </Card>
        <Btn v="lav" full onClick={()=>toast("Guion copiado!")}>Copiar guion completo</Btn>
      </>}
    </div>
  );
}

function PanelEditor({toast}){
  const [sel,setSel]=useState(0);
  const tpls=[
    {bg:"linear-gradient(135deg,#3D2FA8,#8B78E8)",lbl:"Propiedad oscuro",tag:"Popular",tagc:C.lav3,tagbg:C.lav4,content:()=><><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",letterSpacing:"0.1em"}}>PALERMO - DEPTO</div><div style={{fontSize:14,fontWeight:700,color:"#fff",textAlign:"center",lineHeight:1.3}}>65m2 con vista al parque</div><div style={{fontSize:13,color:C.lime,fontWeight:600}}>USD 125.000</div></>},
    {bg:"#fff",lbl:"Educativo claro",tag:"Nuevo",tagc:C.lime3,tagbg:C.limed,content:()=><><div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.1em"}}>TIP DEL DIA</div><div style={{fontSize:13,fontWeight:700,color:C.ink,textAlign:"center",lineHeight:1.3}}>La orientacion del depto vale tanto como los m2</div></>},
    {bg:"linear-gradient(135deg,#C8E03A,#8FA820)",lbl:"Datos de mercado",tag:"Viral",tagc:C.amber,tagbg:C.amberd,content:()=><><div style={{fontSize:10,fontWeight:700,color:"rgba(0,0,0,.5)",letterSpacing:"0.1em"}}>PRECIO M2</div><div style={{fontSize:22,fontWeight:700,color:C.ink}}>USD 2.400</div><div style={{fontSize:11,color:"rgba(0,0,0,.6)"}}>Palermo - Junio 2025</div></>},
    {bg:C.ink,lbl:"Caso de exito",tag:"Convierte",tagc:C.green,tagbg:C.greend,content:()=><><div style={{fontSize:28}}>🏆</div><div style={{fontSize:13,fontWeight:700,color:"#fff",textAlign:"center"}}>Vendido en 18 dias</div><div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Palermo</div></>},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Diseno</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {tpls.map((t,i)=>(
          <div key={i} onClick={()=>{setSel(i);toast("Plantilla seleccionada");}} style={{border:"2px solid "+(sel===i?C.lav3:C.brd),borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:sel===i?"0 0 0 3px rgba(91,74,196,.15)":"none",transform:sel===i?"scale(1.02)":"scale(1)",transition:"all .25s"}}>
            <div style={{background:t.bg,aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:6,padding:14}}>{t.content()}</div>
            <div style={{fontSize:11,fontWeight:600,padding:"7px 10px",background:C.sf,display:"flex",justifyContent:"space-between",alignItems:"center",color:C.ink}}>
              {t.lbl}<span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",padding:"2px 5px",borderRadius:6,background:t.tagbg,color:t.tagc}}>{t.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <Btn v="lav" full onClick={()=>toast("Abriendo en Canva...")}>Editar en Canva</Btn>
      <Ins v="lav" lbl="Tip de diseno">El formato <strong style={{color:C.lav3}}>oscuro con acento lima</strong> tiene 2.3x mas saves.</Ins>
    </div>
  );
}

function PanelBot({ud,toast}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
      <div><div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,color:C.ink}}>Autoresponder <span style={{fontSize:11,background:C.lime,color:C.ink,padding:"2px 7px",borderRadius:6,verticalAlign:"middle"}}>PRO</span></div><div style={{fontSize:12,color:C.mid}}>Comentario to DM automatico to Lead</div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Stat ic="📩" val="22" lbl="DMs enviados" sub="esta semana" c={C.lav3}/>
        <Stat ic="💚" val="6" lbl="Abrieron WA" sub="27% conversion" c={C.green}/>
      </div>
      <div style={{display:"flex",flexDirection:"column"}}>
        {[{b:C.lav2,ic:"📸",icb:C.lav4,lc:C.lav3,lt:"Disparador",t:"Alguien comenta tu post",d:"Cualquier comentario activa la automatizacion al instante."},{b:C.skyd,ic:"🤖",icb:C.skyd,lc:C.skyk,lt:"Fixa procesa",t:"Detecta y personaliza el DM",d:"En segundos prepara el mensaje con el nombre del usuario."},{b:C.limed,ic:"📩",icb:C.limed,lc:C.lime3,lt:"Accion automatica",t:"DM con ficha + WhatsApp",d:"El interesado recibe la ficha y tu contacto directo."},{b:C.mintd,ic:"✅",icb:C.mintd,lc:C.green,lt:"Resultado",t:"Lead calificado en tu WhatsApp",d:"El interesado ya tiene toda la info."}].map((node,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:"100%",background:C.sf,border:"1.5px solid "+node.b,borderRadius:16,padding:"13px 15px",display:"flex",gap:10,alignItems:"start"}}>
              <div style={{width:34,height:34,borderRadius:10,background:node.icb,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{node.ic}</div>
              <div><div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:node.lc,marginBottom:2}}>{node.lt}</div><div style={{fontSize:13,fontWeight:600,color:C.ink}}>{node.t}</div><div style={{fontSize:11,color:C.mid,lineHeight:1.5,marginTop:3}}>{node.d}</div></div>
            </div>
            {i<3&&<div style={{width:2,height:22,background:"linear-gradient(180deg,"+C.brd+","+C.lav2+")"}}/>}
          </div>
        ))}
      </div>
      <Card>
        <CT c="Preview del DM automatico"/>
        <div style={{background:"#128C7E",borderRadius:16,padding:15}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff"}}>{ud.nombre.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
            <div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{ud.nombre}</div><div style={{fontSize:10,color:"rgba(255,255,255,.6)"}}>Agente Inmobiliaria</div></div>
          </div>
          <div style={{background:"rgba(255,255,255,.15)",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#fff",lineHeight:1.55,marginBottom:8}}>Hola! Gracias por comentar. Te mando la info del depto:</div>
          <div style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:"11px 12px",display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:18}}>🏠</span>
            <div><div style={{fontWeight:600,fontSize:13,color:"#fff"}}>Depto 2 amb · {ud.zona} Soho</div><div style={{opacity:.7,fontSize:11,color:"#fff"}}>65m2 · USD 125.000</div><div style={{color:C.lime,marginTop:4,fontSize:11}}>Ver ficha completa</div></div>
          </div>
          <div style={{background:"rgba(0,0,0,.2)",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#fff",textAlign:"center",fontWeight:600,cursor:"pointer"}}>Escribir por WhatsApp</div>
        </div>
      </Card>
      <Card>
        <CT c="Configuracion activa"/>
        <div style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:C.green,fontWeight:600,marginBottom:14}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:C.green,animationName:"pulse",animationDuration:"2s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}/>
          Conectado · {ud.ig}
        </div>
        <div style={{marginBottom:12}}><div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Link de la ficha</div><input placeholder="https://zonaprop.com/..." style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:13,background:C.sf,color:C.ink,outline:"none"}}/></div>
        <div style={{marginBottom:14}}><div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:7}}>Numero de WhatsApp</div><input placeholder="+54 9 11 xxxx xxxx" style={{width:"100%",padding:"11px 14px",border:"2px solid "+C.brd,borderRadius:12,fontFamily:"DM Sans,sans-serif",fontSize:13,background:C.sf,color:C.ink,outline:"none"}}/></div>
        <Btn v="lime" full onClick={()=>toast("Automatizacion guardada y activa!")}>Guardar configuracion</Btn>
      </Card>
    </div>
  );
}

function PanelAlertas({toast,setPanel}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,animation:"slide .36s ease both"}}>
      <div style={{fontSize:17,fontWeight:700,letterSpacing:-0.5,marginBottom:4,color:C.ink}}>Alertas</div>
      {[{c:C.red,t:"@propiedades.palermo publico 3 veces hoy",d:"Su engagement subio un 41% esta semana.",time:"hace 2h",fn:()=>setPanel("comp")},{c:C.amber,t:"Los reels sobre orientacion estan viralizando",d:"3 publicaciones similares pasaron los 10k views.",time:"hace 5h",fn:()=>toast("Abriendo tendencias...")},{c:C.lav3,t:"Hoy es tu mejor horario para publicar",d:"18 a 19hs · Caption listo.",time:"Ahora",fn:()=>setPanel("hoy")},{c:C.green,t:"Tu ultima publicacion supero el promedio",d:"El post del martes tuvo 4.8% de engagement.",time:"ayer",fn:()=>{}}].map((a,i)=>(
        <div key={i} onClick={a.fn} style={{display:"flex",gap:12,padding:14,background:C.sf,border:"1.5px solid "+C.brd,borderRadius:16,cursor:"pointer"}}>
          <div style={{width:9,height:9,borderRadius:"50%",background:a.c,flexShrink:0,marginTop:4}}/>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,marginBottom:3,color:C.ink}}>{a.t}</div><div style={{fontSize:11,color:C.mid,lineHeight:1.5}}>{a.d}</div></div>
          <div style={{fontSize:10,color:C.muted,flexShrink:0}}>{a.time}</div>
        </div>
      ))}
    </div>
  );
}

function PanelEmpresa({toast}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"slide .36s ease both"}}>
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
        {[["1","MA","Maria Andreozzi",92,C.limed,C.lime3],["2","JP","Juan Perez",78,C.skyd,C.skyk],["3","LG","Laura Gomez",65,C.peachd,C.peachk],["4","RS","Rodrigo Silva",44,C.s2,C.mid],["5","CO","Carla Ortiz",31,C.s2,C.mid]].map(([n,av,name,val,bg,col])=>(
          <div key={name} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid "+C.brd}}>
            <div style={{fontSize:14,fontWeight:700,color:C.muted,width:18,textAlign:"center",flexShrink:0}}>{n}</div>
            <div style={{width:34,height:34,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:col,flexShrink:0}}>{av}</div>
            <div style={{flex:1,fontSize:13,fontWeight:600,color:C.ink}}>{name}</div>
            <div style={{width:80,height:6,background:C.s2,borderRadius:6,overflow:"hidden"}}><div style={{height:"100%",width:val+"%",background:C.lav3,borderRadius:6}}/></div>
            <div style={{fontSize:12,fontWeight:700,color:C.lav3,width:22,textAlign:"right"}}>{val}</div>
          </div>
        ))}
      </Card>
      <Ins v="peach" lbl="Atencion"><strong style={{color:C.peachk}}>Rodrigo y Carla</strong> llevan 9 dias sin publicar. Sus cuentas perdieron alcance organico.</Ins>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────────
export default function Fixa(){
  const [screen,setScreen]=useState("splash");
  const [ud,setUd]=useState({nombre:"Maria Garcia",zona:"Palermo",ig:"@maria.andreozzi",role:"agente",goal:"leads"});
  const [panel,setPanel]=useState("dash");
  const [published,setPublished]=useState(false);
  const [streak,setStreak]=useState(7);
  const [chatOpen,setChatOpen]=useState(false);
  const [toast,showToast]=useToast();

  const markPublished=()=>{setPublished(true);setStreak(s=>s+1);};
  const h=new Date().getHours();
  const greet=h<13?"Buenos dias":h<20?"Buenas tardes":"Buenas noches";

  const navItems=[
    {id:"dash",lbl:"Inicio",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2" opacity=".4"/><rect x="3" y="14" width="7" height="7" rx="2" opacity=".4"/><rect x="14" y="14" width="7" height="7" rx="2" opacity=".4"/></svg>},
    {id:"hoy",lbl:"Rapido",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H11L11 22L19.5 10.5H13L13 2Z"/></svg>},
    {id:"ideas",lbl:"Ideas",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.7 2 6 4.7 6 8c0 2.2 1.2 4.1 3 5.2V15h6v-1.8c1.8-1.1 3-3 3-5.2 0-3.3-2.7-6-6-6Z"/><path d="M9 17h6M10.5 20h3"/></svg>},
    {id:"cal",lbl:"Calendario",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>},
    {id:"comp",lbl:"Competencia",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h3V10H2zM19 20h3V4h-3zM10 20h4V7h-4z"/></svg>},
    {id:"reservas",lbl:"Reservas",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10L12 3L21 10V20H15V14H9V20H3V10Z"/></svg>},
    {id:"editor",lbl:"Diseno",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M9 9v12"/></svg>},
    {id:"guion",lbl:"Guion",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/></svg>},
    {id:"auto",lbl:"Bot",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,pro:true},
    {id:"alertas",lbl:"Alertas",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>,badge:true},
    {id:"empresa",lbl:"Equipo",ic:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
  ];

  return(
    <div style={{width:"100%",height:"100vh",background:C.bg,position:"relative",overflow:"hidden",fontFamily:"DM Sans,sans-serif",maxWidth:430,margin:"0 auto"}}>
      <style>{css}</style>

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
            <div style={{fontSize:16,color:C.mid,marginTop:12,maxWidth:260,lineHeight:1.6,animation:"fadeUp .6s ease .9s both"}}>Tu estrategia de marketing inmobiliario, en 2 minutos al dia.</div>
            <div style={{marginTop:44,animation:"fadeUp .6s ease 1.2s both"}}>
              <Btn v="lav" onClick={()=>setScreen("onboarding")} sx={{padding:"14px 38px",fontSize:16}}>Empezar gratis</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING */}
      {screen==="onboarding"&&(
        <div style={{position:"absolute",inset:0,zIndex:10}}>
          <Onboarding onDone={(data)=>{setUd(data);setScreen("scan");}}/>
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
            <div style={{display:"flex",flexDirection:"column",flex:1,minWidth:0}}>
              <div style={{fontSize:10,color:C.muted,lineHeight:1}}>{greet}</div>
              <div style={{fontSize:13,fontWeight:600,letterSpacing:-0.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:C.ink}}>{ud.nombre}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,background:C.sund,border:"1.5px solid rgba(245,208,96,.4)",borderRadius:100,padding:"3px 9px",fontSize:11,fontWeight:700,color:C.amber,flexShrink:0}}>🔥 {streak}</div>
            <div style={{fontSize:8,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"3px 8px",borderRadius:100,background:C.lav4,color:C.lav3,flexShrink:0}}>Free</div>
            <div onClick={()=>setPanel("alertas")} style={{width:30,height:30,borderRadius:"50%",background:C.s2,border:"1.5px solid "+C.brd,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,position:"relative",flexShrink:0}}>
              🔔
              <div style={{position:"absolute",top:1,right:1,width:7,height:7,borderRadius:"50%",background:C.red,border:"1.5px solid white"}}/>
            </div>
          </div>

          {/* Content */}
          <div style={{flex:1,overflowY:"auto",padding:"18px 16px",paddingBottom:88}}>
            {panel==="dash"&&<PanelDash ud={ud} toast={showToast} setPanel={setPanel} streak={streak}/>}
            {panel==="hoy"&&<PanelHoy ud={ud} toast={showToast} markPublished={markPublished}/>}
            {panel==="ideas"&&<PanelIdeas ud={ud} toast={showToast} setPanel={setPanel}/>}
            {panel==="cal"&&<PanelCal toast={showToast} published={published}/>}
            {panel==="comp"&&<PanelComp ud={ud} toast={showToast}/>}
            {panel==="reservas"&&<PanelReservas toast={showToast}/>}
            {panel==="editor"&&<PanelEditor toast={showToast}/>}
            {panel==="guion"&&<PanelGuion ud={ud} toast={showToast}/>}
            {panel==="auto"&&<PanelBot ud={ud} toast={showToast}/>}
            {panel==="alertas"&&<PanelAlertas toast={showToast} setPanel={setPanel}/>}
            {panel==="empresa"&&<PanelEmpresa toast={showToast}/>}
          </div>

          {/* Nav */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:70,background:"rgba(255,255,255,.97)",backdropFilter:"blur(24px)",borderTop:"1px solid "+C.brd,zIndex:40,overflowX:"auto",display:"flex",alignItems:"center",padding:"0 4px",gap:1}}>
            {navItems.map(item=>(
              <div key={item.id} onClick={()=>setPanel(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",flexShrink:0,minWidth:56,padding:"6px 3px",borderRadius:12,position:"relative",background:panel===item.id?C.lav4:"transparent",transition:"background .2s"}}>
                <div style={{width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",color:panel===item.id?C.lav3:C.muted}}>{item.ic}</div>
                <div style={{fontSize:9,fontWeight:panel===item.id?600:500,color:panel===item.id?C.lav3:C.muted,whiteSpace:"nowrap"}}>{item.lbl}</div>
                {item.pro&&<div style={{position:"absolute",top:3,right:"calc(50% - 22px)",fontSize:7,fontWeight:700,background:C.lime,color:C.ink,padding:"1px 3px",borderRadius:5}}>PRO</div>}
                {item.badge&&<div style={{position:"absolute",top:4,right:"calc(50% - 18px)",width:7,height:7,borderRadius:"50%",background:C.red,border:"2px solid white"}}/>}
              </div>
            ))}
          </div>

          {/* FAB CHATBOT */}
          <div style={{position:"absolute",bottom:82,right:16,zIndex:50}}>
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
  );
}
