import React, { useReducer } from 'react';
import { mount } from 'enzyme';
import { DataPipelinesContext } from 'components/views/PipelinesExecutionView/DataPipelineHooks/DataPipelinesProvider';
import DataPipelinesReducer, { initialState } from 'components/views/PipelinesExecutionView/DataPipelineHooks/DataPipelinesReducer';
import DataOperationFilters from 'components/views/PipelinesExecutionView/ProcessorFilters';
import { OPERATION } from 'dataTypes';
import { mockedOperations } from 'testData';

const MockProvider = (props = {}) => {
  const contextValue = useReducer(
    DataPipelinesReducer, {
      ...initialState, ...props,
    },
  );

  return (
    <DataPipelinesContext.Provider value={contextValue}>
      <DataOperationFilters namespace="mlreef" operationTypeToExecute={OPERATION.toLowerCase()} />
    </DataPipelinesContext.Provider>
  );
};

const setup = () => mount(
  <MockProvider />,
);

describe('test initial loading of HTML elements', () => {
  let requesUrl = '';
  let wrapper;
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((request) => new Promise((resolve) => {
      requesUrl = request.url;
      resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockedOperations),
      });
    }));
    wrapper = setup();
  });

  test('assert that initial call is triggered', () => {
    expect(requesUrl.includes('/api/v1/explore/entries/search?searchable_type=OPERATION')).toBe(true);
  });

  test('assert that hide/show toggle button works', () => {
    expect(wrapper.find('a').props().href).toBe('/new-project/classification/data-operation');
    expect(wrapper.find('button.data-operations-filters-show-filters-btn').length).toBe(1);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
});

describe('test functionality', () => {
  let wrapper;
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => new Promise((resolve) => {
      resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockedOperations),
      });
    }));
    wrapper = setup();
  });
  test('assert that hide/show toggle button and only starred checkbox work', () => {
    wrapper.find('button.data-operations-filters-show-filters-btn').simulate('click');

    expect(wrapper.find('MCheckBox[name="own-data-operators"]').length).toBe(1);
    expect(wrapper.find('MCheckBox[name="only-starred-operators"]').length).toBe(1);
    expect(wrapper.find('MCheckBoxGroup').length).toBe(1);

    wrapper.find('MCheckBox[name="only-starred-operators"]').simulate('click');
    const numberOfStarsInput = wrapper.find('input#min-stars-input');

    expect(numberOfStarsInput.length).toBe(1);
    numberOfStarsInput.simulate('change', { target: { value: '2' } });
    expect(global.fetch.mock.calls.length).toBeGreaterThan(2);
    const body = JSON.parse(global.fetch.mock.calls[2][0]._bodyInit);
    expect(body.min_stars).toBe('2');
  });
});