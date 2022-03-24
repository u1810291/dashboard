import React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomField } from '../../models/CustomField.model';
import { CustomFieldVerificationList } from '../CustomFieldVerificationList/CustomFieldVerificationList';
import { CustomFieldVerificationInfo, CustomFieldVerificationSectionInfo } from '../CustomFieldVerificationInfo/CustomFieldVerificationInfo';
import { useStyles } from './CustomFieldVerificationCard.styles';

export function CustomFieldVerificationCard({ data }: {
  data: CustomField[];
}) {
  const classes = useStyles();

  // TODO: @anatoliy.turkin next time (ATLDC-393)
  // if (isEditingMode) {
  //   return (
  //     <FormProvider {...methods}>
  //       <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={classes.wrapper}>
  //         <CustomFieldVerificationList
  //           fields={data}
  //           atomicContainer={CustomFieldVerificationInput}
  //           sectionContainer={CustomFieldVerificationSectionInput}
  //         />
  //         <Grid container justify="space-between" className={classes.buttonWrapper}>
  //           <Button
  //             className={classNames(classes.buttonSave, classes.button, classes.buttonHalf)}
  //             type="submit"
  //             disabled={isSubmitting}
  //           >
  //             {!isSubmitting ? intl.formatMessage({ id: 'DocumentReadingStep.btn.save' }) : <CircularProgress color="inherit" size={17} />}
  //           </Button>
  //           <Button
  //             className={classNames(classes.button, classes.buttonHalf)}
  //             onClick={() => setIsEditingMode(false)}
  //           >
  //             {intl.formatMessage({ id: 'cancel' })}
  //           </Button>
  //         </Grid>
  //       </form>
  //     </FormProvider>
  //   );
  // }

  return (
    <Grid container direction="column" className={classes.wrapper}>
      <Grid container className={classes.inputsWrapper} justify="space-between">
        <CustomFieldVerificationList
          fields={data}
          atomicContainer={CustomFieldVerificationInfo}
          sectionContainer={CustomFieldVerificationSectionInfo}
        />
      </Grid>
      {/* TODO: @anatoliy.turkin next time (ATLDC-393)  */}
      {/* <RoleRenderGuard roles={WithAgent}> */}
      {/*   <Box className={classes.buttonWrapper}> */}
      {/*     <Button */}
      {/*       className={classes.button} */}
      {/*       fullWidth */}
      {/*       onClick={() => setIsEditingMode(true)} */}
      {/*     > */}
      {/*       <FiEdit3 className={classes.buttonEditIcon} /> */}
      {/*       {intl.formatMessage({ id: 'DocumentReadingStep.btn.edit' })} */}
      {/*     </Button> */}
      {/*   </Box> */}
      {/* </RoleRenderGuard> */}
    </Grid>
  );
}
