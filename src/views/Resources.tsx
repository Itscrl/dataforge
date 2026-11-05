import React,{useEffect,useState,useRef,type ReactNode} from 'react';
import {ArrowRight,ArrowLeft,Check,ChevronRight,ChevronDown,Play,Code2,Layers,BookOpen,Activity,Map,Home,Search,Settings,Trophy,Flame,Clock,ExternalLink,Bookmark,Download,Upload,Menu,X,CheckCircle2,AlertCircle,RotateCcw,Database,Terminal,Lightbulb,Target,FileText,FolderKanban,Square,WifiOff,ShieldCheck} from 'lucide-react';

import {tracks,questions,guides,incidents,projects} from '../content/curriculum';
import {resources} from '../content/resources';
import {challenges,schema,dialects,type Depth,type Dialect} from '../content/sql';
import {fresh,validateProgress,record,stats,pickQuestions,dayKey,type Progress,type Attempt} from '../lib/progress';
import {runSQL,type RunResult} from '../lib/runner';
import type {Table} from '../lib/grading';


import {Source,Pill,Empty,ProgressBar,DataTable,Heading,trackTitle,type Add} from '../shared';
export function Resources({p,bookmark}:{p:Progress;bookmark:(id:string)=>void}){
 const [search,setSearch]=useState('');const [track,setTrack]=useState('all');const [level,setLevel]=useState('all');const [saved,setSaved]=useState(false);
 const filtered=resources.filter(r=>(track==='all'||r.track===track)&&(level==='all'||r.level===level)&&(!saved||p.bookmarks.includes(r.id))&&`${r.title} ${r.description} ${trackTitle(r.track)}`.toLowerCase().includes(search.toLowerCase()));
 return <><Heading title="Go deeper. Go to the source." text={`${resources.length} selected learning resources across the engineering lifecycle. Original documentation, not a scraped content dump.`}/><div className="filters"><div className="search-field grow"><Search size={17}/><input aria-label="Search resources" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tools, concepts, or languages"/></div><label>Track<select value={track} onChange={e=>setTrack(e.target.value)}><option value="all">All tracks</option>{tracks.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></label><label>Depth<select value={level} onChange={e=>setLevel(e.target.value)}><option value="all">All depths</option>{['Foundations','Intermediate','Advanced','Professional'].map(d=><option key={d}>{d}</option>)}</select></label><label className="check-label"><input type="checkbox" checked={saved} onChange={e=>setSaved(e.target.checked)}/>Saved only</label></div><p className="small muted">{filtered.length} resources · External reading requires an internet connection.</p><div className="resource-list">{filtered.map(r=><article key={r.id}><div className="resource-icon"><FileText size={22}/></div><div><div className="resource-meta">{trackTitle(r.track)}<span>·</span>{r.kind}<span>·</span>{r.level}</div><h2><a href={r.url} target="_blank" rel="noreferrer">{r.title}<ExternalLink size={15}/></a></h2><p>{r.description}</p><span className="source-domain">{new URL(r.url).hostname}</span></div><button className={`icon-button ${p.bookmarks.includes(r.id)?'bookmarked':''}`} aria-label={`Bookmark ${r.title}`} aria-pressed={p.bookmarks.includes(r.id)} onClick={()=>bookmark(r.id)}><Bookmark size={19}/></button></article>)}</div>{!filtered.length&&<Empty title="No resources match these filters.">Clear a filter or save a resource to build your reading list.</Empty>}</>;
}
