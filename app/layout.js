import '@/styles/globals.css'
import Provider from '@/components/Provider'
import Navbar  from '@/components/Navbar.jsx'


export const metadata = {
  title: 'smartbudget',
  description: 'Use ai to manage your budget',
}

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <main className='app'>
          <Navbar />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;