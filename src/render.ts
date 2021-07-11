// Parsing JSON is a lot faster than parsing JS,
// so we use this helper to improve the perf of some generated files.
// TODO upstream helper
export const to_embedded_json = (data: any): string => {
	return JSON.stringify(data);
	// const str = JSON.stringify(data).replace(/\'/g, "\\'");
	// return `JSON.parse('${str}')`;
};
