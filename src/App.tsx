import { useState } from "react";

type Lang = "da" | "en";
type Page =
  | "welcome"
  | "home"
  | "explore"
  | "timeline"
  | "ibsen"
  | "yellow"
  | "glossary"
  | "programme"
  | "questions"
  | "my";
type IconName =
  | "home"
  | "explore"
  | "calendar"
  | "question"
  | "heart"
  | "arrow"
  | "back"
  | "clock"
  | "pin"
  | "bookmark"
  | "check"
  | "search"
  | "close";

const images = {
  hero: "https://images.unsplash.com/photo-1529016912215-a4c95c80d1dc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
  archive:
    "https://images.unsplash.com/photo-1581952449676-b59f9fc1b746?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1000",
  reader:
    "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1000",
  theatre:
    "https://images.unsplash.com/photo-1705944601101-fdb49dbf884c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1000",
  wallpaper:
    "https://images.unsplash.com/photo-1690268798033-ae52e4e57db6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1000",
};

const ui = {
  da: {
    dates: "10.–12. JUNI 2027 · EGESKOV",
    theme: "Køn i litteraturen",
    enter: "Udforsk temaet",
    welcome: "Velkommen tilbage",
    today: "Dagens fremhævede samtale",
    explore: "Udforsk",
    programme: "Program",
    questions: "Spørgsmål",
    my: "Mit Heartland",
    home: "Hjem",
    timeline: "Historisk tidslinje",
    glossary: "Begrebsbibliotek",
    literature: "Litterære værker",
    savedTalks: "Gemte talks",
    viewAll: "Se alle",
    readStory: "Åbn oplevelsen",
    save: "Gem talk",
    saved: "Gemt",
    prepare: "Forbered et spørgsmål",
    speakers: "Medvirkende",
    related: "Relaterede temaer",
    preparation: "Tænk over før talken",
    back: "Tilbage",
    search: "Søg efter et begreb",
    definition: "Definition",
    background: "Historisk baggrund",
    example: "Eksempel",
    relevance: "Relevans i dag",
    sources: "Kilde",
    selectTalk: "Vælg en talk",
    suggestions: "Forslag til spørgsmål",
    ownQuestion: "Skriv dit eget spørgsmål",
    placeholder: "Hvad vil du gerne spørge om?",
    saveQuestion: "Gem spørgsmål",
    yourQuestions: "Dine spørgsmål",
    noQuestions: "Du har endnu ikke gemt et spørgsmål.",
    savedArticles: "Gemte artikler",
    favouriteConcepts: "Favoritbegreber",
    schedule: "Din festivalplan",
    empty: "Intet gemt endnu",
    profileIntro: "Din personlige samling til tre dage mellem linjerne.",
    friday: "Fredag",
    saturday: "Lørdag",
    sunday: "Søndag",
    english: "Engelsk",
    danish: "Dansk",
    language: "Sprog",
  },
  en: {
    dates: "10–12 JUNE 2027 · EGESKOV",
    theme: "Gender in Literature",
    enter: "Explore the theme",
    welcome: "Welcome back",
    today: "Today’s featured talk",
    explore: "Explore",
    programme: "Programme",
    questions: "Questions",
    my: "My Heartland",
    home: "Home",
    timeline: "Historical timeline",
    glossary: "Theory glossary",
    literature: "Literary works",
    savedTalks: "Saved talks",
    viewAll: "View all",
    readStory: "Open experience",
    save: "Save talk",
    saved: "Saved",
    prepare: "Prepare a question",
    speakers: "Speakers",
    related: "Related themes",
    preparation: "Consider before the talk",
    back: "Back",
    search: "Search for a concept",
    definition: "Definition",
    background: "Historical background",
    example: "Example",
    relevance: "Relevance today",
    sources: "Source",
    selectTalk: "Choose a talk",
    suggestions: "Suggested questions",
    ownQuestion: "Write your own question",
    placeholder: "What would you like to ask?",
    saveQuestion: "Save question",
    yourQuestions: "Your questions",
    noQuestions: "You have not saved a question yet.",
    savedArticles: "Saved articles",
    favouriteConcepts: "Favourite concepts",
    schedule: "Your festival schedule",
    empty: "Nothing saved yet",
    profileIntro: "Your personal collection for three days between the lines.",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    english: "English",
    danish: "Danish",
    language: "Language",
  },
};

const talks = [
  {
    id: 1,
    day: "friday",
    date: "10.06",
    time: "12:30–14:00",
    language: "danish",
    title: {
      da: "Fra stemmeret til #MeToo og manosfæren",
      en: "From suffrage to #MeToo and the manosphere",
    },
    subtitle: {
      da: "Ligestillingskamp gennem tiden",
      en: "The struggle for equality through time",
    },
    speakers: "Ditlev Tamm · Gry Jexen",
    venue: "Haven · Talks",
    intro: {
      da: "En historisk samtale om stemmeret, ligestillingsbevægelser og den digitale modreaktion. Hvad ændrer sig — og hvad vender tilbage?",
      en: "A historical conversation about suffrage, equality movements and the digital backlash. What changes — and what returns?",
    },
    tags: ["Suffrage", "#MeToo", "Manosphere"],
  },
  {
    id: 2,
    day: "friday",
    date: "10.06",
    time: "18:00–19:30",
    language: "english",
    title: { da: "Women in American Literature", en: "Women in American Literature" },
    subtitle: {
      da: "Med særligt fokus på The Yellow Wallpaper",
      en: "With a special focus on The Yellow Wallpaper",
    },
    speakers: "Lucia Odoom · Leah Greenblat",
    venue: "Literature Stage",
    intro: {
      da: "En nærlæsning af kvindestemmer, mental sundhed og social kontrol i amerikansk litteratur.",
      en: "A close reading of women’s voices, mental health and social control in American literature.",
    },
    tags: ["The Yellow Wallpaper", "Progressive Era", "Mental health"],
  },
  {
    id: 3,
    day: "saturday",
    date: "11.06",
    time: "13:00–15:00",
    language: "danish",
    title: {
      da: "The Progressive Era og Det moderne gennembrud",
      en: "The Progressive Era and the Modern Breakthrough",
    },
    subtitle: { da: "Litteraturen som kampplads", en: "Literature as a battleground" },
    speakers: "Tine Høegh · Johanne Mygind",
    venue: "Haven · Talks",
    intro: {
      da: "To moderne opbrud på hver sin side af Atlanten. Hvordan blev litteraturen et sted for social kritik?",
      en: "Two modern awakenings on either side of the Atlantic. How did literature become a site for social criticism?",
    },
    tags: ["Modern Breakthrough", "Progressive Era", "Literature"],
  },
  {
    id: 4,
    day: "saturday",
    date: "11.06",
    time: "17:30–19:00",
    language: "english",
    title: {
      da: "Emancipation, kønsroller og kønsteori",
      en: "Emancipation, gender roles and gender theory",
    },
    subtitle: {
      da: "Er køn biologisk eller performativt?",
      en: "Is gender biological or performative?",
    },
    speakers: "Vincent Hendricks · Svend Brinkmann · Judith Butler",
    venue: "Heartland Stage",
    intro: {
      da: "En filosofisk samtale om identitet, krop, normer og frigørelse.",
      en: "A philosophical conversation about identity, bodies, norms and emancipation.",
    },
    tags: ["Performativity", "Emancipation", "Identity"],
  },
  {
    id: 5,
    day: "sunday",
    date: "12.06",
    time: "10:00–11:00",
    language: "danish",
    title: { da: "Et dukkehjem?", en: "A Doll’s House?" },
    subtitle: {
      da: "Kønsroller i dansk litteratur og kultur",
      en: "Gender roles in Danish literature and culture",
    },
    speakers: "Lasse Horne Kjældgaard · Anne Marie Mai",
    venue: "Literature Stage",
    intro: {
      da: "Ibsens Nora smækkede med døren i 1879. Hvad hører vi i ekkoet i dag?",
      en: "Ibsen’s Nora slammed the door in 1879. What do we hear in its echo today?",
    },
    tags: ["A Doll’s House", "Marriage", "Freedom"],
  },
];

const concepts = [
  {
    term: { da: "Kønsstereotyper", en: "Gender stereotypes" },
    definition: {
      da: "Forenklede forventninger til mennesker baseret på køn.",
      en: "Simplified expectations placed on people based on gender.",
    },
    history: {
      da: "Blev udfordret tydeligt af 1800-tallets kvindebevægelse og Det moderne gennembrud.",
      en: "Were visibly challenged by the nineteenth-century women’s movement and the Modern Breakthrough.",
    },
    example: {
      da: "Torvald behandler Nora som et barn frem for en ligeværdig voksen.",
      en: "Torvald treats Nora as a child rather than an equal adult.",
    },
    today: {
      da: "Stereotyper påvirker stadig arbejde, omsorg og repræsentation.",
      en: "Stereotypes still shape work, care and representation.",
    },
  },
  {
    term: { da: "Queer", en: "Queer" },
    definition: {
      da: "Et paraplybegreb og et kritisk perspektiv, der udfordrer faste kategorier for køn og seksualitet.",
      en: "An umbrella term and critical perspective challenging fixed categories of gender and sexuality.",
    },
    history: {
      da: "Ordet blev generobret af aktivister og forskere i slutningen af det 20. århundrede.",
      en: "The word was reclaimed by activists and scholars in the late twentieth century.",
    },
    example: {
      da: "En queer læsning spørger, hvilke identiteter en tekst gør mulige eller umulige.",
      en: "A queer reading asks which identities a text makes possible or impossible.",
    },
    today: {
      da: "Bruges både om identitet og som analyse af normer.",
      en: "Used both as an identity and as a way of analysing norms.",
    },
  },
  {
    term: { da: "#MeToo", en: "#MeToo" },
    definition: {
      da: "En bevægelse mod seksuel chikane og magtmisbrug, grundlagt af Tarana Burke.",
      en: "A movement against sexual harassment and abuse of power, founded by Tarana Burke.",
    },
    history: {
      da: "Grundlagt i 2006 og globalt udbredt som hashtag i 2017.",
      en: "Founded in 2006 and spread globally as a hashtag in 2017.",
    },
    example: {
      da: "Personlige vidnesbyrd synliggjorde strukturelle mønstre.",
      en: "Personal testimony made structural patterns visible.",
    },
    today: {
      da: "Har ændret samtaler om samtykke, arbejdspladser og ansvar.",
      en: "It has changed conversations about consent, workplaces and accountability.",
    },
  },
  {
    term: { da: "Manosfæren", en: "Manosphere" },
    definition: {
      da: "Et løst netværk af onlinefællesskaber om mænd og maskulinitet; nogle er eksplicit antifeministiske.",
      en: "A loose network of online communities about men and masculinity; some are explicitly anti-feminist.",
    },
    history: {
      da: "Voksede frem med internetfora og senere sociale mediers algoritmer.",
      en: "Developed through internet forums and later social-media algorithms.",
    },
    example: {
      da: "Fortællinger om køn cirkulerer som memes, videoer og personlige råd.",
      en: "Stories about gender circulate through memes, videos and personal advice.",
    },
    today: {
      da: "Former især unges samtaler om køn, relationer og tilhørsforhold.",
      en: "Shapes young people’s conversations about gender, relationships and belonging.",
    },
  },
  {
    term: { da: "Kønsperformativitet", en: "Gender performativity" },
    definition: {
      da: "Judith Butlers teori om, at køn skabes og stabiliseres gennem gentagne handlinger og normer.",
      en: "Judith Butler’s theory that gender is produced and stabilised through repeated acts and norms.",
    },
    history: {
      da: "Centralt formuleret i Gender Trouble (1990).",
      en: "Famously developed in Gender Trouble (1990).",
    },
    example: {
      da: "Noras rolle som 'lærkefugl' bliver til gennem sprog, tøj og adfærd.",
      en: "Nora’s role as a ‘skylark’ is produced through language, clothing and behaviour.",
    },
    today: {
      da: "Giver et sprog for at forstå, hvordan normer gentages — og kan forandres.",
      en: "Offers language for understanding how norms are repeated — and can change.",
    },
  },
  {
    term: { da: "Emancipation", en: "Emancipation" },
    definition: {
      da: "Frigørelse fra juridisk, social eller politisk underordning.",
      en: "Liberation from legal, social or political subordination.",
    },
    history: {
      da: "Et nøglebegreb i oplysningstid, arbejderbevægelse og kvindebevægelse.",
      en: "A key idea in Enlightenment thought, labour movements and women’s movements.",
    },
    example: {
      da: "Noras afrejse kan læses som en individuel emancipationshandling.",
      en: "Nora’s departure can be read as an individual act of emancipation.",
    },
    today: {
      da: "Rejser spørgsmålet om, hvem der har reel frihed og handlekraft.",
      en: "Raises the question of who has meaningful freedom and agency.",
    },
  },
  {
    term: { da: "Feminisme", en: "Feminism" },
    definition: {
      da: "Idéer og bevægelser, der arbejder for lighed på tværs af køn.",
      en: "Ideas and movements working toward equality across genders.",
    },
    history: {
      da: "Har forskellige traditioner og historiske bølger, ikke én samlet teori.",
      en: "Has multiple traditions and historical waves rather than one single theory.",
    },
    example: {
      da: "Feministisk litteraturkritik undersøger stemme, magt og repræsentation.",
      en: "Feminist literary criticism examines voice, power and representation.",
    },
    today: {
      da: "Forbinder ofte køn med race, klasse, seksualitet og handicap.",
      en: "Often connects gender with race, class, sexuality and disability.",
    },
  },
  {
    term: { da: "Sædelighedsfejden", en: "The Morality Debate" },
    definition: {
      da: "En nordisk debat i 1880’erne om seksualmoral og den ulige målestok for mænd og kvinder.",
      en: "An 1880s Nordic debate about sexual morality and unequal standards for women and men.",
    },
    history: {
      da: "Forfattere som Bjørnstjerne Bjørnson og Amalie Skram deltog i debatten.",
      en: "Writers including Bjørnstjerne Bjørnson and Amalie Skram took part.",
    },
    example: {
      da: "Litteraturen satte dobbeltmoral og ægteskab under debat.",
      en: "Literature put double standards and marriage up for debate.",
    },
    today: {
      da: "Debatten klinger videre i spørgsmål om skam, samtykke og seksuel frihed.",
      en: "The debate echoes in questions about shame, consent and sexual freedom.",
    },
  },
];

