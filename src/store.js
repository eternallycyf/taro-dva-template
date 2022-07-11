import dva from './utils/dva';
import models from './models/index';

const dvaApp = dva.createApp({
  initialState: {},
  models,
});
export const store = dvaApp.getStore();
