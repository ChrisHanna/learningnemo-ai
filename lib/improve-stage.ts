export type ImprovementCandidate = {
  id: string;
  name: string;
  change: string;
  quality: string;
  safety: string;
  cost: string;
  latency: string;
};

export const improvementCandidates: ImprovementCandidate[] = [
  {
    id: "guarded-rag",
    name: "Guarded RAG",
    change: "Add document filters and a sensitive-token output rail",
    quality: "94%",
    safety: "98%",
    cost: "$0.016",
    latency: "2.0s",
  },
  {
    id: "deterministic",
    name: "Deterministic handoff",
    change: "Route account changes to a verified support queue",
    quality: "91%",
    safety: "99%",
    cost: "$0.009",
    latency: "1.2s",
  },
  {
    id: "baseline",
    name: "Baseline",
    change: "Current workflow with no new release changes",
    quality: "92%",
    safety: "96%",
    cost: "$0.014",
    latency: "1.8s",
  },
];
