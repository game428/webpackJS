const tool = {
  uniq,
  getPageSize,
  sort,
  uuid,
};

// 数组去重
function uniq(array, key) {
  let newArr = [];
  let repeatArr = [];
  let set = new Set();
  array.forEach(item => {
    if (set.has(item[key])) return;
    set.add(item[key]);
    newArr.push(item);
  });
  return {
    newArr,
    repeatArr,
  };
}

// 按时间排序
function sort(array, key) {
  let newArr = array.sort((pre, next) => {
    return next[key] - pre[key];
  })
  return newArr;
}

// 获取分页
function getPageSize(val, key, arr) {
  if (!val) return arr;
  if (!arr || arr.length === 0) return [];
  let index = arr.findIndex(item => item[key] === val);
  return arr.slice(index + 1);
}

// 生成uuid
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}

export default tool;