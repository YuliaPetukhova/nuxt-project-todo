import type {IToDoItem} from "~/models/IToDoItem";

export interface INote {
    id: number;
    name: string;
    todo: IToDoItem[];
}