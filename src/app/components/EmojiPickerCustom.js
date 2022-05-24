import React, { useEffect, useRef } from 'react';

import data from '@emoji-mart/data';
import { Picker, EmojiData } from 'emoji-mart';

function EmojiPickerCustom(props) {
  const ref = useRef();
  
  useEffect(() => {
    new Picker({ ...props, data, ref, emojiSize: 20, sheetSize: 16, showPreview: false });

    // Tinh chỉnh css để bỏ cái review emoji
    let customElem = document.querySelector('em-emoji-picker');
    let shadow = customElem.shadowRoot;
    let css = shadow.children[0].innerHTML;
    //shadow.children[0].innerHTML = css + `#preview{display: none}`;
    
    return () => {

    }
  }, [])

  return <div className='emoji-picker' ref={ref} />;
}


export default EmojiPickerCustom;