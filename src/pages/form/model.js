// import * as service from './service';

export default {
  namespace: 'form',
  state: {
    count: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
};
