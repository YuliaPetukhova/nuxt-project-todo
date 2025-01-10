<script setup lang="ts">
const list = useListStore();
</script>

<template>
  <h1>Редактирование заметки</h1>

  <div class="container">
    <div class="note">
      <div class="title">
        <input type="text">Name

        <div class="todo">
          <div class="todo-item">
            <input type="checkbox" class="checkbox">
            <input type="text" class="todo-name">Name todo

            <div class="todo-actions">
              <button class="todo-action">добавить</button>
              <button class="todo-action">удалить</button>
              <button class="todo-action">отредактировать текст</button>
              <button class="todo-action">отметить как выполненный</button>
            </div>
          </div>

          <div class="todo-item">
            <input type="checkbox" class="checkbox">
            <input type="text" class="todo-name">Name todo

            <div class="todo-actions">
              <button class="todo-action">добавить</button>
              <button class="todo-action">удалить</button>
              <button class="todo-action">отредактировать текст</button>
              <button class="todo-action">отметить как выполненный</button>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="button-action">сохранить изменения</button>

          <button class="button-action">отменить редактирование (необходимо подтверждение)</button>
          <button class="button-action">удалить (необходимо подтверждение)</button>
          <button class="button-action">отменить внесенное изменение</button>
          <button class="button-action">повторить отмененное изменение</button>
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