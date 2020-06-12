import React from "react";
import "./collection.scss";
import { selectCollection } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item";
import {withRouter} from "react-router-dom";

const CollectionPage = ({ collection }) => {
    debugger
  const { items, title } = collection;
  console.log('CollectionPage')
  return (
      <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
          {items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
  );
};

const mapStateToProps = (state, ownProps) => {
    return  {
        collection: selectCollection(ownProps.match.params.collectionId)(state),
    }

};

export default withRouter(connect(mapStateToProps)(CollectionPage));
