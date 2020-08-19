import React from 'react';
import StyleButton from './StyleButton/StyleButton';

const BLOCK_TYPES = [
  {
    label: 'H1',
    style: 'H1',
  },
  {
    label: 'H2',
    style: 'H2',
  },
  {
    label: 'H3',
    style: 'H3',
  },
  {
    label: 'Blockquote',
    style: 'BLOCKQUOTE',
  },
  {
    label: 'Code Block',
    style: 'CODE',
  },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className='style-controls'>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
