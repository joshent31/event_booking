import { z } from 'zod';
const short=z.string().trim().min(1).max(500),amount=z.coerce.number().finite().positive().max(100000000),day=z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const schemas:Record<string,z.ZodTypeAny>={
 event:z.object({name:short,phone:z.string().regex(/^\+?[\d\s()-]{7,20}$/,'Enter a valid phone number'),type:short,date:day.refine(v=>v>=new Date().toISOString().slice(0,10),'Choose today or a future date'),city:short,guests:z.coerce.number().int().min(1).max(100000),budget:amount,services:z.array(z.enum(['Catering','Photography','Decoration','Venue','Entertainment','Other'])).min(1)}),
 vendor:z.object({name:short,phone:z.string().regex(/^\+?[\d\s()-]{7,20}$/,'Enter a valid phone number'),email:z.string().email(),category:z.enum(['Catering','Photography','Decoration','Venue','Entertainment','Other']),city:short,portfolio:z.union([z.string().url().refine(v=>/^https?:\/\//.test(v)),z.literal('')]).optional()}),
 quote:z.object({event:short,vendor:short,amount,advance:z.coerce.number().min(0).max(100),scope:short,exclusions:z.string().max(500).optional()}),
 package:z.object({event:short,name:z.enum(['Essential','Signature','Premium']),fee:z.coerce.number().min(0).max(100),quoteIds:z.array(short).min(1).max(100)}),
 adjustment:z.object({quote:short,amount,reason:short,evidence:short}),
 task:z.object({event:short,name:short,assignee:short,due:day})
};
