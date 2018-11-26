import React from 'react'
import {
  WEBHOOK_RESPONSE,
  WEBHOOK_RESPONSE_WATCHLISTS,
  WEBHOOK_RESPONSE_FACEMATCH,
  WEBHOOK_RESPONSE_LIVENESS,
  WEBHOOK_RESPONSE_OCR
} from './webhook-response-examples'
import Icons from 'src/components/icons'

const printJSON = json => JSON.stringify(json, null, 2)

const WEBHOOK_RESPONSE_STRING = printJSON(WEBHOOK_RESPONSE)

export default [
  {
    label: 'global_watchlist',
    icon: <Icons.Spy />,
    webhooks: [
      {
        label: 'developers.webhook.example.user.verified',
        response: WEBHOOK_RESPONSE_STRING
      },
      {
        label: 'developers.webhook.example.user.found.watchlist',
        highlightedLines: [10, 11, 12, 13, 14],
        response: printJSON(WEBHOOK_RESPONSE_WATCHLISTS)
      }
    ]
  },
  {
    label: 'face_match',
    icon: <Icons.FaceMatch />,
    webhooks: [
      {
        label: 'developers.webhook.example.user.verified',
        response: WEBHOOK_RESPONSE_STRING
      },
      {
        label: 'developers.webhook.example.user.invalid.facematch',
        highlightedLines: [13],
        response: printJSON(WEBHOOK_RESPONSE_FACEMATCH)
      }
    ]
  },
  {
    label: 'liveness',
    icon: <Icons.TickFilled />,
    webhooks: [
      {
        label: 'developers.webhook.example.user.verified',
        response: WEBHOOK_RESPONSE_STRING
      },
      {
        label: 'developers.webhook.example.user.invalid.liveness',
        highlightedLines: [3],
        response: printJSON(WEBHOOK_RESPONSE_LIVENESS)
      }
    ]
  },
  {
    label: 'ocr_data',
    icon: <Icons.WarningTriangle />,
    webhooks: [
      {
        label: 'developers.webhook.example.user.verified',
        response: WEBHOOK_RESPONSE_STRING
      },
      {
        label: 'developers.webhook.example.user.invalid.ocr',
        highlightedLines: [13, 15, 17, 18],
        response: printJSON(WEBHOOK_RESPONSE_OCR)
      }
    ]
  }
]
