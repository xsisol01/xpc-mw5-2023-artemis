import { FC, memo } from "react";

import { navbarData } from "./navbar.data";

import { Typography } from "@mui/material";
import Link from "next/link";
import { capitalizeText } from "@/app/utils/capitalizeText";
import AdminButton from "@/app/components/shared/button/adminButton/AdminButton";

import styles from "./navbar.module.scss";

const Navbar: FC = memo(() => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        {navbarData.navLink.map((t) => (
          <li key={t.link}>
            <Link href={{
                pathname: t.link
            }}>
              <Typography variant="h6">{capitalizeText(t.name)}</Typography>
            </Link>
          </li>
        ))}
        <li>
          <AdminButton />
        </li>
      </ul>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
