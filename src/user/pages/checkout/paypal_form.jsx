import React, { useEffect } from 'react'
import styled from 'styled-components'

// paypal config
const paypalConfig = props => {
  return {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: { value: props.totalPrice }
        }]
      })
    },
    onApprove: (data, actions) => {
      props.startProcess()
      const status = actions.order.capture().then((details) => {
        const { id, payer } = details
        props.saveOperation('payed', { id, payer })
      })
      return status
    }
  }
}

const PaypalForm = props => {
  // render button paypal
  useEffect(any => {
    window.paypal.Buttons(paypalConfig({ ...props })).render('#render_button')
  }, [])

  return (
    <ContentPaypal>
      <div id='render_button' />
    </ContentPaypal>
  )
}

const ContentPaypal = styled.div`
  display: flex;
  min-height: 250px;
  align-items: center;
  & div {
    width: 100%;
  }
`

export default PaypalForm