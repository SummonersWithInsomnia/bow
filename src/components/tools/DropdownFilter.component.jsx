function DropdownFilterComponent({friendlyName, options, onChangeHandler}) {
    return (
        <div className="dropdownFilter">
            <select className="dropdownSelect" onChange={onChangeHandler}>
                <option value="">{friendlyName}</option>
                {options.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
        </div>
    )
}

export default DropdownFilterComponent;