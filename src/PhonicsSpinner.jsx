import { useRef, useState, useEffect } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const CVC_DATA = [
  { label:"-at", sub:"短元音 /æ/", words:["cat","bat","hat","mat","rat"] },
  { label:"-an", sub:"短元音 /æ/", words:["can","fan","man","pan","ran"] },
  { label:"-ap", sub:"短元音 /æ/", words:["cap","map","nap","tap","zap"] },
  { label:"-ad", sub:"短元音 /æ/", words:["bad","dad","had","mad","sad"] },
  { label:"-ig", sub:"短元音 /ɪ/", words:["big","dig","pig","wig","fig"] },
  { label:"-it", sub:"短元音 /ɪ/", words:["bit","fit","hit","sit","wit"] },
  { label:"-in", sub:"短元音 /ɪ/", words:["bin","fin","pin","tin","win"] },
  { label:"-ip", sub:"短元音 /ɪ/", words:["dip","hip","lip","rip","zip"] },
  { label:"-op", sub:"短元音 /ɒ/", words:["cop","hop","mop","pop","top"] },
  { label:"-ot", sub:"短元音 /ɒ/", words:["dot","hot","lot","pot","rot"] },
  { label:"-og", sub:"短元音 /ɒ/", words:["dog","fog","hog","log","jog"] },
  { label:"-ug", sub:"短元音 /ʌ/", words:["bug","hug","jug","mug","rug"] },
  { label:"-un", sub:"短元音 /ʌ/", words:["bun","fun","gun","run","sun"] },
  { label:"-ut", sub:"短元音 /ʌ/", words:["but","cut","hut","nut","gut"] },
  { label:"-ed", sub:"短元音 /e/",  words:["bed","fed","led","red","wed"] },
  { label:"-en", sub:"短元音 /e/",  words:["den","hen","men","pen","ten"] },
];

const BLEND_DATA = [
  { label:"bl",  type:"L-blend",  words:["blue","black","blend","blink","blow"] },
  { label:"cl",  type:"L-blend",  words:["clap","club","clip","clock","class"] },
  { label:"fl",  type:"L-blend",  words:["flag","flat","flip","flock","fly"] },
  { label:"gl",  type:"L-blend",  words:["glad","glow","glue","glass","glen"] },
  { label:"pl",  type:"L-blend",  words:["plan","play","plus","plum","plug"] },
  { label:"sl",  type:"L-blend",  words:["slab","slip","slim","slop","slow"] },
  { label:"br",  type:"R-blend",  words:["brag","brick","bring","broke","brush"] },
  { label:"cr",  type:"R-blend",  words:["crab","crack","crop","crow","crush"] },
  { label:"dr",  type:"R-blend",  words:["drag","draw","drip","drop","drum"] },
  { label:"fr",  type:"R-blend",  words:["frog","from","fret","fresh","free"] },
  { label:"gr",  type:"R-blend",  words:["grab","grim","grin","grip","grow"] },
  { label:"tr",  type:"R-blend",  words:["trap","trim","trip","trot","truck"] },
  { label:"sk",  type:"S-blend",  words:["skip","skin","skill","skull","sky"] },
  { label:"sm",  type:"S-blend",  words:["smack","smell","smile","smoke","smug"] },
  { label:"sp",  type:"S-blend",  words:["span","spin","spot","spill","spud"] },
  { label:"st",  type:"S-blend",  words:["step","stem","still","stop","stuck"] },
  { label:"sw",  type:"S-blend",  words:["swim","swap","sweet","swift","swam"] },
  { label:"str", type:"3-letter", words:["strap","strip","strum","street","strong"] },
  { label:"spr", type:"3-letter", words:["spray","spring","sprig","sprint","spread"] },
  { label:"scr", type:"3-letter", words:["scram","scrub","screen","scroll","scrap"] },
];

