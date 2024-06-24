/* eslint-disable react/prop-types */
export default function UserMessage({ message, index }) {
    return (
        <div style={{ padding: '3rem 3rem', border: '1px solid black' }}>
            use message : {message}
            <div>{index}</div>
        </div>
    );
}
