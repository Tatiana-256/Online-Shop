import { createSelector } from "reselect";

const selectDirectory = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectDirectory],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>

  createSelector([selectShopCollections],
      // (collections) =>
          collections => collections[collectionUrlParam]
   // { debugger
   //   return collections ? collections[collectionUrlParam] : null}
  );

export const selectIsCollectionFetching = createSelector(
  [selectDirectory],
  (shop) => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
  [selectDirectory],
  (shop) => !!shop.collections
);
