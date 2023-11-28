import React, {Component} from "react";
class Settings extends Component {

  handleChange = (e) => {
    const {currentTarget: input} = e;
    let setting = {...this.props.setting};
    input.type === "checkbox" 
      ? input.checked 
        ? setting[input.name] = true
        : setting[input.name] = false
      : setting.maxResult = input.value;
    this.props.onSettingChange(setting);
  };

  render() {
    const {print,lang,filt,order,maxResult} = this.props.setting;
    return (
      <div className="container">
        <h5 className="text-danger">Select Options for Filtering on Left Panel</h5>
        <div className="mx-3">
          <div className="form-group d-flex">
            <input type="checkbox" className="form-check" id="print" name="print" checked={print} onChange={this.handleChange}/>
            <label className="form-check-label mx-2">printType--(Restrict to books or magazines.)</label>
          </div>
          <div className="form-group d-flex">
            <input type="checkbox" className="form-check" id="lang" name="lang" checked={lang} onChange={this.handleChange}/>
            <label className="form-check-label mx-2">languages--(Restrict the volumes returned to those that are tagged with the specified language.)</label>
          </div>
          <div className="form-group d-flex">
            <input type="checkbox" className="form-check" id="filt" name="filt" checked={filt} onChange={this.handleChange}/>
            <label className="form-check-label mx-2">filter--(Filter search results by volume type and availability.)</label>
          </div>
          <div className="form-group d-flex">
            <input type="checkbox" className="form-check" id="order" name="order" checked={order} onChange={this.handleChange}/>
            <label className="form-check-label mx-2">orderBy--(Order of the volume search results.)</label>
          </div>
        </div>
        <h5 className="text-success">No. of entries on a page</h5>
          <input type="text" className="form-input" id="maxResult" name="maxResult" value={maxResult} onChange={this.handleChange}/>
      </div>
    );
  }
}
export default Settings;