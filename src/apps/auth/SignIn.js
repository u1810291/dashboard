import React from 'react'
import { Link } from 'react-router-dom'
import pickBy from 'lodash/pickBy'
import { Grid, Button, Typography } from '@material-ui/core'
import { useIntl } from 'react-intl'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { signIn } from 'state/auth'
import { useDispatch } from 'react-redux'
import { email, required } from 'lib/validations'

const validateForm = values => {
  return pickBy(
    {
      email: required(values.email) || email(values.email),
      password: required(values.password)
    },
    v => v
  )
}

const initialValues = {
  email: '',
  passwords: ''
}

export default function SignIn() {
  const intl = useIntl()
  const dispatch = useDispatch()

  async function handleSubmit(data, { setSubmitting, setStatus }) {
    setStatus({})
    try {
      await dispatch(signIn(data))
      window.location = '/'
    } catch (error) {
      setSubmitting(false)
    }
  }

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'signin.title' })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography color="textSecondary" display="inline">
            {intl.formatMessage({ id: 'signin.subtitle' })}{' '}
          </Typography>
          <Typography display="inline">
            <Link to="/auth/signup">
              {intl.formatMessage({ id: 'signin.subtitle.link' })}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={6} direction="column">
                <Grid item container spacing={2} direction="column">
                  <Grid item>
                    <Field
                      autoComplete="email"
                      name="email"
                      type="email"
                      label={intl.formatMessage({
                        id: 'signin.form.labels.email'
                      })}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      autoComplete="password"
                      name="password"
                      type="password"
                      label={intl.formatMessage({
                        id: 'signin.form.labels.password'
                      })}
                      component={TextField}
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {intl.formatMessage({ id: 'signin.title' })}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item>
        <Typography align="center">
          <Link to="/auth/password-recovery">
            {intl.formatMessage({ id: 'signin.recovery' })}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}
