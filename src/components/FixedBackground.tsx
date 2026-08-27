import React from 'react';

export const FixedBackground: React.FC = () => {
  return (
    <div
      id="odyssey-fixed-background-root"
      aria-hidden="true"
      className="fixed-background"
    >
      <div className="fixed-background__layer fixed-background__layer--one" />
      <div className="fixed-background__layer fixed-background__layer--two" />
      <div className="fixed-background__layer fixed-background__layer--three" />

      <div className="fixed-background__vignette fixed-background__vignette--top" />
      <div className="fixed-background__vignette fixed-background__vignette--bottom" />
      <div className="fixed-background__vignette fixed-background__vignette--left" />
      <div className="fixed-background__vignette fixed-background__vignette--right" />
    </div>
  );
};
