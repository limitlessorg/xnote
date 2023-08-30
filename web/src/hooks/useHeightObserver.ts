import React, { useState, useEffect } from 'react'

/**
 * 监听元素高度变化
 * @param ref 元素 ref
 * @param callback 回调函数
 * @returns height 高度
 */
export function useHeightObserver(
  ref: React.RefObject<HTMLElement>,
  callback: (newHeight: number) => void
) {
  // 定义一个 state，用于存储元素的高度
  const [height, setHeight] = useState<number>(0)
  // 使用 useEffect 在组件挂载后创建一个 ResizeObserver 实例
  useEffect(() => {
    // 如果 ref 不存在或者不是一个 DOM 元素，直接返回
    if (!ref || !ref.current) {
      return
    }
    // 创建一个 ResizeObserver 实例，传入一个回调函数
    const observer = new ResizeObserver((entries) => {
      // 遍历 entries，获取每个元素的高度
      for (const entry of entries) {
        // 获取元素的高度
        const newHeight = (entry.target as HTMLElement).offsetHeight
        // 如果高度发生了变化，更新 state 并执行传入的回调函数
        if (newHeight !== height) {
          setHeight(newHeight)
          callback(newHeight)
        }
      }
    })
    // 观察 ref 对应的元素
    observer.observe(ref.current)
    // 在组件卸载时取消观察
    return () => observer.disconnect()
  }, [ref, callback, height])

  // 返回元素的高度
  return height
}
