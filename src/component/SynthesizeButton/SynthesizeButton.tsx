import { createElement } from 'react';
import Redebounce from 'redebounce';
import Repromised from 'repromised';
import SynthesizeCallerContext from '../SynthesizeCallerContext';
import SpeechButton from '../SpeechButton';
import InEmptyText from './InEmptyText';
import InError from './InError';
import InLoading from './InLoading';

type Props = {
  text: string;
  onSynthesizationStart?: () => void;
  onSynthesizationComplete?: (dataUrl: URL) => void;
  className?: string;
};

const SynthesizeButton = ({ text: _text, onSynthesizationStart, onSynthesizationComplete, className }: Props) => (
  <SynthesizeCallerContext.Consumer>
    {synthesizeCaller => (
      <Redebounce value={_text} dueTime={600}>
        {text =>
          text.trim().length === 0 ? (
            <InEmptyText className={className} />
          ) : (
            <Repromised
              promise={() => synthesizeCaller.synthesize(text)}
              initial={null as any}
              beforeResolve={onSynthesizationStart}
              then={onSynthesizationComplete}
              key={text}
            >
              {(dataUrl, isLoading) =>
                isLoading ? (
                  <InLoading className={className} />
                ) : dataUrl === null ? (
                  <InError className={className} />
                ) : (
                  <SpeechButton src={dataUrl} className={className} />
                )
              }
            </Repromised>
          )
        }
      </Redebounce>
    )}
  </SynthesizeCallerContext.Consumer>
);

export default SynthesizeButton;
