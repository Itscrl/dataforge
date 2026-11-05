import {retrieve} from './lib/retrieval';
self.onmessage=event=>{try{self.postMessage({evidence:retrieve(event.data.question,event.data.documents,5)});}catch{self.postMessage({error:'The source index could not be searched. Try a narrower document scope.'});}};
