import React from "react";
import "./collections-overview.scss";
import { connect } from "react-redux";
import CollectionPreview from "../preview-collection/collection-preview";
import { createStructuredSelector } from "reselect";
import { selectShopCollections } from "../../redux/shop/shop.selector.js";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} {...otherProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections
});

export default connect(mapStateToProps)(CollectionsOverview);
