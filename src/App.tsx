import { useMemo, useState } from "react";

type Lang = "da" | "en";
type Page = "home" | "programme" | "history" | "literature" | "quiz" | "concepts" | "sources";
type IconName =
  | "home"
  | "calendar"
  | "history"
  | "book"
  | "quiz"
  | "arrow"
  | "back"
  | "clock"
  | "pin"
  | "menu"
  | "close"
  | "check";

const hero =
  "https://images.unsplash.com/photo-1529016912215-a4c95c80d1dc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";
const archive =
  "https://images.unsplash.com/photo-1581952449676-b59f9fc1b746?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000";
const reading =
  "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000";

const copy = {
  da: {
    theme: "Køn i litteraturen",
    date: "12.–14. JUNI · EGESKOV",
    explore: "Udforsk programmet",
    history: "Udforsk historien",
    quiz: "Tag quizzen",
    upcoming: "Næste på programmet",
    seeAll: "Se hele programmet",
    intro:
      "Hvem får lov til at skrive historien? Tre dage med litteratur, idéer og samtaler om køn, magt og frihed.",
    programme: "Program",
    friday: "Fredag",
    saturday: "Lørdag",
    sunday: "Søndag",
    location: "Sted",
    speakers: "Medvirkende",
    about: "Om samtalen",
    book: "Gem event",
    saved: "Gemt",
    timeline: "Kønnets historie",
    timelineIntro: "En tidslinje over de idéer og bevægelser, der forandrede vores syn på køn.",
    literature: "Litteratur",
    litIntro: "To tekster, der stadig udfordrer vores idéer om hjemmet, kroppen og friheden.",
    concepts: "Begreber",
    sources: "Kilder & videre læsning",
    menu: "Mere",
    primary: "Primære kilder",
    secondary: "Sekundære kilder",
    question: "Spørgsmål",
    next: "Næste spørgsmål",
    result: "Dit resultat",
    restart: "Prøv igen",
    correct: "Korrekt",
    incorrect: "Ikke helt",
    scoreText: "Du har et skarpt blik for køn, litteratur og historie.",
    home: "Hjem",
    quizNav: "Quiz",
    readMore: "Læs mere",
    analysis: "Kort analyse",
    characters: "Karakterer",
  },
  en: {
    theme: "Gender in Literature",
    date: "12–14 JUNE · EGESKOV",
    explore: "Explore programme",
    history: "Explore the history",
    quiz: "Take the quiz",
    upcoming: "Coming up",
    seeAll: "View full programme",
    intro:
      "Who gets to write the story? Three days of literature, ideas and conversations about gender, power and freedom.",
    programme: "Programme",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    location: "Location",
    speakers: "Speakers",
    about: "About the conversation",
    book: "Save event",
    saved: "Saved",
    timeline: "A history of gender",
    timelineIntro: "A timeline of the ideas and movements that changed how we understand gender.",
    literature: "Literature",
    litIntro: "Two texts that still challenge our ideas about home, the body and freedom.",
    concepts: "Key concepts",
    sources: "Sources & further reading",
    menu: "More",
    primary: "Primary sources",
    secondary: "Secondary sources",
    question: "Question",
    next: "Next question",
    result: "Your result",
    restart: "Try again",
    correct: "Correct",
    incorrect: "Not quite",
    scoreText: "You have a keen eye for gender, literature and history.",
    home: "Home",
    quizNav: "Quiz",
    readMore: "Read more",
    analysis: "Short analysis",
    characters: "Characters",
  },
};

