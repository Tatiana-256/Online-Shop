import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/with-spinner/with-spinner";
import CollectionPage from "./collection";
import { selectIsCollectionLoaded } from "../../redux/shop/shop.selector";

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: (state) => !selectIsCollectionLoaded(state),
});

const CollectionsContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionsContainer;
