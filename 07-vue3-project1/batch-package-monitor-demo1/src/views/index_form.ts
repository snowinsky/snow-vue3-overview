import dayjs from "dayjs";

export const SEARCH_FORM = {
    init: {
        channel: "All",
        ddGroup: ['All'],
        date: dayjs(),
        status: "All" //-100
    },
    els: [
        {
            dataIndex: "date",
            title: "日期",
            type: "picker",
            limit: 6,
            future: true //未来是否可选 false:禁用未来日期 true:可以选择
        },
        {
            dataIndex: "ddGroup", //All/R/C-LOXON/C-ONLINE PTP/MPF/MC/MS
            title: "类别",
            type: "select",
            style: "min-width:150px",
            multiple: "multiple",
            all: "All",
            options: []
        },
        {
            dataIndex: "channel",
            title: "渠道",
            type: "select",
            style: "min-width:180px",
            options: []
        },
        {
            dataIndex: "status", //待装箱,装箱中,停止装箱,装箱完成
            title: "状态",
            type: "select",
            style: "width:160px",
            options: []
        },
        {
            dataIndex: "submit",
            label: "搜索",
            type: "button",
            emit: "search"
        }
    ]
};