import React from 'react';
import {
  Click,
} from 'components';

import { FaRegQuestionCircle as QuestionMarkIcon } from 'react-icons/fa';
import CSS from './QuestionMark.module.scss';

const QuestionMark = ({
  onClick,
}) => (
  <Click padding="0" onClick={onClick} className={CSS.iconBox}>
    <QuestionMarkIcon />
  </Click>
);

export default QuestionMark;
