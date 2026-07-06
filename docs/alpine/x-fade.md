# Fade Directive


## `x-fade="expression"`
Makes the element play a [transition](../general/transitions) when its expression is re-evaluated.

If any reactive variables are referenced in the `x-fade` expression, it will re-evaluate when any of those variables are updated. This causes the element to play a transition.

### Element Contents
`x-fade` *starts* playing the transition when the expression is re-evaluated. If one of the values of the expression is displayed inside the element, it will visibly change before the transition can complete.

To prevent this, change the displayed content in response to the `fade` event. For example, a simple text display:
```hmtl
<h2
  x-fade="$s.title"
  @fade="$el.innerText = $s.title"
  x-init="$el.innerText = $s.title">
</h2>
```
A workaround for this in the form of a modifier will be added in the future.

## Modifiers
The following modifiers are available for the `x-fade` directive.

### `!class`
Prevents the default transition classes (`.fadestart`, `fadeend`) from being applied to the element. This is useful if you want to use the transition events to apply custom transition handling.