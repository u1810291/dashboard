import React from 'react'

export class MatiButton extends React.Component {
  componentDidMount() {
    window.Mati.render({
      clientId: '5ae0c3fbb01a23351872ab18',
      element: this.element,
      hideChat: true,
      metadata:  {
        userId: 101150998,
        medio: 'PORTAL',
        token: 6150000227,
        identityId: '5b89d66b1222051ccf956362'
      },
    });
  }
  render() {
    return (
      <div
        className="mati-button"
        data-product="kyc"
        ref={element => this.element = element}
      >
      </div>
    )
  }
}
