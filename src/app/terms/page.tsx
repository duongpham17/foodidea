import { metadata } from '@metadata';
import Terms from 'routes/public/terms';

export function generateMetadata() {
  return metadata({
    title: "Terms and conditions",
    description: "The terms and conditions of the website for users and their rights and our rights."
  });
};

export default function Page() {
  return (
    <main>
      <Terms />
    </main>
  )
}