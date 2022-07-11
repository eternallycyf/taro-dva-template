// 支付
import Taro from '@tarojs/taro';

const toPay = async ({
  authorization,
  dispatch,
  api,
  postData,
  success,
  err,
  abnormal,
}) => {
  if (!authorization) {
    Taro.navigateTo({
      url: `/pages/login/index`,
    });
    abnormal();
    return;
  }

  const paymentData = await dispatch({
    type: api,
    payload: {
      postData,
    },
  });
  const { code = '', msg = '' } = paymentData;
  if (code == '50034') {
    Taro.showToast({
      title: msg || '系统错误',
      icon: 'none',
      duration: 2000,
    });
    abnormal();
    return;
  }

  Taro.requestPayment({
    ...paymentData,
    success: function () {
      success(paymentData);
    },
    fail: function () {
      err(paymentData);
    },
    complete: function () {},
  });
};

export { toPay };
