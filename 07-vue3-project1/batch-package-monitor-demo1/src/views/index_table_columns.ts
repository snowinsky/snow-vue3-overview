import { sortItem, sortByValue, sortByAscII } from "../utils/table";

const WAITPACKAGE_COLUMNS = [
  //300
  {
    title: "渠道",
    dataIndex: "vendorCode",
    sorter: (a, b) => sortByAscII(a.vendorCode, b.vendorCode),
    width: 200
  },
  {
    title: "待装箱条数",
    dataIndex: "ddRequestsWaitToPackage",
    sorter: (a, b) =>
      sortByValue(a.ddRequestsWaitToPackage, b.ddRequestsWaitToPackage)
  }
].map(sortItem);

const PACKAGE_COLUMNS = [
  //1500
  {
    title: "渠道",
    dataIndex: "vendorCode",
    sorter: (a, b) => sortByAscII(a.vendorCode, b.vendorCode),
    fixed: "left",
    width: 100
  },
  {
    title: "箱子编号",
    dataIndex: "packageId",
    sorter: (a, b) => sortByValue(a.packageId, b.packageId),
    width: 200
  },
  {
    title: "装箱开始时间",
    dataIndex: "packageStartTime",
    sorter: (a, b) => sortByAscII(a.packageStartTime, b.packageStartTime),
    width: 200
  },
  {
    title: "状态更新时间",
    dataIndex: "packageLastUpdateTime",
    sorter: (a, b) =>
      sortByAscII(a.packageLastUpdateTime, b.packageLastUpdateTime),
    width: 200
  },
  {
    title: "状态",
    dataIndex: "packageStatus",
    customRender: ({ text, record, index }) => text.longDesc,
    sorter: (a, b) =>
      sortByAscII(a.packageStatus.longDesc, b.packageStatus.longDesc),
    width: 200
  },
  {
    title: "装箱条数",
    dataIndex: "volumeInPackage",
    sorter: (a, b) => sortByValue(a.volumeInPackage, b.volumeInPackage),
    width: 200
  },
  {
    title: "装箱率",
    dataIndex: "fillPackageRate",
    sorter: (a, b) => sortByAscII(a.fillPackageRate, b.fillPackageRate),
    width: 200
  },
  {
    title: "操作员",
    dataIndex: "editor",
    sorter: (a, b) => sortByAscII(a.editor, b.editor),
    width: 200
  },
  {
    title: "操作",
    key: "operation",
    emit: true,
    fixed: "right"
  }
].map(sortItem);

const UNPACKAGE_COLUMNS = [
  //950
  {
    title: "渠道",
    dataIndex: "channel",
    sorter: (a, b) => sortByAscII(a.channel, b.channel),
    fixed: "left",
    width: 200
  },
  {
    title: "类别",
    dataIndex: "ddGroup",
    sorter: (a, b) => sortByAscII(a.ddGroup, b.ddGroup),
    width: 150
  },
  {
    title: "最早收到时间",
    dataIndex: "earliestReceiveTime",
    sorter: (a, b) => sortByAscII(a.earliestReceiveTime, b.earliestReceiveTime),
    width: 200
  },
  {
    title: "最晚收到时间",
    dataIndex: "latestReceiveTime",
    sorter: (a, b) => sortByAscII(a.latestReceiveTime, b.latestReceiveTime),
    width: 200
  },
  {
    title: "状态",
    dataIndex: "packageStatus",
    customRender: ({ text, record, index }) => text.longDesc,
    sorter: (a, b) =>
      sortByAscII(a.packageStatus.longDesc, b.packageStatus.longDesc),
    width: 250
  },
  {
    title: "条数",
    dataIndex: "count",
    sorter: (a, b) => sortByValue(a.count, b.count)
  }
].map(sortItem);

export { WAITPACKAGE_COLUMNS, PACKAGE_COLUMNS, UNPACKAGE_COLUMNS };
