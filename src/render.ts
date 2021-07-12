// TODO upstream helper
// TODO `Json` type instead of `any`

// Parsing JSON is significantly faster than parsing JS,
// so we use this helper to improve the perf of some generated files.
// https://v8.dev/blog/cost-of-javascript-2019#json
// https://v8.dev/features/subsume-json#embedding-json-parse
export const render_optimized_json = (data: any): string => {
	return `JSON.parse(${JSON.stringify(JSON.stringify(data))})`;
};
