import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function App() {

  const [count, setCount] = useState(0)
  const [data, setData] = useState([]); // Estado para guardar la información
  const url = "https://jsonplaceholder.typicode.com/users"; // URL de prueba


  useEffect(() => {
    if(count > 10){
      alert("no we no");
      setCount(0);
    } 
  }, [count]);

  useEffect(()=>{

    fetch(url)
    .then(response => response.json())
    .then(data => setData(data));


  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br />
        <br />
          <TableContainer component={Paper}>
            <Table
                sx={{
                  minWidth: "300px",
                  backgroundColor: "#242424",
                  border: "2px solid white", // Borde alrededor de la tabla
                  "& .MuiTableCell-root": {
                    color: "white",
                    
                  },
                }}
                aria-label="simple table"
              >

              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Usuario</TableCell>
                  <TableCell align="center">Correo</TableCell>
                  <TableCell align="center">Ciudad</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.address.city}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

        <p>
          hola prueba de angel ruiz
        </p>

      </div>

      <p className="read-the-docs">
        Nah id win
      </p>
    </>
  )
}

export default App
