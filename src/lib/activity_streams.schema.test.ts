import {test, t} from '@feltcoop/gro';
import {readJsonSync} from '@feltcoop/gro/dist/fs/nodeFs.js';

const activity_streams_json = readJsonSync('./src/activity_streams.schema.json');

test('schema examples pass validation', () => {
	console.log('todo!', activity_streams_json);
	// TODO compile the schemas with ajv and test their examples
	t.ok(1);
});
