# Frame Directive
Creates a [Frame](../general/frames) and initializes the contents with the passage specified.

## `x-frame="passage name"`
Like the [passage directive](./x-passage), you can pass anything that resolves to a valid passage name.
```html
<div x-frame="'passage name'">
</div>
```
The passage passed to `x-frame` will be rendered on frame initialization, unless another passage is already pressent in the [State](../general/state)

!!! Warning "Tip"
    Frames get initialized per element, *not* per name. Meaning each time an element with `x-frame` appears on the screen, that element will be initialized. In the future, it will be possible to configure default behavior per-name using the [Config API](../api/config).

## `x-frame:name="passage name"`
All `x-frame` directives reference the [unnamed frame](../general/frames#unnamed-frame) by default. To use a different frame, you can specify a name by adding a colon and the name of the frame.
```html
<div x-frame:menu="'Inventory Menu'">
</div>
```
This assigns the parent div to a frame called "menu".

## Modifiers
The following modifiers are available for `x-frame`.

### `.overwrite`
**Usage:** `x-frame:name.overwrite="passage name"`

Makes the default passage *always* render upon frame initialization, ignoring any current state.