const MAGIC_DATA = [
  { short:"cap", long:"cape", vowel:"a_e · /eɪ/", type:"a", pairs:[["cap","cape"],["tap","tape"],["hat","hate"],["mad","made"]] },
  { short:"hat", long:"hate", vowel:"a_e · /eɪ/", type:"a", pairs:[["hat","hate"],["fat","fate"],["rat","rate"],["mat","mate"]] },
  { short:"tap", long:"tape", vowel:"a_e · /eɪ/", type:"a", pairs:[["tap","tape"],["cap","cape"],["nap","nape"],["gap","gape"]] },
  { short:"mad", long:"made", vowel:"a_e · /eɪ/", type:"a", pairs:[["mad","made"],["bad","bade"],["fad","fade"],["lad","lade"]] },
  { short:"bit", long:"bite", vowel:"i_e · /aɪ/", type:"i", pairs:[["bit","bite"],["kit","kite"],["sit","site"],["wit","wife"]] },
  { short:"pin", long:"pine", vowel:"i_e · /aɪ/", type:"i", pairs:[["pin","pine"],["fin","fine"],["win","wine"],["din","dine"]] },
  { short:"kit", long:"kite", vowel:"i_e · /aɪ/", type:"i", pairs:[["kit","kite"],["bit","bite"],["sit","site"],["fit","file"]] },
  { short:"hid", long:"hide", vowel:"i_e · /aɪ/", type:"i", pairs:[["hid","hide"],["rid","ride"],["bid","bide"],["lid","like"]] },
  { short:"hop", long:"hope", vowel:"o_e · /oʊ/", type:"o", pairs:[["hop","hope"],["mop","mope"],["cop","cope"],["top","tone"]] },
  { short:"not", long:"note", vowel:"o_e · /oʊ/", type:"o", pairs:[["not","note"],["dot","dote"],["rot","role"],["lot","lobe"]] },
  { short:"rob", long:"robe", vowel:"o_e · /oʊ/", type:"o", pairs:[["rob","robe"],["mob","mode"],["lob","lobe"],["nob","nose"]] },
  { short:"cod", long:"code", vowel:"o_e · /oʊ/", type:"o", pairs:[["cod","code"],["nod","node"],["rod","rode"],["mod","mole"]] },
  { short:"cut", long:"cute", vowel:"u_e · /juː/", type:"u", pairs:[["cut","cute"],["hut","huge"],["nut","nude"],["but","fuse"]] },
  { short:"cub", long:"cube", vowel:"u_e · /juː/", type:"u", pairs:[["cub","cube"],["tub","tube"],["hub","huge"],["sub","sure"]] },
  { short:"tun", long:"tune", vowel:"u_e · /juː/", type:"u", pairs:[["tun","tune"],["dun","dune"],["fun","fume"],["nun","nude"]] },
  { short:"us",  long:"use",  vowel:"u_e · /juː/", type:"u", pairs:[["us","use"],["fus","fuse"],["mus","muse"],["pus","pure"]] },
];

// ── THEMES ───────────────────────────────────────────────────────────────────

const THEMES = [
  {
    accent:"#e05898", btn1:"#ffadd6", btn2:"#a8b8ff",
    hubLine1:"CVC", hubLine2:"词族", hubC1:"#c080d8", hubC2:"#a898c8",
    data: CVC_DATA,
    colors: ["#ffd6e8","#ffead6","#fff8d6","#d6fce8","#d6eeff","#ead6ff",
             "#ffd6e8","#ffead6","#fff8d6","#d6fce8","#d6eeff","#ead6ff",
             "#ffd6e8","#ffead6","#fff8d6","#d6eeff"],
    labelText:  item => item.label,
    labelColor: ()   => "#4a3060",
  },
  {
    accent:"#2a9a68", btn1:"#80e8b8", btn2:"#80b8ff",
    hubLine1:"Blend", hubLine2:"挑战", hubC1:"#3aaa78", hubC2:"#80c0a0",
    data: BLEND_DATA,
    colors: ["#d6f5e0","#ccf0d8","#c8ecd4","#d0f2dc","#d4f4e0","#d8f6e4",
             "#d4e8ff","#cce4ff","#c8e0ff","#d0e4ff","#d4e8ff","#cce4ff",
             "#ead8ff","#e4d0ff","#e8d4ff","#e0ccff","#dcc8ff",
             "#ffd8d0","#ffd0d0","#ffccc8"],
    labelText:  item => item.label,
    labelColor: item =>
      item.type === "L-blend"  ? "#1a4a3a" :
      item.type === "R-blend"  ? "#1a3a6a" :
      item.type === "S-blend"  ? "#3a1a6a" : "#5a1a0a",
  },
  {
    accent:"#e07030", btn1:"#ffb870", btn2:"#ff80b8",
    hubLine1:"Magic", hubLine2:"E ✨", hubC1:"#e07030", hubC2:"#f0a030",
    data: MAGIC_DATA,
    colors: ["#ffe8cc","#ffdfc4","#ffe4c8","#ffdabc",
             "#ffd0e8","#ffc8e4","#ffd4ec","#ffcce0",
             "#ffc8cc","#ffc0c8","#ffd0d4","#ffc4c8",
             "#e8d4ff","#e0caff","#e4d0ff","#dcc8ff"],
    labelText:  item => `${item.short}→${item.long}`,
    labelColor: item =>
      item.type === "a" ? "#b05020" :
      item.type === "i" ? "#b03060" :
      item.type === "o" ? "#a02040" : "#601890",
  },
];

const TAB_LABELS = ["CVC 词族", "Blends", "Magic E"];
const R_OUT = 160, R_IN = 46, CANVAS_SIZE = 336;

