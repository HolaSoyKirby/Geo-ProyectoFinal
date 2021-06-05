const registerForm = document.getElementById('registerForm');
let isBusy = false;

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isBusy == false) {
        console.log(isBusy);
        isBusy = true;
        let txtError = document.getElementById('txtError');
        txtError.style.visibility = 'hidden';

        console.log('registrando');
        const nombre = registerForm['txtNombre'].value;
        const edad = registerForm['txtEdad'].value;
        const curp = registerForm['txtCurp'].value;
        const telefono = registerForm['txtTelefono'].value;
        const email = registerForm['txtEmail'].value;
        const password = registerForm['txtPassword'].value;

        console.log(`${nombre} ${edad} ${curp} ${telefono} ${email} ${password}`);

        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            await db.collection('usuarios').doc(cred.user.uid).set({
                nombre: nombre,
                edad: edad,
                curp: curp,
                telefono: telefono
            });

            let usuario = {
                nombre: nombre,
                edad: edad,
                curp: curp,
                telefono: telefono,
                email: email
            };

            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            window.location = '../pages/mapa.html';
        } catch (error) {
            console.log(error);
            txtError.innerHTML = errorMessage(error.code);
            txtError.style.visibility = 'visible';
        }
        isBusy = false;
    }
});

errorMessage = (error) => {
    switch (error) {
        case 'auth/invalid-email':
            return 'Ingrese un correo electrónico válido';
        case 'auth/weak-password':
            return 'La contraseña debe contener un mínimo de 6 caracteres';
        case 'auth/email-already-in-use':
            return 'El correo electrónico ingresado ya está registrado';
        default:
            return error;
    }
}

irALogin = () => {
    window.location = '../pages/login.html';
}