import {defineStore} from "pinia";
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

        deleteNote(id: number): void {
            this.notes = this.notes.filter((note: INote): boolean => note.id !== id);
            this.saveState();
        },

        updateNote(updatedNote: INote): void {
            const index = this.notes.findIndex((note: INote): boolean => note.id === updatedNote.id);
            if (index !== -1) {
                this.notes[index] = updatedNote;
            }

            this.saveState();
        },

        saveState(): void {
            localStorage.setItem('listNotes', JSON.stringify(this.notes));
        },

        loadState(): void {
            const savedNotes: string | null = localStorage.getItem('listNotes');
            if (savedNotes) {
                this.notes = JSON.parse(savedNotes);
            }
        },
    },

    getters: {
        currentNote: (state: { notes: INote[] }) => (id: number): INote | undefined => {
            return state.notes.find((note: INote): boolean => note.id === id);
        },
    },
})
