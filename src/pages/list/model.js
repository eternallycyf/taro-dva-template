import * as service from "./service";
import Taro from "@tarojs/taro";

export default {
  namespace: "virtualList",
  state: {
    list: [],
    page: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload: { page } }, { put, call, select }) {
      const { list } = yield select((state) => state.virtualList);
      const {
        data: { records = [], total },
      } = yield call(service.getList, { page, pageSize: 10 });
      yield put({
        type: "save",
        payload: {
          list: [...list, ...records],
          page,
          total,
        },
      });
      return records.length == 0 ? false : true
    },
  },
};
