import React from 'react';

export interface OverlayOptions {
  onClose?: () => void;
  sticky?: boolean;
  additionalClasses?: string[];
}

export interface OverlayI {
  withBlur?: boolean;
  inline?: boolean;
  onClose?: () => void;
  options?: OverlayOptions;
  children: React.ReactNode;
}
