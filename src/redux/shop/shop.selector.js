import { createSelector } from "reselect";

const selectDirectory = state => state.shop;

export const selectShopCollections = createSelector(
  [selectDirectory],
  shop => shop.collections
);
