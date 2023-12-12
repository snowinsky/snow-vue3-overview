<script setup lang="ts">
import {reactive, ref} from "vue";
import {SEARCH_FORM} from './index_form'
import {deepClone} from "../utils/clone";
import AssembleForm from "../components/assemble-form.vue";
import ResizeTable from "../components/resize-table.vue";
import Assess from "../components/access.vue";
import http from "../utils/http";
import {PACKAGE_COLUMNS, UNPACKAGE_COLUMNS, WAITPACKAGE_COLUMNS} from "./index_table_columns";
import {setRowKey, setCustomRow, setRowClass, addRowKey} from "../utils/table"
import {InboxOutlined, DownloadOutlined} from "@ant-design/icons-vue";
import {Modal} from "ant-design-vue";


//初始化查询条件 start
const search = reactive(deepClone(SEARCH_FORM));

function initSearchInit() {
  http.get("https://jetpay-package-monitor-ws-api.uat.hccn:443/api/v1/package/monitor/init/channel")
      .then(res => {
        if (http.isSuccess(res)) {
          search.els.filter(a => a.dataIndex == 'channel').at(0).options = res.data?.map(v => {
            return {label: v, value: v}
          });
        }
      });
  http.get("https://jetpay-package-monitor-ws-api.uat.hccn:443/api/v1/package/monitor/init/ddgroup")
      .then(res => {
        if (http.isSuccess(res)) {
          search.els.filter(a => a.dataIndex == 'ddGroup').at(0).options = res.data?.map(v => {
            return {label: v, value: v}
          });
        }
      });
  http.get("https://jetpay-package-monitor-ws-api.uat.hccn:443/api/v1/package/monitor/init/status")
      .then(res => {
        if (http.isSuccess(res)) {
          search.els.filter(a => a.dataIndex == 'status').at(0).options = res.data?.map(v => {
            return {label: v.longDesc, value: v.id}
          });
        }
      });
}

initSearchInit();
//初始化查询条件 end

//按下搜索按钮 start
const waitPackageResult = reactive({
  data: <any>[],
  selectIndex: "",
  loading: false,
  scroll: {x: 350, y: 250},
  columns: WAITPACKAGE_COLUMNS,
  setRowKey: (record) => setRowKey(record.rowKey),
  customRow: (record) => setCustomRow(record, record.rowKey, waitPackageResult),
  rowClassName: (record) => setRowClass(record.rowKey, waitPackageResult)
});

const packagingResult = reactive({
  data: <any>[],
  selectIndex: "",
  loading: false,
  scroll: {x: 1750, y: 250},
  columns: PACKAGE_COLUMNS,
  pageSize: 50,
  pageSizeOptions: ["50", "100", "200"],
  total: 0,
  current: 1,
  setRowKey: (record) => setRowKey(record.rowKey),
  customRow: (record) => setCustomRow(record, record.rowKey, packagingResult),
  rowClassName: (record) => setRowClass(record.rowKey, packagingResult)
});

const unpackageResult = reactive({
  data: <any>[],
  selectIndex: "",
  total: 0,
  loading: false,
  scroll: {x: 1250, y: 250},
  columns: UNPACKAGE_COLUMNS,
  setRowKey: (record) => setRowKey(record.rowKey),
  customRow: (record) =>
      setCustomRow(record, record.rowKey, unpackageResult),
  rowClassName: (record) => setRowClass(record.rowKey, unpackageResult)
});

