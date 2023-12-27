import {useState} from 'react'

function App(props) {
    const [count, setCount] = useState(0);
    const subject = props.suject;


    return (
        <div>
            <h1>Hello {subject}</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </div>
    )
}

export default App
