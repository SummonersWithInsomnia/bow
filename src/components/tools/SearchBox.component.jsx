function SearchBoxComponent({placeholder, onChangeHandler}) {
    return (
        <>
            <div className="searchBox">
                <input
                    type="search"
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                />
            </div>
        </>
    );
}

export default SearchBoxComponent;