import EventDesk from '../event-desk';
import {actor} from '../../lib/account';
import {requireChatGPTUser} from '../chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Pilot(){await requireChatGPTUser('/pilot');const a=await actor();if(a.role!=='admin')return <main>Administrator access required.</main>;return <EventDesk/>}
