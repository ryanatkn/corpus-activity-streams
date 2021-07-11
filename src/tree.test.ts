import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {toToDeterministicId, toToId} from 'src/tree.js';

/* test_toToId */
const test_toToId = suite('toToId');

test_toToId('basic behaior', () => {
	const toIdA = toToId();
	const idA1 = toIdA();
	const idA2 = toIdA();
	const toIdB = toToId();
	const idB1 = toIdB();
	const idB2 = toIdB();
	t.is.not(idA1, idA2);
	t.is.not(idA1, idB1);
	t.is.not(idA1, idB2);
	t.is.not(idA2, idB1);
	t.is.not(idA2, idB2);
	t.is.not(idB1, idB2);
});

test_toToId.run();
/* /test_toToId */

/* test_toToDeterministicId */
const test_toToDeterministicId = suite('toToDeterministicId');

test_toToDeterministicId('basic behaior', () => {
	const toIdA = toToDeterministicId();
	const idA1 = toIdA();
	const idA2 = toIdA();
	const toIdB = toToDeterministicId();
	const idB1 = toIdB();
	const idB2 = toIdB();
	t.is.not(idA1, idA2);
	t.is.not(idB1, idB2);
	t.is(idA1, idB1);
	t.is(idA2, idB2);
});

test_toToDeterministicId.run();
/* /test_toToDeterministicId */
