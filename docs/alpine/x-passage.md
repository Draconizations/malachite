# `x-passage="passage name"` 
Embeds one passage directly into another. Input must resolve to a valid passage name.

Embedded passages can read data from its parents, enabling widget-like functionality. It is also possible to directly embed html contents into the passage using `x-contents`.

## Example Usage
!!! warning "Tip"
    The expression inside the double quotes **MUST** resolve to a string! When passing a simple passage name, a common mistake is to not include the 'single quotes' around the name.

Passing a passage name as a string
```html
<div x-passage="'passage name'">
```

Passing a variable that resolves to a passage name.
```html
<div x-data="{ title: 'Another Passage' }">
  <!-- resolves to "Another Passage" -->
  <div x-passage="title"></div>
</div>
```

### Passing Data
Say we have a passage as described here.
```html
:: Dialogue Box
<div>
  <b :style="{ color: nameColor }" >{{name}}</b>
  <p>{{dialogue}}</p>
</div>
```
We can re-use this passage inside another by using `x-passage`. In order to set each variable used here, we use `x-data`.
```html
<div
  x-passage="'Dialogue Box'"
  x-data="{
    name: 'Steve',
    dialogue: 'Hi there!',
    nameColor: 'red'
  }"
>
</div>
```
This will render as the following.
```html
<div>
  <b style="color: red;" >Steve</b>
  <p>Hi there!</p>
</div>
```

## `x-contents`
We can also pass HTML children to a designated area inside the source passage, using `x-contents` on the element that should contain the HTML.

Source passage:
```html
:: Dialogue Box
<div>
  <b :style="{ color: nameColor }" >{{name}}</b>
  <div x-contents></div>
</div>
```
Usage with `x-passage`:
```html
<div
  x-passage="'Dialogue Box'"
  x-data="{
    name: 'Steve',
    nameColor: 'red'
  }"
>
  <p>Hi there!</p>
  <p>The weather is great right now. Let's go for a walk.</p>
</div>
```
Renders as:
```html
<div>
  <b style="color: red;" >Steve</b>
  <div>
    <p>Hi there!</p>
    <p>The weather is great right now. Let's go for a walk.</p>
  </div>
</div>
```