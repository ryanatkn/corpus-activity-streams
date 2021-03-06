import type {Gen} from '@feltcoop/gro';
import {render_noscript_section, render_meta_tags} from '@feltcoop/gro/dist/gen/helpers/html.js';

export const gen: Gen = () => {
	const title = 'corpus-activity-streams';
	const source_code_url = 'https://github.com/ryanatkn/corpus-activity-streams';
	// TODO get the `source_code_url` from gen context param?
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<title>${title}</title>
		${render_meta_tags()}
		<link rel="shortcut icon" href="favicon.png" />
		<link rel="stylesheet" href="bundle.svelte.css" />
		<link rel="stylesheet" href="style.css" />
	</head>

	<body>
		<div id="root">
			${render_noscript_section(source_code_url)}
		</div>
		<script src="index.js" type="module"></script>
	</body>
</html>
`;
};
