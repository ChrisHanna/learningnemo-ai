import {existsSync,readFileSync} from "node:fs";

const lesson=JSON.parse(readFileSync(new URL("../content/lessons/01-build-first-python-object-agent.json",import.meta.url)));
const fail=message=>{throw new Error(`Lesson validation failed: ${message}`)};
const required=["id","title","stage","kind","duration","outcome","objectives","prerequisites","concept","exercise","misconception","evidence"];
for(const field of required) if(!lesson[field]) fail(`lesson 01 is missing ${field}`);
if(lesson.id!=="01"||lesson.stage!=="build") fail("golden lesson identity drifted");
if(lesson.objectives.length<3) fail("golden lesson needs at least three measurable objectives");
if(!lesson.exercise.runCommand.includes("NVIDIA-NeMo/labs-OO-Agents.git@")) fail("run command is not pinned to the canonical NOOA source");
if(!/[0-9a-f]{40}/.test(lesson.exercise.runCommand)) fail("run command lacks an exact source commit");
if(!lesson.exercise.expectedOutput.includes('"framework": "nooa"')) fail("expected output does not prove NOOA import identity");
if(lesson.evidence.status==="live"||lesson.evidence.status==="package-verified") fail("lesson claims execution evidence before CHR-30/CHR-39 records it");
if(!lesson.evidence.safety.includes("OS-level isolation")) fail("NOOA containment warning is missing");
if(!existsSync(new URL(`../${lesson.exercise.sourcePath}`,import.meta.url))) fail("exercise source file does not exist");
const source=readFileSync(new URL(`../${lesson.exercise.sourcePath}`,import.meta.url),"utf8");
for(const token of ["from nooa import Agent","from nooa.unifiedllm import FakeLLMClient","class SupportAgent(Agent)","SupportAgent(llm=FakeLLMClient())","assert issubclass(SupportAgent, Agent)"]){
  if(!source.includes(token)) fail(`exercise lacks authentic NOOA evidence: ${token}`);
}
console.log("Lesson contract is valid: lesson 01 has authentic NOOA code, provenance, pedagogy, and honest evidence status.");
