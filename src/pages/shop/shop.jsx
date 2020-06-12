import React, { useEffect } from "react";
import {Route, withRouter} from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container.jsx";
import CollectionsContainer from "../collection/collection.container.jsx";
import { fetchCollectionStart } from "../../redux/shop/shop.action.js";

const ShopPage = ({ fetchCollectionStart, match }) => {
    debugger
  useEffect(() => {
    fetchCollectionStart();
  }, [fetchCollectionStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionsContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default withRouter(connect(null, mapDispatchToProps)(ShopPage));
