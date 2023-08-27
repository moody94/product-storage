import Router from "./router/Router";
import { ChakraProvider } from "@chakra-ui/react";

// import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

export default App;
