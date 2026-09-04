export type StageId="build"|"trace"|"attack"|"guard"|"evaluate"|"improve";
export const stages:{id:StageId;label:string;promise:string}[]=[
 {id:"build",label:"Build",promise:"Give the agent a job—and a boundary."},{id:"trace",label:"Trace",promise:"See every decision, retrieval, and tool call."},{id:"attack",label:"Attack",promise:"Break assumptions before users do."},{id:"guard",label:"Guard",promise:"Put enforceable controls at the right layer."},{id:"evaluate",label:"Evaluate",promise:"Measure quality, safety, and efficiency."},{id:"improve",label:"Improve",promise:"Turn evidence into the next safer version."},
];
type Lesson={id:string;stage:StageId;title:string;summary:string;kind:"interactive"|"guided";duration:number};
export const catalog:Lesson[]=[
 ["01","build","Map the Agentic AI Stack","Place models, orchestration, data, tools, rails, and runtime controls in one production architecture.","guided",12],
 ["02","build","Build a Typed NeMo Agent","Turn a support outcome into a typed contract with explicit inputs, outputs, and failure states.","interactive",18],
 ["03","build","Design Secure RAG","Ground the agent in permission-aware enterprise knowledge without widening its data boundary.","guided",15],
 ["04","build","Constrain Tools and Capabilities","Replace ambient access with narrow, validated, least-privilege capabilities.","interactive",20],
 ["05","trace","Understand Agent Trajectories","Read a complete agent run as decisions rather than only a final answer.","guided",12],
 ["06","trace","Explore an ATIF Trace","Inspect correlated model, retrieval, policy, and tool events.","interactive",16],
 ["07","trace","Debug Retrieval and Tool Calls","Find the first bad decision and distinguish its cause from downstream symptoms.","interactive",18],
 ["08","trace","Add Memory Without Losing Control","Choose what the agent may remember, for how long, and under whose authority.","guided",14],
 ["09","attack","Threat-Model the Support Agent","Map assets, actors, trust boundaries, abuse paths, and consequences.","guided",15],
 ["10","attack","Break It With Prompt Injection","Replay an injection and trace how untrusted content becomes an unsafe action.","interactive",18],
 ["11","attack","Expose Insecure RAG and Data Boundaries","Test poisoning, overbroad retrieval, missing permissions, and data leakage.","guided",16],
 ["12","attack","Abuse Tools and Multi-Agent Handoffs","Follow authority across tools and agents—and find where it silently expands.","guided",15],
 ["13","guard","Apply the Five Rails","Place input, dialog, retrieval, execution, and output controls around the failure.","interactive",22],
 ["14","guard","Enforce Least-Privilege Tool Use","Deny the prohibited action while preserving the legitimate support task.","interactive",20],
 ["15","guard","Protect Runtime, Data, and Supply Chain","Layer isolation, secrets, provenance, dependencies, and data controls behind the rails.","guided",17],
 ["16","guard","Red-Team and Replay Attacks","Turn failures into repeatable adversarial cases and regression gates.","interactive",19],
 ["17","evaluate","Build a Golden Evaluation Set","Create normal, edge, and adversarial cases with defensible expected behavior.","guided",14],
 ["18","evaluate","Measure Quality, Safety, and Efficiency","Inspect component and end-to-end metrics without hiding critical failures.","interactive",20],
 ["19","evaluate","Compare Agent Versions","Run V1 and V2 on identical cases and expose safety and utility tradeoffs.","interactive",18],
 ["20","evaluate","Trace Regressions to Root Causes","Connect a failing metric to the retrieval, prompt, policy, or tool event.","guided",16],
 ["21","improve","Choose the Simplest Safe Architecture","Decide when automation, RAG, fine-tuning, or an agent is justified.","guided",13],
 ["22","improve","Add Production Observability","Design traces, alerts, feedback, and evidence capture for a changing system.","interactive",20],
 ["23","improve","Pass the Production Release Gate","Release, revise, or reject using governance, evaluation, rollback, and ownership evidence.","interactive",21],
 ["24","improve","Plan the Next Improvement Loop","Convert residual risk and production signals into the next engineering change.","guided",12],
].map(([id,stage,title,summary,kind,duration])=>({id,stage,title,summary,kind,duration})) as Lesson[];
