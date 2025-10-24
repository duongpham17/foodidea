import { metadata } from '@metadata';
import ProfileId from 'routes/public/profile/[id]';
import { api } from '@database/api';
import { IUsersApi } from '@database/models/users'; 

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Await params before accessing id
    const res = await api.get(`/public/profile/${id}`);
    const user: IUsersApi = res.data.data.user;

    return metadata({
      title: `${user.username}`,
      description: `Profile of user ${user.username}`,
    });
  } catch (error) {
    return metadata({
      title: `User not found`,
      description: `Could not load user page.`,
    });
  }
};

const ProfileIdPage = async () => {
  return (
    <main>
      <ProfileId />
    </main>
  );
};

export default ProfileIdPage