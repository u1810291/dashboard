import React from 'react';

export interface OverlayOptions {
  onClose?: () => void; // this onClose will be called when you click on the overlay around the modal
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
