import {it,expect} from 'vitest';
import {fresh,validateProgress} from './progress';
import {mergeProgress} from './drive';
import {roadmapStatus,setRoadmapStatus} from './roadmap';
import {roadmapStages} from '../content/engineering-roadmap';
it('round-trips roadmap status and evidence through backups and cloud merge',()=>{
 const old=fresh();expect(roadmapStatus(old,'sql-relations')).toBe('not-started');
 const changed=setRoadmapStatus(old,'sql-relations','done');
 changed.notes['roadmap.evidence:sql-relations']='https://github.com/example/project';
 const restored=validateProgress(JSON.parse(JSON.stringify(changed)));
 const merged=mergeProgress(fresh(),restored);
 expect(roadmapStatus(merged,'sql-relations')).toBe('done');
 expect(merged.notes['roadmap.evidence:sql-relations']).toContain('project');
 expect(old.notes).toEqual({});
 expect(roadmapStatus(setRoadmapStatus(restored,'sql-relations','not-started'),'sql-relations')).toBe('not-started');
});
it('every roadmap point has a unique identity, usable source and completion exercise',()=>{
 expect(new Set(roadmapStages.map(s=>s.id)).size).toBe(roadmapStages.length);
 for(const s of roadmapStages){expect(s.topics.length).toBeGreaterThan(2);expect(s.exercise.length).toBeGreaterThan(40);expect(s.outcome.length).toBeGreaterThan(30);expect(s.resources.length).toBeGreaterThan(0);for(const r of s.resources)expect(r.url.startsWith('#') || new URL(r.url).protocol==='https:').toBe(true);}
});
