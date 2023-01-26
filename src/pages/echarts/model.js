// import * as service from './service';

export default {
  namespace: 'echarts',
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
