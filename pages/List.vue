<script setup lang="ts">

const storeListNotes = useListStore();
const router = useRouter();

onMounted(() => {
  storeListNotes.loadState();
});

function createNote() {
  router.push(`/create`);
}

function editNote(id: number) {
  router.push(`/edit/${id}`);
}

function deleteNote(id: number) {
  if (confirm('Вы действительно хотите удалить заметку?')) {
    storeListNotes.deleteNote(id);
  }
}
</script>

<template>
  <div>
    <b-button
        variant="outline-primary"
        class="ms-md-3 mt-md-3"
        @click="createNote()"
    >
      Создать
    </b-button>

    <b-container>
      <b-row>
        <b-col v-for="note in storeListNotes.notes" :key="note.name" md="4" class="mt-3">
          <b-card class="h-100 d-flex flex-column">
            <b-card-title>{{ note.name }}</b-card-title>

            <b-card-body d-flex flex-row>
              <div v-for="(todo, index) in note.todo.slice(0, 3)" :key="index">
                <div class="d-flex align-items-center mb-2">
                  <b-form-checkbox
                      :id="'checkbox-' + note.id + '-' + index"
                      :name="'checkbox-' + note.id + '-' + index"
                      :checked="todo.checkbox"
                      disabled
                  />
                  <span>{{ todo.name }}</span>
                </div>
              </div>
              <div v-if="note.todo.length > 3" class="text-muted">
                +{{ note.todo.length - 3 }} todo
              </div>
            </b-card-body>

            <b-card-footer class="bg-transparent border-0 mt-auto">
              <b-button
                  variant="primary"
                  @click="editNote(note.id)"
                  size="sm"
                  class="me-2"
              >
                Редактировать
              </b-button>
              <b-button
                  variant="danger"
                  @click="deleteNote(note.id)"
                  size="sm"
              >
                Удалить
              </b-button>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>

</style>
