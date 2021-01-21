import { TextField, InputLabel, Box } from '@material-ui/core';
import { Field, Formik } from 'formik';
import { pick, pickBy } from 'lodash';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as ImgAdmin } from 'assets/modal-role-admin.svg';
import { ReactComponent as ImgAgent } from 'assets/modal-role-agent.svg';
import { cleanText, email, required } from 'lib/validations';
import CSS from './TeamInviteForm.module.scss';
import { RoleField } from '../../RoleField/RoleField';
import { QATags } from '../../../../models/QA.model';

const formikSettings = {
  initialValues: {
    firstName: '',
    lastName: '',
    role: 2,
    email: '',
  },

  validate: (values) => {
    let errors = {};
    errors.firstName = required(values.firstName, true) || cleanText(values.firstName, true);
    errors.lastName = required(values.lastName, true) || cleanText(values.lastName, true);
    errors.email = required(values.email, true) || email(values.email, true);
    errors = pickBy(errors, (v) => v);
    return errors;
  },
};

export function TeamInviteForm({ onSubmit, innerRef }) {
  const intl = useIntl();

  const roleOptions = [
    {
      qaTag: QATags.Collaborators.Role.Admin,
      label: intl.formatMessage({
        id: 'teamTable.invite.form.roles.admin',
      }),
      value: 1,
      description: intl.formatMessage({
        id: 'teamTable.invite.form.roles.description.admin',
      }),
      image: <ImgAdmin />,
    },
    {
      qaTag: QATags.Collaborators.Role.Agent,
      label: intl.formatMessage({
        id: 'teamTable.invite.form.roles.agent',
      }),
      value: 2,
      description: intl.formatMessage({
        id: 'teamTable.invite.form.roles.description.agent',
      }),
      image: <ImgAgent />,
    },
  ];
  const handleSubmit = useCallback((values, { setSubmitting, setStatus }) => {
    setStatus({});
    const data = pick(values, 'firstName', 'lastName', 'role', 'email');

    onSubmit(data)
      .then(() => {
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        if (!error || !error.response || !error.response.data) return;
        setStatus({ password: error.response.data.message });
      });
  }, [onSubmit]);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={formikSettings.initialValues}
      onSubmit={handleSubmit}
      validate={formikSettings.validate}
      render={(props) => (
        <form onSubmit={props.handleSubmit} className={CSS.form}>
          <Box className={CSS.wrapper}>
            <Box mb={{ xs: 4, lg: 2 }}>
              <InputLabel>
                {intl.formatMessage({ id: 'teamTable.invite.form.labels.firstName' })}
              </InputLabel>
              <Field
                inputProps={{ 'data-qa': QATags.Collaborators.FirstNameInput }}
                as={TextField}
                name="firstName"
                variant="outlined"
                margin="dense"
                fullWidth
                helperText={props.touched.firstName && !!props.errors.firstName && intl.formatMessage({ id: props.errors.firstName })}
                error={props.touched.firstName && !!props.errors.firstName}
              />
            </Box>
            <Box mb={{ xs: 4, lg: 2 }}>
              <InputLabel>
                {intl.formatMessage({ id: 'teamTable.invite.form.labels.lastName' })}
              </InputLabel>
              <Field
                inputProps={{ 'data-qa': QATags.Collaborators.LastNameInput }}
                as={TextField}
                name="lastName"
                variant="outlined"
                margin="dense"
                fullWidth
                helperText={props.touched.lastName && props.errors.lastName && intl.formatMessage({ id: props.errors.lastName })}
                error={props.touched.lastName && !!props.errors.lastName}
              />
            </Box>
            <Box mb={4}>
              <InputLabel>
                {intl.formatMessage({ id: 'teamTable.invite.form.labels.email' })}
              </InputLabel>
              <Field
                inputProps={{ 'data-qa': QATags.Collaborators.EmailInput }}
                as={TextField}
                type="input"
                name="email"
                variant="outlined"
                margin="dense"
                fullWidth
                helperText={props.touched.email && props.errors.email && intl.formatMessage({ id: props.errors.email })}
                error={props.touched.email && !!props.errors.email}
              />
            </Box>
          </Box>
          <Box mb={4} className={CSS.wrapper}>
            <Field
              name="role"
              component={RoleField}
              options={roleOptions}
              error={props.touched.password && props.errors.password}
            />
          </Box>
        </form>
      )}
    />
  );
}
