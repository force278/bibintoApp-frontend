import { Header } from "./Header";


function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center" style={{paddingTop: '71px'}}>{children}</div>
    </>
  );
}

export default Layout;
