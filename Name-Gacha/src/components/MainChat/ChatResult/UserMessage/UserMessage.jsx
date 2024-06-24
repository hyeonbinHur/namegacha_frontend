/* eslint-disable react/prop-types */
export default function UserMessage({ message }) {
    return (
        <div style={{ padding: '3rem 3rem', border: '1px solid black' }}>
            use message : {message}
        </div>
    );
}
