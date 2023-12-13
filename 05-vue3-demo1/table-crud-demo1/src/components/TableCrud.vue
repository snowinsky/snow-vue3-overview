<template>
  <div>
    <div>
      <button @click="addNew">Add</button>
    </div>
    <div>
      <table>
        <thead>
        <td>ID</td>
        <td>EN-NAME</td>
        <td>CN-NAME</td>
        <td>BIRTH-DAY</td>
        <td>OPERATION</td>
        </thead>
        <tr v-for="(userOne, userOneIndex) in userList">
          <td>{{ userOne.id }}</td>
          <td>{{ userOne.enName }}</td>
          <td>{{ userOne.cnName }}</td>
          <td>{{ userOne.birthDay }}</td>
          <td>
            <button @click="updateOne(userOneIndex)">修改</button>
            <button @click="deleteOne(userOneIndex)">删除</button>
          </td>
        </tr>
        <tr v-show="userEditRowShow">
          <td><input v-model="user.id"/></td>
          <td><input v-model="user.enName"/></td>
          <td><input v-model="user.cnName"/></td>
          <td><input v-model="user.birthDay"/></td>
          <td>
            <button @click="addConfirm(user)">确认</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'

const userEditRowShow = ref(false)

class UserBean {
  id: number
  enName: string
  cnName: string
  birthDay: Date

  constructor() {
    this.id = 0;
    this.enName = '';
    this.cnName = '';
    this.birthDay = new Date();
  }
}

let user: UserBean = new UserBean()

const userList: Array<UserBean> = reactive([])

function addNew() {
  userEditRowShow.value = true;
  user = reactive(new UserBean())
}

function updateOne(oneIndex: number) {
  userEditRowShow.value = true;
  user = userList[oneIndex]
}

function deleteOne(oneIndex: number) {
  userList.splice(oneIndex, 1)
}

function addConfirm(userOne: UserBean) {
  userList.push(Object.assign(new UserBean(), userOne))
  userEditRowShow.value = false;
}

</script>

<style scoped>

</style>