// app.jsx — Btiq Landing redesign
// Two directions side-by-side in DesignCanvas, each rendered inside a
// phone-shaped artboard. Tweaks panel toggles density + dark/light + accent.

const { DesignCanvas, DCSection, DCArtboard } = window;

// ───── Phone shell ─────
function PhoneShell({ children, label='iPhone 14 Pro · 390pt' }) {
  return (
    <div style={{
      width: 390, height: 844, background:'#000', borderRadius: 44,
      padding: 9, boxShadow:'0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 60px rgba(0,0,0,0.35)',
      position:'relative',
    }}>
      <div style={{
        width:'100%', height:'100%', borderRadius:36, overflow:'hidden',
        position:'relative', background:'#fff',
      }}>
        {/* status bar */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:44, zIndex:20,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 28px 0', pointerEvents:'none',
          fontFamily:'-apple-system, system-ui, sans-serif',
          fontSize:14, fontWeight:600, color:'currentColor',
          mixBlendMode:'difference',
        }}>
          <span style={{color:'#fff'}}>9:41</span>
          <span style={{color:'#fff', fontSize:11, opacity:.85}}>●●● ▮▮▮ 􀋨</span>
        </div>
        {/* dynamic island */}
        <div style={{
          position:'absolute', top:11, left:'50%', transform:'translateX(-50%)',
          width:118, height:34, background:'#000', borderRadius:20, zIndex:21,
        }}/>
        {/* scrollable content */}
        <div className="ab-scroll" style={{
          position:'absolute', inset:0, overflowY:'auto',
          paddingTop:50,
        }}>
          {children}
          {/* home indicator background pad */}
          <div style={{height:34}}/>
        </div>
        {/* home indicator */}
        <div style={{
          position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)',
          width:134, height:5, borderRadius:3, background:'rgba(0,0,0,0.4)', zIndex:21,
          mixBlendMode:'difference',
        }}/>
      </div>
    </div>
  );
}

// ───── Tweaks ─────
const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakSlider, TweakColor } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showDirectionA": true,
  "showDirectionB": true,
  "density": "comfortable",
  "accentA": "#c0573a",
  "accentB": "#d4ff3a"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent overrides via CSS vars on root containers
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent-a', tweaks.accentA);
    document.documentElement.style.setProperty('--accent-b', tweaks.accentB);
  }, [tweaks.accentA, tweaks.accentB]);

  return (
    <>
      <DesignCanvas defaultZoom={0.55}>
        <DCSection
          id="landing"
          title="Btiq Digital — Landing redesign"
          subtitle="Mobile-first · 2 directions to compare"
        >
          {tweaks.showDirectionA && (
            <DCArtboard id="dir-a" label="A · Editorial Confidence" width={390} height={844}>
              <PhoneShell><window.DirectionA/></PhoneShell>
            </DCArtboard>
          )}
          {tweaks.showDirectionB && (
            <DCArtboard id="dir-b" label="B · Performance Engine" width={390} height={844}>
              <PhoneShell><window.DirectionB/></PhoneShell>
            </DCArtboard>
          )}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Directions">
          <TweakToggle label="Show A · Editorial" value={tweaks.showDirectionA} onChange={v=>setTweak('showDirectionA', v)}/>
          <TweakToggle label="Show B · Performance" value={tweaks.showDirectionB} onChange={v=>setTweak('showDirectionB', v)}/>
        </TweakSection>
        <TweakSection title="Accents">
          <TweakColor label="Accent A (clay)" value={tweaks.accentA} onChange={v=>setTweak('accentA', v)}/>
          <TweakColor label="Accent B (lime)" value={tweaks.accentB} onChange={v=>setTweak('accentB', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
