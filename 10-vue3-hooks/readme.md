# hooks
> 就是一些可以复用的方法的集合
> 1. 将这些方法或者变量放入aaa.js文件中
> 2. 方法取名用useXX，变量一般是也是useYY
> 3. 想让别人别人使用就在js文件的最后export const/function  {useXX, useYY}
> 4. 使用的时候直接import {useXX, useYY} from '../hooks/aaa.js'
> 5. const {refName, funName} = useXX()


