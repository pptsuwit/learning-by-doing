package main

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

var db *sql.DB

type Product struct {
	id         int
	name       string
	producType string
	price      int
}

func main() {
	var err error

	connStr := "postgres://<user>:<password>@<host>/<dbname>?sslmode=disable"
	db, err = sql.Open("postgres", connStr)

	if err != nil {
		panic(err)
	}
	//Insert
	// newProduct := Product{id: 0, name: "apple", price: 50, producType: "frut"}
	// err = addProduct(newProduct)
	// if err != nil {
	// 	panic(err)
	// }

	//Update
	// changeProduct := Product{id: 6, name: "applex", price: 550, producType: "frutx"}
	// err = updateProduct(changeProduct)
	// if err != nil {
	// 	panic(err)
	// }

	//Delete
	err = deleteProduct(7)
	if err != nil {
		panic(err)
	}

	//Get All
	products, err := getProduct()
	if err != nil {
		fmt.Printf("%v", err)
	}
	for _, item := range products {
		fmt.Println(item)
	}

	// Get by id
	// product, err := getProductById(2)
	// if err != nil {
	// 	fmt.Printf("%v", err)
	// }
	// fmt.Printf("%v", product)
}
func getProduct() ([]Product, error) {
	err := db.Ping()
	if err != nil {
		return nil, err
	}
	query := "SELECT * FROM product"
	rows, errQuery := db.Query(query)
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
	err := db.Ping()
	if err != nil {
		return nil, err
	}
	query := "SELECT * FROM product Where id = $1"
	row := db.QueryRow(query, id)
	product := Product{}
	err = row.Scan(&product.id, &product.name, &product.producType, &product.price)
	if err != nil {
		return nil, err
	}
	return &product, nil
}

func addProduct(product Product) error {
	query := "INSERT INTO product(name,type,price) VALUES ($1, $2, $3)"
	result, err := db.Exec(query, product.name, product.producType, product.price)

	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if affected <= 0 {
		return errors.New("can't add product")
	}
	return nil
}
func updateProduct(product Product) error {
	query := "UPDATE product SET name = $2, type = $3, price = $4 WHERE id = $1"
	result, err := db.Exec(query, product.id, product.name, product.producType, product.price)

	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if affected <= 0 {
		return errors.New("can't update product")
	}
	return nil
}
func deleteProduct(id int) error {
	query := `
				DELETE FROM product
				WHERE id = $1;`
	result, err := db.Exec(query, id)

	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if affected <= 0 {
		return errors.New("can't delete product")
	}
	return nil
}
