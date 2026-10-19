import { SiteLink } from "../sections";
import { routes } from "../routes";
import ExpandingCards from "./ExpandingCards";
import FitToBox from "./FitToBox";

const SOURCE_ICONS = {
  database: (
    <>
      <ellipse cx="6" cy="2.8" rx="4.2" ry="1.6" />
      <path d="M1.8 2.8v6.4c0 .9 1.9 1.6 4.2 1.6s4.2-.7 4.2-1.6V2.8M1.8 6c0 .9 1.9 1.6 4.2 1.6s4.2-.7 4.2-1.6" />
    </>
  ),
  cube: <path d="M6 1l4.5 2.5v5L6 11 1.5 8.5v-5L6 1zM1.5 3.5L6 6l4.5-2.5M6 6v5" />,
  mail: (
    <>
      <rect x="1" y="2.5" width="10" height="7" />
      <path d="M1 3l5 3.5L11 3" />
    </>
  ),
  grid: (
    <>
      <rect x="1" y="1.5" width="10" height="9" />
      <path d="M1 4.5h10M1 7.5h10M4.5 1.5v9" />
    </>
  ),
  check: (
    <>
      <circle cx="6" cy="6" r="4.5" />
      <path d="M4 6l1.5 1.5L8.2 4.8" />
    </>
  ),
  chip: (
    <>
      <rect x="1.5" y="3" width="9" height="6" />
      <path d="M4 3V1.5M8 3V1.5M4 10.5V9M8 10.5V9" />
    </>
  ),
  swap: <path d="M1 4h8.5L7.5 2M11 8H2.5l2 2" />,
  snowflake: <path d="M6 1v10M1.7 3.5l8.6 5M1.7 8.5l8.6-5M4.8 1.8L6 3l1.2-1.2M4.8 10.2L6 9l1.2 1.2" />,
};

const SOURCES: {
  name: string;
  detail: string;
  icon: keyof typeof SOURCE_ICONS;
  left: number;
  top: number;
  highlight?: boolean;
}[] = [
  { name: "Dynamics 365", detail: "18,240 orders", icon: "database", left: 16, top: 14 },
  { name: "SolidWorks", detail: "41,305 drawings", icon: "cube", left: 196, top: 14 },
  { name: "Outlook", detail: "9,870 RFQs", icon: "mail", left: 50, top: 74 },
  { name: "Excel", detail: "312 price lists", icon: "grid", left: 210, top: 74 },
  { name: "Snowflake", detail: "2.4M rows", icon: "snowflake", left: 16, top: 134 },
  { name: "Quality system", detail: "1,204 NCRs", icon: "check", left: 196, top: 134 },
  { name: "Press brake PLC", detail: "No API, connected", icon: "chip", left: 30, top: 194, highlight: true },
  { name: "Supplier EDI", detail: "88 suppliers", icon: "swap", left: 220, top: 194 },
];

const SOURCE_WIRES = [
  "M91 54 C91 140 195 220 195 330",
  "M271 54 C271 140 195 220 195 330",
  "M125 114 C125 190 195 240 195 330",
  "M285 114 C285 190 195 240 195 330",
  "M91 174 C91 240 195 260 195 330",
  "M271 174 C271 240 195 260 195 330",
  "M295 234 C295 290 195 290 195 330",
];
const HIGHLIGHTED_WIRE = "M115 234 C115 290 195 290 195 330";

function FoundationVisual() {
  return (
    <div className="b-foundation" aria-hidden="true">
      <svg width="390" height="420" viewBox="0 0 390 420">
        {SOURCE_WIRES.map((d) => (
          <path key={d} d={d} fill="none" stroke="rgba(17,17,17,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.5 5" />
        ))}
        <path d={HIGHLIGHTED_WIRE} fill="none" stroke="#6B0F1A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.5 5" />
      </svg>
      {SOURCES.map((source) => (
        <div
          key={source.name}
          className={`b-source-chip ${source.highlight ? "is-highlight" : ""}`}
          style={{ left: source.left, top: source.top }}
        >
          <span className="b-source-icon">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              {SOURCE_ICONS[source.icon]}
            </svg>
          </span>
          <span className="b-source-text">
            <strong>{source.name}</strong>
            <span>{source.detail}</span>
          </span>
        </div>
      ))}
      <div className="b-foundation-hub">
        <span className="b-dot" />
        <span>
          <strong>Aerium Foundation</strong>
          <span>8 sources, one live model</span>
        </span>
      </div>
    </div>
  );
}

const TRAINING_DATA = [
  { label: "Past jobs", share: 72, count: "18,240" },
  { label: "Quotes won, lost", share: 44, count: "6,912" },
  { label: "Drawings", share: 92, count: "41,305" },
  { label: "Machine logs", share: 100, count: "2.3M" },
];

