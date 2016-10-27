import React from 'react'

export const InputField = ({className, value, type, handleChange, placeholder, name, objName}) => {
  return(
    <input className = {className} value = {value} type = {type} name={name} placeholder = {placeholder} onChange = {(e)=>{handleChange(e, name, objName)}} />
  )
}
