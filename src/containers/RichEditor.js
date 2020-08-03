import React, { useState } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import RichEditor from '../components/RichEditor/RichEditor';

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(command);
    if (newState) {
      onChange(newState);
    }
  };

  const onTab = (e) => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockStyle) => {
    onChange(RichUtils.toggleBlockType(editorState, blockStyle));
  };

  return (
    <RichEditor
      editorState={editorState}
      onChange={onChange}
      handleKeyCommand={handleKeyCommand}
      onTab={onTab}
      toggleInlineStyle={toggleInlineStyle}
      toggleBlockType={toggleBlockType}
    />
  );
};

export default TextEditor;
