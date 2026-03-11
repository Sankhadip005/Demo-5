import { Box, Typography, Button } from "@mui/material";

export default function Hero(){

return(

<Box
sx={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"80px 100px",
background:"#F8FAFC"
}}
>

<Box maxWidth="600px">

<Typography
variant="h2"
fontWeight="bold"
>
Learn Smarter,
<span style={{
background:"linear-gradient(90deg,#4F6BED,#F97316)",
WebkitBackgroundClip:"text",
color:"transparent"
}}>
 Not Harder
</span>
</Typography>

<Typography mt={2} color="text.secondary">
Transform your future with AI-powered personalized education.
</Typography>

<Box mt={3}>

<Button
variant="contained"
sx={{
mr:2,
background:"linear-gradient(90deg,#4F6BED,#F97316)"
}}
>
Explore Courses
</Button>

<Button variant="outlined">
Watch Demo
</Button>

</Box>

</Box>

</Box>

)

}