import React, { Component, Fragment } from "react";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Wrapper } from "./style";
import CardMovie from "./Card";
import debounce from "lodash/debounce";
import container from "./container";
import Loader from "react-loader-spinner";
import Button from "@material-ui/core/Button";
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "Naruto",
      LoadMore: false,
      postsPerPage: 5,
      data: [],
      next: 5,
    };
  }

  componentDidMount = () => {
    const { searchText } = this.state;
    this.props.requestAnime(`q=${searchText}&limit=${16}`);
  };

  componentDidUpdate(prevProps, prevState) {
    const { postsPerPage } = this.state;
    if (this.props !== prevProps) {
      this.setState({ data: [] }, () => {
        this.loopWithSlice(0, postsPerPage);
      });
    }
  }

  onChangeSearch = debounce(
    (event) => {
      const value = event.target.value;
      if (value !== "") {
        this.setState({ searchText: event.target.value }, () => {
          this.props.requestAnime(`q=${event.target.value}&limit=${25}`);
        });
      } else this.props.requestAnime(`q="Naruto"&limit=${25}`);
    },
    1000,
    { leading: false, trailing: true }
  );

  loopWithSlice = (start, end) => {
    const { cardData } = this.props;
    const { data } = this.state;

    const slicedPosts = cardData.slice(start, end);
    let dataUpdate = [...data, ...slicedPosts];
    this.setState({ data: dataUpdate });
  };

  handleShowMorePosts = () => {
    const { next, postsPerPage } = this.state;
    this.loopWithSlice(next, next + postsPerPage);
    this.setState({ next: next + postsPerPage });
  };

  render() {
    const SearchButton = () => (
      <IconButton>
        <SearchIcon />
      </IconButton>
    );
    const { isFetching, isFetched, cardData } = this.props;
    const { data, postsPerPage } = this.state;
    const loader = isFetching && !isFetched;
    const newShowMore = data.length < cardData.length - 1;
    return (
      <Fragment>
        <Wrapper>
          <form autoComplete="off">
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              InputProps={{ endAdornment: <SearchButton /> }}
              onChange={(e) => {
                this.onChangeSearch(e);
              }}
            />
          </form>
        </Wrapper>

        {loader ? (
          <Loader type="Oval" color="#00BFFF" height={60} width={60} />
        ) : (
          <CardMovie
            cardData={data}
            isFetching={isFetching}
            isFetched={isFetched}
          />
        )}
        {newShowMore && (
          <Button
            style={{ marginBottom: "10%" }}
            variant="contained"
            color="secondary"
            onClick={(e) => {
              this.handleShowMorePosts();
            }}
          >
            Load More
          </Button>
        )}
      </Fragment>
    );
  }
}

export default container(LandingPage);
