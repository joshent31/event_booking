import {account,identity,actor,apiError} from '../../../lib/account';
import {dataset,visible} from '../../../lib/business';
import {recordsDb} from '../../../db/records';
export async function GET(request:Request){try{let a;if(request.headers.has('authorization'))a=await actor(request);else{const user=await identity();a=await account();if(!a)return Response.json({account:null,user:{name:user.displayName,email:user.email}},{headers:{'Cache-Control':'no-store'}});}return Response.json({account:a,...visible(a,await dataset(recordsDb())),capabilities:{livePayments:false,externalNotifications:false}},{headers:{'Cache-Control':'no-store'}});}catch(e){return apiError(e)}}
