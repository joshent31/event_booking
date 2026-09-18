import {z} from 'zod';
import {identity,account,sameOrigin,apiError} from '../../../lib/account';
import {recordsDb} from '../../../db/records';
import {BusinessError} from '../../../lib/business';
export async function POST(request:Request){try{sameOrigin(request);const user=await identity();if(await account())throw new BusinessError('Your account is already set up.');const parsed=z.object({role:z.enum(['customer','vendor']),name:z.string().trim().min(2).max(100)}).safeParse(await request.json());if(!parsed.success)throw new BusinessError('Choose customer or vendor and enter your name.');await recordsDb().prepare('INSERT INTO members(id,email,name,role,created) VALUES (?,?,?,?,?)').bind(user.userId,user.email,parsed.data.name,parsed.data.role,new Date().toISOString()).run();return Response.json({ok:true},{status:201});}catch(e){return apiError(e)}}
