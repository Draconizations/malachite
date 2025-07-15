import _commonjs from "@rollup/plugin-commonjs"
import _json from "@rollup/plugin-json"
import _resolve from "@rollup/plugin-node-resolve"
import _swc from "@rollup/plugin-swc"
import _terser from "@rollup/plugin-terser"
import { type OutputOptions, type RollupBuild, type RollupOptions, rollup } from "rollup"
import _polyfill from "rollup-plugin-polyfill-node"
import { parseArgs } from "util"

// typescript shenanigans...
const swc = _swc as unknown as typeof _swc.default
const commonjs = _commonjs as unknown as typeof _commonjs.default
const resolve = _resolve as unknown as typeof _resolve.default
const terser = _terser as unknown as typeof _terser.default
const polyfill = _polyfill as unknown as typeof _polyfill.default
const json = _json as unknown as typeof _json.default

const { values, positionals } = parseArgs({
	args: Bun.argv,
	options: {
		full: {
			type: "boolean",
		},
	},
	strict: true,
	allowPositionals: true,
})

const dist = positionals.length > 2 ? positionals[3] : "./build"
const full = values.full

const pck = await Bun.file("./package.json").json()
const version = pck.version

async function bundle(o: RollupOptions & { output: OutputOptions }) {
	// we want to bundle each config separately
	console.log(`Bundling ${o.output.file ? `to ${o.output.file}` : "file"}...`)

	let bundle: RollupBuild | undefined
	let failed = false
	try {
		// TODO: better logging here
		bundle = await rollup(o)

		await bundle.write(o.output)
	} catch (e) {
		failed = true
		console.error(e)
	}

	if (bundle) await bundle.close()

	// don't continue the build process if rollup failecd
	if (failed) process.exit(1)

	console.log(`Successfully bundled ${o.output.file ? `to ${o.output.file}` : "file"}!\n`)
}

async function build(input: string, output: string) {
	console.log(`Building to ${dist}/${output} using ${dist}/${input}...`)

	// get the story json file and read it as json
	const storyJson = await Bun.file("./story.json").json()
	storyJson.version = version
	// also get the bundle file
	const bundle = await Bun.file(`${dist}/${input}`).text()

	// put the bundle inside the HTML template
	const source = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <title>{{STORY_NAME}}</title>
  </head>
  <body>
		<div id="mala-viewport"></div>
    {{STORY_DATA}}
    <script title="malachite">
      ${bundle}
    </script>
  </body>
</html>`

	// embed the source into the story json
	const story = { ...storyJson, source }

	// create the format string
	const format = `window.storyFormat(${JSON.stringify(story)});`

	// and write that to the dist directory!
	const formatFile = Bun.file(`${dist}/${output}`)
	await Bun.write(formatFile, format)

	console.log(`Sucessfully built ${dist}/${output}!\n`)
}

const input = "./src/malachite.ts"
const sharedPlugins = [json(), resolve(), commonjs(), polyfill(), swc()]

const options: (RollupOptions & { output: OutputOptions })[] = [
	{
		input,

		output: {
			file: `${dist}/bundle.min.js`,
			format: "iife",
		},

		plugins: [...sharedPlugins, terser()],
	},
	{
		input,

		output: {
			file: `${dist}/bundle.js`,
			format: "iife",
		},

		plugins: [...sharedPlugins, ...(!full ? [terser()] : [])],
	},
]

// bundle the format javascript to a singular file
await bundle(options[1])
if (full) await bundle(options[0])
// then embed that into the story format
await build("bundle.js", "format.js")
if (full) await build("bundle.min.js", "format.min.js")

console.log("Done.")
