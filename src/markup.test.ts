import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {toToId} from './markup.js';

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
