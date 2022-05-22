export function Select({
    label,
    name,
    value,
    options,
    handleChange
}) {
    return (

        <div className="input-group-lg mb-3">
            <label htmlFor={name}>{label}</label>
         
            <select
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                className="select form-control"
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