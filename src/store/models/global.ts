import { createModel } from '@rematch/core';
import { RootModel } from '.';

export interface GlobalModel { }

export let globalState = {};

const global = createModel<RootModel>()({
  state: globalState,
  reducers: {
    set(state: GlobalModel, payload: Partial<GlobalModel>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: () => ({}),
});

export default global;
