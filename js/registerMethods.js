const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
    let txtError = document.getElementById('txtError');
    txtError.style.visibility = 'hidden';

    e.preventDefault();
    console.log('registrando');
    const nombre = registerForm['txtNombre'].value;
    const edad = registerForm['txtEdad'].value;
    const curp = registerForm['txtCurp'].value;
    const telefono = registerForm['txtTelefono'].value;
    const email = registerForm['txtEmail'].value;
    const password = registerForm['txtPassword'].value;

    console.log(`${nombre} ${edad} ${curp} ${telefono} ${email} ${password}`);

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user.uid);
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: nombre,
            edad: edad,
            curp: curp,
            telefono: telefono
        });


    }).then(() => {
        let usuario = {
            nombre: nombre,
            edad: edad,
            curp: curp,
            telefono: telefono,
            email: email
        };

        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        window.location = '../pages/mapa.html';
    })
    .catch(error => {
        console.log(error);
        txtError.innerHTML = errorMessage(error.code);
        txtError.style.visibility = 'visible';
    });

    /*
    await db.collection('usuarios').doc().set({
        nombre: nombre,
        edad: edad,
        curp: curp,
        telefono: telefono
    });
    */
});


registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
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

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user.uid);
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: nombre,
            edad: edad,
            curp: curp,
            telefono: telefono
        });


    }).then(() => {
        let usuario = {
            nombre: nombre,
            edad: edad,
            curp: curp,
            telefono: telefono,
            email: email
        };

        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        window.location = '../pages/mapa.html';
    })
    .catch(error => {
        console.log(error);
        txtError.innerHTML = errorMessage(error.code);
        txtError.style.visibility = 'visible';
    });
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

function irALogin() {
    window.location = '../pages/login.html';
}