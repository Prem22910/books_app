import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./navbar";
import Home from "./home";
import Books from "./books";
import MyShelf from "./myShelf";
import Settings from "./settings";
class MainComponent extends Component {
  state = {
    myBooks : [],
    setting : {print: true,lang: true,filt: true,order: true,maxResult: "8"},
  };

  handleAddBook = (book) => {
    let s1 = {...this.state};
    s1.myBooks.push(book);
    this.setState(s1);
  };
  handleRemoveBook = (id) => {
    let s1 = {...this.state};
    let index = s1.myBooks.findIndex((book) => book.id === id);
    s1.myBooks.splice(index,1);
    this.setState(s1);
  };

  handleSetting = (setting) => {
    let s1 = {...this.state};
    s1.setting = setting;
    this.setState(s1);
  };

  render() {
    const {myBooks,setting} = this.state;
    return (
      <div className="container-fluid">
        <Navbar setting={setting} />
        <Switch>
          <Route path="/books/v1/volumes" 
            render={(props) => <Books {...props} myBooks={myBooks} setting={setting} onAddBook={this.handleAddBook} onRemoveBook={this.handleRemoveBook} />} />

          <Route path="/myshelf" 
            render={(props) => <MyShelf {...props} myBooks={myBooks} onRemoveBook={this.handleRemoveBook} />} />

          <Route path="/settings" 
            render={(props) => <Settings {...props} setting={setting} onSettingChange={this.handleSetting} />} />

          <Route path="/home" 
            render={(props) => <Home {...props} setting={setting} />} />

          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}
export default MainComponent;