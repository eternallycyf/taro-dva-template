import * as service from './service';

export default {
  namespace: 'index',
  state: {
    count: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *add(_, { put, select }) {
      let { count } = yield select((state) => state.index);
      yield put({
        type: 'save',
        payload: { count: count + 1 },
      });
    },
    *subsub(_, { put, select }) {
      let { count } = yield select((state) => state.index);
      yield put({
        type: 'save',
        payload: { count: count - 1 },
      });
    },
    *fetchDemo(_, { put, call }) {
      let data = yield call(service.useInfo, { a: 123 });
      yield put({
        type: 'save',
        payload: { info: data },
      });
    },
  },
};
