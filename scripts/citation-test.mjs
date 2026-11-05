import assert from 'node:assert/strict';import {validateAnswer,validateInput} from '../server/rag/contract.mjs';
const evidence=[{id:'chunk1',documentId:'book1',title:'SQL reference',page:42,text:'A left join preserves unmatched rows from its left input.'}];
const good={claims:[{text:'A left join retains unmatched left-side rows.',citations:[{source:1,quote:'A left join preserves unmatched rows'}]}],limitations:'',practice:'Compare this with an inner join.'};
const result=validateAnswer(JSON.stringify(good),evidence);assert.equal(result.claims[0].citations[0].page,42);assert.equal(result.validation.status,'quotes-verified');
assert.throws(()=>validateAnswer(JSON.stringify({...good,claims:[{text:'unsupported',citations:[{source:1,quote:'This quote was never in the reference.'}]}]}),evidence),/does not match/);
assert.throws(()=>validateAnswer(JSON.stringify({...good,claims:[{text:'unsupported',citations:[{source:99,quote:'A left join preserves unmatched rows'}]}]}),evidence),/invalid citation/);
assert.throws(()=>validateAnswer(JSON.stringify({...good,claims:[{text:'unsupported',citations:[]}]}),evidence),/no valid citation/);
assert.equal(validateAnswer(JSON.stringify({claims:[],limitations:'No supporting source.',practice:''}),evidence).validation.status,'insufficient-evidence');
assert.throws(()=>validateInput({question:'SQL',evidence:[{...evidence[0],page:-1}]}));console.log('PASS physical-page provenance, quote matching, missing/invalid citation rejection, abstention and input bounds');
