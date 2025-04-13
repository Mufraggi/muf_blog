---
title: "Rust Actix TDD architecture hexagonale part 1"
description: "Introduction à l'architecture hexagonale en Rust avec Actix Web, en adoptant une approche TDD pour une conception modulaire et testable."
date: 2022-02-18
tags:
  - rust
  - actix-web
  - architecture hexagonale
  - tdd
  - backend

language: fr
slug: rust-actix-tdd-architecture-hexagonale-part-1
author: Hugo Mufraggi
readingTime: 7
cover: /1_tQm9frXpyCwmWU_AsysuWQ.webp
related: 
  - tests-middleware-actix
  - guide-debutant-rust
---

# Rust Actix TDD Architecture Hexagonale Part 1 page

# Intro

On continue à pratiquer le Rust après un premier article sur la gestion de middleware avec actix. J’ai cherché un moyen de pouvoir faciliter l’écriture d’article et de réutiliser des briques de code. En cherchant un peu, je suis tombé sur l’architecture hexagonale.

> L'architecture hexagonale décompose un système en plusieurs composants interchangeables et faiblement couplés, tel le noyau de l'application, la base de données, l'interface utilisateur, les scripts de test ou encore les interfaces avec d'autres systèmes.

Avec l'architecture hexagonale, je devrais pouvoir interchanger des composants et passer d’une couche api REST à une couche api en GRPC sans casse.

Pour cet article, nous allons créer et tester la brique liée à la database. J’ai choisi une database SQL, postgres.

# Lien utile

SQLX est la lib nous servira à nous connecter et interagir avec la database.

Tout le code produit sera disponible sur ce repository.

# Le contrat

Première étape, nous voulons définir le contrat. Cela correspond à toutes les interfaces et les types qui vont interagir avec l'extérieur et à l’intérieur de notre repository.

Nous avons besoin de définir:

- Les Enum d'erreurs pour chacune des actions nécessaires : Create, Get, Delete, etc..
- La Structure DbUser qui sera la représentation de la table user en db
- Le Trait Repository qui contiendra toutes les définitions des fonctions que nous souhaitons utiliser
- Notre structure UserRepository qui implémentera le trait repository

Ce qui nous donne nos Enum et Struct:

```rust
#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub enum InsertError {
    Conflict,
    Unknown,
}

pub enum FetchAllError {
    Unknown,
}

#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub enum FetchOneError {
    NotFound,
    Unknown,
}

pub enum DeleteError {
    NotFound,
    Unknown,
}

pub struct PostgresRepository {
    db_pool: Option<Pool<Postgres>>,
}

#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub struct DbUser {
    id: String,
    first_name: String,
    last_name: String,
    birthday_date: NaiveDate,
    city: String,
}
```

Et pour les différents impl :

```rust
impl PostgresRepository {
    pub async fn new_pool(url_db: &str) -> Result<PostgresRepository, ()> {
        let tmp = PgPool::connect(&url_db).await;
        match tmp {
            Ok(value) => Ok(Self {
                db_pool: Some(value),
            }),
            Err(err) => Err(()),
        }
    }
}

#[async_trait]
pub trait Repository {
    async fn insert(&self, user: DbUser) -> anyhow::Result<DbUser, InsertError>;
    async fn fetch_all(&self) -> anyhow::Result<Vec<DbUser>, FetchAllError>;

    async fn get(&self, id: String) -> anyhow::Result<DbUser, FetchOneError>;
    async fn update(
        &self,
        id: String,
        new_db_user: DbUser,
    ) -> anyhow::Result<DbUser, FetchAllError>;
    async fn delete(&self, number: u32) -> anyhow::Result<(), DeleteError>;
}

impl Repository for PostgresRepository {
    fn insert(self, user: DbUser) -> anyhow::Result<DbUser, InsertError> {
        todo!()
    }

    fn fetch_all(&self) -> anyhow::Result<Vec<DbUser>, FetchAllError> {
        todo!()
    }

    fn get(&self, id: String) -> anyhow::Result<DbUser, FetchOneError> {
        todo!()
    }

    fn update(&self, id: string, new_db_user: DbUser) -> anyhow::Result<DbUser, FetchAllError> {
        todo!()
    }

    fn delete(&self, number: u32) -> anyhow::Result<(), DeleteError> {
        todo!()
    }
}
```

