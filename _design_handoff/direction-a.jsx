// Direction A — Editorial Confidence
// Warm cream + terracotta + Instrument Serif headlines.
// Mobile-first; container is 390px wide phone canvas with full mobile site inside.

const A_TOKENS = {
  cream:    '#f5f0e8',
  cream2:   '#ede6d8',
  ink:      '#1a1714',
  ink2:     '#3d352e',
  muted:    '#6b6056',
  clay:     '#c0573a',
  clay2:    '#a3462c',
  line:     'rgba(26,23,20,0.12)',
  card:     '#ffffff',
};

const aSerif = "'Instrument Serif', 'Times New Roman', serif";
const aSans  = "'Inter', system-ui, sans-serif";
const aMono  = "'JetBrains Mono', ui-monospace, monospace";

function AEyebrow({ children, color }) {
  return (
    <div style={{
      fontFamily: aMono, fontSize: 10, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: color || A_TOKENS.muted,
      display:'flex', alignItems:'center', gap:8,
    }}>
      <span style={{display:'inline-block', width:18, height:1, background:'currentColor', opacity:.5}}/>
      {children}
    </div>
  );
}

function ANav() {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'18px 22px', borderBottom:`1px solid ${A_TOKENS.line}`,
      background: A_TOKENS.cream, position:'sticky', top:0, zIndex:10,
      backdropFilter:'blur(8px)',
    }}>
      <div style={{display:'flex', alignItems:'baseline', gap:2}}>
        <span style={{fontFamily:aSerif, fontSize:22, color:A_TOKENS.ink, lineHeight:1, letterSpacing:'-0.02em'}}>btiq</span>
        <span style={{fontFamily:aMono, fontSize:9, color:A_TOKENS.clay, letterSpacing:'0.2em', textTransform:'uppercase', marginLeft:4}}>digital</span>
      </div>
      <button aria-label="menu" style={{background:'transparent', border:'none', padding:6, cursor:'pointer'}}>
        <div style={{width:20, height:1.5, background:A_TOKENS.ink, marginBottom:5}}/>
        <div style={{width:14, height:1.5, background:A_TOKENS.ink, marginLeft:'auto'}}/>
      </button>
    </div>
  );
}

function AHero() {
  return (
    <section style={{ padding:'40px 22px 32px', position:'relative' }}>
      <AEyebrow>Agencia boutique · CDMX</AEyebrow>
      <h1 style={{
        fontFamily: aSerif, fontWeight:400,
        fontSize: 56, lineHeight: 0.96, letterSpacing: '-0.025em',
        color: A_TOKENS.ink, margin:'18px 0 0',
      }}>
        Estrategia<br/>
        que <em style={{color:A_TOKENS.clay, fontStyle:'italic'}}>mueve</em><br/>
        la aguja.
      </h1>
      <p style={{
        fontFamily: aSans, fontSize: 15, lineHeight: 1.55,
        color: A_TOKENS.ink2, margin:'24px 0 0', maxWidth: 320,
      }}>
        Performance, desarrollo web y eventos para marcas medianas mexicanas que ya validaron su producto y quieren <span style={{color:A_TOKENS.ink, fontWeight:500}}>escalar con cabeza</span>.
      </p>

      <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:28 }}>
        <button style={{
          background: A_TOKENS.ink, color: A_TOKENS.cream,
          fontFamily: aSans, fontSize:14, fontWeight:500,
          padding:'16px 22px', borderRadius:999, border:'none',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor:'pointer',
        }}>
          <span>Agenda una llamada</span>
          <span style={{
            width:28, height:28, borderRadius:'50%', background:A_TOKENS.clay,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:14,
          }}>→</span>
        </button>
        <button style={{
          background:'transparent', color: A_TOKENS.ink,
          fontFamily: aSans, fontSize:14, fontWeight:500,
          padding:'14px 22px', borderRadius:999,
          border:`1px solid ${A_TOKENS.line}`, cursor:'pointer',
        }}>
          Ver servicios
        </button>
      </div>

      {/* Stats strip */}
      <div style={{
        marginTop: 36, display:'grid', gridTemplateColumns:'1fr 1fr',
        borderTop:`1px solid ${A_TOKENS.line}`, borderBottom:`1px solid ${A_TOKENS.line}`,
      }}>
        <div style={{padding:'18px 0', borderRight:`1px solid ${A_TOKENS.line}`}}>
          <div style={{fontFamily:aSerif, fontSize:38, color:A_TOKENS.ink, lineHeight:1, letterSpacing:'-0.02em'}}>
            4.8<span style={{color:A_TOKENS.clay}}>×</span>
          </div>
          <div style={{fontFamily:aMono, fontSize:9.5, letterSpacing:'0.15em', textTransform:'uppercase', color:A_TOKENS.muted, marginTop:6}}>
            ROAS promedio
          </div>
        </div>
        <div style={{padding:'18px 0 18px 18px'}}>
          <div style={{fontFamily:aSerif, fontSize:38, color:A_TOKENS.ink, lineHeight:1, letterSpacing:'-0.02em'}}>
            +127<span style={{color:A_TOKENS.clay}}>%</span>
          </div>
          <div style={{fontFamily:aMono, fontSize:9.5, letterSpacing:'0.15em', textTransform:'uppercase', color:A_TOKENS.muted, marginTop:6}}>
            Conversión media
          </div>
        </div>
      </div>
    </section>
  );
}

