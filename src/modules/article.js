import { db, storageRef, firebase } from './firebase'
import snapshotParser from '../helpers/snapshotparser'

const article = {
  /**
   * @param data::object
   * @return id created || false
   * save order on database
   */
  async saveOrder (data) {
    try {
      const date = new Date()
      const period = `${date.getMonth() + 1}-${date.getFullYear()}`
      const result = await db.collection(`Ordenes/Pedidos/${period}`).add({
        ...data,
        date: new Date()
      })
      await db.doc(`Ordenes/Pedidos/${period}/${result.id}`).update({ id: result.id })
      await db.doc('Ordenes/Pedidos').update({
        counter: firebase.firestore.FieldValue.increment(1)
      })
      return result.id
    } catch (error) {
      console.error('error_description:', error)
      return false
    }
  },

  /**
   * @param id::string
   * @return data::object || false
   * getSpecific article
   */
  async get (id) {
    try {
      const snap = await db.doc(`Articulos/${id}`).get()
      const data = snapshotParser(snap)
      return data
    } catch (error) {
      console.error('error_description:', error)
      return false
    }
  },

  /**
   * @param id::strinf
   * @return true||false::bool
   * set disable on status
   */
  async setInactive (id) {
    await db.doc(`Articulos/${id}`).update({
      isActive: false
    })
  },

  /**
   * @param id::strinf
   * @return true||false::bool
   * set active on status
   */
  async setActive (id) {
    await db.doc(`Articulos/${id}`).update({
      isActive: true
    })
  },

  /**
 * @param id::strinf
 * @return true||false::bool
 * delete item on database
 */
  async delete (id) {
    try {
      await db.doc(`Articulos/${id}`).delete()
      return true
    } catch (error) {
      console.error('error_Descript:', error)
      return false
    }
  },
  /**
   * @params data::object
   * @return id created or false
   * create a new item
  **/
  async upload ({ title = '', description = '', sku = '', price = 0, picture = '', pictures = [] }) {
    try {
      const { id } = await db.collection('Articulos').add({ date: new Date(), isActive: true, title, description, sku, price, picture, pictures })
      await db.collection('Articulos').doc(id).update({ id })
      return id
    } catch (error) {
      console.error('error_description:', error)
      return false
    }
  },
  /**
   * @params id:int, data:object
   * @return true or false
   * update a data of item
   */
  async update (id, data) {
    try {
      data.date = new Date()
      await db.doc(`Articulos/${id}`).update(data)
      return true
    } catch (error) {
      console.error('error_description:', error)
      return false
    }
  },
  /**
   * @params id_article::int and photo::file and OPTIONAL::bool
   * @return url or false
   */
  async uploadPicture (id, picture, primary) {
    var name = picture.name
    if (primary) name = `primary_${name}`
    const nameEncoded = encodeURIComponent(name)
    const newNameEncoded = encodeURIComponent(`thumb@1100_${name}`)
    const { ref } = await storageRef.child(`${id}/${name}`).put(picture)
    const url = await ref.getDownloadURL()
    var urlTransformed = url.replace(nameEncoded, newNameEncoded)
    urlTransformed = urlTransformed.split('&token')[0]
    return urlTransformed
  },
  /**
   * @params lastItem::snap, Limit::int
   * @return Object of = Items::array, lastItem::snap
   */
  async getList (lastItem = null, limit = null) {
    try {
      var query = db.collection('Articulos').orderBy('date', 'desc')
      if (limit) query = query.limit(limit)
      if (lastItem) query = query.startAfter(lastItem)
      const snapshot = await query.get()
      const items = snapshotParser(snapshot)
      return { items, last: snapshot.docs[snapshot.docs.length - 1] }
    } catch (error) {
      console.error('error_description:', error)
      return { items: [], last: null }
    }
  },

  /**
   * @param urlPicture::string and idarticle::string
   * @return true or false :: bool
   */
  async deletePicture (id, url) {
    try {
      const urlDecoded = decodeURIComponent(url)
      var urlToDelete = urlDecoded.split(id)[1]
      urlToDelete = urlToDelete.split('?')[0]
      urlToDelete = `${id}/${urlToDelete}`
      await storageRef.child(urlToDelete).delete()
      return true
    } catch (error) {
      console.log('error_description:', error)
      return false
    }
  }

}

export default article
