# About Malachite
This page contains some general information about Malachite (as a story format).

## Why Malachite?
There are plenty of official, well-documented story formats for twine/twee. I would not recommend developing a project with Malachite unless you have ran into multiple of the same pain points as I have:

* Your project requires a **Complex UI** with multiple separate passages displayed at the same time, each with a separate history.

    Most twine story formats are built on the assumption that only a single passage will be visible on the screen at any given time. While most formats do have functionality for embedding other passages inside that main passage, Malachite allows for multiple "windows" (AKA frames) to be present, each with a separate history.

* You are **familiar with** HTML *and* javascript and find **most abstractions** away from this **annoying to work with**.

    Malachite is very light on the markup and heavy on the javascript. Most of Malachite's interactivity is built on top of [AlpineJs](https://alpinejs.dev/), a lightweight javascript framework that already has functionality like conditionals and looping built in.

    Please check out *at least* the first few pages of [Alpine's documentation](https://alpinejs.dev/start-here), it will help you understand Malachite as well.

* Your project requires a good amount of **reactivity with minimum hassle**.

    TBA later. Tl;dr Alpine includes reactivity out of the box. Update a variable and it instantly ripples through the entire UI.

* You need **more functionality** than a **minimal story format** out of the box.

    Malchite is not (or at least, won't be) a *minimal* story format. There will be helper utilities and APIs for things commonly utilized in Interactive Fiction. Examples include crossfading, playing audio and storylets/quality based narratives.

Even then, Malachite is still in heavy development and very unstable, not to mention (mostly) undocumented. Please do not expect this story format to be production ready in any reasonable timeframe, as this is a hobby project of a single developer right now.

## Why shouldn't I use Malachite?
I highly suggest you do not use this story format in its current state.

There's a couple of reasons, the most important ones being...

1. Malachite is **not** production ready. It will not be for a long time.
2. In addition, prior to v1.0, I will not be providing community support for it. You are on your own.
3. Malachite is currently heavily undocumented, though (as you can see), efforts are underway to change this.

There are also some other major dealbreakers.

1. This format is currently only being tested with twee/tweego. Not Twine or any other twee compilers.
2. There is also no syntax highlighting for either twine or twee/tweego.
3. This format is fairly advanced. Common twine concepts are often handled differently.

TBA later.