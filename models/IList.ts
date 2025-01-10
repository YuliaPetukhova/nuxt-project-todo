import type {IToDoItem} from "~/models/IToDoItem";
import type {INote} from "~/models/INote";

export interface IList {
    notes: INote;
    todo: IToDoItem[];
}