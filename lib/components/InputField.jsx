import React from 'react'

export const InputField = ({className, value, type, handleChange, name}) => {
  return(
    <input className = {className} value = {value} type = {type} name={name} onChange = {(e)=>{handleChange(e, name)}} />
  )
}