const events = [
  {
    id: 1,
    day: "friday",
    time: "12:30–14:00",
    title: "Fra stemmeret til #MeToo og manosfæren",
    speakers: "Ditlev Tamm & Gry Jexen",
    venue: "Haven · Talks",
    desc: {
      da: "En historisk samtale om kampen for stemmeret, ligestillingens bølger og den digitale modreaktion. Hvordan hænger fortidens kvindekamp sammen med #MeToo og manosfæren?",
      en: "A historical conversation about suffrage, waves of equality and the digital backlash. How does the women’s movement connect to #MeToo and the manosphere?",
    },
  },
  {
    id: 2,
    day: "friday",
    time: "18:00–19:30",
    title: "Women in American Literature",
    speakers: "Lucia Odoom & Leah Greenblat",
    venue: "Literature Stage",
    desc: {
      da: "Fra Gilman til Morrison: en levende samtale om kvindestemmer, race og frihed i den amerikanske litterære kanon.",
      en: "From Gilman to Morrison: a lively conversation about women’s voices, race and freedom in the American literary canon.",
    },
  },
  {
    id: 3,
    day: "saturday",
    time: "13:00–15:00",
    title: "The Progressive Era og Det moderne gennembrud",
    speakers: "Tine Høegh & Johanne Mygind",
    venue: "Haven · Talks",
    desc: {
      da: "To litterære opbrud på hver sin side af Atlanten. Forfatterne undersøger, hvordan litteraturen blev en kampplads for køn og modernitet.",
      en: "Two literary awakenings on either side of the Atlantic. The authors explore how literature became a battleground for gender and modernity.",
    },
  },
  {
    id: 4,
    day: "saturday",
    time: "17:30–19:00",
    title: "Emancipation, gender roles and gender theory",
    speakers: "Vincent Hendricks, Svend Brinkmann & Judith Butler",
    venue: "Heartland Stage",
    desc: {
      da: "Hvad betyder frigørelse i dag? Tre markante tænkere mødes om kønsroller, identitet og de normer, der former vores liv.",
      en: "What does emancipation mean today? Three leading thinkers meet to discuss gender roles, identity and the norms shaping our lives.",
    },
  },
  {
    id: 5,
    day: "sunday",
    time: "10:00–11:00",
    title: "Et dukkehjem?",
    speakers: "Lasse Horne Kjældgaard & Anne Marie Mai",
    venue: "Literature Stage",
    desc: {
      da: "Ibsens Nora smækkede med døren i 1879. Hvad hører vi i ekkoet i dag? En nærlæsning af et drama, der ændrede litteraturhistorien.",
      en: "Ibsen’s Nora slammed the door in 1879. What do we hear in its echo today? A close reading of a play that changed literary history.",
    },
  },
];

const periods = [
  {
    year: "1870–90",
    title: { da: "Det moderne gennembrud", en: "The Modern Breakthrough" },
    text: {
      da: "Litteraturen satte køn, ægteskab og seksualmoral under debat. Ibsen og Brandes udfordrede det borgerlige hjems idealer.",
      en: "Literature put gender, marriage and sexual morality up for debate. Ibsen and Brandes challenged ideals of the bourgeois home.",
    },
    source: "Georg Brandes, Hovedstrømninger (1871)",
    image: reading,
  },
  {
    year: "1886–1915",
    title: { da: "Kampen for stemmeret", en: "The suffrage movement" },
    text: {
      da: "Danske kvinder organiserede sig politisk og fik stemmeret til Folketinget i 1915.",
      en: "Danish women organised politically and won the parliamentary vote in 1915.",
    },
    source: "Danmarkshistorien.dk · Kvinders valgret",
    image: archive,
  },
  {
    year: "1970–85",
    title: { da: "Rødstrømpebevægelsen", en: "The Redstocking movement" },
    text: {
      da: "Aktivister gjorde det private politisk og kæmpede for ligeløn, fri abort og opgør med traditionelle kønsroller.",
      en: "Activists made the personal political and fought for equal pay, abortion rights and freedom from traditional gender roles.",
    },
    source: "Kvinfo · Rødstrømpebevægelsen",
    image: hero,
  },
  {
    year: "2017",
    title: { da: "#MeToo", en: "#MeToo" },
    text: {
      da: "Millioner delte erfaringer med seksuel chikane. Bevægelsen flyttede fokus fra enkeltpersoner til magt og strukturer.",
      en: "Millions shared experiences of sexual harassment. The movement shifted attention from individuals to power and structures.",
    },
    source: "Tarana Burke · Me Too movement",
    image: reading,
  },
  {
    year: "NU",
    title: { da: "Køn & manosfæren", en: "Gender & the manosphere" },
    text: {
      da: "Sociale medier skærper debatten om maskulinitet, identitet og ligestilling. Nye fællesskaber skaber både tilhørsforhold og polarisering.",
      en: "Social media intensifies debates about masculinity, identity and equality. New communities create both belonging and polarisation.",
    },
    source: "Center for Digital Youth Care (2024)",
    image: hero,
  },
];

