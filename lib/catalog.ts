export type StageId="build"|"trace"|"attack"|"guard"|"evaluate"|"improve";
export type LessonKind="interactive"|"guided";
export type CanonicalRepositoryId="nooa"|"guardrails"|"evaluator"|"anonymizer";
export type RepositorySource={repository:CanonicalRepositoryId;pinnedRef:string;lastVerified:string;packageName:string;status:"research/alpha"|"active";safetyNote:string};
export type CanonicalRepository=Omit<RepositorySource,"repository">&{id:CanonicalRepositoryId;name:string;url:string;description:string};

export const repositories:CanonicalRepository[]=[
 {id:"nooa",name:"NVIDIA-labs Object Oriented Agents",url:"https://github.com/NVIDIA-NeMo/labs-OO-Agents",description:"Research agents built from typed Python objects.",pinnedRef:"main@2026-09-04",lastVerified:"2026-09-04",packageName:"labs-OO-Agents",status:"research/alpha",safetyNote:"Code execution requires an OS-level sandbox; do not run untrusted agent code on the host."},
 {id:"guardrails",name:"NeMo Guardrails",url:"https://github.com/NVIDIA-NeMo/Guardrails",description:"Programmable rails for controlling LLM application behavior.",pinnedRef:"v0.8.0",lastVerified:"2026-09-04",packageName:"nemoguardrails",status:"active",safetyNote:"Guardrails are an enforcement layer, not a replacement for permissions, isolation, or secret management. Colang 2.x syntax is version-sensitive."},
 {id:"evaluator",name:"NeMo Evaluator",url:"https://github.com/NVIDIA-NeMo/Evaluator",description:"Benchmarks, solvers, and reports for repeatable AI evaluation.",pinnedRef:"v0.3.0",lastVerified:"2026-09-04",packageName:"nemo-evaluator / nel",status:"active",safetyNote:"Evaluation results are evidence for a decision, not proof of production safety."},
 {id:"anonymizer",name:"NeMo Anonymizer",url:"https://github.com/NVIDIA-NeMo/Anonymizer",description:"Detect and transform sensitive data before it reaches downstream systems.",pinnedRef:"main@2026-09-04",lastVerified:"2026-09-04",packageName:"nemo-anonymizer / anonymizer",status:"active",safetyNote:"Anonymizer does not replace document permissions, secret management, encryption, retention rules, or sandboxing."},
];

export const stages:{id:StageId;label:string;promise:string}[]=[
 {id:"build",label:"Build",promise:"Build agents from typed objects—and explicit authority."},
 {id:"trace",label:"Trace",promise:"See every event, token, and tool call in the hierarchy."},
 {id:"attack",label:"Attack",promise:"Break trust boundaries before users do."},
 {id:"guard",label:"Guard",promise:"Put NeMo Guardrails at the right enforcement layer."},
 {id:"evaluate",label:"Evaluate",promise:"Measure quality, safety, cost, and latency."},
 {id:"improve",label:"Improve",promise:"Turn evidence into the next safer version."},
];

type LessonDefinition=[string,StageId,string,string,LessonKind,number,CanonicalRepositoryId[],string[]];
type Lesson={id:string;stage:StageId;title:string;summary:string;kind:LessonKind;duration:number;repositories:CanonicalRepositoryId[];technologies:string[];sources:RepositorySource[]};
const sourceFor=(ids:CanonicalRepositoryId[])=>ids.map(repository=>{
 const source=repositories.find(item=>item.id===repository);
 if(!source) throw new Error(`Unknown catalog repository: ${repository}`);
 return {repository,...source};
});

