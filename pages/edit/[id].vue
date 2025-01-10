<script setup lang="ts">
import type {INote} from "~/models/INote";
import type {IToDoItem} from "~/models/IToDoItem";

const list = useListStore();
const router = useRouter();
const route = useRoute();

const currentNote = ref<INote | null>(null);

onMounted(() => {
  const noteId = Array.isArray(route.params.id) ? parseInt(route.params.id[0], 10) : parseInt(route.params.id, 10);
  const note = list.currentNote!(noteId);
  if (note) {
    currentNote.value = note;
  }
});

function saveChangedNote() {
  router.push(`/list`);
}

function addToDoItem() {
  if (currentNote.value) {
    const newToDo = list.addToDoItem(currentNote.value.id);
    if (newToDo) {
      currentNote.value.todo.push(newToDo);
    }
  }
}

function deleteToDoItem(todo: IToDoItem) {
  if (currentNote.value) {
    const index = currentNote.value.todo.indexOf(todo);
    if (index > -1) {
      currentNote.value.todo.splice(index, 1);
      list.saveState();
    }
  }
}
</script>

<template>
  <h1>Редактирование заметки</h1>

  <div class="container" v-if="currentNote">
    <div class="note">
      <div class="title">
        <input
            type="text"
            :id="'noteTitle' + currentNote"
            :name="'noteTitle' + currentNote"
            v-model="currentNote.name"
        >

        <div class="todo" v-for="todo in currentNote.todo" :key="todo.name">
          <div class="todo-item">
            <input
                type="checkbox"
                :id="'todoCheckbox' + todo.name"
                :name="'todoCheckbox' + todo.name"
                class="checkbox"
                v-model="todo.checkbox"
                :checked="todo.checkbox">
            <input
                type="text"
                :id="'todoName' + todo.name"
                :name="'todoName' + todo.name"
                class="todo-name"
                v-model="todo.name"
            >

            <div class="todo-actions">
              <button class="todo-action" @click="deleteToDoItem(todo)">удалить</button>
            </div>
          </div>
        </div>
        <button class="todo-action" @click="addToDoItem">добавить Todo item</button>

        <div class="actions">
          <button @click="saveChangedNote" class="button-action">сохранить изменения</button>

          <button class="button-action">отменить редактирование (необходимо подтверждение)</button>
          <button class="button-action">удалить (необходимо подтверждение)</button>
          <!--          <button class="button-action">отменить внесенное изменение</button>-->
          <!--          <button class="button-action">повторить отмененное изменение</button>-->
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin: 0 auto;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
}

.note {
  padding: 10px 10px;
  border: 1px solid black;
}

.todo-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.checkbox {
  margin: 0 10px;
}

.actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.todo-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.todo-action {
  margin: 5px 5px;
  cursor: pointer;
}

.button-action {
  margin: 10px 10px 0 0;
  cursor: pointer;
}
</style>