function ALogos() {
  const logos = ['SAMSUNG', 'AT&T', 'HYUNDAI', 'KIA', 'TELMEX', 'BIMBO'];
  return (
    <section style={{ padding:'28px 22px 32px', background:A_TOKENS.cream2 }}>
      <AEyebrow>Donde hemos dejado huella</AEyebrow>
      <div style={{
        marginTop:18, display:'grid', gridTemplateColumns:'repeat(3, 1fr)',
        gap:0, borderTop:`1px solid ${A_TOKENS.line}`, borderLeft:`1px solid ${A_TOKENS.line}`,
      }}>
        {logos.map((l,i)=>(
          <div key={l} style={{
            padding:'22px 8px', textAlign:'center',
            fontFamily:aSans, fontSize:13, fontWeight:600, letterSpacing:'0.05em',
            color:A_TOKENS.ink2,
            borderRight:`1px solid ${A_TOKENS.line}`, borderBottom:`1px solid ${A_TOKENS.line}`,
          }}>{l}</div>
        ))}
      </div>
      <div style={{fontFamily:aSans, fontSize:11, color:A_TOKENS.muted, marginTop:14, fontStyle:'italic', lineHeight:1.5}}>
        Marcas donde nuestra fundadora ha liderado proyectos de marketing digital.
      </div>
    </section>
  );
}

const A_SERVICES = [
  {
    n:'01', t:'Performance Marketing',
    d:'Paid media, CRM y e-commerce optimizados para ROI. Pensamos en funnel completo, no solo en clics.',
    promise:'Cada peso invertido te regresa tres.',
    tags:['Meta Ads','Google','TikTok','CRM'],
  },
  {
    n:'02', t:'Desarrollo Web',
    d:'Sitios y landings que convierten. Diseño, desarrollo, analítica y optimización continua.',
    promise:'Que convierten, no que solo se ven bonitos.',
    tags:['Shopify','Webflow','Next.js','GA4'],
  },
  {
    n:'03', t:'Eventos Corporativos',
    d:'Activaciones y experiencias que generan leads cualificados y conversación de marca.',
    promise:'Generan negocio, no solo fotos para LinkedIn.',
    tags:['B2B','Producción','Activación'],
  },
];

