//Variable qui maintient l'état visible du panier.
var carritoVisible = false;
//icon adorable 
document.getElementById('icone-ador').addEventListener('click', function() {
    // Code à exécuter lorsque l'icône est cliquée
    alert('Icône Ador cliquée !');
  });
  
// tous les éléments de la page se chargent pour exécuter le script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //la fonctionnalité aux boutons de suppression du panier.
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //la fonctionnalité au bouton d'augmentation de la quantité
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     // fonctionnalité au bouton de diminution de la quantité
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    // la fonctionnalité au bouton 'Ajouter au panier'
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Ajout de la fonctionnalité au bouton 'Acheter'
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
// supprimer tous les éléments du panier et le cachons
function pagarClicked(){
    alert("Merci pour votre achat");
    //supprime tous les éléments du panier.
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Fonction qui contrôle le bouton 'Ajouter au panier' cliqué.
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Fonction qui rend le panier visible
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Fonction qui ajoute un article au panier
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //vérifier l'article que l'utilisateur tente d'ajouter n'est pas déjà présent dans le panier."
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("L'article se trouve déjà dans le panier");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Ajout de la fonctionnalité de suppression pour le nouvel article
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Ajoutons la fonctionnalité de déduction de la quantité pour le nouvel article.
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Ajout de quantité pour le nouvel article
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //mettre à jour le total
    actualizarTotalCarrito();
}
//j'augmente la quantité de l'élément sélectionné de un
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Je réduis la quantité de l'élément sélectionné de un
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}







