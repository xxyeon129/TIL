import Navigation from '../components/navigation';

export const metadata = {
  title: {
    template: '%s | Next Movies',
    default: 'Next Movies',
  },
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
