<template>
    <a-table :columns="options.columns" :loading="options.loading" 
      :dataSource="options.data" :scroll="options.scroll"
      :customRow="options.customRow" :rowKey="options.setRowKey" 
      :rowClassName="options.rowClassName" :row-selection="options.rowSelection" 
      :size="tableBasicConfig.size" @resizeColumn="handleResizeColumn" 
      :pagination="false"  :defaultExpandAllRows="true" :showSorterTooltip="false">
      <template #emptyText>
        <div class="table-empty">暂无数据</div>
      </template>
      <template #customFilterDropdown="{setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input ref="searchInput" :placeholder="`搜索 ${column.title}`" :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)" />
          <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)">
            搜索
          </a-button>
          <a-button size="small" style="width: 90px;" @click="() => handleReset(clearFilters)">
            重置
          </a-button>
        </div>
      </template>
      <template #customFilterIcon="{filtered}">
        <SearchOutlined />
      </template>

      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.emit">
          <slot name="operation" :record="record" :index="index" :column="column"></slot>
        </template>

      </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
export default defineComponent({
  name: "resize-table",
  props: {
    options: {
      type: Object,
      require: true
    }
  },
  setup() {
    const searchInput = ref();
    const filter = reactive({
      searchText: '',
      searchedColumn: '',
    });
    const handleReset = (clearFilters) => {
      clearFilters();
      filter.searchText = "";
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      filter.searchText = selectedKeys[0];
      filter.searchedColumn = dataIndex;
    };

    const  handleResizeColumn= (w, col) => {
      col.width = w;
    }
    return {
      tableBasicConfig: {
        size: "small"
      },
      handleSearch,
      handleReset,
      searchInput,
      handleResizeColumn,
      ...toRefs(filter),
    };
  }
});
</script>

<style lang="less" scoped>
.table-empty{
  margin-top:50px ;
  margin-bottom: 50px;
  background-repeat: no-repeat;
  background-size: 200px 120px;
  background-image: url("../assets/vue.svg");
  background-position: center;
  height: 160px;
  display: inline-flex;
  width: 200px;
  align-items: flex-end;
  justify-content: center;
  font-size: 14px;
}
</style>
<style lang="less">
/** 设置选中行的颜色 */
.table-row-active {
    background-color: #F5F7FA;
}
</style>