# Test drive development 🚀

Maintenant que nous avons défini notre contract, nous allons implémenter nos fonctions en TDD et accrocher nos ceintures. Pour des questions de longueur d’article, je ne couvrirais que le Create et le Get, mais pas d’inquiétude, tout sera dispo sur le Github.

## Préambule

Sqlx a besoin dans votre env que vous cree une variable d’env `DATABASE_URL.` Pour ma part, l’URL de ma database sera la suivante:

```js
export DATABASE_URL="postgres://postgres:somePassword@localhost:5432/postgres”

```

Suite à cela , vous allez pouvoir exécuter cette commande :

```js
cargo sqlx prepare

```

La commande va créer un fichier `sqlx-data.json` qui stockera les query, les types associés et permettra une vérification des types lors de la compilation. Lors de la rédaction du code, j’ai étais confronté a une erreur due au type de `birthday_date`.

## Insert Test

Nous commençons par coder nos tests. Définissons le comportement que nous souhaitons:

1. Le create fonctionne et notre fonction nous retourne le DbUser.
2. Si il y a une erreur nous voulons une `InsertError`

Pour représenter ces comportements, nous allons vouloir créer un dbUser et mettre en erreur la création d'un user.

### Premier Test

\<aside> ⚠️ Les tests que nous allons réaliser sont des tests async nous avons besoin du décorateur `[tokio::test]`

\</aside>

Nous allons initialiser le User a sa création et le User attendu à l’issue du test.

Pour des questions de borowing, j’ai cloné les variables. Je ne voulais pas perdre trop de temps à me battre avec le borow checker

```rust
#[tokio::test]
async fn create_works() {
    let charset = "abcdefghijkl";
    let user = DbUser {
        id: Uuid::new_v4().to_string(),
        last_name: generate(6, charset),
        first_name: generate(6, charset),
        city: generate(6, charset),
        birthday_date: NaiveDate::from_ymd(2015, 3, 14),
    };
    let user_res = DbUser {
        id: user.id.clone(),
        last_name: user.last_name.clone(),
        first_name: user.first_name.clone(),
        city: user.city.clone(),
        birthday_date: NaiveDate::from_ymd(2015, 3, 14),
    };

```

Maintenant nous voulons initialiser notre repository et faire appel à l' insert. Nous récupérons le résultat et faisons un unwrap (équivalant à un get en scala).

```rust
 let url = "postgres://postgres:somePassword@localhost:5432/postgres";
        let repo = PostgresRepository::new_pool(url).await.unwrap();
        let res = repo.insert(user).await;
        let user_create = res.unwrap()

```

Puis nous lançons le test grâce au Trait `PartialEq` de DbUser en faisant un:

```rust
assert_eq!(user_create.eq(&user_res), true)

```

### Seconde test

Nous voulons créer un premier user et tenter la création d’un second user avec le même id. L'id étant une primary key, il ne peut pas être écrit en DB deux fois.

La seule partie intéressante du test est le check que nous allons faire. Il nous faut vérifier que nous avons bien une InsertError::Conflict

```rust
let res = repo2.insert(user2).await;
        assert_eq!(res.err().unwrap(),InsertError::Conflict )

```

## Insert

La définition de la fonction `insert` à été définie par le Trait.

La première chose que nous allons faire est de récupérer la `db_pool`, nous avons besoin `unwrap` la `db_pool` pour pouvoir interagir avec la database.

```rust
let db_pool = self.db_pool.as_ref().unwrap();

```

