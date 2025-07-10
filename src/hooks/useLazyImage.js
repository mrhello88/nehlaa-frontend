import { useState, useEffect, useRef } from 'react'

export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  const {
    threshold = 0.1,
    rootMargin = '50px',
    placeholder = null
  } = options

  useEffect(() => {
    if (!imgRef.current || !src) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [src, threshold, rootMargin])

  useEffect(() => {
    if (!isInView || !src) return

    const img = new Image()
    
    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
    }
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`)
      setIsLoaded(true) // Still set loaded to avoid infinite loading
    }

    img.src = src
  }, [isInView, src])

  return {
    imgRef,
    imageSrc: imageSrc || placeholder,
    isLoaded,
    isInView
  }
}

export const useLazyBackgroundImage = (src, options = {}) => {
  const [backgroundImage, setBackgroundImage] = useState('none')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const elementRef = useRef()

  const {
    threshold = 0.1,
    rootMargin = '100px',
    placeholder = 'linear-gradient(135deg, rgba(0, 109, 119, 0.1) 0%, rgba(163, 230, 53, 0.1) 100%)'
  } = options

  useEffect(() => {
    if (!elementRef.current || !src) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [src, threshold, rootMargin])

  useEffect(() => {
    if (!isInView || !src) return

    // Set placeholder immediately when in view
    setBackgroundImage(placeholder)

    const img = new Image()
    
    img.onload = () => {
      setBackgroundImage(`url(${src})`)
      setIsLoaded(true)
    }
    
    img.onerror = () => {
      console.warn(`Failed to load background image: ${src}`)
      setIsLoaded(true)
    }

    img.src = src
  }, [isInView, src, placeholder])

  return {
    elementRef,
    backgroundImage,
    isLoaded,
    isInView
  }
} 