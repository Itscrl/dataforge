export type Cell = string | number | null;
export interface Table {columns:string[];values:Cell[][]}
export interface Comparison {correct:boolean;message:string;missing:Cell[][];extra:Cell[][]}
export function compare(actual:Table,expected:Table,ordered=false):Comparison {
 if(actual.columns.map(c=>c.toLowerCase()).join('|')!==expected.columns.map(c=>c.toLowerCase()).join('|'))return {correct:false,message:`Column contract differs. Expected: ${expected.columns.join(', ')}. Received: ${actual.columns.join(', ') || 'no columns'}. Check aliases and column order.`,missing:[],extra:[]};
 const key=(r:Cell[])=>JSON.stringify(r.map(v=>typeof v==='number'?Math.round(v*1e6)/1e6:v));
 const a=actual.values.map(key),e=expected.values.map(key);
 const subtract=(left:string[],right:string[])=>{const counts=new Map<string,number>();right.forEach(k=>counts.set(k,(counts.get(k)||0)+1));return left.filter(k=>{const n=counts.get(k)||0;if(n){counts.set(k,n-1);return false;}return true;}).map(k=>JSON.parse(k) as Cell[]);};
 const missing=subtract(e,a),extra=subtract(a,e);
 const sameRows=!missing.length&&!extra.length;
 const correct=sameRows&&(!ordered||a.join('\n')===e.join('\n'));
 return {correct,message:correct?'The result matches the expected columns, values and duplicate counts.':sameRows?'The rows match, but their order differs. Check every ORDER BY key, including the tie-breaker.':`Result mismatch: expected ${e.length} rows, received ${a.length}. ${missing.length} missing and ${extra.length} unexpected rows (duplicates count).`,missing:missing.slice(0,5),extra:extra.slice(0,5)};
}
export function errorAdvice(message:string):string {
 if(/no such column|column .*does not exist/i.test(message))return 'Check the schema and table aliases. A SELECT alias may not be available where you used it. For window results, calculate in a CTE and filter in the outer query.';
 if(/no such table|relation .*does not exist/i.test(message))return 'Use a table from the schema: customers, orders, products, events, or payments. CTE names exist only inside their statement.';
 if(/syntax|near /i.test(message))return 'Check the token named by the engine, then the clause immediately before it: commas, parentheses, quoted strings, and SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.';
 if(/aggregate|GROUP BY|window function/i.test(message))return 'Check the result grain. Group non-aggregated output columns and filter aggregate groups with HAVING. Window expressions usually need a subquery before filtering.';
 if(/read.only|readonly/i.test(message))return 'This lab accepts a single read-only SELECT or WITH query. The dataset is recreated for every run.';
 return 'Use the engine error as evidence, check the schema and dialect, then simplify the query and add clauses back one at a time.';
}
