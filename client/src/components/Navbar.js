import { Box, AppBar, Container, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link to="/">Pern Stack</Link>
            </Typography>
            <Button variant="contained" onClick={() => navigate("/tasks/new")}>
              Click me
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
