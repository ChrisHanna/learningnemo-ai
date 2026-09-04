import data from "@/lib/catalog-data.json";

export type StageId="build"|"trace"|"attack"|"guard"|"evaluate"|"improve";
export type LessonKind="interactive"|"guided";
export type CanonicalRepositoryId="nooa"|"guardrails"|"evaluator"|"anonymizer";
export type RepositorySource={
 repository:CanonicalRepositoryId;
 pinnedRef:string;
 lastSourceReviewed:string;
 packageName:string;
 cliName:string;
 colangVersion?:string;
 status:"research/alpha"|"active";
 safetyNote:string;
};
export type CanonicalRepository=Omit<RepositorySource,"repository">&{id:CanonicalRepositoryId;name:string;url:string;description:string};
export type Lesson={id:string;stage:StageId;title:string;summary:string;kind:LessonKind;duration:number;repositories:CanonicalRepositoryId[];technologies:string[];sources:RepositorySource[]};

export const stages=data.stages as {id:StageId;label:string;promise:string}[];
export const repositories=data.repositories as CanonicalRepository[];
const sourceFor=(ids:CanonicalRepositoryId[])=>ids.map(repository=>{
 const source=repositories.find(item=>item.id===repository);
 if(!source) throw new Error(`Unknown catalog repository: ${repository}`);
 const {pinnedRef,lastSourceReviewed,packageName,cliName,colangVersion,status,safetyNote}=source;
 return {repository,pinnedRef,lastSourceReviewed,packageName,cliName,colangVersion,status,safetyNote};
});
export const catalog=data.lessons.map(lesson=>({...lesson,sources:sourceFor(lesson.repositories)})) as Lesson[];