const definitions:LessonDefinition[]=[
 ["01","build","Build Your First Python-Object Agent","Create a narrow support agent from explicit Python objects and inspect its authority before it runs.","guided",12,["nooa"],["NOOA","Python objects"]],
 ["02","build","Define Typed Generation Methods and Contracts","Turn a support outcome into typed generation methods with explicit inputs, outputs, and failure states.","interactive",18,["nooa"],["NOOA","Python typing"]],
 ["03","build","Keep Authorization and Verification in Deterministic Python","Keep permissions and verification in code instead of delegating trust decisions to the model.","guided",15,["nooa"],["NOOA","Authorization"]],
 ["04","build","Add a Scoped MCP Capability","Add one authenticated MCP capability with narrow scope, validated arguments, and caller identity.","interactive",20,["nooa"],["NOOA","MCP"]],
 ["05","trace","Understand NOOA Events and Trace Hierarchy","Read object, agent, model, retrieval, and tool events as one correlated hierarchy.","guided",12,["nooa"],["NOOA","Events"]],
 ["06","trace","Inspect a Nested Agent Trajectory","Follow a nested support-agent trajectory and locate its first consequential decision.","interactive",16,["nooa"],["NOOA","Trajectory"]],
 ["07","trace","Export an ATIF Trajectory","Export a trace as ATIF while preserving event order, provenance, and failure context.","interactive",18,["nooa"],["NOOA","ATIF"]],
 ["08","trace","Observe Runs Without Leaking Sensitive Content","Design telemetry and content-capture policies that keep sensitive prompts and results out of exported runs.","guided",14,["nooa","anonymizer"],["NOOA","NeMo Anonymizer","OpenTelemetry"]],
 ["09","attack","Threat-Model the Code-Executing Support Agent","Map assets, actors, trust boundaries, abuse paths, and OS-level execution consequences.","guided",15,["nooa"],["NOOA","Threat modeling"]],
 ["10","attack","Replay Jailbreak and Indirect Prompt-Injection Attacks","Replay direct jailbreaks and retrieval-borne instructions across the agent boundary.","interactive",18,["guardrails","nooa"],["NeMo Guardrails","NOOA"]],
 ["11","attack","Attack Retrieval, Tools, MCP, and Agent Handoffs","Test poisoning, overbroad retrieval, unsafe tool results, and authority expansion across handoffs.","guided",16,["nooa","guardrails"],["NOOA","NeMo Guardrails","MCP"]],
 ["12","attack","Find PII Leakage Across Prompts, Traces, and Providers","Find sensitive data crossing prompts, traces, provider boundaries, and retained artifacts.","guided",15,["anonymizer"],["NeMo Anonymizer","PII"]],
 ["13","guard","Configure NeMo Guardrails’ Five Rail Types","Apply input, dialog, retrieval, execution/tool, and output rails using version-declared Colang.","interactive",22,["guardrails"],["NeMo Guardrails","Colang 2.x"]],
 ["14","guard","Enforce Tool Inputs, Outputs, and Side Effects","Validate tool names, arguments, results, execution context, permissions, and side effects.","interactive",20,["guardrails"],["NeMo Guardrails","Tool rails"]],
 ["15","guard","Detect and Transform Sensitive Data with NeMo Anonymizer","Compare redact, annotate, deterministic hash, and contextual substitute strategies.","guided",17,["anonymizer"],["NeMo Anonymizer","PII"]],
 ["16","guard","Compare Jailbreak Controls and Runtime Boundaries","Compare heuristic and model-based controls with runtime isolation and their residual bypass risk.","interactive",19,["guardrails","nooa"],["NeMo Guardrails","NOOA"]],
 ["17","evaluate","Build a NeMo Evaluator BYOB Safety Benchmark","Build a bring-your-own-benchmark safety dataset with defensible cases and expected behavior.","guided",14,["evaluator"],["NeMo Evaluator","BYOB"]],
 ["18","evaluate","Execute and Report a `nel eval run`","Run the NeMo Evaluator CLI and report benchmark results with provenance and limitations.","interactive",20,["evaluator"],["NeMo Evaluator","nel eval run"]],
 ["19","evaluate","Compare Baseline and Guarded Versions with `nel compare`","Compare identical cases across baseline and guarded versions without inventing unsupported metrics.","interactive",18,["evaluator","guardrails"],["NeMo Evaluator","nel compare"]],
 ["20","evaluate","Convert Every Attack into a Regression Case","Turn each discovered failure into a repeatable evaluation case and release gate input.","guided",16,["evaluator"],["NeMo Evaluator","Regression testing"]],
 ["21","improve","Choose the Simplest Safe Agent Architecture","Decide when deterministic code, an object agent, retrieval, or guardrails is justified.","guided",13,["nooa","guardrails"],["NOOA","NeMo Guardrails"]],
 ["22","improve","Define a Decision-Grade `nel gate`","Define explicit quality, safety, cost, latency, and evidence thresholds for a release decision.","interactive",20,["evaluator"],["NeMo Evaluator","nel gate"]],
 ["23","improve","Pass the Production Release Gate","Release, revise, or reject using ownership, evaluation, rollback, and isolation evidence.","interactive",21,["evaluator","guardrails","anonymizer"],["NeMo Evaluator","NeMo Guardrails","NeMo Anonymizer"]],
 ["24","improve","Operate, Observe, Learn, and Repeat","Convert production observations and residual risk into the next measurable improvement loop.","guided",12,["evaluator","anonymizer"],["NeMo Evaluator","NeMo Anonymizer","OpenTelemetry"]],
];

export const catalog:Lesson[]=definitions.map(([id,stage,title,summary,kind,duration,repositoryIds,technologies])=>({id,stage,title,summary,kind,duration,repositories:repositoryIds,technologies,sources:sourceFor(repositoryIds)}));
