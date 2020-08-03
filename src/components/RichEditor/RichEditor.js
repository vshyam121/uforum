import React, { useRef } from 'react';
import './RichEditor.scss';
import { Editor } from 'draft-js';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';

const RichEditor = (props) => {
  const editor = useRef(null);
  const focus = () => {
    editor.current.focus();
  };

  return (
    <div className='rich-editor'>
      <div className='rich-editor__style-controls'>
        <InlineStyleControls
          editorState={props.editorState}
          onToggle={props.toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={props.editorState}
          onToggle={props.toggleBlockType}
        />
      </div>
      <div className='rich-editor__editor' onClick={focus}>
        <Editor
          editorState={props.editorState}
          handleKeyCommand={props.handleKeyCommand}
          onTab={props.onTab}
          onChange={props.onChange}
          placeholder='Type here...'
          ref={editor}
        />
      </div>
      <button className='rich-editor__reply'>Reply</button>
    </div>
  );
};

export default RichEditor;
