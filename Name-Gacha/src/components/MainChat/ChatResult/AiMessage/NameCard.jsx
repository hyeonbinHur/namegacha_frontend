/* eslint-disable react/prop-types */

export default function NameCard({ names }) {
    return (
        <div>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>
                        <NameCardUnit name={name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const NameCardUnit = ({ name }) => {
    return <div>{name}</div>;
};
