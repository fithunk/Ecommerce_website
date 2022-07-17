import {React , useState, setState} from 'react';
import {AppBar, ToolBar, IconButton, Badge, MenuItem, Menu, Typography, Toolbar} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../assets/mainCart.png';
import useStyle from './style'
import axios from 'axios'
import Search from '../../App'

const Navbar = ({products}) => {
    const classes = useStyle();
    const [key,setKey] = useState("");

    

  return (
    <>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
                <Typography varient='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt='E-Commerce' height='25px' className={classes.image}/>
                    E-Commerce
                </Typography>
                <div className={classes.grow}/>
                
                <div className={classes.button}>
                    <IconButton aria-label="Show cart items" color="inherit">
                        <Badge  color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar