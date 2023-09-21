import "@styles/globals.css";

export const metadata = {
  title: "Promptly",
  description: "Share prompts for our lord and saviour chatGPT",
};
const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;