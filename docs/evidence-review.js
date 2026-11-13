/* Suggestions expose saved evidence only; no automatic benchmark equivalence. */
const reviewIdentity=typeof benchmarkIdentity==='function'?benchmarkIdentity:require('./benchmark-identity.js').benchmarkIdentity;
const reviewFamily=typeof benchmarkFamily==='function'?benchmarkFamily:require('./benchmark-identity.js').benchmarkFamily;
function reviewKey(n){return String(n||'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');}
function evidenceReview({data,company,benchmark,records,exact=false}){
 const key=reviewKey(benchmark),family=(data.families||[]).find(f=>reviewKey(reviewIdentity(f.name).family)===reviewKey(reviewIdentity(benchmark).family));
 const reference=records.filter(r=>r.company===company&&((!exact&&family?.reference_release_ids.includes(r.id))||(r.evals||[]).some(e=>reviewKey(reviewIdentity(e.name).exact)===key)));
 const refs=reference.flatMap(r=>(r.evals||[]).filter(e=>exact?reviewKey(reviewIdentity(e.name).exact)===key:reviewKey(reviewFamily(e))===reviewKey(reviewIdentity(benchmark).family)).map(e=>({...e,release_name:r.name,release_id:r.id})));
 const near=n=>{const k=reviewKey(n);if(k===key||k.includes(key)||key.includes(k)&&k.length>=4)return true;if(/(?:τ|tau)/.test(key)&&/(?:τ|tau)/.test(k))return true;const tokens=String(benchmark).toLowerCase().match(/[a-z]{4,}/g)||[];return tokens.some(t=>!['bench','benchmark','score','verified','agent'].includes(t)&&k.includes(t));};
 const owner=records.filter(r=>r.company===company);
 const rows=owner.flatMap(r=>(r.local_rows||[]).map(e=>({...e,release_id:r.id,release_name:r.name,date:r.report_date||r.date_iso,reason:'Related saved publisher label; inclusion not yet approved'}))).filter(e=>near(e.name));
 const seen=new Set();const candidates=rows.filter(e=>{const k=JSON.stringify([e.release_id,e.name,e.score,e.model,e.settings,e.url]);if(seen.has(k))return false;seen.add(k);return true;});
 const releases=reference.length?reference:owner.filter(r=>candidates.some(e=>e.release_id===r.id));
 return {company,benchmark,reference:refs,candidates,releases};
}
if(typeof module!=='undefined')module.exports={evidenceReview,reviewKey};
