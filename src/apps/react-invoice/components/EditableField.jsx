import React from 'react';

function EditableField(props) {
  const {
    cellData: {
      leading,
      type,
      placeholder,
      min,
      name,
      id,
      value,
      step,
      precision,
      textAlign,
    },
    onItemizedItemEdit,
  } = props;

  return (
    <div className={`editable-field ${textAlign}`}>
      {leading != null && (
        <div className="leading">
          <span className="leading-icon">{leading}</span>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        min={min}
        name={name}
        id={id}
        value={value}
        step={step}
        precision={precision}
        aria-label={name}
        onChange={onItemizedItemEdit}
        required
      />
    </div>
  );
}

export default EditableField;
