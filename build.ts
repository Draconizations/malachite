import { readFileSync, writeFileSync } from "node:fs"
import { parseArgs } from "node:util"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import swc from "@rollup/plugin-swc"
import terser from "@rollup/plugin-terser"
import { type OutputOptions, type RollupBuild, type RollupOptions, rollup } from "rollup"
import polyfill from "rollup-plugin-polyfill-node"

const { values, positionals } = parseArgs({
	args: process.argv,
	options: {
		full: {
			type: "boolean",
		},
	},
	strict: true,
	allowPositionals: true,
})

const dist = positionals.length > 2 ? positionals[2] : "./build"
const full = values.full

const pkg = JSON.parse(readFileSync("./package.json", "utf8"))
const version = pkg.version

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

	// don't continue the build process if rollup failed
	if (failed) process.exit(1)

	console.log(`Successfully bundled ${o.output.file ? `to ${o.output.file}` : "file"}!\n`)
}

async function build(input: string, output: string) {
	console.log(`Building to ${dist}/${output} using ${dist}/${input}...`)

	// get the story json file and read it as json
	const storyJson = JSON.parse(readFileSync("./story.json", "utf8"))
	storyJson.version = version
	// also get the bundle file
	const bundle = readFileSync(`${dist}/${input}`, "utf8")

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
	writeFileSync(`${dist}/${output}`, format)

	console.log(`Sucessfully built ${dist}/${output}!\n`)
}

const input = "./src/malachite.ts"
const sharedPlugins = [
	json(),
	resolve(),
	commonjs(),
	polyfill(),
	swc(),
	replace({
		__VERSION__: JSON.stringify(version),
		preventAssignment: true,
	}),
]

const options: RollupOptions & { output: OutputOptions } = {
	input,

	output: {
		file: `${dist}/bundle${!full ? ".min" : ""}.js`,
		format: "iife",
	},

	plugins: [...sharedPlugins, ...(!full ? [terser()] : [])],
}

// bundle the format javascript to a singular file
await bundle(options)
if (full) await bundle(options)
// then embed that into the story format
await build("bundle.js", "format.js")
if (full) await build("bundle.min.js", "format.min.js")

console.log("Done.")
