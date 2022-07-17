import React from 'react';
import {card, CardMedia, CardContent, CardActions, Typography, IconButton, Card} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { mergeClasses } from '@material-ui/styles';
import useStyles from './styles';

function Product({product}) {
    const classes = useStyles();
    console.log(product);
  return (
    <Card className={classes.root}>
       
        <CardMedia className={classes.media} image={product.img} title={product.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography varient='h5' gutterBottom>
                    {product.name}
                </Typography>
                <Typography varient='h5'>
                    {product.price}
                </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{__html : product.description}} varient='body2' color='textSecondary'/>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton area-label='Add to cart'>
                <AddShoppingCart/>
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product