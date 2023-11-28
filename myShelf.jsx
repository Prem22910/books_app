import React, {Component} from "react";
class MyShelf extends Component {

  removeFromMyBooks = (id) => {
    this.props.onRemoveBook(id);
  };

  render() {
    const {myBooks} = this.props;
    return (
      <div className="container-fluid">
        <div className="bg-primary text-center my-1 py-1">
          {myBooks.length === 0 ? (
            <h4 className="text-warning">No book added to MyBooks</h4>
          ) : (
            <h4 className="text-warning">My Books List</h4>
          )}
        </div>
        <div className="row">
          {myBooks.map((m1,index) => {
            let {authors,imageLinks,categories="NA",title} = m1.volumeInfo;
            let {thumbnail=""} = imageLinks;
            return (
              <div className="col-3 border bg-success text-center" key={index}>
                {thumbnail !== "" ? <img src={thumbnail} alt={title}/> : ""}
                <h6>{title}</h6>
                <div>{authors}{categories}</div>
                <button className="btn bg-primary-subtle mb-1" onClick={() => this.removeFromMyBooks(m1.id)}>Remove from MyBooks</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default MyShelf;