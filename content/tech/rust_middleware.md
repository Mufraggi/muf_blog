---
title: "Créer un Middleware d’Authentification avec Actix Web en Rust"
description: "Apprenez à créer un middleware dans Actix Web pour intercepter et valider un token JWT, tout en découvrant des concepts clés de Rust comme FromRequest, Option, Result et pattern matching."
date: 2022-01-10
tags: ["rust", "actix-web", "middleware", "jwt", "backend"]
language: "fr"
slug: "middleware-auth-actix-web"
author: "Hugo Mufraggi"
readingTime: 7
cover: "/1_o6xFGs6Qw9qAQ8J-lmCrOw.webp"
related: ["tests-middleware-actix", "guide-debutant-rust"]
---

# **Créer un Middleware d’Authentification avec Actix Web en Rust**

On tient les bonnes résolutions pour 2022 et on se met au Rust. Vous trouverez ci-joint un article sur du Rust avec une implémentation d’un middleware pour le framework Actix. Je vous souhaite une bonne lecture.

Sommaire:

- Packager un middelware
- Package utiliser
- Code et Patern lier au Rust
- Testing

# Packager un middleware

Dans ce tutoriel nous allons implémenter un middleware sur le framework web Actix. J’ai choisi d’en faire un package cela a plusieurs avantages en terme d’architecture logiciel :

- Dans des architectures micro service cela permet d’éviter la duplication de code.
- Centraliser tout les logiques liées au middelware dans un seul repository.
- Réduire la masse de code à tester

Voici le code source du tutoriel: https\://github.com/Mufraggi/middleware\_actix

Petit disclaimer pour me faciliter le développement de middelware j’ai volontairement créé les dossiers models et config. Pour une implémentation complète dans logique micro-service il faudrait que ces deux dossiers soient des packages à importer.

# Package

Voici les principaux packages utilisés pour coder ce middleware. Vous pouvez retrouver les doc des différents packages. Les doc seront vos boussoles dans l’océan qu’est Rust. Vous pouvez trouver le listing des packages dans le Cargo.toml.

Actix-web est le Framework Web

Actix Web | A powerful, pragmatic, and extremely fast web framework for Rust.

Serde est la library de Serialization désarialisation en Rust

Overview

Ce sont les deux gros packages du projet que vous serez amenés à utiliser dans d’autres projets.

# Code et pattern

Nous allons devoir créer une nouvelle structure et implémenter le trait FromRequest à notre nouvelle structure.

Un trait est un ensemble de méthodes que l'objet sur lequel il est appliqué doit implémenter. Vous pouvez trouver ici la vidéo YouTube d’une conférence Rust qui m’a permis d’appréhender le concept de trait.

Revenons à notre implémentation du trait FromRequest. Pour cela nous pouvons nous référer à la doc de rust de actix.



```rust
[derive(Debug)]
pub struct AuthorizationMiddleware;

impl FromRequest for AuthorizationMiddleware {
    type Error = Error;
    type Future = Ready<Result<AuthorizationMiddleware, Error>>;
    type Config = ();

    }
```

Dans la doc, on va pouvoir voir qu’à minima nous avons besoin de re implémenter la fonction from\_request avec la signature de la fonction à respecter. From\_request est une fonction que nous allons utiliser dans le router Actix. Le but d’un middleware est d’intercepter la request et faire des pré-traitement avant l’entrée dans le service. Dans notre cas, nous voulons vérifier si notre JWT est bon et refuser l’accès au endpoint, si ce n’est pas le cas.

La fonction from\_request prend en argument un HttpRequest, et le payload de la requête et va retourner une Future définie plus haut par :

`type Future = Ready<Result<AuthorizationMiddleware, Error>>;`

Dans le cas où le JWT est bon, la fonction retournera un `AuthorizationMiddleware` et dans l’autre cas une `Error`.



```rust
fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let auth = req.headers().get("Authorization");
        match auth {
            Some(_) => {
	            // Todo apply the token checking
            }
            None => err(ErrorUnauthorized("Blocked"))
        }
    }
```

La première étape pour notre fonction est de récupérer dans la request le header “Authorization”.

En utilisant la fonction headers(), cela nous retourne une `Map [Key, value]` , la map contient l’ensemble des headers de notre request. Grace au `get("Authorization")` nous récupérons une Option\[\&headerValue] qui contiendra la valeur de Authorization si Authorizarion est présente dans le Header, a contrario cela retournera None. Les Option font partie des types monadic. Les types modanic sont liés au langage fonctionnel et permettent la mise en place de différentes paternes de code. Dans le lien suivant, vous trouverez un article sur les types modanic en Scala, relativement similaire pour le Rust.

Dans notre cas nous allons pouvoir réaliser du patern matching une Option à deux états possibles l’Option contient quelle que chose. On peut voire le patern matching comme une sorte de if ou un switchcase. Si notre option contient quelle que chose on va rentrer dans le cas Some(\_) ⇒ et S’il y a une erreur ou rien, on rentrera dans le None ⇒.

Dans notre cas, cela permet de tester si dans les header il y a bien “Authorization”

Si oui, nous continuons la logique de notre code, dans le cas ou cela échoue nous pouvons retourner une error http Unauthorized.

Nous avons récupérer le “Authorization” dans le header, nous allons chercher à récupérer notre token et retirer l’entête de ce dernier. Un Header Autorisation est constitué comme `Authorization: <type> <credentials>` dans notre exemple le type de notre header sera `Bearer`. Ces pour cela que dans la suite nous allons réaliser un split sur `Bearer` puis extraire notre token.

```rust
let split: Vec<&str> = auth.unwrap().to_str().unwrap().split("Bearer").collect();
let token = split[1].trim();
let config: Config = Config {};
let var = config.get_config_with_key("SECRET_KEY");
let key = var.as_bytes();
```

Le reste du code sur cette partie est assez simple je fais une avance rapide jusqu’au match decode::\<Claims>.

```rust
match decode::<Claims>(
    &token.to_string(),
    &DecodingKey::from_secret(key.as_ref()),
    &Validation::new(Algorithm::HS256),
) {
    Ok(_token) => ok(AuthorizationMiddleware),
    Err(_e) => {
        _e;
        err(ErrorUnauthorized("Invalid token"))}
}
```

Le match decode::\<Claims> est la fonction de la lib `jsonwebtoken` qui prend comme type de sortie une Structure Claims définie dans les dossier models. Chose intéressante la fonction decode retourne un autre type de modanic propre au Rust le type Result Ok ou une Err. Sur les Résulte nous pouvons réaliser du patern matching. Si `décode` retourne un Ok nous allons retourner`AuthorizationMiddleware` et sinon une error http, pour refuser l’accès au end-Point.

Une fois notre Middleware codé nous allons devoir le tester pour être sûre de son bon fonctionnement vous pouvez déjà trouver les tests dans mon repository. Mais cela sera pour un prochain article sur comment réaliser les tests.

Nous venons de voir comment créer un Middleware en Rust, je vous propose de passer au prochain article, qui vous expliquera comment réaliser des tests permettant de vérifier celui-ci. En attendant, je vous remercie d’avoir lu cet article, en espérant vous avoir apporter les premières bases du langage Rust, avec comme exemple, la notion de Middleware.
