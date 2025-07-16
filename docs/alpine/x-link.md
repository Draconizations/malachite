# Link Directive
Swaps the target frame to the passage specified, through altering the frame's state.

## Link Markup
Standard Twine [Link Markup](../general/markup#link-markup) gets transformed into an `x-link` directive under the hood. I.e. `[[Go into the dark->The Dark][quest]]` will be rendered as the following:
```html
<button x-link:quest="'The Dark'">Go into the dark</button>
```
Using `x-link` directly offers you the ability to style and customize the link however you want, at the cost of syntax convenience.

## `x-link="passage name"`
You can pass anything that resolves to a valid passage name.
```html
<button x-link="'Next Up">Go to the next passage!</button>
```
Like the [frame directive](./x-frame), links target the [unnamed frame](../general/frames#unnamed-frame) by default.

!!! Warning "Tip"
    It is advised to use `x-link` on exclusively button elements. It is the easiest way to keep accessibility features (keyboard navigation, etc) functioning as they should.

## `x-link:frame="passage name"`
To target another frame, add a colon and the name of the frame.
```html
<button x-link:menu="'Quest Menu'">Open Quest Log</button>
```
This will target any frames named "menu".

## Modifiers
The following modifiers are available for the `x-link` directive.

### `.!play`
**Usage:** `x-link.!play="passage name"`

Prevents the new state from being pushed to the history.

### `.!fade`
**Usage:** `x-link.!fade="passage name"`

Prevents the target frame from fading in and out when the link is clicked.