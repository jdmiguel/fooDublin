import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';

import Autocomplete from '../Autocomplete';

import { AUTOCOMPLETE_PROPS_MOCK } from '../__mocks__/autocomplete.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Autocomplete', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show suggestions list with a search of 3 characters and call callback function', () => {
    const handleFetchSuggestion = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      renderWithTheme(
        <Autocomplete
          {...AUTOCOMPLETE_PROPS_MOCK}
          fetchSuggestions={handleFetchSuggestion}
        />,
      ),
    );
    const listboxWrapper = getByTestId('listbox-wrapper');

    // check if suggestions list is not showed
    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');

    // text 3 characters, check if suggestions list is showed and call callback function
    fireEvent.change(getByPlaceholderText('Search for locals...'), {
      target: { value: 'tre' },
    });

    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');
    expect(handleFetchSuggestion).toHaveBeenCalledTimes(1);
  });

  it('should show/hide suggestions list', () => {
    const { getByTestId, getByPlaceholderText } = render(
      renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} />),
    );
    const listboxWrapper = getByTestId('listbox-wrapper');
    const input = getByPlaceholderText('Search for locals...');

    // show suggestions list by texting three characters
    fireEvent.change(input, { target: { value: 'tre' } });

    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');

    // hide suggestions list by activating blur event
    fireEvent.blur(input);

    // show suggestions list by activating focus event
    fireEvent.focus(input);

    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');

    // hide suggestions list by texting two characters
    fireEvent.change(input, { target: { value: 'tr' } });

    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');
  });
});
