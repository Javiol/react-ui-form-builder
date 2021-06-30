// eslint-disable-next-line max-classes-per-file
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import { format, parse } from 'date-fns';
// import moment from 'moment';
import SignaturePad from 'react-signature-canvas';
import ReactDatePicker from 'react-datepicker';
import StarRating from './star-rating';
import HeaderBar from './header-bar';
import ID from './UUID';

const FormElements = {};
const myxss = new xss.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style'],
  },
});

export const stringToBool = (val) => {
  return typeof val === 'string' ? val === "true" : val;
}

const containerClass = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && stringToBool(props.data.required) && !props.read_only);

  return `field ${hasRequiredLabel ? "required" : ""}`
}

const ComponentLabel = (props) => {
  return (
    <label className={props.className || ''}>
      <span dangerouslySetInnerHTML={{ __html: myxss.process(props.data.label) }}/>
    </label>
  );
};

const ComponentHeader = (props) => {
  if (props.mutable) {
    return null;
  }
  return (
    <div>
    { props.data.pageBreakBefore &&
      <div className="preview-page-break">Page Break</div>
    }
    <HeaderBar parent={props.parent} editModeOn={props.editModeOn} data={props.data} onDestroy={props._onDestroy} onEdit={props.onEdit} static={props.data.static} required={stringToBool(props.data.required)} />
  </div>
  );
};

class Header extends React.Component {
  render() {
    // const headerClasses = `dynamic-input ${this.props.data.element}-input`;
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <h3 className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Paragraph extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <p className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Label extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <label className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class LineBreak extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <hr />
      </div>
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'text';
    props.className = 'form-control';
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.props.onChange;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          <input {...props}/>
        </div>
      </div>
    );
  }
}

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'number';
    props.className = 'form-control';
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.props.onChange;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.className = 'form-control';
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.props.onChange;

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          <textarea {...props} />
        </div>
      </div>
    );
  }
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();

    this.updateFormat(props);
    this.state = this.updateDateTime(props, this.formatMask);
  }

  formatMask = '';

  handleChange = (dt) => {
    let placeholder;

    if (dt && dt.target) {
      placeholder = (dt && dt.target && dt.target.value === '') ? this.formatMask.toLowerCase() : '';
      const formattedDate = (dt.target.value) ? format(dt.target.value, this.formatMask) : '';

      this.setState({
        value: formattedDate,
        internalValue: formattedDate,
        placeholder,
      }, () => {
        this.props.onChange(formattedDate);
      });
    } else {
      this.setState({
        value: (dt) ? format(dt, this.formatMask) : '',
        internalValue: dt,
        placeholder,
      }, () => {
        this.props.onChange(dt);
      });
    }
  };

  updateFormat(props) {
    let { showTimeSelect, showTimeSelectOnly } = props.data;
    showTimeSelect = stringToBool(showTimeSelect);
    showTimeSelectOnly = stringToBool(showTimeSelectOnly);
    const dateFormat = showTimeSelect && showTimeSelectOnly ? '' : props.data.dateFormat;
    const timeFormat = showTimeSelect ? props.data.timeFormat : '';
    const formatMask = (`${dateFormat} ${timeFormat}`).trim();
    const updated = formatMask !== this.formatMask;
    this.formatMask = formatMask;
    return updated;
  }

  updateDateTime(props, formatMask) {
    let value;
    let internalValue;
    let defaultToday = stringToBool(props.data.defaultToday)

    if (defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
      value = format(new Date(), formatMask);
      internalValue = new Date();
      defaultToday = false;
    } else {
      value = props.defaultValue;

      if (value === '' || value === undefined) {
        internalValue = undefined;
      } else {
        internalValue = parse(value, this.formatMask, new Date());
      }
    }
    return {
      value,
      internalValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
    };
  }

  render() {
    let { showTimeSelect, showTimeSelectOnly } = this.props.data;
    const props = {};
    props.type = 'date';
    props.className = 'form-control';
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    showTimeSelect = stringToBool(showTimeSelect)
    showTimeSelectOnly = stringToBool(showTimeSelectOnly)
    let readOnly = this.props.data.readOnly || this.props.read_only;
    readOnly = stringToBool(readOnly);
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const placeholderText = this.formatMask.toLowerCase();

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          <div>
            { readOnly &&
              <input type="text"
                     name={props.name}
                     ref={props.ref}
                     readOnly={false}
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className="form-control" />
            }
            { iOS && !readOnly &&
              <input type="date"
                     name={props.name}
                     ref={props.ref}
                     onChange={this.handleChange}
                     dateFormat="MM/DD/YYYY"
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className = "form-control" />
            }
            { !iOS && !readOnly &&
              <ReactDatePicker
                name={props.name}
                ref={props.ref}
                onChange={this.handleChange}
                selected={this.state.internalValue}
                todayButton={'Today'}
                className = "form-control"
                isClearable={true}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelectOnly}
                dateFormat={this.formatMask}
                placeholderText={placeholderText} />
            }
          </div>
        </div>
      </div>
    );
  }
}

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    const { defaultValue, data } = props;
    this.state = { value: this.getDefaultValue(defaultValue, data.options) };
    this.isMulti = true;
  }

  getDefaultValue(defaultValue, options){
    if (defaultValue) {
      if (typeof defaultValue === 'string') {
        const vals = defaultValue.split(',').map(x => x.trim());
        return options.filter(x => vals.indexOf(x.value) > -1);
      }
      return options.filter(x => defaultValue.indexOf(x.value) > -1);
    }
    return [];
  }

  handleChange = (e) => {
    this.setState({ 
      value: e 
    }, () => {
      this.props.onChange(e);
    });
  };

  render() {
    const options = this.props.data.options.map(option => {
      option.label = option.text;
      return option;
    });
    const props = {};
    props.isMulti = this.isMulti;
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) { props.value = options[0].text; } // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.isDisabled = this.props.read_only;
      props.value = this.state.value;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          <Select {...props} />
        </div>
      </div>
    );
  }
}

