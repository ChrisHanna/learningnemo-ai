import {readFileSync} from "node:fs";

const catalog=readFileSync(new URL("../lib/catalog.ts",import.meta.url),"utf8");
const expectedTitles=[
 "Build Your First Python-Object Agent",
 "Define Typed Generation Methods and Contracts",
 "Keep Authorization and Verification in Deterministic Python",
 "Add a Scoped MCP Capability",
 "Understand NOOA Events and Trace Hierarchy",
 "Inspect a Nested Agent Trajectory",
 "Export an ATIF Trajectory",
 "Observe Runs Without Leaking Sensitive Content",
 "Threat-Model the Code-Executing Support Agent",
 "Replay Jailbreak and Indirect Prompt-Injection Attacks",
 "Attack Retrieval, Tools, MCP, and Agent Handoffs",
 "Find PII Leakage Across Prompts, Traces, and Providers",
 "Configure NeMo Guardrails’ Five Rail Types",
 "Enforce Tool Inputs, Outputs, and Side Effects",
 "Detect and Transform Sensitive Data with NeMo Anonymizer",
 "Compare Jailbreak Controls and Runtime Boundaries",
 "Build a NeMo Evaluator BYOB Safety Benchmark",
 "Execute and Report a `nel eval run`",
 "Compare Baseline and Guarded Versions with `nel compare`",
 "Convert Every Attack into a Regression Case",
 "Choose the Simplest Safe Agent Architecture",
 "Define a Decision-Grade `nel gate`",
 "Pass the Production Release Gate",
 "Operate, Observe, Learn, and Repeat",
];
const expectedKinds=["guided","interactive","guided","interactive","guided","interactive","interactive","guided","guided","interactive","guided","guided","interactive","interactive","guided","interactive","guided","interactive","interactive","guided","guided","interactive","interactive","guided"];
const definitions=[...catalog.matchAll(/ \["(\d{2})","(build|trace|attack|guard|evaluate|improve)","([^"]+)","[^"]+","(guided|interactive)",\d+,\[([^\]]+)\]/g)];
const repositories=[...catalog.matchAll(/\{id:"([^"]+)",name:"[^"]+",url:"(https:\/\/github\.com\/[^"]+)",description:"[^"]+",pinnedRef:"([^"]+)",lastVerified:"([^"]+)",packageName:"([^"]+)",status:"([^"]+)",safetyNote:"([^"]+)"\}/g)];
const fail=(message)=>{throw new Error(`Catalog validation failed: ${message}`)};
if(definitions.length!==24) fail(`expected 24 lessons, found ${definitions.length}`);
for(const [index,match] of definitions.entries()){
 const [,id,stage,title,kind,repositoryIds]=match;
 if(id!==String(index+1).padStart(2,"0")) fail(`lesson ${index+1} has id ${id}`);
 if(title!==expectedTitles[index]) fail(`lesson ${id} title drifted`);
 if(kind!==expectedKinds[index]) fail(`lesson ${id} mode drifted`);
 if(["build","trace","attack","guard","evaluate","improve"][Math.floor(index/4)]!==stage) fail(`lesson ${id} stage drifted`);
 for(const repository of repositoryIds.matchAll(/"([^"]+)"/g)){
  if(!["nooa","guardrails","evaluator","anonymizer"].includes(repository[1])) fail(`lesson ${id} references unknown repository ${repository[1]}`);
 }
}
if(definitions.filter(([, , , ,kind])=>kind==="interactive").length!==12) fail("expected 12 interactive lessons");
if(definitions.filter(([, , , ,kind])=>kind==="guided").length!==12) fail("expected 12 guided lessons");
if(repositories.length!==4) fail(`expected four canonical repositories, found ${repositories.length}`);
for(const [,id,url,ref,lastVerified,packageName,status,safetyNote] of repositories){
 if(!ref||!lastVerified||!packageName||!status||!safetyNote) fail(`source metadata missing for ${id}`);
 if(!url.startsWith("https://github.com/NVIDIA-NeMo/")) fail(`non-canonical URL for ${id}`);
}
if(!catalog.includes('status:"research/alpha"')) fail("NOOA maturity/status is not research/alpha");
if(!catalog.includes("OS-level sandbox")) fail("OS-level sandbox warning is missing");
if(!catalog.includes("does not replace document permissions")) fail("Anonymizer safety note is missing");
if(/\bnat (eval|optimize)\b/.test(catalog)) fail("obsolete nat eval/optimize terminology remains");
console.log("Catalog contract is valid: 24 lessons, 12 interactive, 12 guided, four canonical repositories.");
