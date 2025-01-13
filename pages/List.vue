<script setup lang="ts">

const list = useListStore();
const router = useRouter();

onMounted(() => {
  list.loadState();
});

function createNote() {
  router.push(`/create`);
}

function editNote(id: number) {
  router.push(`/edit/${id}`);
}

function deleteNote(id: number) {
  if (confirm('Вы действительно хотите удалить заметку?')) {
    list.deleteNote(id);
  }
}
</script>

<template>
  <button class="new-note" @click="createNote()">Создать</button>

  <div class="container">
    <div class="note" v-for="note in list.notes" :key="note.name">
      <div class="title">
        {{ note.name }}

        <div class="todo" v-for="todo in note.todo" :key="todo.name">
          <div class="todo-item">
            <input
                type="checkbox"
                :id="'checkbox-' + note.id + '-' + todo.name"
                :name="'checkbox-' + note.id + '-' + todo.name"
                :checked="todo.checkbox"
                class="checkbox"
                disabled
            >
            <p class="todo-name">{{ todo.name }}</p>
          </div>
        </div>

        <div class="actions">
          <button @click="editNote(note.id)" class="button-action">Редактировать</button>
          <button @click="deleteNote(note.id)" class="button-action">Удалить</button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.new-note {
  margin: 10px;
  cursor: pointer;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
}

.button-action {
  margin: 0 10px;
  cursor: pointer;
}
</style>