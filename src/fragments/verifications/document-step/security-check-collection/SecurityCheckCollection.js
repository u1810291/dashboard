import React from 'react'
import Items from 'components/items'
import SecurityCheckStep from '../security-check-step'
import Spinner from 'components/spinner'

export default function SecurityCheckCollection({ steps = [] }) {
  const done = steps.filter(step => step.status === 200)
  const inProgress = steps.filter(step => step.status !== 200)
  return (
    <Items gap={0} flow="row" className="text-secondary">
      {done.map(step => (
        <SecurityCheckStep id={step.id} error={step.error} key={step.id} />
      ))}
      {inProgress.length > 0 && <Spinner />}
    </Items>
  )
}
