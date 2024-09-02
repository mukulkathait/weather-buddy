import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/authComponents/AuthLayout";
import Authentication from "./authentication/Authentication";
import Homepage from "./components/homepage/Homepage";
import ApiComponent from "./components/apiKey/ApiComponent";
import Layout from "./components/Layout";
import Missing from "./components/Missing";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<AuthLayout authentication={false} />}>
        <Route path="/" element={<Authentication />} />
      </Route>

      <Route path="/" element={<AuthLayout authentication />}>
        {/* protected routes */}
        <Route path="/" element={<Layout />}>
          <Route path="homepage" element={<Homepage />} />
          <Route path="/api-keys" element={<ApiComponent />} />
        </Route>
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
