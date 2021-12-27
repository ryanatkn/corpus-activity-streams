import {suite} from 'uvu';
import * as t from 'uvu/assert';

import activity_streams_json from './activity_streams.schema.json';

/* test_schemas */
const test_schemas = suite('schemas');

test_schemas('schema examples pass validation', () => {
	console.log('todo!', activity_streams_json);
	// TODO compile the schemas with ajv and test their examples
	t.ok(1);
});

test_schemas.run();
/* test_schemas */