// ── CANVAS DRAW ───────────────────────────────────────────────────────────────

function drawWheel(ctx, rot, tabIdx) {
  const th   = THEMES[tabIdx];
  const data = th.data;
  const N    = data.length;
  const SLICE = (2 * Math.PI) / N;
  const cx = CANVAS_SIZE / 2, cy = CANVAS_SIZE / 2;

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  for (let i = 0; i < N; i++) {
    const s = rot + i * SLICE;
    const e = s + SLICE;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R_OUT, s, e);
    ctx.closePath();
    ctx.fillStyle = th.colors[i % th.colors.length];
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.88)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    const txt = th.labelText(data[i]);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(s + SLICE / 2);
    ctx.textAlign = "right";
    ctx.font = txt.length > 5
      ? 'bold 10px Arial, sans-serif'
      : 'bold 14px "Arial Rounded MT Bold", Arial, sans-serif';
    ctx.fillStyle   = th.labelColor(data[i]);
    ctx.shadowColor = "rgba(255,255,255,0.95)";
    ctx.shadowBlur  = 5;
    ctx.fillText(txt, R_OUT - 7, 5);
    ctx.restore();
  }

  // Outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, R_OUT, 0, 2 * Math.PI);
  ctx.strokeStyle = th.accent + "28";
  ctx.lineWidth   = 4;
  ctx.stroke();

  // Hub
  ctx.beginPath();
  ctx.arc(cx, cy, R_IN, 0, 2 * Math.PI);
  ctx.fillStyle   = "white";
  ctx.fill();
  ctx.strokeStyle = th.accent + "44";
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.textAlign  = "center";
  ctx.font       = 'bold 11px "Arial Rounded MT Bold", Arial, sans-serif';
  ctx.fillStyle  = th.hubC1;
  ctx.fillText(th.hubLine1, cx, cy - 4);
  ctx.font       = "10px Arial, sans-serif";
  ctx.fillStyle  = th.hubC2;
  ctx.fillText(th.hubLine2, cx, cy + 11);
}

