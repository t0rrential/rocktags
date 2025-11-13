import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { admin_auth } from '@/config/firebase-admin';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('firebase-auth-token')?.value
  
  if (!authToken) {
    redirect('/login')
  }

  try {
    // Verify token with Firebase Admin SDK
    const decodedToken = await admin_auth.verifyIdToken(authToken)
    // Token is valid, user is authenticated
  } catch (error) {
    // Token is invalid or expired, redirect to login
    redirect('/login')
  }
  
  return (
    <div>
      <div className="mt-20">{children}</div>
    </div>
  )
}