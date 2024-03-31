import { atom } from "jotai";
import { Order, Sortable } from "src/services/tags";

export const pageSizeAtom = atom<number>(10);
export const orderAtom = atom<Order>("desc");
export const sortableAtom = atom<Sortable>("popular");