import {actor,apiError} from '../../../lib/account';
import {dataset,visible} from '../../../lib/business';
import {recordsDb} from '../../../db/records';
export async function GET(){try{const a=await actor(),data=await dataset(recordsDb());const output={format:'josh-events-export',schemaVersion:1,exportedAt:new Date().toISOString(),...visible(a,data)};return new Response(JSON.stringify(output,null,2),{headers:{'Content-Type':'application/json','Content-Disposition':'attachment; filename="josh-events-export.json"','Cache-Control':'no-store'}})}catch(e){return apiError(e)}}