const concepts = [
  [
    "Gender",
    "Køn",
    "The social, cultural and personal meanings connected to being a woman, man or another gender.",
    "De sociale, kulturelle og personlige betydninger, der knytter sig til at være kvinde, mand eller et andet køn.",
  ],
  [
    "Gender stereotypes",
    "Kønsstereotyper",
    "Simplified expectations about how people should act based on gender.",
    "Forenklede forventninger til, hvordan mennesker bør være på baggrund af køn.",
  ],
  [
    "Gender performativity",
    "Kønsperformativitet",
    "Judith Butler’s idea that gender is created through repeated acts, language and norms.",
    "Judith Butlers idé om, at køn skabes gennem gentagne handlinger, sprog og normer.",
  ],
  [
    "Queer",
    "Queer",
    "An umbrella term and a perspective that challenges fixed ideas about gender and sexuality.",
    "Et paraplybegreb og et perspektiv, der udfordrer faste idéer om køn og seksualitet.",
  ],
  [
    "#MeToo",
    "#MeToo",
    "A movement against sexual harassment and abuse of power, founded by Tarana Burke.",
    "En bevægelse mod seksuel chikane og magtmisbrug, grundlagt af Tarana Burke.",
  ],
  [
    "Manosphere",
    "Manosfæren",
    "Online communities focused on men and masculinity; some promote anti-feminist ideas.",
    "Onlinefællesskaber om mænd og maskulinitet; nogle fremmer antifeministiske idéer.",
  ],
  [
    "Morality Feud",
    "Sædelighedsfejden",
    "A Nordic 1880s debate about sexual morality and unequal standards for men and women.",
    "En nordisk debat i 1880’erne om seksualmoral og den ulige målestok for mænd og kvinder.",
  ],
];

