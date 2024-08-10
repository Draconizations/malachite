import { rollup, type OutputOptions, type RollupOptions } from "rollup"
import swc from "@rollup/plugin-swc"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import polyfill from "rollup-plugin-polyfill-node"
import { render } from "nunjucks"

async function bundle() {
  // we want to bundle each config separately
  for (let o of options) {
    console.log(`Bundling ${o.output.file ? `to ${o.output.file}` : "file"} using rollup...`)

    let bundle
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

    console.log(`Successfully bundled ${o.output.file ? `to ${o.output.file}` : "file"}!`)
  }
}

async function build() {
  // get the story json file and read it as json
  const storyJson = await Bun.file("./story.json").json()
  // also get the *minified* bundle file
  const bundle = await Bun.file("./build/bundle.min.js").text()

  // the base HTML file is a nunjuck template, so we render it
  const source = render("src/templates/document.njk", {
    bundle,
  })

  // embed the source into the story json
  const story = { ...storyJson, source }

  // create the format string
  let format = `window.storyFormat(${JSON.stringify(story)});`

  // and write that to the dist directory!
  const formatFile = Bun.file("./dist/format.js")
  await Bun.write(formatFile, format)
}

const input = "./src/index.ts"
const sharedPlugins = [
  resolve(),
  commonjs(),
  polyfill(),
  swc({
    swc: {
      jsc: {
        target: "es5",
      },
    },
  }),
]

const options: (RollupOptions & { output: OutputOptions })[] = [
  {
    input,

    output: {
      file: "./build/bundle.min.js",
      format: "iife",
    },

    plugins: [...sharedPlugins, terser()],
  },
  {
    input,

    output: {
      file: "./build/bundle.js",
      format: "iife",
    },

    plugins: sharedPlugins,
  },
]

// bundle the format javascript to a singular file
await bundle()
// then embed that into the story format
await build()
