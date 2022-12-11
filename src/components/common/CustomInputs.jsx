import React from "react";
export const CustomSimpleInput = React.forwardRef(({
  label = "",
  name = "",
  value = "",
  placeholder = "",
  onChange = () => {},
  required = true,
  ...props
},ref) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div className="input-group">
      <input
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        ref={ref}
        {...props}
      />
    </div>
  </div>
));
export const CustomTeaxtArea =React.forwardRef( ({
  label = "",
  name = "",
  value = "",
  placeholder = "",
  onChange = () => {},
  required = true,
  rows = "3",
  helper = "",
  ...props
},ref) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div className="input-group">
      <textarea
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        ref={ref}
        {...props}
        rows={rows}
      />
    </div>
    <div className="form-text">{helper}</div>
  </div>
));

export const CustomInputAlt = ({
  label = "",
  name = "",
  value = "",
  placeholder = "",
  onChange = () => {},
  required = true,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div className="input-group input-group-alt">
      <input
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  </div>
);
