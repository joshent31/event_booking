import {readFileSync,writeFileSync} from 'node:fs';
const [input,output]=process.argv.slice(2);
if(!input||!output)throw new Error('Usage: node scripts/prepare-restore.mjs backup.json restore.sql');
const backup=JSON.parse(readFileSync(input,'utf8'));
if(backup.format!=='josh-events-export'||backup.schemaVersion!==1||!Array.isArray(backup.items)||!Array.isArray(backup.members)||backup.members.length===0)throw new Error('A version 1 administrator business export is required.');
const quoted=v=>{if(typeof v!=='string')throw new Error('Invalid backup field');return "'"+v.replaceAll("'","''")+"'"};
const statements=['-- Restore missing records only. Review before execution; existing IDs remain unchanged.'];
for(const m of backup.members){if(!['admin','customer','vendor'].includes(m.role))throw new Error('Invalid account role');statements.push(`INSERT OR IGNORE INTO members(id,email,name,role,created) VALUES (${[m.id,m.email,m.name,m.role,backup.exportedAt].map(quoted).join(',')});`)}
const kinds=['event','vendor','quote','package','payment','task','issue','notification','audit','settings','support','deletion','availability'];
for(const r of backup.items){if(!kinds.includes(r.kind)||!r.data||typeof r.data!=='object')throw new Error('Invalid business record');statements.push(`INSERT OR IGNORE INTO business(id,kind,owner,event,status,payload,created,updated) VALUES (${[r.id,r.kind,r.owner,r.event,r.status,JSON.stringify(r.data),r.created,r.updated].map(quoted).join(',')});`)}
statements.push("UPDATE workspace_state SET revision=revision+1,token='' WHERE id='josh';");
writeFileSync(output,statements.join('\n')+'\n',{flag:'wx'});
console.log(`Prepared ${backup.items.length} business records and ${backup.members.length} accounts. No database was changed. Review the SQL and restore only into the same Site identity.`);
