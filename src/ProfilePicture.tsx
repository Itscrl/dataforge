import {Database,Terminal,Layers,Compass,Workflow} from 'lucide-react';
import type {Progress} from './lib/progress';
export const profilePictures=[['initial','Initial'],['database','Database'],['terminal','Terminal'],['layers','Layers'],['compass','Compass'],['workflow','Workflow']] as const;
export function ProfilePicture({p}:{p:Progress}){const id=p.notes['profile.picture']||'initial';const Icon={database:Database,terminal:Terminal,layers:Layers,compass:Compass,workflow:Workflow}[id];return <span className="avatar" aria-hidden="true">{Icon?<Icon size={20}/>:p.name.slice(0,1).toUpperCase()}</span>;}
