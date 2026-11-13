/* Missingness describes the selected evidence collection, never proves global absence. */
function benchmarkCellStatus({count,company,records,allRecords=[],dataset,year,dateBasis,benchmark,exact=false,referenceCount=0}){
 const companyRecords=records.filter(r=>r.company===company);
 const identity=n=>typeof benchmarkIdentity==='function'?benchmarkIdentity(n):{exact:n,family:n};const matches=e=>exact?identity(e.name).exact===benchmark:(typeof benchmarkFamily==='function'?benchmarkFamily(e):identity(e.name).family)===benchmark;
 if(count>0){
  const entries=companyRecords.flatMap(r=>dataset==='reference'?r.evals:r.local_rows).filter(matches);
  const missing=s=>s==null||/^\s*(?:n\/?a\b|not reported\b|not available\b|—\s*$|–\s*$|-\s*$)/i.test(String(s));
  if(entries.length&&entries.every(e=>missing(e.score)))return {code:'named',mark:'*',label:'Benchmark named; readable score not reported',description:'The count records benchmark mentions. No readable score is available in these matching evidence rows.'};
  return {code:'reported',mark:'',label:'Benchmark reported',description:'Count of reports or release events mentioning this benchmark; inspect details for scores and settings.'};
 }
 if(!companyRecords.length){
  const undatedReport=dateBasis==='report'&&allRecords.some(r=>r.company===company&&String(r.release_date||r.date_iso).startsWith(year)&&!r.report_date);
  if(undatedReport)return {code:'unknown',mark:'?',label:'Report date unverified',description:'Model records exist for this year, but their report publication dates are unverified. Switch to model-date view to inspect them.'};
  return {code:'no-model',mark:'NM',label:'No model recorded for this period',description:'No model/report record exists in this collection for the selected period. This does not prove that the developer had no model.'};
 }
 if(dataset==='local'&&(referenceCount>0||companyRecords.every(r=>!r.local_rows.length)))return {code:'unknown',mark:'?',label:'Evidence not collected',description:'Models are listed, but matching publisher evidence is not linked here. Missing collection coverage is not a claim that the score was unreported.'};
 return {code:'not-reported',mark:'NR',label:'Benchmark score not reported in collected evidence',description:'Model/report records exist for this period, but this benchmark has no matching entry in the selected evidence. Different names or incomplete extraction may also explain the absence.'};
}
if(typeof module!=='undefined')module.exports={benchmarkCellStatus};