Pour la suite nous voulons réaliser notre query. Pour cela, vous pouvez vous référer au repository officiel et leur exemple.

```rust

        let rec = query!(
            r#"
INSERT INTO  users (id, first_name, last_name, birthday_date, city)
        VALUES ( $1, $2, $3, $4, $5) returning id
        "#,
            db_user.id.to_string(),
            db_user.first_name,
            db_user.last_name,
            db_user.birthday_date,
            db_user.city
        )
            .fetch_one(db_pool)
            .await;

```

Sqlx n’est pas un ORM, c’est pourquoi nous allons écrire nos requêtes en plain sql. La premier party est la requête sql, la seconde sont les arguments qui remplaceront les `$1, $2, $3,$4, $5`. On utilise `fetch_one` en passant en argument la `db_pool`. Ensuite, on “await” le tout et récupere le résultat de la query.

Maintenant que nous avons le résultat, nous voulons réaliser un match sur `rec`. Cela vas nous permetre de gerer facilement le cas où rec est `Ok` ou est une `Err`. Si rec est Ok la value contient Id et nous retournerons le DbUser et en cas d’erreur nous retournerons notre Type Error InsertError::Conflict.

```rust
  match rec {
            Ok(value) => {
               éOk(db_user)
            }
            Err(_) => Err(InsertError::Conflict)
        }

```

## Get Test

Ayant pris le temps de tout détailler pour le insert je vais être plus expéditif pour le get.

### Premier test

On veux créer un user puis tester le get. Pour cela nous allons utiliser le endpoint de insert coder et tester précedement.

```rust
let id = Uuid::new_v4().to_string();
let user = DbUser {
    id: id.clone(),
    last_name: generate(6, charset),
    first_name: generate(6, charset),
    city: generate(6, charset),
    birthday_date: NaiveDate::from_ymd(2015, 3, 14),
};
```

On créer le user puis l’insert.

```rust
let mut repo = PostgresRepository::new_pool(url).await.unwrap();
repo.insert(user).await;
```

Puis on peut test notre fonction

```rust
let repo2 = PostgresRepository::new_pool(url).await.unwrap();
let res1 = repo2.get(id).awai.unwrap();
assert_eq!(user_res.eq(&res1), true)
```

### Second test

Pour le second test on va test id au hasard et vérifier que l’on a bien le bon message erreur.

```rust
assert_eq!(user_response, FetchOneError::NotFound)
```

### Get

La définition de la fonction GET a été definie par le Trait.

```rust
async fn get(&self, id: String) -> anyhow::Result<DbUser, FetchOneError>;
```

Comme pour le Insert nous voulons récupérer le `db_pool`.

```rust
let db_pool = self.db_pool.as_ref().nwrap();
```

Pour le GET nous allons utiliser une autre fonction de sqlx le `query_as::<_, DbUser>` avec le type attendu, pour nous le `DbUser`. Le `fetch_one` permet de retourner une seule value.

```rust
let rec = query_as::<_ DbUser>(
            "SELET id, first_name, last_name, birthday_date, city FROM users WHERE id = $1",
        )
        .bind(id)
        .fetch_one(db_pool)
        .await;
```

Comme pour le `insert` nous allons utilser le patern matching et facilement gerer les cas où `res` est `Ok` ou `Err`.Pour le cas Ok nous allons récupérer le résultat de la query et le réassignier à DbUser et retourner le DbUser crée.

```rust
match rec {
            Ok(value) => {
                Ok( DbUser {
                    id: value.id,
                    last_name: value.last_name,
                    first_name: value.first_name,
                    city: value.city,
                    birthday_date: value.birthday_date,
                })
            }
            Err(_) => Err(FetchOneError::NotFound),
        }
```

# Conclusion

Nous avons réaliser en TDD le create et le get. Vous pouvez trouver la suiteList, Update et Delete sur mon repository.

Dans le prochain article, nous nous attaquerons à la partie Domaine qui fait le lien entre la couche api et le repository.

A bientôt