function ForgeVisual() {
  return (
    <div className="b-panel b-forge" aria-hidden="true">
      <div className="b-panel-head b-forge-head">
        <div>
          <div className="b-panel-title">
            <span className="b-dot" />
            quote-model-v3
          </div>
          <div className="b-panel-sub">Private model, retrained every week</div>
        </div>
        <span className="b-pill">Runs on-prem</span>
      </div>
      <div className="b-forge-section b-forge-bars">
        <div className="b-panel-label">Learned from</div>
        {TRAINING_DATA.map((row) => (
          <div key={row.label} className="b-forge-bar">
            <span>{row.label}</span>
            <span className="b-forge-track">
              <span style={{ width: `${row.share}%` }} />
            </span>
            <span className="b-forge-count">{row.count}</span>
          </div>
        ))}
      </div>
      <div className="b-forge-section">
        <div className="b-panel-label">New RFQ</div>
        <div className="b-forge-rfq">
          <div>
            <div className="b-forge-part">Bracket, 304 SS, 2 bends, qty 500</div>
            <div className="b-panel-sub">Matched to 37 similar past jobs</div>
          </div>
          <div className="b-forge-price">
            <strong>$14.20</strong>
            <span>per unit</span>
          </div>
        </div>
        <div className="b-forge-pills">
          <span className="b-pill b-pill-burgundy">94% confidence</span>
          <span className="b-pill">Margin 31%</span>
        </div>
      </div>
    </div>
  );
}

const AGENT_LOG = [
  { time: "Mon 08:12", text: "Started watching supplier lead times" },
  { time: "Tue 14:30", text: "PO 7731 slipped 9 days. Found 2 suppliers with stock" },
  { time: "Tue 14:32", text: "Drafted alternate POs", approval: "Approved by Priya" },
  { time: "Now", text: "Watching the next 30 days of demand", current: true },
];

function WorkforceVisual() {
  return (
    <div className="b-panel b-workforce" aria-hidden="true">
      <div className="b-panel-head b-workforce-head">
        <div className="b-panel-title">
          <span className="b-dot b-dot-live" />
          Supply agent
        </div>
        <div className="b-panel-sub">Running for 6 days, watching 412 open POs</div>
      </div>
      <div className="b-workforce-log">
        {AGENT_LOG.map((entry) => (
          <div key={entry.time} className="b-workforce-row">
            <span className="b-workforce-time">{entry.time}</span>
            <span className={`b-workforce-text ${entry.current ? "is-current" : ""}`}>
              {entry.text}
              {entry.approval && <span className="b-pill b-pill-burgundy b-pill-xs">{entry.approval}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const LAYERS = [
  {
    title: "Foundation",
    hashId: "platform-foundation",
    body: "Your operational data foundation. Connects every system you run, API or not, into one live model of the business. Live in weeks.",
    href: routes.products.foundation,
    visual: <FoundationVisual />,
  },
  {
    title: "Forge",
    hashId: "platform-forge",
    body: "Custom models trained on your jobs, parts, and history, not the internet’s. They price, cost, and plan the way your best people do.",
    href: routes.products.forge,
    visual: <ForgeVisual />,
  },
  {
    title: "Workforce",
    hashId: "platform-workforce",
    body: "AI agents that run workflows end to end inside email, Teams, and your ERP, with your people approving the calls that matter.",
    href: routes.products.workforce,
    visual: <WorkforceVisual />,
  },
];

const LAYER_HASH_IDS = LAYERS.map((layer) => layer.hashId);

export default function LayersSection() {
  return (
    <section id="platform" className="b-layers">
      <div className="b-wrap b-layers-intro" data-reveal="stagger">
        <div className="b-eyebrow">Platform</div>
        <h2 className="b-h2">Three layers, built from the ground up</h2>
        <p className="b-lede">
          Start with the data foundation, live in weeks. Then add models and agents one workflow at a time, on the same
          foundation.
        </p>
        <SiteLink href={routes.products.foundation} className="b-text-link b-layers-link">
          Explore the platform
        </SiteLink>
      </div>
      <ExpandingCards defaultIndex={1} activeGrow={588 / 390} className="b-layer-cards" hashIds={LAYER_HASH_IDS}>
        {LAYERS.map((layer) => (
          <a key={layer.title} href={layer.href} className="b-layer-card">
            <div className="b-layer-visual">
              <FitToBox>{layer.visual}</FitToBox>
            </div>
            <div className="b-layer-copy">
              <span className="b-layer-title">{layer.title}</span>
              <p>{layer.body}</p>
            </div>
          </a>
        ))}
      </ExpandingCards>
    </section>
  );
}
