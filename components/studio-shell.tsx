"use client";

import type {ReactNode} from "react";
import {Braces, Crosshair, Eye, Radar, ShieldCheck, Sparkles, type LucideIcon} from "lucide-react";
import {stages,type StageId} from "@/lib/catalog";

const icons:Record<StageId,LucideIcon>={build:Braces,trace:Eye,attack:Crosshair,guard:ShieldCheck,evaluate:Radar,improve:Sparkles};

type StudioShellProps={
  stage:StageId;
  onStageChange:(stage:StageId)=>void;
  children:ReactNode;
  topId?:string;
  catalogHref?:string;
};

export function StudioShell({stage,onStageChange,children,topId="top",catalogHref="#catalog"}:StudioShellProps){
  return <main>
    <header className="topbar"><a className="brand" href={`#${topId}`}><b>N</b>LearningNeMo<span>.ai</span></a><div className="top-actions"><small><i/>Interview release · 24 lessons</small><a href={catalogHref}>Explore catalog</a></div></header>
    <section className="workspace" id={topId}>
      <aside className="rail"><p>THE LEARNING LOOP</p><nav aria-label="Learning stages">{stages.map((s,i)=>{const Icon=icons[s.id];return <button key={s.id} onClick={()=>onStageChange(s.id)} className={stage===s.id?"active":""} aria-current={stage===s.id?"step":undefined}><small>0{i+1}</small><Icon size={18}/><span>{s.label}</span></button>})}</nav><div className="rail-note"><strong>One agent. Six decisions.</strong><span>Every lesson advances the same secure support agent.</span></div></aside>
      <div className="content">{children}</div>
    </section>
    <footer><div><b>N</b><span>Independent learning project by Chris Hanna.<br/>Not affiliated with or endorsed by NVIDIA.</span></div><p>Build → Trace → Attack → Guard → Evaluate → Improve</p></footer>
  </main>;
}
