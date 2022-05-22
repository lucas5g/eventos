export function Input({
    type = 'text',
    label,
    name,
    value,
    handleChange,
    required = false
 }) {

    return (
        <div className="input-group-lg mb-3">
            <label  htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                className="form-control"
                value={value}
                onChange={handleChange}
                placeholder={label}
                autoComplete="off"
                required={required}
            />
        </div>
    )


}