import React, {Component} from "react";
import http from "./httpsService";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class Books extends Component {
  state = {
    data : [],
  };

  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchString = this.makeSearchString(queryParams);
    let response = await http.get(`/books/v1/volumes?${searchString}`);
    let {data} = response;
    this.setState({data: data});
  };

  async componentDidMount() {
    this.fetchData();
  };

  async componentDidUpdate(prevProps,prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  };

  callURL = (url,options) => {
    let searchString = this.makeSearchString(options);
    this.props.history.push({pathname: url,search: searchString});
  };
  makeSearchString = (options) => {
    let {maxResult=""} = this.props.setting;
    let {q="",startIndex="0",maxResults="",langRestrict="",filter="",printType="",orderBy=""} = options;
    maxResults = maxResult;
    let searchStr = "";
    if (q !== "") {
      searchStr = this.addToQueryString(searchStr,"q",q);
    }
    if (startIndex !== "") {
      searchStr = this.addToQueryString(searchStr,"startIndex",startIndex);
    }
    if (maxResults !== "") {
      searchStr = this.addToQueryString(searchStr,"maxResults",maxResults);
    }
    if (langRestrict !== "") {
      let lang = this.makeTextShort(langRestrict);
      searchStr = this.addToQueryString(searchStr,"langRestrict",lang);
    }
    if (filter !== "") {
      let filterVal = this.makeTextShort(filter);
      searchStr = this.addToQueryString(searchStr,"filter",filterVal);
    }
    if (printType !== "") {
      searchStr = this.addToQueryString(searchStr,"printType",printType);
    }
    if (orderBy !== "") {
      searchStr = this.addToQueryString(searchStr,"orderBy",orderBy);
    }
    return searchStr;
  };
  addToQueryString = (str,paramName,paramValue) => (
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str
  );

  handleOptionChange = (options) => {
    options.startIndex = "0";
    console.log(options);
    return this.callURL("/books/v1/volumes",options);
  };

  makeTextShort = (txt) => {
    if (txt === "English") {
      return "en";
    }else if (txt === "French") {
      return "fr";
    }else if (txt === "Hindi") {
      return "hi";
    }else if (txt === "Spanish") {
      return "es";
    }else if (txt === "Chinese") {
      return "zh";
    }else if (txt === "Full Volume") {
      return "full";
    }else if (txt === "Partial Volume") {
      return "partial";
    }else if (txt === "Free Google e-Books") {
      return "free-ebooks";
    }else if (txt === "Paid Google e-Books") {
      return "paid-ebooks";
    }else {
      return txt;
    }
  };

  addToMyBooks = (book) => {
    this.props.onAddBook(book);
  };
  removeFromMyBooks = (id) => {
    this.props.onRemoveBook(id);
  };

  handlePrevPage = () => {
    let queryParams = queryString.parse(this.props.location.search);
    let {startIndex="0",maxResults} = queryParams;
    let start = (+startIndex) - (+maxResults);
    queryParams.startIndex = start;
    this.callURL("/books/v1/volumes",queryParams);
  };
  handleNextPage = () => {
    let queryParams = queryString.parse(this.props.location.search);
    let {startIndex="0",maxResults} = queryParams;
    let start = (+startIndex) + (+maxResults);
    queryParams.startIndex = start;
    this.callURL("/books/v1/volumes",queryParams);
  };

  render() {
    const {myBooks,setting} = this.props;
    const {data} = this.state;
    let {totalItems,items=[]} = data;
    let queryParams = queryString.parse(this.props.location.search);
    let {q="",startIndex="0",maxResults=""} = queryParams;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <LeftPanel options={queryParams} setting={setting} onOptionChange={this.handleOptionChange} />
          </div>
          <div className="col-lg-8 col-9">
            <h3 className="text-center text-warning">{q} Books</h3>
            {items.length > 0 ? (
              <p className="text-success">{items.length >= maxResults ? (
                  <React.Fragment>
                    {+startIndex+1} - {(+startIndex)+(+maxResults)} entries
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {items.length} entries
                  </React.Fragment>
                )}
              </p>
            ) : <p className="text-success">No data found</p>}
            <div className="row">
              {items.map((b1,index) => {
                let {authors,imageLinks="",categories="NA",title} = b1.volumeInfo;
                let {thumbnail="NA"} = imageLinks;
                let myBook = myBooks.findIndex((b2) => b2.id === b1.id);
                return (
                  <div className="col-4 border bg-success text-center" key={index}>
                    {thumbnail !== "" ? <img src={thumbnail} alt={q}/> : ""}
                    <h6>{title}</h6>
                    <div>{authors} <br/> {categories}</div>
                    {myBook < 0 ? (
                      <button className="btn bg-primary-subtle mb-1" onClick={() => this.addToMyBooks(b1)}>Add to MyBooks</button>
                      ) : (
                        <button className="btn bg-primary-subtle mb-1" onClick={() => this.removeFromMyBooks(b1.id)}>Remove from MyBooks</button>
                      )}
                  </div>  
                );
              })}
              <div className="row my-2">
                <div className="col-3">
                  {+startIndex <= 0 ? "" : (
                    <button className="btn btn-warning" onClick={() => this.handlePrevPage()}>Prev</button>
                  )}
                </div>
                <div className="col-6"></div>
                {totalItems > maxResults ? (
                  <div className="col-3 text-end">
                    {+startIndex === (totalItems - (+maxResults))-1 ? "" : (
                      <button className="btn btn-warning" onClick={() => this.handleNextPage()}>Next</button>
                    )}
                  </div>
                ) : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Books;