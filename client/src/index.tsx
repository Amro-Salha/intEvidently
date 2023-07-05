import ReactDOM from 'react-dom/client'
import App from 'App'
import './reset.css'

if (window.location.hostname === '127.0.0.1') {
  window.location.replace('http://localhost:3000');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(<App />)