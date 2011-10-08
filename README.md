# Buffet

Yet another basic jQuery carousel plugin. 

See it in action over here, [keighl.github.com/buffet](http://keighl.github.com/buffet)

## Usage

### Javascript

```js
$('#scroll').buffet({
  scroll_by : 3,
  next      : $('#next'),
  prev      : $('#prev')
});
```

### HTML

```html
<div id="scroll_mask">
  <ul id="scroll">
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
    <li>..</li>
  </ul>
</div>
<a id="prev"></a>
<a id="next"></a>
```
### CSS

```css
#scroll_mask {
  position:relative;
  overflow:hidden;
  width:620px;
  height:140px;
  margin:0 auto;
}

ul#scroll {
  margin:0;
  padding:0;
  position:absolute;
  width:9999em;
  height:140px;
  list-style-type:none;

}

ul#scroll li {
  float:left;
  width:140px;
  height:140px;
  margin:0 20px 0 0;
  background-color:pink;
}

a.inactive {
  display:none;
}
```

## Options

* `scroll_by`     - `3`
* `speed`         - `400`
* `easing`        - `"linear"`
* `next`          - `null`
* `prev`          - `null`
* `wrapper`       - `$(this).parent()`
* `children`      - `$(this).children()`
* `trim`          - `0` - the `margin-right` value on the last child element. Buffet will try to figure this out for you, but if you know the value, list is here

## TODO

* Before/After callbacks
* Recalculate on wrapper changes (responsive)
* Infinite scrolling
* Start right aligned (basically backwards)



                  