import { useMemo, useState, useCallback } from "react";
import PhonicsSpinner from "./PhonicsSpinner";

const wordImages = {
  cat: "🐱", bag: "🎒", map: "🗺️", hat: "👒", fan: "🌀",
  bed: "🛏️", pen: "🖊️", red: "🔴", wet: "💧", leg: "🦵",
  sit: "🪑", pig: "🐷", big: "🐘", win: "🏆", tip: "💡",
  dog: "🐕", hot: "🔥", pot: "🍲", box: "📦", fox: "🦊",
  cup: "☕", bus: "🚌", run: "🏃", sun: "☀️", cut: "✂️",
  cake: "🎂", make: "🔨", lake: "🏞️", name: "📛", gate: "🚪",
  these: "👇", eve: "🌙", Pete: "👦",
  bike: "🚲", like: "❤️", time: "⏰", five: "5️⃣", kite: "🪁",
  home: "🏠", nose: "👃", bone: "🦴", hope: "🌈", note: "📝",
  cute: "🥰", use: "🔧", huge: "🦣", tube: "🧪", cube: "🧊",
  rain: "🌧️", train: "🚂", play: "🎮", day: "🌞", say: "💬",
  see: "👁️", tree: "🌳", eat: "🍽️", sea: "🌊", read: "📖",
  boat: "⛵", coat: "🧥", snow: "❄️", grow: "🌱", show: "📺",
  moon: "🌙", food: "🍔", blue: "🔵", true: "✅", new: "✨",
  house: "🏡", out: "👉", cow: "🐄", how: "❓", now: "⏱️",
  oil: "🛢️", coin: "🪙", boy: "👦", toy: "🧸", joy: "😊",
  auto: "🚗", pause: "⏸️", saw: "🪚", draw: "✏️", law: "⚖️",
  car: "🚗", star: "⭐", park: "🏞️", farm: "🌾", art: "🎨",
  for: "➡️", or: "↔️", fork: "🍴", corn: "🌽", storm: "⛈️",
  her: "👩", bird: "🐦", turn: "🔄", girl: "👧", nurse: "👩‍⚕️",
  ear: "👂", near: "📍", deer: "🦌", beer: "🍺", hear: "👂",
  air: "💨", fair: "🎡", care: "💗", share: "🤝", hair: "💇",
  ship: "🚢", shop: "🏪", fish: "🐟", wish: "🌠", she: "👩",
  chip: "🍟", chat: "💬", lunch: "🍱", check: "✔️", beach: "🏖️",
  think: "🤔", thing: "📦", math: "🔢", bath: "🛁", three: "3️⃣",
  this: "👆", that: "👇", the: "📌", them: "👥", with: "🤝",
  phone: "📱", photo: "📷", graph: "📊", elephant: "🐘", dolphin: "🐬",
  sing: "🎤", ring: "💍", long: "📏", song: "🎵", king: "👑",
  back: "🔙", duck: "🦆", kick: "🦶", sock: "🧦", clock: "🕐",
  watch: "⌚", catch: "🤲", match: "🔥", witch: "🧙‍♀️", kitchen: "🍳",
  what: "❓", when: "📅", where: "📍", white: "⬜", why: "🤷",
  blue: "🔵", black: "⬛", block: "🧱", blow: "🌬️", blank: "📄",
  brown: "🟤", bread: "🍞", bring: "🤲", brick: "🧱", bridge: "🌉",
  class: "🏫", clean: "🧹", clock: "🕐", climb: "🧗", close: "🚪",
  cry: "😢", cross: "✝️", cream: "🍦", crab: "🦀", crown: "👑",
  draw: "✏️", drive: "🚗", drink: "🥤", drop: "💧", dress: "👗",
  fly: "✈️", flag: "🏳️", floor: "🏠", flower: "🌸", flat: "🏢",
  free: "🆓", friend: "🧑‍🤝‍🧑", from: "📤", fresh: "🌿", frog: "🐸",
  glass: "🥃", glad: "😊", glow: "✨", glue: "🧴", globe: "🌍",
  green: "🟢", great: "👍", grow: "🌱", grass: "🌿", group: "👥",
  play: "🎮", plan: "📋", place: "📍", plate: "🍽️", plus: "➕",
  pray: "🙏", print: "🖨️", price: "💰", proud: "🦚", prize: "🏆",
  sky: "🌌", skin: "🖐️", skip: "⏭️", skill: "🎯", skate: "⛸️",
  slow: "🐢", sleep: "😴", slide: "🛝", slim: "🏃", slip: "🍌",
  small: "🐜", smell: "👃", smile: "😊", smart: "🧠", smoke: "💨",
  snow: "❄️", snake: "🐍", snap: "📸", snack: "🍪", sneeze: "🤧",
  spin: "🌀", spot: "📍", speak: "🗣️", spend: "💸", space: "🚀",
  stop: "🛑", star: "⭐", step: "👣", stay: "🏠", stone: "🪨",
  swim: "🏊", sweet: "🍬", swing: "🎠", switch: "🔀", swan: "🦢",
  tree: "🌳", train: "🚂", try: "💪", true: "✅", trip: "✈️",
  two: "2️⃣", twin: "👯", twist: "🌀", twelve: "🕛", twenty: "2️⃣0️⃣",
  know: "🧠", knee: "🦵", knife: "🔪", knock: "🚪", knight: "🛡️",
  write: "✍️", wrong: "❌", wrap: "🎁", wrist: "⌚", wreck: "💥",
  sign: "🪧", gnaw: "🦷", gnat: "🦟", gnome: "🧙", design: "🎨",
  lamb: "🐑", climb: "🧗", comb: "💇", thumb: "👍", bomb: "💣",
  high: "⬆️", night: "🌙", light: "💡", right: "➡️", sight: "👁️"
};

