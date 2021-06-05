const loginForm = document.getElementById('loginForm');
let isBusy = false;



loginForm.addEventListener('submit', async (e) => {
    if (isBusy == false) {
        console.log(isBusy);
        isBusy = true;
        let txtError = document.getElementById('txtError');
        txtError.style.visibility = 'hidden';

        e.preventDefault();
        console.log('Iniciando Sesión');

        const email = loginForm['txtEmail'].value;
        const password = loginForm['txtPassword'].value;

        try {
            const cred = await auth.signInWithEmailAndPassword(email, password);
            const doc = await db.collection('usuarios').doc(cred.user.uid).get();
            let usuario = doc.data();
            usuario.email = email;
            
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            window.location = '../pages/mapa.html';
        } catch (error) {
            console.log(error);
            document.getElementById('txtError').innerHTML = errorMessage(error.code);
            txtError.style.visibility = 'visible';
        }
        isBusy = false;
    }
})

errorMessage = (error) => {
    switch (error) {
        case "auth/user-not-found":
            return "El correo ingresado no ha sido registrado";
        case "auth/wrong-password":
            return "Contraseña incorrecta";
        default:
            return error;
    }
}

irARegistro = () => {
    window.location = '../pages/register.html';
}