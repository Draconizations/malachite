# Alpine Directives
The vast majority of rendering, interactivity and reactivity in Malachite is provided by [AlpineJs](https://alpinejs.dev/). If you haven't already, please do read their documentation. A lot of "undocumented" functionality (like conditionals, looping, etc) is actually part of AlpineJs.

A directive looks like (and is!) an attribute on any given HTML element.
```html
<div x-passage="'My Story'">
  <h3>Let me tell you my story...</h3>
  <div x-contents></div>
</div>
```
`x-passage` and `x-contents` are two directives that Malachite provides.

## Anatomy of a Directive
A full directive looks like this.
`x-directive:value.modifiers="expression"`

That might be a lot at once, so let's break it down.

### Name
`x-directive` is the actual directive name. `x-` is the prefix that all directives have (though some stock Alpine directives [do have shorthands](https://alpinejs.dev/directives/on#shorthand-syntax)). The "directive" part is replaced with the actual directive name (eg. `x-frame`,  `x-reveal`).

### Value
`:value`, starting with a colon, is used to pass a single string value. For instance, `x-link` and `x-frame` use this to specify the [target frame](../frames/#target-frame).

### Modifiers 
`.modifiers`, separated by a period, can be chained together to modify the directive's behavior. Malachite directives have a convention where modifiers prefixed with a `!` (i.e. `!play`) *disable* a default behavior, while modifiers without a `!` *enable* additional behaviors.

### Expression
Finally, `expression` is any valid javascript expression. Including ternaries, function calls, and everything else: `x-directive="shouldSayYes() ? 'yes' : 'no'"`.

!!! Warning "Tip"
    A lot of Malachite's built in directives expect the expression to evaluate to a *string*. This includes `x-passage`, `x-frame` and `x-link`, which take a passage name. Make sure you wrap your passage name in 'single quotes' *inside* the double quotes. I.e. `x-frame="'My Passage'"`.