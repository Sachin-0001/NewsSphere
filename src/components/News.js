import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.props.setProgress(10);
    this.setState({ loading: true });

    try {
      let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=2a69aee42d924b08a155dc754d34ce26&page=1&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error('Failed to fetch data');
      }

      let parsedData = await data.json();
      this.props.setProgress(40);

      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults,
      });

      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data: ", error);
      this.setState({ loading: false });
    }
  }

  handleprevclick = async () => {
    console.log("prev click");
    this.setState({ loading: true });
    try {
      let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=2a69aee42d924b08a155dc754d34ce26&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error('Failed to fetch data');
      }

      let parsedData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching previous page: ", error);
      this.setState({ loading: false });
    }
  };

  handlenextclick = async () => {
    console.log("next click");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      return;
    }

    this.setState({ loading: true });
    try {
      let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=2a69aee42d924b08a155dc754d34ce26&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error('Failed to fetch data');
      }

      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching next page: ", error);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = async () => {
    if (this.state.loading) return; // Avoid making a new API call if already fetching
    this.setState({ loading: true });

    try {
      let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=2a69aee42d924b08a155dc754d34ce26&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error('Failed to fetch data');
      }

      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        loading: false,
        totalResults: parsedData.totalResults,
        page: this.state.page + 1,
      });
    } catch (error) {
      console.error("Error fetching more data: ", error);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2>Latest News</h2>

        {this.state.loading && <div>Loading...</div>} {/* Show loading state */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row mt-5">
              {this.state.articles.map((element) => {
                if (element.title !== "[Removed]") {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title}
                        desc={element.description}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </InfiniteScroll>

        <div className="container d-flex justify-content-between mt-5">
          <button
            disabled={this.state.page <= 1 || this.state.loading}
            type="button"
            className="btn btn-primary"
            onClick={this.handleprevclick}
          >
            &laquo; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) || this.state.loading
            }
            type="button"
            className="btn btn-primary"
            onClick={this.handlenextclick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}
