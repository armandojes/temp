import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../components/layout_admin'
import { fetchItems, deleteItems, disable, enable, fetchAll } from '../../../flux/items'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Skeleton from './skeleton'
import PageTitle from '../../components/page_title'
import Article from '../../components/Article'
import styled from 'styled-components'
import { setAlert } from '../../../flux/alert'
import Admin from '../../hoc/admin'
import lastPosition from '../../../helpers/last_position'
import { CircularProgress } from '@material-ui/core'
import { setNotification } from '../../../flux/notification'
import { toArray } from '../../../helpers/transformer'
import Search from './search'
import NotFound from './notFound'

const MyArticles = () => {
  var { loading, items, isfinally } = useSelector(state => state.items)
  items = toArray(items)
  const history = useHistory()
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  items = items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems())
    }
  }, [dispatch])

  const handleEdit = (data) => {
    history.push('/create-item', JSON.parse(JSON.stringify(data)))
  }

  const handleDelete = (data) => {
    dispatch(setAlert({
      title: 'Seguro que quieres borrar este articulo',
      message: 'Una vez realizada esta accion no podras recurar la informacion',
      action: deleteItems(data.id),
      textAction: 'Eliminar'
    }))
  }

  const handleStatus = data => {
    if (data.isActive) {
      dispatch(setAlert({
        title: '¿Seguro quieres desabilitar este articulo?',
        message: 'Los articulos desabilitados no seran visibles para tus clientes.',
        action: dispatch => {
          dispatch(disable(data.id))
          dispatch(setNotification({
            message: 'El articulo se ha desactivado',
            type: 'warning'
          }))
        },
        textAction: 'Desabilitar'
      }))
    } else {
      dispatch(dispatch => {
        dispatch(enable(data.id))
        dispatch(setNotification({
          message: 'El articulo se ha habilitado',
          type: 'info'
        }))
      })
    }
  }

  useEffect(event => {
    const handleScroll = event => {
      const isInLastPosition = lastPosition(500)
      if (!loading && isInLastPosition && !isfinally) {
        dispatch(fetchItems())
      }
    }
    window.addEventListener('scroll', handleScroll)
    return event => window.removeEventListener('scroll', handleScroll)
  }, [loading, isfinally, dispatch])

  const onQueryChange = event => {
    if (!isfinally && !loading) {
      dispatch(fetchAll())
    }
    setQuery(event.target.value)
  }

  return (
    <LayoutAdmin title='Mis Productos'>
      <Header>
        <PageTitle>Mis Productos</PageTitle>
        <Search query={query} onQueryChange={onQueryChange} />
      </Header>
      {loading && items.length === 0 && (
        <Skeleton />
      )}
      {items.length > 0 && (
        <Content>
          {items.map(item => (
            <Article
              key={item.id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleStatus={handleStatus}
              {...item}
            />
          ))}
        </Content>
      )}
      {items.length > 0 && loading && (
        <CircularProgressContet>
          <CircularProgress />
        </CircularProgressContet>
      )}
      {!items.length && !!query && !loading && (
        <NotFound
          message={`Sin resultados de busqueda para: "${query}"`}
        />
      )}
      {!items.length && !query && !loading && (
        <NotFound
          message='Aun no tienes articulos publicados'
        />
      )}
    </LayoutAdmin>
  )
}

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: stretch;
`
const CircularProgressContet = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
`
export default Admin(MyArticles)
