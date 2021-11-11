import { Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from 'uuid';



const Image = styled.img`
width: 100%;
border-radius: 5px;
`;
const GalleryCont = styled.div`
background-color:  #0a0e18;
min-height: 100vh;
/* border:3px solid green; */
margin: 31px 0px;
padding: 49px;
`;
const SpinnerCont = styled.div`
margin:19px auto;
width: 19%;
padding: 130px 80px;
/* border: 3px solid white; */
position: fixed;
top: 19%;
right: 33.7%;
`;
const Spinner = styled.div`
  border: 9.5px solid #85888a; /* Light grey */
  border-top: 9.8px solid #00aaff; /* Blue */
  border-radius: 50%;
  width: 143px;
  height: 143px;
  animation: spin 0.5s linear infinite;
  padding: 30px;

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
  /* border:3px solid red; */
  div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: moreLoading 0.8s cubic-bezier(0, 0.5, 0.5, 1) infinite;
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
const More = styled.div`
height: 190px;
display: flex;
align-items: center;
justify-content: center;
/* border: 3px solid white; */
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
                    <Grid key={uuid()}  className={classes.item} item xs={12} sm={6} md={3} lg={4} xl={3}>
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
        <More>
            {moreLoading && <><MoreLoading>
                                <div></div>
                                <div></div>
                                <div></div>
                            </MoreLoading></>
            }
        </More>
      </>
    )
}