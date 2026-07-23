import type { SolutionData } from "../components/site/SolutionTemplate";

const POSTER = {
  equipment: "https://assets.mixkit.co/videos/14785/14785-thumb-720-0.jpg",
  chemicals: "https://assets.mixkit.co/videos/4380/4380-thumb-720-0.jpg",
  metal: "https://assets.mixkit.co/videos/45349/45349-thumb-720-0.jpg",
  distribution: "https://assets.mixkit.co/videos/23011/23011-thumb-720-0.jpg",
};

export const equipment: SolutionData = {
  eyebrow: "SOLUTIONS / EQUIPMENT MANUFACTURING",
  h1: "Quote faster, buy smarter, improve OEE",
  subhead:
    "An AI workforce that knows your machines, your BOMs, and your margins, working the jobs that keep equipment builders up at night.",
  heroPoster: POSTER.equipment,
  stats: [
    { value: "5-10%", caption: "procurement spend recovered" },
    { value: "20 hrs", caption: "per planner, per week, back" },
    { value: "<6 mo", caption: "to positive ROI" },
  ],
  workflowHeading: "Built for the work of building equipment",
  workflowCols: 3,
  workflowCards: [
    {
      num: "01",
      title: "Job quoting & estimation",
      body: "Quotes drafted in minutes from past jobs, live material prices, and real capacity, not last year's spreadsheet.",
    },
    {
      num: "02",
      title: "Predictive maintenance",
      body: "Failure risk flagged before it takes a line down, with the maintenance window scheduled and the parts order drafted.",
    },
    {
      num: "03",
      title: "Job scheduling",
      body: "Live production views with dynamic re-sequencing when a job slips, a machine drops, or a rush order lands.",
    },
    {
      num: "04",
      title: "Inventory management",
      body: "Shortages predicted before they hit lead time, safety stock tuned by SKU, and reconciliation across every system.",
    },
    {
      num: "05",
      title: "Tail spend automation",
      body: "The long tail of low-volume buys price-checked and negotiated automatically, without mass supplier consolidation.",
    },
  ],
  dayHeading: "An RFQ lands at 7:40 am. Here is what happens.",
  daySteps: [
    {
      num: "01",
      lead: "The agent reads the RFQ",
      rest: "from the shared inbox, matches it to similar jobs you have run, and pulls the drawings and specs.",
    },
    {
      num: "02",
      lead: "It builds the estimate",
      rest: "from live material prices, current machine capacity, and the margins you actually made on comparable work.",
    },
    {
      num: "03",
      lead: "Your estimator reviews a draft quote",
      rest: "before the coffee is cold, adjusts one line, and sends. The win gets logged for the next estimate.",
    },
    {
      num: "04",
      lead: "Meanwhile, in the background,",
      rest: "it is watching machine data for failure risk, rebalancing the schedule, and price-checking the week's tail spend.",
    },
  ],
  ctaHeadline: "See it on your own RFQs, your own machines, your own numbers.",
};

export const chemicals: SolutionData = {
  eyebrow: "SOLUTIONS / SPECIALTY CHEMICALS",
  h1: "Feedstock, yield, and margin in one live picture",
  subhead:
    "An AI workforce that watches your feedstock markets, your formulations, and your S&OP plan, and acts before the market moves against you.",
  heroPoster: POSTER.chemicals,
  stats: [
    { value: "1000s", caption: "of feedstocks priced against live market data" },
    { value: "5-10%", caption: "margin protected from price swings" },
    { value: "24/7", caption: "continuous market monitoring" },
  ],
  workflowHeading: "Built for the chemistry of margin",
  workflowCols: 2,
  workflowCards: [
    {
      num: "01",
      title: "Feedstock forecasting",
      body: "Demand and price forecasts by feedstock, with buy-ahead recommendations when the model sees a move coming.",
    },
    {
      num: "02",
      title: "Material price intelligence",
      body: "Market prices tracked across thousands of inputs and modeled into real landed costs, so every negotiation starts from should-cost.",
    },
    {
      num: "03",
      title: "Commercial opportunity identification",
      body: "New demand found for chemistries you already run: adjacent applications, underpriced products, customers buying elsewhere.",
    },
    {
      num: "04",
      title: "S&OP planning",
      body: "The monthly plan assembled from live demand, capacity, and inventory data instead of a two-week spreadsheet scramble.",
    },
  ],
  dayHeading: "A feedstock spikes overnight. Here is what happens.",
  daySteps: [
    {
      num: "01",
      lead: "The agent catches the move",
      rest: "in the overnight market data and models the landed-cost impact across every formulation that uses it.",
    },
    {
      num: "02",
      lead: "By 8 am your team has a brief:",
      rest: "which products are exposed, what it does to margin, and a recommended buy or reformulation play.",
    },
    {
      num: "03",
      lead: "Approved with one reply.",
      rest: "The agent drafts the POs, notifies the affected account managers, and updates the S&OP numbers.",
    },
    {
      num: "04",
      lead: "Every action is logged",
      rest: "in the audit trail, and the pricing team sees the full picture in the tools they already use.",
    },
  ],
  ctaHeadline: "See it on your own feedstocks, formulations, and price lists.",
};

