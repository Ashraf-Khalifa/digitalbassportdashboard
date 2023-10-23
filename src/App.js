// Import necessary components and modules
import ProtectedRoute from "./views/ProtectedRoute";
import LoginForm from "./views/Login"; // Your login component
import routes from "./routes"; // Your route configuration

function App() {
  return (
    <div>
      {/* Define your login route */}
      <Route path="/" element={<LoginForm />} />

      {/* Create a ProtectedRoute component for your admin routes */}
      <ProtectedRoute>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.layout + route.path}
            element={route.component}
          />
        ))}
      </ProtectedRoute>
    </div>
  );
}
