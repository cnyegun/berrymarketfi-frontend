export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO, for sorting + <time>
  dateLabel: string; // display
  readingTime: string;
  author: string;
  category: string;
  cover: string;
  coverContain?: boolean;
  coverBg?: string;
  credit?: { author: string; license: string; source: string };
  content: Block[];
};

// Newest first.
export const POSTS: Post[] = [
  {
    slug: "wild-berries-you-can-trust",
    title: "For the buyers: wild berries you can finally trust",
    excerpt:
      "Fresh, traceable, wholly wild — what it means to source Finnish berries directly from the very people who picked them.",
    date: "2026-06-13",
    dateLabel: "13 June 2026",
    readingTime: "4 min read",
    author: "The Berrymarket Team",
    category: "For buyers",
    cover: "/blog/wild-berries-you-can-trust.webp",
    credit: {
      author: "Randi Hausken",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Cowberries_(6100995066).jpg",
    },
    content: [
      {
        type: "p",
        text: "If you cook, brew, bake, or simply love good fruit, you already know that wild Finnish berries are something quietly special — deeper in flavour, richer in colour, and gathered from some of the cleanest forests in the world. The only hard part has ever been sourcing them with real confidence. We would so love to change that.",
      },
      { type: "h2", text: "Know exactly who picked them" },
      {
        type: "p",
        text: "Every picker on Berrymarket is verified, and every listing tells you who gathered the berries and roughly where. No anonymous crates, no murky supply chains — just a clear, honest line running straight from the forest floor to your kitchen.",
      },
      { type: "h2", text: "Fresher, and fairer" },
      {
        type: "p",
        text: "Because the chain is so short, the berries reach you sooner and at their very best. And because you are buying directly, far more of what you pay lands softly in the hands of the person who actually did the picking — a small thing that, multiplied across a whole season, changes lives.",
      },
      { type: "h2", text: "Reliable through the season" },
      {
        type: "p",
        text: "Sourcing for a restaurant, a small juicery, or a market stall? Buyers can arrange recurring and bulk orders, so a steady supply of fresh, traceable wild berries arrives all season long, without the usual quiet uncertainty.",
      },
      {
        type: "p",
        text: "It is, we think, simply a kinder and better way to buy what the forest so generously gives. Come and taste the difference for yourself.",
      },
    ],
  },
  {
    slug: "picking-lightly",
    title: "Picking lightly: foraging that lets the forest flourish",
    excerpt:
      "How to gather generously from the forest while leaving it just as lovely as you found it — a few simple habits for a lifetime of abundance.",
    date: "2026-06-05",
    dateLabel: "5 June 2026",
    readingTime: "4 min read",
    author: "Helmi Laine",
    category: "Sustainability",
    cover: "/blog/picking-lightly.webp",
    credit: {
      author: "W.carter",
      license: "CC0",
      source: "https://commons.wikimedia.org/wiki/File:Bilberry_bush_and_moss_in_Gullmarsskogen_ravine.jpg",
    },
    content: [
      {
        type: "p",
        text: "The forest is endlessly generous, but it is not, in truth, endless. The kindest pickers — the ones whose favourite patches still flourish decades on — all seem to share the same few quiet habits. Here are some worth tucking into your basket.",
      },
      { type: "h2", text: "Take only what you'll truly cherish" },
      {
        type: "p",
        text: "It is so tempting, on a good day, to gather every last berry in sight. But a patch left partly untouched feeds the birds and the bears, scatters its seeds, and returns all the richer next summer. Abundance shared, it turns out, is simply abundance renewed.",
      },
      { type: "h2", text: "Tread softly" },
      {
        type: "ul",
        items: [
          "Step mindfully around young plants and fragile moss — they can take years to recover.",
          "Give wildlife a wide, respectful berth, most of all during the tender nesting season.",
          "If you use a berry comb, draw it slowly, so as never to tear the shrubs.",
          "Carry out everything you carry in — leave only your footprints, and even those lightly.",
        ],
      },
      { type: "h2", text: "Think in seasons, not single days" },
      {
        type: "p",
        text: "A forest tended kindly is a forest that gives back, faithfully, year upon year. The patch you treat tenderly this August will be waiting for you, just as full and just as sweet, the next.",
      },
      { type: "quote", text: "Pick as though you mean to return — because, if you are lucky, you will." },
      {
        type: "p",
        text: "This is the quiet heart of sustainable foraging: not rules to be endured, but small acts of care that keep the forest — and the freedom to wander it — alive for everyone who comes after us.",
      },
    ],
  },
  {
    slug: "from-239-to-fair",
    title: "From €2.39 to fair: the economics of selling direct",
    excerpt:
      "A picker earns €2.39 for a kilo of bilberries that later sells for more than €13. Here is the quiet story of that gap — and how selling directly begins to close it.",
    date: "2026-05-27",
    dateLabel: "27 May 2026",
    readingTime: "5 min read",
    author: "Aino Virtanen",
    category: "Our mission",
    cover: "/blog/from-239-to-fair.webp",
    credit: {
      author: "Kospo75",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Picking_natural_blackberries_in_Finland.jpg",
    },
    content: [
      {
        type: "p",
        text: "There is a single number that first set us upon this path, and it has stayed with us ever since. A picker, kneeling for hours among the bilberry shrubs, earns on average about €2.39 for each kilogram they gather. That very same kilo, by the time it reaches a shop shelf, can be valued at more than €13.",
      },
      {
        type: "p",
        text: "The forest gives its fruit freely to whoever picks it — and yet, somewhere along the quiet way, almost all of that value slips past the very person who did the gathering. (The figures come from MARSI 2025, by Ruokavirasto and Kantar Agri.)",
      },
      { type: "h2", text: "Where the value quietly goes" },
      {
        type: "p",
        text: "The journey from forest to shelf passes through many hands — collectors, wholesalers, processors, retailers — and each, quite understandably, takes its share. By the end, the picker's portion has become a thin sliver of the whole. It is no one's villainy; it is simply a chain that grew long and opaque, with the picker left standing at its furthest, quietest end.",
      },
      { type: "h2", text: "A fairer arithmetic" },
      {
        type: "p",
        text: "Now imagine that same kilo sold directly, at perhaps €8 — well below the shop price, and yet more than three times what the picker earns today. The buyer pays less than retail for fresher, fully traceable berries; the picker earns a fair and dignified wage; and Berrymarket asks only a small 2.5% to keep the lights softly on. Everyone, at last, leaves a little better off.",
      },
      { type: "quote", text: "The berries were never the problem. The distance between the picker and the plate was." },
      {
        type: "p",
        text: "Closing that distance, kilo by kilo, is the whole of what we hope to do.",
      },
    ],
  },
  {
    slug: "a-berry-calendar",
    title: "A month-by-month berry calendar for the season ahead",
    excerpt:
      "When does the season truly begin? A tender, month-by-month guide to when each berry ripens across the length of Finland.",
    date: "2026-05-20",
    dateLabel: "20 May 2026",
    readingTime: "4 min read",
    author: "The Berrymarket Team",
    category: "Guides",
    cover: "/blog/a-berry-calendar.webp",
    credit: {
      author: "Alpsdake",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Vaccinium_vitis-idaea_(fruits).JPG",
    },
    content: [
      {
        type: "p",
        text: "The berry season arrives the way summer itself does in Finland — slowly, and then all at once. Knowing roughly when each fruit will ripen lets you plan your wanderings with care, and spares you the small heartbreak of arriving a fortnight too early. Here is how the season tends to unfold.",
      },
      { type: "h2", text: "July — the first blush" },
      {
        type: "p",
        text: "As the long, luminous days reach their peak, the bilberries begin to colour in the southern spruce forests, shy at first and then in earnest. Far to the north, the elusive cloudberry opens its brief golden window high on the bogs — blink, and you may well miss it.",
      },
      { type: "h2", text: "August — quiet abundance" },
      {
        type: "p",
        text: "This is the forest at its most giving. Bilberries reach their deep, generous peak, wild raspberries soften along the sun-warmed edges, and the first lingonberries begin to glow against the moss. Baskets fill quickly now, almost without effort.",
      },
      { type: "h2", text: "September — the red finale" },
      {
        type: "p",
        text: "As the air turns crisp and clear, the lingonberries come fully into their own — firm, tart, and keeping beautifully through the winter. The cranberries ripen in the cooling bogs, and the forest slowly, contentedly readies itself for rest.",
      },
      {
        type: "p",
        text: "One note: the north of Finland runs a week or two behind the south, so the season lingers all the longer the further you travel. Watch the weather, listen to fellow pickers, and let the forest tell you, in its own time, when it is ready.",
      },
    ],
  },
  {
    slug: "everymans-right",
    title: "Everyman's right: the quiet freedom to roam and gather",
    excerpt:
      "Jokamiehenoikeus lets anyone wander the forest and gather its berries freely — a quiet, centuries-old freedom, and the responsibility woven all through it.",
    date: "2026-05-13",
    dateLabel: "13 May 2026",
    readingTime: "4 min read",
    author: "Helmi Laine",
    category: "Foraging",
    cover: "/blog/everymans-right.webp",
    credit: {
      author: "kallerna",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Spring_forest_Yyteri_3.jpg",
    },
    content: [
      {
        type: "p",
        text: "There is a particular kind of freedom in Finland, so old and so quietly woven into daily life that most Finns scarcely think to name it. It is called jokamiehenoikeus — everyman's right — and it means, quite simply and rather beautifully, that the forest belongs to all of us.",
      },
      { type: "h2", text: "What the right so generously allows" },
      {
        type: "p",
        text: "Under everyman's right, anyone may roam freely through the countryside — through the forests, across the meadows, along the still shorelines — regardless of who happens to own the land. You may walk, rest, swim, and, dearest of all to us, gather wild berries, mushrooms and flowers, all without asking permission and without paying a single soul.",
      },
      { type: "h2", text: "What it asks in return" },
      {
        type: "p",
        text: "Such generous freedom carries with it a quiet duty of care. The right is given freely, but it leans entirely on our shared willingness to tread lightly.",
      },
      {
        type: "ul",
        items: [
          "Disturb no one — keep a respectful distance from homes and gardens.",
          "Harm no living tree, and never light fires upon another's land.",
          "Leave wildlife in peace, most especially during the tender nesting season.",
          "Take only nature's freely given gifts, and carry every trace of yourself back out.",
        ],
      },
      { type: "quote", text: "The forest belongs to no one, and so it belongs to everyone." },
      {
        type: "p",
        text: "It is upon this generous, centuries-old foundation that Berrymarket is built. The berries have always been free to gather; we simply give that age-old freedom a fair and open place to meet the people who would treasure it.",
      },
    ],
  },
  {
    slug: "a-field-guide-to-finnish-berries",
    title: "A little field guide to Finland's wild berries",
    excerpt:
      "From the violet hush of the bilberry to the tart red gleam of the lingonberry — an introduction to the berries that quietly colour the Finnish forest.",
    date: "2026-05-06",
    dateLabel: "6 May 2026",
    readingTime: "5 min read",
    author: "Aino Virtanen",
    category: "Field notes",
    cover: "/blog/a-field-guide-to-finnish-berries.webp",
    credit: {
      author: "MAKY.OREL",
      license: "CC0",
      source: "https://commons.wikimedia.org/wiki/File:Blueberry_-_Vaccinium_myrtillus_(fruit).jpg",
    },
    content: [
      {
        type: "p",
        text: "Step softly into any Finnish forest in late summer and you will find it quietly laden — a hidden larder tucked beneath the spruce and pine, offered freely to anyone who knows where to look. Before you gather, it helps to know who you are greeting. Here, then, is an introduction to the berries you will come to love.",
      },
      { type: "h2", text: "Bilberry — mustikka" },
      {
        type: "p",
        text: "The small, true wild blueberry, and the very soul of the Finnish forest. Unlike its plump cultivated cousin, the bilberry is a deep, inky violet all the way through, staining fingers and lips a happy purple. It ripens through July and August, carpeting the shady spruce woods in soft blue. In a single recent season, pickers gathered some 6.8 million kilos — and still, so much more was left to the birds.",
      },
      { type: "h2", text: "Lingonberry — puolukka" },
      {
        type: "p",
        text: "Tart, bright, and jewel-red, the lingonberry arrives a little later, glowing against the moss from late August into the cool of autumn. It keeps beautifully — Finns have lovingly preserved it for generations — and it remains the most abundantly picked of all, with around 9.5 million kilos gathered each year.",
      },
      { type: "h2", text: "Cloudberry — lakka, or hilla" },
      {
        type: "p",
        text: "The amber treasure of the northern bogs: rare, fleeting, and quietly coveted. Ripening for just a brief golden window in July, the cloudberry rewards only the patient and the well-booted. Its honeyed, faintly tart flavour has no real equal, which is why it commands prices the others can only dream of.",
      },
      { type: "h2", text: "And a few more to greet" },
      {
        type: "ul",
        items: [
          "Crowberry (variksenmarja) — small, dark and watery, beloved by the far north.",
          "Wild raspberry (vadelma) — soft and fragrant, hiding along the sunlit forest edges.",
          "Arctic bramble (mesimarja) — a rare and intensely perfumed little gem.",
          "Cranberry (karpalo) — gathered from the bogs as the very first frosts arrive.",
        ],
      },
      {
        type: "p",
        text: "Learning their names is the first step toward a season well spent. The rest — the quiet mornings, the brimming baskets, the simple satisfaction of a fair sale — tends to follow all on its own.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
