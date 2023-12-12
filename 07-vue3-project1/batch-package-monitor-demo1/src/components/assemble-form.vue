<template>
  <a-form
      ref="formRef"
      :layout="layout.layout"
      labelAlign="left"
      :model="form"
      :rules="ruleList"
      :label-col="layout.labelCol"
      :wrapper-col="layout.wrapperCol"
  >
    <template v-for="(item , index) in elements">
      <a-divider v-if="'divider' === item.type" :key="'divider' + index"/>
      <a-form-item
          v-else-if="showFormItem(item)"
          :label="item.title"
          :class="{ nolabel: !item.title }"
          :name="item.dataIndex"
          :key="'item' + index"
      >
        <a-time-picker
            v-if="'timepicker' === item.type"
            v-model:value="form[item.dataIndex]"
            :format="item.format"
        />
        <a-date-picker
            v-if="'picker' === item.type"
            v-model:value="form[item.dataIndex]"
            :style="item.style"
            :disabled="item.disabled"
            :show-time="item.showTime"
            :format="item.format"
            :picker="item.picker"
            @change="emitHandle(item.emit, { key: item.dataIndex, form: form })"
            :allowClear="item.allowClear || false"
            :disabledDate="(value) => timeDisable(value, item.limit, item.future)"
            inputReadOnly
        />

        <a-range-picker
            v-if="'dateRanger' === item.type"
            v-model:value="form[item.dataIndex]"
            :disabled-date="(value) => timeDisable(value, item.limit, item.future)"
            :style="item.style"
            :allowClear="false"
            :disabled="item.disabled"
        />

        <a-select
            v-if="'select' === item.type"
            :mode="item.multiple"
            v-model:value="form[item.dataIndex]"
            :placeholder="item.placeholder"
            :loading="item.loading"
            :showArrow="true"
            :filterOption="false"
            :disabled="item.disabled"
            :style="item.style"
            :options="item.options"
            @change="(value, option) => selectChange(value, option, item)"
        ></a-select>

        <a-input
            v-if="undefined === item.type || 'input' === item.type"
            v-model:value.trim="form[item.dataIndex]"
            :placeholder="item.placeholder || '请输入'"
            :disabled="item.disabled"
            :style="item.style"
            :maxlength="item.maxlength"
        >
          <template #prefix v-if="item.prefix">
            <user-outlined type="user" v-if="item.prefix == 'user'"/>
            <lock-outlined type="lock" v-if="item.prefix == 'lock'"/>
          </template>
        </a-input>

        <a-input-password
            v-if="'password' === item.type"
            v-model:value.trim="form[item.dataIndex]"
            :placeholder="item.placeholder || 'password'"
            :disabled="item.disabled"
            :style="item.style"
            autocomplete="off"
        >
          <template #prefix v-if="item.prefix">
            <lock-outlined v-if="item.prefix == 'lock'"/>
          </template>
        </a-input-password>

        <a-radio-group
            v-if="'radio' === item.type"
            v-model:value="form[item.dataIndex]"
            @change="item.onChange"
            :style="item.style"
            :disabled="item.disabled"
        >
          <a-radio
              :value="current.value"
              v-for="(current, indexO) in item.options"
              :disabledIndex="current.disabledIndex"
              :key="item.dataIndex + indexO"
          >{{ current.label }}
          </a-radio>
        </a-radio-group>
        <a-checkbox
            v-if="'checkbox' === item.type"
            v-model:checked="form[item.dataIndex]"
            @change="
            item.emit? $emit(item.emit, { key: item.dataIndex, data: form })              : ''
          "
        ></a-checkbox>
        <a-checkbox-group
            v-if="'checkgroup' === item.type"
            v-model:value="form[item.dataIndex]"
            :options="item.options"
            @change="
            $emit(item.emit, { key: item.dataIndex, data: form })
          "
        ></a-checkbox-group>

        <a-textarea
            v-if="'textarea' === item.type"
            v-model:value.trim="form[item.dataIndex]"
            placeholder="请输入"
            auto-size
            :style="item.style"
        />

        <a-button
            v-if="'button' === item.type"
            type="primary"
            @click="$emit(item.emit, { key: item.dataIndex, data: form })"
            :style="item.style"
        >{{ item.label }}
        </a-button>

        <a-button
            v-if="'submit' === item.type"
            type="primary"
            @click="checkForm"
            :style="item.style"
        >{{ item.label }}
        </a-button>
        <div v-if="'num' === item.type">
          <a-input-number
              v-model:value="form[item.dataIndex]"
              :min="0"
              :max="item.max"
              :maxlength="item.maxLength"
              :style="item.style"
              :formatter="(value) => intFilter(value, item.maxLength)"
              :precision="item.precision"
          />
          <span style="color: #7f7f7f">{{ item.unit }}</span>
        </div>

        <div v-if="'upload' === item.type">
          <!-- customRequest 用于取消组件自动上传  -->
          <a-upload
              :showUploadList="item.show == 'input' ? false : item.showUploadList"
              :accept="item.accept"
              :maxCount="item.show == 'input' ? 1 : item.maxCount"
              v-model:file-list="form[item.dataIndex]"
              :list-type="item.listType"
              :customRequest="() => {}"
              :before-upload="(file) => beforeUpload(file, item)"
              @remove="
              (file) =>
                $emit(item.emit ? item.emit : '', {
                  key: item.dataIndex,
                  action: 'remove',
                  data: form[item.dataIndex],
                  file
                })
            "
              @change="
              ({ file }) =>
                $emit(item.emit ? item.emit : '', {
                  key: item.dataIndex,
                  action: 'change',
                  data: form[item.dataIndex],
                  file
                })
            "
          >
            <a-input
                v-if="item.show == 'input'"
                type="text"
                :style="item.style"
                v-model:value="form[item.dataIndex][0].name"
                placeholder="请选择上传文件"
                read-only
            >
              <template #addonAfter>
                <upload-outlined></upload-outlined>
              </template>
            </a-input>
            <a-button v-if="item.show == 'button'" type="primary">
              <upload-outlined></upload-outlined>
              上传
            </a-button>
          </a-upload>
        </div>
        <div v-if="'rangerlist' === item.type">
          <a-form-item v-for="(time, timeindex) in form[item.dataIndex].length" :key="'ranger' + time">
            <a-range-picker
                v-model:value="form[item.dataIndex][timeindex]"
                :disabled="item.disabled"
                :format="item.format"
                :show-time="item.showTime"
                :allowClear="false"
                :disabledDate="
                (value) => timeDisable(value, item.limit, item.future)
              "
                inputReadOnly
            />
            <!-- :style="item.style"  暂时无法使用报错 -->
            <plus-circle-outlined class="margin enable" @click="add(item)"></plus-circle-outlined>
            <minus-circle-outlined
                class="margin"
                :class="{ enable: form[item.dataIndex].length > 1 }"
                @click="del(item, timeindex)"
            ></minus-circle-outlined>
            <rest-outlined class="margin" v-show="form[item.dataIndex].length == 1"
                           @click="clear(item)"></rest-outlined>
          </a-form-item>
        </div>

        <div v-if="'timelist' === item.type">
          <a-form-item v-for="(time, timeindex) in form[item.dataIndex].length" :key="'time' + time">
            <a-time-range-picker
                v-model:value="form[item.dataIndex][timeindex]"
                :format="item.format"
                :allowClear="false"
                :style="'width:' + item.width + 'px'"
                inputReadOnly
            />
            <plus-circle-outlined class="margin enable" @click="add(item)"></plus-circle-outlined>
            <minus-circle-outlined
                class="margin"
                :class="{ enable: form[item.dataIndex].length > 1 }"
                @click="del(item, timeindex)"
            ></minus-circle-outlined>
            <rest-outlined class="margin" v-show="item.number == 1" @click="clear(item)"></rest-outlined>
          </a-form-item>
        </div>
        <div v-if="'custom' === item.type">
          <slot
              name="custom"
              :groups="item"
              :value="form[item.dataIndex]"
              :result="form[item.dataIndex]"
          ></slot>
        </div>
        <div v-if="'tip' === item.type">
          <label :style="item.style">{{ item.label }}</label>
        </div>
        <!-- <div class="required" v-if="item.required"></div> -->
      </a-form-item>
    </template>
  </a-form>
  <!-- <pre>{{form}}</pre>-->
