import React from 'react'

export const partialComponent = (Component, partialProps) => {
  return (props) => {
    return <Component {...props} {...partialProps} />
  }
}


export const Button = ({size, text, color, ...props}) => {
  return (
    <button  style={{
        fontSize: size === 'small' ? '10px' : '32px',
        backgroundColor: color,
    }} >
        {text}
    </button>
  )
}


export const RedButton = partialComponent(Button, {color: 'red'})
export const SmallRedButton = partialComponent(RedButton, { size: 'small'})
export const SmallGreenButton = partialComponent(Button, {color: 'green', size: 'small'})