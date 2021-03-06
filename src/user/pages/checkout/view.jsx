import React, { useState } from 'react'
import Layout from '../../components/layout_user'
import Container from '../../components/container'
import Stepper from './stepper'
import UserInfo from './user_info'
import propTypes from 'prop-types'
import Shipping from './shipping_and_pay'
import validateForm from '../../../helpers/validateform'
import Confirm from './confirm'

const Form = props => {
  const [currentStep, setCurrenStep] = useState(0)
  const steps = ['Información', 'Envío', 'Método de Pago', 'Confirmación']
  const [errors, setErrors] = useState({ errors: [], message: null })

  const handleNext = event => {
    window.scrollTo(0, 0)
    if (steps[currentStep] === 'Información') {
      const requires = ['email', 'name', 'lastname', 'street_number', 'suburb', 'city', 'state', 'number', 'postal_code']
      const inputWidthErrors = validateForm.requires(props.data, requires)
      if (inputWidthErrors) setErrors({ ...errors, errors: inputWidthErrors, message: 'Todos los campos son requeridos' })
      else if (!validateForm.validateEmail(props.data.email)) {
        setErrors({ errors: ['email'], message: 'El correo no es válido' })
      } else if (props.data.number.toString().length < 6) {
        setErrors({ errors: ['number'], message: 'El número de contacto no es válido' })
      } else setCurrenStep(currentStep + 1)
    }
    if (steps[currentStep] === 'Envío') setCurrenStep(currentStep + 1)
    if (steps[currentStep] === 'Método de Pago') {
      const requires = ['methodPay']
      const inputWidthErrors = validateForm.requires(props.data, requires)
      if (inputWidthErrors) setErrors({ ...errors, errors: inputWidthErrors, message: 'Porfavor selecciona un método de pago' })
      else setCurrenStep(currentStep + 1)
    }
  }

  const goToStep = (stepName) => {
    setCurrenStep(steps.indexOf(stepName))
  }

  const handleRemoveErrors = ({ name }) => {
    if (errors.errors.length > 0) {
      const newErrors = errors.errors.filter(error => error !== name)
      const errorMessage = newErrors.length ? errors.message : null
      setErrors({ message: errorMessage, errors: newErrors })
    }
  }

  const handleChangeDirections = event => {
    setCurrenStep(steps.indexOf('Información'))
  }

  return (
    <Layout>
      <Container>
        <Stepper
          currentStep={currentStep}
          steps={steps}
        />
        {steps[currentStep] === 'Información' && (
          <UserInfo
            errors={errors.errors}
            errorMessage={errors.message}
            steps={steps}
            currentStep={currentStep}
            handleNext={handleNext}
            goToStep={goToStep}
            {...props}
            setCurrenStep={setCurrenStep}
            handleRemoveErrors={handleRemoveErrors}
            handleChangeDirections={handleChangeDirections}
          />
        )}
        {(steps[currentStep] === 'Envío' || steps[currentStep] === 'Método de Pago') && (
          <Shipping
            {...props}
            errors={errors.errors}
            errorMessage={errors.message}
            steps={steps}
            currentStep={currentStep}
            handleNext={handleNext}
            goToStep={goToStep}
            setCurrenStep={setCurrenStep}
            handleRemoveErrors={handleRemoveErrors}
            handleChangeDirections={handleChangeDirections}
          />
        )}
        {steps[currentStep] === 'Confirmación' && (
          <Confirm
            {...props}
            errors={errors.errors}
            errorMessage={errors.message}
            steps={steps}
            currentStep={currentStep}
            handleNext={handleNext}
            goToStep={goToStep}
            setCurrenStep={setCurrenStep}
            handleRemoveErrors={handleRemoveErrors}
            handleChangeDirections={handleChangeDirections}
          />
        )}
      </Container>
    </Layout>
  )
}

Form.propTypes = {
  errors: propTypes.array,
  data: propTypes.object,
  handlePay: propTypes.func
}

export default Form
