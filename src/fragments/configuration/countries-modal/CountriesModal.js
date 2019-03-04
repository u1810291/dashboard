import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'src/components/button/index'
import CSS from './CountriesModal.scss'
import { Modal } from 'src/components/modal'
import MultiSelect from 'src/components/multi-select'

export default function CountriesModal({ supportedCountries, countries, onSubmit }) {

  const [value, setValue] = useState(supportedCountries)

  useEffect(() => {
    setValue(supportedCountries)
  }, [supportedCountries])

  return (
    <Modal className={CSS.countriesModal}>
      <main>
        <h1>
          <FormattedMessage id="flow.countries.modal.title"/>
          <p><FormattedMessage id="flow.countries.modal.description"/></p>
        </h1>
        <MultiSelect
          value={value}
          options={countries}
          onChange={(val) => setValue(val)}
        />
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={() => onSubmit(value)}
        >
          <FormattedMessage id="teamTable.inviteSuccessModal.done" />
        </Button>
      </footer>
    </Modal>
  )
}
