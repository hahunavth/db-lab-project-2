import React from "react";
import styles from "../../styles/Home.module.css";
import Footer from "./Footer";
import Head from "./Head";
import Navbar from "./Navbar";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  // return (
  //   <>
  //     <Head />
  //     <Navbar />
  //   </>
  // );

  return (
    <div className={styles.container}>
      <Head />
      <Navbar />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        Powered by <span className="font-bold text-lg pl-2"> Group 11</span>
        <span className={styles.logo}></span>
      </footer>
    </div>
  );
};

export default Layout;
