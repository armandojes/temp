import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import shortText from '../../helpers/short_text'
import { Button } from '@material-ui/core'

const Article = (props) => {
  return (
    <Wrapped>
      <ItemContent>
        <Picture src={props.picture} />
        <Actions>
          <Price>{props.price}</Price>
          <Title>{props.title}</Title>
          <Description>{shortText(props.description)}</Description>
          <ButtonContainer>
            <ButtonStyled onClick={() => props.handleEdit(props)} color='secondary' variant='outlined'>Editar</ButtonStyled>
            <ButtonStyled onClick={() => props.handleDisable(props)} color='secondary' variant='contained'>Desactivar</ButtonStyled>
            <ButtonStyled onClick={() => props.handleDelete(props)} color='secondary' variant='contained'>Eliminar</ButtonStyled>
          </ButtonContainer>
        </Actions>
      </ItemContent>
    </Wrapped>
  )
}

Article.propTypes = {
  picture: propTypes.string,
  price: propTypes.oneOfType([propTypes.string, propTypes.number]),
  description: propTypes.string,
  title: propTypes.string,
  handleEdit: propTypes.func,
  handleDelete: propTypes.func,
  handleDisable: propTypes.func
}

const Wrapped = styled.article`
  width: 25%;
  padding: 10px;
  @media screen and (max-width:1400px){ width:33%; padding: 5px;}
  @media screen and (max-width:1100px){ width:50% }
  @media screen and (max-width:1100px){ width:100% }
`

const ItemContent = styled('div')`
  border-radius: 7px;
  overflow: hidden;
  display: block;
  min-height: 100%;
  box-shadow: 1px 1px 3px #008ffd38;
`
const Picture = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`

const Actions = styled.div`
  padding: 8px;
`

const Price = styled.div`
  text-align: left;
  font-size: 1.3em;
  color: var(--main-blue);
  font-weight: bold;
`
const Description = styled.p`
  color: var(--main-blue-dark);
  text-align: left;
`

const Title = styled.div`
  color: var(--main-blue-dark);
  font-size: 1.2em;
  text-align: left;
  margin-top: 10px;
  font-weight: bold;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`
const ButtonStyled = styled(Button)`
  text-align: center;
  width: 32%;
  font-size: .7em;
  border-radius: 15px;
`
export default Article