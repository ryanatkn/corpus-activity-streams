import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {to_to_deterministic_id, to_to_id} from '$lib/tree';

/* test_to_to_id */
const test_to_to_id = suite('to_to_id');

test_to_to_id('basic behaior', () => {
	const to_id_a = to_to_id();
	const id_a1 = to_id_a();
	const id_a2 = to_id_a();
	const to_id_b = to_to_id();
	const id_b1 = to_id_b();
	const id_b2 = to_id_b();
	t.is.not(id_a1, id_a2);
	t.is.not(id_a1, id_b1);
	t.is.not(id_a1, id_b2);
	t.is.not(id_a2, id_b1);
	t.is.not(id_a2, id_b2);
	t.is.not(id_b1, id_b2);
});

test_to_to_id.run();
/* test_to_to_id */

/* test_to_to_deterministic_id */
const test_to_to_deterministic_id = suite('to_to_deterministic_id');

test_to_to_deterministic_id('basic behaior', () => {
	const to_id_a = to_to_deterministic_id();
	const id_a1 = to_id_a();
	const id_a2 = to_id_a();
	const to_id_b = to_to_deterministic_id();
	const id_b1 = to_id_b();
	const id_b2 = to_id_b();
	t.is.not(id_a1, id_a2);
	t.is.not(id_b1, id_b2);
	t.is(id_a1, id_b1);
	t.is(id_a2, id_b2);
});

test_to_to_deterministic_id.run();
/* test_to_to_deterministic_id */
