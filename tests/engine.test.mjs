import test from 'node:test';import assert from 'node:assert/strict';import {newGame,roll,resolveMove,legalMoves} from '../src/engine.js';
test('initial match has four pawns per side',()=>{const g=newGame(['off','bot','off','human']);assert.equal(g.tokens[3].length,4);assert.equal(g.current,3)});
test('six releases a pawn then grants another turn',()=>{let g=roll(newGame(['off','bot','off','human']),6);assert.equal(legalMoves(g).length,4);g=resolveMove(g,0);assert.equal(g.tokens[3][0],0);assert.equal(g.current,3)});
test('non-six does not release a pawn',()=>{const g=roll(newGame(['off','bot','off','human']),3);assert.equal(g.current,1)});
