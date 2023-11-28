import React, {Component} from "react";
class LeftPanel extends Component {

  handleChange = (e) => {
    let {currentTarget: input} = e;
    let options = {...this.props.options};
    options[input.name] = input.value;
    this.props.onOptionChange(options);
  };

  makeRadios = (arr,val,name,label) => {
    return (
      <div className="form-group bg-light border">
        <label className="form-group-label fw-medium m-1 mx-3">{label}</label>
        {arr.map((opt) => (
          <div className="form-check bg-white py-1" key={opt}>
            <input type="radio" className="form-check-input mx-1" value={opt} name={name} checked={val === opt} onChange={this.handleChange}/>
            <label className="form-check-label">{opt}</label>
          </div>
        ))}
      </div>
    );
  };

  makeDropdown = (arr,value,name,label) => {
    return (
      <div className="form-group bg-light border">
      <label className="form-group-label fw-medium m-1 mx-3">{label}</label>
        <select className="form-control bg-white" name={name} value={value} onChange={this.handleChange}>
          <option value="">{label}</option>
          {arr.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  };

  makeTextLong = (txt) => {
    if (txt === "en") {
      return "English";
    }else if (txt === "fr") {
      return "French";
    }else if (txt === "hi") {
      return "Hindi";
    }else if (txt === "es") {
      return "Spanish";
    }else if (txt === "zh") {
      return "Chinese";
    }else if (txt === "full") {
      return "Full Volume";
    }else if (txt === "partial") {
      return "Partial Volume";
    }else if (txt === "free-ebooks") {
      return "Free Google e-Books";
    }else if (txt === "paid-ebooks") {
      return "Paid Google e-Books";
    }else {
      return txt;
    }
  }

  render() {
    let {print,lang,filt,order} = this.props.setting;
    let {langRestrict="",filter="",printType="",orderBy=""} = this.props.options;
    langRestrict = this.makeTextLong(langRestrict);
    filter = this.makeTextLong(filter);
    let languages = ["English","French","Hindi","Spanish","Chinese"];
    let filters = ["Full Volume","Partial Volume","Free Google e-Books","Paid Google e-Books"];
    let printTypes = ["All","Books","Magazines"];
    let orderArr = ["relevance","newest"];
    return (
      <div className="container my-2">
        {lang ? (
          this.makeRadios(languages,langRestrict,"langRestrict","Language")
        ) : ""}
        <br/>
        {filt ? (
          this.makeRadios(filters,filter,"filter","Filters")
        ) : ""}
        <br/>
        {print ? (
          this.makeRadios(printTypes,printType,"printType","Print Type")
        ) : ""}
        <br/>
        {order ? (
          this.makeDropdown(orderArr,orderBy,"orderBy","Order By")
        ) : ""}
      </div>
    );
  }
}
export default LeftPanel;