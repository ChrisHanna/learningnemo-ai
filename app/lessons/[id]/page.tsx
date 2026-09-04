import {readFile} from "node:fs/promises";
import path from "node:path";
import {notFound} from "next/navigation";
import {LessonView} from "@/components/lesson-view";
import {getLesson,getLessonIds} from "@/lib/lesson";

export function generateStaticParams(){
  return getLessonIds().map(id=>({id}));
}

export default async function LessonPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const lesson=getLesson(id);
  if(!lesson) notFound();
  const code=await readFile(path.join(process.cwd(),lesson.exercise.sourcePath),"utf8");
  return <LessonView lesson={lesson} code={code}/>;
}
