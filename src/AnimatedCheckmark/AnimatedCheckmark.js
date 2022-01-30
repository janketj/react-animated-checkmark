import React, {
  useEffect,
  useState,
  useRef,
} from 'react'

import './AnimatedCheckmark.css'

// EXPORTED MODES READY TO USE
const MODES = {
  LOADING: 'loading',
  SUCCESS: 'success',
}

/*
 * ANIMATED CHECKMARK COMPONENT
 *
 * Displays an animated checkmark that has multiple modes
 *
 * @param - {MODE} mode - Decides what the checkmarks are showing
 * @param - {Number} size - Regulates the size of the component
 * @param - {Boolean} breathingEllipsis - If true the ellipsis will contract and expand infinitely
 * @param - {Number} collapseFactor - Value between 0 and 1, decides how far the ellipsis collapse
 * @param - {String} successColor - Defines what color is shown when mode equals MODES.SUCCESS
 * @param - {String} baseColor - Defines what base color is shown
 *
 */

const AnimatedCheckmark = ({
  mode = MODES.LOADING,
  size = 128,
  breathingEllipsis = true,
  collapseFactor = 1,
  successColor = 'limegreen',
  baseColor = 'gray',
}) => {
  const maxRadius = 116
  const maxCollapse = maxRadius - (maxRadius * (collapseFactor * 0.33))

  const [newRx, setNewRx] = useState(maxRadius)
  const [block, setBlock] = useState(true)
  const [animationMode, setAnimationMode] = useState('decrease')
  const [animationSpeed, setAnimationSpeed] = useState(40)

  const isAnimated = (mode === MODES.LOADING && (breathingEllipsis || newRx > maxCollapse))
    || (mode === MODES.SUCCESS && newRx > maxCollapse)

  // When called decides whether to increase the x-Radius of ellipsis
  const initAnimation = () => {
    if (animationMode === 'increase') {
      if (newRx < maxRadius) {
        setNewRx(newRx + 1)
      } else {
        setAnimationMode('decrease')
        setNewRx(newRx - 1)
      }
    } else {
      if (newRx > maxCollapse) {
        setNewRx(newRx - 1)
      } else {
        setAnimationMode('increase')
        setNewRx(newRx + 1)
      }
    }
  }

  // Block animation on mount to let ellipsis initialize (animation-delay)
  useEffect(() => {
    setTimeout(() => {
      setBlock(false)
    }, 300)
  }, [])

  // Loop animation while conditions are met
  useEffect(() => {
    setTimeout(() => {
      if (!block && isAnimated) {
        if (mode === MODES.SUCCESS) {
          setAnimationMode('decrease')
          setAnimationSpeed(10)
        }
        initAnimation()
      }
    }, animationSpeed)
  }, [newRx, block])

  // Make sure animation is running when mode switches
  useEffect(() => {
    if (!block && isAnimated) {
      if (animationSpeed !== 40) setAnimationSpeed(40)
      initAnimation()
    }
  }, [mode])

  const rotateString = 'rotate'
  const color = mode === MODES.SUCCESS ? successColor : baseColor
  const containerStyle = { width: size, height: size }

  return (
    <div style={containerStyle} className='checkMarkContainer'>
      <svg viewBox='0 0 256 256'>
        <g stroke={color} fill='none' strokeWidth='6'>
          <circle cx='128' cy='128' r={maxRadius} />
          <ellipse className={`${rotateString} e1`} cx='128' cy='128' rx={newRx} ry={maxRadius} />
          <ellipse className={`${rotateString} e2`} cx='128' cy='128' rx={newRx} ry={maxRadius} />
          <ellipse className={`${rotateString} e3`} cx='128' cy='128' rx={newRx} ry={maxRadius} />
          <ellipse className={`${rotateString} e4`} cx='128' cy='128' rx={newRx} ry={maxRadius} />
        </g>
        <g stroke={color} fill='none' strokeWidth='8'>
          {mode === MODES.SUCCESS && newRx < maxCollapse && (
            <path className='icon' d='M 75 130 L 110 170 L 175 90' />
          )}
        </g>
      </svg>
    </div>
  )
}


export { AnimatedCheckmark, MODES }
