import { atom } from "jotai";
import { atomWithLocation } from "jotai-location";

import { Order, Sortable } from "src/services/tags";

export const pageAtom = atom<number>(1);
export const pageSizeAtom = atom<number>(10);
export const orderAtom = atom<Order>("desc");
export const sortableAtom = atom<Sortable>("popular");

export const filtersAtom = atomWithLocation();