const searchTables = () => {

  const searchCondition = {
    date: search.init.date.format("YYYY-MM-DD") || "",
    channel: search.init.channel || "",
    ddGroup: search.init.ddGroup.toString() || "",
    status: search.init.status
  };

  http.get("https://jetpay-package-monitor-ws-api.uat.hccn:443/api/v1/package/monitor/request/count", {params: searchCondition}).then((res: any) => {
    if (http.isSuccess(res)) {
      waitPackageResult.data = addRowKey([
        {vendorCode: 'aa1', ddRequestsWaitToPackage: 2123},
        {vendorCode: 'aa2', ddRequestsWaitToPackage: 23}
      ]);
    }
  });

  http.get("https://jetpay-package-monitor-ws-api.uat.hccn:443/api/v1/package/monitor/request/count", {params: searchCondition}).then((res: any) => {
    if (http.isSuccess(res)) {
      packagingResult.data = addRowKey([
        {
          vendorCode: 'aa1',
          packageId: '2131',
          packageStartTime: '2023-11-12 12:12:11',
          packageLastUpdateTime: '2023-11-12 12:12:11',
          packageStatus: {id: 0, shortDesc: 'processing', longDesc: '装箱中'},
          volumeInPackage: '123',
          fillPackageRate: '21%',
          editor: 'yandaon',
          closePackageFlag: 1
        },
        {
          vendorCode: 'aa2',
          packageId: '2132',
          packageStartTime: '2023-11-12 12:12:12',
          packageLastUpdateTime: '2023-11-12 12:12:21',
          packageStatus: {id: 0, shortDesc: 'processing', longDesc: '装箱中'},
          volumeInPackage: '1232',
          fillPackageRate: '21%',
          editor: 'yandaon',
          closePackageFlag: 0
        }
      ]);
    }
  });

  http.get("https://jetpay-package-monitor-ws-api.uat.hccn:443/api/v1/package/monitor/request/count", {params: searchCondition}).then((res: any) => {
    if (http.isSuccess(res)) {
      unpackageResult.data = addRowKey([
        {
          channel: 'aa2',
          ddGroup: 'aa2',
          earliestReceiveTime: '2023-11-12 12:12:12',
          latestReceiveTime: '2023-11-12 12:12:12',
          packageStatus: {id: 0, shortDesc: 'processing', longDesc: '装箱中'},
          count: 12

        },
        {
          channel: 'aa2',
          ddGroup: 'aa2',
          earliestReceiveTime: '2023-11-12 12:12:12',
          latestReceiveTime: '2023-11-12 12:12:12',
          packageStatus: {id: 0, shortDesc: 'processing', longDesc: '装箱中'},
          count: 12
        }
      ]);
    }
  });

}

const packageUrl = ref("sss");
//按下搜索按钮 end

//按下立即打包按钮 start
const packageNow = (temp) => {
  const param = {
    tempBatchId: temp.record.packageId,
    editor: 'fakeUserName'
  };
  http.get("https://jetpay-package-monitor-ws-api.uat.hccn:443/api/v1/package/monitor/init/status", param).then((res: any) => {
    if (http.isSuccess(res)) {
      packagingResult.data[temp.index].closePackageFlag = res.data.closePackageFlag;
    }
  });
};
//按下立即打包按钮 end

const unpackageUrl = ref("sss");
//按下下载按钮 start
const downloadUnpackage = () => {
  const param = {
    date: search.init.date.format("YYYY-MM-DD") || "",
    channel: search.init.channel || "",
    ddGroup: search.init.ddGroup.toString() || "",
    status: search.init.status
  };
  http.down({
    method: "get",
    url: "asdfa",
    params: param,
    responseType: "blob" //blob
  });
}
//按下下载按钮 start
</script>

<template>
  <!--  查询条件-->
  <a-layout class="container-box" v-cloak>
    <a-card>
      <AssembleForm :init="search.init" :elements="search.els" @search="searchTables">no search form</AssembleForm>
    </a-card>
  </a-layout>


  <!--查询待装箱条数结果-->
  <a-card class="mg30">
    <template #title>
      <div class="flex">
        <div class="box-prefix-icon">待装箱信息</div>
      </div>
    </template>
    <resize-table :options="waitPackageResult"></resize-table>
  </a-card>

  <!--查询装箱结果-->
  <a-card class="mg30">
    <template #title>
      <div class="flex">
        <div class="box-prefix-icon">装箱信息</div>
      </div>
    </template>
    <resize-table :options="packagingResult">
      <template #operation="{ index, record, column }">
        <template v-if="column.key == 'operation'">
          <access :path="packageUrl" :limit="pageLimit">
            <a-button type="primary" :disabled="record.closePackageFlag != 1"
                      :style="{ 'background-color': record.closePackageFlag != 1 ? '' : '#29B1CC' }"
                      @click="packageNow({ record, index, type: 'package' })">
              <InboxOutlined/>
              <span>立即打包</span>
            </a-button>
          </access>
        </template>
      </template>
    </resize-table>
  </a-card>

  <!--  查询未打包的结果-->
  <a-card class="mg30">
    <template #title>
      <div class="flex">
        <div class="box-prefix-icon">长时间未装箱</div>
      </div>
    </template>
    <template #extra>
      <div class="info">
        <access :path="unpackageUrl" :limit="pageLimit">
          <a-button type="primary" @click="downloadUnpackage" :style="{ 'background-color': '#FF9F23' }">
            <DownloadOutlined/>
            <span>下载</span>
          </a-button>
        </access>
      </div>
    </template>
    <resize-table :options="unpackageResult"></resize-table>
  </a-card>

</template>


<style scoped>

</style>