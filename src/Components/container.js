import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AnimeActions from "./actions";

function mapStateToProps({ AnimeReducer }) {
  return {
    cardData: AnimeReducer.data,
    isFetching: AnimeReducer.isFetching,
    isFetched: AnimeReducer.isFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...AnimeActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps);
