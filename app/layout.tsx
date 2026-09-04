import type {Metadata} from "next"; import "./globals.css";
export const metadata:Metadata={title:"LearningNeMo.ai — Build agents that earn the right to run",description:"Build, trace, attack, guard, evaluate, and improve secure AI agents with NVIDIA NeMo.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
