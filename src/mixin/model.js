import * as service from './service';

export default {
  namespace: 'index',
  state: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *postGoodsJsapi({ payload: { postData } }, { put, call, select }) {
      let { data } = yield call(service.postGoodsJsapi, postData);

      return {
        ...data,
      };
    },
    *postJsapi({ payload: { postData } }, { put, call, select }) {
      let { data } = yield call(service.postJsapi, postData);

      return {
        ...data,
      };
    },
  },
};