</template>

<script lang="ts">
import {ref, reactive, defineComponent} from "vue";
import {Modal} from "ant-design-vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "assemble-form",
  props: {
    init: {
      type: Object,
      required: true
    },
    elements: {
      type: <any>Array,
      required: true
    },
    rules: {
      type: Object
    },
    layout: {
      type: Object,
      default: () => {
        return {
          layout: "inline",
        };
      },
    },
  },
  emits: ["search"],
  /**
   * props: init, elements, rules, layout
   *
   * */
  setup(props, {emit}) {

    const formRef = ref();
    const form = reactive(props.init);
    const myRule = props.rules ? props.rules : {};
    const ruleList = reactive(myRule);
    //验证整个form中各项
    const checkForm = () => {
      formRef.value
          .validate()
          .then((res) => {
            console.info("submit valid success");
            emit("search", form);
          })
          .catch((error) => {
            if (undefined != error.errorFields && error.errorFields.length > 0) {
              console.error("validate is faild......................", error);
            } else {
              console.error("catch is always excute-------", error);
            }
          });
    };
    //上传文件之前验证文件
    const beforeUpload = (file, el) => {
      // console.log(el)
      if (undefined != el.maxSize && file.size > el.maxSize * 1024 * 1024) {
        Modal.error({title: "文件大小必须小于" + el.maxSize + "M"});
        return false;
      }
      //警告上传之前修改文件问题 IE上传修改前的版本 Chrome报错提示 firefox修改后的版本
      const obj: any = {title: "选择上传文件之后,请不要编辑文件"};
      Modal.warning(obj);
      return true;
    };
    //下拉列表变化时
    const selectChange = (value, option, item) => {
      // event.preventDefault();
      if ("multiple" == item.multiple) {
        const index = form[item.dataIndex].indexOf(item.all);
        if (index >= 0) {
          if (index !== value.length - 1) {
            const index = form[item.dataIndex].indexOf(item.all);
            if (index >= 0) {
              form[item.dataIndex].splice(index, 1);
            }
          } else {
            form[item.dataIndex] = [item.all];
          }
        }
      }
      emitHandle(item.emit, {key: item.dataIndex, form});
    };
    //
    const intFilter = (val, length) => {
      val = val?.toString() || val;
      if (null !== val && undefined !== length) {
        const reg = new RegExp("^(\\d{" + length + "})\\w*");
        val = val.replace(reg, "$1");
      }
      val = val?.toString() || val;
      return val;
    };
    //对时间进行验证
    const timeDisable = (currentDate, limit, future) => {
      //limit天限制
      const isTomorrow = currentDate.isAfter(
          dayjs().add(1, "day").format("YYYY-MM-DD")
      );
      if (isTomorrow) {
        if (undefined != limit) {
          return currentDate.isBefore(
              dayjs().subtract(limit, "day").format("YYYY-MM-DD")
          );
        }
        return false;
      } else {
        return !future;
      }
    };
    //清除form中各项的值
    const clear = (item) => {
      form[item.dataIndex] = [[null, null]];
    };
    const validAddStartEnd = (name) => {
      const vaid = form[name].find((one) => {
        if ("" == one[0] || "" == one[1] || null == one[0] || null == one[1]) {
          return true;
        } else {
          return !one[0].isBefore(one[1]);
        }
      });
      if (undefined != vaid) {
        const obj: any = {title: "开始时间应早于结束时间"};
        Modal.error(obj);
        return false;
      }
      return true;
    };
    const add = (item) => {
      if (!validAddStartEnd(item.dataIndex)) {
        return;
      }
      form[item.dataIndex].push([...item.add]);
    };

    const del = (item, index) => {
      if (form[item.dataIndex].length == 1) {
        return;
      }
      form[item.dataIndex].splice(index, 1);
    };

    const showFormItem = (item) => {
      if (undefined == item.visible || true == item.visible) {
        if (undefined != item.depend) {
          return item.depend.value.indexOf(form[item.depend.dataIndex]) > -1;
        } else {
          return true;
        }
      } else {
        return false;
      }
    };

    const emitHandle = (emitName, param) => {
      if (undefined !== emitName && null != emitName) {
        emit(emitName, param);
      }
    };
    return {
      form,
      formRef,
      ruleList,
      checkForm,
      beforeUpload,
      selectChange,
      intFilter,
      timeDisable,
      emitHandle,
      del,
      add,
      validAddStartEnd,
      clear,
      showFormItem,
    };
  },
  //防抖使用报错 https://vue3js.cn/docs/zh/guide/data-methods.html#%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81
});
</script>
<style lang="less" scoped>
.margin {
  margin-left: 5px;
}

.enable {
  color: #1890ff;
}

form {
  overflow-x: auto;
}

.nolabel {
  align-self: flex-end;
}

.ant-form-item {
  margin-bottom: 5px !important;
}
</style>
