import Dashboard from 'routes/private/dashboard';
import { metadata } from '@metadata';

export function generateMetadata() {
  return metadata({
    title: "Dashboard",
    description:"Dashboard for logged in users."
  });
};

const DashboardPage = () =>  {
  return (
    <main>
      <Dashboard />
    </main>
  )
};

export default DashboardPage;