function getSelected(angle, tabIdx) {
  const th    = THEMES[tabIdx];
  const N     = th.data.length;
  const SLICE = (2 * Math.PI) / N;
  const norm  = ((-Math.PI / 2 - angle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  return th.data[Math.floor(norm / SLICE) % N];
}

// ── RESULT COMPONENTS ─────────────────────────────────────────────────────────

function CvcResult({ item }) {
  const suffix = item.label.slice(1);
  return (
    <div className="sp-result">
      <div className="sp-r-label">今天练习</div>
      <div className="sp-r-main" style={{ color: "#e05898" }}>{item.label}</div>
      <div className="sp-r-sub">{item.sub}</div>
      <hr className="sp-r-divider" />
      <div className="sp-r-wlabel">一起读这些词 👇</div>
      <div className="sp-r-words">
        {item.words.map(w => (
          <div key={w} className="sp-word-chip">
            {w.slice(0, w.length - suffix.length)}
            <span style={{ color: "#e05898" }}>{suffix}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlendsResult({ item }) {
  const TC  = { "L-blend":"#2a9a68","R-blend":"#2a6aaa","S-blend":"#7a4aaa","3-letter":"#c0503a" };
  const TBG = {
    "L-blend": "linear-gradient(135deg,#d4f5e8,#d4e8ff)",
    "R-blend": "linear-gradient(135deg,#d4e4ff,#d4d4ff)",
    "S-blend": "linear-gradient(135deg,#ead4ff,#d8d4ff)",
    "3-letter":"linear-gradient(135deg,#ffd8d4,#ffd4e8)",
  };
  const tc = TC[item.type];
  return (
    <div className="sp-result">
      <div className="sp-r-label">今天练习</div>
      <div className="sp-r-main" style={{ color: tc }}>{item.label}</div>
      <div className="sp-r-tag" style={{ background: TBG[item.type], color: tc }}>{item.type}</div>
      <hr className="sp-r-divider" />
      <div className="sp-r-wlabel">一起读这些词 👇</div>
      <div className="sp-r-words">
        {item.words.map(w => (
          <div key={w} className="sp-word-chip">
            {w.startsWith(item.label)
              ? <><span style={{ color: tc }}>{item.label}</span>{w.slice(item.label.length)}</>
              : w}
          </div>
        ))}
      </div>
    </div>
  );
}

function MagicEResult({ item }) {
  const TC = { a:"#e07030", i:"#e05090", o:"#d03060", u:"#8040c0" };
  const tc = TC[item.type];
  return (
    <div className="sp-result">
      <div className="sp-r-label">今天挑战</div>
      <div className="sp-transform-row">
        <span className="sp-t-word" style={{ color: tc }}>{item.short}</span>
        <span className="sp-t-arrow">→</span>
        <span className="sp-t-word" style={{ color: tc }}>
          {item.long.slice(0, -1)}<span className="sp-magic-e">e</span>
        </span>
      </div>
      <div className="sp-r-tag" style={{ background:"linear-gradient(135deg,#fff4e8,#ffe8f4)", color: tc }}>
        {item.vowel}
      </div>
      <hr className="sp-r-divider" />
      <div className="sp-r-wlabel">更多同类词对 👇</div>
      <div className="sp-pairs-grid">
        {item.pairs.slice(0, 4).map(([sh, lo]) => (
          <>
            <div key={`s-${sh}`} className="sp-pair-short">{sh}</div>
            <div key={`a-${sh}`} className="sp-pair-arr">→</div>
            <div key={`l-${sh}`} className="sp-pair-long">
              {lo.slice(0, -1)}<span className="sp-e-hi">e</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function PhonicsSpinner() {
  const canvasRef = useRef(null);

  // All mutable animation state lives here — never triggers re-renders
  const eng = useRef({
    angle: 0, speed: 0, spinning: false,
    raf: null, savedAngles: [0, 0, 0], activeTab: 0,
  });

  const [activeTab, setActiveTab]   = useState(0);
  const [btnLabel,  setBtnLabel]    = useState("▶ 开始转动！");
  const [result,    setResult]      = useState(null); // { tabIdx, item }

  // Keep eng.activeTab in sync with React state
  const setTab = (idx) => {
    eng.current.activeTab = idx;
    setActiveTab(idx);
  };

  // Stable draw helper
  const draw = (rot, tabIdx) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawWheel(ctx, rot, tabIdx);
  };

  // Stable finish – uses eng ref so no closure issues
  const finishRef = useRef(null);
  finishRef.current = () => {
    const e = eng.current;
    cancelAnimationFrame(e.raf);
    e.spinning = false;
    e.speed    = 0;
    e.savedAngles[e.activeTab] = e.angle;
    setBtnLabel("▶ 再转一次！");
    setResult({ tabIdx: e.activeTab, item: getSelected(e.angle, e.activeTab) });
  };

  // Animation loop — uses a stable ref so rAF callback never goes stale
  const animRef = useRef(null);
  animRef.current = () => {
    const e = eng.current;
    if (!e.spinning) return;
    e.angle += e.speed;
    e.speed  *= 0.9875;
    draw(e.angle, e.activeTab);
    if (e.speed > 0.003) {
      e.raf = requestAnimationFrame(animRef.current);
    } else {
      finishRef.current();
    }
  };

  const toggle = () => {
    const e = eng.current;
    if (e.spinning) {
      finishRef.current();
    } else {
      setResult(null);
      e.speed   = 0.24 + Math.random() * 0.14;
      e.spinning = true;
      setBtnLabel("⏸ 暂停！");
      animRef.current();
    }
  };

  const switchTab = (idx) => {
    const e = eng.current;
    if (e.spinning) { cancelAnimationFrame(e.raf); e.spinning = false; e.speed = 0; }
    e.savedAngles[e.activeTab] = e.angle;
    e.angle = e.savedAngles[idx];
    setTab(idx);
    setResult(null);
    setBtnLabel("▶ 开始转动！");
    draw(e.angle, idx);
  };

  // Initial draw on mount
  useEffect(() => {
    draw(0, 0);
    return () => cancelAnimationFrame(eng.current.raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const th = THEMES[activeTab];

  return (
    <section className="sp-section card" aria-label="随机挑战转盘">
      <h2 className="section-title">🎯 随机挑战转盘</h2>
      <p className="sp-subtitle">转动转盘，选出今日练习内容</p>

      {/* Tab switcher */}
      <div className="sp-tabs">
        {TAB_LABELS.map((label, i) => (
          <button
            key={i}
            className={`sp-tab${activeTab === i ? " sp-tab-active" : ""}`}
            style={activeTab === i ? { background: th.accent } : {}}
            onClick={() => switchTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Wheel */}
      <div className="sp-wheel-area">
        <div className="sp-pointer" style={{ color: th.accent }}>▼</div>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="sp-canvas"
        />
      </div>

      {/* Spin button */}
      <button
        className="sp-btn"
        style={{ background: `linear-gradient(135deg, ${th.btn1} 0%, ${th.btn2} 100%)` }}
        onClick={toggle}
      >
        {btnLabel}
      </button>

      {/* Result card */}
      {result && (
        result.tabIdx === 0 ? <CvcResult item={result.item} /> :
        result.tabIdx === 1 ? <BlendsResult item={result.item} /> :
                              <MagicEResult item={result.item} />
      )}
    </section>
  );
}
