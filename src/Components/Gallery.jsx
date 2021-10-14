import { Grid, makeStyles } from "@material-ui/core";
import styled from "styled-components";


const Image = styled.img`
width: 100%;
border-radius: 5px;
`;
const GalleryCont = styled.div`
background-color:  #0a0e18;
min-height: 100vh;
/* border:3px solid green; */
margin: 39px 0px;
padding: 49px;
`;
const SpinnerCont = styled.div`
margin:19px auto;
width: 15%;
padding: 180px 50px;
`;
const Spinner = styled.div`
  border: 10px solid #85888a; /* Light grey */
  border-top: 10px solid #00aaff; /* Blue */
  border-radius: 50%;
  width: 159px;
  height: 159px;
  animation: spin 0.5s linear infinite;
  padding: 50px;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
        // border: "2px solid green",
        // padding: "19px 60px"
    },
    item: {
        display: "flex",
        height: "503px"
    }
})

export function Gallery({ images, searchLoading }) {
    const classes = useStyles();
    return (
        <GalleryCont>
            {!searchLoading ? <Grid className={classes.container} container spacing={8}>
                {images.map(item => (
                    <Grid className={classes.item} item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Image src={item.urls.small}>
                        </Image>
                    </Grid>
                ))}
            </Grid> : (
                    <SpinnerCont>
                        <Spinner></Spinner>
                    </SpinnerCont>
            )}
        </GalleryCont>
    )
}