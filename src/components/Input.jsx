export function Input({
    type = 'text',
    label,
    name,
    value,
    handleChange
 }) {

    return (
        <div className="form-group mb-3">
            <label  htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                className="form-control"
                value={value}
                onChange={handleChange}
                placeholder={label}
            />
        </div>
    )


}