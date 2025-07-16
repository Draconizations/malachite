# Passage Directive
Embeds one passage directly into another. Input must resolve to a valid passage name.

Embedded passages can read data from its parents, enabling widget-like functionality. It is also possible to directly embed html contents into the passage using `x-contents`.

## `x-passage="passage name"`
You can pass any expression that evaluates to a valid passage name.
```html
<div x-passage="'The Feast'">
</div>
```
This will embed a passage with the name "The Feast".

Here is another example that embeds a passage with the name "Another Passage".
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
We can re-use this passage inside another by using `x-passage`. Using `x-data` we can set the variables used.
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
We can also pass HTML children into a designated container inside the source passage, by using `x-contents` on the container.

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