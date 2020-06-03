const specificData = [
  { type: 'int', key: 'keyname', label: 'text to show', max: 99, min: 0 },
  { type: 'text', key: 'keynametext', label: 'text to show', maxLength: 99 },
  { type: 'select', key: 'keynameselect', label: 'text to show', options: [{ a: 'valuea' }, { b: 'valueb' }, { c: 'valuec' }] },
  { type: 'radio', keyname: 'keynameradio', label: 'label radio', options: [{ a: 'valuea' }, { b: 'valueb' }, { c: 'valuec' }] },
  { type: 'checkbox', keyname: 'keynameCheck', label: 'checkbox', options: [] }
]

// openpay config
window.OpenPay.setApiKey('pk_e5f81cea310948fbab3ffe675d64d12c')
window.OpenPay.setId('mv6scwapmuqsocsjucwh')
window.OpenPay.setSandboxMode(true) // true || false

// firebase config
export const firebase = {
  apiKey: 'AIzaSyDGmuP3Cp8D3LgMAr89IcZBfq4y1g9fzj4',
  authDomain: 'somos-marketplace.firebaseapp.com',
  databaseURL: 'https://somos-marketplace.firebaseio.com',
  projectId: 'somos-marketplace',
  storageBucket: 'somos-marketplace.appspot.com',
  messagingSenderId: '404758906021',
  appId: '1:404758906021:web:b405f16b3359f1d881b94c',
  measurementId: 'G-PV24KTN13F'
}

export const apiBaseUrl = 'https://us-central1-somos-marketplace.cloudfunctions.net'

// cover pictures
export const coverPictures = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
  }
]

// contacts
const contacts = {
  email: 'somos@somos.work',
  number: '5589876543'
}

const message = {
  copyright: '2020 derechos reservados'
}

export const companyName = 'somos csm'

export const payDayLimitForStore = 3
export const payDayLimitForBank = 3
export const taxPorcent = 16
export const limitCheckout = 10000
export const shipping = 50

export default {
  firebase,
  specificData,
  contacts,
  message,
  coverPictures
}
