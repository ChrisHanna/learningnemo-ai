export type StageId="build"|"trace"|"attack"|"guard"|"evaluate"|"improve";
export type CanonicalRepositoryId="agentToolkit"|"guardrails"|"evaluator"|"dataDesigner";
export type CanonicalRepository={id:CanonicalRepositoryId;name:string;url:string;description:string};
export const repositories:CanonicalRepository[]=[
 {id:"agentToolkit",name:"NeMo Agent Toolkit",url:"https://github.com/NVIDIA/NeMo-Agent-Toolkit",description:"Build, connect, observe, and optimize AI agent workflows."},
 {id:"guardrails",name:"NeMo Guardrails",url:"https://github.com/NVIDIA-NeMo/Guardrails",description:"Constrain LLM applications with programmable safety and dialog policies."},
 {id:"evaluator",name:"NeMo Evaluator",url:"https://github.com/NVIDIA-NeMo/Evaluator",description:"Evaluate models and agentic workflows with repeatable benchmarks and reports."},
 {id:"dataDesigner",name:"NeMo Data Designer",url:"https://github.com/NVIDIA-NeMo/DataDesigner",description:"Generate and validate high-quality synthetic datasets for AI applications."},
];
export const stages:{id:StageId;label:string;promise:string}[]=[
 {id:"build",label:"Build",promise:"Configure a NeMo workflow—and its authority."},
 {id:"trace",label:"Trace",promise:"See every workflow event, token, and tool call."},
 {id:"attack",label:"Attack",promise:"Break trust boundaries before users do."},
 {id:"guard",label:"Guard",promise:"Put NeMo Guardrails at the right enforcement layer."},
 {id:"evaluate",label:"Evaluate",promise:"Measure quality, safety, cost, and latency."},
 {id:"improve",label:"Improve",promise:"Optimize, release, observe, and repeat."},
];
type Lesson={id:string;stage:StageId;title:string;summary:string;kind:"interactive"|"guided";duration:number;repositories:CanonicalRepositoryId[];technologies:string[]};
export const catalog:Lesson[]=[
 ["01","build","Wrap an Existing Agent with NeMo Agent Toolkit","Add configuration, instrumentation, and evaluation without rewriting the existing agent.","guided",12,["agentToolkit"],["NeMo Agent Toolkit"]],
 ["02","build","Configure a NeMo Workflow with YAML","Define the support workflow, functions, models, inputs, outputs, and failure behavior.","interactive",18,["agentToolkit"],["NeMo Agent Toolkit","YAML"]],
 ["03","build","Build Permission-Aware Enterprise RAG","Ground responses in enterprise knowledge while preserving document-level authorization.","guided",15,["agentToolkit"],["NeMo Agent Toolkit","RAG"]],
 ["04","build","Add Authenticated MCP Tools","Discover narrow MCP functions, validate parameters, and preserve identity and minimal scopes.","interactive",20,["agentToolkit"],["NeMo Agent Toolkit","MCP","OAuth 2.0"]],
 ["05","trace","Understand NeMo Workflow Events","Read model, retrieval, function, policy, and tool activity as one correlated run.","guided",12,["agentToolkit"],["NeMo Agent Toolkit"]],
 ["06","trace","Explore an Agent Trajectory","Inspect the recorded support-agent trajectory and locate its first consequential decision.","interactive",16,["agentToolkit"],["ATIF","NeMo Agent Toolkit"]],
 ["07","trace","Profile Tokens, Latency, and Tool Calls","Use workflow profiling to locate cost, latency, and execution bottlenecks.","interactive",18,["agentToolkit"],["NeMo Agent Toolkit Profiler"]],
 ["08","trace","Export Telemetry Without Exposing Sensitive Content","Design OpenTelemetry export and content-capture policies for production observability.","guided",14,["agentToolkit"],["OpenTelemetry","NeMo Agent Toolkit"]],
 ["09","attack","Threat-Model the Support Agent","Map assets, actors, trust boundaries, abuse paths, and consequences before testing.","guided",15,["guardrails"],["Threat Modeling"]],
 ["10","attack","Replay Prompt-Injection and Jailbreak Attacks","Trace how an adversarial instruction crosses retrieval and tool boundaries.","interactive",18,["guardrails"],["NeMo Guardrails","NemoGuard JailbreakDetect"]],
 ["11","attack","Attack RAG Permissions and Grounding","Test poisoning, overbroad retrieval, missing filters, and unsupported claims.","guided",16,["guardrails"],["NeMo Guardrails","RAG"]],
 ["12","attack","Exploit Tool Calls, MCP, and Agent Handoffs","Follow authority across tools and agents to expose confused-deputy and scope failures.","guided",15,["agentToolkit","guardrails"],["MCP","NeMo Agent Toolkit"]],
 ["13","guard","Configure the Five Rails","Apply input, dialog, retrieval, execution, and output rails to the attack path.","interactive",22,["guardrails"],["NeMo Guardrails","Colang"]],
 ["14","guard","Validate Tool Inputs and Outputs","Block unsafe tool names, arguments, results, and execution context before side effects occur.","interactive",20,["guardrails"],["NeMo Guardrails","IORails"]],
 ["15","guard","Protect PII, Secrets, and Runtime Boundaries","Layer data handling, credential isolation, dependency controls, and sandboxing behind guardrails.","guided",17,["guardrails"],["NeMo Guardrails"]],
 ["16","guard","Compare Jailbreak-Detection Strategies","Test heuristic, model-based, and NIM-backed detection against common attacks and benign prompts.","interactive",19,["guardrails"],["NeMo Guardrails","NemoGuard NIM"]],
 ["17","evaluate","Build a NeMo Evaluation Dataset","Create normal, edge, and adversarial cases with defensible expected behavior.","guided",14,["dataDesigner","evaluator"],["NeMo Data Designer","NeMo Evaluator"]],
 ["18","evaluate","Run nat eval","Use built-in and custom evaluators to measure task quality, groundedness, and safety.","interactive",20,["evaluator"],["NeMo Evaluator","nat eval"]],
 ["19","evaluate","Compare Agent Versions","Run V1 and V2 on identical data and expose quality, safety, cost, and latency tradeoffs.","interactive",18,["evaluator"],["NeMo Evaluator"]],
 ["20","evaluate","Convert Attacks into Regression Tests","Turn every discovered failure into a repeatable release-blocking evaluation case.","guided",16,["evaluator","guardrails"],["NeMo Evaluator"]],
 ["21","improve","Choose the Simplest Safe Workflow","Decide when deterministic automation, RAG, or agentic orchestration is justified.","guided",13,["agentToolkit"],["NeMo Agent Toolkit"]],
 ["22","improve","Optimize with nat optimize","Tune workflow parameters against explicit evaluation objectives and constraints.","interactive",20,["agentToolkit","evaluator"],["NeMo Agent Toolkit","nat optimize"]],
 ["23","improve","Pass the Production Release Gate","Release, revise, or reject using governance, evaluation, rollback, and ownership evidence.","interactive",21,["agentToolkit","guardrails","evaluator"],["NeMo Agent Toolkit","NeMo Guardrails"]],
 ["24","improve","Operate, Observe, and Repeat","Convert production telemetry and residual risk into the next measurable improvement loop.","guided",12,["agentToolkit","evaluator"],["OpenTelemetry","NeMo Agent Toolkit"]],
].map(([id,stage,title,summary,kind,duration,repositories,technologies])=>({id,stage,title,summary,kind,duration,repositories,technologies})) as Lesson[];
