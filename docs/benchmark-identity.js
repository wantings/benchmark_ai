/* Publisher spelling aliases only. Dataset variants and tool conditions remain explicit. */
function benchmarkIdentity(name){let n=String(name).normalize('NFKC').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();if(/^SWE Pro$/i.test(n))return {exact:'SWE-Bench Pro',family:'SWE-Bench Pro'};if(/^SWE Multilingual$/i.test(n))return {exact:'SWE-bench Multilingual',family:'SWE-bench Multilingual'};const m=n.match(/^(?:HLE|Humanity'?s Last Exam)(?:\s*(?:\(([^)]+)\)|((?:with|without|no) tools)))?$/i);if(!m)return {exact:n,family:n};let condition=(m[1]||m[2]||'').toLowerCase().trim();if(condition==='hle')condition='';if(condition==='without tools')condition='no tools';if(condition&&!['no tools','with tools'].includes(condition)&&/(?:tools|search|python)/i.test(condition))return {exact:'Humanity’s Last Exam ('+condition+')',family:'Humanity’s Last Exam'};if(condition&&!['no tools','with tools'].includes(condition))return {exact:'Humanity’s Last Exam ('+condition+')',family:'Humanity’s Last Exam ('+condition+')'};return {exact:'Humanity’s Last Exam'+(condition?' ('+condition+')':''),family:'Humanity’s Last Exam'};}
// Publisher labels take precedence over reference family aliases for HLE revisions.
function benchmarkFamily(entry){
 if(entry.reporting_family)return benchmarkIdentity(entry.reporting_family).family;
 const own=benchmarkIdentity(entry.name);
 if(/(?:\bHLE\b|Humanity['’]?s Last Exam)/i.test(entry.name))return own.family;
 return benchmarkIdentity(entry.family||entry.name).family;
}
if(typeof module!=='undefined')module.exports={benchmarkIdentity,benchmarkFamily};
