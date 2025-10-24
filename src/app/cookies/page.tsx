import { metadata } from '@metadata';
import Cookies from 'routes/public/cookies';

export function generateMetadata() {
  return metadata({
    title: "Cookies",
    description: "how our cookies work in this app."
  });
};

export default function Page() {
  return (
    <main>
      <Cookies />
    </main>
  )
}