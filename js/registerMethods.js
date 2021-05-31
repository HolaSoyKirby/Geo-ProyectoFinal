const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('registrando');
    const nombre = registerForm['txtNombre'].value;
    const edad = registerForm['txtEdad'].value;
    const curp = registerForm['txtCurp'].value;
    const telefono = registerForm['txtTelefono'].value;
    const email = registerForm['txtEmail'].value;
    const password = registerForm['txtPassword'].value;

    console.log(`${nombre} ${edad} ${curp} ${telefono} ${email} ${password}`);
});

function registrarse(){
    window.location = '../pages/mapa.html';
}

function irALogin(){
    window.location = '../pages/login.html';
}