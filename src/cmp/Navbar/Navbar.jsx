import {
    Stack,
    Container,
    Button
} from "@mui/material"
import "./Navbar.css"

const Navbar = ()=>{
    const design = (
        <>
        <Stack className="bg-light">
            <Container className="bg-light">
            <Stack direction={"row"} justifyContent={"space-between"}>
                <h2>Home</h2>
                <Stack direction={"row"} spacing={2}>
                <Button>Login</Button>
                </Stack>
            </Stack>
            </Container>
        </Stack>
        </>
    )
    return design
}
export default Navbar