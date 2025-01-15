<script setup lang="ts">
import type {INote} from "@/models/INote";
import type {IToDoItem} from "@/models/IToDoItem";

const storeNotes = useListStore();
const router = useRouter();
const route = useRoute();

const noteId = computed(() => Array.isArray(route.params.id) ? parseInt(route.params.id[0], 10) : parseInt(route.params.id, 10));

const currentNote = ref<INote>();
const originalNote = ref<INote>();

onMounted(() => {
  storeNotes.loadState();
  const note = storeNotes.currentNote(noteId.value);
  if (note) {
    currentNote.value = JSON.parse(JSON.stringify(note));
    originalNote.value = JSON.parse(JSON.stringify(note));
  }
});

function saveNote() {
  if (currentNote.value) {
    storeNotes.updateNote(currentNote.value);
    router.push(`/list`);
  }
}

function addToDoItem() {
  const newToDo: IToDoItem = {
    name: '',
    checkbox: false,
  };
  currentNote.value.todo.push(newToDo);
}

function deleteToDoItem(todo: IToDoItem) {
  if (currentNote.value) {
    storeNotes.deleteToDoItem(currentNote.value.id, todo);
    const index = currentNote.value.todo.indexOf(todo);
    if (index > -1) {
      currentNote.value.todo.splice(index, 1);
    }
  }
}

function deleteNote() {
  if (currentNote.value && confirm('Вы действительно хотите удалить заметку?')) {
    storeNotes.deleteNote(currentNote.value.id);
    storeNotes.saveState();
    router.push(`/list`);
  }
}

function resetNote() {
  if (confirm('Вы действительно хотите отменить изменения?')) {
    currentNote.value = JSON.parse(JSON.stringify(originalNote.value));
  }
}

</script>

<template>
  <div>
    <h1 class="p-2 p-sm-3 p-md-4">Редактирование заметки</h1>

    <b-container v-if="currentNote">
      <b-card class="note-card">
        <b-form-group>
          <b-form-input
              :id="'noteTitle' + currentNote"
              :name="'noteTitle' + currentNote"
              v-model="currentNote.name"
              class="mb-3"
          />

          <div v-for="(todo, index) in currentNote.todo" :key="index" class="mb-2">
            <b-row align-v="center">
              <b-col cols="auto">
                <b-form-checkbox
                    :id="'todoCheckbox-' + currentNote.id + '-' + index"
                    :name="'todoCheckbox-' + currentNote.id + '-' + index"
                    v-model="todo.checkbox"
                    :checked="todo.checkbox"
                />
              </b-col>
              <b-col>
                <b-form-input
                    :id="'todoName-' + currentNote.id + '-' + index"
                    :name="'todoName-' + currentNote.id + '-' + index"
                    v-model="todo.name"
                />
              </b-col>
              <b-col cols="auto">
                <b-button
                    variant="danger"
                    @click="deleteToDoItem(todo)"
                    size="sm"
                >
                  Удалить
                </b-button>
              </b-col>
            </b-row>
          </div>

          <b-button
              variant="secondary"
              @click="addToDoItem"
              class="mt-3 mb-3"
          >
            Добавить новый Todo
          </b-button>

          <b-row class="mt-4">
            <b-col>
              <b-button
                  variant="success"
                  @click="saveNote"
                  class="me-2 mt-2"
              >
                Сохранить изменения
              </b-button>
              <b-button
                  variant="primary"
                  class="me-2 mt-2"
                  @click="resetNote"
              >
                Отменить редактирование
              </b-button>
              <b-button
                  variant="danger"
                  @click="deleteNote"
                  class="me-2 mt-2"
              >
                Удалить
              </b-button>
            </b-col>
          </b-row>
        </b-form-group>
      </b-card>
    </b-container>
  </div>
</template>

<style scoped>

</style>