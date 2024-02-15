import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";


export const metadata = {
  title: "Garantia-app",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      elements: {
        footer: "hidden",
      }
    }}>
    <html lang="en">
        <body>
        <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}