import { FormGroup, InputGroup } from '@blueprintjs/core';
import { ChangeEvent, createElement, Fragment } from 'react';
import Redebounce from 'redebounce';
import Repromised from 'repromised';
import { Subscribe as SubscribeState } from 'unstated';
import ImageSearch from '../../state/ImageSearch';
import NoteCreation from '../../state/NoteCreation';
import Do from '../Do';
import ImageSearchCallerContext from '../ImageSearchCallerContext';
import ImageSelector from '../ImageSelector';

type Props = {
  className?: string;
};

const ImageSelectorField = ({ className }: Props) => (
  <ImageSearchCallerContext.Consumer>
    {imageSearchCaller => (
      <Fragment>
        <SubscribeState to={[ImageSearch, NoteCreation]}>
          {(imageSearch: ImageSearch, noteCreation: NoteCreation) => (
            <Redebounce value={noteCreation.state.phrase} dueTime={600}>
              {phrase => (
                <Fragment>
                  <FormGroup
                    label="Related Image"
                    helperText="Select the related image so you can remember the phrase easily."
                    labelFor="image-search-input-field"
                    labelInfo="(required)"
                    className={className}
                  >
                    <InputGroup
                      id="image-search-input-field"
                      placeholder="Search ..."
                      onChange={(e: ChangeEvent<HTMLInputElement>) => imageSearch.setQuery(e.currentTarget.value)}
                      defaultValue={phrase}
                      key={`${phrase}#${noteCreation.state.sessionId}`}
                    />
                  </FormGroup>

                  <Do onMount={() => imageSearch.setQuery(phrase)} key={`${phrase}#${noteCreation.state.sessionId}`} />
                </Fragment>
              )}
            </Redebounce>
          )}
        </SubscribeState>

        <SubscribeState to={[ImageSearch, NoteCreation]}>
          {(imageSearch: ImageSearch, noteCreation: NoteCreation) => (
            <Redebounce value={imageSearch.state.query} dueTime={600}>
              {query => (
                <Repromised promise={() => imageSearchCaller.searchImages(query)} initial={[]} key={query}>
                  {imageUrls => (
                    <ImageSelector
                      imageSrcs={imageUrls}
                      onChange={src => noteCreation.setImageUrl(src)}
                      className={className}
                    />
                  )}
                </Repromised>
              )}
            </Redebounce>
          )}
        </SubscribeState>
      </Fragment>
    )}
  </ImageSearchCallerContext.Consumer>
);

export default ImageSelectorField;
