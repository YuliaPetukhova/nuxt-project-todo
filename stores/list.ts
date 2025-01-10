import {defineStore} from "pinia";
import type {IToDoItem} from "~/models/IToDoItem";
import type {INote} from "~/models/INote";

export const useListStore = defineStore('listStore', {
    state: () => ({
        notes: [
            {
                id: 1,
                name: '',
                buttonEdit: 'перейти к изменению',
                buttonDelete: 'удалить (необходимо подтверждение)',
                todo: [
                    {name: '1', checkbox: false,},
                    {name: '2', checkbox: false,},
                ] as IToDoItem[],
            } as INote,
        ],
    }),

    actions: {
        createNote(): number {
            const newNote: INote = {
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

        addToDoItem(noteId: number): IToDoItem | null {
            const newToDo: IToDoItem = {
                name: '',
                checkbox: false,
            };
            const note = this.notes.find(note => note.id === noteId);
            if (note) {
                this.saveState();
                return newToDo;
            } else {
                return null;
            }
        },

        deleteNote(id: number) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveState();
        },

        updateNote(updatedNote: INote) {
            const index = this.notes.findIndex(note => note.id === updatedNote.id);
            if (index !== -1) {
                this.notes[index] = updatedNote;
            }
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
    },
    getters: {
        currentNote: (state) => {
            return (id: number) => state.notes.find(note => note.id === id);
        },
    },
})