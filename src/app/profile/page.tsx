import { redirect } from 'next/navigation';
import { inter } from '@/lib/fonts';
import Orders from '@/components/Orders/Orders';
import { fetchProfile } from '@/app/profile/getProfile.service';
import { fetchApprovedOrders } from '@/app/profile/getApprovedOrders.service';

async function Profile() {
  const user = await fetchProfile();
  if (!user) {
    redirect('/signin');
  }
  const approvedOrders = (await fetchApprovedOrders()) || [];

  return (
    <main className={`${inter.className} flex min-w-full max-w-7xl grow flex-col`}>
      <h2 className="pt-4 text-4xl">{user?.email}</h2>
      <h3 className="mb-4 pt-4 text-2xl">Approved orders</h3>
      {approvedOrders.length > 0 ? (
        <Orders orders={approvedOrders} />
      ) : (
        <p>You haven&#39;t made any purchase yet</p>
      )}
    </main>
  );
}
export default Profile;
