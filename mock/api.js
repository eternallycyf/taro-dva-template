const waitTime = (timer = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timer);
  });
};


export default {
  'GET /api/user/1': {
    success: true,
    msg: '',
    data: {
      id: 1,
      userName: 'admin123',
      nick: null,
      token: 'GQ#DPM#28005216956844048e2806ae39bcc223',
      menu: null,
      useStatus: null,
    },
    code: 200,
  },
  "GET /api/list": async (req, res) => {
    const handleData = () => {
      if (req.query.page == 1) {
        return {
          current: 1,
          records: [
            {
              title: "标题1",
              content: "描述信息1",
            },
            {
              title: "标题2",
              content: "描述信息2",
            },
            {
              title: "标题3",
              content: "描述信息3",
            },
            {
              title: "标题4",
              content: "描述信息4",
            },
            {
              title: "标题5",
              content: "描述信息5",
            },
            {
              title: "标题6",
              content: "描述信息6",
            },
            {
              title: "标题7",
              content: "描述信息7",
            },
            {
              title: "标题8",
              content: "描述信息8",
            },
            {
              title: "标题9",
              content: "描述信息9",
            },
            {
              title: "标题10",
              content: "描述信息10",
            },
          ],
          size: 10,
          total: 22,
        };
      }
      if (req.query.page == 2) {
        return {
          current: 2,
          records: [
            {
              title: "标题11",
              content: "描述信息11",
            },
            {
              title: "标题12",
              content: "描述信息12",
            },
            {
              title: "标题13",
              content: "描述信息13",
            },
            {
              title: "标题14",
              content: "描述信息14",
            },
            {
              title: "标题15",
              content: "描述信息15",
            },
            {
              title: "标题16",
              content: "描述信息16",
            },
            {
              title: "标题17",
              content: "描述信息17",
            },
            {
              title: "标题18",
              content: "描述信息18",
            },
            {
              title: "标题19",
              content: "描述信息19",
            },
            {
              title: "标题20",
              content: "描述信息20",
            },
          ],
          size: 10,
          total: 22,
        };
      }
      if (req.query.page == 3) {
        return {
          current: 3,
          records: [
            {
              title: "标题21",
              content: "描述信息21",
            },
            {
              title: "标题22",
              content: "描述信息22",
            },
          ],
          size: 10,
          total: 22,
        };
      }
      return {
        current: 3,
        records: [],
        size: 10,
        total: 22,
      }
    };
    await waitTime(3000);
    res.send({
      code: 200,
      // data: {
      //   current: 1,
      //   records: [],
      //   size: 10,
      //   total: 0,
      // },
      data: handleData(),
      message: "返回成功",
      success: true,
    });
  },
}