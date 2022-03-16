import { appPalette } from 'apps/theme';
import { Styles } from 'models/PdfAdapter.model';
import { StepStatus } from 'models/Step.model';
import LoadIcon from '../../assets/icon-load.png';
import OtherChecksSuccess from '../../assets/icon-other-checks-success.png';
import OtherChecksWarning from '../../assets/icon-other-checks-warning.png';

export const Statuses = {
  [StepStatus.Success]: {
    icon: OtherChecksSuccess,
    color: appPalette.black75,
  },
  [StepStatus.Failure]: {
    icon: OtherChecksWarning,
    color: appPalette.yellow,
  },
  [StepStatus.Checking]: {
    icon: LoadIcon,
    color: appPalette.black75,
  },
};

export const styles: Styles = {
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    width: '100%',
    backgroundColor: appPalette.white,
  },
  field: {
    width: '50%',
  },
  result: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto 16px',
    padding: '30px 20px 0',
  },
  resultTitle: {
    width: '100%',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: appPalette.black75,
    textAlign: 'center',
  },
  resultText: {
    width: '100%',
    marginBottom: 5,
    fontSize: 14,
    color: appPalette.black75,
    textAlign: 'center',
  },
  image: {
    width: 22,
    marginBottom: 10,
  },
};
