import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { Slider, SliderProps } from '@material-ui/core';
import { useStyles } from './RangeSlider.styles';

interface RangeSliderProps extends Omit<SliderProps, 'onChange'> {
  onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}

export const RangeSlider = (props: RangeSliderProps) => {
  const intl = useIntl();
  const classes = useStyles();

  const defaultMarks = useMemo(() => {
    const result: { value: number; label?: React.ReactNode }[] = new Array(11).fill(1).map((_: number, index: number) => ({ value: index * 10 }));
    result[0].label = (
      <>
        <span className={classes.sliderPointValue}>0</span>
        <span className={classnames(classes.sliderPointText, classes.sliderPointFirst)}>{intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.slider.StrictMatch' })}</span>
      </>
    );
    result[5].label = (
      <>
        <span className={classes.sliderPointValue}>50</span>
        <span className={classnames(classes.sliderPointText, classes.sliderPointMiddle)}>{intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.slider.Optimal' })}</span>
      </>
    );
    result[10].label = (
      <>
        <span className={classes.sliderPointValue}>100</span>
        <span className={classnames(classes.sliderPointText, classes.sliderPointLast)}>{intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.slider.FuzzyMatch' })}</span>
      </>
    );

    return result;
  }, [intl, classes]);

  return (
    <Slider
      valueLabelDisplay="auto"
      step={10}
      marks={defaultMarks}
      min={0}
      max={100}
      {...props}
    />
  );
};
