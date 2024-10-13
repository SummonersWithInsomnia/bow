function SearchBoxComponent({ placeholder, onChangeHandler }) {
    return(
        <>
            <input
                type="search"
                placeholder={ placeholder }
                onChange={ onChangeHandler }
            />
        </>
    );
}

export default SearchBoxComponent;