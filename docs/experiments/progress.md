---
title: "Progress"
description: "Micro component to display the process of a task."
---

:::warning title="Experimental element"
This is an experimental work in progress. There are some features that may not work properly in all browsers.
:::


Create a `<div>` element with the `siimple-progress` class. To set the width of the completed bar, add a `<span>` child and change the CSS width property (from 0% to 100%).

```html preview="true"
<div class="siimple-progress siimple-progress--primary siimple--mb-0">
    <span style="width:75%;"></span>
</div>
```

You can also display a custom label in the bar adding it inside the <code class="siimple-code">span</code> element.

```html preview="true"
<div class="siimple-progress siimple-progress--primary">
    <span style="width:5%;">5% Completed</span>
</div>
<div class="siimple-progress siimple-progress--primary">
    <span style="width:15%;">15% Completed</span>
</div>
<div class="siimple-progress siimple-progress--primary siimple--mb-0">
    <span style="width:25%;">25% Completed</span>
</div>
```

:::info title="Displaying text in the progress bar"
Any truncated word inside the progress bar wont be displayed. Therefore, we recommend start the text with the percentage and then the extra text.
:::


#### Colored progress

You can change the color of the progress bar adding a class `siimple-progress--{color}`:

```html preview="true"
<div class="siimple-progress siimple-progress--primary">
    <span style="width:25%;"></span>
</div>
<div class="siimple-progress siimple-progress--success">
    <span style="width:50%;"></span>
</div>
<div class="siimple-progress siimple-progress--warning">
    <span style="width:75%;"></span>
</div>
<div class="siimple-progress siimple-progress--error siimple--mb-0">
    <span style="width:100%;"></span>
</div>
```


#### Striped progress

You can display a progress animation adding a `siimple-progress--striped` class to the parent progress element:

```html preview="true"
<div class="siimple-progress siimple-progress--primary siimple-progress--striped" style="margin-bottom:0px!important;">
    <span style="width:50%;"></span>
</div>
```

You can modify the velocity of the animation adding instead the `siimple-progress--striped-slow` or the `siimple-progress--striped-fast` class:

```html preview="true"
<div class="siimple-progress siimple-progress--primary siimple-progress--striped-slow">
    <span style="width:90%;">Slow animation</span>
</div>
<div class="siimple-progress siimple-progress--primary siimple-progress--striped">
    <span style="width:90%;">Normal animation</span>
</div>
<div class="siimple-progress siimple-progress--primary siimple-progress--striped-fast siimple--mb-0">
    <span style="width:90%;">Fast animation</span>
</div>
```


#### Animated progress with JavaScript

You can use **JavaScript** to update the progress bar width.

```html preview="true"
<div class="siimple-progress siimple-progress--primary siimple-progress--striped">
    <span id="progress" style="width:50%;">50%</span>
</div>
<div align="center">
    <div class="siimple-btn siimple-btn--primary siimple-btn--small" id="progress-0">0%</div>
    <div class="siimple-btn siimple-btn--primary siimple-btn--small" id="progress-25">25%</div>
    <div class="siimple-btn siimple-btn--primary siimple-btn--small" id="progress-50">50%</div>
    <div class="siimple-btn siimple-btn--primary siimple-btn--small" id="progress-75">75%</div>
    <div class="siimple-btn siimple-btn--primary siimple-btn--small" id="progress-100">100%</div>
</div>
<script type="text/javascript">
    let updateProgress = function (value) {
        let progressElement = document.getElementById("progress");
        progressElement.style.width = value;
        progressElement.textContent = value;
    };
    document.getElementById("progress-0").addEventListener("click", function () {
        return updateProgress("0%");
    });
    document.getElementById("progress-25").addEventListener("click", function () {
        return updateProgress("25%");
    });
    document.getElementById("progress-50").addEventListener("click", function () {
        return updateProgress("50%");
    });
    document.getElementById("progress-75").addEventListener("click", function () {
        return updateProgress("75%");
    });
    document.getElementById("progress-100").addEventListener("click", function () {
        return updateProgress("100%");
    });
</script>
```