const timeline = [
  {
    year: "1871–90",
    title: { da: "Det moderne gennembrud", en: "The Modern Breakthrough" },
    context: {
      da: "Brandes’ krav om at sætte problemer under debat blev et program for nordisk litteratur. Ægteskab, seksualmoral og kvinders rettigheder rykkede ind i kunsten.",
      en: "Brandes’s call to put problems under debate became a programme for Nordic literature. Marriage, sexual morality and women’s rights entered art.",
    },
    literary: "Henrik Ibsen · Amalie Skram · J.P. Jacobsen",
    quote:
      "“Det, at en Literatur i vore Dage lever, viser sig i, at den sætter Problemer under Debat.”",
    source: "Georg Brandes, Hovedstrømninger i det 19de Aarhundredes Litteratur (1872)",
    why: {
      da: "Litteraturens rolle som offentlig modstemme er stadig central.",
      en: "Literature’s role as a public countervoice remains central.",
    },
    image: images.reader,
  },
  {
    year: "1890–1920",
    title: { da: "The Progressive Era", en: "The Progressive Era" },
    context: {
      da: "Amerikanske reformbevægelser udfordrede arbejdsforhold, sundhed, stemmeret og kønnede begrænsninger.",
      en: "American reform movements challenged labour conditions, health, suffrage and gendered restrictions.",
    },
    literary: "Charlotte Perkins Gilman · Kate Chopin",
    quote: "“There are things in that paper that nobody knows but me, or ever will.”",
    source: "Charlotte Perkins Gilman, The Yellow Wallpaper (1892)",
    why: {
      da: "Tekster fra perioden viser, hvordan omsorg kan blive til kontrol.",
      en: "Texts from the era show how care can become control.",
    },
    image: images.wallpaper,
  },
  {
    year: "1915 / 1920",
    title: { da: "Kvinders stemmeret", en: "Women’s suffrage" },
    context: {
      da: "Danske kvinder fik fuld politisk valgret i 1915; i USA blev det 19. forfatningstillæg ratificeret i 1920.",
      en: "Danish women gained full political voting rights in 1915; the US ratified the 19th Amendment in 1920.",
    },
    literary: "Taler · aviser · politiske pamfletter",
    quote:
      "“The right of citizens of the United States to vote shall not be denied … on account of sex.”",
    source: "U.S. Constitution, 19th Amendment (1920)",
    why: {
      da: "Formelle rettigheder ændrer ikke automatisk, hvem der bliver hørt.",
      en: "Formal rights do not automatically change who is heard.",
    },
    image: images.archive,
  },
  {
    year: "1960–80",
    title: { da: "Kvindefrigørelse", en: "Women’s liberation" },
    context: {
      da: "Rødstrømper og andre bevægelser gjorde det private politisk og krævede ligeløn, fri abort og nye kønsroller.",
      en: "Redstockings and other movements made the personal political and demanded equal pay, abortion rights and new gender roles.",
    },
    literary: "Suzanne Brøgger · Vita Andersen · feministiske tidsskrifter",
    quote: "“The personal is political.”",
    source: "Carol Hanisch, The Personal Is Political (essay written 1969; published 1970)",
    why: {
      da: "Hverdagsliv og intimitet forstås fortsat som steder, hvor magt virker.",
      en: "Everyday life and intimacy are still understood as places where power operates.",
    },
    image: images.hero,
  },
  {
    year: "2006 / 2017",
    title: { da: "#MeToo", en: "#MeToo" },
    context: {
      da: "Tarana Burke grundlagde Me Too i 2006. I 2017 gjorde millioner af vidnesbyrd bevægelsen global.",
      en: "Tarana Burke founded Me Too in 2006. In 2017, millions of testimonies made the movement global.",
    },
    literary: "Vidnesbyrd · memoirer · digital fortælling",
    quote: "[Indsæt verificeret citat fra det udleverede skolemateriale]",
    source: "Indholdspladsholder / content placeholder — metoomvmt.org",
    why: {
      da: "Personlige fortællinger kan synliggøre strukturelle magtforhold.",
      en: "Personal stories can reveal structural power relations.",
    },
    image: images.reader,
  },
  {
    year: "I DAG",
    title: { da: "Køn, identitet og modreaktion", en: "Gender, identity and backlash" },
    context: {
      da: "Kønsidentitet, maskulinitet og manosfæren præger en polariseret digital offentlighed.",
      en: "Gender identity, masculinity and the manosphere shape a polarised digital public.",
    },
    literary: "Autofiktion · spoken word · digitale fortællinger",
    quote: "[Indsæt verificeret citat fra det udleverede skolemateriale]",
    source: "Indholdspladsholder / content placeholder",
    why: {
      da: "De fortællinger, vi deler, former både identitet og fællesskab.",
      en: "The stories we share shape both identity and community.",
    },
    image: images.hero,
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5M9 21v-7h6v7" />
      </>
    ),
    explore: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    question: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.3 2.3 0 1 1 3.5 2c-1 .6-1.3 1-1.3 2M12 17h.01" />
      </>
    ),
    heart: (
      <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    back: <path d="m15 18-6-6 6-6" />,
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
    bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
    check: <path d="m5 12 4 4L19 6" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
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
      {paths[name]}
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang | null>(null);
  const [page, setPage] = useState<Page>("welcome");
  const [selectedTalk, setSelectedTalk] = useState<number | null>(null);
  const [selectedEra, setSelectedEra] = useState(0);
  const [savedTalks, setSavedTalks] = useState<number[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [openConcept, setOpenConcept] = useState<number | null>(0);
  const [questionTalk, setQuestionTalk] = useState(1);
  const [draft, setDraft] = useState("");
  const [questions, setQuestions] = useState<{ talk: number; text: string }[]>([]);
  const [themeAnswer, setThemeAnswer] = useState<number | null>(null);
  const language = lang ?? "da";
  const t = ui[language];

  const go = (destination: Page) => {
    setPage(destination);
    setSelectedTalk(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleSaved = (id: number) =>
    setSavedTalks((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const toggleArticle = (id: string) =>
    setSavedArticles((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const currentTalk = talks.find((talk) => talk.id === selectedTalk);

  const LanguageSwitch = ({ light = false, full = false }: { light?: boolean; full?: boolean }) => (
    <div className={`language-switch ${light ? "light" : ""}`} aria-label={t.language}>
      <button className={language === "da" ? "active" : ""} onClick={() => setLang("da")}>
        {full ? "Dansk" : "DA"}
      </button>
      <i />
      <button className={language === "en" ? "active" : ""} onClick={() => setLang("en")}>
        {full ? "English" : "EN"}
      </button>
    </div>
  );

  const Header = () => (
    <header className="topbar">
      <button className="heartland-mark" onClick={() => go("home")} aria-label="Heartland home">
        <span>HEART</span>
        <span>LAND</span>
      </button>
      <div className="edition">BETWEEN THE LINES · 2027</div>
      <LanguageSwitch />
    </header>
  );

  const PageIntro = ({ index, title, intro }: { index: string; title: string; intro?: string }) => (
    <div className="page-intro">
      <p className="kicker">{index} · HEARTLAND 2027</p>
      <h1>{title}</h1>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );

  const ArrowButton = ({
    children,
    onClick,
    solid = false,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    solid?: boolean;
  }) => (
    <button className={`arrow-button ${solid ? "solid" : ""}`} onClick={onClick}>
      <span>{children}</span>
      <i>
        <Icon name="arrow" size={17} />
      </i>
    </button>
  );

  const TalkCard = ({ talk }: { talk: (typeof talks)[number] }) => (
    <button
      className="talk-card"
      onClick={() => {
        setSelectedTalk(talk.id);
        setPage("programme");
        window.scrollTo(0, 0);
      }}
    >
      <div className="talk-meta">
        <span>{t[talk.day as "friday" | "saturday" | "sunday"]}</span>
        <span>{talk.time}</span>
        <span>{t[talk.language as "danish" | "english"]}</span>
      </div>
      <h3>{talk.title[language]}</h3>
      <p>{talk.subtitle[language]}</p>
      <strong>{talk.speakers}</strong>
      <i>
        <Icon name="arrow" size={16} />
      </i>
    </button>
  );

  const Welcome = () => (
    <section className="welcome-screen">
      <img src={images.hero} alt="A reader framed by a window" />
      <div className="welcome-overlay" />
      <div className="welcome-head">
        <div className="heartland-mark light">
          <span>HEART</span>
          <span>LAND</span>
        </div>
        <LanguageSwitch light full />
      </div>
      <div className="welcome-copy">
        <p className="kicker">{t.dates}</p>
        <h1>
          BETWEEN
          <br />
          THE <em>LINES</em>
        </h1>
        <p className="danish-title">Mellem linjerne</p>
        <div className="welcome-theme">
          <span>2027 THEME</span>
          <p>{t.theme}</p>
        </div>
        <ArrowButton
          solid
          onClick={() => {
            if (!lang) setLang("da");
            go("home");
          }}
        >
          {t.enter}
        </ArrowButton>
      </div>
      <p className="photo-credit">Photo · Yuri Efremov / Unsplash</p>
    </section>
  );

  const Home = () => (
    <section className="home-page">
      <div className="home-hero">
        <p className="kicker">{t.dates}</p>
        <h1>
          {t.welcome},
          <br />
          <em>Anna.</em>
        </h1>
        <p>
          {t.theme} —{" "}
          {language === "da"
            ? "historier om magt, frihed og hvem vi kan være."
            : "stories about power, freedom and who we can become."}
        </p>
      </div>

      <div className="featured-talk">
        <div className="card-label">
          <span>{t.today}</span>
          <span>01 / 05</span>
        </div>
        <div className="featured-image">
          <img src={images.theatre} alt="Dramatic theatre curtain" />
          <span>FRI · 12:30</span>
        </div>
        <h2>{talks[0].title[language]}</h2>
        <p>{talks[0].speakers}</p>
        <ArrowButton
          onClick={() => {
            setSelectedTalk(1);
            setPage("programme");
          }}
        >
          {t.readStory}
        </ArrowButton>
      </div>

      <div className="dashboard-section">
        <div className="section-title">
          <p className="kicker">CURATED FOR YOU</p>
          <h2>{language === "da" ? "Gå på opdagelse" : "Start exploring"}</h2>
        </div>
        <div className="dashboard-grid">
          <button className="dashboard-card tall" onClick={() => go("explore")}>
            <img src={images.reader} alt="" />
            <span>01</span>
            <h3>
              {language === "da" ? "Forstå festivalens tema" : "Understand the festival theme"}
            </h3>
            <Icon name="arrow" />
          </button>
          <button className="dashboard-card orange" onClick={() => go("timeline")}>
            <span>02</span>
            <h3>{t.timeline}</h3>
            <small>1871 → TODAY</small>
            <Icon name="arrow" />
          </button>
          <button className="dashboard-card cream" onClick={() => go("glossary")}>
            <span>03</span>
            <h3>{t.glossary}</h3>
            <small>8 CONCEPTS</small>
            <Icon name="arrow" />
          </button>
        </div>
      </div>

      <div className="home-literature">
        <div className="section-title row">
          <div>
            <p className="kicker">CLOSE READING</p>
            <h2>{t.literature}</h2>
          </div>
          <span>2 STORIES</span>
        </div>
        <button onClick={() => go("ibsen")}>
          <span>1879 · HENRIK IBSEN</span>
          <h3>{language === "da" ? "Et dukkehjem" : "A Doll’s House"}</h3>
          <Icon name="arrow" />
        </button>
        <button onClick={() => go("yellow")}>
          <span>1892 · C. P. GILMAN</span>
          <h3>The Yellow Wallpaper</h3>
          <Icon name="arrow" />
        </button>
      </div>
    </section>
  );

  const Explore = () => (
    <section className="explore-page">
      <PageIntro
        index="01"
        title={
          language === "da" ? "At læse køn mellem linjerne" : "Reading gender between the lines"
        }
        intro={
          language === "da"
            ? "Litteraturen afspejler ikke bare samfundet. Den kan også udfordre de roller, historier og muligheder, vi tager for givet."
            : "Literature does not merely reflect society. It can challenge the roles, stories and possibilities we take for granted."
        }
      />
      <div className="editorial-image">
        <img src={images.reader} alt="Person reading a book" />
        <span>WORDS SHAPE WORLDS</span>
      </div>
      <div className="essay-block">
        <span className="dropcap">G</span>
        <p>
          {language === "da"
            ? "Køn i litteraturen handler om mere end forfatterens eller karakterens køn. Det handler om stemme, magt og handlemuligheder: Hvem taler? Hvem bliver set? Hvem får lov til at forlade hjemmet?"
            : "Gender in literature is about more than the gender of an author or character. It is about voice, power and agency: Who speaks? Who is seen? Who is allowed to leave home?"}
        </p>
      </div>
      <div className="big-questions">
        <p className="kicker">THREE WAYS IN</p>
        {[
          {
            da: "Hvordan har kønsroller ændret sig gennem historien?",
            en: "How have gender roles changed through history?",
          },
          {
            da: "Hvordan udfordrer litteraturen samfundet?",
            en: "How does literature challenge society?",
          },
          {
            da: "Kan en fortælling ændre, hvad vi opfatter som normalt?",
            en: "Can a story change what we consider normal?",
          },
        ].map((question, index) => (
          <button
            className={themeAnswer === index ? "active" : ""}
            onClick={() => setThemeAnswer(themeAnswer === index ? null : index)}
            key={question.en}
          >
            <span>0{index + 1}</span>
            <h3>{question[language]}</h3>
            <i>{themeAnswer === index ? "−" : "+"}</i>
            {themeAnswer === index && (
              <p>
                {language === "da"
                  ? [
                      "Love, uddannelse og arbejde har ændret rammerne, mens litteraturen viser, hvordan gamle normer kan leve videre i intimitet og sprog.",
                      "Ved at give stemme til erfaringer, som ellers holdes private, kan litteraturen gøre magt synlig og skabe nye forestillinger om frihed.",
                      "Ja. Fortællinger lader os prøve andre perspektiver og opdage, at det 'naturlige' ofte er historisk og socialt skabt.",
                    ][index]
                  : [
                      "Law, education and work have changed the framework, while literature shows how old norms can persist in intimacy and language.",
                      "By voicing experiences otherwise kept private, literature can make power visible and imagine new forms of freedom.",
                      "Yes. Stories let us inhabit other perspectives and discover that what seems ‘natural’ is often historically and socially produced.",
                    ][index]}
              </p>
            )}
          </button>
        ))}
      </div>
      <div className="concept-strip">
        <div className="section-title row">
          <h2>{language === "da" ? "Nøglebegreber" : "Key concepts"}</h2>
          <span>SWIPE →</span>
        </div>
        <div className="concept-scroll">
          {concepts.slice(0, 5).map((concept, index) => (
            <button
              key={concept.term.en}
              onClick={() => {
                setSearch(concept.term[language]);
                go("glossary");
              }}
            >
              <span>0{index + 1}</span>
              <h3>{concept.term[language]}</h3>
              <p>{concept.definition[language]}</p>
            </button>
          ))}
        </div>
        <ArrowButton onClick={() => go("timeline")}>{t.timeline}</ArrowButton>
      </div>
    </section>
  );

  const Timeline = () => {
    const era = timeline[selectedEra];
    return (
      <section className="timeline-page">
        <PageIntro
          index="02"
          title={t.timeline}
          intro={
            language === "da"
              ? "Seks nedslag i de idéer og bevægelser, der ændrede vores forestillinger om køn."
              : "Six moments in the ideas and movements that changed how we imagine gender."
          }
        />
        <div className="era-rail">
          {timeline.map((item, index) => (
            <button
              className={selectedEra === index ? "active" : ""}
              onClick={() => setSelectedEra(index)}
              key={item.year}
            >
              <i />
              <span>{item.year}</span>
            </button>
          ))}
        </div>
        <article className="era-detail">
          <div className="era-image">
            <img src={era.image} alt="" />
            <span>{String(selectedEra + 1).padStart(2, "0")} / 06</span>
          </div>
          <p className="kicker">{era.year}</p>
          <h2>{era.title[language]}</h2>
          <p className="era-context">{era.context[language]}</p>
          <div className="fact-block">
            <span>{language === "da" ? "Litterær udvikling" : "Literary development"}</span>
            <p>{era.literary}</p>
          </div>
          <blockquote>
            {selectedEra >= 4
              ? language === "da"
                ? "[Indsæt verificeret citat fra det udleverede skolemateriale]"
                : "[Add a verified quotation from the supplied school material]"
              : era.quote}
            <cite>
              {selectedEra >= 4
                ? language === "da"
                  ? "Indholdspladsholder — verificér kilde før publicering"
                  : "Content placeholder — verify source before publication"
                : era.source}
            </cite>
          </blockquote>
          <div className="why-now">
            <p className="kicker">
              {language === "da" ? "HVORFOR DET BETYDER NOGET" : "WHY IT MATTERS"}
            </p>
            <p>{era.why[language]}</p>
          </div>
          <button
            className={`save-article ${savedArticles.includes(era.title.en) ? "active" : ""}`}
            onClick={() => toggleArticle(era.title.en)}
          >
            <Icon name={savedArticles.includes(era.title.en) ? "check" : "bookmark"} />
            {savedArticles.includes(era.title.en)
              ? t.saved
              : language === "da"
                ? "Gem artikel"
                : "Save article"}
          </button>
        </article>
      </section>
    );
  };

  const LiteraryExperience = ({ kind }: { kind: "ibsen" | "yellow" }) => {
    const isIbsen = kind === "ibsen";
    const [activeCard, setActiveCard] = useState(0);
    const [closer, setCloser] = useState(0);
    const title = isIbsen
      ? language === "da"
        ? "Et dukkehjem"
        : "A Doll’s House"
      : "The Yellow Wallpaper";
    const author = isIbsen ? "Henrik Ibsen · 1879" : "Charlotte Perkins Gilman · 1892";
    const characters = isIbsen
      ? [
          [
            "Nora",
            language === "da"
              ? "Fra 'lærkefugl' til selvstændigt menneske."
              : "From ‘skylark’ to independent person.",
          ],
          [
            "Torvald",
            language === "da"
              ? "Ægtemand og patriarkalsk autoritet."
              : "Husband and patriarchal authority.",
          ],
          [
            "Krogstad",
            language === "da"
              ? "Afslører hjemmets økonomiske magt."
              : "Exposes the home’s economic power.",
          ],
          [
            "Kristine Linde",
            language === "da"
              ? "Arbejde, erfaring og et alternativt kvindeliv."
              : "Work, experience and an alternative woman’s life.",
          ],
        ]
      : [
          [
            language === "da" ? "Fortælleren" : "The narrator",
            language === "da"
              ? "En skrivende kvinde underlagt en hvilekur."
              : "A writing woman subjected to a rest cure.",
          ],
          [
            "John",
            language === "da"
              ? "Ægtemand, læge og fortolkningsmagt."
              : "Husband, doctor and interpretive authority.",
          ],
        ];
    const closerItems = isIbsen
      ? [
          {
            label: language === "da" ? "Citat" : "Quotation",
            text: "“I believe that before all else I am a reasonable human being, just as you are.”",
            note: "Nora, Act III. English text: Project Gutenberg, trans. R. Farquharson Sharp (1910).",
          },
          {
            label: language === "da" ? "Fortolkning" : "Interpretation",
            text:
              language === "da"
                ? "Nora afviser, at rollen som hustru og mor kan definere hele hendes menneskelighed."
                : "Nora rejects the idea that her roles as wife and mother can define her whole humanity.",
            note: language === "da" ? "Feministisk nærlæsning" : "Feminist close reading",
          },
          {
            label: language === "da" ? "Refleksion" : "Reflection",
            text:
              language === "da"
                ? "Er det muligt at blive fri uden at såre andre?"
                : "Is it possible to become free without hurting others?",
            note:
              language === "da"
                ? "Tag spørgsmålet med til talken"
                : "Bring this question to the talk",
          },
        ]
      : [
          {
            label: language === "da" ? "Citat" : "Quotation",
            text: "“There are things in that paper that nobody knows but me, or ever will.”",
            note: "Charlotte Perkins Gilman, The Yellow Wallpaper (1892), Project Gutenberg.",
          },
          {
            label: language === "da" ? "Symbol" : "Symbol",
            text:
              language === "da"
                ? "Tapetets mønster bliver både et fængsel og en tekst, fortælleren forsøger at læse sig fri af."
                : "The wallpaper pattern becomes both a prison and a text the narrator tries to read herself free from.",
            note: language === "da" ? "Feministisk nærlæsning" : "Feminist close reading",
          },
          {
            label: language === "da" ? "Refleksion" : "Reflection",
            text:
              language === "da"
                ? "Hvornår bliver omsorg til kontrol?"
                : "When does care become control?",
            note:
              language === "da"
                ? "Tag spørgsmålet med til talken"
                : "Bring this question to the talk",
          },
        ];
    const intro = isIbsen
      ? language === "da"
        ? "Et borgerligt hjem, en hemmelig gæld og en dør, der ændrede teaterhistorien."
        : "A bourgeois home, a secret debt and a door that changed theatre history."
      : language === "da"
        ? "En kvinde, et aflåst værelse og et mønster, der langsomt begynder at bevæge sig."
        : "A woman, a locked room and a pattern that slowly begins to move.";

    return (
      <section className={`literary-page ${isIbsen ? "theatre" : "wallpaper"}`}>
        <button className="floating-back" onClick={() => go("home")}>
          <Icon name="back" />
          {t.back}
        </button>
        <div className="literary-hero">
          <img src={isIbsen ? images.theatre : images.wallpaper} alt="" />
          <div />
          <p className="kicker">{author}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="literary-body">
          <div className="story-intro">
            <span className="dropcap">{isIbsen ? "N" : "T"}</span>
            <p>
              {isIbsen
                ? language === "da"
                  ? "Nora lever i et ægteskab formet af 1800-tallets lov, økonomi og forventninger. Da hemmeligheden om hendes lån afsløres, må hun vælge mellem rollen og sig selv."
                  : "Nora lives in a marriage shaped by nineteenth-century law, economy and expectation. When her secret loan is exposed, she must choose between her role and herself."
                : language === "da"
                  ? "Fortælleren bliver ordineret ro og forbudt at skrive. Hendes mand Johns medicinske autoritet lukker hende inde i et værelse, hvor tapetet overtager hendes blik."
                  : "The narrator is prescribed rest and forbidden to write. Her husband John’s medical authority confines her to a room where the wallpaper takes over her vision."}
            </p>
          </div>
          <div className="literary-section">
            <p className="kicker">{isIbsen ? "DRAMATIS PERSONAE" : "VOICE & POWER"}</p>
            <h2>{language === "da" ? "Hvem har magten?" : "Who holds the power?"}</h2>
            <div className="character-deck">
              {characters.map((character, index) => (
                <button
                  className={activeCard === index ? "active" : ""}
                  onClick={() => setActiveCard(index)}
                  key={character[0]}
                >
                  <span>0{index + 1}</span>
                  <h3>{character[0]}</h3>
                  <p>{character[1]}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="theme-grid">
            {(isIbsen
              ? [
                  [
                    language === "da" ? "Ægteskab" : "Marriage",
                    language === "da" ? "Kærlighed eller kontrakt?" : "Love or contract?",
                  ],
                  [
                    language === "da" ? "Økonomi" : "Economy",
                    language === "da" ? "Gæld skaber afhængighed." : "Debt creates dependency.",
                  ],
                  [
                    language === "da" ? "Frihed" : "Freedom",
                    language === "da" ? "Hvem må definere sig selv?" : "Who may define themselves?",
                  ],
                  [
                    language === "da" ? "Performance" : "Performance",
                    language === "da" ? "Nora spiller sin rolle." : "Nora performs her role.",
                  ],
                ]
              : [
                  [
                    language === "da" ? "Kontrol" : "Control",
                    language === "da" ? "Hvem definerer sygdom?" : "Who defines illness?",
                  ],
                  [
                    language === "da" ? "Skrivning" : "Writing",
                    language === "da" ? "En forbudt stemme." : "A forbidden voice.",
                  ],
                  [
                    language === "da" ? "Mønster" : "Pattern",
                    language === "da" ? "Fængsel og fortolkning." : "Prison and interpretation.",
                  ],
                  [
                    language === "da" ? "Frihed" : "Freedom",
                    language === "da" ? "At rive overfladen ned." : "Tearing down the surface.",
                  ],
                ]
            ).map((theme, index) => (
              <div key={theme[0]}>
                <span>0{index + 1}</span>
                <h3>{theme[0]}</h3>
                <p>{theme[1]}</p>
              </div>
            ))}
          </div>
          <div className="context-panel">
            <p className="kicker">
              {language === "da" ? "HISTORISK KONTEKST" : "HISTORICAL CONTEXT"}
            </p>
            <h2>{isIbsen ? "1879" : "1892"}</h2>
            <p>
              {isIbsen
                ? language === "da"
                  ? "Gifte kvinder havde begrænset juridisk og økonomisk selvstændighed. Ibsens drama gjorde hjemmets ulige magtforhold til et offentligt spørgsmål."
                  : "Married women had limited legal and economic independence. Ibsen’s drama turned inequality inside the home into a public question."
                : language === "da"
                  ? "Den amerikanske 'rest cure' isolerede ofte kvinder fra arbejde og intellektuel aktivitet. Gilman skrev senere, at fortællingen var en protest mod behandlingen."
                  : "The American ‘rest cure’ often isolated women from work and intellectual activity. Gilman later wrote that the story protested this treatment."}
            </p>
            <small>
              {isIbsen
                ? "Source: Ibsen Stage / University of Oslo"
                : "Source: C. P. Gilman, Why I Wrote The Yellow Wallpaper (1913)"}
            </small>
          </div>
          <div className="look-closer">
            <p className="kicker">{isIbsen ? "LOOK CLOSER" : "BEHIND THE WALLPAPER"}</p>
            <h2>{language === "da" ? "Se bag ordene" : "Look behind the words"}</h2>
            <div className="closer-tabs">
              {closerItems.map((item, index) => (
                <button
                  className={closer === index ? "active" : ""}
                  onClick={() => setCloser(index)}
                  key={item.label}
                >
                  0{index + 1} {item.label}
                </button>
              ))}
            </div>
            <blockquote>
              {closerItems[closer].text}
              <cite>{closerItems[closer].note}</cite>
            </blockquote>
          </div>
          <div className="relevance">
            <p className="kicker">{language === "da" ? "HVORFOR NU?" : "WHY NOW?"}</p>
            <h2>
              {language === "da"
                ? "Hvem har ret til at fortælle din historie?"
                : "Who has the right to tell your story?"}
            </h2>
            <ArrowButton
              onClick={() => {
                setQuestionTalk(isIbsen ? 5 : 2);
                go("questions");
              }}
            >
              {t.prepare}
            </ArrowButton>
          </div>
        </div>
      </section>
    );
  };

  const Glossary = () => {
    const filtered = concepts.filter((concept) =>
      concept.term[language].toLowerCase().includes(search.toLowerCase()),
    );
    return (
      <section className="glossary-page">
        <PageIntro
          index="03"
          title={t.glossary}
          intro={
            language === "da"
              ? "Et præcist sprog gør komplekse samtaler mulige."
              : "Precise language makes complex conversations possible."
          }
        />
        <label className="search-field">
          <Icon name="search" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.search}
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search">
              <Icon name="close" size={16} />
            </button>
          )}
        </label>
        <div className="glossary-list">
          {filtered.map((concept) => {
            const originalIndex = concepts.indexOf(concept);
            const open = openConcept === originalIndex;
            const favourite = favourites.includes(concept.term.en);
            return (
              <article className={open ? "open" : ""} key={concept.term.en}>
                <button
                  className="glossary-title"
                  onClick={() => setOpenConcept(open ? null : originalIndex)}
                >
                  <span>{String(originalIndex + 1).padStart(2, "0")}</span>
                  <h2>{concept.term[language]}</h2>
                  <i>{open ? "−" : "+"}</i>
                </button>
                {open && (
                  <div className="glossary-content">
                    {[
                      [t.definition, concept.definition[language]],
                      [t.background, concept.history[language]],
                      [t.example, concept.example[language]],
                      [t.relevance, concept.today[language]],
                    ].map(([label, text]) => (
                      <div key={label}>
                        <span>{label}</span>
                        <p>{text}</p>
                      </div>
                    ))}
                    <button
                      className={`favourite-button ${favourite ? "active" : ""}`}
                      onClick={() =>
                        setFavourites((items) =>
                          favourite
                            ? items.filter((item) => item !== concept.term.en)
                            : [...items, concept.term.en],
                        )
                      }
                    >
                      <Icon name="heart" size={17} />
                      {favourite
                        ? language === "da"
                          ? "Fjernet fra favoritter"
                          : "Remove from favourites"
                        : language === "da"
                          ? "Føj til favoritter"
                          : "Add to favourites"}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
          {!filtered.length && <p className="empty-state">{t.empty}</p>}
        </div>
      </section>
    );
  };

  const Programme = () => {
    if (currentTalk) {
      const isSaved = savedTalks.includes(currentTalk.id);
      return (
        <section className="talk-detail">
          <button className="back-link" onClick={() => setSelectedTalk(null)}>
            <Icon name="back" />
            {t.programme}
          </button>
          <div className="talk-index">0{currentTalk.id}</div>
          <p className="kicker orange-text">
            {t[currentTalk.day as "friday" | "saturday" | "sunday"]} · {currentTalk.time}
          </p>
          <h1>{currentTalk.title[language]}</h1>
          <p className="talk-subtitle">{currentTalk.subtitle[language]}</p>
          <div className="detail-facts">
            <div>
              <Icon name="clock" />
              <p>
                {currentTalk.time}
                <small>
                  {t[currentTalk.day as "friday" | "saturday" | "sunday"]} · {currentTalk.date}
                </small>
              </p>
            </div>
            <div>
              <Icon name="pin" />
              <p>
                {currentTalk.venue}
                <small>Egeskov</small>
              </p>
            </div>
          </div>
          <div className="detail-copy">
            <p className="kicker">{language === "da" ? "OM SAMTALEN" : "ABOUT THE TALK"}</p>
            <p>{currentTalk.intro[language]}</p>
          </div>
          <div className="detail-copy">
            <p className="kicker">{t.speakers}</p>
            <h2>{currentTalk.speakers}</h2>
            <small>
              {language === "da"
                ? "[Tilføj verificerede speakerbiografier fra skolematerialet]"
                : "[Add verified speaker biographies from the supplied school material]"}
            </small>
          </div>
          <div className="tag-section">
            <p className="kicker">{t.related}</p>
            <div>
              {currentTalk.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="preparation-box">
            <p className="kicker">{t.preparation}</p>
            <h3>
              {language === "da"
                ? "Hvilken fortælling om køn har formet dig mest?"
                : "Which story about gender has shaped you most?"}
            </h3>
          </div>
          <div className="detail-actions">
            <button className={isSaved ? "saved" : ""} onClick={() => toggleSaved(currentTalk.id)}>
              <Icon name={isSaved ? "check" : "bookmark"} />
              {isSaved ? t.saved : t.save}
            </button>
            <button
              onClick={() => {
                setQuestionTalk(currentTalk.id);
                go("questions");
              }}
            >
              <Icon name="question" />
              {t.prepare}
            </button>
          </div>
        </section>
      );
    }
    return (
      <section className="programme-page">
        <PageIntro
          index="04"
          title={t.programme}
          intro={
            language === "da"
              ? "Fem samtaler. Tre dage. Ét tema set fra litteraturen, historien og filosofien."
              : "Five conversations. Three days. One theme viewed through literature, history and philosophy."
          }
        />
        {(["friday", "saturday", "sunday"] as const).map((day) => (
          <div className="programme-day" key={day}>
            <div className="day-heading">
              <h2>{t[day]}</h2>
              <span>{day === "friday" ? "10.06" : day === "saturday" ? "11.06" : "12.06"}</span>
            </div>
            {talks
              .filter((talk) => talk.day === day)
              .map((talk) => (
                <TalkCard talk={talk} key={talk.id} />
              ))}
          </div>
        ))}
      </section>
    );
  };

  const Questions = () => {
    const suggestions = [
      language === "da"
        ? "Hvilket historisk skifte har haft størst betydning for vores syn på køn?"
        : "Which historical shift most changed how we understand gender?",
      language === "da"
        ? "Kan litteraturen ændre samfundet — eller kun afspejle det?"
        : "Can literature change society — or only reflect it?",
      language === "da"
        ? "Hvilken stemme mangler i denne samtale?"
        : "Which voice is missing from this conversation?",
    ];
    const saveQuestion = () => {
      if (!draft.trim()) return;
      setQuestions((items) => [...items, { talk: questionTalk, text: draft.trim() }]);
      setDraft("");
    };
    return (
      <section className="questions-page">
        <PageIntro
          index="05"
          title={language === "da" ? "Spørg mellem linjerne" : "Ask between the lines"}
          intro={
            language === "da"
              ? "De bedste samtaler begynder med et modigt spørgsmål."
              : "The best conversations begin with a brave question."
          }
        />
        <div className="question-form">
          <label>{t.selectTalk}</label>
          <select
            value={questionTalk}
            onChange={(event) => setQuestionTalk(Number(event.target.value))}
          >
            {talks.map((talk) => (
              <option value={talk.id} key={talk.id}>
                {talk.title[language]}
              </option>
            ))}
          </select>
          <div className="suggestions">
            <p className="kicker">{t.suggestions}</p>
            {suggestions.map((suggestion, index) => (
              <button onClick={() => setDraft(suggestion)} key={suggestion}>
                <span>0{index + 1}</span>
                <p>{suggestion}</p>
                <Icon name="arrow" size={16} />
              </button>
            ))}
          </div>
          <label>{t.ownQuestion}</label>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t.placeholder}
            maxLength={240}
          />
          <div className="character-count">{draft.length} / 240</div>
          <button className="submit-question" disabled={!draft.trim()} onClick={saveQuestion}>
            {t.saveQuestion}
            <Icon name="arrow" />
          </button>
        </div>
        <div className="question-list">
          <div className="section-title row">
            <h2>{t.yourQuestions}</h2>
            <span>{questions.length}</span>
          </div>
          {!questions.length && <p className="empty-state">{t.noQuestions}</p>}
          {questions.map((question, index) => (
            <article key={`${question.text}-${index}`}>
              <span>
                {talks.find((talk) => talk.id === question.talk)?.date} ·{" "}
                {talks.find((talk) => talk.id === question.talk)?.time}
              </span>
              <p>{question.text}</p>
              <button
                onClick={() =>
                  setQuestions((items) => items.filter((_, itemIndex) => itemIndex !== index))
                }
              >
                {language === "da" ? "Slet" : "Delete"}
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  };

  const MyHeartland = () => {
    const sections = [
      {
        title: t.savedTalks,
        count: savedTalks.length,
        items: savedTalks.map((id) => talks.find((talk) => talk.id === id)?.title[language] ?? ""),
        action: () => go("programme"),
      },
      {
        title: t.savedArticles,
        count: savedArticles.length,
        items: savedArticles,
        action: () => go("timeline"),
      },
      {
        title: t.favouriteConcepts,
        count: favourites.length,
        items: favourites.map(
          (item) => concepts.find((concept) => concept.term.en === item)?.term[language] ?? item,
        ),
        action: () => go("glossary"),
      },
      {
        title: t.yourQuestions,
        count: questions.length,
        items: questions.map((question) => question.text),
        action: () => go("questions"),
      },
    ];
    return (
      <section className="my-page">
        <div className="profile-hero">
          <div className="profile-monogram">AM</div>
          <p className="kicker">MY HEARTLAND · 2027</p>
          <h1>Anna M.</h1>
          <p>{t.profileIntro}</p>
        </div>
        <div className="profile-stats">
          <div>
            <strong>{savedTalks.length}</strong>
            <span>{t.savedTalks}</span>
          </div>
          <div>
            <strong>{questions.length}</strong>
            <span>{t.questions}</span>
          </div>
          <div>
            <strong>{favourites.length}</strong>
            <span>{t.favouriteConcepts}</span>
          </div>
        </div>
        <div className="my-sections">
          {sections.map((section, index) => (
            <article key={section.title}>
              <button onClick={section.action}>
                <span>0{index + 1}</span>
                <h2>{section.title}</h2>
                <strong>{section.count}</strong>
                <Icon name="arrow" />
              </button>
              {section.items.slice(0, 2).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
          ))}
        </div>
        <div className="schedule-preview">
          <div className="section-title row">
            <div>
              <p className="kicker">10–12 JUNE</p>
              <h2>{t.schedule}</h2>
            </div>
            <span>{savedTalks.length} TALKS</span>
          </div>
          <div className="schedule-line">
            {(["friday", "saturday", "sunday"] as const).map((day) => (
              <div key={day}>
                <span>{t[day].slice(0, 3)}</span>
                <strong>
                  {talks.filter((talk) => talk.day === day && savedTalks.includes(talk.id)).length}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const pages: Record<Page, React.ReactNode> = {
    welcome: <Welcome />,
    home: <Home />,
    explore: <Explore />,
    timeline: <Timeline />,
    ibsen: <LiteraryExperience kind="ibsen" />,
    yellow: <LiteraryExperience kind="yellow" />,
    glossary: <Glossary />,
    programme: <Programme />,
    questions: <Questions />,
    my: <MyHeartland />,
  };

  const nav: [Page, IconName, string][] = [
    ["home", "home", t.home],
    ["explore", "explore", t.explore],
    ["programme", "calendar", t.programme],
    ["questions", "question", t.questions],
    ["my", "heart", t.my],
  ];
  const navPage =
    page === "timeline" || page === "ibsen" || page === "yellow" || page === "glossary"
      ? "explore"
      : page;

  return (
    <div className="app-shell">
      {page !== "welcome" && <Header />}
      <main>{pages[page]}</main>
      {page !== "welcome" && (
        <nav className="bottom-nav">
          {nav.map(([destination, icon, label]) => (
            <button
              className={navPage === destination ? "active" : ""}
              onClick={() => go(destination)}
              key={destination}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
