import React from 'react';
import './sentence-wrapper.scss';

interface ISentenceWrapperProps {
  sentence: string,
  classCss: string,
  openTag: '<b>' | '<i>',
  closeTag: '</b>' | '</i>',
}

const SentenceWrapper: React.FC<ISentenceWrapperProps> = (props: ISentenceWrapperProps) => {
  const {
    sentence, classCss, openTag, closeTag,
  } = props;
  const pos1: number = sentence.indexOf(openTag);
  const pos2: number = sentence.indexOf(closeTag);
  if (pos1 === -1 || pos2 === 2) {
    return <p className={classCss}>{sentence}</p>;
  }
  if (openTag === '<b>' && closeTag === '</b>') {
    return (
      <p className={classCss}>
        {sentence.slice(0, pos1)}
        <b>
          {sentence.slice(pos1 + 3, pos2)}
        </b>
        {sentence.slice(pos2 + 4)}
      </p>
    );
  }
  if (openTag === '<i>' && closeTag === '</i>') {
    return (
      <p className={classCss}>
        {sentence.slice(0, pos1)}
        <i>
          {sentence.slice(pos1 + 3, pos2)}
        </i>
        {sentence.slice(pos2 + 4)}
      </p>
    );
  }
  return <p className={classCss}>{sentence}</p>;
};

export default SentenceWrapper;
