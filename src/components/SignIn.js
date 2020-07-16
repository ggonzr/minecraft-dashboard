import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Icon from '@material-ui/core/Icon';

//==================== Autenticación ================================================

function auth(usuario, contraseña, toastr, setToastr) {
  //Verificar los datos
  console.log('Usuario: ', usuario);
  console.log('Clave: ', contraseña);
  //Aparecer Toastr
  setToastr({...toastr, open: true, type: 'success', message: 'Pipo'});    
};

//==================== Componente Grafico ============================================

function Toastr(props) {
  console.log("Toastr");
  console.log(props.toastr);
  const classes = props.classes;
  //============ Elementos de Toastr ===============
  // No sé por que la desestructuración de objetos saca undefined :'(
  const open = props.toastr.open;
  const type = props.toastr.type;
  const message = props.toastr.message;
  const handleClose = props.toastr.handleClose;
  //=================================================
  if (!open) {
    return null;
  }
  return (    
    <div className={classes.toastr}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
          {message}
      </MuiAlert>
    </Snackbar>
    </div>
  );   
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Minecraft Tantrico Server
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/images/minecraft-wall-1.jpg)',    
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icono: {
    textAlign: 'center',    
    height: '50px',
    width: '50px',
    margin: theme.spacing(0, 0, 2, 0),
  },
  toastr: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignInSide() {
  //Usar el estilo CSS de Material-UI.
  const classes = useStyles();
  
  //Variables de Estado usando React Hooks.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  

  //Snackbar -  Toastr    
  const handleClose = (event, reason) => {    
    if (reason === 'clickaway') {
      return;
    }
    setToastr({...toastr, open: false});
  };

  const [toastr, setToastr] = useState({open: false, message: '', type: '', handleClose: handleClose});

  //Componente Grafico.
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>          
          <Icon classes={{root: classes.icono}}>
            <img className={classes.icono} src="/images/minecraft-icon.png" alt="background-wallpaper"/>
          </Icon>          
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              onChange={event => setUsername(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {                
                event.preventDefault();
                auth(username, password, toastr, setToastr);
              }}
            >
              Ingresar
            </Button>
            <Grid container>              
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Toastr classes={classes} toastr={toastr}/>     
    </Grid>    
  );
}