export const metal: SolutionData = {
  eyebrow: "SOLUTIONS / METAL FABRICATION",
  h1: "From RFQ to shipped part, nothing lost in between",
  subhead:
    "An AI workforce that quotes with current metal prices, keeps the shop schedule honest, and handles the tariff paperwork nobody has time for.",
  heroPoster: POSTER.metal,
  stats: [
    { value: "Minutes", caption: "from RFQ to draft quote" },
    { value: "15 hrs", caption: "per estimator, per week, back" },
    { value: "100%", caption: "of duty and tariff filings on time" },
  ],
  workflowHeading: "Built for the shop floor, not the showroom",
  workflowCols: 3,
  workflowCards: [
    {
      num: "01",
      title: "Job quoting & estimation",
      body: "Quotes built from today's metal prices, real machine rates, and the margins you actually made on similar parts.",
    },
    {
      num: "02",
      title: "Job scheduling",
      body: "Slip risk flagged in real time, with re-sequencing proposals when a machine goes down or a hot job jumps the queue.",
    },
    {
      num: "03",
      title: "Tariffs & trade compliance",
      body: "HTS classifications checked, duty impact priced into every quote, and the customs paperwork drafted and filed on time.",
    },
  ],
  dayHeading: "A hot job jumps the queue. Here is what happens.",
  daySteps: [
    {
      num: "01",
      lead: "The agent re-runs the schedule",
      rest: "the moment the rush order is accepted, and shows which jobs move and which promise dates are at risk.",
    },
    {
      num: "02",
      lead: "Your scheduler approves the new sequence",
      rest: "from Teams. Affected customers get a heads-up drafted for review, not an angry call later.",
    },
    {
      num: "03",
      lead: "Material is checked before the first cut:",
      rest: "stock on hand, incoming POs, and a price check if more needs to be bought.",
    },
    {
      num: "04",
      lead: "Meanwhile, in the background,",
      rest: "it is re-checking promise dates across the board, chasing the material certs still outstanding, and logging every action for review.",
    },
  ],
  ctaHeadline: "See it on your own parts, your own shop, your own promise dates.",
};

export const distribution: SolutionData = {
  eyebrow: "SOLUTIONS / DISTRIBUTION",
  h1: "Right stock, right branch, right price",
  subhead:
    "An AI workforce that keeps inventory where demand actually is, keeps freight moving, and keeps every branch answering from the same numbers.",
  heroPoster: POSTER.distribution,
  stats: [
    { value: "Same-day", caption: "stockouts predicted before they cost a sale" },
    { value: "5-10%", caption: "freight cost reduction" },
    { value: "<6 mo", caption: "to positive ROI" },
  ],
  workflowHeading: "Built for the business of moving product",
  workflowCols: 2,
  workflowCards: [
    {
      num: "01",
      title: "Inventory management",
      body: "Stock levels tuned by SKU and branch, shortages predicted before they cost a sale, and dead stock surfaced before it ties up the balance sheet.",
    },
    {
      num: "02",
      title: "Logistics",
      body: "Freight quotes compared, shipments tracked, delays flagged to the branches they hit, and carrier exceptions worked without a phone tree.",
    },
    {
      num: "03",
      title: "Replenishment & rebalancing",
      body: "POs drafted at the right reorder point, and stock moved between branches when demand shifts, not after the stockout.",
    },
    {
      num: "04",
      title: "Backorders & expedites",
      body: "Suppliers chased, ETAs updated, and customers told the truth about dates before they have to ask.",
    },
  ],
  dayHeading: "A key SKU starts running hot. Here is what happens.",
  daySteps: [
    {
      num: "01",
      lead: "The agent spots the demand shift",
      rest: "at two branches and projects the stockout date against open POs and supplier lead times.",
    },
    {
      num: "02",
      lead: "It proposes the cheapest fix first:",
      rest: "rebalance from a branch sitting on excess, then a PO for the remainder at the best current price.",
    },
    {
      num: "03",
      lead: "Your buyer approves from email.",
      rest: "Transfer order cut, PO sent, freight booked on the better of two quotes.",
    },
    {
      num: "04",
      lead: "Branch managers see the plan",
      rest: "in Teams before customers feel a thing, and every step lands in the audit trail.",
    },
  ],
  ctaHeadline: "See it on your own branches, your own SKUs, your own freight.",
};
