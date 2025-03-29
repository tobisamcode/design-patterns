import React from 'react'

export const Button = ({size, text, color, ...props}) => {
  return (
    <button style={{
        fontSize: size === 'small' ? '10px' : '32px',
        backgroundColor: color,
    }}>
        {text}
    </button>
  )
}


export const RedButton =  (props) => <Button color='red' {...props} />

export const SmallGreenButton =  (props) => <Button color='green' size={'small'} {...props} />