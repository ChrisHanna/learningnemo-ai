import lesson01 from "@/content/lessons/01-build-first-python-object-agent.json";
import type {LessonKind,StageId} from "@/lib/catalog";

export type EvidenceStatus="source-reviewed"|"package-verified"|"recorded"|"live";

export type LessonContent={
  id:string;
  title:string;
  stage:StageId;
  kind:LessonKind;
  duration:number;
  outcome:string;
  objectives:string[];
  prerequisites:string[];
  concept:{title:string;body:string};
  exercise:{
    sourcePath:string;
    runCommand:string;
    steps:string[];
    expectedOutput:string;
    checkpoint:string;
  };
  misconception:{claim:string;correction:string};
  evidence:{
    status:EvidenceStatus;
    label:string;
    sourceUrl:string;
    sourceRef:string;
    packageName:string;
    python:string;
    safety:string;
  };
};

const lessons=[lesson01] as LessonContent[];

export function getLesson(id:string){
  return lessons.find(lesson=>lesson.id===id);
}

export function getLessonIds(){
  return lessons.map(lesson=>lesson.id);
}
