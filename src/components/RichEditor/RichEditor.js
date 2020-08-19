import React, { useState, useRef, useEffect } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import './RichEditor.scss';
import { Editor } from 'draft-js';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';

export const THREAD = 'NEW_THREAD';
export const REPLY = 'REPLY';
const RichEditor = (props) => {
  const { type, readOnly, content } = props;

  useEffect(() => {
    let initialContent = null;
    if (content) {
      initialContent = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      );
    } else {
      initialContent = EditorState.createEmpty();
    }
    setEditorState(initialContent);
  }, [content]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [contentHasChanged, setContentHasChanged] = useState(false);

  const onChange = (newEditorState) => {
    if (
      editorState.getCurrentContent() !== newEditorState.getCurrentContent()
    ) {
      setContentHasChanged(true);
    }
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(command);
    if (newState) {
      onChange(newState);
    }
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockStyle) => {
    onChange(RichUtils.toggleBlockType(editorState, blockStyle));
  };

  const editor = useRef(null);
  const focus = () => {
    editor.current.focus();
  };

  const saveContent = () => {
    props.saveContent(
      JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      contentHasChanged
    );
  };

  let styleControls = null;
  if (!readOnly) {
    styleControls = (
      <div className='rich-editor__style-controls'>
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
    );
  }

  let classNames = ['rich-editor'];
  let editorClassNames = ['rich-editor__editor'];
  if (readOnly) {
    classNames.push('rich-editor--read-only');
    editorClassNames.push('rich-editor__editor--read-only');
  }

  let buttonContent = null;
  if (!readOnly) {
    let button = null;
    if (type === THREAD) {
      button = 'Post';
      classNames.push('rich-editor--thread');
    } else if (type === REPLY) {
      button = 'Reply';
      classNames.push('rich-editor--reply');
    }
    buttonContent = (
      <button onClick={saveContent} className='rich-editor__reply'>
        {button}
      </button>
    );
  }

  const styleMap = {
    MONOSPACE: {
      fontFamily: 'monospace',
    },
  };

  const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case 'BLOCKQUOTE':
        return 'blockquote';
      case 'CODE':
        return 'code';
      default:
        return;
    }
  };

  return (
    <div className={classNames.join(' ')}>
      {styleControls}
      <div className={editorClassNames.join(' ')} onClick={focus}>
        <Editor
          editorState={editorState}
          customStyleMap={styleMap}
          blockStyleFn={blockStyleFn}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          placeholder='Type here...'
          ref={editor}
          readOnly={readOnly}
        />
      </div>
      {buttonContent}
    </div>
  );
};

export default RichEditor;
