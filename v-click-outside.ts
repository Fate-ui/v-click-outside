
export default function useDirectives(app: any) {
  /*
   * 判断是否点击外部元素的指令
   * */
  app.directive('click-outside', {
    mounted(el, binding, vNode) {
      const value = binding.value
      let handleFn = value
      let selector
      if (Array.isArray(value)) {
        const fnIndex = value.findIndex((item) => item instanceof Function)
        const selectorIndex = Math.abs(fnIndex - 1)
        if (value.length == 0) {
          console.error('未给v-click-outside指令传入处理函数，该函数接收一个参数（用来表示是否点击元素外部）')
          return
        }
        if (value.length > 2) {
          console.error('v-click-outside指令的值为数组时最多接收两个元素，一个为处理函数（必选），一个为边界元素的CSS选择器（可选）')
          return
        }
        if (fnIndex == -1) {
          console.error('未给v-click-outside指令传入处理函数，该函数接收一个参数（用来表示是否点击元素外部）')
          return
        }
        handleFn = value[fnIndex]
        selector = value[selectorIndex]
      } else if (!(handleFn instanceof Function)) {
        console.error('v-click-outside指令的值只能是函数或数组，且数组必须有一个元素为函数，该函数接收一个参数（用来表示是否点击元素外部）')
        return
      }
      function handleClickOutside(e) {
        handleFn(!e.composedPath().includes(el))
      }
      let outElement = document.querySelector(selector)
      if (selector && !outElement) {
        console.log(`%c 未找到${selector}元素，已把document对象设为外界元素`, 'color: red;')
        outElement = document
      } else if (!selector) {
        //默认给document添加点击事件
        outElement = document
      }

      // @ts-ignore
      binding.handleClickOutside = handleClickOutside
      // @ts-ignore
      binding.outElement = outElement
      outElement.addEventListener('click', handleClickOutside, true)
    },
    beforeUnmount(el, binding, vNode) {
      // @ts-ignore
      binding.outElement.removeEventListener('click', binding.handleClickOutside, true)
    }
  })
}
