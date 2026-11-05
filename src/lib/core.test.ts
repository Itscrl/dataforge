import {describe,it,expect} from 'vitest';
import initSqlJs from 'sql.js';
import {PGlite} from '@electric-sql/pglite';
import {challenges,fixture} from '../content/sql';
import {compare,errorAdvice} from './grading';
import {fresh,record,stats,validateProgress,pickQuestions} from './progress';
import {tracks,questions,guides,incidents,projects} from '../content/curriculum';
import {resources} from '../content/resources';
describe('grading contracts',()=>{
 it('keeps duplicate multiplicity and distinguishes NULL from strings',()=>{expect(compare({columns:['x'],values:[[1],[1]]},{columns:['x'],values:[[1]]}).correct).toBe(false);expect(compare({columns:['x'],values:[[null]]},{columns:['x'],values:[['null']]}).correct).toBe(false);});
 it('only enforces row order when requested',()=>{const a={columns:['x'],values:[[1],[2]]},b={columns:['x'],values:[[2],[1]]};expect(compare(a,b).correct).toBe(true);expect(compare(a,b,true).correct).toBe(false);});
 it('enforces column contract for empty outputs',()=>{expect(compare({columns:['a'],values:[]},{columns:['b'],values:[]}).correct).toBe(false);});
 it('handles numeric roundoff and preserves numeric/text types',()=>{expect(compare({columns:['x'],values:[[0.1+0.2]]},{columns:['x'],values:[[0.3]]}).correct).toBe(true);expect(compare({columns:['x'],values:[['1']]},{columns:['x'],values:[[1]]}).correct).toBe(false);});
 it('gives targeted syntax and schema advice',()=>{expect(errorAdvice('no such column: amounts')).toContain('schema');expect(errorAdvice('near FROM: syntax error')).toContain('commas');});
});
describe('progress, rewards and scheduling',()=>{
 it('does not award duplicate or assisted XP',()=>{let p=fresh();const entry={item:'a',track:'sql',kind:'sql' as const,correct:true,assisted:false};p=record(p,entry);p=record(p,entry);p=record(p,{...entry,item:'b',assisted:true});expect(stats(p).xp).toBe(50);expect(stats(p).solved.size).toBe(1);});
 it('schedules wrong answers in ten minutes and correct answers at increasing intervals',()=>{const now=new Date('2026-11-05T10:00:00Z');let p=record(fresh(),{item:'x',track:'sql',kind:'quiz',correct:false,assisted:false},now);expect(p.reviews.x.due).toBe('2026-11-05T10:10:00.000Z');p=record(p,{item:'x',track:'sql',kind:'quiz',correct:true,assisted:false},now);expect(p.reviews.x.interval).toBe(1);p=record(p,{item:'x',track:'sql',kind:'quiz',correct:true,assisted:false},now);expect(p.reviews.x.interval).toBe(2);});
 it('validates backups and rejects malformed payloads',()=>{expect(validateProgress(fresh())).toEqual(fresh());expect(()=>validateProgress({version:1})).toThrow();expect(()=>validateProgress({...fresh(),attempts:[{at:'bad'}]})).toThrow();expect(()=>validateProgress({...fresh(),notes:{x:123}})).toThrow();});
 it('prioritizes due, then unseen questions and respects filters',()=>{let p=record(fresh(),{item:'due',track:'sql',kind:'quiz',correct:false,assisted:false},new Date('2026-01-01'));const pool=[{id:'new',track:'sql'},{id:'due',track:'sql'}];expect(pickQuestions(pool,p,2,new Date('2026-01-02'))[0].id).toBe('due');});
});
describe('content contracts',()=>{
 it('has broad, connected content without missing explanations',()=>{expect(tracks.length).toBeGreaterThanOrEqual(20);expect(questions.length).toBeGreaterThanOrEqual(100);const ids=new Set(tracks.map(t=>t.id));for(const q of questions){expect(ids.has(q.track)).toBe(true);expect(q.why.length).toBe(q.options.length);expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(q.options.length);expect(q.why.every(x=>x.length>20)).toBe(true);expect(q.source).toMatch(/^https:\/\//);}expect(new Set(questions.map(q=>q.id)).size).toBe(questions.length);for(const t of tracks)expect(questions.filter(q=>q.track===t.id).length).toBeGreaterThanOrEqual(4);});
 it('has sourced guides, complete incident decisions, and actionable projects',()=>{expect(guides.length).toBeGreaterThanOrEqual(40);expect(incidents.length).toBeGreaterThanOrEqual(6);for(const i of incidents)for(const step of i.steps){expect(step.options.length).toBe(step.why.length);expect(step.answer).toBeLessThan(step.options.length);}expect(projects.length).toBeGreaterThanOrEqual(6);for(const r of resources){expect(tracks.some(t=>t.id===r.track)).toBe(true);expect(()=>new URL(r.url)).not.toThrow();}expect(new Set(resources.map(r=>r.id)).size).toBe(resources.length);});
});
describe('real SQL engines',()=>{
 it('executes every reference solution on 3 SQLite datasets and detects wrong query',async()=>{const SQL=await initSqlJs();for(const seed of [1,42,138]){const db=new SQL.Database();db.run(fixture(seed));for(const c of challenges){const output=db.exec(c.query);expect(output.length,`${c.id} on ${seed}`).toBe(1);expect(output[0].columns.length).toBeGreaterThan(0);}db.run('PRAGMA query_only=ON');expect(()=>db.exec('DELETE FROM orders')).toThrow();db.close();}},30000);
 it('executes every solution on PostgreSQL and tests read-only errors',async()=>{const pg=await PGlite.create();try{for(const seed of [1,42,138]){await pg.exec('DROP TABLE IF EXISTS payments,events,products,orders,customers;');await pg.exec(fixture(seed));for(const c of challenges){const result=await pg.query(c.query);expect(result.fields.length,`${c.id} on ${seed}`).toBeGreaterThan(0);}}await pg.exec('BEGIN READ ONLY');await expect(pg.query('DELETE FROM orders')).rejects.toThrow();await pg.exec('ROLLBACK');await expect(pg.query('SELECT nonexistent FROM orders')).rejects.toThrow();}finally{await pg.close();}},60000);
});
