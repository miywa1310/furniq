import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { GlobalProvider } from "./providers/GlobalProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalProvider>,
);
