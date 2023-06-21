import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatGPT Messenger',
  description: 'Clone from Chat GPT, consuming the OpenAi API',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-openai-800 max-w-xs overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>

              <ClientProvider />

              <div className="bg-openai-500 flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
