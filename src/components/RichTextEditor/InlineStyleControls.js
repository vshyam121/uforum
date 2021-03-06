import React from 'react';
import StyleButton from './StyleButton/StyleButton';

const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD',
  },
  {
    label: 'Italic',
    style: 'ITALIC',
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
  },
  {
    label: 'Monospace',
    style: 'MONOSPACE',
  },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className='style-controls'>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
