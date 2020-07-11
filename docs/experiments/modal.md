---
title: "Modal"
description: "A light dialog component to display your custom content."
---

:::warning title="Experimental element"
This is an experimental work in progress. There are some features that may not work properly in all browsers.
:::

The **modal** component needs an element with the `siimple-modal` class and a container element with a `siimple-modal-container` class where all partials of the modal may be placed.

```html preview="true"
<div class="siimple-modal siimple-modal--medium" id="modal" style="display:none;">
    <div class="siimple-modal-content">
        <div class="siimple-modal-header">
            <div class="siimple-modal-header-title">Modal title</div>
            <div class="siimple-modal-header-close" id="modal-close"></div>
        </div>
        <div class="siimple-modal-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus. 
            Duis quis sodales risus. Etiam euismod ornare consequat.
        </div>
        <div class="siimple-modal-footer">
            Modal footer
        </div>
    </div>
</div>
<div class="siimple-btn siimple-btn--primary" id="modal-open">Open modal</div>
<script>
    document.getElementById("modal-open").addEventListener("click", function () {
        document.getElementById("modal").style.display = "";
    });
    document.getElementById("modal-close").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none";
    });
</script>
```

:::warning title="No JavaScript included"
**siimple** does **not** include JavaScript code, so you will have to implement the class toggle by yourself (you can copy the `<script>` section provided in the modal example code).
:::


#### Modal header

Add an element with the class `siimple-modal-header` to display the header of the modal. The modal header can contain the following childs:

- `siimple-header-title`: use it to display the title of the modal.
- `siimple-header-close`: will display a cross in the top right corner of the modal.


#### Modal body

Add an element with the class `siimple-modal-body` to display a container where you can put the content of your modal.


#### Modal footer

Add an element with the class `siimple-modal-footer` to display a container where you can put the footer of the modal.


#### Modal sizes

You can modify the size of the modal adding a class `siimple-modal--{size}` to the parent modal container, where `size` is one of the following values:

- `small`: will set the modal width to `600px`.
- `medium`: will set the modal width to `768px`.
- `large`: will set the modal width to `960px`.

```html
<div class="siimple-modal siimple-modal--small">
    ...
</div>
```


