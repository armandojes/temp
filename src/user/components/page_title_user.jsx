import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const PageTitleUser = (props) => {
  return (
    <Title>
      {props.children}
      <Line />
    </Title>
  )
}

PageTitleUser.propTypes = {
  children: propTypes.string
}

const Title = styled.h1`
  display: flex;
  align-items: center;
  color: var(--user-black);
  font-size: 1.5em;
`
const Line = styled.hr`
  flex: 1 1 auto;
  margin-left: 20px;
  color: var(--user-gray-light);
  border: 2px solid;
`

export default PageTitleUser