const wordPool = [
  { text: "cat", hint: "短元音 a，c-a-t" },
  { text: "bed", hint: "短元音 e，b-e-d" },
  { text: "ship", hint: "注意 sh 发 /ʃ/" },
  { text: "chip", hint: "注意 ch 发 /tʃ/" },
  { text: "cake", hint: "魔法 e，a 发长音 /eɪ/" },
  { text: "rain", hint: "ai 组合发 /eɪ/" },
  { text: "tree", hint: "ee 组合发 /iː/" },
  { text: "car", hint: "ar 组合发 /ɑːr/" },
  { text: "bird", hint: "ir 组合发 /ɜːr/" },
  { text: "blue", hint: "bl 辅音连读" },
  { text: "phone", hint: "ph 发 /f/" },
  { text: "knight", hint: "kn 中 k 不发音" }
];

const rulesData = [
  {
    category: "短元音",
    rules: [
      { sound: "/æ/", rule: "a 在闭音节中", examples: ["cat", "bag", "map", "hat", "fan"] },
      { sound: "/ɛ/", rule: "e 在闭音节中", examples: ["bed", "pen", "red", "wet", "leg"] },
      { sound: "/ɪ/", rule: "i 在闭音节中", examples: ["sit", "pig", "big", "win", "tip"] },
      { sound: "/ɒ/", rule: "o 在闭音节中", examples: ["dog", "hot", "pot", "box", "fox"] },
      { sound: "/ʌ/", rule: "u 在闭音节中", examples: ["cup", "bus", "run", "sun", "cut"] }
    ]
  },
  {
    category: "长元音（魔法 e）",
    rules: [
      { sound: "/eɪ/", rule: "a_e 结构", examples: ["cake", "make", "lake", "name", "gate"] },
      { sound: "/iː/", rule: "e_e 结构", examples: ["these", "eve", "Pete"] },
      { sound: "/aɪ/", rule: "i_e 结构", examples: ["bike", "like", "time", "five", "kite"] },
      { sound: "/əʊ/", rule: "o_e 结构", examples: ["home", "nose", "bone", "hope", "note"] },
      { sound: "/juː/", rule: "u_e 结构", examples: ["cute", "use", "huge", "tube", "cube"] }
    ]
  },
  {
    category: "元音组合",
    rules: [
      { sound: "/eɪ/", rule: "ai, ay", examples: ["rain", "train", "play", "day", "say"] },
      { sound: "/iː/", rule: "ee, ea", examples: ["see", "tree", "eat", "sea", "read"] },
      { sound: "/əʊ/", rule: "oa, ow", examples: ["boat", "coat", "snow", "grow", "show"] },
      { sound: "/uː/", rule: "oo, ue, ew", examples: ["moon", "food", "blue", "true", "new"] },
      { sound: "/aʊ/", rule: "ou, ow", examples: ["house", "out", "cow", "how", "now"] },
      { sound: "/ɔɪ/", rule: "oi, oy", examples: ["oil", "coin", "boy", "toy", "joy"] },
      { sound: "/ɔː/", rule: "au, aw", examples: ["auto", "pause", "saw", "draw", "law"] }
    ]
  },
  {
    category: "R 控制元音",
    rules: [
      { sound: "/ɑːr/", rule: "ar", examples: ["car", "star", "park", "farm", "art"] },
      { sound: "/ɔːr/", rule: "or", examples: ["for", "or", "fork", "corn", "storm"] },
      { sound: "/ɜːr/", rule: "er, ir, ur", examples: ["her", "bird", "turn", "girl", "nurse"] },
      { sound: "/ɪər/", rule: "ear, eer", examples: ["ear", "near", "deer", "beer", "hear"] },
      { sound: "/eər/", rule: "air, are", examples: ["air", "fair", "care", "share", "hair"] }
    ]
  },
  {
    category: "辅音组合",
    rules: [
      { sound: "/ʃ/", rule: "sh", examples: ["ship", "shop", "fish", "wish", "she"] },
      { sound: "/tʃ/", rule: "ch", examples: ["chip", "chat", "lunch", "check", "beach"] },
      { sound: "/θ/", rule: "th (清音)", examples: ["think", "thing", "math", "bath", "three"] },
      { sound: "/ð/", rule: "th (浊音)", examples: ["this", "that", "the", "them", "with"] },
      { sound: "/f/", rule: "ph", examples: ["phone", "photo", "graph", "elephant", "dolphin"] },
      { sound: "/ŋ/", rule: "ng", examples: ["sing", "ring", "long", "song", "king"] },
      { sound: "/k/", rule: "ck", examples: ["back", "duck", "kick", "sock", "clock"] },
      { sound: "/tʃ/", rule: "tch", examples: ["watch", "catch", "match", "witch", "kitchen"] },
      { sound: "/hw/", rule: "wh", examples: ["what", "when", "where", "white", "why"] }
    ]
  },
  {
    category: "辅音连读",
    rules: [
      { sound: "/bl/", rule: "bl", examples: ["blue", "black", "block", "blow", "blank"] },
      { sound: "/br/", rule: "br", examples: ["brown", "bread", "bring", "brick", "bridge"] },
      { sound: "/cl/", rule: "cl", examples: ["class", "clean", "clock", "climb", "close"] },
      { sound: "/cr/", rule: "cr", examples: ["cry", "cross", "cream", "crab", "crown"] },
      { sound: "/dr/", rule: "dr", examples: ["draw", "drive", "drink", "drop", "dress"] },
      { sound: "/fl/", rule: "fl", examples: ["fly", "flag", "floor", "flower", "flat"] },
      { sound: "/fr/", rule: "fr", examples: ["free", "friend", "from", "fresh", "frog"] },
      { sound: "/gl/", rule: "gl", examples: ["glass", "glad", "glow", "glue", "globe"] },
      { sound: "/gr/", rule: "gr", examples: ["green", "great", "grow", "grass", "group"] },
      { sound: "/pl/", rule: "pl", examples: ["play", "plan", "place", "plate", "plus"] },
      { sound: "/pr/", rule: "pr", examples: ["pray", "print", "price", "proud", "prize"] },
      { sound: "/sk/", rule: "sk", examples: ["sky", "skin", "skip", "skill", "skate"] },
      { sound: "/sl/", rule: "sl", examples: ["slow", "sleep", "slide", "slim", "slip"] },
      { sound: "/sm/", rule: "sm", examples: ["small", "smell", "smile", "smart", "smoke"] },
      { sound: "/sn/", rule: "sn", examples: ["snow", "snake", "snap", "snack", "sneeze"] },
      { sound: "/sp/", rule: "sp", examples: ["spin", "spot", "speak", "spend", "space"] },
      { sound: "/st/", rule: "st", examples: ["stop", "star", "step", "stay", "stone"] },
      { sound: "/sw/", rule: "sw", examples: ["swim", "sweet", "swing", "switch", "swan"] },
      { sound: "/tr/", rule: "tr", examples: ["tree", "train", "try", "true", "trip"] },
      { sound: "/tw/", rule: "tw", examples: ["two", "twin", "twist", "twelve", "twenty"] }
    ]
  },
  {
    category: "不发音字母",
    rules: [
      { sound: "k 不发音", rule: "kn", examples: ["know", "knee", "knife", "knock", "knight"] },
      { sound: "w 不发音", rule: "wr", examples: ["write", "wrong", "wrap", "wrist", "wreck"] },
      { sound: "g 不发音", rule: "gn", examples: ["sign", "gnaw", "gnat", "gnome", "design"] },
      { sound: "b 不发音", rule: "mb", examples: ["lamb", "climb", "comb", "thumb", "bomb"] },
      { sound: "gh 不发音", rule: "igh", examples: ["high", "night", "light", "right", "sight"] }
    ]
  }
];

