import { Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
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


const MoreLoading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 19px auto;
  div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: moreLoading 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  & :nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
& :nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
& :nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes moreLoading {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
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

export function Gallery({ images, searchLoading, moreLoading }) {
    const classes = useStyles();
    return (
        <>
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
            {moreLoading && <MoreLoading class="lds-facebook">
                                <div></div>
                                <div></div>
                                <div></div>
                            </MoreLoading>
            }
        </>
    )
}