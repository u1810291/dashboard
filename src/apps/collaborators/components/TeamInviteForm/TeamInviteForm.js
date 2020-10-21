import { setI18nContext } from 'components/i18n-context';
import { TextField, InputLabel, Box } from '@material-ui/core';
import { RadioButtonGroup } from 'components/inputs';
import { Field, Formik } from 'formik';
import { flow, pick, pickBy } from 'lodash';
import React from 'react';
import { injectIntl } from 'react-intl';
import ImgAdmin from 'assets/modal-role-admin.svg';
import ImgAgent from 'assets/modal-role-agent.svg';
import { cleanText, email, required } from 'lib/validations';
import CSS from './TeamInviteForm.module.scss';

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

class TeamInviteForm extends React.Component {
  roleOptions = [
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.admin',
      }),
      value: 1,
      description: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.description.admin',
      }),
      imgSrc: ImgAdmin,
    },
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.agent',
      }),
      value: 2,
      description: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.description.agent',
      }),
      imgSrc: ImgAgent,
    },
  ];

  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({});
    const data = pick(values, 'firstName', 'lastName', 'role', 'email');
    this.props
      .handleSubmit(data)
      .then(() => {
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        if (!error || !error.response || !error.response.data) return;
        setStatus({ password: error.response.data.message });
      });
  };

  render() {
    const { innerRef, intl } = this.props;
    return (
      <Formik
        innerRef={innerRef}
        initialValues={formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={(props) => (
          <form onSubmit={props.handleSubmit} className={CSS.form}>
            <Box className={CSS.wrapper}>
              <Box mb={{ xs: 4, lg: 2 }}>
                <InputLabel>
                  {intl.formatMessage({ id: 'teamTable.invite.form.labels.firstName' })}
                </InputLabel>
                <Field
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
                component={RadioButtonGroup}
                options={this.roleOptions}
                error={props.touched.password && props.errors.password}
              />
            </Box>
          </form>
        )}
      />
    );
  }
}

export default flow(
  setI18nContext('teamTable.invite.form'),
  injectIntl,
  (Component) => React.forwardRef((props, ref) => <Component innerRef={ref} {...props} />),
)(TeamInviteForm);