class Dropdown extends Tags {
  constructor(props) {
    super(props);
    this.isMulti = false;
  }

  getDefaultValue(value, dataOptions){
    let defaultValue = super.getDefaultValue(value, dataOptions);
    return defaultValue.length > 0 ? defaultValue[0] : null;
  }

  render() {
    return super.render()
  }
}

class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
    };
    this.inputField = React.createRef();
    this.canvas = React.createRef();
  }

  clear = () => {
    if (this.state.defaultValue) {
      this.setState({ defaultValue: '' });
    } else if (this.canvas.current) {
      this.canvas.current.clear();
    }
  }

  render() {
    const { defaultValue } = this.state;
    let canClear = !!defaultValue;
    const props = {};
    props.type = 'hidden';
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.props.onChange;

    if (this.props.mutable) {
      props.defaultValue = defaultValue;
      props.ref = this.inputField;
    }
    const pad_props = {};
    // umd requires canvasProps={{ width: 400, height: 150 }}
    if (this.props.mutable) {
      pad_props.defaultValue = defaultValue;
      pad_props.ref = this.canvas;
      canClear = !this.props.read_only;
    }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    let sourceDataURL;
    if (defaultValue && defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${defaultValue}`;
    }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          {this.props.read_only === true || !!sourceDataURL
            ? (<img src={sourceDataURL} />)
            : (<SignaturePad {...pad_props} />)
          }
          { canClear && (
            <i className="fa fa-times clear-signature" onClick={this.clear} title="Clear Signature"></i>) }
          <input {...props} />
        </div>
      </div>
    );
  }
}

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
    this.state = this.stateObject();
  }

  handleChange = (e) => {
    const option = this.props.data.options.find(option => option.value === e.target.value)

    if(option){
      this.setState({
        [option.key]: e.target.checked
      }, () => {
        this.props.onChange(e)
      })
    }
  };

  stateObject = () => {
    const state = {};

    this.props.data.options.forEach(option => {
      const defaultChecked = this.props.defaultValue !== undefined && this.props.defaultValue.indexOf(option.key) > -1;
      const checked = this.props.defaultValue ? this.props.defaultValue.some(defaultOption => defaultOption.value === option.value) : false;

      state[`${option.key}`] = defaultChecked || checked;
    })

    return state;
  }

  render() {
    const self = this;
    let classNames = this.props.data.inline ? 'inline fields' : 'grouped fields';

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={`${containerClass(this.props)} ${classNames}`}>
          <ComponentLabel className="form-label" {...this.props} />
          {this.props.data.options.map((option) => {
            const key = `preview_${option.key}`;
            const props = {};
            props.onChange = this.handleChange;
            props.name = `${this.props.data.id}[]`;

            props.type = 'checkbox';
            props.value = option.value;
            if (self.props.mutable) {
              props.checked = self.state[option.key];
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }
            return (
              <div className="field">
                <div className="ui checkbox" key={key}>
                  <input ref={c => {
                    if (c && self.props.mutable) {
                      self.options[`child_ref_${option.key}`] = c;
                    }
                  } } {...props} />
                  <label>{option.text}</label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class RadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = this.props.data.inline ? 'inline fields' : 'grouped fields';

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={`${containerClass(this.props)} ${classNames}`}>
          <ComponentLabel className="form-label" {...this.props} />
          {this.props.data.options.map((option) => {
            const this_key = `preview_${option.key}`;
            const props = {};
            props.id = self.props.data.id;
            props.name = self.props.data.field_name;
            props.onChange = this.props.onChange;

            props.type = 'radio';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined &&
                (self.props.defaultValue.indexOf(option.key) > -1 || self.props.defaultValue.indexOf(option.value) > -1));
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }

            return (
              <div className="field">
                <div className="ui radio checkbox">
                  <input ref={c => {
                    if (c && self.props.mutable) {
                      self.options[`child_ref_${option.key}`] = c;
                    }
                  } } {...props} />
                  <label className={classNames} key={this_key}>
                    {option.text}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class Image extends React.Component {
  render() {
    const style = (this.props.data.center) ? { textAlign: 'center' } : null;

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses} style={style}>
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} required={stringToBool(this.props.data.required)} />
        }
        { this.props.data.src &&
          <img src={this.props.data.src} width={this.props.data.width} height={this.props.data.height} />
        }
        { !this.props.data.src &&
          <div className="no-image">No Image</div>
        }
      </div>
    );
  }
}

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;
    props.onChange = this.props.onChange;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.disabled = this.props.read_only;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          <StarRating {...props} />
        </div>
      </div>
    );
  }
}

class HyperLink extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <a target="_blank" href={this.props.data.href}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}

class Download extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <a href={`${this.props.download_path}?id=${this.props.data.file_path}`}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = { img: null };
  }

  displayImage = (e) => {
    const self = this;
    const target = e.target;
    let file; let
      reader;

    if (target.files && target.files.length) {
      file = target.files[0];

      // eslint-disable-next-line no-undef
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        self.setState({
          img: reader.result,
        }, () => {
          this.props.onChange(e);
        });
      };
    }
  };

  clearImage = () => {
    this.setState({
      img: null,
    });
  };

  render() {
    let baseClasses = 'SortableItem rfb-item ui form';
    const name = this.props.data.field_name;
    const id = this.props.data.id;
    const fileInputStyle = this.state.img ? { display: 'none' } : null;
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }
    let sourceDataURL;
    if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
      if (this.props.defaultValue.indexOf(name > -1)) {
        sourceDataURL = this.props.defaultValue;
      } else {
        sourceDataURL = `data:image/png;base64,${this.props.defaultValue}`;
      }
    }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          {this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0
            ? (<div><img src={sourceDataURL} /></div>)
            : (<div className="image-upload-container">

            <div style={fileInputStyle}>
              <input id={id} name={name} type="file" accept="image/*" capture="camera" className="image-upload" onChange={this.displayImage} />
              <div className="image-upload-control">
                <div className="btn btn-default btn-school"><i className="fa fa-camera"></i> Upload Photo</div>
                <p>Select an image from your computer or device.</p>
              </div>
            </div>

            { this.state.img &&
              <div>
                <img src={ this.state.img } height="100" className="image-upload-preview" /><br />
                <div className="btn btn-school btn-image-clear" onClick={this.clearImage}>
                  <i className="fa fa-times"></i> Clear Photo
                </div>
              </div>
            }
          </div>)
        }
        </div>
      </div>
    );
  }
}

class Attachment extends React.Component {

  constructor(props){
    super(props);
    let name = null;
    let file = null;

    if(props.defaultValue && typeof props.defaultValue === "string" && props.defaultValue !== ""){
      name = props.defaultValue.substring(props.defaultValue.lastIndexOf("/") + 1, props.defaultValue.lastIndexOf("?"));
      file = props.defaultValue;
    }

    this.state = {
      file,
      name
    }
  }

  setFile = (e) => {
    const self = this;
    const target = e.target;
    let file; let
      reader;

    if (target.files && target.files.length) {
      file = target.files[0];

      // eslint-disable-next-line no-undef
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        self.setState({
          file: reader.result,
          name: target.files[0].name
        }, () => {
          this.props.onChange(e);
        });
      };
    }
  };

  clearFile = () => {
    this.setState({
      file: null,
      name: null
    }, () => {
      this.props.onChange();
    });
  };

  render() {
    let baseClasses = 'SortableItem rfb-item ui form';
    const name = this.props.data.field_name;
    const id = this.props.data.id;
    const fileInputStyle = this.state.name ? { display: 'none' } : null;
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }
    let sourceDataURL;
    if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
        sourceDataURL = this.props.defaultValue;
    }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={containerClass(this.props)}>
          <ComponentLabel {...this.props} />
          {this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0
            ? (<div><span>{sourceDataURL}</span></div>)
            : (<div className="image-upload-container">

            <div style={fileInputStyle}>
              <input id={id} name={name} type="file" accept="*" className="image-upload" onChange={this.setFile} />
              <div className="image-upload-control">
                <div className="btn btn-default btn-school"><i className="fa fa-file"></i> Upload File</div>
                <p>Select an file from your computer or device.</p>
              </div>
            </div>

            { this.state.name &&
              <div>
                <span>{ this.state.name }</span><br />
                <div className="btn btn-school btn-image-clear" onClick={this.clearFile}>
                  <i className="fa fa-times"></i> Clear File
                </div>
              </div>
            }
          </div>)
        }
        </div>
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
    this.state = this.stateObject();
  }

  handleChange = (e) => {
    const option = this.props.data.options.find(option => option.value === e.target.value)

    if(option){
      this.setState({
        [option.key]: e.target.checked
      }, () => {
        this.props.onChange(e)
      })
    }
  };

  stateObject = () => {
    const state = {};
    this.inputField = React.createRef();
    return state;
  }

  handleChange = (e, rowIndex, index) => {
    let pepe = 0;
    const option = this.props.data.options.body[rowIndex][index].find(option => option.value === e.target.value)

    // if(option){ 
    //   this.setState({
    //     [option.key]: e.target.checked
    //   }, () => {
    //     this.props.onChange(e)
    //   })
    // }
  };

  addRow = (rowIndex, evt) => {
    // this_element.options.header.splice(index + 1, 0, { value: '', text: '', key: ID.uuid() });
    evt.preventDefault();
    const this_body = [...this.props.data.options];
    // const this_body = this.props.data.options;
    let newRow = {};
    for (const prop in this_body[0]) {
      newRow[prop] = "";
    }
    this_body.splice(rowIndex + 1, 0, newRow);
    this.props.onChange(this_body, this.props.index)
  }

  removeRow = (rowIndex, evt) => {
    evt.preventDefault();
    const newRows = this.props.data.options.filter((row, index) => index !== rowIndex);
    this.props.onChange(newRows, this.props.index);
  }

  updateCellValue = ({ value, rowIndex, cell }) => {
    const tempValues = [...this.props.data.options];
    const selectedRow = {...tempValues[rowIndex]}
    selectedRow[cell] = value;
    tempValues[rowIndex] = selectedRow;
    this.props.onChange(tempValues, this.props.index)
  }

  render() {
    const self = this;
    let classNames = this.props.data.inline ? 'inline fields' : 'grouped fields';

    let baseClasses = 'SortableItem rfb-item ui form';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className={`${containerClass(this.props)} ${classNames}`}>
          <ComponentLabel className="form-label" {...this.props} />
          <table>
            <thead>
              <tr>                
                {Object.keys(this.props.data.options[0]).map((col, index) => {
                  const key = `header_${index}_${col}`;
                  return (
                    <th key={key} >{col}</th>
                  );
                })}
              <th key={'add_newRow'} >Add Row</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.options?.map((row, rowIndex)=>{
                const trKey = `row_${rowIndex}`;
                return(
                  <tr key={trKey}>
                  {Object.keys(row).map((cell, headerIndex) => {
                    const tdKey = `td_${rowIndex}_${headerIndex}`;
                    const props = {};
                    props.type = 'text';
                    props.className = 'form-control';
                    //props.id = row[cell];
                    props.id = tdKey;
                    props.ref = this.inputField;
                    props.value = row[cell];
                    props.defaultValue = row[cell];
                    return (
                      <td key={tdKey} >
                        <input 
                          onChange={ e => {
                            this.updateCellValue({value: e.target.value, rowIndex, cell})
                          }} 
                          {...props} />
                      </td>
                    );
                  })}
                  <td>
                    
                  <button onClick={this.addRow.bind(this, rowIndex)} className="ui mini button positive"><i className="fa fa-plus-circle"/></button>
                    { rowIndex > 0
                      && <button onClick={this.removeRow.bind(this, rowIndex)} className="ui mini button negative"><i className="fa fa-minus-circle"/></button>
                    }
                  </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.Attachment = Attachment;
FormElements.Table = Table;

export default FormElements;
