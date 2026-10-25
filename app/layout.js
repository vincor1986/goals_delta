import "./globals.css";

export const metadata = {
  title: "Goals Δ",
  description: "Wave trading with football data",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
