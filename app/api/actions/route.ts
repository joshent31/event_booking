import {actor,sameOrigin,apiError} from '../../../lib/account';
import {command,BusinessError} from '../../../lib/business';
import {recordsDb} from '../../../db/records';
export async function POST(request:Request){try{sameOrigin(request);const a=await actor(request),raw=await request.text();if(raw.length>20000)throw new BusinessError('Request is too large.',413);let input;try{input=JSON.parse(raw)}catch{throw new BusinessError('Invalid request.')}return Response.json(await command(recordsDb(),a,input));}catch(e){return apiError(e)}}
