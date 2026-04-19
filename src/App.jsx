import { useMemo, useState } from "react";

const wordPool = [
  { text: "cat", hint: "短元音 a，c-a-t" },
  { text: "bed", hint: "短元音 e，b-e-d" },
  { text: "ship", hint: "注意 sh 发 /sh/" },
  { text: "chip", hint: "注意 ch 发 /ch/" },
  { text: "fish", hint: "结尾 sh，f-i-sh" },
  { text: "map", hint: "闭音节，a 发短音" }
];

const rules = [
  { sound: "短元音 /a/", rule: "a + 辅音（闭音节）", examples: ["cat", "bag", "map"] },
  { sound: "短元音 /e/", rule: "e + 辅音（闭音节）", examples: ["bed", "pen", "red"] },
  { sound: "辅音组合 /sh/", rule: "sh 通常发 /sh/", examples: ["ship", "shop", "fish"] },
  { sound: "辅音组合 /ch/", rule: "ch 常见发 /ch/", examples: ["chip", "chat", "lunch"] }
];

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

export default function App() {
  const [currentWord, setCurrentWord] = useState(wordPool[0]);
  const [feedback, setFeedback] = useState({ text: "", type: "" });

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
        <h2 className="section-title">常见拼读规则</h2>
        <div className="grid">
          {rules.map((item) => (
            <article className="card" key={item.sound}>
              <div className="sound">{item.sound}</div>
              <div className="rule">{item.rule}</div>
              <ul className="examples">
                {item.examples.map((word) => (
                  <li key={word}>
                    <button
                      type="button"
                      className="speak-word"
                      aria-label={`朗读单词 ${word}`}
                      onClick={() =>
                        speakWord(word, (text) =>
                          setCurrentWord((prev) => ({ ...prev, hint: text }))
                        )
                      }
                    >
                      {word}
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
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

      <footer>小建议：每天练习 10 分钟，连续 2 周会看到明显进步。</footer>
    </main>
  );
}
