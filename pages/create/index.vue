<script setup lang="ts">
import type {INote} from "@/models/INote";
import type {IToDoItem} from "@/models/IToDoItem";

const storeNotes = useListStore();
const noteId = storeNotes.createNote();
const router = useRouter();

const currentNote = ref<INote>();

onMounted(() => {
  const note = storeNotes.currentNote(noteId);
  if (note) {
    currentNote.value = {...note};
  }
});

function saveChangedNote() {
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
    const index = currentNote.value.todo.indexOf(todo);
    if (index > -1) {
      currentNote.value.todo.splice(index, 1);
      storeNotes.saveState();
    }
  }
}

function deleteNote() {
  router.push(`/list`);
}

function resetNote() {
  if (confirm('Вы действительно хотите отменить изменения?')) {
    currentNote.value.name = '';
    currentNote.value.todo = [];

  }
}
</script>

<template>
  <div>
    <h1 class="p-2 p-sm-3 p-md-4">Создание заметки</h1>

    <b-container v-if="currentNote">
      <b-card>
        <b-form-group>
          <b-form-input
              size="lg"
              :id="'noteTitle' + currentNote"
              :name="'noteTitle' + currentNote"
              v-model="currentNote.name"
              placeholder="Note title"
              class="mb-3"
          />

          <div>
            <div
                v-for="(todo, index)  in currentNote.todo"
                :key="index"
                class="mb-3"
            >
              <b-row class="align-items-center g-2">
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
                      class="mt-3 mb-3"
                      variant="outline-danger"
                      size="sm"
                      @click="deleteToDoItem(todo)"
                  >
                    удалить
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </div>

          <b-button
              variant="primary"
              class="mb-4"
              @click="addToDoItem"
          >
            Добавить Todo пункт
          </b-button>

          <b-row class="mt-4">
            <b-col>
              <b-button
                  variant="success"
                  @click="saveChangedNote"
                  class="me-2 mt-2"
              >
                Сохранить изменения
              </b-button>

              <b-button
                  variant="warning"
                  @click="resetNote"
                  class="me-2 mt-2"
              >
                отменить редактирование
              </b-button>

              <b-button
                  variant="danger"
                  @click="deleteNote"
                  class="me-2 mt-2"
              >
                отменить создание
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