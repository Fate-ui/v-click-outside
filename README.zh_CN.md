# v3-click-outside

**中文** | [English](./README.md)
> 一个简单易用且可以自定义边界元素的vue3指令。

## 安装


```bash
npm install --save v3-click-outside
```


## 使用

```js
import { createApp } from 'vue'
import App from './App.vue'
import clickOutside from 'v3-click-outside'

const app = createApp(App)
app.use(clickOutside)
```

#### 1. 默认`document`为边界元素
您只需给指令要传入一个函数，函数接收两个参数:一个是布尔类型的参数，表示是否点击了外部，另一个是事件对象。
```js
<template>
  <div v-click-outside="handleClickOustside"></div>
</template>

<script setup>
  //the function accept a booleam parameter, true indicate click outside
  const handleClickOustside = (isOutside, e) => {
    if (isOutside) //do something
    else //do something else
  }
</script>
```

#### 2. 自定义边界元素
此时，将处理函数和边界元素放在一个数组里传给指令即可。边界元素可以为CSS选择器，也可以是一个DOM元素。函数和边界元素在数组内的位置没有要求。
```js
<template>
  <div class="outer">
    <div class="inner" v-click-outside="[handleClickOustside, '.outer']"></div>
  </div>
</template>

<script setup>
  //the function accept a booleam parameter, true indicate click outside
  const handleClickOustside = (isOutside, e) => {
    if (isOutside) //do something
    else //do something else
  }
</script>
```


## License

[MIT](http://opensource.org/licenses/MIT)
