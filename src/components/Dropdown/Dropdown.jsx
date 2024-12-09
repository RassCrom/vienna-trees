import styles from './Dropdown.module.css';

function Dropdown({ treeTypeList, handleSelectedTree }) {
    return (
        <div className="">
            <h2 className="mb-2.5">Choose tree type</h2>
            <div className={styles.input_container}>
                <select
                    onFocus={(e) => (e.target.size = 10)}
                    onBlur={(e) => (e.target.size = 1)}
                    onChange={(e) => {
                        e.target.size = 1;
                        e.target.blur();
                        handleSelectedTree(e.target.value)
                    }}
                    className={styles.dropdown}
                >
                    <option value="all">All</option>
                    {treeTypeList.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Dropdown;
