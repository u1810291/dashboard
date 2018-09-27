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
      clientId: this.props.clientId,
      element: this.element,
      hideChat: true
    })

    window.addEventListener('message', event => {
      const data = JSON.parse(event.data)
      const index = this.element.dataset.index || 0
      if (this.props.onSuccess && data.action === `mati-signup-${index}::success`) {
        this.props.onSuccess()
      }
    })
  }
  componentDidUpdate(prevProps) {
    // if (
    //   this.props.clientId !== prevProps.clientId ||
    //   this.props.language !== prevProps.language ||
    //   this.props.color !== prevProps.color
    // ) {
      this.renderButton()
    // }
  }

  componentDidMount() {
    this.renderButton()
    window.Mati.on('mati:success', this.props.onSuccess)
  }
  render() {
    return <div className={this.props.className} ref={root => (this.root = root)} />
  }
}
