import type {Progress} from './progress';
export const roadmapStatuses = ['not-started','pending','learning','done'] as const;
export type RoadmapStatus = typeof roadmapStatuses[number];
export const statusLabels: Record<RoadmapStatus,string> = {'not-started':'Not started',pending:'Pending',learning:'Learning',done:'Done'};
export function roadmapStatus(p:Progress,id:string):RoadmapStatus {
 const value=p.notes['roadmap.status:'+id];
 return roadmapStatuses.includes(value as RoadmapStatus)?value as RoadmapStatus:'not-started';
}
export function setRoadmapStatus(p:Progress,id:string,status:RoadmapStatus):Progress {
 return {...p,notes:{...p.notes,['roadmap.status:'+id]:status}};
}
