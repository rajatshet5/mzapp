import { Grid, makeStyles } from "@material-ui/core";
import styled from "styled-components";


const Image = styled.img`
width: 100%;
border-radius: 5px;
`;

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
        padding: "19px 60px"
    },
    item: {
        
    }
})

export function Gallery({ images }) {
    const classes = useStyles();
    return (
        <div>
            <Grid className={classes.container} container spacing={8}>
                {images.map(item => (
                    <Grid className={classes.item} item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Image src={item.urls.small}>
                        </Image>
                    </Grid> 
                ))}
            </Grid>
        </div>
    )
}