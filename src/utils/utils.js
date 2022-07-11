/**
 * 加
 */
export function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}

export function getQueryVariable(url, variable) {
  let urlArr = url.split('?');
  if (urlArr.length <= 1) {
    return '';
  }
  let str = '';
  for (let i = 1; i < urlArr.length; i++) {
    let vars = urlArr[i].split('&');
    for (let j = 0; j < vars.length; j++) {
      let pair = vars[j].split('=');
      if (pair[0] === variable) {
        str = pair[1];
      }
    }
  }
  return str;
}
/**
 * 减
 */
export function accSub(num1, num2) {
  var baseNum, baseNum1, baseNum2;
  var precision; // 精度
  try {
    baseNum1 = num1.toString().split('.')[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}

/**
 * 乘
 */
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
}

/**
 * 除
 */
export function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * 四舍五入
 * @param   {number}    number
 * @param   {number}    format   Number of digits
 * @param   {boolean}   zeroFill
 */
export function accurateDecimal(number, format, zeroFill) {
  //判断非空
  if (number) {
    //正则匹配:正整数，负整数，正浮点数，负浮点数
    if (!/^\d+(\.\d+)?$|^-\d+(\.\d+)?$/.test(number)) return number;
    let n = 1;
    for (let i = 0; i < format; i++) {
      n = n * 10;
    }

    //四舍五入
    number = Math.round(number * n) / n;
    let str = number.toString();

    //是否补零
    if (zeroFill) {
      let index;
      if (str.indexOf('.') === -1) {
        index = format;
        str += '.';
      } else {
        index = format - (str.length - 1 - str.indexOf('.'));
      }

      for (let i = 0; i < index; i++) {
        str += '0';
      }
    }
    return str;
  }
  return number;
}

export function debounce(fn, delay = 300) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

export function getId() {
  return (~~(Math.random() * (1 << 30))).toString(32);
}

/**
 * 随机生成指定长度的字符串
 * @param length
 * @returns {string}
 */
export function randomString(length = 32) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = chars.length;
  let _string = '';
  for (let i = 0; i < length; i++) {
    _string += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return _string;
}
