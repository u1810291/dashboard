import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'no-wrap',
    marginTop: 10,
    padding: [[5, 20]],
    backgroundColor: colors.black7,
    borderRadius: 5,
  },
  titleWrapperIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'no-wrap',
    minHeight: 30,
    marginBottom: 20,
    padding: [[5, 20]],
    backgroundColor: colors.black7,
    borderRadius: 5,
  },
  titleIcon: {
    flexShrink: 0,
    marginRight: 10,
    width: 17,
  },
});
