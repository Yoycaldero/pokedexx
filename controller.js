var app = angular.module("Myapp", ["ngRoute"]);

// Configurar rutas
app.config(function($routeProvider) {
    $routeProvider
        .when("/", { 
            templateUrl: "home.html", 
            controller: "HomeController"
        })
        .when("/pokemones", { 
            templateUrl: "pokemones.html", 
            controller: "PokemonController"
        })
        .when("/agregar", { 
            templateUrl: "addPokemon.html", 
            controller: "addPokemonController"
        })
        .otherwise({ redirectTo: "/" });
});

// Controlador para Home
app.controller("HomeController", function($scope) {
    $scope.message = "¡Bienvenido a la Pokédex en AngularJS!";
});

// Controlador para Pokémon
app.controller("PokemonController", function($scope, $http) {
    $scope.poke = [];  
    $scope.selectedPokemon = null;  
    $scope.isModalOpen = false;
    $scope.newPokemon = { name: "", type: "", image: "" };

    // Obtener la lista de Pokémon
    $http.get("https://pokeapi.co/api/v2/pokemon?limit=151") 
        .then(function(response) {
            $scope.poke = response.data.results;  
        })
        .catch(function(error) {
            console.error("Error al obtener datos", error);
        });

    // Función para obtener detalles del Pokémon cuando se hace clic
    $scope.showPokemon = function(url) {
        $http.get(url)
            .then(function(response) {
                $scope.selectedPokemon = response.data; 
                console.log($scope.selectedPokemon);
            })
            .catch(function(error) {
                console.error("Error al obtener detalles del Pokémon", error);
            });
    };

    // Cerrar el modal de detalles del Pokémon
    $scope.closeModal = function() {
        $scope.selectedPokemon = null;
        $scope.isModalOpen = false;
    };

    // Función para abrir el modal de agregar Pokémon
    $scope.openModal = function() {
        $scope.isModalOpen = true;
    };

    // Función para agregar un nuevo Pokémon
    $scope.addPokemon = function() {
        if ($scope.newPokemon.name && $scope.newPokemon.type && $scope.newPokemon.image) {
            var newPoke = {
                name: $scope.newPokemon.name,
                type: $scope.newPokemon.type,
                image: $scope.newPokemon.image
            };
            
            $scope.poke.push(newPoke);
            $scope.newPokemon = { name: "", type: "", image: "" }; 
            $scope.closeModal(); 
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };
});
