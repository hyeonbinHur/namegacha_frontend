import { useSelector } from 'react-redux';

export default function ChatResult() {
    const messages = useSelector((state) => state.currentThread.messages);

    return (
        <div>
            <button onClick={() => console.log(messages)}>Show Messages</button>
            {messages.length === 0 ? (
                <div> no messages yet</div>
            ) : (
                <div>
                    {messages.data.messages.map((m, index) => (
                        <li key={index}>{m[0].text.value}</li> // Ensure to return this line
                    ))}
                </div>
            )}
        </div>
    );
}
