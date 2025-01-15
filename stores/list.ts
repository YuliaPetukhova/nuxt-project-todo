import {defineStore} from "pinia";
import type {IToDoItem} from "~/models/IToDoItem";
import type {INote} from "~/models/INote";

export const useListStore = defineStore('listStore', {
    state: () => ({
        notes: [] as INote[],
    }),

    actions: {
        createNote(): number {
            const newNote: INote = {
                id: this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1,
                name: '',
                todo: [],
            };
            this.notes.push(newNote);
            return newNote.id;
        },

        addToDoItem(noteId: number) {
            const newToDo: IToDoItem = {
                name: '',
                checkbox: false,
            };
            const note = this.notes.find(note => note.id === noteId);
            if (note) {
                note.todo.push(newToDo);
                this.saveState();
            }
        },

        deleteToDoItem(noteId: number, todo: IToDoItem) {
            const note = this.notes.find(note => note.id === noteId);
            if (note) {
                const index = note.todo.indexOf(todo);
                if (index > -1) {
                    note.todo.splice(index, 1);
                    this.saveState();
                }
            }
        },

        deleteNote(id: number) {
            this.notes = this.notes.filter((note: INote) => note.id !== id);
            this.saveState();
        },

        updateNote(updatedNote: INote) {
            const index = this.notes.findIndex((note: INote) => note.id === updatedNote.id);
            if (index !== -1) {
                this.notes[index] = updatedNote;
            }

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
        },
    },

    getters: {
        currentNote: (state) => (id: number): INote | undefined => {
            return state.notes.find((note: INote) => note.id === id);
        },
    },
})