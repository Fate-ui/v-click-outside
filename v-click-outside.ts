
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
          console.error('No handler function is passed to the v-click-outside directive, which receives a parameter (used to indicate whether to click outside the element)')
          return
        }
        if (value.length > 2) {
          console.error('When the value of the v-click-outside directive is an array, it receive up to two elements, one for the handler function (required), and one for the CSS selector of the boundary element (optional)')
          return
        }
        if (fnIndex == -1) {
          console.error('No handler function is passed to the v-click-outside directive, which receives a parameter (used to indicate whether to click outside the element)')
          return
        }
        handleFn = value[fnIndex]
        selector = value[selectorIndex]
      } else if (!(handleFn instanceof Function)) {
        console.error('The value of the v-click-outside directive can only be a function or an array, if array must have a function that receives a parameter (used to indicate whether to click outside the element)')
        return
      }
      function handleClickOutside(e) {
        handleFn(!e.composedPath().includes(el))
      }
      let outElement = document.querySelector(selector)
      if (selector && !outElement) {
        console.log(`%c not found ${selector} element，used document as the boundary element`, 'color: red;')
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
