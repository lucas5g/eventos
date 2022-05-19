export function Select({
    label,
    name,
    value,
    options,
    handleChange
}) {
    return (

        <div className="form-group mb-3">
            <label htmlFor={name}>{label}</label>
         
            <select
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                className="select form-control form-control-lg"
                required
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}