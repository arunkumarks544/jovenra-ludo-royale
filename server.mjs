import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
createServer(async(req,res)=>{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\\/+/, '')||'source.html';const file=path.resolve(root,p);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{const st=await stat(file);if(!st.isFile())throw Error('not a file');const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(bytes)}catch{res.writeHead(404).end('Not found')}}).listen(Number(process.env.PORT||8080),'0.0.0.0',()=>console.log('Local Jovenra Ludo dev server: http://localhost:8080'));
