/* eslint-disable react/prop-types */

export default function NameCard({ names, selectNewItem }) {
    return (
        <div>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>
                        <NameCardUnit
                            name={name}
                            selectNewItem={selectNewItem}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const NameCardUnit = ({ name, selectNewItem }) => {
    return (
        <div>
            {name}
            <button onClick={() => selectNewItem(name)}>select</button>
        </div>
    );
};
