import React from 'react'

export class MatiButton extends React.Component {
  componentDidMount() {
    window.Mati.init({
      clientId: '5b50cd531a76d77ba81818e2',
    })
  }
  render() {
    return (
      <div
        className="mati-button"
        data-product="kyc"
      ></div>
    )
  }
}
