import {readFileSync} from "node:fs";

const data=JSON.parse(readFileSync(new URL("../lib/catalog-data.json",import.meta.url)));
const expectedTitles=[
 "Build Your First Python-Object Agent","Define Typed Generation Methods and Contracts","Keep Authorization and Verification in Deterministic Python","Add a Scoped MCP Capability",
 "Understand NOOA Events and Trace Hierarchy","Inspect a Nested Agent Trajectory","Export an ATIF Trajectory","Observe Runs Without Leaking Sensitive Content",
 "Threat-Model the Code-Executing Support Agent","Replay Jailbreak and Indirect Prompt-Injection Attacks","Attack Retrieval, Tools, MCP, and Agent Handoffs","Find PII Leakage Across Prompts, Traces, and Providers",
 "Configure NeMo Guardrails’ Five Rail Types","Enforce Tool Inputs, Outputs, and Side Effects","Detect and Transform Sensitive Data with NeMo Anonymizer","Compare Jailbreak Controls and Runtime Boundaries",
 "Build a NeMo Evaluator BYOB Safety Benchmark","Execute and Report a `nel eval run`","Compare Baseline and Guarded Versions with `nel compare`","Convert Every Attack into a Regression Case",
 "Choose the Simplest Safe Agent Architecture","Define a Decision-Grade `nel gate`","Pass the Production Release Gate","Operate, Observe, Learn, and Repeat",
];
const expectedKinds=["guided","interactive","guided","interactive","guided","interactive","interactive","guided","guided","interactive","guided","guided","interactive","interactive","guided","interactive","guided","interactive","interactive","guided","guided","interactive","interactive","guided"];
const expectedStages=["build","build","build","build","trace","trace","trace","trace","attack","attack","attack","attack","guard","guard","guard","guard","evaluate","evaluate","evaluate","evaluate","improve","improve","improve","improve"];
const expectedRepositories={
 nooa:"https://github.com/NVIDIA-NeMo/labs-OO-Agents",
 guardrails:"https://github.com/NVIDIA-NeMo/Guardrails",
 evaluator:"https://github.com/NVIDIA-NeMo/Evaluator",
 anonymizer:"https://github.com/NVIDIA-NeMo/Anonymizer",
};
const fail=message=>{throw new Error(`Catalog validation failed: ${message}`)};
if(data.stages.map(stage=>stage.id).join(",")!=="build,trace,attack,guard,evaluate,improve") fail("stage loop drifted");
if(data.lessons.length!==24) fail(`expected 24 lessons, found ${data.lessons.length}`);
for(const [index,lesson] of data.lessons.entries()){
 if(lesson.id!==String(index+1).padStart(2,"0")) fail(`lesson ${index+1} has id ${lesson.id}`);
 if(lesson.title!==expectedTitles[index]) fail(`lesson ${lesson.id} title drifted`);
 if(lesson.kind!==expectedKinds[index]) fail(`lesson ${lesson.id} mode drifted`);
 if(lesson.stage!==expectedStages[index]) fail(`lesson ${lesson.id} stage drifted`);
 if(!lesson.repositories.length) fail(`lesson ${lesson.id} has no repository`);
 for(const id of lesson.repositories) if(!Object.hasOwn(expectedRepositories,id)) fail(`lesson ${lesson.id} references unknown repository ${id}`);
}
if(data.lessons.filter(lesson=>lesson.kind==="interactive").length!==12) fail("expected 12 interactive lessons");
if(data.lessons.filter(lesson=>lesson.kind==="guided").length!==12) fail("expected 12 guided lessons");
if(data.repositories.length!==4) fail(`expected four canonical repositories, found ${data.repositories.length}`);
for(const repository of data.repositories){
 if(expectedRepositories[repository.id]!==repository.url) fail(`canonical URL drifted for ${repository.id}`);
 if(!/^(v\d+\.\d+\.\d+|[0-9a-f]{40})$/.test(repository.pinnedRef)) fail(`unpinned source ref for ${repository.id}`);
 for(const field of ["lastSourceReviewed","packageName","cliName","status","safetyNote"]) if(!repository[field]) fail(`source metadata missing for ${repository.id}: ${field}`);
}
if(data.repositories.find(repository=>repository.id==="nooa").packageName!=="nooa") fail("NOOA package identity drifted");
if(data.repositories.find(repository=>repository.id==="nooa").status!=="research/alpha") fail("NOOA maturity/status is not research/alpha");
if(!data.repositories.find(repository=>repository.id==="guardrails").colangVersion) fail("Guardrails Colang version is missing");
if(!data.repositories.find(repository=>repository.id==="nooa").safetyNote.includes("OS-level sandbox")) fail("OS-level sandbox warning is missing");
if(!data.repositories.find(repository=>repository.id==="anonymizer").safetyNote.includes("does not replace document permissions")) fail("Anonymizer safety note is missing");
const serialized=JSON.stringify(data);
if(/\bnat (eval|optimize)\b/.test(serialized)) fail("obsolete nat eval/optimize terminology remains");
console.log("Catalog contract is valid: 24 lessons, 12 interactive, 12 guided, four canonical repositories.");
