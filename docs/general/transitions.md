# Passage Transitions
Malachite has built in support for transitioning between passages. By default, passages inside a frame will fade in and out. Transitions are further customizable using CSS.

!!! Danger "WIP"
    There's actually no default CSS that comes with Malachite yet, so passages *do not* fade in and out by default, *yet*. It will in the near future.

## Anatomy Of A Transition
When an element transitions (i.e. a frame, or when using `x-fade` or `x-reveal`), a couple of things happen during the duration of the transition.

- the element gets the css classes `.fadeout` and `.fadein` assigned to it, depending on what state the element is transitioning to.
- the element dispatches the following events: `fadestart`, `fade` and `fadeend`.

The transition duration of the element is determined by the `transition-duration` of the element's CSS.

These events happen in the following order.

<!-- TODO: make a diagram for this? -->
1. Apply the `.fadestart` class
2. Emit the `fadestart` event.
3. Wait for `transition-duration` to pass by
4. Remove the `.fadestart` class and apply the `.fadeend` class
5. Emit the `fade` event.
6. Wait for `transition-duration` to pass by
7. Remove the `.fadeend`class
8. Emit the `fadeend` event.

The length of the `transition-duration` is determined right at step 3. and 6. Which means by applying styles to `.fadestart` and `.fadeend`, you can alter the transition behavior.

## Example CSS Styling
This will create a fade transition for every `div` element. Replace `div` with the selector you need.

```css
div {
  transition: opacity 0.3s;
}

div.fadestart {
  opacity: 0;
  transition-timing-function: ease-in;
}

div.fadeend {
  transition-timing-function: ease-out;
}
```
This will produce the same default fade effect that is included with Malachite.