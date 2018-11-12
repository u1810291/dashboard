import React from 'react'
import classNames from 'classnames'
import Card from 'src/components/card'
import CSS from './CardExpandable.css'
import Carret from './carret.svg'

export class CardExpandable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      details: null
    }
  }

  handleExpand = async () => {
    if (this.state.expanded) {
      this.setState({ expanded: false })
    } else {
      this.setState({ expanded: true, details: await this.props.details() })
    }
  }

  render() {
    return (
      <Card className={CSS.card}>
        <div className={CSS.cardInfo} onClick={this.handleExpand}>
          <div className={CSS.carret}>
            <Carret />
          </div>
          {this.props.info}
        </div>
        <div hidden={!this.state.expanded}>{this.state.details}</div>
      </Card>
    )
  }
}

CardExpandable.Detail = ({ className, legend, children, secondarySection = false }) => (
  <div
    className={classNames(CSS.details, className, {
      'secondary-section': secondarySection
    })}
  >
    {legend && (
      <div className={classNames(CSS.legend, 'text-secondary text-caption')}>
        <span>{legend}</span>
      </div>
    )}
    {children}
  </div>
)
