import './ChatBox.css';
import axios from 'axios';

export default function ChatBox() {
    const getData = async () => {
        axios
            .get('http://localhost:8080/namegacha/api/projects')
            .then((response) => {
                console.log('Data fetched:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    return (
        <div className="chat-box-container">
            <div className="chat-content-container">
                <input className="user-input-content" type="text" />

                <div className="chat-button-container">
                    <div className="name-style-container">
                        <button>Camel</button>
                        <button>Pascal</button>
                        <button>Snake</button>
                        <button onClick={() => getData()}>Get Projects</button>
                    </div>

                    <div>
                        <button>send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
