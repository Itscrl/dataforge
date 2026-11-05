import React,{type ReactNode} from 'react';
import {ExternalLink} from 'lucide-react';
import {tracks} from './content/curriculum';
import type {Table} from './lib/grading';
import type {Attempt} from './lib/progress';
export const trackTitle=(id:string)=>tracks.find(t=>t.id===id)?.title||id;
export function Source({url,children='Read the source'}:{url:string;children?:ReactNode}){return <a className="source" href={url} target="_blank" rel="noreferrer">{children}<ExternalLink size={13}/></a>;}
export function Pill({children,tone=''}:{children:ReactNode;tone?:string}){return <span className={`pill ${tone}`}>{children}</span>;}
export function Empty({title,children}:{title:string;children:ReactNode}){return <div className="empty"><h3>{title}</h3><p>{children}</p></div>;}
export function ProgressBar({value,max,label}:{value:number;max:number;label:string}){return <div className="progress-track" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}><span style={{width:`${max?Math.min(100,value/max*100):0}%`}}/></div>;}
export function DataTable({table}:{table:Table}){return <div className="table-scroll"><table><thead><tr>{table.columns.map((c,i)=><th key={i}>{c}</th>)}</tr></thead><tbody>{table.values.slice(0,40).map((row,i)=><tr key={i}>{row.map((v,j)=><td className={typeof v==='number'?'number':''} key={j}>{v===null?<span className="null">NULL</span>:String(v)}</td>)}</tr>)}</tbody></table>{!table.values.length&&<p className="table-note">The query returned zero rows.</p>}{table.values.length>40&&<p className="table-note">Showing the first 40 of {table.values.length} rows.</p>}</div>;}
export function Brand(){return <svg aria-hidden="true" viewBox="0 0 32 32" width="30" height="30" fill="none"><path d="M5 6h10v9H5zM17 17h10v9H17z" stroke="currentColor" strokeWidth="2.5"/><path d="M15 10h7v7M10 15v7h7" stroke="currentColor" strokeWidth="2.5"/></svg>;}
export function Heading({title,text,children}:{title:string;text:string;children?:ReactNode}){return <div className="page-heading compact"><div><h1>{title}</h1><p>{text}</p></div>{children}</div>;}
export type Add=(entry:Omit<Attempt,'id'|'at'>)=>void;
