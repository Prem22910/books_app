import React, {Component} from "react";
import pic1 from "./images/pic1.jpg";
class Home extends Component {
  state  = {
    search : "",
    startIndex : "0",
    maxResults : 8,
  };

  handleChange = (e) => {
    let {currentTarget: input} = e;
    let s1 = {...this.state};
    s1.search = input.value;
    this.setState(s1);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.callURL("/books/v1/volumes",this.state);
  };

  callURL = (url,options) => {
    let searchString = this.makeSearchString(options);
    this.props.history.push({pathname: url,search: searchString});
  };
  makeSearchString = (options) => {
    let {maxResult} = this.props.setting;
    let {search="",startIndex="0",maxResults=""} = options;
    maxResults = maxResult;
    let searchStr = "";
    if (search !== "") {
      searchStr = this.addToQueryString(searchStr,"q",search);
    }
    if (startIndex >= 0) {
      searchStr = this.addToQueryString(searchStr,"startIndex",startIndex);
    }
    if (maxResults > 0) {
      searchStr = this.addToQueryString(searchStr,"maxResults",maxResults);
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

  render() {
    const {search} = this.state;
    return (
      <div className="container">
        <div className="text-center">
          <img style={{width: "35%",borderRadius: "50%"}} className="my-3" src={pic1} alt="Library" />
        </div>
        <div className="form-group bg-light p-2 my-2">
          <div className="row text-center">
            <div className="col-9">
              <input type="text" className="form-control border border-dark p-2" id="search" name="search" value={search} placeholder="Search" onChange={this.handleChange}/>
            </div>
            <div className="col-2">
              <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;