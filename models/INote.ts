import type {IToDoItem} from "~/models/IToDoItem";

export interface INote {
    id: number;
    name: string;
    buttonEdit: string;
    buttonDelete: string;
    todo: IToDoItem[];
}