import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from "react-router-dom";

const reactElement = document.getElementById("root");
const root = ReactDOM.createRoot(reactElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)