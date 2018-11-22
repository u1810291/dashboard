import React from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { cssVariable } from 'src/lib/dom'
import { ChartTooltipContainer } from './chart-tooltip'
import './style.css'

const BASE_SPACING = 15

const GRAPH_COLORS = {
  PRIMARY: cssVariable('--mgi-theme-color-graph-primary'),
  PRIMARY_TRANSPARENT: cssVariable('--mgi-theme-color-graph-primary-transparent')
}

const GRAPH_FONT_SIZE = cssVariable('--mgi-theme-color-graph-font-size')

const GRAPH_DOT_CONFIG = {
  r: 5,
  stroke: GRAPH_COLORS.PRIMARY,
  strokeWidth: 3,
  fill: 'white',
  fillOpacity: 1
}

const GRAPH_DOT_CONFIG_ACTIVE = Object.assign({}, GRAPH_DOT_CONFIG, {
  fill: GRAPH_COLORS.PRIMARY
})

export default ({
  className,
  data = [],
  tooltipContent,
  labelField = 'label',
  valueField = 'value',
  height = 240
}) => {
  return (
    <ResponsiveContainer className={className} height={height} width="100%">
      <AreaChart data={data}>
        <XAxis
          dataKey={labelField}
          tick={{ fontSize: GRAPH_FONT_SIZE }}
          tickSize={9}
          tickLine={false}
          padding={{ left: BASE_SPACING * 2, right: BASE_SPACING * 2 }}
        />
        <YAxis
          domain={[0, dataMax => (dataMax * 1.5).toFixed(0) || 500]}
          dataKey={valueField}
          tick={{ fontSize: GRAPH_FONT_SIZE }}
          tickLine={false}
          padding={{ top: BASE_SPACING }}
        />
        <CartesianGrid horizontal={false} strokeDasharray="2 2" />
        <Tooltip
          content={
            <ChartTooltipContainer>{tooltipContent}</ChartTooltipContainer>
          }
        />
        <Area
          animationDuration={1500}
          type="monotone"
          legendType="circle"
          dot={GRAPH_DOT_CONFIG}
          activeDot={GRAPH_DOT_CONFIG_ACTIVE}
          dataKey={valueField}
          stroke={GRAPH_COLORS.PRIMARY}
          strokeWidth="3"
          fill={GRAPH_COLORS.PRIMARY_TRANSPARENT}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
