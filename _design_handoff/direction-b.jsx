// Direction B — Performance Engine
// Off-black bg, electric lime accent, Geist sans, mono callouts.
// Mobile-first, data-driven feel with metric callouts.

const B_TOKENS = {
  bg:       '#0d0e0c',
  bg2:      '#161814',
  surface:  '#1a1c18',
  ink:      '#f5f4ee',
  ink2:     '#cfcec5',
  muted:    '#7a7a72',
  lime:     '#d4ff3a',
  lime2:    '#bce024',
  line:     'rgba(245,244,238,0.10)',
  line2:    'rgba(245,244,238,0.18)',
};

const bSans = "'Geist', system-ui, sans-serif";
const bMono = "'Geist Mono', ui-monospace, monospace";

function BTag({ children, dot=true }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8,
      fontFamily: bMono, fontSize: 10.5, letterSpacing: '0.05em',
      textTransform: 'uppercase', color: B_TOKENS.lime,
      padding:'5px 11px 5px 9px',
      border:`1px solid ${B_TOKENS.line2}`,
      borderRadius:999, background:'rgba(212,255,58,0.04)',
    }}>
      {dot && <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:B_TOKENS.lime, boxShadow:`0 0 8px ${B_TOKENS.lime}`}}/>}
      {children}
    </div>
  );
}

function BNav() {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'14px 18px', borderBottom:`1px solid ${B_TOKENS.line}`,
      position:'sticky', top:0, zIndex:10,
      background:'rgba(13,14,12,0.85)', backdropFilter:'blur(12px)',
    }}>
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <div style={{
          width:26, height:26, borderRadius:7, background:B_TOKENS.lime,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:bSans, fontWeight:700, fontSize:14, color:B_TOKENS.bg, letterSpacing:'-0.02em',
        }}>b</div>
        <div style={{fontFamily:bSans, fontSize:15, fontWeight:600, color:B_TOKENS.ink, letterSpacing:'-0.015em'}}>
          btiq<span style={{color:B_TOKENS.muted, fontWeight:400}}>/digital</span>
        </div>
      </div>
      <button style={{
        fontFamily:bSans, fontSize:12.5, fontWeight:500,
        background:B_TOKENS.lime, color:B_TOKENS.bg,
        padding:'9px 14px', borderRadius:999, border:'none', cursor:'pointer',
        display:'flex', alignItems:'center', gap:6,
      }}>
        Agenda <span>↗</span>
      </button>
    </div>
  );
}

