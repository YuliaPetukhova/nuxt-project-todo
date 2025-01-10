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
        createNote(newNoteId: number) {
            const newNote = {
                id: this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1,
                name: '',
                todo: [],
                buttonEdit: 'перейти к изменению',
                buttonDelete: 'удалить (необходимо подтверждение)',
            };
            this.notes.push(newNote);
            this.saveState();
            return newNote.id;
        },

        deleteNote(id: number) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveState();
        },

        saveState() {
            localStorage.setItem('listNotes', JSON.stringify(this.notes));
        },

        loadState() {
            const savedNotes = localStorage.getItem('listNotes');
            if (savedNotes) {
                this.notes = JSON.parse(savedNotes);
            }
        }
    }
})