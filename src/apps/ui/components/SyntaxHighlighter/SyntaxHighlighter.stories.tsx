import { StorybookRoutes } from 'models/Storybook.model';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SyntaxHighlighterLanguages } from '../../models/SyntaxHighlighter.model';
import { SyntaxHighlighter } from './SyntaxHighlighter';

export default {
  title: `${StorybookRoutes.UI.root}/SyntaxHighlighter`,
  component: SyntaxHighlighter,
} as ComponentMeta<typeof SyntaxHighlighter>;

const Template: ComponentStory<typeof SyntaxHighlighter> = (args) => <SyntaxHighlighter {...args} />;

export const Light = Template.bind({});

// eslint-disable-next-line no-useless-concat
const codeSample = '{\n' + '  code = \'\',\n' + '  language,\n' + '  isCopyToClipboard = true,\n' + '  isBorder = true,\n' + '  isDarkTheme = false,\n' + '  isLightYellowTheme = false,\n' + '  isLightBlueTheme = false,\n' + '  qa = {}, // should have `Value` and `Copy` fields\n' + '  className = \'\',\n' + '  withCopyText = false,\n' + '  showLineNumbers = false,\n' + '}';

Light.args = {
  code: codeSample,
  language: SyntaxHighlighterLanguages.JavaScript,
  withCopyText: true,
  isLightYellowTheme: true,
};

export const Detailed = Template.bind({});

// eslint-disable-next-line no-useless-concat
const longCodeSample = '{\n' + '  "documents": [],\n' + '  "expired": false,\n' + '  "flow": {\n' + '    "id": "627501a2d3058f001b6b3b0d",\n' + '    "name": "Phone Verification (preview)"\n' + '  },\n' + '  "identity": {\n' + '    "status": "verified"\n' + '  },\n' + '  "steps": [\n' + '    {\n' + '      "status": 200,\n' + '      "id": "email-ownership-validation",\n' + '      "error": {\n' + '        "type": "StepError",\n' + '        "code": "emailOwnership.skipped",\n' + '        "message": "User skipped this step"\n' + '      }\n' + '    },\n' + '    {\n' + '      "status": 200,\n' + '      "id": "email-risk-validation",\n' + '      "error": {\n' + '        "type": "StepError",\n' + '        "code": "emailRisk.skipped",\n' + '        "message": "User skipped this step"\n' + '      }\n' + '    },\n' + '    {\n' + '      "status": 200,\n' + '      "id": "phone-ownership-validation",\n' + '      "error": {\n' + '        "type": "StepError",\n' + '        "code": "phoneOwnership.skipped",\n' + '        "message": "User skipped this step"\n' + '      }\n' + '    },\n' + '    {\n' + '      "status": 200,\n' + '      "id": "phone-risk-analysis-validation",\n' + '      "error": {\n' + '        "type": "StepError",\n' + '        "code": "phoneRisk.skipped",\n' + '        "message": "User skipped this step"\n' + '      }\n' + '    }\n' + '  ],\n' + '  "id": "62864e7084461d001cf19522",\n' + '  "deviceFingerprint": {\n' + '    "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",\n' + '    "browser": {\n' + '      "name": "Chrome",\n' + '      "version": "101.0.4951.64",\n' + '      "major": "101"\n' + '    },\n' + '    "engine": {\n' + '      "name": "Blink",\n' + '      "version": "101.0.4951.64"\n' + '    },\n' + '    "os": {\n' + '      "name": "Mac OS",\n' + '      "version": "10.15.7"\n' + '    },\n' + '    "app": {\n' + '      "platform": "web_desktop",\n' + '      "version": "22.2.10"\n' + '    },\n' + '    "ip": "77.137.65.127",\n' + '    "vpnDetectionEnabled": false\n' + '  },\n' + '  "hasProblem": false\n' + '}';

Detailed.args = {
  code: longCodeSample,
  language: SyntaxHighlighterLanguages.JavaScript,
  withCopyText: true,
  isDarkTheme: true,
  showLineNumbers: true,
};