const questions = [
  {
    q: {
      da: "Hvornår fik danske kvinder stemmeret til Folketinget?",
      en: "When did Danish women gain the parliamentary vote?",
    },
    options: ["1849", "1915", "1945"],
    correct: 1,
  },
  {
    q: { da: "Hvem skrev Et dukkehjem?", en: "Who wrote A Doll’s House?" },
    options: ["Henrik Ibsen", "Georg Brandes", "Amalie Skram"],
    correct: 0,
  },
  {
    q: {
      da: "Hvilket begreb forbindes med Judith Butler?",
      en: "Which concept is associated with Judith Butler?",
    },
    options: ["Naturalism", "Gender performativity", "Suffrage"],
    correct: 1,
  },
  {
    q: { da: "Hvem grundlagde Me Too-bevægelsen?", en: "Who founded the Me Too movement?" },
    options: ["Tarana Burke", "Simone de Beauvoir", "Gloria Steinem"],
    correct: 0,
  },
  {
    q: {
      da: "Hvad symboliserer tapetet hos Gilman?",
      en: "What does Gilman’s wallpaper symbolise?",
    },
    options: ["Economic growth", "Social control and confinement", "Romantic love"],
    correct: 1,
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const p: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5M9 21v-7h6v7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5M12 7v5l3 2" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z" />
        <path d="M4 6.5v13M8 8h8" />
      </>
    ),
    quiz: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.3 2.3 0 1 1 3.5 2c-1 .6-1.3 1-1.3 2M12 17h.01" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    back: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p[name]}
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("da");
  const [page, setPage] = useState<Page>("home");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [menu, setMenu] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const t = copy[lang];

  const go = (p: Page) => {
    setPage(p);
    setSelectedEvent(null);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const dayName = (day: string) => t[day as "friday" | "saturday" | "sunday"];
  const selected = useMemo(() => events.find((e) => e.id === selectedEvent), [selectedEvent]);

  const Header = () => (
    <header className="topbar">
      <button className="wordmark" onClick={() => go("home")} aria-label="Heartland home">
        <span>HEART</span>
        <span>LAND</span>
      </button>
      <div className="header-actions">
        <button
          className="language"
          onClick={() => setLang(lang === "da" ? "en" : "da")}
          aria-label="Switch language"
        >
          <span className={lang === "da" ? "active" : ""}>DA</span>
          <i />
          <span className={lang === "en" ? "active" : ""}>EN</span>
        </button>
        <button className="icon-button" onClick={() => setMenu(true)} aria-label={t.menu}>
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );

  const PageTop = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
    <div className="page-top">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
    </div>
  );

  const EventCard = ({
    event,
    featured = false,
  }: {
    event: (typeof events)[number];
    featured?: boolean;
  }) => (
    <button
      className={`event-card ${featured ? "featured" : ""}`}
      onClick={() => {
        setSelectedEvent(event.id);
        setPage("programme");
        window.scrollTo(0, 0);
      }}
    >
      <div className="event-meta">
        <span>{dayName(event.day)}</span>
        <span>{event.time}</span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.speakers}</p>
      <span className="round-arrow">
        <Icon name="arrow" size={17} />
      </span>
    </button>
  );

  const Home = () => (
    <>
      <section className="hero">
        <img src={hero} alt="A reader by a window" />
        <div className="hero-tint" />
        <div className="hero-copy">
          <p>{t.date}</p>
          <h1>{t.theme}</h1>
          <span>
            HEARTLAND
            <br />
            FESTIVAL 2027
          </span>
        </div>
        <div className="vertical-type">LITERATURE · ART · IDEAS</div>
      </section>
      <section className="intro section">
        <span className="section-number">01</span>
        <h2>{t.intro}</h2>
        <div className="action-grid">
          <button className="primary-action" onClick={() => go("programme")}>
            {t.explore}
            <Icon name="arrow" />
          </button>
          <button className="text-action" onClick={() => go("history")}>
            {t.history}
            <Icon name="arrow" />
          </button>
          <button className="text-action" onClick={() => go("quiz")}>
            {t.quiz}
            <Icon name="arrow" />
          </button>
        </div>
      </section>
      <section className="upcoming section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">12.06.27</p>
            <h2>{t.upcoming}</h2>
          </div>
          <span className="orange-dot" />
        </div>
        {events.slice(0, 2).map((e, i) => (
          <EventCard event={e} featured={i === 0} key={e.id} />
        ))}
        <button className="link-button" onClick={() => go("programme")}>
          {t.seeAll}
          <Icon name="arrow" size={17} />
        </button>
      </section>
    </>
  );

  const Programme = () => {
    if (selected)
      return (
        <section className="detail-page">
          <button className="back-button" onClick={() => setSelectedEvent(null)}>
            <Icon name="back" />
            {t.programme}
          </button>
          <div className="detail-number">0{selected.id}</div>
          <p className="eyebrow orange">
            {dayName(selected.day)} · {selected.time}
          </p>
          <h1>{selected.title}</h1>
          <p className="lead">{selected.desc[lang]}</p>
          <div className="info-grid">
            <div>
              <Icon name="clock" />
              <span>
                {selected.time}
                <small>{dayName(selected.day)}, 12–14 June</small>
              </span>
            </div>
            <div>
              <Icon name="pin" />
              <span>
                {selected.venue}
                <small>Egeskov Castle</small>
              </span>
            </div>
          </div>
          <div className="detail-section">
            <p className="eyebrow">{t.speakers}</p>
            <h2>{selected.speakers}</h2>
          </div>
          <div className="detail-section">
            <p className="eyebrow">{t.about}</p>
            <p>{selected.desc[lang]}</p>
          </div>
          <button
            className={`primary-action save ${saved.includes(selected.id) ? "is-saved" : ""}`}
            onClick={() =>
              setSaved((s) =>
                s.includes(selected.id)
                  ? s.filter((id) => id !== selected.id)
                  : [...s, selected.id],
              )
            }
          >
            {saved.includes(selected.id) ? (
              <>
                <Icon name="check" />
                {t.saved}
              </>
            ) : (
              t.book
            )}
          </button>
        </section>
      );
    return (
      <section className="listing-page">
        <PageTop eyebrow="12–14 · 06 · 2027" title={t.programme} />
        {["friday", "saturday", "sunday"].map((day) => (
          <div className="day-group" key={day}>
            <div className="day-title">
              <h2>{dayName(day)}</h2>
              <span>{day === "friday" ? "12.06" : day === "saturday" ? "13.06" : "14.06"}</span>
            </div>
            {events
              .filter((e) => e.day === day)
              .map((e) => (
                <EventCard event={e} key={e.id} />
              ))}
          </div>
        ))}
      </section>
    );
  };

  const History = () => (
    <section className="history-page">
      <PageTop eyebrow="1870 → 2027" title={t.timeline} />
      <p className="page-intro">{t.timelineIntro}</p>
      <div className="timeline">
        {periods.map((p, i) => (
          <article className={`timeline-item ${selectedPeriod === i ? "open" : ""}`} key={p.year}>
            <button onClick={() => setSelectedPeriod(i)}>
              <span className="timeline-year">{p.year}</span>
              <h2>{p.title[lang]}</h2>
              <span className="plus">{selectedPeriod === i ? "−" : "+"}</span>
            </button>
            {selectedPeriod === i && (
              <div className="timeline-content">
                <img src={p.image} alt="" />
                <p>{p.text[lang]}</p>
                <a href="https://danmarkshistorien.dk/" target="_blank" rel="noreferrer">
                  {p.source} <Icon name="arrow" size={15} />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
      <button className="source-banner" onClick={() => go("sources")}>
        <span>{t.sources}</span>
        <Icon name="arrow" />
      </button>
    </section>
  );

  const Literature = () => {
    const [activeBook, setActiveBook] = useState(0);
    const books = [
      {
        tag: "1879 · DRAMA",
        title: lang === "da" ? "Et dukkehjem" : "A Doll’s House",
        author: "Henrik Ibsen",
        quote: "“Jeg tror, at jeg først og fremst er et menneske, jeg, ligesåvel som du.”",
        citation: "Nora, Act III (Danish original, 1879)",
        image: reading,
        analysis:
          lang === "da"
            ? "Noras hjem ligner et trygt dukkehus, men ægteskabet bygger på økonomisk og social kontrol. Hendes berømte dørsmæk er et krav om frihed og selvkundskab."
            : "Nora’s home resembles a safe doll’s house, yet the marriage rests on economic and social control. Her famous door slam is a demand for freedom and self-knowledge.",
        people: [
          [
            "Nora",
            lang === "da"
              ? "Fra hustru til selvstændigt menneske"
              : "From wife to independent person",
          ],
          [
            "Torvald",
            lang === "da"
              ? "Ægtemand og patriarkalsk autoritet"
              : "Husband and patriarchal authority",
          ],
          [
            "Krogstad",
            lang === "da" ? "Afslører hjemmets magtspil" : "Exposes the home’s power struggle",
          ],
        ],
      },
      {
        tag: "1892 · SHORT STORY",
        title: "The Yellow Wallpaper",
        author: "Charlotte Perkins Gilman",
        quote: "“There are things in that paper that nobody knows but me, or ever will.”",
        citation: "The Yellow Wallpaper (1892)",
        image: hero,
        analysis:
          lang === "da"
            ? "Fortællerens indespærring og behandling gør hjemmet til et fængsel. Tapetets mønster bliver et billede på både hendes mentale opløsning og kampen mod kvindelig ufrihed."
            : "The narrator’s confinement and treatment turn the home into a prison. The wallpaper becomes an image of both her mental disintegration and her struggle against women’s lack of freedom.",
        people: [
          [
            "The narrator",
            lang === "da" ? "Forfatter i tvungen hvilekur" : "A writer subjected to a rest cure",
          ],
          [
            "John",
            lang === "da" ? "Læge, ægtemand og kontrollant" : "Doctor, husband and authority",
          ],
        ],
      },
    ];
    const b = books[activeBook];
    return (
      <section className="literature-page">
        <PageTop eyebrow="CLOSE READING" title={t.literature} />
        <p className="page-intro">{t.litIntro}</p>
        <div className="book-tabs">
          {books.map((book, i) => (
            <button
              className={activeBook === i ? "active" : ""}
              onClick={() => setActiveBook(i)}
              key={book.title}
            >
              <span>0{i + 1}</span>
              {book.author.split(" ").at(-1)}
            </button>
          ))}
        </div>
        <article className="book-feature">
          <div className="book-image">
            <img src={b.image} alt="" />
            <span>{b.tag}</span>
          </div>
          <p className="eyebrow">{b.author}</p>
          <h2>{b.title}</h2>
          <blockquote>
            {b.quote}
            <cite>{b.citation}</cite>
          </blockquote>
          <div className="analysis">
            <p className="eyebrow">{t.analysis}</p>
            <p>{b.analysis}</p>
          </div>
          <div className="characters">
            <p className="eyebrow">{t.characters}</p>
            {b.people.map((person, i) => (
              <div key={person[0]}>
                <span>0{i + 1}</span>
                <h3>{person[0]}</h3>
                <p>{person[1]}</p>
              </div>
            ))}
          </div>
        </article>
        <button className="source-banner orange-bg" onClick={() => go("concepts")}>
          <span>{t.concepts}</span>
          <Icon name="arrow" />
        </button>
      </section>
    );
  };

  const Quiz = () => {
    const finished = qIndex >= questions.length;
    const choose = (i: number) => {
      if (answer !== null) return;
      setAnswer(i);
      if (i === questions[qIndex].correct) setScore((s) => s + 1);
    };
    const next = () => {
      setQIndex((i) => i + 1);
      setAnswer(null);
    };
    const reset = () => {
      setQIndex(0);
      setScore(0);
      setAnswer(null);
    };
    return (
      <section className="quiz-page">
        {!finished ? (
          <>
            <div className="quiz-head">
              <p className="eyebrow">{t.quizNav}</p>
              <span>{String(qIndex + 1).padStart(2, "0")} / 05</span>
            </div>
            <div className="progress">
              <i style={{ width: `${((qIndex + 1) / 5) * 100}%` }} />
            </div>
            <p className="question-label">
              {t.question} {qIndex + 1}
            </p>
            <h1>{questions[qIndex].q[lang]}</h1>
            <div className="answers">
              {questions[qIndex].options.map((o, i) => (
                <button
                  onClick={() => choose(i)}
                  className={
                    answer === null
                      ? ""
                      : i === questions[qIndex].correct
                        ? "correct"
                        : i === answer
                          ? "wrong"
                          : "muted"
                  }
                  key={o}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {o}
                  {answer !== null && i === questions[qIndex].correct && <Icon name="check" />}
                </button>
              ))}
            </div>
            {answer !== null && (
              <div className="feedback">
                <strong>{answer === questions[qIndex].correct ? t.correct : t.incorrect}</strong>
                <button onClick={next}>
                  {t.next}
                  <Icon name="arrow" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="result">
            <div className="score-ring">
              <strong>{score}</strong>
              <span>/ 5</span>
            </div>
            <p className="eyebrow">{t.result}</p>
            <h1>
              {score >= 4
                ? t.scoreText
                : lang === "da"
                  ? "Godt gået — historien har flere lag at udforske."
                  : "Well done — history has more layers to explore."}
            </h1>
            <button className="primary-action" onClick={reset}>
              {t.restart}
              <Icon name="history" />
            </button>
          </div>
        )}
      </section>
    );
  };

  const Concepts = () => (
    <section className="concept-page">
      <PageTop eyebrow="A–Z" title={t.concepts} />
      <div className="concept-list">
        {concepts.map((c, i) => (
          <details key={c[0]} open={i === 0}>
            <summary>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h2>{lang === "da" ? c[1] : c[0]}</h2>
              <i>+</i>
            </summary>
            <p>{lang === "da" ? c[3] : c[2]}</p>
          </details>
        ))}
      </div>
    </section>
  );

  const Sources = () => {
    const primary = [
      ["Henrik Ibsen, Et dukkehjem (1879)", "https://www.ibsen.uio.no/DRVIT_Du%7CDuht.xhtml"],
      [
        "Charlotte Perkins Gilman, The Yellow Wallpaper (1892)",
        "https://www.gutenberg.org/ebooks/1952",
      ],
      [
        "Danmarks Riges Grundlov (1915)",
        "https://danmarkshistorien.dk/vis/materiale/grundloven-5-juni-1915",
      ],
    ];
    const secondary = [
      ["KVINFO — Dansk kvindehistorie", "https://kvinfo.dk/"],
      ["Danmarkshistorien — Kvinders valgret", "https://danmarkshistorien.dk/"],
      [
        "Encyclopaedia Britannica — The Modern Breakthrough",
        "https://www.britannica.com/art/Scandinavian-literature",
      ],
    ];
    return (
      <section className="sources-page">
        <PageTop eyebrow="READ · WATCH · LISTEN" title={t.sources} />
        <p className="page-intro">
          {lang === "da"
            ? "Et kurateret udvalg af originale tekster, arkiver og fagligt efterprøvede introduktioner."
            : "A curated selection of original texts, archives and scholarly introductions."}
        </p>
        {[
          [t.primary, primary],
          [t.secondary, secondary],
        ].map(([heading, list]) => (
          <div className="source-group" key={heading as string}>
            <h2>{heading as string}</h2>
            {(list as string[][]).map(([title, url], i) => (
              <a href={url} target="_blank" rel="noreferrer" key={title}>
                <span>0{i + 1}</span>
                <p>{title}</p>
                <Icon name="arrow" />
              </a>
            ))}
          </div>
        ))}
      </section>
    );
  };

  const screens: Record<Page, React.ReactNode> = {
    home: <Home />,
    programme: <Programme />,
    history: <History />,
    literature: <Literature />,
    quiz: <Quiz />,
    concepts: <Concepts />,
    sources: <Sources />,
  };
  const nav: [Page, IconName, string][] = [
    ["home", "home", t.home],
    ["programme", "calendar", t.programme],
    ["history", "history", lang === "da" ? "Historie" : "History"],
    ["literature", "book", t.literature],
    ["quiz", "quiz", t.quizNav],
  ];

  return (
    <div className="app-shell">
      <Header />
      <main>{screens[page]}</main>
      <nav className="bottom-nav">
        {nav.map(([p, icon, label]) => (
          <button className={page === p ? "active" : ""} onClick={() => go(p)} key={p}>
            <Icon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      {menu && (
        <div className="menu-overlay">
          <div className="menu-top">
            <span>HEARTLAND · 2027</span>
            <button onClick={() => setMenu(false)}>
              <Icon name="close" size={25} />
            </button>
          </div>
          <div className="menu-links">
            <button onClick={() => go("concepts")}>
              <span>01</span>
              {t.concepts}
              <Icon name="arrow" />
            </button>
            <button onClick={() => go("sources")}>
              <span>02</span>
              {t.sources}
              <Icon name="arrow" />
            </button>
            <button onClick={() => go("programme")}>
              <span>03</span>
              {t.programme}
              <Icon name="arrow" />
            </button>
          </div>
          <p>
            HEARTLAND FESTIVAL
            <br />
            EGESKOV · DENMARK
          </p>
        </div>
      )}
    </div>
  );
}
