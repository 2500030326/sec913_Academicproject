import RoleBasedRoute from '../routes/RoleBasedRoute';

const AdminRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['admin']} fallback="/access-denied">
    {children}
  </RoleBasedRoute>
);

export default AdminRoute;
