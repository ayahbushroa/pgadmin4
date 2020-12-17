import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import gettext from 'sources/gettext';

export default function FloatingNote({open, onClose, reference, rows, noteNode, ...tippyProps}) {
  const textRef = React.useRef(null);
  const [text, setText] = useState('');
  const [header, setHeader] = useState('');
  useEffect(()=>{
    if(noteNode) {
      setText(noteNode.getNote());
      let [schema, name] = noteNode.getSchemaTableName();
      setHeader(`${name} (${schema})`);
    }

    if(open) {
      textRef?.current.focus();
      textRef?.current.dispatchEvent(new KeyboardEvent('keypress'));
    }
  }, [noteNode, open]);

  return (
    <Tippy render={(attrs)=>(
      <div className="floating-note" {...attrs}>
        <div className="note-header">{gettext('Note')}:</div>
        <div className="note-body">
          <div className="p-1">{header}</div>
          <textarea ref={textRef} className="pg-textarea" value={text} rows={rows} onChange={(e)=>setText(e.target.value)}></textarea>
          <div className="pg_buttons">
            <button className="btn btn-primary long_text_editor pg-alertify-button" data-label="OK"
              onClick={()=>{
                let updated = (noteNode.getNote() != text);
                noteNode.setNote(text);
                if(onClose) onClose(updated);
              }}>
              <span className="fa fa-check pg-alertify-button"></span>&nbsp;{gettext('OK')}
            </button>
          </div>
        </div>
      </div>
      )}
      visible={open}
      interactive={true}
      animation={false}
      reference={reference}
      placement='auto-end'
      {...tippyProps}
    />
  );
}