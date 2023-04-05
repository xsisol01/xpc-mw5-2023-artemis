import { FC } from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

import SearchProduct, { ISearchProductProps } from "@/app/components/shared/searchProduct/SearchProduct";
import withUrlSearchParams from "@/app/components/shared/hoc/withUrlSearchParams";
import Navbar from "@/app/components/ui/navbar/Navbar";

import { headerData } from './header.data'

import styles from './header.module.scss'




interface IProps {
  contentPage?: 'home'
}

const Header: FC<IProps> = ({contentPage}) => {

  return (
    <AppBar>
      <Toolbar sx={{backgroundColor: "black"}}>
          <Typography noWrap={true} variant='h5' sx={{mr: 2, fontWeight: 700}}>
              {headerData.title.toUpperCase()}
          </Typography>
          { contentPage === 'home' && 
              withUrlSearchParams<ISearchProductProps>(SearchProduct)({
                uid: 'search'
              })
          }
          <Box sx={{flexGrow: 1}}>
              <Navbar />
          </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header