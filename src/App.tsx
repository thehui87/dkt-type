import { ReactComponent as Logo } from './logo.svg'
import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <Logo className="App-logo w-128 h-128" />
            </header>
        </div>
    )
}

export default App
