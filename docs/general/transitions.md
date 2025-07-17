# Passage Transitions
Malachite has built in support for transitioning between passages. By default, passages inside a frame will fade in and out. Transitions are further customizable using CSS.

!!! Danger "WIP"
    There's actually no default CSS that comes with Malachite yet, so passages *do not* fade in and out by default, *yet*. It will in the near future.

## Anatomy Of A Transition
When an element starts the transition (i.e. a frame, or when using `x-fade` or `x-reveal`), duration of the transition is determined by the CSS `transition-duration` property of the element. This property gets checked again at the peak of the transition.

During a transition, the following things happen:

<!-- TODO: make a diagram for this? -->
1. Apply the `.fadestart` class
2. Emit the `fadestart` event.
3. Wait for `transition-duration` to pass by
4. Remove the `.fadestart` class and apply the `.fadeend` class
5. Emit the `fade` event.
6. Wait for `transition-duration` to pass by
7. Remove the `.fadeend`class
8. Emit the `fadeend` event.

The `transition-duration` is checked at step 3. and 6. Which means by applying styles to `.fadestart` and `.fadeend`, you can alter the transition behavior.

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
This creates a transition that in total takes 0.6s to complete, with the element fading to 0% opacity using `ease-in` timing, then fading back in using `ease-out`.

This is the same default fade effect that is included with Malachite.