function AServices() {
  return (
    <section style={{ padding:'48px 22px 40px' }}>
      <AEyebrow>Servicios</AEyebrow>
      <h2 style={{
        fontFamily:aSerif, fontWeight:400, fontSize:38, lineHeight:1.0,
        letterSpacing:'-0.02em', color:A_TOKENS.ink, margin:'14px 0 8px',
      }}>
        Tres formas de <em style={{color:A_TOKENS.clay}}>crecer</em>.
      </h2>
      <p style={{fontFamily:aSans, fontSize:14, color:A_TOKENS.ink2, margin:0, lineHeight:1.55}}>
        Una sola promesa: resultados medibles para marcas medianas mexicanas en crecimiento.
      </p>

      <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:26}}>
        {A_SERVICES.map(s => (
          <article key={s.n} style={{
            background: A_TOKENS.card, border:`1px solid ${A_TOKENS.line}`,
            borderRadius:18, padding:'22px 20px', position:'relative', overflow:'hidden',
          }}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
              <span style={{fontFamily:aMono, fontSize:11, color:A_TOKENS.clay, letterSpacing:'0.1em'}}>—{s.n}</span>
              <span style={{fontFamily:aMono, fontSize:9, color:A_TOKENS.muted, letterSpacing:'0.15em', textTransform:'uppercase'}}>SERVICIO</span>
            </div>
            <h3 style={{fontFamily:aSerif, fontWeight:400, fontSize:28, color:A_TOKENS.ink, margin:'12px 0 8px', letterSpacing:'-0.02em', lineHeight:1.05}}>
              {s.t}
            </h3>
            <p style={{fontFamily:aSans, fontSize:13.5, color:A_TOKENS.ink2, margin:0, lineHeight:1.55}}>
              {s.d}
            </p>
            <div style={{
              marginTop:14, padding:'12px 14px', background:A_TOKENS.cream2, borderRadius:10,
              fontFamily:aSerif, fontSize:16, fontStyle:'italic', color:A_TOKENS.ink, lineHeight:1.3,
            }}>
              "{s.promise}"
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:14}}>
              {s.tags.map(t => (
                <span key={t} style={{
                  fontFamily:aMono, fontSize:10, padding:'4px 9px',
                  border:`1px solid ${A_TOKENS.line}`, borderRadius:999,
                  color:A_TOKENS.ink2,
                }}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const A_PROCESS = [
  { n:'01', t:'Diagnóstico', d:'Entendemos tu marca, audiencia y objetivos de negocio. Sin recetas genéricas.' },
  { n:'02', t:'Estrategia', d:'Diseñamos un plan con KPIs claros y un roadmap ejecutable de 90 días.' },
  { n:'03', t:'Ejecución', d:'Lanzamos campañas, sitios o eventos con un equipo senior dedicado.' },
  { n:'04', t:'Optimización', d:'Medimos, iteramos y escalamos lo que funciona. Reporting transparente.' },
];

function AProcess() {
  return (
    <section style={{ padding:'48px 22px', background:A_TOKENS.ink, color:A_TOKENS.cream }}>
      <AEyebrow color="rgba(245,240,232,0.55)">Proceso</AEyebrow>
      <h2 style={{
        fontFamily:aSerif, fontWeight:400, fontSize:40, lineHeight:1.0,
        letterSpacing:'-0.02em', margin:'14px 0 0',
      }}>
        Cómo trabajamos<br/>
        <em style={{color:'#f0a085'}}>contigo</em>.
      </h2>

      <div style={{marginTop:30, display:'flex', flexDirection:'column'}}>
        {A_PROCESS.map((p,i) => (
          <div key={p.n} style={{
            display:'grid', gridTemplateColumns:'48px 1fr',
            gap:14, padding:'20px 0',
            borderTop:'1px solid rgba(245,240,232,0.15)',
            borderBottom: i===A_PROCESS.length-1 ? '1px solid rgba(245,240,232,0.15)' : 'none',
          }}>
            <div style={{
              fontFamily:aSerif, fontSize:36, color:'#f0a085', lineHeight:1, letterSpacing:'-0.02em',
            }}>{p.n}</div>
            <div>
              <div style={{fontFamily:aSans, fontSize:17, fontWeight:600, marginBottom:6, letterSpacing:'-0.01em'}}>{p.t}</div>
              <div style={{fontFamily:aSans, fontSize:13, lineHeight:1.55, color:'rgba(245,240,232,0.7)'}}>{p.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ATestimonial() {
  return (
    <section style={{ padding:'48px 22px', background:A_TOKENS.cream2 }}>
      <AEyebrow>Filosofía</AEyebrow>
      <div style={{
        fontFamily:aSerif, fontSize:32, lineHeight:1.15, letterSpacing:'-0.015em',
        color:A_TOKENS.ink, margin:'18px 0 0',
      }}>
        <span style={{color:A_TOKENS.clay, fontSize:48, lineHeight:0, position:'relative', top:8, marginRight:4}}>"</span>
        Las marcas medianas merecen la <em style={{color:A_TOKENS.clay}}>misma calidad estratégica</em> que las globales — con la agilidad que las grandes ya no ofrecen.
      </div>
      <div style={{display:'flex', alignItems:'center', gap:12, marginTop:24}}>
        <div style={{
          width:46, height:46, borderRadius:'50%',
          background:`linear-gradient(135deg, ${A_TOKENS.clay}, ${A_TOKENS.clay2})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:aSerif, fontSize:20, color:A_TOKENS.cream,
        }}>PP</div>
        <div>
          <div style={{fontFamily:aSans, fontSize:13.5, fontWeight:600, color:A_TOKENS.ink}}>Paola Parra</div>
          <div style={{fontFamily:aMono, fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:A_TOKENS.muted, marginTop:2}}>
            Fundadora · 15+ años · ES/EN
          </div>
        </div>
      </div>
      <div style={{
        display:'flex', gap:8, marginTop:18, flexWrap:'wrap',
      }}>
        {['Samsung','AT&T','Hyundai','Kia'].map(b => (
          <span key={b} style={{
            fontFamily:aMono, fontSize:10, padding:'5px 10px',
            background:A_TOKENS.cream, border:`1px solid ${A_TOKENS.line}`,
            borderRadius:999, color:A_TOKENS.ink2,
          }}>{b}</span>
        ))}
      </div>
    </section>
  );
}

const A_FAQ = [
  { q:'¿Cuánto tarda en arrancar un proyecto?', a:'Entre 7 y 14 días desde la firma. Empezamos con diagnóstico y un roadmap de 90 días con KPIs claros.' },
  { q:'¿Trabajan con retainer o por proyecto?', a:'Ambos. Performance suele ser retainer mensual; web y eventos pueden ir por entregable.' },
  { q:'¿Quién va a ejecutar mi cuenta?', a:'Un equipo senior dedicado. Sin capas de intermediación: trabajas directo con quien decide y ejecuta.' },
  { q:'¿Operan en toda LatAm?', a:'Sí. Base en CDMX, equipo bilingüe ES/EN, con campañas activas en MX, CO, CL y US-Hispanic.' },
];

function AFaq() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding:'48px 22px' }}>
      <AEyebrow>Preguntas frecuentes</AEyebrow>
      <h2 style={{
        fontFamily:aSerif, fontWeight:400, fontSize:38, lineHeight:1.0,
        letterSpacing:'-0.02em', color:A_TOKENS.ink, margin:'14px 0 24px',
      }}>
        Antes de<br/>
        <em style={{color:A_TOKENS.clay}}>preguntar</em>.
      </h2>
      <div style={{borderTop:`1px solid ${A_TOKENS.line}`}}>
        {A_FAQ.map((f,i) => (
          <div key={i} style={{borderBottom:`1px solid ${A_TOKENS.line}`}}>
            <button onClick={()=>setOpen(open===i?-1:i)} style={{
              width:'100%', display:'flex', justifyContent:'space-between', alignItems:'flex-start',
              padding:'18px 0', background:'transparent', border:'none', cursor:'pointer', textAlign:'left',
              gap:12,
            }}>
              <span style={{fontFamily:aSans, fontSize:15, fontWeight:500, color:A_TOKENS.ink, lineHeight:1.4}}>
                {f.q}
              </span>
              <span style={{
                fontFamily:aMono, fontSize:18, color:A_TOKENS.clay,
                transform: open===i?'rotate(45deg)':'none', transition:'transform .25s', flexShrink:0,
              }}>+</span>
            </button>
            {open===i && (
              <div style={{
                fontFamily:aSans, fontSize:13.5, lineHeight:1.6, color:A_TOKENS.ink2,
                paddingBottom:18, paddingRight:30,
              }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ACta() {
  return (
    <section style={{
      padding:'56px 22px', background:A_TOKENS.clay, color:A_TOKENS.cream, position:'relative', overflow:'hidden',
    }}>
      <AEyebrow color="rgba(245,240,232,0.7)">Hablemos</AEyebrow>
      <h2 style={{
        fontFamily:aSerif, fontWeight:400, fontSize:46, lineHeight:0.98,
        letterSpacing:'-0.025em', margin:'14px 0 0',
      }}>
        ¿Listos para<br/>
        <em>mover</em> la aguja?
      </h2>
      <p style={{fontFamily:aSans, fontSize:14, lineHeight:1.55, margin:'18px 0 0', color:'rgba(245,240,232,0.85)'}}>
        Cuéntanos qué necesitas. Te respondemos en menos de 24 horas con un diagnóstico inicial.
      </p>
      <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:26}}>
        <button style={{
          background:A_TOKENS.cream, color:A_TOKENS.ink,
          fontFamily:aSans, fontSize:14, fontWeight:600,
          padding:'16px 22px', borderRadius:999, border:'none',
          display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer',
        }}>
          <span>Agenda una llamada</span>
          <span>→</span>
        </button>
        <button style={{
          background:'transparent', color:A_TOKENS.cream,
          fontFamily:aSans, fontSize:14, fontWeight:500,
          padding:'14px 22px', borderRadius:999,
          border:'1px solid rgba(245,240,232,0.4)', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        }}>
          <span style={{width:8, height:8, borderRadius:'50%', background:'#25d366'}}/>
          WhatsApp directo
        </button>
      </div>
    </section>
  );
}

function AFooter() {
  return (
    <footer style={{ padding:'32px 22px 28px', background:A_TOKENS.ink, color:'rgba(245,240,232,0.7)' }}>
      <div style={{display:'flex', alignItems:'baseline', gap:4}}>
        <span style={{fontFamily:aSerif, fontSize:26, color:A_TOKENS.cream, letterSpacing:'-0.02em'}}>btiq</span>
        <span style={{fontFamily:aMono, fontSize:10, color:'#f0a085', letterSpacing:'0.2em', textTransform:'uppercase'}}>digital</span>
      </div>
      <p style={{fontFamily:aSans, fontSize:12.5, lineHeight:1.55, margin:'14px 0 0', maxWidth:280}}>
        Estrategia y ejecución para marcas medianas que buscan resultados medibles.
      </p>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop:28,
        paddingTop:22, borderTop:'1px solid rgba(245,240,232,0.15)',
      }}>
        <div>
          <div style={{fontFamily:aMono, fontSize:9.5, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(245,240,232,0.5)', marginBottom:10}}>Navegación</div>
          {['Servicios','Proceso','Nosotros','Contacto'].map(l => (
            <div key={l} style={{fontFamily:aSans, fontSize:13, color:A_TOKENS.cream, padding:'4px 0'}}>{l}</div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:aMono, fontSize:9.5, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(245,240,232,0.5)', marginBottom:10}}>Contacto</div>
          <div style={{fontFamily:aSans, fontSize:13, color:A_TOKENS.cream, padding:'4px 0'}}>hola@btiq.mx</div>
          <div style={{fontFamily:aSans, fontSize:13, color:A_TOKENS.cream, padding:'4px 0'}}>WhatsApp</div>
          <div style={{fontFamily:aSans, fontSize:13, color:'rgba(245,240,232,0.6)', padding:'4px 0'}}>CDMX, MX</div>
        </div>
      </div>
      <div style={{fontFamily:aMono, fontSize:10, color:'rgba(245,240,232,0.4)', marginTop:24, letterSpacing:'0.05em'}}>
        © 2026 btiq digital
      </div>
    </footer>
  );
}

function DirectionA() {
  return (
    <div style={{ background:A_TOKENS.cream, color:A_TOKENS.ink, fontFamily:aSans }}>
      <ANav/>
      <AHero/>
      <ALogos/>
      <AServices/>
      <AProcess/>
      <ATestimonial/>
      <AFaq/>
      <ACta/>
      <AFooter/>
    </div>
  );
}

window.DirectionA = DirectionA;
