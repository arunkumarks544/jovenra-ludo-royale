export const PATH = [
 [6,1],[6,0],[7,0],[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[9,6],[10,6],[11,6],[12,6],
 [13,6],[14,6],[14,7],[14,8],[13,8],[12,8],[11,8],[10,8],[9,8],[8,9],[8,10],[8,11],[8,12],
 [8,13],[8,14],[7,14],[6,14],[6,13],[6,12],[6,11],[6,10],[6,9],[5,8],[4,8],[3,8],[2,8],
 [1,8],[0,8],[0,7],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2]
];
export const COLORS = ['red','green','yellow','blue'];
export const START_INDEX = [0,39,26,13];
export const SAFE = new Set([0,8,13,21,26,34,39,47]);
export const HOMES = [
 [[7,1],[7,2],[7,3],[7,4],[7,5]],
 [[1,7],[2,7],[3,7],[4,7],[5,7]],
 [[7,13],[7,12],[7,11],[7,10],[7,9]],
 [[13,7],[12,7],[11,7],[10,7],[9,7]]
];
export const BASES = [
 [[2,2],[2,4],[4,2],[4,4]],
 [[2,10],[2,12],[4,10],[4,12]],
 [[10,10],[10,12],[12,10],[12,12]],
 [[10,2],[10,4],[12,2],[12,4]]
];
export function location(player, progress, tokenIndex) {
 if (progress === -1) return BASES[player][tokenIndex];
 if (progress === 56) return [7,7];
 if (progress >= 51) return HOMES[player][progress - 51];
 return PATH[(START_INDEX[player] + progress) % 52];
}
export function newGame(types = ['off','bot','off','human']) {
 return {types, tokens: Array.from({length:4},()=>[-1,-1,-1,-1]), current:types.indexOf('human')>=0?types.indexOf('human'):types.findIndex(t=>t!=='off'), dice:null, phase:'roll', sixes:0, winner:null, placements:[], lastEvent:'Roll the dice to begin!', history:[], turn:1};
}
export function activePlayers(g){return g.types.map((t,i)=>t==='off'?-1:i).filter(i=>i>=0);}
export function legalMoves(g, player=g.current, die=g.dice){
 if(!die || g.types[player]==='off') return [];
 return g.tokens[player].flatMap((progress,i)=> progress===56 || (progress===-1 && die!==6) || (progress>=0 && progress+die>56) ? [] : [i]);
}
export function resolveMove(g, tokenIndex){
 const player=g.current;
 if(g.phase!=='move'||!legalMoves(g).includes(tokenIndex)||g.winner!==null) return g;
 const next=structuredClone(g), was=next.tokens[player][tokenIndex];
 const dest=was===-1?0:was+next.dice;
 next.tokens[player][tokenIndex]=dest;
 let capture=false;
 if(dest<51){
   const index=(START_INDEX[player]+dest)%52;
   if(!SAFE.has(index)) for(let p=0;p<4;p++) if(p!==player){
     for(let t=0;t<4;t++) if(next.tokens[p][t]>=0 && next.tokens[p][t]<51 && (START_INDEX[p]+next.tokens[p][t])%52===index){next.tokens[p][t]=-1;capture=true;}
   }
 }
 const finished=dest===56;
 const allFinished=next.tokens[player].every(v=>v===56);
 if(allFinished){next.placements.push(player);if(next.winner===null) next.winner=player;}
 next.lastEvent=allFinished ? `${label(player)} wins the match!` : capture ? `${label(player)} captured a token!` : finished ? `${label(player)} brought a token home!` : was===-1 ? `${label(player)} entered the board!` : `${label(player)} moved ${next.dice} spaces`;
 next.history=[next.lastEvent,...next.history].slice(0,7);
 const extra=next.dice===6||capture||finished;
 next.dice=null;next.phase=next.winner===null?'roll':'finished';
 if(!extra && next.winner===null) advance(next);
 return next;
}
export function roll(g, value){
 if(g.phase!=='roll'||g.winner!==null)return g;
 const next=structuredClone(g);
 next.dice=value;
 next.sixes=value===6?next.sixes+1:0;
 if(next.sixes===3){next.lastEvent='Three sixes! Turn forfeited.';next.history=[next.lastEvent,...next.history].slice(0,7);next.dice=null;advance(next);return next;}
 const legal=legalMoves(next);
 if(!legal.length){next.lastEvent=`${label(next.current)} rolled ${value} — no legal moves`;next.history=[next.lastEvent,...next.history].slice(0,7);next.dice=null;advance(next);}
 else {next.phase='move';next.lastEvent=`${label(next.current)} rolled ${value}. Choose a token.`;}
 return next;
}
function advance(g){const players=activePlayers(g),position=players.indexOf(g.current);g.current=players[(position+1)%players.length];g.sixes=0;g.phase='roll';g.turn++;}
export function label(i){return COLORS[i][0].toUpperCase()+COLORS[i].slice(1);}
export function chooseBotMove(g){
 const legal=legalMoves(g);if(!legal.length)return null;
 return legal.map(i=>{
   const prev=g.tokens[g.current][i],dest=prev===-1?0:prev+g.dice;
   let score=prev===-1?35:dest===56?180:dest>50?85+dest:dest;
   if(dest<51){const path=(START_INDEX[g.current]+dest)%52;
     if(!SAFE.has(path) && g.tokens.some((arr,p)=>p!==g.current&&arr.some(v=>v>=0&&v<51&&(START_INDEX[p]+v)%52===path)))score+=150;
   }
   return {i,score:score+Math.random()*9};
 }).sort((a,b)=>b.score-a.score)[0].i;
}
export function validConfig(types){return types.filter(t=>t!=='off').length>=2 && types.includes('human');}
