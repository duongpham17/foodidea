import { metadata } from '@metadata';
import Home from 'routes/public/home';

export function generateMetadata() {
  return metadata({
    title: "Home",
    description:"Home of the greatest food ideas, store and share you recipes."
  });
};

export default function Page() {
  return (
    <main>
      <Home />
    </main>
  )
}