const rules = rulesData.flatMap(category => 
  category.rules.map(rule => ({ ...rule, category: category.category }))
);

function speakWord(word, onUnsupported) {
  if (!window.speechSynthesis) {
    onUnsupported?.("当前浏览器不支持语音朗读，请手动拼读。");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function highlightPattern(word, pattern) {
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = word.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="highlight">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function WordCard({ word, pattern, onClick }) {
  const emoji = wordImages[word] || "📝";
  return (
    <div className="word-card" onClick={() => { onClick(); speakWord(word); }}>
      <div className="word-card-emoji">{emoji}</div>
      <div className="word-card-text" translate="no">
        {highlightPattern(word, pattern)}
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, rule, category }) {
  if (!isOpen || !rule) return null;

  const pattern = rule.rule.replace(/[_\s]/g, "").replace(/[()（）]/g, "").split(",")[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <span className="modal-sound" translate="no">{rule.sound}</span>
          <span className="modal-rule">{rule.rule}</span>
        </div>
        <div className="word-cards-grid">
          {rule.examples.map((word) => (
            <WordCard key={word} word={word} pattern={pattern} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentWord, setCurrentWord] = useState(wordPool[0]);
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [modalData, setModalData] = useState({ isOpen: false, rule: null, category: "" });

  const toggleCategory = useCallback((category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  }, []);

  const openModal = useCallback((rule, category) => {
    setModalData({ isOpen: true, rule, category });
  }, []);

  const closeModal = useCallback(() => {
    setModalData({ isOpen: false, rule: null, category: "" });
  }, []);

  const quizQuestion = useMemo(
    () => ({
      title: "“ship” 中的 “sh” 发什么音？",
      rightAnswer: "/sh/",
      options: ["/sh/", "/ch/", "/s/"]
    }),
    []
  );

  const pickWord = () => {
    const nextWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    setCurrentWord(nextWord);
  };

  const onQuizAnswer = (value) => {
    const isRight = value === quizQuestion.rightAnswer;
    setFeedback({
      text: isRight ? "回答正确！sh 发 /sh/。" : "再试试：ship 里的 sh 发 /sh/。",
      type: isRight ? "good" : "bad"
    });
  };

  return (
    <main className="container">
      <section className="hero">
        <h1>自然拼读学习站</h1>
        <p className="subtitle">
          通过“字母（组合）→ 发音 → 单词”的方式训练英语阅读能力。先掌握规则，再通过听读和小测验巩固。
        </p>
      </section>

      <section className="card rules-section" aria-label="自然拼读规则">
        <h2 className="section-title">自然拼读规则大全</h2>
        {rulesData.map((categoryData) => {
          const isExpanded = expandedCategories[categoryData.category];
          const displayRules = isExpanded ? categoryData.rules : categoryData.rules.slice(0, 2);
          const hasMore = categoryData.rules.length > 2;
          
          return (
            <div key={categoryData.category} className="rules-category">
              <h3 className="category-title">
                {categoryData.category}
                <span className="rule-count">({categoryData.rules.length})</span>
              </h3>
              <div className="grid">
                {displayRules.map((item) => (
                  <article 
                    className="card clickable" 
                    key={`${categoryData.category}-${item.sound}`}
                    onClick={() => openModal(item, categoryData.category)}
                  >
                    <div className="sound" translate="no">{item.sound}</div>
                    <div className="rule">{item.rule}</div>
                    <ul className="examples" translate="no">
                      {item.examples.slice(0, 3).map((word) => (
                        <li key={word}>
                          <span className="example-word">{word}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="card-hint">点击查看全部</div>
                  </article>
                ))}
              </div>
              {hasMore && (
                <button
                  type="button"
                  className="expand-btn"
                  onClick={() => toggleCategory(categoryData.category)}
                >
                  {isExpanded ? "收起" : `展开全部 ${categoryData.rules.length} 条规则`}
                </button>
              )}
            </div>
          );
        })}
      </section>

      <section className="practice" aria-label="单词练习">
        <h2 className="section-title">读音练习</h2>
        <div className="controls">
          <button type="button" onClick={pickWord}>
            换一个单词
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() =>
              speakWord(currentWord.text, (text) =>
                setCurrentWord((prev) => ({ ...prev, hint: text }))
              )
            }
          >
            朗读单词
          </button>
        </div>
        <div className="word-box">{currentWord.text}</div>
        <p className="hint">提示：{currentWord.hint}</p>
      </section>

      <section className="quiz" aria-label="拼读小测验">
        <h2 className="section-title">拼读小测验</h2>
        <p>{quizQuestion.title}</p>
        <div className="options">
          {quizQuestion.options.map((option) => (
            <button type="button" key={option} onClick={() => onQuizAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
        <div className={`feedback ${feedback.type}`} role="status" aria-live="polite">
          {feedback.text}
        </div>
      </section>

      <PhonicsSpinner />

      <footer>小建议：每天练习 10 分钟，连续 2 周会看到明显进步。</footer>

      <Modal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        rule={modalData.rule}
        category={modalData.category}
      />
    </main>
  );
}
