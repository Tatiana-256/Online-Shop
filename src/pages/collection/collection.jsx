import React from "react";
import "./collection.scss";
import { selectCollection } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item";
import CollectionsContainer from "./collection.container";

const CollectionPage = ({ collection }) => {
  const { items, title } = collection;
  return (
    <CollectionsContainer>
      <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
          {items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </CollectionsContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
