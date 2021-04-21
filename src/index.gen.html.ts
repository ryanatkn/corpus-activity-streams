import type {Gen} from '@feltcoop/gro';
import {renderNoscriptSection, renderMetaTags} from '@feltcoop/gro/dist/gen/helpers/html.js';

export const gen: Gen = () => {
	const title = 'corpus-activity-streams';
	const sourceCodeUrl = 'https://github.com/ryanatkn/corpus-activity-streams';
	// TODO get the `sourceCodeUrl` from gen context param?
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<title>${title}</title>
		${renderMetaTags()}
		<link rel="stylesheet" href="bundle.svelte.css" />
	</head>

	<body>
		<div id="root">
			${renderNoscriptSection(sourceCodeUrl)}
		</div>
		<script src="index.js" type="module"></script>
	</body>
</html>
`;
};
