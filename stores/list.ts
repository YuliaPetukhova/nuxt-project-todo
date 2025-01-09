import {defineStore} from "pinia";

export const useListStore = defineStore('listStore', {
    state: () => ({
        notes: [
            {
                id: 1,
                name: '1name',
                buttonEdit: 'перейти к изменению',
                buttonDelete: 'удалить (необходимо подтверждение)',
                todo: [
                    {name: '1', checkbox: false,},
                    {name: '2', checkbox: false,},
                ]
            },
            {
                id: 2,
                name: '2name',
                buttonEdit: 'перейти к изменению',
                buttonDelete: 'удалить (необходимо подтверждение)',
                todo: [
                    {name: '1', checkbox: false,},
                    {name: '2', checkbox: false,},
                ]
            },
        ],

    }),

    actions: {
        deleteNote(id: number) {
            this.notes = this.notes.filter(note => note.id !== id);
        },
    }
})