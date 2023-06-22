import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';
import { authOptions } from '@/utils/authOptions';
import { AppContextProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatGPT Messenger',
  description: 'Clone from Chat GPT, consuming the OpenAi API',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <SessionProvider >
          <AppContextProvider>
          {!session ? (
            <Login />
          ) : (
            <div className="flex overflow-x-hidden">
              <Sidebar />

              <ClientProvider />

              <div className="bg-openai-500 flex-1 overflow-hidden transition-all">{children}</div>
            </div>
          )}
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
