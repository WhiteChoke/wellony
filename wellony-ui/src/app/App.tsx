import AuthProvider from "../entities/providers/AuthProvider.tsx";
import WebSocketProvider from "../entities/providers/WebSocketProvider.tsx";
import {RouterProvider} from "react-router";
import {routes} from "./providers/Routes.tsx";

function App() {
    return (
        <AuthProvider>
            <WebSocketProvider>
                <RouterProvider router={routes} />
            </WebSocketProvider>
        </AuthProvider>
    );
}

export default App;