function BHero() {
  return (
    <section style={{ padding:'34px 18px 28px', position:'relative', overflow:'hidden' }}>
      {/* faint grid */}
      <div style={{
        position:'absolute', inset:0, opacity:0.4,
        backgroundImage:`linear-gradient(${B_TOKENS.line} 1px, transparent 1px), linear-gradient(90deg, ${B_TOKENS.line} 1px, transparent 1px)`,
        backgroundSize:'28px 28px',
        maskImage:'radial-gradient(ellipse at top, black 20%, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top, black 20%, transparent 70%)',
        pointerEvents:'none',
      }}/>
      <div style={{position:'relative'}}>
        <BTag>Performance · CDMX · ROAS 4.8×</BTag>
        <h1 style={{
          fontFamily: bSans, fontWeight:600,
          fontSize: 50, lineHeight: 0.95, letterSpacing:'-0.04em',
          color: B_TOKENS.ink, margin:'22px 0 0',
        }}>
          Cada peso<br/>
          <span style={{color:B_TOKENS.muted}}>invertido</span><br/>
          te regresa <span style={{
            color: B_TOKENS.bg, background: B_TOKENS.lime,
            padding:'0 12px', borderRadius:8, display:'inline-block',
            transform:'rotate(-2deg)',
          }}>tres.</span>
        </h1>

        <p style={{
          fontFamily: bSans, fontSize: 14.5, lineHeight: 1.55,
          color: B_TOKENS.ink2, margin:'22px 0 0', maxWidth: 320,
        }}>
          Marketing digital, web y eventos para marcas medianas mexicanas que ya validaron su producto. <span style={{color:B_TOKENS.ink}}>Sin intermediarios. Sin métricas que no venden.</span>
        </p>

        <div style={{display:'flex', gap:8, marginTop:24}}>
          <button style={{
            flex:1, background:B_TOKENS.lime, color:B_TOKENS.bg,
            fontFamily:bSans, fontSize:14, fontWeight:600,
            padding:'15px 18px', borderRadius:12, border:'none', cursor:'pointer',
            letterSpacing:'-0.01em',
          }}>
            Agenda una llamada
          </button>
          <button style={{
            background:'transparent', color:B_TOKENS.ink,
            fontFamily:bSans, fontSize:14, fontWeight:500,
            padding:'15px 18px', borderRadius:12, border:`1px solid ${B_TOKENS.line2}`, cursor:'pointer',
          }}>
            ↓
          </button>
        </div>

        {/* Live metrics card */}
        <div style={{
          marginTop:30, background:B_TOKENS.surface,
          border:`1px solid ${B_TOKENS.line2}`, borderRadius:18, padding:'18px 16px',
        }}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
            <div style={{fontFamily:bMono, fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:B_TOKENS.muted, display:'flex', alignItems:'center', gap:6}}>
              <span style={{width:6, height:6, borderRadius:'50%', background:B_TOKENS.lime, animation:'pulse 2s infinite'}}/>
              Resultados promedio · Q1 2026
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0, borderTop:`1px solid ${B_TOKENS.line}`}}>
            {[
              {v:'4.8×', l:'ROAS', sub:'+38% vs benchmark'},
              {v:'127%', l:'Conv.', sub:'lift 6 meses'},
              {v:'-42%', l:'CAC', sub:'reducción media'},
            ].map((m,i)=>(
              <div key={i} style={{
                padding:'14px 6px 0',
                borderRight: i<2 ? `1px solid ${B_TOKENS.line}` : 'none',
              }}>
                <div style={{fontFamily:bSans, fontSize:26, fontWeight:600, color:B_TOKENS.lime, letterSpacing:'-0.03em', lineHeight:1}}>{m.v}</div>
                <div style={{fontFamily:bMono, fontSize:9.5, letterSpacing:'0.1em', textTransform:'uppercase', color:B_TOKENS.ink2, marginTop:6}}>{m.l}</div>
                <div style={{fontFamily:bMono, fontSize:9, color:B_TOKENS.muted, marginTop:3}}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse {0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </section>
  );
}

function BLogos() {
  const logos = ['SAMSUNG','AT&T','HYUNDAI','KIA','ALIAT UNIVERSIDADES'];
  return (
    <section style={{padding:'24px 18px', borderTop:`1px solid ${B_TOKENS.line}`, borderBottom:`1px solid ${B_TOKENS.line}`, background:B_TOKENS.bg2}}>
      <div style={{fontFamily:bMono, fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:B_TOKENS.muted, marginBottom:14}}>
        // marcas donde nuestra fundadora ha liderado
      </div>
      <div style={{display:'flex', gap:24, flexWrap:'wrap', alignItems:'center'}}>
        {logos.map(l => (
          <div key={l} style={{
            fontFamily:bSans, fontSize:14, fontWeight:600, color:B_TOKENS.ink2,
            letterSpacing:'0.02em', opacity:0.7,
          }}>{l}</div>
        ))}
      </div>
    </section>
  );
}

const B_SERVICES = [
  {
    code:'PERF', t:'Performance Marketing',
    promise:'Cada peso invertido te regresa tres.',
    d:'Paid media, CRM, e-commerce y marketplaces optimizados para ROI. Funnel completo, no solo clics.',
    metric:{v:'4.8×', l:'ROAS promedio'},
    stack:['Meta','Google','TikTok','HubSpot'],
  },
  {
    code:'WEB', t:'Web & Tiendas en línea',
    promise:'Que convierten, no que solo se ven bonitos.',
    d:'Sitios web y e-commerce listos para vender. Partners oficiales de Tiendanube: implementación, integraciones y optimización continua basada en data.',
    metric:{v:'+127%', l:'Conv. media'},
    stack:['Tiendanube','Next.js','Shopify','GA4'],
    partner: true,
  },
  {
    code:'EVT', t:'Eventos Corporativos',
    promise:'Generan negocio, no fotos para LinkedIn.',
    d:'Activaciones, lanzamientos y experiencias que generan leads cualificados, no solo asistencia.',
    metric:{v:'87%', l:'Leads cualif.'},
    stack:['B2B','Producción','Activación'],
  },
];

function BServices() {
  return (
    <section style={{padding:'48px 18px 40px'}}>
      <BTag>Servicios</BTag>
      <h2 style={{
        fontFamily:bSans, fontWeight:600, fontSize:36, lineHeight:1.0,
        letterSpacing:'-0.035em', color:B_TOKENS.ink, margin:'18px 0 8px',
      }}>
        Tres motores.<br/>
        <span style={{color:B_TOKENS.muted}}>Una promesa.</span>
      </h2>

      <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:26}}>
        {B_SERVICES.map(s => (
          <article key={s.code} style={{
            background:B_TOKENS.surface, border:`1px solid ${B_TOKENS.line2}`,
            borderRadius:18, padding:'18px 16px', position:'relative', overflow:'hidden',
          }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14}}>
              <div style={{
                fontFamily:bMono, fontSize:10, color:B_TOKENS.lime, letterSpacing:'0.1em',
                padding:'3px 8px', border:`1px solid ${B_TOKENS.lime}`, borderRadius:5,
              }}>{s.code}</div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:bSans, fontSize:22, fontWeight:600, color:B_TOKENS.lime, letterSpacing:'-0.03em', lineHeight:1}}>{s.metric.v}</div>
                <div style={{fontFamily:bMono, fontSize:8.5, letterSpacing:'0.1em', textTransform:'uppercase', color:B_TOKENS.muted, marginTop:3}}>{s.metric.l}</div>
              </div>
            </div>
            <h3 style={{fontFamily:bSans, fontWeight:600, fontSize:22, color:B_TOKENS.ink, margin:'0 0 6px', letterSpacing:'-0.025em', lineHeight:1.1}}>
              {s.t}
            </h3>
            <div style={{
              fontFamily:bSans, fontSize:13.5, fontStyle:'italic', color:B_TOKENS.lime,
              margin:'0 0 10px', letterSpacing:'-0.005em', lineHeight:1.35,
            }}>
              "{s.promise}"
            </div>
            <p style={{fontFamily:bSans, fontSize:13, color:B_TOKENS.ink2, margin:0, lineHeight:1.55}}>
              {s.d}
            </p>
            <div style={{display:'flex', flexWrap:'wrap', gap:5, marginTop:14, paddingTop:14, borderTop:`1px solid ${B_TOKENS.line}`, alignItems:'center'}}>
              {s.partner && (
                <span style={{
                  fontFamily:bMono, fontSize:9.5, padding:'3px 8px',
                  background:B_TOKENS.lime, color:B_TOKENS.bg,
                  borderRadius:4, letterSpacing:'0.04em', fontWeight:500,
                  display:'inline-flex', alignItems:'center', gap:5,
                }}>
                  <span style={{width:5, height:5, borderRadius:'50%', background:B_TOKENS.bg}}/>
                  PARTNER OFICIAL
                </span>
              )}
              {s.stack.map(t => (
                <span key={t} style={{
                  fontFamily:bMono, fontSize:9.5, padding:'3px 7px',
                  background:'rgba(245,244,238,0.05)', borderRadius:4,
                  color:B_TOKENS.ink2, letterSpacing:'0.02em',
                }}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const B_PROCESS = [
  { n:'01', d:'7 días', t:'Diagnóstico', desc:'Auditoría de canales, audiencia, competencia y stack actual.' },
  { n:'02', d:'14 días', t:'Estrategia', desc:'Plan 90 días con KPIs, presupuesto y roadmap por canal.' },
  { n:'03', d:'30 días', t:'Ejecución', desc:'Lanzamiento con equipo senior dedicado. Reporting semanal.' },
  { n:'04', d:'continuo', t:'Optimización', desc:'A/B testing, escalado de winners, kill de losers. Data-driven.' },
];

function BProcess() {
  return (
    <section style={{padding:'48px 18px', background:B_TOKENS.bg2, borderTop:`1px solid ${B_TOKENS.line}`, borderBottom:`1px solid ${B_TOKENS.line}`}}>
      <BTag>Proceso · 90 días</BTag>
      <h2 style={{
        fontFamily:bSans, fontWeight:600, fontSize:36, lineHeight:1.0,
        letterSpacing:'-0.035em', color:B_TOKENS.ink, margin:'18px 0 28px',
      }}>
        Cómo te llevamos<br/>
        del 0 al <span style={{color:B_TOKENS.lime}}>scale</span>.
      </h2>

      <div style={{position:'relative'}}>
        {/* timeline line */}
        <div style={{
          position:'absolute', left:18, top:14, bottom:14, width:1,
          background:`linear-gradient(180deg, ${B_TOKENS.lime}, transparent)`,
        }}/>
        {B_PROCESS.map((p,i) => (
          <div key={p.n} style={{
            display:'flex', gap:18, paddingBottom:i===B_PROCESS.length-1?0:22, position:'relative',
          }}>
            <div style={{
              width:36, height:36, borderRadius:'50%',
              background: i===0 ? B_TOKENS.lime : B_TOKENS.surface,
              border:`1px solid ${i===0?B_TOKENS.lime:B_TOKENS.line2}`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              fontFamily:bMono, fontSize:11, fontWeight:500,
              color: i===0 ? B_TOKENS.bg : B_TOKENS.ink2,
              zIndex:1,
            }}>{p.n}</div>
            <div style={{flex:1, paddingTop:6}}>
              <div style={{display:'flex', alignItems:'baseline', gap:10, marginBottom:6}}>
                <h3 style={{fontFamily:bSans, fontSize:18, fontWeight:600, color:B_TOKENS.ink, margin:0, letterSpacing:'-0.02em'}}>{p.t}</h3>
                <span style={{fontFamily:bMono, fontSize:10, color:B_TOKENS.lime, letterSpacing:'0.05em'}}>~{p.d}</span>
              </div>
              <div style={{fontFamily:bSans, fontSize:13, color:B_TOKENS.ink2, lineHeight:1.55}}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BWhy() {
  const items = [
    { n:'15+', l:'años en marcas globales', d:'Samsung, AT&T, Hyundai, Kia. Experiencia real, no slides.'},
    { n:'1', l:'equipo senior', d:'Quien piensa también ejecuta. Sin capas de intermediación.'},
    { n:'ES/EN', l:'alcance LatAm', d:'CDMX base. Operamos en MX, CO, CL y US-Hispanic.'},
    { n:'24h', l:'respuesta máxima', d:'Lean, sin overhead. Trabajas directo con quien decide.'},
  ];
  return (
    <section style={{padding:'48px 18px'}}>
      <BTag>Por qué btiq</BTag>
      <h2 style={{
        fontFamily:bSans, fontWeight:600, fontSize:36, lineHeight:1.0,
        letterSpacing:'-0.035em', color:B_TOKENS.ink, margin:'18px 0 24px',
      }}>
        Calidad de global.<br/>
        Agilidad de <span style={{color:B_TOKENS.lime}}>boutique</span>.
      </h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        {items.map((it,i)=>(
          <div key={i} style={{
            background:B_TOKENS.surface, border:`1px solid ${B_TOKENS.line2}`,
            borderRadius:14, padding:'16px 14px',
          }}>
            <div style={{fontFamily:bSans, fontWeight:600, fontSize:30, color:B_TOKENS.lime, lineHeight:1, letterSpacing:'-0.04em'}}>{it.n}</div>
            <div style={{fontFamily:bSans, fontSize:12, color:B_TOKENS.ink, marginTop:8, fontWeight:500, letterSpacing:'-0.01em'}}>{it.l}</div>
            <div style={{fontFamily:bSans, fontSize:11.5, color:B_TOKENS.muted, marginTop:6, lineHeight:1.45}}>{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BFounder() {
  return (
    <section style={{padding:'48px 18px', background:B_TOKENS.bg2, borderTop:`1px solid ${B_TOKENS.line}`}}>
      <BTag>Fundadora</BTag>
      <div style={{display:'flex', gap:14, marginTop:18, alignItems:'center'}}>
        <div style={{
          width:72, height:72, borderRadius:'50%', flexShrink:0,
          background:`linear-gradient(135deg, ${B_TOKENS.lime}, #6f8f1c)`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:bSans, fontSize:26, fontWeight:600, color:B_TOKENS.bg,
        }}>PP</div>
        <div>
          <div style={{fontFamily:bSans, fontSize:20, fontWeight:600, color:B_TOKENS.ink, letterSpacing:'-0.02em'}}>Paola Parra</div>
          <div style={{fontFamily:bMono, fontSize:10.5, letterSpacing:'0.05em', color:B_TOKENS.muted, marginTop:4}}>Digital Marketing Director</div>
          <div style={{fontFamily:bMono, fontSize:10.5, letterSpacing:'0.05em', color:B_TOKENS.lime, marginTop:2}}>15+ años · ES/EN · LatAm</div>
        </div>
      </div>
      <p style={{fontFamily:bSans, fontSize:14, color:B_TOKENS.ink2, lineHeight:1.6, margin:'20px 0 0'}}>
        "Las marcas medianas merecen la <span style={{color:B_TOKENS.lime}}>misma calidad estratégica</span> que las globales — con la agilidad que las grandes ya no ofrecen."
      </p>
      <div style={{
        marginTop:20, padding:'10px 14px',
        background:B_TOKENS.surface, border:`1px solid ${B_TOKENS.line2}`, borderRadius:10,
        display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer',
      }}>
        <span style={{fontFamily:bSans, fontSize:12.5, color:B_TOKENS.ink2}}>Ver perfil en LinkedIn</span>
        <span style={{color:B_TOKENS.lime, fontSize:14}}>↗</span>
      </div>
    </section>
  );
}

const B_FAQ = [
  { q:'¿Cuánto tarda en arrancar?', a:'7-14 días desde firma. Diagnóstico + roadmap 90 días con KPIs claros.' },
  { q:'¿Retainer o por proyecto?', a:'Ambos. Performance suele ser retainer mensual; web y eventos pueden ir por entregable.' },
  { q:'¿Quién ejecuta mi cuenta?', a:'Equipo senior dedicado. Sin juniors aprendiendo con tu presupuesto.' },
  { q:'¿Operan fuera de México?', a:'Sí. Base CDMX, campañas activas en MX, CO, CL y US-Hispanic.' },
  { q:'¿Trabajan con startups?', a:'Solo con producto validado y clientes reales. No hacemos discovery de mercado.' },
];

function BFaq() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{padding:'48px 18px'}}>
      <BTag>FAQ</BTag>
      <h2 style={{
        fontFamily:bSans, fontWeight:600, fontSize:36, lineHeight:1.0,
        letterSpacing:'-0.035em', color:B_TOKENS.ink, margin:'18px 0 24px',
      }}>
        Lo que<br/>siempre nos preguntan.
      </h2>
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        {B_FAQ.map((f,i) => {
          const isOpen = open===i;
          return (
            <div key={i} style={{
              background: isOpen ? B_TOKENS.surface : 'transparent',
              border:`1px solid ${isOpen?B_TOKENS.line2:B_TOKENS.line}`,
              borderRadius:12, overflow:'hidden',
            }}>
              <button onClick={()=>setOpen(isOpen?-1:i)} style={{
                width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'14px 14px', background:'transparent', border:'none', cursor:'pointer', textAlign:'left',
                gap:10,
              }}>
                <span style={{fontFamily:bSans, fontSize:14, fontWeight:500, color:B_TOKENS.ink, lineHeight:1.35, letterSpacing:'-0.01em'}}>
                  {f.q}
                </span>
                <span style={{
                  width:24, height:24, borderRadius:'50%',
                  background: isOpen ? B_TOKENS.lime : 'transparent',
                  border: isOpen ? 'none' : `1px solid ${B_TOKENS.line2}`,
                  color: isOpen ? B_TOKENS.bg : B_TOKENS.ink2,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  transform: isOpen ? 'rotate(45deg)' : 'none', transition:'transform .25s, background .15s',
                  fontSize:14, fontWeight:500,
                }}>+</span>
              </button>
              {isOpen && (
                <div style={{
                  fontFamily:bSans, fontSize:13, lineHeight:1.6, color:B_TOKENS.ink2,
                  padding:'0 14px 16px',
                }}>{f.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ───── Form field helpers ─────
const SERVICES_OPTS = [
  { id:'perf', code:'PERF', label:'Performance Marketing' },
  { id:'web',  code:'WEB',  label:'Web & Tiendas en línea' },
  { id:'evt',  code:'EVT',  label:'Eventos Corporativos' },
];

function BField({ label, error, touched, children, optional }) {
  const showErr = error && touched;
  return (
    <label style={{display:'flex', flexDirection:'column', gap:6}}>
      <span style={{
        fontFamily:bMono, fontSize:9.5, letterSpacing:'0.12em', textTransform:'uppercase',
        color: showErr ? '#7a1818' : 'rgba(13,14,12,0.65)',
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
      }}>
        <span>{label}{optional && <span style={{opacity:.6, marginLeft:6, textTransform:'none', letterSpacing:0}}>(opcional)</span>}</span>
        {showErr && <span style={{textTransform:'none', letterSpacing:0, fontSize:10}}>{error}</span>}
      </span>
      {children}
    </label>
  );
}

const inputBase = (showErr) => ({
  fontFamily:bSans, fontSize:14, fontWeight:500,
  padding:'13px 14px', borderRadius:10,
  background:'rgba(13,14,12,0.06)',
  color:'#0d0e0c',
  border: showErr ? '1.5px solid #7a1818' : '1.5px solid rgba(13,14,12,0.12)',
  outline:'none', width:'100%', boxSizing:'border-box',
  letterSpacing:'-0.005em',
  transition:'border-color .15s, background .15s',
});

function BContactForm() {
  const [form, setForm] = React.useState({
    nombre:'', email:'', empresa:'', telefono:'', servicios:[],
  });
  const [touched, setTouched] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const errors = React.useMemo(() => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'Requerido';
    else if (form.nombre.trim().length < 2) e.nombre = 'Muy corto';
    if (!form.email.trim()) e.email = 'Requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'Formato inválido';
    if (!form.empresa.trim()) e.empresa = 'Requerido';
    if (form.telefono.trim() && !/^[\d\s+()-]{8,}$/.test(form.telefono.trim())) e.telefono = 'Formato inválido';
    if (form.servicios.length === 0) e.servicios = 'Elige al menos uno';
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function update(k, v) { setForm(f => ({...f, [k]:v})); }
  function blur(k) { setTouched(t => ({...t, [k]:true})); }
  function toggleSvc(id) {
    setForm(f => ({
      ...f,
      servicios: f.servicios.includes(id) ? f.servicios.filter(x=>x!==id) : [...f.servicios, id]
    }));
    setTouched(t => ({...t, servicios:true}));
  }

  function submit(e) {
    e.preventDefault();
    setTouched({nombre:true, email:true, empresa:true, telefono:true, servicios:true});
    if (!isValid) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 900);
  }

  if (submitted) {
    return (
      <section style={{padding:'56px 18px', background:B_TOKENS.lime, color:B_TOKENS.bg}}>
        <div style={{
          width:56, height:56, borderRadius:'50%', background:B_TOKENS.bg,
          display:'flex', alignItems:'center', justifyContent:'center',
          color:B_TOKENS.lime, fontSize:28,
        }}>✓</div>
        <h2 style={{fontFamily:bSans, fontWeight:600, fontSize:38, lineHeight:0.98, letterSpacing:'-0.035em', margin:'20px 0 0'}}>
          Gracias, {form.nombre.split(' ')[0]}.
        </h2>
        <p style={{fontFamily:bSans, fontSize:14.5, lineHeight:1.55, margin:'14px 0 0', color:'rgba(13,14,12,0.78)', maxWidth:320}}>
          Recibimos tu mensaje. Paola te contacta en menos de 24 horas con un diagnóstico inicial.
        </p>
        <div style={{
          marginTop:24, padding:'14px 16px', background:'rgba(13,14,12,0.08)', borderRadius:12,
          fontFamily:bMono, fontSize:11.5, lineHeight:1.6, color:'rgba(13,14,12,0.8)',
        }}>
          <div>→ Confirmación enviada a {form.email}</div>
          <div>→ Próximo paso: agendar 30 min</div>
        </div>
        <button onClick={()=>{setSubmitted(false); setForm({nombre:'',email:'',empresa:'',telefono:'',servicios:[]}); setTouched({});}} style={{
          marginTop:20, background:'transparent', color:B_TOKENS.bg,
          fontFamily:bSans, fontSize:13, fontWeight:500, textDecoration:'underline',
          border:'none', padding:0, cursor:'pointer',
        }}>Enviar otro mensaje</button>
      </section>
    );
  }

  return (
    <section style={{
      padding:'40px 18px 44px', background:B_TOKENS.lime, color:B_TOKENS.bg,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{
        fontFamily:bMono, fontSize:10.5, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(13,14,12,0.6)',
      }}>// next step</div>
      <h2 style={{
        fontFamily:bSans, fontWeight:600, fontSize:42, lineHeight:0.95,
        letterSpacing:'-0.04em', margin:'14px 0 0', color:B_TOKENS.bg,
      }}>
        Hablemos<br/>de tu próximo<br/>trimestre.
      </h2>
      <p style={{fontFamily:bSans, fontSize:14, lineHeight:1.55, margin:'16px 0 0', color:'rgba(13,14,12,0.75)', maxWidth:320}}>
        Respuesta en menos de 24 horas con un diagnóstico inicial gratuito.
      </p>

      <form onSubmit={submit} noValidate style={{marginTop:24, display:'flex', flexDirection:'column', gap:14}}>
        <BField label="Nombre" error={errors.nombre} touched={touched.nombre}>
          <input
            type="text" value={form.nombre}
            onChange={e=>update('nombre', e.target.value)}
            onBlur={()=>blur('nombre')}
            placeholder="Paola Parra"
            style={inputBase(errors.nombre && touched.nombre)}
          />
        </BField>

        <BField label="Email" error={errors.email} touched={touched.email}>
          <input
            type="email" value={form.email}
            onChange={e=>update('email', e.target.value)}
            onBlur={()=>blur('email')}
            placeholder="paola@empresa.mx"
            style={inputBase(errors.email && touched.email)}
          />
        </BField>

        <BField label="Empresa" error={errors.empresa} touched={touched.empresa}>
          <input
            type="text" value={form.empresa}
            onChange={e=>update('empresa', e.target.value)}
            onBlur={()=>blur('empresa')}
            placeholder="Nombre de tu marca"
            style={inputBase(errors.empresa && touched.empresa)}
          />
        </BField>

        <BField label="Teléfono / WhatsApp" error={errors.telefono} touched={touched.telefono} optional>
          <input
            type="tel" value={form.telefono}
            onChange={e=>update('telefono', e.target.value)}
            onBlur={()=>blur('telefono')}
            placeholder="+52 55 0000 0000"
            style={inputBase(errors.telefono && touched.telefono)}
          />
        </BField>

        <BField label="Servicios de interés" error={errors.servicios} touched={touched.servicios}>
          <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:2}}>
            {SERVICES_OPTS.map(s => {
              const on = form.servicios.includes(s.id);
              return (
                <button
                  type="button" key={s.id}
                  onClick={()=>toggleSvc(s.id)}
                  style={{
                    display:'flex', alignItems:'center', gap:12,
                    padding:'12px 14px', borderRadius:10,
                    background: on ? B_TOKENS.bg : 'rgba(13,14,12,0.06)',
                    border: on ? `1.5px solid ${B_TOKENS.bg}` : '1.5px solid rgba(13,14,12,0.12)',
                    color: on ? B_TOKENS.lime : B_TOKENS.bg,
                    cursor:'pointer', textAlign:'left',
                    fontFamily:bSans, fontSize:13.5, fontWeight:500,
                    transition:'background .15s, border-color .15s',
                  }}
                >
                  <span style={{
                    width:18, height:18, borderRadius:5,
                    background: on ? B_TOKENS.lime : 'transparent',
                    border: on ? 'none' : '1.5px solid rgba(13,14,12,0.3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:B_TOKENS.bg, fontSize:12, fontWeight:700, flexShrink:0,
                  }}>{on ? '✓' : ''}</span>
                  <span style={{
                    fontFamily:bMono, fontSize:9.5, letterSpacing:'0.1em',
                    color: on ? B_TOKENS.lime : 'rgba(13,14,12,0.5)',
                    padding:'2px 6px', borderRadius:4,
                    border: on ? `1px solid ${B_TOKENS.lime}` : '1px solid rgba(13,14,12,0.2)',
                  }}>{s.code}</span>
                  <span style={{flex:1}}>{s.label}</span>
                </button>
              );
            })}
          </div>
        </BField>

        <button
          type="submit" disabled={submitting}
          style={{
            marginTop:8,
            background: submitting ? 'rgba(13,14,12,0.6)' : B_TOKENS.bg,
            color: B_TOKENS.lime,
            fontFamily:bSans, fontSize:14.5, fontWeight:600,
            padding:'17px 22px', borderRadius:12, border:'none',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            cursor: submitting ? 'wait' : 'pointer',
            letterSpacing:'-0.01em',
          }}
        >
          <span>{submitting ? 'Enviando…' : 'Enviar mensaje'}</span>
          <span>{submitting ? '○' : '→'}</span>
        </button>

        <div style={{
          fontFamily:bMono, fontSize:10, lineHeight:1.55, letterSpacing:'0.02em',
          color:'rgba(13,14,12,0.6)', textAlign:'center', marginTop:4,
        }}>
          Al enviar aceptas nuestro <span style={{textDecoration:'underline'}}>aviso de privacidad</span>.
        </div>
      </form>

      <div style={{
        marginTop:28, paddingTop:18, borderTop:'1px solid rgba(13,14,12,0.18)',
        fontFamily:bMono, fontSize:11, color:'rgba(13,14,12,0.7)',
        display:'flex', flexDirection:'column', gap:6,
      }}>
        <div>→ paola@btiq.mx</div>
        <div>→ WhatsApp directo · +52 55 3734 4652</div>
        <div>→ Ciudad de México</div>
      </div>
    </section>
  );
}

function BCta() { return <BContactForm/>; }

function BFooter() {
  return (
    <footer style={{padding:'28px 18px 24px', background:B_TOKENS.bg, color:B_TOKENS.muted}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <div style={{
            width:24, height:24, borderRadius:6, background:B_TOKENS.lime,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:bSans, fontWeight:700, fontSize:13, color:B_TOKENS.bg, letterSpacing:'-0.02em',
          }}>b</div>
          <div style={{fontFamily:bSans, fontSize:13, color:B_TOKENS.ink, fontWeight:500}}>btiq<span style={{color:B_TOKENS.muted, fontWeight:400}}>/digital</span></div>
        </div>
        <div style={{fontFamily:bMono, fontSize:10, color:B_TOKENS.muted}}>© 2026</div>
      </div>
      <div style={{
        fontFamily:bMono, fontSize:10, color:B_TOKENS.muted,
        marginTop:18, paddingTop:14, borderTop:`1px solid ${B_TOKENS.line}`,
        display:'flex', justifyContent:'space-between',
      }}>
        <span>Aviso de privacidad</span>
        <span>Made in CDMX</span>
      </div>
    </footer>
  );
}

function BPartner() {
  return (
    <section style={{padding:'40px 18px', background:B_TOKENS.bg2, borderTop:`1px solid ${B_TOKENS.line}`, position:'relative', overflow:'hidden'}}>
      <BTag>Partnership oficial</BTag>
      <div style={{
        marginTop:18, background:B_TOKENS.surface,
        border:`1px solid ${B_TOKENS.line2}`, borderRadius:18, padding:'22px 18px',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', top:-30, right:-30, width:140, height:140,
          background:`radial-gradient(circle, ${B_TOKENS.lime}22, transparent 70%)`,
          borderRadius:'50%', pointerEvents:'none',
        }}/>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
          <div style={{
            width:42, height:42, borderRadius:10,
            background:'#0066ff',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:bSans, fontWeight:700, fontSize:22, color:'#fff',
            letterSpacing:'-0.04em',
          }}>T</div>
          <div>
            <div style={{fontFamily:bSans, fontSize:16, fontWeight:600, color:B_TOKENS.ink, letterSpacing:'-0.02em'}}>Tiendanube</div>
            <div style={{fontFamily:bMono, fontSize:10, letterSpacing:'0.08em', color:B_TOKENS.lime, marginTop:3}}>PARTNER OFICIAL · MÉXICO</div>
          </div>
        </div>
        <h3 style={{
          fontFamily:bSans, fontWeight:600, fontSize:24, lineHeight:1.05,
          letterSpacing:'-0.025em', color:B_TOKENS.ink, margin:'8px 0 0',
        }}>
          Lanzamos tu tienda en <span style={{color:B_TOKENS.lime}}>30 días</span>.
        </h3>
        <p style={{fontFamily:bSans, fontSize:13.5, color:B_TOKENS.ink2, lineHeight:1.55, margin:'12px 0 0'}}>
          Como partners certificados, configuramos tu e-commerce de punta a punta: catálogo, pagos, envíos, integraciones con Meta y Google, y campañas listas para escalar.
        </p>
        <div style={{
          marginTop:18, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8,
        }}>
          {[
            {t:'Setup completo', d:'Tema, productos, pagos, envíos'},
            {t:'Integraciones', d:'Meta · Google · CRM'},
            {t:'Migración', d:'Desde cualquier plataforma'},
            {t:'Soporte continuo', d:'Mantenimiento + growth'},
          ].map(it => (
            <div key={it.t} style={{
              padding:'10px 11px', background:'rgba(245,244,238,0.04)',
              border:`1px solid ${B_TOKENS.line}`, borderRadius:10,
            }}>
              <div style={{fontFamily:bSans, fontSize:12.5, fontWeight:500, color:B_TOKENS.ink, letterSpacing:'-0.01em'}}>{it.t}</div>
              <div style={{fontFamily:bMono, fontSize:9.5, color:B_TOKENS.muted, marginTop:3, letterSpacing:'0.02em'}}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DirectionB() {
  return (
    <div style={{ background:B_TOKENS.bg, color:B_TOKENS.ink, fontFamily:bSans }}>
      <BNav/>
      <BHero/>
      <BLogos/>
      <BServices/>
      <BPartner/>
      <BProcess/>
      <BWhy/>
      <BFounder/>
      <BFaq/>
      <BCta/>
      <BFooter/>
    </div>
  );
}

window.DirectionB = DirectionB;
