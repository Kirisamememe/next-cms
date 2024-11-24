import { animateElement, cn } from "@/lib/utils"
import { DropData } from "@/types/drop-data"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DroppedData, useGalleryContext } from "../_components/gallery-provider"
import { toast } from "@/hooks/use-toast"

type Props = {
  dropData: DropData
  acceptable?: boolean
  onDrop?: (targetPath: string) => Promise<any>
}

function isItself(state: DroppedData, current: DropData) {
  return state.transferredData.data === current.data && state.transferredData.type === current.type
}

export function useDraggableItem({ dropData, acceptable = false, onDrop }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isDropped, setIsDropped] = useState(false)

  const {
    droppedData,
    setDroppedData
  } = useGalleryContext()

  const dragOffset = useRef({ x: 0, y: 0 })
  const initialPosition = useRef({ x: 0, y: 0 })
  const mousePosition = useRef({ x: 0, y: 0 })
  const dragImageRef = useRef<HTMLImageElement | null>(null)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null)


  useEffect(() => {
    // 先にimg要素作っとかないとロードが間に合わず、結局ゴースト画像が表示されてしまう
    const img = new window.Image()
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    dragImageRef.current = img

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
  }, [])


  const handleAutoScroll = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const scrollSpeed = 10
    const threshold = 100

    const viewportHeight = window.innerHeight

    // マウス位置（ビューポートの上端からの距離）
    const mouseY = e.clientY

    // 前回のスクロールインターバルをクリア
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }

    // 上端に近い場合
    if (mouseY < threshold) {
      scrollIntervalRef.current = setInterval(() => {
        window.scrollBy(0, -scrollSpeed)
      }, 8)
    }
    // 下端に近い場合
    else if (mouseY > viewportHeight - threshold) {
      scrollIntervalRef.current = setInterval(() => {
        window.scrollBy(0, scrollSpeed)
      }, 8)
    }
  }, [])


  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(dropData))

    if (dragImageRef.current) {
      e.dataTransfer.setDragImage(dragImageRef.current, 0, 0)
    }

    const element = e.currentTarget
    const rect = element.getBoundingClientRect()

    // 初期位置を保存
    initialPosition.current = {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    }

    // マウス位置と要素の左上からのオフセットを計算
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    const SCALE = 0.5
    const OFFSET = 2
    const WEIGHT = 8
    const MINIMUM = 0.1
    const mouseX = Math.max((e.clientX - rect.left) / rect.width * 100, MINIMUM)
    const mouseY = Math.max((e.clientY - rect.top) / rect.height * 100, MINIMUM)
    const X = mouseX * OFFSET * ((mouseX + WEIGHT) / mouseX)
    const Y = mouseY * OFFSET * ((mouseY + WEIGHT) / mouseY)
    mousePosition.current = { x: mouseX, y: mouseY }

    element.style.zIndex = '50'
    element.style.transformOrigin = `${X}% ${Y}%`
    element.style.scale = `${SCALE}`

    setIsDragging(true)
  }, [dropData])


  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (!e.clientX && !e.clientY) return // dragイベントの最後は座標が0になるため無視
    const element = e.currentTarget

    const x = e.clientX + window.scrollX - dragOffset.current.x
    const y = e.clientY + window.scrollY - dragOffset.current.y

    // 初期位置からの相対的な移動量を計算
    const deltaX = x - initialPosition.current.x
    const deltaY = y - initialPosition.current.y

    element.style.translate = `${deltaX}px ${deltaY}px`

    handleAutoScroll(e)
  }, [handleAutoScroll])


  /**
   * 要素を落とした際、落とす側がステートを走査し、
   * 自分がトリガー可能な場所に落としたかどうかを確認する
   */
  const handleDragEnd = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    // スクロールを停止
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }

    const element = e.currentTarget
    const currentData = droppedData.find((data) => isItself(data, dropData))

    /**
     * データを受け取れないエリアに落とした
     */
    if (!currentData) {
      setIsDragging(false)
      element.style.scale = '1'
      element.style.translate = ''

      setTimeout(() => element.style.zIndex = '', 250)
      return
    }


    /**
     * データを受け取れるエリアに落とした
    */
    await animateElement(element, [
      { scale: '0.5', transformOrigin: element.style.transformOrigin },
      { scale: '0.1', opacity: '0', transformOrigin: `${mousePosition.current.x}% ${mousePosition.current.y}%` },
    ], {
      duration: 300,
      easing: 'ease-in-out',
    })
    element.style.opacity = '0'
    element.style.scale = '0.1'
    element.style.zIndex = ''
    setIsDragging(false)
    setIsDropped(true)


    if (!onDrop) return
    onDrop(currentData.targetPath)
      .catch(() => {
        toast({
          title: "エラー",
          description: "移動できませんでした",
          variant: "destructive"
        })
        element.style.translate = ''
        element.style.transformOrigin = `50% 50%`
        setIsDropped(false)
        animateElement(element, [
          { scale: '0', opacity: '0' },
          { scale: '1', opacity: '1' }
        ], {
          duration: 200,
          easing: 'ease-in-out',
        }).then(() => {
          element.style.scale = '1'
          element.style.opacity = '1'
        })
      })
      .finally(() => {
        setDroppedData((prev) => prev.filter((data) => !isItself(data, dropData)))
      })

    return
  }, [dropData, droppedData, onDrop, setDroppedData])


  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])


  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])


  /**
   * 要素が落とされた際、受け取る側が、落とされたデータをステート管理に登録する
   */
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const data: DropData = JSON.parse(e.dataTransfer.getData('text/plain'))
    setDroppedData((prev) => [...prev, {
      targetPath: dropData.data,
      transferredData: data
    }])

  }, [dropData, setDroppedData])


  const props = useMemo(() => ({
    className: cn(
      "group relative overflow-hidden aspect-square",
      isDragging
        ? "rounded-lg shadow-lg opacity-80 outline outline-8 -outline-offset-2 outline-white [transition:scale_200ms,opacity_200ms,outline_200ms]"
        : "[transition:translate_200ms,scale_200ms,opacity_200ms,outline_200ms]",
      !isDragging && isDragOver && "outline outline-blue-600 outline-4 -outline-offset-4 rounded-md",
      isDropped && "hidden"
    ),
    draggable: true,
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
    ...(acceptable && {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }),
  }), [acceptable, handleDrag, handleDragEnd, handleDragEnter, handleDragLeave, handleDragStart, handleDrop, isDragOver, isDragging, isDropped])


  return {
    isDragging,
    isDragOver,
    props
  }
}