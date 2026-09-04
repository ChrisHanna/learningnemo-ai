"use client";

import {useState} from "react";
import {Check,ChevronRight,ExternalLink,Terminal} from "lucide-react";
import type {LessonContent} from "@/lib/lesson";
import {StudioShell} from "@/components/studio-shell";

export function LessonView({lesson,code}:{lesson:LessonContent;code:string}){
  const [stage,setStage]=useState(lesson.stage);
  const [revealed,setRevealed]=useState(false);

  return <StudioShell stage={stage} onStageChange={next=>{
    setStage(next);
    window.location.href=`/#catalog`;
  }} catalogHref="/#catalog">
    <article className="lesson-page">
      <header className="lesson-hero">
        <div><p className="eyebrow">LESSON {lesson.id} · {lesson.stage.toUpperCase()}</p><h1>{lesson.title}</h1><p>{lesson.outcome}</p></div>
        <aside><span className={`evidence ${lesson.evidence.status}`}>{lesson.evidence.label}</span><small>{lesson.kind} · {lesson.duration} min</small><a href={`${lesson.evidence.sourceUrl}/tree/${lesson.evidence.sourceRef}`} target="_blank" rel="noreferrer">Reviewed source <ExternalLink size={13}/></a></aside>
      </header>

      <section className="lesson-section lesson-grid-two">
        <div><p className="eyebrow">LEARNING OBJECTIVES</p><ul className="check-list">{lesson.objectives.map(item=><li key={item}><Check size={15}/><span>{item}</span></li>)}</ul></div>
        <div><p className="eyebrow">PREREQUISITES</p><ul>{lesson.prerequisites.map(item=><li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="lesson-section concept"><p className="eyebrow">CORE IDEA</p><h2>{lesson.concept.title}</h2><p>{lesson.concept.body}</p></section>

      <section className="lesson-section exercise">
        <div className="exercise-copy"><p className="eyebrow">AUTHENTIC CODE SAMPLE</p><h2>Run the installed <code>{lesson.evidence.packageName}</code> package.</h2><ol>{lesson.exercise.steps.map(item=><li key={item}>{item}</li>)}</ol><div className="checkpoint"><strong>Checkpoint</strong><p>{lesson.exercise.checkpoint}</p></div></div>
        <div className="code-panel"><div><span>{lesson.exercise.sourcePath}</span><b>PYTHON</b></div><pre><code>{code}</code></pre><div className="run-command"><Terminal size={15}/><code>{lesson.exercise.runCommand}</code></div><button className="primary" onClick={()=>setRevealed(value=>!value)}>{revealed?"Hide":"Reveal"} expected result <ChevronRight size={15}/></button>{revealed&&<pre className="expected"><code>{lesson.exercise.expectedOutput}</code></pre>}</div>
      </section>

      <section className="lesson-section misconception"><div><p className="eyebrow">COMMON MISCONCEPTION</p><strong>{lesson.misconception.claim}</strong></div><p>{lesson.misconception.correction}</p></section>
      <section className="lesson-section provenance"><p className="eyebrow">PROVENANCE &amp; SAFETY</p><dl><div><dt>Package</dt><dd>{lesson.evidence.packageName}</dd></div><div><dt>Source ref</dt><dd><code>{lesson.evidence.sourceRef}</code></dd></div><div><dt>Python</dt><dd>{lesson.evidence.python}</dd></div></dl><p>{lesson.evidence.safety}</p></section>
    </article>
  </StudioShell>;
}
