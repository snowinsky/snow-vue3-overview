import { deepClone } from './clone';

const setCustomRow = (record: any, rowKey: number | string, table?: any, modal?: any, callback?: Function,contextmenus?: any, ) => {
  return {
    onClick: (e: any) => {
      e.preventDefault();
      if (undefined != table) {
        table.selectIndex = rowKey;
      }
    },
    onContextmenu: e => {
      e.preventDefault();

      if (undefined != table) {
        table.selectIndex = rowKey;
        table.record = deepClone(record);
      }
      if (undefined != contextmenus) {
        contextmenus.visible = true;
        const height = (contextmenus.els.length+1) * 40;
        const widthPot =e.clientX + 200;
        const heightPot =e.clientY + height;
        if (widthPot> document.documentElement.clientWidth) {
          contextmenus.style.left = e.clientX - 200 + "px";
        } else {
          contextmenus.style.left = e.clientX + "px";
        }
        if (heightPot > document.documentElement.clientHeight) {
          contextmenus.style.top = e.clientY - height + document.documentElement.scrollTop + "px";
        } else {
          contextmenus.style.top = e.clientY + document.documentElement.scrollTop + "px";
        }
      }
      if (undefined != modal) {
        modal.type = table.name;
        modal.init = deepClone(record);
      }
      
      if (undefined != callback ) {
        callback && callback();
      }
    }
  };
}
const setRowClass = (rowKey, table: any) => {
  return rowKey === table.selectIndex ? "table-row-active" : "";
};

const setRowKey = (rowKey) => {
  return rowKey;
}

const addRowKey = (data) => {
  if(null!=data && ''!=data && undefined!=data){
    return data.map((item,index)=>{
      item.rowKey=index;
      return item;
    })
  }
  return data;
}

const closeMenus = (contextmenusList: any[]) => {
  document.addEventListener("click", (e) => {
    if (null != contextmenusList) {
      contextmenusList.map(contextmenus => {
        if (true == contextmenus.visible && null != e.target) {
          const classList= e.target["className"]
          if(null != classList && ''!= classList && classList.indexOf("ant-menu") < 0){
            contextmenus.visible = false;
          }
         
        }
      })
    }
  });
}
/**
 * 
 * @param selectedKeys 记录当前选中值
 * @param refDefault   处理默认值
 */
const rowSelection = (selectedKeys, refDefault) => {
  return {
    selectedRowKeys: refDefault,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.debug(`selectedRowKeys: ${selectedRowKeys}`);//, 'selectedRows: ', selectedRows
      selectedKeys.selectedRowKeys = selectedRowKeys;
      // topTable.selectedRowKeys=[]
    }
  }
};

/**
* ascii 排序的处理方法
* @param a
* @param b
* @returns {number}
*/
const sortByAscII = (a, b) => {
  if (a == b) {
    return 0;
  } else {
    let arr = new Array(a, b).sort();
    return arr[0] === a ? -1 : 1;
  }
}
/**
 * 判断值大小，写成方法主要是为了方便测试
 * @param a
 * @param b
 * @returns {number} 
 */
const sortByValue = (a, b) => {
  return a - b;
};
/**
 * 
 * @param txt 筛选值
 * @param value  被筛选值
 */
const filterFun=(txt, value) =>{
  return value.toString().toLowerCase().includes(txt.toLowerCase());
}
/**
 * 为列添加公共属性
 * @param item
 * @returns {boolean}
 */
const sortItem = (item) => {
  item.sortDirections = ["descend", "ascend"];
  return item;
};
export { setCustomRow, setRowClass, setRowKey, closeMenus, rowSelection, sortItem, sortByValue, sortByAscII, addRowKey, filterFun }