import img from "../images/pexels-5.jpg"

const HomePage = () => {
  return (
    <div style={{
      position: "relative",
      textAlign: "center",
      color: "white",
      
    }}>
      <img src={img} alt="Img" style={{ width: "100%" }} />

      <h1 style={{
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "50px",
  width: "500px",
}}> <span>Who does not like TRIPS?</span> <br/><span>Ready to GRIP?</span>  </h1>


    </div>

  );
}



// <Box
//   sx={{
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 'calc(100vh - 100px)',
//   }}
// >
//   <Text size='xl' weight='bold' align='center'>
//    Who does not like TRIPS? Ready to GRIP?
//   </Text>
// </Box>


export default HomePage
