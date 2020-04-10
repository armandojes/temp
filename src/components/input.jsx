import React from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import styled from 'styled-components'

const CreateInput = (props) => {

  const onChange = (event) => {
    if (props.onChange) props.onChange(event.target)
    else props.handleChange(event.target)
  }

  const handleRemoveError = (event) => {
    if(props.removeError)
    props.removeError(event.target)
  }

  const errorsCalculated = props.errors ? props.errors.includes(props.name) : false
  const valueCalculated = props.value ? props.value || '' : props[props.name] || '';

  if (props.type === 'text') return (
    <TextFiledStyled
      placeholder={props.placeholder || null }
      className={props.className}
      onChange={onChange}
      value={valueCalculated}
      name={props.name}
      fullWidth={props.fullWidth}
      inputProps={{maxLength: props.maxLength || null}}
      error={errorsCalculated}
      onClick={handleRemoveError}
      variant='outlined'
      type={props.type || 'text'}
    />
  )

  if (props.type === 'password') return (
    <TextFiledStyled
      placeholder={props.placeholder || null }
      className={props.className}
      onChange={onChange}
      value={valueCalculated}
      name={props.name}
      fullWidth={props.fullWidth}
      inputProps={{maxLength: props.maxLength || null}}
      error={errorsCalculated}
      onClick={handleRemoveError}
      variant='outlined'
      type={props.type || 'password'}
    />
  )

  if (props.type === 'number') return (
    <TextFiledStyled
      placeholder={props.placeholder || null }
      className={props.className}
      onChange={onChange}
      value={props.value || props[props.name]}
      name={props.name}
      fullWidth={props.fullWidth}
      inputProps={{maxLength: props.max || null}}
      error={errorsCalculated}
      onClick={handleRemoveError}
      variant='outlined'
      type={props.type || 'text'}
    />
  )

  if ( props.type === 'textarea') return (
    <TextAreaStyled
      multiline={true}
      className={props.className}
      onChange={onChange}
      value={valueCalculated}
      name={props.name}
      fullWidth={props.fullWidth}
      inputProps={{maxLength: props.maxLength || null}}
      error={errorsCalculated}
      onClick={handleRemoveError}
      variant='outlined'
      type={props.type || 'text'}
    />
  )

  return null
}


const TextFiledStyled = styled(TextField)`
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid;
    border-color: var(--main-blue)!important
  }
  .MuiInputBase-root {
    border-color: var(--main-blue)!important
  }
  .MuiOutlinedInput-root:hover{
    border-color: var(--main-blue)!important
  }
  .MuiOutlinedInput-input{
    color: var(--main-blue)
  }
`
const TextAreaStyled = styled(TextField)`
  
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid;
    border-color: var(--main-blue)!important
  }
  .MuiInputBase-root {
    border-color: var(--main-blue)!important
  }
  .MuiOutlinedInput-root:hover{
    border-color: var(--main-blue)!important
  }
  .MuiOutlinedInput-input{
    color: var(--main-blue)
  }
`
export default CreateInput