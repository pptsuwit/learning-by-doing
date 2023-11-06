package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/lib/pq"
)

var db *sql.DB
var dbpool *pgxpool.Pool
var ctx = context.Background()

type Product struct {
	id         int
	name       string
	producType string
	price      int
}

func main() {
	var err error
	// connStr := "postgres://<user>:<password>@<host>/<dbname>?sslmode=disable"
	connStr := "postgres://postgres:password@localhost:5432/testdb"
	dbpool, err = pgxpool.New(ctx, connStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}
	// // Insert
	// newProduct := Product{id: 0, name: "apple", price: 50, producType: "frut"}
	// err = addProduct(newProduct)
	// if err != nil {
	// 	panic(err)
	// }

	// // Update
	// changeProduct := Product{id: 8, name: "applex", price: 550, producType: "frutx"}
	// err = updateProduct(changeProduct)
	// if err != nil {
	// 	panic(err)
	// }

	// //Delete
	// err = deleteProduct(6)
	// if err != nil {
	// 	panic(err)
	// }

	//Get All
	products, err := getProduct()
	if err != nil {
		fmt.Printf("%v", err)
	}
	for _, item := range products {
		fmt.Println(item)
	}

	// //Get by id
	// product, err := getProductById(2)
	// if err != nil {
	// 	fmt.Printf("%v", err)
	// }
	// fmt.Printf("%v", product)
}
func getProduct() ([]Product, error) {
	query := "SELECT * FROM product"
	rows, errQuery := dbpool.Query(ctx, query)
	if errQuery != nil {
		return nil, errQuery
	}
	defer rows.Close()

	products := []Product{}
	for rows.Next() {
		product := Product{}
		err := rows.Scan(&product.id, &product.name, &product.producType, &product.price)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}
	return products, nil
}

func getProductById(id int) (*Product, error) {
	query := "SELECT * FROM product Where id = $1"

	product := Product{}
	err := dbpool.QueryRow(ctx, query, id).Scan(&product.id, &product.name, &product.producType, &product.price)

	if err != nil {
		return nil, err
	}
	return &product, nil
}

func addProduct(product Product) error {
	query := `INSERT INTO product(name,type,price) 
				VALUES ($1, $2, $3)`
	result, err := dbpool.Exec(ctx, query, product.name, product.producType, product.price)
	if err != nil {
		return err
	}

	if result.RowsAffected() != 1 {
		return errors.New("can't add product")
	}
	return nil
}
func updateProduct(product Product) error {
	query := `UPDATE product 
				SET name = $2, type = $3, price = $4 
				WHERE id = $1`
	result, err := dbpool.Exec(ctx, query, product.id, product.name, product.producType, product.price)

	if err != nil {
		return err
	}
	if result.RowsAffected() != 1 {
		return errors.New("can't update product")
	}
	return nil
}
func deleteProduct(id int) error {
	query := `
				DELETE FROM product
				WHERE id = $1;`
	result, err := dbpool.Exec(ctx, query, id)

	if err != nil {
		return err
	}
	if result.RowsAffected() != 1 {
		return errors.New("can't remove product")
	}
	return nil
}
