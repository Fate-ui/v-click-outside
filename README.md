
# v3-click-outside

> Vue3 directive to react on clicks outside an element. Its simple to use. And can Customizable boundary elements.

## Install

```bash
npm install --save v3-click-outside
```


## Use

```js
import { createApp } from 'vue'
import App from './App.vue'
import clickOutside from 'v3-click-outside'

const app = createApp(App)
app.use(clickOutside)
```

#### 1. If boundary element is the document.
just pass a function to the directive. The function will accept a parameter which indicates is the click is outside or not.

```js
<template>
  <div v-click-outside="handleClickOustside"><div>
</template>

<script setup>
  //the function accept a booleam parameter, true indicate click outside
  const handleClickOustside = (isOutside) => {
    if (isOutaide) //doSomeing
    else //doSomeing else
  }
</script>
```

#### 2. you can also define the boundary element that you want.
In this case, you need pass an array which has two parameters. One is a function like above, and another is a CSS selector that will be the boundary element. The order of the arguments does not matter.

```js
<template>
  <div class="outer">
    <div class="inner" v-click-outside="[handleClickOustside, '.outer']"></div>
  </div>
</template>

<script setup>
  //the function accept a booleam parameter, true indicate click outside
  const handleClickOustside = (isOutside) => {
    if (isOutaide) //doSomeing
    else //doSomeing else
  }
</script>
```


## License

[MIT](http://opensource.org/licenses/MIT)