/* eslint-disable react/prop-types */
export default function NameCard({ names }) {
    return (
        <div>
            <ul>
                {names.map((name) => (
                    <li key={name}>
                        <NameCardUnit name={name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const NameCardUnit = (name) => {
    return <div>{name}</div>;
};
