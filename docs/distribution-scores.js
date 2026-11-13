const scoreBenchmarkIdentity=typeof benchmarkIdentity==='function'?benchmarkIdentity:require('./benchmark-identity.js').benchmarkIdentity;
/* Rank only explicit single percentages. Never convert fractions, Elo or unitless values. */
function percentageScore(value){const m=String(value??'').trim().match(/^(\d+(?:\.\d+)?)\s*%\s*(?:\(([^()]*)\))?$/);if(!m)return null;const number=Number(m[1]);return number>=0&&number<=100?{number,qualifier:(m[2]||'').trim()}:null;}
function scoreRankingRows(records,dataset,companies,direction='high'){
 const rows=new Map();for(const release of records){for(const evidence of dataset==='reference'?release.evals:release.local_rows){const verifiedDeepSeek=release.company==='DeepSeek'&&/^SWE (Pro|Multilingual)$/i.test(evidence.name)&&/^\d+(?:\.\d+)?$/.test(String(evidence.score).trim())&&Number(evidence.score)<=100;const score=percentageScore(evidence.score)||(verifiedDeepSeek?{number:Number(evidence.score),qualifier:''}:null);if(!score)continue;
 // Exact benchmark versions, metric qualifiers and explicit tool conditions remain separate.
 const identity=scoreBenchmarkIdentity(evidence.name),originalSettings=String(evidence.settings||'').trim();
 // Compare company maxima across releases, effort levels and publisher reports.
 // Explicit tool conditions remain distinct; source settings stay on every entry.
 const toolMatch=originalSettings.match(/(?:^|;\s*)(no tools|without tools|with tools|tools)(?:;|$)/i);
 const settings=toolMatch?(/^(no|without)/i.test(toolMatch[1])?'no tools':'with tools'):'';
 const qualifier=/^(?:xhigh|high|medium|low|max)(?: (?:reasoning )?effort)?$/i.test(score.qualifier)?'':score.qualifier;
 const key=JSON.stringify([identity.exact,settings,qualifier]);
 if(!rows.has(key))rows.set(key,{name:identity.exact,settings,qualifier,cells:companies.map(()=>null),entries:[]});
 const row=rows.get(key),index=companies.indexOf(release.company);if(index<0)continue;const item={...evidence,value:score.number,display_score:verifiedDeepSeek?String(evidence.score):score.number+'%',release_id:release.id,release_name:release.name,company:release.company,date:release.date_iso};row.entries.push(item);
 const previous=row.cells[index];if(!previous||item.value>previous.value)row.cells[index]=item;
 }}
 return [...rows.values()].map(row=>{const values=[...new Set(row.cells.filter(Boolean).map(e=>e.value))].sort((a,b)=>direction==='low'?a-b:b-a);for(const cell of row.cells)if(cell)cell.rank=1+row.cells.filter(e=>e&&(direction==='low'?e.value<cell.value:e.value>cell.value)).length;return {...row,n:row.cells.filter(Boolean).length,total:row.entries.length,best:values[0]};});
}
if(typeof module!=='undefined')module.exports={percentageScore,scoreRankingRows};
