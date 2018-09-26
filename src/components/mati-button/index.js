import React from 'react'

const languagesMap = {
  en: 'us',
  es: 'mx',
  fr: 'fr',
  pt: 'pt'
}

export class MatiButton extends React.Component {
  renderButton() {
    if (this.element) {
      const index = this.element.dataset.index
      const iframe = document.querySelector(`iframe#mati-iframe-${index}`)
      if (iframe) iframe.remove()
      this.element.remove()
    }
    this.element = document.createElement('div')
    this.element.dataset.country = languagesMap[this.props.language]
    this.element.dataset.style = this.props.color
    this.element.dataset.product = 'kyc'
    this.root.appendChild(this.element)

    window.Mati.render({
      clientId: '5baa92f04771685a2673e90c',
      element: this.element,
      hideChat: true
    })
  }
  componentDidUpdate() {
    this.renderButton()
  }

  componentDidMount() {
    this.renderButton()
  }
  render() {
    return <div ref={root => this.root = root}></div>
  }
}
