// Layout for the "More AI, more silos" context graph. Positions come from the
// Paper mock (1440×1120 artboard): `x`/`y` are artboard pixels of each node's
// marker; the scene maps them into world units around the graph's centre.

export type NodeKind = "agent" | "entity" | "record" | "source";

export type GraphNode = {
  id: string;
  label: string;
  kind: NodeKind;
  x: number;
  y: number;
  /** Depth in world units; spreads the layers apart as the camera drifts. */
  z?: number;
};

export type EntityCluster = GraphNode & {
  kind: "entity";
  /** Footprint of the cluster's diamond on the artboard, in px. */
  width: number;
  height: number;
  density: number;
};

export type CuratedPath = {
  /** Node ids from source up to agent. */
  nodes: string[];
  title: string;
  body: string;
};

export const ARTBOARD = { width: 1440, height: 1120, graphCenterX: 1000, graphCenterY: 560 };

export const AGENTS: GraphNode[] = [
  { id: "agents.quote", label: "agents.quote", kind: "agent", x: 800, y: 80, z: 0.4 },
  { id: "agents.supply", label: "agents.supply", kind: "agent", x: 1050, y: 70, z: -0.6 },
  { id: "agents.costing", label: "agents.costing", kind: "agent", x: 1290, y: 100, z: 0.2 },
];

export const ENTITIES: EntityCluster[] = [
  { id: "parts", label: "parts", kind: "entity", x: 765, y: 230, z: 0.6, width: 320, height: 120, density: 360 },
  { id: "jobs", label: "jobs", kind: "entity", x: 1025, y: 175, z: -1.1, width: 230, height: 80, density: 230 },
  { id: "customers", label: "customers", kind: "entity", x: 1262, y: 245, z: -0.2, width: 190, height: 70, density: 160 },
  { id: "suppliers", label: "suppliers", kind: "entity", x: 900, y: 382, z: 0.9, width: 190, height: 60, density: 160 },
  { id: "machines", label: "machines", kind: "entity", x: 1172, y: 410, z: 0.3, width: 160, height: 46, density: 120 },
];

export const RECORDS: GraphNode[] = [
  { id: "erp.sales_orders", label: "erp.sales_orders", kind: "record", x: 640, y: 640, z: 0.8 },
  { id: "erp.bom_lines", label: "erp.bom_lines", kind: "record", x: 760, y: 690, z: -0.4 },
  { id: "outlook.rfqs", label: "outlook.rfqs", kind: "record", x: 905, y: 610, z: -0.9 },
  { id: "cad.drawings", label: "cad.drawings", kind: "record", x: 705, y: 790, z: 0.3 },
  { id: "qms.ncrs", label: "qms.ncrs", kind: "record", x: 1070, y: 680, z: 0.6 },
  { id: "plc.cycle_logs", label: "plc.cycle_logs", kind: "record", x: 1250, y: 730, z: 0.9 },
  { id: "edi.lead_times", label: "edi.lead_times", kind: "record", x: 1180, y: 600, z: -0.7 },
  { id: "excel.price_lists", label: "excel.price_lists", kind: "record", x: 985, y: 760, z: -0.2 },
];

export const SOURCES: GraphNode[] = [
  { id: "erp.dynamics", label: "erp.dynamics", kind: "source", x: 600, y: 960, z: 0.4 },
  { id: "solidworks", label: "solidworks", kind: "source", x: 700, y: 1010, z: 1.1 },
  { id: "sharepoint", label: "sharepoint", kind: "source", x: 780, y: 1060, z: -0.3 },
  { id: "outlook", label: "outlook", kind: "source", x: 860, y: 980, z: -1.0 },
  { id: "excel.shared", label: "excel.shared", kind: "source", x: 990, y: 1030, z: 0.2 },
  { id: "qms", label: "qms", kind: "source", x: 1100, y: 975, z: -0.6 },
  { id: "mes", label: "mes", kind: "source", x: 1160, y: 1060, z: 0.8 },
  { id: "edi.suppliers", label: "edi.suppliers", kind: "source", x: 1230, y: 1005, z: -0.4 },
  { id: "plc.pressbrake_3", label: "plc.pressbrake_3", kind: "source", x: 1300, y: 950, z: 1.0 },
];

/** Which records each source feeds, for the ambient wiring. */
export const SOURCE_FEEDS: Record<string, string[]> = {
  "erp.dynamics": ["erp.sales_orders", "erp.bom_lines"],
  solidworks: ["cad.drawings", "erp.bom_lines"],
  sharepoint: ["cad.drawings", "excel.price_lists"],
  outlook: ["outlook.rfqs"],
  "excel.shared": ["excel.price_lists"],
  qms: ["qms.ncrs"],
  mes: ["plc.cycle_logs", "qms.ncrs"],
  "edi.suppliers": ["edi.lead_times"],
  "plc.pressbrake_3": ["plc.cycle_logs"],
};

/** The first path is the resting state, matching the Paper mock. */
export const CURATED_PATHS: CuratedPath[] = [
  {
    nodes: ["plc.pressbrake_3", "plc.cycle_logs", "machines", "parts", "agents.quote"],
    title: "Press brake 3, 14% slower",
    body: "7 open quotes that route through it were repriced",
  },
  {
    nodes: ["edi.suppliers", "edi.lead_times", "suppliers", "agents.supply"],
    title: "Supplier lead time up 9 days",
    body: "PO 7731 rerouted to 2 suppliers with stock",
  },
  {
    nodes: ["excel.shared", "excel.price_lists", "parts", "agents.costing"],
    title: "Copper up 6% this month",
    body: "312 price lists re-costed against today’s index",
  },
  {
    nodes: ["outlook", "outlook.rfqs", "customers", "jobs", "agents.quote"],
    title: "RFQ in from a repeat customer",
    body: "Matched to 37 past jobs and drafted at today’s costs",
  },
  {
    nodes: ["qms", "qms.ncrs", "parts", "jobs", "agents.costing"],
    title: "Scrap up on the bracket line",
    body: "18 open jobs re-costed with the new yield",
  },
  {
    nodes: ["solidworks", "cad.drawings", "parts", "agents.quote"],
    title: "New drawing, 41,305 to compare",
    body: "Closest past part found by geometry in 0.4 seconds",
  },
  {
    nodes: ["erp.dynamics", "erp.sales_orders", "customers", "agents.supply"],
    title: "Orders up 22% at one customer",
    body: "Demand forecast and safety stock adjusted",
  },
];
